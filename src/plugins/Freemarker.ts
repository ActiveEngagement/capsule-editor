import { RangeSetBuilder, type Extension } from '@codemirror/state';
import { Decoration, EditorView, ViewPlugin, type DecorationSet, type ViewUpdate } from '@codemirror/view';

// FreeMarker (FTL) is a templating layer that lives inside otherwise-HTML
// documents. The `@codemirror/lang-html` grammar has no concept of it, so its
// constructs (`${...}` interpolations, `<#if>`/`<@macro>` directives, `<#-- --#>`
// comments) fall through as plain text and render uncolored. Rather than ship a
// full Lezer grammar for a language that only ever appears embedded in HTML,
// we scan the document and layer mark decorations over the HTML highlighting.
// Template files are small (emails), so a full-document pass per change is cheap.

const delimiterMark = Decoration.mark({ class: 'cm-ftl-delimiter' });
const directiveMark = Decoration.mark({ class: 'cm-ftl-directive' });
const interpolationMark = Decoration.mark({ class: 'cm-ftl-interpolation' });
const stringMark = Decoration.mark({ class: 'cm-ftl-string' });
const commentMark = Decoration.mark({ class: 'cm-ftl-comment' });

const NAME_START = /[a-zA-Z_]/;
const NAME_CHAR = /[\w.]/;

function isTagStart(text: string, i: number): boolean {
    if(text[i] !== '<') {
        return false;
    }

    // `<#name`, `</#name`, `<@name`, `</@name`
    const marker = text[i + 1] === '/' ? i + 2 : i + 1;

    return (text[marker] === '#' || text[marker] === '@') && NAME_START.test(text[marker + 1] ?? '');
}

/**
 * Consume a quoted string literal starting at `i` (which points at the opening
 * quote). Returns the index just past the closing quote (or end of document for
 * an unterminated string).
 */
function scanString(text: string, i: number): number {
    const quote = text[i];
    let j = i + 1;

    while(j < text.length) {
        if(text[j] === '\\') {
            j += 2;
            continue;
        }

        if(text[j] === quote) {
            return j + 1;
        }

        j++;
    }

    return j;
}

function buildDecorations(view: EditorView): DecorationSet {
    const builder = new RangeSetBuilder<Decoration>();
    const text = view.state.doc.toString();
    const len = text.length;
    let i = 0;

    // Strictly left-to-right so ranges are emitted in ascending order, which is
    // what RangeSetBuilder requires — no post-sort needed.
    while(i < len) {
        // Comment: <#-- ... --> (may span multiple lines)
        if(text.startsWith('<#--', i)) {
            const end = text.indexOf('-->', i + 4);
            const stop = end === -1 ? len : end + 3;

            builder.add(i, stop, commentMark);
            i = stop;
            continue;
        }

        // Directive / macro tag: <#if ...>, </#if>, <@macro ...>, </@macro>
        if(isTagStart(text, i)) {
            const isClosing = text[i + 1] === '/';
            const delimEnd = isClosing ? i + 2 : i + 1; // past `</` or `<`

            let j = delimEnd + 1; // skip the `#` or `@`

            while(j < len && NAME_CHAR.test(text[j])) {
                j++;
            }

            // `<#`/`</#`/`<@`/`</@` opening delimiter, then the directive name.
            builder.add(i, delimEnd + 1, delimiterMark);
            builder.add(delimEnd + 1, j, directiveMark);

            // Scan the parameters up to the closing `>`, honoring quoted strings
            // (a `>` inside a string does not close the tag) and nested `${...}`
            // interpolations.
            while(j < len) {
                const c = text[j];

                if(c === '"' || c === '\'') {
                    const end = scanString(text, j);

                    builder.add(j, end, stringMark);
                    j = end;
                    continue;
                }

                if((c === '$' || c === '#') && text[j + 1] === '{') {
                    j = scanInterpolation(text, j, builder);
                    continue;
                }

                if(c === '>') {
                    // Include a leading `/` so self-closing `/>` reads as one unit.
                    const start = text[j - 1] === '/' ? j - 1 : j;

                    builder.add(start, j + 1, delimiterMark);
                    j++;
                    break;
                }

                j++;
            }

            i = j;
            continue;
        }

        // Interpolation: ${ ... } or #{ ... }
        if((text[i] === '$' || text[i] === '#') && text[i + 1] === '{') {
            i = scanInterpolation(text, i, builder);
            continue;
        }

        i++;
    }

    return builder.finish();
}

/**
 * Highlight an interpolation beginning at `start` (pointing at `$` or `#`).
 * Emits the opening delimiter, the inner expression, and the closing brace,
 * matching braces so nested `{}` inside the expression don't end it early.
 * Returns the index just past the closing brace.
 */
function scanInterpolation(text: string, start: number, builder: RangeSetBuilder<Decoration>): number {
    const len = text.length;
    let depth = 1;
    let j = start + 2; // past `${` / `#{`

    while(j < len && depth > 0) {
        const c = text[j];

        if(c === '"' || c === '\'') {
            j = scanString(text, j);
            continue;
        }

        if(c === '{') {
            depth++;
        }
        else if(c === '}') {
            depth--;

            if(depth === 0) {
                break;
            }
        }

        j++;
    }

    const contentEnd = Math.min(j, len);

    builder.add(start, start + 2, delimiterMark);

    if(contentEnd > start + 2) {
        builder.add(start + 2, contentEnd, interpolationMark);
    }

    if(j < len && text[j] === '}') {
        builder.add(j, j + 1, delimiterMark);

        return j + 1;
    }

    return contentEnd;
}

const freemarkerPlugin = ViewPlugin.fromClass(class {
    decorations: DecorationSet;

    constructor(view: EditorView) {
        this.decorations = buildDecorations(view);
    }

    update(update: ViewUpdate) {
        if(update.docChanged) {
            this.decorations = buildDecorations(update.view);
        }
    }
}, {
    decorations: plugin => plugin.decorations
});

// Colors are scoped to `&dark` / `&light` so the FTL tokens track whichever
// theme is active, mirroring the base color choices of the bundled themes.
const freemarkerTheme = EditorView.baseTheme({
    '&dark .cm-ftl-delimiter': { color: '#cc99cc' },
    '&dark .cm-ftl-directive': { color: '#fda331' },
    '&dark .cm-ftl-interpolation': { color: '#8abeb7' },
    '&dark .cm-ftl-string': { color: '#b5bd68' },
    '&dark .cm-ftl-comment': { color: '#808080', fontStyle: 'italic' },

    '&light .cm-ftl-delimiter': { color: '#b48ead' },
    '&light .cm-ftl-directive': { color: '#5e81ac' },
    '&light .cm-ftl-interpolation': { color: '#bf616a' },
    '&light .cm-ftl-string': { color: '#a3be8c' },
    '&light .cm-ftl-comment': { color: '#4c566a', fontStyle: 'italic' }
});

/**
 * Syntax highlighting for embedded FreeMarker (FTL) constructs — interpolations,
 * directive and macro tags, and comments — layered over the HTML highlighting.
 */
export default function freemarker(): Extension {
    return [ freemarkerPlugin, freemarkerTheme ];
}

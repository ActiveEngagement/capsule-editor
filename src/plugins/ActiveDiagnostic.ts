import { StateEffect, StateField } from '@codemirror/state';
import { Decoration, DecorationSet, EditorView } from '@codemirror/view';

// Marks the diagnostic the user just navigated to (footer's </> buttons) so
// it reads as *the* error, distinct from the plain lint squiggle every
// diagnostic gets. Set separately from the cursor position — see Editor.vue's
// onGoto, which keeps the actual selection an empty cursor rather than the
// diagnostic's text range. Selecting that range used to be how this was
// highlighted, but `highlightSelectionMatches()` treats any non-empty
// selection as a query and lights up every other occurrence of the same text
// in the document (e.g. every other `</strong>`), which reads as "all of
// these are broken" instead of pointing at the one that is.
export const setActiveDiagnostic = StateEffect.define<{ from: number; to: number } | null>();

const activeDiagnosticMark = Decoration.mark({ class: 'cm-activeDiagnostic' });

const activeDiagnosticField = StateField.define<DecorationSet>({
    create() {
        return Decoration.none;
    },
    update(deco, tr) {
        for(const effect of tr.effects) {
            if(effect.is(setActiveDiagnostic)) {
                return effect.value
                    ? Decoration.set([ activeDiagnosticMark.range(effect.value.from, effect.value.to) ])
                    : Decoration.none;
            }
        }

        // Any other selection/doc change means the user has moved on from
        // the diagnostic they were sent to — drop the mark rather than let it
        // linger on text that's no longer relevant.
        if(tr.docChanged || tr.selection) {
            return Decoration.none;
        }

        return deco.map(tr.changes);
    },
    provide: field => [
        EditorView.decorations.from(field),
        // bracketMatching() highlights the tag next to wherever the cursor
        // lands, which is right where onGoto puts it — so navigating to a
        // diagnostic lit up a second, unrelated tag right next to the one
        // that's actually broken. Flag the editor root while a diagnostic is
        // active so that highlight can be hidden without touching bracket
        // matching for ordinary cursor movement.
        EditorView.editorAttributes.from(field, deco => deco.size ? { class: 'cm-has-active-diagnostic' } : {}),
    ],
});

export default function activeDiagnosticHighlight() {
    return [
        activeDiagnosticField,
        EditorView.baseTheme({
            '.cm-activeDiagnostic': {
                backgroundColor: '#ff8c0080',
                outline: '1px solid #ff8c00',
                borderRadius: '2px',
            },
            '&light .cm-activeDiagnostic': {
                color: '#000',
            },
            // Bare selectors here get scoped as descendants of this theme's
            // own root class, not combined onto it — `&` is required to land
            // on the same `.cm-editor` element that `cm-has-active-diagnostic`
            // is set on. `!important` because whichever theme is active
            // (nord, gruvbox, ...) declares its own matching-bracket rule at
            // equal selector specificity and may sit later in the sheet.
            '&.cm-has-active-diagnostic .cm-matchingBracket, &.cm-has-active-diagnostic .cm-nonmatchingBracket': {
                backgroundColor: 'transparent !important',
                outline: 'none !important',
            },
        }),
    ];
}

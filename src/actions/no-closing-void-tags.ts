import type { Action } from '../plugins/Lint';

const REPLACE_TAGS = new Set(['br', 'hr', 'wbr']);

function tagName(raw: string): string | null {
    return raw.match(/<\/?([a-zA-Z][a-zA-Z0-9]*)/)?.[1]?.toLowerCase() ?? null;
}

const actions: Action[] = [
    {
        name: 'Replace with Opening Tag',
        validate(hint) {
            const name = tagName(hint.raw);
            return name !== null && REPLACE_TAGS.has(name);
        },
        apply(view, from, to) {
            const name = tagName(view.state.doc.sliceString(from, to));
            if(!name) return;
            view.dispatch({ changes: { from, to, insert: `<${name}>` } });
        }
    },
    {
        name: 'Remove Tag',
        validate(hint) {
            const name = tagName(hint.raw);
            return name !== null && !REPLACE_TAGS.has(name);
        },
        apply(view, from, to) {
            view.dispatch({ changes: { from, to, insert: '' } });
        }
    }
];

export default actions;

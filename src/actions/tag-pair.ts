import { syntaxTree } from '@codemirror/language';
import type { EditorView } from '@codemirror/view';
import { SyntaxNode } from '@lezer/common';
import type { Action } from '../plugins/Lint';

function getTagName(node: SyntaxNode, view: EditorView): string {
    return view.state.doc.sliceString(
        node.from, Math.min(node.to, view.state.doc.length)
    );
}

const actions: Action[] = [{
    name: 'Close Tag',
    validate(hint) {
        return !hint.message.startsWith('Tag must be paired, no start tag');
    },
    apply(view, from, to) {
        const around: SyntaxNode = syntaxTree(view.state).resolveInner(to, -1);

        let nearest: SyntaxNode|null = around;

        while(nearest?.parent) {
            if(nearest.name === 'Element') {
                break;
            }
            
            nearest = nearest.parent;
        }

        if(!nearest || nearest.name !== 'Element') {
            return;
        }

        let insertPosition = nearest.to;

        const closeTag = nearest.getChild('CloseTag');

        if(closeTag) {
            insertPosition = closeTag.from;
        }

        const openTag = nearest.getChild('OpenTag');

        if(!openTag) {
            return;
        }

        view.dispatch({
            changes: {
                from: insertPosition,
                to: insertPosition,
                insert: `</${getTagName(around.parent.getChild('TagName'), view)}>`
            },
        });
    }
}];

export default actions;
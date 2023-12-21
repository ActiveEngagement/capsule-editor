import { syntaxTree } from '@codemirror/language';
import { Action } from '@codemirror/lint';
import { SyntaxNode } from '@lezer/common';

const actions: Action[] = [{
    name: 'Close Tag',
    apply(view, from, to) {
        const around: SyntaxNode = syntaxTree(view.state).resolveInner(to, -1);

        let nearest: SyntaxNode|null = around;

        while(nearest?.parent) {
            if(nearest.name === 'Element' && !nearest.getChild('CloseTag')) {
                break;
            }

            nearest = nearest.parent;
        }
            
        const tagNode = nearest.firstChild?.getChild('TagName');
        
        if(!tagNode) {
            return;
        }

        const tagName = view.state.doc.sliceString(
            tagNode.from, Math.min(tagNode.to, view.state.doc.length)
        );

        view.dispatch({
            changes: {
                from, to, insert: `</${tagName}>`
            }
        });
    }
}
];

export default actions;
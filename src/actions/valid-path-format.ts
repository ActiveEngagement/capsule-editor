import { syntaxTree } from '@codemirror/language';
import type { EditorView } from '@codemirror/view';
import type { SyntaxNode } from '@lezer/common';
import type { Action } from '../plugins/Lint';

function getTagName(node: SyntaxNode, view: EditorView): string {
    return view.state.doc.sliceString(
        node.from, Math.min(node.to, view.state.doc.length)
    );
}  
  
const actions: Action[] = [{
    name: 'Fix Path',
    validate() {
        return true;
    },
    apply(view, from, to) {
        const matches = view.state.doc.slice(from, to).toString().match(/(=(?:\s+)?['"])(.+)?['"]/);
        
        if(!matches) {
            return;
        }

        const [ , eq, value] = matches;

        const anchor = from + eq.length + (matches.index ?? 0);

        const tr = view.state.update({
            selection: {
                anchor,
                head: anchor + (value ? value.length : 0)
            },
            scrollIntoView: true
        });

        view.dispatch(tr);
        view.focus();
    }
}, {
    name: 'Remove Attribute',
    apply(view, from, to) {
        view.dispatch({
            changes: { from, to, insert: '' }
        });
    }
},{
    name: 'Remove Tag',
    apply(view, from, to) {
        const tree = syntaxTree(view.state);
        const node = tree.resolve(to, -1);

        let nearest: SyntaxNode|null = node;

        while(nearest?.parent) {
            if(nearest.name === 'Element') {
                break;
            }
            
            nearest = nearest.parent;
        }

        const nearestOpenTag = nearest.getChild('OpenTag');

        const openTagName = getTagName(nearestOpenTag.getChild('TagName'), view);
        const closeTagName = nearest.getChild('CloseTag')
            ? getTagName(nearest.getChild('CloseTag').getChild('TagName'), view)
            : undefined;

        view.dispatch({
            changes: {
                from: nearest.from,
                to: openTagName === closeTagName
                    ? nearest.getChild('CloseTag').to
                    : nearestOpenTag.to,
                insert: ''
            }
        });
    }
}];

export default actions;
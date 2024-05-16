import { syntaxTree } from '@codemirror/language';
import type { Action } from '../plugins/Lint';

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

        const [ _, eq, value] = matches;

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
    apply(view, from) {
        const cursor = syntaxTree(view.state).cursor(from);

        cursor.moveTo(cursor.to);
        
        view.dispatch({
            changes: { from: cursor.from , to: cursor.to, insert: '' }
        });
    }
}];

export default actions;
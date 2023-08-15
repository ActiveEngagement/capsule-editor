import { Action } from '@codemirror/lint';

const actions: Action[] = [{
    name: 'Fix Error',
    apply(view, from, to) {
        const matches = view.state.doc.slice(from, to)
            .toString()
            .match(/(?:\s+)?([<&>]|\&\s)/);

        if(!matches) {
            return;
        }
            
        const map: Record<string,string> = {
            '<': '&lt;',
            '>': '&rt;',
            '&': '&amp;'
        };

        const [ value, char ] = matches;

        const index = value.indexOf(char);
        
        view.dispatch({
            changes: { from: from + index, to: from + index + 1, insert: map[char] }
        });
    }
}];

export default actions;
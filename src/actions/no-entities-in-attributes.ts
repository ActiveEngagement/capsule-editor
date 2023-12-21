import { Action } from '@codemirror/lint';

const actions: Action[] = [{
    name: 'Remove Entity',
    apply(view, from, to) {
        view.dispatch({
            changes: {
                from, to, insert: ''
            }
        });
    }
},{
    name: 'Decode Entity',
    apply(view, from, to) {
        const str = view.state.doc.sliceString(from, to);
        
        const el = document.createElement('textarea');

        el.innerHTML = str;

        view.dispatch({
            changes: {
                from, to, insert: el.value
            }
        });
    }
}];

export default actions;
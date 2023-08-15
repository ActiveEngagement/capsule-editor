import { Action } from '@codemirror/lint';

const actions: Action[] = [{
    name: 'Fix Error',
    apply(view, from, to) {
        view.dispatch({
            changes: { from, to, insert: '' }
        });
    }
}];

export default actions;
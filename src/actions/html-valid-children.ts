import type { Action } from '../plugins/Lint';

const actions: Action[] = [{
    name: 'Remove',
    apply(view, from, to) {
        view.dispatch({
            changes: { from, to, insert: '' }
        });
    }
}];

export default actions;


import { syntaxTree } from '@codemirror/language';
import type { Action } from '../plugins/Lint';

const actions: Action[] = [{
    name: 'Remove Img',
    apply(view, from) {
        const cursor = syntaxTree(view.state).cursor(from);

        view.dispatch({
            changes: { from: cursor.from , to: cursor.to, insert: '' }
        });
    }
}];

export default actions;
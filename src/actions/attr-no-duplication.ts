import { Action } from '../plugins/Lint';

const actions: Action[] = [{
    name: 'Remove Attribute',
    apply(view, from, to) {
        view.dispatch({
            changes: { from, to, insert: '' }
        });
    }
},{
    name: 'Rename Attribute',
    apply(view, from, to) {
        const matches = view.state.doc.slice(from, to).toString().match(/(?:\s+)?(\w+)=/);
       
        if(!matches) {
            return;
        }

        const [ value, attr ] = matches;

        const anchor = from + value.indexOf(attr);

        const tr = view.state.update({
            selection: {
                anchor,
                head: anchor + attr.length
            },
            scrollIntoView: true
        });

        view.dispatch(tr);
        view.focus();
    }
}];

export default actions;


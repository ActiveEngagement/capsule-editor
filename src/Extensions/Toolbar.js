import { showPanel } from "@codemirror/panel";

export default function(parent, left, right) {
    const component = new parent.toolbar({
        parent,
        propsData: {
            title: parent.title
        }
    });

    component.$on('input', value => {
        parent.filename = value;
        parent.$emit('input', {
            filename: parent.filename,
            content: parent.content
        })
    });

    component.$slots.left = left || parent.$slots['toolbar-left'];
    component.$slots.right = right || parent.$slots['toolbar-right'];
    component.$mount(document.createElement('div'));

    return showPanel.of(view => ({
        top: true,
        dom: component.$el
    }));
}
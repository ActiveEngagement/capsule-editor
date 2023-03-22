import { showPanel } from '@codemirror/panel';
import { EditorView, ViewPlugin } from '@codemirror/view';

export default function(parent: any) {
    return [
        ViewPlugin.fromClass(class {
            constructor(view: any) {
                parent.currentContent = view.state.doc.toString();
            }
        }),
        EditorView.updateListener.of(view => {
            if(view.docChanged) {
                parent.currentContent = view.state.doc.toString();
            }
        }),
        showPanel.of(() => ({
            top: true,
            dom: parent.$refs.toolbar.$el
        }))
    ];
}
import { showPanel } from "@codemirror/panel";
import { EditorView, ViewPlugin } from "@codemirror/view";

export default function(parent, left, right) {
    return [
        ViewPlugin.fromClass(class {
            constructor(view) {
                parent.currentContent = view.state.doc.toString();
            }
        }),
        EditorView.updateListener.of(view => {
            if(view.docChanged) {
                parent.currentContent = view.state.doc.toString();
            }
        }),
        showPanel.of(view => ({
            top: true,
            dom: parent.$refs.toolbar.$el
        }))
    ];
}
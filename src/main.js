import Editor from './Editor';
import LintState from './LintState';
import EditorField from './EditorField';
import EditorHotkey from './EditorHotkey';
import EditorToolbar from './EditorToolbar';
import 'vue-interface/dist/vue-interface.css';
import Modal from 'vue-interface/src/Plugins/Modal';
import EditorToolbarMenuItem from './EditorToolbarMenuItem';

if(window && window.Vue) {
    window.Vue.use(Modal);
    window.Vue.component('editor', Editor);
    window.Vue.component('editor-field', EditorField);
    window.Vue.component('editor-hotkey', EditorHotkey);
    window.Vue.component('editor-toolbar', EditorToolbar);
    window.Vue.component('editor-toolbar-menu-item', EditorToolbarMenuItem);
}

export {
    Editor,
    EditorField,
    EditorHotkey,
    EditorToolbar,
    EditorToolbarMenuItem,
    LintState
}

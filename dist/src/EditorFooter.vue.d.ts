import { Diagnostic } from '@codemirror/lint';
import { EditorView } from '@codemirror/view';
import { Ref } from 'vue';
declare function update(values: Diagnostic[]): void;
declare function activate(view: EditorView): void;
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    view: {
        type: import("vue").PropType<EditorView>;
        default: undefined;
    };
    saveButton: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    saveButtonLabel: {
        type: import("vue").PropType<string>;
        default: string;
    };
}, {
    activate: typeof activate;
    update: typeof update;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    goto: (args_0: Diagnostic, args_1: Diagnostic | undefined) => void;
    'update:modelValue': (args_0: Ref<Diagnostic[]>) => void;
    save: () => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    view: {
        type: import("vue").PropType<EditorView>;
        default: undefined;
    };
    saveButton: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    saveButtonLabel: {
        type: import("vue").PropType<string>;
        default: string;
    };
}>> & {
    onGoto?: ((args_0: Diagnostic, args_1: Diagnostic | undefined) => any) | undefined;
    "onUpdate:modelValue"?: ((args_0: Ref<Diagnostic[]>) => any) | undefined;
    onSave?: (() => any) | undefined;
}, {
    view: EditorView;
    saveButton: boolean;
    saveButtonLabel: string;
}, {}>, {
    "before-save-button"?(_: {}): any;
    "action-button"?(_: {}): any;
    "save-button"?(_: {
        diagnostics: {
            from: number;
            to: number;
            severity: "error" | "hint" | "info" | "warning";
            markClass?: string | undefined;
            source?: string | undefined;
            message: string;
            renderMessage?: (() => Node) | undefined;
            actions?: readonly {
                name: string;
                apply: (view: EditorView, from: number, to: number) => void;
            }[] | undefined;
        }[];
        saveButtonLabel: {
            from: number;
            to: number;
            severity: "error" | "hint" | "info" | "warning";
            markClass?: string | undefined;
            source?: string | undefined;
            message: string;
            renderMessage?: (() => Node) | undefined;
            actions?: readonly {
                name: string;
                apply: (view: EditorView, from: number, to: number) => void;
            }[] | undefined;
        }[];
    }): any;
    "after-save-button"?(_: {
        diagnostics: {
            from: number;
            to: number;
            severity: "error" | "hint" | "info" | "warning";
            markClass?: string | undefined;
            source?: string | undefined;
            message: string;
            renderMessage?: (() => Node) | undefined;
            actions?: readonly {
                name: string;
                apply: (view: EditorView, from: number, to: number) => void;
            }[] | undefined;
        }[];
    }): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare const _sfc_main: import("vue").DefineComponent<{
    content: {
        type: StringConstructor;
        default: undefined;
    };
    demoMode: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableFilename: BooleanConstructor;
    filename: {
        type: StringConstructor;
        default: null;
    };
    save: {
        type: FunctionConstructor;
        default(): true;
    };
    saveButton: {
        type: BooleanConstructor;
        default: boolean;
    };
    skipIntro: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: {
        type: StringConstructor;
        default: undefined;
    };
    toolbar: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, {
    currentContent: string | undefined;
    currentFilename: string;
    demoModalCleared: boolean;
    errors: never[];
    hasDismissedFinishPopup: boolean;
    showFinishModal: boolean;
    view: undefined;
}, {}, {
    closeFinishPopup(): void;
    input(): void;
    onModalClear(): void;
    onSave(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "demo-complete" | "fixed-errors")[], "update:modelValue" | "demo-complete" | "fixed-errors", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    content: {
        type: StringConstructor;
        default: undefined;
    };
    demoMode: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableFilename: BooleanConstructor;
    filename: {
        type: StringConstructor;
        default: null;
    };
    save: {
        type: FunctionConstructor;
        default(): true;
    };
    saveButton: {
        type: BooleanConstructor;
        default: boolean;
    };
    skipIntro: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: {
        type: StringConstructor;
        default: undefined;
    };
    toolbar: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onDemo-complete"?: ((...args: any[]) => any) | undefined;
    "onFixed-errors"?: ((...args: any[]) => any) | undefined;
}, {
    title: string;
    save: Function;
    saveButton: boolean;
    demoMode: boolean;
    disableFilename: boolean;
    filename: string;
    content: string;
    skipIntro: boolean;
    toolbar: boolean;
}>;
export default _sfc_main;

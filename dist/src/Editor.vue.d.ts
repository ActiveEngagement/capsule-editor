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
    demoModalCleared: boolean;
    errors: never[];
    hasDismissedFinishPopup: boolean;
    showFinishModal: boolean;
    view: undefined;
}, {}, {
    closeFinishPopup(): void;
    onModalClear(): void;
    onGoto({ from, to }: {
        from: number;
        to: number;
    }): void;
    onSave(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:filename" | "demo-complete" | "fixed-errors" | "update:content")[], "update:filename" | "demo-complete" | "fixed-errors" | "update:content", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
    "onUpdate:filename"?: ((...args: any[]) => any) | undefined;
    "onDemo-complete"?: ((...args: any[]) => any) | undefined;
    "onFixed-errors"?: ((...args: any[]) => any) | undefined;
    "onUpdate:content"?: ((...args: any[]) => any) | undefined;
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

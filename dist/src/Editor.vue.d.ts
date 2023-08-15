declare const _default: import("vue").DefineComponent<{
    content: {
        type: StringConstructor;
        default: undefined;
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
    title: {
        type: StringConstructor;
        default: undefined;
    };
    toolbar: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, {
    errors: never[];
    hasDismissedFinishPopup: boolean;
    showFinishModal: boolean;
    view: undefined;
}, {}, {
    onGoto({ from, to }: {
        from: number;
        to: number;
    }): void;
    onSave(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("save" | "update:filename" | "fixed-errors" | "update:content")[], "save" | "update:filename" | "fixed-errors" | "update:content", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    content: {
        type: StringConstructor;
        default: undefined;
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
    title: {
        type: StringConstructor;
        default: undefined;
    };
    toolbar: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onSave?: ((...args: any[]) => any) | undefined;
    "onUpdate:filename"?: ((...args: any[]) => any) | undefined;
    "onFixed-errors"?: ((...args: any[]) => any) | undefined;
    "onUpdate:content"?: ((...args: any[]) => any) | undefined;
}, {
    title: string;
    saveButton: boolean;
    save: Function;
    disableFilename: boolean;
    filename: string;
    content: string;
    toolbar: boolean;
}, {}>;
export default _default;

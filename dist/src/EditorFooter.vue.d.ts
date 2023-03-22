declare const _sfc_main: import("vue").DefineComponent<{
    saveButton: {
        type: BooleanConstructor;
        default: boolean;
    };
    saveButtonLabel: {
        type: StringConstructor;
        default: string;
    };
    view: {
        type: ObjectConstructor;
        default: undefined;
    };
}, unknown, {
    currentDiagnostic: undefined;
    direction: string;
    diagnostics: never[];
    fixedAllDiagnostics: boolean;
    hasLinted: boolean;
    showFooter: boolean;
    showFooterContent: boolean;
}, {
    actions(): never[];
    index(): number;
    totalDiagnostics(): any;
}, {
    findActiveDiagnostic(): any;
    goto(index: number): void;
    isEmpty(): boolean;
    compare(a: any, b: any): boolean;
    update(diagnostics: any): void;
    activate(view: any): void;
    onClickAction(diagnostic: any, action: any): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("goto" | "update:modelValue" | "save")[], "goto" | "update:modelValue" | "save", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    saveButton: {
        type: BooleanConstructor;
        default: boolean;
    };
    saveButtonLabel: {
        type: StringConstructor;
        default: string;
    };
    view: {
        type: ObjectConstructor;
        default: undefined;
    };
}>> & {
    onGoto?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onSave?: ((...args: any[]) => any) | undefined;
}, {
    saveButton: boolean;
    saveButtonLabel: string;
    view: Record<string, any>;
}>;
export default _sfc_main;

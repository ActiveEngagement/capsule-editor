declare const _sfc_main: import("vue").DefineComponent<{
    demoMode: BooleanConstructor;
    disableFilename: BooleanConstructor;
    filename: {
        type: StringConstructor;
        default: undefined;
    };
}, unknown, {
    currentValue: string | undefined;
}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("demo-modal" | "update:filename")[], "demo-modal" | "update:filename", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    demoMode: BooleanConstructor;
    disableFilename: BooleanConstructor;
    filename: {
        type: StringConstructor;
        default: undefined;
    };
}>> & {
    "onDemo-modal"?: ((...args: any[]) => any) | undefined;
    "onUpdate:filename"?: ((...args: any[]) => any) | undefined;
}, {
    demoMode: boolean;
    disableFilename: boolean;
    filename: string;
}>;
export default _sfc_main;

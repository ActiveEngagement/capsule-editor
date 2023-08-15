declare const _default: import("vue").DefineComponent<{
    disableFilename: BooleanConstructor;
    filename: {
        type: StringConstructor;
        default: undefined;
    };
}, unknown, {
    currentValue: string | undefined;
}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:filename"[], "update:filename", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    disableFilename: BooleanConstructor;
    filename: {
        type: StringConstructor;
        default: undefined;
    };
}>> & {
    "onUpdate:filename"?: ((...args: any[]) => any) | undefined;
}, {
    disableFilename: boolean;
    filename: string;
}, {}>;
export default _default;

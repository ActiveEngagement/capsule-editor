declare const _sfc_main: import("vue").DefineComponent<{
    bgAnimation: {
        type: ObjectConstructor;
        default: () => {
            name: string;
            duration: number;
        };
    };
    contentAnimation: {
        type: ObjectConstructor;
        default: () => {
            name: string;
            duration: number;
        };
    };
}, unknown, {
    mounted: boolean;
    isContentShowing: boolean;
    showContent: boolean;
}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    bgAnimation: {
        type: ObjectConstructor;
        default: () => {
            name: string;
            duration: number;
        };
    };
    contentAnimation: {
        type: ObjectConstructor;
        default: () => {
            name: string;
            duration: number;
        };
    };
}>>, {
    bgAnimation: Record<string, any>;
    contentAnimation: Record<string, any>;
}>;
export default _sfc_main;

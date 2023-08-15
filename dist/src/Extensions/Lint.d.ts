import { StateField } from '@codemirror/state';
declare class LintState {
    decorations: any;
    constructor(decorations: any);
    get length(): any;
    get diagnostics(): any;
    map(fn: Function): any;
    iter(fn: Function): void;
    sync(state: any): any;
    static init(diagnostics: any[]): LintState;
}
export default function (parent: any): (StateField<LintState> | import("@codemirror/state").Extension)[];
export {};

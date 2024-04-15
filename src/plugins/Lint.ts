import { Diagnostic, lintGutter, linter } from '@codemirror/lint';
import { StateEffect, StateField } from '@codemirror/state';
import { EditorView, showPanel } from '@codemirror/view';
import { Hint, lint } from 'capsule-lint';
import actions from '../actions';

const setDiagnosticsEffect = StateEffect.define<Diagnostic[]>();

export default function(parent: any) {
    return [
        StateField.define({
            create() {
                //
            },
            update() {
                console.log('update');
                //
            }
        }),
        linter(view => {
            const { doc } = view.state.toJSON();
                
            const diagnostics = lint(doc).map((error: Hint) => {
                const pos = view.state.doc.line(error.line);
                const from  = Math.min(doc.length, pos.from - 1 + error.col);
                const to = Math.min(doc.length, from + error.raw.length);
        
                return {
                    from,
                    to,
                    col: error.col,
                    line: error.line,
                    rule: error.rule,
                    message: error.message,
                    severity: error.type,
                    source: error.rule.id,
                    actions: error.rule.id in actions && actions[
                        error.rule.id as keyof typeof actions
                    ]
                } as Diagnostic;
            });

            view.dispatch({
                effects: setDiagnosticsEffect.of(diagnostics),
            });  
            
            return diagnostics;
        }, {
            delay: 75,
        }),
        lintGutter(),
        showPanel.of(() => {
            return {
                bottom: true,
                dom: parent.$refs.footer.$el
            };
        }),
        EditorView.updateListener.of(view => {   
            if(!parent.$refs.footer) {
                return;
            }

            for(const tr of view.transactions) {
                for(const effect of tr.effects) {
                    if(effect.is(setDiagnosticsEffect)) {
                        parent.$refs.footer.update(effect.value);
                    }
                }
            }

            parent.$refs.footer.activate(view);
        }),
    ];
}
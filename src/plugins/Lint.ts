import type { Action as LintAction } from '@codemirror/lint';
import { Diagnostic, lintGutter, linter } from '@codemirror/lint';
import { StateEffect } from '@codemirror/state';
import { EditorView, showPanel } from '@codemirror/view';
import { lint, type CapsuleRuleset, type Hint } from 'capsule-lint';
import actions from '../actions';

export type Action = LintAction & {
    validate?: (hint: Hint) => boolean
}

const setDiagnosticsEffect = StateEffect.define<Diagnostic[]>();

export default function(parent: any, ruleset?: CapsuleRuleset) {
    return [
        linter(view => {
            const { doc } = view.state.toJSON();
                
            const diagnostics = lint(doc, ruleset).map((error: Hint) => {
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
                    ].filter(action => {
                        if(!action.validate) {
                            return true;
                        }
                        
                        return action.validate(error);
                    })
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
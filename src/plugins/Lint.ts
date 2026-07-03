import type { Action as LintAction } from '@codemirror/lint';
import { Diagnostic, lintGutter, linter, setDiagnosticsEffect } from '@codemirror/lint';
import { EditorView, showPanel } from '@codemirror/view';
import { lint, type CapsuleRuleset, type Hint, type LintOptions } from 'capsule-lint';
import EditorFooter from 'src/EditorFooter.vue';
import actions from '../actions';

export type Action = LintAction & {
    validate?: (hint: Hint) => boolean
}

export default function(footer: typeof EditorFooter, ruleset?: CapsuleRuleset, options?: LintOptions) {
    return [
        linter(view => {
            const doc = view.state.doc.toString();

            return lint(doc, ruleset, options).map((error: Hint) => {
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
                    actions: error.rule.id in actions ? actions[
                        error.rule.id as keyof typeof actions
                    ].filter(action => {
                        if(!action.validate) {
                            return true;
                        }

                        return action.validate(error);
                    }) : []
                } as Diagnostic;
            });
        }, {
            // The lint pass parses the whole document synchronously — hundreds
            // of ms on a large doc — so give typing room to settle before it
            // runs; at 75ms every pause queued a full lint behind the next
            // keystroke or click.
            delay: 400,
        }),
        lintGutter(),
        showPanel.of(() => {
            return {
                bottom: true,
                dom: footer.$el
            };
        }),
        EditorView.updateListener.of(update => {
            if(!footer) {
                return;
            }

            // The linter publishes each pass through the standard
            // setDiagnostics effect; mirror it into the footer. (The lint
            // source used to dispatch a second, private effect for this —
            // a whole extra update cycle per pass.)
            let diagnosticsChanged = false;

            for(const tr of update.transactions) {
                for(const effect of tr.effects) {
                    if(effect.is(setDiagnosticsEffect)) {
                        footer.update(effect.value);
                        diagnosticsChanged = true;
                    }
                }
            }

            // Re-derive the footer's current diagnostic only when the cursor
            // or the diagnostics moved — running it on every update (scroll
            // measures, focus flips) churned the footer's Vue state for nothing.
            if(diagnosticsChanged || update.selectionSet) {
                footer.activate(update.view);
            }
        }),
    ];
}

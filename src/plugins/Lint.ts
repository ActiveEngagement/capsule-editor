import { Diagnostic, linter } from '@codemirror/lint';
import { StateEffect, StateField } from '@codemirror/state';
import { Decoration, EditorView, WidgetType, showPanel } from '@codemirror/view';
import { lint } from 'capsule-lint';
import actions from '../actions';

class DiagnosticWidget extends WidgetType {
    constructor(
        public diagnostic: any
    ) {
        super();

        this.diagnostic = diagnostic;
    }
    line(number: number) {
        this.diagnostic.line = number;
    }
    col(number: number) {
        this.diagnostic.col = number;
    }
    from(number: number) {
        this.diagnostic.from = number;
    }
    to(number: number) {
        this.diagnostic.to = number;
    }
    eq(other: any) {
        return other.diagnostic == this.diagnostic;
    }
    toDOM() {
        return document.createElement('span');
    }
    ignoreEvent() {
        return false; 
    }
}

class LintState {
    constructor(
        public decorations: any
    ) {
        this.decorations = decorations;
    }
    get length() {
        return this.decorations.length;
    }
    get diagnostics() {
        const items: any[] = [];
        
        this.iter((iter: any) => {
            items.push(iter.value);
        });

        return items.reduce((carry, { widget }) => {
            if(carry.indexOf(widget.diagnostic) === -1) {
                carry.push(widget.diagnostic);
            }

            return carry;
        }, []);
    }
    map(fn: Function) {
        return this.decorations.map(fn);
    }
    iter(fn: Function) {
        const iter = this.decorations.iter();
        
        while(iter.value) {
            fn(iter);
            
            iter.next();
        }
    }
    sync(state: any) {
        const items: any[] = [];

        this.iter((iter: any) => {
            if(!iter.value.spec.side) {
                const line = state.doc.lineAt(iter.from);
                
                iter.value.widget.col(iter.from - line.from + 1);
                iter.value.widget.from(iter.from);
                iter.value.widget.line(line.number);
            }
            else {
                iter.value.widget.to(iter.to);
            }

            items.push(iter.value);
        });

        return items.reduce((carry, { widget }) => {
            if(carry.indexOf(widget.diagnostic) === -1) {
                carry.push(widget.diagnostic);
            }

            return carry;
        }, []);
    }
    static init(diagnostics: any[]) {
        const mapped = diagnostics.map(diagnostic => {
            const from = Decoration.widget({
                widget: new DiagnosticWidget(diagnostic),
                diagnostic,
                side: 0,
            }).range(diagnostic.from);

            const to = Decoration.widget({
                widget: new DiagnosticWidget(diagnostic),
                diagnostic,
                side: 1,
                from,
            }).range(diagnostic.to);

            return [
                from,
                to
            ];
        });

        return new LintState(
            Decoration.set(mapped.flat(), true)
        );
    }
}

const setDiagnosticsEffect = StateEffect.define<Diagnostic[]>();

const lintState = StateField.define({
    create() {
        return new LintState(Decoration.none);
    },
    update(value, tr: any) {
        if(tr.docChanged && value.length) {
            return new LintState(value.map(tr.changes));
        }

        for(const effect of tr.effects) {
            if(effect.is(setDiagnosticsEffect)) {
                return LintState.init(effect.value);
            }
        }

        return value;
    },
    provide(field) {
        return [
            linter(view => {
                const { doc } = view.state.toJSON();
                    
                const diagnostics = lint(doc).map((error: any) => {
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
                    effects: setDiagnosticsEffect.of(diagnostics)
                });
            
                return diagnostics;
            }),
            EditorView.decorations.from(field, state => state.decorations),
            EditorView.updateListener.of(event => {
                if(event.docChanged) {
                    event.state.field(lintState).sync(event.view.state);
                }
            })
        ];
    }
});

export default function(parent: any) {
    return [
        lintState,
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
                 
            if(view.docChanged) {
                parent.$refs.footer.update(
                    view.state.field(lintState).diagnostics
                );
            }

            for(const tr of view.transactions) {
                for(const effect of tr.effects) {
                    if(effect.is(setDiagnosticsEffect)) {
                        parent.$refs.footer.update(
                            view.state.field(lintState).diagnostics
                        );
                    }
                }
            }

            parent.$refs.footer.activate(view);
        }),
    ];
}
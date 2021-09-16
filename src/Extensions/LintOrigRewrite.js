import { linter, lintKeymap } from "@codemirror/lint";
import { showPanel } from "@codemirror/panel"
import { combineConfig, Facet, StateEffect, StateField } from "@codemirror/state";
import { Decoration, EditorView, ViewPlugin, WidgetType } from "@codemirror/view";
import { lint } from 'capsule-lint';

// Override the default keymaps
lintKeymap[0].run = () => {
    // Ignore the command
};

const updateDiagnosticState = StateEffect.define();

const detectLintDiagnostics = StateField.define({
    create() {
        return {
            diagnostics: []
        };
    },
    update(field, tr) {
        for(let effect of tr.effects) {
            if(effect.is(updateDiagnosticState)) {
                return effect.value;
            }
        }
        
        return field;
    }
});

function handler(view) {
    const { doc } = view.state.toJSON();

    const diagnostics = lint(doc).map(error => {
        const pos = view.state.doc.line(error.line);
        const from  = Math.min(doc.length, pos.from - 1 + error.col);
        const to = Math.min(doc.length, from + error.raw.length);

        return {
            from,
            to,
            line: error.line,
            rule: error.rule,
            message: error.message,
            severity: error.type,
            source: error.rule.id,
        }
    });

    view.dispatch({
        effects: updateDiagnosticState.of({
            diagnostics
        })
    });

    return diagnostics;
}

function helpPanel(parent) {
    return [
        ViewPlugin.fromClass(class {
            constructor(view) {
                parent.$refs.footer.view = view;
                parent.$refs.footer.$on('goto', ({ from, to }) => {
                    const tr = view.state.update({
                        selection: {
                            anchor: from,
                            head: to
                        },
                        scrollIntoView: true
                    });

                    view.dispatch(tr);
                    view.focus();
                });
            }
        }),
        EditorView.updateListener.of(view => {
            parent.$refs.footer.update(view, view.state.field(detectLintDiagnostics));
        }),
        showPanel.of(view => {
            return {
                bottom: true,
                dom: parent.$refs.footer.$el
            };
        })
    ];
}

class FixButtonWidget extends WidgetType {
    constructor(diagnostic) {
        super();
    
        this.diagnostic = diagnostic;
    }

    eq(other) {
        return other.from === this.diagnostic.from
            && other.to === this.diagnostic.to
            && other.source === this.diagnostic.source;
    }

    toDOM() {
        let wrap = document.createElement("span");

        wrap.setAttribute("aria-hidden", "true");
        wrap.innerHTML = 'test';
        
        return wrap;
    }

    ignoreEvent() { return false }
}

function diagnostics(view) {
    const diagnostics = view.state.field(detectLintDiagnostics).diagnostics.filter(diagnostic => {
        for(let { from, to } of view.visibleRanges) {
            if(diagnostic.from >= from && diagnostic.to <= to) {
                return true;
            }
        }

        return false;
    });

    return Decoration.set(diagnostics.map(diagnostic => {
        const deco = Decoration.widget({
            widget: new FixButtonWidget(diagnostic),
            diagnostic,
            side: 1
        });

        return deco.range(diagnostic.from);
    }));
}

const fixButtonPlugin = ViewPlugin.fromClass(class {
    constructor(view) {
        this.decorations = diagnostics(view);
    }

    update(update) {
        if(!update.docChanged || !update.viewportChanged) {

            // this.decorations = diagnostics(update.view);
        }
    }
}, {
    decorations: v => v.decorations
});

export default function(parent) {
    return [
        detectLintDiagnostics,
        linter(handler),
        helpPanel(parent),
        fixButtonPlugin
    ];
}
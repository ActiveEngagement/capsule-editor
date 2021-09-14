import { linter } from "@codemirror/lint";
import { showPanel } from "@codemirror/panel"
import { combineConfig, Facet, StateEffect, StateField } from "@codemirror/state";
import { EditorView, ViewPlugin } from "@codemirror/view";
import { lint } from 'capsule-lint';

const detectLintErrorsFacet = Facet.define({
    combine(configs) {
        return combineConfig(configs, {
            // Default config values go here
        });
    }
});

const updateErrorState = StateEffect.define();

const detectLintErrors = StateField.define({
    create() {
        return {
            errors: []
        };
    },
    update(field, tr) {
        for(let effect of tr.effects) {
            if(effect.is(updateErrorState)) {
                return effect.value;
            }
        }
        
        return field;
    }
});

function handler(view) {
    const { doc } = view.state.toJSON();

    const errors = lint(doc).map(error => {
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
        effects: updateErrorState.of({
            errors
        })
    });

    return errors;
}

function helpPanel(parent) {
    let component, dom = document.createElement('div');
    
    return [
        ViewPlugin.fromClass(class {
            constructor(view) {
                const el = document.createElement('div');

                component = new parent.footer({
                    parent,
                    propsData: {
                        view
                    }
                });

                component.$slots['before-save-button'] = parent.$slots['before-save-button'];
                component.$slots['save-button'] = parent.$slots['save-button'];
                component.$slots['after-save-button'] = parent.$slots['after-save-button'];
            
                component.$on('goto', ({ from, to }) => {
                    const tr = view.state.update({
                        selection: {anchor: from, head: to},
                        scrollIntoView: true
                    });

                    view.dispatch(tr);
                    view.focus();
                }); 

                component.$on('save', () => parent.save(parent));
                component.$mount(el);

                dom.appendChild(component.$el);
            }
        }, {
            provide() {
                return [];
            }
        }),
        EditorView.updateListener.of(view => {
            component.update(view, view.state.field(detectLintErrors));
        }),
        showPanel.of(view => {
            return {
                bottom: true,
                dom
            };
        })
    ];
}

export default function(parent, config = {}) {
    return [
        detectLintErrorsFacet.of(config || {}),
        detectLintErrors,
        linter(handler),
        helpPanel(parent)
    ];
}
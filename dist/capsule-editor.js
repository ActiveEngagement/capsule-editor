import { EditorState as j, basicSetup as q } from "@codemirror/basic-setup";
import { indentWithTab as N } from "@codemirror/commands";
import { html as G } from "@codemirror/lang-html";
import { StateEffect as U, StateField as Q, EditorSelection as B } from "@codemirror/state";
import { oneDark as H } from "@codemirror/theme-one-dark";
import { Decoration as _, EditorView as b, WidgetType as J, ViewPlugin as K, keymap as Y } from "@codemirror/view";
import { Btn as M } from "@vue-interface/btn";
import { defineComponent as k, resolveComponent as a, openBlock as s, createElementBlock as f, createElementVNode as d, toDisplayString as v, createTextVNode as F, createVNode as m, normalizeStyle as X, withCtx as l, createCommentVNode as u, createBlock as g, renderSlot as c, Fragment as L, renderList as Z, mergeProps as x, normalizeProps as ee, guardReactiveProps as te, withDirectives as oe, vModelText as ne } from "vue";
import { forceLinting as ie, lintKeymap as se, linter as re } from "@codemirror/lint";
import { ArrowTopRightOnSquareIcon as ae, ChevronLeftIcon as le, ChevronRightIcon as de, BugAntIcon as ce, ExclamationTriangleIcon as ue, WrenchScrewdriverIcon as fe, QuestionMarkCircleIcon as me } from "@heroicons/vue/24/outline";
import { AnimateCss as O } from "@vue-interface/animate-css";
import { BtnDropdown as he } from "@vue-interface/btn-dropdown";
import { showPanel as T } from "@codemirror/panel";
import { lint as pe } from "capsule-lint";
const ge = k({
  components: {
    ArrowTopRightOnSquareIcon: ae
  },
  props: {
    error: {
      type: Object,
      required: !0
    }
  },
  computed: {
    url() {
      return this.error.rule.link;
    }
  }
});
const D = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, i] of t)
    n[o] = i;
  return n;
}, ve = { class: "capsule-editor-error" }, $e = ["href"];
function we(e, t, n, o, i, p) {
  const r = a("ArrowTopRightOnSquareIcon");
  return s(), f("div", ve, [
    d("code", null, [
      d("span", null, v(e.error.line) + "," + v(e.error.col) + " :: (" + v(e.error.rule.id) + ") " + v(e.error.message), 1),
      d("a", {
        href: e.url,
        target: "_blank"
      }, [
        F(" Reference "),
        m(r)
      ], 8, $e)
    ])
  ]);
}
const be = /* @__PURE__ */ D(ge, [["render", we]]), ye = k({
  components: {
    AnimateCss: O,
    Btn: M,
    BtnDropdown: he,
    ChevronLeftIcon: le,
    ChevronRightIcon: de,
    EditorError: be,
    BugAntIcon: ce,
    ExclamationTriangleIcon: ue,
    WrenchScrewdriverIcon: fe
  },
  props: {
    saveButton: {
      type: Boolean,
      default: !0
    },
    saveButtonLabel: {
      type: String,
      default: "Save File"
    },
    view: {
      type: Object,
      default: void 0
    }
  },
  emits: [
    "goto",
    "update:modelValue",
    "save"
  ],
  data() {
    return {
      currentDiagnostic: void 0,
      direction: "up",
      diagnostics: [],
      fixedAllDiagnostics: !1,
      hasLinted: !1,
      showFooter: !1,
      showFooterContent: !1
    };
  },
  computed: {
    actions() {
      return this.currentDiagnostic ? [].concat(this.currentDiagnostic.rule.actions).reverse().filter(({ validate: e }) => !e || e(this.view, this.currentDiagnostic)) : [];
    },
    index() {
      return Math.max(0, this.diagnostics.indexOf(this.currentDiagnostic));
    },
    totalDiagnostics() {
      return this.diagnostics.length;
    }
  },
  watch: {
    currentDiagnostic(e, t) {
      this.direction = this.index > this.diagnostics.indexOf(t) ? "down" : "up";
    },
    diagnostics(e, t) {
      e.length ? (this.hasLinted = !0, this.fixedAllDiagnostics = !1) : !e.length && t.length ? (this.hasLinted = !0, this.currentDiagnostic = null, this.fixedAllDiagnostics = !0) : e.length || (this.fixedAllDiagnostics = !0);
    }
  },
  updated() {
    !this.isEmpty() && this.hasLinted && (this.saveButton || !this.saveButton && this.diagnostics.length) ? (this.showFooter = !0, setTimeout(() => this.showFooterContent = !0, 200)) : (this.showFooterContent = !1, setTimeout(() => this.showFooter = !1, 200));
  },
  methods: {
    findActiveDiagnostic() {
      return this.diagnostics.filter((e) => e.isActive).pop();
    },
    goto(e) {
      e < 0 ? e = this.diagnostics.length - 1 : e > this.diagnostics.length - 1 && (e = 0);
      const t = this.currentDiagnostic;
      this.currentDiagnostic = this.diagnostics[e], this.$emit("goto", this.currentDiagnostic, t);
    },
    isEmpty() {
      return this.view ? this.view.state.doc.toString() === "" : !1;
    },
    compare(e, t) {
      return !!e && !!t && e.from === t.from && e.to === t.to && e.rule.id === t.rule.id;
    },
    update(e) {
      this.diagnostics = e || [], this.hasLinted = !0, this.currentDiagnostic || (this.currentDiagnostic = this.diagnostics[this.index]), this.$emit("update:modelValue", this.diagnostics);
    },
    activate(e) {
      const { from: t, to: n } = e.state.selection.main, o = this.diagnostics.filter((r) => t === n ? r.from <= t && r.to >= n : r.from >= t && r.to <= n), i = this.diagnostics.find((r) => this.compare(r, this.currentDiagnostic)), p = Math.max(0, o.indexOf(this.currentDiagnostic));
      o.length ? this.currentDiagnostic = o[p] : this.currentDiagnostic = i || this.diagnostics[this.index];
    },
    onClickAction(e, t) {
      t.apply(this.view, e.from, e.to), ie(this.view);
    }
  }
});
const Ce = {
  key: 0,
  class: "flex justify-between items-center w-full py-2"
}, ke = { class: "flex items-center w-full overflow-hidden relative gap-2" }, De = { class: "editor-footer-pager" }, _e = { key: 0 }, Se = { class: "editor-footer-diagnostic" }, Fe = { class: "editor-footer-action" }, Ee = ["onClick"];
function Be(e, t, n, o, i, p) {
  const r = a("ChevronLeftIcon"), h = a("btn"), $ = a("ChevronRightIcon"), E = a("BugAntIcon"), w = a("ExclamationTriangleIcon"), P = a("editor-error"), A = a("animate-css"), R = a("WrenchScrewdriverIcon"), z = a("btn-dropdown");
  return s(), f("footer", {
    class: "editor-footer",
    style: X({ minHeight: e.showFooter ? void 0 : 0 })
  }, [
    m(A, {
      name: "fade",
      duration: 200
    }, {
      default: l(() => [
        e.showFooterContent ? (s(), f("div", Ce, [
          d("div", ke, [
            d("div", De, [
              e.totalDiagnostics ? (s(), f("div", _e, [
                m(h, {
                  type: "button",
                  variant: "link",
                  onClick: t[0] || (t[0] = (y) => e.goto(e.index - 1))
                }, {
                  default: l(() => [
                    m(r, { class: "w-4 h-4" })
                  ]),
                  _: 1
                }),
                d("span", null, v(e.index + 1) + " of " + v(e.diagnostics.length), 1),
                m(h, {
                  type: "button",
                  variant: "link",
                  onClick: t[1] || (t[1] = (y) => e.goto(e.index + 1))
                }, {
                  default: l(() => [
                    m($, { class: "w-4 h-4" })
                  ]),
                  _: 1
                })
              ])) : u("", !0)
            ]),
            e.currentDiagnostic ? (s(), f("button", {
              key: 0,
              type: "button",
              onClick: t[2] || (t[2] = (y) => e.goto(e.index))
            }, [
              e.currentDiagnostic.severity === "error" ? (s(), g(E, {
                key: 0,
                class: "w-6 h-6"
              })) : u("", !0),
              e.currentDiagnostic.severity === "warning" ? (s(), g(w, {
                key: 1,
                class: "w-6 h-6"
              })) : u("", !0)
            ])) : u("", !0),
            d("div", Se, [
              m(A, {
                name: "fade",
                duration: 200,
                direction: e.direction,
                "leave-active-class": "position-absolute"
              }, {
                default: l(() => [
                  e.currentDiagnostic ? (s(), g(P, {
                    key: e.index,
                    error: e.currentDiagnostic
                  }, null, 8, ["error"])) : u("", !0)
                ]),
                _: 1
              }, 8, ["direction"])
            ])
          ]),
          d("div", Fe, [
            c(e.$slots, "before-save-button"),
            c(e.$slots, "action-button", {}, () => [
              e.actions.length ? (s(), f(L, { key: 0 }, [
                e.actions.length === 1 ? (s(), g(h, {
                  key: 0,
                  type: "button",
                  variant: "light",
                  size: "sm",
                  class: "flex items-center gap-2",
                  onClick: t[3] || (t[3] = () => e.onClickAction(e.currentDiagnostic, e.actions[0]))
                }, {
                  default: l(() => [
                    m(R, { class: "w-6 h-6" }),
                    F(" " + v(e.actions[0].name), 1)
                  ]),
                  _: 1
                })) : (s(), g(z, {
                  key: 1,
                  label: "Fix Errors",
                  type: "button",
                  size: "sm",
                  variant: "light",
                  dropup: ""
                }, {
                  default: l(() => [
                    (s(!0), f(L, null, Z(e.actions, (y, W) => (s(), f("button", {
                      key: `${e.currentDiagnostic.rule.id}-${W}`,
                      type: "button",
                      variant: "light",
                      onClick: () => e.onClickAction(e.currentDiagnostic, y)
                    }, v(y.name), 9, Ee))), 128))
                  ]),
                  _: 1
                }))
              ], 64)) : u("", !0)
            ]),
            c(e.$slots, "save-button", {
              diagnostics: e.diagnostics,
              saveButtonLabel: e.diagnostics
            }, () => [
              e.saveButton && !e.diagnostics.length ? (s(), g(h, {
                key: 0,
                type: "button",
                variant: "light",
                size: "sm",
                onClick: t[4] || (t[4] = (y) => e.$emit("save"))
              }, {
                default: l(() => [
                  F(v(e.saveButtonLabel), 1)
                ]),
                _: 1
              })) : u("", !0)
            ]),
            c(e.$slots, "after-save-button", { diagnostics: e.diagnostics })
          ])
        ])) : u("", !0)
      ]),
      _: 3
    })
  ], 4);
}
const Ie = /* @__PURE__ */ D(ye, [["render", Be]]), Me = k({
  components: {
    AnimateCss: O
  },
  props: {
    bgAnimation: {
      type: Object,
      default: () => ({
        name: "fade",
        duration: 500
      })
    },
    contentAnimation: {
      type: Object,
      default: () => ({
        name: "fade",
        duration: 500
      })
    }
  },
  data: () => ({
    mounted: !1,
    isContentShowing: !1,
    showContent: !1
  }),
  watch: {
    showContent(e) {
      e && this.$nextTick(() => {
        this.isContentShowing = !0;
      });
    }
  },
  mounted() {
    this.mounted = !0;
  }
});
const Ae = {
  key: 0,
  class: "capsule-editor-modal"
}, Le = {
  key: 0,
  class: "capsule-editor-modal-content"
};
function Ve(e, t, n, o, i, p) {
  const r = a("animate-css");
  return s(), g(r, x(e.bgAnimation, {
    onAfterEnter: t[0] || (t[0] = (h) => e.showContent = !0)
  }), {
    default: l(() => [
      e.mounted ? (s(), f("div", Ae, [
        m(r, ee(te(e.contentAnimation)), {
          default: l(() => [
            e.showContent ? (s(), f("div", Le, [
              c(e.$slots, "default", { isShowing: e.isContentShowing })
            ])) : u("", !0)
          ]),
          _: 3
        }, 16)
      ])) : u("", !0)
    ]),
    _: 3
  }, 16);
}
const Oe = /* @__PURE__ */ D(Me, [["render", Ve]]), Te = k({
  components: {
    Btn: M,
    QuestionMarkCircleIcon: me
  },
  model: {
    prop: "currentValue"
  },
  props: {
    demoMode: Boolean,
    disableFilename: Boolean,
    filename: {
      type: String,
      default: void 0
    }
  },
  emits: [
    "demo-modal",
    "update:filename"
  ],
  data() {
    return {
      currentValue: this.filename
    };
  }
});
const Pe = { class: "editor-toolbar" }, Re = { class: "editor-toolbar-left" }, ze = { class: "editor-toolbar-title" }, We = ["disabled"], je = { class: "editor-toolbar-right" };
function qe(e, t, n, o, i, p) {
  const r = a("QuestionMarkCircleIcon"), h = a("btn");
  return s(), f("div", Pe, [
    d("div", Re, [
      c(e.$slots, "left")
    ]),
    d("div", ze, [
      oe(d("input", {
        "onUpdate:modelValue": t[0] || (t[0] = ($) => e.currentValue = $),
        type: "text",
        placeholder: "Untitled Document",
        disabled: e.disableFilename,
        onInput: t[1] || (t[1] = ($) => e.$emit("update:filename", $.target.value))
      }, null, 40, We), [
        [ne, e.currentValue]
      ])
    ]),
    d("div", je, [
      c(e.$slots, "right", {}, () => [
        e.demoMode ? (s(), g(h, {
          key: 0,
          size: "sm",
          variant: "link",
          class: "editor-help",
          onClick: t[2] || (t[2] = ($) => e.$emit("demo-modal"))
        }, {
          default: l(() => [
            m(r, { class: "w-4 h-4" })
          ]),
          _: 1
        })) : u("", !0)
      ])
    ])
  ]);
}
const Ne = /* @__PURE__ */ D(Te, [["render", qe]]);
se[0].run = () => {
};
class V extends J {
  constructor(t) {
    super(), this.diagnostic = t, this.diagnostic = t;
  }
  line(t) {
    this.diagnostic.line = t;
  }
  col(t) {
    this.diagnostic.col = t;
  }
  from(t) {
    this.diagnostic.from = t;
  }
  to(t) {
    this.diagnostic.to = t;
  }
  eq(t) {
    return t.diagnostic == this.diagnostic;
  }
  toDOM() {
    return document.createElement("span");
  }
  ignoreEvent() {
    return !1;
  }
}
class C {
  constructor(t) {
    this.decorations = t, this.decorations = t;
  }
  get length() {
    return this.decorations.length;
  }
  get diagnostics() {
    const t = [];
    return this.iter((n) => {
      t.push(n.value);
    }), t.reduce((n, { widget: o }) => (n.indexOf(o.diagnostic) === -1 && n.push(o.diagnostic), n), []);
  }
  map(t) {
    return this.decorations.map(t);
  }
  iter(t) {
    const n = this.decorations.iter();
    for (; n.value; )
      t(n), n.next();
  }
  sync(t) {
    const n = [];
    return this.iter((o) => {
      if (o.value.spec.side)
        o.value.widget.to(o.to);
      else {
        const i = t.doc.lineAt(o.from);
        o.value.widget.col(o.from - i.from + 1), o.value.widget.from(o.from), o.value.widget.line(i.number);
      }
      n.push(o.value);
    }), n.reduce((o, { widget: i }) => (o.indexOf(i.diagnostic) === -1 && o.push(i.diagnostic), o), []);
  }
  static init(t) {
    const n = t.map((o) => {
      const i = _.widget({
        widget: new V(o),
        diagnostic: o,
        side: 0
      }).range(o.from), p = _.widget({
        widget: new V(o),
        diagnostic: o,
        side: 1,
        from: i
      }).range(o.to);
      return [
        i,
        p
      ];
    });
    return new C(
      _.set(n.flat(), !0)
    );
  }
}
const I = U.define(), S = Q.define({
  create() {
    return new C(_.none);
  },
  update(e, t) {
    if (t.docChanged && e.length)
      return new C(e.map(t.changes));
    for (const n of t.effects)
      if (n.is(I))
        return C.init(n.value);
    return e;
  },
  provide(e) {
    return [
      re((t) => {
        const { doc: n } = t.state.toJSON(), o = pe(n).map((i) => {
          const p = t.state.doc.line(i.line), r = Math.min(n.length, p.from - 1 + i.col), h = Math.min(n.length, r + i.raw.length);
          return {
            from: r,
            to: h,
            col: i.col,
            line: i.line,
            rule: i.rule,
            message: i.message,
            severity: i.type,
            source: i.rule.id
          };
        });
        return t.dispatch({
          effects: I.of(o)
        }), o;
      }),
      b.decorations.from(e, (t) => t.decorations),
      b.updateListener.of((t) => {
        t.docChanged && t.state.field(S).sync(t.view.state);
      })
    ];
  }
});
function Ge(e) {
  return [
    S,
    T.of(() => ({
      bottom: !0,
      dom: e.$refs.footer.$el
    })),
    b.updateListener.of((t) => {
      if (e.$refs.footer) {
        t.docChanged && e.$refs.footer.update(
          t.state.field(S).diagnostics
        );
        for (const n of t.transactions)
          for (const o of n.effects)
            o.is(I) && e.$refs.footer.update(
              t.state.field(S).diagnostics
            );
        e.$refs.footer.activate(t);
      }
    })
  ];
}
function Ue(e) {
  return [
    K.fromClass(class {
      constructor(t) {
        e.currentContent = t.state.doc.toString();
      }
    }),
    b.updateListener.of((t) => {
      t.docChanged && (e.currentContent = t.state.doc.toString());
    }),
    T.of(() => ({
      top: !0,
      dom: e.$refs.toolbar.$el
    }))
  ];
}
const Qe = k({
  components: {
    Btn: M,
    EditorFooter: Ie,
    EditorModal: Oe,
    EditorToolbar: Ne
  },
  // model: {
  //     prop: 'content'
  // },
  props: {
    content: {
      type: String,
      default: void 0
    },
    demoMode: {
      type: Boolean,
      default: !1
    },
    disableFilename: Boolean,
    filename: {
      type: String,
      default: null
    },
    save: {
      type: Function,
      default() {
        return this.showFinishModal = !0;
      }
    },
    saveButton: {
      type: Boolean,
      default: !0
    },
    skipIntro: {
      type: Boolean,
      default: !1
    },
    title: {
      type: String,
      default: void 0
    },
    toolbar: {
      type: Boolean,
      default: !0
    }
  },
  emits: [
    "demo-complete",
    "fixed-errors",
    "update:content",
    "update:filename"
  ],
  data() {
    return {
      demoModalCleared: this.skipIntro,
      errors: [],
      hasDismissedFinishPopup: !1,
      showFinishModal: !1,
      view: void 0
    };
  },
  watch: {
    errors(e, t) {
      !e.length && t.length && this.$emit("fixed-errors");
    }
  },
  mounted() {
    this.view = new b({
      state: j.create({
        doc: this.content,
        // || this.getSlotContents(),
        extensions: [
          H,
          ...q,
          Y.of([N]),
          G(),
          this.toolbar && Ue(this),
          Ge(this),
          b.lineWrapping,
          b.updateListener.of((e) => {
            e.docChanged && this.$emit("update:content", e.state.doc.toString());
          })
        ].filter((e) => !!e)
      }),
      parent: this.$refs.wrapper
    });
  },
  methods: {
    closeFinishPopup() {
      this.showFinishModal = !1, this.hasDismissedFinishPopup = !0;
    },
    onModalClear() {
      this.demoModalCleared = !0, this.$emit("demo-complete"), this.view.focus();
    },
    onGoto({ from: e, to: t }) {
      this.view.dispatch({
        selection: B.create([
          B.range(e, t),
          B.cursor(e)
        ]),
        scrollIntoView: !0
      }), this.view.focus();
    },
    onSave() {
      this.save(this);
    }
  }
});
const He = { class: "capsule-editor" }, Je = { class: "text-center" }, Ke = /* @__PURE__ */ d("h1", null, " Success! ", -1), Ye = /* @__PURE__ */ d("h5", null, " Your document has been fixed. ", -1), Xe = {
  ref: "wrapper",
  class: "cm-wrapper"
};
function Ze(e, t, n, o, i, p) {
  const r = a("btn"), h = a("editor-modal"), $ = a("editor-toolbar"), E = a("editor-footer");
  return s(), f("div", He, [
    e.showFinishModal ? (s(), g(h, {
      key: 0,
      "content-animation": { name: "tada" }
    }, {
      default: l(({ isShowing: w }) => [
        c(e.$slots, "success", {
          close: e.closeFinishPopup,
          filename: e.filename,
          view: e.view,
          isShowing: w
        }, () => [
          c(e.$slots, "success-content", {
            content: e.content,
            close: e.closeFinishPopup,
            filename: e.filename,
            view: e.view
          }, () => [
            d("div", Je, [
              Ke,
              Ye,
              m(r, {
                type: "button",
                variant: "primary",
                size: "lg",
                block: "",
                onClick: e.closeFinishPopup
              }, {
                default: l(() => [
                  F(" Dismiss ")
                ]),
                _: 1
              }, 8, ["onClick"])
            ])
          ])
        ])
      ]),
      _: 3
    })) : u("", !0),
    e.toolbar ? (s(), g($, {
      key: 1,
      ref: "toolbar",
      "demo-mode": e.demoMode,
      "disable-filename": e.disableFilename,
      filename: e.filename,
      onDemoModal: t[0] || (t[0] = () => e.demoModalCleared = !1),
      "onUpdate:filename": t[1] || (t[1] = (w) => e.$emit("update:filename", w))
    }, {
      left: l(() => [
        c(e.$slots, "toolbar-left", {
          errors: e.errors,
          filename: e.filename,
          content: e.content
        })
      ]),
      right: l(() => [
        c(e.$slots, "toolbar-right", {
          errors: e.errors,
          filename: e.filename,
          content: e.content
        })
      ]),
      _: 3
    }, 8, ["demo-mode", "disable-filename", "filename"])) : u("", !0),
    d("div", Xe, null, 512),
    m(E, {
      ref: "footer",
      modelValue: e.errors,
      "onUpdate:modelValue": t[2] || (t[2] = (w) => e.errors = w),
      "save-button": e.saveButton,
      view: e.view,
      onSave: e.onSave,
      onGoto: e.onGoto
    }, {
      "before-save-button": l(() => [
        c(e.$slots, "before-save-button", {
          errors: e.errors,
          filename: e.filename,
          content: e.content
        })
      ]),
      "save-button": l(() => [
        c(e.$slots, "save-button", {
          errors: e.errors,
          filename: e.filename,
          content: e.content
        })
      ]),
      "after-save-button": l(() => [
        c(e.$slots, "after-save-button", {
          errors: e.errors,
          filename: e.filename,
          content: e.content
        })
      ]),
      _: 3
    }, 8, ["modelValue", "save-button", "view", "onSave", "onGoto"])
  ]);
}
const mt = /* @__PURE__ */ D(Qe, [["render", Ze]]);
export {
  mt as Editor
};
//# sourceMappingURL=capsule-editor.js.map

import { EditorState as W, basicSetup as j } from "@codemirror/basic-setup";
import { html as q } from "@codemirror/lang-html";
import { oneDark as N } from "@codemirror/theme-one-dark";
import { Decoration as F, EditorView as b, WidgetType as U, ViewPlugin as Q } from "@codemirror/view";
import { Btn as I } from "@vue-interface/btn";
import { defineComponent as k, resolveComponent as a, openBlock as s, createElementBlock as f, createElementVNode as d, toDisplayString as v, createTextVNode as S, createVNode as m, normalizeStyle as H, withCtx as l, createCommentVNode as c, createBlock as g, renderSlot as u, Fragment as V, renderList as J, mergeProps as K, normalizeProps as Y, guardReactiveProps as G, withDirectives as X, vModelText as Z } from "vue";
import { forceLinting as x, lintKeymap as ee, linter as te } from "@codemirror/lint";
import { ArrowTopRightOnSquareIcon as oe, ChevronLeftIcon as ne, ChevronRightIcon as ie, BugAntIcon as se, ExclamationTriangleIcon as re, WrenchScrewdriverIcon as ae, QuestionMarkCircleIcon as le } from "@heroicons/vue/24/outline";
import { AnimateCss as L } from "@vue-interface/animate-css";
import { BtnDropdown as de } from "@vue-interface/btn-dropdown";
import { showPanel as O } from "@codemirror/panel";
import { StateEffect as ue, StateField as ce } from "@codemirror/state";
import { lint as fe } from "capsule-lint";
const me = k({
  components: {
    ArrowTopRightOnSquareIcon: oe
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
}, he = { class: "capsule-editor-error" }, pe = ["href"];
function ge(e, t, n, o, i, p) {
  const r = a("ArrowTopRightOnSquareIcon");
  return s(), f("div", he, [
    d("code", null, [
      d("span", null, v(e.error.line) + "," + v(e.error.col) + " :: (" + v(e.error.rule.id) + ") " + v(e.error.message), 1),
      d("a", {
        href: e.url,
        target: "_blank"
      }, [
        S(" Reference "),
        m(r)
      ], 8, pe)
    ])
  ]);
}
const ve = /* @__PURE__ */ D(me, [["render", ge]]), $e = k({
  components: {
    AnimateCss: L,
    Btn: I,
    BtnDropdown: de,
    ChevronLeftIcon: ne,
    ChevronRightIcon: ie,
    EditorError: ve,
    BugAntIcon: se,
    ExclamationTriangleIcon: re,
    WrenchScrewdriverIcon: ae
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
      t.apply(this.view, e.from, e.to), x(this.view);
    }
  }
});
const we = {
  key: 0,
  class: "flex justify-between items-center w-full py-2"
}, be = { class: "flex items-center w-full overflow-hidden relative gap-2" }, ye = { class: "editor-footer-pager" }, Ce = { key: 0 }, ke = { class: "editor-footer-diagnostic" }, De = { class: "editor-footer-action" }, Fe = ["onClick"];
function _e(e, t, n, o, i, p) {
  const r = a("ChevronLeftIcon"), h = a("btn"), $ = a("ChevronRightIcon"), E = a("BugAntIcon"), w = a("ExclamationTriangleIcon"), T = a("editor-error"), M = a("animate-css"), P = a("WrenchScrewdriverIcon"), R = a("btn-dropdown");
  return s(), f("footer", {
    class: "editor-footer",
    style: H({ minHeight: e.showFooter ? void 0 : 0 })
  }, [
    m(M, {
      name: "fade",
      duration: 200
    }, {
      default: l(() => [
        e.showFooterContent ? (s(), f("div", we, [
          d("div", be, [
            d("div", ye, [
              e.totalDiagnostics ? (s(), f("div", Ce, [
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
              ])) : c("", !0)
            ]),
            e.currentDiagnostic ? (s(), f("button", {
              key: 0,
              type: "button",
              onClick: t[2] || (t[2] = (y) => e.goto(e.index))
            }, [
              e.currentDiagnostic.severity === "error" ? (s(), g(E, {
                key: 0,
                class: "w-6 h-6"
              })) : c("", !0),
              e.currentDiagnostic.severity === "warning" ? (s(), g(w, {
                key: 1,
                class: "w-6 h-6"
              })) : c("", !0)
            ])) : c("", !0),
            d("div", ke, [
              m(M, {
                name: "fade",
                duration: 200,
                direction: e.direction,
                "leave-active-class": "position-absolute"
              }, {
                default: l(() => [
                  e.currentDiagnostic ? (s(), g(T, {
                    key: e.index,
                    error: e.currentDiagnostic
                  }, null, 8, ["error"])) : c("", !0)
                ]),
                _: 1
              }, 8, ["direction"])
            ])
          ]),
          d("div", De, [
            u(e.$slots, "before-save-button"),
            u(e.$slots, "action-button", {}, () => [
              e.actions.length ? (s(), f(V, { key: 0 }, [
                e.actions.length === 1 ? (s(), g(h, {
                  key: 0,
                  type: "button",
                  variant: "light",
                  size: "sm",
                  class: "flex items-center gap-2",
                  onClick: t[3] || (t[3] = () => e.onClickAction(e.currentDiagnostic, e.actions[0]))
                }, {
                  default: l(() => [
                    m(P, { class: "w-6 h-6" }),
                    S(" " + v(e.actions[0].name), 1)
                  ]),
                  _: 1
                })) : (s(), g(R, {
                  key: 1,
                  label: "Fix Errors",
                  type: "button",
                  size: "sm",
                  variant: "light",
                  dropup: ""
                }, {
                  default: l(() => [
                    (s(!0), f(V, null, J(e.actions, (y, z) => (s(), f("button", {
                      key: `${e.currentDiagnostic.rule.id}-${z}`,
                      type: "button",
                      variant: "light",
                      onClick: () => e.onClickAction(e.currentDiagnostic, y)
                    }, v(y.name), 9, Fe))), 128))
                  ]),
                  _: 1
                }))
              ], 64)) : c("", !0)
            ]),
            u(e.$slots, "save-button", {
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
                  S(v(e.saveButtonLabel), 1)
                ]),
                _: 1
              })) : c("", !0)
            ]),
            u(e.$slots, "after-save-button", { diagnostics: e.diagnostics })
          ])
        ])) : c("", !0)
      ]),
      _: 3
    })
  ], 4);
}
const Se = /* @__PURE__ */ D($e, [["render", _e]]), Ee = k({
  components: {
    AnimateCss: L
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
const Be = {
  key: 0,
  class: "capsule-editor-modal"
}, Ie = {
  key: 0,
  class: "capsule-editor-modal-content"
};
function Me(e, t, n, o, i, p) {
  const r = a("animate-css");
  return s(), g(r, K(e.bgAnimation, {
    onAfterEnter: t[0] || (t[0] = (h) => e.showContent = !0)
  }), {
    default: l(() => [
      e.mounted ? (s(), f("div", Be, [
        m(r, Y(G(e.contentAnimation)), {
          default: l(() => [
            e.showContent ? (s(), f("div", Ie, [
              u(e.$slots, "default", { isShowing: e.isContentShowing })
            ])) : c("", !0)
          ]),
          _: 3
        }, 16)
      ])) : c("", !0)
    ]),
    _: 3
  }, 16);
}
const Ve = /* @__PURE__ */ D(Ee, [["render", Me]]), Ae = k({
  components: {
    Btn: I,
    QuestionMarkCircleIcon: le
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
    "update:modelValue"
  ],
  data() {
    return {
      currentValue: this.filename
    };
  }
});
const Le = { class: "editor-toolbar" }, Oe = { class: "editor-toolbar-left" }, Te = { class: "editor-toolbar-title" }, Pe = ["disabled"], Re = { class: "editor-toolbar-right" };
function ze(e, t, n, o, i, p) {
  const r = a("QuestionMarkCircleIcon"), h = a("btn");
  return s(), f("div", Le, [
    d("div", Oe, [
      u(e.$slots, "left")
    ]),
    d("div", Te, [
      X(d("input", {
        "onUpdate:modelValue": t[0] || (t[0] = ($) => e.currentValue = $),
        type: "text",
        placeholder: "Untitled Document",
        disabled: e.disableFilename,
        onInput: t[1] || (t[1] = ($) => e.$emit("update:modelValue", $.target.value))
      }, null, 40, Pe), [
        [Z, e.currentValue]
      ])
    ]),
    d("div", Re, [
      u(e.$slots, "right", {}, () => [
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
        })) : c("", !0)
      ])
    ])
  ]);
}
const We = /* @__PURE__ */ D(Ae, [["render", ze]]);
ee[0].run = () => {
};
class A extends U {
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
      const i = F.widget({
        widget: new A(o),
        diagnostic: o,
        side: 0
      }).range(o.from), p = F.widget({
        widget: new A(o),
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
      F.set(n.flat(), !0)
    );
  }
}
const B = ue.define(), _ = ce.define({
  create() {
    return new C(F.none);
  },
  update(e, t) {
    if (t.docChanged && e.length)
      return new C(e.map(t.changes));
    for (const n of t.effects)
      if (n.is(B))
        return C.init(n.value);
    return e;
  },
  provide(e) {
    return [
      te((t) => {
        const { doc: n } = t.state.toJSON(), o = fe(n).map((i) => {
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
          effects: B.of(o)
        }), o;
      }),
      b.decorations.from(e, (t) => t.decorations),
      b.updateListener.of((t) => {
        t.docChanged && t.state.field(_).sync(t.view.state);
      })
    ];
  }
});
function je(e) {
  return [
    _,
    O.of(() => ({
      bottom: !0,
      dom: e.$refs.footer.$el
    })),
    b.updateListener.of((t) => {
      if (e.$refs.footer) {
        t.docChanged && e.$refs.footer.update(
          t.state.field(_).diagnostics
        );
        for (const n of t.transactions)
          for (const o of n.effects)
            o.is(B) && e.$refs.footer.update(
              t.state.field(_).diagnostics
            );
        e.$refs.footer.activate(t);
      }
    })
  ];
}
function qe(e) {
  return [
    Q.fromClass(class {
      constructor(t) {
        e.currentContent = t.state.doc.toString();
      }
    }),
    b.updateListener.of((t) => {
      t.docChanged && (e.currentContent = t.state.doc.toString());
    }),
    O.of(() => ({
      top: !0,
      dom: e.$refs.toolbar.$el
    }))
  ];
}
const Ne = k({
  components: {
    Btn: I,
    EditorFooter: Se,
    EditorModal: Ve,
    EditorToolbar: We
  },
  model: {
    prop: "currentContent"
  },
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
    "update:modelValue"
  ],
  data() {
    return {
      currentContent: this.content,
      currentFilename: this.filename,
      demoModalCleared: this.skipIntro,
      errors: [],
      hasDismissedFinishPopup: !1,
      showFinishModal: !1,
      view: void 0
    };
  },
  watch: {
    currentContent() {
      this.input();
    },
    currentFilename() {
      this.input();
    },
    errors(e, t) {
      !e.length && t.length && this.$emit("fixed-errors");
    }
    // showFinishModal(value) {
    //     if(value) {
    //         setTimeout(() => this.isSuccessModalShowing = true, 1000)
    //     }
    // }
  },
  created() {
  },
  mounted() {
    this.view = new b({
      state: W.create({
        doc: this.currentContent,
        // || this.getSlotContents(),
        extensions: [
          N,
          ...j,
          // keymap.of([ indentWithTab ]),
          q(),
          this.toolbar && qe(this),
          je(this),
          b.lineWrapping,
          b.updateListener.of((e) => {
            e.docChanged && (this.currentContent = e.state.doc.toString());
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
    // getSlotContents() {
    //     return this.$slots.default ? this.$slots.default().filter((vnode: any) => {
    //         return vnode.tag && vnode.tag.toLowerCase() === 'textarea' && !!vnode.children;
    //     }).reduce((carry: any, vnode: any) => {
    //         return (
    //             carry + vnode.children.map((child: any) => {
    //                 return child.text;
    //             }).join('')
    //         );
    //     }, '').trim() : null;
    // },
    input() {
      this.$emit("update:modelValue", {
        content: this.currentContent,
        filename: this.currentFilename
      });
    },
    onModalClear() {
      this.demoModalCleared = !0, this.$emit("demo-complete"), this.view.focus();
    },
    // onGoto({ from, to }) {
    //     console.log(from, to);
    //     // const tr = this.view.state.update({
    //     //     selection: {
    //     //         anchor: from,
    //     //         head: to
    //     //     },
    //     //     scrollIntoView: true
    //     // });
    //     // this.view.dispatch(tr);
    //     // this.view.focus();
    // },
    onSave() {
      this.save(this);
    }
  }
});
const Ue = { class: "capsule-editor" }, Qe = { class: "text-center" }, He = /* @__PURE__ */ d("h1", null, " Success! ", -1), Je = /* @__PURE__ */ d("h5", null, " Your document has been fixed. ", -1), Ke = {
  ref: "wrapper",
  class: "cm-wrapper"
};
function Ye(e, t, n, o, i, p) {
  const r = a("btn"), h = a("editor-modal"), $ = a("editor-toolbar"), E = a("editor-footer");
  return s(), f("div", Ue, [
    e.showFinishModal ? (s(), g(h, {
      key: 0,
      "content-animation": { name: "tada" }
    }, {
      default: l(({ isShowing: w }) => [
        u(e.$slots, "success", {
          close: e.closeFinishPopup,
          filename: e.currentFilename,
          view: e.view,
          isShowing: w
        }, () => [
          u(e.$slots, "success-content", {
            content: e.currentContent,
            close: e.closeFinishPopup,
            filename: e.currentFilename,
            view: e.view
          }, () => [
            d("div", Qe, [
              He,
              Je,
              m(r, {
                type: "button",
                variant: "primary",
                size: "lg",
                block: "",
                onClick: e.closeFinishPopup
              }, {
                default: l(() => [
                  S(" Dismiss ")
                ]),
                _: 1
              }, 8, ["onClick"])
            ])
          ])
        ])
      ]),
      _: 3
    })) : c("", !0),
    e.toolbar ? (s(), g($, {
      key: 1,
      ref: "toolbar",
      modelValue: e.currentFilename,
      "onUpdate:modelValue": t[0] || (t[0] = (w) => e.currentFilename = w),
      "demo-mode": e.demoMode,
      "disable-filename": e.disableFilename,
      filename: e.currentFilename,
      onDemoModal: t[1] || (t[1] = () => e.demoModalCleared = !1)
    }, {
      left: l(() => [
        u(e.$slots, "toolbar-left", {
          errors: e.errors,
          filename: e.currentFilename,
          content: e.currentContent
        })
      ]),
      right: l(() => [
        u(e.$slots, "toolbar-right", {
          errors: e.errors,
          filename: e.currentFilename,
          content: e.currentContent
        })
      ]),
      _: 3
    }, 8, ["modelValue", "demo-mode", "disable-filename", "filename"])) : c("", !0),
    d("div", Ke, null, 512),
    m(E, {
      ref: "footer",
      modelValue: e.errors,
      "onUpdate:modelValue": t[2] || (t[2] = (w) => e.errors = w),
      "save-button": e.saveButton,
      view: e.view,
      onSave: e.onSave
    }, {
      "before-save-button": l(() => [
        u(e.$slots, "before-save-button", {
          errors: e.errors,
          filename: e.currentFilename,
          content: e.currentContent
        })
      ]),
      "save-button": l(() => [
        u(e.$slots, "save-button", {
          errors: e.errors,
          filename: e.currentFilename,
          content: e.currentContent
        })
      ]),
      "after-save-button": l(() => [
        u(e.$slots, "after-save-button", {
          errors: e.errors,
          filename: e.currentFilename,
          content: e.currentContent
        })
      ]),
      _: 3
    }, 8, ["modelValue", "save-button", "view", "onSave"])
  ]);
}
const dt = /* @__PURE__ */ D(Ne, [["render", Ye]]);
export {
  dt as Editor
};
//# sourceMappingURL=capsule-editor.js.map

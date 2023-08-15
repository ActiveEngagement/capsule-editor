var vd = Object.defineProperty;
var Pd = (n, e, t) => e in n ? vd(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var Ns = (n, e, t) => (Pd(n, typeof e != "symbol" ? e + "" : e, t), t);
import { defineComponent as Zs, resolveComponent as Xr, openBlock as ge, createElementBlock as Je, createElementVNode as Te, toDisplayString as ut, createTextVNode as Tr, createVNode as ct, ref as Gs, computed as Cd, unref as Le, withCtx as Ve, createCommentVNode as Mt, createBlock as Ri, renderSlot as Be, Fragment as dl, renderList as Xd, withDirectives as Td, vModelText as Zd } from "vue";
import { ArrowTopRightOnSquareIcon as Rd, ChevronLeftIcon as Ad, ChevronRightIcon as Vd, ExclamationTriangleIcon as Yd } from "@heroicons/vue/24/outline";
import { AnimateCss as Ol } from "@vue-interface/animate-css";
import { Btn as dn } from "@vue-interface/btn";
import { BtnDropdown as Md } from "@vue-interface/btn-dropdown";
import { lint as Wd } from "capsule-lint";
class W {
  /**
  Get the line description around the given position.
  */
  lineAt(e) {
    if (e < 0 || e > this.length)
      throw new RangeError(`Invalid position ${e} in document of length ${this.length}`);
    return this.lineInner(e, !1, 1, 0);
  }
  /**
  Get the description for the given (1-based) line number.
  */
  line(e) {
    if (e < 1 || e > this.lines)
      throw new RangeError(`Invalid line number ${e} in ${this.lines}-line document`);
    return this.lineInner(e, !0, 1, 0);
  }
  /**
  Replace a range of the text with the given content.
  */
  replace(e, t, i) {
    let s = [];
    return this.decompose(
      0,
      e,
      s,
      2
      /* Open.To */
    ), i.length && i.decompose(
      0,
      i.length,
      s,
      3
      /* Open.To */
    ), this.decompose(
      t,
      this.length,
      s,
      1
      /* Open.From */
    ), et.from(s, this.length - (t - e) + i.length);
  }
  /**
  Append another document to this one.
  */
  append(e) {
    return this.replace(this.length, this.length, e);
  }
  /**
  Retrieve the text between the given points.
  */
  slice(e, t = this.length) {
    let i = [];
    return this.decompose(e, t, i, 0), et.from(i, t - e);
  }
  /**
  Test whether this text is equal to another instance.
  */
  eq(e) {
    if (e == this)
      return !0;
    if (e.length != this.length || e.lines != this.lines)
      return !1;
    let t = this.scanIdentical(e, 1), i = this.length - this.scanIdentical(e, -1), s = new Di(this), r = new Di(e);
    for (let o = t, l = t; ; ) {
      if (s.next(o), r.next(o), o = 0, s.lineBreak != r.lineBreak || s.done != r.done || s.value != r.value)
        return !1;
      if (l += s.value.length, s.done || l >= i)
        return !0;
    }
  }
  /**
  Iterate over the text. When `dir` is `-1`, iteration happens
  from end to start. This will return lines and the breaks between
  them as separate strings.
  */
  iter(e = 1) {
    return new Di(this, e);
  }
  /**
  Iterate over a range of the text. When `from` > `to`, the
  iterator will run in reverse.
  */
  iterRange(e, t = this.length) {
    return new Eh(this, e, t);
  }
  /**
  Return a cursor that iterates over the given range of lines,
  _without_ returning the line breaks between, and yielding empty
  strings for empty lines.
  
  When `from` and `to` are given, they should be 1-based line numbers.
  */
  iterLines(e, t) {
    let i;
    if (e == null)
      i = this.iter();
    else {
      t == null && (t = this.lines + 1);
      let s = this.line(e).from;
      i = this.iterRange(s, Math.max(s, t == this.lines + 1 ? this.length : t <= 1 ? 0 : this.line(t - 1).to));
    }
    return new _h(i);
  }
  /**
  Return the document as a string, using newline characters to
  separate lines.
  */
  toString() {
    return this.sliceString(0);
  }
  /**
  Convert the document to an array of lines (which can be
  deserialized again via [`Text.of`](https://codemirror.net/6/docs/ref/#state.Text^of)).
  */
  toJSON() {
    let e = [];
    return this.flatten(e), e;
  }
  /**
  @internal
  */
  constructor() {
  }
  /**
  Create a `Text` instance for the given array of lines.
  */
  static of(e) {
    if (e.length == 0)
      throw new RangeError("A document must have at least one line");
    return e.length == 1 && !e[0] ? W.empty : e.length <= 32 ? new J(e) : et.from(J.split(e, []));
  }
}
class J extends W {
  constructor(e, t = Dd(e)) {
    super(), this.text = e, this.length = t;
  }
  get lines() {
    return this.text.length;
  }
  get children() {
    return null;
  }
  lineInner(e, t, i, s) {
    for (let r = 0; ; r++) {
      let o = this.text[r], l = s + o.length;
      if ((t ? i : l) >= e)
        return new Ud(s, l, i, o);
      s = l + 1, i++;
    }
  }
  decompose(e, t, i, s) {
    let r = e <= 0 && t >= this.length ? this : new J(pl(this.text, e, t), Math.min(t, this.length) - Math.max(0, e));
    if (s & 1) {
      let o = i.pop(), l = Mn(r.text, o.text.slice(), 0, r.length);
      if (l.length <= 32)
        i.push(new J(l, o.length + r.length));
      else {
        let a = l.length >> 1;
        i.push(new J(l.slice(0, a)), new J(l.slice(a)));
      }
    } else
      i.push(r);
  }
  replace(e, t, i) {
    if (!(i instanceof J))
      return super.replace(e, t, i);
    let s = Mn(this.text, Mn(i.text, pl(this.text, 0, e)), t), r = this.length + i.length - (t - e);
    return s.length <= 32 ? new J(s, r) : et.from(J.split(s, []), r);
  }
  sliceString(e, t = this.length, i = `
`) {
    let s = "";
    for (let r = 0, o = 0; r <= t && o < this.text.length; o++) {
      let l = this.text[o], a = r + l.length;
      r > e && o && (s += i), e < a && t > r && (s += l.slice(Math.max(0, e - r), t - r)), r = a + 1;
    }
    return s;
  }
  flatten(e) {
    for (let t of this.text)
      e.push(t);
  }
  scanIdentical() {
    return 0;
  }
  static split(e, t) {
    let i = [], s = -1;
    for (let r of e)
      i.push(r), s += r.length + 1, i.length == 32 && (t.push(new J(i, s)), i = [], s = -1);
    return s > -1 && t.push(new J(i, s)), t;
  }
}
class et extends W {
  constructor(e, t) {
    super(), this.children = e, this.length = t, this.lines = 0;
    for (let i of e)
      this.lines += i.lines;
  }
  lineInner(e, t, i, s) {
    for (let r = 0; ; r++) {
      let o = this.children[r], l = s + o.length, a = i + o.lines - 1;
      if ((t ? a : l) >= e)
        return o.lineInner(e, t, i, s);
      s = l + 1, i = a + 1;
    }
  }
  decompose(e, t, i, s) {
    for (let r = 0, o = 0; o <= t && r < this.children.length; r++) {
      let l = this.children[r], a = o + l.length;
      if (e <= a && t >= o) {
        let h = s & ((o <= e ? 1 : 0) | (a >= t ? 2 : 0));
        o >= e && a <= t && !h ? i.push(l) : l.decompose(e - o, t - o, i, h);
      }
      o = a + 1;
    }
  }
  replace(e, t, i) {
    if (i.lines < this.lines)
      for (let s = 0, r = 0; s < this.children.length; s++) {
        let o = this.children[s], l = r + o.length;
        if (e >= r && t <= l) {
          let a = o.replace(e - r, t - r, i), h = this.lines - o.lines + a.lines;
          if (a.lines < h >> 5 - 1 && a.lines > h >> 5 + 1) {
            let c = this.children.slice();
            return c[s] = a, new et(c, this.length - (t - e) + i.length);
          }
          return super.replace(r, l, a);
        }
        r = l + 1;
      }
    return super.replace(e, t, i);
  }
  sliceString(e, t = this.length, i = `
`) {
    let s = "";
    for (let r = 0, o = 0; r < this.children.length && o <= t; r++) {
      let l = this.children[r], a = o + l.length;
      o > e && r && (s += i), e < a && t > o && (s += l.sliceString(e - o, t - o, i)), o = a + 1;
    }
    return s;
  }
  flatten(e) {
    for (let t of this.children)
      t.flatten(e);
  }
  scanIdentical(e, t) {
    if (!(e instanceof et))
      return 0;
    let i = 0, [s, r, o, l] = t > 0 ? [0, 0, this.children.length, e.children.length] : [this.children.length - 1, e.children.length - 1, -1, -1];
    for (; ; s += t, r += t) {
      if (s == o || r == l)
        return i;
      let a = this.children[s], h = e.children[r];
      if (a != h)
        return i + a.scanIdentical(h, t);
      i += a.length + 1;
    }
  }
  static from(e, t = e.reduce((i, s) => i + s.length + 1, -1)) {
    let i = 0;
    for (let d of e)
      i += d.lines;
    if (i < 32) {
      let d = [];
      for (let O of e)
        O.flatten(d);
      return new J(d, t);
    }
    let s = Math.max(
      32,
      i >> 5
      /* Tree.BranchShift */
    ), r = s << 1, o = s >> 1, l = [], a = 0, h = -1, c = [];
    function f(d) {
      let O;
      if (d.lines > r && d instanceof et)
        for (let m of d.children)
          f(m);
      else
        d.lines > o && (a > o || !a) ? (u(), l.push(d)) : d instanceof J && a && (O = c[c.length - 1]) instanceof J && d.lines + O.lines <= 32 ? (a += d.lines, h += d.length + 1, c[c.length - 1] = new J(O.text.concat(d.text), O.length + 1 + d.length)) : (a + d.lines > s && u(), a += d.lines, h += d.length + 1, c.push(d));
    }
    function u() {
      a != 0 && (l.push(c.length == 1 ? c[0] : et.from(c, h)), h = -1, a = c.length = 0);
    }
    for (let d of e)
      f(d);
    return u(), l.length == 1 ? l[0] : new et(l, t);
  }
}
W.empty = /* @__PURE__ */ new J([""], 0);
function Dd(n) {
  let e = -1;
  for (let t of n)
    e += t.length + 1;
  return e;
}
function Mn(n, e, t = 0, i = 1e9) {
  for (let s = 0, r = 0, o = !0; r < n.length && s <= i; r++) {
    let l = n[r], a = s + l.length;
    a >= t && (a > i && (l = l.slice(0, i - s)), s < t && (l = l.slice(t - s)), o ? (e[e.length - 1] += l, o = !1) : e.push(l)), s = a + 1;
  }
  return e;
}
function pl(n, e, t) {
  return Mn(n, [""], e, t);
}
class Di {
  constructor(e, t = 1) {
    this.dir = t, this.done = !1, this.lineBreak = !1, this.value = "", this.nodes = [e], this.offsets = [t > 0 ? 1 : (e instanceof J ? e.text.length : e.children.length) << 1];
  }
  nextInner(e, t) {
    for (this.done = this.lineBreak = !1; ; ) {
      let i = this.nodes.length - 1, s = this.nodes[i], r = this.offsets[i], o = r >> 1, l = s instanceof J ? s.text.length : s.children.length;
      if (o == (t > 0 ? l : 0)) {
        if (i == 0)
          return this.done = !0, this.value = "", this;
        t > 0 && this.offsets[i - 1]++, this.nodes.pop(), this.offsets.pop();
      } else if ((r & 1) == (t > 0 ? 0 : 1)) {
        if (this.offsets[i] += t, e == 0)
          return this.lineBreak = !0, this.value = `
`, this;
        e--;
      } else if (s instanceof J) {
        let a = s.text[o + (t < 0 ? -1 : 0)];
        if (this.offsets[i] += t, a.length > Math.max(0, e))
          return this.value = e == 0 ? a : t > 0 ? a.slice(e) : a.slice(0, a.length - e), this;
        e -= a.length;
      } else {
        let a = s.children[o + (t < 0 ? -1 : 0)];
        e > a.length ? (e -= a.length, this.offsets[i] += t) : (t < 0 && this.offsets[i]--, this.nodes.push(a), this.offsets.push(t > 0 ? 1 : (a instanceof J ? a.text.length : a.children.length) << 1));
      }
    }
  }
  next(e = 0) {
    return e < 0 && (this.nextInner(-e, -this.dir), e = this.value.length), this.nextInner(e, this.dir);
  }
}
class Eh {
  constructor(e, t, i) {
    this.value = "", this.done = !1, this.cursor = new Di(e, t > i ? -1 : 1), this.pos = t > i ? e.length : 0, this.from = Math.min(t, i), this.to = Math.max(t, i);
  }
  nextInner(e, t) {
    if (t < 0 ? this.pos <= this.from : this.pos >= this.to)
      return this.value = "", this.done = !0, this;
    e += Math.max(0, t < 0 ? this.pos - this.to : this.from - this.pos);
    let i = t < 0 ? this.pos - this.from : this.to - this.pos;
    e > i && (e = i), i -= e;
    let { value: s } = this.cursor.next(e);
    return this.pos += (s.length + e) * t, this.value = s.length <= i ? s : t < 0 ? s.slice(s.length - i) : s.slice(0, i), this.done = !this.value, this;
  }
  next(e = 0) {
    return e < 0 ? e = Math.max(e, this.from - this.pos) : e > 0 && (e = Math.min(e, this.to - this.pos)), this.nextInner(e, this.cursor.dir);
  }
  get lineBreak() {
    return this.cursor.lineBreak && this.value != "";
  }
}
class _h {
  constructor(e) {
    this.inner = e, this.afterBreak = !0, this.value = "", this.done = !1;
  }
  next(e = 0) {
    let { done: t, lineBreak: i, value: s } = this.inner.next(e);
    return t ? (this.done = !0, this.value = "") : i ? this.afterBreak ? this.value = "" : (this.afterBreak = !0, this.next()) : (this.value = s, this.afterBreak = !1), this;
  }
  get lineBreak() {
    return !1;
  }
}
typeof Symbol < "u" && (W.prototype[Symbol.iterator] = function() {
  return this.iter();
}, Di.prototype[Symbol.iterator] = Eh.prototype[Symbol.iterator] = _h.prototype[Symbol.iterator] = function() {
  return this;
});
class Ud {
  /**
  @internal
  */
  constructor(e, t, i, s) {
    this.from = e, this.to = t, this.number = i, this.text = s;
  }
  /**
  The length of the line (not including any line break after it).
  */
  get length() {
    return this.to - this.from;
  }
}
let ni = /* @__PURE__ */ "lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map((n) => n ? parseInt(n, 36) : 1);
for (let n = 1; n < ni.length; n++)
  ni[n] += ni[n - 1];
function qd(n) {
  for (let e = 1; e < ni.length; e += 2)
    if (ni[e] > n)
      return ni[e - 1] <= n;
  return !1;
}
function gl(n) {
  return n >= 127462 && n <= 127487;
}
const ml = 8205;
function Oe(n, e, t = !0, i = !0) {
  return (t ? Bh : Ed)(n, e, i);
}
function Bh(n, e, t) {
  if (e == n.length)
    return e;
  e && zh(n.charCodeAt(e)) && Ih(n.charCodeAt(e - 1)) && e--;
  let i = ae(n, e);
  for (e += Ye(i); e < n.length; ) {
    let s = ae(n, e);
    if (i == ml || s == ml || t && qd(s))
      e += Ye(s), i = s;
    else if (gl(s)) {
      let r = 0, o = e - 2;
      for (; o >= 0 && gl(ae(n, o)); )
        r++, o -= 2;
      if (r % 2 == 0)
        break;
      e += 2;
    } else
      break;
  }
  return e;
}
function Ed(n, e, t) {
  for (; e > 0; ) {
    let i = Bh(n, e - 2, t);
    if (i < e)
      return i;
    e--;
  }
  return 0;
}
function zh(n) {
  return n >= 56320 && n < 57344;
}
function Ih(n) {
  return n >= 55296 && n < 56320;
}
function ae(n, e) {
  let t = n.charCodeAt(e);
  if (!Ih(t) || e + 1 == n.length)
    return t;
  let i = n.charCodeAt(e + 1);
  return zh(i) ? (t - 55296 << 10) + (i - 56320) + 65536 : t;
}
function Co(n) {
  return n <= 65535 ? String.fromCharCode(n) : (n -= 65536, String.fromCharCode((n >> 10) + 55296, (n & 1023) + 56320));
}
function Ye(n) {
  return n < 65536 ? 1 : 2;
}
const Zr = /\r\n?|\n/;
var ce = /* @__PURE__ */ function(n) {
  return n[n.Simple = 0] = "Simple", n[n.TrackDel = 1] = "TrackDel", n[n.TrackBefore = 2] = "TrackBefore", n[n.TrackAfter = 3] = "TrackAfter", n;
}(ce || (ce = {}));
class rt {
  // Sections are encoded as pairs of integers. The first is the
  // length in the current document, and the second is -1 for
  // unaffected sections, and the length of the replacement content
  // otherwise. So an insertion would be (0, n>0), a deletion (n>0,
  // 0), and a replacement two positive numbers.
  /**
  @internal
  */
  constructor(e) {
    this.sections = e;
  }
  /**
  The length of the document before the change.
  */
  get length() {
    let e = 0;
    for (let t = 0; t < this.sections.length; t += 2)
      e += this.sections[t];
    return e;
  }
  /**
  The length of the document after the change.
  */
  get newLength() {
    let e = 0;
    for (let t = 0; t < this.sections.length; t += 2) {
      let i = this.sections[t + 1];
      e += i < 0 ? this.sections[t] : i;
    }
    return e;
  }
  /**
  False when there are actual changes in this set.
  */
  get empty() {
    return this.sections.length == 0 || this.sections.length == 2 && this.sections[1] < 0;
  }
  /**
  Iterate over the unchanged parts left by these changes. `posA`
  provides the position of the range in the old document, `posB`
  the new position in the changed document.
  */
  iterGaps(e) {
    for (let t = 0, i = 0, s = 0; t < this.sections.length; ) {
      let r = this.sections[t++], o = this.sections[t++];
      o < 0 ? (e(i, s, r), s += r) : s += o, i += r;
    }
  }
  /**
  Iterate over the ranges changed by these changes. (See
  [`ChangeSet.iterChanges`](https://codemirror.net/6/docs/ref/#state.ChangeSet.iterChanges) for a
  variant that also provides you with the inserted text.)
  `fromA`/`toA` provides the extent of the change in the starting
  document, `fromB`/`toB` the extent of the replacement in the
  changed document.
  
  When `individual` is true, adjacent changes (which are kept
  separate for [position mapping](https://codemirror.net/6/docs/ref/#state.ChangeDesc.mapPos)) are
  reported separately.
  */
  iterChangedRanges(e, t = !1) {
    Rr(this, e, t);
  }
  /**
  Get a description of the inverted form of these changes.
  */
  get invertedDesc() {
    let e = [];
    for (let t = 0; t < this.sections.length; ) {
      let i = this.sections[t++], s = this.sections[t++];
      s < 0 ? e.push(i, s) : e.push(s, i);
    }
    return new rt(e);
  }
  /**
  Compute the combined effect of applying another set of changes
  after this one. The length of the document after this set should
  match the length before `other`.
  */
  composeDesc(e) {
    return this.empty ? e : e.empty ? this : jh(this, e);
  }
  /**
  Map this description, which should start with the same document
  as `other`, over another set of changes, so that it can be
  applied after it. When `before` is true, map as if the changes
  in `other` happened before the ones in `this`.
  */
  mapDesc(e, t = !1) {
    return e.empty ? this : Ar(this, e, t);
  }
  mapPos(e, t = -1, i = ce.Simple) {
    let s = 0, r = 0;
    for (let o = 0; o < this.sections.length; ) {
      let l = this.sections[o++], a = this.sections[o++], h = s + l;
      if (a < 0) {
        if (h > e)
          return r + (e - s);
        r += l;
      } else {
        if (i != ce.Simple && h >= e && (i == ce.TrackDel && s < e && h > e || i == ce.TrackBefore && s < e || i == ce.TrackAfter && h > e))
          return null;
        if (h > e || h == e && t < 0 && !l)
          return e == s || t < 0 ? r : r + a;
        r += a;
      }
      s = h;
    }
    if (e > s)
      throw new RangeError(`Position ${e} is out of range for changeset of length ${s}`);
    return r;
  }
  /**
  Check whether these changes touch a given range. When one of the
  changes entirely covers the range, the string `"cover"` is
  returned.
  */
  touchesRange(e, t = e) {
    for (let i = 0, s = 0; i < this.sections.length && s <= t; ) {
      let r = this.sections[i++], o = this.sections[i++], l = s + r;
      if (o >= 0 && s <= t && l >= e)
        return s < e && l > t ? "cover" : !0;
      s = l;
    }
    return !1;
  }
  /**
  @internal
  */
  toString() {
    let e = "";
    for (let t = 0; t < this.sections.length; ) {
      let i = this.sections[t++], s = this.sections[t++];
      e += (e ? " " : "") + i + (s >= 0 ? ":" + s : "");
    }
    return e;
  }
  /**
  Serialize this change desc to a JSON-representable value.
  */
  toJSON() {
    return this.sections;
  }
  /**
  Create a change desc from its JSON representation (as produced
  by [`toJSON`](https://codemirror.net/6/docs/ref/#state.ChangeDesc.toJSON).
  */
  static fromJSON(e) {
    if (!Array.isArray(e) || e.length % 2 || e.some((t) => typeof t != "number"))
      throw new RangeError("Invalid JSON representation of ChangeDesc");
    return new rt(e);
  }
  /**
  @internal
  */
  static create(e) {
    return new rt(e);
  }
}
class ne extends rt {
  constructor(e, t) {
    super(e), this.inserted = t;
  }
  /**
  Apply the changes to a document, returning the modified
  document.
  */
  apply(e) {
    if (this.length != e.length)
      throw new RangeError("Applying change set to a document with the wrong length");
    return Rr(this, (t, i, s, r, o) => e = e.replace(s, s + (i - t), o), !1), e;
  }
  mapDesc(e, t = !1) {
    return Ar(this, e, t, !0);
  }
  /**
  Given the document as it existed _before_ the changes, return a
  change set that represents the inverse of this set, which could
  be used to go from the document created by the changes back to
  the document as it existed before the changes.
  */
  invert(e) {
    let t = this.sections.slice(), i = [];
    for (let s = 0, r = 0; s < t.length; s += 2) {
      let o = t[s], l = t[s + 1];
      if (l >= 0) {
        t[s] = l, t[s + 1] = o;
        let a = s >> 1;
        for (; i.length < a; )
          i.push(W.empty);
        i.push(o ? e.slice(r, r + o) : W.empty);
      }
      r += o;
    }
    return new ne(t, i);
  }
  /**
  Combine two subsequent change sets into a single set. `other`
  must start in the document produced by `this`. If `this` goes
  `docA` → `docB` and `other` represents `docB` → `docC`, the
  returned value will represent the change `docA` → `docC`.
  */
  compose(e) {
    return this.empty ? e : e.empty ? this : jh(this, e, !0);
  }
  /**
  Given another change set starting in the same document, maps this
  change set over the other, producing a new change set that can be
  applied to the document produced by applying `other`. When
  `before` is `true`, order changes as if `this` comes before
  `other`, otherwise (the default) treat `other` as coming first.
  
  Given two changes `A` and `B`, `A.compose(B.map(A))` and
  `B.compose(A.map(B, true))` will produce the same document. This
  provides a basic form of [operational
  transformation](https://en.wikipedia.org/wiki/Operational_transformation),
  and can be used for collaborative editing.
  */
  map(e, t = !1) {
    return e.empty ? this : Ar(this, e, t, !0);
  }
  /**
  Iterate over the changed ranges in the document, calling `f` for
  each, with the range in the original document (`fromA`-`toA`)
  and the range that replaces it in the new document
  (`fromB`-`toB`).
  
  When `individual` is true, adjacent changes are reported
  separately.
  */
  iterChanges(e, t = !1) {
    Rr(this, e, t);
  }
  /**
  Get a [change description](https://codemirror.net/6/docs/ref/#state.ChangeDesc) for this change
  set.
  */
  get desc() {
    return rt.create(this.sections);
  }
  /**
  @internal
  */
  filter(e) {
    let t = [], i = [], s = [], r = new Bi(this);
    e:
      for (let o = 0, l = 0; ; ) {
        let a = o == e.length ? 1e9 : e[o++];
        for (; l < a || l == a && r.len == 0; ) {
          if (r.done)
            break e;
          let c = Math.min(r.len, a - l);
          de(s, c, -1);
          let f = r.ins == -1 ? -1 : r.off == 0 ? r.ins : 0;
          de(t, c, f), f > 0 && $t(i, t, r.text), r.forward(c), l += c;
        }
        let h = e[o++];
        for (; l < h; ) {
          if (r.done)
            break e;
          let c = Math.min(r.len, h - l);
          de(t, c, -1), de(s, c, r.ins == -1 ? -1 : r.off == 0 ? r.ins : 0), r.forward(c), l += c;
        }
      }
    return {
      changes: new ne(t, i),
      filtered: rt.create(s)
    };
  }
  /**
  Serialize this change set to a JSON-representable value.
  */
  toJSON() {
    let e = [];
    for (let t = 0; t < this.sections.length; t += 2) {
      let i = this.sections[t], s = this.sections[t + 1];
      s < 0 ? e.push(i) : s == 0 ? e.push([i]) : e.push([i].concat(this.inserted[t >> 1].toJSON()));
    }
    return e;
  }
  /**
  Create a change set for the given changes, for a document of the
  given length, using `lineSep` as line separator.
  */
  static of(e, t, i) {
    let s = [], r = [], o = 0, l = null;
    function a(c = !1) {
      if (!c && !s.length)
        return;
      o < t && de(s, t - o, -1);
      let f = new ne(s, r);
      l = l ? l.compose(f.map(l)) : f, s = [], r = [], o = 0;
    }
    function h(c) {
      if (Array.isArray(c))
        for (let f of c)
          h(f);
      else if (c instanceof ne) {
        if (c.length != t)
          throw new RangeError(`Mismatched change set length (got ${c.length}, expected ${t})`);
        a(), l = l ? l.compose(c.map(l)) : c;
      } else {
        let { from: f, to: u = f, insert: d } = c;
        if (f > u || f < 0 || u > t)
          throw new RangeError(`Invalid change range ${f} to ${u} (in doc of length ${t})`);
        let O = d ? typeof d == "string" ? W.of(d.split(i || Zr)) : d : W.empty, m = O.length;
        if (f == u && m == 0)
          return;
        f < o && a(), f > o && de(s, f - o, -1), de(s, u - f, m), $t(r, s, O), o = u;
      }
    }
    return h(e), a(!l), l;
  }
  /**
  Create an empty changeset of the given length.
  */
  static empty(e) {
    return new ne(e ? [e, -1] : [], []);
  }
  /**
  Create a changeset from its JSON representation (as produced by
  [`toJSON`](https://codemirror.net/6/docs/ref/#state.ChangeSet.toJSON).
  */
  static fromJSON(e) {
    if (!Array.isArray(e))
      throw new RangeError("Invalid JSON representation of ChangeSet");
    let t = [], i = [];
    for (let s = 0; s < e.length; s++) {
      let r = e[s];
      if (typeof r == "number")
        t.push(r, -1);
      else {
        if (!Array.isArray(r) || typeof r[0] != "number" || r.some((o, l) => l && typeof o != "string"))
          throw new RangeError("Invalid JSON representation of ChangeSet");
        if (r.length == 1)
          t.push(r[0], 0);
        else {
          for (; i.length < s; )
            i.push(W.empty);
          i[s] = W.of(r.slice(1)), t.push(r[0], i[s].length);
        }
      }
    }
    return new ne(t, i);
  }
  /**
  @internal
  */
  static createSet(e, t) {
    return new ne(e, t);
  }
}
function de(n, e, t, i = !1) {
  if (e == 0 && t <= 0)
    return;
  let s = n.length - 2;
  s >= 0 && t <= 0 && t == n[s + 1] ? n[s] += e : e == 0 && n[s] == 0 ? n[s + 1] += t : i ? (n[s] += e, n[s + 1] += t) : n.push(e, t);
}
function $t(n, e, t) {
  if (t.length == 0)
    return;
  let i = e.length - 2 >> 1;
  if (i < n.length)
    n[n.length - 1] = n[n.length - 1].append(t);
  else {
    for (; n.length < i; )
      n.push(W.empty);
    n.push(t);
  }
}
function Rr(n, e, t) {
  let i = n.inserted;
  for (let s = 0, r = 0, o = 0; o < n.sections.length; ) {
    let l = n.sections[o++], a = n.sections[o++];
    if (a < 0)
      s += l, r += l;
    else {
      let h = s, c = r, f = W.empty;
      for (; h += l, c += a, a && i && (f = f.append(i[o - 2 >> 1])), !(t || o == n.sections.length || n.sections[o + 1] < 0); )
        l = n.sections[o++], a = n.sections[o++];
      e(s, h, r, c, f), s = h, r = c;
    }
  }
}
function Ar(n, e, t, i = !1) {
  let s = [], r = i ? [] : null, o = new Bi(n), l = new Bi(e);
  for (let a = -1; ; )
    if (o.ins == -1 && l.ins == -1) {
      let h = Math.min(o.len, l.len);
      de(s, h, -1), o.forward(h), l.forward(h);
    } else if (l.ins >= 0 && (o.ins < 0 || a == o.i || o.off == 0 && (l.len < o.len || l.len == o.len && !t))) {
      let h = l.len;
      for (de(s, l.ins, -1); h; ) {
        let c = Math.min(o.len, h);
        o.ins >= 0 && a < o.i && o.len <= c && (de(s, 0, o.ins), r && $t(r, s, o.text), a = o.i), o.forward(c), h -= c;
      }
      l.next();
    } else if (o.ins >= 0) {
      let h = 0, c = o.len;
      for (; c; )
        if (l.ins == -1) {
          let f = Math.min(c, l.len);
          h += f, c -= f, l.forward(f);
        } else if (l.ins == 0 && l.len < c)
          c -= l.len, l.next();
        else
          break;
      de(s, h, a < o.i ? o.ins : 0), r && a < o.i && $t(r, s, o.text), a = o.i, o.forward(o.len - c);
    } else {
      if (o.done && l.done)
        return r ? ne.createSet(s, r) : rt.create(s);
      throw new Error("Mismatched change set lengths");
    }
}
function jh(n, e, t = !1) {
  let i = [], s = t ? [] : null, r = new Bi(n), o = new Bi(e);
  for (let l = !1; ; ) {
    if (r.done && o.done)
      return s ? ne.createSet(i, s) : rt.create(i);
    if (r.ins == 0)
      de(i, r.len, 0, l), r.next();
    else if (o.len == 0 && !o.done)
      de(i, 0, o.ins, l), s && $t(s, i, o.text), o.next();
    else {
      if (r.done || o.done)
        throw new Error("Mismatched change set lengths");
      {
        let a = Math.min(r.len2, o.len), h = i.length;
        if (r.ins == -1) {
          let c = o.ins == -1 ? -1 : o.off ? 0 : o.ins;
          de(i, a, c, l), s && c && $t(s, i, o.text);
        } else
          o.ins == -1 ? (de(i, r.off ? 0 : r.len, a, l), s && $t(s, i, r.textBit(a))) : (de(i, r.off ? 0 : r.len, o.off ? 0 : o.ins, l), s && !o.off && $t(s, i, o.text));
        l = (r.ins > a || o.ins >= 0 && o.len > a) && (l || i.length > h), r.forward2(a), o.forward(a);
      }
    }
  }
}
class Bi {
  constructor(e) {
    this.set = e, this.i = 0, this.next();
  }
  next() {
    let { sections: e } = this.set;
    this.i < e.length ? (this.len = e[this.i++], this.ins = e[this.i++]) : (this.len = 0, this.ins = -2), this.off = 0;
  }
  get done() {
    return this.ins == -2;
  }
  get len2() {
    return this.ins < 0 ? this.len : this.ins;
  }
  get text() {
    let { inserted: e } = this.set, t = this.i - 2 >> 1;
    return t >= e.length ? W.empty : e[t];
  }
  textBit(e) {
    let { inserted: t } = this.set, i = this.i - 2 >> 1;
    return i >= t.length && !e ? W.empty : t[i].slice(this.off, e == null ? void 0 : this.off + e);
  }
  forward(e) {
    e == this.len ? this.next() : (this.len -= e, this.off += e);
  }
  forward2(e) {
    this.ins == -1 ? this.forward(e) : e == this.ins ? this.next() : (this.ins -= e, this.off += e);
  }
}
class Dt {
  constructor(e, t, i) {
    this.from = e, this.to = t, this.flags = i;
  }
  /**
  The anchor of the range—the side that doesn't move when you
  extend it.
  */
  get anchor() {
    return this.flags & 16 ? this.to : this.from;
  }
  /**
  The head of the range, which is moved when the range is
  [extended](https://codemirror.net/6/docs/ref/#state.SelectionRange.extend).
  */
  get head() {
    return this.flags & 16 ? this.from : this.to;
  }
  /**
  True when `anchor` and `head` are at the same position.
  */
  get empty() {
    return this.from == this.to;
  }
  /**
  If this is a cursor that is explicitly associated with the
  character on one of its sides, this returns the side. -1 means
  the character before its position, 1 the character after, and 0
  means no association.
  */
  get assoc() {
    return this.flags & 4 ? -1 : this.flags & 8 ? 1 : 0;
  }
  /**
  The bidirectional text level associated with this cursor, if
  any.
  */
  get bidiLevel() {
    let e = this.flags & 3;
    return e == 3 ? null : e;
  }
  /**
  The goal column (stored vertical offset) associated with a
  cursor. This is used to preserve the vertical position when
  [moving](https://codemirror.net/6/docs/ref/#view.EditorView.moveVertically) across
  lines of different length.
  */
  get goalColumn() {
    let e = this.flags >> 5;
    return e == 33554431 ? void 0 : e;
  }
  /**
  Map this range through a change, producing a valid range in the
  updated document.
  */
  map(e, t = -1) {
    let i, s;
    return this.empty ? i = s = e.mapPos(this.from, t) : (i = e.mapPos(this.from, 1), s = e.mapPos(this.to, -1)), i == this.from && s == this.to ? this : new Dt(i, s, this.flags);
  }
  /**
  Extend this range to cover at least `from` to `to`.
  */
  extend(e, t = e) {
    if (e <= this.anchor && t >= this.anchor)
      return y.range(e, t);
    let i = Math.abs(e - this.anchor) > Math.abs(t - this.anchor) ? e : t;
    return y.range(this.anchor, i);
  }
  /**
  Compare this range to another range.
  */
  eq(e) {
    return this.anchor == e.anchor && this.head == e.head;
  }
  /**
  Return a JSON-serializable object representing the range.
  */
  toJSON() {
    return { anchor: this.anchor, head: this.head };
  }
  /**
  Convert a JSON representation of a range to a `SelectionRange`
  instance.
  */
  static fromJSON(e) {
    if (!e || typeof e.anchor != "number" || typeof e.head != "number")
      throw new RangeError("Invalid JSON representation for SelectionRange");
    return y.range(e.anchor, e.head);
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new Dt(e, t, i);
  }
}
class y {
  constructor(e, t) {
    this.ranges = e, this.mainIndex = t;
  }
  /**
  Map a selection through a change. Used to adjust the selection
  position for changes.
  */
  map(e, t = -1) {
    return e.empty ? this : y.create(this.ranges.map((i) => i.map(e, t)), this.mainIndex);
  }
  /**
  Compare this selection to another selection.
  */
  eq(e) {
    if (this.ranges.length != e.ranges.length || this.mainIndex != e.mainIndex)
      return !1;
    for (let t = 0; t < this.ranges.length; t++)
      if (!this.ranges[t].eq(e.ranges[t]))
        return !1;
    return !0;
  }
  /**
  Get the primary selection range. Usually, you should make sure
  your code applies to _all_ ranges, by using methods like
  [`changeByRange`](https://codemirror.net/6/docs/ref/#state.EditorState.changeByRange).
  */
  get main() {
    return this.ranges[this.mainIndex];
  }
  /**
  Make sure the selection only has one range. Returns a selection
  holding only the main range from this selection.
  */
  asSingle() {
    return this.ranges.length == 1 ? this : new y([this.main], 0);
  }
  /**
  Extend this selection with an extra range.
  */
  addRange(e, t = !0) {
    return y.create([e].concat(this.ranges), t ? 0 : this.mainIndex + 1);
  }
  /**
  Replace a given range with another range, and then normalize the
  selection to merge and sort ranges if necessary.
  */
  replaceRange(e, t = this.mainIndex) {
    let i = this.ranges.slice();
    return i[t] = e, y.create(i, this.mainIndex);
  }
  /**
  Convert this selection to an object that can be serialized to
  JSON.
  */
  toJSON() {
    return { ranges: this.ranges.map((e) => e.toJSON()), main: this.mainIndex };
  }
  /**
  Create a selection from a JSON representation.
  */
  static fromJSON(e) {
    if (!e || !Array.isArray(e.ranges) || typeof e.main != "number" || e.main >= e.ranges.length)
      throw new RangeError("Invalid JSON representation for EditorSelection");
    return new y(e.ranges.map((t) => Dt.fromJSON(t)), e.main);
  }
  /**
  Create a selection holding a single range.
  */
  static single(e, t = e) {
    return new y([y.range(e, t)], 0);
  }
  /**
  Sort and merge the given set of ranges, creating a valid
  selection.
  */
  static create(e, t = 0) {
    if (e.length == 0)
      throw new RangeError("A selection needs at least one range");
    for (let i = 0, s = 0; s < e.length; s++) {
      let r = e[s];
      if (r.empty ? r.from <= i : r.from < i)
        return y.normalized(e.slice(), t);
      i = r.to;
    }
    return new y(e, t);
  }
  /**
  Create a cursor selection range at the given position. You can
  safely ignore the optional arguments in most situations.
  */
  static cursor(e, t = 0, i, s) {
    return Dt.create(e, e, (t == 0 ? 0 : t < 0 ? 4 : 8) | (i == null ? 3 : Math.min(2, i)) | (s ?? 33554431) << 5);
  }
  /**
  Create a selection range.
  */
  static range(e, t, i, s) {
    let r = (i ?? 33554431) << 5 | (s == null ? 3 : Math.min(2, s));
    return t < e ? Dt.create(t, e, 24 | r) : Dt.create(e, t, (t > e ? 4 : 0) | r);
  }
  /**
  @internal
  */
  static normalized(e, t = 0) {
    let i = e[t];
    e.sort((s, r) => s.from - r.from), t = e.indexOf(i);
    for (let s = 1; s < e.length; s++) {
      let r = e[s], o = e[s - 1];
      if (r.empty ? r.from <= o.to : r.from < o.to) {
        let l = o.from, a = Math.max(r.to, o.to);
        s <= t && t--, e.splice(--s, 2, r.anchor > r.head ? y.range(a, l) : y.range(l, a));
      }
    }
    return new y(e, t);
  }
}
function Lh(n, e) {
  for (let t of n.ranges)
    if (t.to > e)
      throw new RangeError("Selection points outside of document");
}
let Xo = 0;
class P {
  constructor(e, t, i, s, r) {
    this.combine = e, this.compareInput = t, this.compare = i, this.isStatic = s, this.id = Xo++, this.default = e([]), this.extensions = typeof r == "function" ? r(this) : r;
  }
  /**
  Define a new facet.
  */
  static define(e = {}) {
    return new P(e.combine || ((t) => t), e.compareInput || ((t, i) => t === i), e.compare || (e.combine ? (t, i) => t === i : To), !!e.static, e.enables);
  }
  /**
  Returns an extension that adds the given value to this facet.
  */
  of(e) {
    return new Wn([], this, 0, e);
  }
  /**
  Create an extension that computes a value for the facet from a
  state. You must take care to declare the parts of the state that
  this value depends on, since your function is only called again
  for a new state when one of those parts changed.
  
  In cases where your value depends only on a single field, you'll
  want to use the [`from`](https://codemirror.net/6/docs/ref/#state.Facet.from) method instead.
  */
  compute(e, t) {
    if (this.isStatic)
      throw new Error("Can't compute a static facet");
    return new Wn(e, this, 1, t);
  }
  /**
  Create an extension that computes zero or more values for this
  facet from a state.
  */
  computeN(e, t) {
    if (this.isStatic)
      throw new Error("Can't compute a static facet");
    return new Wn(e, this, 2, t);
  }
  from(e, t) {
    return t || (t = (i) => i), this.compute([e], (i) => t(i.field(e)));
  }
}
function To(n, e) {
  return n == e || n.length == e.length && n.every((t, i) => t === e[i]);
}
class Wn {
  constructor(e, t, i, s) {
    this.dependencies = e, this.facet = t, this.type = i, this.value = s, this.id = Xo++;
  }
  dynamicSlot(e) {
    var t;
    let i = this.value, s = this.facet.compareInput, r = this.id, o = e[r] >> 1, l = this.type == 2, a = !1, h = !1, c = [];
    for (let f of this.dependencies)
      f == "doc" ? a = !0 : f == "selection" ? h = !0 : ((t = e[f.id]) !== null && t !== void 0 ? t : 1) & 1 || c.push(e[f.id]);
    return {
      create(f) {
        return f.values[o] = i(f), 1;
      },
      update(f, u) {
        if (a && u.docChanged || h && (u.docChanged || u.selection) || Vr(f, c)) {
          let d = i(f);
          if (l ? !Sl(d, f.values[o], s) : !s(d, f.values[o]))
            return f.values[o] = d, 1;
        }
        return 0;
      },
      reconfigure: (f, u) => {
        let d, O = u.config.address[r];
        if (O != null) {
          let m = Jn(u, O);
          if (this.dependencies.every((g) => g instanceof P ? u.facet(g) === f.facet(g) : g instanceof re ? u.field(g, !1) == f.field(g, !1) : !0) || (l ? Sl(d = i(f), m, s) : s(d = i(f), m)))
            return f.values[o] = m, 0;
        } else
          d = i(f);
        return f.values[o] = d, 1;
      }
    };
  }
}
function Sl(n, e, t) {
  if (n.length != e.length)
    return !1;
  for (let i = 0; i < n.length; i++)
    if (!t(n[i], e[i]))
      return !1;
  return !0;
}
function Vr(n, e) {
  let t = !1;
  for (let i of e)
    Ui(n, i) & 1 && (t = !0);
  return t;
}
function _d(n, e, t) {
  let i = t.map((a) => n[a.id]), s = t.map((a) => a.type), r = i.filter((a) => !(a & 1)), o = n[e.id] >> 1;
  function l(a) {
    let h = [];
    for (let c = 0; c < i.length; c++) {
      let f = Jn(a, i[c]);
      if (s[c] == 2)
        for (let u of f)
          h.push(u);
      else
        h.push(f);
    }
    return e.combine(h);
  }
  return {
    create(a) {
      for (let h of i)
        Ui(a, h);
      return a.values[o] = l(a), 1;
    },
    update(a, h) {
      if (!Vr(a, r))
        return 0;
      let c = l(a);
      return e.compare(c, a.values[o]) ? 0 : (a.values[o] = c, 1);
    },
    reconfigure(a, h) {
      let c = Vr(a, i), f = h.config.facets[e.id], u = h.facet(e);
      if (f && !c && To(t, f))
        return a.values[o] = u, 0;
      let d = l(a);
      return e.compare(d, u) ? (a.values[o] = u, 0) : (a.values[o] = d, 1);
    }
  };
}
const yl = /* @__PURE__ */ P.define({ static: !0 });
class re {
  constructor(e, t, i, s, r) {
    this.id = e, this.createF = t, this.updateF = i, this.compareF = s, this.spec = r, this.provides = void 0;
  }
  /**
  Define a state field.
  */
  static define(e) {
    let t = new re(Xo++, e.create, e.update, e.compare || ((i, s) => i === s), e);
    return e.provide && (t.provides = e.provide(t)), t;
  }
  create(e) {
    let t = e.facet(yl).find((i) => i.field == this);
    return ((t == null ? void 0 : t.create) || this.createF)(e);
  }
  /**
  @internal
  */
  slot(e) {
    let t = e[this.id] >> 1;
    return {
      create: (i) => (i.values[t] = this.create(i), 1),
      update: (i, s) => {
        let r = i.values[t], o = this.updateF(r, s);
        return this.compareF(r, o) ? 0 : (i.values[t] = o, 1);
      },
      reconfigure: (i, s) => s.config.address[this.id] != null ? (i.values[t] = s.field(this), 0) : (i.values[t] = this.create(i), 1)
    };
  }
  /**
  Returns an extension that enables this field and overrides the
  way it is initialized. Can be useful when you need to provide a
  non-default starting value for the field.
  */
  init(e) {
    return [this, yl.of({ field: this, create: e })];
  }
  /**
  State field instances can be used as
  [`Extension`](https://codemirror.net/6/docs/ref/#state.Extension) values to enable the field in a
  given state.
  */
  get extension() {
    return this;
  }
}
const Wt = { lowest: 4, low: 3, default: 2, high: 1, highest: 0 };
function wi(n) {
  return (e) => new Nh(e, n);
}
const jt = {
  /**
  The highest precedence level, for extensions that should end up
  near the start of the precedence ordering.
  */
  highest: /* @__PURE__ */ wi(Wt.highest),
  /**
  A higher-than-default precedence, for extensions that should
  come before those with default precedence.
  */
  high: /* @__PURE__ */ wi(Wt.high),
  /**
  The default precedence, which is also used for extensions
  without an explicit precedence.
  */
  default: /* @__PURE__ */ wi(Wt.default),
  /**
  A lower-than-default precedence.
  */
  low: /* @__PURE__ */ wi(Wt.low),
  /**
  The lowest precedence level. Meant for things that should end up
  near the end of the extension order.
  */
  lowest: /* @__PURE__ */ wi(Wt.lowest)
};
class Nh {
  constructor(e, t) {
    this.inner = e, this.prec = t;
  }
}
class Rs {
  /**
  Create an instance of this compartment to add to your [state
  configuration](https://codemirror.net/6/docs/ref/#state.EditorStateConfig.extensions).
  */
  of(e) {
    return new Yr(this, e);
  }
  /**
  Create an [effect](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) that
  reconfigures this compartment.
  */
  reconfigure(e) {
    return Rs.reconfigure.of({ compartment: this, extension: e });
  }
  /**
  Get the current content of the compartment in the state, or
  `undefined` if it isn't present.
  */
  get(e) {
    return e.config.compartments.get(this);
  }
}
class Yr {
  constructor(e, t) {
    this.compartment = e, this.inner = t;
  }
}
class Hn {
  constructor(e, t, i, s, r, o) {
    for (this.base = e, this.compartments = t, this.dynamicSlots = i, this.address = s, this.staticValues = r, this.facets = o, this.statusTemplate = []; this.statusTemplate.length < i.length; )
      this.statusTemplate.push(
        0
        /* SlotStatus.Unresolved */
      );
  }
  staticFacet(e) {
    let t = this.address[e.id];
    return t == null ? e.default : this.staticValues[t >> 1];
  }
  static resolve(e, t, i) {
    let s = [], r = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ new Map();
    for (let u of Bd(e, t, o))
      u instanceof re ? s.push(u) : (r[u.facet.id] || (r[u.facet.id] = [])).push(u);
    let l = /* @__PURE__ */ Object.create(null), a = [], h = [];
    for (let u of s)
      l[u.id] = h.length << 1, h.push((d) => u.slot(d));
    let c = i == null ? void 0 : i.config.facets;
    for (let u in r) {
      let d = r[u], O = d[0].facet, m = c && c[u] || [];
      if (d.every(
        (g) => g.type == 0
        /* Provider.Static */
      ))
        if (l[O.id] = a.length << 1 | 1, To(m, d))
          a.push(i.facet(O));
        else {
          let g = O.combine(d.map((S) => S.value));
          a.push(i && O.compare(g, i.facet(O)) ? i.facet(O) : g);
        }
      else {
        for (let g of d)
          g.type == 0 ? (l[g.id] = a.length << 1 | 1, a.push(g.value)) : (l[g.id] = h.length << 1, h.push((S) => g.dynamicSlot(S)));
        l[O.id] = h.length << 1, h.push((g) => _d(g, O, d));
      }
    }
    let f = h.map((u) => u(l));
    return new Hn(e, o, f, l, a, r);
  }
}
function Bd(n, e, t) {
  let i = [[], [], [], [], []], s = /* @__PURE__ */ new Map();
  function r(o, l) {
    let a = s.get(o);
    if (a != null) {
      if (a <= l)
        return;
      let h = i[a].indexOf(o);
      h > -1 && i[a].splice(h, 1), o instanceof Yr && t.delete(o.compartment);
    }
    if (s.set(o, l), Array.isArray(o))
      for (let h of o)
        r(h, l);
    else if (o instanceof Yr) {
      if (t.has(o.compartment))
        throw new RangeError("Duplicate use of compartment in extensions");
      let h = e.get(o.compartment) || o.inner;
      t.set(o.compartment, h), r(h, l);
    } else if (o instanceof Nh)
      r(o.inner, o.prec);
    else if (o instanceof re)
      i[l].push(o), o.provides && r(o.provides, l);
    else if (o instanceof Wn)
      i[l].push(o), o.facet.extensions && r(o.facet.extensions, Wt.default);
    else {
      let h = o.extension;
      if (!h)
        throw new Error(`Unrecognized extension value in extension set (${o}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);
      r(h, l);
    }
  }
  return r(n, Wt.default), i.reduce((o, l) => o.concat(l));
}
function Ui(n, e) {
  if (e & 1)
    return 2;
  let t = e >> 1, i = n.status[t];
  if (i == 4)
    throw new Error("Cyclic dependency between fields and/or facets");
  if (i & 2)
    return i;
  n.status[t] = 4;
  let s = n.computeSlot(n, n.config.dynamicSlots[t]);
  return n.status[t] = 2 | s;
}
function Jn(n, e) {
  return e & 1 ? n.config.staticValues[e >> 1] : n.values[e >> 1];
}
const Gh = /* @__PURE__ */ P.define(), Fh = /* @__PURE__ */ P.define({
  combine: (n) => n.some((e) => e),
  static: !0
}), Hh = /* @__PURE__ */ P.define({
  combine: (n) => n.length ? n[0] : void 0,
  static: !0
}), Jh = /* @__PURE__ */ P.define(), Kh = /* @__PURE__ */ P.define(), ec = /* @__PURE__ */ P.define(), tc = /* @__PURE__ */ P.define({
  combine: (n) => n.length ? n[0] : !1
});
class mt {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.value = t;
  }
  /**
  Define a new type of annotation.
  */
  static define() {
    return new zd();
  }
}
class zd {
  /**
  Create an instance of this annotation.
  */
  of(e) {
    return new mt(this, e);
  }
}
class Id {
  /**
  @internal
  */
  constructor(e) {
    this.map = e;
  }
  /**
  Create a [state effect](https://codemirror.net/6/docs/ref/#state.StateEffect) instance of this
  type.
  */
  of(e) {
    return new R(this, e);
  }
}
class R {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.value = t;
  }
  /**
  Map this effect through a position mapping. Will return
  `undefined` when that ends up deleting the effect.
  */
  map(e) {
    let t = this.type.map(this.value, e);
    return t === void 0 ? void 0 : t == this.value ? this : new R(this.type, t);
  }
  /**
  Tells you whether this effect object is of a given
  [type](https://codemirror.net/6/docs/ref/#state.StateEffectType).
  */
  is(e) {
    return this.type == e;
  }
  /**
  Define a new effect type. The type parameter indicates the type
  of values that his effect holds. It should be a type that
  doesn't include `undefined`, since that is used in
  [mapping](https://codemirror.net/6/docs/ref/#state.StateEffect.map) to indicate that an effect is
  removed.
  */
  static define(e = {}) {
    return new Id(e.map || ((t) => t));
  }
  /**
  Map an array of effects through a change set.
  */
  static mapEffects(e, t) {
    if (!e.length)
      return e;
    let i = [];
    for (let s of e) {
      let r = s.map(t);
      r && i.push(r);
    }
    return i;
  }
}
R.reconfigure = /* @__PURE__ */ R.define();
R.appendConfig = /* @__PURE__ */ R.define();
class se {
  constructor(e, t, i, s, r, o) {
    this.startState = e, this.changes = t, this.selection = i, this.effects = s, this.annotations = r, this.scrollIntoView = o, this._doc = null, this._state = null, i && Lh(i, t.newLength), r.some((l) => l.type == se.time) || (this.annotations = r.concat(se.time.of(Date.now())));
  }
  /**
  @internal
  */
  static create(e, t, i, s, r, o) {
    return new se(e, t, i, s, r, o);
  }
  /**
  The new document produced by the transaction. Contrary to
  [`.state`](https://codemirror.net/6/docs/ref/#state.Transaction.state)`.doc`, accessing this won't
  force the entire new state to be computed right away, so it is
  recommended that [transaction
  filters](https://codemirror.net/6/docs/ref/#state.EditorState^transactionFilter) use this getter
  when they need to look at the new document.
  */
  get newDoc() {
    return this._doc || (this._doc = this.changes.apply(this.startState.doc));
  }
  /**
  The new selection produced by the transaction. If
  [`this.selection`](https://codemirror.net/6/docs/ref/#state.Transaction.selection) is undefined,
  this will [map](https://codemirror.net/6/docs/ref/#state.EditorSelection.map) the start state's
  current selection through the changes made by the transaction.
  */
  get newSelection() {
    return this.selection || this.startState.selection.map(this.changes);
  }
  /**
  The new state created by the transaction. Computed on demand
  (but retained for subsequent access), so it is recommended not to
  access it in [transaction
  filters](https://codemirror.net/6/docs/ref/#state.EditorState^transactionFilter) when possible.
  */
  get state() {
    return this._state || this.startState.applyTransaction(this), this._state;
  }
  /**
  Get the value of the given annotation type, if any.
  */
  annotation(e) {
    for (let t of this.annotations)
      if (t.type == e)
        return t.value;
  }
  /**
  Indicates whether the transaction changed the document.
  */
  get docChanged() {
    return !this.changes.empty;
  }
  /**
  Indicates whether this transaction reconfigures the state
  (through a [configuration compartment](https://codemirror.net/6/docs/ref/#state.Compartment) or
  with a top-level configuration
  [effect](https://codemirror.net/6/docs/ref/#state.StateEffect^reconfigure).
  */
  get reconfigured() {
    return this.startState.config != this.state.config;
  }
  /**
  Returns true if the transaction has a [user
  event](https://codemirror.net/6/docs/ref/#state.Transaction^userEvent) annotation that is equal to
  or more specific than `event`. For example, if the transaction
  has `"select.pointer"` as user event, `"select"` and
  `"select.pointer"` will match it.
  */
  isUserEvent(e) {
    let t = this.annotation(se.userEvent);
    return !!(t && (t == e || t.length > e.length && t.slice(0, e.length) == e && t[e.length] == "."));
  }
}
se.time = /* @__PURE__ */ mt.define();
se.userEvent = /* @__PURE__ */ mt.define();
se.addToHistory = /* @__PURE__ */ mt.define();
se.remote = /* @__PURE__ */ mt.define();
function jd(n, e) {
  let t = [];
  for (let i = 0, s = 0; ; ) {
    let r, o;
    if (i < n.length && (s == e.length || e[s] >= n[i]))
      r = n[i++], o = n[i++];
    else if (s < e.length)
      r = e[s++], o = e[s++];
    else
      return t;
    !t.length || t[t.length - 1] < r ? t.push(r, o) : t[t.length - 1] < o && (t[t.length - 1] = o);
  }
}
function ic(n, e, t) {
  var i;
  let s, r, o;
  return t ? (s = e.changes, r = ne.empty(e.changes.length), o = n.changes.compose(e.changes)) : (s = e.changes.map(n.changes), r = n.changes.mapDesc(e.changes, !0), o = n.changes.compose(s)), {
    changes: o,
    selection: e.selection ? e.selection.map(r) : (i = n.selection) === null || i === void 0 ? void 0 : i.map(s),
    effects: R.mapEffects(n.effects, s).concat(R.mapEffects(e.effects, r)),
    annotations: n.annotations.length ? n.annotations.concat(e.annotations) : e.annotations,
    scrollIntoView: n.scrollIntoView || e.scrollIntoView
  };
}
function Mr(n, e, t) {
  let i = e.selection, s = si(e.annotations);
  return e.userEvent && (s = s.concat(se.userEvent.of(e.userEvent))), {
    changes: e.changes instanceof ne ? e.changes : ne.of(e.changes || [], t, n.facet(Hh)),
    selection: i && (i instanceof y ? i : y.single(i.anchor, i.head)),
    effects: si(e.effects),
    annotations: s,
    scrollIntoView: !!e.scrollIntoView
  };
}
function nc(n, e, t) {
  let i = Mr(n, e.length ? e[0] : {}, n.doc.length);
  e.length && e[0].filter === !1 && (t = !1);
  for (let r = 1; r < e.length; r++) {
    e[r].filter === !1 && (t = !1);
    let o = !!e[r].sequential;
    i = ic(i, Mr(n, e[r], o ? i.changes.newLength : n.doc.length), o);
  }
  let s = se.create(n, i.changes, i.selection, i.effects, i.annotations, i.scrollIntoView);
  return Nd(t ? Ld(s) : s);
}
function Ld(n) {
  let e = n.startState, t = !0;
  for (let s of e.facet(Jh)) {
    let r = s(n);
    if (r === !1) {
      t = !1;
      break;
    }
    Array.isArray(r) && (t = t === !0 ? r : jd(t, r));
  }
  if (t !== !0) {
    let s, r;
    if (t === !1)
      r = n.changes.invertedDesc, s = ne.empty(e.doc.length);
    else {
      let o = n.changes.filter(t);
      s = o.changes, r = o.filtered.mapDesc(o.changes).invertedDesc;
    }
    n = se.create(e, s, n.selection && n.selection.map(r), R.mapEffects(n.effects, r), n.annotations, n.scrollIntoView);
  }
  let i = e.facet(Kh);
  for (let s = i.length - 1; s >= 0; s--) {
    let r = i[s](n);
    r instanceof se ? n = r : Array.isArray(r) && r.length == 1 && r[0] instanceof se ? n = r[0] : n = nc(e, si(r), !1);
  }
  return n;
}
function Nd(n) {
  let e = n.startState, t = e.facet(ec), i = n;
  for (let s = t.length - 1; s >= 0; s--) {
    let r = t[s](n);
    r && Object.keys(r).length && (i = ic(i, Mr(e, r, n.changes.newLength), !0));
  }
  return i == n ? n : se.create(e, n.changes, n.selection, i.effects, i.annotations, i.scrollIntoView);
}
const Gd = [];
function si(n) {
  return n == null ? Gd : Array.isArray(n) ? n : [n];
}
var j = /* @__PURE__ */ function(n) {
  return n[n.Word = 0] = "Word", n[n.Space = 1] = "Space", n[n.Other = 2] = "Other", n;
}(j || (j = {}));
const Fd = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
let Wr;
try {
  Wr = /* @__PURE__ */ new RegExp("[\\p{Alphabetic}\\p{Number}_]", "u");
} catch {
}
function Hd(n) {
  if (Wr)
    return Wr.test(n);
  for (let e = 0; e < n.length; e++) {
    let t = n[e];
    if (/\w/.test(t) || t > "" && (t.toUpperCase() != t.toLowerCase() || Fd.test(t)))
      return !0;
  }
  return !1;
}
function Jd(n) {
  return (e) => {
    if (!/\S/.test(e))
      return j.Space;
    if (Hd(e))
      return j.Word;
    for (let t = 0; t < n.length; t++)
      if (e.indexOf(n[t]) > -1)
        return j.Word;
    return j.Other;
  };
}
class M {
  constructor(e, t, i, s, r, o) {
    this.config = e, this.doc = t, this.selection = i, this.values = s, this.status = e.statusTemplate.slice(), this.computeSlot = r, o && (o._state = this);
    for (let l = 0; l < this.config.dynamicSlots.length; l++)
      Ui(this, l << 1);
    this.computeSlot = null;
  }
  field(e, t = !0) {
    let i = this.config.address[e.id];
    if (i == null) {
      if (t)
        throw new RangeError("Field is not present in this state");
      return;
    }
    return Ui(this, i), Jn(this, i);
  }
  /**
  Create a [transaction](https://codemirror.net/6/docs/ref/#state.Transaction) that updates this
  state. Any number of [transaction specs](https://codemirror.net/6/docs/ref/#state.TransactionSpec)
  can be passed. Unless
  [`sequential`](https://codemirror.net/6/docs/ref/#state.TransactionSpec.sequential) is set, the
  [changes](https://codemirror.net/6/docs/ref/#state.TransactionSpec.changes) (if any) of each spec
  are assumed to start in the _current_ document (not the document
  produced by previous specs), and its
  [selection](https://codemirror.net/6/docs/ref/#state.TransactionSpec.selection) and
  [effects](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) are assumed to refer
  to the document created by its _own_ changes. The resulting
  transaction contains the combined effect of all the different
  specs. For [selection](https://codemirror.net/6/docs/ref/#state.TransactionSpec.selection), later
  specs take precedence over earlier ones.
  */
  update(...e) {
    return nc(this, e, !0);
  }
  /**
  @internal
  */
  applyTransaction(e) {
    let t = this.config, { base: i, compartments: s } = t;
    for (let o of e.effects)
      o.is(Rs.reconfigure) ? (t && (s = /* @__PURE__ */ new Map(), t.compartments.forEach((l, a) => s.set(a, l)), t = null), s.set(o.value.compartment, o.value.extension)) : o.is(R.reconfigure) ? (t = null, i = o.value) : o.is(R.appendConfig) && (t = null, i = si(i).concat(o.value));
    let r;
    t ? r = e.startState.values.slice() : (t = Hn.resolve(i, s, this), r = new M(t, this.doc, this.selection, t.dynamicSlots.map(() => null), (l, a) => a.reconfigure(l, this), null).values), new M(t, e.newDoc, e.newSelection, r, (o, l) => l.update(o, e), e);
  }
  /**
  Create a [transaction spec](https://codemirror.net/6/docs/ref/#state.TransactionSpec) that
  replaces every selection range with the given content.
  */
  replaceSelection(e) {
    return typeof e == "string" && (e = this.toText(e)), this.changeByRange((t) => ({
      changes: { from: t.from, to: t.to, insert: e },
      range: y.cursor(t.from + e.length)
    }));
  }
  /**
  Create a set of changes and a new selection by running the given
  function for each range in the active selection. The function
  can return an optional set of changes (in the coordinate space
  of the start document), plus an updated range (in the coordinate
  space of the document produced by the call's own changes). This
  method will merge all the changes and ranges into a single
  changeset and selection, and return it as a [transaction
  spec](https://codemirror.net/6/docs/ref/#state.TransactionSpec), which can be passed to
  [`update`](https://codemirror.net/6/docs/ref/#state.EditorState.update).
  */
  changeByRange(e) {
    let t = this.selection, i = e(t.ranges[0]), s = this.changes(i.changes), r = [i.range], o = si(i.effects);
    for (let l = 1; l < t.ranges.length; l++) {
      let a = e(t.ranges[l]), h = this.changes(a.changes), c = h.map(s);
      for (let u = 0; u < l; u++)
        r[u] = r[u].map(c);
      let f = s.mapDesc(h, !0);
      r.push(a.range.map(f)), s = s.compose(c), o = R.mapEffects(o, c).concat(R.mapEffects(si(a.effects), f));
    }
    return {
      changes: s,
      selection: y.create(r, t.mainIndex),
      effects: o
    };
  }
  /**
  Create a [change set](https://codemirror.net/6/docs/ref/#state.ChangeSet) from the given change
  description, taking the state's document length and line
  separator into account.
  */
  changes(e = []) {
    return e instanceof ne ? e : ne.of(e, this.doc.length, this.facet(M.lineSeparator));
  }
  /**
  Using the state's [line
  separator](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator), create a
  [`Text`](https://codemirror.net/6/docs/ref/#state.Text) instance from the given string.
  */
  toText(e) {
    return W.of(e.split(this.facet(M.lineSeparator) || Zr));
  }
  /**
  Return the given range of the document as a string.
  */
  sliceDoc(e = 0, t = this.doc.length) {
    return this.doc.sliceString(e, t, this.lineBreak);
  }
  /**
  Get the value of a state [facet](https://codemirror.net/6/docs/ref/#state.Facet).
  */
  facet(e) {
    let t = this.config.address[e.id];
    return t == null ? e.default : (Ui(this, t), Jn(this, t));
  }
  /**
  Convert this state to a JSON-serializable object. When custom
  fields should be serialized, you can pass them in as an object
  mapping property names (in the resulting object, which should
  not use `doc` or `selection`) to fields.
  */
  toJSON(e) {
    let t = {
      doc: this.sliceDoc(),
      selection: this.selection.toJSON()
    };
    if (e)
      for (let i in e) {
        let s = e[i];
        s instanceof re && this.config.address[s.id] != null && (t[i] = s.spec.toJSON(this.field(e[i]), this));
      }
    return t;
  }
  /**
  Deserialize a state from its JSON representation. When custom
  fields should be deserialized, pass the same object you passed
  to [`toJSON`](https://codemirror.net/6/docs/ref/#state.EditorState.toJSON) when serializing as
  third argument.
  */
  static fromJSON(e, t = {}, i) {
    if (!e || typeof e.doc != "string")
      throw new RangeError("Invalid JSON representation for EditorState");
    let s = [];
    if (i) {
      for (let r in i)
        if (Object.prototype.hasOwnProperty.call(e, r)) {
          let o = i[r], l = e[r];
          s.push(o.init((a) => o.spec.fromJSON(l, a)));
        }
    }
    return M.create({
      doc: e.doc,
      selection: y.fromJSON(e.selection),
      extensions: t.extensions ? s.concat([t.extensions]) : s
    });
  }
  /**
  Create a new state. You'll usually only need this when
  initializing an editor—updated states are created by applying
  transactions.
  */
  static create(e = {}) {
    let t = Hn.resolve(e.extensions || [], /* @__PURE__ */ new Map()), i = e.doc instanceof W ? e.doc : W.of((e.doc || "").split(t.staticFacet(M.lineSeparator) || Zr)), s = e.selection ? e.selection instanceof y ? e.selection : y.single(e.selection.anchor, e.selection.head) : y.single(0);
    return Lh(s, i.length), t.staticFacet(Fh) || (s = s.asSingle()), new M(t, i, s, t.dynamicSlots.map(() => null), (r, o) => o.create(r), null);
  }
  /**
  The size (in columns) of a tab in the document, determined by
  the [`tabSize`](https://codemirror.net/6/docs/ref/#state.EditorState^tabSize) facet.
  */
  get tabSize() {
    return this.facet(M.tabSize);
  }
  /**
  Get the proper [line-break](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator)
  string for this state.
  */
  get lineBreak() {
    return this.facet(M.lineSeparator) || `
`;
  }
  /**
  Returns true when the editor is
  [configured](https://codemirror.net/6/docs/ref/#state.EditorState^readOnly) to be read-only.
  */
  get readOnly() {
    return this.facet(tc);
  }
  /**
  Look up a translation for the given phrase (via the
  [`phrases`](https://codemirror.net/6/docs/ref/#state.EditorState^phrases) facet), or return the
  original string if no translation is found.
  
  If additional arguments are passed, they will be inserted in
  place of markers like `$1` (for the first value) and `$2`, etc.
  A single `$` is equivalent to `$1`, and `$$` will produce a
  literal dollar sign.
  */
  phrase(e, ...t) {
    for (let i of this.facet(M.phrases))
      if (Object.prototype.hasOwnProperty.call(i, e)) {
        e = i[e];
        break;
      }
    return t.length && (e = e.replace(/\$(\$|\d*)/g, (i, s) => {
      if (s == "$")
        return "$";
      let r = +(s || 1);
      return !r || r > t.length ? i : t[r - 1];
    })), e;
  }
  /**
  Find the values for a given language data field, provided by the
  the [`languageData`](https://codemirror.net/6/docs/ref/#state.EditorState^languageData) facet.
  
  Examples of language data fields are...
  
  - [`"commentTokens"`](https://codemirror.net/6/docs/ref/#commands.CommentTokens) for specifying
    comment syntax.
  - [`"autocomplete"`](https://codemirror.net/6/docs/ref/#autocomplete.autocompletion^config.override)
    for providing language-specific completion sources.
  - [`"wordChars"`](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) for adding
    characters that should be considered part of words in this
    language.
  - [`"closeBrackets"`](https://codemirror.net/6/docs/ref/#autocomplete.CloseBracketConfig) controls
    bracket closing behavior.
  */
  languageDataAt(e, t, i = -1) {
    let s = [];
    for (let r of this.facet(Gh))
      for (let o of r(this, t, i))
        Object.prototype.hasOwnProperty.call(o, e) && s.push(o[e]);
    return s;
  }
  /**
  Return a function that can categorize strings (expected to
  represent a single [grapheme cluster](https://codemirror.net/6/docs/ref/#state.findClusterBreak))
  into one of:
  
   - Word (contains an alphanumeric character or a character
     explicitly listed in the local language's `"wordChars"`
     language data, which should be a string)
   - Space (contains only whitespace)
   - Other (anything else)
  */
  charCategorizer(e) {
    return Jd(this.languageDataAt("wordChars", e).join(""));
  }
  /**
  Find the word at the given position, meaning the range
  containing all [word](https://codemirror.net/6/docs/ref/#state.CharCategory.Word) characters
  around it. If no word characters are adjacent to the position,
  this returns null.
  */
  wordAt(e) {
    let { text: t, from: i, length: s } = this.doc.lineAt(e), r = this.charCategorizer(e), o = e - i, l = e - i;
    for (; o > 0; ) {
      let a = Oe(t, o, !1);
      if (r(t.slice(a, o)) != j.Word)
        break;
      o = a;
    }
    for (; l < s; ) {
      let a = Oe(t, l);
      if (r(t.slice(l, a)) != j.Word)
        break;
      l = a;
    }
    return o == l ? null : y.range(o + i, l + i);
  }
}
M.allowMultipleSelections = Fh;
M.tabSize = /* @__PURE__ */ P.define({
  combine: (n) => n.length ? n[0] : 4
});
M.lineSeparator = Hh;
M.readOnly = tc;
M.phrases = /* @__PURE__ */ P.define({
  compare(n, e) {
    let t = Object.keys(n), i = Object.keys(e);
    return t.length == i.length && t.every((s) => n[s] == e[s]);
  }
});
M.languageData = Gh;
M.changeFilter = Jh;
M.transactionFilter = Kh;
M.transactionExtender = ec;
Rs.reconfigure = /* @__PURE__ */ R.define();
function lt(n, e, t = {}) {
  let i = {};
  for (let s of n)
    for (let r of Object.keys(s)) {
      let o = s[r], l = i[r];
      if (l === void 0)
        i[r] = o;
      else if (!(l === o || o === void 0))
        if (Object.hasOwnProperty.call(t, r))
          i[r] = t[r](l, o);
        else
          throw new Error("Config merge conflict for field " + r);
    }
  for (let s in e)
    i[s] === void 0 && (i[s] = e[s]);
  return i;
}
class Bt {
  /**
  Compare this value with another value. Used when comparing
  rangesets. The default implementation compares by identity.
  Unless you are only creating a fixed number of unique instances
  of your value type, it is a good idea to implement this
  properly.
  */
  eq(e) {
    return this == e;
  }
  /**
  Create a [range](https://codemirror.net/6/docs/ref/#state.Range) with this value.
  */
  range(e, t = e) {
    return Dr.create(e, t, this);
  }
}
Bt.prototype.startSide = Bt.prototype.endSide = 0;
Bt.prototype.point = !1;
Bt.prototype.mapMode = ce.TrackDel;
let Dr = class sc {
  constructor(e, t, i) {
    this.from = e, this.to = t, this.value = i;
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new sc(e, t, i);
  }
};
function Ur(n, e) {
  return n.from - e.from || n.value.startSide - e.value.startSide;
}
class Zo {
  constructor(e, t, i, s) {
    this.from = e, this.to = t, this.value = i, this.maxPoint = s;
  }
  get length() {
    return this.to[this.to.length - 1];
  }
  // Find the index of the given position and side. Use the ranges'
  // `from` pos when `end == false`, `to` when `end == true`.
  findIndex(e, t, i, s = 0) {
    let r = i ? this.to : this.from;
    for (let o = s, l = r.length; ; ) {
      if (o == l)
        return o;
      let a = o + l >> 1, h = r[a] - e || (i ? this.value[a].endSide : this.value[a].startSide) - t;
      if (a == o)
        return h >= 0 ? o : l;
      h >= 0 ? l = a : o = a + 1;
    }
  }
  between(e, t, i, s) {
    for (let r = this.findIndex(t, -1e9, !0), o = this.findIndex(i, 1e9, !1, r); r < o; r++)
      if (s(this.from[r] + e, this.to[r] + e, this.value[r]) === !1)
        return !1;
  }
  map(e, t) {
    let i = [], s = [], r = [], o = -1, l = -1;
    for (let a = 0; a < this.value.length; a++) {
      let h = this.value[a], c = this.from[a] + e, f = this.to[a] + e, u, d;
      if (c == f) {
        let O = t.mapPos(c, h.startSide, h.mapMode);
        if (O == null || (u = d = O, h.startSide != h.endSide && (d = t.mapPos(c, h.endSide), d < u)))
          continue;
      } else if (u = t.mapPos(c, h.startSide), d = t.mapPos(f, h.endSide), u > d || u == d && h.startSide > 0 && h.endSide <= 0)
        continue;
      (d - u || h.endSide - h.startSide) < 0 || (o < 0 && (o = u), h.point && (l = Math.max(l, d - u)), i.push(h), s.push(u - o), r.push(d - o));
    }
    return { mapped: i.length ? new Zo(s, r, i, l) : null, pos: o };
  }
}
class D {
  constructor(e, t, i, s) {
    this.chunkPos = e, this.chunk = t, this.nextLayer = i, this.maxPoint = s;
  }
  /**
  @internal
  */
  static create(e, t, i, s) {
    return new D(e, t, i, s);
  }
  /**
  @internal
  */
  get length() {
    let e = this.chunk.length - 1;
    return e < 0 ? 0 : Math.max(this.chunkEnd(e), this.nextLayer.length);
  }
  /**
  The number of ranges in the set.
  */
  get size() {
    if (this.isEmpty)
      return 0;
    let e = this.nextLayer.size;
    for (let t of this.chunk)
      e += t.value.length;
    return e;
  }
  /**
  @internal
  */
  chunkEnd(e) {
    return this.chunkPos[e] + this.chunk[e].length;
  }
  /**
  Update the range set, optionally adding new ranges or filtering
  out existing ones.
  
  (Note: The type parameter is just there as a kludge to work
  around TypeScript variance issues that prevented `RangeSet<X>`
  from being a subtype of `RangeSet<Y>` when `X` is a subtype of
  `Y`.)
  */
  update(e) {
    let { add: t = [], sort: i = !1, filterFrom: s = 0, filterTo: r = this.length } = e, o = e.filter;
    if (t.length == 0 && !o)
      return this;
    if (i && (t = t.slice().sort(Ur)), this.isEmpty)
      return t.length ? D.of(t) : this;
    let l = new rc(this, null, -1).goto(0), a = 0, h = [], c = new Pt();
    for (; l.value || a < t.length; )
      if (a < t.length && (l.from - t[a].from || l.startSide - t[a].value.startSide) >= 0) {
        let f = t[a++];
        c.addInner(f.from, f.to, f.value) || h.push(f);
      } else
        l.rangeIndex == 1 && l.chunkIndex < this.chunk.length && (a == t.length || this.chunkEnd(l.chunkIndex) < t[a].from) && (!o || s > this.chunkEnd(l.chunkIndex) || r < this.chunkPos[l.chunkIndex]) && c.addChunk(this.chunkPos[l.chunkIndex], this.chunk[l.chunkIndex]) ? l.nextChunk() : ((!o || s > l.to || r < l.from || o(l.from, l.to, l.value)) && (c.addInner(l.from, l.to, l.value) || h.push(Dr.create(l.from, l.to, l.value))), l.next());
    return c.finishInner(this.nextLayer.isEmpty && !h.length ? D.empty : this.nextLayer.update({ add: h, filter: o, filterFrom: s, filterTo: r }));
  }
  /**
  Map this range set through a set of changes, return the new set.
  */
  map(e) {
    if (e.empty || this.isEmpty)
      return this;
    let t = [], i = [], s = -1;
    for (let o = 0; o < this.chunk.length; o++) {
      let l = this.chunkPos[o], a = this.chunk[o], h = e.touchesRange(l, l + a.length);
      if (h === !1)
        s = Math.max(s, a.maxPoint), t.push(a), i.push(e.mapPos(l));
      else if (h === !0) {
        let { mapped: c, pos: f } = a.map(l, e);
        c && (s = Math.max(s, c.maxPoint), t.push(c), i.push(f));
      }
    }
    let r = this.nextLayer.map(e);
    return t.length == 0 ? r : new D(i, t, r || D.empty, s);
  }
  /**
  Iterate over the ranges that touch the region `from` to `to`,
  calling `f` for each. There is no guarantee that the ranges will
  be reported in any specific order. When the callback returns
  `false`, iteration stops.
  */
  between(e, t, i) {
    if (!this.isEmpty) {
      for (let s = 0; s < this.chunk.length; s++) {
        let r = this.chunkPos[s], o = this.chunk[s];
        if (t >= r && e <= r + o.length && o.between(r, e - r, t - r, i) === !1)
          return;
      }
      this.nextLayer.between(e, t, i);
    }
  }
  /**
  Iterate over the ranges in this set, in order, including all
  ranges that end at or after `from`.
  */
  iter(e = 0) {
    return zi.from([this]).goto(e);
  }
  /**
  @internal
  */
  get isEmpty() {
    return this.nextLayer == this;
  }
  /**
  Iterate over the ranges in a collection of sets, in order,
  starting from `from`.
  */
  static iter(e, t = 0) {
    return zi.from(e).goto(t);
  }
  /**
  Iterate over two groups of sets, calling methods on `comparator`
  to notify it of possible differences.
  */
  static compare(e, t, i, s, r = -1) {
    let o = e.filter((f) => f.maxPoint > 0 || !f.isEmpty && f.maxPoint >= r), l = t.filter((f) => f.maxPoint > 0 || !f.isEmpty && f.maxPoint >= r), a = bl(o, l, i), h = new $i(o, a, r), c = new $i(l, a, r);
    i.iterGaps((f, u, d) => Ql(h, f, c, u, d, s)), i.empty && i.length == 0 && Ql(h, 0, c, 0, 0, s);
  }
  /**
  Compare the contents of two groups of range sets, returning true
  if they are equivalent in the given range.
  */
  static eq(e, t, i = 0, s) {
    s == null && (s = 1e9 - 1);
    let r = e.filter((c) => !c.isEmpty && t.indexOf(c) < 0), o = t.filter((c) => !c.isEmpty && e.indexOf(c) < 0);
    if (r.length != o.length)
      return !1;
    if (!r.length)
      return !0;
    let l = bl(r, o), a = new $i(r, l, 0).goto(i), h = new $i(o, l, 0).goto(i);
    for (; ; ) {
      if (a.to != h.to || !qr(a.active, h.active) || a.point && (!h.point || !a.point.eq(h.point)))
        return !1;
      if (a.to > s)
        return !0;
      a.next(), h.next();
    }
  }
  /**
  Iterate over a group of range sets at the same time, notifying
  the iterator about the ranges covering every given piece of
  content. Returns the open count (see
  [`SpanIterator.span`](https://codemirror.net/6/docs/ref/#state.SpanIterator.span)) at the end
  of the iteration.
  */
  static spans(e, t, i, s, r = -1) {
    let o = new $i(e, null, r).goto(t), l = t, a = o.openStart;
    for (; ; ) {
      let h = Math.min(o.to, i);
      if (o.point) {
        let c = o.activeForPoint(o.to), f = o.pointFrom < t ? c.length + 1 : Math.min(c.length, a);
        s.point(l, h, o.point, c, f, o.pointRank), a = Math.min(o.openEnd(h), c.length);
      } else
        h > l && (s.span(l, h, o.active, a), a = o.openEnd(h));
      if (o.to > i)
        return a + (o.point && o.to > i ? 1 : 0);
      l = o.to, o.next();
    }
  }
  /**
  Create a range set for the given range or array of ranges. By
  default, this expects the ranges to be _sorted_ (by start
  position and, if two start at the same position,
  `value.startSide`). You can pass `true` as second argument to
  cause the method to sort them.
  */
  static of(e, t = !1) {
    let i = new Pt();
    for (let s of e instanceof Dr ? [e] : t ? Kd(e) : e)
      i.add(s.from, s.to, s.value);
    return i.finish();
  }
}
D.empty = /* @__PURE__ */ new D([], [], null, -1);
function Kd(n) {
  if (n.length > 1)
    for (let e = n[0], t = 1; t < n.length; t++) {
      let i = n[t];
      if (Ur(e, i) > 0)
        return n.slice().sort(Ur);
      e = i;
    }
  return n;
}
D.empty.nextLayer = D.empty;
class Pt {
  finishChunk(e) {
    this.chunks.push(new Zo(this.from, this.to, this.value, this.maxPoint)), this.chunkPos.push(this.chunkStart), this.chunkStart = -1, this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint), this.maxPoint = -1, e && (this.from = [], this.to = [], this.value = []);
  }
  /**
  Create an empty builder.
  */
  constructor() {
    this.chunks = [], this.chunkPos = [], this.chunkStart = -1, this.last = null, this.lastFrom = -1e9, this.lastTo = -1e9, this.from = [], this.to = [], this.value = [], this.maxPoint = -1, this.setMaxPoint = -1, this.nextLayer = null;
  }
  /**
  Add a range. Ranges should be added in sorted (by `from` and
  `value.startSide`) order.
  */
  add(e, t, i) {
    this.addInner(e, t, i) || (this.nextLayer || (this.nextLayer = new Pt())).add(e, t, i);
  }
  /**
  @internal
  */
  addInner(e, t, i) {
    let s = e - this.lastTo || i.startSide - this.last.endSide;
    if (s <= 0 && (e - this.lastFrom || i.startSide - this.last.startSide) < 0)
      throw new Error("Ranges must be added sorted by `from` position and `startSide`");
    return s < 0 ? !1 : (this.from.length == 250 && this.finishChunk(!0), this.chunkStart < 0 && (this.chunkStart = e), this.from.push(e - this.chunkStart), this.to.push(t - this.chunkStart), this.last = i, this.lastFrom = e, this.lastTo = t, this.value.push(i), i.point && (this.maxPoint = Math.max(this.maxPoint, t - e)), !0);
  }
  /**
  @internal
  */
  addChunk(e, t) {
    if ((e - this.lastTo || t.value[0].startSide - this.last.endSide) < 0)
      return !1;
    this.from.length && this.finishChunk(!0), this.setMaxPoint = Math.max(this.setMaxPoint, t.maxPoint), this.chunks.push(t), this.chunkPos.push(e);
    let i = t.value.length - 1;
    return this.last = t.value[i], this.lastFrom = t.from[i] + e, this.lastTo = t.to[i] + e, !0;
  }
  /**
  Finish the range set. Returns the new set. The builder can't be
  used anymore after this has been called.
  */
  finish() {
    return this.finishInner(D.empty);
  }
  /**
  @internal
  */
  finishInner(e) {
    if (this.from.length && this.finishChunk(!1), this.chunks.length == 0)
      return e;
    let t = D.create(this.chunkPos, this.chunks, this.nextLayer ? this.nextLayer.finishInner(e) : e, this.setMaxPoint);
    return this.from = null, t;
  }
}
function bl(n, e, t) {
  let i = /* @__PURE__ */ new Map();
  for (let r of n)
    for (let o = 0; o < r.chunk.length; o++)
      r.chunk[o].maxPoint <= 0 && i.set(r.chunk[o], r.chunkPos[o]);
  let s = /* @__PURE__ */ new Set();
  for (let r of e)
    for (let o = 0; o < r.chunk.length; o++) {
      let l = i.get(r.chunk[o]);
      l != null && (t ? t.mapPos(l) : l) == r.chunkPos[o] && !(t != null && t.touchesRange(l, l + r.chunk[o].length)) && s.add(r.chunk[o]);
    }
  return s;
}
class rc {
  constructor(e, t, i, s = 0) {
    this.layer = e, this.skip = t, this.minPoint = i, this.rank = s;
  }
  get startSide() {
    return this.value ? this.value.startSide : 0;
  }
  get endSide() {
    return this.value ? this.value.endSide : 0;
  }
  goto(e, t = -1e9) {
    return this.chunkIndex = this.rangeIndex = 0, this.gotoInner(e, t, !1), this;
  }
  gotoInner(e, t, i) {
    for (; this.chunkIndex < this.layer.chunk.length; ) {
      let s = this.layer.chunk[this.chunkIndex];
      if (!(this.skip && this.skip.has(s) || this.layer.chunkEnd(this.chunkIndex) < e || s.maxPoint < this.minPoint))
        break;
      this.chunkIndex++, i = !1;
    }
    if (this.chunkIndex < this.layer.chunk.length) {
      let s = this.layer.chunk[this.chunkIndex].findIndex(e - this.layer.chunkPos[this.chunkIndex], t, !0);
      (!i || this.rangeIndex < s) && this.setRangeIndex(s);
    }
    this.next();
  }
  forward(e, t) {
    (this.to - e || this.endSide - t) < 0 && this.gotoInner(e, t, !0);
  }
  next() {
    for (; ; )
      if (this.chunkIndex == this.layer.chunk.length) {
        this.from = this.to = 1e9, this.value = null;
        break;
      } else {
        let e = this.layer.chunkPos[this.chunkIndex], t = this.layer.chunk[this.chunkIndex], i = e + t.from[this.rangeIndex];
        if (this.from = i, this.to = e + t.to[this.rangeIndex], this.value = t.value[this.rangeIndex], this.setRangeIndex(this.rangeIndex + 1), this.minPoint < 0 || this.value.point && this.to - this.from >= this.minPoint)
          break;
      }
  }
  setRangeIndex(e) {
    if (e == this.layer.chunk[this.chunkIndex].value.length) {
      if (this.chunkIndex++, this.skip)
        for (; this.chunkIndex < this.layer.chunk.length && this.skip.has(this.layer.chunk[this.chunkIndex]); )
          this.chunkIndex++;
      this.rangeIndex = 0;
    } else
      this.rangeIndex = e;
  }
  nextChunk() {
    this.chunkIndex++, this.rangeIndex = 0, this.next();
  }
  compare(e) {
    return this.from - e.from || this.startSide - e.startSide || this.rank - e.rank || this.to - e.to || this.endSide - e.endSide;
  }
}
class zi {
  constructor(e) {
    this.heap = e;
  }
  static from(e, t = null, i = -1) {
    let s = [];
    for (let r = 0; r < e.length; r++)
      for (let o = e[r]; !o.isEmpty; o = o.nextLayer)
        o.maxPoint >= i && s.push(new rc(o, t, i, r));
    return s.length == 1 ? s[0] : new zi(s);
  }
  get startSide() {
    return this.value ? this.value.startSide : 0;
  }
  goto(e, t = -1e9) {
    for (let i of this.heap)
      i.goto(e, t);
    for (let i = this.heap.length >> 1; i >= 0; i--)
      Fs(this.heap, i);
    return this.next(), this;
  }
  forward(e, t) {
    for (let i of this.heap)
      i.forward(e, t);
    for (let i = this.heap.length >> 1; i >= 0; i--)
      Fs(this.heap, i);
    (this.to - e || this.value.endSide - t) < 0 && this.next();
  }
  next() {
    if (this.heap.length == 0)
      this.from = this.to = 1e9, this.value = null, this.rank = -1;
    else {
      let e = this.heap[0];
      this.from = e.from, this.to = e.to, this.value = e.value, this.rank = e.rank, e.value && e.next(), Fs(this.heap, 0);
    }
  }
}
function Fs(n, e) {
  for (let t = n[e]; ; ) {
    let i = (e << 1) + 1;
    if (i >= n.length)
      break;
    let s = n[i];
    if (i + 1 < n.length && s.compare(n[i + 1]) >= 0 && (s = n[i + 1], i++), t.compare(s) < 0)
      break;
    n[i] = t, n[e] = s, e = i;
  }
}
class $i {
  constructor(e, t, i) {
    this.minPoint = i, this.active = [], this.activeTo = [], this.activeRank = [], this.minActive = -1, this.point = null, this.pointFrom = 0, this.pointRank = 0, this.to = -1e9, this.endSide = 0, this.openStart = -1, this.cursor = zi.from(e, t, i);
  }
  goto(e, t = -1e9) {
    return this.cursor.goto(e, t), this.active.length = this.activeTo.length = this.activeRank.length = 0, this.minActive = -1, this.to = e, this.endSide = t, this.openStart = -1, this.next(), this;
  }
  forward(e, t) {
    for (; this.minActive > -1 && (this.activeTo[this.minActive] - e || this.active[this.minActive].endSide - t) < 0; )
      this.removeActive(this.minActive);
    this.cursor.forward(e, t);
  }
  removeActive(e) {
    On(this.active, e), On(this.activeTo, e), On(this.activeRank, e), this.minActive = xl(this.active, this.activeTo);
  }
  addActive(e) {
    let t = 0, { value: i, to: s, rank: r } = this.cursor;
    for (; t < this.activeRank.length && this.activeRank[t] <= r; )
      t++;
    pn(this.active, t, i), pn(this.activeTo, t, s), pn(this.activeRank, t, r), e && pn(e, t, this.cursor.from), this.minActive = xl(this.active, this.activeTo);
  }
  // After calling this, if `this.point` != null, the next range is a
  // point. Otherwise, it's a regular range, covered by `this.active`.
  next() {
    let e = this.to, t = this.point;
    this.point = null;
    let i = this.openStart < 0 ? [] : null;
    for (; ; ) {
      let s = this.minActive;
      if (s > -1 && (this.activeTo[s] - this.cursor.from || this.active[s].endSide - this.cursor.startSide) < 0) {
        if (this.activeTo[s] > e) {
          this.to = this.activeTo[s], this.endSide = this.active[s].endSide;
          break;
        }
        this.removeActive(s), i && On(i, s);
      } else if (this.cursor.value)
        if (this.cursor.from > e) {
          this.to = this.cursor.from, this.endSide = this.cursor.startSide;
          break;
        } else {
          let r = this.cursor.value;
          if (!r.point)
            this.addActive(i), this.cursor.next();
          else if (t && this.cursor.to == this.to && this.cursor.from < this.cursor.to)
            this.cursor.next();
          else {
            this.point = r, this.pointFrom = this.cursor.from, this.pointRank = this.cursor.rank, this.to = this.cursor.to, this.endSide = r.endSide, this.cursor.next(), this.forward(this.to, this.endSide);
            break;
          }
        }
      else {
        this.to = this.endSide = 1e9;
        break;
      }
    }
    if (i) {
      this.openStart = 0;
      for (let s = i.length - 1; s >= 0 && i[s] < e; s--)
        this.openStart++;
    }
  }
  activeForPoint(e) {
    if (!this.active.length)
      return this.active;
    let t = [];
    for (let i = this.active.length - 1; i >= 0 && !(this.activeRank[i] < this.pointRank); i--)
      (this.activeTo[i] > e || this.activeTo[i] == e && this.active[i].endSide >= this.point.endSide) && t.push(this.active[i]);
    return t.reverse();
  }
  openEnd(e) {
    let t = 0;
    for (let i = this.activeTo.length - 1; i >= 0 && this.activeTo[i] > e; i--)
      t++;
    return t;
  }
}
function Ql(n, e, t, i, s, r) {
  n.goto(e), t.goto(i);
  let o = i + s, l = i, a = i - e;
  for (; ; ) {
    let h = n.to + a - t.to || n.endSide - t.endSide, c = h < 0 ? n.to + a : t.to, f = Math.min(c, o);
    if (n.point || t.point ? n.point && t.point && (n.point == t.point || n.point.eq(t.point)) && qr(n.activeForPoint(n.to), t.activeForPoint(t.to)) || r.comparePoint(l, f, n.point, t.point) : f > l && !qr(n.active, t.active) && r.compareRange(l, f, n.active, t.active), c > o)
      break;
    l = c, h <= 0 && n.next(), h >= 0 && t.next();
  }
}
function qr(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (n[t] != e[t] && !n[t].eq(e[t]))
      return !1;
  return !0;
}
function On(n, e) {
  for (let t = e, i = n.length - 1; t < i; t++)
    n[t] = n[t + 1];
  n.pop();
}
function pn(n, e, t) {
  for (let i = n.length - 1; i >= e; i--)
    n[i + 1] = n[i];
  n[e] = t;
}
function xl(n, e) {
  let t = -1, i = 1e9;
  for (let s = 0; s < e.length; s++)
    (e[s] - i || n[s].endSide - n[t].endSide) < 0 && (t = s, i = e[s]);
  return t;
}
function nn(n, e, t = n.length) {
  let i = 0;
  for (let s = 0; s < t; )
    n.charCodeAt(s) == 9 ? (i += e - i % e, s++) : (i++, s = Oe(n, s));
  return i;
}
function Er(n, e, t, i) {
  for (let s = 0, r = 0; ; ) {
    if (r >= e)
      return s;
    if (s == n.length)
      break;
    r += n.charCodeAt(s) == 9 ? t - r % t : 1, s = Oe(n, s);
  }
  return i === !0 ? -1 : n.length;
}
const _r = "ͼ", wl = typeof Symbol > "u" ? "__" + _r : Symbol.for(_r), Br = typeof Symbol > "u" ? "__styleSet" + Math.floor(Math.random() * 1e8) : Symbol("styleSet"), $l = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : {};
class Ct {
  // :: (Object<Style>, ?{finish: ?(string) → string})
  // Create a style module from the given spec.
  //
  // When `finish` is given, it is called on regular (non-`@`)
  // selectors (after `&` expansion) to compute the final selector.
  constructor(e, t) {
    this.rules = [];
    let { finish: i } = t || {};
    function s(o) {
      return /^@/.test(o) ? [o] : o.split(/,\s*/);
    }
    function r(o, l, a, h) {
      let c = [], f = /^@(\w+)\b/.exec(o[0]), u = f && f[1] == "keyframes";
      if (f && l == null)
        return a.push(o[0] + ";");
      for (let d in l) {
        let O = l[d];
        if (/&/.test(d))
          r(
            d.split(/,\s*/).map((m) => o.map((g) => m.replace(/&/, g))).reduce((m, g) => m.concat(g)),
            O,
            a
          );
        else if (O && typeof O == "object") {
          if (!f)
            throw new RangeError("The value of a property (" + d + ") should be a primitive value.");
          r(s(d), O, c, u);
        } else
          O != null && c.push(d.replace(/_.*/, "").replace(/[A-Z]/g, (m) => "-" + m.toLowerCase()) + ": " + O + ";");
      }
      (c.length || u) && a.push((i && !f && !h ? o.map(i) : o).join(", ") + " {" + c.join(" ") + "}");
    }
    for (let o in e)
      r(s(o), e[o], this.rules);
  }
  // :: () → string
  // Returns a string containing the module's CSS rules.
  getRules() {
    return this.rules.join(`
`);
  }
  // :: () → string
  // Generate a new unique CSS class name.
  static newName() {
    let e = $l[wl] || 1;
    return $l[wl] = e + 1, _r + e.toString(36);
  }
  // :: (union<Document, ShadowRoot>, union<[StyleModule], StyleModule>)
  //
  // Mount the given set of modules in the given DOM root, which ensures
  // that the CSS rules defined by the module are available in that
  // context.
  //
  // Rules are only added to the document once per root.
  //
  // Rule order will follow the order of the modules, so that rules from
  // modules later in the array take precedence of those from earlier
  // modules. If you call this function multiple times for the same root
  // in a way that changes the order of already mounted modules, the old
  // order will be changed.
  static mount(e, t) {
    (e[Br] || new eO(e)).mount(Array.isArray(t) ? t : [t]);
  }
}
let kl = /* @__PURE__ */ new Map();
class eO {
  constructor(e) {
    let t = e.ownerDocument || e, i = t.defaultView;
    if (!e.head && e.adoptedStyleSheets && i.CSSStyleSheet) {
      let s = kl.get(t);
      if (s)
        return e.adoptedStyleSheets = [s.sheet, ...e.adoptedStyleSheets], e[Br] = s;
      this.sheet = new i.CSSStyleSheet(), e.adoptedStyleSheets = [this.sheet, ...e.adoptedStyleSheets], kl.set(t, this);
    } else {
      this.styleTag = t.createElement("style");
      let s = e.head || e;
      s.insertBefore(this.styleTag, s.firstChild);
    }
    this.modules = [], e[Br] = this;
  }
  mount(e) {
    let t = this.sheet, i = 0, s = 0;
    for (let r = 0; r < e.length; r++) {
      let o = e[r], l = this.modules.indexOf(o);
      if (l < s && l > -1 && (this.modules.splice(l, 1), s--, l = -1), l == -1) {
        if (this.modules.splice(s++, 0, o), t)
          for (let a = 0; a < o.rules.length; a++)
            t.insertRule(o.rules[a], i++);
      } else {
        for (; s < l; )
          i += this.modules[s++].rules.length;
        i += o.rules.length, s++;
      }
    }
    if (!t) {
      let r = "";
      for (let o = 0; o < this.modules.length; o++)
        r += this.modules[o].getRules() + `
`;
      this.styleTag.textContent = r;
    }
  }
}
var Xt = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
}, Ii = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: '"'
}, tO = typeof navigator < "u" && /Mac/.test(navigator.platform), iO = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var he = 0; he < 10; he++)
  Xt[48 + he] = Xt[96 + he] = String(he);
for (var he = 1; he <= 24; he++)
  Xt[he + 111] = "F" + he;
for (var he = 65; he <= 90; he++)
  Xt[he] = String.fromCharCode(he + 32), Ii[he] = String.fromCharCode(he);
for (var Hs in Xt)
  Ii.hasOwnProperty(Hs) || (Ii[Hs] = Xt[Hs]);
function nO(n) {
  var e = tO && n.metaKey && n.shiftKey && !n.ctrlKey && !n.altKey || iO && n.shiftKey && n.key && n.key.length == 1 || n.key == "Unidentified", t = !e && n.key || (n.shiftKey ? Ii : Xt)[n.keyCode] || n.key || "Unidentified";
  return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
function Kn(n) {
  let e;
  return n.nodeType == 11 ? e = n.getSelection ? n : n.ownerDocument : e = n, e.getSelection();
}
function zr(n, e) {
  return e ? n == e || n.contains(e.nodeType != 1 ? e.parentNode : e) : !1;
}
function sO(n) {
  let e = n.activeElement;
  for (; e && e.shadowRoot; )
    e = e.shadowRoot.activeElement;
  return e;
}
function Dn(n, e) {
  if (!e.anchorNode)
    return !1;
  try {
    return zr(n, e.anchorNode);
  } catch {
    return !1;
  }
}
function ji(n) {
  return n.nodeType == 3 ? zt(n, 0, n.nodeValue.length).getClientRects() : n.nodeType == 1 ? n.getClientRects() : [];
}
function es(n, e, t, i) {
  return t ? vl(n, e, t, i, -1) || vl(n, e, t, i, 1) : !1;
}
function ts(n) {
  for (var e = 0; ; e++)
    if (n = n.previousSibling, !n)
      return e;
}
function vl(n, e, t, i, s) {
  for (; ; ) {
    if (n == t && e == i)
      return !0;
    if (e == (s < 0 ? 0 : Tt(n))) {
      if (n.nodeName == "DIV")
        return !1;
      let r = n.parentNode;
      if (!r || r.nodeType != 1)
        return !1;
      e = ts(n) + (s < 0 ? 0 : 1), n = r;
    } else if (n.nodeType == 1) {
      if (n = n.childNodes[e + (s < 0 ? -1 : 0)], n.nodeType == 1 && n.contentEditable == "false")
        return !1;
      e = s < 0 ? Tt(n) : 0;
    } else
      return !1;
  }
}
function Tt(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function Ro(n, e) {
  let t = e ? n.left : n.right;
  return { left: t, right: t, top: n.top, bottom: n.bottom };
}
function rO(n) {
  return {
    left: 0,
    right: n.innerWidth,
    top: 0,
    bottom: n.innerHeight
  };
}
function oO(n, e, t, i, s, r, o, l) {
  let a = n.ownerDocument, h = a.defaultView || window;
  for (let c = n, f = !1; c && !f; )
    if (c.nodeType == 1) {
      let u, d = c == a.body;
      if (d)
        u = rO(h);
      else {
        if (/^(fixed|sticky)$/.test(getComputedStyle(c).position) && (f = !0), c.scrollHeight <= c.clientHeight && c.scrollWidth <= c.clientWidth) {
          c = c.assignedSlot || c.parentNode;
          continue;
        }
        let g = c.getBoundingClientRect();
        u = {
          left: g.left,
          right: g.left + c.clientWidth,
          top: g.top,
          bottom: g.top + c.clientHeight
        };
      }
      let O = 0, m = 0;
      if (s == "nearest")
        e.top < u.top ? (m = -(u.top - e.top + o), t > 0 && e.bottom > u.bottom + m && (m = e.bottom - u.bottom + m + o)) : e.bottom > u.bottom && (m = e.bottom - u.bottom + o, t < 0 && e.top - m < u.top && (m = -(u.top + m - e.top + o)));
      else {
        let g = e.bottom - e.top, S = u.bottom - u.top;
        m = (s == "center" && g <= S ? e.top + g / 2 - S / 2 : s == "start" || s == "center" && t < 0 ? e.top - o : e.bottom - S + o) - u.top;
      }
      if (i == "nearest" ? e.left < u.left ? (O = -(u.left - e.left + r), t > 0 && e.right > u.right + O && (O = e.right - u.right + O + r)) : e.right > u.right && (O = e.right - u.right + r, t < 0 && e.left < u.left + O && (O = -(u.left + O - e.left + r))) : O = (i == "center" ? e.left + (e.right - e.left) / 2 - (u.right - u.left) / 2 : i == "start" == l ? e.left - r : e.right - (u.right - u.left) + r) - u.left, O || m)
        if (d)
          h.scrollBy(O, m);
        else {
          let g = 0, S = 0;
          if (m) {
            let b = c.scrollTop;
            c.scrollTop += m, S = c.scrollTop - b;
          }
          if (O) {
            let b = c.scrollLeft;
            c.scrollLeft += O, g = c.scrollLeft - b;
          }
          e = {
            left: e.left - g,
            top: e.top - S,
            right: e.right - g,
            bottom: e.bottom - S
          }, g && Math.abs(g - O) < 1 && (i = "nearest"), S && Math.abs(S - m) < 1 && (s = "nearest");
        }
      if (d)
        break;
      c = c.assignedSlot || c.parentNode;
    } else if (c.nodeType == 11)
      c = c.host;
    else
      break;
}
function lO(n) {
  let e = n.ownerDocument;
  for (let t = n.parentNode; t && t != e.body; )
    if (t.nodeType == 1) {
      if (t.scrollHeight > t.clientHeight || t.scrollWidth > t.clientWidth)
        return t;
      t = t.assignedSlot || t.parentNode;
    } else if (t.nodeType == 11)
      t = t.host;
    else
      break;
  return null;
}
class aO {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  eq(e) {
    return this.anchorNode == e.anchorNode && this.anchorOffset == e.anchorOffset && this.focusNode == e.focusNode && this.focusOffset == e.focusOffset;
  }
  setRange(e) {
    let { anchorNode: t, focusNode: i } = e;
    this.set(t, Math.min(e.anchorOffset, t ? Tt(t) : 0), i, Math.min(e.focusOffset, i ? Tt(i) : 0));
  }
  set(e, t, i, s) {
    this.anchorNode = e, this.anchorOffset = t, this.focusNode = i, this.focusOffset = s;
  }
}
let Gt = null;
function oc(n) {
  if (n.setActive)
    return n.setActive();
  if (Gt)
    return n.focus(Gt);
  let e = [];
  for (let t = n; t && (e.push(t, t.scrollTop, t.scrollLeft), t != t.ownerDocument); t = t.parentNode)
    ;
  if (n.focus(Gt == null ? {
    get preventScroll() {
      return Gt = { preventScroll: !0 }, !0;
    }
  } : void 0), !Gt) {
    Gt = !1;
    for (let t = 0; t < e.length; ) {
      let i = e[t++], s = e[t++], r = e[t++];
      i.scrollTop != s && (i.scrollTop = s), i.scrollLeft != r && (i.scrollLeft = r);
    }
  }
}
let Pl;
function zt(n, e, t = e) {
  let i = Pl || (Pl = document.createRange());
  return i.setEnd(n, t), i.setStart(n, e), i;
}
function ri(n, e, t) {
  let i = { key: e, code: e, keyCode: t, which: t, cancelable: !0 }, s = new KeyboardEvent("keydown", i);
  s.synthetic = !0, n.dispatchEvent(s);
  let r = new KeyboardEvent("keyup", i);
  return r.synthetic = !0, n.dispatchEvent(r), s.defaultPrevented || r.defaultPrevented;
}
function hO(n) {
  for (; n; ) {
    if (n && (n.nodeType == 9 || n.nodeType == 11 && n.host))
      return n;
    n = n.assignedSlot || n.parentNode;
  }
  return null;
}
function lc(n) {
  for (; n.attributes.length; )
    n.removeAttributeNode(n.attributes[0]);
}
function cO(n, e) {
  let t = e.focusNode, i = e.focusOffset;
  if (!t || e.anchorNode != t || e.anchorOffset != i)
    return !1;
  for (i = Math.min(i, Tt(t)); ; )
    if (i) {
      if (t.nodeType != 1)
        return !1;
      let s = t.childNodes[i - 1];
      s.contentEditable == "false" ? i-- : (t = s, i = Tt(t));
    } else {
      if (t == n)
        return !0;
      i = ts(t), t = t.parentNode;
    }
}
function ac(n) {
  return n.scrollTop > Math.max(1, n.scrollHeight - n.clientHeight - 4);
}
class Se {
  constructor(e, t, i = !0) {
    this.node = e, this.offset = t, this.precise = i;
  }
  static before(e, t) {
    return new Se(e.parentNode, ts(e), t);
  }
  static after(e, t) {
    return new Se(e.parentNode, ts(e) + 1, t);
  }
}
const Ao = [];
class _ {
  constructor() {
    this.parent = null, this.dom = null, this.flags = 2;
  }
  get overrideDOMText() {
    return null;
  }
  get posAtStart() {
    return this.parent ? this.parent.posBefore(this) : 0;
  }
  get posAtEnd() {
    return this.posAtStart + this.length;
  }
  posBefore(e) {
    let t = this.posAtStart;
    for (let i of this.children) {
      if (i == e)
        return t;
      t += i.length + i.breakAfter;
    }
    throw new RangeError("Invalid child in posBefore");
  }
  posAfter(e) {
    return this.posBefore(e) + e.length;
  }
  sync(e, t) {
    if (this.flags & 2) {
      let i = this.dom, s = null, r;
      for (let o of this.children) {
        if (o.flags & 7) {
          if (!o.dom && (r = s ? s.nextSibling : i.firstChild)) {
            let l = _.get(r);
            (!l || !l.parent && l.canReuseDOM(o)) && o.reuseDOM(r);
          }
          o.sync(e, t), o.flags &= -8;
        }
        if (r = s ? s.nextSibling : i.firstChild, t && !t.written && t.node == i && r != o.dom && (t.written = !0), o.dom.parentNode == i)
          for (; r && r != o.dom; )
            r = Cl(r);
        else
          i.insertBefore(o.dom, r);
        s = o.dom;
      }
      for (r = s ? s.nextSibling : i.firstChild, r && t && t.node == i && (t.written = !0); r; )
        r = Cl(r);
    } else if (this.flags & 1)
      for (let i of this.children)
        i.flags & 7 && (i.sync(e, t), i.flags &= -8);
  }
  reuseDOM(e) {
  }
  localPosFromDOM(e, t) {
    let i;
    if (e == this.dom)
      i = this.dom.childNodes[t];
    else {
      let s = Tt(e) == 0 ? 0 : t == 0 ? -1 : 1;
      for (; ; ) {
        let r = e.parentNode;
        if (r == this.dom)
          break;
        s == 0 && r.firstChild != r.lastChild && (e == r.firstChild ? s = -1 : s = 1), e = r;
      }
      s < 0 ? i = e : i = e.nextSibling;
    }
    if (i == this.dom.firstChild)
      return 0;
    for (; i && !_.get(i); )
      i = i.nextSibling;
    if (!i)
      return this.length;
    for (let s = 0, r = 0; ; s++) {
      let o = this.children[s];
      if (o.dom == i)
        return r;
      r += o.length + o.breakAfter;
    }
  }
  domBoundsAround(e, t, i = 0) {
    let s = -1, r = -1, o = -1, l = -1;
    for (let a = 0, h = i, c = i; a < this.children.length; a++) {
      let f = this.children[a], u = h + f.length;
      if (h < e && u > t)
        return f.domBoundsAround(e, t, h);
      if (u >= e && s == -1 && (s = a, r = h), h > t && f.dom.parentNode == this.dom) {
        o = a, l = c;
        break;
      }
      c = u, h = u + f.breakAfter;
    }
    return {
      from: r,
      to: l < 0 ? i + this.length : l,
      startDOM: (s ? this.children[s - 1].dom.nextSibling : null) || this.dom.firstChild,
      endDOM: o < this.children.length && o >= 0 ? this.children[o].dom : null
    };
  }
  markDirty(e = !1) {
    this.flags |= 2, this.markParentsDirty(e);
  }
  markParentsDirty(e) {
    for (let t = this.parent; t; t = t.parent) {
      if (e && (t.flags |= 2), t.flags & 1)
        return;
      t.flags |= 1, e = !1;
    }
  }
  setParent(e) {
    this.parent != e && (this.parent = e, this.flags & 7 && this.markParentsDirty(!0));
  }
  setDOM(e) {
    this.dom && (this.dom.cmView = null), this.dom = e, e.cmView = this;
  }
  get rootView() {
    for (let e = this; ; ) {
      let t = e.parent;
      if (!t)
        return e;
      e = t;
    }
  }
  replaceChildren(e, t, i = Ao) {
    this.markDirty();
    for (let s = e; s < t; s++) {
      let r = this.children[s];
      r.parent == this && r.destroy();
    }
    this.children.splice(e, t - e, ...i);
    for (let s = 0; s < i.length; s++)
      i[s].setParent(this);
  }
  ignoreMutation(e) {
    return !1;
  }
  ignoreEvent(e) {
    return !1;
  }
  childCursor(e = this.length) {
    return new hc(this.children, e, this.children.length);
  }
  childPos(e, t = 1) {
    return this.childCursor().findPos(e, t);
  }
  toString() {
    let e = this.constructor.name.replace("View", "");
    return e + (this.children.length ? "(" + this.children.join() + ")" : this.length ? "[" + (e == "Text" ? this.text : this.length) + "]" : "") + (this.breakAfter ? "#" : "");
  }
  static get(e) {
    return e.cmView;
  }
  get isEditable() {
    return !0;
  }
  get isWidget() {
    return !1;
  }
  get isHidden() {
    return !1;
  }
  merge(e, t, i, s, r, o) {
    return !1;
  }
  become(e) {
    return !1;
  }
  canReuseDOM(e) {
    return e.constructor == this.constructor && !((this.flags | e.flags) & 8);
  }
  // When this is a zero-length view with a side, this should return a
  // number <= 0 to indicate it is before its position, or a
  // number > 0 when after its position.
  getSide() {
    return 0;
  }
  destroy() {
    this.parent = null;
  }
}
_.prototype.breakAfter = 0;
function Cl(n) {
  let e = n.nextSibling;
  return n.parentNode.removeChild(n), e;
}
class hc {
  constructor(e, t, i) {
    this.children = e, this.pos = t, this.i = i, this.off = 0;
  }
  findPos(e, t = 1) {
    for (; ; ) {
      if (e > this.pos || e == this.pos && (t > 0 || this.i == 0 || this.children[this.i - 1].breakAfter))
        return this.off = e - this.pos, this;
      let i = this.children[--this.i];
      this.pos -= i.length + i.breakAfter;
    }
  }
}
function cc(n, e, t, i, s, r, o, l, a) {
  let { children: h } = n, c = h.length ? h[e] : null, f = r.length ? r[r.length - 1] : null, u = f ? f.breakAfter : o;
  if (!(e == i && c && !o && !u && r.length < 2 && c.merge(t, s, r.length ? f : null, t == 0, l, a))) {
    if (i < h.length) {
      let d = h[i];
      d && s < d.length ? (e == i && (d = d.split(s), s = 0), !u && f && d.merge(0, s, f, !0, 0, a) ? r[r.length - 1] = d : (s && d.merge(0, s, null, !1, 0, a), r.push(d))) : d != null && d.breakAfter && (f ? f.breakAfter = 1 : o = 1), i++;
    }
    for (c && (c.breakAfter = o, t > 0 && (!o && r.length && c.merge(t, c.length, r[0], !1, l, 0) ? c.breakAfter = r.shift().breakAfter : (t < c.length || c.children.length && c.children[c.children.length - 1].length == 0) && c.merge(t, c.length, null, !1, l, 0), e++)); e < i && r.length; )
      if (h[i - 1].become(r[r.length - 1]))
        i--, r.pop(), a = r.length ? 0 : l;
      else if (h[e].become(r[0]))
        e++, r.shift(), l = r.length ? 0 : a;
      else
        break;
    !r.length && e && i < h.length && !h[e - 1].breakAfter && h[i].merge(0, 0, h[e - 1], !1, l, a) && e--, (e < i || r.length) && n.replaceChildren(e, i, r);
  }
}
function fc(n, e, t, i, s, r) {
  let o = n.childCursor(), { i: l, off: a } = o.findPos(t, 1), { i: h, off: c } = o.findPos(e, -1), f = e - t;
  for (let u of i)
    f += u.length;
  n.length += f, cc(n, h, c, l, a, i, 0, s, r);
}
const Jt = "￿";
class uc {
  constructor(e, t) {
    this.points = e, this.text = "", this.lineSeparator = t.facet(M.lineSeparator);
  }
  append(e) {
    this.text += e;
  }
  lineBreak() {
    this.text += Jt;
  }
  readRange(e, t) {
    if (!e)
      return this;
    let i = e.parentNode;
    for (let s = e; ; ) {
      this.findPointBefore(i, s);
      let r = this.text.length;
      this.readNode(s);
      let o = s.nextSibling;
      if (o == t)
        break;
      let l = _.get(s), a = _.get(o);
      (l && a ? l.breakAfter : (l ? l.breakAfter : Xl(s)) || Xl(o) && (s.nodeName != "BR" || s.cmIgnore) && this.text.length > r) && this.lineBreak(), s = o;
    }
    return this.findPointBefore(i, t), this;
  }
  readTextNode(e) {
    let t = e.nodeValue;
    for (let i of this.points)
      i.node == e && (i.pos = this.text.length + Math.min(i.offset, t.length));
    for (let i = 0, s = this.lineSeparator ? null : /\r\n?|\n/g; ; ) {
      let r = -1, o = 1, l;
      if (this.lineSeparator ? (r = t.indexOf(this.lineSeparator, i), o = this.lineSeparator.length) : (l = s.exec(t)) && (r = l.index, o = l[0].length), this.append(t.slice(i, r < 0 ? t.length : r)), r < 0)
        break;
      if (this.lineBreak(), o > 1)
        for (let a of this.points)
          a.node == e && a.pos > this.text.length && (a.pos -= o - 1);
      i = r + o;
    }
  }
  readNode(e) {
    if (e.cmIgnore)
      return;
    let t = _.get(e), i = t && t.overrideDOMText;
    if (i != null) {
      this.findPointInside(e, i.length);
      for (let s = i.iter(); !s.next().done; )
        s.lineBreak ? this.lineBreak() : this.append(s.value);
    } else
      e.nodeType == 3 ? this.readTextNode(e) : e.nodeName == "BR" ? e.nextSibling && this.lineBreak() : e.nodeType == 1 && this.readRange(e.firstChild, null);
  }
  findPointBefore(e, t) {
    for (let i of this.points)
      i.node == e && e.childNodes[i.offset] == t && (i.pos = this.text.length);
  }
  findPointInside(e, t) {
    for (let i of this.points)
      (e.nodeType == 3 ? i.node == e : e.contains(i.node)) && (i.pos = this.text.length + Math.min(t, i.offset));
  }
}
function Xl(n) {
  return n.nodeType == 1 && /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(n.nodeName);
}
class Tl {
  constructor(e, t) {
    this.node = e, this.offset = t, this.pos = -1;
  }
}
let Ze = typeof navigator < "u" ? navigator : { userAgent: "", vendor: "", platform: "" }, Ir = typeof document < "u" ? document : { documentElement: { style: {} } };
const jr = /* @__PURE__ */ /Edge\/(\d+)/.exec(Ze.userAgent), dc = /* @__PURE__ */ /MSIE \d/.test(Ze.userAgent), Lr = /* @__PURE__ */ /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Ze.userAgent), As = !!(dc || Lr || jr), Zl = !As && /* @__PURE__ */ /gecko\/(\d+)/i.test(Ze.userAgent), Js = !As && /* @__PURE__ */ /Chrome\/(\d+)/.exec(Ze.userAgent), Rl = "webkitFontSmoothing" in Ir.documentElement.style, Oc = !As && /* @__PURE__ */ /Apple Computer/.test(Ze.vendor), Al = Oc && (/* @__PURE__ */ /Mobile\/\w+/.test(Ze.userAgent) || Ze.maxTouchPoints > 2);
var C = {
  mac: Al || /* @__PURE__ */ /Mac/.test(Ze.platform),
  windows: /* @__PURE__ */ /Win/.test(Ze.platform),
  linux: /* @__PURE__ */ /Linux|X11/.test(Ze.platform),
  ie: As,
  ie_version: dc ? Ir.documentMode || 6 : Lr ? +Lr[1] : jr ? +jr[1] : 0,
  gecko: Zl,
  gecko_version: Zl ? +(/* @__PURE__ */ /Firefox\/(\d+)/.exec(Ze.userAgent) || [0, 0])[1] : 0,
  chrome: !!Js,
  chrome_version: Js ? +Js[1] : 0,
  ios: Al,
  android: /* @__PURE__ */ /Android\b/.test(Ze.userAgent),
  webkit: Rl,
  safari: Oc,
  webkit_version: Rl ? +(/* @__PURE__ */ /\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0,
  tabSize: Ir.documentElement.style.tabSize != null ? "tab-size" : "-moz-tab-size"
};
const fO = 256;
class ot extends _ {
  constructor(e) {
    super(), this.text = e;
  }
  get length() {
    return this.text.length;
  }
  createDOM(e) {
    this.setDOM(e || document.createTextNode(this.text));
  }
  sync(e, t) {
    this.dom || this.createDOM(), this.dom.nodeValue != this.text && (t && t.node == this.dom && (t.written = !0), this.dom.nodeValue = this.text);
  }
  reuseDOM(e) {
    e.nodeType == 3 && this.createDOM(e);
  }
  merge(e, t, i) {
    return this.flags & 8 || i && (!(i instanceof ot) || this.length - (t - e) + i.length > fO || i.flags & 8) ? !1 : (this.text = this.text.slice(0, e) + (i ? i.text : "") + this.text.slice(t), this.markDirty(), !0);
  }
  split(e) {
    let t = new ot(this.text.slice(e));
    return this.text = this.text.slice(0, e), this.markDirty(), t.flags |= this.flags & 8, t;
  }
  localPosFromDOM(e, t) {
    return e == this.dom ? t : t ? this.text.length : 0;
  }
  domAtPos(e) {
    return new Se(this.dom, e);
  }
  domBoundsAround(e, t, i) {
    return { from: i, to: i + this.length, startDOM: this.dom, endDOM: this.dom.nextSibling };
  }
  coordsAt(e, t) {
    return uO(this.dom, e, t);
  }
}
class pt extends _ {
  constructor(e, t = [], i = 0) {
    super(), this.mark = e, this.children = t, this.length = i;
    for (let s of t)
      s.setParent(this);
  }
  setAttrs(e) {
    if (lc(e), this.mark.class && (e.className = this.mark.class), this.mark.attrs)
      for (let t in this.mark.attrs)
        e.setAttribute(t, this.mark.attrs[t]);
    return e;
  }
  canReuseDOM(e) {
    return super.canReuseDOM(e) && !((this.flags | e.flags) & 8);
  }
  reuseDOM(e) {
    e.nodeName == this.mark.tagName.toUpperCase() && (this.setDOM(e), this.flags |= 6);
  }
  sync(e, t) {
    this.dom ? this.flags & 4 && this.setAttrs(this.dom) : this.setDOM(this.setAttrs(document.createElement(this.mark.tagName))), super.sync(e, t);
  }
  merge(e, t, i, s, r, o) {
    return i && (!(i instanceof pt && i.mark.eq(this.mark)) || e && r <= 0 || t < this.length && o <= 0) ? !1 : (fc(this, e, t, i ? i.children : [], r - 1, o - 1), this.markDirty(), !0);
  }
  split(e) {
    let t = [], i = 0, s = -1, r = 0;
    for (let l of this.children) {
      let a = i + l.length;
      a > e && t.push(i < e ? l.split(e - i) : l), s < 0 && i >= e && (s = r), i = a, r++;
    }
    let o = this.length - e;
    return this.length = e, s > -1 && (this.children.length = s, this.markDirty()), new pt(this.mark, t, o);
  }
  domAtPos(e) {
    return pc(this, e);
  }
  coordsAt(e, t) {
    return mc(this, e, t);
  }
}
function uO(n, e, t) {
  let i = n.nodeValue.length;
  e > i && (e = i);
  let s = e, r = e, o = 0;
  e == 0 && t < 0 || e == i && t >= 0 ? C.chrome || C.gecko || (e ? (s--, o = 1) : r < i && (r++, o = -1)) : t < 0 ? s-- : r < i && r++;
  let l = zt(n, s, r).getClientRects();
  if (!l.length)
    return null;
  let a = l[(o ? o < 0 : t >= 0) ? 0 : l.length - 1];
  return C.safari && !o && a.width == 0 && (a = Array.prototype.find.call(l, (h) => h.width) || a), o ? Ro(a, o < 0) : a || null;
}
class Ut extends _ {
  constructor(e, t, i) {
    super(), this.widget = e, this.length = t, this.side = i, this.prevWidget = null;
  }
  static create(e, t, i) {
    return new Ut(e, t, i);
  }
  split(e) {
    let t = Ut.create(this.widget, this.length - e, this.side);
    return this.length -= e, t;
  }
  sync(e) {
    (!this.dom || !this.widget.updateDOM(this.dom, e)) && (this.dom && this.prevWidget && this.prevWidget.destroy(this.dom), this.prevWidget = null, this.setDOM(this.widget.toDOM(e)), this.dom.contentEditable = "false");
  }
  getSide() {
    return this.side;
  }
  merge(e, t, i, s, r, o) {
    return i && (!(i instanceof Ut) || !this.widget.compare(i.widget) || e > 0 && r <= 0 || t < this.length && o <= 0) ? !1 : (this.length = e + (i ? i.length : 0) + (this.length - t), !0);
  }
  become(e) {
    return e instanceof Ut && e.side == this.side && this.widget.constructor == e.widget.constructor ? (this.widget.compare(e.widget) || this.markDirty(!0), this.dom && !this.prevWidget && (this.prevWidget = this.widget), this.widget = e.widget, this.length = e.length, !0) : !1;
  }
  ignoreMutation() {
    return !0;
  }
  ignoreEvent(e) {
    return this.widget.ignoreEvent(e);
  }
  get overrideDOMText() {
    if (this.length == 0)
      return W.empty;
    let e = this;
    for (; e.parent; )
      e = e.parent;
    let { view: t } = e, i = t && t.state.doc, s = this.posAtStart;
    return i ? i.slice(s, s + this.length) : W.empty;
  }
  domAtPos(e) {
    return (this.length ? e == 0 : this.side > 0) ? Se.before(this.dom) : Se.after(this.dom, e == this.length);
  }
  domBoundsAround() {
    return null;
  }
  coordsAt(e, t) {
    let i = this.widget.coordsAt(this.dom, e, t);
    if (i)
      return i;
    let s = this.dom.getClientRects(), r = null;
    if (!s.length)
      return null;
    let o = this.side ? this.side < 0 : e > 0;
    for (let l = o ? s.length - 1 : 0; r = s[l], !(e > 0 ? l == 0 : l == s.length - 1 || r.top < r.bottom); l += o ? -1 : 1)
      ;
    return Ro(r, !o);
  }
  get isEditable() {
    return !1;
  }
  get isWidget() {
    return !0;
  }
  get isHidden() {
    return this.widget.isHidden;
  }
  destroy() {
    super.destroy(), this.dom && this.widget.destroy(this.dom);
  }
}
class ci extends _ {
  constructor(e) {
    super(), this.side = e;
  }
  get length() {
    return 0;
  }
  merge() {
    return !1;
  }
  become(e) {
    return e instanceof ci && e.side == this.side;
  }
  split() {
    return new ci(this.side);
  }
  sync() {
    if (!this.dom) {
      let e = document.createElement("img");
      e.className = "cm-widgetBuffer", e.setAttribute("aria-hidden", "true"), this.setDOM(e);
    }
  }
  getSide() {
    return this.side;
  }
  domAtPos(e) {
    return this.side > 0 ? Se.before(this.dom) : Se.after(this.dom);
  }
  localPosFromDOM() {
    return 0;
  }
  domBoundsAround() {
    return null;
  }
  coordsAt(e) {
    return this.dom.getBoundingClientRect();
  }
  get overrideDOMText() {
    return W.empty;
  }
  get isHidden() {
    return !0;
  }
}
ot.prototype.children = Ut.prototype.children = ci.prototype.children = Ao;
function pc(n, e) {
  let t = n.dom, { children: i } = n, s = 0;
  for (let r = 0; s < i.length; s++) {
    let o = i[s], l = r + o.length;
    if (!(l == r && o.getSide() <= 0)) {
      if (e > r && e < l && o.dom.parentNode == t)
        return o.domAtPos(e - r);
      if (e <= r)
        break;
      r = l;
    }
  }
  for (let r = s; r > 0; r--) {
    let o = i[r - 1];
    if (o.dom.parentNode == t)
      return o.domAtPos(o.length);
  }
  for (let r = s; r < i.length; r++) {
    let o = i[r];
    if (o.dom.parentNode == t)
      return o.domAtPos(0);
  }
  return new Se(t, 0);
}
function gc(n, e, t) {
  let i, { children: s } = n;
  t > 0 && e instanceof pt && s.length && (i = s[s.length - 1]) instanceof pt && i.mark.eq(e.mark) ? gc(i, e.children[0], t - 1) : (s.push(e), e.setParent(n)), n.length += e.length;
}
function mc(n, e, t) {
  let i = null, s = -1, r = null, o = -1;
  function l(h, c) {
    for (let f = 0, u = 0; f < h.children.length && u <= c; f++) {
      let d = h.children[f], O = u + d.length;
      O >= c && (d.children.length ? l(d, c - u) : (!r || r.isHidden && t > 0) && (O > c || u == O && d.getSide() > 0) ? (r = d, o = c - u) : (u < c || u == O && d.getSide() < 0 && !d.isHidden) && (i = d, s = c - u)), u = O;
    }
  }
  l(n, e);
  let a = (t < 0 ? i : r) || i || r;
  return a ? a.coordsAt(Math.max(0, a == i ? s : o), t) : dO(n);
}
function dO(n) {
  let e = n.dom.lastChild;
  if (!e)
    return n.dom.getBoundingClientRect();
  let t = ji(e);
  return t[t.length - 1] || null;
}
function Nr(n, e) {
  for (let t in n)
    t == "class" && e.class ? e.class += " " + n.class : t == "style" && e.style ? e.style += ";" + n.style : e[t] = n[t];
  return e;
}
const Vl = /* @__PURE__ */ Object.create(null);
function Vo(n, e, t) {
  if (n == e)
    return !0;
  n || (n = Vl), e || (e = Vl);
  let i = Object.keys(n), s = Object.keys(e);
  if (i.length - (t && i.indexOf(t) > -1 ? 1 : 0) != s.length - (t && s.indexOf(t) > -1 ? 1 : 0))
    return !1;
  for (let r of i)
    if (r != t && (s.indexOf(r) == -1 || n[r] !== e[r]))
      return !1;
  return !0;
}
function Gr(n, e, t) {
  let i = null;
  if (e)
    for (let s in e)
      t && s in t || n.removeAttribute(i = s);
  if (t)
    for (let s in t)
      e && e[s] == t[s] || n.setAttribute(i = s, t[s]);
  return !!i;
}
function OO(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t = 0; t < n.attributes.length; t++) {
    let i = n.attributes[t];
    e[i.name] = i.value;
  }
  return e;
}
class St {
  /**
  Compare this instance to another instance of the same type.
  (TypeScript can't express this, but only instances of the same
  specific class will be passed to this method.) This is used to
  avoid redrawing widgets when they are replaced by a new
  decoration of the same type. The default implementation just
  returns `false`, which will cause new instances of the widget to
  always be redrawn.
  */
  eq(e) {
    return !1;
  }
  /**
  Update a DOM element created by a widget of the same type (but
  different, non-`eq` content) to reflect this widget. May return
  true to indicate that it could update, false to indicate it
  couldn't (in which case the widget will be redrawn). The default
  implementation just returns false.
  */
  updateDOM(e, t) {
    return !1;
  }
  /**
  @internal
  */
  compare(e) {
    return this == e || this.constructor == e.constructor && this.eq(e);
  }
  /**
  The estimated height this widget will have, to be used when
  estimating the height of content that hasn't been drawn. May
  return -1 to indicate you don't know. The default implementation
  returns -1.
  */
  get estimatedHeight() {
    return -1;
  }
  /**
  For inline widgets that are displayed inline (as opposed to
  `inline-block`) and introduce line breaks (through `<br>` tags
  or textual newlines), this must indicate the amount of line
  breaks they introduce. Defaults to 0.
  */
  get lineBreaks() {
    return 0;
  }
  /**
  Can be used to configure which kinds of events inside the widget
  should be ignored by the editor. The default is to ignore all
  events.
  */
  ignoreEvent(e) {
    return !0;
  }
  /**
  Override the way screen coordinates for positions at/in the
  widget are found. `pos` will be the offset into the widget, and
  `side` the side of the position that is being queried—less than
  zero for before, greater than zero for after, and zero for
  directly at that position.
  */
  coordsAt(e, t, i) {
    return null;
  }
  /**
  @internal
  */
  get isHidden() {
    return !1;
  }
  /**
  This is called when the an instance of the widget is removed
  from the editor view.
  */
  destroy(e) {
  }
}
var F = /* @__PURE__ */ function(n) {
  return n[n.Text = 0] = "Text", n[n.WidgetBefore = 1] = "WidgetBefore", n[n.WidgetAfter = 2] = "WidgetAfter", n[n.WidgetRange = 3] = "WidgetRange", n;
}(F || (F = {}));
class T extends Bt {
  constructor(e, t, i, s) {
    super(), this.startSide = e, this.endSide = t, this.widget = i, this.spec = s;
  }
  /**
  @internal
  */
  get heightRelevant() {
    return !1;
  }
  /**
  Create a mark decoration, which influences the styling of the
  content in its range. Nested mark decorations will cause nested
  DOM elements to be created. Nesting order is determined by
  precedence of the [facet](https://codemirror.net/6/docs/ref/#view.EditorView^decorations), with
  the higher-precedence decorations creating the inner DOM nodes.
  Such elements are split on line boundaries and on the boundaries
  of lower-precedence decorations.
  */
  static mark(e) {
    return new sn(e);
  }
  /**
  Create a widget decoration, which displays a DOM element at the
  given position.
  */
  static widget(e) {
    let t = Math.max(-1e4, Math.min(1e4, e.side || 0)), i = !!e.block;
    return t += i && !e.inlineOrder ? t > 0 ? 3e8 : -4e8 : t > 0 ? 1e8 : -1e8, new Zt(e, t, t, i, e.widget || null, !1);
  }
  /**
  Create a replace decoration which replaces the given range with
  a widget, or simply hides it.
  */
  static replace(e) {
    let t = !!e.block, i, s;
    if (e.isBlockGap)
      i = -5e8, s = 4e8;
    else {
      let { start: r, end: o } = Sc(e, t);
      i = (r ? t ? -3e8 : -1 : 5e8) - 1, s = (o ? t ? 2e8 : 1 : -6e8) + 1;
    }
    return new Zt(e, i, s, t, e.widget || null, !0);
  }
  /**
  Create a line decoration, which can add DOM attributes to the
  line starting at the given position.
  */
  static line(e) {
    return new rn(e);
  }
  /**
  Build a [`DecorationSet`](https://codemirror.net/6/docs/ref/#view.DecorationSet) from the given
  decorated range or ranges. If the ranges aren't already sorted,
  pass `true` for `sort` to make the library sort them for you.
  */
  static set(e, t = !1) {
    return D.of(e, t);
  }
  /**
  @internal
  */
  hasHeight() {
    return this.widget ? this.widget.estimatedHeight > -1 : !1;
  }
}
T.none = D.empty;
class sn extends T {
  constructor(e) {
    let { start: t, end: i } = Sc(e);
    super(t ? -1 : 5e8, i ? 1 : -6e8, null, e), this.tagName = e.tagName || "span", this.class = e.class || "", this.attrs = e.attributes || null;
  }
  eq(e) {
    var t, i;
    return this == e || e instanceof sn && this.tagName == e.tagName && (this.class || ((t = this.attrs) === null || t === void 0 ? void 0 : t.class)) == (e.class || ((i = e.attrs) === null || i === void 0 ? void 0 : i.class)) && Vo(this.attrs, e.attrs, "class");
  }
  range(e, t = e) {
    if (e >= t)
      throw new RangeError("Mark decorations may not be empty");
    return super.range(e, t);
  }
}
sn.prototype.point = !1;
class rn extends T {
  constructor(e) {
    super(-2e8, -2e8, null, e);
  }
  eq(e) {
    return e instanceof rn && this.spec.class == e.spec.class && Vo(this.spec.attributes, e.spec.attributes);
  }
  range(e, t = e) {
    if (t != e)
      throw new RangeError("Line decoration ranges must be zero-length");
    return super.range(e, t);
  }
}
rn.prototype.mapMode = ce.TrackBefore;
rn.prototype.point = !0;
class Zt extends T {
  constructor(e, t, i, s, r, o) {
    super(t, i, r, e), this.block = s, this.isReplace = o, this.mapMode = s ? t <= 0 ? ce.TrackBefore : ce.TrackAfter : ce.TrackDel;
  }
  // Only relevant when this.block == true
  get type() {
    return this.startSide < this.endSide ? F.WidgetRange : this.startSide <= 0 ? F.WidgetBefore : F.WidgetAfter;
  }
  get heightRelevant() {
    return this.block || !!this.widget && (this.widget.estimatedHeight >= 5 || this.widget.lineBreaks > 0);
  }
  eq(e) {
    return e instanceof Zt && pO(this.widget, e.widget) && this.block == e.block && this.startSide == e.startSide && this.endSide == e.endSide;
  }
  range(e, t = e) {
    if (this.isReplace && (e > t || e == t && this.startSide > 0 && this.endSide <= 0))
      throw new RangeError("Invalid range for replacement decoration");
    if (!this.isReplace && t != e)
      throw new RangeError("Widget decorations can only have zero-length ranges");
    return super.range(e, t);
  }
}
Zt.prototype.point = !0;
function Sc(n, e = !1) {
  let { inclusiveStart: t, inclusiveEnd: i } = n;
  return t == null && (t = n.inclusive), i == null && (i = n.inclusive), { start: t ?? e, end: i ?? e };
}
function pO(n, e) {
  return n == e || !!(n && e && n.compare(e));
}
function Fr(n, e, t, i = 0) {
  let s = t.length - 1;
  s >= 0 && t[s] + i >= n ? t[s] = Math.max(t[s], e) : t.push(n, e);
}
class me extends _ {
  constructor() {
    super(...arguments), this.children = [], this.length = 0, this.prevAttrs = void 0, this.attrs = null, this.breakAfter = 0;
  }
  // Consumes source
  merge(e, t, i, s, r, o) {
    if (i) {
      if (!(i instanceof me))
        return !1;
      this.dom || i.transferDOM(this);
    }
    return s && this.setDeco(i ? i.attrs : null), fc(this, e, t, i ? i.children : [], r, o), !0;
  }
  split(e) {
    let t = new me();
    if (t.breakAfter = this.breakAfter, this.length == 0)
      return t;
    let { i, off: s } = this.childPos(e);
    s && (t.append(this.children[i].split(s), 0), this.children[i].merge(s, this.children[i].length, null, !1, 0, 0), i++);
    for (let r = i; r < this.children.length; r++)
      t.append(this.children[r], 0);
    for (; i > 0 && this.children[i - 1].length == 0; )
      this.children[--i].destroy();
    return this.children.length = i, this.markDirty(), this.length = e, t;
  }
  transferDOM(e) {
    this.dom && (this.markDirty(), e.setDOM(this.dom), e.prevAttrs = this.prevAttrs === void 0 ? this.attrs : this.prevAttrs, this.prevAttrs = void 0, this.dom = null);
  }
  setDeco(e) {
    Vo(this.attrs, e) || (this.dom && (this.prevAttrs = this.attrs, this.markDirty()), this.attrs = e);
  }
  append(e, t) {
    gc(this, e, t);
  }
  // Only called when building a line view in ContentBuilder
  addLineDeco(e) {
    let t = e.spec.attributes, i = e.spec.class;
    t && (this.attrs = Nr(t, this.attrs || {})), i && (this.attrs = Nr({ class: i }, this.attrs || {}));
  }
  domAtPos(e) {
    return pc(this, e);
  }
  reuseDOM(e) {
    e.nodeName == "DIV" && (this.setDOM(e), this.flags |= 6);
  }
  sync(e, t) {
    var i;
    this.dom ? this.flags & 4 && (lc(this.dom), this.dom.className = "cm-line", this.prevAttrs = this.attrs ? null : void 0) : (this.setDOM(document.createElement("div")), this.dom.className = "cm-line", this.prevAttrs = this.attrs ? null : void 0), this.prevAttrs !== void 0 && (Gr(this.dom, this.prevAttrs, this.attrs), this.dom.classList.add("cm-line"), this.prevAttrs = void 0), super.sync(e, t);
    let s = this.dom.lastChild;
    for (; s && _.get(s) instanceof pt; )
      s = s.lastChild;
    if (!s || !this.length || s.nodeName != "BR" && ((i = _.get(s)) === null || i === void 0 ? void 0 : i.isEditable) == !1 && (!C.ios || !this.children.some((r) => r instanceof ot))) {
      let r = document.createElement("BR");
      r.cmIgnore = !0, this.dom.appendChild(r);
    }
  }
  measureTextSize() {
    if (this.children.length == 0 || this.length > 20)
      return null;
    let e = 0, t;
    for (let i of this.children) {
      if (!(i instanceof ot) || /[^ -~]/.test(i.text))
        return null;
      let s = ji(i.dom);
      if (s.length != 1)
        return null;
      e += s[0].width, t = s[0].height;
    }
    return e ? {
      lineHeight: this.dom.getBoundingClientRect().height,
      charWidth: e / this.length,
      textHeight: t
    } : null;
  }
  coordsAt(e, t) {
    let i = mc(this, e, t);
    if (!this.children.length && i && this.parent) {
      let { heightOracle: s } = this.parent.view.viewState, r = i.bottom - i.top;
      if (Math.abs(r - s.lineHeight) < 2 && s.textHeight < r) {
        let o = (r - s.textHeight) / 2;
        return { top: i.top + o, bottom: i.bottom - o, left: i.left, right: i.left };
      }
    }
    return i;
  }
  become(e) {
    return !1;
  }
  get type() {
    return F.Text;
  }
  static find(e, t) {
    for (let i = 0, s = 0; i < e.children.length; i++) {
      let r = e.children[i], o = s + r.length;
      if (o >= t) {
        if (r instanceof me)
          return r;
        if (o > t)
          break;
      }
      s = o + r.breakAfter;
    }
    return null;
  }
}
class _t extends _ {
  constructor(e, t, i) {
    super(), this.widget = e, this.length = t, this.type = i, this.breakAfter = 0, this.prevWidget = null;
  }
  merge(e, t, i, s, r, o) {
    return i && (!(i instanceof _t) || !this.widget.compare(i.widget) || e > 0 && r <= 0 || t < this.length && o <= 0) ? !1 : (this.length = e + (i ? i.length : 0) + (this.length - t), !0);
  }
  domAtPos(e) {
    return e == 0 ? Se.before(this.dom) : Se.after(this.dom, e == this.length);
  }
  split(e) {
    let t = this.length - e;
    this.length = e;
    let i = new _t(this.widget, t, this.type);
    return i.breakAfter = this.breakAfter, i;
  }
  get children() {
    return Ao;
  }
  sync(e) {
    (!this.dom || !this.widget.updateDOM(this.dom, e)) && (this.dom && this.prevWidget && this.prevWidget.destroy(this.dom), this.prevWidget = null, this.setDOM(this.widget.toDOM(e)), this.dom.contentEditable = "false");
  }
  get overrideDOMText() {
    return this.parent ? this.parent.view.state.doc.slice(this.posAtStart, this.posAtEnd) : W.empty;
  }
  domBoundsAround() {
    return null;
  }
  become(e) {
    return e instanceof _t && e.widget.constructor == this.widget.constructor ? (e.widget.compare(this.widget) || this.markDirty(!0), this.dom && !this.prevWidget && (this.prevWidget = this.widget), this.widget = e.widget, this.length = e.length, this.type = e.type, this.breakAfter = e.breakAfter, !0) : !1;
  }
  ignoreMutation() {
    return !0;
  }
  ignoreEvent(e) {
    return this.widget.ignoreEvent(e);
  }
  get isEditable() {
    return !1;
  }
  get isWidget() {
    return !0;
  }
  coordsAt(e, t) {
    return this.widget.coordsAt(this.dom, e, t);
  }
  destroy() {
    super.destroy(), this.dom && this.widget.destroy(this.dom);
  }
}
class qi {
  constructor(e, t, i, s) {
    this.doc = e, this.pos = t, this.end = i, this.disallowBlockEffectsFor = s, this.content = [], this.curLine = null, this.breakAtStart = 0, this.pendingBuffer = 0, this.bufferMarks = [], this.atCursorPos = !0, this.openStart = -1, this.openEnd = -1, this.text = "", this.textOff = 0, this.cursor = e.iter(), this.skip = t;
  }
  posCovered() {
    if (this.content.length == 0)
      return !this.breakAtStart && this.doc.lineAt(this.pos).from != this.pos;
    let e = this.content[this.content.length - 1];
    return !e.breakAfter && !(e instanceof _t && e.type == F.WidgetBefore);
  }
  getLine() {
    return this.curLine || (this.content.push(this.curLine = new me()), this.atCursorPos = !0), this.curLine;
  }
  flushBuffer(e = this.bufferMarks) {
    this.pendingBuffer && (this.curLine.append(gn(new ci(-1), e), e.length), this.pendingBuffer = 0);
  }
  addBlockWidget(e) {
    this.flushBuffer(), this.curLine = null, this.content.push(e);
  }
  finish(e) {
    this.pendingBuffer && e <= this.bufferMarks.length ? this.flushBuffer() : this.pendingBuffer = 0, this.posCovered() || this.getLine();
  }
  buildText(e, t, i) {
    for (; e > 0; ) {
      if (this.textOff == this.text.length) {
        let { value: r, lineBreak: o, done: l } = this.cursor.next(this.skip);
        if (this.skip = 0, l)
          throw new Error("Ran out of text content when drawing inline views");
        if (o) {
          this.posCovered() || this.getLine(), this.content.length ? this.content[this.content.length - 1].breakAfter = 1 : this.breakAtStart = 1, this.flushBuffer(), this.curLine = null, this.atCursorPos = !0, e--;
          continue;
        } else
          this.text = r, this.textOff = 0;
      }
      let s = Math.min(
        this.text.length - this.textOff,
        e,
        512
        /* Chunk */
      );
      this.flushBuffer(t.slice(t.length - i)), this.getLine().append(gn(new ot(this.text.slice(this.textOff, this.textOff + s)), t), i), this.atCursorPos = !0, this.textOff += s, e -= s, i = 0;
    }
  }
  span(e, t, i, s) {
    this.buildText(t - e, i, s), this.pos = t, this.openStart < 0 && (this.openStart = s);
  }
  point(e, t, i, s, r, o) {
    if (this.disallowBlockEffectsFor[o] && i instanceof Zt) {
      if (i.block)
        throw new RangeError("Block decorations may not be specified via plugins");
      if (t > this.doc.lineAt(this.pos).to)
        throw new RangeError("Decorations that replace line breaks may not be specified via plugins");
    }
    let l = t - e;
    if (i instanceof Zt)
      if (i.block) {
        let { type: a } = i;
        a == F.WidgetAfter && !this.posCovered() && this.getLine(), this.addBlockWidget(new _t(i.widget || new Yl("div"), l, a));
      } else {
        let a = Ut.create(i.widget || new Yl("span"), l, l ? 0 : i.startSide), h = this.atCursorPos && !a.isEditable && r <= s.length && (e < t || i.startSide > 0), c = !a.isEditable && (e < t || r > s.length || i.startSide <= 0), f = this.getLine();
        this.pendingBuffer == 2 && !h && !a.isEditable && (this.pendingBuffer = 0), this.flushBuffer(s), h && (f.append(gn(new ci(1), s), r), r = s.length + Math.max(0, r - s.length)), f.append(gn(a, s), r), this.atCursorPos = c, this.pendingBuffer = c ? e < t || r > s.length ? 1 : 2 : 0, this.pendingBuffer && (this.bufferMarks = s.slice());
      }
    else
      this.doc.lineAt(this.pos).from == this.pos && this.getLine().addLineDeco(i);
    l && (this.textOff + l <= this.text.length ? this.textOff += l : (this.skip += l - (this.text.length - this.textOff), this.text = "", this.textOff = 0), this.pos = t), this.openStart < 0 && (this.openStart = r);
  }
  static build(e, t, i, s, r) {
    let o = new qi(e, t, i, r);
    return o.openEnd = D.spans(s, t, i, o), o.openStart < 0 && (o.openStart = o.openEnd), o.finish(o.openEnd), o;
  }
}
function gn(n, e) {
  for (let t of e)
    n = new pt(t, [n], n.length);
  return n;
}
class Yl extends St {
  constructor(e) {
    super(), this.tag = e;
  }
  eq(e) {
    return e.tag == this.tag;
  }
  toDOM() {
    return document.createElement(this.tag);
  }
  updateDOM(e) {
    return e.nodeName.toLowerCase() == this.tag;
  }
  get isHidden() {
    return !0;
  }
}
const yc = /* @__PURE__ */ P.define(), bc = /* @__PURE__ */ P.define(), Qc = /* @__PURE__ */ P.define(), xc = /* @__PURE__ */ P.define(), Hr = /* @__PURE__ */ P.define(), wc = /* @__PURE__ */ P.define(), $c = /* @__PURE__ */ P.define(), kc = /* @__PURE__ */ P.define({
  combine: (n) => n.some((e) => e)
}), vc = /* @__PURE__ */ P.define({
  combine: (n) => n.some((e) => e)
});
class is {
  constructor(e, t = "nearest", i = "nearest", s = 5, r = 5) {
    this.range = e, this.y = t, this.x = i, this.yMargin = s, this.xMargin = r;
  }
  map(e) {
    return e.empty ? this : new is(this.range.map(e), this.y, this.x, this.yMargin, this.xMargin);
  }
}
const Ml = /* @__PURE__ */ R.define({ map: (n, e) => n.map(e) });
function Ae(n, e, t) {
  let i = n.facet(xc);
  i.length ? i[0](e) : window.onerror ? window.onerror(String(e), t, void 0, void 0, e) : t ? console.error(t + ":", e) : console.error(e);
}
const Vs = /* @__PURE__ */ P.define({ combine: (n) => n.length ? n[0] : !0 });
let gO = 0;
const Ai = /* @__PURE__ */ P.define();
class ee {
  constructor(e, t, i, s) {
    this.id = e, this.create = t, this.domEventHandlers = i, this.extension = s(this);
  }
  /**
  Define a plugin from a constructor function that creates the
  plugin's value, given an editor view.
  */
  static define(e, t) {
    const { eventHandlers: i, provide: s, decorations: r } = t || {};
    return new ee(gO++, e, i, (o) => {
      let l = [Ai.of(o)];
      return r && l.push(Li.of((a) => {
        let h = a.plugin(o);
        return h ? r(h) : T.none;
      })), s && l.push(s(o)), l;
    });
  }
  /**
  Create a plugin for a class whose constructor takes a single
  editor view as argument.
  */
  static fromClass(e, t) {
    return ee.define((i) => new e(i), t);
  }
}
class Ks {
  constructor(e) {
    this.spec = e, this.mustUpdate = null, this.value = null;
  }
  update(e) {
    if (this.value) {
      if (this.mustUpdate) {
        let t = this.mustUpdate;
        if (this.mustUpdate = null, this.value.update)
          try {
            this.value.update(t);
          } catch (i) {
            if (Ae(t.state, i, "CodeMirror plugin crashed"), this.value.destroy)
              try {
                this.value.destroy();
              } catch {
              }
            this.deactivate();
          }
      }
    } else if (this.spec)
      try {
        this.value = this.spec.create(e);
      } catch (t) {
        Ae(e.state, t, "CodeMirror plugin crashed"), this.deactivate();
      }
    return this;
  }
  destroy(e) {
    var t;
    if (!((t = this.value) === null || t === void 0) && t.destroy)
      try {
        this.value.destroy();
      } catch (i) {
        Ae(e.state, i, "CodeMirror plugin crashed");
      }
  }
  deactivate() {
    this.spec = this.value = null;
  }
}
const Pc = /* @__PURE__ */ P.define(), Yo = /* @__PURE__ */ P.define(), Li = /* @__PURE__ */ P.define(), Mo = /* @__PURE__ */ P.define(), Cc = /* @__PURE__ */ P.define();
function Xc(n) {
  let e = 0, t = 0, i = 0, s = 0;
  for (let r of n.state.facet(Cc)) {
    let o = r(n);
    o && (o.left != null && (e = Math.max(e, o.left)), o.right != null && (t = Math.max(t, o.right)), o.top != null && (i = Math.max(i, o.top)), o.bottom != null && (s = Math.max(s, o.bottom)));
  }
  return { left: e, right: t, top: i, bottom: s };
}
const Vi = /* @__PURE__ */ P.define();
class De {
  constructor(e, t, i, s) {
    this.fromA = e, this.toA = t, this.fromB = i, this.toB = s;
  }
  join(e) {
    return new De(Math.min(this.fromA, e.fromA), Math.max(this.toA, e.toA), Math.min(this.fromB, e.fromB), Math.max(this.toB, e.toB));
  }
  addToSet(e) {
    let t = e.length, i = this;
    for (; t > 0; t--) {
      let s = e[t - 1];
      if (!(s.fromA > i.toA)) {
        if (s.toA < i.fromA)
          break;
        i = i.join(s), e.splice(t - 1, 1);
      }
    }
    return e.splice(t, 0, i), e;
  }
  static extendWithRanges(e, t) {
    if (t.length == 0)
      return e;
    let i = [];
    for (let s = 0, r = 0, o = 0, l = 0; ; s++) {
      let a = s == e.length ? null : e[s], h = o - l, c = a ? a.fromB : 1e9;
      for (; r < t.length && t[r] < c; ) {
        let f = t[r], u = t[r + 1], d = Math.max(l, f), O = Math.min(c, u);
        if (d <= O && new De(d + h, O + h, d, O).addToSet(i), u > c)
          break;
        r += 2;
      }
      if (!a)
        return i;
      new De(a.fromA, a.toA, a.fromB, a.toB).addToSet(i), o = a.toA, l = a.toB;
    }
  }
}
class ns {
  constructor(e, t, i) {
    this.view = e, this.state = t, this.transactions = i, this.flags = 0, this.startState = e.state, this.changes = ne.empty(this.startState.doc.length);
    for (let r of i)
      this.changes = this.changes.compose(r.changes);
    let s = [];
    this.changes.iterChangedRanges((r, o, l, a) => s.push(new De(r, o, l, a))), this.changedRanges = s;
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new ns(e, t, i);
  }
  /**
  Tells you whether the [viewport](https://codemirror.net/6/docs/ref/#view.EditorView.viewport) or
  [visible ranges](https://codemirror.net/6/docs/ref/#view.EditorView.visibleRanges) changed in this
  update.
  */
  get viewportChanged() {
    return (this.flags & 4) > 0;
  }
  /**
  Indicates whether the height of a block element in the editor
  changed in this update.
  */
  get heightChanged() {
    return (this.flags & 2) > 0;
  }
  /**
  Returns true when the document was modified or the size of the
  editor, or elements within the editor, changed.
  */
  get geometryChanged() {
    return this.docChanged || (this.flags & 10) > 0;
  }
  /**
  True when this update indicates a focus change.
  */
  get focusChanged() {
    return (this.flags & 1) > 0;
  }
  /**
  Whether the document changed in this update.
  */
  get docChanged() {
    return !this.changes.empty;
  }
  /**
  Whether the selection was explicitly set in this update.
  */
  get selectionSet() {
    return this.transactions.some((e) => e.selection);
  }
  /**
  @internal
  */
  get empty() {
    return this.flags == 0 && this.transactions.length == 0;
  }
}
var N = /* @__PURE__ */ function(n) {
  return n[n.LTR = 0] = "LTR", n[n.RTL = 1] = "RTL", n;
}(N || (N = {}));
const Jr = N.LTR, mO = N.RTL;
function Tc(n) {
  let e = [];
  for (let t = 0; t < n.length; t++)
    e.push(1 << +n[t]);
  return e;
}
const SO = /* @__PURE__ */ Tc("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"), yO = /* @__PURE__ */ Tc("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"), Kr = /* @__PURE__ */ Object.create(null), Ne = [];
for (let n of ["()", "[]", "{}"]) {
  let e = /* @__PURE__ */ n.charCodeAt(0), t = /* @__PURE__ */ n.charCodeAt(1);
  Kr[e] = t, Kr[t] = -e;
}
function bO(n) {
  return n <= 247 ? SO[n] : 1424 <= n && n <= 1524 ? 2 : 1536 <= n && n <= 1785 ? yO[n - 1536] : 1774 <= n && n <= 2220 ? 4 : 8192 <= n && n <= 8203 ? 256 : 64336 <= n && n <= 65023 ? 4 : n == 8204 ? 256 : 1;
}
const QO = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;
class oi {
  /**
  @internal
  */
  constructor(e, t, i) {
    this.from = e, this.to = t, this.level = i;
  }
  /**
  The direction of this span.
  */
  get dir() {
    return this.level % 2 ? mO : Jr;
  }
  /**
  @internal
  */
  side(e, t) {
    return this.dir == t == e ? this.to : this.from;
  }
  /**
  @internal
  */
  static find(e, t, i, s) {
    let r = -1;
    for (let o = 0; o < e.length; o++) {
      let l = e[o];
      if (l.from <= t && l.to >= t) {
        if (l.level == i)
          return o;
        (r < 0 || (s != 0 ? s < 0 ? l.from < t : l.to > t : e[r].level > l.level)) && (r = o);
      }
    }
    if (r < 0)
      throw new RangeError("Index out of range");
    return r;
  }
}
const L = [];
function xO(n, e) {
  let t = n.length, i = e == Jr ? 1 : 2, s = e == Jr ? 2 : 1;
  if (!n || i == 1 && !QO.test(n))
    return Zc(t);
  for (let o = 0, l = i, a = i; o < t; o++) {
    let h = bO(n.charCodeAt(o));
    h == 512 ? h = l : h == 8 && a == 4 && (h = 16), L[o] = h == 4 ? 2 : h, h & 7 && (a = h), l = h;
  }
  for (let o = 0, l = i, a = i; o < t; o++) {
    let h = L[o];
    if (h == 128)
      o < t - 1 && l == L[o + 1] && l & 24 ? h = L[o] = l : L[o] = 256;
    else if (h == 64) {
      let c = o + 1;
      for (; c < t && L[c] == 64; )
        c++;
      let f = o && l == 8 || c < t && L[c] == 8 ? a == 1 ? 1 : 8 : 256;
      for (let u = o; u < c; u++)
        L[u] = f;
      o = c - 1;
    } else
      h == 8 && a == 1 && (L[o] = 1);
    l = h, h & 7 && (a = h);
  }
  for (let o = 0, l = 0, a = 0, h, c, f; o < t; o++)
    if (c = Kr[h = n.charCodeAt(o)])
      if (c < 0) {
        for (let u = l - 3; u >= 0; u -= 3)
          if (Ne[u + 1] == -c) {
            let d = Ne[u + 2], O = d & 2 ? i : d & 4 ? d & 1 ? s : i : 0;
            O && (L[o] = L[Ne[u]] = O), l = u;
            break;
          }
      } else {
        if (Ne.length == 189)
          break;
        Ne[l++] = o, Ne[l++] = h, Ne[l++] = a;
      }
    else if ((f = L[o]) == 2 || f == 1) {
      let u = f == i;
      a = u ? 0 : 1;
      for (let d = l - 3; d >= 0; d -= 3) {
        let O = Ne[d + 2];
        if (O & 2)
          break;
        if (u)
          Ne[d + 2] |= 2;
        else {
          if (O & 4)
            break;
          Ne[d + 2] |= 4;
        }
      }
    }
  for (let o = 0; o < t; o++)
    if (L[o] == 256) {
      let l = o + 1;
      for (; l < t && L[l] == 256; )
        l++;
      let a = (o ? L[o - 1] : i) == 1, h = (l < t ? L[l] : i) == 1, c = a == h ? a ? 1 : 2 : i;
      for (let f = o; f < l; f++)
        L[f] = c;
      o = l - 1;
    }
  let r = [];
  if (i == 1)
    for (let o = 0; o < t; ) {
      let l = o, a = L[o++] != 1;
      for (; o < t && a == (L[o] != 1); )
        o++;
      if (a)
        for (let h = o; h > l; ) {
          let c = h, f = L[--h] != 2;
          for (; h > l && f == (L[h - 1] != 2); )
            h--;
          r.push(new oi(h, c, f ? 2 : 1));
        }
      else
        r.push(new oi(l, o, 0));
    }
  else
    for (let o = 0; o < t; ) {
      let l = o, a = L[o++] == 2;
      for (; o < t && a == (L[o] == 2); )
        o++;
      r.push(new oi(l, o, a ? 1 : 2));
    }
  return r;
}
function Zc(n) {
  return [new oi(0, n, 0)];
}
let Rc = "";
function wO(n, e, t, i, s) {
  var r;
  let o = i.head - n.from, l = -1;
  if (o == 0) {
    if (!s || !n.length)
      return null;
    e[0].level != t && (o = e[0].side(!1, t), l = 0);
  } else if (o == n.length) {
    if (s)
      return null;
    let u = e[e.length - 1];
    u.level != t && (o = u.side(!0, t), l = e.length - 1);
  }
  l < 0 && (l = oi.find(e, o, (r = i.bidiLevel) !== null && r !== void 0 ? r : -1, i.assoc));
  let a = e[l];
  o == a.side(s, t) && (a = e[l += s ? 1 : -1], o = a.side(!s, t));
  let h = s == (a.dir == t), c = Oe(n.text, o, h);
  if (Rc = n.text.slice(Math.min(o, c), Math.max(o, c)), c != a.side(s, t))
    return y.cursor(c + n.from, h ? -1 : 1, a.level);
  let f = l == (s ? e.length - 1 : 0) ? null : e[l + (s ? 1 : -1)];
  return !f && a.level != t ? y.cursor(s ? n.to : n.from, s ? -1 : 1, t) : f && f.level < a.level ? y.cursor(f.side(!s, t) + n.from, s ? 1 : -1, f.level) : y.cursor(c + n.from, s ? -1 : 1, a.level);
}
class Wl extends _ {
  constructor(e) {
    super(), this.view = e, this.decorations = [], this.dynamicDecorationMap = [], this.hasComposition = null, this.markedForComposition = /* @__PURE__ */ new Set(), this.minWidth = 0, this.minWidthFrom = 0, this.minWidthTo = 0, this.impreciseAnchor = null, this.impreciseHead = null, this.forceSelection = !1, this.lastUpdate = Date.now(), this.setDOM(e.contentDOM), this.children = [new me()], this.children[0].setParent(this), this.updateDeco(), this.updateInner([new De(0, 0, 0, e.state.doc.length)], 0, null);
  }
  get length() {
    return this.view.state.doc.length;
  }
  // Update the document view to a given state.
  update(e) {
    let t = e.changedRanges;
    this.minWidth > 0 && t.length && (t.every(({ fromA: l, toA: a }) => a < this.minWidthFrom || l > this.minWidthTo) ? (this.minWidthFrom = e.changes.mapPos(this.minWidthFrom, 1), this.minWidthTo = e.changes.mapPos(this.minWidthTo, 1)) : this.minWidth = this.minWidthFrom = this.minWidthTo = 0);
    let i = this.view.inputState.composing < 0 ? null : kO(this.view, e.changes);
    if (this.hasComposition) {
      this.markedForComposition.clear();
      let { from: l, to: a } = this.hasComposition;
      t = new De(l, a, e.changes.mapPos(l, -1), e.changes.mapPos(a, 1)).addToSet(t.slice());
    }
    this.hasComposition = i ? { from: i.range.fromB, to: i.range.toB } : null, (C.ie || C.chrome) && !i && e && e.state.doc.lines != e.startState.doc.lines && (this.forceSelection = !0);
    let s = this.decorations, r = this.updateDeco(), o = CO(s, r, e.changes);
    return t = De.extendWithRanges(t, o), !(this.flags & 7) && t.length == 0 ? !1 : (this.updateInner(t, e.startState.doc.length, i), e.transactions.length && (this.lastUpdate = Date.now()), !0);
  }
  // Used by update and the constructor do perform the actual DOM
  // update
  updateInner(e, t, i) {
    this.view.viewState.mustMeasureContent = !0, this.updateChildren(e, t, i);
    let { observer: s } = this.view;
    s.ignore(() => {
      this.dom.style.height = this.view.viewState.contentHeight + "px", this.dom.style.flexBasis = this.minWidth ? this.minWidth + "px" : "";
      let o = C.chrome || C.ios ? { node: s.selectionRange.focusNode, written: !1 } : void 0;
      this.sync(this.view, o), this.flags &= -8, o && (o.written || s.selectionRange.focusNode != o.node) && (this.forceSelection = !0), this.dom.style.height = "";
    }), this.markedForComposition.forEach(
      (o) => o.flags &= -9
      /* Composition */
    );
    let r = [];
    if (this.view.viewport.from || this.view.viewport.to < this.view.state.doc.length)
      for (let o of this.children)
        o instanceof _t && o.widget instanceof Dl && r.push(o.dom);
    s.updateGaps(r);
  }
  updateChildren(e, t, i) {
    let s = i ? i.range.addToSet(e.slice()) : e, r = this.childCursor(t);
    for (let o = s.length - 1; ; o--) {
      let l = o >= 0 ? s[o] : null;
      if (!l)
        break;
      let { fromA: a, toA: h, fromB: c, toB: f } = l, u, d, O, m;
      if (i && i.range.fromB < f && i.range.toB > c) {
        let Q = qi.build(this.view.state.doc, c, i.range.fromB, this.decorations, this.dynamicDecorationMap), x = qi.build(this.view.state.doc, i.range.toB, f, this.decorations, this.dynamicDecorationMap);
        d = Q.breakAtStart, O = Q.openStart, m = x.openEnd;
        let w = this.compositionView(i);
        x.breakAtStart ? w.breakAfter = 1 : x.content.length && w.merge(w.length, w.length, x.content[0], !1, x.openStart, 0) && (w.breakAfter = x.content[0].breakAfter, x.content.shift()), Q.content.length && w.merge(0, 0, Q.content[Q.content.length - 1], !0, 0, Q.openEnd) && Q.content.pop(), u = Q.content.concat(w).concat(x.content);
      } else
        ({ content: u, breakAtStart: d, openStart: O, openEnd: m } = qi.build(this.view.state.doc, c, f, this.decorations, this.dynamicDecorationMap));
      let { i: g, off: S } = r.findPos(h, 1), { i: b, off: v } = r.findPos(a, -1);
      cc(this, b, v, g, S, u, d, O, m);
    }
    i && this.fixCompositionDOM(i);
  }
  compositionView(e) {
    let t = new ot(e.text.nodeValue);
    t.flags |= 8;
    for (let { deco: s } of e.marks)
      t = new pt(s, [t], t.length);
    let i = new me();
    return i.append(t, 0), i;
  }
  fixCompositionDOM(e) {
    let t = (r, o) => {
      o.flags |= 8, this.markedForComposition.add(o);
      let l = _.get(r);
      l != o && (l && (l.dom = null), o.setDOM(r));
    }, i = this.childPos(e.range.fromB, 1), s = this.children[i.i];
    t(e.line, s);
    for (let r = e.marks.length - 1; r >= -1; r--)
      i = s.childPos(i.off, 1), s = s.children[i.i], t(r >= 0 ? e.marks[r].node : e.text, s);
  }
  // Sync the DOM selection to this.state.selection
  updateSelection(e = !1, t = !1) {
    (e || !this.view.observer.selectionRange.focusNode) && this.view.observer.readSelectionRange();
    let i = this.view.root.activeElement, s = i == this.dom, r = !s && Dn(this.dom, this.view.observer.selectionRange) && !(i && this.dom.contains(i));
    if (!(s || t || r))
      return;
    let o = this.forceSelection;
    this.forceSelection = !1;
    let l = this.view.state.selection.main, a = this.domAtPos(l.anchor), h = l.empty ? a : this.domAtPos(l.head);
    if (C.gecko && l.empty && !this.hasComposition && $O(a)) {
      let f = document.createTextNode("");
      this.view.observer.ignore(() => a.node.insertBefore(f, a.node.childNodes[a.offset] || null)), a = h = new Se(f, 0), o = !0;
    }
    let c = this.view.observer.selectionRange;
    (o || !c.focusNode || !es(a.node, a.offset, c.anchorNode, c.anchorOffset) || !es(h.node, h.offset, c.focusNode, c.focusOffset)) && (this.view.observer.ignore(() => {
      C.android && C.chrome && this.dom.contains(c.focusNode) && XO(c.focusNode, this.dom) && (this.dom.blur(), this.dom.focus({ preventScroll: !0 }));
      let f = Kn(this.view.root);
      if (f)
        if (l.empty) {
          if (C.gecko) {
            let u = vO(a.node, a.offset);
            if (u && u != 3) {
              let d = Vc(a.node, a.offset, u == 1 ? 1 : -1);
              d && (a = new Se(d, u == 1 ? 0 : d.nodeValue.length));
            }
          }
          f.collapse(a.node, a.offset), l.bidiLevel != null && c.cursorBidiLevel != null && (c.cursorBidiLevel = l.bidiLevel);
        } else if (f.extend) {
          f.collapse(a.node, a.offset);
          try {
            f.extend(h.node, h.offset);
          } catch {
          }
        } else {
          let u = document.createRange();
          l.anchor > l.head && ([a, h] = [h, a]), u.setEnd(h.node, h.offset), u.setStart(a.node, a.offset), f.removeAllRanges(), f.addRange(u);
        }
      r && this.view.root.activeElement == this.dom && (this.dom.blur(), i && i.focus());
    }), this.view.observer.setSelectionRange(a, h)), this.impreciseAnchor = a.precise ? null : new Se(c.anchorNode, c.anchorOffset), this.impreciseHead = h.precise ? null : new Se(c.focusNode, c.focusOffset);
  }
  enforceCursorAssoc() {
    if (this.hasComposition)
      return;
    let { view: e } = this, t = e.state.selection.main, i = Kn(e.root), { anchorNode: s, anchorOffset: r } = e.observer.selectionRange;
    if (!i || !t.empty || !t.assoc || !i.modify)
      return;
    let o = me.find(this, t.head);
    if (!o)
      return;
    let l = o.posAtStart;
    if (t.head == l || t.head == l + o.length)
      return;
    let a = this.coordsAt(t.head, -1), h = this.coordsAt(t.head, 1);
    if (!a || !h || a.bottom > h.top)
      return;
    let c = this.domAtPos(t.head + t.assoc);
    i.collapse(c.node, c.offset), i.modify("move", t.assoc < 0 ? "forward" : "backward", "lineboundary"), e.observer.readSelectionRange();
    let f = e.observer.selectionRange;
    e.docView.posFromDOM(f.anchorNode, f.anchorOffset) != t.from && i.collapse(s, r);
  }
  nearest(e) {
    for (let t = e; t; ) {
      let i = _.get(t);
      if (i && i.rootView == this)
        return i;
      t = t.parentNode;
    }
    return null;
  }
  posFromDOM(e, t) {
    let i = this.nearest(e);
    if (!i)
      throw new RangeError("Trying to find position for a DOM position outside of the document");
    return i.localPosFromDOM(e, t) + i.posAtStart;
  }
  domAtPos(e) {
    let { i: t, off: i } = this.childCursor().findPos(e, -1);
    for (; t < this.children.length - 1; ) {
      let s = this.children[t];
      if (i < s.length || s instanceof me)
        break;
      t++, i = 0;
    }
    return this.children[t].domAtPos(i);
  }
  coordsAt(e, t) {
    for (let i = this.length, s = this.children.length - 1; ; s--) {
      let r = this.children[s], o = i - r.breakAfter - r.length;
      if (e > o || e == o && r.type != F.WidgetBefore && r.type != F.WidgetAfter && (!s || t == 2 || this.children[s - 1].breakAfter || this.children[s - 1].type == F.WidgetBefore && t > -2))
        return r.coordsAt(e - o, t);
      i = o;
    }
  }
  coordsForChar(e) {
    let { i: t, off: i } = this.childPos(e, 1), s = this.children[t];
    if (!(s instanceof me))
      return null;
    for (; s.children.length; ) {
      let { i: l, off: a } = s.childPos(i, 1);
      for (; ; l++) {
        if (l == s.children.length)
          return null;
        if ((s = s.children[l]).length)
          break;
      }
      i = a;
    }
    if (!(s instanceof ot))
      return null;
    let r = Oe(s.text, i);
    if (r == i)
      return null;
    let o = zt(s.dom, i, r).getClientRects();
    return !o.length || o[0].top >= o[0].bottom ? null : o[0];
  }
  measureVisibleLineHeights(e) {
    let t = [], { from: i, to: s } = e, r = this.view.contentDOM.clientWidth, o = r > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1, l = -1, a = this.view.textDirection == N.LTR;
    for (let h = 0, c = 0; c < this.children.length; c++) {
      let f = this.children[c], u = h + f.length;
      if (u > s)
        break;
      if (h >= i) {
        let d = f.dom.getBoundingClientRect();
        if (t.push(d.height), o) {
          let O = f.dom.lastChild, m = O ? ji(O) : [];
          if (m.length) {
            let g = m[m.length - 1], S = a ? g.right - d.left : d.right - g.left;
            S > l && (l = S, this.minWidth = r, this.minWidthFrom = h, this.minWidthTo = u);
          }
        }
      }
      h = u + f.breakAfter;
    }
    return t;
  }
  textDirectionAt(e) {
    let { i: t } = this.childPos(e, 1);
    return getComputedStyle(this.children[t].dom).direction == "rtl" ? N.RTL : N.LTR;
  }
  measureTextSize() {
    for (let r of this.children)
      if (r instanceof me) {
        let o = r.measureTextSize();
        if (o)
          return o;
      }
    let e = document.createElement("div"), t, i, s;
    return e.className = "cm-line", e.style.width = "99999px", e.style.position = "absolute", e.textContent = "abc def ghi jkl mno pqr stu", this.view.observer.ignore(() => {
      this.dom.appendChild(e);
      let r = ji(e.firstChild)[0];
      t = e.getBoundingClientRect().height, i = r ? r.width / 27 : 7, s = r ? r.height : t, e.remove();
    }), { lineHeight: t, charWidth: i, textHeight: s };
  }
  childCursor(e = this.length) {
    let t = this.children.length;
    return t && (e -= this.children[--t].length), new hc(this.children, e, t);
  }
  computeBlockGapDeco() {
    let e = [], t = this.view.viewState;
    for (let i = 0, s = 0; ; s++) {
      let r = s == t.viewports.length ? null : t.viewports[s], o = r ? r.from - 1 : this.length;
      if (o > i) {
        let l = t.lineBlockAt(o).bottom - t.lineBlockAt(i).top;
        e.push(T.replace({
          widget: new Dl(l),
          block: !0,
          inclusive: !0,
          isBlockGap: !0
        }).range(i, o));
      }
      if (!r)
        break;
      i = r.to + 1;
    }
    return T.set(e);
  }
  updateDeco() {
    let e = this.view.state.facet(Li).map((t, i) => (this.dynamicDecorationMap[i] = typeof t == "function") ? t(this.view) : t);
    for (let t = e.length; t < e.length + 3; t++)
      this.dynamicDecorationMap[t] = !1;
    return this.decorations = [
      ...e,
      this.computeBlockGapDeco(),
      this.view.viewState.lineGapDeco
    ];
  }
  scrollIntoView(e) {
    let { range: t } = e, i = this.coordsAt(t.head, t.empty ? t.assoc : t.head > t.anchor ? -1 : 1), s;
    if (!i)
      return;
    !t.empty && (s = this.coordsAt(t.anchor, t.anchor > t.head ? -1 : 1)) && (i = {
      left: Math.min(i.left, s.left),
      top: Math.min(i.top, s.top),
      right: Math.max(i.right, s.right),
      bottom: Math.max(i.bottom, s.bottom)
    });
    let r = Xc(this.view), o = {
      left: i.left - r.left,
      top: i.top - r.top,
      right: i.right + r.right,
      bottom: i.bottom + r.bottom
    };
    oO(this.view.scrollDOM, o, t.head < t.anchor ? -1 : 1, e.x, e.y, e.xMargin, e.yMargin, this.view.textDirection == N.LTR);
  }
}
function $O(n) {
  return n.node.nodeType == 1 && n.node.firstChild && (n.offset == 0 || n.node.childNodes[n.offset - 1].contentEditable == "false") && (n.offset == n.node.childNodes.length || n.node.childNodes[n.offset].contentEditable == "false");
}
class Dl extends St {
  constructor(e) {
    super(), this.height = e;
  }
  toDOM() {
    let e = document.createElement("div");
    return this.updateDOM(e), e;
  }
  eq(e) {
    return e.height == this.height;
  }
  updateDOM(e) {
    return e.style.height = this.height + "px", !0;
  }
  get estimatedHeight() {
    return this.height;
  }
}
function Ac(n) {
  let e = n.observer.selectionRange, t = e.focusNode && Vc(e.focusNode, e.focusOffset, 0);
  if (!t)
    return null;
  let i = _.get(t), s, r;
  if (i instanceof ot)
    s = i.posAtStart, r = s + i.length;
  else
    e:
      for (let o = 0, l = t; ; ) {
        for (let h = l.previousSibling, c; h; h = h.previousSibling) {
          if (c = _.get(h)) {
            s = r = c.posAtEnd + o;
            break e;
          }
          let f = new uc([], n.state);
          if (f.readNode(h), f.text.indexOf(Jt) > -1)
            return null;
          o += f.text.length;
        }
        if (l = l.parentNode, !l)
          return null;
        let a = _.get(l);
        if (a) {
          s = r = a.posAtStart + o;
          break;
        }
      }
  return { from: s, to: r, node: t };
}
function kO(n, e) {
  let t = Ac(n);
  if (!t)
    return null;
  let { from: i, to: s, node: r } = t, o = e.mapPos(i, -1), l = e.mapPos(s, 1), a = r.nodeValue;
  if (/[\n\r]/.test(a))
    return null;
  if (l - o != a.length) {
    let u = e.mapPos(i, 1), d = e.mapPos(s, -1);
    if (d - u == a.length)
      o = u, l = d;
    else if (n.state.doc.sliceString(l - a.length, l) == a)
      o = l - a.length;
    else if (n.state.doc.sliceString(o, o + a.length) == a)
      l = o + a.length;
    else
      return null;
  }
  let { main: h } = n.state.selection;
  if (n.state.doc.sliceString(o, l) != a || o > h.head || l < h.head)
    return null;
  let c = [], f = new De(i, s, o, l);
  for (let u = r.parentNode; ; u = u.parentNode) {
    let d = _.get(u);
    if (d instanceof pt)
      c.push({ node: u, deco: d.mark });
    else {
      if (d instanceof me || u.nodeName == "DIV" && u.parentNode == n.contentDOM)
        return { range: f, text: r, marks: c, line: u };
      if (u != n.contentDOM)
        c.push({ node: u, deco: new sn({
          inclusive: !0,
          attributes: OO(u),
          tagName: u.tagName.toLowerCase()
        }) });
      else
        return null;
    }
  }
}
function Vc(n, e, t) {
  if (t <= 0)
    for (let i = n, s = e; ; ) {
      if (i.nodeType == 3)
        return i;
      if (i.nodeType == 1 && s > 0)
        i = i.childNodes[s - 1], s = Tt(i);
      else
        break;
    }
  if (t >= 0)
    for (let i = n, s = e; ; ) {
      if (i.nodeType == 3)
        return i;
      if (i.nodeType == 1 && s < i.childNodes.length && t >= 0)
        i = i.childNodes[s], s = 0;
      else
        break;
    }
  return null;
}
function vO(n, e) {
  return n.nodeType != 1 ? 0 : (e && n.childNodes[e - 1].contentEditable == "false" ? 1 : 0) | (e < n.childNodes.length && n.childNodes[e].contentEditable == "false" ? 2 : 0);
}
class PO {
  constructor() {
    this.changes = [];
  }
  compareRange(e, t) {
    Fr(e, t, this.changes);
  }
  comparePoint(e, t) {
    Fr(e, t, this.changes);
  }
}
function CO(n, e, t) {
  let i = new PO();
  return D.compare(n, e, t, i), i.changes;
}
function XO(n, e) {
  for (let t = n; t && t != e; t = t.assignedSlot || t.parentNode)
    if (t.nodeType == 1 && t.contentEditable == "false")
      return !0;
  return !1;
}
function TO(n, e, t = 1) {
  let i = n.charCategorizer(e), s = n.doc.lineAt(e), r = e - s.from;
  if (s.length == 0)
    return y.cursor(e);
  r == 0 ? t = 1 : r == s.length && (t = -1);
  let o = r, l = r;
  t < 0 ? o = Oe(s.text, r, !1) : l = Oe(s.text, r);
  let a = i(s.text.slice(o, l));
  for (; o > 0; ) {
    let h = Oe(s.text, o, !1);
    if (i(s.text.slice(h, o)) != a)
      break;
    o = h;
  }
  for (; l < s.length; ) {
    let h = Oe(s.text, l);
    if (i(s.text.slice(l, h)) != a)
      break;
    l = h;
  }
  return y.range(o + s.from, l + s.from);
}
function ZO(n, e) {
  return e.left > n ? e.left - n : Math.max(0, n - e.right);
}
function RO(n, e) {
  return e.top > n ? e.top - n : Math.max(0, n - e.bottom);
}
function er(n, e) {
  return n.top < e.bottom - 1 && n.bottom > e.top + 1;
}
function Ul(n, e) {
  return e < n.top ? { top: e, left: n.left, right: n.right, bottom: n.bottom } : n;
}
function ql(n, e) {
  return e > n.bottom ? { top: n.top, left: n.left, right: n.right, bottom: e } : n;
}
function eo(n, e, t) {
  let i, s, r, o, l = !1, a, h, c, f;
  for (let O = n.firstChild; O; O = O.nextSibling) {
    let m = ji(O);
    for (let g = 0; g < m.length; g++) {
      let S = m[g];
      s && er(s, S) && (S = Ul(ql(S, s.bottom), s.top));
      let b = ZO(e, S), v = RO(t, S);
      if (b == 0 && v == 0)
        return O.nodeType == 3 ? El(O, e, t) : eo(O, e, t);
      if (!i || o > v || o == v && r > b) {
        i = O, s = S, r = b, o = v;
        let Q = v ? t < S.top ? -1 : 1 : b ? e < S.left ? -1 : 1 : 0;
        l = !Q || (Q > 0 ? g < m.length - 1 : g > 0);
      }
      b == 0 ? t > S.bottom && (!c || c.bottom < S.bottom) ? (a = O, c = S) : t < S.top && (!f || f.top > S.top) && (h = O, f = S) : c && er(c, S) ? c = ql(c, S.bottom) : f && er(f, S) && (f = Ul(f, S.top));
    }
  }
  if (c && c.bottom >= t ? (i = a, s = c) : f && f.top <= t && (i = h, s = f), !i)
    return { node: n, offset: 0 };
  let u = Math.max(s.left, Math.min(s.right, e));
  if (i.nodeType == 3)
    return El(i, u, t);
  if (l && i.contentEditable != "false")
    return eo(i, u, t);
  let d = Array.prototype.indexOf.call(n.childNodes, i) + (e >= (s.left + s.right) / 2 ? 1 : 0);
  return { node: n, offset: d };
}
function El(n, e, t) {
  let i = n.nodeValue.length, s = -1, r = 1e9, o = 0;
  for (let l = 0; l < i; l++) {
    let a = zt(n, l, l + 1).getClientRects();
    for (let h = 0; h < a.length; h++) {
      let c = a[h];
      if (c.top == c.bottom)
        continue;
      o || (o = e - c.left);
      let f = (c.top > t ? c.top - t : t - c.bottom) - 1;
      if (c.left - 1 <= e && c.right + 1 >= e && f < r) {
        let u = e >= (c.left + c.right) / 2, d = u;
        if ((C.chrome || C.gecko) && zt(n, l).getBoundingClientRect().left == c.right && (d = !u), f <= 0)
          return { node: n, offset: l + (d ? 1 : 0) };
        s = l + (d ? 1 : 0), r = f;
      }
    }
  }
  return { node: n, offset: s > -1 ? s : o > 0 ? n.nodeValue.length : 0 };
}
function Yc(n, e, t, i = -1) {
  var s, r;
  let o = n.contentDOM.getBoundingClientRect(), l = o.top + n.viewState.paddingTop, a, { docHeight: h } = n.viewState, { x: c, y: f } = e, u = f - l;
  if (u < 0)
    return 0;
  if (u > h)
    return n.state.doc.length;
  for (let Q = n.viewState.heightOracle.textHeight / 2, x = !1; a = n.elementAtHeight(u), a.type != F.Text; )
    for (; u = i > 0 ? a.bottom + Q : a.top - Q, !(u >= 0 && u <= h); ) {
      if (x)
        return t ? null : 0;
      x = !0, i = -i;
    }
  f = l + u;
  let d = a.from;
  if (d < n.viewport.from)
    return n.viewport.from == 0 ? 0 : t ? null : _l(n, o, a, c, f);
  if (d > n.viewport.to)
    return n.viewport.to == n.state.doc.length ? n.state.doc.length : t ? null : _l(n, o, a, c, f);
  let O = n.dom.ownerDocument, m = n.root.elementFromPoint ? n.root : O, g = m.elementFromPoint(c, f);
  g && !n.contentDOM.contains(g) && (g = null), g || (c = Math.max(o.left + 1, Math.min(o.right - 1, c)), g = m.elementFromPoint(c, f), g && !n.contentDOM.contains(g) && (g = null));
  let S, b = -1;
  if (g && ((s = n.docView.nearest(g)) === null || s === void 0 ? void 0 : s.isEditable) != !1) {
    if (O.caretPositionFromPoint) {
      let Q = O.caretPositionFromPoint(c, f);
      Q && ({ offsetNode: S, offset: b } = Q);
    } else if (O.caretRangeFromPoint) {
      let Q = O.caretRangeFromPoint(c, f);
      Q && ({ startContainer: S, startOffset: b } = Q, (!n.contentDOM.contains(S) || C.safari && AO(S, b, c) || C.chrome && VO(S, b, c)) && (S = void 0));
    }
  }
  if (!S || !n.docView.dom.contains(S)) {
    let Q = me.find(n.docView, d);
    if (!Q)
      return u > a.top + a.height / 2 ? a.to : a.from;
    ({ node: S, offset: b } = eo(Q.dom, c, f));
  }
  let v = n.docView.nearest(S);
  if (!v)
    return null;
  if (v.isWidget && ((r = v.dom) === null || r === void 0 ? void 0 : r.nodeType) == 1) {
    let Q = v.dom.getBoundingClientRect();
    return e.y < Q.top || e.y <= Q.bottom && e.x <= (Q.left + Q.right) / 2 ? v.posAtStart : v.posAtEnd;
  } else
    return v.localPosFromDOM(S, b) + v.posAtStart;
}
function _l(n, e, t, i, s) {
  let r = Math.round((i - e.left) * n.defaultCharacterWidth);
  if (n.lineWrapping && t.height > n.defaultLineHeight * 1.5) {
    let l = n.viewState.heightOracle.textHeight, a = Math.floor((s - t.top - (n.defaultLineHeight - l) * 0.5) / l);
    r += a * n.viewState.heightOracle.lineLength;
  }
  let o = n.state.sliceDoc(t.from, t.to);
  return t.from + Er(o, r, n.state.tabSize);
}
function AO(n, e, t) {
  let i;
  if (n.nodeType != 3 || e != (i = n.nodeValue.length))
    return !1;
  for (let s = n.nextSibling; s; s = s.nextSibling)
    if (s.nodeType != 1 || s.nodeName != "BR")
      return !1;
  return zt(n, i - 1, i).getBoundingClientRect().left > t;
}
function VO(n, e, t) {
  if (e != 0)
    return !1;
  for (let s = n; ; ) {
    let r = s.parentNode;
    if (!r || r.nodeType != 1 || r.firstChild != s)
      return !1;
    if (r.classList.contains("cm-line"))
      break;
    s = r;
  }
  let i = n.nodeType == 1 ? n.getBoundingClientRect() : zt(n, 0, Math.max(n.nodeValue.length, 1)).getBoundingClientRect();
  return t - i.left > 5;
}
function to(n, e) {
  let t = n.lineBlockAt(e);
  if (Array.isArray(t.type)) {
    for (let i of t.type)
      if (i.to > e || i.to == e && (i.to == t.to || i.type == F.Text))
        return i;
  }
  return t;
}
function YO(n, e, t, i) {
  let s = to(n, e.head), r = !i || s.type != F.Text || !(n.lineWrapping || s.widgetLineBreaks) ? null : n.coordsAtPos(e.assoc < 0 && e.head > s.from ? e.head - 1 : e.head);
  if (r) {
    let o = n.dom.getBoundingClientRect(), l = n.textDirectionAt(s.from), a = n.posAtCoords({
      x: t == (l == N.LTR) ? o.right - 1 : o.left + 1,
      y: (r.top + r.bottom) / 2
    });
    if (a != null)
      return y.cursor(a, t ? -1 : 1);
  }
  return y.cursor(t ? s.to : s.from, t ? -1 : 1);
}
function Bl(n, e, t, i) {
  let s = n.state.doc.lineAt(e.head), r = n.bidiSpans(s), o = n.textDirectionAt(s.from);
  for (let l = e, a = null; ; ) {
    let h = wO(s, r, o, l, t), c = Rc;
    if (!h) {
      if (s.number == (t ? n.state.doc.lines : 1))
        return l;
      c = `
`, s = n.state.doc.line(s.number + (t ? 1 : -1)), r = n.bidiSpans(s), h = y.cursor(t ? s.from : s.to);
    }
    if (a) {
      if (!a(c))
        return l;
    } else {
      if (!i)
        return h;
      a = i(c);
    }
    l = h;
  }
}
function MO(n, e, t) {
  let i = n.state.charCategorizer(e), s = i(t);
  return (r) => {
    let o = i(r);
    return s == j.Space && (s = o), s == o;
  };
}
function WO(n, e, t, i) {
  let s = e.head, r = t ? 1 : -1;
  if (s == (t ? n.state.doc.length : 0))
    return y.cursor(s, e.assoc);
  let o = e.goalColumn, l, a = n.contentDOM.getBoundingClientRect(), h = n.coordsAtPos(s), c = n.documentTop;
  if (h)
    o == null && (o = h.left - a.left), l = r < 0 ? h.top : h.bottom;
  else {
    let d = n.viewState.lineBlockAt(s);
    o == null && (o = Math.min(a.right - a.left, n.defaultCharacterWidth * (s - d.from))), l = (r < 0 ? d.top : d.bottom) + c;
  }
  let f = a.left + o, u = i ?? n.viewState.heightOracle.textHeight >> 1;
  for (let d = 0; ; d += 10) {
    let O = l + (u + d) * r, m = Yc(n, { x: f, y: O }, !1, r);
    if (O < a.top || O > a.bottom || (r < 0 ? m < s : m > s))
      return y.cursor(m, e.assoc, void 0, o);
  }
}
function Un(n, e, t) {
  for (; ; ) {
    let i = 0;
    for (let s of n)
      s.between(e - 1, e + 1, (r, o, l) => {
        if (e > r && e < o) {
          let a = i || t || (e - r < o - e ? -1 : 1);
          e = a < 0 ? r : o, i = a;
        }
      });
    if (!i)
      return e;
  }
}
function tr(n, e, t) {
  let i = Un(n.state.facet(Mo).map((s) => s(n)), t.from, e.head > t.from ? -1 : 1);
  return i == t.from ? t : y.cursor(i, i < t.from ? 1 : -1);
}
class DO {
  constructor(e) {
    this.lastKeyCode = 0, this.lastKeyTime = 0, this.lastTouchTime = 0, this.lastFocusTime = 0, this.lastScrollTop = 0, this.lastScrollLeft = 0, this.chromeScrollHack = -1, this.pendingIOSKey = void 0, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastEscPress = 0, this.lastContextMenu = 0, this.scrollHandlers = [], this.registeredEvents = [], this.customHandlers = [], this.composing = -1, this.compositionFirstChange = null, this.compositionEndedAt = 0, this.compositionPendingKey = !1, this.compositionPendingChange = !1, this.mouseSelection = null;
    let t = (i, s) => {
      this.ignoreDuringComposition(s) || s.type == "keydown" && this.keydown(e, s) || (this.mustFlushObserver(s) && e.observer.forceFlush(), this.runCustomHandlers(s.type, e, s) ? s.preventDefault() : i(e, s));
    };
    for (let i in K) {
      let s = K[i];
      e.contentDOM.addEventListener(i, (r) => {
        zl(e, r) && t(s, r);
      }, io[i]), this.registeredEvents.push(i);
    }
    e.scrollDOM.addEventListener("mousedown", (i) => {
      if (i.target == e.scrollDOM && i.clientY > e.contentDOM.getBoundingClientRect().bottom && (t(K.mousedown, i), !i.defaultPrevented && i.button == 2)) {
        let s = e.contentDOM.style.minHeight;
        e.contentDOM.style.minHeight = "100%", setTimeout(() => e.contentDOM.style.minHeight = s, 200);
      }
    }), e.scrollDOM.addEventListener("drop", (i) => {
      i.target == e.scrollDOM && i.clientY > e.contentDOM.getBoundingClientRect().bottom && t(K.drop, i);
    }), C.chrome && C.chrome_version == 102 && e.scrollDOM.addEventListener("wheel", () => {
      this.chromeScrollHack < 0 ? e.contentDOM.style.pointerEvents = "none" : window.clearTimeout(this.chromeScrollHack), this.chromeScrollHack = setTimeout(() => {
        this.chromeScrollHack = -1, e.contentDOM.style.pointerEvents = "";
      }, 100);
    }, { passive: !0 }), this.notifiedFocused = e.hasFocus, C.safari && e.contentDOM.addEventListener("input", () => null);
  }
  setSelectionOrigin(e) {
    this.lastSelectionOrigin = e, this.lastSelectionTime = Date.now();
  }
  ensureHandlers(e, t) {
    var i;
    let s;
    this.customHandlers = [];
    for (let r of t)
      if (s = (i = r.update(e).spec) === null || i === void 0 ? void 0 : i.domEventHandlers) {
        this.customHandlers.push({ plugin: r.value, handlers: s });
        for (let o in s)
          this.registeredEvents.indexOf(o) < 0 && o != "scroll" && (this.registeredEvents.push(o), e.contentDOM.addEventListener(o, (l) => {
            zl(e, l) && this.runCustomHandlers(o, e, l) && l.preventDefault();
          }));
      }
  }
  runCustomHandlers(e, t, i) {
    for (let s of this.customHandlers) {
      let r = s.handlers[e];
      if (r)
        try {
          if (r.call(s.plugin, i, t) || i.defaultPrevented)
            return !0;
        } catch (o) {
          Ae(t.state, o);
        }
    }
    return !1;
  }
  runScrollHandlers(e, t) {
    this.lastScrollTop = e.scrollDOM.scrollTop, this.lastScrollLeft = e.scrollDOM.scrollLeft;
    for (let i of this.customHandlers) {
      let s = i.handlers.scroll;
      if (s)
        try {
          s.call(i.plugin, t, e);
        } catch (r) {
          Ae(e.state, r);
        }
    }
  }
  keydown(e, t) {
    if (this.lastKeyCode = t.keyCode, this.lastKeyTime = Date.now(), t.keyCode == 9 && Date.now() < this.lastEscPress + 2e3)
      return !0;
    if (t.keyCode != 27 && Wc.indexOf(t.keyCode) < 0 && (e.inputState.lastEscPress = 0), C.android && C.chrome && !t.synthetic && (t.keyCode == 13 || t.keyCode == 8))
      return e.observer.delayAndroidKey(t.key, t.keyCode), !0;
    let i;
    return C.ios && !t.synthetic && !t.altKey && !t.metaKey && ((i = Mc.find((s) => s.keyCode == t.keyCode)) && !t.ctrlKey || UO.indexOf(t.key) > -1 && t.ctrlKey && !t.shiftKey) ? (this.pendingIOSKey = i || t, setTimeout(() => this.flushIOSKey(e), 250), !0) : !1;
  }
  flushIOSKey(e) {
    let t = this.pendingIOSKey;
    return t ? (this.pendingIOSKey = void 0, ri(e.contentDOM, t.key, t.keyCode)) : !1;
  }
  ignoreDuringComposition(e) {
    return /^key/.test(e.type) ? this.composing > 0 ? !0 : C.safari && !C.ios && this.compositionPendingKey && Date.now() - this.compositionEndedAt < 100 ? (this.compositionPendingKey = !1, !0) : !1 : !1;
  }
  mustFlushObserver(e) {
    return e.type == "keydown" && e.keyCode != 229;
  }
  startMouseSelection(e) {
    this.mouseSelection && this.mouseSelection.destroy(), this.mouseSelection = e;
  }
  update(e) {
    this.mouseSelection && this.mouseSelection.update(e), e.transactions.length && (this.lastKeyCode = this.lastSelectionTime = 0);
  }
  destroy() {
    this.mouseSelection && this.mouseSelection.destroy();
  }
}
const Mc = [
  { key: "Backspace", keyCode: 8, inputType: "deleteContentBackward" },
  { key: "Enter", keyCode: 13, inputType: "insertParagraph" },
  { key: "Enter", keyCode: 13, inputType: "insertLineBreak" },
  { key: "Delete", keyCode: 46, inputType: "deleteContentForward" }
], UO = "dthko", Wc = [16, 17, 18, 20, 91, 92, 224, 225], mn = 6;
function Sn(n) {
  return Math.max(0, n) * 0.7 + 8;
}
function qO(n, e) {
  return Math.max(Math.abs(n.clientX - e.clientX), Math.abs(n.clientY - e.clientY));
}
class EO {
  constructor(e, t, i, s) {
    this.view = e, this.startEvent = t, this.style = i, this.mustSelect = s, this.scrollSpeed = { x: 0, y: 0 }, this.scrolling = -1, this.lastEvent = t, this.scrollParent = lO(e.contentDOM), this.atoms = e.state.facet(Mo).map((o) => o(e));
    let r = e.contentDOM.ownerDocument;
    r.addEventListener("mousemove", this.move = this.move.bind(this)), r.addEventListener("mouseup", this.up = this.up.bind(this)), this.extend = t.shiftKey, this.multiple = e.state.facet(M.allowMultipleSelections) && _O(e, t), this.dragging = zO(e, t) && Ec(t) == 1 ? null : !1;
  }
  start(e) {
    this.dragging === !1 && (e.preventDefault(), this.select(e));
  }
  move(e) {
    var t;
    if (e.buttons == 0)
      return this.destroy();
    if (this.dragging || this.dragging == null && qO(this.startEvent, e) < 10)
      return;
    this.select(this.lastEvent = e);
    let i = 0, s = 0, r = ((t = this.scrollParent) === null || t === void 0 ? void 0 : t.getBoundingClientRect()) || { left: 0, top: 0, right: this.view.win.innerWidth, bottom: this.view.win.innerHeight }, o = Xc(this.view);
    e.clientX - o.left <= r.left + mn ? i = -Sn(r.left - e.clientX) : e.clientX + o.right >= r.right - mn && (i = Sn(e.clientX - r.right)), e.clientY - o.top <= r.top + mn ? s = -Sn(r.top - e.clientY) : e.clientY + o.bottom >= r.bottom - mn && (s = Sn(e.clientY - r.bottom)), this.setScrollSpeed(i, s);
  }
  up(e) {
    this.dragging == null && this.select(this.lastEvent), this.dragging || e.preventDefault(), this.destroy();
  }
  destroy() {
    this.setScrollSpeed(0, 0);
    let e = this.view.contentDOM.ownerDocument;
    e.removeEventListener("mousemove", this.move), e.removeEventListener("mouseup", this.up), this.view.inputState.mouseSelection = null;
  }
  setScrollSpeed(e, t) {
    this.scrollSpeed = { x: e, y: t }, e || t ? this.scrolling < 0 && (this.scrolling = setInterval(() => this.scroll(), 50)) : this.scrolling > -1 && (clearInterval(this.scrolling), this.scrolling = -1);
  }
  scroll() {
    this.scrollParent ? (this.scrollParent.scrollLeft += this.scrollSpeed.x, this.scrollParent.scrollTop += this.scrollSpeed.y) : this.view.win.scrollBy(this.scrollSpeed.x, this.scrollSpeed.y), this.dragging === !1 && this.select(this.lastEvent);
  }
  skipAtoms(e) {
    let t = null;
    for (let i = 0; i < e.ranges.length; i++) {
      let s = e.ranges[i], r = null;
      if (s.empty) {
        let o = Un(this.atoms, s.from, 0);
        o != s.from && (r = y.cursor(o, -1));
      } else {
        let o = Un(this.atoms, s.from, -1), l = Un(this.atoms, s.to, 1);
        (o != s.from || l != s.to) && (r = y.range(s.from == s.anchor ? o : l, s.from == s.head ? o : l));
      }
      r && (t || (t = e.ranges.slice()), t[i] = r);
    }
    return t ? y.create(t, e.mainIndex) : e;
  }
  select(e) {
    let { view: t } = this, i = this.skipAtoms(this.style.get(e, this.extend, this.multiple));
    (this.mustSelect || !i.eq(t.state.selection) || i.main.assoc != t.state.selection.main.assoc && this.dragging === !1) && this.view.dispatch({
      selection: i,
      userEvent: "select.pointer"
    }), this.mustSelect = !1;
  }
  update(e) {
    e.docChanged && this.dragging && (this.dragging = this.dragging.map(e.changes)), this.style.update(e) && setTimeout(() => this.select(this.lastEvent), 20);
  }
}
function _O(n, e) {
  let t = n.state.facet(yc);
  return t.length ? t[0](e) : C.mac ? e.metaKey : e.ctrlKey;
}
function BO(n, e) {
  let t = n.state.facet(bc);
  return t.length ? t[0](e) : C.mac ? !e.altKey : !e.ctrlKey;
}
function zO(n, e) {
  let { main: t } = n.state.selection;
  if (t.empty)
    return !1;
  let i = Kn(n.root);
  if (!i || i.rangeCount == 0)
    return !0;
  let s = i.getRangeAt(0).getClientRects();
  for (let r = 0; r < s.length; r++) {
    let o = s[r];
    if (o.left <= e.clientX && o.right >= e.clientX && o.top <= e.clientY && o.bottom >= e.clientY)
      return !0;
  }
  return !1;
}
function zl(n, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let t = e.target, i; t != n.contentDOM; t = t.parentNode)
    if (!t || t.nodeType == 11 || (i = _.get(t)) && i.ignoreEvent(e))
      return !1;
  return !0;
}
const K = /* @__PURE__ */ Object.create(null), io = /* @__PURE__ */ Object.create(null), Dc = C.ie && C.ie_version < 15 || C.ios && C.webkit_version < 604;
function IO(n) {
  let e = n.dom.parentNode;
  if (!e)
    return;
  let t = e.appendChild(document.createElement("textarea"));
  t.style.cssText = "position: fixed; left: -10000px; top: 10px", t.focus(), setTimeout(() => {
    n.focus(), t.remove(), Uc(n, t.value);
  }, 50);
}
function Uc(n, e) {
  let { state: t } = n, i, s = 1, r = t.toText(e), o = r.lines == t.selection.ranges.length;
  if (no != null && t.selection.ranges.every((a) => a.empty) && no == r.toString()) {
    let a = -1;
    i = t.changeByRange((h) => {
      let c = t.doc.lineAt(h.from);
      if (c.from == a)
        return { range: h };
      a = c.from;
      let f = t.toText((o ? r.line(s++).text : e) + t.lineBreak);
      return {
        changes: { from: c.from, insert: f },
        range: y.cursor(h.from + f.length)
      };
    });
  } else
    o ? i = t.changeByRange((a) => {
      let h = r.line(s++);
      return {
        changes: { from: a.from, to: a.to, insert: h.text },
        range: y.cursor(a.from + h.length)
      };
    }) : i = t.replaceSelection(r);
  n.dispatch(i, {
    userEvent: "input.paste",
    scrollIntoView: !0
  });
}
K.keydown = (n, e) => {
  n.inputState.setSelectionOrigin("select"), e.keyCode == 27 && (n.inputState.lastEscPress = Date.now());
};
K.touchstart = (n, e) => {
  n.inputState.lastTouchTime = Date.now(), n.inputState.setSelectionOrigin("select.pointer");
};
K.touchmove = (n) => {
  n.inputState.setSelectionOrigin("select.pointer");
};
io.touchstart = io.touchmove = { passive: !0 };
K.mousedown = (n, e) => {
  if (n.observer.flush(), n.inputState.lastTouchTime > Date.now() - 2e3)
    return;
  let t = null;
  for (let i of n.state.facet(Qc))
    if (t = i(n, e), t)
      break;
  if (!t && e.button == 0 && (t = NO(n, e)), t) {
    let i = !n.hasFocus;
    n.inputState.startMouseSelection(new EO(n, e, t, i)), i && n.observer.ignore(() => oc(n.contentDOM)), n.inputState.mouseSelection && n.inputState.mouseSelection.start(e);
  }
};
function Il(n, e, t, i) {
  if (i == 1)
    return y.cursor(e, t);
  if (i == 2)
    return TO(n.state, e, t);
  {
    let s = me.find(n.docView, e), r = n.state.doc.lineAt(s ? s.posAtEnd : e), o = s ? s.posAtStart : r.from, l = s ? s.posAtEnd : r.to;
    return l < n.state.doc.length && l == r.to && l++, y.range(o, l);
  }
}
let qc = (n, e) => n >= e.top && n <= e.bottom, jl = (n, e, t) => qc(e, t) && n >= t.left && n <= t.right;
function jO(n, e, t, i) {
  let s = me.find(n.docView, e);
  if (!s)
    return 1;
  let r = e - s.posAtStart;
  if (r == 0)
    return 1;
  if (r == s.length)
    return -1;
  let o = s.coordsAt(r, -1);
  if (o && jl(t, i, o))
    return -1;
  let l = s.coordsAt(r, 1);
  return l && jl(t, i, l) ? 1 : o && qc(i, o) ? -1 : 1;
}
function Ll(n, e) {
  let t = n.posAtCoords({ x: e.clientX, y: e.clientY }, !1);
  return { pos: t, bias: jO(n, t, e.clientX, e.clientY) };
}
const LO = C.ie && C.ie_version <= 11;
let Nl = null, Gl = 0, Fl = 0;
function Ec(n) {
  if (!LO)
    return n.detail;
  let e = Nl, t = Fl;
  return Nl = n, Fl = Date.now(), Gl = !e || t > Date.now() - 400 && Math.abs(e.clientX - n.clientX) < 2 && Math.abs(e.clientY - n.clientY) < 2 ? (Gl + 1) % 3 : 1;
}
function NO(n, e) {
  let t = Ll(n, e), i = Ec(e), s = n.state.selection;
  return {
    update(r) {
      r.docChanged && (t.pos = r.changes.mapPos(t.pos), s = s.map(r.changes));
    },
    get(r, o, l) {
      let a = Ll(n, r), h, c = Il(n, a.pos, a.bias, i);
      if (t.pos != a.pos && !o) {
        let f = Il(n, t.pos, t.bias, i), u = Math.min(f.from, c.from), d = Math.max(f.to, c.to);
        c = u < c.from ? y.range(u, d) : y.range(d, u);
      }
      return o ? s.replaceRange(s.main.extend(c.from, c.to)) : l && i == 1 && s.ranges.length > 1 && (h = GO(s, a.pos)) ? h : l ? s.addRange(c) : y.create([c]);
    }
  };
}
function GO(n, e) {
  for (let t = 0; t < n.ranges.length; t++) {
    let { from: i, to: s } = n.ranges[t];
    if (i <= e && s >= e)
      return y.create(n.ranges.slice(0, t).concat(n.ranges.slice(t + 1)), n.mainIndex == t ? 0 : n.mainIndex - (n.mainIndex > t ? 1 : 0));
  }
  return null;
}
K.dragstart = (n, e) => {
  let { selection: { main: t } } = n.state, { mouseSelection: i } = n.inputState;
  i && (i.dragging = t), e.dataTransfer && (e.dataTransfer.setData("Text", n.state.sliceDoc(t.from, t.to)), e.dataTransfer.effectAllowed = "copyMove");
};
function Hl(n, e, t, i) {
  if (!t)
    return;
  let s = n.posAtCoords({ x: e.clientX, y: e.clientY }, !1);
  e.preventDefault();
  let { mouseSelection: r } = n.inputState, o = i && r && r.dragging && BO(n, e) ? { from: r.dragging.from, to: r.dragging.to } : null, l = { from: s, insert: t }, a = n.state.changes(o ? [o, l] : l);
  n.focus(), n.dispatch({
    changes: a,
    selection: { anchor: a.mapPos(s, -1), head: a.mapPos(s, 1) },
    userEvent: o ? "move.drop" : "input.drop"
  });
}
K.drop = (n, e) => {
  if (!e.dataTransfer)
    return;
  if (n.state.readOnly)
    return e.preventDefault();
  let t = e.dataTransfer.files;
  if (t && t.length) {
    e.preventDefault();
    let i = Array(t.length), s = 0, r = () => {
      ++s == t.length && Hl(n, e, i.filter((o) => o != null).join(n.state.lineBreak), !1);
    };
    for (let o = 0; o < t.length; o++) {
      let l = new FileReader();
      l.onerror = r, l.onload = () => {
        /[\x00-\x08\x0e-\x1f]{2}/.test(l.result) || (i[o] = l.result), r();
      }, l.readAsText(t[o]);
    }
  } else
    Hl(n, e, e.dataTransfer.getData("Text"), !0);
};
K.paste = (n, e) => {
  if (n.state.readOnly)
    return e.preventDefault();
  n.observer.flush();
  let t = Dc ? null : e.clipboardData;
  t ? (Uc(n, t.getData("text/plain") || t.getData("text/uri-text")), e.preventDefault()) : IO(n);
};
function FO(n, e) {
  let t = n.dom.parentNode;
  if (!t)
    return;
  let i = t.appendChild(document.createElement("textarea"));
  i.style.cssText = "position: fixed; left: -10000px; top: 10px", i.value = e, i.focus(), i.selectionEnd = e.length, i.selectionStart = 0, setTimeout(() => {
    i.remove(), n.focus();
  }, 50);
}
function HO(n) {
  let e = [], t = [], i = !1;
  for (let s of n.selection.ranges)
    s.empty || (e.push(n.sliceDoc(s.from, s.to)), t.push(s));
  if (!e.length) {
    let s = -1;
    for (let { from: r } of n.selection.ranges) {
      let o = n.doc.lineAt(r);
      o.number > s && (e.push(o.text), t.push({ from: o.from, to: Math.min(n.doc.length, o.to + 1) })), s = o.number;
    }
    i = !0;
  }
  return { text: e.join(n.lineBreak), ranges: t, linewise: i };
}
let no = null;
K.copy = K.cut = (n, e) => {
  let { text: t, ranges: i, linewise: s } = HO(n.state);
  if (!t && !s)
    return;
  no = s ? t : null;
  let r = Dc ? null : e.clipboardData;
  r ? (e.preventDefault(), r.clearData(), r.setData("text/plain", t)) : FO(n, t), e.type == "cut" && !n.state.readOnly && n.dispatch({
    changes: i,
    scrollIntoView: !0,
    userEvent: "delete.cut"
  });
};
const _c = /* @__PURE__ */ mt.define();
function Bc(n, e) {
  let t = [];
  for (let i of n.facet($c)) {
    let s = i(n, e);
    s && t.push(s);
  }
  return t ? n.update({ effects: t, annotations: _c.of(!0) }) : null;
}
function zc(n) {
  setTimeout(() => {
    let e = n.hasFocus;
    if (e != n.inputState.notifiedFocused) {
      let t = Bc(n.state, e);
      t ? n.dispatch(t) : n.update([]);
    }
  }, 10);
}
K.focus = (n) => {
  n.inputState.lastFocusTime = Date.now(), !n.scrollDOM.scrollTop && (n.inputState.lastScrollTop || n.inputState.lastScrollLeft) && (n.scrollDOM.scrollTop = n.inputState.lastScrollTop, n.scrollDOM.scrollLeft = n.inputState.lastScrollLeft), zc(n);
};
K.blur = (n) => {
  n.observer.clearSelectionRange(), zc(n);
};
K.compositionstart = K.compositionupdate = (n) => {
  n.inputState.compositionFirstChange == null && (n.inputState.compositionFirstChange = !0), n.inputState.composing < 0 && (n.inputState.composing = 0);
};
K.compositionend = (n) => {
  n.inputState.composing = -1, n.inputState.compositionEndedAt = Date.now(), n.inputState.compositionPendingKey = !0, n.inputState.compositionPendingChange = n.observer.pendingRecords().length > 0, n.inputState.compositionFirstChange = null, C.chrome && C.android ? n.observer.flushSoon() : n.inputState.compositionPendingChange ? Promise.resolve().then(() => n.observer.flush()) : setTimeout(() => {
    n.inputState.composing < 0 && n.docView.hasComposition && n.update([]);
  }, 50);
};
K.contextmenu = (n) => {
  n.inputState.lastContextMenu = Date.now();
};
K.beforeinput = (n, e) => {
  var t;
  let i;
  if (C.chrome && C.android && (i = Mc.find((s) => s.inputType == e.inputType)) && (n.observer.delayAndroidKey(i.key, i.keyCode), i.key == "Backspace" || i.key == "Delete")) {
    let s = ((t = window.visualViewport) === null || t === void 0 ? void 0 : t.height) || 0;
    setTimeout(() => {
      var r;
      (((r = window.visualViewport) === null || r === void 0 ? void 0 : r.height) || 0) > s + 10 && n.hasFocus && (n.contentDOM.blur(), n.focus());
    }, 100);
  }
};
const Jl = ["pre-wrap", "normal", "pre-line", "break-spaces"];
class JO {
  constructor(e) {
    this.lineWrapping = e, this.doc = W.empty, this.heightSamples = {}, this.lineHeight = 14, this.charWidth = 7, this.textHeight = 14, this.lineLength = 30, this.heightChanged = !1;
  }
  heightForGap(e, t) {
    let i = this.doc.lineAt(t).number - this.doc.lineAt(e).number + 1;
    return this.lineWrapping && (i += Math.max(0, Math.ceil((t - e - i * this.lineLength * 0.5) / this.lineLength))), this.lineHeight * i;
  }
  heightForLine(e) {
    return this.lineWrapping ? (1 + Math.max(0, Math.ceil((e - this.lineLength) / (this.lineLength - 5)))) * this.lineHeight : this.lineHeight;
  }
  setDoc(e) {
    return this.doc = e, this;
  }
  mustRefreshForWrapping(e) {
    return Jl.indexOf(e) > -1 != this.lineWrapping;
  }
  mustRefreshForHeights(e) {
    let t = !1;
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      s < 0 ? i++ : this.heightSamples[Math.floor(s * 10)] || (t = !0, this.heightSamples[Math.floor(s * 10)] = !0);
    }
    return t;
  }
  refresh(e, t, i, s, r, o) {
    let l = Jl.indexOf(e) > -1, a = Math.round(t) != Math.round(this.lineHeight) || this.lineWrapping != l;
    if (this.lineWrapping = l, this.lineHeight = t, this.charWidth = i, this.textHeight = s, this.lineLength = r, a) {
      this.heightSamples = {};
      for (let h = 0; h < o.length; h++) {
        let c = o[h];
        c < 0 ? h++ : this.heightSamples[Math.floor(c * 10)] = !0;
      }
    }
    return a;
  }
}
class KO {
  constructor(e, t) {
    this.from = e, this.heights = t, this.index = 0;
  }
  get more() {
    return this.index < this.heights.length;
  }
}
class tt {
  /**
  @internal
  */
  constructor(e, t, i, s, r) {
    this.from = e, this.length = t, this.top = i, this.height = s, this._content = r;
  }
  /**
  The type of element this is. When querying lines, this may be
  an array of all the blocks that make up the line.
  */
  get type() {
    return typeof this._content == "number" ? F.Text : Array.isArray(this._content) ? this._content : this._content.type;
  }
  /**
  The end of the element as a document position.
  */
  get to() {
    return this.from + this.length;
  }
  /**
  The bottom position of the element.
  */
  get bottom() {
    return this.top + this.height;
  }
  /**
  If this is a widget block, this will return the widget
  associated with it.
  */
  get widget() {
    return this._content instanceof Zt ? this._content.widget : null;
  }
  /**
  If this is a textblock, this holds the number of line breaks
  that appear in widgets inside the block.
  */
  get widgetLineBreaks() {
    return typeof this._content == "number" ? this._content : 0;
  }
  /**
  @internal
  */
  join(e) {
    let t = (Array.isArray(this._content) ? this._content : [this]).concat(Array.isArray(e._content) ? e._content : [e]);
    return new tt(this.from, this.length + e.length, this.top, this.height + e.height, t);
  }
}
var z = /* @__PURE__ */ function(n) {
  return n[n.ByPos = 0] = "ByPos", n[n.ByHeight = 1] = "ByHeight", n[n.ByPosNoHeight = 2] = "ByPosNoHeight", n;
}(z || (z = {}));
const qn = 1e-3;
class ye {
  constructor(e, t, i = 2) {
    this.length = e, this.height = t, this.flags = i;
  }
  get outdated() {
    return (this.flags & 2) > 0;
  }
  set outdated(e) {
    this.flags = (e ? 2 : 0) | this.flags & -3;
  }
  setHeight(e, t) {
    this.height != t && (Math.abs(this.height - t) > qn && (e.heightChanged = !0), this.height = t);
  }
  // Base case is to replace a leaf node, which simply builds a tree
  // from the new nodes and returns that (HeightMapBranch and
  // HeightMapGap override this to actually use from/to)
  replace(e, t, i) {
    return ye.of(i);
  }
  // Again, these are base cases, and are overridden for branch and gap nodes.
  decomposeLeft(e, t) {
    t.push(this);
  }
  decomposeRight(e, t) {
    t.push(this);
  }
  applyChanges(e, t, i, s) {
    let r = this, o = i.doc;
    for (let l = s.length - 1; l >= 0; l--) {
      let { fromA: a, toA: h, fromB: c, toB: f } = s[l], u = r.lineAt(a, z.ByPosNoHeight, i.setDoc(t), 0, 0), d = u.to >= h ? u : r.lineAt(h, z.ByPosNoHeight, i, 0, 0);
      for (f += d.to - h, h = d.to; l > 0 && u.from <= s[l - 1].toA; )
        a = s[l - 1].fromA, c = s[l - 1].fromB, l--, a < u.from && (u = r.lineAt(a, z.ByPosNoHeight, i, 0, 0));
      c += u.from - a, a = u.from;
      let O = Wo.build(i.setDoc(o), e, c, f);
      r = r.replace(a, h, O);
    }
    return r.updateHeight(i, 0);
  }
  static empty() {
    return new Ce(0, 0);
  }
  // nodes uses null values to indicate the position of line breaks.
  // There are never line breaks at the start or end of the array, or
  // two line breaks next to each other, and the array isn't allowed
  // to be empty (same restrictions as return value from the builder).
  static of(e) {
    if (e.length == 1)
      return e[0];
    let t = 0, i = e.length, s = 0, r = 0;
    for (; ; )
      if (t == i)
        if (s > r * 2) {
          let l = e[t - 1];
          l.break ? e.splice(--t, 1, l.left, null, l.right) : e.splice(--t, 1, l.left, l.right), i += 1 + l.break, s -= l.size;
        } else if (r > s * 2) {
          let l = e[i];
          l.break ? e.splice(i, 1, l.left, null, l.right) : e.splice(i, 1, l.left, l.right), i += 2 + l.break, r -= l.size;
        } else
          break;
      else if (s < r) {
        let l = e[t++];
        l && (s += l.size);
      } else {
        let l = e[--i];
        l && (r += l.size);
      }
    let o = 0;
    return e[t - 1] == null ? (o = 1, t--) : e[t] == null && (o = 1, i++), new ep(ye.of(e.slice(0, t)), o, ye.of(e.slice(i)));
  }
}
ye.prototype.size = 1;
class Ic extends ye {
  constructor(e, t, i) {
    super(e, t), this.deco = i;
  }
  blockAt(e, t, i, s) {
    return new tt(s, this.length, i, this.height, this.deco || 0);
  }
  lineAt(e, t, i, s, r) {
    return this.blockAt(0, i, s, r);
  }
  forEachLine(e, t, i, s, r, o) {
    e <= r + this.length && t >= r && o(this.blockAt(0, i, s, r));
  }
  updateHeight(e, t = 0, i = !1, s) {
    return s && s.from <= t && s.more && this.setHeight(e, s.heights[s.index++]), this.outdated = !1, this;
  }
  toString() {
    return `block(${this.length})`;
  }
}
class Ce extends Ic {
  constructor(e, t) {
    super(e, t, null), this.collapsed = 0, this.widgetHeight = 0, this.breaks = 0;
  }
  blockAt(e, t, i, s) {
    return new tt(s, this.length, i, this.height, this.breaks);
  }
  replace(e, t, i) {
    let s = i[0];
    return i.length == 1 && (s instanceof Ce || s instanceof le && s.flags & 4) && Math.abs(this.length - s.length) < 10 ? (s instanceof le ? s = new Ce(s.length, this.height) : s.height = this.height, this.outdated || (s.outdated = !1), s) : ye.of(i);
  }
  updateHeight(e, t = 0, i = !1, s) {
    return s && s.from <= t && s.more ? this.setHeight(e, s.heights[s.index++]) : (i || this.outdated) && this.setHeight(e, Math.max(this.widgetHeight, e.heightForLine(this.length - this.collapsed)) + this.breaks * e.lineHeight), this.outdated = !1, this;
  }
  toString() {
    return `line(${this.length}${this.collapsed ? -this.collapsed : ""}${this.widgetHeight ? ":" + this.widgetHeight : ""})`;
  }
}
class le extends ye {
  constructor(e) {
    super(e, 0);
  }
  heightMetrics(e, t) {
    let i = e.doc.lineAt(t).number, s = e.doc.lineAt(t + this.length).number, r = s - i + 1, o, l = 0;
    if (e.lineWrapping) {
      let a = Math.min(this.height, e.lineHeight * r);
      o = a / r, this.length > r + 1 && (l = (this.height - a) / (this.length - r - 1));
    } else
      o = this.height / r;
    return { firstLine: i, lastLine: s, perLine: o, perChar: l };
  }
  blockAt(e, t, i, s) {
    let { firstLine: r, lastLine: o, perLine: l, perChar: a } = this.heightMetrics(t, s);
    if (t.lineWrapping) {
      let h = s + Math.round(Math.max(0, Math.min(1, (e - i) / this.height)) * this.length), c = t.doc.lineAt(h), f = l + c.length * a, u = Math.max(i, e - f / 2);
      return new tt(c.from, c.length, u, f, 0);
    } else {
      let h = Math.max(0, Math.min(o - r, Math.floor((e - i) / l))), { from: c, length: f } = t.doc.line(r + h);
      return new tt(c, f, i + l * h, l, 0);
    }
  }
  lineAt(e, t, i, s, r) {
    if (t == z.ByHeight)
      return this.blockAt(e, i, s, r);
    if (t == z.ByPosNoHeight) {
      let { from: d, to: O } = i.doc.lineAt(e);
      return new tt(d, O - d, 0, 0, 0);
    }
    let { firstLine: o, perLine: l, perChar: a } = this.heightMetrics(i, r), h = i.doc.lineAt(e), c = l + h.length * a, f = h.number - o, u = s + l * f + a * (h.from - r - f);
    return new tt(h.from, h.length, Math.max(s, Math.min(u, s + this.height - c)), c, 0);
  }
  forEachLine(e, t, i, s, r, o) {
    e = Math.max(e, r), t = Math.min(t, r + this.length);
    let { firstLine: l, perLine: a, perChar: h } = this.heightMetrics(i, r);
    for (let c = e, f = s; c <= t; ) {
      let u = i.doc.lineAt(c);
      if (c == e) {
        let O = u.number - l;
        f += a * O + h * (e - r - O);
      }
      let d = a + h * u.length;
      o(new tt(u.from, u.length, f, d, 0)), f += d, c = u.to + 1;
    }
  }
  replace(e, t, i) {
    let s = this.length - t;
    if (s > 0) {
      let r = i[i.length - 1];
      r instanceof le ? i[i.length - 1] = new le(r.length + s) : i.push(null, new le(s - 1));
    }
    if (e > 0) {
      let r = i[0];
      r instanceof le ? i[0] = new le(e + r.length) : i.unshift(new le(e - 1), null);
    }
    return ye.of(i);
  }
  decomposeLeft(e, t) {
    t.push(new le(e - 1), null);
  }
  decomposeRight(e, t) {
    t.push(null, new le(this.length - e - 1));
  }
  updateHeight(e, t = 0, i = !1, s) {
    let r = t + this.length;
    if (s && s.from <= t + this.length && s.more) {
      let o = [], l = Math.max(t, s.from), a = -1;
      for (s.from > t && o.push(new le(s.from - t - 1).updateHeight(e, t)); l <= r && s.more; ) {
        let c = e.doc.lineAt(l).length;
        o.length && o.push(null);
        let f = s.heights[s.index++];
        a == -1 ? a = f : Math.abs(f - a) >= qn && (a = -2);
        let u = new Ce(c, f);
        u.outdated = !1, o.push(u), l += c + 1;
      }
      l <= r && o.push(null, new le(r - l).updateHeight(e, l));
      let h = ye.of(o);
      return (a < 0 || Math.abs(h.height - this.height) >= qn || Math.abs(a - this.heightMetrics(e, t).perLine) >= qn) && (e.heightChanged = !0), h;
    } else
      (i || this.outdated) && (this.setHeight(e, e.heightForGap(t, t + this.length)), this.outdated = !1);
    return this;
  }
  toString() {
    return `gap(${this.length})`;
  }
}
class ep extends ye {
  constructor(e, t, i) {
    super(e.length + t + i.length, e.height + i.height, t | (e.outdated || i.outdated ? 2 : 0)), this.left = e, this.right = i, this.size = e.size + i.size;
  }
  get break() {
    return this.flags & 1;
  }
  blockAt(e, t, i, s) {
    let r = i + this.left.height;
    return e < r ? this.left.blockAt(e, t, i, s) : this.right.blockAt(e, t, r, s + this.left.length + this.break);
  }
  lineAt(e, t, i, s, r) {
    let o = s + this.left.height, l = r + this.left.length + this.break, a = t == z.ByHeight ? e < o : e < l, h = a ? this.left.lineAt(e, t, i, s, r) : this.right.lineAt(e, t, i, o, l);
    if (this.break || (a ? h.to < l : h.from > l))
      return h;
    let c = t == z.ByPosNoHeight ? z.ByPosNoHeight : z.ByPos;
    return a ? h.join(this.right.lineAt(l, c, i, o, l)) : this.left.lineAt(l, c, i, s, r).join(h);
  }
  forEachLine(e, t, i, s, r, o) {
    let l = s + this.left.height, a = r + this.left.length + this.break;
    if (this.break)
      e < a && this.left.forEachLine(e, t, i, s, r, o), t >= a && this.right.forEachLine(e, t, i, l, a, o);
    else {
      let h = this.lineAt(a, z.ByPos, i, s, r);
      e < h.from && this.left.forEachLine(e, h.from - 1, i, s, r, o), h.to >= e && h.from <= t && o(h), t > h.to && this.right.forEachLine(h.to + 1, t, i, l, a, o);
    }
  }
  replace(e, t, i) {
    let s = this.left.length + this.break;
    if (t < s)
      return this.balanced(this.left.replace(e, t, i), this.right);
    if (e > this.left.length)
      return this.balanced(this.left, this.right.replace(e - s, t - s, i));
    let r = [];
    e > 0 && this.decomposeLeft(e, r);
    let o = r.length;
    for (let l of i)
      r.push(l);
    if (e > 0 && Kl(r, o - 1), t < this.length) {
      let l = r.length;
      this.decomposeRight(t, r), Kl(r, l);
    }
    return ye.of(r);
  }
  decomposeLeft(e, t) {
    let i = this.left.length;
    if (e <= i)
      return this.left.decomposeLeft(e, t);
    t.push(this.left), this.break && (i++, e >= i && t.push(null)), e > i && this.right.decomposeLeft(e - i, t);
  }
  decomposeRight(e, t) {
    let i = this.left.length, s = i + this.break;
    if (e >= s)
      return this.right.decomposeRight(e - s, t);
    e < i && this.left.decomposeRight(e, t), this.break && e < s && t.push(null), t.push(this.right);
  }
  balanced(e, t) {
    return e.size > 2 * t.size || t.size > 2 * e.size ? ye.of(this.break ? [e, null, t] : [e, t]) : (this.left = e, this.right = t, this.height = e.height + t.height, this.outdated = e.outdated || t.outdated, this.size = e.size + t.size, this.length = e.length + this.break + t.length, this);
  }
  updateHeight(e, t = 0, i = !1, s) {
    let { left: r, right: o } = this, l = t + r.length + this.break, a = null;
    return s && s.from <= t + r.length && s.more ? a = r = r.updateHeight(e, t, i, s) : r.updateHeight(e, t, i), s && s.from <= l + o.length && s.more ? a = o = o.updateHeight(e, l, i, s) : o.updateHeight(e, l, i), a ? this.balanced(r, o) : (this.height = this.left.height + this.right.height, this.outdated = !1, this);
  }
  toString() {
    return this.left + (this.break ? " " : "-") + this.right;
  }
}
function Kl(n, e) {
  let t, i;
  n[e] == null && (t = n[e - 1]) instanceof le && (i = n[e + 1]) instanceof le && n.splice(e - 1, 3, new le(t.length + 1 + i.length));
}
const tp = 5;
class Wo {
  constructor(e, t) {
    this.pos = e, this.oracle = t, this.nodes = [], this.lineStart = -1, this.lineEnd = -1, this.covering = null, this.writtenTo = e;
  }
  get isCovered() {
    return this.covering && this.nodes[this.nodes.length - 1] == this.covering;
  }
  span(e, t) {
    if (this.lineStart > -1) {
      let i = Math.min(t, this.lineEnd), s = this.nodes[this.nodes.length - 1];
      s instanceof Ce ? s.length += i - this.pos : (i > this.pos || !this.isCovered) && this.nodes.push(new Ce(i - this.pos, -1)), this.writtenTo = i, t > i && (this.nodes.push(null), this.writtenTo++, this.lineStart = -1);
    }
    this.pos = t;
  }
  point(e, t, i) {
    if (e < t || i.heightRelevant) {
      let s = i.widget ? i.widget.estimatedHeight : 0, r = i.widget ? i.widget.lineBreaks : 0;
      s < 0 && (s = this.oracle.lineHeight);
      let o = t - e;
      i.block ? this.addBlock(new Ic(o, s, i)) : (o || r || s >= tp) && this.addLineDeco(s, r, o);
    } else
      t > e && this.span(e, t);
    this.lineEnd > -1 && this.lineEnd < this.pos && (this.lineEnd = this.oracle.doc.lineAt(this.pos).to);
  }
  enterLine() {
    if (this.lineStart > -1)
      return;
    let { from: e, to: t } = this.oracle.doc.lineAt(this.pos);
    this.lineStart = e, this.lineEnd = t, this.writtenTo < e && ((this.writtenTo < e - 1 || this.nodes[this.nodes.length - 1] == null) && this.nodes.push(this.blankContent(this.writtenTo, e - 1)), this.nodes.push(null)), this.pos > e && this.nodes.push(new Ce(this.pos - e, -1)), this.writtenTo = this.pos;
  }
  blankContent(e, t) {
    let i = new le(t - e);
    return this.oracle.doc.lineAt(e).to == t && (i.flags |= 4), i;
  }
  ensureLine() {
    this.enterLine();
    let e = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
    if (e instanceof Ce)
      return e;
    let t = new Ce(0, -1);
    return this.nodes.push(t), t;
  }
  addBlock(e) {
    var t;
    this.enterLine();
    let i = (t = e.deco) === null || t === void 0 ? void 0 : t.type;
    i == F.WidgetAfter && !this.isCovered && this.ensureLine(), this.nodes.push(e), this.writtenTo = this.pos = this.pos + e.length, i != F.WidgetBefore && (this.covering = e);
  }
  addLineDeco(e, t, i) {
    let s = this.ensureLine();
    s.length += i, s.collapsed += i, s.widgetHeight = Math.max(s.widgetHeight, e), s.breaks += t, this.writtenTo = this.pos = this.pos + i;
  }
  finish(e) {
    let t = this.nodes.length == 0 ? null : this.nodes[this.nodes.length - 1];
    this.lineStart > -1 && !(t instanceof Ce) && !this.isCovered ? this.nodes.push(new Ce(0, -1)) : (this.writtenTo < this.pos || t == null) && this.nodes.push(this.blankContent(this.writtenTo, this.pos));
    let i = e;
    for (let s of this.nodes)
      s instanceof Ce && s.updateHeight(this.oracle, i), i += s ? s.length : 1;
    return this.nodes;
  }
  // Always called with a region that on both sides either stretches
  // to a line break or the end of the document.
  // The returned array uses null to indicate line breaks, but never
  // starts or ends in a line break, or has multiple line breaks next
  // to each other.
  static build(e, t, i, s) {
    let r = new Wo(i, e);
    return D.spans(t, i, s, r, 0), r.finish(i);
  }
}
function ip(n, e, t) {
  let i = new np();
  return D.compare(n, e, t, i, 0), i.changes;
}
class np {
  constructor() {
    this.changes = [];
  }
  compareRange() {
  }
  comparePoint(e, t, i, s) {
    (e < t || i && i.heightRelevant || s && s.heightRelevant) && Fr(e, t, this.changes, 5);
  }
}
function sp(n, e) {
  let t = n.getBoundingClientRect(), i = n.ownerDocument, s = i.defaultView || window, r = Math.max(0, t.left), o = Math.min(s.innerWidth, t.right), l = Math.max(0, t.top), a = Math.min(s.innerHeight, t.bottom);
  for (let h = n.parentNode; h && h != i.body; )
    if (h.nodeType == 1) {
      let c = h, f = window.getComputedStyle(c);
      if ((c.scrollHeight > c.clientHeight || c.scrollWidth > c.clientWidth) && f.overflow != "visible") {
        let u = c.getBoundingClientRect();
        r = Math.max(r, u.left), o = Math.min(o, u.right), l = Math.max(l, u.top), a = h == n.parentNode ? u.bottom : Math.min(a, u.bottom);
      }
      h = f.position == "absolute" || f.position == "fixed" ? c.offsetParent : c.parentNode;
    } else if (h.nodeType == 11)
      h = h.host;
    else
      break;
  return {
    left: r - t.left,
    right: Math.max(r, o) - t.left,
    top: l - (t.top + e),
    bottom: Math.max(l, a) - (t.top + e)
  };
}
function rp(n, e) {
  let t = n.getBoundingClientRect();
  return {
    left: 0,
    right: t.right - t.left,
    top: e,
    bottom: t.bottom - (t.top + e)
  };
}
class ir {
  constructor(e, t, i) {
    this.from = e, this.to = t, this.size = i;
  }
  static same(e, t) {
    if (e.length != t.length)
      return !1;
    for (let i = 0; i < e.length; i++) {
      let s = e[i], r = t[i];
      if (s.from != r.from || s.to != r.to || s.size != r.size)
        return !1;
    }
    return !0;
  }
  draw(e) {
    return T.replace({ widget: new op(this.size, e) }).range(this.from, this.to);
  }
}
class op extends St {
  constructor(e, t) {
    super(), this.size = e, this.vertical = t;
  }
  eq(e) {
    return e.size == this.size && e.vertical == this.vertical;
  }
  toDOM() {
    let e = document.createElement("div");
    return this.vertical ? e.style.height = this.size + "px" : (e.style.width = this.size + "px", e.style.height = "2px", e.style.display = "inline-block"), e;
  }
  get estimatedHeight() {
    return this.vertical ? this.size : -1;
  }
}
class ea {
  constructor(e) {
    this.state = e, this.pixelViewport = { left: 0, right: window.innerWidth, top: 0, bottom: 0 }, this.inView = !0, this.paddingTop = 0, this.paddingBottom = 0, this.contentDOMWidth = 0, this.contentDOMHeight = 0, this.editorHeight = 0, this.editorWidth = 0, this.scrollTop = 0, this.scrolledToBottom = !0, this.scrollAnchorPos = 0, this.scrollAnchorHeight = -1, this.scaler = ta, this.scrollTarget = null, this.printing = !1, this.mustMeasureContent = !0, this.defaultTextDirection = N.LTR, this.visibleRanges = [], this.mustEnforceCursorAssoc = !1;
    let t = e.facet(Yo).some((i) => typeof i != "function" && i.class == "cm-lineWrapping");
    this.heightOracle = new JO(t), this.stateDeco = e.facet(Li).filter((i) => typeof i != "function"), this.heightMap = ye.empty().applyChanges(this.stateDeco, W.empty, this.heightOracle.setDoc(e.doc), [new De(0, 0, 0, e.doc.length)]), this.viewport = this.getViewport(0, null), this.updateViewportLines(), this.updateForViewport(), this.lineGaps = this.ensureLineGaps([]), this.lineGapDeco = T.set(this.lineGaps.map((i) => i.draw(!1))), this.computeVisibleRanges();
  }
  updateForViewport() {
    let e = [this.viewport], { main: t } = this.state.selection;
    for (let i = 0; i <= 1; i++) {
      let s = i ? t.head : t.anchor;
      if (!e.some(({ from: r, to: o }) => s >= r && s <= o)) {
        let { from: r, to: o } = this.lineBlockAt(s);
        e.push(new yn(r, o));
      }
    }
    this.viewports = e.sort((i, s) => i.from - s.from), this.scaler = this.heightMap.height <= 7e6 ? ta : new hp(this.heightOracle, this.heightMap, this.viewports);
  }
  updateViewportLines() {
    this.viewportLines = [], this.heightMap.forEachLine(this.viewport.from, this.viewport.to, this.heightOracle.setDoc(this.state.doc), 0, 0, (e) => {
      this.viewportLines.push(this.scaler.scale == 1 ? e : Yi(e, this.scaler));
    });
  }
  update(e, t = null) {
    this.state = e.state;
    let i = this.stateDeco;
    this.stateDeco = this.state.facet(Li).filter((c) => typeof c != "function");
    let s = e.changedRanges, r = De.extendWithRanges(s, ip(i, this.stateDeco, e ? e.changes : ne.empty(this.state.doc.length))), o = this.heightMap.height, l = this.scrolledToBottom ? null : this.scrollAnchorAt(this.scrollTop);
    this.heightMap = this.heightMap.applyChanges(this.stateDeco, e.startState.doc, this.heightOracle.setDoc(this.state.doc), r), this.heightMap.height != o && (e.flags |= 2), l ? (this.scrollAnchorPos = e.changes.mapPos(l.from, -1), this.scrollAnchorHeight = l.top) : (this.scrollAnchorPos = -1, this.scrollAnchorHeight = this.heightMap.height);
    let a = r.length ? this.mapViewport(this.viewport, e.changes) : this.viewport;
    (t && (t.range.head < a.from || t.range.head > a.to) || !this.viewportIsAppropriate(a)) && (a = this.getViewport(0, t));
    let h = !e.changes.empty || e.flags & 2 || a.from != this.viewport.from || a.to != this.viewport.to;
    this.viewport = a, this.updateForViewport(), h && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps, e.changes))), e.flags |= this.computeVisibleRanges(), t && (this.scrollTarget = t), !this.mustEnforceCursorAssoc && e.selectionSet && e.view.lineWrapping && e.state.selection.main.empty && e.state.selection.main.assoc && !e.state.facet(vc) && (this.mustEnforceCursorAssoc = !0);
  }
  measure(e) {
    let t = e.contentDOM, i = window.getComputedStyle(t), s = this.heightOracle, r = i.whiteSpace;
    this.defaultTextDirection = i.direction == "rtl" ? N.RTL : N.LTR;
    let o = this.heightOracle.mustRefreshForWrapping(r), l = t.getBoundingClientRect(), a = o || this.mustMeasureContent || this.contentDOMHeight != l.height;
    this.contentDOMHeight = l.height, this.mustMeasureContent = !1;
    let h = 0, c = 0, f = parseInt(i.paddingTop) || 0, u = parseInt(i.paddingBottom) || 0;
    (this.paddingTop != f || this.paddingBottom != u) && (this.paddingTop = f, this.paddingBottom = u, h |= 10), this.editorWidth != e.scrollDOM.clientWidth && (s.lineWrapping && (a = !0), this.editorWidth = e.scrollDOM.clientWidth, h |= 8), this.scrollTop != e.scrollDOM.scrollTop && (this.scrollAnchorHeight = -1, this.scrollTop = e.scrollDOM.scrollTop), this.scrolledToBottom = ac(e.scrollDOM);
    let d = (this.printing ? rp : sp)(t, this.paddingTop), O = d.top - this.pixelViewport.top, m = d.bottom - this.pixelViewport.bottom;
    this.pixelViewport = d;
    let g = this.pixelViewport.bottom > this.pixelViewport.top && this.pixelViewport.right > this.pixelViewport.left;
    if (g != this.inView && (this.inView = g, g && (a = !0)), !this.inView && !this.scrollTarget)
      return 0;
    let S = l.width;
    if ((this.contentDOMWidth != S || this.editorHeight != e.scrollDOM.clientHeight) && (this.contentDOMWidth = l.width, this.editorHeight = e.scrollDOM.clientHeight, h |= 8), a) {
      let v = e.docView.measureVisibleLineHeights(this.viewport);
      if (s.mustRefreshForHeights(v) && (o = !0), o || s.lineWrapping && Math.abs(S - this.contentDOMWidth) > s.charWidth) {
        let { lineHeight: Q, charWidth: x, textHeight: w } = e.docView.measureTextSize();
        o = Q > 0 && s.refresh(r, Q, x, w, S / x, v), o && (e.docView.minWidth = 0, h |= 8);
      }
      O > 0 && m > 0 ? c = Math.max(O, m) : O < 0 && m < 0 && (c = Math.min(O, m)), s.heightChanged = !1;
      for (let Q of this.viewports) {
        let x = Q.from == this.viewport.from ? v : e.docView.measureVisibleLineHeights(Q);
        this.heightMap = (o ? ye.empty().applyChanges(this.stateDeco, W.empty, this.heightOracle, [new De(0, 0, 0, e.state.doc.length)]) : this.heightMap).updateHeight(s, 0, o, new KO(Q.from, x));
      }
      s.heightChanged && (h |= 2);
    }
    let b = !this.viewportIsAppropriate(this.viewport, c) || this.scrollTarget && (this.scrollTarget.range.head < this.viewport.from || this.scrollTarget.range.head > this.viewport.to);
    return b && (this.viewport = this.getViewport(c, this.scrollTarget)), this.updateForViewport(), (h & 2 || b) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(o ? [] : this.lineGaps, e)), h |= this.computeVisibleRanges(), this.mustEnforceCursorAssoc && (this.mustEnforceCursorAssoc = !1, e.docView.enforceCursorAssoc()), h;
  }
  get visibleTop() {
    return this.scaler.fromDOM(this.pixelViewport.top);
  }
  get visibleBottom() {
    return this.scaler.fromDOM(this.pixelViewport.bottom);
  }
  getViewport(e, t) {
    let i = 0.5 - Math.max(-0.5, Math.min(0.5, e / 1e3 / 2)), s = this.heightMap, r = this.heightOracle, { visibleTop: o, visibleBottom: l } = this, a = new yn(s.lineAt(o - i * 1e3, z.ByHeight, r, 0, 0).from, s.lineAt(l + (1 - i) * 1e3, z.ByHeight, r, 0, 0).to);
    if (t) {
      let { head: h } = t.range;
      if (h < a.from || h > a.to) {
        let c = Math.min(this.editorHeight, this.pixelViewport.bottom - this.pixelViewport.top), f = s.lineAt(h, z.ByPos, r, 0, 0), u;
        t.y == "center" ? u = (f.top + f.bottom) / 2 - c / 2 : t.y == "start" || t.y == "nearest" && h < a.from ? u = f.top : u = f.bottom - c, a = new yn(s.lineAt(u - 1e3 / 2, z.ByHeight, r, 0, 0).from, s.lineAt(u + c + 1e3 / 2, z.ByHeight, r, 0, 0).to);
      }
    }
    return a;
  }
  mapViewport(e, t) {
    let i = t.mapPos(e.from, -1), s = t.mapPos(e.to, 1);
    return new yn(this.heightMap.lineAt(i, z.ByPos, this.heightOracle, 0, 0).from, this.heightMap.lineAt(s, z.ByPos, this.heightOracle, 0, 0).to);
  }
  // Checks if a given viewport covers the visible part of the
  // document and not too much beyond that.
  viewportIsAppropriate({ from: e, to: t }, i = 0) {
    if (!this.inView)
      return !0;
    let { top: s } = this.heightMap.lineAt(e, z.ByPos, this.heightOracle, 0, 0), { bottom: r } = this.heightMap.lineAt(t, z.ByPos, this.heightOracle, 0, 0), { visibleTop: o, visibleBottom: l } = this;
    return (e == 0 || s <= o - Math.max(10, Math.min(
      -i,
      250
      /* MaxCoverMargin */
    ))) && (t == this.state.doc.length || r >= l + Math.max(10, Math.min(
      i,
      250
      /* MaxCoverMargin */
    ))) && s > o - 2 * 1e3 && r < l + 2 * 1e3;
  }
  mapLineGaps(e, t) {
    if (!e.length || t.empty)
      return e;
    let i = [];
    for (let s of e)
      t.touchesRange(s.from, s.to) || i.push(new ir(t.mapPos(s.from), t.mapPos(s.to), s.size));
    return i;
  }
  // Computes positions in the viewport where the start or end of a
  // line should be hidden, trying to reuse existing line gaps when
  // appropriate to avoid unneccesary redraws.
  // Uses crude character-counting for the positioning and sizing,
  // since actual DOM coordinates aren't always available and
  // predictable. Relies on generous margins (see LG.Margin) to hide
  // the artifacts this might produce from the user.
  ensureLineGaps(e, t) {
    let i = this.heightOracle.lineWrapping, s = i ? 1e4 : 2e3, r = s >> 1, o = s << 1;
    if (this.defaultTextDirection != N.LTR && !i)
      return [];
    let l = [], a = (h, c, f, u) => {
      if (c - h < r)
        return;
      let d = this.state.selection.main, O = [d.from];
      d.empty || O.push(d.to);
      for (let g of O)
        if (g > h && g < c) {
          a(h, g - 10, f, u), a(g + 10, c, f, u);
          return;
        }
      let m = ap(e, (g) => g.from >= f.from && g.to <= f.to && Math.abs(g.from - h) < r && Math.abs(g.to - c) < r && !O.some((S) => g.from < S && g.to > S));
      if (!m) {
        if (c < f.to && t && i && t.visibleRanges.some((g) => g.from <= c && g.to >= c)) {
          let g = t.moveToLineBoundary(y.cursor(c), !1, !0).head;
          g > h && (c = g);
        }
        m = new ir(h, c, this.gapSize(f, h, c, u));
      }
      l.push(m);
    };
    for (let h of this.viewportLines) {
      if (h.length < o)
        continue;
      let c = lp(h.from, h.to, this.stateDeco);
      if (c.total < o)
        continue;
      let f = this.scrollTarget ? this.scrollTarget.range.head : null, u, d;
      if (i) {
        let O = s / this.heightOracle.lineLength * this.heightOracle.lineHeight, m, g;
        if (f != null) {
          let S = Qn(c, f), b = ((this.visibleBottom - this.visibleTop) / 2 + O) / h.height;
          m = S - b, g = S + b;
        } else
          m = (this.visibleTop - h.top - O) / h.height, g = (this.visibleBottom - h.top + O) / h.height;
        u = bn(c, m), d = bn(c, g);
      } else {
        let O = c.total * this.heightOracle.charWidth, m = s * this.heightOracle.charWidth, g, S;
        if (f != null) {
          let b = Qn(c, f), v = ((this.pixelViewport.right - this.pixelViewport.left) / 2 + m) / O;
          g = b - v, S = b + v;
        } else
          g = (this.pixelViewport.left - m) / O, S = (this.pixelViewport.right + m) / O;
        u = bn(c, g), d = bn(c, S);
      }
      u > h.from && a(h.from, u, h, c), d < h.to && a(d, h.to, h, c);
    }
    return l;
  }
  gapSize(e, t, i, s) {
    let r = Qn(s, i) - Qn(s, t);
    return this.heightOracle.lineWrapping ? e.height * r : s.total * this.heightOracle.charWidth * r;
  }
  updateLineGaps(e) {
    ir.same(e, this.lineGaps) || (this.lineGaps = e, this.lineGapDeco = T.set(e.map((t) => t.draw(this.heightOracle.lineWrapping))));
  }
  computeVisibleRanges() {
    let e = this.stateDeco;
    this.lineGaps.length && (e = e.concat(this.lineGapDeco));
    let t = [];
    D.spans(e, this.viewport.from, this.viewport.to, {
      span(s, r) {
        t.push({ from: s, to: r });
      },
      point() {
      }
    }, 20);
    let i = t.length != this.visibleRanges.length || this.visibleRanges.some((s, r) => s.from != t[r].from || s.to != t[r].to);
    return this.visibleRanges = t, i ? 4 : 0;
  }
  lineBlockAt(e) {
    return e >= this.viewport.from && e <= this.viewport.to && this.viewportLines.find((t) => t.from <= e && t.to >= e) || Yi(this.heightMap.lineAt(e, z.ByPos, this.heightOracle, 0, 0), this.scaler);
  }
  lineBlockAtHeight(e) {
    return Yi(this.heightMap.lineAt(this.scaler.fromDOM(e), z.ByHeight, this.heightOracle, 0, 0), this.scaler);
  }
  scrollAnchorAt(e) {
    let t = this.lineBlockAtHeight(e + 8);
    return t.from >= this.viewport.from || this.viewportLines[0].top - e > 200 ? t : this.viewportLines[0];
  }
  elementAtHeight(e) {
    return Yi(this.heightMap.blockAt(this.scaler.fromDOM(e), this.heightOracle, 0, 0), this.scaler);
  }
  get docHeight() {
    return this.scaler.toDOM(this.heightMap.height);
  }
  get contentHeight() {
    return this.docHeight + this.paddingTop + this.paddingBottom;
  }
}
class yn {
  constructor(e, t) {
    this.from = e, this.to = t;
  }
}
function lp(n, e, t) {
  let i = [], s = n, r = 0;
  return D.spans(t, n, e, {
    span() {
    },
    point(o, l) {
      o > s && (i.push({ from: s, to: o }), r += o - s), s = l;
    }
  }, 20), s < e && (i.push({ from: s, to: e }), r += e - s), { total: r, ranges: i };
}
function bn({ total: n, ranges: e }, t) {
  if (t <= 0)
    return e[0].from;
  if (t >= 1)
    return e[e.length - 1].to;
  let i = Math.floor(n * t);
  for (let s = 0; ; s++) {
    let { from: r, to: o } = e[s], l = o - r;
    if (i <= l)
      return r + i;
    i -= l;
  }
}
function Qn(n, e) {
  let t = 0;
  for (let { from: i, to: s } of n.ranges) {
    if (e <= s) {
      t += e - i;
      break;
    }
    t += s - i;
  }
  return t / n.total;
}
function ap(n, e) {
  for (let t of n)
    if (e(t))
      return t;
}
const ta = {
  toDOM(n) {
    return n;
  },
  fromDOM(n) {
    return n;
  },
  scale: 1
};
class hp {
  constructor(e, t, i) {
    let s = 0, r = 0, o = 0;
    this.viewports = i.map(({ from: l, to: a }) => {
      let h = t.lineAt(l, z.ByPos, e, 0, 0).top, c = t.lineAt(a, z.ByPos, e, 0, 0).bottom;
      return s += c - h, { from: l, to: a, top: h, bottom: c, domTop: 0, domBottom: 0 };
    }), this.scale = (7e6 - s) / (t.height - s);
    for (let l of this.viewports)
      l.domTop = o + (l.top - r) * this.scale, o = l.domBottom = l.domTop + (l.bottom - l.top), r = l.bottom;
  }
  toDOM(e) {
    for (let t = 0, i = 0, s = 0; ; t++) {
      let r = t < this.viewports.length ? this.viewports[t] : null;
      if (!r || e < r.top)
        return s + (e - i) * this.scale;
      if (e <= r.bottom)
        return r.domTop + (e - r.top);
      i = r.bottom, s = r.domBottom;
    }
  }
  fromDOM(e) {
    for (let t = 0, i = 0, s = 0; ; t++) {
      let r = t < this.viewports.length ? this.viewports[t] : null;
      if (!r || e < r.domTop)
        return i + (e - s) / this.scale;
      if (e <= r.domBottom)
        return r.top + (e - r.domTop);
      i = r.bottom, s = r.domBottom;
    }
  }
}
function Yi(n, e) {
  if (e.scale == 1)
    return n;
  let t = e.toDOM(n.top), i = e.toDOM(n.bottom);
  return new tt(n.from, n.length, t, i - t, Array.isArray(n._content) ? n._content.map((s) => Yi(s, e)) : n._content);
}
const xn = /* @__PURE__ */ P.define({ combine: (n) => n.join(" ") }), so = /* @__PURE__ */ P.define({ combine: (n) => n.indexOf(!0) > -1 }), ro = /* @__PURE__ */ Ct.newName(), jc = /* @__PURE__ */ Ct.newName(), Lc = /* @__PURE__ */ Ct.newName(), Nc = { "&light": "." + jc, "&dark": "." + Lc };
function oo(n, e, t) {
  return new Ct(e, {
    finish(i) {
      return /&/.test(i) ? i.replace(/&\w*/, (s) => {
        if (s == "&")
          return n;
        if (!t || !t[s])
          throw new RangeError(`Unsupported selector: ${s}`);
        return t[s];
      }) : n + " " + i;
    }
  });
}
const cp = /* @__PURE__ */ oo("." + ro, {
  "&": {
    position: "relative !important",
    boxSizing: "border-box",
    "&.cm-focused": {
      // Provide a simple default outline to make sure a focused
      // editor is visually distinct. Can't leave the default behavior
      // because that will apply to the content element, which is
      // inside the scrollable container and doesn't include the
      // gutters. We also can't use an 'auto' outline, since those
      // are, for some reason, drawn behind the element content, which
      // will cause things like the active line background to cover
      // the outline (#297).
      outline: "1px dotted #212121"
    },
    display: "flex !important",
    flexDirection: "column"
  },
  ".cm-scroller": {
    display: "flex !important",
    alignItems: "flex-start !important",
    fontFamily: "monospace",
    lineHeight: 1.4,
    height: "100%",
    overflowX: "auto",
    position: "relative",
    zIndex: 0
  },
  ".cm-content": {
    margin: 0,
    flexGrow: 2,
    flexShrink: 0,
    display: "block",
    whiteSpace: "pre",
    wordWrap: "normal",
    boxSizing: "border-box",
    padding: "4px 0",
    outline: "none",
    "&[contenteditable=true]": {
      WebkitUserModify: "read-write-plaintext-only"
    }
  },
  ".cm-lineWrapping": {
    whiteSpace_fallback: "pre-wrap",
    whiteSpace: "break-spaces",
    wordBreak: "break-word",
    overflowWrap: "anywhere",
    flexShrink: 1
  },
  "&light .cm-content": { caretColor: "black" },
  "&dark .cm-content": { caretColor: "white" },
  ".cm-line": {
    display: "block",
    padding: "0 2px 0 6px"
  },
  ".cm-layer": {
    position: "absolute",
    left: 0,
    top: 0,
    contain: "size style",
    "& > *": {
      position: "absolute"
    }
  },
  "&light .cm-selectionBackground": {
    background: "#d9d9d9"
  },
  "&dark .cm-selectionBackground": {
    background: "#222"
  },
  "&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
    background: "#d7d4f0"
  },
  "&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
    background: "#233"
  },
  ".cm-cursorLayer": {
    pointerEvents: "none"
  },
  "&.cm-focused > .cm-scroller > .cm-cursorLayer": {
    animation: "steps(1) cm-blink 1.2s infinite"
  },
  // Two animations defined so that we can switch between them to
  // restart the animation without forcing another style
  // recomputation.
  "@keyframes cm-blink": { "0%": {}, "50%": { opacity: 0 }, "100%": {} },
  "@keyframes cm-blink2": { "0%": {}, "50%": { opacity: 0 }, "100%": {} },
  ".cm-cursor, .cm-dropCursor": {
    borderLeft: "1.2px solid black",
    marginLeft: "-0.6px",
    pointerEvents: "none"
  },
  ".cm-cursor": {
    display: "none"
  },
  "&dark .cm-cursor": {
    borderLeftColor: "#444"
  },
  ".cm-dropCursor": {
    position: "absolute"
  },
  "&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor": {
    display: "block"
  },
  "&light .cm-activeLine": { backgroundColor: "#cceeff44" },
  "&dark .cm-activeLine": { backgroundColor: "#99eeff33" },
  "&light .cm-specialChar": { color: "red" },
  "&dark .cm-specialChar": { color: "#f78" },
  ".cm-gutters": {
    flexShrink: 0,
    display: "flex",
    height: "100%",
    boxSizing: "border-box",
    insetInlineStart: 0,
    zIndex: 200
  },
  "&light .cm-gutters": {
    backgroundColor: "#f5f5f5",
    color: "#6c6c6c",
    borderRight: "1px solid #ddd"
  },
  "&dark .cm-gutters": {
    backgroundColor: "#333338",
    color: "#ccc"
  },
  ".cm-gutter": {
    display: "flex !important",
    flexDirection: "column",
    flexShrink: 0,
    boxSizing: "border-box",
    minHeight: "100%",
    overflow: "hidden"
  },
  ".cm-gutterElement": {
    boxSizing: "border-box"
  },
  ".cm-lineNumbers .cm-gutterElement": {
    padding: "0 3px 0 5px",
    minWidth: "20px",
    textAlign: "right",
    whiteSpace: "nowrap"
  },
  "&light .cm-activeLineGutter": {
    backgroundColor: "#e2f2ff"
  },
  "&dark .cm-activeLineGutter": {
    backgroundColor: "#222227"
  },
  ".cm-panels": {
    boxSizing: "border-box",
    position: "sticky",
    left: 0,
    right: 0
  },
  "&light .cm-panels": {
    backgroundColor: "#f5f5f5",
    color: "black"
  },
  "&light .cm-panels-top": {
    borderBottom: "1px solid #ddd"
  },
  "&light .cm-panels-bottom": {
    borderTop: "1px solid #ddd"
  },
  "&dark .cm-panels": {
    backgroundColor: "#333338",
    color: "white"
  },
  ".cm-tab": {
    display: "inline-block",
    overflow: "hidden",
    verticalAlign: "bottom"
  },
  ".cm-widgetBuffer": {
    verticalAlign: "text-top",
    height: "1em",
    width: 0,
    display: "inline"
  },
  ".cm-placeholder": {
    color: "#888",
    display: "inline-block",
    verticalAlign: "top"
  },
  ".cm-highlightSpace:before": {
    content: "attr(data-display)",
    position: "absolute",
    pointerEvents: "none",
    color: "#888"
  },
  ".cm-highlightTab": {
    backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`,
    backgroundSize: "auto 100%",
    backgroundPosition: "right 90%",
    backgroundRepeat: "no-repeat"
  },
  ".cm-trailingSpace": {
    backgroundColor: "#ff332255"
  },
  ".cm-button": {
    verticalAlign: "middle",
    color: "inherit",
    fontSize: "70%",
    padding: ".2em 1em",
    borderRadius: "1px"
  },
  "&light .cm-button": {
    backgroundImage: "linear-gradient(#eff1f5, #d9d9df)",
    border: "1px solid #888",
    "&:active": {
      backgroundImage: "linear-gradient(#b4b4b4, #d0d3d6)"
    }
  },
  "&dark .cm-button": {
    backgroundImage: "linear-gradient(#393939, #111)",
    border: "1px solid #888",
    "&:active": {
      backgroundImage: "linear-gradient(#111, #333)"
    }
  },
  ".cm-textfield": {
    verticalAlign: "middle",
    color: "inherit",
    fontSize: "70%",
    border: "1px solid silver",
    padding: ".2em .5em"
  },
  "&light .cm-textfield": {
    backgroundColor: "white"
  },
  "&dark .cm-textfield": {
    border: "1px solid #555",
    backgroundColor: "inherit"
  }
}, Nc);
class fp {
  constructor(e, t, i, s) {
    this.typeOver = s, this.bounds = null, this.text = "";
    let { impreciseHead: r, impreciseAnchor: o } = e.docView;
    if (e.state.readOnly && t > -1)
      this.newSel = null;
    else if (t > -1 && (this.bounds = e.docView.domBoundsAround(t, i, 0))) {
      let l = r || o ? [] : dp(e), a = new uc(l, e.state);
      a.readRange(this.bounds.startDOM, this.bounds.endDOM), this.text = a.text, this.newSel = Op(l, this.bounds.from);
    } else {
      let l = e.observer.selectionRange, a = r && r.node == l.focusNode && r.offset == l.focusOffset || !zr(e.contentDOM, l.focusNode) ? e.state.selection.main.head : e.docView.posFromDOM(l.focusNode, l.focusOffset), h = o && o.node == l.anchorNode && o.offset == l.anchorOffset || !zr(e.contentDOM, l.anchorNode) ? e.state.selection.main.anchor : e.docView.posFromDOM(l.anchorNode, l.anchorOffset);
      this.newSel = y.single(h, a);
    }
  }
}
function Gc(n, e) {
  let t, { newSel: i } = e, s = n.state.selection.main, r = n.inputState.lastKeyTime > Date.now() - 100 ? n.inputState.lastKeyCode : -1;
  if (e.bounds) {
    let { from: o, to: l } = e.bounds, a = s.from, h = null;
    (r === 8 || C.android && e.text.length < l - o) && (a = s.to, h = "end");
    let c = up(n.state.doc.sliceString(o, l, Jt), e.text, a - o, h);
    c && (C.chrome && r == 13 && c.toB == c.from + 2 && e.text.slice(c.from, c.toB) == Jt + Jt && c.toB--, t = {
      from: o + c.from,
      to: o + c.toA,
      insert: W.of(e.text.slice(c.from, c.toB).split(Jt))
    });
  } else
    i && (!n.hasFocus && n.state.facet(Vs) || i.main.eq(s)) && (i = null);
  if (!t && !i)
    return !1;
  if (!t && e.typeOver && !s.empty && i && i.main.empty ? t = { from: s.from, to: s.to, insert: n.state.doc.slice(s.from, s.to) } : t && t.from >= s.from && t.to <= s.to && (t.from != s.from || t.to != s.to) && s.to - s.from - (t.to - t.from) <= 4 ? t = {
    from: s.from,
    to: s.to,
    insert: n.state.doc.slice(s.from, t.from).append(t.insert).append(n.state.doc.slice(t.to, s.to))
  } : (C.mac || C.android) && t && t.from == t.to && t.from == s.head - 1 && /^\. ?$/.test(t.insert.toString()) && n.contentDOM.getAttribute("autocorrect") == "off" ? (i && t.insert.length == 2 && (i = y.single(i.main.anchor - 1, i.main.head - 1)), t = { from: s.from, to: s.to, insert: W.of([" "]) }) : C.chrome && t && t.from == t.to && t.from == s.head && t.insert.toString() == `
 ` && n.lineWrapping && (i && (i = y.single(i.main.anchor - 1, i.main.head - 1)), t = { from: s.from, to: s.to, insert: W.of([" "]) }), t) {
    let o = n.state;
    if (C.ios && n.inputState.flushIOSKey(n) || C.android && (t.from == s.from && t.to == s.to && t.insert.length == 1 && t.insert.lines == 2 && ri(n.contentDOM, "Enter", 13) || (t.from == s.from - 1 && t.to == s.to && t.insert.length == 0 || r == 8 && t.insert.length < t.to - t.from) && ri(n.contentDOM, "Backspace", 8) || t.from == s.from && t.to == s.to + 1 && t.insert.length == 0 && ri(n.contentDOM, "Delete", 46)))
      return !0;
    let l = t.insert.toString();
    if (n.state.facet(wc).some((c) => c(n, t.from, t.to, l)))
      return !0;
    n.inputState.composing >= 0 && n.inputState.composing++;
    let a;
    if (t.from >= s.from && t.to <= s.to && t.to - t.from >= (s.to - s.from) / 3 && (!i || i.main.empty && i.main.from == t.from + t.insert.length) && n.inputState.composing < 0) {
      let c = s.from < t.from ? o.sliceDoc(s.from, t.from) : "", f = s.to > t.to ? o.sliceDoc(t.to, s.to) : "";
      a = o.replaceSelection(n.state.toText(c + t.insert.sliceString(0, void 0, n.state.lineBreak) + f));
    } else {
      let c = o.changes(t), f = i && i.main.to <= c.newLength ? i.main : void 0;
      if (o.selection.ranges.length > 1 && n.inputState.composing >= 0 && t.to <= s.to && t.to >= s.to - 10) {
        let u = n.state.sliceDoc(t.from, t.to), d = Ac(n) || n.state.doc.lineAt(s.head), O = s.to - t.to, m = s.to - s.from;
        a = o.changeByRange((g) => {
          if (g.from == s.from && g.to == s.to)
            return { changes: c, range: f || g.map(c) };
          let S = g.to - O, b = S - u.length;
          if (g.to - g.from != m || n.state.sliceDoc(b, S) != u || // Unfortunately, there's no way to make multiple
          // changes in the same node work without aborting
          // composition, so cursors in the composition range are
          // ignored.
          d && g.to >= d.from && g.from <= d.to)
            return { range: g };
          let v = o.changes({ from: b, to: S, insert: t.insert }), Q = g.to - s.to;
          return {
            changes: v,
            range: f ? y.range(Math.max(0, f.anchor + Q), Math.max(0, f.head + Q)) : g.map(v)
          };
        });
      } else
        a = {
          changes: c,
          selection: f && o.selection.replaceRange(f)
        };
    }
    let h = "input.type";
    return (n.composing || n.inputState.compositionPendingChange && n.inputState.compositionEndedAt > Date.now() - 50) && (n.inputState.compositionPendingChange = !1, h += ".compose", n.inputState.compositionFirstChange && (h += ".start", n.inputState.compositionFirstChange = !1)), n.dispatch(a, { scrollIntoView: !0, userEvent: h }), !0;
  } else if (i && !i.main.eq(s)) {
    let o = !1, l = "select";
    return n.inputState.lastSelectionTime > Date.now() - 50 && (n.inputState.lastSelectionOrigin == "select" && (o = !0), l = n.inputState.lastSelectionOrigin), n.dispatch({ selection: i, scrollIntoView: o, userEvent: l }), !0;
  } else
    return !1;
}
function up(n, e, t, i) {
  let s = Math.min(n.length, e.length), r = 0;
  for (; r < s && n.charCodeAt(r) == e.charCodeAt(r); )
    r++;
  if (r == s && n.length == e.length)
    return null;
  let o = n.length, l = e.length;
  for (; o > 0 && l > 0 && n.charCodeAt(o - 1) == e.charCodeAt(l - 1); )
    o--, l--;
  if (i == "end") {
    let a = Math.max(0, r - Math.min(o, l));
    t -= o + a - r;
  }
  if (o < r && n.length < e.length) {
    let a = t <= r && t >= o ? r - t : 0;
    r -= a, l = r + (l - o), o = r;
  } else if (l < r) {
    let a = t <= r && t >= l ? r - t : 0;
    r -= a, o = r + (o - l), l = r;
  }
  return { from: r, toA: o, toB: l };
}
function dp(n) {
  let e = [];
  if (n.root.activeElement != n.contentDOM)
    return e;
  let { anchorNode: t, anchorOffset: i, focusNode: s, focusOffset: r } = n.observer.selectionRange;
  return t && (e.push(new Tl(t, i)), (s != t || r != i) && e.push(new Tl(s, r))), e;
}
function Op(n, e) {
  if (n.length == 0)
    return null;
  let t = n[0].pos, i = n.length == 2 ? n[1].pos : t;
  return t > -1 && i > -1 ? y.single(t + e, i + e) : null;
}
const pp = {
  childList: !0,
  characterData: !0,
  subtree: !0,
  attributes: !0,
  characterDataOldValue: !0
}, nr = C.ie && C.ie_version <= 11;
class gp {
  constructor(e) {
    this.view = e, this.active = !1, this.selectionRange = new aO(), this.selectionChanged = !1, this.delayedFlush = -1, this.resizeTimeout = -1, this.queue = [], this.delayedAndroidKey = null, this.flushingAndroidKey = -1, this.lastChange = 0, this.scrollTargets = [], this.intersection = null, this.resizeScroll = null, this.resizeContent = null, this.intersecting = !1, this.gapIntersection = null, this.gaps = [], this.parentCheck = -1, this.dom = e.contentDOM, this.observer = new MutationObserver((t) => {
      for (let i of t)
        this.queue.push(i);
      (C.ie && C.ie_version <= 11 || C.ios && e.composing) && t.some((i) => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), nr && (this.onCharData = (t) => {
      this.queue.push({
        target: t.target,
        type: "characterData",
        oldValue: t.prevValue
      }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this), this.onResize = this.onResize.bind(this), this.onPrint = this.onPrint.bind(this), this.onScroll = this.onScroll.bind(this), typeof ResizeObserver == "function" && (this.resizeScroll = new ResizeObserver(() => {
      var t;
      ((t = this.view.docView) === null || t === void 0 ? void 0 : t.lastUpdate) < Date.now() - 75 && this.onResize();
    }), this.resizeScroll.observe(e.scrollDOM), this.resizeContent = new ResizeObserver(() => this.view.requestMeasure()), this.resizeContent.observe(e.contentDOM)), this.addWindowListeners(this.win = e.win), this.start(), typeof IntersectionObserver == "function" && (this.intersection = new IntersectionObserver((t) => {
      this.parentCheck < 0 && (this.parentCheck = setTimeout(this.listenForScroll.bind(this), 1e3)), t.length > 0 && t[t.length - 1].intersectionRatio > 0 != this.intersecting && (this.intersecting = !this.intersecting, this.intersecting != this.view.inView && this.onScrollChanged(document.createEvent("Event")));
    }, { threshold: [0, 1e-3] }), this.intersection.observe(this.dom), this.gapIntersection = new IntersectionObserver((t) => {
      t.length > 0 && t[t.length - 1].intersectionRatio > 0 && this.onScrollChanged(document.createEvent("Event"));
    }, {})), this.listenForScroll(), this.readSelectionRange();
  }
  onScrollChanged(e) {
    this.view.inputState.runScrollHandlers(this.view, e), this.intersecting && this.view.measure();
  }
  onScroll(e) {
    this.intersecting && this.flush(!1), this.onScrollChanged(e);
  }
  onResize() {
    this.resizeTimeout < 0 && (this.resizeTimeout = setTimeout(() => {
      this.resizeTimeout = -1, this.view.requestMeasure();
    }, 50));
  }
  onPrint() {
    this.view.viewState.printing = !0, this.view.measure(), setTimeout(() => {
      this.view.viewState.printing = !1, this.view.requestMeasure();
    }, 500);
  }
  updateGaps(e) {
    if (this.gapIntersection && (e.length != this.gaps.length || this.gaps.some((t, i) => t != e[i]))) {
      this.gapIntersection.disconnect();
      for (let t of e)
        this.gapIntersection.observe(t);
      this.gaps = e;
    }
  }
  onSelectionChange(e) {
    let t = this.selectionChanged;
    if (!this.readSelectionRange() || this.delayedAndroidKey)
      return;
    let { view: i } = this, s = this.selectionRange;
    if (i.state.facet(Vs) ? i.root.activeElement != this.dom : !Dn(i.dom, s))
      return;
    let r = s.anchorNode && i.docView.nearest(s.anchorNode);
    if (r && r.ignoreEvent(e)) {
      t || (this.selectionChanged = !1);
      return;
    }
    (C.ie && C.ie_version <= 11 || C.android && C.chrome) && !i.state.selection.main.empty && // (Selection.isCollapsed isn't reliable on IE)
    s.focusNode && es(s.focusNode, s.focusOffset, s.anchorNode, s.anchorOffset) ? this.flushSoon() : this.flush(!1);
  }
  readSelectionRange() {
    let { view: e } = this, t = C.safari && e.root.nodeType == 11 && sO(this.dom.ownerDocument) == this.dom && mp(this.view) || Kn(e.root);
    if (!t || this.selectionRange.eq(t))
      return !1;
    let i = Dn(this.dom, t);
    return i && !this.selectionChanged && e.inputState.lastFocusTime > Date.now() - 200 && e.inputState.lastTouchTime < Date.now() - 300 && cO(this.dom, t) ? (this.view.inputState.lastFocusTime = 0, e.docView.updateSelection(), !1) : (this.selectionRange.setRange(t), i && (this.selectionChanged = !0), !0);
  }
  setSelectionRange(e, t) {
    this.selectionRange.set(e.node, e.offset, t.node, t.offset), this.selectionChanged = !1;
  }
  clearSelectionRange() {
    this.selectionRange.set(null, 0, null, 0);
  }
  listenForScroll() {
    this.parentCheck = -1;
    let e = 0, t = null;
    for (let i = this.dom; i; )
      if (i.nodeType == 1)
        !t && e < this.scrollTargets.length && this.scrollTargets[e] == i ? e++ : t || (t = this.scrollTargets.slice(0, e)), t && t.push(i), i = i.assignedSlot || i.parentNode;
      else if (i.nodeType == 11)
        i = i.host;
      else
        break;
    if (e < this.scrollTargets.length && !t && (t = this.scrollTargets.slice(0, e)), t) {
      for (let i of this.scrollTargets)
        i.removeEventListener("scroll", this.onScroll);
      for (let i of this.scrollTargets = t)
        i.addEventListener("scroll", this.onScroll);
    }
  }
  ignore(e) {
    if (!this.active)
      return e();
    try {
      return this.stop(), e();
    } finally {
      this.start(), this.clear();
    }
  }
  start() {
    this.active || (this.observer.observe(this.dom, pp), nr && this.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.active = !0);
  }
  stop() {
    this.active && (this.active = !1, this.observer.disconnect(), nr && this.dom.removeEventListener("DOMCharacterDataModified", this.onCharData));
  }
  // Throw away any pending changes
  clear() {
    this.processRecords(), this.queue.length = 0, this.selectionChanged = !1;
  }
  // Chrome Android, especially in combination with GBoard, not only
  // doesn't reliably fire regular key events, but also often
  // surrounds the effect of enter or backspace with a bunch of
  // composition events that, when interrupted, cause text duplication
  // or other kinds of corruption. This hack makes the editor back off
  // from handling DOM changes for a moment when such a key is
  // detected (via beforeinput or keydown), and then tries to flush
  // them or, if that has no effect, dispatches the given key.
  delayAndroidKey(e, t) {
    var i;
    if (!this.delayedAndroidKey) {
      let s = () => {
        let r = this.delayedAndroidKey;
        r && (this.clearDelayedAndroidKey(), this.view.inputState.lastKeyCode = r.keyCode, this.view.inputState.lastKeyTime = Date.now(), !this.flush() && r.force && ri(this.dom, r.key, r.keyCode));
      };
      this.flushingAndroidKey = this.view.win.requestAnimationFrame(s);
    }
    (!this.delayedAndroidKey || e == "Enter") && (this.delayedAndroidKey = {
      key: e,
      keyCode: t,
      // Only run the key handler when no changes are detected if
      // this isn't coming right after another change, in which case
      // it is probably part of a weird chain of updates, and should
      // be ignored if it returns the DOM to its previous state.
      force: this.lastChange < Date.now() - 50 || !!(!((i = this.delayedAndroidKey) === null || i === void 0) && i.force)
    });
  }
  clearDelayedAndroidKey() {
    this.win.cancelAnimationFrame(this.flushingAndroidKey), this.delayedAndroidKey = null, this.flushingAndroidKey = -1;
  }
  flushSoon() {
    this.delayedFlush < 0 && (this.delayedFlush = this.view.win.requestAnimationFrame(() => {
      this.delayedFlush = -1, this.flush();
    }));
  }
  forceFlush() {
    this.delayedFlush >= 0 && (this.view.win.cancelAnimationFrame(this.delayedFlush), this.delayedFlush = -1), this.flush();
  }
  pendingRecords() {
    for (let e of this.observer.takeRecords())
      this.queue.push(e);
    return this.queue;
  }
  processRecords() {
    let e = this.pendingRecords();
    e.length && (this.queue = []);
    let t = -1, i = -1, s = !1;
    for (let r of e) {
      let o = this.readMutation(r);
      o && (o.typeOver && (s = !0), t == -1 ? { from: t, to: i } = o : (t = Math.min(o.from, t), i = Math.max(o.to, i)));
    }
    return { from: t, to: i, typeOver: s };
  }
  readChange() {
    let { from: e, to: t, typeOver: i } = this.processRecords(), s = this.selectionChanged && Dn(this.dom, this.selectionRange);
    return e < 0 && !s ? null : (e > -1 && (this.lastChange = Date.now()), this.view.inputState.lastFocusTime = 0, this.selectionChanged = !1, new fp(this.view, e, t, i));
  }
  // Apply pending changes, if any
  flush(e = !0) {
    if (this.delayedFlush >= 0 || this.delayedAndroidKey)
      return !1;
    e && this.readSelectionRange();
    let t = this.readChange();
    if (!t)
      return !1;
    let i = this.view.state, s = Gc(this.view, t);
    return this.view.state == i && this.view.update([]), s;
  }
  readMutation(e) {
    let t = this.view.docView.nearest(e.target);
    if (!t || t.ignoreMutation(e))
      return null;
    if (t.markDirty(e.type == "attributes"), e.type == "attributes" && (t.flags |= 4), e.type == "childList") {
      let i = ia(t, e.previousSibling || e.target.previousSibling, -1), s = ia(t, e.nextSibling || e.target.nextSibling, 1);
      return {
        from: i ? t.posAfter(i) : t.posAtStart,
        to: s ? t.posBefore(s) : t.posAtEnd,
        typeOver: !1
      };
    } else
      return e.type == "characterData" ? { from: t.posAtStart, to: t.posAtEnd, typeOver: e.target.nodeValue == e.oldValue } : null;
  }
  setWindow(e) {
    e != this.win && (this.removeWindowListeners(this.win), this.win = e, this.addWindowListeners(this.win));
  }
  addWindowListeners(e) {
    e.addEventListener("resize", this.onResize), e.addEventListener("beforeprint", this.onPrint), e.addEventListener("scroll", this.onScroll), e.document.addEventListener("selectionchange", this.onSelectionChange);
  }
  removeWindowListeners(e) {
    e.removeEventListener("scroll", this.onScroll), e.removeEventListener("resize", this.onResize), e.removeEventListener("beforeprint", this.onPrint), e.document.removeEventListener("selectionchange", this.onSelectionChange);
  }
  destroy() {
    var e, t, i, s;
    this.stop(), (e = this.intersection) === null || e === void 0 || e.disconnect(), (t = this.gapIntersection) === null || t === void 0 || t.disconnect(), (i = this.resizeScroll) === null || i === void 0 || i.disconnect(), (s = this.resizeContent) === null || s === void 0 || s.disconnect();
    for (let r of this.scrollTargets)
      r.removeEventListener("scroll", this.onScroll);
    this.removeWindowListeners(this.win), clearTimeout(this.parentCheck), clearTimeout(this.resizeTimeout), this.win.cancelAnimationFrame(this.delayedFlush), this.win.cancelAnimationFrame(this.flushingAndroidKey);
  }
}
function ia(n, e, t) {
  for (; e; ) {
    let i = _.get(e);
    if (i && i.parent == n)
      return i;
    let s = e.parentNode;
    e = s != n.dom ? s : t > 0 ? e.nextSibling : e.previousSibling;
  }
  return null;
}
function mp(n) {
  let e = null;
  function t(a) {
    a.preventDefault(), a.stopImmediatePropagation(), e = a.getTargetRanges()[0];
  }
  if (n.contentDOM.addEventListener("beforeinput", t, !0), n.dom.ownerDocument.execCommand("indent"), n.contentDOM.removeEventListener("beforeinput", t, !0), !e)
    return null;
  let i = e.startContainer, s = e.startOffset, r = e.endContainer, o = e.endOffset, l = n.docView.domAtPos(n.state.selection.main.anchor);
  return es(l.node, l.offset, r, o) && ([i, s, r, o] = [r, o, i, s]), { anchorNode: i, anchorOffset: s, focusNode: r, focusOffset: o };
}
class k {
  /**
  Construct a new view. You'll want to either provide a `parent`
  option, or put `view.dom` into your document after creating a
  view, so that the user can see the editor.
  */
  constructor(e = {}) {
    this.plugins = [], this.pluginMap = /* @__PURE__ */ new Map(), this.editorAttrs = {}, this.contentAttrs = {}, this.bidiCache = [], this.destroyed = !1, this.updateState = 2, this.measureScheduled = -1, this.measureRequests = [], this.contentDOM = document.createElement("div"), this.scrollDOM = document.createElement("div"), this.scrollDOM.tabIndex = -1, this.scrollDOM.className = "cm-scroller", this.scrollDOM.appendChild(this.contentDOM), this.announceDOM = document.createElement("div"), this.announceDOM.style.cssText = "position: fixed; top: -10000px", this.announceDOM.setAttribute("aria-live", "polite"), this.dom = document.createElement("div"), this.dom.appendChild(this.announceDOM), this.dom.appendChild(this.scrollDOM), this._dispatch = e.dispatch || ((t) => this.update([t])), this.dispatch = this.dispatch.bind(this), this._root = e.root || hO(e.parent) || document, this.viewState = new ea(e.state || M.create(e)), this.plugins = this.state.facet(Ai).map((t) => new Ks(t));
    for (let t of this.plugins)
      t.update(this);
    this.observer = new gp(this), this.inputState = new DO(this), this.inputState.ensureHandlers(this, this.plugins), this.docView = new Wl(this), this.mountStyles(), this.updateAttrs(), this.updateState = 0, this.requestMeasure(), e.parent && e.parent.appendChild(this.dom);
  }
  /**
  The current editor state.
  */
  get state() {
    return this.viewState.state;
  }
  /**
  To be able to display large documents without consuming too much
  memory or overloading the browser, CodeMirror only draws the
  code that is visible (plus a margin around it) to the DOM. This
  property tells you the extent of the current drawn viewport, in
  document positions.
  */
  get viewport() {
    return this.viewState.viewport;
  }
  /**
  When there are, for example, large collapsed ranges in the
  viewport, its size can be a lot bigger than the actual visible
  content. Thus, if you are doing something like styling the
  content in the viewport, it is preferable to only do so for
  these ranges, which are the subset of the viewport that is
  actually drawn.
  */
  get visibleRanges() {
    return this.viewState.visibleRanges;
  }
  /**
  Returns false when the editor is entirely scrolled out of view
  or otherwise hidden.
  */
  get inView() {
    return this.viewState.inView;
  }
  /**
  Indicates whether the user is currently composing text via
  [IME](https://en.wikipedia.org/wiki/Input_method), and at least
  one change has been made in the current composition.
  */
  get composing() {
    return this.inputState.composing > 0;
  }
  /**
  Indicates whether the user is currently in composing state. Note
  that on some platforms, like Android, this will be the case a
  lot, since just putting the cursor on a word starts a
  composition there.
  */
  get compositionStarted() {
    return this.inputState.composing >= 0;
  }
  /**
  The document or shadow root that the view lives in.
  */
  get root() {
    return this._root;
  }
  /**
  @internal
  */
  get win() {
    return this.dom.ownerDocument.defaultView || window;
  }
  dispatch(...e) {
    let t = e.length == 1 && e[0] instanceof se ? e[0] : this.state.update(...e);
    this._dispatch(t, this);
  }
  /**
  Update the view for the given array of transactions. This will
  update the visible document and selection to match the state
  produced by the transactions, and notify view plugins of the
  change. You should usually call
  [`dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch) instead, which uses this
  as a primitive.
  */
  update(e) {
    if (this.updateState != 0)
      throw new Error("Calls to EditorView.update are not allowed while an update is in progress");
    let t = !1, i = !1, s, r = this.state;
    for (let u of e) {
      if (u.startState != r)
        throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");
      r = u.state;
    }
    if (this.destroyed) {
      this.viewState.state = r;
      return;
    }
    let o = this.hasFocus, l = 0, a = null;
    e.some((u) => u.annotation(_c)) ? (this.inputState.notifiedFocused = o, l = 1) : o != this.inputState.notifiedFocused && (this.inputState.notifiedFocused = o, a = Bc(r, o), a || (l = 1));
    let h = this.observer.delayedAndroidKey, c = null;
    if (h ? (this.observer.clearDelayedAndroidKey(), c = this.observer.readChange(), (c && !this.state.doc.eq(r.doc) || !this.state.selection.eq(r.selection)) && (c = null)) : this.observer.clear(), r.facet(M.phrases) != this.state.facet(M.phrases))
      return this.setState(r);
    s = ns.create(this, r, e), s.flags |= l;
    let f = this.viewState.scrollTarget;
    try {
      this.updateState = 2;
      for (let u of e) {
        if (f && (f = f.map(u.changes)), u.scrollIntoView) {
          let { main: d } = u.state.selection;
          f = new is(d.empty ? d : y.cursor(d.head, d.head > d.anchor ? -1 : 1));
        }
        for (let d of u.effects)
          d.is(Ml) && (f = d.value);
      }
      this.viewState.update(s, f), this.bidiCache = ss.update(this.bidiCache, s.changes), s.empty || (this.updatePlugins(s), this.inputState.update(s)), t = this.docView.update(s), this.state.facet(Vi) != this.styleModules && this.mountStyles(), i = this.updateAttrs(), this.showAnnouncements(e), this.docView.updateSelection(t, e.some((u) => u.isUserEvent("select.pointer")));
    } finally {
      this.updateState = 0;
    }
    if (s.startState.facet(xn) != s.state.facet(xn) && (this.viewState.mustMeasureContent = !0), (t || i || f || this.viewState.mustEnforceCursorAssoc || this.viewState.mustMeasureContent) && this.requestMeasure(), !s.empty)
      for (let u of this.state.facet(Hr))
        u(s);
    (a || c) && Promise.resolve().then(() => {
      a && this.state == a.startState && this.dispatch(a), c && !Gc(this, c) && h.force && ri(this.contentDOM, h.key, h.keyCode);
    });
  }
  /**
  Reset the view to the given state. (This will cause the entire
  document to be redrawn and all view plugins to be reinitialized,
  so you should probably only use it when the new state isn't
  derived from the old state. Otherwise, use
  [`dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch) instead.)
  */
  setState(e) {
    if (this.updateState != 0)
      throw new Error("Calls to EditorView.setState are not allowed while an update is in progress");
    if (this.destroyed) {
      this.viewState.state = e;
      return;
    }
    this.updateState = 2;
    let t = this.hasFocus;
    try {
      for (let i of this.plugins)
        i.destroy(this);
      this.viewState = new ea(e), this.plugins = e.facet(Ai).map((i) => new Ks(i)), this.pluginMap.clear();
      for (let i of this.plugins)
        i.update(this);
      this.docView = new Wl(this), this.inputState.ensureHandlers(this, this.plugins), this.mountStyles(), this.updateAttrs(), this.bidiCache = [];
    } finally {
      this.updateState = 0;
    }
    t && this.focus(), this.requestMeasure();
  }
  updatePlugins(e) {
    let t = e.startState.facet(Ai), i = e.state.facet(Ai);
    if (t != i) {
      let s = [];
      for (let r of i) {
        let o = t.indexOf(r);
        if (o < 0)
          s.push(new Ks(r));
        else {
          let l = this.plugins[o];
          l.mustUpdate = e, s.push(l);
        }
      }
      for (let r of this.plugins)
        r.mustUpdate != e && r.destroy(this);
      this.plugins = s, this.pluginMap.clear(), this.inputState.ensureHandlers(this, this.plugins);
    } else
      for (let s of this.plugins)
        s.mustUpdate = e;
    for (let s = 0; s < this.plugins.length; s++)
      this.plugins[s].update(this);
  }
  /**
  @internal
  */
  measure(e = !0) {
    if (this.destroyed)
      return;
    this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.measureScheduled = 0, e && this.observer.forceFlush();
    let t = null, i = this.scrollDOM, { scrollTop: s } = i, { scrollAnchorPos: r, scrollAnchorHeight: o } = this.viewState;
    s != this.viewState.scrollTop && (o = -1), this.viewState.scrollAnchorHeight = -1;
    try {
      for (let l = 0; ; l++) {
        if (o < 0)
          if (ac(i))
            r = -1, o = this.viewState.heightMap.height;
          else {
            let d = this.viewState.scrollAnchorAt(s);
            r = d.from, o = d.top;
          }
        this.updateState = 1;
        let a = this.viewState.measure(this);
        if (!a && !this.measureRequests.length && this.viewState.scrollTarget == null)
          break;
        if (l > 5) {
          console.warn(this.measureRequests.length ? "Measure loop restarted more than 5 times" : "Viewport failed to stabilize");
          break;
        }
        let h = [];
        a & 4 || ([this.measureRequests, h] = [h, this.measureRequests]);
        let c = h.map((d) => {
          try {
            return d.read(this);
          } catch (O) {
            return Ae(this.state, O), na;
          }
        }), f = ns.create(this, this.state, []), u = !1;
        f.flags |= a, t ? t.flags |= a : t = f, this.updateState = 2, f.empty || (this.updatePlugins(f), this.inputState.update(f), this.updateAttrs(), u = this.docView.update(f));
        for (let d = 0; d < h.length; d++)
          if (c[d] != na)
            try {
              let O = h[d];
              O.write && O.write(c[d], this);
            } catch (O) {
              Ae(this.state, O);
            }
        if (u && this.docView.updateSelection(!0), !f.viewportChanged && this.measureRequests.length == 0) {
          if (this.viewState.editorHeight)
            if (this.viewState.scrollTarget) {
              this.docView.scrollIntoView(this.viewState.scrollTarget), this.viewState.scrollTarget = null;
              continue;
            } else {
              let O = (r < 0 ? this.viewState.heightMap.height : this.viewState.lineBlockAt(r).top) - o;
              if (O > 1 || O < -1) {
                s = i.scrollTop = s + O, o = -1;
                continue;
              }
            }
          break;
        }
      }
    } finally {
      this.updateState = 0, this.measureScheduled = -1;
    }
    if (t && !t.empty)
      for (let l of this.state.facet(Hr))
        l(t);
  }
  /**
  Get the CSS classes for the currently active editor themes.
  */
  get themeClasses() {
    return ro + " " + (this.state.facet(so) ? Lc : jc) + " " + this.state.facet(xn);
  }
  updateAttrs() {
    let e = sa(this, Pc, {
      class: "cm-editor" + (this.hasFocus ? " cm-focused " : " ") + this.themeClasses
    }), t = {
      spellcheck: "false",
      autocorrect: "off",
      autocapitalize: "off",
      translate: "no",
      contenteditable: this.state.facet(Vs) ? "true" : "false",
      class: "cm-content",
      style: `${C.tabSize}: ${this.state.tabSize}`,
      role: "textbox",
      "aria-multiline": "true"
    };
    this.state.readOnly && (t["aria-readonly"] = "true"), sa(this, Yo, t);
    let i = this.observer.ignore(() => {
      let s = Gr(this.contentDOM, this.contentAttrs, t), r = Gr(this.dom, this.editorAttrs, e);
      return s || r;
    });
    return this.editorAttrs = e, this.contentAttrs = t, i;
  }
  showAnnouncements(e) {
    let t = !0;
    for (let i of e)
      for (let s of i.effects)
        if (s.is(k.announce)) {
          t && (this.announceDOM.textContent = ""), t = !1;
          let r = this.announceDOM.appendChild(document.createElement("div"));
          r.textContent = s.value;
        }
  }
  mountStyles() {
    this.styleModules = this.state.facet(Vi), Ct.mount(this.root, this.styleModules.concat(cp).reverse());
  }
  readMeasured() {
    if (this.updateState == 2)
      throw new Error("Reading the editor layout isn't allowed during an update");
    this.updateState == 0 && this.measureScheduled > -1 && this.measure(!1);
  }
  /**
  Schedule a layout measurement, optionally providing callbacks to
  do custom DOM measuring followed by a DOM write phase. Using
  this is preferable reading DOM layout directly from, for
  example, an event handler, because it'll make sure measuring and
  drawing done by other components is synchronized, avoiding
  unnecessary DOM layout computations.
  */
  requestMeasure(e) {
    if (this.measureScheduled < 0 && (this.measureScheduled = this.win.requestAnimationFrame(() => this.measure())), e) {
      if (this.measureRequests.indexOf(e) > -1)
        return;
      if (e.key != null) {
        for (let t = 0; t < this.measureRequests.length; t++)
          if (this.measureRequests[t].key === e.key) {
            this.measureRequests[t] = e;
            return;
          }
      }
      this.measureRequests.push(e);
    }
  }
  /**
  Get the value of a specific plugin, if present. Note that
  plugins that crash can be dropped from a view, so even when you
  know you registered a given plugin, it is recommended to check
  the return value of this method.
  */
  plugin(e) {
    let t = this.pluginMap.get(e);
    return (t === void 0 || t && t.spec != e) && this.pluginMap.set(e, t = this.plugins.find((i) => i.spec == e) || null), t && t.update(this).value;
  }
  /**
  The top position of the document, in screen coordinates. This
  may be negative when the editor is scrolled down. Points
  directly to the top of the first line, not above the padding.
  */
  get documentTop() {
    return this.contentDOM.getBoundingClientRect().top + this.viewState.paddingTop;
  }
  /**
  Reports the padding above and below the document.
  */
  get documentPadding() {
    return { top: this.viewState.paddingTop, bottom: this.viewState.paddingBottom };
  }
  /**
  Find the text line or block widget at the given vertical
  position (which is interpreted as relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop)).
  */
  elementAtHeight(e) {
    return this.readMeasured(), this.viewState.elementAtHeight(e);
  }
  /**
  Find the line block (see
  [`lineBlockAt`](https://codemirror.net/6/docs/ref/#view.EditorView.lineBlockAt) at the given
  height, again interpreted relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop).
  */
  lineBlockAtHeight(e) {
    return this.readMeasured(), this.viewState.lineBlockAtHeight(e);
  }
  /**
  Get the extent and vertical position of all [line
  blocks](https://codemirror.net/6/docs/ref/#view.EditorView.lineBlockAt) in the viewport. Positions
  are relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop);
  */
  get viewportLineBlocks() {
    return this.viewState.viewportLines;
  }
  /**
  Find the line block around the given document position. A line
  block is a range delimited on both sides by either a
  non-[hidden](https://codemirror.net/6/docs/ref/#view.Decoration^replace) line breaks, or the
  start/end of the document. It will usually just hold a line of
  text, but may be broken into multiple textblocks by block
  widgets.
  */
  lineBlockAt(e) {
    return this.viewState.lineBlockAt(e);
  }
  /**
  The editor's total content height.
  */
  get contentHeight() {
    return this.viewState.contentHeight;
  }
  /**
  Move a cursor position by [grapheme
  cluster](https://codemirror.net/6/docs/ref/#state.findClusterBreak). `forward` determines whether
  the motion is away from the line start, or towards it. In
  bidirectional text, the line is traversed in visual order, using
  the editor's [text direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection).
  When the start position was the last one on the line, the
  returned position will be across the line break. If there is no
  further line, the original position is returned.
  
  By default, this method moves over a single cluster. The
  optional `by` argument can be used to move across more. It will
  be called with the first cluster as argument, and should return
  a predicate that determines, for each subsequent cluster,
  whether it should also be moved over.
  */
  moveByChar(e, t, i) {
    return tr(this, e, Bl(this, e, t, i));
  }
  /**
  Move a cursor position across the next group of either
  [letters](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) or non-letter
  non-whitespace characters.
  */
  moveByGroup(e, t) {
    return tr(this, e, Bl(this, e, t, (i) => MO(this, e.head, i)));
  }
  /**
  Move to the next line boundary in the given direction. If
  `includeWrap` is true, line wrapping is on, and there is a
  further wrap point on the current line, the wrap point will be
  returned. Otherwise this function will return the start or end
  of the line.
  */
  moveToLineBoundary(e, t, i = !0) {
    return YO(this, e, t, i);
  }
  /**
  Move a cursor position vertically. When `distance` isn't given,
  it defaults to moving to the next line (including wrapped
  lines). Otherwise, `distance` should provide a positive distance
  in pixels.
  
  When `start` has a
  [`goalColumn`](https://codemirror.net/6/docs/ref/#state.SelectionRange.goalColumn), the vertical
  motion will use that as a target horizontal position. Otherwise,
  the cursor's own horizontal position is used. The returned
  cursor will have its goal column set to whichever column was
  used.
  */
  moveVertically(e, t, i) {
    return tr(this, e, WO(this, e, t, i));
  }
  /**
  Find the DOM parent node and offset (child offset if `node` is
  an element, character offset when it is a text node) at the
  given document position.
  
  Note that for positions that aren't currently in
  `visibleRanges`, the resulting DOM position isn't necessarily
  meaningful (it may just point before or after a placeholder
  element).
  */
  domAtPos(e) {
    return this.docView.domAtPos(e);
  }
  /**
  Find the document position at the given DOM node. Can be useful
  for associating positions with DOM events. Will raise an error
  when `node` isn't part of the editor content.
  */
  posAtDOM(e, t = 0) {
    return this.docView.posFromDOM(e, t);
  }
  posAtCoords(e, t = !0) {
    return this.readMeasured(), Yc(this, e, t);
  }
  /**
  Get the screen coordinates at the given document position.
  `side` determines whether the coordinates are based on the
  element before (-1) or after (1) the position (if no element is
  available on the given side, the method will transparently use
  another strategy to get reasonable coordinates).
  */
  coordsAtPos(e, t = 1) {
    this.readMeasured();
    let i = this.docView.coordsAt(e, t);
    if (!i || i.left == i.right)
      return i;
    let s = this.state.doc.lineAt(e), r = this.bidiSpans(s), o = r[oi.find(r, e - s.from, -1, t)];
    return Ro(i, o.dir == N.LTR == t > 0);
  }
  /**
  Return the rectangle around a given character. If `pos` does not
  point in front of a character that is in the viewport and
  rendered (i.e. not replaced, not a line break), this will return
  null. For space characters that are a line wrap point, this will
  return the position before the line break.
  */
  coordsForChar(e) {
    return this.readMeasured(), this.docView.coordsForChar(e);
  }
  /**
  The default width of a character in the editor. May not
  accurately reflect the width of all characters (given variable
  width fonts or styling of invididual ranges).
  */
  get defaultCharacterWidth() {
    return this.viewState.heightOracle.charWidth;
  }
  /**
  The default height of a line in the editor. May not be accurate
  for all lines.
  */
  get defaultLineHeight() {
    return this.viewState.heightOracle.lineHeight;
  }
  /**
  The text direction
  ([`direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/direction)
  CSS property) of the editor's content element.
  */
  get textDirection() {
    return this.viewState.defaultTextDirection;
  }
  /**
  Find the text direction of the block at the given position, as
  assigned by CSS. If
  [`perLineTextDirection`](https://codemirror.net/6/docs/ref/#view.EditorView^perLineTextDirection)
  isn't enabled, or the given position is outside of the viewport,
  this will always return the same as
  [`textDirection`](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection). Note that
  this may trigger a DOM layout.
  */
  textDirectionAt(e) {
    return !this.state.facet(kc) || e < this.viewport.from || e > this.viewport.to ? this.textDirection : (this.readMeasured(), this.docView.textDirectionAt(e));
  }
  /**
  Whether this editor [wraps lines](https://codemirror.net/6/docs/ref/#view.EditorView.lineWrapping)
  (as determined by the
  [`white-space`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
  CSS property of its content element).
  */
  get lineWrapping() {
    return this.viewState.heightOracle.lineWrapping;
  }
  /**
  Returns the bidirectional text structure of the given line
  (which should be in the current document) as an array of span
  objects. The order of these spans matches the [text
  direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection)—if that is
  left-to-right, the leftmost spans come first, otherwise the
  rightmost spans come first.
  */
  bidiSpans(e) {
    if (e.length > Sp)
      return Zc(e.length);
    let t = this.textDirectionAt(e.from);
    for (let s of this.bidiCache)
      if (s.from == e.from && s.dir == t)
        return s.order;
    let i = xO(e.text, t);
    return this.bidiCache.push(new ss(e.from, e.to, t, i)), i;
  }
  /**
  Check whether the editor has focus.
  */
  get hasFocus() {
    var e;
    return (this.dom.ownerDocument.hasFocus() || C.safari && ((e = this.inputState) === null || e === void 0 ? void 0 : e.lastContextMenu) > Date.now() - 3e4) && this.root.activeElement == this.contentDOM;
  }
  /**
  Put focus on the editor.
  */
  focus() {
    this.observer.ignore(() => {
      oc(this.contentDOM), this.docView.updateSelection();
    });
  }
  /**
  Update the [root](https://codemirror.net/6/docs/ref/##view.EditorViewConfig.root) in which the editor lives. This is only
  necessary when moving the editor's existing DOM to a new window or shadow root.
  */
  setRoot(e) {
    this._root != e && (this._root = e, this.observer.setWindow((e.nodeType == 9 ? e : e.ownerDocument).defaultView || window), this.mountStyles());
  }
  /**
  Clean up this editor view, removing its element from the
  document, unregistering event handlers, and notifying
  plugins. The view instance can no longer be used after
  calling this.
  */
  destroy() {
    for (let e of this.plugins)
      e.destroy(this);
    this.plugins = [], this.inputState.destroy(), this.dom.remove(), this.observer.destroy(), this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.destroyed = !0;
  }
  /**
  Returns an effect that can be
  [added](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) to a transaction to
  cause it to scroll the given position or range into view.
  */
  static scrollIntoView(e, t = {}) {
    return Ml.of(new is(typeof e == "number" ? y.cursor(e) : e, t.y, t.x, t.yMargin, t.xMargin));
  }
  /**
  Returns an extension that can be used to add DOM event handlers.
  The value should be an object mapping event names to handler
  functions. For any given event, such functions are ordered by
  extension precedence, and the first handler to return true will
  be assumed to have handled that event, and no other handlers or
  built-in behavior will be activated for it. These are registered
  on the [content element](https://codemirror.net/6/docs/ref/#view.EditorView.contentDOM), except
  for `scroll` handlers, which will be called any time the
  editor's [scroll element](https://codemirror.net/6/docs/ref/#view.EditorView.scrollDOM) or one of
  its parent nodes is scrolled.
  */
  static domEventHandlers(e) {
    return ee.define(() => ({}), { eventHandlers: e });
  }
  /**
  Create a theme extension. The first argument can be a
  [`style-mod`](https://github.com/marijnh/style-mod#documentation)
  style spec providing the styles for the theme. These will be
  prefixed with a generated class for the style.
  
  Because the selectors will be prefixed with a scope class, rule
  that directly match the editor's [wrapper
  element](https://codemirror.net/6/docs/ref/#view.EditorView.dom)—to which the scope class will be
  added—need to be explicitly differentiated by adding an `&` to
  the selector for that element—for example
  `&.cm-focused`.
  
  When `dark` is set to true, the theme will be marked as dark,
  which will cause the `&dark` rules from [base
  themes](https://codemirror.net/6/docs/ref/#view.EditorView^baseTheme) to be used (as opposed to
  `&light` when a light theme is active).
  */
  static theme(e, t) {
    let i = Ct.newName(), s = [xn.of(i), Vi.of(oo(`.${i}`, e))];
    return t && t.dark && s.push(so.of(!0)), s;
  }
  /**
  Create an extension that adds styles to the base theme. Like
  with [`theme`](https://codemirror.net/6/docs/ref/#view.EditorView^theme), use `&` to indicate the
  place of the editor wrapper element when directly targeting
  that. You can also use `&dark` or `&light` instead to only
  target editors with a dark or light theme.
  */
  static baseTheme(e) {
    return jt.lowest(Vi.of(oo("." + ro, e, Nc)));
  }
  /**
  Retrieve an editor view instance from the view's DOM
  representation.
  */
  static findFromDOM(e) {
    var t;
    let i = e.querySelector(".cm-content"), s = i && _.get(i) || _.get(e);
    return ((t = s == null ? void 0 : s.rootView) === null || t === void 0 ? void 0 : t.view) || null;
  }
}
k.styleModule = Vi;
k.inputHandler = wc;
k.focusChangeEffect = $c;
k.perLineTextDirection = kc;
k.exceptionSink = xc;
k.updateListener = Hr;
k.editable = Vs;
k.mouseSelectionStyle = Qc;
k.dragMovesSelection = bc;
k.clickAddsSelectionRange = yc;
k.decorations = Li;
k.atomicRanges = Mo;
k.scrollMargins = Cc;
k.darkTheme = so;
k.contentAttributes = Yo;
k.editorAttributes = Pc;
k.lineWrapping = /* @__PURE__ */ k.contentAttributes.of({ class: "cm-lineWrapping" });
k.announce = /* @__PURE__ */ R.define();
const Sp = 4096, na = {};
class ss {
  constructor(e, t, i, s) {
    this.from = e, this.to = t, this.dir = i, this.order = s;
  }
  static update(e, t) {
    if (t.empty)
      return e;
    let i = [], s = e.length ? e[e.length - 1].dir : N.LTR;
    for (let r = Math.max(0, e.length - 10); r < e.length; r++) {
      let o = e[r];
      o.dir == s && !t.touchesRange(o.from, o.to) && i.push(new ss(t.mapPos(o.from, 1), t.mapPos(o.to, -1), o.dir, o.order));
    }
    return i;
  }
}
function sa(n, e, t) {
  for (let i = n.state.facet(e), s = i.length - 1; s >= 0; s--) {
    let r = i[s], o = typeof r == "function" ? r(n) : r;
    o && Nr(o, t);
  }
  return t;
}
const yp = C.mac ? "mac" : C.windows ? "win" : C.linux ? "linux" : "key";
function bp(n, e) {
  const t = n.split(/-(?!$)/);
  let i = t[t.length - 1];
  i == "Space" && (i = " ");
  let s, r, o, l;
  for (let a = 0; a < t.length - 1; ++a) {
    const h = t[a];
    if (/^(cmd|meta|m)$/i.test(h))
      l = !0;
    else if (/^a(lt)?$/i.test(h))
      s = !0;
    else if (/^(c|ctrl|control)$/i.test(h))
      r = !0;
    else if (/^s(hift)?$/i.test(h))
      o = !0;
    else if (/^mod$/i.test(h))
      e == "mac" ? l = !0 : r = !0;
    else
      throw new Error("Unrecognized modifier name: " + h);
  }
  return s && (i = "Alt-" + i), r && (i = "Ctrl-" + i), l && (i = "Meta-" + i), o && (i = "Shift-" + i), i;
}
function wn(n, e, t) {
  return e.altKey && (n = "Alt-" + n), e.ctrlKey && (n = "Ctrl-" + n), e.metaKey && (n = "Meta-" + n), t !== !1 && e.shiftKey && (n = "Shift-" + n), n;
}
const Qp = /* @__PURE__ */ jt.default(/* @__PURE__ */ k.domEventHandlers({
  keydown(n, e) {
    return Hc(Fc(e.state), n, e, "editor");
  }
})), on = /* @__PURE__ */ P.define({ enables: Qp }), ra = /* @__PURE__ */ new WeakMap();
function Fc(n) {
  let e = n.facet(on), t = ra.get(e);
  return t || ra.set(e, t = $p(e.reduce((i, s) => i.concat(s), []))), t;
}
function xp(n, e, t) {
  return Hc(Fc(n.state), e, n, t);
}
let wt = null;
const wp = 4e3;
function $p(n, e = yp) {
  let t = /* @__PURE__ */ Object.create(null), i = /* @__PURE__ */ Object.create(null), s = (o, l) => {
    let a = i[o];
    if (a == null)
      i[o] = l;
    else if (a != l)
      throw new Error("Key binding " + o + " is used both as a regular binding and as a multi-stroke prefix");
  }, r = (o, l, a, h, c) => {
    var f, u;
    let d = t[o] || (t[o] = /* @__PURE__ */ Object.create(null)), O = l.split(/ (?!$)/).map((S) => bp(S, e));
    for (let S = 1; S < O.length; S++) {
      let b = O.slice(0, S).join(" ");
      s(b, !0), d[b] || (d[b] = {
        preventDefault: !0,
        stopPropagation: !1,
        run: [(v) => {
          let Q = wt = { view: v, prefix: b, scope: o };
          return setTimeout(() => {
            wt == Q && (wt = null);
          }, wp), !0;
        }]
      });
    }
    let m = O.join(" ");
    s(m, !1);
    let g = d[m] || (d[m] = {
      preventDefault: !1,
      stopPropagation: !1,
      run: ((u = (f = d._any) === null || f === void 0 ? void 0 : f.run) === null || u === void 0 ? void 0 : u.slice()) || []
    });
    a && g.run.push(a), h && (g.preventDefault = !0), c && (g.stopPropagation = !0);
  };
  for (let o of n) {
    let l = o.scope ? o.scope.split(" ") : ["editor"];
    if (o.any)
      for (let h of l) {
        let c = t[h] || (t[h] = /* @__PURE__ */ Object.create(null));
        c._any || (c._any = { preventDefault: !1, stopPropagation: !1, run: [] });
        for (let f in c)
          c[f].run.push(o.any);
      }
    let a = o[e] || o.key;
    if (a)
      for (let h of l)
        r(h, a, o.run, o.preventDefault, o.stopPropagation), o.shift && r(h, "Shift-" + a, o.shift, o.preventDefault, o.stopPropagation);
  }
  return t;
}
function Hc(n, e, t, i) {
  let s = nO(e), r = ae(s, 0), o = Ye(r) == s.length && s != " ", l = "", a = !1, h = !1, c = !1;
  wt && wt.view == t && wt.scope == i && (l = wt.prefix + " ", Wc.indexOf(e.keyCode) < 0 && (h = !0, wt = null));
  let f = /* @__PURE__ */ new Set(), u = (g) => {
    if (g) {
      for (let S of g.run)
        if (!f.has(S) && (f.add(S), S(t, e)))
          return g.stopPropagation && (c = !0), !0;
      g.preventDefault && (g.stopPropagation && (c = !0), h = !0);
    }
    return !1;
  }, d = n[i], O, m;
  return d && (u(d[l + wn(s, e, !o)]) ? a = !0 : o && (e.altKey || e.metaKey || e.ctrlKey) && // Ctrl-Alt may be used for AltGr on Windows
  !(C.windows && e.ctrlKey && e.altKey) && (O = Xt[e.keyCode]) && O != s ? (u(d[l + wn(O, e, !0)]) || e.shiftKey && (m = Ii[e.keyCode]) != s && m != O && u(d[l + wn(m, e, !1)])) && (a = !0) : o && e.shiftKey && u(d[l + wn(s, e, !0)]) && (a = !0), !a && u(d._any) && (a = !0)), h && (a = !0), a && c && e.stopPropagation(), a;
}
class ln {
  /**
  Create a marker with the given class and dimensions. If `width`
  is null, the DOM element will get no width style.
  */
  constructor(e, t, i, s, r) {
    this.className = e, this.left = t, this.top = i, this.width = s, this.height = r;
  }
  draw() {
    let e = document.createElement("div");
    return e.className = this.className, this.adjust(e), e;
  }
  update(e, t) {
    return t.className != this.className ? !1 : (this.adjust(e), !0);
  }
  adjust(e) {
    e.style.left = this.left + "px", e.style.top = this.top + "px", this.width != null && (e.style.width = this.width + "px"), e.style.height = this.height + "px";
  }
  eq(e) {
    return this.left == e.left && this.top == e.top && this.width == e.width && this.height == e.height && this.className == e.className;
  }
  /**
  Create a set of rectangles for the given selection range,
  assigning them theclass`className`. Will create a single
  rectangle for empty ranges, and a set of selection-style
  rectangles covering the range's content (in a bidi-aware
  way) for non-empty ones.
  */
  static forRange(e, t, i) {
    if (i.empty) {
      let s = e.coordsAtPos(i.head, i.assoc || 1);
      if (!s)
        return [];
      let r = Jc(e);
      return [new ln(t, s.left - r.left, s.top - r.top, null, s.bottom - s.top)];
    } else
      return kp(e, t, i);
  }
}
function Jc(n) {
  let e = n.scrollDOM.getBoundingClientRect();
  return { left: (n.textDirection == N.LTR ? e.left : e.right - n.scrollDOM.clientWidth) - n.scrollDOM.scrollLeft, top: e.top - n.scrollDOM.scrollTop };
}
function oa(n, e, t) {
  let i = y.cursor(e);
  return {
    from: Math.max(t.from, n.moveToLineBoundary(i, !1, !0).from),
    to: Math.min(t.to, n.moveToLineBoundary(i, !0, !0).from),
    type: F.Text
  };
}
function kp(n, e, t) {
  if (t.to <= n.viewport.from || t.from >= n.viewport.to)
    return [];
  let i = Math.max(t.from, n.viewport.from), s = Math.min(t.to, n.viewport.to), r = n.textDirection == N.LTR, o = n.contentDOM, l = o.getBoundingClientRect(), a = Jc(n), h = o.querySelector(".cm-line"), c = h && window.getComputedStyle(h), f = l.left + (c ? parseInt(c.paddingLeft) + Math.min(0, parseInt(c.textIndent)) : 0), u = l.right - (c ? parseInt(c.paddingRight) : 0), d = to(n, i), O = to(n, s), m = d.type == F.Text ? d : null, g = O.type == F.Text ? O : null;
  if (m && (n.lineWrapping || d.widgetLineBreaks) && (m = oa(n, i, m)), g && (n.lineWrapping || O.widgetLineBreaks) && (g = oa(n, s, g)), m && g && m.from == g.from)
    return b(v(t.from, t.to, m));
  {
    let x = m ? v(t.from, null, m) : Q(d, !1), w = g ? v(null, t.to, g) : Q(O, !0), Z = [];
    return (m || d).to < (g || O).from - (m && g ? 1 : 0) || d.widgetLineBreaks > 1 && x.bottom + n.defaultLineHeight / 2 < w.top ? Z.push(S(f, x.bottom, u, w.top)) : x.bottom < w.top && n.elementAtHeight((x.bottom + w.top) / 2).type == F.Text && (x.bottom = w.top = (x.bottom + w.top) / 2), b(x).concat(Z).concat(b(w));
  }
  function S(x, w, Z, U) {
    return new ln(
      e,
      x - a.left,
      w - a.top - 0.01,
      Z - x,
      U - w + 0.01
      /* Epsilon */
    );
  }
  function b({ top: x, bottom: w, horizontal: Z }) {
    let U = [];
    for (let V = 0; V < Z.length; V += 2)
      U.push(S(Z[V], x, Z[V + 1], w));
    return U;
  }
  function v(x, w, Z) {
    let U = 1e9, V = -1e9, Y = [];
    function B(Qe, oe, ue, je, xe) {
      let H = n.coordsAtPos(Qe, Qe == Z.to ? -2 : 2), ie = n.coordsAtPos(ue, ue == Z.from ? 2 : -2);
      !H || !ie || (U = Math.min(H.top, ie.top, U), V = Math.max(H.bottom, ie.bottom, V), xe == N.LTR ? Y.push(r && oe ? f : H.left, r && je ? u : ie.right) : Y.push(!r && je ? f : ie.left, !r && oe ? u : H.right));
    }
    let te = x ?? Z.from, fe = w ?? Z.to;
    for (let Qe of n.visibleRanges)
      if (Qe.to > te && Qe.from < fe)
        for (let oe = Math.max(Qe.from, te), ue = Math.min(Qe.to, fe); ; ) {
          let je = n.state.doc.lineAt(oe);
          for (let xe of n.bidiSpans(je)) {
            let H = xe.from + je.from, ie = xe.to + je.from;
            if (H >= ue)
              break;
            ie > oe && B(Math.max(H, oe), x == null && H <= te, Math.min(ie, ue), w == null && ie >= fe, xe.dir);
          }
          if (oe = je.to + 1, oe >= ue)
            break;
        }
    return Y.length == 0 && B(te, x == null, fe, w == null, n.textDirection), { top: U, bottom: V, horizontal: Y };
  }
  function Q(x, w) {
    let Z = l.top + (w ? x.top : x.bottom);
    return { top: Z, bottom: Z, horizontal: [] };
  }
}
function vp(n, e) {
  return n.constructor == e.constructor && n.eq(e);
}
class Pp {
  constructor(e, t) {
    this.view = e, this.layer = t, this.drawn = [], this.measureReq = { read: this.measure.bind(this), write: this.draw.bind(this) }, this.dom = e.scrollDOM.appendChild(document.createElement("div")), this.dom.classList.add("cm-layer"), t.above && this.dom.classList.add("cm-layer-above"), t.class && this.dom.classList.add(t.class), this.dom.setAttribute("aria-hidden", "true"), this.setOrder(e.state), e.requestMeasure(this.measureReq), t.mount && t.mount(this.dom, e);
  }
  update(e) {
    e.startState.facet(En) != e.state.facet(En) && this.setOrder(e.state), (this.layer.update(e, this.dom) || e.geometryChanged) && e.view.requestMeasure(this.measureReq);
  }
  setOrder(e) {
    let t = 0, i = e.facet(En);
    for (; t < i.length && i[t] != this.layer; )
      t++;
    this.dom.style.zIndex = String((this.layer.above ? 150 : -1) - t);
  }
  measure() {
    return this.layer.markers(this.view);
  }
  draw(e) {
    if (e.length != this.drawn.length || e.some((t, i) => !vp(t, this.drawn[i]))) {
      let t = this.dom.firstChild, i = 0;
      for (let s of e)
        s.update && t && s.constructor && this.drawn[i].constructor && s.update(t, this.drawn[i]) ? (t = t.nextSibling, i++) : this.dom.insertBefore(s.draw(), t);
      for (; t; ) {
        let s = t.nextSibling;
        t.remove(), t = s;
      }
      this.drawn = e;
    }
  }
  destroy() {
    this.layer.destroy && this.layer.destroy(this.dom, this.view), this.dom.remove();
  }
}
const En = /* @__PURE__ */ P.define();
function Kc(n) {
  return [
    ee.define((e) => new Pp(e, n)),
    En.of(n)
  ];
}
const ef = !C.ios, Ni = /* @__PURE__ */ P.define({
  combine(n) {
    return lt(n, {
      cursorBlinkRate: 1200,
      drawRangeCursor: !0
    }, {
      cursorBlinkRate: (e, t) => Math.min(e, t),
      drawRangeCursor: (e, t) => e || t
    });
  }
});
function Cp(n = {}) {
  return [
    Ni.of(n),
    Xp,
    Tp,
    Zp,
    vc.of(!0)
  ];
}
function tf(n) {
  return n.startState.facet(Ni) != n.state.facet(Ni);
}
const Xp = /* @__PURE__ */ Kc({
  above: !0,
  markers(n) {
    let { state: e } = n, t = e.facet(Ni), i = [];
    for (let s of e.selection.ranges) {
      let r = s == e.selection.main;
      if (s.empty ? !r || ef : t.drawRangeCursor) {
        let o = r ? "cm-cursor cm-cursor-primary" : "cm-cursor cm-cursor-secondary", l = s.empty ? s : y.cursor(s.head, s.head > s.anchor ? -1 : 1);
        for (let a of ln.forRange(n, o, l))
          i.push(a);
      }
    }
    return i;
  },
  update(n, e) {
    n.transactions.some((i) => i.selection) && (e.style.animationName = e.style.animationName == "cm-blink" ? "cm-blink2" : "cm-blink");
    let t = tf(n);
    return t && la(n.state, e), n.docChanged || n.selectionSet || t;
  },
  mount(n, e) {
    la(e.state, n);
  },
  class: "cm-cursorLayer"
});
function la(n, e) {
  e.style.animationDuration = n.facet(Ni).cursorBlinkRate + "ms";
}
const Tp = /* @__PURE__ */ Kc({
  above: !1,
  markers(n) {
    return n.state.selection.ranges.map((e) => e.empty ? [] : ln.forRange(n, "cm-selectionBackground", e)).reduce((e, t) => e.concat(t));
  },
  update(n, e) {
    return n.docChanged || n.selectionSet || n.viewportChanged || tf(n);
  },
  class: "cm-selectionLayer"
}), nf = {
  ".cm-line": {
    "& ::selection": { backgroundColor: "transparent !important" },
    "&::selection": { backgroundColor: "transparent !important" }
  }
};
ef && (nf[".cm-line"].caretColor = "transparent !important");
const Zp = /* @__PURE__ */ jt.highest(/* @__PURE__ */ k.theme(nf)), sf = /* @__PURE__ */ R.define({
  map(n, e) {
    return n == null ? null : e.mapPos(n);
  }
}), Mi = /* @__PURE__ */ re.define({
  create() {
    return null;
  },
  update(n, e) {
    return n != null && (n = e.changes.mapPos(n)), e.effects.reduce((t, i) => i.is(sf) ? i.value : t, n);
  }
}), Rp = /* @__PURE__ */ ee.fromClass(class {
  constructor(n) {
    this.view = n, this.cursor = null, this.measureReq = { read: this.readPos.bind(this), write: this.drawCursor.bind(this) };
  }
  update(n) {
    var e;
    let t = n.state.field(Mi);
    t == null ? this.cursor != null && ((e = this.cursor) === null || e === void 0 || e.remove(), this.cursor = null) : (this.cursor || (this.cursor = this.view.scrollDOM.appendChild(document.createElement("div")), this.cursor.className = "cm-dropCursor"), (n.startState.field(Mi) != t || n.docChanged || n.geometryChanged) && this.view.requestMeasure(this.measureReq));
  }
  readPos() {
    let n = this.view.state.field(Mi), e = n != null && this.view.coordsAtPos(n);
    if (!e)
      return null;
    let t = this.view.scrollDOM.getBoundingClientRect();
    return {
      left: e.left - t.left + this.view.scrollDOM.scrollLeft,
      top: e.top - t.top + this.view.scrollDOM.scrollTop,
      height: e.bottom - e.top
    };
  }
  drawCursor(n) {
    this.cursor && (n ? (this.cursor.style.left = n.left + "px", this.cursor.style.top = n.top + "px", this.cursor.style.height = n.height + "px") : this.cursor.style.left = "-100000px");
  }
  destroy() {
    this.cursor && this.cursor.remove();
  }
  setDropPos(n) {
    this.view.state.field(Mi) != n && this.view.dispatch({ effects: sf.of(n) });
  }
}, {
  eventHandlers: {
    dragover(n) {
      this.setDropPos(this.view.posAtCoords({ x: n.clientX, y: n.clientY }));
    },
    dragleave(n) {
      (n.target == this.view.contentDOM || !this.view.contentDOM.contains(n.relatedTarget)) && this.setDropPos(null);
    },
    dragend() {
      this.setDropPos(null);
    },
    drop() {
      this.setDropPos(null);
    }
  }
});
function Ap() {
  return [Mi, Rp];
}
function aa(n, e, t, i, s) {
  e.lastIndex = 0;
  for (let r = n.iterRange(t, i), o = t, l; !r.next().done; o += r.value.length)
    if (!r.lineBreak)
      for (; l = e.exec(r.value); )
        s(o + l.index, l);
}
function Vp(n, e) {
  let t = n.visibleRanges;
  if (t.length == 1 && t[0].from == n.viewport.from && t[0].to == n.viewport.to)
    return t;
  let i = [];
  for (let { from: s, to: r } of t)
    s = Math.max(n.state.doc.lineAt(s).from, s - e), r = Math.min(n.state.doc.lineAt(r).to, r + e), i.length && i[i.length - 1].to >= s ? i[i.length - 1].to = r : i.push({ from: s, to: r });
  return i;
}
class Yp {
  /**
  Create a decorator.
  */
  constructor(e) {
    const { regexp: t, decoration: i, decorate: s, boundary: r, maxLength: o = 1e3 } = e;
    if (!t.global)
      throw new RangeError("The regular expression given to MatchDecorator should have its 'g' flag set");
    if (this.regexp = t, s)
      this.addMatch = (l, a, h, c) => s(c, h, h + l[0].length, l, a);
    else if (typeof i == "function")
      this.addMatch = (l, a, h, c) => {
        let f = i(l, a, h);
        f && c(h, h + l[0].length, f);
      };
    else if (i)
      this.addMatch = (l, a, h, c) => c(h, h + l[0].length, i);
    else
      throw new RangeError("Either 'decorate' or 'decoration' should be provided to MatchDecorator");
    this.boundary = r, this.maxLength = o;
  }
  /**
  Compute the full set of decorations for matches in the given
  view's viewport. You'll want to call this when initializing your
  plugin.
  */
  createDeco(e) {
    let t = new Pt(), i = t.add.bind(t);
    for (let { from: s, to: r } of Vp(e, this.maxLength))
      aa(e.state.doc, this.regexp, s, r, (o, l) => this.addMatch(l, e, o, i));
    return t.finish();
  }
  /**
  Update a set of decorations for a view update. `deco` _must_ be
  the set of decorations produced by _this_ `MatchDecorator` for
  the view state before the update.
  */
  updateDeco(e, t) {
    let i = 1e9, s = -1;
    return e.docChanged && e.changes.iterChanges((r, o, l, a) => {
      a > e.view.viewport.from && l < e.view.viewport.to && (i = Math.min(l, i), s = Math.max(a, s));
    }), e.viewportChanged || s - i > 1e3 ? this.createDeco(e.view) : s > -1 ? this.updateRange(e.view, t.map(e.changes), i, s) : t;
  }
  updateRange(e, t, i, s) {
    for (let r of e.visibleRanges) {
      let o = Math.max(r.from, i), l = Math.min(r.to, s);
      if (l > o) {
        let a = e.state.doc.lineAt(o), h = a.to < l ? e.state.doc.lineAt(l) : a, c = Math.max(r.from, a.from), f = Math.min(r.to, h.to);
        if (this.boundary) {
          for (; o > a.from; o--)
            if (this.boundary.test(a.text[o - 1 - a.from])) {
              c = o;
              break;
            }
          for (; l < h.to; l++)
            if (this.boundary.test(h.text[l - h.from])) {
              f = l;
              break;
            }
        }
        let u = [], d, O = (m, g, S) => u.push(S.range(m, g));
        if (a == h)
          for (this.regexp.lastIndex = c - a.from; (d = this.regexp.exec(a.text)) && d.index < f - a.from; )
            this.addMatch(d, e, d.index + a.from, O);
        else
          aa(e.state.doc, this.regexp, c, f, (m, g) => this.addMatch(g, e, m, O));
        t = t.update({ filterFrom: c, filterTo: f, filter: (m, g) => m < c || g > f, add: u });
      }
    }
    return t;
  }
}
const lo = /x/.unicode != null ? "gu" : "g", Mp = /* @__PURE__ */ new RegExp(`[\0-\b
--­؜​‎‏\u2028\u2029‭‮⁦⁧⁩\uFEFF￹-￼]`, lo), Wp = {
  0: "null",
  7: "bell",
  8: "backspace",
  10: "newline",
  11: "vertical tab",
  13: "carriage return",
  27: "escape",
  8203: "zero width space",
  8204: "zero width non-joiner",
  8205: "zero width joiner",
  8206: "left-to-right mark",
  8207: "right-to-left mark",
  8232: "line separator",
  8237: "left-to-right override",
  8238: "right-to-left override",
  8294: "left-to-right isolate",
  8295: "right-to-left isolate",
  8297: "pop directional isolate",
  8233: "paragraph separator",
  65279: "zero width no-break space",
  65532: "object replacement"
};
let sr = null;
function Dp() {
  var n;
  if (sr == null && typeof document < "u" && document.body) {
    let e = document.body.style;
    sr = ((n = e.tabSize) !== null && n !== void 0 ? n : e.MozTabSize) != null;
  }
  return sr || !1;
}
const _n = /* @__PURE__ */ P.define({
  combine(n) {
    let e = lt(n, {
      render: null,
      specialChars: Mp,
      addSpecialChars: null
    });
    return (e.replaceTabs = !Dp()) && (e.specialChars = new RegExp("	|" + e.specialChars.source, lo)), e.addSpecialChars && (e.specialChars = new RegExp(e.specialChars.source + "|" + e.addSpecialChars.source, lo)), e;
  }
});
function Up(n = {}) {
  return [_n.of(n), qp()];
}
let ha = null;
function qp() {
  return ha || (ha = ee.fromClass(class {
    constructor(n) {
      this.view = n, this.decorations = T.none, this.decorationCache = /* @__PURE__ */ Object.create(null), this.decorator = this.makeDecorator(n.state.facet(_n)), this.decorations = this.decorator.createDeco(n);
    }
    makeDecorator(n) {
      return new Yp({
        regexp: n.specialChars,
        decoration: (e, t, i) => {
          let { doc: s } = t.state, r = ae(e[0], 0);
          if (r == 9) {
            let o = s.lineAt(i), l = t.state.tabSize, a = nn(o.text, l, i - o.from);
            return T.replace({ widget: new zp((l - a % l) * this.view.defaultCharacterWidth) });
          }
          return this.decorationCache[r] || (this.decorationCache[r] = T.replace({ widget: new Bp(n, r) }));
        },
        boundary: n.replaceTabs ? void 0 : /[^]/
      });
    }
    update(n) {
      let e = n.state.facet(_n);
      n.startState.facet(_n) != e ? (this.decorator = this.makeDecorator(e), this.decorations = this.decorator.createDeco(n.view)) : this.decorations = this.decorator.updateDeco(n, this.decorations);
    }
  }, {
    decorations: (n) => n.decorations
  }));
}
const Ep = "•";
function _p(n) {
  return n >= 32 ? Ep : n == 10 ? "␤" : String.fromCharCode(9216 + n);
}
class Bp extends St {
  constructor(e, t) {
    super(), this.options = e, this.code = t;
  }
  eq(e) {
    return e.code == this.code;
  }
  toDOM(e) {
    let t = _p(this.code), i = e.state.phrase("Control character") + " " + (Wp[this.code] || "0x" + this.code.toString(16)), s = this.options.render && this.options.render(this.code, i, t);
    if (s)
      return s;
    let r = document.createElement("span");
    return r.textContent = t, r.title = i, r.setAttribute("aria-label", i), r.className = "cm-specialChar", r;
  }
  ignoreEvent() {
    return !1;
  }
}
class zp extends St {
  constructor(e) {
    super(), this.width = e;
  }
  eq(e) {
    return e.width == this.width;
  }
  toDOM() {
    let e = document.createElement("span");
    return e.textContent = "	", e.className = "cm-tab", e.style.width = this.width + "px", e;
  }
  ignoreEvent() {
    return !1;
  }
}
function Ip() {
  return Lp;
}
const jp = /* @__PURE__ */ T.line({ class: "cm-activeLine" }), Lp = /* @__PURE__ */ ee.fromClass(class {
  constructor(n) {
    this.decorations = this.getDeco(n);
  }
  update(n) {
    (n.docChanged || n.selectionSet) && (this.decorations = this.getDeco(n.view));
  }
  getDeco(n) {
    let e = -1, t = [];
    for (let i of n.state.selection.ranges) {
      let s = n.lineBlockAt(i.head);
      s.from > e && (t.push(jp.range(s.from)), e = s.from);
    }
    return T.set(t);
  }
}, {
  decorations: (n) => n.decorations
}), ao = 2e3;
function Np(n, e, t) {
  let i = Math.min(e.line, t.line), s = Math.max(e.line, t.line), r = [];
  if (e.off > ao || t.off > ao || e.col < 0 || t.col < 0) {
    let o = Math.min(e.off, t.off), l = Math.max(e.off, t.off);
    for (let a = i; a <= s; a++) {
      let h = n.doc.line(a);
      h.length <= l && r.push(y.range(h.from + o, h.to + l));
    }
  } else {
    let o = Math.min(e.col, t.col), l = Math.max(e.col, t.col);
    for (let a = i; a <= s; a++) {
      let h = n.doc.line(a), c = Er(h.text, o, n.tabSize, !0);
      if (c < 0)
        r.push(y.cursor(h.to));
      else {
        let f = Er(h.text, l, n.tabSize);
        r.push(y.range(h.from + c, h.from + f));
      }
    }
  }
  return r;
}
function Gp(n, e) {
  let t = n.coordsAtPos(n.viewport.from);
  return t ? Math.round(Math.abs((t.left - e) / n.defaultCharacterWidth)) : -1;
}
function ca(n, e) {
  let t = n.posAtCoords({ x: e.clientX, y: e.clientY }, !1), i = n.state.doc.lineAt(t), s = t - i.from, r = s > ao ? -1 : s == i.length ? Gp(n, e.clientX) : nn(i.text, n.state.tabSize, t - i.from);
  return { line: i.number, col: r, off: s };
}
function Fp(n, e) {
  let t = ca(n, e), i = n.state.selection;
  return t ? {
    update(s) {
      if (s.docChanged) {
        let r = s.changes.mapPos(s.startState.doc.line(t.line).from), o = s.state.doc.lineAt(r);
        t = { line: o.number, col: t.col, off: Math.min(t.off, o.length) }, i = i.map(s.changes);
      }
    },
    get(s, r, o) {
      let l = ca(n, s);
      if (!l)
        return i;
      let a = Np(n.state, t, l);
      return a.length ? o ? y.create(a.concat(i.ranges)) : y.create(a) : i;
    }
  } : null;
}
function Hp(n) {
  let e = (n == null ? void 0 : n.eventFilter) || ((t) => t.altKey && t.button == 0);
  return k.mouseSelectionStyle.of((t, i) => e(i) ? Fp(t, i) : null);
}
const Jp = {
  Alt: [18, (n) => !!n.altKey],
  Control: [17, (n) => !!n.ctrlKey],
  Shift: [16, (n) => !!n.shiftKey],
  Meta: [91, (n) => !!n.metaKey]
}, Kp = { style: "cursor: crosshair" };
function eg(n = {}) {
  let [e, t] = Jp[n.key || "Alt"], i = ee.fromClass(class {
    constructor(s) {
      this.view = s, this.isDown = !1;
    }
    set(s) {
      this.isDown != s && (this.isDown = s, this.view.update([]));
    }
  }, {
    eventHandlers: {
      keydown(s) {
        this.set(s.keyCode == e || t(s));
      },
      keyup(s) {
        (s.keyCode == e || !t(s)) && this.set(!1);
      },
      mousemove(s) {
        this.set(t(s));
      }
    }
  });
  return [
    i,
    k.contentAttributes.of((s) => {
      var r;
      return !((r = s.plugin(i)) === null || r === void 0) && r.isDown ? Kp : null;
    })
  ];
}
const $n = "-10000px";
class rf {
  constructor(e, t, i) {
    this.facet = t, this.createTooltipView = i, this.input = e.state.facet(t), this.tooltips = this.input.filter((s) => s), this.tooltipViews = this.tooltips.map(i);
  }
  update(e) {
    var t;
    let i = e.state.facet(this.facet), s = i.filter((o) => o);
    if (i === this.input) {
      for (let o of this.tooltipViews)
        o.update && o.update(e);
      return !1;
    }
    let r = [];
    for (let o = 0; o < s.length; o++) {
      let l = s[o], a = -1;
      if (l) {
        for (let h = 0; h < this.tooltips.length; h++) {
          let c = this.tooltips[h];
          c && c.create == l.create && (a = h);
        }
        if (a < 0)
          r[o] = this.createTooltipView(l);
        else {
          let h = r[o] = this.tooltipViews[a];
          h.update && h.update(e);
        }
      }
    }
    for (let o of this.tooltipViews)
      r.indexOf(o) < 0 && (o.dom.remove(), (t = o.destroy) === null || t === void 0 || t.call(o));
    return this.input = i, this.tooltips = s, this.tooltipViews = r, !0;
  }
}
function tg(n) {
  let { win: e } = n;
  return { top: 0, left: 0, bottom: e.innerHeight, right: e.innerWidth };
}
const rr = /* @__PURE__ */ P.define({
  combine: (n) => {
    var e, t, i;
    return {
      position: C.ios ? "absolute" : ((e = n.find((s) => s.position)) === null || e === void 0 ? void 0 : e.position) || "fixed",
      parent: ((t = n.find((s) => s.parent)) === null || t === void 0 ? void 0 : t.parent) || null,
      tooltipSpace: ((i = n.find((s) => s.tooltipSpace)) === null || i === void 0 ? void 0 : i.tooltipSpace) || tg
    };
  }
}), fa = /* @__PURE__ */ new WeakMap(), of = /* @__PURE__ */ ee.fromClass(class {
  constructor(n) {
    this.view = n, this.inView = !0, this.lastTransaction = 0, this.measureTimeout = -1;
    let e = n.state.facet(rr);
    this.position = e.position, this.parent = e.parent, this.classes = n.themeClasses, this.createContainer(), this.measureReq = { read: this.readMeasure.bind(this), write: this.writeMeasure.bind(this), key: this }, this.manager = new rf(n, Do, (t) => this.createTooltip(t)), this.intersectionObserver = typeof IntersectionObserver == "function" ? new IntersectionObserver((t) => {
      Date.now() > this.lastTransaction - 50 && t.length > 0 && t[t.length - 1].intersectionRatio < 1 && this.measureSoon();
    }, { threshold: [1] }) : null, this.observeIntersection(), n.win.addEventListener("resize", this.measureSoon = this.measureSoon.bind(this)), this.maybeMeasure();
  }
  createContainer() {
    this.parent ? (this.container = document.createElement("div"), this.container.style.position = "relative", this.container.className = this.view.themeClasses, this.parent.appendChild(this.container)) : this.container = this.view.dom;
  }
  observeIntersection() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      for (let n of this.manager.tooltipViews)
        this.intersectionObserver.observe(n.dom);
    }
  }
  measureSoon() {
    this.measureTimeout < 0 && (this.measureTimeout = setTimeout(() => {
      this.measureTimeout = -1, this.maybeMeasure();
    }, 50));
  }
  update(n) {
    n.transactions.length && (this.lastTransaction = Date.now());
    let e = this.manager.update(n);
    e && this.observeIntersection();
    let t = e || n.geometryChanged, i = n.state.facet(rr);
    if (i.position != this.position) {
      this.position = i.position;
      for (let s of this.manager.tooltipViews)
        s.dom.style.position = this.position;
      t = !0;
    }
    if (i.parent != this.parent) {
      this.parent && this.container.remove(), this.parent = i.parent, this.createContainer();
      for (let s of this.manager.tooltipViews)
        this.container.appendChild(s.dom);
      t = !0;
    } else
      this.parent && this.view.themeClasses != this.classes && (this.classes = this.container.className = this.view.themeClasses);
    t && this.maybeMeasure();
  }
  createTooltip(n) {
    let e = n.create(this.view);
    if (e.dom.classList.add("cm-tooltip"), n.arrow && !e.dom.querySelector(".cm-tooltip > .cm-tooltip-arrow")) {
      let t = document.createElement("div");
      t.className = "cm-tooltip-arrow", e.dom.appendChild(t);
    }
    return e.dom.style.position = this.position, e.dom.style.top = $n, this.container.appendChild(e.dom), e.mount && e.mount(this.view), e;
  }
  destroy() {
    var n, e;
    this.view.win.removeEventListener("resize", this.measureSoon);
    for (let t of this.manager.tooltipViews)
      t.dom.remove(), (n = t.destroy) === null || n === void 0 || n.call(t);
    (e = this.intersectionObserver) === null || e === void 0 || e.disconnect(), clearTimeout(this.measureTimeout);
  }
  readMeasure() {
    let n = this.view.dom.getBoundingClientRect();
    return {
      editor: n,
      parent: this.parent ? this.container.getBoundingClientRect() : n,
      pos: this.manager.tooltips.map((e, t) => {
        let i = this.manager.tooltipViews[t];
        return i.getCoords ? i.getCoords(e.pos) : this.view.coordsAtPos(e.pos);
      }),
      size: this.manager.tooltipViews.map(({ dom: e }) => e.getBoundingClientRect()),
      space: this.view.state.facet(rr).tooltipSpace(this.view)
    };
  }
  writeMeasure(n) {
    var e;
    let { editor: t, space: i } = n, s = [];
    for (let r = 0; r < this.manager.tooltips.length; r++) {
      let o = this.manager.tooltips[r], l = this.manager.tooltipViews[r], { dom: a } = l, h = n.pos[r], c = n.size[r];
      if (!h || h.bottom <= Math.max(t.top, i.top) || h.top >= Math.min(t.bottom, i.bottom) || h.right < Math.max(t.left, i.left) - 0.1 || h.left > Math.min(t.right, i.right) + 0.1) {
        a.style.top = $n;
        continue;
      }
      let f = o.arrow ? l.dom.querySelector(".cm-tooltip-arrow") : null, u = f ? 7 : 0, d = c.right - c.left, O = (e = fa.get(l)) !== null && e !== void 0 ? e : c.bottom - c.top, m = l.offset || ng, g = this.view.textDirection == N.LTR, S = c.width > i.right - i.left ? g ? i.left : i.right - c.width : g ? Math.min(h.left - (f ? 14 : 0) + m.x, i.right - d) : Math.max(i.left, h.left - d + (f ? 14 : 0) - m.x), b = !!o.above;
      !o.strictSide && (b ? h.top - (c.bottom - c.top) - m.y < i.top : h.bottom + (c.bottom - c.top) + m.y > i.bottom) && b == i.bottom - h.bottom > h.top - i.top && (b = !b);
      let v = (b ? h.top - i.top : i.bottom - h.bottom) - u;
      if (v < O && l.resize !== !1) {
        if (v < this.view.defaultLineHeight) {
          a.style.top = $n;
          continue;
        }
        fa.set(l, O), a.style.height = (O = v) + "px";
      } else
        a.style.height && (a.style.height = "");
      let Q = b ? h.top - O - u - m.y : h.bottom + u + m.y, x = S + d;
      if (l.overlap !== !0)
        for (let w of s)
          w.left < x && w.right > S && w.top < Q + O && w.bottom > Q && (Q = b ? w.top - O - 2 - u : w.bottom + u + 2);
      this.position == "absolute" ? (a.style.top = Q - n.parent.top + "px", a.style.left = S - n.parent.left + "px") : (a.style.top = Q + "px", a.style.left = S + "px"), f && (f.style.left = `${h.left + (g ? m.x : -m.x) - (S + 14 - 7)}px`), l.overlap !== !0 && s.push({ left: S, top: Q, right: x, bottom: Q + O }), a.classList.toggle("cm-tooltip-above", b), a.classList.toggle("cm-tooltip-below", !b), l.positioned && l.positioned(n.space);
    }
  }
  maybeMeasure() {
    if (this.manager.tooltips.length && (this.view.inView && this.view.requestMeasure(this.measureReq), this.inView != this.view.inView && (this.inView = this.view.inView, !this.inView)))
      for (let n of this.manager.tooltipViews)
        n.dom.style.top = $n;
  }
}, {
  eventHandlers: {
    scroll() {
      this.maybeMeasure();
    }
  }
}), ig = /* @__PURE__ */ k.baseTheme({
  ".cm-tooltip": {
    zIndex: 100,
    boxSizing: "border-box"
  },
  "&light .cm-tooltip": {
    border: "1px solid #bbb",
    backgroundColor: "#f5f5f5"
  },
  "&light .cm-tooltip-section:not(:first-child)": {
    borderTop: "1px solid #bbb"
  },
  "&dark .cm-tooltip": {
    backgroundColor: "#333338",
    color: "white"
  },
  ".cm-tooltip-arrow": {
    height: "7px",
    width: `${7 * 2}px`,
    position: "absolute",
    zIndex: -1,
    overflow: "hidden",
    "&:before, &:after": {
      content: "''",
      position: "absolute",
      width: 0,
      height: 0,
      borderLeft: "7px solid transparent",
      borderRight: "7px solid transparent"
    },
    ".cm-tooltip-above &": {
      bottom: "-7px",
      "&:before": {
        borderTop: "7px solid #bbb"
      },
      "&:after": {
        borderTop: "7px solid #f5f5f5",
        bottom: "1px"
      }
    },
    ".cm-tooltip-below &": {
      top: "-7px",
      "&:before": {
        borderBottom: "7px solid #bbb"
      },
      "&:after": {
        borderBottom: "7px solid #f5f5f5",
        top: "1px"
      }
    }
  },
  "&dark .cm-tooltip .cm-tooltip-arrow": {
    "&:before": {
      borderTopColor: "#333338",
      borderBottomColor: "#333338"
    },
    "&:after": {
      borderTopColor: "transparent",
      borderBottomColor: "transparent"
    }
  }
}), ng = { x: 0, y: 0 }, Do = /* @__PURE__ */ P.define({
  enables: [of, ig]
}), rs = /* @__PURE__ */ P.define();
class Uo {
  constructor(e) {
    this.view = e, this.mounted = !1, this.dom = document.createElement("div"), this.dom.classList.add("cm-tooltip-hover"), this.manager = new rf(e, rs, (t) => this.createHostedView(t));
  }
  // Needs to be static so that host tooltip instances always match
  static create(e) {
    return new Uo(e);
  }
  createHostedView(e) {
    let t = e.create(this.view);
    return t.dom.classList.add("cm-tooltip-section"), this.dom.appendChild(t.dom), this.mounted && t.mount && t.mount(this.view), t;
  }
  mount(e) {
    for (let t of this.manager.tooltipViews)
      t.mount && t.mount(e);
    this.mounted = !0;
  }
  positioned(e) {
    for (let t of this.manager.tooltipViews)
      t.positioned && t.positioned(e);
  }
  update(e) {
    this.manager.update(e);
  }
  destroy() {
    var e;
    for (let t of this.manager.tooltipViews)
      (e = t.destroy) === null || e === void 0 || e.call(t);
  }
}
const sg = /* @__PURE__ */ Do.compute([rs], (n) => {
  let e = n.facet(rs).filter((t) => t);
  return e.length === 0 ? null : {
    pos: Math.min(...e.map((t) => t.pos)),
    end: Math.max(...e.filter((t) => t.end != null).map((t) => t.end)),
    create: Uo.create,
    above: e[0].above,
    arrow: e.some((t) => t.arrow)
  };
});
class rg {
  constructor(e, t, i, s, r) {
    this.view = e, this.source = t, this.field = i, this.setHover = s, this.hoverTime = r, this.hoverTimeout = -1, this.restartTimeout = -1, this.pending = null, this.lastMove = { x: 0, y: 0, target: e.dom, time: 0 }, this.checkHover = this.checkHover.bind(this), e.dom.addEventListener("mouseleave", this.mouseleave = this.mouseleave.bind(this)), e.dom.addEventListener("mousemove", this.mousemove = this.mousemove.bind(this));
  }
  update() {
    this.pending && (this.pending = null, clearTimeout(this.restartTimeout), this.restartTimeout = setTimeout(() => this.startHover(), 20));
  }
  get active() {
    return this.view.state.field(this.field);
  }
  checkHover() {
    if (this.hoverTimeout = -1, this.active)
      return;
    let e = Date.now() - this.lastMove.time;
    e < this.hoverTime ? this.hoverTimeout = setTimeout(this.checkHover, this.hoverTime - e) : this.startHover();
  }
  startHover() {
    clearTimeout(this.restartTimeout);
    let { lastMove: e } = this, t = this.view.contentDOM.contains(e.target) ? this.view.posAtCoords(e) : null;
    if (t == null)
      return;
    let i = this.view.coordsAtPos(t);
    if (i == null || e.y < i.top || e.y > i.bottom || e.x < i.left - this.view.defaultCharacterWidth || e.x > i.right + this.view.defaultCharacterWidth)
      return;
    let s = this.view.bidiSpans(this.view.state.doc.lineAt(t)).find((l) => l.from <= t && l.to >= t), r = s && s.dir == N.RTL ? -1 : 1, o = this.source(this.view, t, e.x < i.left ? -r : r);
    if (o != null && o.then) {
      let l = this.pending = { pos: t };
      o.then((a) => {
        this.pending == l && (this.pending = null, a && this.view.dispatch({ effects: this.setHover.of(a) }));
      }, (a) => Ae(this.view.state, a, "hover tooltip"));
    } else
      o && this.view.dispatch({ effects: this.setHover.of(o) });
  }
  mousemove(e) {
    var t;
    this.lastMove = { x: e.clientX, y: e.clientY, target: e.target, time: Date.now() }, this.hoverTimeout < 0 && (this.hoverTimeout = setTimeout(this.checkHover, this.hoverTime));
    let i = this.active;
    if (i && !ua(this.lastMove.target) || this.pending) {
      let { pos: s } = i || this.pending, r = (t = i == null ? void 0 : i.end) !== null && t !== void 0 ? t : s;
      (s == r ? this.view.posAtCoords(this.lastMove) != s : !og(
        this.view,
        s,
        r,
        e.clientX,
        e.clientY,
        6
        /* MaxDist */
      )) && (this.view.dispatch({ effects: this.setHover.of(null) }), this.pending = null);
    }
  }
  mouseleave(e) {
    clearTimeout(this.hoverTimeout), this.hoverTimeout = -1, this.active && !ua(e.relatedTarget) && this.view.dispatch({ effects: this.setHover.of(null) });
  }
  destroy() {
    clearTimeout(this.hoverTimeout), this.view.dom.removeEventListener("mouseleave", this.mouseleave), this.view.dom.removeEventListener("mousemove", this.mousemove);
  }
}
function ua(n) {
  for (let e = n; e; e = e.parentNode)
    if (e.nodeType == 1 && e.classList.contains("cm-tooltip"))
      return !0;
  return !1;
}
function og(n, e, t, i, s, r) {
  let o = document.createRange(), l = n.domAtPos(e), a = n.domAtPos(t);
  o.setEnd(a.node, a.offset), o.setStart(l.node, l.offset);
  let h = o.getClientRects();
  o.detach();
  for (let c = 0; c < h.length; c++) {
    let f = h[c];
    if (Math.max(f.top - s, s - f.bottom, f.left - i, i - f.right) <= r)
      return !0;
  }
  return !1;
}
function lg(n, e = {}) {
  let t = R.define(), i = re.define({
    create() {
      return null;
    },
    update(s, r) {
      if (s && (e.hideOnChange && (r.docChanged || r.selection) || e.hideOn && e.hideOn(r, s)))
        return null;
      if (s && r.docChanged) {
        let o = r.changes.mapPos(s.pos, -1, ce.TrackDel);
        if (o == null)
          return null;
        let l = Object.assign(/* @__PURE__ */ Object.create(null), s);
        l.pos = o, s.end != null && (l.end = r.changes.mapPos(s.end)), s = l;
      }
      for (let o of r.effects)
        o.is(t) && (s = o.value), o.is(ag) && (s = null);
      return s;
    },
    provide: (s) => rs.from(s)
  });
  return [
    i,
    ee.define((s) => new rg(
      s,
      n,
      i,
      t,
      e.hoverTime || 300
      /* Time */
    )),
    sg
  ];
}
function lf(n, e) {
  let t = n.plugin(of);
  if (!t)
    return null;
  let i = t.manager.tooltips.indexOf(e);
  return i < 0 ? null : t.manager.tooltipViews[i];
}
const ag = /* @__PURE__ */ R.define(), da = /* @__PURE__ */ P.define({
  combine(n) {
    let e, t;
    for (let i of n)
      e = e || i.topContainer, t = t || i.bottomContainer;
    return { topContainer: e, bottomContainer: t };
  }
});
function Gi(n, e) {
  let t = n.plugin(af), i = t ? t.specs.indexOf(e) : -1;
  return i > -1 ? t.panels[i] : null;
}
const af = /* @__PURE__ */ ee.fromClass(class {
  constructor(n) {
    this.input = n.state.facet(fi), this.specs = this.input.filter((t) => t), this.panels = this.specs.map((t) => t(n));
    let e = n.state.facet(da);
    this.top = new kn(n, !0, e.topContainer), this.bottom = new kn(n, !1, e.bottomContainer), this.top.sync(this.panels.filter((t) => t.top)), this.bottom.sync(this.panels.filter((t) => !t.top));
    for (let t of this.panels)
      t.dom.classList.add("cm-panel"), t.mount && t.mount();
  }
  update(n) {
    let e = n.state.facet(da);
    this.top.container != e.topContainer && (this.top.sync([]), this.top = new kn(n.view, !0, e.topContainer)), this.bottom.container != e.bottomContainer && (this.bottom.sync([]), this.bottom = new kn(n.view, !1, e.bottomContainer)), this.top.syncClasses(), this.bottom.syncClasses();
    let t = n.state.facet(fi);
    if (t != this.input) {
      let i = t.filter((a) => a), s = [], r = [], o = [], l = [];
      for (let a of i) {
        let h = this.specs.indexOf(a), c;
        h < 0 ? (c = a(n.view), l.push(c)) : (c = this.panels[h], c.update && c.update(n)), s.push(c), (c.top ? r : o).push(c);
      }
      this.specs = i, this.panels = s, this.top.sync(r), this.bottom.sync(o);
      for (let a of l)
        a.dom.classList.add("cm-panel"), a.mount && a.mount();
    } else
      for (let i of this.panels)
        i.update && i.update(n);
  }
  destroy() {
    this.top.sync([]), this.bottom.sync([]);
  }
}, {
  provide: (n) => k.scrollMargins.of((e) => {
    let t = e.plugin(n);
    return t && { top: t.top.scrollMargin(), bottom: t.bottom.scrollMargin() };
  })
});
class kn {
  constructor(e, t, i) {
    this.view = e, this.top = t, this.container = i, this.dom = void 0, this.classes = "", this.panels = [], this.syncClasses();
  }
  sync(e) {
    for (let t of this.panels)
      t.destroy && e.indexOf(t) < 0 && t.destroy();
    this.panels = e, this.syncDOM();
  }
  syncDOM() {
    if (this.panels.length == 0) {
      this.dom && (this.dom.remove(), this.dom = void 0);
      return;
    }
    if (!this.dom) {
      this.dom = document.createElement("div"), this.dom.className = this.top ? "cm-panels cm-panels-top" : "cm-panels cm-panels-bottom", this.dom.style[this.top ? "top" : "bottom"] = "0";
      let t = this.container || this.view.dom;
      t.insertBefore(this.dom, this.top ? t.firstChild : null);
    }
    let e = this.dom.firstChild;
    for (let t of this.panels)
      if (t.dom.parentNode == this.dom) {
        for (; e != t.dom; )
          e = Oa(e);
        e = e.nextSibling;
      } else
        this.dom.insertBefore(t.dom, e);
    for (; e; )
      e = Oa(e);
  }
  scrollMargin() {
    return !this.dom || this.container ? 0 : Math.max(0, this.top ? this.dom.getBoundingClientRect().bottom - Math.max(0, this.view.scrollDOM.getBoundingClientRect().top) : Math.min(innerHeight, this.view.scrollDOM.getBoundingClientRect().bottom) - this.dom.getBoundingClientRect().top);
  }
  syncClasses() {
    if (!(!this.container || this.classes == this.view.themeClasses)) {
      for (let e of this.classes.split(" "))
        e && this.container.classList.remove(e);
      for (let e of (this.classes = this.view.themeClasses).split(" "))
        e && this.container.classList.add(e);
    }
  }
}
function Oa(n) {
  let e = n.nextSibling;
  return n.remove(), e;
}
const fi = /* @__PURE__ */ P.define({
  enables: af
});
class gt extends Bt {
  /**
  @internal
  */
  compare(e) {
    return this == e || this.constructor == e.constructor && this.eq(e);
  }
  /**
  Compare this marker to another marker of the same type.
  */
  eq(e) {
    return !1;
  }
  /**
  Called if the marker has a `toDOM` method and its representation
  was removed from a gutter.
  */
  destroy(e) {
  }
}
gt.prototype.elementClass = "";
gt.prototype.toDOM = void 0;
gt.prototype.mapMode = ce.TrackBefore;
gt.prototype.startSide = gt.prototype.endSide = -1;
gt.prototype.point = !0;
const Bn = /* @__PURE__ */ P.define(), hg = {
  class: "",
  renderEmptyElements: !1,
  elementStyle: "",
  markers: () => D.empty,
  lineMarker: () => null,
  widgetMarker: () => null,
  lineMarkerChange: null,
  initialSpacer: null,
  updateSpacer: null,
  domEventHandlers: {}
}, Ei = /* @__PURE__ */ P.define();
function cg(n) {
  return [hf(), Ei.of(Object.assign(Object.assign({}, hg), n))];
}
const ho = /* @__PURE__ */ P.define({
  combine: (n) => n.some((e) => e)
});
function hf(n) {
  let e = [
    fg
  ];
  return n && n.fixed === !1 && e.push(ho.of(!0)), e;
}
const fg = /* @__PURE__ */ ee.fromClass(class {
  constructor(n) {
    this.view = n, this.prevViewport = n.viewport, this.dom = document.createElement("div"), this.dom.className = "cm-gutters", this.dom.setAttribute("aria-hidden", "true"), this.dom.style.minHeight = this.view.contentHeight + "px", this.gutters = n.state.facet(Ei).map((e) => new ga(n, e));
    for (let e of this.gutters)
      this.dom.appendChild(e.dom);
    this.fixed = !n.state.facet(ho), this.fixed && (this.dom.style.position = "sticky"), this.syncGutters(!1), n.scrollDOM.insertBefore(this.dom, n.contentDOM);
  }
  update(n) {
    if (this.updateGutters(n)) {
      let e = this.prevViewport, t = n.view.viewport, i = Math.min(e.to, t.to) - Math.max(e.from, t.from);
      this.syncGutters(i < (t.to - t.from) * 0.8);
    }
    n.geometryChanged && (this.dom.style.minHeight = this.view.contentHeight + "px"), this.view.state.facet(ho) != !this.fixed && (this.fixed = !this.fixed, this.dom.style.position = this.fixed ? "sticky" : ""), this.prevViewport = n.view.viewport;
  }
  syncGutters(n) {
    let e = this.dom.nextSibling;
    n && this.dom.remove();
    let t = D.iter(this.view.state.facet(Bn), this.view.viewport.from), i = [], s = this.gutters.map((r) => new ug(r, this.view.viewport, -this.view.documentPadding.top));
    for (let r of this.view.viewportLineBlocks)
      if (i.length && (i = []), Array.isArray(r.type)) {
        let o = !0;
        for (let l of r.type)
          if (l.type == F.Text && o) {
            co(t, i, l.from);
            for (let a of s)
              a.line(this.view, l, i);
            o = !1;
          } else if (l.widget)
            for (let a of s)
              a.widget(this.view, l);
      } else if (r.type == F.Text) {
        co(t, i, r.from);
        for (let o of s)
          o.line(this.view, r, i);
      }
    for (let r of s)
      r.finish();
    n && this.view.scrollDOM.insertBefore(this.dom, e);
  }
  updateGutters(n) {
    let e = n.startState.facet(Ei), t = n.state.facet(Ei), i = n.docChanged || n.heightChanged || n.viewportChanged || !D.eq(n.startState.facet(Bn), n.state.facet(Bn), n.view.viewport.from, n.view.viewport.to);
    if (e == t)
      for (let s of this.gutters)
        s.update(n) && (i = !0);
    else {
      i = !0;
      let s = [];
      for (let r of t) {
        let o = e.indexOf(r);
        o < 0 ? s.push(new ga(this.view, r)) : (this.gutters[o].update(n), s.push(this.gutters[o]));
      }
      for (let r of this.gutters)
        r.dom.remove(), s.indexOf(r) < 0 && r.destroy();
      for (let r of s)
        this.dom.appendChild(r.dom);
      this.gutters = s;
    }
    return i;
  }
  destroy() {
    for (let n of this.gutters)
      n.destroy();
    this.dom.remove();
  }
}, {
  provide: (n) => k.scrollMargins.of((e) => {
    let t = e.plugin(n);
    return !t || t.gutters.length == 0 || !t.fixed ? null : e.textDirection == N.LTR ? { left: t.dom.offsetWidth } : { right: t.dom.offsetWidth };
  })
});
function pa(n) {
  return Array.isArray(n) ? n : [n];
}
function co(n, e, t) {
  for (; n.value && n.from <= t; )
    n.from == t && e.push(n.value), n.next();
}
class ug {
  constructor(e, t, i) {
    this.gutter = e, this.height = i, this.i = 0, this.cursor = D.iter(e.markers, t.from);
  }
  addElement(e, t, i) {
    let { gutter: s } = this, r = t.top - this.height;
    if (this.i == s.elements.length) {
      let o = new cf(e, t.height, r, i);
      s.elements.push(o), s.dom.appendChild(o.dom);
    } else
      s.elements[this.i].update(e, t.height, r, i);
    this.height = t.bottom, this.i++;
  }
  line(e, t, i) {
    let s = [];
    co(this.cursor, s, t.from), i.length && (s = s.concat(i));
    let r = this.gutter.config.lineMarker(e, t, s);
    r && s.unshift(r);
    let o = this.gutter;
    s.length == 0 && !o.config.renderEmptyElements || this.addElement(e, t, s);
  }
  widget(e, t) {
    let i = this.gutter.config.widgetMarker(e, t.widget, t);
    i && this.addElement(e, t, [i]);
  }
  finish() {
    let e = this.gutter;
    for (; e.elements.length > this.i; ) {
      let t = e.elements.pop();
      e.dom.removeChild(t.dom), t.destroy();
    }
  }
}
class ga {
  constructor(e, t) {
    this.view = e, this.config = t, this.elements = [], this.spacer = null, this.dom = document.createElement("div"), this.dom.className = "cm-gutter" + (this.config.class ? " " + this.config.class : "");
    for (let i in t.domEventHandlers)
      this.dom.addEventListener(i, (s) => {
        let r = s.target, o;
        if (r != this.dom && this.dom.contains(r)) {
          for (; r.parentNode != this.dom; )
            r = r.parentNode;
          let a = r.getBoundingClientRect();
          o = (a.top + a.bottom) / 2;
        } else
          o = s.clientY;
        let l = e.lineBlockAtHeight(o - e.documentTop);
        t.domEventHandlers[i](e, l, s) && s.preventDefault();
      });
    this.markers = pa(t.markers(e)), t.initialSpacer && (this.spacer = new cf(e, 0, 0, [t.initialSpacer(e)]), this.dom.appendChild(this.spacer.dom), this.spacer.dom.style.cssText += "visibility: hidden; pointer-events: none");
  }
  update(e) {
    let t = this.markers;
    if (this.markers = pa(this.config.markers(e.view)), this.spacer && this.config.updateSpacer) {
      let s = this.config.updateSpacer(this.spacer.markers[0], e);
      s != this.spacer.markers[0] && this.spacer.update(e.view, 0, 0, [s]);
    }
    let i = e.view.viewport;
    return !D.eq(this.markers, t, i.from, i.to) || (this.config.lineMarkerChange ? this.config.lineMarkerChange(e) : !1);
  }
  destroy() {
    for (let e of this.elements)
      e.destroy();
  }
}
class cf {
  constructor(e, t, i, s) {
    this.height = -1, this.above = 0, this.markers = [], this.dom = document.createElement("div"), this.dom.className = "cm-gutterElement", this.update(e, t, i, s);
  }
  update(e, t, i, s) {
    this.height != t && (this.dom.style.height = (this.height = t) + "px"), this.above != i && (this.dom.style.marginTop = (this.above = i) ? i + "px" : ""), dg(this.markers, s) || this.setMarkers(e, s);
  }
  setMarkers(e, t) {
    let i = "cm-gutterElement", s = this.dom.firstChild;
    for (let r = 0, o = 0; ; ) {
      let l = o, a = r < t.length ? t[r++] : null, h = !1;
      if (a) {
        let c = a.elementClass;
        c && (i += " " + c);
        for (let f = o; f < this.markers.length; f++)
          if (this.markers[f].compare(a)) {
            l = f, h = !0;
            break;
          }
      } else
        l = this.markers.length;
      for (; o < l; ) {
        let c = this.markers[o++];
        if (c.toDOM) {
          c.destroy(s);
          let f = s.nextSibling;
          s.remove(), s = f;
        }
      }
      if (!a)
        break;
      a.toDOM && (h ? s = s.nextSibling : this.dom.insertBefore(a.toDOM(e), s)), h && o++;
    }
    this.dom.className = i, this.markers = t;
  }
  destroy() {
    this.setMarkers(null, []);
  }
}
function dg(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (!n[t].compare(e[t]))
      return !1;
  return !0;
}
const Og = /* @__PURE__ */ P.define(), Kt = /* @__PURE__ */ P.define({
  combine(n) {
    return lt(n, { formatNumber: String, domEventHandlers: {} }, {
      domEventHandlers(e, t) {
        let i = Object.assign({}, e);
        for (let s in t) {
          let r = i[s], o = t[s];
          i[s] = r ? (l, a, h) => r(l, a, h) || o(l, a, h) : o;
        }
        return i;
      }
    });
  }
});
class or extends gt {
  constructor(e) {
    super(), this.number = e;
  }
  eq(e) {
    return this.number == e.number;
  }
  toDOM() {
    return document.createTextNode(this.number);
  }
}
function lr(n, e) {
  return n.state.facet(Kt).formatNumber(e, n.state);
}
const pg = /* @__PURE__ */ Ei.compute([Kt], (n) => ({
  class: "cm-lineNumbers",
  renderEmptyElements: !1,
  markers(e) {
    return e.state.facet(Og);
  },
  lineMarker(e, t, i) {
    return i.some((s) => s.toDOM) ? null : new or(lr(e, e.state.doc.lineAt(t.from).number));
  },
  widgetMarker: () => null,
  lineMarkerChange: (e) => e.startState.facet(Kt) != e.state.facet(Kt),
  initialSpacer(e) {
    return new or(lr(e, ma(e.state.doc.lines)));
  },
  updateSpacer(e, t) {
    let i = lr(t.view, ma(t.view.state.doc.lines));
    return i == e.number ? e : new or(i);
  },
  domEventHandlers: n.facet(Kt).domEventHandlers
}));
function gg(n = {}) {
  return [
    Kt.of(n),
    hf(),
    pg
  ];
}
function ma(n) {
  let e = 9;
  for (; e < n; )
    e = e * 10 + 9;
  return e;
}
const mg = /* @__PURE__ */ new class extends gt {
  constructor() {
    super(...arguments), this.elementClass = "cm-activeLineGutter";
  }
}(), Sg = /* @__PURE__ */ Bn.compute(["selection"], (n) => {
  let e = [], t = -1;
  for (let i of n.selection.ranges) {
    let s = n.doc.lineAt(i.head).from;
    s > t && (t = s, e.push(mg.range(s)));
  }
  return D.of(e);
});
function yg() {
  return Sg;
}
const ff = 1024;
let bg = 0;
class Me {
  constructor(e, t) {
    this.from = e, this.to = t;
  }
}
class A {
  /// Create a new node prop type.
  constructor(e = {}) {
    this.id = bg++, this.perNode = !!e.perNode, this.deserialize = e.deserialize || (() => {
      throw new Error("This node type doesn't define a deserialize function");
    });
  }
  /// This is meant to be used with
  /// [`NodeSet.extend`](#common.NodeSet.extend) or
  /// [`LRParser.configure`](#lr.ParserConfig.props) to compute
  /// prop values for each node type in the set. Takes a [match
  /// object](#common.NodeType^match) or function that returns undefined
  /// if the node type doesn't get this prop, and the prop's value if
  /// it does.
  add(e) {
    if (this.perNode)
      throw new RangeError("Can't add per-node props to node types");
    return typeof e != "function" && (e = be.match(e)), (t) => {
      let i = e(t);
      return i === void 0 ? null : [this, i];
    };
  }
}
A.closedBy = new A({ deserialize: (n) => n.split(" ") });
A.openedBy = new A({ deserialize: (n) => n.split(" ") });
A.group = new A({ deserialize: (n) => n.split(" ") });
A.contextHash = new A({ perNode: !0 });
A.lookAhead = new A({ perNode: !0 });
A.mounted = new A({ perNode: !0 });
class Qg {
  constructor(e, t, i) {
    this.tree = e, this.overlay = t, this.parser = i;
  }
}
const xg = /* @__PURE__ */ Object.create(null);
class be {
  /// @internal
  constructor(e, t, i, s = 0) {
    this.name = e, this.props = t, this.id = i, this.flags = s;
  }
  /// Define a node type.
  static define(e) {
    let t = e.props && e.props.length ? /* @__PURE__ */ Object.create(null) : xg, i = (e.top ? 1 : 0) | (e.skipped ? 2 : 0) | (e.error ? 4 : 0) | (e.name == null ? 8 : 0), s = new be(e.name || "", t, e.id, i);
    if (e.props) {
      for (let r of e.props)
        if (Array.isArray(r) || (r = r(s)), r) {
          if (r[0].perNode)
            throw new RangeError("Can't store a per-node prop on a node type");
          t[r[0].id] = r[1];
        }
    }
    return s;
  }
  /// Retrieves a node prop for this type. Will return `undefined` if
  /// the prop isn't present on this node.
  prop(e) {
    return this.props[e.id];
  }
  /// True when this is the top node of a grammar.
  get isTop() {
    return (this.flags & 1) > 0;
  }
  /// True when this node is produced by a skip rule.
  get isSkipped() {
    return (this.flags & 2) > 0;
  }
  /// Indicates whether this is an error node.
  get isError() {
    return (this.flags & 4) > 0;
  }
  /// When true, this node type doesn't correspond to a user-declared
  /// named node, for example because it is used to cache repetition.
  get isAnonymous() {
    return (this.flags & 8) > 0;
  }
  /// Returns true when this node's name or one of its
  /// [groups](#common.NodeProp^group) matches the given string.
  is(e) {
    if (typeof e == "string") {
      if (this.name == e)
        return !0;
      let t = this.prop(A.group);
      return t ? t.indexOf(e) > -1 : !1;
    }
    return this.id == e;
  }
  /// Create a function from node types to arbitrary values by
  /// specifying an object whose property names are node or
  /// [group](#common.NodeProp^group) names. Often useful with
  /// [`NodeProp.add`](#common.NodeProp.add). You can put multiple
  /// names, separated by spaces, in a single property name to map
  /// multiple node names to a single value.
  static match(e) {
    let t = /* @__PURE__ */ Object.create(null);
    for (let i in e)
      for (let s of i.split(" "))
        t[s] = e[i];
    return (i) => {
      for (let s = i.prop(A.group), r = -1; r < (s ? s.length : 0); r++) {
        let o = t[r < 0 ? i.name : s[r]];
        if (o)
          return o;
      }
    };
  }
}
be.none = new be(
  "",
  /* @__PURE__ */ Object.create(null),
  0,
  8
  /* NodeFlag.Anonymous */
);
class qo {
  /// Create a set with the given types. The `id` property of each
  /// type should correspond to its position within the array.
  constructor(e) {
    this.types = e;
    for (let t = 0; t < e.length; t++)
      if (e[t].id != t)
        throw new RangeError("Node type ids should correspond to array positions when creating a node set");
  }
  /// Create a copy of this set with some node properties added. The
  /// arguments to this method can be created with
  /// [`NodeProp.add`](#common.NodeProp.add).
  extend(...e) {
    let t = [];
    for (let i of this.types) {
      let s = null;
      for (let r of e) {
        let o = r(i);
        o && (s || (s = Object.assign({}, i.props)), s[o[0].id] = o[1]);
      }
      t.push(s ? new be(i.name, s, i.id, i.flags) : i);
    }
    return new qo(t);
  }
}
const vn = /* @__PURE__ */ new WeakMap(), Sa = /* @__PURE__ */ new WeakMap();
var E;
(function(n) {
  n[n.ExcludeBuffers = 1] = "ExcludeBuffers", n[n.IncludeAnonymous = 2] = "IncludeAnonymous", n[n.IgnoreMounts = 4] = "IgnoreMounts", n[n.IgnoreOverlays = 8] = "IgnoreOverlays";
})(E || (E = {}));
class G {
  /// Construct a new tree. See also [`Tree.build`](#common.Tree^build).
  constructor(e, t, i, s, r) {
    if (this.type = e, this.children = t, this.positions = i, this.length = s, this.props = null, r && r.length) {
      this.props = /* @__PURE__ */ Object.create(null);
      for (let [o, l] of r)
        this.props[typeof o == "number" ? o : o.id] = l;
    }
  }
  /// @internal
  toString() {
    let e = this.prop(A.mounted);
    if (e && !e.overlay)
      return e.tree.toString();
    let t = "";
    for (let i of this.children) {
      let s = i.toString();
      s && (t && (t += ","), t += s);
    }
    return this.type.name ? (/\W/.test(this.type.name) && !this.type.isError ? JSON.stringify(this.type.name) : this.type.name) + (t.length ? "(" + t + ")" : "") : t;
  }
  /// Get a [tree cursor](#common.TreeCursor) positioned at the top of
  /// the tree. Mode can be used to [control](#common.IterMode) which
  /// nodes the cursor visits.
  cursor(e = 0) {
    return new Fi(this.topNode, e);
  }
  /// Get a [tree cursor](#common.TreeCursor) pointing into this tree
  /// at the given position and side (see
  /// [`moveTo`](#common.TreeCursor.moveTo).
  cursorAt(e, t = 0, i = 0) {
    let s = vn.get(this) || this.topNode, r = new Fi(s);
    return r.moveTo(e, t), vn.set(this, r._tree), r;
  }
  /// Get a [syntax node](#common.SyntaxNode) object for the top of the
  /// tree.
  get topNode() {
    return new Ue(this, 0, 0, null);
  }
  /// Get the [syntax node](#common.SyntaxNode) at the given position.
  /// If `side` is -1, this will move into nodes that end at the
  /// position. If 1, it'll move into nodes that start at the
  /// position. With 0, it'll only enter nodes that cover the position
  /// from both sides.
  ///
  /// Note that this will not enter
  /// [overlays](#common.MountedTree.overlay), and you often want
  /// [`resolveInner`](#common.Tree.resolveInner) instead.
  resolve(e, t = 0) {
    let i = ui(vn.get(this) || this.topNode, e, t, !1);
    return vn.set(this, i), i;
  }
  /// Like [`resolve`](#common.Tree.resolve), but will enter
  /// [overlaid](#common.MountedTree.overlay) nodes, producing a syntax node
  /// pointing into the innermost overlaid tree at the given position
  /// (with parent links going through all parent structure, including
  /// the host trees).
  resolveInner(e, t = 0) {
    let i = ui(Sa.get(this) || this.topNode, e, t, !0);
    return Sa.set(this, i), i;
  }
  /// Iterate over the tree and its children, calling `enter` for any
  /// node that touches the `from`/`to` region (if given) before
  /// running over such a node's children, and `leave` (if given) when
  /// leaving the node. When `enter` returns `false`, that node will
  /// not have its children iterated over (or `leave` called).
  iterate(e) {
    let { enter: t, leave: i, from: s = 0, to: r = this.length } = e, o = e.mode || 0, l = (o & E.IncludeAnonymous) > 0;
    for (let a = this.cursor(o | E.IncludeAnonymous); ; ) {
      let h = !1;
      if (a.from <= r && a.to >= s && (!l && a.type.isAnonymous || t(a) !== !1)) {
        if (a.firstChild())
          continue;
        h = !0;
      }
      for (; h && i && (l || !a.type.isAnonymous) && i(a), !a.nextSibling(); ) {
        if (!a.parent())
          return;
        h = !0;
      }
    }
  }
  /// Get the value of the given [node prop](#common.NodeProp) for this
  /// node. Works with both per-node and per-type props.
  prop(e) {
    return e.perNode ? this.props ? this.props[e.id] : void 0 : this.type.prop(e);
  }
  /// Returns the node's [per-node props](#common.NodeProp.perNode) in a
  /// format that can be passed to the [`Tree`](#common.Tree)
  /// constructor.
  get propValues() {
    let e = [];
    if (this.props)
      for (let t in this.props)
        e.push([+t, this.props[t]]);
    return e;
  }
  /// Balance the direct children of this tree, producing a copy of
  /// which may have children grouped into subtrees with type
  /// [`NodeType.none`](#common.NodeType^none).
  balance(e = {}) {
    return this.children.length <= 8 ? this : Bo(be.none, this.children, this.positions, 0, this.children.length, 0, this.length, (t, i, s) => new G(this.type, t, i, s, this.propValues), e.makeTree || ((t, i, s) => new G(be.none, t, i, s)));
  }
  /// Build a tree from a postfix-ordered buffer of node information,
  /// or a cursor over such a buffer.
  static build(e) {
    return $g(e);
  }
}
G.empty = new G(be.none, [], [], 0);
class Eo {
  constructor(e, t) {
    this.buffer = e, this.index = t;
  }
  get id() {
    return this.buffer[this.index - 4];
  }
  get start() {
    return this.buffer[this.index - 3];
  }
  get end() {
    return this.buffer[this.index - 2];
  }
  get size() {
    return this.buffer[this.index - 1];
  }
  get pos() {
    return this.index;
  }
  next() {
    this.index -= 4;
  }
  fork() {
    return new Eo(this.buffer, this.index);
  }
}
class Lt {
  /// Create a tree buffer.
  constructor(e, t, i) {
    this.buffer = e, this.length = t, this.set = i;
  }
  /// @internal
  get type() {
    return be.none;
  }
  /// @internal
  toString() {
    let e = [];
    for (let t = 0; t < this.buffer.length; )
      e.push(this.childString(t)), t = this.buffer[t + 3];
    return e.join(",");
  }
  /// @internal
  childString(e) {
    let t = this.buffer[e], i = this.buffer[e + 3], s = this.set.types[t], r = s.name;
    if (/\W/.test(r) && !s.isError && (r = JSON.stringify(r)), e += 4, i == e)
      return r;
    let o = [];
    for (; e < i; )
      o.push(this.childString(e)), e = this.buffer[e + 3];
    return r + "(" + o.join(",") + ")";
  }
  /// @internal
  findChild(e, t, i, s, r) {
    let { buffer: o } = this, l = -1;
    for (let a = e; a != t && !(uf(r, s, o[a + 1], o[a + 2]) && (l = a, i > 0)); a = o[a + 3])
      ;
    return l;
  }
  /// @internal
  slice(e, t, i) {
    let s = this.buffer, r = new Uint16Array(t - e), o = 0;
    for (let l = e, a = 0; l < t; ) {
      r[a++] = s[l++], r[a++] = s[l++] - i;
      let h = r[a++] = s[l++] - i;
      r[a++] = s[l++] - e, o = Math.max(o, h);
    }
    return new Lt(r, o, this.set);
  }
}
function uf(n, e, t, i) {
  switch (n) {
    case -2:
      return t < e;
    case -1:
      return i >= e && t < e;
    case 0:
      return t < e && i > e;
    case 1:
      return t <= e && i > e;
    case 2:
      return i > e;
    case 4:
      return !0;
  }
}
function df(n, e) {
  let t = n.childBefore(e);
  for (; t; ) {
    let i = t.lastChild;
    if (!i || i.to != t.to)
      break;
    i.type.isError && i.from == i.to ? (n = t, t = i.prevSibling) : t = i;
  }
  return n;
}
function ui(n, e, t, i) {
  for (var s; n.from == n.to || (t < 1 ? n.from >= e : n.from > e) || (t > -1 ? n.to <= e : n.to < e); ) {
    let o = !i && n instanceof Ue && n.index < 0 ? null : n.parent;
    if (!o)
      return n;
    n = o;
  }
  let r = i ? 0 : E.IgnoreOverlays;
  if (i)
    for (let o = n, l = o.parent; l; o = l, l = o.parent)
      o instanceof Ue && o.index < 0 && ((s = l.enter(e, t, r)) === null || s === void 0 ? void 0 : s.from) != o.from && (n = l);
  for (; ; ) {
    let o = n.enter(e, t, r);
    if (!o)
      return n;
    n = o;
  }
}
class Ue {
  constructor(e, t, i, s) {
    this._tree = e, this.from = t, this.index = i, this._parent = s;
  }
  get type() {
    return this._tree.type;
  }
  get name() {
    return this._tree.type.name;
  }
  get to() {
    return this.from + this._tree.length;
  }
  nextChild(e, t, i, s, r = 0) {
    for (let o = this; ; ) {
      for (let { children: l, positions: a } = o._tree, h = t > 0 ? l.length : -1; e != h; e += t) {
        let c = l[e], f = a[e] + o.from;
        if (uf(s, i, f, f + c.length)) {
          if (c instanceof Lt) {
            if (r & E.ExcludeBuffers)
              continue;
            let u = c.findChild(0, c.buffer.length, t, i - f, s);
            if (u > -1)
              return new it(new wg(o, c, e, f), null, u);
          } else if (r & E.IncludeAnonymous || !c.type.isAnonymous || _o(c)) {
            let u;
            if (!(r & E.IgnoreMounts) && c.props && (u = c.prop(A.mounted)) && !u.overlay)
              return new Ue(u.tree, f, e, o);
            let d = new Ue(c, f, e, o);
            return r & E.IncludeAnonymous || !d.type.isAnonymous ? d : d.nextChild(t < 0 ? c.children.length - 1 : 0, t, i, s);
          }
        }
      }
      if (r & E.IncludeAnonymous || !o.type.isAnonymous || (o.index >= 0 ? e = o.index + t : e = t < 0 ? -1 : o._parent._tree.children.length, o = o._parent, !o))
        return null;
    }
  }
  get firstChild() {
    return this.nextChild(
      0,
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  get lastChild() {
    return this.nextChild(
      this._tree.children.length - 1,
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  childAfter(e) {
    return this.nextChild(
      0,
      1,
      e,
      2
      /* Side.After */
    );
  }
  childBefore(e) {
    return this.nextChild(
      this._tree.children.length - 1,
      -1,
      e,
      -2
      /* Side.Before */
    );
  }
  enter(e, t, i = 0) {
    let s;
    if (!(i & E.IgnoreOverlays) && (s = this._tree.prop(A.mounted)) && s.overlay) {
      let r = e - this.from;
      for (let { from: o, to: l } of s.overlay)
        if ((t > 0 ? o <= r : o < r) && (t < 0 ? l >= r : l > r))
          return new Ue(s.tree, s.overlay[0].from + this.from, -1, this);
    }
    return this.nextChild(0, 1, e, t, i);
  }
  nextSignificantParent() {
    let e = this;
    for (; e.type.isAnonymous && e._parent; )
      e = e._parent;
    return e;
  }
  get parent() {
    return this._parent ? this._parent.nextSignificantParent() : null;
  }
  get nextSibling() {
    return this._parent && this.index >= 0 ? this._parent.nextChild(
      this.index + 1,
      1,
      0,
      4
      /* Side.DontCare */
    ) : null;
  }
  get prevSibling() {
    return this._parent && this.index >= 0 ? this._parent.nextChild(
      this.index - 1,
      -1,
      0,
      4
      /* Side.DontCare */
    ) : null;
  }
  cursor(e = 0) {
    return new Fi(this, e);
  }
  get tree() {
    return this._tree;
  }
  toTree() {
    return this._tree;
  }
  resolve(e, t = 0) {
    return ui(this, e, t, !1);
  }
  resolveInner(e, t = 0) {
    return ui(this, e, t, !0);
  }
  enterUnfinishedNodesBefore(e) {
    return df(this, e);
  }
  getChild(e, t = null, i = null) {
    let s = os(this, e, t, i);
    return s.length ? s[0] : null;
  }
  getChildren(e, t = null, i = null) {
    return os(this, e, t, i);
  }
  /// @internal
  toString() {
    return this._tree.toString();
  }
  get node() {
    return this;
  }
  matchContext(e) {
    return ls(this, e);
  }
}
function os(n, e, t, i) {
  let s = n.cursor(), r = [];
  if (!s.firstChild())
    return r;
  if (t != null) {
    for (; !s.type.is(t); )
      if (!s.nextSibling())
        return r;
  }
  for (; ; ) {
    if (i != null && s.type.is(i))
      return r;
    if (s.type.is(e) && r.push(s.node), !s.nextSibling())
      return i == null ? r : [];
  }
}
function ls(n, e, t = e.length - 1) {
  for (let i = n.parent; t >= 0; i = i.parent) {
    if (!i)
      return !1;
    if (!i.type.isAnonymous) {
      if (e[t] && e[t] != i.name)
        return !1;
      t--;
    }
  }
  return !0;
}
class wg {
  constructor(e, t, i, s) {
    this.parent = e, this.buffer = t, this.index = i, this.start = s;
  }
}
class it {
  get name() {
    return this.type.name;
  }
  get from() {
    return this.context.start + this.context.buffer.buffer[this.index + 1];
  }
  get to() {
    return this.context.start + this.context.buffer.buffer[this.index + 2];
  }
  constructor(e, t, i) {
    this.context = e, this._parent = t, this.index = i, this.type = e.buffer.set.types[e.buffer.buffer[i]];
  }
  child(e, t, i) {
    let { buffer: s } = this.context, r = s.findChild(this.index + 4, s.buffer[this.index + 3], e, t - this.context.start, i);
    return r < 0 ? null : new it(this.context, this, r);
  }
  get firstChild() {
    return this.child(
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  get lastChild() {
    return this.child(
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  childAfter(e) {
    return this.child(
      1,
      e,
      2
      /* Side.After */
    );
  }
  childBefore(e) {
    return this.child(
      -1,
      e,
      -2
      /* Side.Before */
    );
  }
  enter(e, t, i = 0) {
    if (i & E.ExcludeBuffers)
      return null;
    let { buffer: s } = this.context, r = s.findChild(this.index + 4, s.buffer[this.index + 3], t > 0 ? 1 : -1, e - this.context.start, t);
    return r < 0 ? null : new it(this.context, this, r);
  }
  get parent() {
    return this._parent || this.context.parent.nextSignificantParent();
  }
  externalSibling(e) {
    return this._parent ? null : this.context.parent.nextChild(
      this.context.index + e,
      e,
      0,
      4
      /* Side.DontCare */
    );
  }
  get nextSibling() {
    let { buffer: e } = this.context, t = e.buffer[this.index + 3];
    return t < (this._parent ? e.buffer[this._parent.index + 3] : e.buffer.length) ? new it(this.context, this._parent, t) : this.externalSibling(1);
  }
  get prevSibling() {
    let { buffer: e } = this.context, t = this._parent ? this._parent.index + 4 : 0;
    return this.index == t ? this.externalSibling(-1) : new it(this.context, this._parent, e.findChild(
      t,
      this.index,
      -1,
      0,
      4
      /* Side.DontCare */
    ));
  }
  cursor(e = 0) {
    return new Fi(this, e);
  }
  get tree() {
    return null;
  }
  toTree() {
    let e = [], t = [], { buffer: i } = this.context, s = this.index + 4, r = i.buffer[this.index + 3];
    if (r > s) {
      let o = i.buffer[this.index + 1];
      e.push(i.slice(s, r, o)), t.push(0);
    }
    return new G(this.type, e, t, this.to - this.from);
  }
  resolve(e, t = 0) {
    return ui(this, e, t, !1);
  }
  resolveInner(e, t = 0) {
    return ui(this, e, t, !0);
  }
  enterUnfinishedNodesBefore(e) {
    return df(this, e);
  }
  /// @internal
  toString() {
    return this.context.buffer.childString(this.index);
  }
  getChild(e, t = null, i = null) {
    let s = os(this, e, t, i);
    return s.length ? s[0] : null;
  }
  getChildren(e, t = null, i = null) {
    return os(this, e, t, i);
  }
  get node() {
    return this;
  }
  matchContext(e) {
    return ls(this, e);
  }
}
class Fi {
  /// Shorthand for `.type.name`.
  get name() {
    return this.type.name;
  }
  /// @internal
  constructor(e, t = 0) {
    if (this.mode = t, this.buffer = null, this.stack = [], this.index = 0, this.bufferNode = null, e instanceof Ue)
      this.yieldNode(e);
    else {
      this._tree = e.context.parent, this.buffer = e.context;
      for (let i = e._parent; i; i = i._parent)
        this.stack.unshift(i.index);
      this.bufferNode = e, this.yieldBuf(e.index);
    }
  }
  yieldNode(e) {
    return e ? (this._tree = e, this.type = e.type, this.from = e.from, this.to = e.to, !0) : !1;
  }
  yieldBuf(e, t) {
    this.index = e;
    let { start: i, buffer: s } = this.buffer;
    return this.type = t || s.set.types[s.buffer[e]], this.from = i + s.buffer[e + 1], this.to = i + s.buffer[e + 2], !0;
  }
  yield(e) {
    return e ? e instanceof Ue ? (this.buffer = null, this.yieldNode(e)) : (this.buffer = e.context, this.yieldBuf(e.index, e.type)) : !1;
  }
  /// @internal
  toString() {
    return this.buffer ? this.buffer.buffer.childString(this.index) : this._tree.toString();
  }
  /// @internal
  enterChild(e, t, i) {
    if (!this.buffer)
      return this.yield(this._tree.nextChild(e < 0 ? this._tree._tree.children.length - 1 : 0, e, t, i, this.mode));
    let { buffer: s } = this.buffer, r = s.findChild(this.index + 4, s.buffer[this.index + 3], e, t - this.buffer.start, i);
    return r < 0 ? !1 : (this.stack.push(this.index), this.yieldBuf(r));
  }
  /// Move the cursor to this node's first child. When this returns
  /// false, the node has no child, and the cursor has not been moved.
  firstChild() {
    return this.enterChild(
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  /// Move the cursor to this node's last child.
  lastChild() {
    return this.enterChild(
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  /// Move the cursor to the first child that ends after `pos`.
  childAfter(e) {
    return this.enterChild(
      1,
      e,
      2
      /* Side.After */
    );
  }
  /// Move to the last child that starts before `pos`.
  childBefore(e) {
    return this.enterChild(
      -1,
      e,
      -2
      /* Side.Before */
    );
  }
  /// Move the cursor to the child around `pos`. If side is -1 the
  /// child may end at that position, when 1 it may start there. This
  /// will also enter [overlaid](#common.MountedTree.overlay)
  /// [mounted](#common.NodeProp^mounted) trees unless `overlays` is
  /// set to false.
  enter(e, t, i = this.mode) {
    return this.buffer ? i & E.ExcludeBuffers ? !1 : this.enterChild(1, e, t) : this.yield(this._tree.enter(e, t, i));
  }
  /// Move to the node's parent node, if this isn't the top node.
  parent() {
    if (!this.buffer)
      return this.yieldNode(this.mode & E.IncludeAnonymous ? this._tree._parent : this._tree.parent);
    if (this.stack.length)
      return this.yieldBuf(this.stack.pop());
    let e = this.mode & E.IncludeAnonymous ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
    return this.buffer = null, this.yieldNode(e);
  }
  /// @internal
  sibling(e) {
    if (!this.buffer)
      return this._tree._parent ? this.yield(this._tree.index < 0 ? null : this._tree._parent.nextChild(this._tree.index + e, e, 0, 4, this.mode)) : !1;
    let { buffer: t } = this.buffer, i = this.stack.length - 1;
    if (e < 0) {
      let s = i < 0 ? 0 : this.stack[i] + 4;
      if (this.index != s)
        return this.yieldBuf(t.findChild(
          s,
          this.index,
          -1,
          0,
          4
          /* Side.DontCare */
        ));
    } else {
      let s = t.buffer[this.index + 3];
      if (s < (i < 0 ? t.buffer.length : t.buffer[this.stack[i] + 3]))
        return this.yieldBuf(s);
    }
    return i < 0 ? this.yield(this.buffer.parent.nextChild(this.buffer.index + e, e, 0, 4, this.mode)) : !1;
  }
  /// Move to this node's next sibling, if any.
  nextSibling() {
    return this.sibling(1);
  }
  /// Move to this node's previous sibling, if any.
  prevSibling() {
    return this.sibling(-1);
  }
  atLastNode(e) {
    let t, i, { buffer: s } = this;
    if (s) {
      if (e > 0) {
        if (this.index < s.buffer.buffer.length)
          return !1;
      } else
        for (let r = 0; r < this.index; r++)
          if (s.buffer.buffer[r + 3] < this.index)
            return !1;
      ({ index: t, parent: i } = s);
    } else
      ({ index: t, _parent: i } = this._tree);
    for (; i; { index: t, _parent: i } = i)
      if (t > -1)
        for (let r = t + e, o = e < 0 ? -1 : i._tree.children.length; r != o; r += e) {
          let l = i._tree.children[r];
          if (this.mode & E.IncludeAnonymous || l instanceof Lt || !l.type.isAnonymous || _o(l))
            return !1;
        }
    return !0;
  }
  move(e, t) {
    if (t && this.enterChild(
      e,
      0,
      4
      /* Side.DontCare */
    ))
      return !0;
    for (; ; ) {
      if (this.sibling(e))
        return !0;
      if (this.atLastNode(e) || !this.parent())
        return !1;
    }
  }
  /// Move to the next node in a
  /// [pre-order](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR)
  /// traversal, going from a node to its first child or, if the
  /// current node is empty or `enter` is false, its next sibling or
  /// the next sibling of the first parent node that has one.
  next(e = !0) {
    return this.move(1, e);
  }
  /// Move to the next node in a last-to-first pre-order traveral. A
  /// node is followed by its last child or, if it has none, its
  /// previous sibling or the previous sibling of the first parent
  /// node that has one.
  prev(e = !0) {
    return this.move(-1, e);
  }
  /// Move the cursor to the innermost node that covers `pos`. If
  /// `side` is -1, it will enter nodes that end at `pos`. If it is 1,
  /// it will enter nodes that start at `pos`.
  moveTo(e, t = 0) {
    for (; (this.from == this.to || (t < 1 ? this.from >= e : this.from > e) || (t > -1 ? this.to <= e : this.to < e)) && this.parent(); )
      ;
    for (; this.enterChild(1, e, t); )
      ;
    return this;
  }
  /// Get a [syntax node](#common.SyntaxNode) at the cursor's current
  /// position.
  get node() {
    if (!this.buffer)
      return this._tree;
    let e = this.bufferNode, t = null, i = 0;
    if (e && e.context == this.buffer)
      e:
        for (let s = this.index, r = this.stack.length; r >= 0; ) {
          for (let o = e; o; o = o._parent)
            if (o.index == s) {
              if (s == this.index)
                return o;
              t = o, i = r + 1;
              break e;
            }
          s = this.stack[--r];
        }
    for (let s = i; s < this.stack.length; s++)
      t = new it(this.buffer, t, this.stack[s]);
    return this.bufferNode = new it(this.buffer, t, this.index);
  }
  /// Get the [tree](#common.Tree) that represents the current node, if
  /// any. Will return null when the node is in a [tree
  /// buffer](#common.TreeBuffer).
  get tree() {
    return this.buffer ? null : this._tree._tree;
  }
  /// Iterate over the current node and all its descendants, calling
  /// `enter` when entering a node and `leave`, if given, when leaving
  /// one. When `enter` returns `false`, any children of that node are
  /// skipped, and `leave` isn't called for it.
  iterate(e, t) {
    for (let i = 0; ; ) {
      let s = !1;
      if (this.type.isAnonymous || e(this) !== !1) {
        if (this.firstChild()) {
          i++;
          continue;
        }
        this.type.isAnonymous || (s = !0);
      }
      for (; s && t && t(this), s = this.type.isAnonymous, !this.nextSibling(); ) {
        if (!i)
          return;
        this.parent(), i--, s = !0;
      }
    }
  }
  /// Test whether the current node matches a given context—a sequence
  /// of direct parent node names. Empty strings in the context array
  /// are treated as wildcards.
  matchContext(e) {
    if (!this.buffer)
      return ls(this.node, e);
    let { buffer: t } = this.buffer, { types: i } = t.set;
    for (let s = e.length - 1, r = this.stack.length - 1; s >= 0; r--) {
      if (r < 0)
        return ls(this.node, e, s);
      let o = i[t.buffer[this.stack[r]]];
      if (!o.isAnonymous) {
        if (e[s] && e[s] != o.name)
          return !1;
        s--;
      }
    }
    return !0;
  }
}
function _o(n) {
  return n.children.some((e) => e instanceof Lt || !e.type.isAnonymous || _o(e));
}
function $g(n) {
  var e;
  let { buffer: t, nodeSet: i, maxBufferLength: s = ff, reused: r = [], minRepeatType: o = i.types.length } = n, l = Array.isArray(t) ? new Eo(t, t.length) : t, a = i.types, h = 0, c = 0;
  function f(Q, x, w, Z, U) {
    let { id: V, start: Y, end: B, size: te } = l, fe = c;
    for (; te < 0; )
      if (l.next(), te == -1) {
        let xe = r[V];
        w.push(xe), Z.push(Y - Q);
        return;
      } else if (te == -3) {
        h = V;
        return;
      } else if (te == -4) {
        c = V;
        return;
      } else
        throw new RangeError(`Unrecognized record size: ${te}`);
    let Qe = a[V], oe, ue, je = Y - Q;
    if (B - Y <= s && (ue = m(l.pos - x, U))) {
      let xe = new Uint16Array(ue.size - ue.skip), H = l.pos - ue.size, ie = xe.length;
      for (; l.pos > H; )
        ie = g(ue.start, xe, ie);
      oe = new Lt(xe, B - ue.start, i), je = ue.start - Q;
    } else {
      let xe = l.pos - te;
      l.next();
      let H = [], ie = [], Vt = V >= o ? V : -1, Nt = 0, un = B;
      for (; l.pos > xe; )
        Vt >= 0 && l.id == Vt && l.size >= 0 ? (l.end <= un - s && (d(H, ie, Y, Nt, l.end, un, Vt, fe), Nt = H.length, un = l.end), l.next()) : f(Y, xe, H, ie, Vt);
      if (Vt >= 0 && Nt > 0 && Nt < H.length && d(H, ie, Y, Nt, Y, un, Vt, fe), H.reverse(), ie.reverse(), Vt > -1 && Nt > 0) {
        let ul = u(Qe);
        oe = Bo(Qe, H, ie, 0, H.length, 0, B - Y, ul, ul);
      } else
        oe = O(Qe, H, ie, B - Y, fe - B);
    }
    w.push(oe), Z.push(je);
  }
  function u(Q) {
    return (x, w, Z) => {
      let U = 0, V = x.length - 1, Y, B;
      if (V >= 0 && (Y = x[V]) instanceof G) {
        if (!V && Y.type == Q && Y.length == Z)
          return Y;
        (B = Y.prop(A.lookAhead)) && (U = w[V] + Y.length + B);
      }
      return O(Q, x, w, Z, U);
    };
  }
  function d(Q, x, w, Z, U, V, Y, B) {
    let te = [], fe = [];
    for (; Q.length > Z; )
      te.push(Q.pop()), fe.push(x.pop() + w - U);
    Q.push(O(i.types[Y], te, fe, V - U, B - V)), x.push(U - w);
  }
  function O(Q, x, w, Z, U = 0, V) {
    if (h) {
      let Y = [A.contextHash, h];
      V = V ? [Y].concat(V) : [Y];
    }
    if (U > 25) {
      let Y = [A.lookAhead, U];
      V = V ? [Y].concat(V) : [Y];
    }
    return new G(Q, x, w, Z, V);
  }
  function m(Q, x) {
    let w = l.fork(), Z = 0, U = 0, V = 0, Y = w.end - s, B = { size: 0, start: 0, skip: 0 };
    e:
      for (let te = w.pos - Q; w.pos > te; ) {
        let fe = w.size;
        if (w.id == x && fe >= 0) {
          B.size = Z, B.start = U, B.skip = V, V += 4, Z += 4, w.next();
          continue;
        }
        let Qe = w.pos - fe;
        if (fe < 0 || Qe < te || w.start < Y)
          break;
        let oe = w.id >= o ? 4 : 0, ue = w.start;
        for (w.next(); w.pos > Qe; ) {
          if (w.size < 0)
            if (w.size == -3)
              oe += 4;
            else
              break e;
          else
            w.id >= o && (oe += 4);
          w.next();
        }
        U = ue, Z += fe, V += oe;
      }
    return (x < 0 || Z == Q) && (B.size = Z, B.start = U, B.skip = V), B.size > 4 ? B : void 0;
  }
  function g(Q, x, w) {
    let { id: Z, start: U, end: V, size: Y } = l;
    if (l.next(), Y >= 0 && Z < o) {
      let B = w;
      if (Y > 4) {
        let te = l.pos - (Y - 4);
        for (; l.pos > te; )
          w = g(Q, x, w);
      }
      x[--w] = B, x[--w] = V - Q, x[--w] = U - Q, x[--w] = Z;
    } else
      Y == -3 ? h = Z : Y == -4 && (c = Z);
    return w;
  }
  let S = [], b = [];
  for (; l.pos > 0; )
    f(n.start || 0, n.bufferStart || 0, S, b, -1);
  let v = (e = n.length) !== null && e !== void 0 ? e : S.length ? b[0] + S[0].length : 0;
  return new G(a[n.topID], S.reverse(), b.reverse(), v);
}
const ya = /* @__PURE__ */ new WeakMap();
function zn(n, e) {
  if (!n.isAnonymous || e instanceof Lt || e.type != n)
    return 1;
  let t = ya.get(e);
  if (t == null) {
    t = 1;
    for (let i of e.children) {
      if (i.type != n || !(i instanceof G)) {
        t = 1;
        break;
      }
      t += zn(n, i);
    }
    ya.set(e, t);
  }
  return t;
}
function Bo(n, e, t, i, s, r, o, l, a) {
  let h = 0;
  for (let O = i; O < s; O++)
    h += zn(n, e[O]);
  let c = Math.ceil(
    h * 1.5 / 8
    /* Balance.BranchFactor */
  ), f = [], u = [];
  function d(O, m, g, S, b) {
    for (let v = g; v < S; ) {
      let Q = v, x = m[v], w = zn(n, O[v]);
      for (v++; v < S; v++) {
        let Z = zn(n, O[v]);
        if (w + Z >= c)
          break;
        w += Z;
      }
      if (v == Q + 1) {
        if (w > c) {
          let Z = O[Q];
          d(Z.children, Z.positions, 0, Z.children.length, m[Q] + b);
          continue;
        }
        f.push(O[Q]);
      } else {
        let Z = m[v - 1] + O[v - 1].length - x;
        f.push(Bo(n, O, m, Q, v, x, Z, null, a));
      }
      u.push(x + b - r);
    }
  }
  return d(e, t, i, s, 0), (l || a)(f, u, o);
}
class Of {
  constructor() {
    this.map = /* @__PURE__ */ new WeakMap();
  }
  setBuffer(e, t, i) {
    let s = this.map.get(e);
    s || this.map.set(e, s = /* @__PURE__ */ new Map()), s.set(t, i);
  }
  getBuffer(e, t) {
    let i = this.map.get(e);
    return i && i.get(t);
  }
  /// Set the value for this syntax node.
  set(e, t) {
    e instanceof it ? this.setBuffer(e.context.buffer, e.index, t) : e instanceof Ue && this.map.set(e.tree, t);
  }
  /// Retrieve value for this syntax node, if it exists in the map.
  get(e) {
    return e instanceof it ? this.getBuffer(e.context.buffer, e.index) : e instanceof Ue ? this.map.get(e.tree) : void 0;
  }
  /// Set the value for the node that a cursor currently points to.
  cursorSet(e, t) {
    e.buffer ? this.setBuffer(e.buffer.buffer, e.index, t) : this.map.set(e.tree, t);
  }
  /// Retrieve the value for the node that a cursor currently points
  /// to.
  cursorGet(e) {
    return e.buffer ? this.getBuffer(e.buffer.buffer, e.index) : this.map.get(e.tree);
  }
}
class dt {
  /// Construct a tree fragment. You'll usually want to use
  /// [`addTree`](#common.TreeFragment^addTree) and
  /// [`applyChanges`](#common.TreeFragment^applyChanges) instead of
  /// calling this directly.
  constructor(e, t, i, s, r = !1, o = !1) {
    this.from = e, this.to = t, this.tree = i, this.offset = s, this.open = (r ? 1 : 0) | (o ? 2 : 0);
  }
  /// Whether the start of the fragment represents the start of a
  /// parse, or the end of a change. (In the second case, it may not
  /// be safe to reuse some nodes at the start, depending on the
  /// parsing algorithm.)
  get openStart() {
    return (this.open & 1) > 0;
  }
  /// Whether the end of the fragment represents the end of a
  /// full-document parse, or the start of a change.
  get openEnd() {
    return (this.open & 2) > 0;
  }
  /// Create a set of fragments from a freshly parsed tree, or update
  /// an existing set of fragments by replacing the ones that overlap
  /// with a tree with content from the new tree. When `partial` is
  /// true, the parse is treated as incomplete, and the resulting
  /// fragment has [`openEnd`](#common.TreeFragment.openEnd) set to
  /// true.
  static addTree(e, t = [], i = !1) {
    let s = [new dt(0, e.length, e, 0, !1, i)];
    for (let r of t)
      r.to > e.length && s.push(r);
    return s;
  }
  /// Apply a set of edits to an array of fragments, removing or
  /// splitting fragments as necessary to remove edited ranges, and
  /// adjusting offsets for fragments that moved.
  static applyChanges(e, t, i = 128) {
    if (!t.length)
      return e;
    let s = [], r = 1, o = e.length ? e[0] : null;
    for (let l = 0, a = 0, h = 0; ; l++) {
      let c = l < t.length ? t[l] : null, f = c ? c.fromA : 1e9;
      if (f - a >= i)
        for (; o && o.from < f; ) {
          let u = o;
          if (a >= u.from || f <= u.to || h) {
            let d = Math.max(u.from, a) - h, O = Math.min(u.to, f) - h;
            u = d >= O ? null : new dt(d, O, u.tree, u.offset + h, l > 0, !!c);
          }
          if (u && s.push(u), o.to > f)
            break;
          o = r < e.length ? e[r++] : null;
        }
      if (!c)
        break;
      a = c.toA, h = c.toA - c.toB;
    }
    return s;
  }
}
class pf {
  /// Start a parse, returning a [partial parse](#common.PartialParse)
  /// object. [`fragments`](#common.TreeFragment) can be passed in to
  /// make the parse incremental.
  ///
  /// By default, the entire input is parsed. You can pass `ranges`,
  /// which should be a sorted array of non-empty, non-overlapping
  /// ranges, to parse only those ranges. The tree returned in that
  /// case will start at `ranges[0].from`.
  startParse(e, t, i) {
    return typeof e == "string" && (e = new kg(e)), i = i ? i.length ? i.map((s) => new Me(s.from, s.to)) : [new Me(0, 0)] : [new Me(0, e.length)], this.createParse(e, t || [], i);
  }
  /// Run a full parse, returning the resulting tree.
  parse(e, t, i) {
    let s = this.startParse(e, t, i);
    for (; ; ) {
      let r = s.advance();
      if (r)
        return r;
    }
  }
}
class kg {
  constructor(e) {
    this.string = e;
  }
  get length() {
    return this.string.length;
  }
  chunk(e) {
    return this.string.slice(e);
  }
  get lineChunks() {
    return !1;
  }
  read(e, t) {
    return this.string.slice(e, t);
  }
}
function vg(n) {
  return (e, t, i, s) => new Cg(e, n, t, i, s);
}
class ba {
  constructor(e, t, i, s, r) {
    if (this.parser = e, this.parse = t, this.overlay = i, this.target = s, this.ranges = r, !r.length || r.some((o) => o.from >= o.to))
      throw new RangeError("Invalid inner parse ranges given: " + JSON.stringify(r));
  }
}
class Pg {
  constructor(e, t, i, s, r, o, l) {
    this.parser = e, this.predicate = t, this.mounts = i, this.index = s, this.start = r, this.target = o, this.prev = l, this.depth = 0, this.ranges = [];
  }
}
const fo = new A({ perNode: !0 });
class Cg {
  constructor(e, t, i, s, r) {
    this.nest = t, this.input = i, this.fragments = s, this.ranges = r, this.inner = [], this.innerDone = 0, this.baseTree = null, this.stoppedAt = null, this.baseParse = e;
  }
  advance() {
    if (this.baseParse) {
      let i = this.baseParse.advance();
      if (!i)
        return null;
      if (this.baseParse = null, this.baseTree = i, this.startInner(), this.stoppedAt != null)
        for (let s of this.inner)
          s.parse.stopAt(this.stoppedAt);
    }
    if (this.innerDone == this.inner.length) {
      let i = this.baseTree;
      return this.stoppedAt != null && (i = new G(i.type, i.children, i.positions, i.length, i.propValues.concat([[fo, this.stoppedAt]]))), i;
    }
    let e = this.inner[this.innerDone], t = e.parse.advance();
    if (t) {
      this.innerDone++;
      let i = Object.assign(/* @__PURE__ */ Object.create(null), e.target.props);
      i[A.mounted.id] = new Qg(t, e.overlay, e.parser), e.target.props = i;
    }
    return null;
  }
  get parsedPos() {
    if (this.baseParse)
      return 0;
    let e = this.input.length;
    for (let t = this.innerDone; t < this.inner.length; t++)
      this.inner[t].ranges[0].from < e && (e = Math.min(e, this.inner[t].parse.parsedPos));
    return e;
  }
  stopAt(e) {
    if (this.stoppedAt = e, this.baseParse)
      this.baseParse.stopAt(e);
    else
      for (let t = this.innerDone; t < this.inner.length; t++)
        this.inner[t].parse.stopAt(e);
  }
  startInner() {
    let e = new Zg(this.fragments), t = null, i = null, s = new Fi(new Ue(this.baseTree, this.ranges[0].from, 0, null), E.IncludeAnonymous | E.IgnoreMounts);
    e:
      for (let r, o; this.stoppedAt == null || s.from < this.stoppedAt; ) {
        let l = !0, a;
        if (e.hasNode(s)) {
          if (t) {
            let h = t.mounts.find((c) => c.frag.from <= s.from && c.frag.to >= s.to && c.mount.overlay);
            if (h)
              for (let c of h.mount.overlay) {
                let f = c.from + h.pos, u = c.to + h.pos;
                f >= s.from && u <= s.to && !t.ranges.some((d) => d.from < u && d.to > f) && t.ranges.push({ from: f, to: u });
              }
          }
          l = !1;
        } else if (i && (o = Xg(i.ranges, s.from, s.to)))
          l = o != 2;
        else if (!s.type.isAnonymous && s.from < s.to && (r = this.nest(s, this.input))) {
          s.tree || Tg(s);
          let h = e.findMounts(s.from, r.parser);
          if (typeof r.overlay == "function")
            t = new Pg(r.parser, r.overlay, h, this.inner.length, s.from, s.tree, t);
          else {
            let c = wa(this.ranges, r.overlay || [new Me(s.from, s.to)]);
            c.length && this.inner.push(new ba(r.parser, r.parser.startParse(this.input, $a(h, c), c), r.overlay ? r.overlay.map((f) => new Me(f.from - s.from, f.to - s.from)) : null, s.tree, c)), r.overlay ? c.length && (i = { ranges: c, depth: 0, prev: i }) : l = !1;
          }
        } else
          t && (a = t.predicate(s)) && (a === !0 && (a = new Me(s.from, s.to)), a.from < a.to && t.ranges.push(a));
        if (l && s.firstChild())
          t && t.depth++, i && i.depth++;
        else
          for (; !s.nextSibling(); ) {
            if (!s.parent())
              break e;
            if (t && !--t.depth) {
              let h = wa(this.ranges, t.ranges);
              h.length && this.inner.splice(t.index, 0, new ba(t.parser, t.parser.startParse(this.input, $a(t.mounts, h), h), t.ranges.map((c) => new Me(c.from - t.start, c.to - t.start)), t.target, h)), t = t.prev;
            }
            i && !--i.depth && (i = i.prev);
          }
      }
  }
}
function Xg(n, e, t) {
  for (let i of n) {
    if (i.from >= t)
      break;
    if (i.to > e)
      return i.from <= e && i.to >= t ? 2 : 1;
  }
  return 0;
}
function Qa(n, e, t, i, s, r) {
  if (e < t) {
    let o = n.buffer[e + 1];
    i.push(n.slice(e, t, o)), s.push(o - r);
  }
}
function Tg(n) {
  let { node: e } = n, t = 0;
  do
    n.parent(), t++;
  while (!n.tree);
  let i = 0, s = n.tree, r = 0;
  for (; r = s.positions[i] + n.from, !(r <= e.from && r + s.children[i].length >= e.to); i++)
    ;
  let o = s.children[i], l = o.buffer;
  function a(h, c, f, u, d) {
    let O = h;
    for (; l[O + 2] + r <= e.from; )
      O = l[O + 3];
    let m = [], g = [];
    Qa(o, h, O, m, g, u);
    let S = l[O + 1], b = l[O + 2], v = S + r == e.from && b + r == e.to && l[O] == e.type.id;
    return m.push(v ? e.toTree() : a(O + 4, l[O + 3], o.set.types[l[O]], S, b - S)), g.push(S - u), Qa(o, l[O + 3], c, m, g, u), new G(f, m, g, d);
  }
  s.children[i] = a(0, l.length, be.none, 0, o.length);
  for (let h = 0; h <= t; h++)
    n.childAfter(e.from);
}
class xa {
  constructor(e, t) {
    this.offset = t, this.done = !1, this.cursor = e.cursor(E.IncludeAnonymous | E.IgnoreMounts);
  }
  // Move to the first node (in pre-order) that starts at or after `pos`.
  moveTo(e) {
    let { cursor: t } = this, i = e - this.offset;
    for (; !this.done && t.from < i; )
      t.to >= e && t.enter(i, 1, E.IgnoreOverlays | E.ExcludeBuffers) || t.next(!1) || (this.done = !0);
  }
  hasNode(e) {
    if (this.moveTo(e.from), !this.done && this.cursor.from + this.offset == e.from && this.cursor.tree)
      for (let t = this.cursor.tree; ; ) {
        if (t == e.tree)
          return !0;
        if (t.children.length && t.positions[0] == 0 && t.children[0] instanceof G)
          t = t.children[0];
        else
          break;
      }
    return !1;
  }
}
let Zg = class {
  constructor(e) {
    var t;
    if (this.fragments = e, this.curTo = 0, this.fragI = 0, e.length) {
      let i = this.curFrag = e[0];
      this.curTo = (t = i.tree.prop(fo)) !== null && t !== void 0 ? t : i.to, this.inner = new xa(i.tree, -i.offset);
    } else
      this.curFrag = this.inner = null;
  }
  hasNode(e) {
    for (; this.curFrag && e.from >= this.curTo; )
      this.nextFrag();
    return this.curFrag && this.curFrag.from <= e.from && this.curTo >= e.to && this.inner.hasNode(e);
  }
  nextFrag() {
    var e;
    if (this.fragI++, this.fragI == this.fragments.length)
      this.curFrag = this.inner = null;
    else {
      let t = this.curFrag = this.fragments[this.fragI];
      this.curTo = (e = t.tree.prop(fo)) !== null && e !== void 0 ? e : t.to, this.inner = new xa(t.tree, -t.offset);
    }
  }
  findMounts(e, t) {
    var i;
    let s = [];
    if (this.inner) {
      this.inner.cursor.moveTo(e, 1);
      for (let r = this.inner.cursor.node; r; r = r.parent) {
        let o = (i = r.tree) === null || i === void 0 ? void 0 : i.prop(A.mounted);
        if (o && o.parser == t)
          for (let l = this.fragI; l < this.fragments.length; l++) {
            let a = this.fragments[l];
            if (a.from >= r.to)
              break;
            a.tree == this.curFrag.tree && s.push({
              frag: a,
              pos: r.from - a.offset,
              mount: o
            });
          }
      }
    }
    return s;
  }
};
function wa(n, e) {
  let t = null, i = e;
  for (let s = 1, r = 0; s < n.length; s++) {
    let o = n[s - 1].to, l = n[s].from;
    for (; r < i.length; r++) {
      let a = i[r];
      if (a.from >= l)
        break;
      a.to <= o || (t || (i = t = e.slice()), a.from < o ? (t[r] = new Me(a.from, o), a.to > l && t.splice(r + 1, 0, new Me(l, a.to))) : a.to > l ? t[r--] = new Me(l, a.to) : t.splice(r--, 1));
    }
  }
  return i;
}
function Rg(n, e, t, i) {
  let s = 0, r = 0, o = !1, l = !1, a = -1e9, h = [];
  for (; ; ) {
    let c = s == n.length ? 1e9 : o ? n[s].to : n[s].from, f = r == e.length ? 1e9 : l ? e[r].to : e[r].from;
    if (o != l) {
      let u = Math.max(a, t), d = Math.min(c, f, i);
      u < d && h.push(new Me(u, d));
    }
    if (a = Math.min(c, f), a == 1e9)
      break;
    c == a && (o ? (o = !1, s++) : o = !0), f == a && (l ? (l = !1, r++) : l = !0);
  }
  return h;
}
function $a(n, e) {
  let t = [];
  for (let { pos: i, mount: s, frag: r } of n) {
    let o = i + (s.overlay ? s.overlay[0].from : 0), l = o + s.tree.length, a = Math.max(r.from, o), h = Math.min(r.to, l);
    if (s.overlay) {
      let c = s.overlay.map((u) => new Me(u.from + i, u.to + i)), f = Rg(e, c, a, h);
      for (let u = 0, d = a; ; u++) {
        let O = u == f.length, m = O ? h : f[u].from;
        if (m > d && t.push(new dt(d, m, s.tree, -o, r.from >= d || r.openStart, r.to <= m || r.openEnd)), O)
          break;
        d = f[u].to;
      }
    } else
      t.push(new dt(a, h, s.tree, -o, r.from >= o || r.openStart, r.to <= l || r.openEnd));
  }
  return t;
}
let Ag = 0;
class Ke {
  /**
  @internal
  */
  constructor(e, t, i) {
    this.set = e, this.base = t, this.modified = i, this.id = Ag++;
  }
  /**
  Define a new tag. If `parent` is given, the tag is treated as a
  sub-tag of that parent, and
  [highlighters](#highlight.tagHighlighter) that don't mention
  this tag will try to fall back to the parent tag (or grandparent
  tag, etc).
  */
  static define(e) {
    if (e != null && e.base)
      throw new Error("Can not derive from a modified tag");
    let t = new Ke([], null, []);
    if (t.set.push(t), e)
      for (let i of e.set)
        t.set.push(i);
    return t;
  }
  /**
  Define a tag _modifier_, which is a function that, given a tag,
  will return a tag that is a subtag of the original. Applying the
  same modifier to a twice tag will return the same value (`m1(t1)
  == m1(t1)`) and applying multiple modifiers will, regardless or
  order, produce the same tag (`m1(m2(t1)) == m2(m1(t1))`).
  
  When multiple modifiers are applied to a given base tag, each
  smaller set of modifiers is registered as a parent, so that for
  example `m1(m2(m3(t1)))` is a subtype of `m1(m2(t1))`,
  `m1(m3(t1)`, and so on.
  */
  static defineModifier() {
    let e = new as();
    return (t) => t.modified.indexOf(e) > -1 ? t : as.get(t.base || t, t.modified.concat(e).sort((i, s) => i.id - s.id));
  }
}
let Vg = 0;
class as {
  constructor() {
    this.instances = [], this.id = Vg++;
  }
  static get(e, t) {
    if (!t.length)
      return e;
    let i = t[0].instances.find((l) => l.base == e && Yg(t, l.modified));
    if (i)
      return i;
    let s = [], r = new Ke(s, e, t);
    for (let l of t)
      l.instances.push(r);
    let o = Mg(t);
    for (let l of e.set)
      if (!l.modified.length)
        for (let a of o)
          s.push(as.get(l, a));
    return r;
  }
}
function Yg(n, e) {
  return n.length == e.length && n.every((t, i) => t == e[i]);
}
function Mg(n) {
  let e = [[]];
  for (let t = 0; t < n.length; t++)
    for (let i = 0, s = e.length; i < s; i++)
      e.push(e[i].concat(n[t]));
  return e.sort((t, i) => i.length - t.length);
}
function Ys(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let i = n[t];
    Array.isArray(i) || (i = [i]);
    for (let s of t.split(" "))
      if (s) {
        let r = [], o = 2, l = s;
        for (let f = 0; ; ) {
          if (l == "..." && f > 0 && f + 3 == s.length) {
            o = 1;
            break;
          }
          let u = /^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(l);
          if (!u)
            throw new RangeError("Invalid path: " + s);
          if (r.push(u[0] == "*" ? "" : u[0][0] == '"' ? JSON.parse(u[0]) : u[0]), f += u[0].length, f == s.length)
            break;
          let d = s[f++];
          if (f == s.length && d == "!") {
            o = 0;
            break;
          }
          if (d != "/")
            throw new RangeError("Invalid path: " + s);
          l = s.slice(f);
        }
        let a = r.length - 1, h = r[a];
        if (!h)
          throw new RangeError("Invalid path: " + s);
        let c = new hs(i, o, a > 0 ? r.slice(0, a) : null);
        e[h] = c.sort(e[h]);
      }
  }
  return gf.add(e);
}
const gf = new A();
class hs {
  constructor(e, t, i, s) {
    this.tags = e, this.mode = t, this.context = i, this.next = s;
  }
  get opaque() {
    return this.mode == 0;
  }
  get inherit() {
    return this.mode == 1;
  }
  sort(e) {
    return !e || e.depth < this.depth ? (this.next = e, this) : (e.next = this.sort(e.next), e);
  }
  get depth() {
    return this.context ? this.context.length : 0;
  }
}
hs.empty = new hs([], 2, null);
function mf(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let r of n)
    if (!Array.isArray(r.tag))
      t[r.tag.id] = r.class;
    else
      for (let o of r.tag)
        t[o.id] = r.class;
  let { scope: i, all: s = null } = e || {};
  return {
    style: (r) => {
      let o = s;
      for (let l of r)
        for (let a of l.set) {
          let h = t[a.id];
          if (h) {
            o = o ? o + " " + h : h;
            break;
          }
        }
      return o;
    },
    scope: i
  };
}
function Wg(n, e) {
  let t = null;
  for (let i of n) {
    let s = i.style(e);
    s && (t = t ? t + " " + s : s);
  }
  return t;
}
function Dg(n, e, t, i = 0, s = n.length) {
  let r = new Ug(i, Array.isArray(e) ? e : [e], t);
  r.highlightRange(n.cursor(), i, s, "", r.highlighters), r.flush(s);
}
class Ug {
  constructor(e, t, i) {
    this.at = e, this.highlighters = t, this.span = i, this.class = "";
  }
  startSpan(e, t) {
    t != this.class && (this.flush(e), e > this.at && (this.at = e), this.class = t);
  }
  flush(e) {
    e > this.at && this.class && this.span(this.at, e, this.class);
  }
  highlightRange(e, t, i, s, r) {
    let { type: o, from: l, to: a } = e;
    if (l >= i || a <= t)
      return;
    o.isTop && (r = this.highlighters.filter((d) => !d.scope || d.scope(o)));
    let h = s, c = qg(e) || hs.empty, f = Wg(r, c.tags);
    if (f && (h && (h += " "), h += f, c.mode == 1 && (s += (s ? " " : "") + f)), this.startSpan(Math.max(t, l), h), c.opaque)
      return;
    let u = e.tree && e.tree.prop(A.mounted);
    if (u && u.overlay) {
      let d = e.node.enter(u.overlay[0].from + l, 1), O = this.highlighters.filter((g) => !g.scope || g.scope(u.tree.type)), m = e.firstChild();
      for (let g = 0, S = l; ; g++) {
        let b = g < u.overlay.length ? u.overlay[g] : null, v = b ? b.from + l : a, Q = Math.max(t, S), x = Math.min(i, v);
        if (Q < x && m)
          for (; e.from < x && (this.highlightRange(e, Q, x, s, r), this.startSpan(Math.min(x, e.to), h), !(e.to >= v || !e.nextSibling())); )
            ;
        if (!b || v > i)
          break;
        S = b.to + l, S > t && (this.highlightRange(d.cursor(), Math.max(t, b.from + l), Math.min(i, S), "", O), this.startSpan(Math.min(i, S), h));
      }
      m && e.parent();
    } else if (e.firstChild()) {
      u && (s = "");
      do
        if (!(e.to <= t)) {
          if (e.from >= i)
            break;
          this.highlightRange(e, t, i, s, r), this.startSpan(Math.min(i, e.to), h);
        }
      while (e.nextSibling());
      e.parent();
    }
  }
}
function qg(n) {
  let e = n.type.prop(gf);
  for (; e && e.context && !n.matchContext(e.context); )
    e = e.next;
  return e || null;
}
const $ = Ke.define, Pn = $(), Qt = $(), ka = $(Qt), va = $(Qt), xt = $(), Cn = $(xt), ar = $(xt), He = $(), Yt = $(He), Ge = $(), Fe = $(), uo = $(), ki = $(uo), Xn = $(), p = {
  /**
  A comment.
  */
  comment: Pn,
  /**
  A line [comment](#highlight.tags.comment).
  */
  lineComment: $(Pn),
  /**
  A block [comment](#highlight.tags.comment).
  */
  blockComment: $(Pn),
  /**
  A documentation [comment](#highlight.tags.comment).
  */
  docComment: $(Pn),
  /**
  Any kind of identifier.
  */
  name: Qt,
  /**
  The [name](#highlight.tags.name) of a variable.
  */
  variableName: $(Qt),
  /**
  A type [name](#highlight.tags.name).
  */
  typeName: ka,
  /**
  A tag name (subtag of [`typeName`](#highlight.tags.typeName)).
  */
  tagName: $(ka),
  /**
  A property or field [name](#highlight.tags.name).
  */
  propertyName: va,
  /**
  An attribute name (subtag of [`propertyName`](#highlight.tags.propertyName)).
  */
  attributeName: $(va),
  /**
  The [name](#highlight.tags.name) of a class.
  */
  className: $(Qt),
  /**
  A label [name](#highlight.tags.name).
  */
  labelName: $(Qt),
  /**
  A namespace [name](#highlight.tags.name).
  */
  namespace: $(Qt),
  /**
  The [name](#highlight.tags.name) of a macro.
  */
  macroName: $(Qt),
  /**
  A literal value.
  */
  literal: xt,
  /**
  A string [literal](#highlight.tags.literal).
  */
  string: Cn,
  /**
  A documentation [string](#highlight.tags.string).
  */
  docString: $(Cn),
  /**
  A character literal (subtag of [string](#highlight.tags.string)).
  */
  character: $(Cn),
  /**
  An attribute value (subtag of [string](#highlight.tags.string)).
  */
  attributeValue: $(Cn),
  /**
  A number [literal](#highlight.tags.literal).
  */
  number: ar,
  /**
  An integer [number](#highlight.tags.number) literal.
  */
  integer: $(ar),
  /**
  A floating-point [number](#highlight.tags.number) literal.
  */
  float: $(ar),
  /**
  A boolean [literal](#highlight.tags.literal).
  */
  bool: $(xt),
  /**
  Regular expression [literal](#highlight.tags.literal).
  */
  regexp: $(xt),
  /**
  An escape [literal](#highlight.tags.literal), for example a
  backslash escape in a string.
  */
  escape: $(xt),
  /**
  A color [literal](#highlight.tags.literal).
  */
  color: $(xt),
  /**
  A URL [literal](#highlight.tags.literal).
  */
  url: $(xt),
  /**
  A language keyword.
  */
  keyword: Ge,
  /**
  The [keyword](#highlight.tags.keyword) for the self or this
  object.
  */
  self: $(Ge),
  /**
  The [keyword](#highlight.tags.keyword) for null.
  */
  null: $(Ge),
  /**
  A [keyword](#highlight.tags.keyword) denoting some atomic value.
  */
  atom: $(Ge),
  /**
  A [keyword](#highlight.tags.keyword) that represents a unit.
  */
  unit: $(Ge),
  /**
  A modifier [keyword](#highlight.tags.keyword).
  */
  modifier: $(Ge),
  /**
  A [keyword](#highlight.tags.keyword) that acts as an operator.
  */
  operatorKeyword: $(Ge),
  /**
  A control-flow related [keyword](#highlight.tags.keyword).
  */
  controlKeyword: $(Ge),
  /**
  A [keyword](#highlight.tags.keyword) that defines something.
  */
  definitionKeyword: $(Ge),
  /**
  A [keyword](#highlight.tags.keyword) related to defining or
  interfacing with modules.
  */
  moduleKeyword: $(Ge),
  /**
  An operator.
  */
  operator: Fe,
  /**
  An [operator](#highlight.tags.operator) that dereferences something.
  */
  derefOperator: $(Fe),
  /**
  Arithmetic-related [operator](#highlight.tags.operator).
  */
  arithmeticOperator: $(Fe),
  /**
  Logical [operator](#highlight.tags.operator).
  */
  logicOperator: $(Fe),
  /**
  Bit [operator](#highlight.tags.operator).
  */
  bitwiseOperator: $(Fe),
  /**
  Comparison [operator](#highlight.tags.operator).
  */
  compareOperator: $(Fe),
  /**
  [Operator](#highlight.tags.operator) that updates its operand.
  */
  updateOperator: $(Fe),
  /**
  [Operator](#highlight.tags.operator) that defines something.
  */
  definitionOperator: $(Fe),
  /**
  Type-related [operator](#highlight.tags.operator).
  */
  typeOperator: $(Fe),
  /**
  Control-flow [operator](#highlight.tags.operator).
  */
  controlOperator: $(Fe),
  /**
  Program or markup punctuation.
  */
  punctuation: uo,
  /**
  [Punctuation](#highlight.tags.punctuation) that separates
  things.
  */
  separator: $(uo),
  /**
  Bracket-style [punctuation](#highlight.tags.punctuation).
  */
  bracket: ki,
  /**
  Angle [brackets](#highlight.tags.bracket) (usually `<` and `>`
  tokens).
  */
  angleBracket: $(ki),
  /**
  Square [brackets](#highlight.tags.bracket) (usually `[` and `]`
  tokens).
  */
  squareBracket: $(ki),
  /**
  Parentheses (usually `(` and `)` tokens). Subtag of
  [bracket](#highlight.tags.bracket).
  */
  paren: $(ki),
  /**
  Braces (usually `{` and `}` tokens). Subtag of
  [bracket](#highlight.tags.bracket).
  */
  brace: $(ki),
  /**
  Content, for example plain text in XML or markup documents.
  */
  content: He,
  /**
  [Content](#highlight.tags.content) that represents a heading.
  */
  heading: Yt,
  /**
  A level 1 [heading](#highlight.tags.heading).
  */
  heading1: $(Yt),
  /**
  A level 2 [heading](#highlight.tags.heading).
  */
  heading2: $(Yt),
  /**
  A level 3 [heading](#highlight.tags.heading).
  */
  heading3: $(Yt),
  /**
  A level 4 [heading](#highlight.tags.heading).
  */
  heading4: $(Yt),
  /**
  A level 5 [heading](#highlight.tags.heading).
  */
  heading5: $(Yt),
  /**
  A level 6 [heading](#highlight.tags.heading).
  */
  heading6: $(Yt),
  /**
  A prose separator (such as a horizontal rule).
  */
  contentSeparator: $(He),
  /**
  [Content](#highlight.tags.content) that represents a list.
  */
  list: $(He),
  /**
  [Content](#highlight.tags.content) that represents a quote.
  */
  quote: $(He),
  /**
  [Content](#highlight.tags.content) that is emphasized.
  */
  emphasis: $(He),
  /**
  [Content](#highlight.tags.content) that is styled strong.
  */
  strong: $(He),
  /**
  [Content](#highlight.tags.content) that is part of a link.
  */
  link: $(He),
  /**
  [Content](#highlight.tags.content) that is styled as code or
  monospace.
  */
  monospace: $(He),
  /**
  [Content](#highlight.tags.content) that has a strike-through
  style.
  */
  strikethrough: $(He),
  /**
  Inserted text in a change-tracking format.
  */
  inserted: $(),
  /**
  Deleted text.
  */
  deleted: $(),
  /**
  Changed text.
  */
  changed: $(),
  /**
  An invalid or unsyntactic element.
  */
  invalid: $(),
  /**
  Metadata or meta-instruction.
  */
  meta: Xn,
  /**
  [Metadata](#highlight.tags.meta) that applies to the entire
  document.
  */
  documentMeta: $(Xn),
  /**
  [Metadata](#highlight.tags.meta) that annotates or adds
  attributes to a given syntactic element.
  */
  annotation: $(Xn),
  /**
  Processing instruction or preprocessor directive. Subtag of
  [meta](#highlight.tags.meta).
  */
  processingInstruction: $(Xn),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates that a
  given element is being defined. Expected to be used with the
  various [name](#highlight.tags.name) tags.
  */
  definition: Ke.defineModifier(),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates that
  something is constant. Mostly expected to be used with
  [variable names](#highlight.tags.variableName).
  */
  constant: Ke.defineModifier(),
  /**
  [Modifier](#highlight.Tag^defineModifier) used to indicate that
  a [variable](#highlight.tags.variableName) or [property
  name](#highlight.tags.propertyName) is being called or defined
  as a function.
  */
  function: Ke.defineModifier(),
  /**
  [Modifier](#highlight.Tag^defineModifier) that can be applied to
  [names](#highlight.tags.name) to indicate that they belong to
  the language's standard environment.
  */
  standard: Ke.defineModifier(),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates a given
  [names](#highlight.tags.name) is local to some scope.
  */
  local: Ke.defineModifier(),
  /**
  A generic variant [modifier](#highlight.Tag^defineModifier) that
  can be used to tag language-specific alternative variants of
  some common tag. It is recommended for themes to define special
  forms of at least the [string](#highlight.tags.string) and
  [variable name](#highlight.tags.variableName) tags, since those
  come up a lot.
  */
  special: Ke.defineModifier()
};
mf([
  { tag: p.link, class: "tok-link" },
  { tag: p.heading, class: "tok-heading" },
  { tag: p.emphasis, class: "tok-emphasis" },
  { tag: p.strong, class: "tok-strong" },
  { tag: p.keyword, class: "tok-keyword" },
  { tag: p.atom, class: "tok-atom" },
  { tag: p.bool, class: "tok-bool" },
  { tag: p.url, class: "tok-url" },
  { tag: p.labelName, class: "tok-labelName" },
  { tag: p.inserted, class: "tok-inserted" },
  { tag: p.deleted, class: "tok-deleted" },
  { tag: p.literal, class: "tok-literal" },
  { tag: p.string, class: "tok-string" },
  { tag: p.number, class: "tok-number" },
  { tag: [p.regexp, p.escape, p.special(p.string)], class: "tok-string2" },
  { tag: p.variableName, class: "tok-variableName" },
  { tag: p.local(p.variableName), class: "tok-variableName tok-local" },
  { tag: p.definition(p.variableName), class: "tok-variableName tok-definition" },
  { tag: p.special(p.variableName), class: "tok-variableName2" },
  { tag: p.definition(p.propertyName), class: "tok-propertyName tok-definition" },
  { tag: p.typeName, class: "tok-typeName" },
  { tag: p.namespace, class: "tok-namespace" },
  { tag: p.className, class: "tok-className" },
  { tag: p.macroName, class: "tok-macroName" },
  { tag: p.propertyName, class: "tok-propertyName" },
  { tag: p.operator, class: "tok-operator" },
  { tag: p.comment, class: "tok-comment" },
  { tag: p.meta, class: "tok-meta" },
  { tag: p.invalid, class: "tok-invalid" },
  { tag: p.punctuation, class: "tok-punctuation" }
]);
var hr;
const ei = /* @__PURE__ */ new A();
function Sf(n) {
  return P.define({
    combine: n ? (e) => e.concat(n) : void 0
  });
}
const zo = /* @__PURE__ */ new A();
class ze {
  /**
  Construct a language object. If you need to invoke this
  directly, first define a data facet with
  [`defineLanguageFacet`](https://codemirror.net/6/docs/ref/#language.defineLanguageFacet), and then
  configure your parser to [attach](https://codemirror.net/6/docs/ref/#language.languageDataProp) it
  to the language's outer syntax node.
  */
  constructor(e, t, i = [], s = "") {
    this.data = e, this.name = s, M.prototype.hasOwnProperty("tree") || Object.defineProperty(M.prototype, "tree", { get() {
      return I(this);
    } }), this.parser = t, this.extension = [
      Rt.of(this),
      M.languageData.of((r, o, l) => {
        let a = Pa(r, o, l), h = a.type.prop(ei);
        if (!h)
          return [];
        let c = r.facet(h), f = a.type.prop(zo);
        if (f) {
          let u = a.resolve(o - a.from, l);
          for (let d of f)
            if (d.test(u, r)) {
              let O = r.facet(d.facet);
              return d.type == "replace" ? O : O.concat(c);
            }
        }
        return c;
      })
    ].concat(i);
  }
  /**
  Query whether this language is active at the given position.
  */
  isActiveAt(e, t, i = -1) {
    return Pa(e, t, i).type.prop(ei) == this.data;
  }
  /**
  Find the document regions that were parsed using this language.
  The returned regions will _include_ any nested languages rooted
  in this language, when those exist.
  */
  findRegions(e) {
    let t = e.facet(Rt);
    if ((t == null ? void 0 : t.data) == this.data)
      return [{ from: 0, to: e.doc.length }];
    if (!t || !t.allowsNesting)
      return [];
    let i = [], s = (r, o) => {
      if (r.prop(ei) == this.data) {
        i.push({ from: o, to: o + r.length });
        return;
      }
      let l = r.prop(A.mounted);
      if (l) {
        if (l.tree.prop(ei) == this.data) {
          if (l.overlay)
            for (let a of l.overlay)
              i.push({ from: a.from + o, to: a.to + o });
          else
            i.push({ from: o, to: o + r.length });
          return;
        } else if (l.overlay) {
          let a = i.length;
          if (s(l.tree, l.overlay[0].from + o), i.length > a)
            return;
        }
      }
      for (let a = 0; a < r.children.length; a++) {
        let h = r.children[a];
        h instanceof G && s(h, r.positions[a] + o);
      }
    };
    return s(I(e), 0), i;
  }
  /**
  Indicates whether this language allows nested languages. The
  default implementation returns true.
  */
  get allowsNesting() {
    return !0;
  }
}
ze.setState = /* @__PURE__ */ R.define();
function Pa(n, e, t) {
  let i = n.facet(Rt), s = I(n).topNode;
  if (!i || i.allowsNesting)
    for (let r = s; r; r = r.enter(e, t, E.ExcludeBuffers))
      r.type.isTop && (s = r);
  return s;
}
class di extends ze {
  constructor(e, t, i) {
    super(e, t, [], i), this.parser = t;
  }
  /**
  Define a language from a parser.
  */
  static define(e) {
    let t = Sf(e.languageData);
    return new di(t, e.parser.configure({
      props: [ei.add((i) => i.isTop ? t : void 0)]
    }), e.name);
  }
  /**
  Create a new instance of this language with a reconfigured
  version of its parser and optionally a new name.
  */
  configure(e, t) {
    return new di(this.data, this.parser.configure(e), t || this.name);
  }
  get allowsNesting() {
    return this.parser.hasWrappers();
  }
}
function I(n) {
  let e = n.field(ze.state, !1);
  return e ? e.tree : G.empty;
}
class Eg {
  /**
  Create an input object for the given document.
  */
  constructor(e) {
    this.doc = e, this.cursorPos = 0, this.string = "", this.cursor = e.iter();
  }
  get length() {
    return this.doc.length;
  }
  syncTo(e) {
    return this.string = this.cursor.next(e - this.cursorPos).value, this.cursorPos = e + this.string.length, this.cursorPos - this.string.length;
  }
  chunk(e) {
    return this.syncTo(e), this.string;
  }
  get lineChunks() {
    return !0;
  }
  read(e, t) {
    let i = this.cursorPos - this.string.length;
    return e < i || t >= this.cursorPos ? this.doc.sliceString(e, t) : this.string.slice(e - i, t - i);
  }
}
let vi = null;
class cs {
  constructor(e, t, i = [], s, r, o, l, a) {
    this.parser = e, this.state = t, this.fragments = i, this.tree = s, this.treeLen = r, this.viewport = o, this.skipped = l, this.scheduleOn = a, this.parse = null, this.tempSkipped = [];
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new cs(e, t, [], G.empty, 0, i, [], null);
  }
  startParse() {
    return this.parser.startParse(new Eg(this.state.doc), this.fragments);
  }
  /**
  @internal
  */
  work(e, t) {
    return t != null && t >= this.state.doc.length && (t = void 0), this.tree != G.empty && this.isDone(t ?? this.state.doc.length) ? (this.takeTree(), !0) : this.withContext(() => {
      var i;
      if (typeof e == "number") {
        let s = Date.now() + e;
        e = () => Date.now() > s;
      }
      for (this.parse || (this.parse = this.startParse()), t != null && (this.parse.stoppedAt == null || this.parse.stoppedAt > t) && t < this.state.doc.length && this.parse.stopAt(t); ; ) {
        let s = this.parse.advance();
        if (s)
          if (this.fragments = this.withoutTempSkipped(dt.addTree(s, this.fragments, this.parse.stoppedAt != null)), this.treeLen = (i = this.parse.stoppedAt) !== null && i !== void 0 ? i : this.state.doc.length, this.tree = s, this.parse = null, this.treeLen < (t ?? this.state.doc.length))
            this.parse = this.startParse();
          else
            return !0;
        if (e())
          return !1;
      }
    });
  }
  /**
  @internal
  */
  takeTree() {
    let e, t;
    this.parse && (e = this.parse.parsedPos) >= this.treeLen && ((this.parse.stoppedAt == null || this.parse.stoppedAt > e) && this.parse.stopAt(e), this.withContext(() => {
      for (; !(t = this.parse.advance()); )
        ;
    }), this.treeLen = e, this.tree = t, this.fragments = this.withoutTempSkipped(dt.addTree(this.tree, this.fragments, !0)), this.parse = null);
  }
  withContext(e) {
    let t = vi;
    vi = this;
    try {
      return e();
    } finally {
      vi = t;
    }
  }
  withoutTempSkipped(e) {
    for (let t; t = this.tempSkipped.pop(); )
      e = Ca(e, t.from, t.to);
    return e;
  }
  /**
  @internal
  */
  changes(e, t) {
    let { fragments: i, tree: s, treeLen: r, viewport: o, skipped: l } = this;
    if (this.takeTree(), !e.empty) {
      let a = [];
      if (e.iterChangedRanges((h, c, f, u) => a.push({ fromA: h, toA: c, fromB: f, toB: u })), i = dt.applyChanges(i, a), s = G.empty, r = 0, o = { from: e.mapPos(o.from, -1), to: e.mapPos(o.to, 1) }, this.skipped.length) {
        l = [];
        for (let h of this.skipped) {
          let c = e.mapPos(h.from, 1), f = e.mapPos(h.to, -1);
          c < f && l.push({ from: c, to: f });
        }
      }
    }
    return new cs(this.parser, t, i, s, r, o, l, this.scheduleOn);
  }
  /**
  @internal
  */
  updateViewport(e) {
    if (this.viewport.from == e.from && this.viewport.to == e.to)
      return !1;
    this.viewport = e;
    let t = this.skipped.length;
    for (let i = 0; i < this.skipped.length; i++) {
      let { from: s, to: r } = this.skipped[i];
      s < e.to && r > e.from && (this.fragments = Ca(this.fragments, s, r), this.skipped.splice(i--, 1));
    }
    return this.skipped.length >= t ? !1 : (this.reset(), !0);
  }
  /**
  @internal
  */
  reset() {
    this.parse && (this.takeTree(), this.parse = null);
  }
  /**
  Notify the parse scheduler that the given region was skipped
  because it wasn't in view, and the parse should be restarted
  when it comes into view.
  */
  skipUntilInView(e, t) {
    this.skipped.push({ from: e, to: t });
  }
  /**
  Returns a parser intended to be used as placeholder when
  asynchronously loading a nested parser. It'll skip its input and
  mark it as not-really-parsed, so that the next update will parse
  it again.
  
  When `until` is given, a reparse will be scheduled when that
  promise resolves.
  */
  static getSkippingParser(e) {
    return new class extends pf {
      createParse(t, i, s) {
        let r = s[0].from, o = s[s.length - 1].to;
        return {
          parsedPos: r,
          advance() {
            let a = vi;
            if (a) {
              for (let h of s)
                a.tempSkipped.push(h);
              e && (a.scheduleOn = a.scheduleOn ? Promise.all([a.scheduleOn, e]) : e);
            }
            return this.parsedPos = o, new G(be.none, [], [], o - r);
          },
          stoppedAt: null,
          stopAt() {
          }
        };
      }
    }();
  }
  /**
  @internal
  */
  isDone(e) {
    e = Math.min(e, this.state.doc.length);
    let t = this.fragments;
    return this.treeLen >= e && t.length && t[0].from == 0 && t[0].to >= e;
  }
  /**
  Get the context for the current parse, or `null` if no editor
  parse is in progress.
  */
  static get() {
    return vi;
  }
}
function Ca(n, e, t) {
  return dt.applyChanges(n, [{ fromA: e, toA: t, fromB: e, toB: t }]);
}
class Oi {
  constructor(e) {
    this.context = e, this.tree = e.tree;
  }
  apply(e) {
    if (!e.docChanged && this.tree == this.context.tree)
      return this;
    let t = this.context.changes(e.changes, e.state), i = this.context.treeLen == e.startState.doc.length ? void 0 : Math.max(e.changes.mapPos(this.context.treeLen), t.viewport.to);
    return t.work(20, i) || t.takeTree(), new Oi(t);
  }
  static init(e) {
    let t = Math.min(3e3, e.doc.length), i = cs.create(e.facet(Rt).parser, e, { from: 0, to: t });
    return i.work(20, t) || i.takeTree(), new Oi(i);
  }
}
ze.state = /* @__PURE__ */ re.define({
  create: Oi.init,
  update(n, e) {
    for (let t of e.effects)
      if (t.is(ze.setState))
        return t.value;
    return e.startState.facet(Rt) != e.state.facet(Rt) ? Oi.init(e.state) : n.apply(e);
  }
});
let yf = (n) => {
  let e = setTimeout(
    () => n(),
    500
    /* MaxPause */
  );
  return () => clearTimeout(e);
};
typeof requestIdleCallback < "u" && (yf = (n) => {
  let e = -1, t = setTimeout(
    () => {
      e = requestIdleCallback(n, {
        timeout: 500 - 100
        /* MinPause */
      });
    },
    100
    /* MinPause */
  );
  return () => e < 0 ? clearTimeout(t) : cancelIdleCallback(e);
});
const cr = typeof navigator < "u" && (!((hr = navigator.scheduling) === null || hr === void 0) && hr.isInputPending) ? () => navigator.scheduling.isInputPending() : null, _g = /* @__PURE__ */ ee.fromClass(class {
  constructor(e) {
    this.view = e, this.working = null, this.workScheduled = 0, this.chunkEnd = -1, this.chunkBudget = -1, this.work = this.work.bind(this), this.scheduleWork();
  }
  update(e) {
    let t = this.view.state.field(ze.state).context;
    (t.updateViewport(e.view.viewport) || this.view.viewport.to > t.treeLen) && this.scheduleWork(), e.docChanged && (this.view.hasFocus && (this.chunkBudget += 50), this.scheduleWork()), this.checkAsyncSchedule(t);
  }
  scheduleWork() {
    if (this.working)
      return;
    let { state: e } = this.view, t = e.field(ze.state);
    (t.tree != t.context.tree || !t.context.isDone(e.doc.length)) && (this.working = yf(this.work));
  }
  work(e) {
    this.working = null;
    let t = Date.now();
    if (this.chunkEnd < t && (this.chunkEnd < 0 || this.view.hasFocus) && (this.chunkEnd = t + 3e4, this.chunkBudget = 3e3), this.chunkBudget <= 0)
      return;
    let { state: i, viewport: { to: s } } = this.view, r = i.field(ze.state);
    if (r.tree == r.context.tree && r.context.isDone(
      s + 1e5
      /* MaxParseAhead */
    ))
      return;
    let o = Date.now() + Math.min(this.chunkBudget, 100, e && !cr ? Math.max(25, e.timeRemaining() - 5) : 1e9), l = r.context.treeLen < s && i.doc.length > s + 1e3, a = r.context.work(() => cr && cr() || Date.now() > o, s + (l ? 0 : 1e5));
    this.chunkBudget -= Date.now() - t, (a || this.chunkBudget <= 0) && (r.context.takeTree(), this.view.dispatch({ effects: ze.setState.of(new Oi(r.context)) })), this.chunkBudget > 0 && !(a && !l) && this.scheduleWork(), this.checkAsyncSchedule(r.context);
  }
  checkAsyncSchedule(e) {
    e.scheduleOn && (this.workScheduled++, e.scheduleOn.then(() => this.scheduleWork()).catch((t) => Ae(this.view.state, t)).then(() => this.workScheduled--), e.scheduleOn = null);
  }
  destroy() {
    this.working && this.working();
  }
  isWorking() {
    return !!(this.working || this.workScheduled > 0);
  }
}, {
  eventHandlers: { focus() {
    this.scheduleWork();
  } }
}), Rt = /* @__PURE__ */ P.define({
  combine(n) {
    return n.length ? n[0] : null;
  },
  enables: (n) => [
    ze.state,
    _g,
    k.contentAttributes.compute([n], (e) => {
      let t = e.facet(n);
      return t && t.name ? { "data-language": t.name } : {};
    })
  ]
});
class Io {
  /**
  Create a language support object.
  */
  constructor(e, t = []) {
    this.language = e, this.support = t, this.extension = [e, t];
  }
}
const Bg = /* @__PURE__ */ P.define(), Ms = /* @__PURE__ */ P.define({
  combine: (n) => {
    if (!n.length)
      return "  ";
    let e = n[0];
    if (!e || /\S/.test(e) || Array.from(e).some((t) => t != e[0]))
      throw new Error("Invalid indent unit: " + JSON.stringify(n[0]));
    return e;
  }
});
function fs(n) {
  let e = n.facet(Ms);
  return e.charCodeAt(0) == 9 ? n.tabSize * e.length : e.length;
}
function Hi(n, e) {
  let t = "", i = n.tabSize, s = n.facet(Ms)[0];
  if (s == "	") {
    for (; e >= i; )
      t += "	", e -= i;
    s = " ";
  }
  for (let r = 0; r < e; r++)
    t += s;
  return t;
}
function jo(n, e) {
  n instanceof M && (n = new Ws(n));
  for (let i of n.state.facet(Bg)) {
    let s = i(n, e);
    if (s !== void 0)
      return s;
  }
  let t = I(n.state);
  return t ? zg(n, t, e) : null;
}
class Ws {
  /**
  Create an indent context.
  */
  constructor(e, t = {}) {
    this.state = e, this.options = t, this.unit = fs(e);
  }
  /**
  Get a description of the line at the given position, taking
  [simulated line
  breaks](https://codemirror.net/6/docs/ref/#language.IndentContext.constructor^options.simulateBreak)
  into account. If there is such a break at `pos`, the `bias`
  argument determines whether the part of the line line before or
  after the break is used.
  */
  lineAt(e, t = 1) {
    let i = this.state.doc.lineAt(e), { simulateBreak: s, simulateDoubleBreak: r } = this.options;
    return s != null && s >= i.from && s <= i.to ? r && s == e ? { text: "", from: e } : (t < 0 ? s < e : s <= e) ? { text: i.text.slice(s - i.from), from: s } : { text: i.text.slice(0, s - i.from), from: i.from } : i;
  }
  /**
  Get the text directly after `pos`, either the entire line
  or the next 100 characters, whichever is shorter.
  */
  textAfterPos(e, t = 1) {
    if (this.options.simulateDoubleBreak && e == this.options.simulateBreak)
      return "";
    let { text: i, from: s } = this.lineAt(e, t);
    return i.slice(e - s, Math.min(i.length, e + 100 - s));
  }
  /**
  Find the column for the given position.
  */
  column(e, t = 1) {
    let { text: i, from: s } = this.lineAt(e, t), r = this.countColumn(i, e - s), o = this.options.overrideIndentation ? this.options.overrideIndentation(s) : -1;
    return o > -1 && (r += o - this.countColumn(i, i.search(/\S|$/))), r;
  }
  /**
  Find the column position (taking tabs into account) of the given
  position in the given string.
  */
  countColumn(e, t = e.length) {
    return nn(e, this.state.tabSize, t);
  }
  /**
  Find the indentation column of the line at the given point.
  */
  lineIndent(e, t = 1) {
    let { text: i, from: s } = this.lineAt(e, t), r = this.options.overrideIndentation;
    if (r) {
      let o = r(s);
      if (o > -1)
        return o;
    }
    return this.countColumn(i, i.search(/\S|$/));
  }
  /**
  Returns the [simulated line
  break](https://codemirror.net/6/docs/ref/#language.IndentContext.constructor^options.simulateBreak)
  for this context, if any.
  */
  get simulatedBreak() {
    return this.options.simulateBreak || null;
  }
}
const Ds = /* @__PURE__ */ new A();
function zg(n, e, t) {
  return bf(e.resolveInner(t).enterUnfinishedNodesBefore(t), t, n);
}
function Ig(n) {
  return n.pos == n.options.simulateBreak && n.options.simulateDoubleBreak;
}
function jg(n) {
  let e = n.type.prop(Ds);
  if (e)
    return e;
  let t = n.firstChild, i;
  if (t && (i = t.type.prop(A.closedBy))) {
    let s = n.lastChild, r = s && i.indexOf(s.name) > -1;
    return (o) => Qf(o, !0, 1, void 0, r && !Ig(o) ? s.from : void 0);
  }
  return n.parent == null ? Lg : null;
}
function bf(n, e, t) {
  for (; n; n = n.parent) {
    let i = jg(n);
    if (i)
      return i(Lo.create(t, e, n));
  }
  return null;
}
function Lg() {
  return 0;
}
class Lo extends Ws {
  constructor(e, t, i) {
    super(e.state, e.options), this.base = e, this.pos = t, this.node = i;
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new Lo(e, t, i);
  }
  /**
  Get the text directly after `this.pos`, either the entire line
  or the next 100 characters, whichever is shorter.
  */
  get textAfter() {
    return this.textAfterPos(this.pos);
  }
  /**
  Get the indentation at the reference line for `this.node`, which
  is the line on which it starts, unless there is a node that is
  _not_ a parent of this node covering the start of that line. If
  so, the line at the start of that node is tried, again skipping
  on if it is covered by another such node.
  */
  get baseIndent() {
    return this.baseIndentFor(this.node);
  }
  /**
  Get the indentation for the reference line of the given node
  (see [`baseIndent`](https://codemirror.net/6/docs/ref/#language.TreeIndentContext.baseIndent)).
  */
  baseIndentFor(e) {
    let t = this.state.doc.lineAt(e.from);
    for (; ; ) {
      let i = e.resolve(t.from);
      for (; i.parent && i.parent.from == i.from; )
        i = i.parent;
      if (Ng(i, e))
        break;
      t = this.state.doc.lineAt(i.from);
    }
    return this.lineIndent(t.from);
  }
  /**
  Continue looking for indentations in the node's parent nodes,
  and return the result of that.
  */
  continue() {
    let e = this.node.parent;
    return e ? bf(e, this.pos, this.base) : 0;
  }
}
function Ng(n, e) {
  for (let t = e; t; t = t.parent)
    if (n == t)
      return !0;
  return !1;
}
function Gg(n) {
  let e = n.node, t = e.childAfter(e.from), i = e.lastChild;
  if (!t)
    return null;
  let s = n.options.simulateBreak, r = n.state.doc.lineAt(t.from), o = s == null || s <= r.from ? r.to : Math.min(r.to, s);
  for (let l = t.to; ; ) {
    let a = e.childAfter(l);
    if (!a || a == i)
      return null;
    if (!a.type.isSkipped)
      return a.from < o ? t : null;
    l = a.to;
  }
}
function Fg({ closing: n, align: e = !0, units: t = 1 }) {
  return (i) => Qf(i, e, t, n);
}
function Qf(n, e, t, i, s) {
  let r = n.textAfter, o = r.match(/^\s*/)[0].length, l = i && r.slice(o, o + i.length) == i || s == n.pos + o, a = e ? Gg(n) : null;
  return a ? l ? n.column(a.from) : n.column(a.to) : n.baseIndent + (l ? 0 : n.unit * t);
}
const Hg = (n) => n.baseIndent;
function In({ except: n, units: e = 1 } = {}) {
  return (t) => {
    let i = n && n.test(t.textAfter);
    return t.baseIndent + (i ? 0 : e * t.unit);
  };
}
const Jg = 200;
function Kg() {
  return M.transactionFilter.of((n) => {
    if (!n.docChanged || !n.isUserEvent("input.type") && !n.isUserEvent("input.complete"))
      return n;
    let e = n.startState.languageDataAt("indentOnInput", n.startState.selection.main.head);
    if (!e.length)
      return n;
    let t = n.newDoc, { head: i } = n.newSelection.main, s = t.lineAt(i);
    if (i > s.from + Jg)
      return n;
    let r = t.sliceString(s.from, i);
    if (!e.some((h) => h.test(r)))
      return n;
    let { state: o } = n, l = -1, a = [];
    for (let { head: h } of o.selection.ranges) {
      let c = o.doc.lineAt(h);
      if (c.from == l)
        continue;
      l = c.from;
      let f = jo(o, c.from);
      if (f == null)
        continue;
      let u = /^\s*/.exec(c.text)[0], d = Hi(o, f);
      u != d && a.push({ from: c.from, to: c.from + u.length, insert: d });
    }
    return a.length ? [n, { changes: a, sequential: !0 }] : n;
  });
}
const em = /* @__PURE__ */ P.define(), Us = /* @__PURE__ */ new A();
function xf(n) {
  let e = n.firstChild, t = n.lastChild;
  return e && e.to < t.from ? { from: e.to, to: t.type.isError ? n.to : t.from } : null;
}
function tm(n, e, t) {
  let i = I(n);
  if (i.length < t)
    return null;
  let s = i.resolveInner(t, 1), r = null;
  for (let o = s; o; o = o.parent) {
    if (o.to <= t || o.from > t)
      continue;
    if (r && o.from < e)
      break;
    let l = o.type.prop(Us);
    if (l && (o.to < i.length - 50 || i.length == n.doc.length || !im(o))) {
      let a = l(o, n);
      a && a.from <= t && a.from >= e && a.to > t && (r = a);
    }
  }
  return r;
}
function im(n) {
  let e = n.lastChild;
  return e && e.to == n.to && e.type.isError;
}
function us(n, e, t) {
  for (let i of n.facet(em)) {
    let s = i(n, e, t);
    if (s)
      return s;
  }
  return tm(n, e, t);
}
function wf(n, e) {
  let t = e.mapPos(n.from, 1), i = e.mapPos(n.to, -1);
  return t >= i ? void 0 : { from: t, to: i };
}
const qs = /* @__PURE__ */ R.define({ map: wf }), an = /* @__PURE__ */ R.define({ map: wf });
function $f(n) {
  let e = [];
  for (let { head: t } of n.state.selection.ranges)
    e.some((i) => i.from <= t && i.to >= t) || e.push(n.lineBlockAt(t));
  return e;
}
const It = /* @__PURE__ */ re.define({
  create() {
    return T.none;
  },
  update(n, e) {
    n = n.map(e.changes);
    for (let t of e.effects)
      t.is(qs) && !nm(n, t.value.from, t.value.to) ? n = n.update({ add: [Xa.range(t.value.from, t.value.to)] }) : t.is(an) && (n = n.update({
        filter: (i, s) => t.value.from != i || t.value.to != s,
        filterFrom: t.value.from,
        filterTo: t.value.to
      }));
    if (e.selection) {
      let t = !1, { head: i } = e.selection.main;
      n.between(i, i, (s, r) => {
        s < i && r > i && (t = !0);
      }), t && (n = n.update({
        filterFrom: i,
        filterTo: i,
        filter: (s, r) => r <= i || s >= i
      }));
    }
    return n;
  },
  provide: (n) => k.decorations.from(n),
  toJSON(n, e) {
    let t = [];
    return n.between(0, e.doc.length, (i, s) => {
      t.push(i, s);
    }), t;
  },
  fromJSON(n) {
    if (!Array.isArray(n) || n.length % 2)
      throw new RangeError("Invalid JSON for fold state");
    let e = [];
    for (let t = 0; t < n.length; ) {
      let i = n[t++], s = n[t++];
      if (typeof i != "number" || typeof s != "number")
        throw new RangeError("Invalid JSON for fold state");
      e.push(Xa.range(i, s));
    }
    return T.set(e, !0);
  }
});
function ds(n, e, t) {
  var i;
  let s = null;
  return (i = n.field(It, !1)) === null || i === void 0 || i.between(e, t, (r, o) => {
    (!s || s.from > r) && (s = { from: r, to: o });
  }), s;
}
function nm(n, e, t) {
  let i = !1;
  return n.between(e, e, (s, r) => {
    s == e && r == t && (i = !0);
  }), i;
}
function kf(n, e) {
  return n.field(It, !1) ? e : e.concat(R.appendConfig.of(Cf()));
}
const sm = (n) => {
  for (let e of $f(n)) {
    let t = us(n.state, e.from, e.to);
    if (t)
      return n.dispatch({ effects: kf(n.state, [qs.of(t), vf(n, t)]) }), !0;
  }
  return !1;
}, rm = (n) => {
  if (!n.state.field(It, !1))
    return !1;
  let e = [];
  for (let t of $f(n)) {
    let i = ds(n.state, t.from, t.to);
    i && e.push(an.of(i), vf(n, i, !1));
  }
  return e.length && n.dispatch({ effects: e }), e.length > 0;
};
function vf(n, e, t = !0) {
  let i = n.state.doc.lineAt(e.from).number, s = n.state.doc.lineAt(e.to).number;
  return k.announce.of(`${n.state.phrase(t ? "Folded lines" : "Unfolded lines")} ${i} ${n.state.phrase("to")} ${s}.`);
}
const om = (n) => {
  let { state: e } = n, t = [];
  for (let i = 0; i < e.doc.length; ) {
    let s = n.lineBlockAt(i), r = us(e, s.from, s.to);
    r && t.push(qs.of(r)), i = (r ? n.lineBlockAt(r.to) : s).to + 1;
  }
  return t.length && n.dispatch({ effects: kf(n.state, t) }), !!t.length;
}, lm = (n) => {
  let e = n.state.field(It, !1);
  if (!e || !e.size)
    return !1;
  let t = [];
  return e.between(0, n.state.doc.length, (i, s) => {
    t.push(an.of({ from: i, to: s }));
  }), n.dispatch({ effects: t }), !0;
}, am = [
  { key: "Ctrl-Shift-[", mac: "Cmd-Alt-[", run: sm },
  { key: "Ctrl-Shift-]", mac: "Cmd-Alt-]", run: rm },
  { key: "Ctrl-Alt-[", run: om },
  { key: "Ctrl-Alt-]", run: lm }
], hm = {
  placeholderDOM: null,
  placeholderText: "…"
}, Pf = /* @__PURE__ */ P.define({
  combine(n) {
    return lt(n, hm);
  }
});
function Cf(n) {
  let e = [It, um];
  return n && e.push(Pf.of(n)), e;
}
const Xa = /* @__PURE__ */ T.replace({ widget: /* @__PURE__ */ new class extends St {
  toDOM(n) {
    let { state: e } = n, t = e.facet(Pf), i = (r) => {
      let o = n.lineBlockAt(n.posAtDOM(r.target)), l = ds(n.state, o.from, o.to);
      l && n.dispatch({ effects: an.of(l) }), r.preventDefault();
    };
    if (t.placeholderDOM)
      return t.placeholderDOM(n, i);
    let s = document.createElement("span");
    return s.textContent = t.placeholderText, s.setAttribute("aria-label", e.phrase("folded code")), s.title = e.phrase("unfold"), s.className = "cm-foldPlaceholder", s.onclick = i, s;
  }
}() }), cm = {
  openText: "⌄",
  closedText: "›",
  markerDOM: null,
  domEventHandlers: {},
  foldingChanged: () => !1
};
class fr extends gt {
  constructor(e, t) {
    super(), this.config = e, this.open = t;
  }
  eq(e) {
    return this.config == e.config && this.open == e.open;
  }
  toDOM(e) {
    if (this.config.markerDOM)
      return this.config.markerDOM(this.open);
    let t = document.createElement("span");
    return t.textContent = this.open ? this.config.openText : this.config.closedText, t.title = e.state.phrase(this.open ? "Fold line" : "Unfold line"), t;
  }
}
function fm(n = {}) {
  let e = Object.assign(Object.assign({}, cm), n), t = new fr(e, !0), i = new fr(e, !1), s = ee.fromClass(class {
    constructor(o) {
      this.from = o.viewport.from, this.markers = this.buildMarkers(o);
    }
    update(o) {
      (o.docChanged || o.viewportChanged || o.startState.facet(Rt) != o.state.facet(Rt) || o.startState.field(It, !1) != o.state.field(It, !1) || I(o.startState) != I(o.state) || e.foldingChanged(o)) && (this.markers = this.buildMarkers(o.view));
    }
    buildMarkers(o) {
      let l = new Pt();
      for (let a of o.viewportLineBlocks) {
        let h = ds(o.state, a.from, a.to) ? i : us(o.state, a.from, a.to) ? t : null;
        h && l.add(a.from, a.from, h);
      }
      return l.finish();
    }
  }), { domEventHandlers: r } = e;
  return [
    s,
    cg({
      class: "cm-foldGutter",
      markers(o) {
        var l;
        return ((l = o.plugin(s)) === null || l === void 0 ? void 0 : l.markers) || D.empty;
      },
      initialSpacer() {
        return new fr(e, !1);
      },
      domEventHandlers: Object.assign(Object.assign({}, r), { click: (o, l, a) => {
        if (r.click && r.click(o, l, a))
          return !0;
        let h = ds(o.state, l.from, l.to);
        if (h)
          return o.dispatch({ effects: an.of(h) }), !0;
        let c = us(o.state, l.from, l.to);
        return c ? (o.dispatch({ effects: qs.of(c) }), !0) : !1;
      } })
    }),
    Cf()
  ];
}
const um = /* @__PURE__ */ k.baseTheme({
  ".cm-foldPlaceholder": {
    backgroundColor: "#eee",
    border: "1px solid #ddd",
    color: "#888",
    borderRadius: ".2em",
    margin: "0 1px",
    padding: "0 1px",
    cursor: "pointer"
  },
  ".cm-foldGutter span": {
    padding: "0 1px",
    cursor: "pointer"
  }
});
class hn {
  constructor(e, t) {
    this.specs = e;
    let i;
    function s(l) {
      let a = Ct.newName();
      return (i || (i = /* @__PURE__ */ Object.create(null)))["." + a] = l, a;
    }
    const r = typeof t.all == "string" ? t.all : t.all ? s(t.all) : void 0, o = t.scope;
    this.scope = o instanceof ze ? (l) => l.prop(ei) == o.data : o ? (l) => l == o : void 0, this.style = mf(e.map((l) => ({
      tag: l.tag,
      class: l.class || s(Object.assign({}, l, { tag: null }))
    })), {
      all: r
    }).style, this.module = i ? new Ct(i) : null, this.themeType = t.themeType;
  }
  /**
  Create a highlighter style that associates the given styles to
  the given tags. The specs must be objects that hold a style tag
  or array of tags in their `tag` property, and either a single
  `class` property providing a static CSS class (for highlighter
  that rely on external styling), or a
  [`style-mod`](https://github.com/marijnh/style-mod#documentation)-style
  set of CSS properties (which define the styling for those tags).
  
  The CSS rules created for a highlighter will be emitted in the
  order of the spec's properties. That means that for elements that
  have multiple tags associated with them, styles defined further
  down in the list will have a higher CSS precedence than styles
  defined earlier.
  */
  static define(e, t) {
    return new hn(e, t || {});
  }
}
const Oo = /* @__PURE__ */ P.define(), Xf = /* @__PURE__ */ P.define({
  combine(n) {
    return n.length ? [n[0]] : null;
  }
});
function ur(n) {
  let e = n.facet(Oo);
  return e.length ? e : n.facet(Xf);
}
function Tf(n, e) {
  let t = [Om], i;
  return n instanceof hn && (n.module && t.push(k.styleModule.of(n.module)), i = n.themeType), e != null && e.fallback ? t.push(Xf.of(n)) : i ? t.push(Oo.computeN([k.darkTheme], (s) => s.facet(k.darkTheme) == (i == "dark") ? [n] : [])) : t.push(Oo.of(n)), t;
}
class dm {
  constructor(e) {
    this.markCache = /* @__PURE__ */ Object.create(null), this.tree = I(e.state), this.decorations = this.buildDeco(e, ur(e.state));
  }
  update(e) {
    let t = I(e.state), i = ur(e.state), s = i != ur(e.startState);
    t.length < e.view.viewport.to && !s && t.type == this.tree.type ? this.decorations = this.decorations.map(e.changes) : (t != this.tree || e.viewportChanged || s) && (this.tree = t, this.decorations = this.buildDeco(e.view, i));
  }
  buildDeco(e, t) {
    if (!t || !this.tree.length)
      return T.none;
    let i = new Pt();
    for (let { from: s, to: r } of e.visibleRanges)
      Dg(this.tree, t, (o, l, a) => {
        i.add(o, l, this.markCache[a] || (this.markCache[a] = T.mark({ class: a })));
      }, s, r);
    return i.finish();
  }
}
const Om = /* @__PURE__ */ jt.high(/* @__PURE__ */ ee.fromClass(dm, {
  decorations: (n) => n.decorations
})), pm = /* @__PURE__ */ hn.define([
  {
    tag: p.meta,
    color: "#404740"
  },
  {
    tag: p.link,
    textDecoration: "underline"
  },
  {
    tag: p.heading,
    textDecoration: "underline",
    fontWeight: "bold"
  },
  {
    tag: p.emphasis,
    fontStyle: "italic"
  },
  {
    tag: p.strong,
    fontWeight: "bold"
  },
  {
    tag: p.strikethrough,
    textDecoration: "line-through"
  },
  {
    tag: p.keyword,
    color: "#708"
  },
  {
    tag: [p.atom, p.bool, p.url, p.contentSeparator, p.labelName],
    color: "#219"
  },
  {
    tag: [p.literal, p.inserted],
    color: "#164"
  },
  {
    tag: [p.string, p.deleted],
    color: "#a11"
  },
  {
    tag: [p.regexp, p.escape, /* @__PURE__ */ p.special(p.string)],
    color: "#e40"
  },
  {
    tag: /* @__PURE__ */ p.definition(p.variableName),
    color: "#00f"
  },
  {
    tag: /* @__PURE__ */ p.local(p.variableName),
    color: "#30a"
  },
  {
    tag: [p.typeName, p.namespace],
    color: "#085"
  },
  {
    tag: p.className,
    color: "#167"
  },
  {
    tag: [/* @__PURE__ */ p.special(p.variableName), p.macroName],
    color: "#256"
  },
  {
    tag: /* @__PURE__ */ p.definition(p.propertyName),
    color: "#00c"
  },
  {
    tag: p.comment,
    color: "#940"
  },
  {
    tag: p.invalid,
    color: "#f00"
  }
]), gm = /* @__PURE__ */ k.baseTheme({
  "&.cm-focused .cm-matchingBracket": { backgroundColor: "#328c8252" },
  "&.cm-focused .cm-nonmatchingBracket": { backgroundColor: "#bb555544" }
}), Zf = 1e4, Rf = "()[]{}", Af = /* @__PURE__ */ P.define({
  combine(n) {
    return lt(n, {
      afterCursor: !0,
      brackets: Rf,
      maxScanDistance: Zf,
      renderMatch: ym
    });
  }
}), mm = /* @__PURE__ */ T.mark({ class: "cm-matchingBracket" }), Sm = /* @__PURE__ */ T.mark({ class: "cm-nonmatchingBracket" });
function ym(n) {
  let e = [], t = n.matched ? mm : Sm;
  return e.push(t.range(n.start.from, n.start.to)), n.end && e.push(t.range(n.end.from, n.end.to)), e;
}
const bm = /* @__PURE__ */ re.define({
  create() {
    return T.none;
  },
  update(n, e) {
    if (!e.docChanged && !e.selection)
      return n;
    let t = [], i = e.state.facet(Af);
    for (let s of e.state.selection.ranges) {
      if (!s.empty)
        continue;
      let r = nt(e.state, s.head, -1, i) || s.head > 0 && nt(e.state, s.head - 1, 1, i) || i.afterCursor && (nt(e.state, s.head, 1, i) || s.head < e.state.doc.length && nt(e.state, s.head + 1, -1, i));
      r && (t = t.concat(i.renderMatch(r, e.state)));
    }
    return T.set(t, !0);
  },
  provide: (n) => k.decorations.from(n)
}), Qm = [
  bm,
  gm
];
function xm(n = {}) {
  return [Af.of(n), Qm];
}
const Vf = /* @__PURE__ */ new A();
function po(n, e, t) {
  let i = n.prop(e < 0 ? A.openedBy : A.closedBy);
  if (i)
    return i;
  if (n.name.length == 1) {
    let s = t.indexOf(n.name);
    if (s > -1 && s % 2 == (e < 0 ? 1 : 0))
      return [t[s + e]];
  }
  return null;
}
function go(n) {
  let e = n.type.prop(Vf);
  return e ? e(n.node) : n;
}
function nt(n, e, t, i = {}) {
  let s = i.maxScanDistance || Zf, r = i.brackets || Rf, o = I(n), l = o.resolveInner(e, t);
  for (let a = l; a; a = a.parent) {
    let h = po(a.type, t, r);
    if (h && a.from < a.to) {
      let c = go(a);
      if (c && (t > 0 ? e >= c.from && e < c.to : e > c.from && e <= c.to))
        return wm(n, e, t, a, c, h, r);
    }
  }
  return $m(n, e, t, o, l.type, s, r);
}
function wm(n, e, t, i, s, r, o) {
  let l = i.parent, a = { from: s.from, to: s.to }, h = 0, c = l == null ? void 0 : l.cursor();
  if (c && (t < 0 ? c.childBefore(i.from) : c.childAfter(i.to)))
    do
      if (t < 0 ? c.to <= i.from : c.from >= i.to) {
        if (h == 0 && r.indexOf(c.type.name) > -1 && c.from < c.to) {
          let f = go(c);
          return { start: a, end: f ? { from: f.from, to: f.to } : void 0, matched: !0 };
        } else if (po(c.type, t, o))
          h++;
        else if (po(c.type, -t, o)) {
          if (h == 0) {
            let f = go(c);
            return {
              start: a,
              end: f && f.from < f.to ? { from: f.from, to: f.to } : void 0,
              matched: !1
            };
          }
          h--;
        }
      }
    while (t < 0 ? c.prevSibling() : c.nextSibling());
  return { start: a, matched: !1 };
}
function $m(n, e, t, i, s, r, o) {
  let l = t < 0 ? n.sliceDoc(e - 1, e) : n.sliceDoc(e, e + 1), a = o.indexOf(l);
  if (a < 0 || a % 2 == 0 != t > 0)
    return null;
  let h = { from: t < 0 ? e - 1 : e, to: t > 0 ? e + 1 : e }, c = n.doc.iterRange(e, t > 0 ? n.doc.length : 0), f = 0;
  for (let u = 0; !c.next().done && u <= r; ) {
    let d = c.value;
    t < 0 && (u += d.length);
    let O = e + u * t;
    for (let m = t > 0 ? 0 : d.length - 1, g = t > 0 ? d.length : -1; m != g; m += t) {
      let S = o.indexOf(d[m]);
      if (!(S < 0 || i.resolveInner(O + m, 1).type != s))
        if (S % 2 == 0 == t > 0)
          f++;
        else {
          if (f == 1)
            return { start: h, end: { from: O + m, to: O + m + 1 }, matched: S >> 1 == a >> 1 };
          f--;
        }
    }
    t > 0 && (u += d.length);
  }
  return c.done ? { start: h, matched: !1 } : null;
}
const km = /* @__PURE__ */ Object.create(null), Ta = [be.none], Za = [], vm = /* @__PURE__ */ Object.create(null);
for (let [n, e] of [
  ["variable", "variableName"],
  ["variable-2", "variableName.special"],
  ["string-2", "string.special"],
  ["def", "variableName.definition"],
  ["tag", "tagName"],
  ["attribute", "attributeName"],
  ["type", "typeName"],
  ["builtin", "variableName.standard"],
  ["qualifier", "modifier"],
  ["error", "invalid"],
  ["header", "heading"],
  ["property", "propertyName"]
])
  vm[n] = /* @__PURE__ */ Pm(km, e);
function dr(n, e) {
  Za.indexOf(n) > -1 || (Za.push(n), console.warn(e));
}
function Pm(n, e) {
  let t = null;
  for (let r of e.split(".")) {
    let o = n[r] || p[r];
    o ? typeof o == "function" ? t ? t = o(t) : dr(r, `Modifier ${r} used at start of tag`) : t ? dr(r, `Tag ${r} used as modifier`) : t = o : dr(r, `Unknown highlighting tag ${r}`);
  }
  if (!t)
    return 0;
  let i = e.replace(/ /g, "_"), s = be.define({
    id: Ta.length,
    name: i,
    props: [Ys({ [i]: t })]
  });
  return Ta.push(s), s.id;
}
const Cm = (n) => {
  let { state: e } = n, t = e.doc.lineAt(e.selection.main.from), i = Go(n.state, t.from);
  return i.line ? Xm(n) : i.block ? Zm(n) : !1;
};
function No(n, e) {
  return ({ state: t, dispatch: i }) => {
    if (t.readOnly)
      return !1;
    let s = n(e, t);
    return s ? (i(t.update(s)), !0) : !1;
  };
}
const Xm = /* @__PURE__ */ No(
  Vm,
  0
  /* CommentOption.Toggle */
), Tm = /* @__PURE__ */ No(
  Yf,
  0
  /* CommentOption.Toggle */
), Zm = /* @__PURE__ */ No(
  (n, e) => Yf(n, e, Am(e)),
  0
  /* CommentOption.Toggle */
);
function Go(n, e) {
  let t = n.languageDataAt("commentTokens", e);
  return t.length ? t[0] : {};
}
const Pi = 50;
function Rm(n, { open: e, close: t }, i, s) {
  let r = n.sliceDoc(i - Pi, i), o = n.sliceDoc(s, s + Pi), l = /\s*$/.exec(r)[0].length, a = /^\s*/.exec(o)[0].length, h = r.length - l;
  if (r.slice(h - e.length, h) == e && o.slice(a, a + t.length) == t)
    return {
      open: { pos: i - l, margin: l && 1 },
      close: { pos: s + a, margin: a && 1 }
    };
  let c, f;
  s - i <= 2 * Pi ? c = f = n.sliceDoc(i, s) : (c = n.sliceDoc(i, i + Pi), f = n.sliceDoc(s - Pi, s));
  let u = /^\s*/.exec(c)[0].length, d = /\s*$/.exec(f)[0].length, O = f.length - d - t.length;
  return c.slice(u, u + e.length) == e && f.slice(O, O + t.length) == t ? {
    open: {
      pos: i + u + e.length,
      margin: /\s/.test(c.charAt(u + e.length)) ? 1 : 0
    },
    close: {
      pos: s - d - t.length,
      margin: /\s/.test(f.charAt(O - 1)) ? 1 : 0
    }
  } : null;
}
function Am(n) {
  let e = [];
  for (let t of n.selection.ranges) {
    let i = n.doc.lineAt(t.from), s = t.to <= i.to ? i : n.doc.lineAt(t.to), r = e.length - 1;
    r >= 0 && e[r].to > i.from ? e[r].to = s.to : e.push({ from: i.from + /^\s*/.exec(i.text)[0].length, to: s.to });
  }
  return e;
}
function Yf(n, e, t = e.selection.ranges) {
  let i = t.map((r) => Go(e, r.from).block);
  if (!i.every((r) => r))
    return null;
  let s = t.map((r, o) => Rm(e, i[o], r.from, r.to));
  if (n != 2 && !s.every((r) => r))
    return { changes: e.changes(t.map((r, o) => s[o] ? [] : [{ from: r.from, insert: i[o].open + " " }, { from: r.to, insert: " " + i[o].close }])) };
  if (n != 1 && s.some((r) => r)) {
    let r = [];
    for (let o = 0, l; o < s.length; o++)
      if (l = s[o]) {
        let a = i[o], { open: h, close: c } = l;
        r.push({ from: h.pos - a.open.length, to: h.pos + h.margin }, { from: c.pos - c.margin, to: c.pos + a.close.length });
      }
    return { changes: r };
  }
  return null;
}
function Vm(n, e, t = e.selection.ranges) {
  let i = [], s = -1;
  for (let { from: r, to: o } of t) {
    let l = i.length, a = 1e9, h = Go(e, r).line;
    if (h) {
      for (let c = r; c <= o; ) {
        let f = e.doc.lineAt(c);
        if (f.from > s && (r == o || o > f.from)) {
          s = f.from;
          let u = /^\s*/.exec(f.text)[0].length, d = u == f.length, O = f.text.slice(u, u + h.length) == h ? u : -1;
          u < f.text.length && u < a && (a = u), i.push({ line: f, comment: O, token: h, indent: u, empty: d, single: !1 });
        }
        c = f.to + 1;
      }
      if (a < 1e9)
        for (let c = l; c < i.length; c++)
          i[c].indent < i[c].line.text.length && (i[c].indent = a);
      i.length == l + 1 && (i[l].single = !0);
    }
  }
  if (n != 2 && i.some((r) => r.comment < 0 && (!r.empty || r.single))) {
    let r = [];
    for (let { line: l, token: a, indent: h, empty: c, single: f } of i)
      (f || !c) && r.push({ from: l.from + h, insert: a + " " });
    let o = e.changes(r);
    return { changes: o, selection: e.selection.map(o, 1) };
  } else if (n != 1 && i.some((r) => r.comment >= 0)) {
    let r = [];
    for (let { line: o, comment: l, token: a } of i)
      if (l >= 0) {
        let h = o.from + l, c = h + a.length;
        o.text[c - o.from] == " " && c++, r.push({ from: h, to: c });
      }
    return { changes: r };
  }
  return null;
}
const mo = /* @__PURE__ */ mt.define(), Ym = /* @__PURE__ */ mt.define(), Mm = /* @__PURE__ */ P.define(), Mf = /* @__PURE__ */ P.define({
  combine(n) {
    return lt(n, {
      minDepth: 100,
      newGroupDelay: 500,
      joinToEvent: (e, t) => t
    }, {
      minDepth: Math.max,
      newGroupDelay: Math.min,
      joinToEvent: (e, t) => (i, s) => e(i, s) || t(i, s)
    });
  }
});
function Wm(n) {
  let e = 0;
  return n.iterChangedRanges((t, i) => e = i), e;
}
const Wf = /* @__PURE__ */ re.define({
  create() {
    return st.empty;
  },
  update(n, e) {
    let t = e.state.facet(Mf), i = e.annotation(mo);
    if (i) {
      let a = e.docChanged ? y.single(Wm(e.changes)) : void 0, h = $e.fromTransaction(e, a), c = i.side, f = c == 0 ? n.undone : n.done;
      return h ? f = Os(f, f.length, t.minDepth, h) : f = qf(f, e.startState.selection), new st(c == 0 ? i.rest : f, c == 0 ? f : i.rest);
    }
    let s = e.annotation(Ym);
    if ((s == "full" || s == "before") && (n = n.isolate()), e.annotation(se.addToHistory) === !1)
      return e.changes.empty ? n : n.addMapping(e.changes.desc);
    let r = $e.fromTransaction(e), o = e.annotation(se.time), l = e.annotation(se.userEvent);
    return r ? n = n.addChanges(r, o, l, t, e) : e.selection && (n = n.addSelection(e.startState.selection, o, l, t.newGroupDelay)), (s == "full" || s == "after") && (n = n.isolate()), n;
  },
  toJSON(n) {
    return { done: n.done.map((e) => e.toJSON()), undone: n.undone.map((e) => e.toJSON()) };
  },
  fromJSON(n) {
    return new st(n.done.map($e.fromJSON), n.undone.map($e.fromJSON));
  }
});
function Dm(n = {}) {
  return [
    Wf,
    Mf.of(n),
    k.domEventHandlers({
      beforeinput(e, t) {
        let i = e.inputType == "historyUndo" ? Df : e.inputType == "historyRedo" ? So : null;
        return i ? (e.preventDefault(), i(t)) : !1;
      }
    })
  ];
}
function Es(n, e) {
  return function({ state: t, dispatch: i }) {
    if (!e && t.readOnly)
      return !1;
    let s = t.field(Wf, !1);
    if (!s)
      return !1;
    let r = s.pop(n, t, e);
    return r ? (i(r), !0) : !1;
  };
}
const Df = /* @__PURE__ */ Es(0, !1), So = /* @__PURE__ */ Es(1, !1), Um = /* @__PURE__ */ Es(0, !0), qm = /* @__PURE__ */ Es(1, !0);
class $e {
  constructor(e, t, i, s, r) {
    this.changes = e, this.effects = t, this.mapped = i, this.startSelection = s, this.selectionsAfter = r;
  }
  setSelAfter(e) {
    return new $e(this.changes, this.effects, this.mapped, this.startSelection, e);
  }
  toJSON() {
    var e, t, i;
    return {
      changes: (e = this.changes) === null || e === void 0 ? void 0 : e.toJSON(),
      mapped: (t = this.mapped) === null || t === void 0 ? void 0 : t.toJSON(),
      startSelection: (i = this.startSelection) === null || i === void 0 ? void 0 : i.toJSON(),
      selectionsAfter: this.selectionsAfter.map((s) => s.toJSON())
    };
  }
  static fromJSON(e) {
    return new $e(e.changes && ne.fromJSON(e.changes), [], e.mapped && rt.fromJSON(e.mapped), e.startSelection && y.fromJSON(e.startSelection), e.selectionsAfter.map(y.fromJSON));
  }
  // This does not check `addToHistory` and such, it assumes the
  // transaction needs to be converted to an item. Returns null when
  // there are no changes or effects in the transaction.
  static fromTransaction(e, t) {
    let i = We;
    for (let s of e.startState.facet(Mm)) {
      let r = s(e);
      r.length && (i = i.concat(r));
    }
    return !i.length && e.changes.empty ? null : new $e(e.changes.invert(e.startState.doc), i, void 0, t || e.startState.selection, We);
  }
  static selection(e) {
    return new $e(void 0, We, void 0, void 0, e);
  }
}
function Os(n, e, t, i) {
  let s = e + 1 > t + 20 ? e - t - 1 : 0, r = n.slice(s, e);
  return r.push(i), r;
}
function Em(n, e) {
  let t = [], i = !1;
  return n.iterChangedRanges((s, r) => t.push(s, r)), e.iterChangedRanges((s, r, o, l) => {
    for (let a = 0; a < t.length; ) {
      let h = t[a++], c = t[a++];
      l >= h && o <= c && (i = !0);
    }
  }), i;
}
function _m(n, e) {
  return n.ranges.length == e.ranges.length && n.ranges.filter((t, i) => t.empty != e.ranges[i].empty).length === 0;
}
function Uf(n, e) {
  return n.length ? e.length ? n.concat(e) : n : e;
}
const We = [], Bm = 200;
function qf(n, e) {
  if (n.length) {
    let t = n[n.length - 1], i = t.selectionsAfter.slice(Math.max(0, t.selectionsAfter.length - Bm));
    return i.length && i[i.length - 1].eq(e) ? n : (i.push(e), Os(n, n.length - 1, 1e9, t.setSelAfter(i)));
  } else
    return [$e.selection([e])];
}
function zm(n) {
  let e = n[n.length - 1], t = n.slice();
  return t[n.length - 1] = e.setSelAfter(e.selectionsAfter.slice(0, e.selectionsAfter.length - 1)), t;
}
function Or(n, e) {
  if (!n.length)
    return n;
  let t = n.length, i = We;
  for (; t; ) {
    let s = Im(n[t - 1], e, i);
    if (s.changes && !s.changes.empty || s.effects.length) {
      let r = n.slice(0, t);
      return r[t - 1] = s, r;
    } else
      e = s.mapped, t--, i = s.selectionsAfter;
  }
  return i.length ? [$e.selection(i)] : We;
}
function Im(n, e, t) {
  let i = Uf(n.selectionsAfter.length ? n.selectionsAfter.map((l) => l.map(e)) : We, t);
  if (!n.changes)
    return $e.selection(i);
  let s = n.changes.map(e), r = e.mapDesc(n.changes, !0), o = n.mapped ? n.mapped.composeDesc(r) : r;
  return new $e(s, R.mapEffects(n.effects, e), o, n.startSelection.map(r), i);
}
const jm = /^(input\.type|delete)($|\.)/;
class st {
  constructor(e, t, i = 0, s = void 0) {
    this.done = e, this.undone = t, this.prevTime = i, this.prevUserEvent = s;
  }
  isolate() {
    return this.prevTime ? new st(this.done, this.undone) : this;
  }
  addChanges(e, t, i, s, r) {
    let o = this.done, l = o[o.length - 1];
    return l && l.changes && !l.changes.empty && e.changes && (!i || jm.test(i)) && (!l.selectionsAfter.length && t - this.prevTime < s.newGroupDelay && s.joinToEvent(r, Em(l.changes, e.changes)) || // For compose (but not compose.start) events, always join with previous event
    i == "input.type.compose") ? o = Os(o, o.length - 1, s.minDepth, new $e(e.changes.compose(l.changes), Uf(e.effects, l.effects), l.mapped, l.startSelection, We)) : o = Os(o, o.length, s.minDepth, e), new st(o, We, t, i);
  }
  addSelection(e, t, i, s) {
    let r = this.done.length ? this.done[this.done.length - 1].selectionsAfter : We;
    return r.length > 0 && t - this.prevTime < s && i == this.prevUserEvent && i && /^select($|\.)/.test(i) && _m(r[r.length - 1], e) ? this : new st(qf(this.done, e), this.undone, t, i);
  }
  addMapping(e) {
    return new st(Or(this.done, e), Or(this.undone, e), this.prevTime, this.prevUserEvent);
  }
  pop(e, t, i) {
    let s = e == 0 ? this.done : this.undone;
    if (s.length == 0)
      return null;
    let r = s[s.length - 1];
    if (i && r.selectionsAfter.length)
      return t.update({
        selection: r.selectionsAfter[r.selectionsAfter.length - 1],
        annotations: mo.of({ side: e, rest: zm(s) }),
        userEvent: e == 0 ? "select.undo" : "select.redo",
        scrollIntoView: !0
      });
    if (r.changes) {
      let o = s.length == 1 ? We : s.slice(0, s.length - 1);
      return r.mapped && (o = Or(o, r.mapped)), t.update({
        changes: r.changes,
        selection: r.startSelection,
        effects: r.effects,
        annotations: mo.of({ side: e, rest: o }),
        filter: !1,
        userEvent: e == 0 ? "undo" : "redo",
        scrollIntoView: !0
      });
    } else
      return null;
  }
}
st.empty = /* @__PURE__ */ new st(We, We);
const Lm = [
  { key: "Mod-z", run: Df, preventDefault: !0 },
  { key: "Mod-y", mac: "Mod-Shift-z", run: So, preventDefault: !0 },
  { linux: "Ctrl-Shift-z", run: So, preventDefault: !0 },
  { key: "Mod-u", run: Um, preventDefault: !0 },
  { key: "Alt-u", mac: "Mod-Shift-u", run: qm, preventDefault: !0 }
];
function bi(n, e) {
  return y.create(n.ranges.map(e), n.mainIndex);
}
function at(n, e) {
  return n.update({ selection: e, scrollIntoView: !0, userEvent: "select" });
}
function Ie({ state: n, dispatch: e }, t) {
  let i = bi(n.selection, t);
  return i.eq(n.selection) ? !1 : (e(at(n, i)), !0);
}
function _s(n, e) {
  return y.cursor(e ? n.to : n.from);
}
function Ef(n, e) {
  return Ie(n, (t) => t.empty ? n.moveByChar(t, e) : _s(t, e));
}
function pe(n) {
  return n.textDirectionAt(n.state.selection.main.head) == N.LTR;
}
const _f = (n) => Ef(n, !pe(n)), Bf = (n) => Ef(n, pe(n));
function zf(n, e) {
  return Ie(n, (t) => t.empty ? n.moveByGroup(t, e) : _s(t, e));
}
const Nm = (n) => zf(n, !pe(n)), Gm = (n) => zf(n, pe(n));
function Fm(n, e, t) {
  if (e.type.prop(t))
    return !0;
  let i = e.to - e.from;
  return i && (i > 2 || /[^\s,.;:]/.test(n.sliceDoc(e.from, e.to))) || e.firstChild;
}
function Bs(n, e, t) {
  let i = I(n).resolveInner(e.head), s = t ? A.closedBy : A.openedBy;
  for (let a = e.head; ; ) {
    let h = t ? i.childAfter(a) : i.childBefore(a);
    if (!h)
      break;
    Fm(n, h, s) ? i = h : a = t ? h.to : h.from;
  }
  let r = i.type.prop(s), o, l;
  return r && (o = t ? nt(n, i.from, 1) : nt(n, i.to, -1)) && o.matched ? l = t ? o.end.to : o.end.from : l = t ? i.to : i.from, y.cursor(l, t ? -1 : 1);
}
const Hm = (n) => Ie(n, (e) => Bs(n.state, e, !pe(n))), Jm = (n) => Ie(n, (e) => Bs(n.state, e, pe(n)));
function If(n, e) {
  return Ie(n, (t) => {
    if (!t.empty)
      return _s(t, e);
    let i = n.moveVertically(t, e);
    return i.head != t.head ? i : n.moveToLineBoundary(t, e);
  });
}
const jf = (n) => If(n, !1), Lf = (n) => If(n, !0);
function Nf(n) {
  let e = n.scrollDOM.clientHeight < n.scrollDOM.scrollHeight - 2, t = 0, i = 0, s;
  if (e) {
    for (let r of n.state.facet(k.scrollMargins)) {
      let o = r(n);
      o != null && o.top && (t = Math.max(o == null ? void 0 : o.top, t)), o != null && o.bottom && (i = Math.max(o == null ? void 0 : o.bottom, i));
    }
    s = n.scrollDOM.clientHeight - t - i;
  } else
    s = (n.dom.ownerDocument.defaultView || window).innerHeight;
  return {
    marginTop: t,
    marginBottom: i,
    selfScroll: e,
    height: Math.max(n.defaultLineHeight, s - 5)
  };
}
function Gf(n, e) {
  let t = Nf(n), { state: i } = n, s = bi(i.selection, (o) => o.empty ? n.moveVertically(o, e, t.height) : _s(o, e));
  if (s.eq(i.selection))
    return !1;
  let r;
  if (t.selfScroll) {
    let o = n.coordsAtPos(i.selection.main.head), l = n.scrollDOM.getBoundingClientRect(), a = l.top + t.marginTop, h = l.bottom - t.marginBottom;
    o && o.top > a && o.bottom < h && (r = k.scrollIntoView(s.main.head, { y: "start", yMargin: o.top - a }));
  }
  return n.dispatch(at(i, s), { effects: r }), !0;
}
const Ra = (n) => Gf(n, !1), yo = (n) => Gf(n, !0);
function At(n, e, t) {
  let i = n.lineBlockAt(e.head), s = n.moveToLineBoundary(e, t);
  if (s.head == e.head && s.head != (t ? i.to : i.from) && (s = n.moveToLineBoundary(e, t, !1)), !t && s.head == i.from && i.length) {
    let r = /^\s*/.exec(n.state.sliceDoc(i.from, Math.min(i.from + 100, i.to)))[0].length;
    r && e.head != i.from + r && (s = y.cursor(i.from + r));
  }
  return s;
}
const Km = (n) => Ie(n, (e) => At(n, e, !0)), e0 = (n) => Ie(n, (e) => At(n, e, !1)), t0 = (n) => Ie(n, (e) => At(n, e, !pe(n))), i0 = (n) => Ie(n, (e) => At(n, e, pe(n))), n0 = (n) => Ie(n, (e) => y.cursor(n.lineBlockAt(e.head).from, 1)), s0 = (n) => Ie(n, (e) => y.cursor(n.lineBlockAt(e.head).to, -1));
function r0(n, e, t) {
  let i = !1, s = bi(n.selection, (r) => {
    let o = nt(n, r.head, -1) || nt(n, r.head, 1) || r.head > 0 && nt(n, r.head - 1, 1) || r.head < n.doc.length && nt(n, r.head + 1, -1);
    if (!o || !o.end)
      return r;
    i = !0;
    let l = o.start.from == r.head ? o.end.to : o.end.from;
    return t ? y.range(r.anchor, l) : y.cursor(l);
  });
  return i ? (e(at(n, s)), !0) : !1;
}
const o0 = ({ state: n, dispatch: e }) => r0(n, e, !1);
function qe(n, e) {
  let t = bi(n.state.selection, (i) => {
    let s = e(i);
    return y.range(i.anchor, s.head, s.goalColumn, s.bidiLevel || void 0);
  });
  return t.eq(n.state.selection) ? !1 : (n.dispatch(at(n.state, t)), !0);
}
function Ff(n, e) {
  return qe(n, (t) => n.moveByChar(t, e));
}
const Hf = (n) => Ff(n, !pe(n)), Jf = (n) => Ff(n, pe(n));
function Kf(n, e) {
  return qe(n, (t) => n.moveByGroup(t, e));
}
const l0 = (n) => Kf(n, !pe(n)), a0 = (n) => Kf(n, pe(n)), h0 = (n) => qe(n, (e) => Bs(n.state, e, !pe(n))), c0 = (n) => qe(n, (e) => Bs(n.state, e, pe(n)));
function eu(n, e) {
  return qe(n, (t) => n.moveVertically(t, e));
}
const tu = (n) => eu(n, !1), iu = (n) => eu(n, !0);
function nu(n, e) {
  return qe(n, (t) => n.moveVertically(t, e, Nf(n).height));
}
const Aa = (n) => nu(n, !1), Va = (n) => nu(n, !0), f0 = (n) => qe(n, (e) => At(n, e, !0)), u0 = (n) => qe(n, (e) => At(n, e, !1)), d0 = (n) => qe(n, (e) => At(n, e, !pe(n))), O0 = (n) => qe(n, (e) => At(n, e, pe(n))), p0 = (n) => qe(n, (e) => y.cursor(n.lineBlockAt(e.head).from)), g0 = (n) => qe(n, (e) => y.cursor(n.lineBlockAt(e.head).to)), Ya = ({ state: n, dispatch: e }) => (e(at(n, { anchor: 0 })), !0), Ma = ({ state: n, dispatch: e }) => (e(at(n, { anchor: n.doc.length })), !0), Wa = ({ state: n, dispatch: e }) => (e(at(n, { anchor: n.selection.main.anchor, head: 0 })), !0), Da = ({ state: n, dispatch: e }) => (e(at(n, { anchor: n.selection.main.anchor, head: n.doc.length })), !0), m0 = ({ state: n, dispatch: e }) => (e(n.update({ selection: { anchor: 0, head: n.doc.length }, userEvent: "select" })), !0), S0 = ({ state: n, dispatch: e }) => {
  let t = Is(n).map(({ from: i, to: s }) => y.range(i, Math.min(s + 1, n.doc.length)));
  return e(n.update({ selection: y.create(t), userEvent: "select" })), !0;
}, y0 = ({ state: n, dispatch: e }) => {
  let t = bi(n.selection, (i) => {
    var s;
    let r = I(n).resolveInner(i.head, 1);
    for (; !(r.from < i.from && r.to >= i.to || r.to > i.to && r.from <= i.from || !(!((s = r.parent) === null || s === void 0) && s.parent)); )
      r = r.parent;
    return y.range(r.to, r.from);
  });
  return e(at(n, t)), !0;
}, b0 = ({ state: n, dispatch: e }) => {
  let t = n.selection, i = null;
  return t.ranges.length > 1 ? i = y.create([t.main]) : t.main.empty || (i = y.create([y.cursor(t.main.head)])), i ? (e(at(n, i)), !0) : !1;
};
function zs(n, e) {
  if (n.state.readOnly)
    return !1;
  let t = "delete.selection", { state: i } = n, s = i.changeByRange((r) => {
    let { from: o, to: l } = r;
    if (o == l) {
      let a = e(o);
      a < o ? (t = "delete.backward", a = Tn(n, a, !1)) : a > o && (t = "delete.forward", a = Tn(n, a, !0)), o = Math.min(o, a), l = Math.max(l, a);
    } else
      o = Tn(n, o, !1), l = Tn(n, l, !0);
    return o == l ? { range: r } : { changes: { from: o, to: l }, range: y.cursor(o) };
  });
  return s.changes.empty ? !1 : (n.dispatch(i.update(s, {
    scrollIntoView: !0,
    userEvent: t,
    effects: t == "delete.selection" ? k.announce.of(i.phrase("Selection deleted")) : void 0
  })), !0);
}
function Tn(n, e, t) {
  if (n instanceof k)
    for (let i of n.state.facet(k.atomicRanges).map((s) => s(n)))
      i.between(e, e, (s, r) => {
        s < e && r > e && (e = t ? r : s);
      });
  return e;
}
const su = (n, e) => zs(n, (t) => {
  let { state: i } = n, s = i.doc.lineAt(t), r, o;
  if (!e && t > s.from && t < s.from + 200 && !/[^ \t]/.test(r = s.text.slice(0, t - s.from))) {
    if (r[r.length - 1] == "	")
      return t - 1;
    let l = nn(r, i.tabSize), a = l % fs(i) || fs(i);
    for (let h = 0; h < a && r[r.length - 1 - h] == " "; h++)
      t--;
    o = t;
  } else
    o = Oe(s.text, t - s.from, e, e) + s.from, o == t && s.number != (e ? i.doc.lines : 1) && (o += e ? 1 : -1);
  return o;
}), bo = (n) => su(n, !1), ru = (n) => su(n, !0), ou = (n, e) => zs(n, (t) => {
  let i = t, { state: s } = n, r = s.doc.lineAt(i), o = s.charCategorizer(i);
  for (let l = null; ; ) {
    if (i == (e ? r.to : r.from)) {
      i == t && r.number != (e ? s.doc.lines : 1) && (i += e ? 1 : -1);
      break;
    }
    let a = Oe(r.text, i - r.from, e) + r.from, h = r.text.slice(Math.min(i, a) - r.from, Math.max(i, a) - r.from), c = o(h);
    if (l != null && c != l)
      break;
    (h != " " || i != t) && (l = c), i = a;
  }
  return i;
}), lu = (n) => ou(n, !1), Q0 = (n) => ou(n, !0), au = (n) => zs(n, (e) => {
  let t = n.lineBlockAt(e).to;
  return e < t ? t : Math.min(n.state.doc.length, e + 1);
}), x0 = (n) => zs(n, (e) => {
  let t = n.lineBlockAt(e).from;
  return e > t ? t : Math.max(0, e - 1);
}), w0 = ({ state: n, dispatch: e }) => {
  if (n.readOnly)
    return !1;
  let t = n.changeByRange((i) => ({
    changes: { from: i.from, to: i.to, insert: W.of(["", ""]) },
    range: y.cursor(i.from)
  }));
  return e(n.update(t, { scrollIntoView: !0, userEvent: "input" })), !0;
}, $0 = ({ state: n, dispatch: e }) => {
  if (n.readOnly)
    return !1;
  let t = n.changeByRange((i) => {
    if (!i.empty || i.from == 0 || i.from == n.doc.length)
      return { range: i };
    let s = i.from, r = n.doc.lineAt(s), o = s == r.from ? s - 1 : Oe(r.text, s - r.from, !1) + r.from, l = s == r.to ? s + 1 : Oe(r.text, s - r.from, !0) + r.from;
    return {
      changes: { from: o, to: l, insert: n.doc.slice(s, l).append(n.doc.slice(o, s)) },
      range: y.cursor(l)
    };
  });
  return t.changes.empty ? !1 : (e(n.update(t, { scrollIntoView: !0, userEvent: "move.character" })), !0);
};
function Is(n) {
  let e = [], t = -1;
  for (let i of n.selection.ranges) {
    let s = n.doc.lineAt(i.from), r = n.doc.lineAt(i.to);
    if (!i.empty && i.to == r.from && (r = n.doc.lineAt(i.to - 1)), t >= s.number) {
      let o = e[e.length - 1];
      o.to = r.to, o.ranges.push(i);
    } else
      e.push({ from: s.from, to: r.to, ranges: [i] });
    t = r.number + 1;
  }
  return e;
}
function hu(n, e, t) {
  if (n.readOnly)
    return !1;
  let i = [], s = [];
  for (let r of Is(n)) {
    if (t ? r.to == n.doc.length : r.from == 0)
      continue;
    let o = n.doc.lineAt(t ? r.to + 1 : r.from - 1), l = o.length + 1;
    if (t) {
      i.push({ from: r.to, to: o.to }, { from: r.from, insert: o.text + n.lineBreak });
      for (let a of r.ranges)
        s.push(y.range(Math.min(n.doc.length, a.anchor + l), Math.min(n.doc.length, a.head + l)));
    } else {
      i.push({ from: o.from, to: r.from }, { from: r.to, insert: n.lineBreak + o.text });
      for (let a of r.ranges)
        s.push(y.range(a.anchor - l, a.head - l));
    }
  }
  return i.length ? (e(n.update({
    changes: i,
    scrollIntoView: !0,
    selection: y.create(s, n.selection.mainIndex),
    userEvent: "move.line"
  })), !0) : !1;
}
const k0 = ({ state: n, dispatch: e }) => hu(n, e, !1), v0 = ({ state: n, dispatch: e }) => hu(n, e, !0);
function cu(n, e, t) {
  if (n.readOnly)
    return !1;
  let i = [];
  for (let s of Is(n))
    t ? i.push({ from: s.from, insert: n.doc.slice(s.from, s.to) + n.lineBreak }) : i.push({ from: s.to, insert: n.lineBreak + n.doc.slice(s.from, s.to) });
  return e(n.update({ changes: i, scrollIntoView: !0, userEvent: "input.copyline" })), !0;
}
const P0 = ({ state: n, dispatch: e }) => cu(n, e, !1), C0 = ({ state: n, dispatch: e }) => cu(n, e, !0), X0 = (n) => {
  if (n.state.readOnly)
    return !1;
  let { state: e } = n, t = e.changes(Is(e).map(({ from: s, to: r }) => (s > 0 ? s-- : r < e.doc.length && r++, { from: s, to: r }))), i = bi(e.selection, (s) => n.moveVertically(s, !0)).map(t);
  return n.dispatch({ changes: t, selection: i, scrollIntoView: !0, userEvent: "delete.line" }), !0;
};
function T0(n, e) {
  if (/\(\)|\[\]|\{\}/.test(n.sliceDoc(e - 1, e + 1)))
    return { from: e, to: e };
  let t = I(n).resolveInner(e), i = t.childBefore(e), s = t.childAfter(e), r;
  return i && s && i.to <= e && s.from >= e && (r = i.type.prop(A.closedBy)) && r.indexOf(s.name) > -1 && n.doc.lineAt(i.to).from == n.doc.lineAt(s.from).from ? { from: i.to, to: s.from } : null;
}
const Z0 = /* @__PURE__ */ fu(!1), R0 = /* @__PURE__ */ fu(!0);
function fu(n) {
  return ({ state: e, dispatch: t }) => {
    if (e.readOnly)
      return !1;
    let i = e.changeByRange((s) => {
      let { from: r, to: o } = s, l = e.doc.lineAt(r), a = !n && r == o && T0(e, r);
      n && (r = o = (o <= l.to ? l : e.doc.lineAt(o)).to);
      let h = new Ws(e, { simulateBreak: r, simulateDoubleBreak: !!a }), c = jo(h, r);
      for (c == null && (c = /^\s*/.exec(e.doc.lineAt(r).text)[0].length); o < l.to && /\s/.test(l.text[o - l.from]); )
        o++;
      a ? { from: r, to: o } = a : r > l.from && r < l.from + 100 && !/\S/.test(l.text.slice(0, r)) && (r = l.from);
      let f = ["", Hi(e, c)];
      return a && f.push(Hi(e, h.lineIndent(l.from, -1))), {
        changes: { from: r, to: o, insert: W.of(f) },
        range: y.cursor(r + 1 + f[1].length)
      };
    });
    return t(e.update(i, { scrollIntoView: !0, userEvent: "input" })), !0;
  };
}
function Fo(n, e) {
  let t = -1;
  return n.changeByRange((i) => {
    let s = [];
    for (let o = i.from; o <= i.to; ) {
      let l = n.doc.lineAt(o);
      l.number > t && (i.empty || i.to > l.from) && (e(l, s, i), t = l.number), o = l.to + 1;
    }
    let r = n.changes(s);
    return {
      changes: s,
      range: y.range(r.mapPos(i.anchor, 1), r.mapPos(i.head, 1))
    };
  });
}
const A0 = ({ state: n, dispatch: e }) => {
  if (n.readOnly)
    return !1;
  let t = /* @__PURE__ */ Object.create(null), i = new Ws(n, { overrideIndentation: (r) => {
    let o = t[r];
    return o ?? -1;
  } }), s = Fo(n, (r, o, l) => {
    let a = jo(i, r.from);
    if (a == null)
      return;
    /\S/.test(r.text) || (a = 0);
    let h = /^\s*/.exec(r.text)[0], c = Hi(n, a);
    (h != c || l.from < r.from + h.length) && (t[r.from] = a, o.push({ from: r.from, to: r.from + h.length, insert: c }));
  });
  return s.changes.empty || e(n.update(s, { userEvent: "indent" })), !0;
}, uu = ({ state: n, dispatch: e }) => n.readOnly ? !1 : (e(n.update(Fo(n, (t, i) => {
  i.push({ from: t.from, insert: n.facet(Ms) });
}), { userEvent: "input.indent" })), !0), du = ({ state: n, dispatch: e }) => n.readOnly ? !1 : (e(n.update(Fo(n, (t, i) => {
  let s = /^\s*/.exec(t.text)[0];
  if (!s)
    return;
  let r = nn(s, n.tabSize), o = 0, l = Hi(n, Math.max(0, r - fs(n)));
  for (; o < s.length && o < l.length && s.charCodeAt(o) == l.charCodeAt(o); )
    o++;
  i.push({ from: t.from + o, to: t.from + s.length, insert: l.slice(o) });
}), { userEvent: "delete.dedent" })), !0), V0 = [
  { key: "Ctrl-b", run: _f, shift: Hf, preventDefault: !0 },
  { key: "Ctrl-f", run: Bf, shift: Jf },
  { key: "Ctrl-p", run: jf, shift: tu },
  { key: "Ctrl-n", run: Lf, shift: iu },
  { key: "Ctrl-a", run: n0, shift: p0 },
  { key: "Ctrl-e", run: s0, shift: g0 },
  { key: "Ctrl-d", run: ru },
  { key: "Ctrl-h", run: bo },
  { key: "Ctrl-k", run: au },
  { key: "Ctrl-Alt-h", run: lu },
  { key: "Ctrl-o", run: w0 },
  { key: "Ctrl-t", run: $0 },
  { key: "Ctrl-v", run: yo }
], Y0 = /* @__PURE__ */ [
  { key: "ArrowLeft", run: _f, shift: Hf, preventDefault: !0 },
  { key: "Mod-ArrowLeft", mac: "Alt-ArrowLeft", run: Nm, shift: l0, preventDefault: !0 },
  { mac: "Cmd-ArrowLeft", run: t0, shift: d0, preventDefault: !0 },
  { key: "ArrowRight", run: Bf, shift: Jf, preventDefault: !0 },
  { key: "Mod-ArrowRight", mac: "Alt-ArrowRight", run: Gm, shift: a0, preventDefault: !0 },
  { mac: "Cmd-ArrowRight", run: i0, shift: O0, preventDefault: !0 },
  { key: "ArrowUp", run: jf, shift: tu, preventDefault: !0 },
  { mac: "Cmd-ArrowUp", run: Ya, shift: Wa },
  { mac: "Ctrl-ArrowUp", run: Ra, shift: Aa },
  { key: "ArrowDown", run: Lf, shift: iu, preventDefault: !0 },
  { mac: "Cmd-ArrowDown", run: Ma, shift: Da },
  { mac: "Ctrl-ArrowDown", run: yo, shift: Va },
  { key: "PageUp", run: Ra, shift: Aa },
  { key: "PageDown", run: yo, shift: Va },
  { key: "Home", run: e0, shift: u0, preventDefault: !0 },
  { key: "Mod-Home", run: Ya, shift: Wa },
  { key: "End", run: Km, shift: f0, preventDefault: !0 },
  { key: "Mod-End", run: Ma, shift: Da },
  { key: "Enter", run: Z0 },
  { key: "Mod-a", run: m0 },
  { key: "Backspace", run: bo, shift: bo },
  { key: "Delete", run: ru },
  { key: "Mod-Backspace", mac: "Alt-Backspace", run: lu },
  { key: "Mod-Delete", mac: "Alt-Delete", run: Q0 },
  { mac: "Mod-Backspace", run: x0 },
  { mac: "Mod-Delete", run: au }
].concat(/* @__PURE__ */ V0.map((n) => ({ mac: n.key, run: n.run, shift: n.shift }))), M0 = /* @__PURE__ */ [
  { key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: Hm, shift: h0 },
  { key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: Jm, shift: c0 },
  { key: "Alt-ArrowUp", run: k0 },
  { key: "Shift-Alt-ArrowUp", run: P0 },
  { key: "Alt-ArrowDown", run: v0 },
  { key: "Shift-Alt-ArrowDown", run: C0 },
  { key: "Escape", run: b0 },
  { key: "Mod-Enter", run: R0 },
  { key: "Alt-l", mac: "Ctrl-l", run: S0 },
  { key: "Mod-i", run: y0, preventDefault: !0 },
  { key: "Mod-[", run: du },
  { key: "Mod-]", run: uu },
  { key: "Mod-Alt-\\", run: A0 },
  { key: "Shift-Mod-k", run: X0 },
  { key: "Shift-Mod-\\", run: o0 },
  { key: "Mod-/", run: Cm },
  { key: "Alt-A", run: Tm }
].concat(Y0), W0 = { key: "Tab", run: uu, shift: du };
class ps {
  /// @internal
  constructor(e, t, i, s, r, o, l, a, h, c = 0, f) {
    this.p = e, this.stack = t, this.state = i, this.reducePos = s, this.pos = r, this.score = o, this.buffer = l, this.bufferBase = a, this.curContext = h, this.lookAhead = c, this.parent = f;
  }
  /// @internal
  toString() {
    return `[${this.stack.filter((e, t) => t % 3 == 0).concat(this.state)}]@${this.pos}${this.score ? "!" + this.score : ""}`;
  }
  // Start an empty stack
  /// @internal
  static start(e, t, i = 0) {
    let s = e.parser.context;
    return new ps(e, [], t, i, i, 0, [], 0, s ? new Ua(s, s.start) : null, 0, null);
  }
  /// The stack's current [context](#lr.ContextTracker) value, if
  /// any. Its type will depend on the context tracker's type
  /// parameter, or it will be `null` if there is no context
  /// tracker.
  get context() {
    return this.curContext ? this.curContext.context : null;
  }
  // Push a state onto the stack, tracking its start position as well
  // as the buffer base at that point.
  /// @internal
  pushState(e, t) {
    this.stack.push(this.state, t, this.bufferBase + this.buffer.length), this.state = e;
  }
  // Apply a reduce action
  /// @internal
  reduce(e) {
    var t;
    let i = e >> 19, s = e & 65535, { parser: r } = this.p, o = r.dynamicPrecedence(s);
    if (o && (this.score += o), i == 0) {
      this.pushState(r.getGoto(this.state, s, !0), this.reducePos), s < r.minRepeatTerm && this.storeNode(s, this.reducePos, this.reducePos, 4, !0), this.reduceContext(s, this.reducePos);
      return;
    }
    let l = this.stack.length - (i - 1) * 3 - (e & 262144 ? 6 : 0), a = l ? this.stack[l - 2] : this.p.ranges[0].from, h = this.reducePos - a;
    h >= 2e3 && !(!((t = this.p.parser.nodeSet.types[s]) === null || t === void 0) && t.isAnonymous) && (a == this.p.lastBigReductionStart ? (this.p.bigReductionCount++, this.p.lastBigReductionSize = h) : this.p.lastBigReductionSize < h && (this.p.bigReductionCount = 1, this.p.lastBigReductionStart = a, this.p.lastBigReductionSize = h));
    let c = l ? this.stack[l - 1] : 0, f = this.bufferBase + this.buffer.length - c;
    if (s < r.minRepeatTerm || e & 131072) {
      let u = r.stateFlag(
        this.state,
        1
        /* StateFlag.Skipped */
      ) ? this.pos : this.reducePos;
      this.storeNode(s, a, u, f + 4, !0);
    }
    if (e & 262144)
      this.state = this.stack[l];
    else {
      let u = this.stack[l - 3];
      this.state = r.getGoto(u, s, !0);
    }
    for (; this.stack.length > l; )
      this.stack.pop();
    this.reduceContext(s, a);
  }
  // Shift a value into the buffer
  /// @internal
  storeNode(e, t, i, s = 4, r = !1) {
    if (e == 0 && (!this.stack.length || this.stack[this.stack.length - 1] < this.buffer.length + this.bufferBase)) {
      let o = this, l = this.buffer.length;
      if (l == 0 && o.parent && (l = o.bufferBase - o.parent.bufferBase, o = o.parent), l > 0 && o.buffer[l - 4] == 0 && o.buffer[l - 1] > -1) {
        if (t == i)
          return;
        if (o.buffer[l - 2] >= t) {
          o.buffer[l - 2] = i;
          return;
        }
      }
    }
    if (!r || this.pos == i)
      this.buffer.push(e, t, i, s);
    else {
      let o = this.buffer.length;
      if (o > 0 && this.buffer[o - 4] != 0)
        for (; o > 0 && this.buffer[o - 2] > i; )
          this.buffer[o] = this.buffer[o - 4], this.buffer[o + 1] = this.buffer[o - 3], this.buffer[o + 2] = this.buffer[o - 2], this.buffer[o + 3] = this.buffer[o - 1], o -= 4, s > 4 && (s -= 4);
      this.buffer[o] = e, this.buffer[o + 1] = t, this.buffer[o + 2] = i, this.buffer[o + 3] = s;
    }
  }
  // Apply a shift action
  /// @internal
  shift(e, t, i) {
    let s = this.pos;
    if (e & 131072)
      this.pushState(e & 65535, this.pos);
    else if (e & 262144)
      this.pos = i, this.shiftContext(t, s), t <= this.p.parser.maxNode && this.buffer.push(t, s, i, 4);
    else {
      let r = e, { parser: o } = this.p;
      (i > this.pos || t <= o.maxNode) && (this.pos = i, o.stateFlag(
        r,
        1
        /* StateFlag.Skipped */
      ) || (this.reducePos = i)), this.pushState(r, s), this.shiftContext(t, s), t <= o.maxNode && this.buffer.push(t, s, i, 4);
    }
  }
  // Apply an action
  /// @internal
  apply(e, t, i) {
    e & 65536 ? this.reduce(e) : this.shift(e, t, i);
  }
  // Add a prebuilt (reused) node into the buffer.
  /// @internal
  useNode(e, t) {
    let i = this.p.reused.length - 1;
    (i < 0 || this.p.reused[i] != e) && (this.p.reused.push(e), i++);
    let s = this.pos;
    this.reducePos = this.pos = s + e.length, this.pushState(t, s), this.buffer.push(
      i,
      s,
      this.reducePos,
      -1
      /* size == -1 means this is a reused value */
    ), this.curContext && this.updateContext(this.curContext.tracker.reuse(this.curContext.context, e, this, this.p.stream.reset(this.pos - e.length)));
  }
  // Split the stack. Due to the buffer sharing and the fact
  // that `this.stack` tends to stay quite shallow, this isn't very
  // expensive.
  /// @internal
  split() {
    let e = this, t = e.buffer.length;
    for (; t > 0 && e.buffer[t - 2] > e.reducePos; )
      t -= 4;
    let i = e.buffer.slice(t), s = e.bufferBase + t;
    for (; e && s == e.bufferBase; )
      e = e.parent;
    return new ps(this.p, this.stack.slice(), this.state, this.reducePos, this.pos, this.score, i, s, this.curContext, this.lookAhead, e);
  }
  // Try to recover from an error by 'deleting' (ignoring) one token.
  /// @internal
  recoverByDelete(e, t) {
    let i = e <= this.p.parser.maxNode;
    i && this.storeNode(e, this.pos, t, 4), this.storeNode(0, this.pos, t, i ? 8 : 4), this.pos = this.reducePos = t, this.score -= 190;
  }
  /// Check if the given term would be able to be shifted (optionally
  /// after some reductions) on this stack. This can be useful for
  /// external tokenizers that want to make sure they only provide a
  /// given token when it applies.
  canShift(e) {
    for (let t = new D0(this); ; ) {
      let i = this.p.parser.stateSlot(
        t.state,
        4
        /* ParseState.DefaultReduce */
      ) || this.p.parser.hasAction(t.state, e);
      if (i == 0)
        return !1;
      if (!(i & 65536))
        return !0;
      t.reduce(i);
    }
  }
  // Apply up to Recover.MaxNext recovery actions that conceptually
  // inserts some missing token or rule.
  /// @internal
  recoverByInsert(e) {
    if (this.stack.length >= 300)
      return [];
    let t = this.p.parser.nextStates(this.state);
    if (t.length > 8 || this.stack.length >= 120) {
      let s = [];
      for (let r = 0, o; r < t.length; r += 2)
        (o = t[r + 1]) != this.state && this.p.parser.hasAction(o, e) && s.push(t[r], o);
      if (this.stack.length < 120)
        for (let r = 0; s.length < 8 && r < t.length; r += 2) {
          let o = t[r + 1];
          s.some((l, a) => a & 1 && l == o) || s.push(t[r], o);
        }
      t = s;
    }
    let i = [];
    for (let s = 0; s < t.length && i.length < 4; s += 2) {
      let r = t[s + 1];
      if (r == this.state)
        continue;
      let o = this.split();
      o.pushState(r, this.pos), o.storeNode(0, o.pos, o.pos, 4, !0), o.shiftContext(t[s], this.pos), o.score -= 200, i.push(o);
    }
    return i;
  }
  // Force a reduce, if possible. Return false if that can't
  // be done.
  /// @internal
  forceReduce() {
    let { parser: e } = this.p, t = e.stateSlot(
      this.state,
      5
      /* ParseState.ForcedReduce */
    );
    if (!(t & 65536))
      return !1;
    if (!e.validAction(this.state, t)) {
      let i = t >> 19, s = t & 65535, r = this.stack.length - i * 3;
      if (r < 0 || e.getGoto(this.stack[r], s, !1) < 0) {
        let o = this.findForcedReduction();
        if (o == null)
          return !1;
        t = o;
      }
      this.storeNode(0, this.pos, this.pos, 4, !0), this.score -= 100;
    }
    return this.reducePos = this.pos, this.reduce(t), !0;
  }
  /// Try to scan through the automaton to find some kind of reduction
  /// that can be applied. Used when the regular ForcedReduce field
  /// isn't a valid action. @internal
  findForcedReduction() {
    let { parser: e } = this.p, t = [], i = (s, r) => {
      if (!t.includes(s))
        return t.push(s), e.allActions(s, (o) => {
          if (!(o & 393216))
            if (o & 65536) {
              let l = (o >> 19) - r;
              if (l > 1) {
                let a = o & 65535, h = this.stack.length - l * 3;
                if (h >= 0 && e.getGoto(this.stack[h], a, !1) >= 0)
                  return l << 19 | 65536 | a;
              }
            } else {
              let l = i(o, r + 1);
              if (l != null)
                return l;
            }
        });
    };
    return i(this.state, 0);
  }
  /// @internal
  forceAll() {
    for (; !this.p.parser.stateFlag(
      this.state,
      2
      /* StateFlag.Accepting */
    ); )
      if (!this.forceReduce()) {
        this.storeNode(0, this.pos, this.pos, 4, !0);
        break;
      }
    return this;
  }
  /// Check whether this state has no further actions (assumed to be a direct descendant of the
  /// top state, since any other states must be able to continue
  /// somehow). @internal
  get deadEnd() {
    if (this.stack.length != 3)
      return !1;
    let { parser: e } = this.p;
    return e.data[e.stateSlot(
      this.state,
      1
      /* ParseState.Actions */
    )] == 65535 && !e.stateSlot(
      this.state,
      4
      /* ParseState.DefaultReduce */
    );
  }
  /// Restart the stack (put it back in its start state). Only safe
  /// when this.stack.length == 3 (state is directly below the top
  /// state). @internal
  restart() {
    this.state = this.stack[0], this.stack.length = 0;
  }
  /// @internal
  sameState(e) {
    if (this.state != e.state || this.stack.length != e.stack.length)
      return !1;
    for (let t = 0; t < this.stack.length; t += 3)
      if (this.stack[t] != e.stack[t])
        return !1;
    return !0;
  }
  /// Get the parser used by this stack.
  get parser() {
    return this.p.parser;
  }
  /// Test whether a given dialect (by numeric ID, as exported from
  /// the terms file) is enabled.
  dialectEnabled(e) {
    return this.p.parser.dialect.flags[e];
  }
  shiftContext(e, t) {
    this.curContext && this.updateContext(this.curContext.tracker.shift(this.curContext.context, e, this, this.p.stream.reset(t)));
  }
  reduceContext(e, t) {
    this.curContext && this.updateContext(this.curContext.tracker.reduce(this.curContext.context, e, this, this.p.stream.reset(t)));
  }
  /// @internal
  emitContext() {
    let e = this.buffer.length - 1;
    (e < 0 || this.buffer[e] != -3) && this.buffer.push(this.curContext.hash, this.pos, this.pos, -3);
  }
  /// @internal
  emitLookAhead() {
    let e = this.buffer.length - 1;
    (e < 0 || this.buffer[e] != -4) && this.buffer.push(this.lookAhead, this.pos, this.pos, -4);
  }
  updateContext(e) {
    if (e != this.curContext.context) {
      let t = new Ua(this.curContext.tracker, e);
      t.hash != this.curContext.hash && this.emitContext(), this.curContext = t;
    }
  }
  /// @internal
  setLookAhead(e) {
    e > this.lookAhead && (this.emitLookAhead(), this.lookAhead = e);
  }
  /// @internal
  close() {
    this.curContext && this.curContext.tracker.strict && this.emitContext(), this.lookAhead > 0 && this.emitLookAhead();
  }
}
class Ua {
  constructor(e, t) {
    this.tracker = e, this.context = t, this.hash = e.strict ? e.hash(t) : 0;
  }
}
var qa;
(function(n) {
  n[n.Insert = 200] = "Insert", n[n.Delete = 190] = "Delete", n[n.Reduce = 100] = "Reduce", n[n.MaxNext = 4] = "MaxNext", n[n.MaxInsertStackDepth = 300] = "MaxInsertStackDepth", n[n.DampenInsertStackDepth = 120] = "DampenInsertStackDepth", n[n.MinBigReduction = 2e3] = "MinBigReduction";
})(qa || (qa = {}));
class D0 {
  constructor(e) {
    this.start = e, this.state = e.state, this.stack = e.stack, this.base = this.stack.length;
  }
  reduce(e) {
    let t = e & 65535, i = e >> 19;
    i == 0 ? (this.stack == this.start.stack && (this.stack = this.stack.slice()), this.stack.push(this.state, 0, 0), this.base += 3) : this.base -= (i - 1) * 3;
    let s = this.start.p.parser.getGoto(this.stack[this.base - 3], t, !0);
    this.state = s;
  }
}
class gs {
  constructor(e, t, i) {
    this.stack = e, this.pos = t, this.index = i, this.buffer = e.buffer, this.index == 0 && this.maybeNext();
  }
  static create(e, t = e.bufferBase + e.buffer.length) {
    return new gs(e, t, t - e.bufferBase);
  }
  maybeNext() {
    let e = this.stack.parent;
    e != null && (this.index = this.stack.bufferBase - e.bufferBase, this.stack = e, this.buffer = e.buffer);
  }
  get id() {
    return this.buffer[this.index - 4];
  }
  get start() {
    return this.buffer[this.index - 3];
  }
  get end() {
    return this.buffer[this.index - 2];
  }
  get size() {
    return this.buffer[this.index - 1];
  }
  next() {
    this.index -= 4, this.pos -= 4, this.index == 0 && this.maybeNext();
  }
  fork() {
    return new gs(this.stack, this.pos, this.index);
  }
}
function Wi(n, e = Uint16Array) {
  if (typeof n != "string")
    return n;
  let t = null;
  for (let i = 0, s = 0; i < n.length; ) {
    let r = 0;
    for (; ; ) {
      let o = n.charCodeAt(i++), l = !1;
      if (o == 126) {
        r = 65535;
        break;
      }
      o >= 92 && o--, o >= 34 && o--;
      let a = o - 32;
      if (a >= 46 && (a -= 46, l = !0), r += a, l)
        break;
      r *= 46;
    }
    t ? t[s++] = r : t = new e(r);
  }
  return t;
}
class jn {
  constructor() {
    this.start = -1, this.value = -1, this.end = -1, this.extended = -1, this.lookAhead = 0, this.mask = 0, this.context = 0;
  }
}
const Ea = new jn();
class U0 {
  /// @internal
  constructor(e, t) {
    this.input = e, this.ranges = t, this.chunk = "", this.chunkOff = 0, this.chunk2 = "", this.chunk2Pos = 0, this.next = -1, this.token = Ea, this.rangeIndex = 0, this.pos = this.chunkPos = t[0].from, this.range = t[0], this.end = t[t.length - 1].to, this.readNext();
  }
  /// @internal
  resolveOffset(e, t) {
    let i = this.range, s = this.rangeIndex, r = this.pos + e;
    for (; r < i.from; ) {
      if (!s)
        return null;
      let o = this.ranges[--s];
      r -= i.from - o.to, i = o;
    }
    for (; t < 0 ? r > i.to : r >= i.to; ) {
      if (s == this.ranges.length - 1)
        return null;
      let o = this.ranges[++s];
      r += o.from - i.to, i = o;
    }
    return r;
  }
  /// @internal
  clipPos(e) {
    if (e >= this.range.from && e < this.range.to)
      return e;
    for (let t of this.ranges)
      if (t.to > e)
        return Math.max(e, t.from);
    return this.end;
  }
  /// Look at a code unit near the stream position. `.peek(0)` equals
  /// `.next`, `.peek(-1)` gives you the previous character, and so
  /// on.
  ///
  /// Note that looking around during tokenizing creates dependencies
  /// on potentially far-away content, which may reduce the
  /// effectiveness incremental parsing—when looking forward—or even
  /// cause invalid reparses when looking backward more than 25 code
  /// units, since the library does not track lookbehind.
  peek(e) {
    let t = this.chunkOff + e, i, s;
    if (t >= 0 && t < this.chunk.length)
      i = this.pos + e, s = this.chunk.charCodeAt(t);
    else {
      let r = this.resolveOffset(e, 1);
      if (r == null)
        return -1;
      if (i = r, i >= this.chunk2Pos && i < this.chunk2Pos + this.chunk2.length)
        s = this.chunk2.charCodeAt(i - this.chunk2Pos);
      else {
        let o = this.rangeIndex, l = this.range;
        for (; l.to <= i; )
          l = this.ranges[++o];
        this.chunk2 = this.input.chunk(this.chunk2Pos = i), i + this.chunk2.length > l.to && (this.chunk2 = this.chunk2.slice(0, l.to - i)), s = this.chunk2.charCodeAt(0);
      }
    }
    return i >= this.token.lookAhead && (this.token.lookAhead = i + 1), s;
  }
  /// Accept a token. By default, the end of the token is set to the
  /// current stream position, but you can pass an offset (relative to
  /// the stream position) to change that.
  acceptToken(e, t = 0) {
    let i = t ? this.resolveOffset(t, -1) : this.pos;
    if (i == null || i < this.token.start)
      throw new RangeError("Token end out of bounds");
    this.token.value = e, this.token.end = i;
  }
  getChunk() {
    if (this.pos >= this.chunk2Pos && this.pos < this.chunk2Pos + this.chunk2.length) {
      let { chunk: e, chunkPos: t } = this;
      this.chunk = this.chunk2, this.chunkPos = this.chunk2Pos, this.chunk2 = e, this.chunk2Pos = t, this.chunkOff = this.pos - this.chunkPos;
    } else {
      this.chunk2 = this.chunk, this.chunk2Pos = this.chunkPos;
      let e = this.input.chunk(this.pos), t = this.pos + e.length;
      this.chunk = t > this.range.to ? e.slice(0, this.range.to - this.pos) : e, this.chunkPos = this.pos, this.chunkOff = 0;
    }
  }
  readNext() {
    return this.chunkOff >= this.chunk.length && (this.getChunk(), this.chunkOff == this.chunk.length) ? this.next = -1 : this.next = this.chunk.charCodeAt(this.chunkOff);
  }
  /// Move the stream forward N (defaults to 1) code units. Returns
  /// the new value of [`next`](#lr.InputStream.next).
  advance(e = 1) {
    for (this.chunkOff += e; this.pos + e >= this.range.to; ) {
      if (this.rangeIndex == this.ranges.length - 1)
        return this.setDone();
      e -= this.range.to - this.pos, this.range = this.ranges[++this.rangeIndex], this.pos = this.range.from;
    }
    return this.pos += e, this.pos >= this.token.lookAhead && (this.token.lookAhead = this.pos + 1), this.readNext();
  }
  setDone() {
    return this.pos = this.chunkPos = this.end, this.range = this.ranges[this.rangeIndex = this.ranges.length - 1], this.chunk = "", this.next = -1;
  }
  /// @internal
  reset(e, t) {
    if (t ? (this.token = t, t.start = e, t.lookAhead = e + 1, t.value = t.extended = -1) : this.token = Ea, this.pos != e) {
      if (this.pos = e, e == this.end)
        return this.setDone(), this;
      for (; e < this.range.from; )
        this.range = this.ranges[--this.rangeIndex];
      for (; e >= this.range.to; )
        this.range = this.ranges[++this.rangeIndex];
      e >= this.chunkPos && e < this.chunkPos + this.chunk.length ? this.chunkOff = e - this.chunkPos : (this.chunk = "", this.chunkOff = 0), this.readNext();
    }
    return this;
  }
  /// @internal
  read(e, t) {
    if (e >= this.chunkPos && t <= this.chunkPos + this.chunk.length)
      return this.chunk.slice(e - this.chunkPos, t - this.chunkPos);
    if (e >= this.chunk2Pos && t <= this.chunk2Pos + this.chunk2.length)
      return this.chunk2.slice(e - this.chunk2Pos, t - this.chunk2Pos);
    if (e >= this.range.from && t <= this.range.to)
      return this.input.read(e, t);
    let i = "";
    for (let s of this.ranges) {
      if (s.from >= t)
        break;
      s.to > e && (i += this.input.read(Math.max(s.from, e), Math.min(s.to, t)));
    }
    return i;
  }
}
class li {
  constructor(e, t) {
    this.data = e, this.id = t;
  }
  token(e, t) {
    let { parser: i } = t.p;
    Ou(this.data, e, t, this.id, i.data, i.tokenPrecTable);
  }
}
li.prototype.contextual = li.prototype.fallback = li.prototype.extend = !1;
class ms {
  constructor(e, t, i) {
    this.precTable = t, this.elseToken = i, this.data = typeof e == "string" ? Wi(e) : e;
  }
  token(e, t) {
    let i = e.pos, s = 0;
    for (; ; ) {
      let r = e.next < 0, o = e.resolveOffset(1, 1);
      if (Ou(this.data, e, t, 0, this.data, this.precTable), e.token.value > -1)
        break;
      if (this.elseToken == null)
        return;
      if (r || s++, o == null)
        break;
      e.reset(o, e.token);
    }
    s && (e.reset(i, e.token), e.acceptToken(this.elseToken, s));
  }
}
ms.prototype.contextual = li.prototype.fallback = li.prototype.extend = !1;
class ht {
  /// Create a tokenizer. The first argument is the function that,
  /// given an input stream, scans for the types of tokens it
  /// recognizes at the stream's position, and calls
  /// [`acceptToken`](#lr.InputStream.acceptToken) when it finds
  /// one.
  constructor(e, t = {}) {
    this.token = e, this.contextual = !!t.contextual, this.fallback = !!t.fallback, this.extend = !!t.extend;
  }
}
function Ou(n, e, t, i, s, r) {
  let o = 0, l = 1 << i, { dialect: a } = t.p.parser;
  e:
    for (; l & n[o]; ) {
      let h = n[o + 1];
      for (let d = o + 3; d < h; d += 2)
        if ((n[d + 1] & l) > 0) {
          let O = n[d];
          if (a.allows(O) && (e.token.value == -1 || e.token.value == O || q0(O, e.token.value, s, r))) {
            e.acceptToken(O);
            break;
          }
        }
      let c = e.next, f = 0, u = n[o + 2];
      if (e.next < 0 && u > f && n[h + u * 3 - 3] == 65535 && n[h + u * 3 - 3] == 65535) {
        o = n[h + u * 3 - 1];
        continue e;
      }
      for (; f < u; ) {
        let d = f + u >> 1, O = h + d + (d << 1), m = n[O], g = n[O + 1] || 65536;
        if (c < m)
          u = d;
        else if (c >= g)
          f = d + 1;
        else {
          o = n[O + 2], e.advance();
          continue e;
        }
      }
      break;
    }
}
function _a(n, e, t) {
  for (let i = e, s; (s = n[i]) != 65535; i++)
    if (s == t)
      return i - e;
  return -1;
}
function q0(n, e, t, i) {
  let s = _a(t, i, e);
  return s < 0 || _a(t, i, n) < s;
}
const Ee = typeof process < "u" && process.env && /\bparse\b/.test(process.env.LOG);
let pr = null;
var Ba;
(function(n) {
  n[n.Margin = 25] = "Margin";
})(Ba || (Ba = {}));
function za(n, e, t) {
  let i = n.cursor(E.IncludeAnonymous);
  for (i.moveTo(e); ; )
    if (!(t < 0 ? i.childBefore(e) : i.childAfter(e)))
      for (; ; ) {
        if ((t < 0 ? i.to < e : i.from > e) && !i.type.isError)
          return t < 0 ? Math.max(0, Math.min(
            i.to - 1,
            e - 25
            /* Safety.Margin */
          )) : Math.min(n.length, Math.max(
            i.from + 1,
            e + 25
            /* Safety.Margin */
          ));
        if (t < 0 ? i.prevSibling() : i.nextSibling())
          break;
        if (!i.parent())
          return t < 0 ? 0 : n.length;
      }
}
class E0 {
  constructor(e, t) {
    this.fragments = e, this.nodeSet = t, this.i = 0, this.fragment = null, this.safeFrom = -1, this.safeTo = -1, this.trees = [], this.start = [], this.index = [], this.nextFragment();
  }
  nextFragment() {
    let e = this.fragment = this.i == this.fragments.length ? null : this.fragments[this.i++];
    if (e) {
      for (this.safeFrom = e.openStart ? za(e.tree, e.from + e.offset, 1) - e.offset : e.from, this.safeTo = e.openEnd ? za(e.tree, e.to + e.offset, -1) - e.offset : e.to; this.trees.length; )
        this.trees.pop(), this.start.pop(), this.index.pop();
      this.trees.push(e.tree), this.start.push(-e.offset), this.index.push(0), this.nextStart = this.safeFrom;
    } else
      this.nextStart = 1e9;
  }
  // `pos` must be >= any previously given `pos` for this cursor
  nodeAt(e) {
    if (e < this.nextStart)
      return null;
    for (; this.fragment && this.safeTo <= e; )
      this.nextFragment();
    if (!this.fragment)
      return null;
    for (; ; ) {
      let t = this.trees.length - 1;
      if (t < 0)
        return this.nextFragment(), null;
      let i = this.trees[t], s = this.index[t];
      if (s == i.children.length) {
        this.trees.pop(), this.start.pop(), this.index.pop();
        continue;
      }
      let r = i.children[s], o = this.start[t] + i.positions[s];
      if (o > e)
        return this.nextStart = o, null;
      if (r instanceof G) {
        if (o == e) {
          if (o < this.safeFrom)
            return null;
          let l = o + r.length;
          if (l <= this.safeTo) {
            let a = r.prop(A.lookAhead);
            if (!a || l + a < this.fragment.to)
              return r;
          }
        }
        this.index[t]++, o + r.length >= Math.max(this.safeFrom, e) && (this.trees.push(r), this.start.push(o), this.index.push(0));
      } else
        this.index[t]++, this.nextStart = o + r.length;
    }
  }
}
class _0 {
  constructor(e, t) {
    this.stream = t, this.tokens = [], this.mainToken = null, this.actions = [], this.tokens = e.tokenizers.map((i) => new jn());
  }
  getActions(e) {
    let t = 0, i = null, { parser: s } = e.p, { tokenizers: r } = s, o = s.stateSlot(
      e.state,
      3
      /* ParseState.TokenizerMask */
    ), l = e.curContext ? e.curContext.hash : 0, a = 0;
    for (let h = 0; h < r.length; h++) {
      if (!(1 << h & o))
        continue;
      let c = r[h], f = this.tokens[h];
      if (!(i && !c.fallback) && ((c.contextual || f.start != e.pos || f.mask != o || f.context != l) && (this.updateCachedToken(f, c, e), f.mask = o, f.context = l), f.lookAhead > f.end + 25 && (a = Math.max(f.lookAhead, a)), f.value != 0)) {
        let u = t;
        if (f.extended > -1 && (t = this.addActions(e, f.extended, f.end, t)), t = this.addActions(e, f.value, f.end, t), !c.extend && (i = f, t > u))
          break;
      }
    }
    for (; this.actions.length > t; )
      this.actions.pop();
    return a && e.setLookAhead(a), !i && e.pos == this.stream.end && (i = new jn(), i.value = e.p.parser.eofTerm, i.start = i.end = e.pos, t = this.addActions(e, i.value, i.end, t)), this.mainToken = i, this.actions;
  }
  getMainToken(e) {
    if (this.mainToken)
      return this.mainToken;
    let t = new jn(), { pos: i, p: s } = e;
    return t.start = i, t.end = Math.min(i + 1, s.stream.end), t.value = i == s.stream.end ? s.parser.eofTerm : 0, t;
  }
  updateCachedToken(e, t, i) {
    let s = this.stream.clipPos(i.pos);
    if (t.token(this.stream.reset(s, e), i), e.value > -1) {
      let { parser: r } = i.p;
      for (let o = 0; o < r.specialized.length; o++)
        if (r.specialized[o] == e.value) {
          let l = r.specializers[o](this.stream.read(e.start, e.end), i);
          if (l >= 0 && i.p.parser.dialect.allows(l >> 1)) {
            l & 1 ? e.extended = l >> 1 : e.value = l >> 1;
            break;
          }
        }
    } else
      e.value = 0, e.end = this.stream.clipPos(s + 1);
  }
  putAction(e, t, i, s) {
    for (let r = 0; r < s; r += 3)
      if (this.actions[r] == e)
        return s;
    return this.actions[s++] = e, this.actions[s++] = t, this.actions[s++] = i, s;
  }
  addActions(e, t, i, s) {
    let { state: r } = e, { parser: o } = e.p, { data: l } = o;
    for (let a = 0; a < 2; a++)
      for (let h = o.stateSlot(
        r,
        a ? 2 : 1
        /* ParseState.Actions */
      ); ; h += 3) {
        if (l[h] == 65535)
          if (l[h + 1] == 1)
            h = ft(l, h + 2);
          else {
            s == 0 && l[h + 1] == 2 && (s = this.putAction(ft(l, h + 2), t, i, s));
            break;
          }
        l[h] == t && (s = this.putAction(ft(l, h + 1), t, i, s));
      }
    return s;
  }
}
var Ia;
(function(n) {
  n[n.Distance = 5] = "Distance", n[n.MaxRemainingPerStep = 3] = "MaxRemainingPerStep", n[n.MinBufferLengthPrune = 500] = "MinBufferLengthPrune", n[n.ForceReduceLimit = 10] = "ForceReduceLimit", n[n.CutDepth = 15e3] = "CutDepth", n[n.CutTo = 9e3] = "CutTo", n[n.MaxLeftAssociativeReductionCount = 300] = "MaxLeftAssociativeReductionCount", n[n.MaxStackCount = 12] = "MaxStackCount";
})(Ia || (Ia = {}));
class B0 {
  constructor(e, t, i, s) {
    this.parser = e, this.input = t, this.ranges = s, this.recovering = 0, this.nextStackID = 9812, this.minStackPos = 0, this.reused = [], this.stoppedAt = null, this.lastBigReductionStart = -1, this.lastBigReductionSize = 0, this.bigReductionCount = 0, this.stream = new U0(t, s), this.tokens = new _0(e, this.stream), this.topTerm = e.top[1];
    let { from: r } = s[0];
    this.stacks = [ps.start(this, e.top[0], r)], this.fragments = i.length && this.stream.end - r > e.bufferLength * 4 ? new E0(i, e.nodeSet) : null;
  }
  get parsedPos() {
    return this.minStackPos;
  }
  // Move the parser forward. This will process all parse stacks at
  // `this.pos` and try to advance them to a further position. If no
  // stack for such a position is found, it'll start error-recovery.
  //
  // When the parse is finished, this will return a syntax tree. When
  // not, it returns `null`.
  advance() {
    let e = this.stacks, t = this.minStackPos, i = this.stacks = [], s, r;
    if (this.bigReductionCount > 300 && e.length == 1) {
      let [o] = e;
      for (; o.forceReduce() && o.stack.length && o.stack[o.stack.length - 2] >= this.lastBigReductionStart; )
        ;
      this.bigReductionCount = this.lastBigReductionSize = 0;
    }
    for (let o = 0; o < e.length; o++) {
      let l = e[o];
      for (; ; ) {
        if (this.tokens.mainToken = null, l.pos > t)
          i.push(l);
        else {
          if (this.advanceStack(l, i, e))
            continue;
          {
            s || (s = [], r = []), s.push(l);
            let a = this.tokens.getMainToken(l);
            r.push(a.value, a.end);
          }
        }
        break;
      }
    }
    if (!i.length) {
      let o = s && I0(s);
      if (o)
        return this.stackToTree(o);
      if (this.parser.strict)
        throw Ee && s && console.log("Stuck with token " + (this.tokens.mainToken ? this.parser.getName(this.tokens.mainToken.value) : "none")), new SyntaxError("No parse at " + t);
      this.recovering || (this.recovering = 5);
    }
    if (this.recovering && s) {
      let o = this.stoppedAt != null && s[0].pos > this.stoppedAt ? s[0] : this.runRecovery(s, r, i);
      if (o)
        return this.stackToTree(o.forceAll());
    }
    if (this.recovering) {
      let o = this.recovering == 1 ? 1 : this.recovering * 3;
      if (i.length > o)
        for (i.sort((l, a) => a.score - l.score); i.length > o; )
          i.pop();
      i.some((l) => l.reducePos > t) && this.recovering--;
    } else if (i.length > 1) {
      e:
        for (let o = 0; o < i.length - 1; o++) {
          let l = i[o];
          for (let a = o + 1; a < i.length; a++) {
            let h = i[a];
            if (l.sameState(h) || l.buffer.length > 500 && h.buffer.length > 500)
              if ((l.score - h.score || l.buffer.length - h.buffer.length) > 0)
                i.splice(a--, 1);
              else {
                i.splice(o--, 1);
                continue e;
              }
          }
        }
      i.length > 12 && i.splice(
        12,
        i.length - 12
        /* Rec.MaxStackCount */
      );
    }
    this.minStackPos = i[0].pos;
    for (let o = 1; o < i.length; o++)
      i[o].pos < this.minStackPos && (this.minStackPos = i[o].pos);
    return null;
  }
  stopAt(e) {
    if (this.stoppedAt != null && this.stoppedAt < e)
      throw new RangeError("Can't move stoppedAt forward");
    this.stoppedAt = e;
  }
  // Returns an updated version of the given stack, or null if the
  // stack can't advance normally. When `split` and `stacks` are
  // given, stacks split off by ambiguous operations will be pushed to
  // `split`, or added to `stacks` if they move `pos` forward.
  advanceStack(e, t, i) {
    let s = e.pos, { parser: r } = this, o = Ee ? this.stackID(e) + " -> " : "";
    if (this.stoppedAt != null && s > this.stoppedAt)
      return e.forceReduce() ? e : null;
    if (this.fragments) {
      let h = e.curContext && e.curContext.tracker.strict, c = h ? e.curContext.hash : 0;
      for (let f = this.fragments.nodeAt(s); f; ) {
        let u = this.parser.nodeSet.types[f.type.id] == f.type ? r.getGoto(e.state, f.type.id) : -1;
        if (u > -1 && f.length && (!h || (f.prop(A.contextHash) || 0) == c))
          return e.useNode(f, u), Ee && console.log(o + this.stackID(e) + ` (via reuse of ${r.getName(f.type.id)})`), !0;
        if (!(f instanceof G) || f.children.length == 0 || f.positions[0] > 0)
          break;
        let d = f.children[0];
        if (d instanceof G && f.positions[0] == 0)
          f = d;
        else
          break;
      }
    }
    let l = r.stateSlot(
      e.state,
      4
      /* ParseState.DefaultReduce */
    );
    if (l > 0)
      return e.reduce(l), Ee && console.log(o + this.stackID(e) + ` (via always-reduce ${r.getName(
        l & 65535
        /* Action.ValueMask */
      )})`), !0;
    if (e.stack.length >= 15e3)
      for (; e.stack.length > 9e3 && e.forceReduce(); )
        ;
    let a = this.tokens.getActions(e);
    for (let h = 0; h < a.length; ) {
      let c = a[h++], f = a[h++], u = a[h++], d = h == a.length || !i, O = d ? e : e.split();
      if (O.apply(c, f, u), Ee && console.log(o + this.stackID(O) + ` (via ${c & 65536 ? `reduce of ${r.getName(
        c & 65535
        /* Action.ValueMask */
      )}` : "shift"} for ${r.getName(f)} @ ${s}${O == e ? "" : ", split"})`), d)
        return !0;
      O.pos > s ? t.push(O) : i.push(O);
    }
    return !1;
  }
  // Advance a given stack forward as far as it will go. Returns the
  // (possibly updated) stack if it got stuck, or null if it moved
  // forward and was given to `pushStackDedup`.
  advanceFully(e, t) {
    let i = e.pos;
    for (; ; ) {
      if (!this.advanceStack(e, null, null))
        return !1;
      if (e.pos > i)
        return ja(e, t), !0;
    }
  }
  runRecovery(e, t, i) {
    let s = null, r = !1;
    for (let o = 0; o < e.length; o++) {
      let l = e[o], a = t[o << 1], h = t[(o << 1) + 1], c = Ee ? this.stackID(l) + " -> " : "";
      if (l.deadEnd && (r || (r = !0, l.restart(), Ee && console.log(c + this.stackID(l) + " (restarted)"), this.advanceFully(l, i))))
        continue;
      let f = l.split(), u = c;
      for (let d = 0; f.forceReduce() && d < 10 && (Ee && console.log(u + this.stackID(f) + " (via force-reduce)"), !this.advanceFully(f, i)); d++)
        Ee && (u = this.stackID(f) + " -> ");
      for (let d of l.recoverByInsert(a))
        Ee && console.log(c + this.stackID(d) + " (via recover-insert)"), this.advanceFully(d, i);
      this.stream.end > l.pos ? (h == l.pos && (h++, a = 0), l.recoverByDelete(a, h), Ee && console.log(c + this.stackID(l) + ` (via recover-delete ${this.parser.getName(a)})`), ja(l, i)) : (!s || s.score < l.score) && (s = l);
    }
    return s;
  }
  // Convert the stack's buffer to a syntax tree.
  stackToTree(e) {
    return e.close(), G.build({
      buffer: gs.create(e),
      nodeSet: this.parser.nodeSet,
      topID: this.topTerm,
      maxBufferLength: this.parser.bufferLength,
      reused: this.reused,
      start: this.ranges[0].from,
      length: e.pos - this.ranges[0].from,
      minRepeatType: this.parser.minRepeatTerm
    });
  }
  stackID(e) {
    let t = (pr || (pr = /* @__PURE__ */ new WeakMap())).get(e);
    return t || pr.set(e, t = String.fromCodePoint(this.nextStackID++)), t + e;
  }
}
function ja(n, e) {
  for (let t = 0; t < e.length; t++) {
    let i = e[t];
    if (i.pos == n.pos && i.sameState(n)) {
      e[t].score < n.score && (e[t] = n);
      return;
    }
  }
  e.push(n);
}
class z0 {
  constructor(e, t, i) {
    this.source = e, this.flags = t, this.disabled = i;
  }
  allows(e) {
    return !this.disabled || this.disabled[e] == 0;
  }
}
const gr = (n) => n;
class pu {
  /// Define a context tracker.
  constructor(e) {
    this.start = e.start, this.shift = e.shift || gr, this.reduce = e.reduce || gr, this.reuse = e.reuse || gr, this.hash = e.hash || (() => 0), this.strict = e.strict !== !1;
  }
}
class pi extends pf {
  /// @internal
  constructor(e) {
    if (super(), this.wrappers = [], e.version != 14)
      throw new RangeError(`Parser version (${e.version}) doesn't match runtime version (14)`);
    let t = e.nodeNames.split(" ");
    this.minRepeatTerm = t.length;
    for (let l = 0; l < e.repeatNodeCount; l++)
      t.push("");
    let i = Object.keys(e.topRules).map((l) => e.topRules[l][1]), s = [];
    for (let l = 0; l < t.length; l++)
      s.push([]);
    function r(l, a, h) {
      s[l].push([a, a.deserialize(String(h))]);
    }
    if (e.nodeProps)
      for (let l of e.nodeProps) {
        let a = l[0];
        typeof a == "string" && (a = A[a]);
        for (let h = 1; h < l.length; ) {
          let c = l[h++];
          if (c >= 0)
            r(c, a, l[h++]);
          else {
            let f = l[h + -c];
            for (let u = -c; u > 0; u--)
              r(l[h++], a, f);
            h++;
          }
        }
      }
    this.nodeSet = new qo(t.map((l, a) => be.define({
      name: a >= this.minRepeatTerm ? void 0 : l,
      id: a,
      props: s[a],
      top: i.indexOf(a) > -1,
      error: a == 0,
      skipped: e.skippedNodes && e.skippedNodes.indexOf(a) > -1
    }))), e.propSources && (this.nodeSet = this.nodeSet.extend(...e.propSources)), this.strict = !1, this.bufferLength = ff;
    let o = Wi(e.tokenData);
    this.context = e.context, this.specializerSpecs = e.specialized || [], this.specialized = new Uint16Array(this.specializerSpecs.length);
    for (let l = 0; l < this.specializerSpecs.length; l++)
      this.specialized[l] = this.specializerSpecs[l].term;
    this.specializers = this.specializerSpecs.map(La), this.states = Wi(e.states, Uint32Array), this.data = Wi(e.stateData), this.goto = Wi(e.goto), this.maxTerm = e.maxTerm, this.tokenizers = e.tokenizers.map((l) => typeof l == "number" ? new li(o, l) : l), this.topRules = e.topRules, this.dialects = e.dialects || {}, this.dynamicPrecedences = e.dynamicPrecedences || null, this.tokenPrecTable = e.tokenPrec, this.termNames = e.termNames || null, this.maxNode = this.nodeSet.types.length - 1, this.dialect = this.parseDialect(), this.top = this.topRules[Object.keys(this.topRules)[0]];
  }
  createParse(e, t, i) {
    let s = new B0(this, e, t, i);
    for (let r of this.wrappers)
      s = r(s, e, t, i);
    return s;
  }
  /// Get a goto table entry @internal
  getGoto(e, t, i = !1) {
    let s = this.goto;
    if (t >= s[0])
      return -1;
    for (let r = s[t + 1]; ; ) {
      let o = s[r++], l = o & 1, a = s[r++];
      if (l && i)
        return a;
      for (let h = r + (o >> 1); r < h; r++)
        if (s[r] == e)
          return a;
      if (l)
        return -1;
    }
  }
  /// Check if this state has an action for a given terminal @internal
  hasAction(e, t) {
    let i = this.data;
    for (let s = 0; s < 2; s++)
      for (let r = this.stateSlot(
        e,
        s ? 2 : 1
        /* ParseState.Actions */
      ), o; ; r += 3) {
        if ((o = i[r]) == 65535)
          if (i[r + 1] == 1)
            o = i[r = ft(i, r + 2)];
          else {
            if (i[r + 1] == 2)
              return ft(i, r + 2);
            break;
          }
        if (o == t || o == 0)
          return ft(i, r + 1);
      }
    return 0;
  }
  /// @internal
  stateSlot(e, t) {
    return this.states[e * 6 + t];
  }
  /// @internal
  stateFlag(e, t) {
    return (this.stateSlot(
      e,
      0
      /* ParseState.Flags */
    ) & t) > 0;
  }
  /// @internal
  validAction(e, t) {
    return !!this.allActions(e, (i) => i == t ? !0 : null);
  }
  /// @internal
  allActions(e, t) {
    let i = this.stateSlot(
      e,
      4
      /* ParseState.DefaultReduce */
    ), s = i ? t(i) : void 0;
    for (let r = this.stateSlot(
      e,
      1
      /* ParseState.Actions */
    ); s == null; r += 3) {
      if (this.data[r] == 65535)
        if (this.data[r + 1] == 1)
          r = ft(this.data, r + 2);
        else
          break;
      s = t(ft(this.data, r + 1));
    }
    return s;
  }
  /// Get the states that can follow this one through shift actions or
  /// goto jumps. @internal
  nextStates(e) {
    let t = [];
    for (let i = this.stateSlot(
      e,
      1
      /* ParseState.Actions */
    ); ; i += 3) {
      if (this.data[i] == 65535)
        if (this.data[i + 1] == 1)
          i = ft(this.data, i + 2);
        else
          break;
      if (!(this.data[i + 2] & 1)) {
        let s = this.data[i + 1];
        t.some((r, o) => o & 1 && r == s) || t.push(this.data[i], s);
      }
    }
    return t;
  }
  /// Configure the parser. Returns a new parser instance that has the
  /// given settings modified. Settings not provided in `config` are
  /// kept from the original parser.
  configure(e) {
    let t = Object.assign(Object.create(pi.prototype), this);
    if (e.props && (t.nodeSet = this.nodeSet.extend(...e.props)), e.top) {
      let i = this.topRules[e.top];
      if (!i)
        throw new RangeError(`Invalid top rule name ${e.top}`);
      t.top = i;
    }
    return e.tokenizers && (t.tokenizers = this.tokenizers.map((i) => {
      let s = e.tokenizers.find((r) => r.from == i);
      return s ? s.to : i;
    })), e.specializers && (t.specializers = this.specializers.slice(), t.specializerSpecs = this.specializerSpecs.map((i, s) => {
      let r = e.specializers.find((l) => l.from == i.external);
      if (!r)
        return i;
      let o = Object.assign(Object.assign({}, i), { external: r.to });
      return t.specializers[s] = La(o), o;
    })), e.contextTracker && (t.context = e.contextTracker), e.dialect && (t.dialect = this.parseDialect(e.dialect)), e.strict != null && (t.strict = e.strict), e.wrap && (t.wrappers = t.wrappers.concat(e.wrap)), e.bufferLength != null && (t.bufferLength = e.bufferLength), t;
  }
  /// Tells you whether any [parse wrappers](#lr.ParserConfig.wrap)
  /// are registered for this parser.
  hasWrappers() {
    return this.wrappers.length > 0;
  }
  /// Returns the name associated with a given term. This will only
  /// work for all terms when the parser was generated with the
  /// `--names` option. By default, only the names of tagged terms are
  /// stored.
  getName(e) {
    return this.termNames ? this.termNames[e] : String(e <= this.maxNode && this.nodeSet.types[e].name || e);
  }
  /// The eof term id is always allocated directly after the node
  /// types. @internal
  get eofTerm() {
    return this.maxNode + 1;
  }
  /// The type of top node produced by the parser.
  get topNode() {
    return this.nodeSet.types[this.top[1]];
  }
  /// @internal
  dynamicPrecedence(e) {
    let t = this.dynamicPrecedences;
    return t == null ? 0 : t[e] || 0;
  }
  /// @internal
  parseDialect(e) {
    let t = Object.keys(this.dialects), i = t.map(() => !1);
    if (e)
      for (let r of e.split(" ")) {
        let o = t.indexOf(r);
        o >= 0 && (i[o] = !0);
      }
    let s = null;
    for (let r = 0; r < t.length; r++)
      if (!i[r])
        for (let o = this.dialects[t[r]], l; (l = this.data[o++]) != 65535; )
          (s || (s = new Uint8Array(this.maxTerm + 1)))[l] = 1;
    return new z0(e, i, s);
  }
  /// Used by the output of the parser generator. Not available to
  /// user code. @hide
  static deserialize(e) {
    return new pi(e);
  }
}
function ft(n, e) {
  return n[e] | n[e + 1] << 16;
}
function I0(n) {
  let e = null;
  for (let t of n) {
    let i = t.p.stoppedAt;
    (t.pos == t.p.stream.end || i != null && t.pos > i) && t.p.parser.stateFlag(
      t.state,
      2
      /* StateFlag.Accepting */
    ) && (!e || e.score < t.score) && (e = t);
  }
  return e;
}
function La(n) {
  if (n.external) {
    let e = n.extend ? 1 : 0;
    return (t, i) => n.external(t, i) << 1 | e;
  }
  return n.get;
}
const j0 = 54, L0 = 1, N0 = 55, G0 = 2, F0 = 56, H0 = 3, Na = 4, J0 = 5, Ss = 6, gu = 7, mu = 8, Su = 9, yu = 10, K0 = 11, eS = 12, tS = 13, mr = 57, iS = 14, Ga = 58, bu = 20, nS = 22, Qu = 23, sS = 24, Qo = 26, xu = 27, rS = 28, oS = 31, lS = 34, aS = 36, hS = 37, cS = 0, fS = 1, uS = {
  area: !0,
  base: !0,
  br: !0,
  col: !0,
  command: !0,
  embed: !0,
  frame: !0,
  hr: !0,
  img: !0,
  input: !0,
  keygen: !0,
  link: !0,
  meta: !0,
  param: !0,
  source: !0,
  track: !0,
  wbr: !0,
  menuitem: !0
}, dS = {
  dd: !0,
  li: !0,
  optgroup: !0,
  option: !0,
  p: !0,
  rp: !0,
  rt: !0,
  tbody: !0,
  td: !0,
  tfoot: !0,
  th: !0,
  tr: !0
}, Fa = {
  dd: { dd: !0, dt: !0 },
  dt: { dd: !0, dt: !0 },
  li: { li: !0 },
  option: { option: !0, optgroup: !0 },
  optgroup: { optgroup: !0 },
  p: {
    address: !0,
    article: !0,
    aside: !0,
    blockquote: !0,
    dir: !0,
    div: !0,
    dl: !0,
    fieldset: !0,
    footer: !0,
    form: !0,
    h1: !0,
    h2: !0,
    h3: !0,
    h4: !0,
    h5: !0,
    h6: !0,
    header: !0,
    hgroup: !0,
    hr: !0,
    menu: !0,
    nav: !0,
    ol: !0,
    p: !0,
    pre: !0,
    section: !0,
    table: !0,
    ul: !0
  },
  rp: { rp: !0, rt: !0 },
  rt: { rp: !0, rt: !0 },
  tbody: { tbody: !0, tfoot: !0 },
  td: { td: !0, th: !0 },
  tfoot: { tbody: !0 },
  th: { td: !0, th: !0 },
  thead: { tbody: !0, tfoot: !0 },
  tr: { tr: !0 }
};
function OS(n) {
  return n == 45 || n == 46 || n == 58 || n >= 65 && n <= 90 || n == 95 || n >= 97 && n <= 122 || n >= 161;
}
function wu(n) {
  return n == 9 || n == 10 || n == 13 || n == 32;
}
let Ha = null, Ja = null, Ka = 0;
function xo(n, e) {
  let t = n.pos + e;
  if (Ka == t && Ja == n)
    return Ha;
  let i = n.peek(e);
  for (; wu(i); )
    i = n.peek(++e);
  let s = "";
  for (; OS(i); )
    s += String.fromCharCode(i), i = n.peek(++e);
  return Ja = n, Ka = t, Ha = s ? s.toLowerCase() : i == pS || i == gS ? void 0 : null;
}
const $u = 60, ys = 62, Ho = 47, pS = 63, gS = 33, mS = 45;
function eh(n, e) {
  this.name = n, this.parent = e, this.hash = e ? e.hash : 0;
  for (let t = 0; t < n.length; t++)
    this.hash += (this.hash << 4) + n.charCodeAt(t) + (n.charCodeAt(t) << 8);
}
const SS = [Ss, yu, gu, mu, Su], yS = new pu({
  start: null,
  shift(n, e, t, i) {
    return SS.indexOf(e) > -1 ? new eh(xo(i, 1) || "", n) : n;
  },
  reduce(n, e) {
    return e == bu && n ? n.parent : n;
  },
  reuse(n, e, t, i) {
    let s = e.type.id;
    return s == Ss || s == aS ? new eh(xo(i, 1) || "", n) : n;
  },
  hash(n) {
    return n ? n.hash : 0;
  },
  strict: !1
}), bS = new ht((n, e) => {
  if (n.next != $u) {
    n.next < 0 && e.context && n.acceptToken(mr);
    return;
  }
  n.advance();
  let t = n.next == Ho;
  t && n.advance();
  let i = xo(n, 0);
  if (i === void 0)
    return;
  if (!i)
    return n.acceptToken(t ? iS : Ss);
  let s = e.context ? e.context.name : null;
  if (t) {
    if (i == s)
      return n.acceptToken(K0);
    if (s && dS[s])
      return n.acceptToken(mr, -2);
    if (e.dialectEnabled(cS))
      return n.acceptToken(eS);
    for (let r = e.context; r; r = r.parent)
      if (r.name == i)
        return;
    n.acceptToken(tS);
  } else {
    if (i == "script")
      return n.acceptToken(gu);
    if (i == "style")
      return n.acceptToken(mu);
    if (i == "textarea")
      return n.acceptToken(Su);
    if (uS.hasOwnProperty(i))
      return n.acceptToken(yu);
    s && Fa[s] && Fa[s][i] ? n.acceptToken(mr, -1) : n.acceptToken(Ss);
  }
}, { contextual: !0 }), QS = new ht((n) => {
  for (let e = 0, t = 0; ; t++) {
    if (n.next < 0) {
      t && n.acceptToken(Ga);
      break;
    }
    if (n.next == mS)
      e++;
    else if (n.next == ys && e >= 2) {
      t > 3 && n.acceptToken(Ga, -2);
      break;
    } else
      e = 0;
    n.advance();
  }
});
function xS(n) {
  for (; n; n = n.parent)
    if (n.name == "svg" || n.name == "math")
      return !0;
  return !1;
}
const wS = new ht((n, e) => {
  if (n.next == Ho && n.peek(1) == ys) {
    let t = e.dialectEnabled(fS) || xS(e.context);
    n.acceptToken(t ? J0 : Na, 2);
  } else
    n.next == ys && n.acceptToken(Na, 1);
});
function Jo(n, e, t) {
  let i = 2 + n.length;
  return new ht((s) => {
    for (let r = 0, o = 0, l = 0; ; l++) {
      if (s.next < 0) {
        l && s.acceptToken(e);
        break;
      }
      if (r == 0 && s.next == $u || r == 1 && s.next == Ho || r >= 2 && r < i && s.next == n.charCodeAt(r - 2))
        r++, o++;
      else if ((r == 2 || r == i) && wu(s.next))
        o++;
      else if (r == i && s.next == ys) {
        l > o ? s.acceptToken(e, -o) : s.acceptToken(t, -(o - 2));
        break;
      } else if ((s.next == 10 || s.next == 13) && l) {
        s.acceptToken(e, 1);
        break;
      } else
        r = o = 0;
      s.advance();
    }
  });
}
const $S = Jo("script", j0, L0), kS = Jo("style", N0, G0), vS = Jo("textarea", F0, H0), PS = Ys({
  "Text RawText": p.content,
  "StartTag StartCloseTag SelfClosingEndTag EndTag": p.angleBracket,
  TagName: p.tagName,
  "MismatchedCloseTag/TagName": [p.tagName, p.invalid],
  AttributeName: p.attributeName,
  "AttributeValue UnquotedAttributeValue": p.attributeValue,
  Is: p.definitionOperator,
  "EntityReference CharacterReference": p.character,
  Comment: p.blockComment,
  ProcessingInst: p.processingInstruction,
  DoctypeDecl: p.documentMeta
}), CS = pi.deserialize({
  version: 14,
  states: ",xOVO!rOOO!WQ#tO'#CqO!]Q#tO'#CzO!bQ#tO'#C}O!gQ#tO'#DQO!lQ#tO'#DSO!qOaO'#CpO!|ObO'#CpO#XOdO'#CpO$eO!rO'#CpOOO`'#Cp'#CpO$lO$fO'#DTO$tQ#tO'#DVO$yQ#tO'#DWOOO`'#Dk'#DkOOO`'#DY'#DYQVO!rOOO%OQ&rO,59]O%WQ&rO,59fO%`Q&rO,59iO%hQ&rO,59lO%sQ&rO,59nOOOa'#D^'#D^O%{OaO'#CxO&WOaO,59[OOOb'#D_'#D_O&`ObO'#C{O&kObO,59[OOOd'#D`'#D`O&sOdO'#DOO'OOdO,59[OOO`'#Da'#DaO'WO!rO,59[O'_Q#tO'#DROOO`,59[,59[OOOp'#Db'#DbO'dO$fO,59oOOO`,59o,59oO'lQ#|O,59qO'qQ#|O,59rOOO`-E7W-E7WO'vQ&rO'#CsOOQW'#DZ'#DZO(UQ&rO1G.wOOOa1G.w1G.wO(^Q&rO1G/QOOOb1G/Q1G/QO(fQ&rO1G/TOOOd1G/T1G/TO(nQ&rO1G/WOOO`1G/W1G/WOOO`1G/Y1G/YO(yQ&rO1G/YOOOa-E7[-E7[O)RQ#tO'#CyOOO`1G.v1G.vOOOb-E7]-E7]O)WQ#tO'#C|OOOd-E7^-E7^O)]Q#tO'#DPOOO`-E7_-E7_O)bQ#|O,59mOOOp-E7`-E7`OOO`1G/Z1G/ZOOO`1G/]1G/]OOO`1G/^1G/^O)gQ,UO,59_OOQW-E7X-E7XOOOa7+$c7+$cOOOb7+$l7+$lOOOd7+$o7+$oOOO`7+$r7+$rOOO`7+$t7+$tO)rQ#|O,59eO)wQ#|O,59hO)|Q#|O,59kOOO`1G/X1G/XO*RO7[O'#CvO*dOMhO'#CvOOQW1G.y1G.yOOO`1G/P1G/POOO`1G/S1G/SOOO`1G/V1G/VOOOO'#D['#D[O*uO7[O,59bOOQW,59b,59bOOOO'#D]'#D]O+WOMhO,59bOOOO-E7Y-E7YOOQW1G.|1G.|OOOO-E7Z-E7Z",
  stateData: "+s~O!^OS~OUSOVPOWQOXROYTO[]O][O^^O`^Oa^Ob^Oc^Ox^O{_O!dZO~OfaO~OfbO~OfcO~OfdO~OfeO~O!WfOPlP!ZlP~O!XiOQoP!ZoP~O!YlORrP!ZrP~OUSOVPOWQOXROYTOZqO[]O][O^^O`^Oa^Ob^Oc^Ox^O!dZO~O!ZrO~P#dO![sO!euO~OfvO~OfwO~OS|OhyO~OS!OOhyO~OS!QOhyO~OS!SOT!TOhyO~OS!TOhyO~O!WfOPlX!ZlX~OP!WO!Z!XO~O!XiOQoX!ZoX~OQ!ZO!Z!XO~O!YlORrX!ZrX~OR!]O!Z!XO~O!Z!XO~P#dOf!_O~O![sO!e!aO~OS!bO~OS!cO~Oi!dOSgXhgXTgX~OS!fOhyO~OS!gOhyO~OS!hOhyO~OS!iOT!jOhyO~OS!jOhyO~Of!kO~Of!lO~Of!mO~OS!nO~Ok!qO!`!oO!b!pO~OS!rO~OS!sO~OS!tO~Oa!uOb!uOc!uO!`!wO!a!uO~Oa!xOb!xOc!xO!b!wO!c!xO~Oa!uOb!uOc!uO!`!{O!a!uO~Oa!xOb!xOc!xO!b!{O!c!xO~OT~bac!dx{!d~",
  goto: "%p!`PPPPPPPPPPPPPPPPPPPP!a!gP!mPP!yP!|#P#S#Y#]#`#f#i#l#r#x!aP!a!aP$O$U$l$r$x%O%U%[%bPPPPPPPP%hX^OX`pXUOX`pezabcde{}!P!R!UR!q!dRhUR!XhXVOX`pRkVR!XkXWOX`pRnWR!XnXXOX`pQrXR!XpXYOX`pQ`ORx`Q{aQ}bQ!PcQ!RdQ!UeZ!e{}!P!R!UQ!v!oR!z!vQ!y!pR!|!yQgUR!VgQjVR!YjQmWR![mQpXR!^pQtZR!`tS_O`ToXp",
  nodeNames: "⚠ StartCloseTag StartCloseTag StartCloseTag EndTag SelfClosingEndTag StartTag StartTag StartTag StartTag StartTag StartCloseTag StartCloseTag StartCloseTag IncompleteCloseTag Document Text EntityReference CharacterReference InvalidEntity Element OpenTag TagName Attribute AttributeName Is AttributeValue UnquotedAttributeValue ScriptText CloseTag OpenTag StyleText CloseTag OpenTag TextareaText CloseTag OpenTag CloseTag SelfClosingTag Comment ProcessingInst MismatchedCloseTag CloseTag DoctypeDecl",
  maxTerm: 67,
  context: yS,
  nodeProps: [
    ["closedBy", -10, 1, 2, 3, 7, 8, 9, 10, 11, 12, 13, "EndTag", 6, "EndTag SelfClosingEndTag", -4, 21, 30, 33, 36, "CloseTag"],
    ["openedBy", 4, "StartTag StartCloseTag", 5, "StartTag", -4, 29, 32, 35, 37, "OpenTag"],
    ["group", -9, 14, 17, 18, 19, 20, 39, 40, 41, 42, "Entity", 16, "Entity TextContent", -3, 28, 31, 34, "TextContent Entity"]
  ],
  propSources: [PS],
  skippedNodes: [0],
  repeatNodeCount: 9,
  tokenData: "!<p!aR!YOX$qXY,QYZ,QZ[$q[]&X]^,Q^p$qpq,Qqr-_rs3_sv-_vw3}wxHYx}-_}!OH{!O!P-_!P!Q$q!Q![-_![!]Mz!]!^-_!^!_!$S!_!`!;x!`!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4U-_4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!Z$|c`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr$qrs&}sv$qvw+Pwx(tx!^$q!^!_*V!_!a&X!a#S$q#S#T&X#T;'S$q;'S;=`+z<%lO$q!R&bX`P!a`!cpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&Xq'UV`P!cpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}P'pT`POv'kw!^'k!_;'S'k;'S;=`(P<%lO'kP(SP;=`<%l'kp([S!cpOv(Vx;'S(V;'S;=`(h<%lO(Vp(kP;=`<%l(Vq(qP;=`<%l&}a({W`P!a`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t`)jT!a`Or)esv)ew;'S)e;'S;=`)y<%lO)e`)|P;=`<%l)ea*SP;=`<%l(t!Q*^V!a`!cpOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!Q*vP;=`<%l*V!R*|P;=`<%l&XW+UYkWOX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+PW+wP;=`<%l+P!Z+}P;=`<%l$q!a,]``P!a`!cp!^^OX&XXY,QYZ,QZ]&X]^,Q^p&Xpq,Qqr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!_-ljhS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q[/ebhSkWOX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+PS0rXhSqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0mS1bP;=`<%l0m[1hP;=`<%l/^!V1vchS`P!a`!cpOq&Xqr1krs&}sv1kvw0mwx(tx!P1k!P!Q&X!Q!^1k!^!_*V!_!a&X!a#s1k#s$f&X$f;'S1k;'S;=`3R<%l?Ah1k?Ah?BY&X?BY?Mn1k?MnO&X!V3UP;=`<%l1k!_3[P;=`<%l-_!Z3hV!`h`P!cpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}!_4WihSkWc!ROX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst>]tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^/^!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!Z5zbkWOX5uXZ7SZ[5u[^7S^p5uqr5urs7Sst+Ptw5uwx7Sx!]5u!]!^7w!^!a7S!a#S5u#S#T7S#T;'S5u;'S;=`8n<%lO5u!R7VVOp7Sqs7St!]7S!]!^7l!^;'S7S;'S;=`7q<%lO7S!R7qOa!R!R7tP;=`<%l7S!Z8OYkWa!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!Z8qP;=`<%l5u!_8{ihSkWOX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst/^tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^:j!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!_:sbhSkWa!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!V<QchSOp7Sqr;{rs7Sst0mtw;{wx7Sx!P;{!P!Q7S!Q!];{!]!^=]!^!a7S!a#s;{#s$f7S$f;'S;{;'S;=`>P<%l?Ah;{?Ah?BY7S?BY?Mn;{?MnO7S!V=dXhSa!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!V>SP;=`<%l;{!_>YP;=`<%l8t!_>dhhSkWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^/^!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!Z@TakWOX@OXZAYZ[@O[^AY^p@Oqr@OrsAYsw@OwxAYx!]@O!]!^Az!^!aAY!a#S@O#S#TAY#T;'S@O;'S;=`Bq<%lO@O!RA]UOpAYq!]AY!]!^Ao!^;'SAY;'S;=`At<%lOAY!RAtOb!R!RAwP;=`<%lAY!ZBRYkWb!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!ZBtP;=`<%l@O!_COhhSkWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^Dj!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!_DsbhSkWb!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!VFQbhSOpAYqrE{rsAYswE{wxAYx!PE{!P!QAY!Q!]E{!]!^GY!^!aAY!a#sE{#s$fAY$f;'SE{;'S;=`G|<%l?AhE{?Ah?BYAY?BY?MnE{?MnOAY!VGaXhSb!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!VHPP;=`<%lE{!_HVP;=`<%lBw!ZHcW!bx`P!a`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t!aIYlhS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OKQ!O!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!aK_khS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!`&X!`!aMS!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!TM_X`P!a`!cp!eQOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!aNZ!ZhSfQ`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OMz!O!PMz!P!Q$q!Q![Mz![!]Mz!]!^-_!^!_*V!_!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f$}-_$}%OMz%O%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4UMz4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Je-_$Je$JgMz$Jg$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!a!$PP;=`<%lMz!R!$ZY!a`!cpOq*Vqr!$yrs(Vsv*Vwx)ex!a*V!a!b!4t!b;'S*V;'S;=`*s<%lO*V!R!%Q]!a`!cpOr*Vrs(Vsv*Vwx)ex}*V}!O!%y!O!f*V!f!g!']!g#W*V#W#X!0`#X;'S*V;'S;=`*s<%lO*V!R!&QX!a`!cpOr*Vrs(Vsv*Vwx)ex}*V}!O!&m!O;'S*V;'S;=`*s<%lO*V!R!&vV!a`!cp!dPOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!'dX!a`!cpOr*Vrs(Vsv*Vwx)ex!q*V!q!r!(P!r;'S*V;'S;=`*s<%lO*V!R!(WX!a`!cpOr*Vrs(Vsv*Vwx)ex!e*V!e!f!(s!f;'S*V;'S;=`*s<%lO*V!R!(zX!a`!cpOr*Vrs(Vsv*Vwx)ex!v*V!v!w!)g!w;'S*V;'S;=`*s<%lO*V!R!)nX!a`!cpOr*Vrs(Vsv*Vwx)ex!{*V!{!|!*Z!|;'S*V;'S;=`*s<%lO*V!R!*bX!a`!cpOr*Vrs(Vsv*Vwx)ex!r*V!r!s!*}!s;'S*V;'S;=`*s<%lO*V!R!+UX!a`!cpOr*Vrs(Vsv*Vwx)ex!g*V!g!h!+q!h;'S*V;'S;=`*s<%lO*V!R!+xY!a`!cpOr!+qrs!,hsv!+qvw!-Swx!.[x!`!+q!`!a!/j!a;'S!+q;'S;=`!0Y<%lO!+qq!,mV!cpOv!,hvx!-Sx!`!,h!`!a!-q!a;'S!,h;'S;=`!.U<%lO!,hP!-VTO!`!-S!`!a!-f!a;'S!-S;'S;=`!-k<%lO!-SP!-kO{PP!-nP;=`<%l!-Sq!-xS!cp{POv(Vx;'S(V;'S;=`(h<%lO(Vq!.XP;=`<%l!,ha!.aX!a`Or!.[rs!-Ssv!.[vw!-Sw!`!.[!`!a!.|!a;'S!.[;'S;=`!/d<%lO!.[a!/TT!a`{POr)esv)ew;'S)e;'S;=`)y<%lO)ea!/gP;=`<%l!.[!R!/sV!a`!cp{POr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!0]P;=`<%l!+q!R!0gX!a`!cpOr*Vrs(Vsv*Vwx)ex#c*V#c#d!1S#d;'S*V;'S;=`*s<%lO*V!R!1ZX!a`!cpOr*Vrs(Vsv*Vwx)ex#V*V#V#W!1v#W;'S*V;'S;=`*s<%lO*V!R!1}X!a`!cpOr*Vrs(Vsv*Vwx)ex#h*V#h#i!2j#i;'S*V;'S;=`*s<%lO*V!R!2qX!a`!cpOr*Vrs(Vsv*Vwx)ex#m*V#m#n!3^#n;'S*V;'S;=`*s<%lO*V!R!3eX!a`!cpOr*Vrs(Vsv*Vwx)ex#d*V#d#e!4Q#e;'S*V;'S;=`*s<%lO*V!R!4XX!a`!cpOr*Vrs(Vsv*Vwx)ex#X*V#X#Y!+q#Y;'S*V;'S;=`*s<%lO*V!R!4{Y!a`!cpOr!4trs!5ksv!4tvw!6Vwx!8]x!a!4t!a!b!:]!b;'S!4t;'S;=`!;r<%lO!4tq!5pV!cpOv!5kvx!6Vx!a!5k!a!b!7W!b;'S!5k;'S;=`!8V<%lO!5kP!6YTO!a!6V!a!b!6i!b;'S!6V;'S;=`!7Q<%lO!6VP!6lTO!`!6V!`!a!6{!a;'S!6V;'S;=`!7Q<%lO!6VP!7QOxPP!7TP;=`<%l!6Vq!7]V!cpOv!5kvx!6Vx!`!5k!`!a!7r!a;'S!5k;'S;=`!8V<%lO!5kq!7yS!cpxPOv(Vx;'S(V;'S;=`(h<%lO(Vq!8YP;=`<%l!5ka!8bX!a`Or!8]rs!6Vsv!8]vw!6Vw!a!8]!a!b!8}!b;'S!8];'S;=`!:V<%lO!8]a!9SX!a`Or!8]rs!6Vsv!8]vw!6Vw!`!8]!`!a!9o!a;'S!8];'S;=`!:V<%lO!8]a!9vT!a`xPOr)esv)ew;'S)e;'S;=`)y<%lO)ea!:YP;=`<%l!8]!R!:dY!a`!cpOr!4trs!5ksv!4tvw!6Vwx!8]x!`!4t!`!a!;S!a;'S!4t;'S;=`!;r<%lO!4t!R!;]V!a`!cpxPOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!;uP;=`<%l!4t!V!<TXiS`P!a`!cpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X",
  tokenizers: [$S, kS, vS, wS, bS, QS, 0, 1, 2, 3, 4, 5],
  topRules: { Document: [0, 15] },
  dialects: { noMatch: 0, selfClosing: 485 },
  tokenPrec: 487
});
function ku(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let i of n.getChildren(Qu)) {
    let s = i.getChild(sS), r = i.getChild(Qo) || i.getChild(xu);
    s && (t[e.read(s.from, s.to)] = r ? r.type.id == Qo ? e.read(r.from + 1, r.to - 1) : e.read(r.from, r.to) : "");
  }
  return t;
}
function th(n, e) {
  let t = n.getChild(nS);
  return t ? e.read(t.from, t.to) : " ";
}
function Sr(n, e, t) {
  let i;
  for (let s of t)
    if (!s.attrs || s.attrs(i || (i = ku(n.node.parent.firstChild, e))))
      return { parser: s.parser };
  return null;
}
function vu(n = [], e = []) {
  let t = [], i = [], s = [], r = [];
  for (let l of n)
    (l.tag == "script" ? t : l.tag == "style" ? i : l.tag == "textarea" ? s : r).push(l);
  let o = e.length ? /* @__PURE__ */ Object.create(null) : null;
  for (let l of e)
    (o[l.name] || (o[l.name] = [])).push(l);
  return vg((l, a) => {
    let h = l.type.id;
    if (h == rS)
      return Sr(l, a, t);
    if (h == oS)
      return Sr(l, a, i);
    if (h == lS)
      return Sr(l, a, s);
    if (h == bu && r.length) {
      let c = l.node, f = c.firstChild, u = f && th(f, a), d;
      if (u) {
        for (let O of r)
          if (O.tag == u && (!O.attrs || O.attrs(d || (d = ku(c, a))))) {
            let m = c.lastChild;
            return { parser: O.parser, overlay: [{ from: f.to, to: m.type.id == hS ? m.from : c.to }] };
          }
      }
    }
    if (o && h == Qu) {
      let c = l.node, f;
      if (f = c.firstChild) {
        let u = o[a.read(f.from, f.to)];
        if (u)
          for (let d of u) {
            if (d.tagName && d.tagName != th(c.parent, a))
              continue;
            let O = c.lastChild;
            if (O.type.id == Qo) {
              let m = O.from + 1, g = O.lastChild, S = O.to - (g && g.isError ? 0 : 1);
              if (S > m)
                return { parser: d.parser, overlay: [{ from: m, to: S }] };
            } else if (O.type.id == xu)
              return { parser: d.parser, overlay: [{ from: O.from, to: O.to }] };
          }
      }
    }
    return null;
  });
}
const XS = 96, ih = 1, TS = 97, ZS = 98, nh = 2, Pu = [
  9,
  10,
  11,
  12,
  13,
  32,
  133,
  160,
  5760,
  8192,
  8193,
  8194,
  8195,
  8196,
  8197,
  8198,
  8199,
  8200,
  8201,
  8202,
  8232,
  8233,
  8239,
  8287,
  12288
], RS = 58, AS = 40, Cu = 95, VS = 91, Ln = 45, YS = 46, MS = 35, WS = 37;
function bs(n) {
  return n >= 65 && n <= 90 || n >= 97 && n <= 122 || n >= 161;
}
function DS(n) {
  return n >= 48 && n <= 57;
}
const US = new ht((n, e) => {
  for (let t = !1, i = 0, s = 0; ; s++) {
    let { next: r } = n;
    if (bs(r) || r == Ln || r == Cu || t && DS(r))
      !t && (r != Ln || s > 0) && (t = !0), i === s && r == Ln && i++, n.advance();
    else {
      t && n.acceptToken(r == AS ? TS : i == 2 && e.canShift(nh) ? nh : ZS);
      break;
    }
  }
}), qS = new ht((n) => {
  if (Pu.includes(n.peek(-1))) {
    let { next: e } = n;
    (bs(e) || e == Cu || e == MS || e == YS || e == VS || e == RS || e == Ln) && n.acceptToken(XS);
  }
}), ES = new ht((n) => {
  if (!Pu.includes(n.peek(-1))) {
    let { next: e } = n;
    if (e == WS && (n.advance(), n.acceptToken(ih)), bs(e)) {
      do
        n.advance();
      while (bs(n.next));
      n.acceptToken(ih);
    }
  }
}), _S = Ys({
  "AtKeyword import charset namespace keyframes media supports": p.definitionKeyword,
  "from to selector": p.keyword,
  NamespaceName: p.namespace,
  KeyframeName: p.labelName,
  KeyframeRangeName: p.operatorKeyword,
  TagName: p.tagName,
  ClassName: p.className,
  PseudoClassName: p.constant(p.className),
  IdName: p.labelName,
  "FeatureName PropertyName": p.propertyName,
  AttributeName: p.attributeName,
  NumberLiteral: p.number,
  KeywordQuery: p.keyword,
  UnaryQueryOp: p.operatorKeyword,
  "CallTag ValueName": p.atom,
  VariableName: p.variableName,
  Callee: p.operatorKeyword,
  Unit: p.unit,
  "UniversalSelector NestingSelector": p.definitionOperator,
  MatchOp: p.compareOperator,
  "ChildOp SiblingOp, LogicOp": p.logicOperator,
  BinOp: p.arithmeticOperator,
  Important: p.modifier,
  Comment: p.blockComment,
  ColorLiteral: p.color,
  "ParenthesizedContent StringLiteral": p.string,
  ":": p.punctuation,
  "PseudoOp #": p.derefOperator,
  "; ,": p.separator,
  "( )": p.paren,
  "[ ]": p.squareBracket,
  "{ }": p.brace
}), BS = { __proto__: null, lang: 32, "nth-child": 32, "nth-last-child": 32, "nth-of-type": 32, "nth-last-of-type": 32, dir: 32, "host-context": 32, url: 60, "url-prefix": 60, domain: 60, regexp: 60, selector: 134 }, zS = { __proto__: null, "@import": 114, "@media": 138, "@charset": 142, "@namespace": 146, "@keyframes": 152, "@supports": 164 }, IS = { __proto__: null, not: 128, only: 128 }, jS = pi.deserialize({
  version: 14,
  states: "9bQYQ[OOO#_Q[OOP#fOWOOOOQP'#Cd'#CdOOQP'#Cc'#CcO#kQ[O'#CfO$_QXO'#CaO$fQ[O'#ChO$qQ[O'#DPO$vQ[O'#DTOOQP'#Ej'#EjO${QdO'#DeO%gQ[O'#DrO${QdO'#DtO%xQ[O'#DvO&TQ[O'#DyO&]Q[O'#EPO&kQ[O'#EROOQS'#Ei'#EiOOQS'#EU'#EUQYQ[OOO&rQXO'#CdO'gQWO'#DaO'lQWO'#EpO'wQ[O'#EpQOQWOOP(RO#tO'#C_POOO)C@X)C@XOOQP'#Cg'#CgOOQP,59Q,59QO#kQ[O,59QO(^Q[O'#EXO(xQWO,58{O)QQ[O,59SO$qQ[O,59kO$vQ[O,59oO(^Q[O,59sO(^Q[O,59uO(^Q[O,59vO)]Q[O'#D`OOQS,58{,58{OOQP'#Ck'#CkOOQO'#C}'#C}OOQP,59S,59SO)dQWO,59SO)iQWO,59SOOQP'#DR'#DROOQP,59k,59kOOQO'#DV'#DVO)nQ`O,59oOOQS'#Cp'#CpO${QdO'#CqO)vQvO'#CsO+TQtO,5:POOQO'#Cx'#CxO)iQWO'#CwO+iQWO'#CyOOQS'#Em'#EmOOQO'#Dh'#DhO+nQ[O'#DoO+|QWO'#EqO&]Q[O'#DmO,[QWO'#DpOOQO'#Er'#ErO({QWO,5:^O,aQpO,5:`OOQS'#Dx'#DxO,iQWO,5:bO,nQ[O,5:bOOQO'#D{'#D{O,vQWO,5:eO,{QWO,5:kO-TQWO,5:mOOQS-E8S-E8SO${QdO,59{O-]Q[O'#EZO-jQWO,5;[O-jQWO,5;[POOO'#ET'#ETP-uO#tO,58yPOOO,58y,58yOOQP1G.l1G.lO.lQXO,5:sOOQO-E8V-E8VOOQS1G.g1G.gOOQP1G.n1G.nO)dQWO1G.nO)iQWO1G.nOOQP1G/V1G/VO.yQ`O1G/ZO/dQXO1G/_O/zQXO1G/aO0bQXO1G/bO0xQWO,59zO0}Q[O'#DOO1UQdO'#CoOOQP1G/Z1G/ZO${QdO1G/ZO1]QpO,59]OOQS,59_,59_O${QdO,59aO1eQWO1G/kOOQS,59c,59cO1jQ!bO,59eO1rQWO'#DhO1}QWO,5:TO2SQWO,5:ZO&]Q[O,5:VO&]Q[O'#E[O2[QWO,5;]O2gQWO,5:XO(^Q[O,5:[OOQS1G/x1G/xOOQS1G/z1G/zOOQS1G/|1G/|O2xQWO1G/|O2}QdO'#D|OOQS1G0P1G0POOQS1G0V1G0VOOQS1G0X1G0XO3YQtO1G/gOOQO,5:u,5:uO3pQ[O,5:uOOQO-E8X-E8XO3}QWO1G0vPOOO-E8R-E8RPOOO1G.e1G.eOOQP7+$Y7+$YOOQP7+$u7+$uO${QdO7+$uOOQS1G/f1G/fO4YQXO'#EoO4aQWO,59jO4fQtO'#EVO5ZQdO'#ElO5eQWO,59ZO5jQpO7+$uOOQS1G.w1G.wOOQS1G.{1G.{OOQS7+%V7+%VO5rQWO1G/PO${QdO1G/oOOQO1G/u1G/uOOQO1G/q1G/qO5wQWO,5:vOOQO-E8Y-E8YO6VQXO1G/vOOQS7+%h7+%hO6^QYO'#CsOOQO'#EO'#EOO6iQ`O'#D}OOQO'#D}'#D}O6tQWO'#E]O6|QdO,5:hOOQS,5:h,5:hO7XQtO'#EYO${QdO'#EYO8VQdO7+%ROOQO7+%R7+%ROOQO1G0a1G0aO8jQpO<<HaO8rQWO,5;ZOOQP1G/U1G/UOOQS-E8T-E8TO${QdO'#EWO8zQWO,5;WOOQT1G.u1G.uOOQP<<Ha<<HaOOQS7+$k7+$kO9SQdO7+%ZOOQO7+%b7+%bOOQO,5:i,5:iO3QQdO'#E^O6tQWO,5:wOOQS,5:w,5:wOOQS-E8Z-E8ZOOQS1G0S1G0SO9ZQtO,5:tOOQS-E8W-E8WOOQO<<Hm<<HmOOQPAN={AN={O:XQdO,5:rOOQO-E8U-E8UOOQO<<Hu<<HuOOQO,5:x,5:xOOQO-E8[-E8[OOQS1G0c1G0c",
  stateData: ":k~O#WOS#XQQ~OUYOXYO]VO^VOtWOxXO!YaO!ZZO!g[O!i]O!k^O!n_O!t`O#URO#_TO~OQfOUYOXYO]VO^VOtWOxXO!YaO!ZZO!g[O!i]O!k^O!n_O!t`O#UeO#_TO~O#R#dP~P!ZO#XjO~O#UlO~O]qO^qOpoOtrOxsO|tO!PvO#SuO#_nO~O!RwO~P#pO`}O#TzO#UyO~O#U!OO~O#U!QO~OQ!ZOb!TOf!ZOh!ZOn!YO#T!WO#U!SO#b!UO~Ob!]O!b!_O!e!`O#U![O!R#eP~Oh!eOn!YO#U!dO~Oh!gO#U!gO~Ob!]O!b!_O!e!`O#U![O~O!W#eP~P%gO]WX]!UX^WXpWXtWXxWX|WX!PWX!RWX#SWX#_WX~O]!lO~O!W!mO#R#dX!Q#dX~O#R#dX!Q#dX~P!ZO#Y!pO#Z!pO#[!rO~OUYOXYO]VO^VOtWOxXO#URO#_TO~OpoO!RwO~O`!yO#TzO#UyO~O!Q#dP~P!ZOb#QO~Ob#RO~Ov#SOz#TO~OP#VObgXjgX!WgX!bgX!egX#UgXagXQgXfgXhgXngXpgX!VgX#RgX#TgX#bgXvgX!QgX~Ob!]Oj#WO!b!_O!e!`O#U![O!W#eP~Ob#ZO~Ob!]O!b!_O!e!`O#U#[O~Op#`O!`#_O!R#eX!W#eX~Ob#cO~Oj#WO!W#eO~O!W#fO~Oh#gOn!YO~O!R#hO~O!RwO!`#_O~O!RwO!W#kO~O!W!}X#R!}X!Q!}X~P!ZO!W!mO#R#da!Q#da~O#Y!pO#Z!pO#[#rO~O]qO^qOtrOxsO|tO!PvO#SuO#_nO~Op!{a!R!{aa!{a~P.QOv#tOz#uO~O]qO^qOtrOxsO#_nO~Op{i|{i!P{i!R{i#S{ia{i~P/ROp}i|}i!P}i!R}i#S}ia}i~P/ROp!Oi|!Oi!P!Oi!R!Oi#S!Oia!Oi~P/RO!Q#vO~Oa#cP~P(^Oa#`P~P${Oa#}Oj#WO~O!W$PO~Oh$QOo$QO~O]!^Xa![X!`![X~O]$RO~Oa$SO!`#_O~Op#`O!R#ea!W#ea~O!`#_Op!aa!R!aa!W!aaa!aa~O!W$XO~O!Q$`O#U$ZO#b$YO~Oj#WOp$bO!V$dO!W!Ti#R!Ti!Q!Ti~P${O!W!}a#R!}a!Q!}a~P!ZO!W!mO#R#di!Q#di~Oa#cX~P#pOa$hO~Oj#WOQ!yXa!yXb!yXf!yXh!yXn!yXp!yX#T!yX#U!yX#b!yX~Op$jOa#`X~P${Oa$lO~Oj#WOv$mO~Oa$nO~O!`#_Op#Oa!R#Oa!W#Oa~Oa$pO~P.QOP#VOpgX!RgX~O#b$YOp!qX!R!qX~Op$rO!RwO~O!Q$vO#U$ZO#b$YO~Oj#WOQ!|Xb!|Xf!|Xh!|Xn!|Xp!|X!V!|X!W!|X#R!|X#T!|X#U!|X#b!|X!Q!|X~Op$bO!V$yO!W!Tq#R!Tq!Q!Tq~P${Oj#WOv$zO~OpoOa#ca~Op$jOa#`a~Oa$}O~P${Oj#WOQ!|ab!|af!|ah!|an!|ap!|a!V!|a!W!|a#R!|a#T!|a#U!|a#b!|a!Q!|a~Oa!zap!za~P${O#Wo#X#bj!P#b~",
  goto: "-Y#gPPP#hP#kP#t$TP#t$d#tPP$jPPP$p$y$yP%]P$yP$y%w&ZPPP&s&y#tP'PP#tP'VP#tP#t#tPPP']'r(PPP#kPP(W(W(b(WP(WP(W(WP#kP#kP#kP(e#kP(h(k(n(u#kP#kP(z)Q)a)o)u*P*V*a*g*mPPPPPPPPPP*s*|P+i+lP,b,e,k,tRkQ_bOPdhw!m#nkYOPdhotuvw!m#Q#c#nkSOPdhotuvw!m#Q#c#nQmTR!snQ{VR!wqQ!w}Q#Y!XR#s!yq!ZZ]!T!l#R#T#W#l#u#z$R$b$c$j$o${p!ZZ]!T!l#R#T#W#l#u#z$R$b$c$j$o${U$]#h$_$rR$q$[q!XZ]!T!l#R#T#W#l#u#z$R$b$c$j$o${p!ZZ]!T!l#R#T#W#l#u#z$R$b$c$j$o${Q!e^R#g!fQ|VR!xqQ!w|R#s!xQ!PWR!zrQ!RXR!{sQxUQ!vpQ#d!bQ#j!iQ#k!jQ$t$^R%Q$sSgPwQ!ohQ#m!mR$e#nZfPhw!m#na!a[`a!V!]!_#_#`R#]!]R!f^R!h_R#i!hS$^#h$_R%O$rV$[#h$_$rQ!qjR#q!qQdOShPwU!kdh#nR#n!mQ#z#RU$i#z$o${Q$o$RR${$jQ$k#zR$|$kQpUS!up$gR$g#wQ$c#lR$x$cQ!ngS#o!n#pR#p!oQ#a!^R$V#aQ$_#hR$u$_Q$s$^R%P$s_cOPdhw!m#n^UOPdhw!m#nQ!toQ!|tQ!}uQ#OvQ#w#QR$W#cR#{#RQ!VZQ!c]Q#U!TQ#l!l[#y#R#z$R$j$o${Q#|#TQ$O#WS$a#l$cQ$f#uR$w$bR#x#QQiPR#PwQ!b[Q!jaR#X!VU!^[a!VQ!i`Q#^!]Q#b!_Q$T#_R$U#`",
  nodeNames: "⚠ Unit VariableName Comment StyleSheet RuleSet UniversalSelector TagSelector TagName NestingSelector ClassSelector ClassName PseudoClassSelector : :: PseudoClassName PseudoClassName ) ( ArgList ValueName ParenthesizedValue ColorLiteral NumberLiteral StringLiteral BinaryExpression BinOp CallExpression Callee CallLiteral CallTag ParenthesizedContent , PseudoClassName ArgList IdSelector # IdName ] AttributeSelector [ AttributeName MatchOp ChildSelector ChildOp DescendantSelector SiblingSelector SiblingOp } { Block Declaration PropertyName Important ; ImportStatement AtKeyword import KeywordQuery FeatureQuery FeatureName BinaryQuery LogicOp UnaryQuery UnaryQueryOp ParenthesizedQuery SelectorQuery selector MediaStatement media CharsetStatement charset NamespaceStatement namespace NamespaceName KeyframesStatement keyframes KeyframeName KeyframeList KeyframeSelector KeyframeRangeName SupportsStatement supports AtRule Styles",
  maxTerm: 114,
  nodeProps: [
    ["openedBy", 17, "(", 48, "{"],
    ["closedBy", 18, ")", 49, "}"]
  ],
  propSources: [_S],
  skippedNodes: [0, 3, 85],
  repeatNodeCount: 10,
  tokenData: "J^~R!^OX$}X^%u^p$}pq%uqr)Xrs.Rst/utu6duv$}vw7^wx7oxy9^yz9oz{9t{|:_|}?Q}!O?c!O!P@Q!P!Q@i!Q![Ab![!]B]!]!^CX!^!_$}!_!`Cj!`!aC{!a!b$}!b!cDw!c!}$}!}#OFa#O#P$}#P#QFr#Q#R6d#R#T$}#T#UGT#U#c$}#c#dHf#d#o$}#o#pH{#p#q6d#q#rI^#r#sIo#s#y$}#y#z%u#z$f$}$f$g%u$g#BY$}#BY#BZ%u#BZ$IS$}$IS$I_%u$I_$I|$}$I|$JO%u$JO$JT$}$JT$JU%u$JU$KV$}$KV$KW%u$KW&FU$}&FU&FV%u&FV;'S$};'S;=`JW<%lO$}`%QSOy%^z;'S%^;'S;=`%o<%lO%^`%cSo`Oy%^z;'S%^;'S;=`%o<%lO%^`%rP;=`<%l%^~%zh#W~OX%^X^'f^p%^pq'fqy%^z#y%^#y#z'f#z$f%^$f$g'f$g#BY%^#BY#BZ'f#BZ$IS%^$IS$I_'f$I_$I|%^$I|$JO'f$JO$JT%^$JT$JU'f$JU$KV%^$KV$KW'f$KW&FU%^&FU&FV'f&FV;'S%^;'S;=`%o<%lO%^~'mh#W~o`OX%^X^'f^p%^pq'fqy%^z#y%^#y#z'f#z$f%^$f$g'f$g#BY%^#BY#BZ'f#BZ$IS%^$IS$I_'f$I_$I|%^$I|$JO'f$JO$JT%^$JT$JU'f$JU$KV%^$KV$KW'f$KW&FU%^&FU&FV'f&FV;'S%^;'S;=`%o<%lO%^l)[UOy%^z#]%^#]#^)n#^;'S%^;'S;=`%o<%lO%^l)sUo`Oy%^z#a%^#a#b*V#b;'S%^;'S;=`%o<%lO%^l*[Uo`Oy%^z#d%^#d#e*n#e;'S%^;'S;=`%o<%lO%^l*sUo`Oy%^z#c%^#c#d+V#d;'S%^;'S;=`%o<%lO%^l+[Uo`Oy%^z#f%^#f#g+n#g;'S%^;'S;=`%o<%lO%^l+sUo`Oy%^z#h%^#h#i,V#i;'S%^;'S;=`%o<%lO%^l,[Uo`Oy%^z#T%^#T#U,n#U;'S%^;'S;=`%o<%lO%^l,sUo`Oy%^z#b%^#b#c-V#c;'S%^;'S;=`%o<%lO%^l-[Uo`Oy%^z#h%^#h#i-n#i;'S%^;'S;=`%o<%lO%^l-uS!V[o`Oy%^z;'S%^;'S;=`%o<%lO%^~.UWOY.RZr.Rrs.ns#O.R#O#P.s#P;'S.R;'S;=`/o<%lO.R~.sOh~~.vRO;'S.R;'S;=`/P;=`O.R~/SXOY.RZr.Rrs.ns#O.R#O#P.s#P;'S.R;'S;=`/o;=`<%l.R<%lO.R~/rP;=`<%l.Rn/zYtQOy%^z!Q%^!Q![0j![!c%^!c!i0j!i#T%^#T#Z0j#Z;'S%^;'S;=`%o<%lO%^l0oYo`Oy%^z!Q%^!Q![1_![!c%^!c!i1_!i#T%^#T#Z1_#Z;'S%^;'S;=`%o<%lO%^l1dYo`Oy%^z!Q%^!Q![2S![!c%^!c!i2S!i#T%^#T#Z2S#Z;'S%^;'S;=`%o<%lO%^l2ZYf[o`Oy%^z!Q%^!Q![2y![!c%^!c!i2y!i#T%^#T#Z2y#Z;'S%^;'S;=`%o<%lO%^l3QYf[o`Oy%^z!Q%^!Q![3p![!c%^!c!i3p!i#T%^#T#Z3p#Z;'S%^;'S;=`%o<%lO%^l3uYo`Oy%^z!Q%^!Q![4e![!c%^!c!i4e!i#T%^#T#Z4e#Z;'S%^;'S;=`%o<%lO%^l4lYf[o`Oy%^z!Q%^!Q![5[![!c%^!c!i5[!i#T%^#T#Z5[#Z;'S%^;'S;=`%o<%lO%^l5aYo`Oy%^z!Q%^!Q![6P![!c%^!c!i6P!i#T%^#T#Z6P#Z;'S%^;'S;=`%o<%lO%^l6WSf[o`Oy%^z;'S%^;'S;=`%o<%lO%^d6gUOy%^z!_%^!_!`6y!`;'S%^;'S;=`%o<%lO%^d7QSzSo`Oy%^z;'S%^;'S;=`%o<%lO%^b7cSXQOy%^z;'S%^;'S;=`%o<%lO%^~7rWOY7oZw7owx.nx#O7o#O#P8[#P;'S7o;'S;=`9W<%lO7o~8_RO;'S7o;'S;=`8h;=`O7o~8kXOY7oZw7owx.nx#O7o#O#P8[#P;'S7o;'S;=`9W;=`<%l7o<%lO7o~9ZP;=`<%l7on9cSb^Oy%^z;'S%^;'S;=`%o<%lO%^~9tOa~n9{UUQjWOy%^z!_%^!_!`6y!`;'S%^;'S;=`%o<%lO%^n:fWjW!PQOy%^z!O%^!O!P;O!P!Q%^!Q![>T![;'S%^;'S;=`%o<%lO%^l;TUo`Oy%^z!Q%^!Q![;g![;'S%^;'S;=`%o<%lO%^l;nYo`#b[Oy%^z!Q%^!Q![;g![!g%^!g!h<^!h#X%^#X#Y<^#Y;'S%^;'S;=`%o<%lO%^l<cYo`Oy%^z{%^{|=R|}%^}!O=R!O!Q%^!Q![=j![;'S%^;'S;=`%o<%lO%^l=WUo`Oy%^z!Q%^!Q![=j![;'S%^;'S;=`%o<%lO%^l=qUo`#b[Oy%^z!Q%^!Q![=j![;'S%^;'S;=`%o<%lO%^l>[[o`#b[Oy%^z!O%^!O!P;g!P!Q%^!Q![>T![!g%^!g!h<^!h#X%^#X#Y<^#Y;'S%^;'S;=`%o<%lO%^n?VSp^Oy%^z;'S%^;'S;=`%o<%lO%^l?hWjWOy%^z!O%^!O!P;O!P!Q%^!Q![>T![;'S%^;'S;=`%o<%lO%^n@VU#_QOy%^z!Q%^!Q![;g![;'S%^;'S;=`%o<%lO%^~@nTjWOy%^z{@}{;'S%^;'S;=`%o<%lO%^~AUSo`#X~Oy%^z;'S%^;'S;=`%o<%lO%^lAg[#b[Oy%^z!O%^!O!P;g!P!Q%^!Q![>T![!g%^!g!h<^!h#X%^#X#Y<^#Y;'S%^;'S;=`%o<%lO%^bBbU]QOy%^z![%^![!]Bt!];'S%^;'S;=`%o<%lO%^bB{S^Qo`Oy%^z;'S%^;'S;=`%o<%lO%^nC^S!W^Oy%^z;'S%^;'S;=`%o<%lO%^dCoSzSOy%^z;'S%^;'S;=`%o<%lO%^bDQU|QOy%^z!`%^!`!aDd!a;'S%^;'S;=`%o<%lO%^bDkS|Qo`Oy%^z;'S%^;'S;=`%o<%lO%^bDzWOy%^z!c%^!c!}Ed!}#T%^#T#oEd#o;'S%^;'S;=`%o<%lO%^bEk[!YQo`Oy%^z}%^}!OEd!O!Q%^!Q![Ed![!c%^!c!}Ed!}#T%^#T#oEd#o;'S%^;'S;=`%o<%lO%^bFfSxQOy%^z;'S%^;'S;=`%o<%lO%^lFwSv[Oy%^z;'S%^;'S;=`%o<%lO%^bGWUOy%^z#b%^#b#cGj#c;'S%^;'S;=`%o<%lO%^bGoUo`Oy%^z#W%^#W#XHR#X;'S%^;'S;=`%o<%lO%^bHYS!`Qo`Oy%^z;'S%^;'S;=`%o<%lO%^bHiUOy%^z#f%^#f#gHR#g;'S%^;'S;=`%o<%lO%^fIQS!RUOy%^z;'S%^;'S;=`%o<%lO%^nIcS!Q^Oy%^z;'S%^;'S;=`%o<%lO%^fItU!PQOy%^z!_%^!_!`6y!`;'S%^;'S;=`%o<%lO%^`JZP;=`<%l$}",
  tokenizers: [qS, ES, US, 1, 2, 3, 4, new ms("m~RRYZ[z{a~~g~aO#Z~~dP!P!Qg~lO#[~~", 28, 102)],
  topRules: { StyleSheet: [0, 4], Styles: [1, 84] },
  specialized: [{ term: 97, get: (n) => BS[n] || -1 }, { term: 56, get: (n) => zS[n] || -1 }, { term: 98, get: (n) => IS[n] || -1 }],
  tokenPrec: 1169
});
let yr = null;
function br() {
  if (!yr && typeof document == "object" && document.body) {
    let { style: n } = document.body, e = [], t = /* @__PURE__ */ new Set();
    for (let i in n)
      i != "cssText" && i != "cssFloat" && typeof n[i] == "string" && (/[A-Z]/.test(i) && (i = i.replace(/[A-Z]/g, (s) => "-" + s.toLowerCase())), t.has(i) || (e.push(i), t.add(i)));
    yr = e.sort().map((i) => ({ type: "property", label: i }));
  }
  return yr || [];
}
const sh = /* @__PURE__ */ [
  "active",
  "after",
  "any-link",
  "autofill",
  "backdrop",
  "before",
  "checked",
  "cue",
  "default",
  "defined",
  "disabled",
  "empty",
  "enabled",
  "file-selector-button",
  "first",
  "first-child",
  "first-letter",
  "first-line",
  "first-of-type",
  "focus",
  "focus-visible",
  "focus-within",
  "fullscreen",
  "has",
  "host",
  "host-context",
  "hover",
  "in-range",
  "indeterminate",
  "invalid",
  "is",
  "lang",
  "last-child",
  "last-of-type",
  "left",
  "link",
  "marker",
  "modal",
  "not",
  "nth-child",
  "nth-last-child",
  "nth-last-of-type",
  "nth-of-type",
  "only-child",
  "only-of-type",
  "optional",
  "out-of-range",
  "part",
  "placeholder",
  "placeholder-shown",
  "read-only",
  "read-write",
  "required",
  "right",
  "root",
  "scope",
  "selection",
  "slotted",
  "target",
  "target-text",
  "valid",
  "visited",
  "where"
].map((n) => ({ type: "class", label: n })), rh = /* @__PURE__ */ [
  "above",
  "absolute",
  "activeborder",
  "additive",
  "activecaption",
  "after-white-space",
  "ahead",
  "alias",
  "all",
  "all-scroll",
  "alphabetic",
  "alternate",
  "always",
  "antialiased",
  "appworkspace",
  "asterisks",
  "attr",
  "auto",
  "auto-flow",
  "avoid",
  "avoid-column",
  "avoid-page",
  "avoid-region",
  "axis-pan",
  "background",
  "backwards",
  "baseline",
  "below",
  "bidi-override",
  "blink",
  "block",
  "block-axis",
  "bold",
  "bolder",
  "border",
  "border-box",
  "both",
  "bottom",
  "break",
  "break-all",
  "break-word",
  "bullets",
  "button",
  "button-bevel",
  "buttonface",
  "buttonhighlight",
  "buttonshadow",
  "buttontext",
  "calc",
  "capitalize",
  "caps-lock-indicator",
  "caption",
  "captiontext",
  "caret",
  "cell",
  "center",
  "checkbox",
  "circle",
  "cjk-decimal",
  "clear",
  "clip",
  "close-quote",
  "col-resize",
  "collapse",
  "color",
  "color-burn",
  "color-dodge",
  "column",
  "column-reverse",
  "compact",
  "condensed",
  "contain",
  "content",
  "contents",
  "content-box",
  "context-menu",
  "continuous",
  "copy",
  "counter",
  "counters",
  "cover",
  "crop",
  "cross",
  "crosshair",
  "currentcolor",
  "cursive",
  "cyclic",
  "darken",
  "dashed",
  "decimal",
  "decimal-leading-zero",
  "default",
  "default-button",
  "dense",
  "destination-atop",
  "destination-in",
  "destination-out",
  "destination-over",
  "difference",
  "disc",
  "discard",
  "disclosure-closed",
  "disclosure-open",
  "document",
  "dot-dash",
  "dot-dot-dash",
  "dotted",
  "double",
  "down",
  "e-resize",
  "ease",
  "ease-in",
  "ease-in-out",
  "ease-out",
  "element",
  "ellipse",
  "ellipsis",
  "embed",
  "end",
  "ethiopic-abegede-gez",
  "ethiopic-halehame-aa-er",
  "ethiopic-halehame-gez",
  "ew-resize",
  "exclusion",
  "expanded",
  "extends",
  "extra-condensed",
  "extra-expanded",
  "fantasy",
  "fast",
  "fill",
  "fill-box",
  "fixed",
  "flat",
  "flex",
  "flex-end",
  "flex-start",
  "footnotes",
  "forwards",
  "from",
  "geometricPrecision",
  "graytext",
  "grid",
  "groove",
  "hand",
  "hard-light",
  "help",
  "hidden",
  "hide",
  "higher",
  "highlight",
  "highlighttext",
  "horizontal",
  "hsl",
  "hsla",
  "hue",
  "icon",
  "ignore",
  "inactiveborder",
  "inactivecaption",
  "inactivecaptiontext",
  "infinite",
  "infobackground",
  "infotext",
  "inherit",
  "initial",
  "inline",
  "inline-axis",
  "inline-block",
  "inline-flex",
  "inline-grid",
  "inline-table",
  "inset",
  "inside",
  "intrinsic",
  "invert",
  "italic",
  "justify",
  "keep-all",
  "landscape",
  "large",
  "larger",
  "left",
  "level",
  "lighter",
  "lighten",
  "line-through",
  "linear",
  "linear-gradient",
  "lines",
  "list-item",
  "listbox",
  "listitem",
  "local",
  "logical",
  "loud",
  "lower",
  "lower-hexadecimal",
  "lower-latin",
  "lower-norwegian",
  "lowercase",
  "ltr",
  "luminosity",
  "manipulation",
  "match",
  "matrix",
  "matrix3d",
  "medium",
  "menu",
  "menutext",
  "message-box",
  "middle",
  "min-intrinsic",
  "mix",
  "monospace",
  "move",
  "multiple",
  "multiple_mask_images",
  "multiply",
  "n-resize",
  "narrower",
  "ne-resize",
  "nesw-resize",
  "no-close-quote",
  "no-drop",
  "no-open-quote",
  "no-repeat",
  "none",
  "normal",
  "not-allowed",
  "nowrap",
  "ns-resize",
  "numbers",
  "numeric",
  "nw-resize",
  "nwse-resize",
  "oblique",
  "opacity",
  "open-quote",
  "optimizeLegibility",
  "optimizeSpeed",
  "outset",
  "outside",
  "outside-shape",
  "overlay",
  "overline",
  "padding",
  "padding-box",
  "painted",
  "page",
  "paused",
  "perspective",
  "pinch-zoom",
  "plus-darker",
  "plus-lighter",
  "pointer",
  "polygon",
  "portrait",
  "pre",
  "pre-line",
  "pre-wrap",
  "preserve-3d",
  "progress",
  "push-button",
  "radial-gradient",
  "radio",
  "read-only",
  "read-write",
  "read-write-plaintext-only",
  "rectangle",
  "region",
  "relative",
  "repeat",
  "repeating-linear-gradient",
  "repeating-radial-gradient",
  "repeat-x",
  "repeat-y",
  "reset",
  "reverse",
  "rgb",
  "rgba",
  "ridge",
  "right",
  "rotate",
  "rotate3d",
  "rotateX",
  "rotateY",
  "rotateZ",
  "round",
  "row",
  "row-resize",
  "row-reverse",
  "rtl",
  "run-in",
  "running",
  "s-resize",
  "sans-serif",
  "saturation",
  "scale",
  "scale3d",
  "scaleX",
  "scaleY",
  "scaleZ",
  "screen",
  "scroll",
  "scrollbar",
  "scroll-position",
  "se-resize",
  "self-start",
  "self-end",
  "semi-condensed",
  "semi-expanded",
  "separate",
  "serif",
  "show",
  "single",
  "skew",
  "skewX",
  "skewY",
  "skip-white-space",
  "slide",
  "slider-horizontal",
  "slider-vertical",
  "sliderthumb-horizontal",
  "sliderthumb-vertical",
  "slow",
  "small",
  "small-caps",
  "small-caption",
  "smaller",
  "soft-light",
  "solid",
  "source-atop",
  "source-in",
  "source-out",
  "source-over",
  "space",
  "space-around",
  "space-between",
  "space-evenly",
  "spell-out",
  "square",
  "start",
  "static",
  "status-bar",
  "stretch",
  "stroke",
  "stroke-box",
  "sub",
  "subpixel-antialiased",
  "svg_masks",
  "super",
  "sw-resize",
  "symbolic",
  "symbols",
  "system-ui",
  "table",
  "table-caption",
  "table-cell",
  "table-column",
  "table-column-group",
  "table-footer-group",
  "table-header-group",
  "table-row",
  "table-row-group",
  "text",
  "text-bottom",
  "text-top",
  "textarea",
  "textfield",
  "thick",
  "thin",
  "threeddarkshadow",
  "threedface",
  "threedhighlight",
  "threedlightshadow",
  "threedshadow",
  "to",
  "top",
  "transform",
  "translate",
  "translate3d",
  "translateX",
  "translateY",
  "translateZ",
  "transparent",
  "ultra-condensed",
  "ultra-expanded",
  "underline",
  "unidirectional-pan",
  "unset",
  "up",
  "upper-latin",
  "uppercase",
  "url",
  "var",
  "vertical",
  "vertical-text",
  "view-box",
  "visible",
  "visibleFill",
  "visiblePainted",
  "visibleStroke",
  "visual",
  "w-resize",
  "wait",
  "wave",
  "wider",
  "window",
  "windowframe",
  "windowtext",
  "words",
  "wrap",
  "wrap-reverse",
  "x-large",
  "x-small",
  "xor",
  "xx-large",
  "xx-small"
].map((n) => ({ type: "keyword", label: n })).concat(/* @__PURE__ */ [
  "aliceblue",
  "antiquewhite",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blanchedalmond",
  "blue",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "fuchsia",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "grey",
  "green",
  "greenyellow",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgreen",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightsteelblue",
  "lightyellow",
  "lime",
  "limegreen",
  "linen",
  "magenta",
  "maroon",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "navy",
  "oldlace",
  "olive",
  "olivedrab",
  "orange",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "pink",
  "plum",
  "powderblue",
  "purple",
  "rebeccapurple",
  "red",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "silver",
  "skyblue",
  "slateblue",
  "slategray",
  "snow",
  "springgreen",
  "steelblue",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "white",
  "whitesmoke",
  "yellow",
  "yellowgreen"
].map((n) => ({ type: "constant", label: n }))), LS = /* @__PURE__ */ [
  "a",
  "abbr",
  "address",
  "article",
  "aside",
  "b",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "figcaption",
  "figure",
  "footer",
  "form",
  "header",
  "hgroup",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "main",
  "meter",
  "nav",
  "ol",
  "output",
  "p",
  "pre",
  "ruby",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "tr",
  "u",
  "ul"
].map((n) => ({ type: "type", label: n })), yt = /^(\w[\w-]*|-\w[\w-]*|)$/, NS = /^-(-[\w-]*)?$/;
function GS(n, e) {
  var t;
  if ((n.name == "(" || n.type.isError) && (n = n.parent || n), n.name != "ArgList")
    return !1;
  let i = (t = n.parent) === null || t === void 0 ? void 0 : t.firstChild;
  return (i == null ? void 0 : i.name) != "Callee" ? !1 : e.sliceString(i.from, i.to) == "var";
}
const oh = /* @__PURE__ */ new Of(), FS = ["Declaration"];
function HS(n) {
  for (let e = n; ; ) {
    if (e.type.isTop)
      return e;
    if (!(e = e.parent))
      return n;
  }
}
function Xu(n, e, t) {
  if (e.to - e.from > 4096) {
    let i = oh.get(e);
    if (i)
      return i;
    let s = [], r = /* @__PURE__ */ new Set(), o = e.cursor(E.IncludeAnonymous);
    if (o.firstChild())
      do
        for (let l of Xu(n, o.node, t))
          r.has(l.label) || (r.add(l.label), s.push(l));
      while (o.nextSibling());
    return oh.set(e, s), s;
  } else {
    let i = [], s = /* @__PURE__ */ new Set();
    return e.cursor().iterate((r) => {
      var o;
      if (t(r) && r.matchContext(FS) && ((o = r.node.nextSibling) === null || o === void 0 ? void 0 : o.name) == ":") {
        let l = n.sliceString(r.from, r.to);
        s.has(l) || (s.add(l), i.push({ label: l, type: "variable" }));
      }
    }), i;
  }
}
const JS = (n) => (e) => {
  let { state: t, pos: i } = e, s = I(t).resolveInner(i, -1), r = s.type.isError && s.from == s.to - 1 && t.doc.sliceString(s.from, s.to) == "-";
  if (s.name == "PropertyName" || (r || s.name == "TagName") && /^(Block|Styles)$/.test(s.resolve(s.to).name))
    return { from: s.from, options: br(), validFor: yt };
  if (s.name == "ValueName")
    return { from: s.from, options: rh, validFor: yt };
  if (s.name == "PseudoClassName")
    return { from: s.from, options: sh, validFor: yt };
  if (n(s) || (e.explicit || r) && GS(s, t.doc))
    return {
      from: n(s) || r ? s.from : i,
      options: Xu(t.doc, HS(s), n),
      validFor: NS
    };
  if (s.name == "TagName") {
    for (let { parent: a } = s; a; a = a.parent)
      if (a.name == "Block")
        return { from: s.from, options: br(), validFor: yt };
    return { from: s.from, options: LS, validFor: yt };
  }
  if (!e.explicit)
    return null;
  let o = s.resolve(i), l = o.childBefore(i);
  return l && l.name == ":" && o.name == "PseudoClassSelector" ? { from: i, options: sh, validFor: yt } : l && l.name == ":" && o.name == "Declaration" || o.name == "ArgList" ? { from: i, options: rh, validFor: yt } : o.name == "Block" || o.name == "Styles" ? { from: i, options: br(), validFor: yt } : null;
}, KS = /* @__PURE__ */ JS((n) => n.name == "VariableName"), Qs = /* @__PURE__ */ di.define({
  name: "css",
  parser: /* @__PURE__ */ jS.configure({
    props: [
      /* @__PURE__ */ Ds.add({
        Declaration: /* @__PURE__ */ In()
      }),
      /* @__PURE__ */ Us.add({
        "Block KeyframeList": xf
      })
    ]
  }),
  languageData: {
    commentTokens: { block: { open: "/*", close: "*/" } },
    indentOnInput: /^\s*\}$/,
    wordChars: "-"
  }
});
function e1() {
  return new Io(Qs, Qs.data.of({ autocomplete: KS }));
}
const t1 = 303, lh = 1, i1 = 2, n1 = 304, s1 = 306, r1 = 307, o1 = 3, l1 = 4, a1 = [
  9,
  10,
  11,
  12,
  13,
  32,
  133,
  160,
  5760,
  8192,
  8193,
  8194,
  8195,
  8196,
  8197,
  8198,
  8199,
  8200,
  8201,
  8202,
  8232,
  8233,
  8239,
  8287,
  12288
], Tu = 125, h1 = 59, ah = 47, c1 = 42, f1 = 43, u1 = 45, d1 = new pu({
  start: !1,
  shift(n, e) {
    return e == o1 || e == l1 || e == s1 ? n : e == r1;
  },
  strict: !1
}), O1 = new ht((n, e) => {
  let { next: t } = n;
  (t == Tu || t == -1 || e.context) && n.acceptToken(n1);
}, { contextual: !0, fallback: !0 }), p1 = new ht((n, e) => {
  let { next: t } = n, i;
  a1.indexOf(t) > -1 || t == ah && ((i = n.peek(1)) == ah || i == c1) || t != Tu && t != h1 && t != -1 && !e.context && n.acceptToken(t1);
}, { contextual: !0 }), g1 = new ht((n, e) => {
  let { next: t } = n;
  if ((t == f1 || t == u1) && (n.advance(), t == n.next)) {
    n.advance();
    let i = !e.context && e.canShift(lh);
    n.acceptToken(i ? lh : i1);
  }
}, { contextual: !0 }), m1 = Ys({
  "get set async static": p.modifier,
  "for while do if else switch try catch finally return throw break continue default case": p.controlKeyword,
  "in of await yield void typeof delete instanceof": p.operatorKeyword,
  "let var const function class extends": p.definitionKeyword,
  "import export from": p.moduleKeyword,
  "with debugger as new": p.keyword,
  TemplateString: p.special(p.string),
  super: p.atom,
  BooleanLiteral: p.bool,
  this: p.self,
  null: p.null,
  Star: p.modifier,
  VariableName: p.variableName,
  "CallExpression/VariableName TaggedTemplateExpression/VariableName": p.function(p.variableName),
  VariableDefinition: p.definition(p.variableName),
  Label: p.labelName,
  PropertyName: p.propertyName,
  PrivatePropertyName: p.special(p.propertyName),
  "CallExpression/MemberExpression/PropertyName": p.function(p.propertyName),
  "FunctionDeclaration/VariableDefinition": p.function(p.definition(p.variableName)),
  "ClassDeclaration/VariableDefinition": p.definition(p.className),
  PropertyDefinition: p.definition(p.propertyName),
  PrivatePropertyDefinition: p.definition(p.special(p.propertyName)),
  UpdateOp: p.updateOperator,
  LineComment: p.lineComment,
  BlockComment: p.blockComment,
  Number: p.number,
  String: p.string,
  Escape: p.escape,
  ArithOp: p.arithmeticOperator,
  LogicOp: p.logicOperator,
  BitOp: p.bitwiseOperator,
  CompareOp: p.compareOperator,
  RegExp: p.regexp,
  Equals: p.definitionOperator,
  Arrow: p.function(p.punctuation),
  ": Spread": p.punctuation,
  "( )": p.paren,
  "[ ]": p.squareBracket,
  "{ }": p.brace,
  "InterpolationStart InterpolationEnd": p.special(p.brace),
  ".": p.derefOperator,
  ", ;": p.separator,
  "@": p.meta,
  TypeName: p.typeName,
  TypeDefinition: p.definition(p.typeName),
  "type enum interface implements namespace module declare": p.definitionKeyword,
  "abstract global Privacy readonly override": p.modifier,
  "is keyof unique infer": p.operatorKeyword,
  JSXAttributeValue: p.attributeValue,
  JSXText: p.content,
  "JSXStartTag JSXStartCloseTag JSXSelfCloseEndTag JSXEndTag": p.angleBracket,
  "JSXIdentifier JSXNameSpacedName": p.tagName,
  "JSXAttribute/JSXIdentifier JSXAttribute/JSXNameSpacedName": p.attributeName,
  "JSXBuiltin/JSXIdentifier": p.standard(p.tagName)
}), S1 = { __proto__: null, export: 14, as: 19, from: 27, default: 30, async: 35, function: 36, extends: 46, this: 50, true: 58, false: 58, null: 70, void: 74, typeof: 78, super: 96, new: 130, delete: 146, yield: 155, await: 159, class: 164, public: 221, private: 221, protected: 221, readonly: 223, instanceof: 242, satisfies: 245, in: 246, const: 248, import: 280, keyof: 335, unique: 339, infer: 345, is: 381, abstract: 401, implements: 403, type: 405, let: 408, var: 410, using: 413, interface: 419, enum: 423, namespace: 429, module: 431, declare: 435, global: 439, for: 458, of: 467, while: 470, with: 474, do: 478, if: 482, else: 484, switch: 488, case: 494, try: 500, catch: 504, finally: 508, return: 512, throw: 516, break: 520, continue: 524, debugger: 528 }, y1 = { __proto__: null, async: 117, get: 119, set: 121, declare: 181, public: 183, private: 183, protected: 183, static: 185, abstract: 187, override: 189, readonly: 195, accessor: 197, new: 385 }, b1 = { __proto__: null, "<": 137 }, Q1 = pi.deserialize({
  version: 14,
  states: "$6tO`QUOOO%TQUOOO'WQWOOP(eOSOOO*sQ(CjO'#CfO*zOpO'#CgO+YO!bO'#CgO+hO07`O'#DZO-yQUO'#DaO.ZQUO'#DlO%TQUO'#DvO0_QUO'#EOOOQ(CY'#EW'#EWO0xQSO'#ETOOQO'#Ei'#EiOOQO'#Ic'#IcO1QQSO'#GkO1]QSO'#EhO1bQSO'#EhO3dQ(CjO'#JdO6TQ(CjO'#JeO6qQSO'#FWO6vQ#tO'#FoOOQ(CY'#F`'#F`O7RO&jO'#F`O7aQ,UO'#FvO8wQSO'#FuOOQ(CY'#Je'#JeOOQ(CW'#Jd'#JdO8|QSO'#GoOOQQ'#KP'#KPO9XQSO'#IPO9^Q(C[O'#IQOOQQ'#JQ'#JQOOQQ'#IU'#IUQ`QUOOO%TQUO'#DnO9fQUO'#DzO9mQUO'#D|O9SQSO'#GkO9tQ,UO'#ClO:SQSO'#EgO:_QSO'#ErO:dQ,UO'#F_O;RQSO'#GkOOQO'#KQ'#KQO;WQSO'#KQO;fQSO'#GsO;fQSO'#GtO;fQSO'#GvO9SQSO'#GyO<]QSO'#G|O=tQSO'#CbO>UQSO'#HYO>^QSO'#H`O>^QSO'#HbO`QUO'#HdO>^QSO'#HfO>^QSO'#HiO>cQSO'#HoO>hQ(C]O'#HuO%TQUO'#HwO>sQ(C]O'#HyO?OQ(C]O'#H{O9^Q(C[O'#H}O?ZQ(CjO'#CfO@]QWO'#DfQOQSOOO%TQUO'#D|O@sQSO'#EPO9tQ,UO'#EgOAOQSO'#EgOAZQ`O'#F_OOQQ'#Cd'#CdOOQ(CW'#Dk'#DkOOQ(CW'#Jh'#JhO%TQUO'#JhOOQO'#Jl'#JlOOQO'#I`'#I`OBZQWO'#E`OOQ(CW'#E_'#E_OCVQ(C`O'#E`OCaQWO'#ESOOQO'#Jk'#JkOCuQWO'#JlOESQWO'#ESOCaQWO'#E`PEaO?MpO'#C`POOO)CDo)CDoOOOO'#IV'#IVOElOpO,59ROOQ(CY,59R,59ROOOO'#IW'#IWOEzO!bO,59RO%TQUO'#D]OOOO'#IY'#IYOFYO07`O,59uOOQ(CY,59u,59uOFhQUO'#IZOF{QSO'#JfOH}QbO'#JfO+vQUO'#JfOIUQSO,59{OIlQSO'#EiOIyQSO'#JtOJUQSO'#JsOJUQSO'#JsOJ^QSO,5;VOJcQSO'#JrOOQ(CY,5:W,5:WOJjQUO,5:WOLkQ(CjO,5:bOM[QSO,5:jOMuQ(C[O'#JqOM|QSO'#JpO8|QSO'#JpONbQSO'#JpONjQSO,5;UONoQSO'#JpO!!wQbO'#JeOOQ(CY'#Cf'#CfO%TQUO'#EOO!#gQ`O,5:oOOQO'#Jm'#JmOOQO-E<a-E<aO9SQSO,5=VO!#}QSO,5=VO!$SQUO,5;SO!&VQ,UO'#EdO!'jQSO,5;SO!)SQ,UO'#DpO!)ZQUO'#DuO!)eQWO,5;]O!)mQWO,5;]O%TQUO,5;]OOQQ'#FO'#FOOOQQ'#FQ'#FQO%TQUO,5;^O%TQUO,5;^O%TQUO,5;^O%TQUO,5;^O%TQUO,5;^O%TQUO,5;^O%TQUO,5;^O%TQUO,5;^O%TQUO,5;^O%TQUO,5;^O%TQUO,5;^OOQQ'#FU'#FUO!){QUO,5;oOOQ(CY,5;t,5;tOOQ(CY,5;u,5;uO!,OQSO,5;uOOQ(CY,5;v,5;vO%TQUO'#IgO!,WQ(C[O,5<cO!&VQ,UO,5;^O!,uQ,UO,5;^O%TQUO,5;rO!,|Q#tO'#FeO!-yQ#tO'#JxO!-eQ#tO'#JxO!.QQ#tO'#JxOOQO'#Jx'#JxO!.fQ#tO,5;}OOOO,5<Z,5<ZO!.wQUO'#FqOOOO'#If'#IfO7RO&jO,5;zO!/OQ#tO'#FsOOQ(CY,5;z,5;zO!/oQ7[O'#CrOOQ(CY'#Cv'#CvO!0SQSO'#CvO!0XO07`O'#CzO!0uQ,UO,5<`O!0|QSO,5<bO!2cQMhO'#GQO!2pQSO'#GRO!2uQSO'#GRO!2zQMhO'#GVO!3yQWO'#GZO!4lQ7[O'#J_OOQ(CY'#J_'#J_O!4vQSO'#J^O!5UQSO'#J]O!5^QSO'#CqOOQ(CY'#Ct'#CtOOQ(CY'#DO'#DOOOQ(CY'#DQ'#DQO0{QSO'#DSO!'oQ,UO'#FxO!'oQ,UO'#FzO!5fQSO'#F|O!5kQSO'#F}O!2uQSO'#GTO!'oQ,UO'#GYO!5pQSO'#EjO!6_QSO,5<aOOQ(CW'#Co'#CoO!6gQSO'#EkO!7aQWO'#ElOOQ(CW'#Jr'#JrO!7hQ(C[O'#KRO9^Q(C[O,5=ZO`QUO,5>kOOQQ'#JY'#JYOOQQ,5>l,5>lOOQQ-E<S-E<SO!9jQ(CjO,5:YO!<WQ(CjO,5:fO%TQUO,5:fO!>qQ(CjO,5:hOOQO,5@l,5@lO!?bQ,UO,5=VO!?pQ(C[O'#JZO8wQSO'#JZO!@RQ(C[O,59WO!@^QWO,59WO!@fQ,UO,59WO9tQ,UO,59WO!@qQSO,5;SO!@yQSO'#HXO!A[QSO'#KUO%TQUO,5;wO!7[QWO,5;yO!AdQSO,5=rO!AiQSO,5=rO!AnQSO,5=rO9^Q(C[O,5=rO;fQSO,5=bOOQO'#Cr'#CrO!A|QWO,5=_O!BUQ,UO,5=`O!BaQSO,5=bO!BfQ`O,5=eO!BnQSO'#KQO>cQSO'#HOO9SQSO'#HQO!BsQSO'#HQO9tQ,UO'#HSO!BxQSO'#HSOOQQ,5=h,5=hO!B}QSO'#HTO!CVQSO'#ClO!C[QSO,58|O!CfQSO,58|O!EkQUO,58|OOQQ,58|,58|O!E{Q(C[O,58|O%TQUO,58|O!HWQUO'#H[OOQQ'#H]'#H]OOQQ'#H^'#H^O`QUO,5=tO!HnQSO,5=tO`QUO,5=zO`QUO,5=|O!HsQSO,5>OO`QUO,5>QO!HxQSO,5>TO!H}QUO,5>ZOOQQ,5>a,5>aO%TQUO,5>aO9^Q(C[O,5>cOOQQ,5>e,5>eO!MXQSO,5>eOOQQ,5>g,5>gO!MXQSO,5>gOOQQ,5>i,5>iO!M^QWO'#DXO%TQUO'#JhO!M{QWO'#JhO!NjQWO'#DgO!N{QWO'#DgO##^QUO'#DgO##eQSO'#JgO##mQSO,5:QO##rQSO'#EmO#$QQSO'#JuO#$YQSO,5;WO#$_QWO'#DgO#$lQWO'#EROOQ(CY,5:k,5:kO%TQUO,5:kO#$sQSO,5:kO>cQSO,5;RO!@^QWO,5;RO!@fQ,UO,5;RO9tQ,UO,5;RO#${QSO,5@SO#%QQ!LQO,5:oOOQO-E<^-E<^O#&WQ(C`O,5:zOCaQWO,5:nO#&bQWO,5:nOCaQWO,5:zO!@RQ(C[O,5:nOOQ(CW'#Ec'#EcOOQO,5:z,5:zO%TQUO,5:zO#&oQ(C[O,5:zO#&zQ(C[O,5:zO!@^QWO,5:nOOQO,5;Q,5;QO#'YQ(C[O,5:zPOOO'#IT'#ITP#'nO?MpO,58zPOOO,58z,58zOOOO-E<T-E<TOOQ(CY1G.m1G.mOOOO-E<U-E<UO#'yQ`O,59wOOOO-E<W-E<WOOQ(CY1G/a1G/aO#(OQbO,5>uO+vQUO,5>uOOQO,5>{,5>{O#(YQUO'#IZOOQO-E<X-E<XO#(gQSO,5@QO#(oQbO,5@QO#(vQSO,5@_OOQ(CY1G/g1G/gO%TQUO,5@`O#)OQSO'#IaOOQO-E<_-E<_O#(vQSO,5@_OOQ(CW1G0q1G0qOOQ(CY1G/r1G/rOOQ(CY1G0U1G0UO%TQUO,5@]O#)dQ(C[O,5@]O#)uQ(C[O,5@]O#)|QSO,5@[O8|QSO,5@[O#*UQSO,5@[O#*dQSO'#IdO#)|QSO,5@[OOQ(CW1G0p1G0pO!)eQWO,5:qO!)pQWO,5:qOOQO,5:s,5:sO#+UQSO,5:sO#+^Q,UO1G2qO9SQSO1G2qOOQ(CY1G0n1G0nO#+lQ(CjO1G0nO#,qQ(ChO,5;OOOQ(CY'#GP'#GPO#-_Q(CjO'#J_O!$SQUO1G0nO#/gQ,UO'#JiO#/qQSO,5:[O#/vQbO'#JjO%TQUO'#JjO#0QQSO,5:aOOQ(CY'#DX'#DXOOQ(CY1G0w1G0wO%TQUO1G0wOOQ(CY1G1a1G1aO#0VQSO1G0wO#2nQ(CjO1G0xO#2uQ(CjO1G0xO#5`Q(CjO1G0xO#5gQ(CjO1G0xO#7qQ(CjO1G0xO#8XQ(CjO1G0xO#;RQ(CjO1G0xO#;YQ(CjO1G0xO#=sQ(CjO1G0xO#=zQ(CjO1G0xO#?rQ(CjO1G0xO#BrQ$IUO'#CfO#DpQ$IUO1G1ZO#DwQ$IUO'#JeO!,RQSO1G1aO#EXQ(CjO,5?ROOQ(CW-E<e-E<eO#E{Q(CjO1G0xOOQ(CY1G0x1G0xO#HWQ(CjO1G1^O#HzQ#tO,5<RO#ISQ#tO,5<SO#I[Q#tO'#FjO#IsQSO'#FiOOQO'#Jy'#JyOOQO'#Ie'#IeO#IxQ#tO1G1iOOQ(CY1G1i1G1iOOOO1G1t1G1tO#JZQ$IUO'#JdO#JeQSO,5<]O!){QUO,5<]OOOO-E<d-E<dOOQ(CY1G1f1G1fO#JjQWO'#JxOOQ(CY,5<_,5<_O#JrQWO,5<_OOQ(CY,59b,59bO!&VQ,UO'#C|OOOO'#IX'#IXO#JwO07`O,59fOOQ(CY,59f,59fO%TQUO1G1zO!5kQSO'#IiO#KSQ,UO,5<sOOQ(CY,5<p,5<pOOQO'#Gf'#GfO!'oQ,UO,5=POOQO'#Gh'#GhO!'oQ,UO,5=RO!&VQ,UO,5=TOOQO1G1|1G1|O#KZQ`O'#CoO#KnQ`O,5<lO#KuQSO'#J|O9SQSO'#J|O#LTQSO,5<nO!'oQ,UO,5<mO#LYQSO'#GSO#LeQSO,5<mO#LjQ`O'#GPO#LwQ`O'#J}O#MRQSO'#J}O!&VQ,UO'#J}O#MWQSO,5<qO#M]QWO'#G[O!3tQWO'#G[O#MnQSO'#G^O#MsQSO'#G`O!2uQSO'#GcO#MxQ(C[O'#IkO#NTQWO,5<uOOQ(CY,5<u,5<uO#N[QWO'#G[O#NjQWO'#G]O#NrQWO'#G]OOQ(CY,5=U,5=UO!'oQ,UO,5?xO!'oQ,UO,5?xO#NwQSO'#IlO$ SQSO,5?wO$ [QSO,59]O$ {Q,UO,59nOOQ(CY,59n,59nO$!nQ,UO,5<dO$#aQ,UO,5<fO@TQSO,5<hOOQ(CY,5<i,5<iO$#kQSO,5<oO$#pQ,UO,5<tO$$QQSO'#JpO!$SQUO1G1{O$$VQSO1G1{O8|QSO'#JsO8|QSO'#EmO%TQUO'#EmO8|QSO'#InO$$[Q(C[O,5@mOOQQ1G2u1G2uOOQQ1G4V1G4VOOQ(CY1G/t1G/tO!,OQSO1G/tO$&aQ(CjO1G0QOOQQ1G2q1G2qO!&VQ,UO1G2qO%TQUO1G2qO$'QQSO1G2qO$']Q,UO'#EdOOQ(CW,5?u,5?uO$'gQ(C[O,5?uOOQQ1G.r1G.rO!@RQ(C[O1G.rO!@^QWO1G.rO!@fQ,UO1G.rO$'xQSO1G0nO$'}QSO'#CfO$(YQSO'#KVO$(bQSO,5=sO$(gQSO'#KVO$(lQSO'#KVO$(wQSO'#ItO$)VQSO,5@pO$)_QbO1G1cOOQ(CY1G1e1G1eO9SQSO1G3^O@TQSO1G3^O$)fQSO1G3^O$)kQSO1G3^OOQQ1G3^1G3^O!BaQSO1G2|O!&VQ,UO1G2yO$)pQSO1G2yOOQQ1G2z1G2zO!&VQ,UO1G2zO$)uQSO1G2zO$)}QWO'#GxOOQQ1G2|1G2|O!3tQWO'#IpO!BfQ`O1G3POOQQ1G3P1G3POOQQ,5=j,5=jO$*VQ,UO,5=lO9SQSO,5=lO#MsQSO,5=nO8wQSO,5=nO!@^QWO,5=nO!@fQ,UO,5=nO9tQ,UO,5=nO$*eQSO'#KTO$*pQSO,5=oOOQQ1G.h1G.hO$*uQ(C[O1G.hO@TQSO1G.hO$+QQSO1G.hO9^Q(C[O1G.hO$-VQbO,5@rO$-gQSO,5@rO8|QSO,5@rO$-rQUO,5=vO$-yQSO,5=vOOQQ1G3`1G3`O`QUO1G3`OOQQ1G3f1G3fOOQQ1G3h1G3hO>^QSO1G3jO$.OQUO1G3lO$2SQUO'#HkOOQQ1G3o1G3oO$2aQSO'#HqO>cQSO'#HsOOQQ1G3u1G3uO$2iQUO1G3uO9^Q(C[O1G3{OOQQ1G3}1G3}OOQ(CW'#GW'#GWO9^Q(C[O1G4PO9^Q(C[O1G4RO$6pQSO,5@SO!){QUO,5;XO8|QSO,5;XO>cQSO,5:RO!){QUO,5:RO!@^QWO,5:RO$6uQ$IUO,5:ROOQO,5;X,5;XO$7PQWO'#I[O$7gQSO,5@ROOQ(CY1G/l1G/lO$7oQWO'#IbO$7yQSO,5@aOOQ(CW1G0r1G0rO!N{QWO,5:ROOQO'#I_'#I_O$8RQWO,5:mOOQ(CY,5:m,5:mO#$vQSO1G0VOOQ(CY1G0V1G0VO%TQUO1G0VOOQ(CY1G0m1G0mO>cQSO1G0mO!@^QWO1G0mO!@fQ,UO1G0mOOQ(CW1G5n1G5nO!@RQ(C[O1G0YOOQO1G0f1G0fO%TQUO1G0fO$8YQ(C[O1G0fO$8eQ(C[O1G0fO!@^QWO1G0YOCaQWO1G0YO$8sQ(C[O1G0fOOQO1G0Y1G0YO$9XQ(CjO1G0fPOOO-E<R-E<RPOOO1G.f1G.fOOOO1G/c1G/cO$9cQ`O,5<cO$9kQbO1G4aOOQO1G4g1G4gO%TQUO,5>uO$9uQSO1G5lO$9}QSO1G5yO$:VQbO1G5zO8|QSO,5>{O$:aQ(CjO1G5wO%TQUO1G5wO$:qQ(C[O1G5wO$;SQSO1G5vO$;SQSO1G5vO8|QSO1G5vO$;[QSO,5?OO8|QSO,5?OOOQO,5?O,5?OO$;pQSO,5?OO$$QQSO,5?OOOQO-E<b-E<bOOQO1G0]1G0]OOQO1G0_1G0_O!,RQSO1G0_OOQQ7+(]7+(]O!&VQ,UO7+(]O%TQUO7+(]O$<OQSO7+(]O$<ZQ,UO7+(]O$<iQ(CjO,59nO$>qQ(CjO,5<dO$@|Q(CjO,5<fO$CXQ(CjO,5<tOOQ(CY7+&Y7+&YO$EjQ(CjO7+&YO$F^Q,UO'#I]O$FhQSO,5@TOOQ(CY1G/v1G/vO$FpQUO'#I^O$F}QSO,5@UO$GVQbO,5@UOOQ(CY1G/{1G/{O$GaQSO7+&cOOQ(CY7+&c7+&cO$GfQ$IUO,5:bO%TQUO7+&uO$GpQ$IUO,5:YO$G}Q$IUO,5:fO$HXQ$IUO,5:hOOQ(CY7+&{7+&{OOQO1G1m1G1mOOQO1G1n1G1nO$HcQ#tO,5<UO!){QUO,5<TOOQO-E<c-E<cOOQ(CY7+'T7+'TOOOO7+'`7+'`OOOO1G1w1G1wO$HnQSO1G1wOOQ(CY1G1y1G1yO$HsQ`O,59hOOOO-E<V-E<VOOQ(CY1G/Q1G/QO$HzQ(CjO7+'fOOQ(CY,5?T,5?TO$InQ`O,5?TOOQ(CY1G2_1G2_P!&VQ,UO'#IiPOQ(CY-E<g-E<gO$J^Q,UO1G2kO$KPQ,UO1G2mO$KZQ`O1G2oOOQ(CY1G2W1G2WO$KbQSO'#IhO$KpQSO,5@hO$KpQSO,5@hO$KxQSO,5@hO$LTQSO,5@hOOQO1G2Y1G2YO$LcQ,UO1G2XO!'oQ,UO1G2XO$LsQMhO'#IjO$MTQSO,5@iO!&VQ,UO,5@iO$M]Q`O,5@iOOQ(CY1G2]1G2]OOQ(CW,5<v,5<vOOQ(CW,5<w,5<wO$$QQSO,5<wOCQQSO,5<wO!@^QWO,5<vOOQO'#G_'#G_O$MgQSO,5<xOOQ(CW,5<z,5<zO$$QQSO,5<}OOQO,5?V,5?VOOQO-E<i-E<iOOQ(CY1G2a1G2aO!3tQWO,5<vO$MoQSO,5<wO#MnQSO,5<xO!3tQWO,5<wO$MzQ,UO1G5dO$NUQ,UO1G5dOOQO,5?W,5?WOOQO-E<j-E<jOOQO1G.w1G.wO!7[QWO,59pO%TQUO,59pO$NcQSO1G2SO!'oQ,UO1G2ZO$NhQ(CjO7+'gOOQ(CY7+'g7+'gO!$SQUO7+'gO% [QSO,5;XOOQ(CW,5?Y,5?YOOQ(CW-E<l-E<lOOQ(CY7+%`7+%`O% aQ`O'#KOO#$vQSO7+(]O% kQbO7+(]O$<RQSO7+(]O% rQ(ChO'#CfO%!VQ(ChO,5<{O%!wQSO,5<{OOQ(CW1G5a1G5aOOQQ7+$^7+$^O!@RQ(C[O7+$^O!@^QWO7+$^O!$SQUO7+&YO%!|QSO'#IsO%#bQSO,5@qOOQO1G3_1G3_O9SQSO,5@qO%#bQSO,5@qO%#jQSO,5@qOOQO,5?`,5?`OOQO-E<r-E<rOOQ(CY7+&}7+&}O%#oQSO7+(xO9^Q(C[O7+(xO9SQSO7+(xO@TQSO7+(xOOQQ7+(h7+(hO%#tQ(ChO7+(eO!&VQ,UO7+(eO%$OQ`O7+(fOOQQ7+(f7+(fO!&VQ,UO7+(fO%$VQSO'#KSO%$bQSO,5=dOOQO,5?[,5?[OOQO-E<n-E<nOOQQ7+(k7+(kO%%qQWO'#HROOQQ1G3W1G3WO!&VQ,UO1G3WO%TQUO1G3WO%%xQSO1G3WO%&TQ,UO1G3WO9^Q(C[O1G3YO#MsQSO1G3YO8wQSO1G3YO!@^QWO1G3YO!@fQ,UO1G3YO%&cQSO'#IrO%&nQSO,5@oO%&vQWO,5@oOOQ(CW1G3Z1G3ZOOQQ7+$S7+$SO@TQSO7+$SO9^Q(C[O7+$SO%'RQSO7+$SO%TQUO1G6^O%TQUO1G6_O%'WQ(C[O1G6^O%'bQUO1G3bO%'iQSO1G3bO%'nQUO1G3bOOQQ7+(z7+(zO9^Q(C[O7+)UO`QUO7+)WOOQQ'#KY'#KYOOQQ'#Iu'#IuO%'uQUO,5>VOOQQ,5>V,5>VO%TQUO'#HlO%(SQSO'#HnOOQQ,5>],5>]O8|QSO,5>]OOQQ,5>_,5>_OOQQ7+)a7+)aOOQQ7+)g7+)gOOQQ7+)k7+)kOOQQ7+)m7+)mO%(XQWO1G5nO%(mQ$IUO1G0sO%(wQSO1G0sOOQO1G/m1G/mO%)SQ$IUO1G/mO>cQSO1G/mO!){QUO'#DgOOQO,5>v,5>vOOQO-E<Y-E<YOOQO,5>|,5>|OOQO-E<`-E<`O!@^QWO1G/mOOQO-E<]-E<]OOQ(CY1G0X1G0XOOQ(CY7+%q7+%qO#$vQSO7+%qOOQ(CY7+&X7+&XO>cQSO7+&XO!@^QWO7+&XOOQO7+%t7+%tO$9XQ(CjO7+&QOOQO7+&Q7+&QO%TQUO7+&QO%)^Q(C[O7+&QO!@RQ(C[O7+%tO!@^QWO7+%tO%)iQ(C[O7+&QO%)wQ(CjO7++cO%TQUO7++cO%*XQSO7++bO%*XQSO7++bOOQO1G4j1G4jO8|QSO1G4jO%*aQSO1G4jOOQO7+%y7+%yO#$vQSO<<KwO% kQbO<<KwO%*oQSO<<KwOOQQ<<Kw<<KwO!&VQ,UO<<KwO%TQUO<<KwO%*wQSO<<KwO%+SQ(CjO1G2kO%-_Q(CjO1G2mO%/jQ(CjO1G2XO%1{Q,UO,5>wOOQO-E<Z-E<ZO%2VQbO,5>xO%TQUO,5>xOOQO-E<[-E<[O%2aQSO1G5pOOQ(CY<<I}<<I}O%2iQ$IUO1G0nO%4sQ$IUO1G0xO%4zQ$IUO1G0xO%7OQ$IUO1G0xO%7VQ$IUO1G0xO%8zQ$IUO1G0xO%9bQ$IUO1G0xO%;uQ$IUO1G0xO%;|Q$IUO1G0xO%>QQ$IUO1G0xO%>XQ$IUO1G0xO%@PQ$IUO1G0xO%@dQ(CjO<<JaO%AiQ$IUO1G0xO%C_Q$IUO'#J_O%EbQ$IUO1G1^O%EoQ$IUO1G0QO!){QUO'#FlOOQO'#Jz'#JzOOQO1G1p1G1pO%EyQSO1G1oO%FOQ$IUO,5?ROOOO7+'c7+'cOOOO1G/S1G/SOOQ(CY1G4o1G4oO!'oQ,UO7+(ZO%FYQSO,5?SO9SQSO,5?SOOQO-E<f-E<fO%FhQSO1G6SO%FhQSO1G6SO%FpQSO1G6SO%F{Q,UO7+'sO%G]Q`O,5?UO%GgQSO,5?UO!&VQ,UO,5?UOOQO-E<h-E<hO%GlQ`O1G6TO%GvQSO1G6TOOQ(CW1G2c1G2cO$$QQSO1G2cOOQ(CW1G2b1G2bO%HOQSO1G2dO!&VQ,UO1G2dOOQ(CW1G2i1G2iO!@^QWO1G2bOCQQSO1G2cO%HTQSO1G2dO%H]QSO1G2cO!'oQ,UO7++OOOQ(CY1G/[1G/[O%HhQSO1G/[OOQ(CY7+'n7+'nO%HmQ,UO7+'uO%H}Q(CjO<<KROOQ(CY<<KR<<KRO%IqQSO1G0sO!&VQ,UO'#ImO%IvQSO,5@jO!&VQ,UO1G2gOOQQ<<Gx<<GxO!@RQ(C[O<<GxO%JOQ(CjO<<ItOOQ(CY<<It<<ItOOQO,5?_,5?_O%JrQSO,5?_O$(lQSO,5?_OOQO-E<q-E<qO%JwQSO1G6]O%JwQSO1G6]O9SQSO1G6]O@TQSO<<LdOOQQ<<Ld<<LdO%KPQSO<<LdO9^Q(C[O<<LdOOQQ<<LP<<LPO%#tQ(ChO<<LPOOQQ<<LQ<<LQO%$OQ`O<<LQO%KUQWO'#IoO%KaQSO,5@nO!){QUO,5@nOOQQ1G3O1G3OO%KiQUO'#JhOOQO'#Iq'#IqO9^Q(C[O'#IqO%KsQWO,5=mOOQQ,5=m,5=mO%KzQWO'#E`O%L`QSO7+(rO%LeQSO7+(rOOQQ7+(r7+(rO!&VQ,UO7+(rO%TQUO7+(rO%LmQSO7+(rOOQQ7+(t7+(tO9^Q(C[O7+(tO#MsQSO7+(tO8wQSO7+(tO!@^QWO7+(tO%LxQSO,5?^OOQO-E<p-E<pOOQO'#HU'#HUO%MTQSO1G6ZO9^Q(C[O<<GnOOQQ<<Gn<<GnO@TQSO<<GnO%M]QSO7++xO%MbQSO7++yO%TQUO7++xO%TQUO7++yOOQQ7+(|7+(|O%MgQSO7+(|O%MlQUO7+(|O%MsQSO7+(|OOQQ<<Lp<<LpOOQQ<<Lr<<LrOOQQ-E<s-E<sOOQQ1G3q1G3qO%MxQSO,5>WOOQQ,5>Y,5>YO%M}QSO1G3wO8|QSO7+&_O!){QUO7+&_OOQO7+%X7+%XO%NSQ$IUO1G5zO>cQSO7+%XOOQ(CY<<I]<<I]OOQ(CY<<Is<<IsO>cQSO<<IsOOQO<<Il<<IlO$9XQ(CjO<<IlO%TQUO<<IlOOQO<<I`<<I`O!@RQ(C[O<<I`O%N^Q(C[O<<IlO%NiQ(CjO<<N}O%NyQSO<<N|OOQO7+*U7+*UO8|QSO7+*UOOQQANAcANAcO& RQSOANAcO!&VQ,UOANAcO#$vQSOANAcO% kQbOANAcO%TQUOANAcO& ZQ(CjO7+'sO&#lQ(CjO7+'uO&%}QbO1G4dO&&XQ$IUO7+&YO&&fQ$IUO,59nO&(iQ$IUO,5<dO&*lQ$IUO,5<fO&,oQ$IUO,5<tO&.eQ$IUO7+'fO&.rQ$IUO7+'gO&/PQSO,5<WOOQO7+'Z7+'ZO&/UQ,UO<<KuOOQO1G4n1G4nO&/]QSO1G4nO&/hQSO1G4nO&/vQSO7++nO&/vQSO7++nO!&VQ,UO1G4pO&0OQ`O1G4pO&0YQSO7++oOOQ(CW7+'}7+'}O$$QQSO7+(OO&0bQ`O7+(OOOQ(CW7+'|7+'|O$$QQSO7+'}O&0iQSO7+(OO!&VQ,UO7+(OOCQQSO7+'}O&0nQ,UO<<NjOOQ(CY7+$v7+$vO&0xQ`O,5?XOOQO-E<k-E<kO&1SQ(ChO7+(ROOQQAN=dAN=dO9SQSO1G4yOOQO1G4y1G4yO&1dQSO1G4yO&1iQSO7++wO&1iQSO7++wO9^Q(C[OANBOO@TQSOANBOOOQQANBOANBOOOQQANAkANAkOOQQANAlANAlO&1qQSO,5?ZOOQO-E<m-E<mO&1|Q$IUO1G6YO&4^QbO'#CfOOQO,5?],5?]OOQO-E<o-E<oOOQQ1G3X1G3XO%KiQUO,5<xOOQQ<<L^<<L^O!&VQ,UO<<L^O%L`QSO<<L^O&4hQSO<<L^O%TQUO<<L^OOQQ<<L`<<L`O9^Q(C[O<<L`O#MsQSO<<L`O8wQSO<<L`O&4pQWO1G4xO&4{QSO7++uOOQQAN=YAN=YO9^Q(C[OAN=YOOQQ<= d<= dOOQQ<= e<= eO&5TQSO<= dO&5YQSO<= eOOQQ<<Lh<<LhO&5_QSO<<LhO&5dQUO<<LhOOQQ1G3r1G3rO>cQSO7+)cO&5kQSO<<IyO&5vQ$IUO<<IyOOQO<<Hs<<HsOOQ(CYAN?_AN?_OOQOAN?WAN?WO$9XQ(CjOAN?WOOQOAN>zAN>zO%TQUOAN?WOOQO<<Mp<<MpOOQQG26}G26}O!&VQ,UOG26}O#$vQSOG26}O&6QQSOG26}O% kQbOG26}O&6YQ$IUO<<JaO&6gQ$IUO1G2XO&8]Q$IUO1G2kO&:`Q$IUO1G2mO&<cQ$IUO<<KRO&<pQ$IUO<<ItOOQO1G1r1G1rO!'oQ,UOANAaOOQO7+*Y7+*YO&<}QSO7+*YO&=YQSO<= YO&=bQ`O7+*[OOQ(CW<<Kj<<KjO$$QQSO<<KjOOQ(CW<<Ki<<KiO&=lQ`O<<KjO$$QQSO<<KiOOQO7+*e7+*eO9SQSO7+*eO&=sQSO<= cOOQQG27jG27jO9^Q(C[OG27jO!){QUO1G4uO&={QSO7++tO%L`QSOANAxOOQQANAxANAxO!&VQ,UOANAxO&>TQSOANAxOOQQANAzANAzO9^Q(C[OANAzO#MsQSOANAzOOQO'#HV'#HVOOQO7+*d7+*dOOQQG22tG22tOOQQANEOANEOOOQQANEPANEPOOQQANBSANBSO&>]QSOANBSOOQQ<<L}<<L}O!){QUOAN?eOOQOG24rG24rO$9XQ(CjOG24rO#$vQSOLD,iOOQQLD,iLD,iO!&VQ,UOLD,iO&>bQSOLD,iO&>jQ$IUO7+'sO&@`Q$IUO7+'uO&BUQ,UOG26{OOQO<<Mt<<MtOOQ(CWANAUANAUO$$QQSOANAUOOQ(CWANATANATOOQO<<NP<<NPOOQQLD-ULD-UO&BfQ$IUO7+*aOOQQG27dG27dO%L`QSOG27dO!&VQ,UOG27dOOQQG27fG27fO9^Q(C[OG27fOOQQG27nG27nO&BpQ$IUOG25POOQOLD*^LD*^OOQQ!$(!T!$(!TO#$vQSO!$(!TO!&VQ,UO!$(!TO&BzQ(CjOG26{OOQ(CWG26pG26pOOQQLD-OLD-OO%L`QSOLD-OOOQQLD-QLD-QOOQQ!)9Eo!)9EoO#$vQSO!)9EoOOQQ!$(!j!$(!jOOQQ!.K;Z!.K;ZO&E]Q$IUOG26{O!){QUO'#DvO0xQSO'#ETO&GRQbO'#JdO!){QUO'#DnO&GYQUO'#DzO&GaQbO'#CfO&IwQbO'#CfO!){QUO'#D|O&JXQUO,5;SO!){QUO,5;^O!){QUO,5;^O!){QUO,5;^O!){QUO,5;^O!){QUO,5;^O!){QUO,5;^O!){QUO,5;^O!){QUO,5;^O!){QUO,5;^O!){QUO,5;^O!){QUO,5;^O!){QUO'#IgO&L[QSO,5<cO&LdQ,UO,5;^O&MwQ,UO,5;^O!){QUO,5;rO0{QSO'#DSO0{QSO'#DSO!&VQ,UO'#FxO&LdQ,UO'#FxO!&VQ,UO'#FzO&LdQ,UO'#FzO!&VQ,UO'#GYO&LdQ,UO'#GYO!){QUO,5:fO!){QUO,5@`O&JXQUO1G0nO&NOQ$IUO'#CfO!){QUO1G1zO!&VQ,UO,5=PO&LdQ,UO,5=PO!&VQ,UO,5=RO&LdQ,UO,5=RO!&VQ,UO,5<mO&LdQ,UO,5<mO&JXQUO1G1{O!){QUO7+&uO!&VQ,UO1G2XO&LdQ,UO1G2XO!&VQ,UO1G2ZO&LdQ,UO1G2ZO&JXQUO7+'gO&JXQUO7+&YO!&VQ,UOANAaO&LdQ,UOANAaO&NYQSO'#EhO&N_QSO'#EhO&NgQSO'#FWO&NlQSO'#ErO&NqQSO'#JtO&N|QSO'#JrO' XQSO,5;SO' ^Q,UO,5<`O' eQSO'#GRO' jQSO'#GRO' oQSO,5<aO' wQSO,5;SO'!PQ$IUO1G1ZO'!WQSO,5<mO'!]QSO,5<mO'!bQSO,5<oO'!gQSO,5<oO'!lQSO1G1{O'!qQSO1G0nO'!vQ,UO<<KuO'!}Q,UO<<KuO7aQ,UO'#FvO8wQSO'#FuOAOQSO'#EgO!){QUO,5;oO!2uQSO'#GRO!2uQSO'#GRO!2uQSO'#GTO!2uQSO'#GTO!'oQ,UO7+(ZO!'oQ,UO7+(ZO$KZQ`O1G2oO$KZQ`O1G2oO!&VQ,UO,5=TO!&VQ,UO,5=T",
  stateData: "'$W~O'nOS'oOSROS'pRQ~OPYOQYOV!UO^qOayObxOikOkYOlkOmkOskOuYOwYO|WO!QkO!RkO!XXO!ctO!hZO!kYO!lYO!mYO!ouO!qvO!twO!x]O#p!OO$Q{O$UfO%`|O%b!PO%d}O%e}O%f}O%i!QO%k!RO%n!SO%o!SO%q!TO%}!VO&T!WO&V!XO&X!YO&Z!ZO&^![O&d!]O&j!^O&l!_O&n!`O&p!aO&r!bO'uSO'wTO'zUO(SVO(b[O(oiO~OPYOQYOa!iOb!hOikOkYOlkOmkOskOuYOwYO|WO!QkO!RkO!X!dO!ctO!hZO!kYO!lYO!mYO!ouO!q!fO!t!gO$Q!jO$UfO'u!cO'wTO'zUO(SVO(b[O(oiO~O^!uOl!mO|!nO![!wO!]!tO!^!tO!x9qO!|!oO!}!oO#O!vO#P!oO#Q!oO#T!xO#U!xO'v!kO'wTO'zUO(V!lO(b!rO~O'p!yO~OPYXXYX^YXkYXyYXzYX|YX!VYX!eYX!fYX!hYX!lYX#XYX#dcX#gYX#hYX#iYX#jYX#kYX#lYX#mYX#nYX#oYX#qYX#sYX#uYX#vYX#{YX'lYX(SYX(cYX(jYX(kYX~O!a$zX~P(jO[!{O'w!}O'x!{O'y!}O~O[#OO'y!}O'z!}O'{#OO~Oq#QO!O#RO(T#RO(U#TO~OPYOQYOa!iOb!hOikOkYOlkOmkOskOuYOwYO|WO!QkO!RkO!X!dO!ctO!hZO!kYO!lYO!mYO!ouO!q!fO!t!gO$Q!jO$UfO'u9uO'wTO'zUO(SVO(b[O(oiO~O!U#XO!V#UO!S(YP!S(gP~P+vO!W#aO~P`OPYOQYOa!iOb!hOkYOlkOmkOskOuYOwYO|WO!QkO!RkO!X!dO!ctO!hZO!kYO!lYO!mYO!ouO!q!fO!t!gO$Q!jO$UfO'wTO'zUO(SVO(b[O(oiO~Oi#kO!U#gO!x]O#b#jO#c#gO'u9vO!g(dP~P.bO!h#mO'u#lO~O!t#qO!x]O%`#rO~O#d#sO~O!a#tO#d#sO~OP$[OX$cOk$POy#xOz#yO|#zO!V$`O!e$RO!f#vO!h#wO!l$[O#g#}O#h$OO#i$OO#j$OO#k$QO#l$RO#m$RO#n$bO#o$RO#q$SO#s$UO#u$WO#v$XO(SVO(c$YO(j#{O(k#|O~O^(WX'l(WX'j(WX!g(WX!S(WX!X(WX%a(WX!a(WX~P1jO#X$dO#{$dOP(XXX(XXk(XXy(XXz(XX|(XX!V(XX!e(XX!h(XX!l(XX#g(XX#h(XX#i(XX#j(XX#k(XX#l(XX#m(XX#n(XX#o(XX#q(XX#s(XX#u(XX#v(XX(S(XX(c(XX(j(XX(k(XX!X(XX%a(XX~O^(XX!f(XX'l(XX'j(XX!S(XX!g(XXo(XX!a(XX~P4QO#X$dO~O$W$fO$Y$eO$a$kO~O!X$lO$UfO$d$mO$f$oO~Oi%ROk$sOl$rOm$rOs%SOu%TOw%UO|$zO!X${O!c%ZO!h$wO#c%[O$Q%XO$m%VO$o%WO$r%YO'u$qO'wTO'zUO(O%QO(S$tOd(PP~O!h%]O~O|%`O!X%aO'u%_O~O!a%eO~O^%fO'l%fO~O'v!kO~P%TO%f%mO~P%TO!h%]O'u%_O'v!kO(O%QO~Ob%tO!h%]O'u%_O~O#o$RO~Oy%yO!X%vO!h%xO%b%|O'u%_O'v!kO'wTO'zUO](xP~O!t#qO~O%k&OO|(tX!X(tX'u(tX~O'u&PO~O!q&UO#p!OO%b!PO%d}O%e}O%f}O%i!QO%k!RO%n!SO%o!SO~Oa&ZOb&YO!t&WO%`&XO%s&VO~P;kOa&^ObxO!X&]O!q&UO!twO!x]O#p!OO%`|O%d}O%e}O%f}O%i!QO%k!RO%n!SO%o!SO%q!TO~O_&aO#X&dO%b&_O'v!kO~P<pO!h&eO!q&iO~O!h#mO~O!XXO~O^%fO'k&qO'l%fO~O^%fO'k&tO'l%fO~O^%fO'k&vO'l%fO~O'jYX!SYXoYX!gYX&RYX!XYX%aYX!aYX~P(jO!['TO!]&|O!^&|O'v!kO'wTO'zUO~Ol&zO|&yO!U&}O(V&xO!W(ZP!W(iP~P?wOg'WO!X'UO'u%_O~Ob']O!h%]O'u%_O~Oy%yO!h%xO~Ol!mO|!nO!x9qO!|!oO!}!oO#P!oO#Q!oO'v!kO'wTO'zUO(V!lO(b!rO~O!['cO!]'bO!^'bO#O!oO#T'dO#U'dO~PAcO^%fO!a#tO!h%]O'l%fO(O%QO(c'fO~O!l'jO#X'hO~PBqOl!mO|!nO'wTO'zUO(V!lO(b!rO~O!XXOl(`X|(`X![(`X!](`X!^(`X!x(`X!|(`X!}(`X#O(`X#P(`X#Q(`X#T(`X#U(`X'v(`X'w(`X'z(`X(V(`X(b(`X~O!]'bO!^'bO'v!kO~PCaO'q'nO'r'nO's'pO~O[!{O'w'rO'x!{O'y'rO~O[#OO'y'rO'z'rO'{#OO~Oq#QO!O#RO(T#RO(U'vO~O!U'xO!S&}X!S'TX!V&}X!V'TX~P+vO!V'zO!S(YX~OP$[OX$cOk$POy#xOz#yO|#zO!V'zO!e$RO!f#vO!h#wO!l$[O#g#}O#h$OO#i$OO#j$OO#k$QO#l$RO#m$RO#n$bO#o$RO#q$SO#s$UO#u$WO#v$XO(SVO(c$YO(j#{O(k#|O~O!S(YX~PGTO!S(PO~O!S(fX!V(fX!a(fX!g(fX(c(fX~O#X(fX#d#]X!W(fX~PIZO#X(QO!S(hX!V(hX~O!V(RO!S(gX~O!S(UO~O#X$dO~PIZO!W(VO~P`Oy#xOz#yO|#zO!f#vO!h#wO(SVOP!jaX!jak!ja!V!ja!e!ja!l!ja#g!ja#h!ja#i!ja#j!ja#k!ja#l!ja#m!ja#n!ja#o!ja#q!ja#s!ja#u!ja#v!ja(c!ja(j!ja(k!ja~O^!ja'l!ja'j!ja!S!ja!g!jao!ja!X!ja%a!ja!a!ja~PJqO!g(WO~O!a#tO#X(XO(c'fO!V(eX^(eX'l(eX~O!g(eX~PMaO|%`O!X%aO!x]O#b(^O#c(]O'u%_O~O!V(_O!g(dX~O!g(aO~O|%`O!X%aO#c(]O'u%_O~OP(XXX(XXk(XXy(XXz(XX|(XX!V(XX!e(XX!f(XX!h(XX!l(XX#g(XX#h(XX#i(XX#j(XX#k(XX#l(XX#m(XX#n(XX#o(XX#q(XX#s(XX#u(XX#v(XX(S(XX(c(XX(j(XX(k(XX~O!a#tO!g(XX~PN}Oy(bOz(cO!f#vO!h#wO!x!wa|!wa~O!t!wa%`!wa!X!wa#b!wa#c!wa'u!wa~P!#RO!t(gO~OPYOQYOa!iOb!hOikOkYOlkOmkOskOuYOwYO|WO!QkO!RkO!XXO!ctO!hZO!kYO!lYO!mYO!ouO!q!fO!t!gO$Q!jO$UfO'u!cO'wTO'zUO(SVO(b[O(oiO~Oi%ROk$sOl$rOm$rOs%SOu%TOw:ZO|$zO!X${O!c;eO!h$wO#c:aO$Q%XO$m:]O$o:_O$r%YO'u(kO'wTO'zUO(O%QO(S$tO~O#d(mO~Oi%ROk$sOl$rOm$rOs%SOu%TOw%UO|$zO!X${O!c%ZO!h$wO#c%[O$Q%XO$m%VO$o%WO$r%YO'u(kO'wTO'zUO(O%QO(S$tO~Od(]P~P!'oO!U(qO!g(^P~P%TO(V(sO(b[O~O|(uO!h#wO(V(sO(b[O~OP9pOQ9pOa;aOb!hOikOk9pOlkOmkOskOu9pOw9pO|WO!QkO!RkO!X!dO!c9sO!hZO!k9pO!l9pO!m9pO!o9tO!q9wO!t!gO$Q!jO$UfO'u)TO'wTO'zUO(SVO(b[O(o;_O~Oz)WO!h#wO~O!V$`O^$ka'l$ka'j$ka!g$ka!S$ka!X$ka%a$ka!a$ka~O#p)[O~P!&VOy)_O!a)^O!X$XX$T$XX$W$XX$Y$XX$a$XX~O!a)^O!X(lX$T(lX$W(lX$Y(lX$a(lX~Oy)_O~P!-eOy)_O!X(lX$T(lX$W(lX$Y(lX$a(lX~O!X)aO$T)eO$W)`O$Y)`O$a)fO~O!U)iO~P!){O$W$fO$Y$eO$a)mO~Og$sXy$sX|$sX!f$sX(j$sX(k$sX~OdfXd$sXgfX!VfX#XfX~P!/ZOl)oO~Oq)pO(T)qO(U)sO~Og)|Oy)uO|)vO(j)xO(k)zO~Od)tO~P!0dOd)}O~Oi%ROk$sOl$rOm$rOs%SOu%TOw:ZO|$zO!X${O!c;eO!h$wO#c:aO$Q%XO$m:]O$o:_O$r%YO'wTO'zUO(O%QO(S$tO~O!U*RO'u*OO!g(pP~P!1RO#d*TO~O!h*UO~O!U*ZO'u*WO!S(qP~P!1ROk*gO|*_O![*eO!]*^O!^*^O!h*UO#T*fO%W*aO'v!kO(V!lO~O!W*dO~P!3XO!f#vOg(RXy(RX|(RX(j(RX(k(RX!V(RX#X(RX~Od(RX#y(RX~P!4QOg*jO#X*iOd(QX!V(QX~O!V*kOd(PX~O'u&POd(PP~O!h*rO~O'u(kO~Oi*vO|%`O!U#gO!X%aO!x]O#b#jO#c#gO'u%_O!g(dP~O!a#tO#d*wO~O|%`O!U*yO!V(RO!X%aO'u%_O!S(gP~Ol'QO|*{O!U*zO'wTO'zUO(V(sO~O!W(iP~P!6{O!V*|O^(uX'l(uX~OP$[OX$cOk$POy#xOz#yO|#zO!e$RO!f#vO!h#wO!l$[O#g#}O#h$OO#i$OO#j$OO#k$QO#l$RO#m$RO#n$bO#o$RO#q$SO#s$UO#u$WO#v$XO(SVO(c$YO(j#{O(k#|O~O^!ba!V!ba'l!ba'j!ba!S!ba!g!bao!ba!X!ba%a!ba!a!ba~P!7sOy#xOz#yO|#zO!f#vO!h#wO(SVOP!naX!nak!na!V!na!e!na!l!na#g!na#h!na#i!na#j!na#k!na#l!na#m!na#n!na#o!na#q!na#s!na#u!na#v!na(c!na(j!na(k!na~O^!na'l!na'j!na!S!na!g!nao!na!X!na%a!na!a!na~P!:^Oy#xOz#yO|#zO!f#vO!h#wO(SVOP!paX!pak!pa!V!pa!e!pa!l!pa#g!pa#h!pa#i!pa#j!pa#k!pa#l!pa#m!pa#n!pa#o!pa#q!pa#s!pa#u!pa#v!pa(c!pa(j!pa(k!pa~O^!pa'l!pa'j!pa!S!pa!g!pao!pa!X!pa%a!pa!a!pa~P!<wOg+VO!X'UO%a+UO(O%QO~O!a+XO^'}X!X'}X'l'}X!V'}X~O^%fO!XXO'l%fO~O!h%]O(O%QO~O!h%]O'u%_O(O%QO~O!a#tO#d(mO~O%b+eO'u+aO'wTO'zUO!W(yP~O!V+fO](xX~OX+jO~O]+kO~O!X%vO'u%_O'v!kO](xP~O#X+pO(O%QO~Og+sO!X${O(O%QO~O!X+uO~Oy+wO!XXO~O%f%mO~O!t+|O~Ob,RO~O'u#lO!W(wP~Ob%tO~O%b!PO'u&PO~P<pOX,XO],WO~OPYOQYOayObxOikOkYOlkOmkOskOuYOwYO|WO!QkO!RkO!ctO!hZO!kYO!lYO!mYO!ouO!twO!x]O$UfO%`|O'wTO'zUO(SVO(b[O(oiO~O!X!dO!q!fO$Q!jO'u!cO~P!CnO],WO^%fO'l%fO~OPYOQYOa!iOb!hOikOkYOlkOmkOskOuYOwYO|WO!QkO!RkO!X!dO!ctO!hZO!kYO!lYO!mYO!ouO!t!gO$Q!jO$UfO'u!cO'wTO'zUO(SVO(b[O(oiO~O^,^O!qvO#p}O%d}O%e}O%f}O~P!FWO!h&eO~O&T,dO~O!X,fO~O&f,hO&h,iOP&caQ&caV&ca^&caa&cab&cai&cak&cal&cam&cas&cau&caw&ca|&ca!Q&ca!R&ca!X&ca!c&ca!h&ca!k&ca!l&ca!m&ca!o&ca!q&ca!t&ca!x&ca#p&ca$Q&ca$U&ca%`&ca%b&ca%d&ca%e&ca%f&ca%i&ca%k&ca%n&ca%o&ca%q&ca%}&ca&T&ca&V&ca&X&ca&Z&ca&^&ca&d&ca&j&ca&l&ca&n&ca&p&ca&r&ca'j&ca'u&ca'w&ca'z&ca(S&ca(b&ca(o&ca!W&ca&[&ca_&ca&a&ca~O'u,nO~O!V{X!V!_X!W{X!W!_X!a{X!a!_X!h!_X#X{X(O!_X~O!a,sO#X,rO!V#aX!V([X!W#aX!W([X!a([X!h([X(O([X~O!a,uO!h%]O(O%QO!V!ZX!W!ZX~Ol!mO|!nO'wTO'zUO(V!lO~OP9pOQ9pOa;aOb!hOikOk9pOlkOmkOskOu9pOw9pO|WO!QkO!RkO!X!dO!c9sO!hZO!k9pO!l9pO!m9pO!o9tO!q9wO!t!gO$Q!jO$UfO'wTO'zUO(SVO(b[O(o;_O~O'u:fO~P# ^O!V,yO!W(ZX~O!W,{O~O!a,sO#X,rO!V#aX!W#aX~O!V,|O!W(iX~O!W-OO~O!]-PO!^-PO'v!kO~P!N{O!W-SO~P'WOg-VO!X'UO~O!S-[O~Ol!wa![!wa!]!wa!^!wa!|!wa!}!wa#O!wa#P!wa#Q!wa#T!wa#U!wa'v!wa'w!wa'z!wa(V!wa(b!wa~P!#RO!l-aO#X-_O~PBqO!]-cO!^-cO'v!kO~PCaO^%fO#X-_O'l%fO~O^%fO!a#tO#X-_O'l%fO~O^%fO!a#tO!l-aO#X-_O'l%fO(c'fO~O'q'nO'r'nO's-hO~Oo-iO~O!S&}a!V&}a~P!7sO!U-mO!S&}X!V&}X~P%TO!V'zO!S(Ya~O!S(Ya~PGTO!V(RO!S(ga~O|%`O!U-qO!X%aO'u%_O!S'TX!V'TX~O#X-sO!V(ea!g(ea^(ea'l(ea~O!a#tO~P#)dO!V(_O!g(da~O|%`O!X%aO#c-wO'u%_O~Oi-|O|%`O!U-yO!X%aO!x]O#b-{O#c-yO'u%_O!V'WX!g'WX~Oz.QO!h#wO~Og.TO!X'UO%a.SO(O%QO~O^#[i!V#[i'l#[i'j#[i!S#[i!g#[io#[i!X#[i%a#[i!a#[i~P!7sOg;kOy)uO|)vO(j)xO(k)zO~O#d#Wa^#Wa#X#Wa'l#Wa!V#Wa!g#Wa!X#Wa!S#Wa~P#,`O#d(RXP(RXX(RX^(RXk(RXz(RX!e(RX!h(RX!l(RX#g(RX#h(RX#i(RX#j(RX#k(RX#l(RX#m(RX#n(RX#o(RX#q(RX#s(RX#u(RX#v(RX'l(RX(S(RX(c(RX!g(RX!S(RX'j(RXo(RX!X(RX%a(RX!a(RX~P!4QO!V.^Od(]X~P!0dOd.`O~O!V.aO!g(^X~P!7sO!g.dO~O!S.fO~OP$[Oy#xOz#yO|#zO!f#vO!h#wO!l$[O(SVOX#fi^#fik#fi!V#fi!e#fi#h#fi#i#fi#j#fi#k#fi#l#fi#m#fi#n#fi#o#fi#q#fi#s#fi#u#fi#v#fi'l#fi(c#fi(j#fi(k#fi'j#fi!S#fi!g#fio#fi!X#fi%a#fi!a#fi~O#g#fi~P#0[O#g#}O~P#0[OP$[Oy#xOz#yO|#zO!f#vO!h#wO!l$[O#g#}O#h$OO#i$OO#j$OO(SVOX#fi^#fi!V#fi!e#fi#k#fi#l#fi#m#fi#n#fi#o#fi#q#fi#s#fi#u#fi#v#fi'l#fi(c#fi(j#fi(k#fi'j#fi!S#fi!g#fio#fi!X#fi%a#fi!a#fi~Ok#fi~P#2|Ok$PO~P#2|OP$[Ok$POy#xOz#yO|#zO!f#vO!h#wO!l$[O#g#}O#h$OO#i$OO#j$OO#k$QO(SVO^#fi!V#fi#q#fi#s#fi#u#fi#v#fi'l#fi(c#fi(j#fi(k#fi'j#fi!S#fi!g#fio#fi!X#fi%a#fi!a#fi~OX#fi!e#fi#l#fi#m#fi#n#fi#o#fi~P#5nOX$cO!e$RO#l$RO#m$RO#n$bO#o$RO~P#5nOP$[OX$cOk$POy#xOz#yO|#zO!e$RO!f#vO!h#wO!l$[O#g#}O#h$OO#i$OO#j$OO#k$QO#l$RO#m$RO#n$bO#o$RO#q$SO(SVO^#fi!V#fi#s#fi#u#fi#v#fi'l#fi(c#fi(k#fi'j#fi!S#fi!g#fio#fi!X#fi%a#fi!a#fi~O(j#fi~P#8oO(j#{O~P#8oOP$[OX$cOk$POy#xOz#yO|#zO!e$RO!f#vO!h#wO!l$[O#g#}O#h$OO#i$OO#j$OO#k$QO#l$RO#m$RO#n$bO#o$RO#q$SO#s$UO(SVO(j#{O^#fi!V#fi#u#fi#v#fi'l#fi(c#fi'j#fi!S#fi!g#fio#fi!X#fi%a#fi!a#fi~O(k#fi~P#;aO(k#|O~P#;aOP$[OX$cOk$POy#xOz#yO|#zO!e$RO!f#vO!h#wO!l$[O#g#}O#h$OO#i$OO#j$OO#k$QO#l$RO#m$RO#n$bO#o$RO#q$SO#s$UO#u$WO(SVO(j#{O(k#|O~O^#fi!V#fi#v#fi'l#fi(c#fi'j#fi!S#fi!g#fio#fi!X#fi%a#fi!a#fi~P#>ROPYXXYXkYXyYXzYX|YX!eYX!fYX!hYX!lYX#XYX#dcX#gYX#hYX#iYX#jYX#kYX#lYX#mYX#nYX#oYX#qYX#sYX#uYX#vYX#{YX(SYX(cYX(jYX(kYX!VYX!WYX~O#yYX~P#@lOP$[OX:XOk9{Oy#xOz#yO|#zO!e9}O!f#vO!h#wO!l$[O#g9yO#h9zO#i9zO#j9zO#k9|O#l9}O#m9}O#n:WO#o9}O#q:OO#s:QO#u:SO#v:TO(SVO(c$YO(j#{O(k#|O~O#y.hO~P#ByO#X:YO#{:YO#y(XX!W(XX~PN}O^'Za!V'Za'l'Za'j'Za!g'Za!S'Zao'Za!X'Za%a'Za!a'Za~P!7sOP#fiX#fi^#fik#fiz#fi!V#fi!e#fi!f#fi!h#fi!l#fi#g#fi#h#fi#i#fi#j#fi#k#fi#l#fi#m#fi#n#fi#o#fi#q#fi#s#fi#u#fi#v#fi'l#fi(S#fi(c#fi'j#fi!S#fi!g#fio#fi!X#fi%a#fi!a#fi~P#,`O^#zi!V#zi'l#zi'j#zi!S#zi!g#zio#zi!X#zi%a#zi!a#zi~P!7sO$W.mO$Y.mO~O$W.nO$Y.nO~O!a)^O#X.oO!X$^X$T$^X$W$^X$Y$^X$a$^X~O!U.pO~O!X)aO$T.rO$W)`O$Y)`O$a.sO~O!V:UO!W(WX~P#ByO!W.tO~O!a)^O$a(lX~O$a.vO~Oq)pO(T)qO(U.yO~O!S.}O~P!&VO!VcX!acX!gcX!g$sX(ccX~P!/ZO!g/TO~P#,`O!V/UO!a#tO(c'fO!g(pX~O!g/ZO~O!U*RO'u%_O!g(pP~O#d/]O~O!S$sX!V$sX!a$zX~P!/ZO!V/^O!S(qX~P#,`O!a/`O~O!S/bO~Ok/fO!a#tO!h%]O(O%QO(c'fO~O'u/hO~O!a+XO~O^%fO!V/lO'l%fO~O!W/nO~P!3XO!]/oO!^/oO'v!kO(V!lO~O|/qO(V!lO~O#T/rO~O'u&POd'`X!V'`X~O!V*kOd(Pa~Od/wO~Oy/xOz/xO|/yOgva(jva(kva!Vva#Xva~Odva#yva~P$ aOy)uO|)vOg$la(j$la(k$la!V$la#X$la~Od$la#y$la~P$!VOy)uO|)vOg$na(j$na(k$na!V$na#X$na~Od$na#y$na~P$!xO#d/{O~Od$|a!V$|a#X$|a#y$|a~P!0dO!a#tO~O#d0OO~O!V*|O^(ua'l(ua~Oy#xOz#yO|#zO!f#vO!h#wO(SVOP!niX!nik!ni!V!ni!e!ni!l!ni#g!ni#h!ni#i!ni#j!ni#k!ni#l!ni#m!ni#n!ni#o!ni#q!ni#s!ni#u!ni#v!ni(c!ni(j!ni(k!ni~O^!ni'l!ni'j!ni!S!ni!g!nio!ni!X!ni%a!ni!a!ni~P$$gOg.TO!X'UO%a.SO~Oi0YO'u0XO~P!1UO!a+XO^'}a!X'}a'l'}a!V'}a~O#d0`O~OXYX!VcX!WcX~O!V0aO!W(yX~O!W0cO~OX0dO~O'u+aO'wTO'zUO~O!X%vO'u%_O]'hX!V'hX~O!V+fO](xa~O!g0iO~P!7sOX0lO~O]0mO~O#X0pO~Og0sO!X${O~O(V(sO!W(vP~Og0|O!X0yO%a0{O(O%QO~OX1WO!V1UO!W(wX~O!W1XO~O]1ZO^%fO'l%fO~O'u#lO'wTO'zUO~O#X$dO#{$dOP(XXX(XXk(XXy(XXz(XX|(XX!V(XX!e(XX!h(XX!l(XX#g(XX#h(XX#i(XX#j(XX#k(XX#l(XX#m(XX#n(XX#q(XX#s(XX#u(XX#v(XX(S(XX(c(XX(j(XX(k(XX~O#o1^O&R1_O^(XX!f(XX~P$+]O#X$dO#o1^O&R1_O~O^1aO~P%TO^1cO~O&[1fOP&YiQ&YiV&Yi^&Yia&Yib&Yii&Yik&Yil&Yim&Yis&Yiu&Yiw&Yi|&Yi!Q&Yi!R&Yi!X&Yi!c&Yi!h&Yi!k&Yi!l&Yi!m&Yi!o&Yi!q&Yi!t&Yi!x&Yi#p&Yi$Q&Yi$U&Yi%`&Yi%b&Yi%d&Yi%e&Yi%f&Yi%i&Yi%k&Yi%n&Yi%o&Yi%q&Yi%}&Yi&T&Yi&V&Yi&X&Yi&Z&Yi&^&Yi&d&Yi&j&Yi&l&Yi&n&Yi&p&Yi&r&Yi'j&Yi'u&Yi'w&Yi'z&Yi(S&Yi(b&Yi(o&Yi!W&Yi_&Yi&a&Yi~O_1lO!W1jO&a1kO~P`O!XXO!h1nO~O&h,iOP&ciQ&ciV&ci^&cia&cib&cii&cik&cil&cim&cis&ciu&ciw&ci|&ci!Q&ci!R&ci!X&ci!c&ci!h&ci!k&ci!l&ci!m&ci!o&ci!q&ci!t&ci!x&ci#p&ci$Q&ci$U&ci%`&ci%b&ci%d&ci%e&ci%f&ci%i&ci%k&ci%n&ci%o&ci%q&ci%}&ci&T&ci&V&ci&X&ci&Z&ci&^&ci&d&ci&j&ci&l&ci&n&ci&p&ci&r&ci'j&ci'u&ci'w&ci'z&ci(S&ci(b&ci(o&ci!W&ci&[&ci_&ci&a&ci~O!S1tO~O!V!Za!W!Za~P#ByOl!mO|!nO!U1zO(V!lO!V'OX!W'OX~P?wO!V,yO!W(Za~O!V'UX!W'UX~P!6{O!V,|O!W(ia~O!W2RO~P'WO^%fO#X2[O'l%fO~O^%fO!a#tO#X2[O'l%fO~O^%fO!a#tO!l2`O#X2[O'l%fO(c'fO~O^%fO'l%fO~P!7sO!V$`Oo$ka~O!S&}i!V&}i~P!7sO!V'zO!S(Yi~O!V(RO!S(gi~O!S(hi!V(hi~P!7sO!V(ei!g(ei^(ei'l(ei~P!7sO#X2bO!V(ei!g(ei^(ei'l(ei~O!V(_O!g(di~O|%`O!X%aO!x]O#b2gO#c2fO'u%_O~O|%`O!X%aO#c2fO'u%_O~Og2nO!X'UO%a2mO~Og2nO!X'UO%a2mO(O%QO~O#dvaPvaXva^vakva!eva!fva!hva!lva#gva#hva#iva#jva#kva#lva#mva#nva#ova#qva#sva#uva#vva'lva(Sva(cva!gva!Sva'jvaova!Xva%ava!ava~P$ aO#d$laP$laX$la^$lak$laz$la!e$la!f$la!h$la!l$la#g$la#h$la#i$la#j$la#k$la#l$la#m$la#n$la#o$la#q$la#s$la#u$la#v$la'l$la(S$la(c$la!g$la!S$la'j$lao$la!X$la%a$la!a$la~P$!VO#d$naP$naX$na^$nak$naz$na!e$na!f$na!h$na!l$na#g$na#h$na#i$na#j$na#k$na#l$na#m$na#n$na#o$na#q$na#s$na#u$na#v$na'l$na(S$na(c$na!g$na!S$na'j$nao$na!X$na%a$na!a$na~P$!xO#d$|aP$|aX$|a^$|ak$|az$|a!V$|a!e$|a!f$|a!h$|a!l$|a#g$|a#h$|a#i$|a#j$|a#k$|a#l$|a#m$|a#n$|a#o$|a#q$|a#s$|a#u$|a#v$|a'l$|a(S$|a(c$|a!g$|a!S$|a'j$|a#X$|ao$|a!X$|a%a$|a!a$|a~P#,`O^#[q!V#[q'l#[q'j#[q!S#[q!g#[qo#[q!X#[q%a#[q!a#[q~P!7sOd'PX!V'PX~P!'oO!V.^Od(]a~O!U2vO!V'QX!g'QX~P%TO!V.aO!g(^a~O!V.aO!g(^a~P!7sO!S2yO~O#y!ja!W!ja~PJqO#y!ba!V!ba!W!ba~P#ByO#y!na!W!na~P!:^O#y!pa!W!pa~P!<wO!X3]O$UfO$_3^O~O!W3bO~Oo3cO~P#,`O^$hq!V$hq'l$hq'j$hq!S$hq!g$hqo$hq!X$hq%a$hq!a$hq~P!7sO!S3dO~P#,`Oy)uO|)vO(k)zOg%Xi(j%Xi!V%Xi#X%Xi~Od%Xi#y%Xi~P$IuOy)uO|)vOg%Zi(j%Zi(k%Zi!V%Zi#X%Zi~Od%Zi#y%Zi~P$JhO(c$YO~P#,`O!U3gO'u%_O!V'[X!g'[X~O!V/UO!g(pa~O!V/UO!a#tO!g(pa~O!V/UO!a#tO(c'fO!g(pa~Od$ui!V$ui#X$ui#y$ui~P!0dO!U3oO'u*WO!S'^X!V'^X~P!1RO!V/^O!S(qa~O!V/^O!S(qa~P#,`O!a#tO#o3wO~Ok3zO!a#tO(c'fO~Od(Qi!V(Qi~P!0dO#X3}Od(Qi!V(Qi~P!0dO!g4QO~O^$iq!V$iq'l$iq'j$iq!S$iq!g$iqo$iq!X$iq%a$iq!a$iq~P!7sO!S4UO~O!V4VO!X(rX~P#,`O!f#vO~P4QO^$sX!X$sX%UYX'l$sX!V$sX~P!/ZO%U4XO^hXghXyhX|hX!XhX'lhX(jhX(khX!VhX~O%U4XO~O%b4`O'u+aO'wTO'zUO!V'gX!W'gX~O!V0aO!W(ya~OX4dO~O]4eO~O^%fO'l%fO~P#,`O!X${O~P#,`O!V4mO#X4oO!W(vX~O!W4pO~Ol!mO|4qO![!wO!]!tO!^!tO!x9qO!|!oO!}!oO#O!oO#P!oO#Q!oO#T4vO#U!xO'v!kO'wTO'zUO(V!lO(b!rO~O!W4uO~P%$gOg4{O!X0yO%a4zO~Og4{O!X0yO%a4zO(O%QO~O'u#lO!V'fX!W'fX~O!V1UO!W(wa~O'wTO'zUO(V5UO~O]5YO~O#o5]O&R5^O~PMaO!g5_O~P%TO^5aO~O^5aO~P%TO_1lO!W5fO&a1kO~P`O!a5hO~O!a5jO!V([i!W([i!a([i!h([i(O([i~O!V#ai!W#ai~P#ByO#X5kO!V#ai!W#ai~O!V!Zi!W!Zi~P#ByO^%fO#X5tO'l%fO~O^%fO!a#tO#X5tO'l%fO~O!V(eq!g(eq^(eq'l(eq~P!7sO!V(_O!g(dq~O|%`O!X%aO#c5{O'u%_O~O!X'UO%a6OO~Og6RO!X'UO%a6OO~O#d%XiP%XiX%Xi^%Xik%Xiz%Xi!e%Xi!f%Xi!h%Xi!l%Xi#g%Xi#h%Xi#i%Xi#j%Xi#k%Xi#l%Xi#m%Xi#n%Xi#o%Xi#q%Xi#s%Xi#u%Xi#v%Xi'l%Xi(S%Xi(c%Xi!g%Xi!S%Xi'j%Xio%Xi!X%Xi%a%Xi!a%Xi~P$IuO#d%ZiP%ZiX%Zi^%Zik%Ziz%Zi!e%Zi!f%Zi!h%Zi!l%Zi#g%Zi#h%Zi#i%Zi#j%Zi#k%Zi#l%Zi#m%Zi#n%Zi#o%Zi#q%Zi#s%Zi#u%Zi#v%Zi'l%Zi(S%Zi(c%Zi!g%Zi!S%Zi'j%Zio%Zi!X%Zi%a%Zi!a%Zi~P$JhO#d$uiP$uiX$ui^$uik$uiz$ui!V$ui!e$ui!f$ui!h$ui!l$ui#g$ui#h$ui#i$ui#j$ui#k$ui#l$ui#m$ui#n$ui#o$ui#q$ui#s$ui#u$ui#v$ui'l$ui(S$ui(c$ui!g$ui!S$ui'j$ui#X$uio$ui!X$ui%a$ui!a$ui~P#,`Od'Pa!V'Pa~P!0dO!V'Qa!g'Qa~P!7sO!V.aO!g(^i~O#y#[i!V#[i!W#[i~P#ByOP$[Oy#xOz#yO|#zO!f#vO!h#wO!l$[O(SVOX#fik#fi!e#fi#h#fi#i#fi#j#fi#k#fi#l#fi#m#fi#n#fi#o#fi#q#fi#s#fi#u#fi#v#fi#y#fi(c#fi(j#fi(k#fi!V#fi!W#fi~O#g#fi~P%2vO#g9yO~P%2vOP$[Oy#xOz#yO|#zO!f#vO!h#wO!l$[O#g9yO#h9zO#i9zO#j9zO(SVOX#fi!e#fi#k#fi#l#fi#m#fi#n#fi#o#fi#q#fi#s#fi#u#fi#v#fi#y#fi(c#fi(j#fi(k#fi!V#fi!W#fi~Ok#fi~P%5ROk9{O~P%5ROP$[Ok9{Oy#xOz#yO|#zO!f#vO!h#wO!l$[O#g9yO#h9zO#i9zO#j9zO#k9|O(SVO#q#fi#s#fi#u#fi#v#fi#y#fi(c#fi(j#fi(k#fi!V#fi!W#fi~OX#fi!e#fi#l#fi#m#fi#n#fi#o#fi~P%7^OX:XO!e9}O#l9}O#m9}O#n:WO#o9}O~P%7^OP$[OX:XOk9{Oy#xOz#yO|#zO!e9}O!f#vO!h#wO!l$[O#g9yO#h9zO#i9zO#j9zO#k9|O#l9}O#m9}O#n:WO#o9}O#q:OO(SVO#s#fi#u#fi#v#fi#y#fi(c#fi(k#fi!V#fi!W#fi~O(j#fi~P%9xO(j#{O~P%9xOP$[OX:XOk9{Oy#xOz#yO|#zO!e9}O!f#vO!h#wO!l$[O#g9yO#h9zO#i9zO#j9zO#k9|O#l9}O#m9}O#n:WO#o9}O#q:OO#s:QO(SVO(j#{O#u#fi#v#fi#y#fi(c#fi!V#fi!W#fi~O(k#fi~P%<TO(k#|O~P%<TOP$[OX:XOk9{Oy#xOz#yO|#zO!e9}O!f#vO!h#wO!l$[O#g9yO#h9zO#i9zO#j9zO#k9|O#l9}O#m9}O#n:WO#o9}O#q:OO#s:QO#u:SO(SVO(j#{O(k#|O~O#v#fi#y#fi(c#fi!V#fi!W#fi~P%>`O^#wy!V#wy'l#wy'j#wy!S#wy!g#wyo#wy!X#wy%a#wy!a#wy~P!7sOg;lOy)uO|)vO(j)xO(k)zO~OP#fiX#fik#fiz#fi!e#fi!f#fi!h#fi!l#fi#g#fi#h#fi#i#fi#j#fi#k#fi#l#fi#m#fi#n#fi#o#fi#q#fi#s#fi#u#fi#v#fi#y#fi(S#fi(c#fi!V#fi!W#fi~P%AWO!f#vOP(RXX(RXg(RXk(RXy(RXz(RX|(RX!e(RX!h(RX!l(RX#g(RX#h(RX#i(RX#j(RX#k(RX#l(RX#m(RX#n(RX#o(RX#q(RX#s(RX#u(RX#v(RX#y(RX(S(RX(c(RX(j(RX(k(RX!V(RX!W(RX~O#y#zi!V#zi!W#zi~P#ByO#y!ni!W!ni~P$$gO!W6_O~O!V'Za!W'Za~P#ByO!a#tO(c'fO!V'[a!g'[a~O!V/UO!g(pi~O!V/UO!a#tO!g(pi~Od$uq!V$uq#X$uq#y$uq~P!0dO!S'^a!V'^a~P#,`O!a6fO~O!V/^O!S(qi~P#,`O!V/^O!S(qi~O!S6jO~O!a#tO#o6oO~Ok6pO!a#tO(c'fO~O!S6rO~Od$wq!V$wq#X$wq#y$wq~P!0dO^$iy!V$iy'l$iy'j$iy!S$iy!g$iyo$iy!X$iy%a$iy!a$iy~P!7sO!a5jO~O!V4VO!X(ra~O^#[y!V#[y'l#[y'j#[y!S#[y!g#[yo#[y!X#[y%a#[y!a#[y~P!7sOX6wO~O!V0aO!W(yi~O]6}O~O(V(sO!V'cX!W'cX~O!V4mO!W(va~OikO'u7UO~P.bO!W7XO~P%$gOl!mO|7YO'wTO'zUO(V!lO(b!rO~O!X0yO~O!X0yO%a7[O~Og7_O!X0yO%a7[O~OX7dO!V'fa!W'fa~O!V1UO!W(wi~O!g7hO~O!g7iO~O!g7lO~O!g7lO~P%TO^7nO~O!a7oO~O!g7pO~O!V(hi!W(hi~P#ByO^%fO#X7xO'l%fO~O!V(ey!g(ey^(ey'l(ey~P!7sO!V(_O!g(dy~O!X'UO%a7{O~O#d$uqP$uqX$uq^$uqk$uqz$uq!V$uq!e$uq!f$uq!h$uq!l$uq#g$uq#h$uq#i$uq#j$uq#k$uq#l$uq#m$uq#n$uq#o$uq#q$uq#s$uq#u$uq#v$uq'l$uq(S$uq(c$uq!g$uq!S$uq'j$uq#X$uqo$uq!X$uq%a$uq!a$uq~P#,`O#d$wqP$wqX$wq^$wqk$wqz$wq!V$wq!e$wq!f$wq!h$wq!l$wq#g$wq#h$wq#i$wq#j$wq#k$wq#l$wq#m$wq#n$wq#o$wq#q$wq#s$wq#u$wq#v$wq'l$wq(S$wq(c$wq!g$wq!S$wq'j$wq#X$wqo$wq!X$wq%a$wq!a$wq~P#,`O!V'Qi!g'Qi~P!7sO#y#[q!V#[q!W#[q~P#ByOy/xOz/xO|/yOPvaXvagvakva!eva!fva!hva!lva#gva#hva#iva#jva#kva#lva#mva#nva#ova#qva#sva#uva#vva#yva(Sva(cva(jva(kva!Vva!Wva~Oy)uO|)vOP$laX$lag$lak$laz$la!e$la!f$la!h$la!l$la#g$la#h$la#i$la#j$la#k$la#l$la#m$la#n$la#o$la#q$la#s$la#u$la#v$la#y$la(S$la(c$la(j$la(k$la!V$la!W$la~Oy)uO|)vOP$naX$nag$nak$naz$na!e$na!f$na!h$na!l$na#g$na#h$na#i$na#j$na#k$na#l$na#m$na#n$na#o$na#q$na#s$na#u$na#v$na#y$na(S$na(c$na(j$na(k$na!V$na!W$na~OP$|aX$|ak$|az$|a!e$|a!f$|a!h$|a!l$|a#g$|a#h$|a#i$|a#j$|a#k$|a#l$|a#m$|a#n$|a#o$|a#q$|a#s$|a#u$|a#v$|a#y$|a(S$|a(c$|a!V$|a!W$|a~P%AWO#y$hq!V$hq!W$hq~P#ByO#y$iq!V$iq!W$iq~P#ByO!W8VO~O#y8WO~P!0dO!a#tO!V'[i!g'[i~O!a#tO(c'fO!V'[i!g'[i~O!V/UO!g(pq~O!S'^i!V'^i~P#,`O!V/^O!S(qq~O!S8^O~P#,`O!S8^O~Od(Qy!V(Qy~P!0dO!V'aa!X'aa~P#,`O^%Tq!X%Tq'l%Tq!V%Tq~P#,`OX8cO~O!V0aO!W(yq~O#X8gO!V'ca!W'ca~O!V4mO!W(vi~P#ByOPYXXYXkYXyYXzYX|YX!SYX!VYX!eYX!fYX!hYX!lYX#XYX#dcX#gYX#hYX#iYX#jYX#kYX#lYX#mYX#nYX#oYX#qYX#sYX#uYX#vYX#{YX(SYX(cYX(jYX(kYX~O!a%RX#o%RX~P&2WO!X0yO%a8kO~O'wTO'zUO(V8pO~O!V1UO!W(wq~O!g8sO~O!g8tO~O!g8uO~O!g8uO~P%TO#X8xO!V#ay!W#ay~O!V#ay!W#ay~P#ByO!X'UO%a8}O~O#y#wy!V#wy!W#wy~P#ByOP$uiX$uik$uiz$ui!e$ui!f$ui!h$ui!l$ui#g$ui#h$ui#i$ui#j$ui#k$ui#l$ui#m$ui#n$ui#o$ui#q$ui#s$ui#u$ui#v$ui#y$ui(S$ui(c$ui!V$ui!W$ui~P%AWOy)uO|)vO(k)zOP%XiX%Xig%Xik%Xiz%Xi!e%Xi!f%Xi!h%Xi!l%Xi#g%Xi#h%Xi#i%Xi#j%Xi#k%Xi#l%Xi#m%Xi#n%Xi#o%Xi#q%Xi#s%Xi#u%Xi#v%Xi#y%Xi(S%Xi(c%Xi(j%Xi!V%Xi!W%Xi~Oy)uO|)vOP%ZiX%Zig%Zik%Ziz%Zi!e%Zi!f%Zi!h%Zi!l%Zi#g%Zi#h%Zi#i%Zi#j%Zi#k%Zi#l%Zi#m%Zi#n%Zi#o%Zi#q%Zi#s%Zi#u%Zi#v%Zi#y%Zi(S%Zi(c%Zi(j%Zi(k%Zi!V%Zi!W%Zi~O#y$iy!V$iy!W$iy~P#ByO#y#[y!V#[y!W#[y~P#ByO!a#tO!V'[q!g'[q~O!V/UO!g(py~O!S'^q!V'^q~P#,`O!S9UO~P#,`O!V0aO!W(yy~O!V4mO!W(vq~O!X0yO%a9]O~O!g9`O~O!X'UO%a9eO~OP$uqX$uqk$uqz$uq!e$uq!f$uq!h$uq!l$uq#g$uq#h$uq#i$uq#j$uq#k$uq#l$uq#m$uq#n$uq#o$uq#q$uq#s$uq#u$uq#v$uq#y$uq(S$uq(c$uq!V$uq!W$uq~P%AWOP$wqX$wqk$wqz$wq!e$wq!f$wq!h$wq!l$wq#g$wq#h$wq#i$wq#j$wq#k$wq#l$wq#m$wq#n$wq#o$wq#q$wq#s$wq#u$wq#v$wq#y$wq(S$wq(c$wq!V$wq!W$wq~P%AWOd%]!Z!V%]!Z#X%]!Z#y%]!Z~P!0dO!V'cq!W'cq~P#ByO!V#a!Z!W#a!Z~P#ByO#d%]!ZP%]!ZX%]!Z^%]!Zk%]!Zz%]!Z!V%]!Z!e%]!Z!f%]!Z!h%]!Z!l%]!Z#g%]!Z#h%]!Z#i%]!Z#j%]!Z#k%]!Z#l%]!Z#m%]!Z#n%]!Z#o%]!Z#q%]!Z#s%]!Z#u%]!Z#v%]!Z'l%]!Z(S%]!Z(c%]!Z!g%]!Z!S%]!Z'j%]!Z#X%]!Zo%]!Z!X%]!Z%a%]!Z!a%]!Z~P#,`OP%]!ZX%]!Zk%]!Zz%]!Z!e%]!Z!f%]!Z!h%]!Z!l%]!Z#g%]!Z#h%]!Z#i%]!Z#j%]!Z#k%]!Z#l%]!Z#m%]!Z#n%]!Z#o%]!Z#q%]!Z#s%]!Z#u%]!Z#v%]!Z#y%]!Z(S%]!Z(c%]!Z!V%]!Z!W%]!Z~P%AWOo(WX~P1jO'v!kO~P!){O!ScX!VcX#XcX~P&2WOPYXXYXkYXyYXzYX|YX!VYX!VcX!eYX!fYX!hYX!lYX#XYX#XcX#dcX#gYX#hYX#iYX#jYX#kYX#lYX#mYX#nYX#oYX#qYX#sYX#uYX#vYX#{YX(SYX(cYX(jYX(kYX~O!acX!gYX!gcX(ccX~P&GnOP9pOQ9pOa;aOb!hOikOk9pOlkOmkOskOu9pOw9pO|WO!QkO!RkO!XXO!c9sO!hZO!k9pO!l9pO!m9pO!o9tO!q9wO!t!gO$Q!jO$UfO'u)TO'wTO'zUO(SVO(b[O(o;_O~O!V:UO!W$ka~Oi%ROk$sOl$rOm$rOs%SOu%TOw:[O|$zO!X${O!c;fO!h$wO#c:bO$Q%XO$m:^O$o:`O$r%YO'u(kO'wTO'zUO(O%QO(S$tO~O#p)[O~P&LdO!WYX!WcX~P&GnO#d9xO~O!a#tO#d9xO~O#X:YO~O#o9}O~O#X:dO!V(hX!W(hX~O#X:YO!V(fX!W(fX~O#d:eO~Od:gO~P!0dO#d:lO~O#d:mO~O!a#tO#d:nO~O!a#tO#d:eO~O#y:oO~P#ByO#d:pO~O#d:qO~O#d:rO~O#d:sO~O#d:tO~O#d:uO~O#y:vO~P!0dO#y:wO~P!0dO$U~!f!|!}#P#Q#T#b#c#n(o$m$o$r%U%`%a%b%i%k%n%o%q%s~'pR$U(o#h!R'n'v#il#g#jky'o(V'o'u$W$Y$W~",
  goto: "$&a(}PPPP)OP)RP)cP*r.uPPPP5UPP5kP;f>mP?QP?QPPP?QP@rP?QP?QP?QP@vPP@{PAfPF]PPPFaPPPPFaIaPPPIgJbPFaPLoPPPPN}FaPPPFaPFaP!#]FaP!&p!'r!'{P!(n!(r!(nPPPPP!+|!'rPP!,j!-dP!0WFaFa!0]!3f!7z!7z!;oPPP!;vFaPPPPPPPPPPP!?SP!@ePPFa!ArPFaPFaFaFaFaPFa!CUPP!F]P!I`P!Id!In!Ir!IrP!FYP!Iv!IvP!LyP!L}FaFa!MT#!V?QP?QP?Q?QP##a?Q?Q#%]?Q#'l?Q#)b?Q?Q#*O#+|#+|#,Q#,Y#+|#,bP#+|P?Q#,z?Q#.T?Q?Q5UPPP#/aPPP#/y#/yP#/yP#0`#/yPP#0fP#0]P#0]#0x#0]#1d#1j5R)R#1m)RP#1t#1t#1tP)RP)RP)RP)RPP)RP#1z#1}P#1})RP#2RP#2UP)RP)RP)RP)RP)RP)R)RPP#2[#2b#2l#2r#2x#3O#3U#3d#3j#3p#3z#4Q#4[#4k#4q#5b#5t#5z#6Q#6`#6u#8W#8f#8l#8r#8x#9O#9Y#9`#9f#9p#:S#:YPPPPPPPPPP#:`PPPPPPP#;S#>ZP#?j#?q#?yPPPP#DX#F}#Me#Mh#Mk#Nd#Ng#Nj#Nq#NyPP$ P$ T$ {$!z$#O$#dPP$#h$#n$#rP$#u$#y$#|$$r$%Y$%p$%t$%w$%z$&Q$&T$&X$&]R!zRmqOXs!Y#b%e&h&j&k&m,a,f1f1iY!tQ'U-R0y4tQ%kuQ%sxQ%z{Q&`!US&|!d,yQ'[!hS'b!q!wS*^${*cQ+_%tQ+l%|Q,Q&YQ-P'TQ-Z']Q-c'cQ/o*eQ1T,RR:c9t$|dOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$`$d%e%k%x&a&d&h&j&k&m&q&y'W'h'x'z(Q(X(m(q(u)t*w*{,^,a,f-V-_-m-s.a.h/y0O0`0|1^1_1a1c1f1i1k2[2b2v4q4{5]5^5a5t7Y7_7n7xS#o]9q!r)V$Z$l&})i,r,u.p1z3]4o5k8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bQ*n%UQ+d%vQ,S&]Q,Z&eQ.W:ZQ0V+VQ0Z+XQ0f+eQ1],XQ2j.TQ4_0aQ5S1UQ6Q2nQ6W:[Q6y4`R8O6R&zkOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$Z$`$d$l%e%k%x&a&d&e&h&j&k&m&q&y&}'W'h'x'z(Q(X(m(q(u)i)t*w*{+V,^,a,f,r,u-V-_-m-s.T.a.h.p/y0O0`0|1^1_1a1c1f1i1k1z2[2b2n2v3]4o4q4{5]5^5a5k5t6R7Y7_7n7x8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bt!mQ!q!t!w!x&|'T'U'b'c'd,y-P-R-c0y4t4v$^$ri#t#v$b$c$w$z%V%W%[)p)v)y){)|*T*Z*i*j+U+X+p+s.S.^/O/]/^/`/{0p0s0{2m3e3o3w3}4V4X4z6O6f6o7[7{8W8k8}9]9e:W:X:]:^:_:`:a:b:h:i:j:k:l:m:p:q:r:s:v:w;_;g;h;k;lQ%}{Q&z!dS'Q%a,|Q+d%vQ/z*rQ0f+eQ0k+kQ1[,WQ1],XQ4_0aQ4h0mQ5V1WQ5W1ZQ6y4`Q6|4eQ7g5YQ8f6}R8q7dpnOXs!U!Y#b%e&_&h&j&k&m,a,f1f1iR,U&a&t^OPXYstuvy!Y!_!f!i!n#Q#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$Z$`$d$l%e%k%x&a&d&e&h&j&k&m&q&y'W'h'z(Q(X(m(q(u)i)t*w*{+V,^,a,f,r,u-V-_-m-s.T.a.h.p/y0O0`0|1^1_1a1c1f1i1k1z2[2b2n2v3]4o4q4{5]5^5a5k5t6R7Y7_7n7x8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;a;b[#ZWZ#U#X&}'x!S%bm#f#g#j%]%`(R(](^(_*y*z*|,],s-q-w-x-y-{1n2f2g5j5{Q%nwQ%rxS%w{%|Q&T!SQ'X!gQ'Z!hQ(f#qS*Q$w*US+^%s%tQ+b%vQ+{&WQ,P&YS-Y'[']Q.V(gQ/Y*RQ0_+_Q0e+eQ0g+fQ0j+jQ1O+|S1S,Q,RQ2W-ZQ3f/UQ4^0aQ4b0dQ4g0lQ5R1TQ6c3gQ6x4`Q6{4dQ8b6wR9W8cv$yi#v%V%W%[)y){*T*i*j.^/]/{3e3}8W;_;g;h!S%px!h!s%r%s%t&{'Z'[']'a'k*]+^+_,v-Y-Z-b/g0_2P2W2_3yQ+W%nQ+q&QQ+t&RQ,O&YQ.U(fQ0}+{U1R,P,Q,RQ2o.VQ4|1OS5Q1S1TQ7c5R#O;c#t$b$c$w$z)p)v)|*Z+U+X+p+s.S/O/^/`0p0s0{2m3o3w4V4X4z6O6f6o7[7{8k8}9]9e:]:_:a:h:j:l:p:r:v;k;lg;d:W:X:^:`:b:i:k:m:q:s:wW%Oi%Q*k;_S&Q!P&_Q&R!QQ&S!RR+o&O$_$}i#t#v$b$c$w$z%V%W%[)p)v)y){)|*T*Z*i*j+U+X+p+s.S.^/O/]/^/`/{0p0s0{2m3e3o3w3}4V4X4z6O6f6o7[7{8W8k8}9]9e:W:X:]:^:_:`:a:b:h:i:j:k:l:m:p:q:r:s:v:w;_;g;h;k;lT)q$t)rV*o%U:Z:[U'Q!d%a,|S(t#x#yQ+i%yS.O(b(cQ0t+uQ4O/xR7R4m&zkOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$Z$`$d$l%e%k%x&a&d&e&h&j&k&m&q&y&}'W'h'x'z(Q(X(m(q(u)i)t*w*{+V,^,a,f,r,u-V-_-m-s.T.a.h.p/y0O0`0|1^1_1a1c1f1i1k1z2[2b2n2v3]4o4q4{5]5^5a5k5t6R7Y7_7n7x8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;b$i$_c#W#c%i%j%l'w'}(i(p(x(y(z({(|(})O)P)Q)R)S)U)X)])g+S+h,w-f-k-p-r.].c.g.i.j.k.z/|1u1x2Y2a2u2z2{2|2}3O3P3Q3R3S3T3U3V3W3Z3[3a4S4[5m5s5x6U6V6[6]7T7r7v8P8T8U8z9Y9a9r;UT#RV#S&{kOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$Z$`$d$l%e%k%x&a&d&e&h&j&k&m&q&y&}'W'h'x'z(Q(X(m(q(u)i)t*w*{+V,^,a,f,r,u-V-_-m-s.T.a.h.p/y0O0`0|1^1_1a1c1f1i1k1z2[2b2n2v3]4o4q4{5]5^5a5k5t6R7Y7_7n7x8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bQ'O!dR1{,yv!mQ!d!q!t!w!x&|'T'U'b'c'd,y-P-R-c0y4t4vS*]${*cS/g*^*eQ/p*fQ0v+wQ3y/oR3|/rlqOXs!Y#b%e&h&j&k&m,a,f1f1iQ&o!]Q'l!vS(h#s9xQ+[%qQ+y&TQ+z&VQ-W'YQ-e'eS.[(m:eS/}*w:nQ0]+]Q0x+xQ1m,hQ1o,iQ1w,tQ2U-XQ2X-]S4T0O:tQ4Y0^S4]0`:uQ5l1yQ5p2VQ5u2^Q6v4ZQ7s5nQ7t5qQ7w5vR8w7p$d$^c#W#c%j%l'w'}(i(p(x(y(z({(|(})O)P)Q)R)S)U)X)])g+S+h,w-f-k-p-r.].c.g.j.k.z/|1u1x2Y2a2u2z2{2|2}3O3P3Q3R3S3T3U3V3W3Z3[3a4S4[5m5s5x6U6V6[6]7T7r7v8P8T8U8z9Y9a9r;US(e#n'_U*h$|(l3YS+R%i.iQ2k0VQ5}2jQ7}6QR9O8O$d$]c#W#c%j%l'w'}(i(p(x(y(z({(|(})O)P)Q)R)S)U)X)])g+S+h,w-f-k-p-r.].c.g.j.k.z/|1u1x2Y2a2u2z2{2|2}3O3P3Q3R3S3T3U3V3W3Z3[3a4S4[5m5s5x6U6V6[6]7T7r7v8P8T8U8z9Y9a9r;US(d#n'_S(v#y$^S+Q%i.iS.P(c(eQ.l)WQ0S+RR2h.Q&zkOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$Z$`$d$l%e%k%x&a&d&e&h&j&k&m&q&y&}'W'h'x'z(Q(X(m(q(u)i)t*w*{+V,^,a,f,r,u-V-_-m-s.T.a.h.p/y0O0`0|1^1_1a1c1f1i1k1z2[2b2n2v3]4o4q4{5]5^5a5k5t6R7Y7_7n7x8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bS#o]9qQ&j!WQ&k!XQ&m!ZQ&n![R1e,dQ'V!gQ+T%nQ-U'XS.R(f+WQ2S-TW2l.U.V0U0WQ5o2TU5|2i2k2oS7z5}6PS8|7|7}S9c8{9OQ9k9dR9n9lU!uQ'U-RT4r0y4t!O_OXZ`s!U!Y#b#f%]%e&_&a&h&j&k&m(_,a,f-x1f1i]!oQ!q'U-R0y4tT#o]9q%WzOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$`$d%e%k%x&a&d&e&h&j&k&m&q&y'W'h'x'z(Q(X(m(q(u)t*w*{+V,^,a,f-V-_-m-s.T.a.h/y0O0`0|1^1_1a1c1f1i1k2[2b2n2v4q4{5]5^5a5t6R7Y7_7n7xS(t#x#yS.O(b(c!s:{$Z$l&})i,r,u.p1z3]4o5k8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bY!sQ'U-R0y4tQ'a!qS'k!t!wS'm!x4vS-b'b'cQ-d'dR2_-cQ'j!sS(Z#e1`S-a'a'mQ/X*QQ/e*]Q2`-dQ3k/YS3t/f/pQ6b3fS6m3z3|Q8Y6cR8a6pQ#ubQ'i!sS(Y#e1`S([#k*vQ*x%^Q+Y%oQ+`%uU-`'a'j'mQ-t(ZQ/W*QQ/d*]Q/j*`Q0[+ZQ1P+}S2]-a-dQ2e-|S3j/X/YS3s/e/pQ3v/iQ3x/kQ5O1QQ5w2`Q6a3fQ6e3kS6i3t3|Q6n3{Q7a5PS8X6b6cQ8]6jQ8_6mQ8n7bQ9S8YQ9T8^Q9V8aQ9_8oQ9g9UQ;O:yQ;Z;SR;[;TV!uQ'U-R%WaOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$`$d%e%k%x&a&d&e&h&j&k&m&q&y'W'h'x'z(Q(X(m(q(u)t*w*{+V,^,a,f-V-_-m-s.T.a.h/y0O0`0|1^1_1a1c1f1i1k2[2b2n2v4q4{5]5^5a5t6R7Y7_7n7xS#uy!i!r:x$Z$l&})i,r,u.p1z3]4o5k8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bR;O;a%WbOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$`$d%e%k%x&a&d&e&h&j&k&m&q&y'W'h'x'z(Q(X(m(q(u)t*w*{+V,^,a,f-V-_-m-s.T.a.h/y0O0`0|1^1_1a1c1f1i1k2[2b2n2v4q4{5]5^5a5t6R7Y7_7n7xQ%^j!S%ox!h!s%r%s%t&{'Z'[']'a'k*]+^+_,v-Y-Z-b/g0_2P2W2_3yS%uy!iQ+Z%pQ+}&YW1Q,O,P,Q,RU5P1R1S1TS7b5Q5RQ8o7c!r:y$Z$l&})i,r,u.p1z3]4o5k8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bQ;S;`R;T;a$zeOPXYstuv!Y!_!f!n#Q#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$`$d%e%k%x&a&d&h&j&k&m&q&y'W'h'z(Q(X(m(q(u)t*w*{+V,^,a,f-V-_-m-s.T.a.h/y0O0`0|1^1_1a1c1f1i1k2[2b2n2v4q4{5]5^5a5t6R7Y7_7n7xY#`WZ#U#X'x!S%bm#f#g#j%]%`(R(](^(_*y*z*|,],s-q-w-x-y-{1n2f2g5j5{Q,[&e!p:z$Z$l)i,r,u.p1z3]4o5k8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bR:}&}S'R!d%aR1},|$|dOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$`$d%e%k%x&a&d&h&j&k&m&q&y'W'h'x'z(Q(X(m(q(u)t*w*{,^,a,f-V-_-m-s.a.h/y0O0`0|1^1_1a1c1f1i1k2[2b2v4q4{5]5^5a5t7Y7_7n7x!r)V$Z$l&})i,r,u.p1z3]4o5k8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bQ,Z&eQ0V+VQ2j.TQ6Q2nR8O6R!f$Tc#W%i'w'}(i(p)P)Q)R)S)X)]+h-f-k-p-r.].c.z/|2Y2a2u3W4S4[5s5x6U7v8z9r!T:P)U)g,w.i1u1x2z3S3T3U3V3Z3a5m6V6[6]7T7r8P8T8U9Y9a;U!b$Vc#W%i'w'}(i(p)R)S)X)]+h-f-k-p-r.].c.z/|2Y2a2u3W4S4[5s5x6U7v8z9r!P:R)U)g,w.i1u1x2z3U3V3Z3a5m6V6[6]7T7r8P8T8U9Y9a;U!^$Zc#W%i'w'}(i(p)X)]+h-f-k-p-r.].c.z/|2Y2a2u3W4S4[5s5x6U7v8z9rQ3e/Sz;b)U)g,w.i1u1x2z3Z3a5m6V6[6]7T7r8P8T8U9Y9a;UQ;g;iR;h;j&zkOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$Z$`$d$l%e%k%x&a&d&e&h&j&k&m&q&y&}'W'h'x'z(Q(X(m(q(u)i)t*w*{+V,^,a,f,r,u-V-_-m-s.T.a.h.p/y0O0`0|1^1_1a1c1f1i1k1z2[2b2n2v3]4o4q4{5]5^5a5k5t6R7Y7_7n7x8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bS$mh$nR3^.o'RgOPWXYZhstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$Z$`$d$l$n%e%k%x&a&d&e&h&j&k&m&q&y&}'W'h'x'z(Q(X(m(q(u)i)t*w*{+V,^,a,f,r,u-V-_-m-s.T.a.h.o.p/y0O0`0|1^1_1a1c1f1i1k1z2[2b2n2v3]4o4q4{5]5^5a5k5t6R7Y7_7n7x8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bT$if$oQ$gfS)`$j)dR)l$oT$hf$oT)b$j)d'RhOPWXYZhstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$Z$`$d$l$n%e%k%x&a&d&e&h&j&k&m&q&y&}'W'h'x'z(Q(X(m(q(u)i)t*w*{+V,^,a,f,r,u-V-_-m-s.T.a.h.o.p/y0O0`0|1^1_1a1c1f1i1k1z2[2b2n2v3]4o4q4{5]5^5a5k5t6R7Y7_7n7x8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;bT$mh$nQ$phR)k$n%WjOPWXYZstuv!Y!_!f!n#Q#U#X#b#m#s#w#z#}$O$P$Q$R$S$T$U$V$W$X$`$d%e%k%x&a&d&e&h&j&k&m&q&y'W'h'x'z(Q(X(m(q(u)t*w*{+V,^,a,f-V-_-m-s.T.a.h/y0O0`0|1^1_1a1c1f1i1k2[2b2n2v4q4{5]5^5a5t6R7Y7_7n7x!s;`$Z$l&})i,r,u.p1z3]4o5k8g8x9p9s9t9w9x9y9z9{9|9}:O:P:Q:R:S:T:U:Y:c:d:e:g:n:o:t:u;b#alOPXZs!Y!_!n#Q#b#m#z$l%e&a&d&e&h&j&k&m&q&y'W(u)i*{+V,^,a,f-V.T.p/y0|1^1_1a1c1f1i1k2n3]4q4{5]5^5a6R7Y7_7nv$|i#v%V%W%[)y){*T*i*j.^/]/{3e3}8W;_;g;h#O(l#t$b$c$w$z)p)v)|*Z+U+X+p+s.S/O/^/`0p0s0{2m3o3w4V4X4z6O6f6o7[7{8k8}9]9e:]:_:a:h:j:l:p:r:v;k;lQ*s%YQ.{)ug3Y:W:X:^:`:b:i:k:m:q:s:wv$xi#v%V%W%[)y){*T*i*j.^/]/{3e3}8W;_;g;hQ*V$yS*`${*cQ*t%ZQ/k*a#O;Q#t$b$c$w$z)p)v)|*Z+U+X+p+s.S/O/^/`0p0s0{2m3o3w4V4X4z6O6f6o7[7{8k8}9]9e:]:_:a:h:j:l:p:r:v;k;lf;R:W:X:^:`:b:i:k:m:q:s:wQ;V;cQ;W;dQ;X;eR;Y;fv$|i#v%V%W%[)y){*T*i*j.^/]/{3e3}8W;_;g;h#O(l#t$b$c$w$z)p)v)|*Z+U+X+p+s.S/O/^/`0p0s0{2m3o3w4V4X4z6O6f6o7[7{8k8}9]9e:]:_:a:h:j:l:p:r:v;k;lg3Y:W:X:^:`:b:i:k:m:q:s:wloOXs!Y#b%e&h&j&k&m,a,f1f1iQ*Y$zQ,o&tQ,p&vR3n/^$^$}i#t#v$b$c$w$z%V%W%[)p)v)y){)|*T*Z*i*j+U+X+p+s.S.^/O/]/^/`/{0p0s0{2m3e3o3w3}4V4X4z6O6f6o7[7{8W8k8}9]9e:W:X:]:^:_:`:a:b:h:i:j:k:l:m:p:q:r:s:v:w;_;g;h;k;lQ+r&RQ0r+tQ4k0qR7Q4lT*b${*cS*b${*cT4s0y4tS/i*_4qT3{/q7YQ+Y%oQ/j*`Q0[+ZQ1P+}Q5O1QQ7a5PQ8n7bR9_8on)y$u(n*u/[/s/t2s3l4R6`6q9R;P;];^!Y:h(j)Z*P*X.Z.w.|/S/a0T0o0q2r3m3q4j4l6S6T6g6k6s6u8[8`9f;i;j]:i3X6Z8Q9P9Q9op){$u(n*u/Q/[/s/t2s3l4R6`6q9R;P;];^![:j(j)Z*P*X.Z.w.|/S/a0T0o0q2p2r3m3q4j4l6S6T6g6k6s6u8[8`9f;i;j_:k3X6Z8Q8R9P9Q9opnOXs!U!Y#b%e&_&h&j&k&m,a,f1f1iQ&[!TR,^&epnOXs!U!Y#b%e&_&h&j&k&m,a,f1f1iR&[!TQ+v&SR0n+oqnOXs!U!Y#b%e&_&h&j&k&m,a,f1f1iQ0z+{S4y0}1OU7Z4w4x4|S8j7]7^S9Z8i8lQ9h9[R9m9iQ&c!UR,V&_R5V1WS%w{%|R0g+fQ&h!VR,a&iR,g&nT1g,f1iR,k&oQ,j&oR1p,kQ'o!yR-g'oQsOQ#bXT%hs#bQ!|TR'q!|Q#PUR's#PQ)r$tR.x)rQ#SVR'u#SQ#VWU'{#V'|-nQ'|#WR-n'}Q,z'OR1|,zQ._(nR2t._Q.b(pS2w.b2xR2x.cQ-R'UR2Q-RY!qQ'U-R0y4tR'`!qS#]W%`U(S#](T-oQ(T#^R-o(OQ,}'RR2O,}r`OXs!U!Y#b%e&_&a&h&j&k&m,a,f1f1iS#fZ%]U#p`#f-xR-x(_Q(`#hQ-u([W-}(`-u2c5yQ2c-vR5y2dQ)d$jR.q)dQ$nhR)j$nQ$acU)Y$a-j:VQ-j9rR:V)gQ/V*QW3h/V3i6d8ZU3i/W/X/YS6d3j3kR8Z6e#o)w$u(j(n)Z*P*X*p*q*u.X.Y.Z.w.|/Q/R/S/[/a/s/t0T0o0q2p2q2r2s3X3l3m3q4R4j4l6S6T6X6Y6Z6`6g6k6q6s6u8Q8R8S8[8`9P9Q9R9f9o;P;];^;i;jQ/_*XU3p/_3r6hQ3r/aR6h3qQ*c${R/m*cQ*l%PR/v*lQ4W0TR6t4WQ*}%cR0R*}Q4n0tS7S4n8hR8h7TQ+x&TR0w+xQ4t0yR7W4tQ1V,SS5T1V7eR7e5VQ0b+bW4a0b4c6z8dQ4c0eQ6z4bR8d6{Q+g%wR0h+gQ1i,fR5e1iWrOXs#bQ&l!YQ+P%eQ,`&hQ,b&jQ,c&kQ,e&mQ1d,aS1g,f1iR5d1fQ%gpQ&p!^Q&s!`Q&u!aQ&w!bQ'g!sQ+O%dQ+[%qQ+n%}Q,U&cQ,m&rW-^'a'i'j'mQ-e'eQ/l*bQ0]+]S1Y,V,YQ1q,lQ1r,oQ1s,pQ2X-]W2Z-`-a-d-fQ4Y0^Q4f0kQ4i0oQ4}1PQ5X1[Q5c1eU5r2Y2]2`Q5u2^Q6v4ZQ7O4hQ7P4jQ7V4sQ7`5OQ7f5WS7u5s5wQ7w5vQ8e6|Q8m7aQ8r7gQ8y7vQ9X8fQ9^8nQ9b8zR9j9_Q%qxQ'Y!hQ'e!sU+]%r%s%tQ,t&{U-X'Z'[']S-]'a'kQ/c*]S0^+^+_Q1y,vS2V-Y-ZQ2^-bQ3u/gQ4Z0_Q5n2PQ5q2WQ5v2_R6l3yS$vi;_R*m%QU%Pi%Q;_R/u*kQ$uiS(j#t+XQ(n#vS)Z$b$cQ*P$wQ*X$zQ*p%VQ*q%WQ*u%[Q.X:]Q.Y:_Q.Z:aQ.w)pS.|)v/OQ/Q)yQ/R){Q/S)|Q/[*TQ/a*ZQ/s*iQ/t*jh0T+U.S0{2m4z6O7[7{8k8}9]9eQ0o+pQ0q+sQ2p:hQ2q:jQ2r:lQ2s.^S3X:W:XQ3l/]Q3m/^Q3q/`Q4R/{Q4j0pQ4l0sQ6S:pQ6T:rQ6X:^Q6Y:`Q6Z:bQ6`3eQ6g3oQ6k3wQ6q3}Q6s4VQ6u4XQ8Q:mQ8R:iQ8S:kQ8[6fQ8`6oQ9P:qQ9Q:sQ9R8WQ9f:vQ9o:wQ;P;_Q;];gQ;^;hQ;i;kR;j;llpOXs!Y#b%e&h&j&k&m,a,f1f1iQ!ePS#dZ#mQ&r!_U'^!n4q7YQ't#QQ(w#zQ)h$lS,Y&a&dQ,_&eQ,l&qQ,q&yQ-T'WQ.e(uQ.u)iQ0P*{Q0W+VQ1b,^Q2T-VQ2k.TQ3`.pQ4P/yQ4x0|Q5Z1^Q5[1_Q5`1aQ5b1cQ5g1kQ5}2nQ6^3]Q7^4{Q7j5]Q7k5^Q7m5aQ7}6RQ8l7_R8v7n#UcOPXZs!Y!_!n#b#m#z%e&a&d&e&h&j&k&m&q&y'W(u*{+V,^,a,f-V.T/y0|1^1_1a1c1f1i1k2n4q4{5]5^5a6R7Y7_7nQ#WWQ#cYQ%itQ%juS%lv!fS'w#U'zQ'}#XQ(i#sQ(p#wQ(x#}Q(y$OQ(z$PQ({$QQ(|$RQ(}$SQ)O$TQ)P$UQ)Q$VQ)R$WQ)S$XQ)U$ZQ)X$`Q)]$dW)g$l)i.p3]Q+S%kQ+h%xS,w&}1zQ-f'hS-k'x-mQ-p(QQ-r(XQ.](mQ.c(qQ.g9pQ.i9sQ.j9tQ.k9wQ.z)tQ/|*wQ1u,rQ1x,uQ2Y-_Q2a-sQ2u.aQ2z9xQ2{9yQ2|9zQ2}9{Q3O9|Q3P9}Q3Q:OQ3R:PQ3S:QQ3T:RQ3U:SQ3V:TQ3W.hQ3Z:YQ3[:cQ3a:UQ4S0OQ4[0`Q5m:dQ5s2[Q5x2bQ6U2vQ6V:eQ6[:gQ6]:nQ7T4oQ7r5kQ7v5tQ8P:oQ8T:tQ8U:uQ8z7xQ9Y8gQ9a8xQ9r#QR;U;bR#YWR'P!dY!sQ'U-R0y4tS&{!d,yQ'a!qS'k!t!wS'm!x4vS,v&|'TS-b'b'cQ-d'dQ2P-PR2_-cR(o#vR(r#wQ!eQT-Q'U-R]!pQ!q'U-R0y4tQ#n]R'_9qT#iZ%]S#hZ%]S%cm,]U([#f#g#jS-v(](^Q-z(_Q0Q*|Q2d-wU2e-x-y-{S5z2f2gR7y5{`#[W#U#X%`'x(R*y-qr#eZm#f#g#j%](](^(_*|-w-x-y-{2f2g5{Q1`,]Q1v,sQ5i1nQ7q5jT:|&}*zT#_W%`S#^W%`S'y#U(RS(O#X*yS,x&}*zT-l'x-qT'S!d%aQ$jfR)n$oT)c$j)dR3_.oT*S$w*UR*[$zQ0U+UQ2i.SQ4w0{Q6P2mQ7]4zQ7|6OQ8i7[Q8{7{Q9[8kQ9d8}Q9i9]R9l9elqOXs!Y#b%e&h&j&k&m,a,f1f1iQ&b!UR,U&_rmOXs!T!U!Y#b%e&_&h&j&k&m,a,f1f1iR,]&eT%dm,]R0u+uR,T&]Q%{{R+m%|R+c%vT&f!V&iT&g!V&iT1h,f1i",
  nodeNames: "⚠ ArithOp ArithOp LineComment BlockComment Script ExportDeclaration export Star as VariableName String Escape from ; default FunctionDeclaration async function VariableDefinition > TypeParamList TypeDefinition extends ThisType this LiteralType ArithOp Number BooleanLiteral TemplateType InterpolationEnd Interpolation InterpolationStart NullType null VoidType void TypeofType typeof MemberExpression . ?. PropertyName [ TemplateString Escape Interpolation super RegExp ] ArrayExpression Spread , } { ObjectExpression Property async get set PropertyDefinition Block : NewExpression new TypeArgList CompareOp < ) ( ArgList UnaryExpression delete LogicOp BitOp YieldExpression yield AwaitExpression await ParenthesizedExpression ClassExpression class ClassBody MethodDeclaration Decorator @ MemberExpression PrivatePropertyName CallExpression declare Privacy static abstract override PrivatePropertyDefinition PropertyDeclaration readonly accessor Optional TypeAnnotation Equals StaticBlock FunctionExpression ArrowFunction ParamList ParamList ArrayPattern ObjectPattern PatternProperty Privacy readonly Arrow MemberExpression BinaryExpression ArithOp ArithOp ArithOp ArithOp BitOp CompareOp instanceof satisfies in const CompareOp BitOp BitOp BitOp LogicOp LogicOp ConditionalExpression LogicOp LogicOp AssignmentExpression UpdateOp PostfixExpression CallExpression TaggedTemplateExpression DynamicImport import ImportMeta JSXElement JSXSelfCloseEndTag JSXStartTag JSXSelfClosingTag JSXIdentifier JSXBuiltin JSXIdentifier JSXNamespacedName JSXMemberExpression JSXSpreadAttribute JSXAttribute JSXAttributeValue JSXEscape JSXEndTag JSXOpenTag JSXFragmentTag JSXText JSXEscape JSXStartCloseTag JSXCloseTag PrefixCast ArrowFunction TypeParamList SequenceExpression KeyofType keyof UniqueType unique ImportType InferredType infer TypeName ParenthesizedType FunctionSignature ParamList NewSignature IndexedType TupleType Label ArrayType ReadonlyType ObjectType MethodType PropertyType IndexSignature PropertyDefinition CallSignature TypePredicate is NewSignature new UnionType LogicOp IntersectionType LogicOp ConditionalType ParameterizedType ClassDeclaration abstract implements type VariableDeclaration let var using TypeAliasDeclaration InterfaceDeclaration interface EnumDeclaration enum EnumBody NamespaceDeclaration namespace module AmbientDeclaration declare GlobalDeclaration global ClassDeclaration ClassBody AmbientFunctionDeclaration ExportGroup VariableName VariableName ImportDeclaration ImportGroup ForStatement for ForSpec ForInSpec ForOfSpec of WhileStatement while WithStatement with DoStatement do IfStatement if else SwitchStatement switch SwitchBody CaseLabel case DefaultLabel TryStatement try CatchClause catch FinallyClause finally ReturnStatement return ThrowStatement throw BreakStatement break ContinueStatement continue DebuggerStatement debugger LabeledStatement ExpressionStatement SingleExpression SingleClassItem",
  maxTerm: 366,
  context: d1,
  nodeProps: [
    ["group", -26, 6, 14, 16, 62, 199, 203, 207, 208, 210, 213, 216, 226, 228, 234, 236, 238, 240, 243, 249, 255, 257, 259, 261, 263, 265, 266, "Statement", -32, 10, 11, 25, 28, 29, 35, 45, 48, 49, 51, 56, 64, 72, 76, 78, 80, 81, 103, 104, 113, 114, 131, 134, 136, 137, 138, 139, 141, 142, 162, 163, 165, "Expression", -23, 24, 26, 30, 34, 36, 38, 166, 168, 170, 171, 173, 174, 175, 177, 178, 179, 181, 182, 183, 193, 195, 197, 198, "Type", -3, 84, 96, 102, "ClassItem"],
    ["openedBy", 31, "InterpolationStart", 50, "[", 54, "{", 69, "(", 143, "JSXStartTag", 155, "JSXStartTag JSXStartCloseTag"],
    ["closedBy", 33, "InterpolationEnd", 44, "]", 55, "}", 70, ")", 144, "JSXSelfCloseEndTag JSXEndTag", 160, "JSXEndTag"]
  ],
  propSources: [m1],
  skippedNodes: [0, 3, 4, 269],
  repeatNodeCount: 33,
  tokenData: "$>y(CSR!bOX%ZXY+gYZ-yZ[+g[]%Z]^.c^p%Zpq+gqr/mrs3cst:_tu>PuvBavwDxwxGgxyMvyz! Qz{!![{|!%O|}!&]}!O!%O!O!P!'g!P!Q!1w!Q!R#0t!R![#3T![!]#@T!]!^#Aa!^!_#Bk!_!`#GS!`!a#In!a!b#N{!b!c$$z!c!}>P!}#O$&U#O#P$'`#P#Q$,w#Q#R$.R#R#S>P#S#T$/`#T#o$0j#o#p$4z#p#q$5p#q#r$7Q#r#s$8^#s$f%Z$f$g+g$g#BY>P#BY#BZ$9h#BZ$IS>P$IS$I_$9h$I_$I|>P$I|$I}$<s$I}$JO$<s$JO$JT>P$JT$JU$9h$JU$KV>P$KV$KW$9h$KW&FU>P&FU&FV$9h&FV;'S>P;'S;=`BZ<%l?HT>P?HT?HU$9h?HUO>P(n%d_$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&j&hT$d&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c&j&zP;=`<%l&c'|'U]$d&j'{!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!b(SU'{!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!b(iP;=`<%l'}'|(oP;=`<%l&}'[(y]$d&j'xpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(rp)wU'xpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)rp*^P;=`<%l)r'[*dP;=`<%l(r#S*nX'xp'{!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g#S+^P;=`<%l*g(n+dP;=`<%l%Z(CS+rq$d&j'xp'{!b'n(;dOX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p$f%Z$f$g+g$g#BY%Z#BY#BZ+g#BZ$IS%Z$IS$I_+g$I_$JT%Z$JT$JU+g$JU$KV%Z$KV$KW+g$KW&FU%Z&FU&FV+g&FV;'S%Z;'S;=`+a<%l?HT%Z?HT?HU+g?HUO%Z(CS.ST'y#S$d&j'o(;dO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c(CS.n_$d&j'xp'{!b'o(;dOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#`/x`$d&j!l$Ip'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S1V`#q$Id$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`2X!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S2d_#q$Id$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$2b3l_'w$(n$d&j'{!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k*r4r_$d&j'{!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k)`5vX$d&jOr5qrs6cs!^5q!^!_6y!_#o5q#o#p6y#p;'S5q;'S;=`7h<%lO5q)`6jT$_#t$d&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c#t6|TOr6yrs7]s;'S6y;'S;=`7b<%lO6y#t7bO$_#t#t7eP;=`<%l6y)`7kP;=`<%l5q*r7w]$_#t$d&j'{!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}%W8uZ'{!bOY8pYZ6yZr8prs9hsw8pwx6yx#O8p#O#P6y#P;'S8p;'S;=`:R<%lO8p%W9oU$_#t'{!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}%W:UP;=`<%l8p*r:[P;=`<%l4k#%|:hg$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}st%Ztu<Puw%Zwx(rx!^%Z!^!_*g!_!c%Z!c!}<P!}#O%Z#O#P&c#P#R%Z#R#S<P#S#T%Z#T#o<P#o#p*g#p$g%Z$g;'S<P;'S;=`=y<%lO<P#%|<[i$d&j(b!L^'xp'{!bOY%ZYZ&cZr%Zrs&}st%Ztu<Puw%Zwx(rx!Q%Z!Q![<P![!^%Z!^!_*g!_!c%Z!c!}<P!}#O%Z#O#P&c#P#R%Z#R#S<P#S#T%Z#T#o<P#o#p*g#p$g%Z$g;'S<P;'S;=`=y<%lO<P#%|=|P;=`<%l<P(CS>`k$d&j'xp'{!b(V!LY'u&;d$W#tOY%ZYZ&cZr%Zrs&}st%Ztu>Puw%Zwx(rx}%Z}!O@T!O!Q%Z!Q![>P![!^%Z!^!_*g!_!c%Z!c!}>P!}#O%Z#O#P&c#P#R%Z#R#S>P#S#T%Z#T#o>P#o#p*g#p$g%Z$g;'S>P;'S;=`BZ<%lO>P+d@`k$d&j'xp'{!b$W#tOY%ZYZ&cZr%Zrs&}st%Ztu@Tuw%Zwx(rx}%Z}!O@T!O!Q%Z!Q![@T![!^%Z!^!_*g!_!c%Z!c!}@T!}#O%Z#O#P&c#P#R%Z#R#S@T#S#T%Z#T#o@T#o#p*g#p$g%Z$g;'S@T;'S;=`BT<%lO@T+dBWP;=`<%l@T(CSB^P;=`<%l>P%#SBl`$d&j'xp'{!b#i$IdOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#SCy_$d&j#{$Id'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%DfETa(k%<v$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sv%ZvwFYwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#SFe`$d&j#u$Id'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$2bGp_'z$)`$d&j'xpOYHoYZIuZrHorsIuswHowxKVx!^Ho!^!_LX!_#OHo#O#PIu#P#oHo#o#pLX#p;'SHo;'S;=`Mp<%lOHo*QHv_$d&j'xpOYHoYZIuZrHorsIuswHowxKVx!^Ho!^!_LX!_#OHo#O#PIu#P#oHo#o#pLX#p;'SHo;'S;=`Mp<%lOHo)`IzX$d&jOwIuwx6cx!^Iu!^!_Jg!_#oIu#o#pJg#p;'SIu;'S;=`KP<%lOIu#tJjTOwJgwx7]x;'SJg;'S;=`Jy<%lOJg#tJ|P;=`<%lJg)`KSP;=`<%lIu*QK`]$_#t$d&j'xpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r$fL^Z'xpOYLXYZJgZrLXrsJgswLXwxMPx#OLX#O#PJg#P;'SLX;'S;=`Mj<%lOLX$fMWU$_#t'xpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)r$fMmP;=`<%lLX*QMsP;=`<%lHo(*QNR_!h(!b$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z!'l! ]_!gM|$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'+h!!ib$d&j'xp'{!b'v#)d#j$IdOY%ZYZ&cZr%Zrs&}sw%Zwx(rxz%Zz{!#q{!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S!#|`$d&j'xp'{!b#g$IdOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&-O!%Z`$d&j'xp'{!bk&%`OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&C[!&h_!V&;l$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(CS!'rc$d&j'xp'{!by'<nOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!(}!P!Q%Z!Q![!+g![!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z!'d!)Wa$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!*]!P!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z!'d!*h_!UMt$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l!+rg$d&j'xp'{!bl$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!+g![!^%Z!^!_*g!_!g%Z!g!h!-Z!h#O%Z#O#P&c#P#R%Z#R#S!+g#S#X%Z#X#Y!-Z#Y#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l!-dg$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx{%Z{|!.{|}%Z}!O!.{!O!Q%Z!Q![!0a![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!0a#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l!/Uc$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!0a![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!0a#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l!0lc$d&j'xp'{!bl$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!0a![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!0a#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(CS!2Sf$d&j'xp'{!b#h$IdOY!3hYZ&cZr!3hrs!4{sw!3hwx!C}xz!3hz{#$s{!P!3h!P!Q#&Y!Q!^!3h!^!_!Mh!_!`#-x!`!a#/_!a!}!3h!}#O##[#O#P!<w#P#o!3h#o#p!Mh#p;'S!3h;'S;=`#$m<%lO!3h(r!3sb$d&j'xp'{!b!RSOY!3hYZ&cZr!3hrs!4{sw!3hwx!C}x!P!3h!P!Q!Kh!Q!^!3h!^!_!Mh!_!}!3h!}#O##[#O#P!<w#P#o!3h#o#p!Mh#p;'S!3h;'S;=`#$m<%lO!3h(Q!5U`$d&j'{!b!RSOY!4{YZ&cZw!4{wx!6Wx!P!4{!P!Q!=o!Q!^!4{!^!_!?g!_!}!4{!}#O!Bn#O#P!<w#P#o!4{#o#p!?g#p;'S!4{;'S;=`!Cw<%lO!4{&n!6_^$d&j!RSOY!6WYZ&cZ!P!6W!P!Q!7Z!Q!^!6W!^!_!8g!_!}!6W!}#O!;U#O#P!<w#P#o!6W#o#p!8g#p;'S!6W;'S;=`!=i<%lO!6W&n!7ba$d&j!RSO!^&c!_#Z&c#Z#[!7Z#[#]&c#]#^!7Z#^#a&c#a#b!7Z#b#g&c#g#h!7Z#h#i&c#i#j!7Z#j#m&c#m#n!7Z#n#o&c#p;'S&c;'S;=`&w<%lO&cS!8lX!RSOY!8gZ!P!8g!P!Q!9X!Q!}!8g!}#O!9p#O#P!:o#P;'S!8g;'S;=`!;O<%lO!8gS!9^U!RS#Z#[!9X#]#^!9X#a#b!9X#g#h!9X#i#j!9X#m#n!9XS!9sVOY!9pZ#O!9p#O#P!:Y#P#Q!8g#Q;'S!9p;'S;=`!:i<%lO!9pS!:]SOY!9pZ;'S!9p;'S;=`!:i<%lO!9pS!:lP;=`<%l!9pS!:rSOY!8gZ;'S!8g;'S;=`!;O<%lO!8gS!;RP;=`<%l!8g&n!;Z[$d&jOY!;UYZ&cZ!^!;U!^!_!9p!_#O!;U#O#P!<P#P#Q!6W#Q#o!;U#o#p!9p#p;'S!;U;'S;=`!<q<%lO!;U&n!<UX$d&jOY!;UYZ&cZ!^!;U!^!_!9p!_#o!;U#o#p!9p#p;'S!;U;'S;=`!<q<%lO!;U&n!<tP;=`<%l!;U&n!<|X$d&jOY!6WYZ&cZ!^!6W!^!_!8g!_#o!6W#o#p!8g#p;'S!6W;'S;=`!=i<%lO!6W&n!=lP;=`<%l!6W(Q!=xi$d&j'{!b!RSOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#Z&}#Z#[!=o#[#]&}#]#^!=o#^#a&}#a#b!=o#b#g&}#g#h!=o#h#i&}#i#j!=o#j#m&}#m#n!=o#n#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!f!?nZ'{!b!RSOY!?gZw!?gwx!8gx!P!?g!P!Q!@a!Q!}!?g!}#O!Ap#O#P!:o#P;'S!?g;'S;=`!Bh<%lO!?g!f!@hb'{!b!RSOY'}Zw'}x#O'}#P#Z'}#Z#[!@a#[#]'}#]#^!@a#^#a'}#a#b!@a#b#g'}#g#h!@a#h#i'}#i#j!@a#j#m'}#m#n!@a#n;'S'};'S;=`(f<%lO'}!f!AuX'{!bOY!ApZw!Apwx!9px#O!Ap#O#P!:Y#P#Q!?g#Q;'S!Ap;'S;=`!Bb<%lO!Ap!f!BeP;=`<%l!Ap!f!BkP;=`<%l!?g(Q!Bu^$d&j'{!bOY!BnYZ&cZw!Bnwx!;Ux!^!Bn!^!_!Ap!_#O!Bn#O#P!<P#P#Q!4{#Q#o!Bn#o#p!Ap#p;'S!Bn;'S;=`!Cq<%lO!Bn(Q!CtP;=`<%l!Bn(Q!CzP;=`<%l!4{'`!DW`$d&j'xp!RSOY!C}YZ&cZr!C}rs!6Ws!P!C}!P!Q!EY!Q!^!C}!^!_!GQ!_!}!C}!}#O!JX#O#P!<w#P#o!C}#o#p!GQ#p;'S!C};'S;=`!Kb<%lO!C}'`!Eci$d&j'xp!RSOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#Z(r#Z#[!EY#[#](r#]#^!EY#^#a(r#a#b!EY#b#g(r#g#h!EY#h#i(r#i#j!EY#j#m(r#m#n!EY#n#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(rt!GXZ'xp!RSOY!GQZr!GQrs!8gs!P!GQ!P!Q!Gz!Q!}!GQ!}#O!IZ#O#P!:o#P;'S!GQ;'S;=`!JR<%lO!GQt!HRb'xp!RSOY)rZr)rs#O)r#P#Z)r#Z#[!Gz#[#])r#]#^!Gz#^#a)r#a#b!Gz#b#g)r#g#h!Gz#h#i)r#i#j!Gz#j#m)r#m#n!Gz#n;'S)r;'S;=`*Z<%lO)rt!I`X'xpOY!IZZr!IZrs!9ps#O!IZ#O#P!:Y#P#Q!GQ#Q;'S!IZ;'S;=`!I{<%lO!IZt!JOP;=`<%l!IZt!JUP;=`<%l!GQ'`!J`^$d&j'xpOY!JXYZ&cZr!JXrs!;Us!^!JX!^!_!IZ!_#O!JX#O#P!<P#P#Q!C}#Q#o!JX#o#p!IZ#p;'S!JX;'S;=`!K[<%lO!JX'`!K_P;=`<%l!JX'`!KeP;=`<%l!C}(r!Ksk$d&j'xp'{!b!RSOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#Z%Z#Z#[!Kh#[#]%Z#]#^!Kh#^#a%Z#a#b!Kh#b#g%Z#g#h!Kh#h#i%Z#i#j!Kh#j#m%Z#m#n!Kh#n#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#W!Mq]'xp'{!b!RSOY!MhZr!Mhrs!?gsw!Mhwx!GQx!P!Mh!P!Q!Nj!Q!}!Mh!}#O#!U#O#P!:o#P;'S!Mh;'S;=`##U<%lO!Mh#W!Nse'xp'{!b!RSOY*gZr*grs'}sw*gwx)rx#O*g#P#Z*g#Z#[!Nj#[#]*g#]#^!Nj#^#a*g#a#b!Nj#b#g*g#g#h!Nj#h#i*g#i#j!Nj#j#m*g#m#n!Nj#n;'S*g;'S;=`+Z<%lO*g#W#!]Z'xp'{!bOY#!UZr#!Urs!Apsw#!Uwx!IZx#O#!U#O#P!:Y#P#Q!Mh#Q;'S#!U;'S;=`##O<%lO#!U#W##RP;=`<%l#!U#W##XP;=`<%l!Mh(r##e`$d&j'xp'{!bOY##[YZ&cZr##[rs!Bnsw##[wx!JXx!^##[!^!_#!U!_#O##[#O#P!<P#P#Q!3h#Q#o##[#o#p#!U#p;'S##[;'S;=`#$g<%lO##[(r#$jP;=`<%l##[(r#$pP;=`<%l!3h(CS#%Qb$d&j'xp'{!b'p(;d!RSOY!3hYZ&cZr!3hrs!4{sw!3hwx!C}x!P!3h!P!Q!Kh!Q!^!3h!^!_!Mh!_!}!3h!}#O##[#O#P!<w#P#o!3h#o#p!Mh#p;'S!3h;'S;=`#$m<%lO!3h(CS#&e_$d&j'xp'{!bR(;dOY#&YYZ&cZr#&Yrs#'dsw#&Ywx#*tx!^#&Y!^!_#,s!_#O#&Y#O#P#(f#P#o#&Y#o#p#,s#p;'S#&Y;'S;=`#-r<%lO#&Y(Bb#'m]$d&j'{!bR(;dOY#'dYZ&cZw#'dwx#(fx!^#'d!^!_#)w!_#O#'d#O#P#(f#P#o#'d#o#p#)w#p;'S#'d;'S;=`#*n<%lO#'d(AO#(mX$d&jR(;dOY#(fYZ&cZ!^#(f!^!_#)Y!_#o#(f#o#p#)Y#p;'S#(f;'S;=`#)q<%lO#(f(;d#)_SR(;dOY#)YZ;'S#)Y;'S;=`#)k<%lO#)Y(;d#)nP;=`<%l#)Y(AO#)tP;=`<%l#(f(<v#*OW'{!bR(;dOY#)wZw#)wwx#)Yx#O#)w#O#P#)Y#P;'S#)w;'S;=`#*h<%lO#)w(<v#*kP;=`<%l#)w(Bb#*qP;=`<%l#'d(Ap#*}]$d&j'xpR(;dOY#*tYZ&cZr#*trs#(fs!^#*t!^!_#+v!_#O#*t#O#P#(f#P#o#*t#o#p#+v#p;'S#*t;'S;=`#,m<%lO#*t(<U#+}W'xpR(;dOY#+vZr#+vrs#)Ys#O#+v#O#P#)Y#P;'S#+v;'S;=`#,g<%lO#+v(<U#,jP;=`<%l#+v(Ap#,pP;=`<%l#*t(=h#,|Y'xp'{!bR(;dOY#,sZr#,srs#)wsw#,swx#+vx#O#,s#O#P#)Y#P;'S#,s;'S;=`#-l<%lO#,s(=h#-oP;=`<%l#,s(CS#-uP;=`<%l#&Y%#W#.Vb$d&j#{$Id'xp'{!b!RSOY!3hYZ&cZr!3hrs!4{sw!3hwx!C}x!P!3h!P!Q!Kh!Q!^!3h!^!_!Mh!_!}!3h!}#O##[#O#P!<w#P#o!3h#o#p!Mh#p;'S!3h;'S;=`#$m<%lO!3h+h#/lb$T#t$d&j'xp'{!b!RSOY!3hYZ&cZr!3hrs!4{sw!3hwx!C}x!P!3h!P!Q!Kh!Q!^!3h!^!_!Mh!_!}!3h!}#O##[#O#P!<w#P#o!3h#o#p!Mh#p;'S!3h;'S;=`#$m<%lO!3h$/l#1Pp$d&j'xp'{!bl$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!+g!P!Q%Z!Q![#3T![!^%Z!^!_*g!_!g%Z!g!h!-Z!h#O%Z#O#P&c#P#R%Z#R#S#3T#S#U%Z#U#V#6_#V#X%Z#X#Y!-Z#Y#b%Z#b#c#5T#c#d#9g#d#l%Z#l#m#<i#m#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#3`k$d&j'xp'{!bl$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!+g!P!Q%Z!Q![#3T![!^%Z!^!_*g!_!g%Z!g!h!-Z!h#O%Z#O#P&c#P#R%Z#R#S#3T#S#X%Z#X#Y!-Z#Y#b%Z#b#c#5T#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#5`_$d&j'xp'{!bl$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#6hd$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#7v!R!S#7v!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#7v#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#8Rf$d&j'xp'{!bl$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#7v!R!S#7v!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#7v#S#b%Z#b#c#5T#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#9pc$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#:{!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#:{#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#;We$d&j'xp'{!bl$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#:{!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#:{#S#b%Z#b#c#5T#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#<rg$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#>Z![!^%Z!^!_*g!_!c%Z!c!i#>Z!i#O%Z#O#P&c#P#R%Z#R#S#>Z#S#T%Z#T#Z#>Z#Z#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z$/l#>fi$d&j'xp'{!bl$'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#>Z![!^%Z!^!_*g!_!c%Z!c!i#>Z!i#O%Z#O#P&c#P#R%Z#R#S#>Z#S#T%Z#T#Z#>Z#Z#b%Z#b#c#5T#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%Gh#@b_!a$b$d&j#y%<f'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)[#Al_^l$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(CS#Bz^(O!*v!e'.r'xp'{!b$U)d(oSOY*gZr*grs'}sw*gwx)rx!P*g!P!Q#Cv!Q!^*g!^!_#Dl!_!`#F^!`#O*g#P;'S*g;'S;=`+Z<%lO*g(n#DPX$f&j'xp'{!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g$Kh#DuZ#k$Id'xp'{!bOY*gZr*grs'}sw*gwx)rx!_*g!_!`#Eh!`#O*g#P;'S*g;'S;=`+Z<%lO*g$Kh#EqX#{$Id'xp'{!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g$Kh#FgX#l$Id'xp'{!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g%Gh#G_a#X%?x$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`!a#Hd!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#W#Ho_#d$Ih$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%Gh#I}adBf#l$Id$a#|$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`#KS!`!a#L^!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S#K__#l$Id$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S#Lia#k$Id$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`!a#Mn!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S#My`#k$Id$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'+h$ Wc(c$Ip$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P$!c!P!^%Z!^!_*g!_!a%Z!a!b$#m!b#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'+`$!n_z'#p$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S$#x`$d&j#v$Id'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#&^$%V_!x!Ln$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(@^$&a_|(8n$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(n$'eZ$d&jO!^$(W!^!_$(n!_#i$(W#i#j$(s#j#l$(W#l#m$*f#m#o$(W#o#p$(n#p;'S$(W;'S;=`$,q<%lO$(W(n$(_T[#S$d&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c#S$(sO[#S(n$(x[$d&jO!Q&c!Q![$)n![!^&c!_!c&c!c!i$)n!i#T&c#T#Z$)n#Z#o&c#o#p$,U#p;'S&c;'S;=`&w<%lO&c(n$)sZ$d&jO!Q&c!Q![$*f![!^&c!_!c&c!c!i$*f!i#T&c#T#Z$*f#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$*kZ$d&jO!Q&c!Q![$+^![!^&c!_!c&c!c!i$+^!i#T&c#T#Z$+^#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$+cZ$d&jO!Q&c!Q![$(W![!^&c!_!c&c!c!i$(W!i#T&c#T#Z$(W#Z#o&c#p;'S&c;'S;=`&w<%lO&c#S$,XR!Q![$,b!c!i$,b#T#Z$,b#S$,eS!Q![$,b!c!i$,b#T#Z$,b#q#r$(n(n$,tP;=`<%l$(W!2r$-S_!S!+S$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#S$.^`#s$Id$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&,v$/k_$d&j'xp'{!b(S&%WOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(CS$0yk$d&j'xp'{!b(V!LY'u&;d$Y#tOY%ZYZ&cZr%Zrs&}st%Ztu$0juw%Zwx(rx}%Z}!O$2n!O!Q%Z!Q![$0j![!^%Z!^!_*g!_!c%Z!c!}$0j!}#O%Z#O#P&c#P#R%Z#R#S$0j#S#T%Z#T#o$0j#o#p*g#p$g%Z$g;'S$0j;'S;=`$4t<%lO$0j+d$2yk$d&j'xp'{!b$Y#tOY%ZYZ&cZr%Zrs&}st%Ztu$2nuw%Zwx(rx}%Z}!O$2n!O!Q%Z!Q![$2n![!^%Z!^!_*g!_!c%Z!c!}$2n!}#O%Z#O#P&c#P#R%Z#R#S$2n#S#T%Z#T#o$2n#o#p*g#p$g%Z$g;'S$2n;'S;=`$4n<%lO$2n+d$4qP;=`<%l$2n(CS$4wP;=`<%l$0j!5p$5TX!X!3l'xp'{!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g%Df$5{a(j%<v$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p#q$#m#q;'S%Z;'S;=`+a<%lO%Z%#`$7__!W$I`o`$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(r$8i_!mS$d&j'xp'{!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(CS$9y|$d&j'xp'{!b'n(;d(V!LY'u&;d$W#tOX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}st%Ztu>Puw%Zwx(rx}%Z}!O@T!O!Q%Z!Q![>P![!^%Z!^!_*g!_!c%Z!c!}>P!}#O%Z#O#P&c#P#R%Z#R#S>P#S#T%Z#T#o>P#o#p*g#p$f%Z$f$g+g$g#BY>P#BY#BZ$9h#BZ$IS>P$IS$I_$9h$I_$JT>P$JT$JU$9h$JU$KV>P$KV$KW$9h$KW&FU>P&FU&FV$9h&FV;'S>P;'S;=`BZ<%l?HT>P?HT?HU$9h?HUO>P(CS$=Uk$d&j'xp'{!b'o(;d(V!LY'u&;d$W#tOY%ZYZ&cZr%Zrs&}st%Ztu>Puw%Zwx(rx}%Z}!O@T!O!Q%Z!Q![>P![!^%Z!^!_*g!_!c%Z!c!}>P!}#O%Z#O#P&c#P#R%Z#R#S>P#S#T%Z#T#o>P#o#p*g#p$g%Z$g;'S>P;'S;=`BZ<%lO>P",
  tokenizers: [p1, g1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, O1, new ms("$S~RRtu[#O#Pg#S#T#|~_P#o#pb~gOq~~jVO#i!P#i#j!U#j#l!P#l#m!q#m;'S!P;'S;=`#v<%lO!P~!UO!O~~!XS!Q![!e!c!i!e#T#Z!e#o#p#Z~!hR!Q![!q!c!i!q#T#Z!q~!tR!Q![!}!c!i!}#T#Z!}~#QR!Q![!P!c!i!P#T#Z!P~#^R!Q![#g!c!i#g#T#Z#g~#jS!Q![#g!c!i#g#T#Z#g#q#r!P~#yP;=`<%l!P~$RO(U~~", 141, 327), new ms("j~RQYZXz{^~^O'r~~aP!P!Qd~iO's~~", 25, 309)],
  topRules: { Script: [0, 5], SingleExpression: [1, 267], SingleClassItem: [2, 268] },
  dialects: { jsx: 12794, ts: 12796 },
  dynamicPrecedences: { 76: 1, 78: 1, 163: 1, 191: 1 },
  specialized: [{ term: 313, get: (n) => S1[n] || -1 }, { term: 329, get: (n) => y1[n] || -1 }, { term: 67, get: (n) => b1[n] || -1 }],
  tokenPrec: 12820
});
class Zu {
  /**
  Create a new completion context. (Mostly useful for testing
  completion sources—in the editor, the extension will create
  these for you.)
  */
  constructor(e, t, i) {
    this.state = e, this.pos = t, this.explicit = i, this.abortListeners = [];
  }
  /**
  Get the extent, content, and (if there is a token) type of the
  token before `this.pos`.
  */
  tokenBefore(e) {
    let t = I(this.state).resolveInner(this.pos, -1);
    for (; t && e.indexOf(t.name) < 0; )
      t = t.parent;
    return t ? {
      from: t.from,
      to: this.pos,
      text: this.state.sliceDoc(t.from, this.pos),
      type: t.type
    } : null;
  }
  /**
  Get the match of the given expression directly before the
  cursor.
  */
  matchBefore(e) {
    let t = this.state.doc.lineAt(this.pos), i = Math.max(t.from, this.pos - 250), s = t.text.slice(i - t.from, this.pos - t.from), r = s.search(Au(e, !1));
    return r < 0 ? null : { from: i + r, to: this.pos, text: s.slice(r) };
  }
  /**
  Yields true when the query has been aborted. Can be useful in
  asynchronous queries to avoid doing work that will be ignored.
  */
  get aborted() {
    return this.abortListeners == null;
  }
  /**
  Allows you to register abort handlers, which will be called when
  the query is
  [aborted](https://codemirror.net/6/docs/ref/#autocomplete.CompletionContext.aborted).
  */
  addEventListener(e, t) {
    e == "abort" && this.abortListeners && this.abortListeners.push(t);
  }
}
function hh(n) {
  let e = Object.keys(n).join(""), t = /\w/.test(e);
  return t && (e = e.replace(/\w/g, "")), `[${t ? "\\w" : ""}${e.replace(/[^\w\s]/g, "\\$&")}]`;
}
function x1(n) {
  let e = /* @__PURE__ */ Object.create(null), t = /* @__PURE__ */ Object.create(null);
  for (let { label: s } of n) {
    e[s[0]] = !0;
    for (let r = 1; r < s.length; r++)
      t[s[r]] = !0;
  }
  let i = hh(e) + hh(t) + "*$";
  return [new RegExp("^" + i), new RegExp(i)];
}
function Ru(n) {
  let e = n.map((s) => typeof s == "string" ? { label: s } : s), [t, i] = e.every((s) => /^\w+$/.test(s.label)) ? [/\w*$/, /\w+$/] : x1(e);
  return (s) => {
    let r = s.matchBefore(i);
    return r || s.explicit ? { from: r ? r.from : s.pos, options: e, validFor: t } : null;
  };
}
function w1(n, e) {
  return (t) => {
    for (let i = I(t.state).resolveInner(t.pos, -1); i; i = i.parent) {
      if (n.indexOf(i.name) > -1)
        return null;
      if (i.type.isTop)
        break;
    }
    return e(t);
  };
}
class ch {
  constructor(e, t, i, s) {
    this.completion = e, this.source = t, this.match = i, this.score = s;
  }
}
function kt(n) {
  return n.selection.main.from;
}
function Au(n, e) {
  var t;
  let { source: i } = n, s = e && i[0] != "^", r = i[i.length - 1] != "$";
  return !s && !r ? n : new RegExp(`${s ? "^" : ""}(?:${i})${r ? "$" : ""}`, (t = n.flags) !== null && t !== void 0 ? t : n.ignoreCase ? "i" : "");
}
const Vu = /* @__PURE__ */ mt.define();
function $1(n, e, t, i) {
  let { main: s } = n.selection, r = t - s.from, o = i - s.from;
  return Object.assign(Object.assign({}, n.changeByRange((l) => l != s && t != i && n.sliceDoc(l.from + r, l.from + o) != n.sliceDoc(t, i) ? { range: l } : {
    changes: { from: l.from + r, to: i == s.from ? l.to : l.from + o, insert: e },
    range: y.cursor(l.from + r + e.length)
  })), { userEvent: "input.complete" });
}
const fh = /* @__PURE__ */ new WeakMap();
function k1(n) {
  if (!Array.isArray(n))
    return n;
  let e = fh.get(n);
  return e || fh.set(n, e = Ru(n)), e;
}
const Ko = /* @__PURE__ */ R.define(), Ji = /* @__PURE__ */ R.define();
class v1 {
  constructor(e) {
    this.pattern = e, this.chars = [], this.folded = [], this.any = [], this.precise = [], this.byWord = [], this.score = 0, this.matched = [];
    for (let t = 0; t < e.length; ) {
      let i = ae(e, t), s = Ye(i);
      this.chars.push(i);
      let r = e.slice(t, t + s), o = r.toUpperCase();
      this.folded.push(ae(o == r ? r.toLowerCase() : o, 0)), t += s;
    }
    this.astral = e.length != this.chars.length;
  }
  ret(e, t) {
    return this.score = e, this.matched = t, !0;
  }
  // Matches a given word (completion) against the pattern (input).
  // Will return a boolean indicating whether there was a match and,
  // on success, set `this.score` to the score, `this.matched` to an
  // array of `from, to` pairs indicating the matched parts of `word`.
  //
  // The score is a number that is more negative the worse the match
  // is. See `Penalty` above.
  match(e) {
    if (this.pattern.length == 0)
      return this.ret(-100, []);
    if (e.length < this.pattern.length)
      return !1;
    let { chars: t, folded: i, any: s, precise: r, byWord: o } = this;
    if (t.length == 1) {
      let b = ae(e, 0), v = Ye(b), Q = v == e.length ? 0 : -100;
      if (b != t[0])
        if (b == i[0])
          Q += -200;
        else
          return !1;
      return this.ret(Q, [0, v]);
    }
    let l = e.indexOf(this.pattern);
    if (l == 0)
      return this.ret(e.length == this.pattern.length ? 0 : -100, [0, this.pattern.length]);
    let a = t.length, h = 0;
    if (l < 0) {
      for (let b = 0, v = Math.min(e.length, 200); b < v && h < a; ) {
        let Q = ae(e, b);
        (Q == t[h] || Q == i[h]) && (s[h++] = b), b += Ye(Q);
      }
      if (h < a)
        return !1;
    }
    let c = 0, f = 0, u = !1, d = 0, O = -1, m = -1, g = /[a-z]/.test(e), S = !0;
    for (let b = 0, v = Math.min(e.length, 200), Q = 0; b < v && f < a; ) {
      let x = ae(e, b);
      l < 0 && (c < a && x == t[c] && (r[c++] = b), d < a && (x == t[d] || x == i[d] ? (d == 0 && (O = b), m = b + 1, d++) : d = 0));
      let w, Z = x < 255 ? x >= 48 && x <= 57 || x >= 97 && x <= 122 ? 2 : x >= 65 && x <= 90 ? 1 : 0 : (w = Co(x)) != w.toLowerCase() ? 1 : w != w.toUpperCase() ? 2 : 0;
      (!b || Z == 1 && g || Q == 0 && Z != 0) && (t[f] == x || i[f] == x && (u = !0) ? o[f++] = b : o.length && (S = !1)), Q = Z, b += Ye(x);
    }
    return f == a && o[0] == 0 && S ? this.result(-100 + (u ? -200 : 0), o, e) : d == a && O == 0 ? this.ret(-200 - e.length + (m == e.length ? 0 : -100), [0, m]) : l > -1 ? this.ret(-700 - e.length, [l, l + this.pattern.length]) : d == a ? this.ret(-200 + -700 - e.length, [O, m]) : f == a ? this.result(-100 + (u ? -200 : 0) + -700 + (S ? 0 : -1100), o, e) : t.length == 2 ? !1 : this.result((s[0] ? -700 : 0) + -200 + -1100, s, e);
  }
  result(e, t, i) {
    let s = [], r = 0;
    for (let o of t) {
      let l = o + (this.astral ? Ye(ae(i, o)) : 1);
      r && s[r - 1] == o ? s[r - 1] = l : (s[r++] = o, s[r++] = l);
    }
    return this.ret(e - i.length, s);
  }
}
const ke = /* @__PURE__ */ P.define({
  combine(n) {
    return lt(n, {
      activateOnTyping: !0,
      selectOnOpen: !0,
      override: null,
      closeOnBlur: !0,
      maxRenderedOptions: 100,
      defaultKeymap: !0,
      tooltipClass: () => "",
      optionClass: () => "",
      aboveCursor: !1,
      icons: !0,
      addToOptions: [],
      positionInfo: P1,
      compareCompletions: (e, t) => e.label.localeCompare(t.label),
      interactionDelay: 75
    }, {
      defaultKeymap: (e, t) => e && t,
      closeOnBlur: (e, t) => e && t,
      icons: (e, t) => e && t,
      tooltipClass: (e, t) => (i) => uh(e(i), t(i)),
      optionClass: (e, t) => (i) => uh(e(i), t(i)),
      addToOptions: (e, t) => e.concat(t)
    });
  }
});
function uh(n, e) {
  return n ? e ? n + " " + e : n : e;
}
function P1(n, e, t, i, s) {
  let r = n.textDirection == N.RTL, o = r, l = !1, a = "top", h, c, f = e.left - s.left, u = s.right - e.right, d = i.right - i.left, O = i.bottom - i.top;
  if (o && f < Math.min(d, u) ? o = !1 : !o && u < Math.min(d, f) && (o = !0), d <= (o ? f : u))
    h = Math.max(s.top, Math.min(t.top, s.bottom - O)) - e.top, c = Math.min(400, o ? f : u);
  else {
    l = !0, c = Math.min(
      400,
      (r ? e.right : s.right - e.left) - 30
      /* Margin */
    );
    let m = s.bottom - e.bottom;
    m >= O || m > e.top ? h = t.bottom - e.top : (a = "bottom", h = e.bottom - t.top);
  }
  return {
    style: `${a}: ${h}px; max-width: ${c}px`,
    class: "cm-completionInfo-" + (l ? r ? "left-narrow" : "right-narrow" : o ? "left" : "right")
  };
}
function C1(n) {
  let e = n.addToOptions.slice();
  return n.icons && e.push({
    render(t) {
      let i = document.createElement("div");
      return i.classList.add("cm-completionIcon"), t.type && i.classList.add(...t.type.split(/\s+/g).map((s) => "cm-completionIcon-" + s)), i.setAttribute("aria-hidden", "true"), i;
    },
    position: 20
  }), e.push({
    render(t, i, s) {
      let r = document.createElement("span");
      r.className = "cm-completionLabel";
      let o = t.displayLabel || t.label, l = 0;
      for (let a = 0; a < s.length; ) {
        let h = s[a++], c = s[a++];
        h > l && r.appendChild(document.createTextNode(o.slice(l, h)));
        let f = r.appendChild(document.createElement("span"));
        f.appendChild(document.createTextNode(o.slice(h, c))), f.className = "cm-completionMatchedText", l = c;
      }
      return l < o.length && r.appendChild(document.createTextNode(o.slice(l))), r;
    },
    position: 50
  }, {
    render(t) {
      if (!t.detail)
        return null;
      let i = document.createElement("span");
      return i.className = "cm-completionDetail", i.textContent = t.detail, i;
    },
    position: 80
  }), e.sort((t, i) => t.position - i.position).map((t) => t.render);
}
function dh(n, e, t) {
  if (n <= t)
    return { from: 0, to: n };
  if (e < 0 && (e = 0), e <= n >> 1) {
    let s = Math.floor(e / t);
    return { from: s * t, to: (s + 1) * t };
  }
  let i = Math.floor((n - e) / t);
  return { from: n - (i + 1) * t, to: n - i * t };
}
class X1 {
  constructor(e, t, i) {
    this.view = e, this.stateField = t, this.applyCompletion = i, this.info = null, this.infoDestroy = null, this.placeInfoReq = {
      read: () => this.measureInfo(),
      write: (a) => this.placeInfo(a),
      key: this
    }, this.space = null, this.currentClass = "";
    let s = e.state.field(t), { options: r, selected: o } = s.open, l = e.state.facet(ke);
    this.optionContent = C1(l), this.optionClass = l.optionClass, this.tooltipClass = l.tooltipClass, this.range = dh(r.length, o, l.maxRenderedOptions), this.dom = document.createElement("div"), this.dom.className = "cm-tooltip-autocomplete", this.updateTooltipClass(e.state), this.dom.addEventListener("mousedown", (a) => {
      for (let h = a.target, c; h && h != this.dom; h = h.parentNode)
        if (h.nodeName == "LI" && (c = /-(\d+)$/.exec(h.id)) && +c[1] < r.length) {
          this.applyCompletion(e, r[+c[1]]), a.preventDefault();
          return;
        }
    }), this.dom.addEventListener("focusout", (a) => {
      let h = e.state.field(this.stateField, !1);
      h && h.tooltip && e.state.facet(ke).closeOnBlur && a.relatedTarget != e.contentDOM && e.dispatch({ effects: Ji.of(null) });
    }), this.list = this.dom.appendChild(this.createListBox(r, s.id, this.range)), this.list.addEventListener("scroll", () => {
      this.info && this.view.requestMeasure(this.placeInfoReq);
    });
  }
  mount() {
    this.updateSel();
  }
  update(e) {
    var t, i, s;
    let r = e.state.field(this.stateField), o = e.startState.field(this.stateField);
    this.updateTooltipClass(e.state), r != o && (this.updateSel(), ((t = r.open) === null || t === void 0 ? void 0 : t.disabled) != ((i = o.open) === null || i === void 0 ? void 0 : i.disabled) && this.dom.classList.toggle("cm-tooltip-autocomplete-disabled", !!(!((s = r.open) === null || s === void 0) && s.disabled)));
  }
  updateTooltipClass(e) {
    let t = this.tooltipClass(e);
    if (t != this.currentClass) {
      for (let i of this.currentClass.split(" "))
        i && this.dom.classList.remove(i);
      for (let i of t.split(" "))
        i && this.dom.classList.add(i);
      this.currentClass = t;
    }
  }
  positioned(e) {
    this.space = e, this.info && this.view.requestMeasure(this.placeInfoReq);
  }
  updateSel() {
    let e = this.view.state.field(this.stateField), t = e.open;
    if ((t.selected > -1 && t.selected < this.range.from || t.selected >= this.range.to) && (this.range = dh(t.options.length, t.selected, this.view.state.facet(ke).maxRenderedOptions), this.list.remove(), this.list = this.dom.appendChild(this.createListBox(t.options, e.id, this.range)), this.list.addEventListener("scroll", () => {
      this.info && this.view.requestMeasure(this.placeInfoReq);
    })), this.updateSelectedOption(t.selected)) {
      this.destroyInfo();
      let { completion: i } = t.options[t.selected], { info: s } = i;
      if (!s)
        return;
      let r = typeof s == "string" ? document.createTextNode(s) : s(i);
      if (!r)
        return;
      "then" in r ? r.then((o) => {
        o && this.view.state.field(this.stateField, !1) == e && this.addInfoPane(o, i);
      }).catch((o) => Ae(this.view.state, o, "completion info")) : this.addInfoPane(r, i);
    }
  }
  addInfoPane(e, t) {
    this.destroyInfo();
    let i = this.info = document.createElement("div");
    if (i.className = "cm-tooltip cm-completionInfo", e.nodeType != null)
      i.appendChild(e), this.infoDestroy = null;
    else {
      let { dom: s, destroy: r } = e;
      i.appendChild(s), this.infoDestroy = r || null;
    }
    this.dom.appendChild(i), this.view.requestMeasure(this.placeInfoReq);
  }
  updateSelectedOption(e) {
    let t = null;
    for (let i = this.list.firstChild, s = this.range.from; i; i = i.nextSibling, s++)
      i.nodeName != "LI" || !i.id ? s-- : s == e ? i.hasAttribute("aria-selected") || (i.setAttribute("aria-selected", "true"), t = i) : i.hasAttribute("aria-selected") && i.removeAttribute("aria-selected");
    return t && Z1(this.list, t), t;
  }
  measureInfo() {
    let e = this.dom.querySelector("[aria-selected]");
    if (!e || !this.info)
      return null;
    let t = this.dom.getBoundingClientRect(), i = this.info.getBoundingClientRect(), s = e.getBoundingClientRect(), r = this.space;
    if (!r) {
      let o = this.dom.ownerDocument.defaultView || window;
      r = { left: 0, top: 0, right: o.innerWidth, bottom: o.innerHeight };
    }
    return s.top > Math.min(r.bottom, t.bottom) - 10 || s.bottom < Math.max(r.top, t.top) + 10 ? null : this.view.state.facet(ke).positionInfo(this.view, t, s, i, r);
  }
  placeInfo(e) {
    this.info && (e ? (e.style && (this.info.style.cssText = e.style), this.info.className = "cm-tooltip cm-completionInfo " + (e.class || "")) : this.info.style.cssText = "top: -1e6px");
  }
  createListBox(e, t, i) {
    const s = document.createElement("ul");
    s.id = t, s.setAttribute("role", "listbox"), s.setAttribute("aria-expanded", "true"), s.setAttribute("aria-label", this.view.state.phrase("Completions"));
    let r = null;
    for (let o = i.from; o < i.to; o++) {
      let { completion: l, match: a } = e[o], { section: h } = l;
      if (h) {
        let u = typeof h == "string" ? h : h.name;
        if (u != r && (o > i.from || i.from == 0))
          if (r = u, typeof h != "string" && h.header)
            s.appendChild(h.header(h));
          else {
            let d = s.appendChild(document.createElement("completion-section"));
            d.textContent = u;
          }
      }
      const c = s.appendChild(document.createElement("li"));
      c.id = t + "-" + o, c.setAttribute("role", "option");
      let f = this.optionClass(l);
      f && (c.className = f);
      for (let u of this.optionContent) {
        let d = u(l, this.view.state, a);
        d && c.appendChild(d);
      }
    }
    return i.from && s.classList.add("cm-completionListIncompleteTop"), i.to < e.length && s.classList.add("cm-completionListIncompleteBottom"), s;
  }
  destroyInfo() {
    this.info && (this.infoDestroy && this.infoDestroy(), this.info.remove(), this.info = null);
  }
  destroy() {
    this.destroyInfo();
  }
}
function T1(n, e) {
  return (t) => new X1(t, n, e);
}
function Z1(n, e) {
  let t = n.getBoundingClientRect(), i = e.getBoundingClientRect();
  i.top < t.top ? n.scrollTop -= t.top - i.top : i.bottom > t.bottom && (n.scrollTop += i.bottom - t.bottom);
}
function Oh(n) {
  return (n.boost || 0) * 100 + (n.apply ? 10 : 0) + (n.info ? 5 : 0) + (n.type ? 1 : 0);
}
function R1(n, e) {
  let t = [], i = null, s = (a) => {
    t.push(a);
    let { section: h } = a.completion;
    if (h) {
      i || (i = []);
      let c = typeof h == "string" ? h : h.name;
      i.some((f) => f.name == c) || i.push(typeof h == "string" ? { name: c } : h);
    }
  };
  for (let a of n)
    if (a.hasResult()) {
      let h = a.result.getMatch;
      if (a.result.filter === !1)
        for (let c of a.result.options)
          s(new ch(c, a.source, h ? h(c) : [], 1e9 - t.length));
      else {
        let c = new v1(e.sliceDoc(a.from, a.to));
        for (let f of a.result.options)
          if (c.match(f.label)) {
            let u = f.displayLabel ? h ? h(f, c.matched) : [] : c.matched;
            s(new ch(f, a.source, u, c.score + (f.boost || 0)));
          }
      }
    }
  if (i) {
    let a = /* @__PURE__ */ Object.create(null), h = 0, c = (f, u) => {
      var d, O;
      return ((d = f.rank) !== null && d !== void 0 ? d : 1e9) - ((O = u.rank) !== null && O !== void 0 ? O : 1e9) || (f.name < u.name ? -1 : 1);
    };
    for (let f of i.sort(c))
      h -= 1e5, a[f.name] = h;
    for (let f of t) {
      let { section: u } = f.completion;
      u && (f.score += a[typeof u == "string" ? u : u.name]);
    }
  }
  let r = [], o = null, l = e.facet(ke).compareCompletions;
  for (let a of t.sort((h, c) => c.score - h.score || l(h.completion, c.completion))) {
    let h = a.completion;
    !o || o.label != h.label || o.detail != h.detail || o.type != null && h.type != null && o.type != h.type || o.apply != h.apply || o.boost != h.boost ? r.push(a) : Oh(a.completion) > Oh(o) && (r[r.length - 1] = a), o = a.completion;
  }
  return r;
}
class ti {
  constructor(e, t, i, s, r, o) {
    this.options = e, this.attrs = t, this.tooltip = i, this.timestamp = s, this.selected = r, this.disabled = o;
  }
  setSelected(e, t) {
    return e == this.selected || e >= this.options.length ? this : new ti(this.options, ph(t, e), this.tooltip, this.timestamp, e, this.disabled);
  }
  static build(e, t, i, s, r) {
    let o = R1(e, t);
    if (!o.length)
      return s && e.some(
        (a) => a.state == 1
        /* Pending */
      ) ? new ti(s.options, s.attrs, s.tooltip, s.timestamp, s.selected, !0) : null;
    let l = t.facet(ke).selectOnOpen ? 0 : -1;
    if (s && s.selected != l && s.selected != -1) {
      let a = s.options[s.selected].completion;
      for (let h = 0; h < o.length; h++)
        if (o[h].completion == a) {
          l = h;
          break;
        }
    }
    return new ti(o, ph(i, l), {
      pos: e.reduce((a, h) => h.hasResult() ? Math.min(a, h.from) : a, 1e8),
      create: T1(Xe, Wu),
      above: r.aboveCursor
    }, s ? s.timestamp : Date.now(), l, !1);
  }
  map(e) {
    return new ti(this.options, this.attrs, Object.assign(Object.assign({}, this.tooltip), { pos: e.mapPos(this.tooltip.pos) }), this.timestamp, this.selected, this.disabled);
  }
}
class xs {
  constructor(e, t, i) {
    this.active = e, this.id = t, this.open = i;
  }
  static start() {
    return new xs(Y1, "cm-ac-" + Math.floor(Math.random() * 2e6).toString(36), null);
  }
  update(e) {
    let { state: t } = e, i = t.facet(ke), r = (i.override || t.languageDataAt("autocomplete", kt(t)).map(k1)).map((l) => (this.active.find((h) => h.source == l) || new we(
      l,
      this.active.some(
        (h) => h.state != 0
        /* Inactive */
      ) ? 1 : 0
      /* Inactive */
    )).update(e, i));
    r.length == this.active.length && r.every((l, a) => l == this.active[a]) && (r = this.active);
    let o = this.open;
    o && e.docChanged && (o = o.map(e.changes)), e.selection || r.some((l) => l.hasResult() && e.changes.touchesRange(l.from, l.to)) || !A1(r, this.active) ? o = ti.build(r, t, this.id, o, i) : o && o.disabled && !r.some(
      (l) => l.state == 1
      /* Pending */
    ) && (o = null), !o && r.every(
      (l) => l.state != 1
      /* Pending */
    ) && r.some((l) => l.hasResult()) && (r = r.map((l) => l.hasResult() ? new we(
      l.source,
      0
      /* Inactive */
    ) : l));
    for (let l of e.effects)
      l.is(Mu) && (o = o && o.setSelected(l.value, this.id));
    return r == this.active && o == this.open ? this : new xs(r, this.id, o);
  }
  get tooltip() {
    return this.open ? this.open.tooltip : null;
  }
  get attrs() {
    return this.open ? this.open.attrs : V1;
  }
}
function A1(n, e) {
  if (n == e)
    return !0;
  for (let t = 0, i = 0; ; ) {
    for (; t < n.length && !n[t].hasResult; )
      t++;
    for (; i < e.length && !e[i].hasResult; )
      i++;
    let s = t == n.length, r = i == e.length;
    if (s || r)
      return s == r;
    if (n[t++].result != e[i++].result)
      return !1;
  }
}
const V1 = {
  "aria-autocomplete": "list"
};
function ph(n, e) {
  let t = {
    "aria-autocomplete": "list",
    "aria-haspopup": "listbox",
    "aria-controls": n
  };
  return e > -1 && (t["aria-activedescendant"] = n + "-" + e), t;
}
const Y1 = [];
function wo(n) {
  return n.isUserEvent("input.type") ? "input" : n.isUserEvent("delete.backward") ? "delete" : null;
}
class we {
  constructor(e, t, i = -1) {
    this.source = e, this.state = t, this.explicitPos = i;
  }
  hasResult() {
    return !1;
  }
  update(e, t) {
    let i = wo(e), s = this;
    i ? s = s.handleUserEvent(e, i, t) : e.docChanged ? s = s.handleChange(e) : e.selection && s.state != 0 && (s = new we(
      s.source,
      0
      /* Inactive */
    ));
    for (let r of e.effects)
      if (r.is(Ko))
        s = new we(s.source, 1, r.value ? kt(e.state) : -1);
      else if (r.is(Ji))
        s = new we(
          s.source,
          0
          /* Inactive */
        );
      else if (r.is(Yu))
        for (let o of r.value)
          o.source == s.source && (s = o);
    return s;
  }
  handleUserEvent(e, t, i) {
    return t == "delete" || !i.activateOnTyping ? this.map(e.changes) : new we(
      this.source,
      1
      /* Pending */
    );
  }
  handleChange(e) {
    return e.changes.touchesRange(kt(e.startState)) ? new we(
      this.source,
      0
      /* Inactive */
    ) : this.map(e.changes);
  }
  map(e) {
    return e.empty || this.explicitPos < 0 ? this : new we(this.source, this.state, e.mapPos(this.explicitPos));
  }
}
class ai extends we {
  constructor(e, t, i, s, r) {
    super(e, 2, t), this.result = i, this.from = s, this.to = r;
  }
  hasResult() {
    return !0;
  }
  handleUserEvent(e, t, i) {
    var s;
    let r = e.changes.mapPos(this.from), o = e.changes.mapPos(this.to, 1), l = kt(e.state);
    if ((this.explicitPos < 0 ? l <= r : l < this.from) || l > o || t == "delete" && kt(e.startState) == this.from)
      return new we(
        this.source,
        t == "input" && i.activateOnTyping ? 1 : 0
        /* Inactive */
      );
    let a = this.explicitPos < 0 ? -1 : e.changes.mapPos(this.explicitPos), h;
    return M1(this.result.validFor, e.state, r, o) ? new ai(this.source, a, this.result, r, o) : this.result.update && (h = this.result.update(this.result, r, o, new Zu(e.state, l, a >= 0))) ? new ai(this.source, a, h, h.from, (s = h.to) !== null && s !== void 0 ? s : kt(e.state)) : new we(this.source, 1, a);
  }
  handleChange(e) {
    return e.changes.touchesRange(this.from, this.to) ? new we(
      this.source,
      0
      /* Inactive */
    ) : this.map(e.changes);
  }
  map(e) {
    return e.empty ? this : new ai(this.source, this.explicitPos < 0 ? -1 : e.mapPos(this.explicitPos), this.result, e.mapPos(this.from), e.mapPos(this.to, 1));
  }
}
function M1(n, e, t, i) {
  if (!n)
    return !1;
  let s = e.sliceDoc(t, i);
  return typeof n == "function" ? n(s, t, i, e) : Au(n, !0).test(s);
}
const Yu = /* @__PURE__ */ R.define({
  map(n, e) {
    return n.map((t) => t.map(e));
  }
}), Mu = /* @__PURE__ */ R.define(), Xe = /* @__PURE__ */ re.define({
  create() {
    return xs.start();
  },
  update(n, e) {
    return n.update(e);
  },
  provide: (n) => [
    Do.from(n, (e) => e.tooltip),
    k.contentAttributes.from(n, (e) => e.attrs)
  ]
});
function Wu(n, e) {
  const t = e.completion.apply || e.completion.label;
  let i = n.state.field(Xe).active.find((s) => s.source == e.source);
  return i instanceof ai ? (typeof t == "string" ? n.dispatch(Object.assign(Object.assign({}, $1(n.state, t, i.from, i.to)), { annotations: Vu.of(e.completion) })) : t(n, e.completion, i.from, i.to), !0) : !1;
}
function Zn(n, e = "option") {
  return (t) => {
    let i = t.state.field(Xe, !1);
    if (!i || !i.open || i.open.disabled || Date.now() - i.open.timestamp < t.state.facet(ke).interactionDelay)
      return !1;
    let s = 1, r;
    e == "page" && (r = lf(t, i.open.tooltip)) && (s = Math.max(2, Math.floor(r.dom.offsetHeight / r.dom.querySelector("li").offsetHeight) - 1));
    let { length: o } = i.open.options, l = i.open.selected > -1 ? i.open.selected + s * (n ? 1 : -1) : n ? 0 : o - 1;
    return l < 0 ? l = e == "page" ? 0 : o - 1 : l >= o && (l = e == "page" ? o - 1 : 0), t.dispatch({ effects: Mu.of(l) }), !0;
  };
}
const W1 = (n) => {
  let e = n.state.field(Xe, !1);
  return n.state.readOnly || !e || !e.open || e.open.selected < 0 || e.open.disabled || Date.now() - e.open.timestamp < n.state.facet(ke).interactionDelay ? !1 : Wu(n, e.open.options[e.open.selected]);
}, D1 = (n) => n.state.field(Xe, !1) ? (n.dispatch({ effects: Ko.of(!0) }), !0) : !1, U1 = (n) => {
  let e = n.state.field(Xe, !1);
  return !e || !e.active.some(
    (t) => t.state != 0
    /* Inactive */
  ) ? !1 : (n.dispatch({ effects: Ji.of(null) }), !0);
};
class q1 {
  constructor(e, t) {
    this.active = e, this.context = t, this.time = Date.now(), this.updates = [], this.done = void 0;
  }
}
const gh = 50, E1 = 50, _1 = 1e3, B1 = /* @__PURE__ */ ee.fromClass(class {
  constructor(n) {
    this.view = n, this.debounceUpdate = -1, this.running = [], this.debounceAccept = -1, this.composing = 0;
    for (let e of n.state.field(Xe).active)
      e.state == 1 && this.startQuery(e);
  }
  update(n) {
    let e = n.state.field(Xe);
    if (!n.selectionSet && !n.docChanged && n.startState.field(Xe) == e)
      return;
    let t = n.transactions.some((i) => (i.selection || i.docChanged) && !wo(i));
    for (let i = 0; i < this.running.length; i++) {
      let s = this.running[i];
      if (t || s.updates.length + n.transactions.length > E1 && Date.now() - s.time > _1) {
        for (let r of s.context.abortListeners)
          try {
            r();
          } catch (o) {
            Ae(this.view.state, o);
          }
        s.context.abortListeners = null, this.running.splice(i--, 1);
      } else
        s.updates.push(...n.transactions);
    }
    if (this.debounceUpdate > -1 && clearTimeout(this.debounceUpdate), this.debounceUpdate = e.active.some((i) => i.state == 1 && !this.running.some((s) => s.active.source == i.source)) ? setTimeout(() => this.startUpdate(), gh) : -1, this.composing != 0)
      for (let i of n.transactions)
        wo(i) == "input" ? this.composing = 2 : this.composing == 2 && i.selection && (this.composing = 3);
  }
  startUpdate() {
    this.debounceUpdate = -1;
    let { state: n } = this.view, e = n.field(Xe);
    for (let t of e.active)
      t.state == 1 && !this.running.some((i) => i.active.source == t.source) && this.startQuery(t);
  }
  startQuery(n) {
    let { state: e } = this.view, t = kt(e), i = new Zu(e, t, n.explicitPos == t), s = new q1(n, i);
    this.running.push(s), Promise.resolve(n.source(i)).then((r) => {
      s.context.aborted || (s.done = r || null, this.scheduleAccept());
    }, (r) => {
      this.view.dispatch({ effects: Ji.of(null) }), Ae(this.view.state, r);
    });
  }
  scheduleAccept() {
    this.running.every((n) => n.done !== void 0) ? this.accept() : this.debounceAccept < 0 && (this.debounceAccept = setTimeout(() => this.accept(), gh));
  }
  // For each finished query in this.running, try to create a result
  // or, if appropriate, restart the query.
  accept() {
    var n;
    this.debounceAccept > -1 && clearTimeout(this.debounceAccept), this.debounceAccept = -1;
    let e = [], t = this.view.state.facet(ke);
    for (let i = 0; i < this.running.length; i++) {
      let s = this.running[i];
      if (s.done === void 0)
        continue;
      if (this.running.splice(i--, 1), s.done) {
        let o = new ai(s.active.source, s.active.explicitPos, s.done, s.done.from, (n = s.done.to) !== null && n !== void 0 ? n : kt(s.updates.length ? s.updates[0].startState : this.view.state));
        for (let l of s.updates)
          o = o.update(l, t);
        if (o.hasResult()) {
          e.push(o);
          continue;
        }
      }
      let r = this.view.state.field(Xe).active.find((o) => o.source == s.active.source);
      if (r && r.state == 1)
        if (s.done == null) {
          let o = new we(
            s.active.source,
            0
            /* Inactive */
          );
          for (let l of s.updates)
            o = o.update(l, t);
          o.state != 1 && e.push(o);
        } else
          this.startQuery(r);
    }
    e.length && this.view.dispatch({ effects: Yu.of(e) });
  }
}, {
  eventHandlers: {
    blur(n) {
      let e = this.view.state.field(Xe, !1);
      if (e && e.tooltip && this.view.state.facet(ke).closeOnBlur) {
        let t = e.open && lf(this.view, e.open.tooltip);
        (!t || !t.dom.contains(n.relatedTarget)) && this.view.dispatch({ effects: Ji.of(null) });
      }
    },
    compositionstart() {
      this.composing = 1;
    },
    compositionend() {
      this.composing == 3 && setTimeout(() => this.view.dispatch({ effects: Ko.of(!1) }), 20), this.composing = 0;
    }
  }
}), Du = /* @__PURE__ */ k.baseTheme({
  ".cm-tooltip.cm-tooltip-autocomplete": {
    "& > ul": {
      fontFamily: "monospace",
      whiteSpace: "nowrap",
      overflow: "hidden auto",
      maxWidth_fallback: "700px",
      maxWidth: "min(700px, 95vw)",
      minWidth: "250px",
      maxHeight: "10em",
      height: "100%",
      listStyle: "none",
      margin: 0,
      padding: 0,
      "& > li, & > completion-section": {
        padding: "1px 3px",
        lineHeight: 1.2
      },
      "& > li": {
        overflowX: "hidden",
        textOverflow: "ellipsis",
        cursor: "pointer"
      },
      "& > completion-section": {
        display: "list-item",
        borderBottom: "1px solid silver",
        paddingLeft: "0.5em",
        opacity: 0.7
      }
    }
  },
  "&light .cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "#17c",
    color: "white"
  },
  "&light .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
    background: "#777"
  },
  "&dark .cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "#347",
    color: "white"
  },
  "&dark .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
    background: "#444"
  },
  ".cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after": {
    content: '"···"',
    opacity: 0.5,
    display: "block",
    textAlign: "center"
  },
  ".cm-tooltip.cm-completionInfo": {
    position: "absolute",
    padding: "3px 9px",
    width: "max-content",
    maxWidth: "400px",
    boxSizing: "border-box"
  },
  ".cm-completionInfo.cm-completionInfo-left": { right: "100%" },
  ".cm-completionInfo.cm-completionInfo-right": { left: "100%" },
  ".cm-completionInfo.cm-completionInfo-left-narrow": { right: "30px" },
  ".cm-completionInfo.cm-completionInfo-right-narrow": { left: "30px" },
  "&light .cm-snippetField": { backgroundColor: "#00000022" },
  "&dark .cm-snippetField": { backgroundColor: "#ffffff22" },
  ".cm-snippetFieldPosition": {
    verticalAlign: "text-top",
    width: 0,
    height: "1.15em",
    display: "inline-block",
    margin: "0 -0.7px -.7em",
    borderLeft: "1.4px dotted #888"
  },
  ".cm-completionMatchedText": {
    textDecoration: "underline"
  },
  ".cm-completionDetail": {
    marginLeft: "0.5em",
    fontStyle: "italic"
  },
  ".cm-completionIcon": {
    fontSize: "90%",
    width: ".8em",
    display: "inline-block",
    textAlign: "center",
    paddingRight: ".6em",
    opacity: "0.6",
    boxSizing: "content-box"
  },
  ".cm-completionIcon-function, .cm-completionIcon-method": {
    "&:after": { content: "'ƒ'" }
  },
  ".cm-completionIcon-class": {
    "&:after": { content: "'○'" }
  },
  ".cm-completionIcon-interface": {
    "&:after": { content: "'◌'" }
  },
  ".cm-completionIcon-variable": {
    "&:after": { content: "'𝑥'" }
  },
  ".cm-completionIcon-constant": {
    "&:after": { content: "'𝐶'" }
  },
  ".cm-completionIcon-type": {
    "&:after": { content: "'𝑡'" }
  },
  ".cm-completionIcon-enum": {
    "&:after": { content: "'∪'" }
  },
  ".cm-completionIcon-property": {
    "&:after": { content: "'□'" }
  },
  ".cm-completionIcon-keyword": {
    "&:after": { content: "'🔑︎'" }
    // Disable emoji rendering
  },
  ".cm-completionIcon-namespace": {
    "&:after": { content: "'▢'" }
  },
  ".cm-completionIcon-text": {
    "&:after": { content: "'abc'", fontSize: "50%", verticalAlign: "middle" }
  }
});
class z1 {
  constructor(e, t, i, s) {
    this.field = e, this.line = t, this.from = i, this.to = s;
  }
}
class el {
  constructor(e, t, i) {
    this.field = e, this.from = t, this.to = i;
  }
  map(e) {
    let t = e.mapPos(this.from, -1, ce.TrackDel), i = e.mapPos(this.to, 1, ce.TrackDel);
    return t == null || i == null ? null : new el(this.field, t, i);
  }
}
class tl {
  constructor(e, t) {
    this.lines = e, this.fieldPositions = t;
  }
  instantiate(e, t) {
    let i = [], s = [t], r = e.doc.lineAt(t), o = /^\s*/.exec(r.text)[0];
    for (let a of this.lines) {
      if (i.length) {
        let h = o, c = /^\t*/.exec(a)[0].length;
        for (let f = 0; f < c; f++)
          h += e.facet(Ms);
        s.push(t + h.length - c), a = h + a.slice(c);
      }
      i.push(a), t += a.length + 1;
    }
    let l = this.fieldPositions.map((a) => new el(a.field, s[a.line] + a.from, s[a.line] + a.to));
    return { text: i, ranges: l };
  }
  static parse(e) {
    let t = [], i = [], s = [], r;
    for (let o of e.split(/\r\n?|\n/)) {
      for (; r = /[#$]\{(?:(\d+)(?::([^}]*))?|([^}]*))\}/.exec(o); ) {
        let l = r[1] ? +r[1] : null, a = r[2] || r[3] || "", h = -1;
        for (let c = 0; c < t.length; c++)
          (l != null ? t[c].seq == l : a && t[c].name == a) && (h = c);
        if (h < 0) {
          let c = 0;
          for (; c < t.length && (l == null || t[c].seq != null && t[c].seq < l); )
            c++;
          t.splice(c, 0, { seq: l, name: a }), h = c;
          for (let f of s)
            f.field >= h && f.field++;
        }
        s.push(new z1(h, i.length, r.index, r.index + a.length)), o = o.slice(0, r.index) + a + o.slice(r.index + r[0].length);
      }
      for (let l; l = /\\([{}])/.exec(o); ) {
        o = o.slice(0, l.index) + l[1] + o.slice(l.index + l[0].length);
        for (let a of s)
          a.line == i.length && a.from > l.index && (a.from--, a.to--);
      }
      i.push(o);
    }
    return new tl(i, s);
  }
}
let I1 = /* @__PURE__ */ T.widget({ widget: /* @__PURE__ */ new class extends St {
  toDOM() {
    let n = document.createElement("span");
    return n.className = "cm-snippetFieldPosition", n;
  }
  ignoreEvent() {
    return !1;
  }
}() }), j1 = /* @__PURE__ */ T.mark({ class: "cm-snippetField" });
class Qi {
  constructor(e, t) {
    this.ranges = e, this.active = t, this.deco = T.set(e.map((i) => (i.from == i.to ? I1 : j1).range(i.from, i.to)));
  }
  map(e) {
    let t = [];
    for (let i of this.ranges) {
      let s = i.map(e);
      if (!s)
        return null;
      t.push(s);
    }
    return new Qi(t, this.active);
  }
  selectionInsideField(e) {
    return e.ranges.every((t) => this.ranges.some((i) => i.field == this.active && i.from <= t.from && i.to >= t.to));
  }
}
const cn = /* @__PURE__ */ R.define({
  map(n, e) {
    return n && n.map(e);
  }
}), L1 = /* @__PURE__ */ R.define(), Ki = /* @__PURE__ */ re.define({
  create() {
    return null;
  },
  update(n, e) {
    for (let t of e.effects) {
      if (t.is(cn))
        return t.value;
      if (t.is(L1) && n)
        return new Qi(n.ranges, t.value);
    }
    return n && e.docChanged && (n = n.map(e.changes)), n && e.selection && !n.selectionInsideField(e.selection) && (n = null), n;
  },
  provide: (n) => k.decorations.from(n, (e) => e ? e.deco : T.none)
});
function il(n, e) {
  return y.create(n.filter((t) => t.field == e).map((t) => y.range(t.from, t.to)));
}
function N1(n) {
  let e = tl.parse(n);
  return (t, i, s, r) => {
    let { text: o, ranges: l } = e.instantiate(t.state, s), a = {
      changes: { from: s, to: r, insert: W.of(o) },
      scrollIntoView: !0,
      annotations: i ? Vu.of(i) : void 0
    };
    if (l.length && (a.selection = il(l, 0)), l.length > 1) {
      let h = new Qi(l, 0), c = a.effects = [cn.of(h)];
      t.state.field(Ki, !1) === void 0 && c.push(R.appendConfig.of([Ki, K1, ey, Du]));
    }
    t.dispatch(t.state.update(a));
  };
}
function Uu(n) {
  return ({ state: e, dispatch: t }) => {
    let i = e.field(Ki, !1);
    if (!i || n < 0 && i.active == 0)
      return !1;
    let s = i.active + n, r = n > 0 && !i.ranges.some((o) => o.field == s + n);
    return t(e.update({
      selection: il(i.ranges, s),
      effects: cn.of(r ? null : new Qi(i.ranges, s))
    })), !0;
  };
}
const G1 = ({ state: n, dispatch: e }) => n.field(Ki, !1) ? (e(n.update({ effects: cn.of(null) })), !0) : !1, F1 = /* @__PURE__ */ Uu(1), H1 = /* @__PURE__ */ Uu(-1), J1 = [
  { key: "Tab", run: F1, shift: H1 },
  { key: "Escape", run: G1 }
], mh = /* @__PURE__ */ P.define({
  combine(n) {
    return n.length ? n[0] : J1;
  }
}), K1 = /* @__PURE__ */ jt.highest(/* @__PURE__ */ on.compute([mh], (n) => n.facet(mh)));
function _e(n, e) {
  return Object.assign(Object.assign({}, e), { apply: N1(n) });
}
const ey = /* @__PURE__ */ k.domEventHandlers({
  mousedown(n, e) {
    let t = e.state.field(Ki, !1), i;
    if (!t || (i = e.posAtCoords({ x: n.clientX, y: n.clientY })) == null)
      return !1;
    let s = t.ranges.find((r) => r.from <= i && r.to >= i);
    return !s || s.field == t.active ? !1 : (e.dispatch({
      selection: il(t.ranges, s.field),
      effects: cn.of(t.ranges.some((r) => r.field > s.field) ? new Qi(t.ranges, s.field) : null)
    }), !0);
  }
}), en = {
  brackets: ["(", "[", "{", "'", '"'],
  before: ")]}:;>",
  stringPrefixes: []
}, qt = /* @__PURE__ */ R.define({
  map(n, e) {
    let t = e.mapPos(n, -1, ce.TrackAfter);
    return t ?? void 0;
  }
}), nl = /* @__PURE__ */ new class extends Bt {
}();
nl.startSide = 1;
nl.endSide = -1;
const qu = /* @__PURE__ */ re.define({
  create() {
    return D.empty;
  },
  update(n, e) {
    if (e.selection) {
      let t = e.state.doc.lineAt(e.selection.main.head).from, i = e.startState.doc.lineAt(e.startState.selection.main.head).from;
      t != e.changes.mapPos(i, -1) && (n = D.empty);
    }
    n = n.map(e.changes);
    for (let t of e.effects)
      t.is(qt) && (n = n.update({ add: [nl.range(t.value, t.value + 1)] }));
    return n;
  }
});
function ty() {
  return [ny, qu];
}
const Qr = "()[]{}<>";
function Eu(n) {
  for (let e = 0; e < Qr.length; e += 2)
    if (Qr.charCodeAt(e) == n)
      return Qr.charAt(e + 1);
  return Co(n < 128 ? n : n + 1);
}
function _u(n, e) {
  return n.languageDataAt("closeBrackets", e)[0] || en;
}
const iy = typeof navigator == "object" && /* @__PURE__ */ /Android\b/.test(navigator.userAgent), ny = /* @__PURE__ */ k.inputHandler.of((n, e, t, i) => {
  if ((iy ? n.composing : n.compositionStarted) || n.state.readOnly)
    return !1;
  let s = n.state.selection.main;
  if (i.length > 2 || i.length == 2 && Ye(ae(i, 0)) == 1 || e != s.from || t != s.to)
    return !1;
  let r = oy(n.state, i);
  return r ? (n.dispatch(r), !0) : !1;
}), sy = ({ state: n, dispatch: e }) => {
  if (n.readOnly)
    return !1;
  let i = _u(n, n.selection.main.head).brackets || en.brackets, s = null, r = n.changeByRange((o) => {
    if (o.empty) {
      let l = ly(n.doc, o.head);
      for (let a of i)
        if (a == l && js(n.doc, o.head) == Eu(ae(a, 0)))
          return {
            changes: { from: o.head - a.length, to: o.head + a.length },
            range: y.cursor(o.head - a.length)
          };
    }
    return { range: s = o };
  });
  return s || e(n.update(r, { scrollIntoView: !0, userEvent: "delete.backward" })), !s;
}, ry = [
  { key: "Backspace", run: sy }
];
function oy(n, e) {
  let t = _u(n, n.selection.main.head), i = t.brackets || en.brackets;
  for (let s of i) {
    let r = Eu(ae(s, 0));
    if (e == s)
      return r == s ? cy(n, s, i.indexOf(s + s + s) > -1, t) : ay(n, s, r, t.before || en.before);
    if (e == r && Bu(n, n.selection.main.from))
      return hy(n, s, r);
  }
  return null;
}
function Bu(n, e) {
  let t = !1;
  return n.field(qu).between(0, n.doc.length, (i) => {
    i == e && (t = !0);
  }), t;
}
function js(n, e) {
  let t = n.sliceString(e, e + 2);
  return t.slice(0, Ye(ae(t, 0)));
}
function ly(n, e) {
  let t = n.sliceString(e - 2, e);
  return Ye(ae(t, 0)) == t.length ? t : t.slice(1);
}
function ay(n, e, t, i) {
  let s = null, r = n.changeByRange((o) => {
    if (!o.empty)
      return {
        changes: [{ insert: e, from: o.from }, { insert: t, from: o.to }],
        effects: qt.of(o.to + e.length),
        range: y.range(o.anchor + e.length, o.head + e.length)
      };
    let l = js(n.doc, o.head);
    return !l || /\s/.test(l) || i.indexOf(l) > -1 ? {
      changes: { insert: e + t, from: o.head },
      effects: qt.of(o.head + e.length),
      range: y.cursor(o.head + e.length)
    } : { range: s = o };
  });
  return s ? null : n.update(r, {
    scrollIntoView: !0,
    userEvent: "input.type"
  });
}
function hy(n, e, t) {
  let i = null, s = n.changeByRange((r) => r.empty && js(n.doc, r.head) == t ? {
    changes: { from: r.head, to: r.head + t.length, insert: t },
    range: y.cursor(r.head + t.length)
  } : i = { range: r });
  return i ? null : n.update(s, {
    scrollIntoView: !0,
    userEvent: "input.type"
  });
}
function cy(n, e, t, i) {
  let s = i.stringPrefixes || en.stringPrefixes, r = null, o = n.changeByRange((l) => {
    if (!l.empty)
      return {
        changes: [{ insert: e, from: l.from }, { insert: e, from: l.to }],
        effects: qt.of(l.to + e.length),
        range: y.range(l.anchor + e.length, l.head + e.length)
      };
    let a = l.head, h = js(n.doc, a), c;
    if (h == e) {
      if (Sh(n, a))
        return {
          changes: { insert: e + e, from: a },
          effects: qt.of(a + e.length),
          range: y.cursor(a + e.length)
        };
      if (Bu(n, a)) {
        let u = t && n.sliceDoc(a, a + e.length * 3) == e + e + e ? e + e + e : e;
        return {
          changes: { from: a, to: a + u.length, insert: u },
          range: y.cursor(a + u.length)
        };
      }
    } else {
      if (t && n.sliceDoc(a - 2 * e.length, a) == e + e && (c = yh(n, a - 2 * e.length, s)) > -1 && Sh(n, c))
        return {
          changes: { insert: e + e + e + e, from: a },
          effects: qt.of(a + e.length),
          range: y.cursor(a + e.length)
        };
      if (n.charCategorizer(a)(h) != j.Word && yh(n, a, s) > -1 && !fy(n, a, e, s))
        return {
          changes: { insert: e + e, from: a },
          effects: qt.of(a + e.length),
          range: y.cursor(a + e.length)
        };
    }
    return { range: r = l };
  });
  return r ? null : n.update(o, {
    scrollIntoView: !0,
    userEvent: "input.type"
  });
}
function Sh(n, e) {
  let t = I(n).resolveInner(e + 1);
  return t.parent && t.from == e;
}
function fy(n, e, t, i) {
  let s = I(n).resolveInner(e, -1), r = i.reduce((o, l) => Math.max(o, l.length), 0);
  for (let o = 0; o < 5; o++) {
    let l = n.sliceDoc(s.from, Math.min(s.to, s.from + t.length + r)), a = l.indexOf(t);
    if (!a || a > -1 && i.indexOf(l.slice(0, a)) > -1) {
      let c = s.firstChild;
      for (; c && c.from == s.from && c.to - c.from > t.length + a; ) {
        if (n.sliceDoc(c.to - t.length, c.to) == t)
          return !1;
        c = c.firstChild;
      }
      return !0;
    }
    let h = s.to == e && s.parent;
    if (!h)
      break;
    s = h;
  }
  return !1;
}
function yh(n, e, t) {
  let i = n.charCategorizer(e);
  if (i(n.sliceDoc(e - 1, e)) != j.Word)
    return e;
  for (let s of t) {
    let r = e - s.length;
    if (n.sliceDoc(r, e) == s && i(n.sliceDoc(r - 1, r)) != j.Word)
      return r;
  }
  return -1;
}
function uy(n = {}) {
  return [
    Xe,
    ke.of(n),
    B1,
    dy,
    Du
  ];
}
const zu = [
  { key: "Ctrl-Space", run: D1 },
  { key: "Escape", run: U1 },
  { key: "ArrowDown", run: /* @__PURE__ */ Zn(!0) },
  { key: "ArrowUp", run: /* @__PURE__ */ Zn(!1) },
  { key: "PageDown", run: /* @__PURE__ */ Zn(!0, "page") },
  { key: "PageUp", run: /* @__PURE__ */ Zn(!1, "page") },
  { key: "Enter", run: W1 }
], dy = /* @__PURE__ */ jt.highest(/* @__PURE__ */ on.computeN([ke], (n) => n.facet(ke).defaultKeymap ? [zu] : [])), Oy = [
  /* @__PURE__ */ _e("function ${name}(${params}) {\n	${}\n}", {
    label: "function",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ _e("for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n	${}\n}", {
    label: "for",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ _e("for (let ${name} of ${collection}) {\n	${}\n}", {
    label: "for",
    detail: "of loop",
    type: "keyword"
  }),
  /* @__PURE__ */ _e("do {\n	${}\n} while (${})", {
    label: "do",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ _e("while (${}) {\n	${}\n}", {
    label: "while",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ _e(`try {
	\${}
} catch (\${error}) {
	\${}
}`, {
    label: "try",
    detail: "/ catch block",
    type: "keyword"
  }),
  /* @__PURE__ */ _e("if (${}) {\n	${}\n}", {
    label: "if",
    detail: "block",
    type: "keyword"
  }),
  /* @__PURE__ */ _e(`if (\${}) {
	\${}
} else {
	\${}
}`, {
    label: "if",
    detail: "/ else block",
    type: "keyword"
  }),
  /* @__PURE__ */ _e(`class \${name} {
	constructor(\${params}) {
		\${}
	}
}`, {
    label: "class",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ _e('import {${names}} from "${module}"\n${}', {
    label: "import",
    detail: "named",
    type: "keyword"
  }),
  /* @__PURE__ */ _e('import ${name} from "${module}"\n${}', {
    label: "import",
    detail: "default",
    type: "keyword"
  })
], bh = /* @__PURE__ */ new Of(), Iu = /* @__PURE__ */ new Set([
  "Script",
  "Block",
  "FunctionExpression",
  "FunctionDeclaration",
  "ArrowFunction",
  "MethodDeclaration",
  "ForStatement"
]);
function Ci(n) {
  return (e, t) => {
    let i = e.node.getChild("VariableDefinition");
    return i && t(i, n), !0;
  };
}
const py = ["FunctionDeclaration"], gy = {
  FunctionDeclaration: /* @__PURE__ */ Ci("function"),
  ClassDeclaration: /* @__PURE__ */ Ci("class"),
  ClassExpression: () => !0,
  EnumDeclaration: /* @__PURE__ */ Ci("constant"),
  TypeAliasDeclaration: /* @__PURE__ */ Ci("type"),
  NamespaceDeclaration: /* @__PURE__ */ Ci("namespace"),
  VariableDefinition(n, e) {
    n.matchContext(py) || e(n, "variable");
  },
  TypeDefinition(n, e) {
    e(n, "type");
  },
  __proto__: null
};
function ju(n, e) {
  let t = bh.get(e);
  if (t)
    return t;
  let i = [], s = !0;
  function r(o, l) {
    let a = n.sliceString(o.from, o.to);
    i.push({ label: a, type: l });
  }
  return e.cursor(E.IncludeAnonymous).iterate((o) => {
    if (s)
      s = !1;
    else if (o.name) {
      let l = gy[o.name];
      if (l && l(o, r) || Iu.has(o.name))
        return !1;
    } else if (o.to - o.from > 8192) {
      for (let l of ju(n, o.node))
        i.push(l);
      return !1;
    }
  }), bh.set(e, i), i;
}
const Qh = /^[\w$\xa1-\uffff][\w$\d\xa1-\uffff]*$/, Lu = [
  "TemplateString",
  "String",
  "RegExp",
  "LineComment",
  "BlockComment",
  "VariableDefinition",
  "TypeDefinition",
  "Label",
  "PropertyDefinition",
  "PropertyName",
  "PrivatePropertyDefinition",
  "PrivatePropertyName",
  ".",
  "?."
];
function my(n) {
  let e = I(n.state).resolveInner(n.pos, -1);
  if (Lu.indexOf(e.name) > -1)
    return null;
  let t = e.name == "VariableName" || e.to - e.from < 20 && Qh.test(n.state.sliceDoc(e.from, e.to));
  if (!t && !n.explicit)
    return null;
  let i = [];
  for (let s = e; s; s = s.parent)
    Iu.has(s.name) && (i = i.concat(ju(n.state.doc, s)));
  return {
    options: i,
    from: t ? e.from : n.pos,
    validFor: Qh
  };
}
const Ot = /* @__PURE__ */ di.define({
  name: "javascript",
  parser: /* @__PURE__ */ Q1.configure({
    props: [
      /* @__PURE__ */ Ds.add({
        IfStatement: /* @__PURE__ */ In({ except: /^\s*({|else\b)/ }),
        TryStatement: /* @__PURE__ */ In({ except: /^\s*({|catch\b|finally\b)/ }),
        LabeledStatement: Hg,
        SwitchBody: (n) => {
          let e = n.textAfter, t = /^\s*\}/.test(e), i = /^\s*(case|default)\b/.test(e);
          return n.baseIndent + (t ? 0 : i ? 1 : 2) * n.unit;
        },
        Block: /* @__PURE__ */ Fg({ closing: "}" }),
        ArrowFunction: (n) => n.baseIndent + n.unit,
        "TemplateString BlockComment": () => null,
        "Statement Property": /* @__PURE__ */ In({ except: /^{/ }),
        JSXElement(n) {
          let e = /^\s*<\//.test(n.textAfter);
          return n.lineIndent(n.node.from) + (e ? 0 : n.unit);
        },
        JSXEscape(n) {
          let e = /\s*\}/.test(n.textAfter);
          return n.lineIndent(n.node.from) + (e ? 0 : n.unit);
        },
        "JSXOpenTag JSXSelfClosingTag"(n) {
          return n.column(n.node.from) + n.unit;
        }
      }),
      /* @__PURE__ */ Us.add({
        "Block ClassBody SwitchBody EnumBody ObjectExpression ArrayExpression ObjectType": xf,
        BlockComment(n) {
          return { from: n.from + 2, to: n.to - 2 };
        }
      })
    ]
  }),
  languageData: {
    closeBrackets: { brackets: ["(", "[", "{", "'", '"', "`"] },
    commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
    indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/,
    wordChars: "$"
  }
}), Nu = {
  test: (n) => /^JSX/.test(n.name),
  facet: /* @__PURE__ */ Sf({ commentTokens: { block: { open: "{/*", close: "*/}" } } })
}, Gu = /* @__PURE__ */ Ot.configure({ dialect: "ts" }, "typescript"), Fu = /* @__PURE__ */ Ot.configure({
  dialect: "jsx",
  props: [/* @__PURE__ */ zo.add((n) => n.isTop ? [Nu] : void 0)]
}), Hu = /* @__PURE__ */ Ot.configure({
  dialect: "jsx ts",
  props: [/* @__PURE__ */ zo.add((n) => n.isTop ? [Nu] : void 0)]
}, "typescript"), Sy = /* @__PURE__ */ "break case const continue default delete export extends false finally in instanceof let new return static super switch this throw true typeof var yield".split(" ").map((n) => ({ label: n, type: "keyword" }));
function yy(n = {}) {
  let e = n.jsx ? n.typescript ? Hu : Fu : n.typescript ? Gu : Ot;
  return new Io(e, [
    Ot.data.of({
      autocomplete: w1(Lu, Ru(Oy.concat(Sy)))
    }),
    Ot.data.of({
      autocomplete: my
    }),
    n.jsx ? wy : []
  ]);
}
function by(n) {
  for (; ; ) {
    if (n.name == "JSXOpenTag" || n.name == "JSXSelfClosingTag" || n.name == "JSXFragmentTag")
      return n;
    if (n.name == "JSXEscape" || !n.parent)
      return null;
    n = n.parent;
  }
}
function xh(n, e, t = n.length) {
  for (let i = e == null ? void 0 : e.firstChild; i; i = i.nextSibling)
    if (i.name == "JSXIdentifier" || i.name == "JSXBuiltin" || i.name == "JSXNamespacedName" || i.name == "JSXMemberExpression")
      return n.sliceString(i.from, Math.min(i.to, t));
  return "";
}
function Qy(n) {
  return n && (n.name == "JSXEndTag" || n.name == "JSXSelfCloseEndTag");
}
const xy = typeof navigator == "object" && /* @__PURE__ */ /Android\b/.test(navigator.userAgent), wy = /* @__PURE__ */ k.inputHandler.of((n, e, t, i) => {
  if ((xy ? n.composing : n.compositionStarted) || n.state.readOnly || e != t || i != ">" && i != "/" || !Ot.isActiveAt(n.state, e, -1))
    return !1;
  let { state: s } = n, r = s.changeByRange((o) => {
    var l;
    let { head: a } = o, h = I(s).resolveInner(a, -1), c;
    if (h.name == "JSXStartTag" && (h = h.parent), !(h.name == "JSXAttributeValue" && h.to > a)) {
      if (i == ">" && h.name == "JSXFragmentTag")
        return { range: y.cursor(a + 1), changes: { from: a, insert: "></>" } };
      if (i == "/" && h.name == "JSXFragmentTag") {
        let f = h.parent, u = f == null ? void 0 : f.parent;
        if (f.from == a - 1 && ((l = u.lastChild) === null || l === void 0 ? void 0 : l.name) != "JSXEndTag" && (c = xh(s.doc, u == null ? void 0 : u.firstChild, a))) {
          let d = `/${c}>`;
          return { range: y.cursor(a + d.length), changes: { from: a, insert: d } };
        }
      } else if (i == ">") {
        let f = by(h);
        if (f && !Qy(f.lastChild) && s.sliceDoc(a, a + 2) != "</" && (c = xh(s.doc, f, a)))
          return { range: y.cursor(a + 1), changes: { from: a, insert: `></${c}>` } };
      }
    }
    return { range: o };
  });
  return r.changes.empty ? !1 : (n.dispatch(r, { userEvent: "input.type", scrollIntoView: !0 }), !0);
}), Xi = ["_blank", "_self", "_top", "_parent"], xr = ["ascii", "utf-8", "utf-16", "latin1", "latin1"], wr = ["get", "post", "put", "delete"], $r = ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"], ve = ["true", "false"], X = {}, $y = {
  a: {
    attrs: {
      href: null,
      ping: null,
      type: null,
      media: null,
      target: Xi,
      hreflang: null
    }
  },
  abbr: X,
  address: X,
  area: {
    attrs: {
      alt: null,
      coords: null,
      href: null,
      target: null,
      ping: null,
      media: null,
      hreflang: null,
      type: null,
      shape: ["default", "rect", "circle", "poly"]
    }
  },
  article: X,
  aside: X,
  audio: {
    attrs: {
      src: null,
      mediagroup: null,
      crossorigin: ["anonymous", "use-credentials"],
      preload: ["none", "metadata", "auto"],
      autoplay: ["autoplay"],
      loop: ["loop"],
      controls: ["controls"]
    }
  },
  b: X,
  base: { attrs: { href: null, target: Xi } },
  bdi: X,
  bdo: X,
  blockquote: { attrs: { cite: null } },
  body: X,
  br: X,
  button: {
    attrs: {
      form: null,
      formaction: null,
      name: null,
      value: null,
      autofocus: ["autofocus"],
      disabled: ["autofocus"],
      formenctype: $r,
      formmethod: wr,
      formnovalidate: ["novalidate"],
      formtarget: Xi,
      type: ["submit", "reset", "button"]
    }
  },
  canvas: { attrs: { width: null, height: null } },
  caption: X,
  center: X,
  cite: X,
  code: X,
  col: { attrs: { span: null } },
  colgroup: { attrs: { span: null } },
  command: {
    attrs: {
      type: ["command", "checkbox", "radio"],
      label: null,
      icon: null,
      radiogroup: null,
      command: null,
      title: null,
      disabled: ["disabled"],
      checked: ["checked"]
    }
  },
  data: { attrs: { value: null } },
  datagrid: { attrs: { disabled: ["disabled"], multiple: ["multiple"] } },
  datalist: { attrs: { data: null } },
  dd: X,
  del: { attrs: { cite: null, datetime: null } },
  details: { attrs: { open: ["open"] } },
  dfn: X,
  div: X,
  dl: X,
  dt: X,
  em: X,
  embed: { attrs: { src: null, type: null, width: null, height: null } },
  eventsource: { attrs: { src: null } },
  fieldset: { attrs: { disabled: ["disabled"], form: null, name: null } },
  figcaption: X,
  figure: X,
  footer: X,
  form: {
    attrs: {
      action: null,
      name: null,
      "accept-charset": xr,
      autocomplete: ["on", "off"],
      enctype: $r,
      method: wr,
      novalidate: ["novalidate"],
      target: Xi
    }
  },
  h1: X,
  h2: X,
  h3: X,
  h4: X,
  h5: X,
  h6: X,
  head: {
    children: ["title", "base", "link", "style", "meta", "script", "noscript", "command"]
  },
  header: X,
  hgroup: X,
  hr: X,
  html: {
    attrs: { manifest: null }
  },
  i: X,
  iframe: {
    attrs: {
      src: null,
      srcdoc: null,
      name: null,
      width: null,
      height: null,
      sandbox: ["allow-top-navigation", "allow-same-origin", "allow-forms", "allow-scripts"],
      seamless: ["seamless"]
    }
  },
  img: {
    attrs: {
      alt: null,
      src: null,
      ismap: null,
      usemap: null,
      width: null,
      height: null,
      crossorigin: ["anonymous", "use-credentials"]
    }
  },
  input: {
    attrs: {
      alt: null,
      dirname: null,
      form: null,
      formaction: null,
      height: null,
      list: null,
      max: null,
      maxlength: null,
      min: null,
      name: null,
      pattern: null,
      placeholder: null,
      size: null,
      src: null,
      step: null,
      value: null,
      width: null,
      accept: ["audio/*", "video/*", "image/*"],
      autocomplete: ["on", "off"],
      autofocus: ["autofocus"],
      checked: ["checked"],
      disabled: ["disabled"],
      formenctype: $r,
      formmethod: wr,
      formnovalidate: ["novalidate"],
      formtarget: Xi,
      multiple: ["multiple"],
      readonly: ["readonly"],
      required: ["required"],
      type: [
        "hidden",
        "text",
        "search",
        "tel",
        "url",
        "email",
        "password",
        "datetime",
        "date",
        "month",
        "week",
        "time",
        "datetime-local",
        "number",
        "range",
        "color",
        "checkbox",
        "radio",
        "file",
        "submit",
        "image",
        "reset",
        "button"
      ]
    }
  },
  ins: { attrs: { cite: null, datetime: null } },
  kbd: X,
  keygen: {
    attrs: {
      challenge: null,
      form: null,
      name: null,
      autofocus: ["autofocus"],
      disabled: ["disabled"],
      keytype: ["RSA"]
    }
  },
  label: { attrs: { for: null, form: null } },
  legend: X,
  li: { attrs: { value: null } },
  link: {
    attrs: {
      href: null,
      type: null,
      hreflang: null,
      media: null,
      sizes: ["all", "16x16", "16x16 32x32", "16x16 32x32 64x64"]
    }
  },
  map: { attrs: { name: null } },
  mark: X,
  menu: { attrs: { label: null, type: ["list", "context", "toolbar"] } },
  meta: {
    attrs: {
      content: null,
      charset: xr,
      name: ["viewport", "application-name", "author", "description", "generator", "keywords"],
      "http-equiv": ["content-language", "content-type", "default-style", "refresh"]
    }
  },
  meter: { attrs: { value: null, min: null, low: null, high: null, max: null, optimum: null } },
  nav: X,
  noscript: X,
  object: {
    attrs: {
      data: null,
      type: null,
      name: null,
      usemap: null,
      form: null,
      width: null,
      height: null,
      typemustmatch: ["typemustmatch"]
    }
  },
  ol: {
    attrs: { reversed: ["reversed"], start: null, type: ["1", "a", "A", "i", "I"] },
    children: ["li", "script", "template", "ul", "ol"]
  },
  optgroup: { attrs: { disabled: ["disabled"], label: null } },
  option: { attrs: { disabled: ["disabled"], label: null, selected: ["selected"], value: null } },
  output: { attrs: { for: null, form: null, name: null } },
  p: X,
  param: { attrs: { name: null, value: null } },
  pre: X,
  progress: { attrs: { value: null, max: null } },
  q: { attrs: { cite: null } },
  rp: X,
  rt: X,
  ruby: X,
  samp: X,
  script: {
    attrs: {
      type: ["text/javascript"],
      src: null,
      async: ["async"],
      defer: ["defer"],
      charset: xr
    }
  },
  section: X,
  select: {
    attrs: {
      form: null,
      name: null,
      size: null,
      autofocus: ["autofocus"],
      disabled: ["disabled"],
      multiple: ["multiple"]
    }
  },
  slot: { attrs: { name: null } },
  small: X,
  source: { attrs: { src: null, type: null, media: null } },
  span: X,
  strong: X,
  style: {
    attrs: {
      type: ["text/css"],
      media: null,
      scoped: null
    }
  },
  sub: X,
  summary: X,
  sup: X,
  table: X,
  tbody: X,
  td: { attrs: { colspan: null, rowspan: null, headers: null } },
  template: X,
  textarea: {
    attrs: {
      dirname: null,
      form: null,
      maxlength: null,
      name: null,
      placeholder: null,
      rows: null,
      cols: null,
      autofocus: ["autofocus"],
      disabled: ["disabled"],
      readonly: ["readonly"],
      required: ["required"],
      wrap: ["soft", "hard"]
    }
  },
  tfoot: X,
  th: { attrs: { colspan: null, rowspan: null, headers: null, scope: ["row", "col", "rowgroup", "colgroup"] } },
  thead: X,
  time: { attrs: { datetime: null } },
  title: X,
  tr: X,
  track: {
    attrs: {
      src: null,
      label: null,
      default: null,
      kind: ["subtitles", "captions", "descriptions", "chapters", "metadata"],
      srclang: null
    }
  },
  ul: { children: ["li", "script", "template", "ul", "ol"] },
  var: X,
  video: {
    attrs: {
      src: null,
      poster: null,
      width: null,
      height: null,
      crossorigin: ["anonymous", "use-credentials"],
      preload: ["auto", "metadata", "none"],
      autoplay: ["autoplay"],
      mediagroup: ["movie"],
      muted: ["muted"],
      controls: ["controls"]
    }
  },
  wbr: X
}, Ju = {
  accesskey: null,
  class: null,
  contenteditable: ve,
  contextmenu: null,
  dir: ["ltr", "rtl", "auto"],
  draggable: ["true", "false", "auto"],
  dropzone: ["copy", "move", "link", "string:", "file:"],
  hidden: ["hidden"],
  id: null,
  inert: ["inert"],
  itemid: null,
  itemprop: null,
  itemref: null,
  itemscope: ["itemscope"],
  itemtype: null,
  lang: ["ar", "bn", "de", "en-GB", "en-US", "es", "fr", "hi", "id", "ja", "pa", "pt", "ru", "tr", "zh"],
  spellcheck: ve,
  autocorrect: ve,
  autocapitalize: ve,
  style: null,
  tabindex: null,
  title: null,
  translate: ["yes", "no"],
  rel: ["stylesheet", "alternate", "author", "bookmark", "help", "license", "next", "nofollow", "noreferrer", "prefetch", "prev", "search", "tag"],
  role: /* @__PURE__ */ "alert application article banner button cell checkbox complementary contentinfo dialog document feed figure form grid gridcell heading img list listbox listitem main navigation region row rowgroup search switch tab table tabpanel textbox timer".split(" "),
  "aria-activedescendant": null,
  "aria-atomic": ve,
  "aria-autocomplete": ["inline", "list", "both", "none"],
  "aria-busy": ve,
  "aria-checked": ["true", "false", "mixed", "undefined"],
  "aria-controls": null,
  "aria-describedby": null,
  "aria-disabled": ve,
  "aria-dropeffect": null,
  "aria-expanded": ["true", "false", "undefined"],
  "aria-flowto": null,
  "aria-grabbed": ["true", "false", "undefined"],
  "aria-haspopup": ve,
  "aria-hidden": ve,
  "aria-invalid": ["true", "false", "grammar", "spelling"],
  "aria-label": null,
  "aria-labelledby": null,
  "aria-level": null,
  "aria-live": ["off", "polite", "assertive"],
  "aria-multiline": ve,
  "aria-multiselectable": ve,
  "aria-owns": null,
  "aria-posinset": null,
  "aria-pressed": ["true", "false", "mixed", "undefined"],
  "aria-readonly": ve,
  "aria-relevant": null,
  "aria-required": ve,
  "aria-selected": ["true", "false", "undefined"],
  "aria-setsize": null,
  "aria-sort": ["ascending", "descending", "none", "other"],
  "aria-valuemax": null,
  "aria-valuemin": null,
  "aria-valuenow": null,
  "aria-valuetext": null
}, Ku = /* @__PURE__ */ "beforeunload copy cut dragstart dragover dragleave dragenter dragend drag paste focus blur change click load mousedown mouseenter mouseleave mouseup keydown keyup resize scroll unload".split(" ").map((n) => "on" + n);
for (let n of Ku)
  Ju[n] = null;
class ws {
  constructor(e, t) {
    this.tags = Object.assign(Object.assign({}, $y), e), this.globalAttrs = Object.assign(Object.assign({}, Ju), t), this.allTags = Object.keys(this.tags), this.globalAttrNames = Object.keys(this.globalAttrs);
  }
}
ws.default = /* @__PURE__ */ new ws();
function gi(n, e, t = n.length) {
  if (!e)
    return "";
  let i = e.firstChild, s = i && i.getChild("TagName");
  return s ? n.sliceString(s.from, Math.min(s.to, t)) : "";
}
function mi(n, e = !1) {
  for (; n; n = n.parent)
    if (n.name == "Element")
      if (e)
        e = !1;
      else
        return n;
  return null;
}
function ed(n, e, t) {
  let i = t.tags[gi(n, mi(e))];
  return (i == null ? void 0 : i.children) || t.allTags;
}
function sl(n, e) {
  let t = [];
  for (let i = mi(e); i && !i.type.isTop; i = mi(i.parent)) {
    let s = gi(n, i);
    if (s && i.lastChild.name == "CloseTag")
      break;
    s && t.indexOf(s) < 0 && (e.name == "EndTag" || e.from >= i.firstChild.to) && t.push(s);
  }
  return t;
}
const td = /^[:\-\.\w\u00b7-\uffff]*$/;
function wh(n, e, t, i, s) {
  let r = /\s*>/.test(n.sliceDoc(s, s + 5)) ? "" : ">", o = mi(t, !0);
  return {
    from: i,
    to: s,
    options: ed(n.doc, o, e).map((l) => ({ label: l, type: "type" })).concat(sl(n.doc, t).map((l, a) => ({
      label: "/" + l,
      apply: "/" + l + r,
      type: "type",
      boost: 99 - a
    }))),
    validFor: /^\/?[:\-\.\w\u00b7-\uffff]*$/
  };
}
function $h(n, e, t, i) {
  let s = /\s*>/.test(n.sliceDoc(i, i + 5)) ? "" : ">";
  return {
    from: t,
    to: i,
    options: sl(n.doc, e).map((r, o) => ({ label: r, apply: r + s, type: "type", boost: 99 - o })),
    validFor: td
  };
}
function ky(n, e, t, i) {
  let s = [], r = 0;
  for (let o of ed(n.doc, t, e))
    s.push({ label: "<" + o, type: "type" });
  for (let o of sl(n.doc, t))
    s.push({ label: "</" + o + ">", type: "type", boost: 99 - r++ });
  return { from: i, to: i, options: s, validFor: /^<\/?[:\-\.\w\u00b7-\uffff]*$/ };
}
function vy(n, e, t, i, s) {
  let r = mi(t), o = r ? e.tags[gi(n.doc, r)] : null, l = o && o.attrs ? Object.keys(o.attrs) : [], a = o && o.globalAttrs === !1 ? l : l.length ? l.concat(e.globalAttrNames) : e.globalAttrNames;
  return {
    from: i,
    to: s,
    options: a.map((h) => ({ label: h, type: "property" })),
    validFor: td
  };
}
function Py(n, e, t, i, s) {
  var r;
  let o = (r = t.parent) === null || r === void 0 ? void 0 : r.getChild("AttributeName"), l = [], a;
  if (o) {
    let h = n.sliceDoc(o.from, o.to), c = e.globalAttrs[h];
    if (!c) {
      let f = mi(t), u = f ? e.tags[gi(n.doc, f)] : null;
      c = (u == null ? void 0 : u.attrs) && u.attrs[h];
    }
    if (c) {
      let f = n.sliceDoc(i, s).toLowerCase(), u = '"', d = '"';
      /^['"]/.test(f) ? (a = f[0] == '"' ? /^[^"]*$/ : /^[^']*$/, u = "", d = n.sliceDoc(s, s + 1) == f[0] ? "" : f[0], f = f.slice(1), i++) : a = /^[^\s<>='"]*$/;
      for (let O of c)
        l.push({ label: O, apply: u + O + d, type: "constant" });
    }
  }
  return { from: i, to: s, options: l, validFor: a };
}
function Cy(n, e) {
  let { state: t, pos: i } = e, s = I(t).resolveInner(i, -1), r = s.resolve(i);
  for (let o = i, l; r == s && (l = s.childBefore(o)); ) {
    let a = l.lastChild;
    if (!a || !a.type.isError || a.from < a.to)
      break;
    r = s = l, o = a.from;
  }
  return s.name == "TagName" ? s.parent && /CloseTag$/.test(s.parent.name) ? $h(t, s, s.from, i) : wh(t, n, s, s.from, i) : s.name == "StartTag" ? wh(t, n, s, i, i) : s.name == "StartCloseTag" || s.name == "IncompleteCloseTag" ? $h(t, s, i, i) : e.explicit && (s.name == "OpenTag" || s.name == "SelfClosingTag") || s.name == "AttributeName" ? vy(t, n, s, s.name == "AttributeName" ? s.from : i, i) : s.name == "Is" || s.name == "AttributeValue" || s.name == "UnquotedAttributeValue" ? Py(t, n, s, s.name == "Is" ? i : s.from, i) : e.explicit && (r.name == "Element" || r.name == "Text" || r.name == "Document") ? ky(t, n, s, i) : null;
}
function Xy(n) {
  let { extraTags: e, extraGlobalAttributes: t } = n, i = t || e ? new ws(e, t) : ws.default;
  return (s) => Cy(i, s);
}
const id = [
  {
    tag: "script",
    attrs: (n) => n.type == "text/typescript" || n.lang == "ts",
    parser: Gu.parser
  },
  {
    tag: "script",
    attrs: (n) => n.type == "text/babel" || n.type == "text/jsx",
    parser: Fu.parser
  },
  {
    tag: "script",
    attrs: (n) => n.type == "text/typescript-jsx",
    parser: Hu.parser
  },
  {
    tag: "script",
    attrs(n) {
      return !n.type || /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i.test(n.type);
    },
    parser: Ot.parser
  },
  {
    tag: "style",
    attrs(n) {
      return (!n.lang || n.lang == "css") && (!n.type || /^(text\/)?(x-)?(stylesheet|css)$/i.test(n.type));
    },
    parser: Qs.parser
  }
], nd = /* @__PURE__ */ [
  {
    name: "style",
    parser: /* @__PURE__ */ Qs.parser.configure({ top: "Styles" })
  }
].concat(/* @__PURE__ */ Ku.map((n) => ({ name: n, parser: Ot.parser }))), sd = /* @__PURE__ */ di.define({
  name: "html",
  parser: /* @__PURE__ */ CS.configure({
    props: [
      /* @__PURE__ */ Ds.add({
        Element(n) {
          let e = /^(\s*)(<\/)?/.exec(n.textAfter);
          return n.node.to <= n.pos + e[0].length ? n.continue() : n.lineIndent(n.node.from) + (e[2] ? 0 : n.unit);
        },
        "OpenTag CloseTag SelfClosingTag"(n) {
          return n.column(n.node.from) + n.unit;
        },
        Document(n) {
          if (n.pos + /\s*/.exec(n.textAfter)[0].length < n.node.to)
            return n.continue();
          let e = null, t;
          for (let i = n.node; ; ) {
            let s = i.lastChild;
            if (!s || s.name != "Element" || s.to != i.to)
              break;
            e = i = s;
          }
          return e && !((t = e.lastChild) && (t.name == "CloseTag" || t.name == "SelfClosingTag")) ? n.lineIndent(e.from) + n.unit : null;
        }
      }),
      /* @__PURE__ */ Us.add({
        Element(n) {
          let e = n.firstChild, t = n.lastChild;
          return !e || e.name != "OpenTag" ? null : { from: e.to, to: t.name == "CloseTag" ? t.from : n.to };
        }
      }),
      /* @__PURE__ */ Vf.add({
        "OpenTag CloseTag": (n) => n.getChild("TagName")
      })
    ]
  }),
  languageData: {
    commentTokens: { block: { open: "<!--", close: "-->" } },
    indentOnInput: /^\s*<\/\w+\W$/,
    wordChars: "-._"
  }
}), Nn = /* @__PURE__ */ sd.configure({
  wrap: /* @__PURE__ */ vu(id, nd)
});
function Ty(n = {}) {
  let e = "", t;
  n.matchClosingTags === !1 && (e = "noMatch"), n.selfClosingTags === !0 && (e = (e ? e + " " : "") + "selfClosing"), (n.nestedLanguages && n.nestedLanguages.length || n.nestedAttributes && n.nestedAttributes.length) && (t = vu((n.nestedLanguages || []).concat(id), (n.nestedAttributes || []).concat(nd)));
  let i = t ? sd.configure({ wrap: t, dialect: e }) : e ? Nn.configure({ dialect: e }) : Nn;
  return new Io(i, [
    Nn.data.of({ autocomplete: Xy(n) }),
    n.autoCloseTags !== !1 ? Zy : [],
    yy().support,
    e1().support
  ]);
}
const kh = /* @__PURE__ */ new Set(/* @__PURE__ */ "area base br col command embed frame hr img input keygen link meta param source track wbr menuitem".split(" ")), Zy = /* @__PURE__ */ k.inputHandler.of((n, e, t, i) => {
  if (n.composing || n.state.readOnly || e != t || i != ">" && i != "/" || !Nn.isActiveAt(n.state, e, -1))
    return !1;
  let { state: s } = n, r = s.changeByRange((o) => {
    var l, a, h;
    let { head: c } = o, f = I(s).resolveInner(c, -1), u;
    if ((f.name == "TagName" || f.name == "StartTag") && (f = f.parent), i == ">" && f.name == "OpenTag") {
      if (((a = (l = f.parent) === null || l === void 0 ? void 0 : l.lastChild) === null || a === void 0 ? void 0 : a.name) != "CloseTag" && (u = gi(s.doc, f.parent, c)) && !kh.has(u)) {
        let d = n.state.doc.sliceString(c, c + 1) === ">", O = `${d ? "" : ">"}</${u}>`;
        return { range: y.cursor(c + 1), changes: { from: c + (d ? 1 : 0), insert: O } };
      }
    } else if (i == "/" && f.name == "OpenTag") {
      let d = f.parent, O = d == null ? void 0 : d.parent;
      if (d.from == c - 1 && ((h = O.lastChild) === null || h === void 0 ? void 0 : h.name) != "CloseTag" && (u = gi(s.doc, O, c)) && !kh.has(u)) {
        let m = n.state.doc.sliceString(c, c + 1) === ">", g = `/${u}${m ? "" : ">"}`, S = c + g.length + (m ? 1 : 0);
        return { range: y.cursor(S), changes: { from: c, insert: g } };
      }
    }
    return { range: o };
  });
  return r.changes.empty ? !1 : (n.dispatch(r, { userEvent: "input.type", scrollIntoView: !0 }), !0);
}), rd = "#2e3235", od = "#505d64", $o = "#606f7a", $s = "#707d8b", Ry = "#a0a4ae", Gn = "#bdbdbd", Ay = "#e0e0e0", Vy = "#fdf6e3", ii = "#ff5f52", Yy = "#ff6e40", My = "#fa5788", bt = "#facf4e", vh = "#ffad42", Ti = "#56c8d8", Wy = "#7186f0", kr = "#cf6edf", Dy = "#6abf69", Ph = "#99d066", Ch = "#4ebaaa", Xh = ii, Th = "#202325", Rn = "#545b61", Uy = rd, vr = od, qy = od, Zh = Ry, Ey = /* @__PURE__ */ k.theme({
  "&": {
    color: Gn,
    backgroundColor: Uy
  },
  ".cm-content": {
    caretColor: Zh
  },
  ".cm-cursor, .cm-dropCursor": { borderLeftColor: Zh },
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": { backgroundColor: qy },
  ".cm-panels": { backgroundColor: Th, color: $s },
  ".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },
  ".cm-panels.cm-panels-bottom": { borderTop: "2px solid black" },
  ".cm-searchMatch": {
    outline: `1px solid ${bt}`,
    backgroundColor: "transparent"
  },
  ".cm-searchMatch.cm-searchMatch-selected": {
    backgroundColor: Rn
  },
  ".cm-activeLine": { backgroundColor: Rn },
  ".cm-selectionMatch": {
    backgroundColor: Th,
    outline: `1px solid ${Ch}`
  },
  "&.cm-focused .cm-matchingBracket": {
    color: Ay,
    outline: `1px solid ${Ch}`
  },
  "&.cm-focused .cm-nonmatchingBracket": {
    color: ii
  },
  ".cm-gutters": {
    backgroundColor: rd,
    borderRight: "1px solid #4f5b66",
    color: $o
  },
  ".cm-activeLineGutter": {
    backgroundColor: Rn,
    color: Vy
  },
  ".cm-foldPlaceholder": {
    backgroundColor: "transparent",
    border: "none",
    color: "#ddd"
  },
  ".cm-tooltip": {
    border: "none",
    backgroundColor: vr
  },
  ".cm-tooltip .cm-tooltip-arrow:before": {
    borderTopColor: "transparent",
    borderBottomColor: "transparent"
  },
  ".cm-tooltip .cm-tooltip-arrow:after": {
    borderTopColor: vr,
    borderBottomColor: vr
  },
  ".cm-tooltip-autocomplete": {
    "& > ul > li[aria-selected]": {
      backgroundColor: Rn,
      color: $s
    }
  }
}, { dark: !0 }), _y = /* @__PURE__ */ hn.define([
  { tag: p.keyword, color: kr },
  {
    tag: [p.name, p.deleted, p.character, p.macroName],
    color: Ti
  },
  { tag: [p.propertyName], color: bt },
  { tag: [p.variableName], color: Gn },
  { tag: [/* @__PURE__ */ p.function(p.variableName)], color: Ti },
  { tag: [p.labelName], color: kr },
  {
    tag: [p.color, /* @__PURE__ */ p.constant(p.name), /* @__PURE__ */ p.standard(p.name)],
    color: bt
  },
  { tag: [/* @__PURE__ */ p.definition(p.name), p.separator], color: My },
  { tag: [p.brace], color: kr },
  {
    tag: [p.annotation],
    color: Xh
  },
  {
    tag: [p.number, p.changed, p.annotation, p.modifier, p.self, p.namespace],
    color: vh
  },
  {
    tag: [p.typeName, p.className],
    color: vh
  },
  {
    tag: [p.operator, p.operatorKeyword],
    color: Wy
  },
  {
    tag: [p.tagName],
    color: Yy
  },
  {
    tag: [p.squareBracket],
    color: ii
  },
  {
    tag: [p.angleBracket],
    color: $o
  },
  {
    tag: [p.attributeName],
    color: Gn
  },
  {
    tag: [p.regexp],
    color: Xh
  },
  {
    tag: [p.quote],
    color: Dy
  },
  { tag: [p.string], color: Ph },
  {
    tag: p.link,
    color: Ti,
    textDecoration: "underline",
    textUnderlinePosition: "under"
  },
  {
    tag: [p.url, p.escape, /* @__PURE__ */ p.special(p.string)],
    color: bt
  },
  { tag: [p.meta], color: $s },
  { tag: [p.comment], color: $s, fontStyle: "italic" },
  { tag: p.monospace, color: Gn },
  { tag: p.strong, fontWeight: "bold", color: ii },
  { tag: p.emphasis, fontStyle: "italic", color: Ph },
  { tag: p.strikethrough, textDecoration: "line-through" },
  { tag: p.heading, fontWeight: "bold", color: bt },
  { tag: p.heading1, fontWeight: "bold", color: bt },
  {
    tag: [p.heading2, p.heading3, p.heading4],
    fontWeight: "bold",
    color: bt
  },
  {
    tag: [p.heading5, p.heading6],
    color: bt
  },
  { tag: [p.atom, p.bool, /* @__PURE__ */ p.special(p.variableName)], color: Ti },
  {
    tag: [p.processingInstruction, p.inserted],
    color: ii
  },
  {
    tag: [p.contentSeparator],
    color: Ti
  },
  { tag: p.invalid, color: $o, borderBottom: `1px dotted ${ii}` }
]), By = [
  Ey,
  /* @__PURE__ */ Tf(_y)
];
function q() {
  var n = arguments[0];
  typeof n == "string" && (n = document.createElement(n));
  var e = 1, t = arguments[1];
  if (t && typeof t == "object" && t.nodeType == null && !Array.isArray(t)) {
    for (var i in t)
      if (Object.prototype.hasOwnProperty.call(t, i)) {
        var s = t[i];
        typeof s == "string" ? n.setAttribute(i, s) : s != null && (n[i] = s);
      }
    e++;
  }
  for (; e < arguments.length; e++)
    ld(n, arguments[e]);
  return n;
}
function ld(n, e) {
  if (typeof e == "string")
    n.appendChild(document.createTextNode(e));
  else if (e != null)
    if (e.nodeType != null)
      n.appendChild(e);
    else if (Array.isArray(e))
      for (var t = 0; t < e.length; t++)
        ld(n, e[t]);
    else
      throw new RangeError("Unsupported child node: " + e);
}
const Rh = typeof String.prototype.normalize == "function" ? (n) => n.normalize("NFKD") : (n) => n;
class Si {
  /**
  Create a text cursor. The query is the search string, `from` to
  `to` provides the region to search.
  
  When `normalize` is given, it will be called, on both the query
  string and the content it is matched against, before comparing.
  You can, for example, create a case-insensitive search by
  passing `s => s.toLowerCase()`.
  
  Text is always normalized with
  [`.normalize("NFKD")`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)
  (when supported).
  */
  constructor(e, t, i = 0, s = e.length, r, o) {
    this.test = o, this.value = { from: 0, to: 0 }, this.done = !1, this.matches = [], this.buffer = "", this.bufferPos = 0, this.iter = e.iterRange(i, s), this.bufferStart = i, this.normalize = r ? (l) => r(Rh(l)) : Rh, this.query = this.normalize(t);
  }
  peek() {
    if (this.bufferPos == this.buffer.length) {
      if (this.bufferStart += this.buffer.length, this.iter.next(), this.iter.done)
        return -1;
      this.bufferPos = 0, this.buffer = this.iter.value;
    }
    return ae(this.buffer, this.bufferPos);
  }
  /**
  Look for the next match. Updates the iterator's
  [`value`](https://codemirror.net/6/docs/ref/#search.SearchCursor.value) and
  [`done`](https://codemirror.net/6/docs/ref/#search.SearchCursor.done) properties. Should be called
  at least once before using the cursor.
  */
  next() {
    for (; this.matches.length; )
      this.matches.pop();
    return this.nextOverlapping();
  }
  /**
  The `next` method will ignore matches that partially overlap a
  previous match. This method behaves like `next`, but includes
  such matches.
  */
  nextOverlapping() {
    for (; ; ) {
      let e = this.peek();
      if (e < 0)
        return this.done = !0, this;
      let t = Co(e), i = this.bufferStart + this.bufferPos;
      this.bufferPos += Ye(e);
      let s = this.normalize(t);
      for (let r = 0, o = i; ; r++) {
        let l = s.charCodeAt(r), a = this.match(l, o);
        if (r == s.length - 1) {
          if (a)
            return this.value = a, this;
          break;
        }
        o == i && r < t.length && t.charCodeAt(r) == l && o++;
      }
    }
  }
  match(e, t) {
    let i = null;
    for (let s = 0; s < this.matches.length; s += 2) {
      let r = this.matches[s], o = !1;
      this.query.charCodeAt(r) == e && (r == this.query.length - 1 ? i = { from: this.matches[s + 1], to: t + 1 } : (this.matches[s]++, o = !0)), o || (this.matches.splice(s, 2), s -= 2);
    }
    return this.query.charCodeAt(0) == e && (this.query.length == 1 ? i = { from: t, to: t + 1 } : this.matches.push(1, t)), i && this.test && !this.test(i.from, i.to, this.buffer, this.bufferPos) && (i = null), i;
  }
}
typeof Symbol < "u" && (Si.prototype[Symbol.iterator] = function() {
  return this;
});
const ad = { from: -1, to: -1, match: /* @__PURE__ */ /.*/.exec("") }, rl = "gm" + (/x/.unicode == null ? "" : "u");
class hd {
  /**
  Create a cursor that will search the given range in the given
  document. `query` should be the raw pattern (as you'd pass it to
  `new RegExp`).
  */
  constructor(e, t, i, s = 0, r = e.length) {
    if (this.text = e, this.to = r, this.curLine = "", this.done = !1, this.value = ad, /\\[sWDnr]|\n|\r|\[\^/.test(t))
      return new cd(e, t, i, s, r);
    this.re = new RegExp(t, rl + (i != null && i.ignoreCase ? "i" : "")), this.test = i == null ? void 0 : i.test, this.iter = e.iter();
    let o = e.lineAt(s);
    this.curLineStart = o.from, this.matchPos = ks(e, s), this.getLine(this.curLineStart);
  }
  getLine(e) {
    this.iter.next(e), this.iter.lineBreak ? this.curLine = "" : (this.curLine = this.iter.value, this.curLineStart + this.curLine.length > this.to && (this.curLine = this.curLine.slice(0, this.to - this.curLineStart)), this.iter.next());
  }
  nextLine() {
    this.curLineStart = this.curLineStart + this.curLine.length + 1, this.curLineStart > this.to ? this.curLine = "" : this.getLine(0);
  }
  /**
  Move to the next match, if there is one.
  */
  next() {
    for (let e = this.matchPos - this.curLineStart; ; ) {
      this.re.lastIndex = e;
      let t = this.matchPos <= this.to && this.re.exec(this.curLine);
      if (t) {
        let i = this.curLineStart + t.index, s = i + t[0].length;
        if (this.matchPos = ks(this.text, s + (i == s ? 1 : 0)), i == this.curLineStart + this.curLine.length && this.nextLine(), (i < s || i > this.value.to) && (!this.test || this.test(i, s, t)))
          return this.value = { from: i, to: s, match: t }, this;
        e = this.matchPos - this.curLineStart;
      } else if (this.curLineStart + this.curLine.length < this.to)
        this.nextLine(), e = 0;
      else
        return this.done = !0, this;
    }
  }
}
const Pr = /* @__PURE__ */ new WeakMap();
class hi {
  constructor(e, t) {
    this.from = e, this.text = t;
  }
  get to() {
    return this.from + this.text.length;
  }
  static get(e, t, i) {
    let s = Pr.get(e);
    if (!s || s.from >= i || s.to <= t) {
      let l = new hi(t, e.sliceString(t, i));
      return Pr.set(e, l), l;
    }
    if (s.from == t && s.to == i)
      return s;
    let { text: r, from: o } = s;
    return o > t && (r = e.sliceString(t, o) + r, o = t), s.to < i && (r += e.sliceString(s.to, i)), Pr.set(e, new hi(o, r)), new hi(t, r.slice(t - o, i - o));
  }
}
class cd {
  constructor(e, t, i, s, r) {
    this.text = e, this.to = r, this.done = !1, this.value = ad, this.matchPos = ks(e, s), this.re = new RegExp(t, rl + (i != null && i.ignoreCase ? "i" : "")), this.test = i == null ? void 0 : i.test, this.flat = hi.get(e, s, this.chunkEnd(
      s + 5e3
      /* Base */
    ));
  }
  chunkEnd(e) {
    return e >= this.to ? this.to : this.text.lineAt(e).to;
  }
  next() {
    for (; ; ) {
      let e = this.re.lastIndex = this.matchPos - this.flat.from, t = this.re.exec(this.flat.text);
      if (t && !t[0] && t.index == e && (this.re.lastIndex = e + 1, t = this.re.exec(this.flat.text)), t) {
        let i = this.flat.from + t.index, s = i + t[0].length;
        if ((this.flat.to >= this.to || t.index + t[0].length <= this.flat.text.length - 10) && (!this.test || this.test(i, s, t)))
          return this.value = { from: i, to: s, match: t }, this.matchPos = ks(this.text, s + (i == s ? 1 : 0)), this;
      }
      if (this.flat.to == this.to)
        return this.done = !0, this;
      this.flat = hi.get(this.text, this.flat.from, this.chunkEnd(this.flat.from + this.flat.text.length * 2));
    }
  }
}
typeof Symbol < "u" && (hd.prototype[Symbol.iterator] = cd.prototype[Symbol.iterator] = function() {
  return this;
});
function zy(n) {
  try {
    return new RegExp(n, rl), !0;
  } catch {
    return !1;
  }
}
function ks(n, e) {
  if (e >= n.length)
    return e;
  let t = n.lineAt(e), i;
  for (; e < t.to && (i = t.text.charCodeAt(e - t.from)) >= 56320 && i < 57344; )
    e++;
  return e;
}
function ko(n) {
  let e = q("input", { class: "cm-textfield", name: "line" }), t = q("form", {
    class: "cm-gotoLine",
    onkeydown: (s) => {
      s.keyCode == 27 ? (s.preventDefault(), n.dispatch({ effects: vs.of(!1) }), n.focus()) : s.keyCode == 13 && (s.preventDefault(), i());
    },
    onsubmit: (s) => {
      s.preventDefault(), i();
    }
  }, q("label", n.state.phrase("Go to line"), ": ", e), " ", q("button", { class: "cm-button", type: "submit" }, n.state.phrase("go")));
  function i() {
    let s = /^([+-])?(\d+)?(:\d+)?(%)?$/.exec(e.value);
    if (!s)
      return;
    let { state: r } = n, o = r.doc.lineAt(r.selection.main.head), [, l, a, h, c] = s, f = h ? +h.slice(1) : 0, u = a ? +a : o.number;
    if (a && c) {
      let m = u / 100;
      l && (m = m * (l == "-" ? -1 : 1) + o.number / r.doc.lines), u = Math.round(r.doc.lines * m);
    } else
      a && l && (u = u * (l == "-" ? -1 : 1) + o.number);
    let d = r.doc.line(Math.max(1, Math.min(r.doc.lines, u))), O = y.cursor(d.from + Math.max(0, Math.min(f, d.length)));
    n.dispatch({
      effects: [vs.of(!1), k.scrollIntoView(O.from, { y: "center" })],
      selection: O
    }), n.focus();
  }
  return { dom: t };
}
const vs = /* @__PURE__ */ R.define(), Ah = /* @__PURE__ */ re.define({
  create() {
    return !0;
  },
  update(n, e) {
    for (let t of e.effects)
      t.is(vs) && (n = t.value);
    return n;
  },
  provide: (n) => fi.from(n, (e) => e ? ko : null)
}), Iy = (n) => {
  let e = Gi(n, ko);
  if (!e) {
    let t = [vs.of(!0)];
    n.state.field(Ah, !1) == null && t.push(R.appendConfig.of([Ah, jy])), n.dispatch({ effects: t }), e = Gi(n, ko);
  }
  return e && e.dom.querySelector("input").focus(), !0;
}, jy = /* @__PURE__ */ k.baseTheme({
  ".cm-panel.cm-gotoLine": {
    padding: "2px 6px 4px",
    "& label": { fontSize: "80%" }
  }
}), Ly = {
  highlightWordAroundCursor: !1,
  minSelectionLength: 1,
  maxMatches: 100,
  wholeWords: !1
}, fd = /* @__PURE__ */ P.define({
  combine(n) {
    return lt(n, Ly, {
      highlightWordAroundCursor: (e, t) => e || t,
      minSelectionLength: Math.min,
      maxMatches: Math.min
    });
  }
});
function Ny(n) {
  let e = [Ky, Jy];
  return n && e.push(fd.of(n)), e;
}
const Gy = /* @__PURE__ */ T.mark({ class: "cm-selectionMatch" }), Fy = /* @__PURE__ */ T.mark({ class: "cm-selectionMatch cm-selectionMatch-main" });
function Vh(n, e, t, i) {
  return (t == 0 || n(e.sliceDoc(t - 1, t)) != j.Word) && (i == e.doc.length || n(e.sliceDoc(i, i + 1)) != j.Word);
}
function Hy(n, e, t, i) {
  return n(e.sliceDoc(t, t + 1)) == j.Word && n(e.sliceDoc(i - 1, i)) == j.Word;
}
const Jy = /* @__PURE__ */ ee.fromClass(class {
  constructor(n) {
    this.decorations = this.getDeco(n);
  }
  update(n) {
    (n.selectionSet || n.docChanged || n.viewportChanged) && (this.decorations = this.getDeco(n.view));
  }
  getDeco(n) {
    let e = n.state.facet(fd), { state: t } = n, i = t.selection;
    if (i.ranges.length > 1)
      return T.none;
    let s = i.main, r, o = null;
    if (s.empty) {
      if (!e.highlightWordAroundCursor)
        return T.none;
      let a = t.wordAt(s.head);
      if (!a)
        return T.none;
      o = t.charCategorizer(s.head), r = t.sliceDoc(a.from, a.to);
    } else {
      let a = s.to - s.from;
      if (a < e.minSelectionLength || a > 200)
        return T.none;
      if (e.wholeWords) {
        if (r = t.sliceDoc(s.from, s.to), o = t.charCategorizer(s.head), !(Vh(o, t, s.from, s.to) && Hy(o, t, s.from, s.to)))
          return T.none;
      } else if (r = t.sliceDoc(s.from, s.to).trim(), !r)
        return T.none;
    }
    let l = [];
    for (let a of n.visibleRanges) {
      let h = new Si(t.doc, r, a.from, a.to);
      for (; !h.next().done; ) {
        let { from: c, to: f } = h.value;
        if ((!o || Vh(o, t, c, f)) && (s.empty && c <= s.from && f >= s.to ? l.push(Fy.range(c, f)) : (c >= s.to || f <= s.from) && l.push(Gy.range(c, f)), l.length > e.maxMatches))
          return T.none;
      }
    }
    return T.set(l);
  }
}, {
  decorations: (n) => n.decorations
}), Ky = /* @__PURE__ */ k.baseTheme({
  ".cm-selectionMatch": { backgroundColor: "#99ff7780" },
  ".cm-searchMatch .cm-selectionMatch": { backgroundColor: "transparent" }
}), eb = ({ state: n, dispatch: e }) => {
  let { selection: t } = n, i = y.create(t.ranges.map((s) => n.wordAt(s.head) || y.cursor(s.head)), t.mainIndex);
  return i.eq(t) ? !1 : (e(n.update({ selection: i })), !0);
};
function tb(n, e) {
  let { main: t, ranges: i } = n.selection, s = n.wordAt(t.head), r = s && s.from == t.from && s.to == t.to;
  for (let o = !1, l = new Si(n.doc, e, i[i.length - 1].to); ; )
    if (l.next(), l.done) {
      if (o)
        return null;
      l = new Si(n.doc, e, 0, Math.max(0, i[i.length - 1].from - 1)), o = !0;
    } else {
      if (o && i.some((a) => a.from == l.value.from))
        continue;
      if (r) {
        let a = n.wordAt(l.value.from);
        if (!a || a.from != l.value.from || a.to != l.value.to)
          continue;
      }
      return l.value;
    }
}
const ib = ({ state: n, dispatch: e }) => {
  let { ranges: t } = n.selection;
  if (t.some((r) => r.from === r.to))
    return eb({ state: n, dispatch: e });
  let i = n.sliceDoc(t[0].from, t[0].to);
  if (n.selection.ranges.some((r) => n.sliceDoc(r.from, r.to) != i))
    return !1;
  let s = tb(n, i);
  return s ? (e(n.update({
    selection: n.selection.addRange(y.range(s.from, s.to), !1),
    effects: k.scrollIntoView(s.to)
  })), !0) : !1;
}, xi = /* @__PURE__ */ P.define({
  combine(n) {
    return lt(n, {
      top: !1,
      caseSensitive: !1,
      literal: !1,
      regexp: !1,
      wholeWord: !1,
      createPanel: (e) => new Ob(e),
      scrollToMatch: (e) => k.scrollIntoView(e)
    });
  }
});
class ud {
  /**
  Create a query object.
  */
  constructor(e) {
    this.search = e.search, this.caseSensitive = !!e.caseSensitive, this.literal = !!e.literal, this.regexp = !!e.regexp, this.replace = e.replace || "", this.valid = !!this.search && (!this.regexp || zy(this.search)), this.unquoted = this.unquote(this.search), this.wholeWord = !!e.wholeWord;
  }
  /**
  @internal
  */
  unquote(e) {
    return this.literal ? e : e.replace(/\\([nrt\\])/g, (t, i) => i == "n" ? `
` : i == "r" ? "\r" : i == "t" ? "	" : "\\");
  }
  /**
  Compare this query to another query.
  */
  eq(e) {
    return this.search == e.search && this.replace == e.replace && this.caseSensitive == e.caseSensitive && this.regexp == e.regexp && this.wholeWord == e.wholeWord;
  }
  /**
  @internal
  */
  create() {
    return this.regexp ? new ob(this) : new sb(this);
  }
  /**
  Get a search cursor for this query, searching through the given
  range in the given state.
  */
  getCursor(e, t = 0, i) {
    let s = e.doc ? e : M.create({ doc: e });
    return i == null && (i = s.doc.length), this.regexp ? Ht(this, s, t, i) : Ft(this, s, t, i);
  }
}
class dd {
  constructor(e) {
    this.spec = e;
  }
}
function Ft(n, e, t, i) {
  return new Si(e.doc, n.unquoted, t, i, n.caseSensitive ? void 0 : (s) => s.toLowerCase(), n.wholeWord ? nb(e.doc, e.charCategorizer(e.selection.main.head)) : void 0);
}
function nb(n, e) {
  return (t, i, s, r) => ((r > t || r + s.length < i) && (r = Math.max(0, t - 2), s = n.sliceString(r, Math.min(n.length, i + 2))), (e(Ps(s, t - r)) != j.Word || e(Cs(s, t - r)) != j.Word) && (e(Cs(s, i - r)) != j.Word || e(Ps(s, i - r)) != j.Word));
}
class sb extends dd {
  constructor(e) {
    super(e);
  }
  nextMatch(e, t, i) {
    let s = Ft(this.spec, e, i, e.doc.length).nextOverlapping();
    return s.done && (s = Ft(this.spec, e, 0, t).nextOverlapping()), s.done ? null : s.value;
  }
  // Searching in reverse is, rather than implementing an inverted search
  // cursor, done by scanning chunk after chunk forward.
  prevMatchInRange(e, t, i) {
    for (let s = i; ; ) {
      let r = Math.max(t, s - 1e4 - this.spec.unquoted.length), o = Ft(this.spec, e, r, s), l = null;
      for (; !o.nextOverlapping().done; )
        l = o.value;
      if (l)
        return l;
      if (r == t)
        return null;
      s -= 1e4;
    }
  }
  prevMatch(e, t, i) {
    return this.prevMatchInRange(e, 0, t) || this.prevMatchInRange(e, i, e.doc.length);
  }
  getReplacement(e) {
    return this.spec.unquote(this.spec.replace);
  }
  matchAll(e, t) {
    let i = Ft(this.spec, e, 0, e.doc.length), s = [];
    for (; !i.next().done; ) {
      if (s.length >= t)
        return null;
      s.push(i.value);
    }
    return s;
  }
  highlight(e, t, i, s) {
    let r = Ft(this.spec, e, Math.max(0, t - this.spec.unquoted.length), Math.min(i + this.spec.unquoted.length, e.doc.length));
    for (; !r.next().done; )
      s(r.value.from, r.value.to);
  }
}
function Ht(n, e, t, i) {
  return new hd(e.doc, n.search, {
    ignoreCase: !n.caseSensitive,
    test: n.wholeWord ? rb(e.charCategorizer(e.selection.main.head)) : void 0
  }, t, i);
}
function Ps(n, e) {
  return n.slice(Oe(n, e, !1), e);
}
function Cs(n, e) {
  return n.slice(e, Oe(n, e));
}
function rb(n) {
  return (e, t, i) => !i[0].length || (n(Ps(i.input, i.index)) != j.Word || n(Cs(i.input, i.index)) != j.Word) && (n(Cs(i.input, i.index + i[0].length)) != j.Word || n(Ps(i.input, i.index + i[0].length)) != j.Word);
}
class ob extends dd {
  nextMatch(e, t, i) {
    let s = Ht(this.spec, e, i, e.doc.length).next();
    return s.done && (s = Ht(this.spec, e, 0, t).next()), s.done ? null : s.value;
  }
  prevMatchInRange(e, t, i) {
    for (let s = 1; ; s++) {
      let r = Math.max(
        t,
        i - s * 1e4
        /* ChunkSize */
      ), o = Ht(this.spec, e, r, i), l = null;
      for (; !o.next().done; )
        l = o.value;
      if (l && (r == t || l.from > r + 10))
        return l;
      if (r == t)
        return null;
    }
  }
  prevMatch(e, t, i) {
    return this.prevMatchInRange(e, 0, t) || this.prevMatchInRange(e, i, e.doc.length);
  }
  getReplacement(e) {
    return this.spec.unquote(this.spec.replace.replace(/\$([$&\d+])/g, (t, i) => i == "$" ? "$" : i == "&" ? e.match[0] : i != "0" && +i < e.match.length ? e.match[i] : t));
  }
  matchAll(e, t) {
    let i = Ht(this.spec, e, 0, e.doc.length), s = [];
    for (; !i.next().done; ) {
      if (s.length >= t)
        return null;
      s.push(i.value);
    }
    return s;
  }
  highlight(e, t, i, s) {
    let r = Ht(this.spec, e, Math.max(
      0,
      t - 250
      /* HighlightMargin */
    ), Math.min(i + 250, e.doc.length));
    for (; !r.next().done; )
      s(r.value.from, r.value.to);
  }
}
const tn = /* @__PURE__ */ R.define(), ol = /* @__PURE__ */ R.define(), vt = /* @__PURE__ */ re.define({
  create(n) {
    return new Cr(vo(n).create(), null);
  },
  update(n, e) {
    for (let t of e.effects)
      t.is(tn) ? n = new Cr(t.value.create(), n.panel) : t.is(ol) && (n = new Cr(n.query, t.value ? ll : null));
    return n;
  },
  provide: (n) => fi.from(n, (e) => e.panel)
});
class Cr {
  constructor(e, t) {
    this.query = e, this.panel = t;
  }
}
const lb = /* @__PURE__ */ T.mark({ class: "cm-searchMatch" }), ab = /* @__PURE__ */ T.mark({ class: "cm-searchMatch cm-searchMatch-selected" }), hb = /* @__PURE__ */ ee.fromClass(class {
  constructor(n) {
    this.view = n, this.decorations = this.highlight(n.state.field(vt));
  }
  update(n) {
    let e = n.state.field(vt);
    (e != n.startState.field(vt) || n.docChanged || n.selectionSet || n.viewportChanged) && (this.decorations = this.highlight(e));
  }
  highlight({ query: n, panel: e }) {
    if (!e || !n.spec.valid)
      return T.none;
    let { view: t } = this, i = new Pt();
    for (let s = 0, r = t.visibleRanges, o = r.length; s < o; s++) {
      let { from: l, to: a } = r[s];
      for (; s < o - 1 && a > r[s + 1].from - 2 * 250; )
        a = r[++s].to;
      n.highlight(t.state, l, a, (h, c) => {
        let f = t.state.selection.ranges.some((u) => u.from == h && u.to == c);
        i.add(h, c, f ? ab : lb);
      });
    }
    return i.finish();
  }
}, {
  decorations: (n) => n.decorations
});
function fn(n) {
  return (e) => {
    let t = e.state.field(vt, !1);
    return t && t.query.spec.valid ? n(e, t) : gd(e);
  };
}
const Xs = /* @__PURE__ */ fn((n, { query: e }) => {
  let { to: t } = n.state.selection.main, i = e.nextMatch(n.state, t, t);
  if (!i)
    return !1;
  let s = y.single(i.from, i.to), r = n.state.facet(xi);
  return n.dispatch({
    selection: s,
    effects: [al(n, i), r.scrollToMatch(s.main, n)],
    userEvent: "select.search"
  }), pd(n), !0;
}), Ts = /* @__PURE__ */ fn((n, { query: e }) => {
  let { state: t } = n, { from: i } = t.selection.main, s = e.prevMatch(t, i, i);
  if (!s)
    return !1;
  let r = y.single(s.from, s.to), o = n.state.facet(xi);
  return n.dispatch({
    selection: r,
    effects: [al(n, s), o.scrollToMatch(r.main, n)],
    userEvent: "select.search"
  }), pd(n), !0;
}), cb = /* @__PURE__ */ fn((n, { query: e }) => {
  let t = e.matchAll(n.state, 1e3);
  return !t || !t.length ? !1 : (n.dispatch({
    selection: y.create(t.map((i) => y.range(i.from, i.to))),
    userEvent: "select.search.matches"
  }), !0);
}), fb = ({ state: n, dispatch: e }) => {
  let t = n.selection;
  if (t.ranges.length > 1 || t.main.empty)
    return !1;
  let { from: i, to: s } = t.main, r = [], o = 0;
  for (let l = new Si(n.doc, n.sliceDoc(i, s)); !l.next().done; ) {
    if (r.length > 1e3)
      return !1;
    l.value.from == i && (o = r.length), r.push(y.range(l.value.from, l.value.to));
  }
  return e(n.update({
    selection: y.create(r, o),
    userEvent: "select.search.matches"
  })), !0;
}, Yh = /* @__PURE__ */ fn((n, { query: e }) => {
  let { state: t } = n, { from: i, to: s } = t.selection.main;
  if (t.readOnly)
    return !1;
  let r = e.nextMatch(t, i, i);
  if (!r)
    return !1;
  let o = [], l, a, h = [];
  if (r.from == i && r.to == s && (a = t.toText(e.getReplacement(r)), o.push({ from: r.from, to: r.to, insert: a }), r = e.nextMatch(t, r.from, r.to), h.push(k.announce.of(t.phrase("replaced match on line $", t.doc.lineAt(i).number) + "."))), r) {
    let c = o.length == 0 || o[0].from >= r.to ? 0 : r.to - r.from - a.length;
    l = y.single(r.from - c, r.to - c), h.push(al(n, r)), h.push(t.facet(xi).scrollToMatch(l.main, n));
  }
  return n.dispatch({
    changes: o,
    selection: l,
    effects: h,
    userEvent: "input.replace"
  }), !0;
}), ub = /* @__PURE__ */ fn((n, { query: e }) => {
  if (n.state.readOnly)
    return !1;
  let t = e.matchAll(n.state, 1e9).map((s) => {
    let { from: r, to: o } = s;
    return { from: r, to: o, insert: e.getReplacement(s) };
  });
  if (!t.length)
    return !1;
  let i = n.state.phrase("replaced $ matches", t.length) + ".";
  return n.dispatch({
    changes: t,
    effects: k.announce.of(i),
    userEvent: "input.replace.all"
  }), !0;
});
function ll(n) {
  return n.state.facet(xi).createPanel(n);
}
function vo(n, e) {
  var t, i, s, r, o;
  let l = n.selection.main, a = l.empty || l.to > l.from + 100 ? "" : n.sliceDoc(l.from, l.to);
  if (e && !a)
    return e;
  let h = n.facet(xi);
  return new ud({
    search: ((t = e == null ? void 0 : e.literal) !== null && t !== void 0 ? t : h.literal) ? a : a.replace(/\n/g, "\\n"),
    caseSensitive: (i = e == null ? void 0 : e.caseSensitive) !== null && i !== void 0 ? i : h.caseSensitive,
    literal: (s = e == null ? void 0 : e.literal) !== null && s !== void 0 ? s : h.literal,
    regexp: (r = e == null ? void 0 : e.regexp) !== null && r !== void 0 ? r : h.regexp,
    wholeWord: (o = e == null ? void 0 : e.wholeWord) !== null && o !== void 0 ? o : h.wholeWord
  });
}
function Od(n) {
  let e = Gi(n, ll);
  return e && e.dom.querySelector("[main-field]");
}
function pd(n) {
  let e = Od(n);
  e && e == n.root.activeElement && e.select();
}
const gd = (n) => {
  let e = n.state.field(vt, !1);
  if (e && e.panel) {
    let t = Od(n);
    if (t && t != n.root.activeElement) {
      let i = vo(n.state, e.query.spec);
      i.valid && n.dispatch({ effects: tn.of(i) }), t.focus(), t.select();
    }
  } else
    n.dispatch({ effects: [
      ol.of(!0),
      e ? tn.of(vo(n.state, e.query.spec)) : R.appendConfig.of(gb)
    ] });
  return !0;
}, md = (n) => {
  let e = n.state.field(vt, !1);
  if (!e || !e.panel)
    return !1;
  let t = Gi(n, ll);
  return t && t.dom.contains(n.root.activeElement) && n.focus(), n.dispatch({ effects: ol.of(!1) }), !0;
}, db = [
  { key: "Mod-f", run: gd, scope: "editor search-panel" },
  { key: "F3", run: Xs, shift: Ts, scope: "editor search-panel", preventDefault: !0 },
  { key: "Mod-g", run: Xs, shift: Ts, scope: "editor search-panel", preventDefault: !0 },
  { key: "Escape", run: md, scope: "editor search-panel" },
  { key: "Mod-Shift-l", run: fb },
  { key: "Alt-g", run: Iy },
  { key: "Mod-d", run: ib, preventDefault: !0 }
];
class Ob {
  constructor(e) {
    this.view = e;
    let t = this.query = e.state.field(vt).query.spec;
    this.commit = this.commit.bind(this), this.searchField = q("input", {
      value: t.search,
      placeholder: Pe(e, "Find"),
      "aria-label": Pe(e, "Find"),
      class: "cm-textfield",
      name: "search",
      form: "",
      "main-field": "true",
      onchange: this.commit,
      onkeyup: this.commit
    }), this.replaceField = q("input", {
      value: t.replace,
      placeholder: Pe(e, "Replace"),
      "aria-label": Pe(e, "Replace"),
      class: "cm-textfield",
      name: "replace",
      form: "",
      onchange: this.commit,
      onkeyup: this.commit
    }), this.caseField = q("input", {
      type: "checkbox",
      name: "case",
      form: "",
      checked: t.caseSensitive,
      onchange: this.commit
    }), this.reField = q("input", {
      type: "checkbox",
      name: "re",
      form: "",
      checked: t.regexp,
      onchange: this.commit
    }), this.wordField = q("input", {
      type: "checkbox",
      name: "word",
      form: "",
      checked: t.wholeWord,
      onchange: this.commit
    });
    function i(s, r, o) {
      return q("button", { class: "cm-button", name: s, onclick: r, type: "button" }, o);
    }
    this.dom = q("div", { onkeydown: (s) => this.keydown(s), class: "cm-search" }, [
      this.searchField,
      i("next", () => Xs(e), [Pe(e, "next")]),
      i("prev", () => Ts(e), [Pe(e, "previous")]),
      i("select", () => cb(e), [Pe(e, "all")]),
      q("label", null, [this.caseField, Pe(e, "match case")]),
      q("label", null, [this.reField, Pe(e, "regexp")]),
      q("label", null, [this.wordField, Pe(e, "by word")]),
      ...e.state.readOnly ? [] : [
        q("br"),
        this.replaceField,
        i("replace", () => Yh(e), [Pe(e, "replace")]),
        i("replaceAll", () => ub(e), [Pe(e, "replace all")])
      ],
      q("button", {
        name: "close",
        onclick: () => md(e),
        "aria-label": Pe(e, "close"),
        type: "button"
      }, ["×"])
    ]);
  }
  commit() {
    let e = new ud({
      search: this.searchField.value,
      caseSensitive: this.caseField.checked,
      regexp: this.reField.checked,
      wholeWord: this.wordField.checked,
      replace: this.replaceField.value
    });
    e.eq(this.query) || (this.query = e, this.view.dispatch({ effects: tn.of(e) }));
  }
  keydown(e) {
    xp(this.view, e, "search-panel") ? e.preventDefault() : e.keyCode == 13 && e.target == this.searchField ? (e.preventDefault(), (e.shiftKey ? Ts : Xs)(this.view)) : e.keyCode == 13 && e.target == this.replaceField && (e.preventDefault(), Yh(this.view));
  }
  update(e) {
    for (let t of e.transactions)
      for (let i of t.effects)
        i.is(tn) && !i.value.eq(this.query) && this.setQuery(i.value);
  }
  setQuery(e) {
    this.query = e, this.searchField.value = e.search, this.replaceField.value = e.replace, this.caseField.checked = e.caseSensitive, this.reField.checked = e.regexp, this.wordField.checked = e.wholeWord;
  }
  mount() {
    this.searchField.select();
  }
  get pos() {
    return 80;
  }
  get top() {
    return this.view.state.facet(xi).top;
  }
}
function Pe(n, e) {
  return n.state.phrase(e);
}
const An = 30, Vn = /[\s\.,:;?!]/;
function al(n, { from: e, to: t }) {
  let i = n.state.doc.lineAt(e), s = n.state.doc.lineAt(t).to, r = Math.max(i.from, e - An), o = Math.min(s, t + An), l = n.state.sliceDoc(r, o);
  if (r != i.from) {
    for (let a = 0; a < An; a++)
      if (!Vn.test(l[a + 1]) && Vn.test(l[a])) {
        l = l.slice(a);
        break;
      }
  }
  if (o != s) {
    for (let a = l.length - 1; a > l.length - An; a--)
      if (!Vn.test(l[a - 1]) && Vn.test(l[a])) {
        l = l.slice(0, a);
        break;
      }
  }
  return k.announce.of(`${n.state.phrase("current match")}. ${l} ${n.state.phrase("on line")} ${i.number}.`);
}
const pb = /* @__PURE__ */ k.baseTheme({
  ".cm-panel.cm-search": {
    padding: "2px 6px 4px",
    position: "relative",
    "& [name=close]": {
      position: "absolute",
      top: "0",
      right: "4px",
      backgroundColor: "inherit",
      border: "none",
      font: "inherit",
      padding: 0,
      margin: 0
    },
    "& input, & button, & label": {
      margin: ".2em .6em .2em 0"
    },
    "& input[type=checkbox]": {
      marginRight: ".2em"
    },
    "& label": {
      fontSize: "80%",
      whiteSpace: "pre"
    }
  },
  "&light .cm-searchMatch": { backgroundColor: "#ffff0054" },
  "&dark .cm-searchMatch": { backgroundColor: "#00ffff8a" },
  "&light .cm-searchMatch-selected": { backgroundColor: "#ff6a0054" },
  "&dark .cm-searchMatch-selected": { backgroundColor: "#ff00ff8a" }
}), gb = [
  vt,
  /* @__PURE__ */ jt.lowest(hb),
  pb
];
class mb {
  constructor(e, t, i) {
    this.from = e, this.to = t, this.diagnostic = i;
  }
}
let Zi = class Sd {
  constructor(e, t, i) {
    this.diagnostics = e, this.panel = t, this.selected = i;
  }
  static init(e, t, i) {
    let s = e, r = i.facet(Et).markerFilter;
    r && (s = r(s));
    let o = T.set(s.map((l) => l.from == l.to || l.from == l.to - 1 && i.doc.lineAt(l.from).to == l.from ? T.widget({
      widget: new Cb(l),
      diagnostic: l
    }).range(l.from) : T.mark({
      attributes: { class: "cm-lintRange cm-lintRange-" + l.severity + (l.markClass ? " " + l.markClass : "") },
      diagnostic: l
    }).range(l.from, l.to)), !0);
    return new Sd(o, t, yi(o));
  }
};
function yi(n, e = null, t = 0) {
  let i = null;
  return n.between(t, 1e9, (s, r, { spec: o }) => {
    if (!(e && o.diagnostic != e))
      return i = new mb(s, r, o.diagnostic), !1;
  }), i;
}
function Sb(n, e) {
  let t = n.startState.doc.lineAt(e.pos);
  return !!(n.effects.some((i) => i.is(hl)) || n.changes.touchesRange(t.from, t.to));
}
function yd(n, e) {
  return n.field(Re, !1) ? e : e.concat(R.appendConfig.of($d));
}
function yb(n, e) {
  return {
    effects: yd(n, [hl.of(e)])
  };
}
const hl = /* @__PURE__ */ R.define(), cl = /* @__PURE__ */ R.define(), bd = /* @__PURE__ */ R.define(), Re = /* @__PURE__ */ re.define({
  create() {
    return new Zi(T.none, null, null);
  },
  update(n, e) {
    if (e.docChanged) {
      let t = n.diagnostics.map(e.changes), i = null;
      if (n.selected) {
        let s = e.changes.mapPos(n.selected.from, 1);
        i = yi(t, n.selected.diagnostic, s) || yi(t, null, s);
      }
      n = new Zi(t, n.panel, i);
    }
    for (let t of e.effects)
      t.is(hl) ? n = Zi.init(t.value, n.panel, e.state) : t.is(cl) ? n = new Zi(n.diagnostics, t.value ? Ls.open : null, n.selected) : t.is(bd) && (n = new Zi(n.diagnostics, n.panel, t.value));
    return n;
  },
  provide: (n) => [
    fi.from(n, (e) => e.panel),
    k.decorations.from(n, (e) => e.diagnostics)
  ]
}), bb = /* @__PURE__ */ T.mark({ class: "cm-lintRange cm-lintRange-active" });
function Qb(n, e, t) {
  let { diagnostics: i } = n.state.field(Re), s = [], r = 2e8, o = 0;
  i.between(e - (t < 0 ? 1 : 0), e + (t > 0 ? 1 : 0), (a, h, { spec: c }) => {
    e >= a && e <= h && (a == h || (e > a || t > 0) && (e < h || t < 0)) && (s.push(c.diagnostic), r = Math.min(a, r), o = Math.max(h, o));
  });
  let l = n.state.facet(Et).tooltipFilter;
  return l && (s = l(s)), s.length ? {
    pos: r,
    end: o,
    above: n.state.doc.lineAt(r).to < o,
    create() {
      return { dom: xb(n, s) };
    }
  } : null;
}
function xb(n, e) {
  return q("ul", { class: "cm-tooltip-lint" }, e.map((t) => wd(n, t, !1)));
}
const wb = (n) => {
  let e = n.state.field(Re, !1);
  (!e || !e.panel) && n.dispatch({ effects: yd(n.state, [cl.of(!0)]) });
  let t = Gi(n, Ls.open);
  return t && t.dom.querySelector(".cm-panel-lint ul").focus(), !0;
}, Mh = (n) => {
  let e = n.state.field(Re, !1);
  return !e || !e.panel ? !1 : (n.dispatch({ effects: cl.of(!1) }), !0);
}, $b = (n) => {
  let e = n.state.field(Re, !1);
  if (!e)
    return !1;
  let t = n.state.selection.main, i = e.diagnostics.iter(t.to + 1);
  return !i.value && (i = e.diagnostics.iter(0), !i.value || i.from == t.from && i.to == t.to) ? !1 : (n.dispatch({ selection: { anchor: i.from, head: i.to }, scrollIntoView: !0 }), !0);
}, kb = [
  { key: "Mod-Shift-m", run: wb, preventDefault: !0 },
  { key: "F8", run: $b }
], Qd = /* @__PURE__ */ ee.fromClass(class {
  constructor(n) {
    this.view = n, this.timeout = -1, this.set = !0;
    let { delay: e } = n.state.facet(Et);
    this.lintTime = Date.now() + e, this.run = this.run.bind(this), this.timeout = setTimeout(this.run, e);
  }
  run() {
    let n = Date.now();
    if (n < this.lintTime - 10)
      setTimeout(this.run, this.lintTime - n);
    else {
      this.set = !1;
      let { state: e } = this.view, { sources: t } = e.facet(Et);
      Promise.all(t.map((i) => Promise.resolve(i(this.view)))).then((i) => {
        let s = i.reduce((r, o) => r.concat(o));
        this.view.state.doc == e.doc && this.view.dispatch(yb(this.view.state, s));
      }, (i) => {
        Ae(this.view.state, i);
      });
    }
  }
  update(n) {
    let e = n.state.facet(Et);
    (n.docChanged || e != n.startState.facet(Et) || e.needsRefresh && e.needsRefresh(n)) && (this.lintTime = Date.now() + e.delay, this.set || (this.set = !0, this.timeout = setTimeout(this.run, e.delay)));
  }
  force() {
    this.set && (this.lintTime = Date.now(), this.run());
  }
  destroy() {
    clearTimeout(this.timeout);
  }
}), Et = /* @__PURE__ */ P.define({
  combine(n) {
    return Object.assign({ sources: n.map((e) => e.source) }, lt(n.map((e) => e.config), {
      delay: 750,
      markerFilter: null,
      tooltipFilter: null,
      needsRefresh: null
    }, {
      needsRefresh: (e, t) => e ? t ? (i) => e(i) || t(i) : e : t
    }));
  }
});
function vb(n, e = {}) {
  return [
    Et.of({ source: n, config: e }),
    Qd,
    $d
  ];
}
function Pb(n) {
  let e = n.plugin(Qd);
  e && e.force();
}
function xd(n) {
  let e = [];
  if (n)
    e:
      for (let { name: t } of n) {
        for (let i = 0; i < t.length; i++) {
          let s = t[i];
          if (/[a-zA-Z]/.test(s) && !e.some((r) => r.toLowerCase() == s.toLowerCase())) {
            e.push(s);
            continue e;
          }
        }
        e.push("");
      }
  return e;
}
function wd(n, e, t) {
  var i;
  let s = t ? xd(e.actions) : [];
  return q("li", { class: "cm-diagnostic cm-diagnostic-" + e.severity }, q("span", { class: "cm-diagnosticText" }, e.renderMessage ? e.renderMessage() : e.message), (i = e.actions) === null || i === void 0 ? void 0 : i.map((r, o) => {
    let l = !1, a = (u) => {
      if (u.preventDefault(), l)
        return;
      l = !0;
      let d = yi(n.state.field(Re).diagnostics, e);
      d && r.apply(n, d.from, d.to);
    }, { name: h } = r, c = s[o] ? h.indexOf(s[o]) : -1, f = c < 0 ? h : [
      h.slice(0, c),
      q("u", h.slice(c, c + 1)),
      h.slice(c + 1)
    ];
    return q("button", {
      type: "button",
      class: "cm-diagnosticAction",
      onclick: a,
      onmousedown: a,
      "aria-label": ` Action: ${h}${c < 0 ? "" : ` (access key "${s[o]})"`}.`
    }, f);
  }), e.source && q("div", { class: "cm-diagnosticSource" }, e.source));
}
let Cb = class extends St {
  constructor(e) {
    super(), this.diagnostic = e;
  }
  eq(e) {
    return e.diagnostic == this.diagnostic;
  }
  toDOM() {
    return q("span", { class: "cm-lintPoint cm-lintPoint-" + this.diagnostic.severity });
  }
};
class Wh {
  constructor(e, t) {
    this.diagnostic = t, this.id = "item_" + Math.floor(Math.random() * 4294967295).toString(16), this.dom = wd(e, t, !0), this.dom.id = this.id, this.dom.setAttribute("role", "option");
  }
}
class Ls {
  constructor(e) {
    this.view = e, this.items = [];
    let t = (s) => {
      if (s.keyCode == 27)
        Mh(this.view), this.view.focus();
      else if (s.keyCode == 38 || s.keyCode == 33)
        this.moveSelection((this.selectedIndex - 1 + this.items.length) % this.items.length);
      else if (s.keyCode == 40 || s.keyCode == 34)
        this.moveSelection((this.selectedIndex + 1) % this.items.length);
      else if (s.keyCode == 36)
        this.moveSelection(0);
      else if (s.keyCode == 35)
        this.moveSelection(this.items.length - 1);
      else if (s.keyCode == 13)
        this.view.focus();
      else if (s.keyCode >= 65 && s.keyCode <= 90 && this.selectedIndex >= 0) {
        let { diagnostic: r } = this.items[this.selectedIndex], o = xd(r.actions);
        for (let l = 0; l < o.length; l++)
          if (o[l].toUpperCase().charCodeAt(0) == s.keyCode) {
            let a = yi(this.view.state.field(Re).diagnostics, r);
            a && r.actions[l].apply(e, a.from, a.to);
          }
      } else
        return;
      s.preventDefault();
    }, i = (s) => {
      for (let r = 0; r < this.items.length; r++)
        this.items[r].dom.contains(s.target) && this.moveSelection(r);
    };
    this.list = q("ul", {
      tabIndex: 0,
      role: "listbox",
      "aria-label": this.view.state.phrase("Diagnostics"),
      onkeydown: t,
      onclick: i
    }), this.dom = q("div", { class: "cm-panel-lint" }, this.list, q("button", {
      type: "button",
      name: "close",
      "aria-label": this.view.state.phrase("close"),
      onclick: () => Mh(this.view)
    }, "×")), this.update();
  }
  get selectedIndex() {
    let e = this.view.state.field(Re).selected;
    if (!e)
      return -1;
    for (let t = 0; t < this.items.length; t++)
      if (this.items[t].diagnostic == e.diagnostic)
        return t;
    return -1;
  }
  update() {
    let { diagnostics: e, selected: t } = this.view.state.field(Re), i = 0, s = !1, r = null;
    for (e.between(0, this.view.state.doc.length, (o, l, { spec: a }) => {
      let h = -1, c;
      for (let f = i; f < this.items.length; f++)
        if (this.items[f].diagnostic == a.diagnostic) {
          h = f;
          break;
        }
      h < 0 ? (c = new Wh(this.view, a.diagnostic), this.items.splice(i, 0, c), s = !0) : (c = this.items[h], h > i && (this.items.splice(i, h - i), s = !0)), t && c.diagnostic == t.diagnostic ? c.dom.hasAttribute("aria-selected") || (c.dom.setAttribute("aria-selected", "true"), r = c) : c.dom.hasAttribute("aria-selected") && c.dom.removeAttribute("aria-selected"), i++;
    }); i < this.items.length && !(this.items.length == 1 && this.items[0].diagnostic.from < 0); )
      s = !0, this.items.pop();
    this.items.length == 0 && (this.items.push(new Wh(this.view, {
      from: -1,
      to: -1,
      severity: "info",
      message: this.view.state.phrase("No diagnostics")
    })), s = !0), r ? (this.list.setAttribute("aria-activedescendant", r.id), this.view.requestMeasure({
      key: this,
      read: () => ({ sel: r.dom.getBoundingClientRect(), panel: this.list.getBoundingClientRect() }),
      write: ({ sel: o, panel: l }) => {
        o.top < l.top ? this.list.scrollTop -= l.top - o.top : o.bottom > l.bottom && (this.list.scrollTop += o.bottom - l.bottom);
      }
    })) : this.selectedIndex < 0 && this.list.removeAttribute("aria-activedescendant"), s && this.sync();
  }
  sync() {
    let e = this.list.firstChild;
    function t() {
      let i = e;
      e = i.nextSibling, i.remove();
    }
    for (let i of this.items)
      if (i.dom.parentNode == this.list) {
        for (; e != i.dom; )
          t();
        e = i.dom.nextSibling;
      } else
        this.list.insertBefore(i.dom, e);
    for (; e; )
      t();
  }
  moveSelection(e) {
    if (this.selectedIndex < 0)
      return;
    let t = this.view.state.field(Re), i = yi(t.diagnostics, this.items[e].diagnostic);
    i && this.view.dispatch({
      selection: { anchor: i.from, head: i.to },
      scrollIntoView: !0,
      effects: bd.of(i)
    });
  }
  static open(e) {
    return new Ls(e);
  }
}
function Xb(n, e = 'viewBox="0 0 40 40"') {
  return `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ${e}>${encodeURIComponent(n)}</svg>')`;
}
function Yn(n) {
  return Xb(`<path d="m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0" stroke="${n}" fill="none" stroke-width=".7"/>`, 'width="6" height="3"');
}
const Tb = /* @__PURE__ */ k.baseTheme({
  ".cm-diagnostic": {
    padding: "3px 6px 3px 8px",
    marginLeft: "-1px",
    display: "block",
    whiteSpace: "pre-wrap"
  },
  ".cm-diagnostic-error": { borderLeft: "5px solid #d11" },
  ".cm-diagnostic-warning": { borderLeft: "5px solid orange" },
  ".cm-diagnostic-info": { borderLeft: "5px solid #999" },
  ".cm-diagnostic-hint": { borderLeft: "5px solid #66d" },
  ".cm-diagnosticAction": {
    font: "inherit",
    border: "none",
    padding: "2px 4px",
    backgroundColor: "#444",
    color: "white",
    borderRadius: "3px",
    marginLeft: "8px",
    cursor: "pointer"
  },
  ".cm-diagnosticSource": {
    fontSize: "70%",
    opacity: 0.7
  },
  ".cm-lintRange": {
    backgroundPosition: "left bottom",
    backgroundRepeat: "repeat-x",
    paddingBottom: "0.7px"
  },
  ".cm-lintRange-error": { backgroundImage: /* @__PURE__ */ Yn("#d11") },
  ".cm-lintRange-warning": { backgroundImage: /* @__PURE__ */ Yn("orange") },
  ".cm-lintRange-info": { backgroundImage: /* @__PURE__ */ Yn("#999") },
  ".cm-lintRange-hint": { backgroundImage: /* @__PURE__ */ Yn("#66d") },
  ".cm-lintRange-active": { backgroundColor: "#ffdd9980" },
  ".cm-tooltip-lint": {
    padding: 0,
    margin: 0
  },
  ".cm-lintPoint": {
    position: "relative",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: "-2px",
      borderLeft: "3px solid transparent",
      borderRight: "3px solid transparent",
      borderBottom: "4px solid #d11"
    }
  },
  ".cm-lintPoint-warning": {
    "&:after": { borderBottomColor: "orange" }
  },
  ".cm-lintPoint-info": {
    "&:after": { borderBottomColor: "#999" }
  },
  ".cm-lintPoint-hint": {
    "&:after": { borderBottomColor: "#66d" }
  },
  ".cm-panel.cm-panel-lint": {
    position: "relative",
    "& ul": {
      maxHeight: "100px",
      overflowY: "auto",
      "& [aria-selected]": {
        backgroundColor: "#ddd",
        "& u": { textDecoration: "underline" }
      },
      "&:focus [aria-selected]": {
        background_fallback: "#bdf",
        backgroundColor: "Highlight",
        color_fallback: "white",
        color: "HighlightText"
      },
      "& u": { textDecoration: "none" },
      padding: 0,
      margin: 0
    },
    "& [name=close]": {
      position: "absolute",
      top: "0",
      right: "2px",
      background: "inherit",
      border: "none",
      font: "inherit",
      padding: 0,
      margin: 0
    }
  }
}), $d = [
  Re,
  /* @__PURE__ */ k.decorations.compute([Re], (n) => {
    let { selected: e, panel: t } = n.field(Re);
    return !e || !t || e.from == e.to ? T.none : T.set([
      bb.range(e.from, e.to)
    ]);
  }),
  /* @__PURE__ */ lg(Qb, { hideOn: Sb }),
  Tb
], Zb = /* @__PURE__ */ (() => [
  gg(),
  yg(),
  Up(),
  Dm(),
  fm(),
  Cp(),
  Ap(),
  M.allowMultipleSelections.of(!0),
  Kg(),
  Tf(pm, { fallback: !0 }),
  xm(),
  ty(),
  uy(),
  Hp(),
  eg(),
  Ip(),
  Ny(),
  on.of([
    ...ry,
    ...M0,
    ...db,
    ...Lm,
    ...am,
    ...zu,
    ...kb
  ])
])(), Rb = Zs({
  components: {
    ArrowTopRightOnSquareIcon: Rd
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
const fl = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [i, s] of e)
    t[i] = s;
  return t;
}, Ab = { class: "capsule-editor-error" }, Vb = ["href"];
function Yb(n, e, t, i, s, r) {
  const o = Xr("ArrowTopRightOnSquareIcon");
  return ge(), Je("div", Ab, [
    Te("code", null, [
      Te("span", null, ut(n.error.line) + "," + ut(n.error.col) + " :: (" + ut(n.error.rule.id) + ") " + ut(n.error.message), 1),
      Te("a", {
        href: n.url,
        target: "_blank"
      }, [
        Tr(" Reference "),
        ct(o)
      ], 8, Vb)
    ])
  ]);
}
const Mb = /* @__PURE__ */ fl(Rb, [["render", Yb]]), Wb = { class: "editor-footer" }, Db = {
  key: 0,
  class: "flex justify-between items-center w-full py-2"
}, Ub = { class: "flex items-center w-full overflow-hidden relative gap-2" }, qb = { class: "editor-footer-pager" }, Eb = { key: 0 }, _b = { class: "editor-footer-diagnostic" }, Bb = { class: "editor-footer-action" }, zb = ["onClick"], Ib = /* @__PURE__ */ Zs({
  __name: "EditorFooter",
  props: {
    saveButton: { type: Boolean, default: !0 },
    saveButtonLabel: { default: "Save Changes" },
    view: { default: void 0 }
  },
  emits: ["goto", "update:modelValue", "save"],
  setup(n, { expose: e, emit: t }) {
    const i = n, s = Gs(), r = Gs([]), o = Gs(!1), l = Cd(() => Math.max(0, s.value ? r.value.indexOf(s.value) : 0));
    function a(d) {
      d < 0 ? d = r.value.length - 1 : d > r.value.length - 1 && (d = 0);
      const O = s.value;
      s.value = r.value[d], t("goto", s.value, O);
    }
    function h(d, O) {
      return !!d && !!O && d.from === O.from && d.to === O.to && d.rule.id === O.rule.id;
    }
    function c(d) {
      r.value = d, o.value = !0, s.value || (s.value = r.value[l.value]), t("update:modelValue", r);
    }
    function f(d) {
      const { from: O, to: m } = d.state.selection.main, g = r.value.filter((b) => O === m ? b.from <= O && b.to >= m : b.from >= O && b.to <= m), S = r.value.find((b) => h(b, s.value));
      if (g.length) {
        const b = Math.max(0, s.value ? g.indexOf(s.value) : 0);
        s.value = g[b];
      } else
        s.value = S || r.value[l.value];
    }
    function u(d, O) {
      i.view && (O.apply(i.view, d.from, d.to), Pb(i.view));
    }
    return e({
      activate: f,
      update: c
    }), (d, O) => (ge(), Je("footer", Wb, [
      ct(Le(Ol), {
        name: "fade",
        duration: 200
      }, {
        default: Ve(() => {
          var m;
          return [
            o.value ? (ge(), Je("div", Db, [
              Te("div", Ub, [
                Te("div", qb, [
                  (m = r.value) != null && m.length ? (ge(), Je("div", Eb, [
                    ct(Le(dn), {
                      type: "button",
                      variant: "link",
                      onClick: O[0] || (O[0] = (g) => a(l.value - 1))
                    }, {
                      default: Ve(() => [
                        ct(Le(Ad), { class: "w-4 h-4" })
                      ]),
                      _: 1
                    }),
                    Te("span", null, ut(l.value + 1) + " of " + ut(r.value.length), 1),
                    ct(Le(dn), {
                      type: "button",
                      variant: "link",
                      onClick: O[1] || (O[1] = (g) => a(l.value + 1))
                    }, {
                      default: Ve(() => [
                        ct(Le(Vd), { class: "w-4 h-4" })
                      ]),
                      _: 1
                    })
                  ])) : Mt("", !0)
                ]),
                s.value ? (ge(), Je("button", {
                  key: 0,
                  type: "button",
                  onClick: O[2] || (O[2] = (g) => a(l.value))
                }, [
                  ct(Le(Yd), { class: "w-6 h-6" })
                ])) : Mt("", !0),
                Te("div", _b, [
                  ct(Le(Ol), {
                    name: "fade",
                    duration: 200,
                    "leave-active-class": "position-absolute"
                  }, {
                    default: Ve(() => [
                      s.value ? (ge(), Ri(Mb, {
                        key: l.value,
                        error: s.value
                      }, null, 8, ["error"])) : Mt("", !0)
                    ]),
                    _: 1
                  })
                ])
              ]),
              Te("div", Bb, [
                Be(d.$slots, "before-save-button"),
                Be(d.$slots, "action-button", {}, () => {
                  var g;
                  return [
                    s.value && ((g = s.value.actions) != null && g.length) ? (ge(), Je(dl, { key: 0 }, [
                      s.value.actions.length === 1 ? (ge(), Ri(Le(dn), {
                        key: 0,
                        type: "button",
                        variant: "light",
                        size: "sm",
                        class: "flex items-center gap-2",
                        onClick: O[3] || (O[3] = (S) => u(s.value, s.value.actions[0]))
                      }, {
                        default: Ve(() => [
                          Tr(ut(s.value.actions[0].name), 1)
                        ]),
                        _: 1
                      })) : (ge(), Ri(Le(Md), {
                        key: 1,
                        label: "Fix Errors",
                        type: "button",
                        size: "sm",
                        variant: "light",
                        dropup: ""
                      }, {
                        default: Ve(() => [
                          (ge(!0), Je(dl, null, Xd(s.value.actions, (S, b) => (ge(), Je("button", {
                            key: `${s.value.rule.id}-${b}`,
                            type: "button",
                            variant: "light",
                            onClick: (v) => u(s.value, S)
                          }, ut(S.name), 9, zb))), 128))
                        ]),
                        _: 1
                      }))
                    ], 64)) : Mt("", !0)
                  ];
                }),
                Be(d.$slots, "save-button", {
                  diagnostics: r.value,
                  saveButtonLabel: r.value
                }, () => [
                  d.saveButton && !r.value.length ? (ge(), Ri(Le(dn), {
                    key: 0,
                    type: "button",
                    variant: "light",
                    size: "sm",
                    onClick: O[4] || (O[4] = (g) => t("save"))
                  }, {
                    default: Ve(() => [
                      Tr(ut(d.saveButtonLabel), 1)
                    ]),
                    _: 1
                  })) : Mt("", !0)
                ]),
                Be(d.$slots, "after-save-button", { diagnostics: r.value })
              ])
            ])) : Mt("", !0)
          ];
        }),
        _: 3
      })
    ]));
  }
});
const jb = Zs({
  model: {
    prop: "currentValue"
  },
  props: {
    disableFilename: Boolean,
    filename: {
      type: String,
      default: void 0
    }
  },
  emits: [
    "update:filename"
  ],
  data() {
    return {
      currentValue: this.filename
    };
  }
});
const Lb = { class: "editor-toolbar" }, Nb = { class: "editor-toolbar-left" }, Gb = { class: "editor-toolbar-title" }, Fb = ["disabled"], Hb = { class: "editor-toolbar-right" };
function Jb(n, e, t, i, s, r) {
  return ge(), Je("div", Lb, [
    Te("div", Nb, [
      Be(n.$slots, "left")
    ]),
    Te("div", Gb, [
      Td(Te("input", {
        "onUpdate:modelValue": e[0] || (e[0] = (o) => n.currentValue = o),
        type: "text",
        placeholder: "Untitled Document",
        disabled: n.disableFilename,
        onInput: e[1] || (e[1] = (o) => n.$emit("update:filename", n.currentValue))
      }, null, 40, Fb), [
        [Zd, n.currentValue]
      ])
    ]),
    Te("div", Hb, [
      Be(n.$slots, "right")
    ])
  ]);
}
const Kb = /* @__PURE__ */ fl(jb, [["render", Jb]]), eQ = [{
  name: "Remove Attribute",
  apply(n, e, t) {
    n.dispatch({
      changes: { from: e, to: t, insert: "" }
    });
  }
}, {
  name: "Rename Attribute",
  apply(n, e, t) {
    const i = n.state.doc.slice(e, t).toString().match(/(?:\s+)?(\w+)=/);
    if (!i)
      return;
    const [s, r] = i, o = e + s.indexOf(r), l = n.state.update({
      selection: {
        anchor: o,
        head: o + r.length
      },
      scrollIntoView: !0
    });
    n.dispatch(l), n.focus();
  }
}], tQ = [{
  name: "Fix Error",
  apply(n, e, t) {
    n.dispatch({
      changes: { from: e, to: t, insert: "" }
    });
  }
}], iQ = [{
  name: "Fix Error",
  apply(n, e, t) {
    const i = n.state.doc.slice(e, t).toString().match(/(?:\s+)?([<&>]|\&\s)/);
    if (!i)
      return;
    const s = {
      "<": "&lt;",
      ">": "&rt;",
      "&": "&amp;"
    }, [r, o] = i, l = r.indexOf(o);
    n.dispatch({
      changes: { from: e + l, to: e + l + 1, insert: s[o] }
    });
  }
}], nQ = [{
  name: "Remove Img",
  apply(n, e) {
    const t = I(n.state).cursor(e);
    n.dispatch({
      changes: { from: t.from, to: t.to, insert: "" }
    });
  }
}];
class sQ {
  constructor(e, t, i) {
    Ns(this, "tagName");
    Ns(this, "closed");
    this.view = e, this.from = t, this.to = i, this.from = t, this.to = i, this.tagName = kd(e, t, i), this.closed = !1;
  }
  is(e) {
    var t;
    return ((t = this.tagName) == null ? void 0 : t.toLowerCase()) === e.toLowerCase();
  }
}
function kd(n, e, t) {
  var i;
  return (i = n.state.doc.sliceString(e ?? 0, t).toLowerCase().match(/^<\/?(?:\s+)?(\w+)/)) == null ? void 0 : i[1];
}
function Dh(n, e, t) {
  let i, s;
  const r = [];
  return I(n.state).iterate({
    enter(l) {
      l.type.name === "Element" ? r.push(i = new sQ(n, l.from, l.to)) : l.type.name === "SelfClosingTag" && r.splice(r.indexOf(i), 1);
    },
    leave(l) {
      if (l.type.name === "CloseTag")
        for (s = r.length - 1; s >= 0; s--) {
          const a = kd(n, e, t);
          if (a && !r[s].closed && r[s].is(a)) {
            r[s].closed = !0;
            break;
          }
        }
    }
  }), r.filter((l) => !l.closed).reverse().map(({ to: l, tagName: a }) => ({
    from: l,
    to: l,
    insert: `</${a}>`
  }));
}
const rQ = [{
  name: "Close Only First Tag",
  apply(n, e, t) {
    let i = [];
    do
      i = Dh(n, e, t), e -= 10;
    while (e >= 0 && !i.length);
    n.dispatch({
      changes: i.slice(0, 1)
    });
  }
}, {
  name: "Close All Tags",
  apply(n) {
    n.dispatch({
      changes: Dh(n)
    });
  }
}], oQ = [{
  name: "Fix Path",
  apply(n, e, t) {
    const i = n.state.doc.slice(e, t).toString().match(/(=(?:\s+)?['"])(.+)?['"]/);
    if (!i)
      return;
    const [s, r, o] = i, l = e + r.length + (i.index ?? 0), a = n.state.update({
      selection: {
        anchor: l,
        head: l + (o ? o.length : 0)
      },
      scrollIntoView: !0
    });
    n.dispatch(a), n.focus();
  }
}, {
  name: "Remove Attribute",
  apply(n, e, t) {
    n.dispatch({
      changes: { from: e, to: t, insert: "" }
    });
  }
}, {
  name: "Remove Tag",
  apply(n, e) {
    const t = I(n.state).cursor(e);
    t.moveTo(t.to), n.dispatch({
      changes: { from: t.from, to: t.to, insert: "" }
    });
  }
}], Uh = {
  "attr-no-duplication": eQ,
  "invalid-attribute-char": tQ,
  "spec-char-escape": iQ,
  "src-not-empty": nQ,
  "tag-pair": rQ,
  "valid-path-format": oQ
};
class qh extends St {
  constructor(e) {
    super(), this.diagnostic = e, this.diagnostic = e;
  }
  line(e) {
    this.diagnostic.line = e;
  }
  col(e) {
    this.diagnostic.col = e;
  }
  from(e) {
    this.diagnostic.from = e;
  }
  to(e) {
    this.diagnostic.to = e;
  }
  eq(e) {
    return e.diagnostic == this.diagnostic;
  }
  toDOM() {
    return document.createElement("span");
  }
  ignoreEvent() {
    return !1;
  }
}
class _i {
  constructor(e) {
    this.decorations = e, this.decorations = e;
  }
  get length() {
    return this.decorations.length;
  }
  get diagnostics() {
    const e = [];
    return this.iter((t) => {
      e.push(t.value);
    }), e.reduce((t, { widget: i }) => (t.indexOf(i.diagnostic) === -1 && t.push(i.diagnostic), t), []);
  }
  map(e) {
    return this.decorations.map(e);
  }
  iter(e) {
    const t = this.decorations.iter();
    for (; t.value; )
      e(t), t.next();
  }
  sync(e) {
    const t = [];
    return this.iter((i) => {
      if (i.value.spec.side)
        i.value.widget.to(i.to);
      else {
        const s = e.doc.lineAt(i.from);
        i.value.widget.col(i.from - s.from + 1), i.value.widget.from(i.from), i.value.widget.line(s.number);
      }
      t.push(i.value);
    }), t.reduce((i, { widget: s }) => (i.indexOf(s.diagnostic) === -1 && i.push(s.diagnostic), i), []);
  }
  static init(e) {
    const t = e.map((i) => {
      const s = T.widget({
        widget: new qh(i),
        diagnostic: i,
        side: 0
      }).range(i.from), r = T.widget({
        widget: new qh(i),
        diagnostic: i,
        side: 1,
        from: s
      }).range(i.to);
      return [
        s,
        r
      ];
    });
    return new _i(
      T.set(t.flat(), !0)
    );
  }
}
const Po = R.define(), Fn = re.define({
  create() {
    return new _i(T.none);
  },
  update(n, e) {
    if (e.docChanged && n.length)
      return new _i(n.map(e.changes));
    for (const t of e.effects)
      if (t.is(Po))
        return _i.init(t.value);
    return n;
  },
  provide(n) {
    return [
      vb((e) => {
        const { doc: t } = e.state.toJSON(), i = Wd(t).map((s) => {
          const r = e.state.doc.line(s.line), o = Math.min(t.length, r.from - 1 + s.col), l = Math.min(t.length, o + s.raw.length);
          return {
            from: o,
            to: l,
            col: s.col,
            line: s.line,
            rule: s.rule,
            message: s.message,
            severity: s.type,
            source: s.rule.id,
            actions: s.rule.id in Uh && Uh[s.rule.id]
          };
        });
        return e.dispatch({
          effects: Po.of(i)
        }), i;
      }),
      k.decorations.from(n, (e) => e.decorations),
      k.updateListener.of((e) => {
        e.docChanged && e.state.field(Fn).sync(e.view.state);
      })
    ];
  }
});
function lQ(n) {
  return [
    Fn,
    fi.of(() => ({
      bottom: !0,
      dom: n.$refs.footer.$el
    })),
    k.updateListener.of((e) => {
      if (n.$refs.footer) {
        e.docChanged && n.$refs.footer.update(
          e.state.field(Fn).diagnostics
        );
        for (const t of e.transactions)
          for (const i of t.effects)
            i.is(Po) && n.$refs.footer.update(
              e.state.field(Fn).diagnostics
            );
        n.$refs.footer.activate(e);
      }
    })
  ];
}
const aQ = Zs({
  components: {
    EditorFooter: Ib,
    EditorToolbar: Kb
  },
  props: {
    content: {
      type: String,
      default: void 0
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
    "fixed-errors",
    "update:content",
    "update:filename",
    "save"
  ],
  data() {
    return {
      errors: [],
      hasDismissedFinishPopup: !1,
      showFinishModal: !1,
      view: void 0
    };
  },
  watch: {
    errors(n, e) {
      !n.length && e.length && this.$emit("fixed-errors");
    }
  },
  mounted() {
    this.view = new k({
      extensions: [
        Zb
      ],
      state: M.create({
        doc: this.content,
        extensions: [
          By,
          on.of([W0]),
          Ty(),
          lQ(this),
          k.lineWrapping,
          k.updateListener.of((n) => {
            n.docChanged && this.$emit("update:content", n.state.doc.toString());
          })
        ].filter((n) => !!n)
      }),
      parent: this.$refs.wrapper
    });
  },
  methods: {
    onGoto({ from: n, to: e }) {
      this.view.dispatch({
        selection: y.create([
          y.range(n, e),
          y.cursor(n)
        ]),
        scrollIntoView: !0
      }), this.view.focus();
    },
    onSave() {
      this.$emit("save");
    }
  }
});
const hQ = { class: "capsule-editor" }, cQ = {
  ref: "wrapper",
  class: "cm-wrapper"
};
function fQ(n, e, t, i, s, r) {
  const o = Xr("editor-toolbar"), l = Xr("editor-footer");
  return ge(), Je("div", hQ, [
    n.toolbar ? (ge(), Ri(o, {
      key: 0,
      ref: "toolbar",
      "disable-filename": n.disableFilename,
      filename: n.filename,
      "onUpdate:filename": e[0] || (e[0] = (a) => n.$emit("update:filename", a))
    }, {
      left: Ve(() => [
        Be(n.$slots, "toolbar-left", {
          errors: n.errors,
          filename: n.filename,
          content: n.content
        })
      ]),
      right: Ve(() => [
        Be(n.$slots, "toolbar-right", {
          errors: n.errors,
          filename: n.filename,
          content: n.content
        })
      ]),
      _: 3
    }, 8, ["disable-filename", "filename"])) : Mt("", !0),
    Te("div", cQ, null, 512),
    ct(l, {
      ref: "footer",
      modelValue: n.errors,
      "onUpdate:modelValue": e[1] || (e[1] = (a) => n.errors = a),
      "save-button": n.saveButton,
      view: n.view,
      onSave: n.onSave,
      onGoto: n.onGoto
    }, {
      "before-save-button": Ve(() => [
        Be(n.$slots, "before-save-button", {
          errors: n.errors,
          filename: n.filename,
          content: n.content
        })
      ]),
      "save-button": Ve(() => [
        Be(n.$slots, "save-button", {
          errors: n.errors,
          filename: n.filename,
          content: n.content
        })
      ]),
      "after-save-button": Ve(() => [
        Be(n.$slots, "after-save-button", {
          errors: n.errors,
          filename: n.filename,
          content: n.content
        })
      ]),
      _: 3
    }, 8, ["modelValue", "save-button", "view", "onSave", "onGoto"])
  ]);
}
const xQ = /* @__PURE__ */ fl(aQ, [["render", fQ]]);
export {
  xQ as Editor
};
//# sourceMappingURL=capsule-editor.js.map

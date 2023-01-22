import { defineComponent as Ce, useSlots as Hg, computed as Gi, openBlock as j, createBlock as fe, Transition as Jg, unref as Dl, withCtx as z, renderSlot as N, resolveDynamicComponent as Yr, mergeProps as ai, createTextVNode as gt, toDisplayString as ke, createElementBlock as ie, createElementVNode as ne, h as Kg, Fragment as _s, resolveComponent as $, normalizeClass as lt, normalizeProps as ni, guardReactiveProps as gn, createVNode as de, normalizeStyle as gu, withKeys as Au, withModifiers as pu, createCommentVNode as ue, createSlots as $g, renderList as _g, withDirectives as eA, vModelText as tA } from "vue";
let Ci = /* @__PURE__ */ "lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map((i) => i ? parseInt(i, 36) : 1);
for (let i = 1; i < Ci.length; i++)
  Ci[i] += Ci[i - 1];
function iA(i) {
  for (let e = 1; e < Ci.length; e += 2)
    if (Ci[e] > i)
      return Ci[e - 1] <= i;
  return !1;
}
function Ll(i) {
  return i >= 127462 && i <= 127487;
}
const Wl = 8205;
function je(i, e, t = !0, n = !0) {
  return (t ? Ou : nA)(i, e, n);
}
function Ou(i, e, t) {
  if (e == i.length)
    return e;
  e && mu(i.charCodeAt(e)) && Qu(i.charCodeAt(e - 1)) && e--;
  let n = we(i, e);
  for (e += Ye(n); e < i.length; ) {
    let r = we(i, e);
    if (n == Wl || r == Wl || t && iA(r))
      e += Ye(r), n = r;
    else if (Ll(r)) {
      let s = 0, o = e - 2;
      for (; o >= 0 && Ll(we(i, o)); )
        s++, o -= 2;
      if (s % 2 == 0)
        break;
      e += 2;
    } else
      break;
  }
  return e;
}
function nA(i, e, t) {
  for (; e > 0; ) {
    let n = Ou(i, e - 2, t);
    if (n < e)
      return n;
    e--;
  }
  return 0;
}
function mu(i) {
  return i >= 56320 && i < 57344;
}
function Qu(i) {
  return i >= 55296 && i < 56320;
}
function we(i, e) {
  let t = i.charCodeAt(e);
  if (!Qu(t) || e + 1 == i.length)
    return t;
  let n = i.charCodeAt(e + 1);
  return mu(n) ? (t - 55296 << 10) + (n - 56320) + 65536 : t;
}
function $o(i) {
  return i <= 65535 ? String.fromCharCode(i) : (i -= 65536, String.fromCharCode((i >> 10) + 55296, (i & 1023) + 56320));
}
function Ye(i) {
  return i < 65536 ? 1 : 2;
}
function kn(i, e, t = i.length) {
  let n = 0;
  for (let r = 0; r < t; )
    i.charCodeAt(r) == 9 ? (n += e - n % e, r++) : (n++, r = je(i, r));
  return n;
}
function eo(i, e, t, n) {
  for (let r = 0, s = 0; ; ) {
    if (s >= e)
      return r;
    if (r == i.length)
      break;
    s += i.charCodeAt(r) == 9 ? t - s % t : 1, r = je(i, r);
  }
  return n === !0 ? -1 : i.length;
}
class G {
  /**
  @internal
  */
  constructor() {
  }
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
  replace(e, t, n) {
    let r = [];
    return this.decompose(
      0,
      e,
      r,
      2
      /* To */
    ), n.length && n.decompose(
      0,
      n.length,
      r,
      3
      /* To */
    ), this.decompose(
      t,
      this.length,
      r,
      1
      /* From */
    ), ht.from(r, this.length - (t - e) + n.length);
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
    let n = [];
    return this.decompose(e, t, n, 0), ht.from(n, t - e);
  }
  /**
  Test whether this text is equal to another instance.
  */
  eq(e) {
    if (e == this)
      return !0;
    if (e.length != this.length || e.lines != this.lines)
      return !1;
    let t = this.scanIdentical(e, 1), n = this.length - this.scanIdentical(e, -1), r = new an(this), s = new an(e);
    for (let o = t, a = t; ; ) {
      if (r.next(o), s.next(o), o = 0, r.lineBreak != s.lineBreak || r.done != s.done || r.value != s.value)
        return !1;
      if (a += r.value.length, r.done || a >= n)
        return !0;
    }
  }
  /**
  Iterate over the text. When `dir` is `-1`, iteration happens
  from end to start. This will return lines and the breaks between
  them as separate strings, and for long lines, might split lines
  themselves into multiple chunks as well.
  */
  iter(e = 1) {
    return new an(this, e);
  }
  /**
  Iterate over a range of the text. When `from` > `to`, the
  iterator will run in reverse.
  */
  iterRange(e, t = this.length) {
    return new bu(this, e, t);
  }
  /**
  Return a cursor that iterates over the given range of lines,
  _without_ returning the line breaks between, and yielding empty
  strings for empty lines.
  
  When `from` and `to` are given, they should be 1-based line numbers.
  */
  iterLines(e, t) {
    let n;
    if (e == null)
      n = this.iter();
    else {
      t == null && (t = this.lines + 1);
      let r = this.line(e).from;
      n = this.iterRange(r, Math.max(r, t == this.lines + 1 ? this.length : t <= 1 ? 0 : this.line(t - 1).to));
    }
    return new yu(n);
  }
  /**
  @internal
  */
  toString() {
    return this.sliceString(0);
  }
  /**
  Convert the document to an array of lines (which can be
  deserialized again via [`Text.of`](https://codemirror.net/6/docs/ref/#text.Text^of)).
  */
  toJSON() {
    let e = [];
    return this.flatten(e), e;
  }
  /**
  Create a `Text` instance for the given array of lines.
  */
  static of(e) {
    if (e.length == 0)
      throw new RangeError("A document must have at least one line");
    return e.length == 1 && !e[0] ? G.empty : e.length <= 32 ? new ae(e) : ht.from(ae.split(e, []));
  }
}
class ae extends G {
  constructor(e, t = rA(e)) {
    super(), this.text = e, this.length = t;
  }
  get lines() {
    return this.text.length;
  }
  get children() {
    return null;
  }
  lineInner(e, t, n, r) {
    for (let s = 0; ; s++) {
      let o = this.text[s], a = r + o.length;
      if ((t ? n : a) >= e)
        return new sA(r, a, n, o);
      r = a + 1, n++;
    }
  }
  decompose(e, t, n, r) {
    let s = e <= 0 && t >= this.length ? this : new ae(Ml(this.text, e, t), Math.min(t, this.length) - Math.max(0, e));
    if (r & 1) {
      let o = n.pop(), a = nr(s.text, o.text.slice(), 0, s.length);
      if (a.length <= 32)
        n.push(new ae(a, o.length + s.length));
      else {
        let l = a.length >> 1;
        n.push(new ae(a.slice(0, l)), new ae(a.slice(l)));
      }
    } else
      n.push(s);
  }
  replace(e, t, n) {
    if (!(n instanceof ae))
      return super.replace(e, t, n);
    let r = nr(this.text, nr(n.text, Ml(this.text, 0, e)), t), s = this.length + n.length - (t - e);
    return r.length <= 32 ? new ae(r, s) : ht.from(ae.split(r, []), s);
  }
  sliceString(e, t = this.length, n = `
`) {
    let r = "";
    for (let s = 0, o = 0; s <= t && o < this.text.length; o++) {
      let a = this.text[o], l = s + a.length;
      s > e && o && (r += n), e < l && t > s && (r += a.slice(Math.max(0, e - s), t - s)), s = l + 1;
    }
    return r;
  }
  flatten(e) {
    for (let t of this.text)
      e.push(t);
  }
  scanIdentical() {
    return 0;
  }
  static split(e, t) {
    let n = [], r = -1;
    for (let s of e)
      n.push(s), r += s.length + 1, n.length == 32 && (t.push(new ae(n, r)), n = [], r = -1);
    return r > -1 && t.push(new ae(n, r)), t;
  }
}
class ht extends G {
  constructor(e, t) {
    super(), this.children = e, this.length = t, this.lines = 0;
    for (let n of e)
      this.lines += n.lines;
  }
  lineInner(e, t, n, r) {
    for (let s = 0; ; s++) {
      let o = this.children[s], a = r + o.length, l = n + o.lines - 1;
      if ((t ? l : a) >= e)
        return o.lineInner(e, t, n, r);
      r = a + 1, n = l + 1;
    }
  }
  decompose(e, t, n, r) {
    for (let s = 0, o = 0; o <= t && s < this.children.length; s++) {
      let a = this.children[s], l = o + a.length;
      if (e <= l && t >= o) {
        let h = r & ((o <= e ? 1 : 0) | (l >= t ? 2 : 0));
        o >= e && l <= t && !h ? n.push(a) : a.decompose(e - o, t - o, n, h);
      }
      o = l + 1;
    }
  }
  replace(e, t, n) {
    if (n.lines < this.lines)
      for (let r = 0, s = 0; r < this.children.length; r++) {
        let o = this.children[r], a = s + o.length;
        if (e >= s && t <= a) {
          let l = o.replace(e - s, t - s, n), h = this.lines - o.lines + l.lines;
          if (l.lines < h >> 5 - 1 && l.lines > h >> 5 + 1) {
            let c = this.children.slice();
            return c[r] = l, new ht(c, this.length - (t - e) + n.length);
          }
          return super.replace(s, a, l);
        }
        s = a + 1;
      }
    return super.replace(e, t, n);
  }
  sliceString(e, t = this.length, n = `
`) {
    let r = "";
    for (let s = 0, o = 0; s < this.children.length && o <= t; s++) {
      let a = this.children[s], l = o + a.length;
      o > e && s && (r += n), e < l && t > o && (r += a.sliceString(e - o, t - o, n)), o = l + 1;
    }
    return r;
  }
  flatten(e) {
    for (let t of this.children)
      t.flatten(e);
  }
  scanIdentical(e, t) {
    if (!(e instanceof ht))
      return 0;
    let n = 0, [r, s, o, a] = t > 0 ? [0, 0, this.children.length, e.children.length] : [this.children.length - 1, e.children.length - 1, -1, -1];
    for (; ; r += t, s += t) {
      if (r == o || s == a)
        return n;
      let l = this.children[r], h = e.children[s];
      if (l != h)
        return n + l.scanIdentical(h, t);
      n += l.length + 1;
    }
  }
  static from(e, t = e.reduce((n, r) => n + r.length + 1, -1)) {
    let n = 0;
    for (let d of e)
      n += d.lines;
    if (n < 32) {
      let d = [];
      for (let g of e)
        g.flatten(d);
      return new ae(d, t);
    }
    let r = Math.max(
      32,
      n >> 5
      /* BranchShift */
    ), s = r << 1, o = r >> 1, a = [], l = 0, h = -1, c = [];
    function u(d) {
      let g;
      if (d.lines > s && d instanceof ht)
        for (let p of d.children)
          u(p);
      else
        d.lines > o && (l > o || !l) ? (f(), a.push(d)) : d instanceof ae && l && (g = c[c.length - 1]) instanceof ae && d.lines + g.lines <= 32 ? (l += d.lines, h += d.length + 1, c[c.length - 1] = new ae(g.text.concat(d.text), g.length + 1 + d.length)) : (l + d.lines > r && f(), l += d.lines, h += d.length + 1, c.push(d));
    }
    function f() {
      l != 0 && (a.push(c.length == 1 ? c[0] : ht.from(c, h)), h = -1, l = c.length = 0);
    }
    for (let d of e)
      u(d);
    return f(), a.length == 1 ? a[0] : new ht(a, t);
  }
}
G.empty = /* @__PURE__ */ new ae([""], 0);
function rA(i) {
  let e = -1;
  for (let t of i)
    e += t.length + 1;
  return e;
}
function nr(i, e, t = 0, n = 1e9) {
  for (let r = 0, s = 0, o = !0; s < i.length && r <= n; s++) {
    let a = i[s], l = r + a.length;
    l >= t && (l > n && (a = a.slice(0, n - r)), r < t && (a = a.slice(t - r)), o ? (e[e.length - 1] += a, o = !1) : e.push(a)), r = l + 1;
  }
  return e;
}
function Ml(i, e, t) {
  return nr(i, [""], e, t);
}
class an {
  constructor(e, t = 1) {
    this.dir = t, this.done = !1, this.lineBreak = !1, this.value = "", this.nodes = [e], this.offsets = [t > 0 ? 1 : (e instanceof ae ? e.text.length : e.children.length) << 1];
  }
  nextInner(e, t) {
    for (this.done = this.lineBreak = !1; ; ) {
      let n = this.nodes.length - 1, r = this.nodes[n], s = this.offsets[n], o = s >> 1, a = r instanceof ae ? r.text.length : r.children.length;
      if (o == (t > 0 ? a : 0)) {
        if (n == 0)
          return this.done = !0, this.value = "", this;
        t > 0 && this.offsets[n - 1]++, this.nodes.pop(), this.offsets.pop();
      } else if ((s & 1) == (t > 0 ? 0 : 1)) {
        if (this.offsets[n] += t, e == 0)
          return this.lineBreak = !0, this.value = `
`, this;
        e--;
      } else if (r instanceof ae) {
        let l = r.text[o + (t < 0 ? -1 : 0)];
        if (this.offsets[n] += t, l.length > Math.max(0, e))
          return this.value = e == 0 ? l : t > 0 ? l.slice(e) : l.slice(0, l.length - e), this;
        e -= l.length;
      } else {
        let l = r.children[o + (t < 0 ? -1 : 0)];
        e > l.length ? (e -= l.length, this.offsets[n] += t) : (t < 0 && this.offsets[n]--, this.nodes.push(l), this.offsets.push(t > 0 ? 1 : (l instanceof ae ? l.text.length : l.children.length) << 1));
      }
    }
  }
  next(e = 0) {
    return e < 0 && (this.nextInner(-e, -this.dir), e = this.value.length), this.nextInner(e, this.dir);
  }
}
class bu {
  constructor(e, t, n) {
    this.value = "", this.done = !1, this.cursor = new an(e, t > n ? -1 : 1), this.pos = t > n ? e.length : 0, this.from = Math.min(t, n), this.to = Math.max(t, n);
  }
  nextInner(e, t) {
    if (t < 0 ? this.pos <= this.from : this.pos >= this.to)
      return this.value = "", this.done = !0, this;
    e += Math.max(0, t < 0 ? this.pos - this.to : this.from - this.pos);
    let n = t < 0 ? this.pos - this.from : this.to - this.pos;
    e > n && (e = n), n -= e;
    let { value: r } = this.cursor.next(e);
    return this.pos += (r.length + e) * t, this.value = r.length <= n ? r : t < 0 ? r.slice(r.length - n) : r.slice(0, n), this.done = !this.value, this;
  }
  next(e = 0) {
    return e < 0 ? e = Math.max(e, this.from - this.pos) : e > 0 && (e = Math.min(e, this.to - this.pos)), this.nextInner(e, this.cursor.dir);
  }
  get lineBreak() {
    return this.cursor.lineBreak && this.value != "";
  }
}
class yu {
  constructor(e) {
    this.inner = e, this.afterBreak = !0, this.value = "", this.done = !1;
  }
  next(e = 0) {
    let { done: t, lineBreak: n, value: r } = this.inner.next(e);
    return t ? (this.done = !0, this.value = "") : n ? this.afterBreak ? this.value = "" : (this.afterBreak = !0, this.next()) : (this.value = r, this.afterBreak = !1), this;
  }
  get lineBreak() {
    return !1;
  }
}
typeof Symbol < "u" && (G.prototype[Symbol.iterator] = function() {
  return this.iter();
}, an.prototype[Symbol.iterator] = bu.prototype[Symbol.iterator] = yu.prototype[Symbol.iterator] = function() {
  return this;
});
class sA {
  /**
  @internal
  */
  constructor(e, t, n, r) {
    this.from = e, this.to = t, this.number = n, this.text = r;
  }
  /**
  The length of the line (not including any line break after it).
  */
  get length() {
    return this.to - this.from;
  }
}
const to = /\r\n?|\n/;
var be = /* @__PURE__ */ function(i) {
  return i[i.Simple = 0] = "Simple", i[i.TrackDel = 1] = "TrackDel", i[i.TrackBefore = 2] = "TrackBefore", i[i.TrackAfter = 3] = "TrackAfter", i;
}(be || (be = {}));
class kt {
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
      let n = this.sections[t + 1];
      e += n < 0 ? this.sections[t] : n;
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
  Iterate over the unchanged parts left by these changes.
  */
  iterGaps(e) {
    for (let t = 0, n = 0, r = 0; t < this.sections.length; ) {
      let s = this.sections[t++], o = this.sections[t++];
      o < 0 ? (e(n, r, s), r += s) : r += o, n += s;
    }
  }
  /**
  Iterate over the ranges changed by these changes. (See
  [`ChangeSet.iterChanges`](https://codemirror.net/6/docs/ref/#state.ChangeSet.iterChanges) for a
  variant that also provides you with the inserted text.)
  
  When `individual` is true, adjacent changes (which are kept
  separate for [position mapping](https://codemirror.net/6/docs/ref/#state.ChangeDesc.mapPos)) are
  reported separately.
  */
  iterChangedRanges(e, t = !1) {
    io(this, e, t);
  }
  /**
  Get a description of the inverted form of these changes.
  */
  get invertedDesc() {
    let e = [];
    for (let t = 0; t < this.sections.length; ) {
      let n = this.sections[t++], r = this.sections[t++];
      r < 0 ? e.push(n, r) : e.push(r, n);
    }
    return new kt(e);
  }
  /**
  Compute the combined effect of applying another set of changes
  after this one. The length of the document after this set should
  match the length before `other`.
  */
  composeDesc(e) {
    return this.empty ? e : e.empty ? this : wu(this, e);
  }
  /**
  Map this description, which should start with the same document
  as `other`, over another set of changes, so that it can be
  applied after it. When `before` is true, map as if the changes
  in `other` happened before the ones in `this`.
  */
  mapDesc(e, t = !1) {
    return e.empty ? this : no(this, e, t);
  }
  mapPos(e, t = -1, n = be.Simple) {
    let r = 0, s = 0;
    for (let o = 0; o < this.sections.length; ) {
      let a = this.sections[o++], l = this.sections[o++], h = r + a;
      if (l < 0) {
        if (h > e)
          return s + (e - r);
        s += a;
      } else {
        if (n != be.Simple && h >= e && (n == be.TrackDel && r < e && h > e || n == be.TrackBefore && r < e || n == be.TrackAfter && h > e))
          return null;
        if (h > e || h == e && t < 0 && !a)
          return e == r || t < 0 ? s : s + l;
        s += l;
      }
      r = h;
    }
    if (e > r)
      throw new RangeError(`Position ${e} is out of range for changeset of length ${r}`);
    return s;
  }
  /**
  Check whether these changes touch a given range. When one of the
  changes entirely covers the range, the string `"cover"` is
  returned.
  */
  touchesRange(e, t = e) {
    for (let n = 0, r = 0; n < this.sections.length && r <= t; ) {
      let s = this.sections[n++], o = this.sections[n++], a = r + s;
      if (o >= 0 && r <= t && a >= e)
        return r < e && a > t ? "cover" : !0;
      r = a;
    }
    return !1;
  }
  /**
  @internal
  */
  toString() {
    let e = "";
    for (let t = 0; t < this.sections.length; ) {
      let n = this.sections[t++], r = this.sections[t++];
      e += (e ? " " : "") + n + (r >= 0 ? ":" + r : "");
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
    return new kt(e);
  }
}
class ge extends kt {
  /**
  @internal
  */
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
    return io(this, (t, n, r, s, o) => e = e.replace(r, r + (n - t), o), !1), e;
  }
  mapDesc(e, t = !1) {
    return no(this, e, t, !0);
  }
  /**
  Given the document as it existed _before_ the changes, return a
  change set that represents the inverse of this set, which could
  be used to go from the document created by the changes back to
  the document as it existed before the changes.
  */
  invert(e) {
    let t = this.sections.slice(), n = [];
    for (let r = 0, s = 0; r < t.length; r += 2) {
      let o = t[r], a = t[r + 1];
      if (a >= 0) {
        t[r] = a, t[r + 1] = o;
        let l = r >> 1;
        for (; n.length < l; )
          n.push(G.empty);
        n.push(o ? e.slice(s, s + o) : G.empty);
      }
      s += o;
    }
    return new ge(t, n);
  }
  /**
  Combine two subsequent change sets into a single set. `other`
  must start in the document produced by `this`. If `this` goes
  `docA` → `docB` and `other` represents `docB` → `docC`, the
  returned value will represent the change `docA` → `docC`.
  */
  compose(e) {
    return this.empty ? e : e.empty ? this : wu(this, e, !0);
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
    return e.empty ? this : no(this, e, t, !0);
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
    io(this, e, t);
  }
  /**
  Get a [change description](https://codemirror.net/6/docs/ref/#state.ChangeDesc) for this change
  set.
  */
  get desc() {
    return new kt(this.sections);
  }
  /**
  @internal
  */
  filter(e) {
    let t = [], n = [], r = [], s = new An(this);
    e:
      for (let o = 0, a = 0; ; ) {
        let l = o == e.length ? 1e9 : e[o++];
        for (; a < l || a == l && s.len == 0; ) {
          if (s.done)
            break e;
          let c = Math.min(s.len, l - a);
          Se(r, c, -1);
          let u = s.ins == -1 ? -1 : s.off == 0 ? s.ins : 0;
          Se(t, c, u), u > 0 && ei(n, t, s.text), s.forward(c), a += c;
        }
        let h = e[o++];
        for (; a < h; ) {
          if (s.done)
            break e;
          let c = Math.min(s.len, h - a);
          Se(t, c, -1), Se(r, c, s.ins == -1 ? -1 : s.off == 0 ? s.ins : 0), s.forward(c), a += c;
        }
      }
    return {
      changes: new ge(t, n),
      filtered: new kt(r)
    };
  }
  /**
  Serialize this change set to a JSON-representable value.
  */
  toJSON() {
    let e = [];
    for (let t = 0; t < this.sections.length; t += 2) {
      let n = this.sections[t], r = this.sections[t + 1];
      r < 0 ? e.push(n) : r == 0 ? e.push([n]) : e.push([n].concat(this.inserted[t >> 1].toJSON()));
    }
    return e;
  }
  /**
  Create a change set for the given changes, for a document of the
  given length, using `lineSep` as line separator.
  */
  static of(e, t, n) {
    let r = [], s = [], o = 0, a = null;
    function l(c = !1) {
      if (!c && !r.length)
        return;
      o < t && Se(r, t - o, -1);
      let u = new ge(r, s);
      a = a ? a.compose(u.map(a)) : u, r = [], s = [], o = 0;
    }
    function h(c) {
      if (Array.isArray(c))
        for (let u of c)
          h(u);
      else if (c instanceof ge) {
        if (c.length != t)
          throw new RangeError(`Mismatched change set length (got ${c.length}, expected ${t})`);
        l(), a = a ? a.compose(c.map(a)) : c;
      } else {
        let { from: u, to: f = u, insert: d } = c;
        if (u > f || u < 0 || f > t)
          throw new RangeError(`Invalid change range ${u} to ${f} (in doc of length ${t})`);
        let g = d ? typeof d == "string" ? G.of(d.split(n || to)) : d : G.empty, p = g.length;
        if (u == f && p == 0)
          return;
        u < o && l(), u > o && Se(r, u - o, -1), Se(r, f - u, p), ei(s, r, g), o = f;
      }
    }
    return h(e), l(!a), a;
  }
  /**
  Create an empty changeset of the given length.
  */
  static empty(e) {
    return new ge(e ? [e, -1] : [], []);
  }
  /**
  Create a changeset from its JSON representation (as produced by
  [`toJSON`](https://codemirror.net/6/docs/ref/#state.ChangeSet.toJSON).
  */
  static fromJSON(e) {
    if (!Array.isArray(e))
      throw new RangeError("Invalid JSON representation of ChangeSet");
    let t = [], n = [];
    for (let r = 0; r < e.length; r++) {
      let s = e[r];
      if (typeof s == "number")
        t.push(s, -1);
      else {
        if (!Array.isArray(s) || typeof s[0] != "number" || s.some((o, a) => a && typeof o != "string"))
          throw new RangeError("Invalid JSON representation of ChangeSet");
        if (s.length == 1)
          t.push(s[0], 0);
        else {
          for (; n.length < r; )
            n.push(G.empty);
          n[r] = G.of(s.slice(1)), t.push(s[0], n[r].length);
        }
      }
    }
    return new ge(t, n);
  }
}
function Se(i, e, t, n = !1) {
  if (e == 0 && t <= 0)
    return;
  let r = i.length - 2;
  r >= 0 && t <= 0 && t == i[r + 1] ? i[r] += e : e == 0 && i[r] == 0 ? i[r + 1] += t : n ? (i[r] += e, i[r + 1] += t) : i.push(e, t);
}
function ei(i, e, t) {
  if (t.length == 0)
    return;
  let n = e.length - 2 >> 1;
  if (n < i.length)
    i[i.length - 1] = i[i.length - 1].append(t);
  else {
    for (; i.length < n; )
      i.push(G.empty);
    i.push(t);
  }
}
function io(i, e, t) {
  let n = i.inserted;
  for (let r = 0, s = 0, o = 0; o < i.sections.length; ) {
    let a = i.sections[o++], l = i.sections[o++];
    if (l < 0)
      r += a, s += a;
    else {
      let h = r, c = s, u = G.empty;
      for (; h += a, c += l, l && n && (u = u.append(n[o - 2 >> 1])), !(t || o == i.sections.length || i.sections[o + 1] < 0); )
        a = i.sections[o++], l = i.sections[o++];
      e(r, h, s, c, u), r = h, s = c;
    }
  }
}
function no(i, e, t, n = !1) {
  let r = [], s = n ? [] : null, o = new An(i), a = new An(e);
  for (let l = 0, h = 0; ; )
    if (o.ins == -1)
      l += o.len, o.next();
    else if (a.ins == -1 && h < l) {
      let c = Math.min(a.len, l - h);
      a.forward(c), Se(r, c, -1), h += c;
    } else if (a.ins >= 0 && (o.done || h < l || h == l && (a.len < o.len || a.len == o.len && !t))) {
      for (Se(r, a.ins, -1); l > h && !o.done && l + o.len < h + a.len; )
        l += o.len, o.next();
      h += a.len, a.next();
    } else if (o.ins >= 0) {
      let c = 0, u = l + o.len;
      for (; ; )
        if (a.ins >= 0 && h > l && h + a.len < u)
          c += a.ins, h += a.len, a.next();
        else if (a.ins == -1 && h < u) {
          let f = Math.min(a.len, u - h);
          c += f, a.forward(f), h += f;
        } else
          break;
      Se(r, c, o.ins), s && ei(s, r, o.text), l = u, o.next();
    } else {
      if (o.done && a.done)
        return s ? new ge(r, s) : new kt(r);
      throw new Error("Mismatched change set lengths");
    }
}
function wu(i, e, t = !1) {
  let n = [], r = t ? [] : null, s = new An(i), o = new An(e);
  for (let a = !1; ; ) {
    if (s.done && o.done)
      return r ? new ge(n, r) : new kt(n);
    if (s.ins == 0)
      Se(n, s.len, 0, a), s.next();
    else if (o.len == 0 && !o.done)
      Se(n, 0, o.ins, a), r && ei(r, n, o.text), o.next();
    else {
      if (s.done || o.done)
        throw new Error("Mismatched change set lengths");
      {
        let l = Math.min(s.len2, o.len), h = n.length;
        if (s.ins == -1) {
          let c = o.ins == -1 ? -1 : o.off ? 0 : o.ins;
          Se(n, l, c, a), r && c && ei(r, n, o.text);
        } else
          o.ins == -1 ? (Se(n, s.off ? 0 : s.len, l, a), r && ei(r, n, s.textBit(l))) : (Se(n, s.off ? 0 : s.len, o.off ? 0 : o.ins, a), r && !o.off && ei(r, n, o.text));
        a = (s.ins > l || o.ins >= 0 && o.len > l) && (a || n.length > h), s.forward2(l), o.forward(l);
      }
    }
  }
}
class An {
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
    return t >= e.length ? G.empty : e[t];
  }
  textBit(e) {
    let { inserted: t } = this.set, n = this.i - 2 >> 1;
    return n >= t.length && !e ? G.empty : t[n].slice(this.off, e == null ? void 0 : this.off + e);
  }
  forward(e) {
    e == this.len ? this.next() : (this.len -= e, this.off += e);
  }
  forward2(e) {
    this.ins == -1 ? this.forward(e) : e == this.ins ? this.next() : (this.ins -= e, this.off += e);
  }
}
class yi {
  /**
  @internal
  */
  constructor(e, t, n) {
    this.from = e, this.to = t, this.flags = n;
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
    let n, r;
    return this.empty ? n = r = e.mapPos(this.from, t) : (n = e.mapPos(this.from, 1), r = e.mapPos(this.to, -1)), n == this.from && r == this.to ? this : new yi(n, r, this.flags);
  }
  /**
  Extend this range to cover at least `from` to `to`.
  */
  extend(e, t = e) {
    if (e <= this.anchor && t >= this.anchor)
      return y.range(e, t);
    let n = Math.abs(e - this.anchor) > Math.abs(t - this.anchor) ? e : t;
    return y.range(this.anchor, n);
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
}
class y {
  /**
  @internal
  */
  constructor(e, t = 0) {
    this.ranges = e, this.mainIndex = t;
  }
  /**
  Map a selection through a change. Used to adjust the selection
  position for changes.
  */
  map(e, t = -1) {
    return e.empty ? this : y.create(this.ranges.map((n) => n.map(e, t)), this.mainIndex);
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
    return this.ranges.length == 1 ? this : new y([this.main]);
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
    let n = this.ranges.slice();
    return n[t] = e, y.create(n, this.mainIndex);
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
    return new y(e.ranges.map((t) => yi.fromJSON(t)), e.main);
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
    for (let n = 0, r = 0; r < e.length; r++) {
      let s = e[r];
      if (s.empty ? s.from <= n : s.from < n)
        return oA(e.slice(), t);
      n = s.to;
    }
    return new y(e, t);
  }
  /**
  Create a cursor selection range at the given position. You can
  safely ignore the optional arguments in most situations.
  */
  static cursor(e, t = 0, n, r) {
    return new yi(e, e, (t == 0 ? 0 : t < 0 ? 4 : 8) | (n == null ? 3 : Math.min(2, n)) | (r ?? 33554431) << 5);
  }
  /**
  Create a selection range.
  */
  static range(e, t, n) {
    let r = (n ?? 33554431) << 5;
    return t < e ? new yi(
      t,
      e,
      16 | r | 8
      /* AssocAfter */
    ) : new yi(e, t, r | (t > e ? 4 : 0));
  }
}
function oA(i, e = 0) {
  let t = i[e];
  i.sort((n, r) => n.from - r.from), e = i.indexOf(t);
  for (let n = 1; n < i.length; n++) {
    let r = i[n], s = i[n - 1];
    if (r.empty ? r.from <= s.to : r.from < s.to) {
      let o = s.from, a = Math.max(r.to, s.to);
      n <= e && e--, i.splice(--n, 2, r.anchor > r.head ? y.range(a, o) : y.range(o, a));
    }
  }
  return new y(i, e);
}
function vu(i, e) {
  for (let t of i.ranges)
    if (t.to > e)
      throw new RangeError("Selection points outside of document");
}
let _o = 0;
class P {
  constructor(e, t, n, r, s) {
    this.combine = e, this.compareInput = t, this.compare = n, this.isStatic = r, this.extensions = s, this.id = _o++, this.default = e([]);
  }
  /**
  Define a new facet.
  */
  static define(e = {}) {
    return new P(e.combine || ((t) => t), e.compareInput || ((t, n) => t === n), e.compare || (e.combine ? (t, n) => t === n : ea), !!e.static, e.enables);
  }
  /**
  Returns an extension that adds the given value for this facet.
  */
  of(e) {
    return new rr([], this, 0, e);
  }
  /**
  Create an extension that computes a value for the facet from a
  state. You must take care to declare the parts of the state that
  this value depends on, since your function is only called again
  for a new state when one of those parts changed.
  
  In most cases, you'll want to use the
  [`provide`](https://codemirror.net/6/docs/ref/#state.StateField^define^config.provide) option when
  defining a field instead.
  */
  compute(e, t) {
    if (this.isStatic)
      throw new Error("Can't compute a static facet");
    return new rr(e, this, 1, t);
  }
  /**
  Create an extension that computes zero or more values for this
  facet from a state.
  */
  computeN(e, t) {
    if (this.isStatic)
      throw new Error("Can't compute a static facet");
    return new rr(e, this, 2, t);
  }
  from(e, t) {
    return t || (t = (n) => n), this.compute([e], (n) => t(n.field(e)));
  }
}
function ea(i, e) {
  return i == e || i.length == e.length && i.every((t, n) => t === e[n]);
}
class rr {
  constructor(e, t, n, r) {
    this.dependencies = e, this.facet = t, this.type = n, this.value = r, this.id = _o++;
  }
  dynamicSlot(e) {
    var t;
    let n = this.value, r = this.facet.compareInput, s = this.id, o = e[s] >> 1, a = this.type == 2, l = !1, h = !1, c = [];
    for (let u of this.dependencies)
      u == "doc" ? l = !0 : u == "selection" ? h = !0 : ((t = e[u.id]) !== null && t !== void 0 ? t : 1) & 1 || c.push(e[u.id]);
    return {
      create(u) {
        return u.values[o] = n(u), 1;
      },
      update(u, f) {
        if (l && f.docChanged || h && (f.docChanged || f.selection) || c.some((d) => (ri(u, d) & 1) > 0)) {
          let d = n(u);
          if (a ? !Xl(d, u.values[o], r) : !r(d, u.values[o]))
            return u.values[o] = d, 1;
        }
        return 0;
      },
      reconfigure(u, f) {
        let d = n(u), g = f.config.address[s];
        if (g != null) {
          let p = Or(f, g);
          if (a ? Xl(d, p, r) : r(d, p))
            return u.values[o] = p, 0;
        }
        return u.values[o] = d, 1;
      }
    };
  }
}
function Xl(i, e, t) {
  if (i.length != e.length)
    return !1;
  for (let n = 0; n < i.length; n++)
    if (!t(i[n], e[n]))
      return !1;
  return !0;
}
function aA(i, e, t) {
  let n = t.map((l) => i[l.id]), r = t.map((l) => l.type), s = n.filter((l) => !(l & 1)), o = i[e.id] >> 1;
  function a(l) {
    let h = [];
    for (let c = 0; c < n.length; c++) {
      let u = Or(l, n[c]);
      if (r[c] == 2)
        for (let f of u)
          h.push(f);
      else
        h.push(u);
    }
    return e.combine(h);
  }
  return {
    create(l) {
      for (let h of n)
        ri(l, h);
      return l.values[o] = a(l), 1;
    },
    update(l, h) {
      if (!s.some(
        (u) => ri(l, u) & 1
        /* Changed */
      ))
        return 0;
      let c = a(l);
      return e.compare(c, l.values[o]) ? 0 : (l.values[o] = c, 1);
    },
    reconfigure(l, h) {
      let c = n.some(
        (g) => ri(l, g) & 1
        /* Changed */
      ), u = h.config.facets[e.id], f = h.facet(e);
      if (u && !c && ea(t, u))
        return l.values[o] = f, 0;
      let d = a(l);
      return e.compare(d, f) ? (l.values[o] = f, 0) : (l.values[o] = d, 1);
    }
  };
}
const jl = /* @__PURE__ */ P.define({ static: !0 });
class Oe {
  constructor(e, t, n, r, s) {
    this.id = e, this.createF = t, this.updateF = n, this.compareF = r, this.spec = s, this.provides = void 0;
  }
  /**
  Define a state field.
  */
  static define(e) {
    let t = new Oe(_o++, e.create, e.update, e.compare || ((n, r) => n === r), e);
    return e.provide && (t.provides = e.provide(t)), t;
  }
  create(e) {
    let t = e.facet(jl).find((n) => n.field == this);
    return ((t == null ? void 0 : t.create) || this.createF)(e);
  }
  /**
  @internal
  */
  slot(e) {
    let t = e[this.id] >> 1;
    return {
      create: (n) => (n.values[t] = this.create(n), 1),
      update: (n, r) => {
        let s = n.values[t], o = this.updateF(s, r);
        return this.compareF(s, o) ? 0 : (n.values[t] = o, 1);
      },
      reconfigure: (n, r) => r.config.address[this.id] != null ? (n.values[t] = r.field(this), 0) : (n.values[t] = this.create(n), 1)
    };
  }
  /**
  Returns an extension that enables this field and overrides the
  way it is initialized. Can be useful when you need to provide a
  non-default starting value for the field.
  */
  init(e) {
    return [this, jl.of({ field: this, create: e })];
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
const vt = { lowest: 4, low: 3, default: 2, high: 1, highest: 0 };
function Tt(i) {
  return (e) => new Cu(e, i);
}
const zi = {
  /**
  The lowest precedence level. Meant for things that should end up
  near the end of the extension order.
  */
  lowest: /* @__PURE__ */ Tt(vt.lowest),
  /**
  A lower-than-default precedence, for extensions.
  */
  low: /* @__PURE__ */ Tt(vt.low),
  /**
  The default precedence, which is also used for extensions
  without an explicit precedence.
  */
  default: /* @__PURE__ */ Tt(vt.default),
  /**
  A higher-than-default precedence, for extensions that should
  come before those with default precedence.
  */
  high: /* @__PURE__ */ Tt(vt.high),
  /**
  The highest precedence level, for extensions that should end up
  near the start of the precedence ordering.
  */
  highest: /* @__PURE__ */ Tt(vt.highest),
  // FIXME Drop these in some future breaking version
  /**
  Backwards-compatible synonym for `Prec.lowest`.
  */
  fallback: /* @__PURE__ */ Tt(vt.lowest),
  /**
  Backwards-compatible synonym for `Prec.high`.
  */
  extend: /* @__PURE__ */ Tt(vt.high),
  /**
  Backwards-compatible synonym for `Prec.highest`.
  */
  override: /* @__PURE__ */ Tt(vt.highest)
};
class Cu {
  constructor(e, t) {
    this.inner = e, this.prec = t;
  }
}
class qr {
  /**
  Create an instance of this compartment to add to your [state
  configuration](https://codemirror.net/6/docs/ref/#state.EditorStateConfig.extensions).
  */
  of(e) {
    return new ro(this, e);
  }
  /**
  Create an [effect](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) that
  reconfigures this compartment.
  */
  reconfigure(e) {
    return qr.reconfigure.of({ compartment: this, extension: e });
  }
  /**
  Get the current content of the compartment in the state, or
  `undefined` if it isn't present.
  */
  get(e) {
    return e.config.compartments.get(this);
  }
}
class ro {
  constructor(e, t) {
    this.compartment = e, this.inner = t;
  }
}
class pr {
  constructor(e, t, n, r, s, o) {
    for (this.base = e, this.compartments = t, this.dynamicSlots = n, this.address = r, this.staticValues = s, this.facets = o, this.statusTemplate = []; this.statusTemplate.length < n.length; )
      this.statusTemplate.push(
        0
        /* Unresolved */
      );
  }
  staticFacet(e) {
    let t = this.address[e.id];
    return t == null ? e.default : this.staticValues[t >> 1];
  }
  static resolve(e, t, n) {
    let r = [], s = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ new Map();
    for (let f of lA(e, t, o))
      f instanceof Oe ? r.push(f) : (s[f.facet.id] || (s[f.facet.id] = [])).push(f);
    let a = /* @__PURE__ */ Object.create(null), l = [], h = [];
    for (let f of r)
      a[f.id] = h.length << 1, h.push((d) => f.slot(d));
    let c = n == null ? void 0 : n.config.facets;
    for (let f in s) {
      let d = s[f], g = d[0].facet, p = c && c[f] || [];
      if (d.every(
        (O) => O.type == 0
        /* Static */
      ))
        if (a[g.id] = l.length << 1 | 1, ea(p, d))
          l.push(n.facet(g));
        else {
          let O = g.combine(d.map((m) => m.value));
          l.push(n && g.compare(O, n.facet(g)) ? n.facet(g) : O);
        }
      else {
        for (let O of d)
          O.type == 0 ? (a[O.id] = l.length << 1 | 1, l.push(O.value)) : (a[O.id] = h.length << 1, h.push((m) => O.dynamicSlot(m)));
        a[g.id] = h.length << 1, h.push((O) => aA(O, g, d));
      }
    }
    let u = h.map((f) => f(a));
    return new pr(e, o, u, a, l, s);
  }
}
function lA(i, e, t) {
  let n = [[], [], [], [], []], r = /* @__PURE__ */ new Map();
  function s(o, a) {
    let l = r.get(o);
    if (l != null) {
      if (l >= a)
        return;
      let h = n[l].indexOf(o);
      h > -1 && n[l].splice(h, 1), o instanceof ro && t.delete(o.compartment);
    }
    if (r.set(o, a), Array.isArray(o))
      for (let h of o)
        s(h, a);
    else if (o instanceof ro) {
      if (t.has(o.compartment))
        throw new RangeError("Duplicate use of compartment in extensions");
      let h = e.get(o.compartment) || o.inner;
      t.set(o.compartment, h), s(h, a);
    } else if (o instanceof Cu)
      s(o.inner, o.prec);
    else if (o instanceof Oe)
      n[a].push(o), o.provides && s(o.provides, a);
    else if (o instanceof rr)
      n[a].push(o), o.facet.extensions && s(o.facet.extensions, a);
    else {
      let h = o.extension;
      if (!h)
        throw new Error(`Unrecognized extension value in extension set (${o}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);
      s(h, a);
    }
  }
  return s(i, vt.default), n.reduce((o, a) => o.concat(a));
}
function ri(i, e) {
  if (e & 1)
    return 2;
  let t = e >> 1, n = i.status[t];
  if (n == 4)
    throw new Error("Cyclic dependency between fields and/or facets");
  if (n & 2)
    return n;
  i.status[t] = 4;
  let r = i.computeSlot(i, i.config.dynamicSlots[t]);
  return i.status[t] = 2 | r;
}
function Or(i, e) {
  return e & 1 ? i.config.staticValues[e >> 1] : i.values[e >> 1];
}
const Su = /* @__PURE__ */ P.define(), ku = /* @__PURE__ */ P.define({
  combine: (i) => i.some((e) => e),
  static: !0
}), Eu = /* @__PURE__ */ P.define({
  combine: (i) => i.length ? i[0] : void 0,
  static: !0
}), xu = /* @__PURE__ */ P.define(), Bu = /* @__PURE__ */ P.define(), Iu = /* @__PURE__ */ P.define(), Tu = /* @__PURE__ */ P.define({
  combine: (i) => i.length ? i[0] : !1
});
class qt {
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
    return new hA();
  }
}
class hA {
  /**
  Create an instance of this annotation.
  */
  of(e) {
    return new qt(this, e);
  }
}
class cA {
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
    return new W(this, e);
  }
}
class W {
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
    return t === void 0 ? void 0 : t == this.value ? this : new W(this.type, t);
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
  of values that his effect holds.
  */
  static define(e = {}) {
    return new cA(e.map || ((t) => t));
  }
  /**
  Map an array of effects through a change set.
  */
  static mapEffects(e, t) {
    if (!e.length)
      return e;
    let n = [];
    for (let r of e) {
      let s = r.map(t);
      s && n.push(s);
    }
    return n;
  }
}
W.reconfigure = /* @__PURE__ */ W.define();
W.appendConfig = /* @__PURE__ */ W.define();
class Ae {
  /**
  @internal
  */
  constructor(e, t, n, r, s, o) {
    this.startState = e, this.changes = t, this.selection = n, this.effects = r, this.annotations = s, this.scrollIntoView = o, this._doc = null, this._state = null, n && vu(n, t.newLength), s.some((a) => a.type == Ae.time) || (this.annotations = s.concat(Ae.time.of(Date.now())));
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
  (but retained for subsequent access), so itis recommended not to
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
    let t = this.annotation(Ae.userEvent);
    return !!(t && (t == e || t.length > e.length && t.slice(0, e.length) == e && t[e.length] == "."));
  }
}
Ae.time = /* @__PURE__ */ qt.define();
Ae.userEvent = /* @__PURE__ */ qt.define();
Ae.addToHistory = /* @__PURE__ */ qt.define();
Ae.remote = /* @__PURE__ */ qt.define();
function uA(i, e) {
  let t = [];
  for (let n = 0, r = 0; ; ) {
    let s, o;
    if (n < i.length && (r == e.length || e[r] >= i[n]))
      s = i[n++], o = i[n++];
    else if (r < e.length)
      s = e[r++], o = e[r++];
    else
      return t;
    !t.length || t[t.length - 1] < s ? t.push(s, o) : t[t.length - 1] < o && (t[t.length - 1] = o);
  }
}
function Pu(i, e, t) {
  var n;
  let r, s, o;
  return t ? (r = e.changes, s = ge.empty(e.changes.length), o = i.changes.compose(e.changes)) : (r = e.changes.map(i.changes), s = i.changes.mapDesc(e.changes, !0), o = i.changes.compose(r)), {
    changes: o,
    selection: e.selection ? e.selection.map(s) : (n = i.selection) === null || n === void 0 ? void 0 : n.map(r),
    effects: W.mapEffects(i.effects, r).concat(W.mapEffects(e.effects, s)),
    annotations: i.annotations.length ? i.annotations.concat(e.annotations) : e.annotations,
    scrollIntoView: i.scrollIntoView || e.scrollIntoView
  };
}
function so(i, e, t) {
  let n = e.selection, r = Si(e.annotations);
  return e.userEvent && (r = r.concat(Ae.userEvent.of(e.userEvent))), {
    changes: e.changes instanceof ge ? e.changes : ge.of(e.changes || [], t, i.facet(Eu)),
    selection: n && (n instanceof y ? n : y.single(n.anchor, n.head)),
    effects: Si(e.effects),
    annotations: r,
    scrollIntoView: !!e.scrollIntoView
  };
}
function Ru(i, e, t) {
  let n = so(i, e.length ? e[0] : {}, i.doc.length);
  e.length && e[0].filter === !1 && (t = !1);
  for (let s = 1; s < e.length; s++) {
    e[s].filter === !1 && (t = !1);
    let o = !!e[s].sequential;
    n = Pu(n, so(i, e[s], o ? n.changes.newLength : i.doc.length), o);
  }
  let r = new Ae(i, n.changes, n.selection, n.effects, n.annotations, n.scrollIntoView);
  return dA(t ? fA(r) : r);
}
function fA(i) {
  let e = i.startState, t = !0;
  for (let r of e.facet(xu)) {
    let s = r(i);
    if (s === !1) {
      t = !1;
      break;
    }
    Array.isArray(s) && (t = t === !0 ? s : uA(t, s));
  }
  if (t !== !0) {
    let r, s;
    if (t === !1)
      s = i.changes.invertedDesc, r = ge.empty(e.doc.length);
    else {
      let o = i.changes.filter(t);
      r = o.changes, s = o.filtered.invertedDesc;
    }
    i = new Ae(e, r, i.selection && i.selection.map(s), W.mapEffects(i.effects, s), i.annotations, i.scrollIntoView);
  }
  let n = e.facet(Bu);
  for (let r = n.length - 1; r >= 0; r--) {
    let s = n[r](i);
    s instanceof Ae ? i = s : Array.isArray(s) && s.length == 1 && s[0] instanceof Ae ? i = s[0] : i = Ru(e, Si(s), !1);
  }
  return i;
}
function dA(i) {
  let e = i.startState, t = e.facet(Iu), n = i;
  for (let r = t.length - 1; r >= 0; r--) {
    let s = t[r](i);
    s && Object.keys(s).length && (n = Pu(i, so(e, s, i.changes.newLength), !0));
  }
  return n == i ? i : new Ae(e, i.changes, i.selection, n.effects, n.annotations, n.scrollIntoView);
}
const gA = [];
function Si(i) {
  return i == null ? gA : Array.isArray(i) ? i : [i];
}
var Ee = /* @__PURE__ */ function(i) {
  return i[i.Word = 0] = "Word", i[i.Space = 1] = "Space", i[i.Other = 2] = "Other", i;
}(Ee || (Ee = {}));
const AA = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
let oo;
try {
  oo = /* @__PURE__ */ new RegExp("[\\p{Alphabetic}\\p{Number}_]", "u");
} catch {
}
function pA(i) {
  if (oo)
    return oo.test(i);
  for (let e = 0; e < i.length; e++) {
    let t = i[e];
    if (/\w/.test(t) || t > "" && (t.toUpperCase() != t.toLowerCase() || AA.test(t)))
      return !0;
  }
  return !1;
}
function OA(i) {
  return (e) => {
    if (!/\S/.test(e))
      return Ee.Space;
    if (pA(e))
      return Ee.Word;
    for (let t = 0; t < i.length; t++)
      if (e.indexOf(i[t]) > -1)
        return Ee.Word;
    return Ee.Other;
  };
}
class Y {
  /**
  @internal
  */
  constructor(e, t, n, r, s, o) {
    this.config = e, this.doc = t, this.selection = n, this.values = r, this.status = e.statusTemplate.slice(), this.computeSlot = s, o && (o._state = this);
    for (let a = 0; a < this.config.dynamicSlots.length; a++)
      ri(this, a << 1);
    this.computeSlot = null;
  }
  field(e, t = !0) {
    let n = this.config.address[e.id];
    if (n == null) {
      if (t)
        throw new RangeError("Field is not present in this state");
      return;
    }
    return ri(this, n), Or(this, n);
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
    return Ru(this, e, !0);
  }
  /**
  @internal
  */
  applyTransaction(e) {
    let t = this.config, { base: n, compartments: r } = t;
    for (let o of e.effects)
      o.is(qr.reconfigure) ? (t && (r = /* @__PURE__ */ new Map(), t.compartments.forEach((a, l) => r.set(l, a)), t = null), r.set(o.value.compartment, o.value.extension)) : o.is(W.reconfigure) ? (t = null, n = o.value) : o.is(W.appendConfig) && (t = null, n = Si(n).concat(o.value));
    let s;
    t ? s = e.startState.values.slice() : (t = pr.resolve(n, r, this), s = new Y(t, this.doc, this.selection, t.dynamicSlots.map(() => null), (a, l) => l.reconfigure(a, this), null).values), new Y(t, e.newDoc, e.newSelection, s, (o, a) => a.update(o, e), e);
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
    let t = this.selection, n = e(t.ranges[0]), r = this.changes(n.changes), s = [n.range], o = Si(n.effects);
    for (let a = 1; a < t.ranges.length; a++) {
      let l = e(t.ranges[a]), h = this.changes(l.changes), c = h.map(r);
      for (let f = 0; f < a; f++)
        s[f] = s[f].map(c);
      let u = r.mapDesc(h, !0);
      s.push(l.range.map(u)), r = r.compose(c), o = W.mapEffects(o, c).concat(W.mapEffects(Si(l.effects), u));
    }
    return {
      changes: r,
      selection: y.create(s, t.mainIndex),
      effects: o
    };
  }
  /**
  Create a [change set](https://codemirror.net/6/docs/ref/#state.ChangeSet) from the given change
  description, taking the state's document length and line
  separator into account.
  */
  changes(e = []) {
    return e instanceof ge ? e : ge.of(e, this.doc.length, this.facet(Y.lineSeparator));
  }
  /**
  Using the state's [line
  separator](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator), create a
  [`Text`](https://codemirror.net/6/docs/ref/#text.Text) instance from the given string.
  */
  toText(e) {
    return G.of(e.split(this.facet(Y.lineSeparator) || to));
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
    return t == null ? e.default : (ri(this, t), Or(this, t));
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
      for (let n in e) {
        let r = e[n];
        r instanceof Oe && (t[n] = r.spec.toJSON(this.field(e[n]), this));
      }
    return t;
  }
  /**
  Deserialize a state from its JSON representation. When custom
  fields should be deserialized, pass the same object you passed
  to [`toJSON`](https://codemirror.net/6/docs/ref/#state.EditorState.toJSON) when serializing as
  third argument.
  */
  static fromJSON(e, t = {}, n) {
    if (!e || typeof e.doc != "string")
      throw new RangeError("Invalid JSON representation for EditorState");
    let r = [];
    if (n)
      for (let s in n) {
        let o = n[s], a = e[s];
        r.push(o.init((l) => o.spec.fromJSON(a, l)));
      }
    return Y.create({
      doc: e.doc,
      selection: y.fromJSON(e.selection),
      extensions: t.extensions ? r.concat([t.extensions]) : r
    });
  }
  /**
  Create a new state. You'll usually only need this when
  initializing an editor—updated states are created by applying
  transactions.
  */
  static create(e = {}) {
    let t = pr.resolve(e.extensions || [], /* @__PURE__ */ new Map()), n = e.doc instanceof G ? e.doc : G.of((e.doc || "").split(t.staticFacet(Y.lineSeparator) || to)), r = e.selection ? e.selection instanceof y ? e.selection : y.single(e.selection.anchor, e.selection.head) : y.single(0);
    return vu(r, n.length), t.staticFacet(ku) || (r = r.asSingle()), new Y(t, n, r, t.dynamicSlots.map(() => null), (s, o) => o.create(s), null);
  }
  /**
  The size (in columns) of a tab in the document, determined by
  the [`tabSize`](https://codemirror.net/6/docs/ref/#state.EditorState^tabSize) facet.
  */
  get tabSize() {
    return this.facet(Y.tabSize);
  }
  /**
  Get the proper [line-break](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator)
  string for this state.
  */
  get lineBreak() {
    return this.facet(Y.lineSeparator) || `
`;
  }
  /**
  Returns true when the editor is
  [configured](https://codemirror.net/6/docs/ref/#state.EditorState^readOnly) to be read-only.
  */
  get readOnly() {
    return this.facet(Tu);
  }
  /**
  Look up a translation for the given phrase (via the
  [`phrases`](https://codemirror.net/6/docs/ref/#state.EditorState^phrases) facet), or return the
  original string if no translation is found.
  */
  phrase(e) {
    for (let t of this.facet(Y.phrases))
      if (Object.prototype.hasOwnProperty.call(t, e))
        return t[e];
    return e;
  }
  /**
  Find the values for a given language data field, provided by the
  the [`languageData`](https://codemirror.net/6/docs/ref/#state.EditorState^languageData) facet.
  */
  languageDataAt(e, t, n = -1) {
    let r = [];
    for (let s of this.facet(Su))
      for (let o of s(this, t, n))
        Object.prototype.hasOwnProperty.call(o, e) && r.push(o[e]);
    return r;
  }
  /**
  Return a function that can categorize strings (expected to
  represent a single [grapheme cluster](https://codemirror.net/6/docs/ref/#text.findClusterBreak))
  into one of:
  
   - Word (contains an alphanumeric character or a character
     explicitly listed in the local language's `"wordChars"`
     language data, which should be a string)
   - Space (contains only whitespace)
   - Other (anything else)
  */
  charCategorizer(e) {
    return OA(this.languageDataAt("wordChars", e).join(""));
  }
  /**
  Find the word at the given position, meaning the range
  containing all [word](https://codemirror.net/6/docs/ref/#state.CharCategory.Word) characters
  around it. If no word characters are adjacent to the position,
  this returns null.
  */
  wordAt(e) {
    let { text: t, from: n, length: r } = this.doc.lineAt(e), s = this.charCategorizer(e), o = e - n, a = e - n;
    for (; o > 0; ) {
      let l = je(t, o, !1);
      if (s(t.slice(l, o)) != Ee.Word)
        break;
      o = l;
    }
    for (; a < r; ) {
      let l = je(t, a);
      if (s(t.slice(a, l)) != Ee.Word)
        break;
      a = l;
    }
    return o == a ? null : y.range(o + n, a + n);
  }
}
Y.allowMultipleSelections = ku;
Y.tabSize = /* @__PURE__ */ P.define({
  combine: (i) => i.length ? i[0] : 4
});
Y.lineSeparator = Eu;
Y.readOnly = Tu;
Y.phrases = /* @__PURE__ */ P.define();
Y.languageData = Su;
Y.changeFilter = xu;
Y.transactionFilter = Bu;
Y.transactionExtender = Iu;
qr.reconfigure = /* @__PURE__ */ W.define();
function Gt(i, e, t = {}) {
  let n = {};
  for (let r of i)
    for (let s of Object.keys(r)) {
      let o = r[s], a = n[s];
      if (a === void 0)
        n[s] = o;
      else if (!(a === o || o === void 0))
        if (Object.hasOwnProperty.call(t, s))
          n[s] = t[s](a, o);
        else
          throw new Error("Config merge conflict for field " + s);
    }
  for (let r in e)
    n[r] === void 0 && (n[r] = e[r]);
  return n;
}
const ao = "ͼ", Zl = typeof Symbol > "u" ? "__" + ao : Symbol.for(ao), lo = typeof Symbol > "u" ? "__styleSet" + Math.floor(Math.random() * 1e8) : Symbol("styleSet"), Nl = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : {};
class Nt {
  // :: (Object<Style>, ?{finish: ?(string) → string})
  // Create a style module from the given spec.
  //
  // When `finish` is given, it is called on regular (non-`@`)
  // selectors (after `&` expansion) to compute the final selector.
  constructor(e, t) {
    this.rules = [];
    let { finish: n } = t || {};
    function r(o) {
      return /^@/.test(o) ? [o] : o.split(/,\s*/);
    }
    function s(o, a, l, h) {
      let c = [], u = /^@(\w+)\b/.exec(o[0]), f = u && u[1] == "keyframes";
      if (u && a == null)
        return l.push(o[0] + ";");
      for (let d in a) {
        let g = a[d];
        if (/&/.test(d))
          s(
            d.split(/,\s*/).map((p) => o.map((O) => p.replace(/&/, O))).reduce((p, O) => p.concat(O)),
            g,
            l
          );
        else if (g && typeof g == "object") {
          if (!u)
            throw new RangeError("The value of a property (" + d + ") should be a primitive value.");
          s(r(d), g, c, f);
        } else
          g != null && c.push(d.replace(/_.*/, "").replace(/[A-Z]/g, (p) => "-" + p.toLowerCase()) + ": " + g + ";");
      }
      (c.length || f) && l.push((n && !u && !h ? o.map(n) : o).join(", ") + " {" + c.join(" ") + "}");
    }
    for (let o in e)
      s(r(o), e[o], this.rules);
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
    let e = Nl[Zl] || 1;
    return Nl[Zl] = e + 1, ao + e.toString(36);
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
    (e[lo] || new mA(e)).mount(Array.isArray(t) ? t : [t]);
  }
}
let Xn = null;
class mA {
  constructor(e) {
    if (!e.head && e.adoptedStyleSheets && typeof CSSStyleSheet < "u") {
      if (Xn)
        return e.adoptedStyleSheets = [Xn.sheet].concat(e.adoptedStyleSheets), e[lo] = Xn;
      this.sheet = new CSSStyleSheet(), e.adoptedStyleSheets = [this.sheet].concat(e.adoptedStyleSheets), Xn = this;
    } else {
      this.styleTag = (e.ownerDocument || e).createElement("style");
      let t = e.head || e;
      t.insertBefore(this.styleTag, t.firstChild);
    }
    this.modules = [], e[lo] = this;
  }
  mount(e) {
    let t = this.sheet, n = 0, r = 0;
    for (let s = 0; s < e.length; s++) {
      let o = e[s], a = this.modules.indexOf(o);
      if (a < r && a > -1 && (this.modules.splice(a, 1), r--, a = -1), a == -1) {
        if (this.modules.splice(r++, 0, o), t)
          for (let l = 0; l < o.rules.length; l++)
            t.insertRule(o.rules[l], n++);
      } else {
        for (; r < a; )
          n += this.modules[r++].rules.length;
        n += o.rules.length, r++;
      }
    }
    if (!t) {
      let s = "";
      for (let o = 0; o < this.modules.length; o++)
        s += this.modules[o].getRules() + `
`;
      this.styleTag.textContent = s;
    }
  }
}
class li {
  /**
  Compare this value with another value. The default
  implementation compares by identity.
  */
  eq(e) {
    return this == e;
  }
  /**
  Create a [range](https://codemirror.net/6/docs/ref/#rangeset.Range) with this value.
  */
  range(e, t = e) {
    return new ho(e, t, this);
  }
}
li.prototype.startSide = li.prototype.endSide = 0;
li.prototype.point = !1;
li.prototype.mapMode = be.TrackDel;
let ho = class {
  /**
  @internal
  */
  constructor(e, t, n) {
    this.from = e, this.to = t, this.value = n;
  }
};
function co(i, e) {
  return i.from - e.from || i.value.startSide - e.value.startSide;
}
class ta {
  constructor(e, t, n, r) {
    this.from = e, this.to = t, this.value = n, this.maxPoint = r;
  }
  get length() {
    return this.to[this.to.length - 1];
  }
  // Find the index of the given position and side. Use the ranges'
  // `from` pos when `end == false`, `to` when `end == true`.
  findIndex(e, t, n, r = 0) {
    let s = n ? this.to : this.from;
    for (let o = r, a = s.length; ; ) {
      if (o == a)
        return o;
      let l = o + a >> 1, h = s[l] - e || (n ? this.value[l].endSide : this.value[l].startSide) - t;
      if (l == o)
        return h >= 0 ? o : a;
      h >= 0 ? a = l : o = l + 1;
    }
  }
  between(e, t, n, r) {
    for (let s = this.findIndex(t, -1e9, !0), o = this.findIndex(n, 1e9, !1, s); s < o; s++)
      if (r(this.from[s] + e, this.to[s] + e, this.value[s]) === !1)
        return !1;
  }
  map(e, t) {
    let n = [], r = [], s = [], o = -1, a = -1;
    for (let l = 0; l < this.value.length; l++) {
      let h = this.value[l], c = this.from[l] + e, u = this.to[l] + e, f, d;
      if (c == u) {
        let g = t.mapPos(c, h.startSide, h.mapMode);
        if (g == null || (f = d = g, h.startSide != h.endSide && (d = t.mapPos(c, h.endSide), d < f)))
          continue;
      } else if (f = t.mapPos(c, h.startSide), d = t.mapPos(u, h.endSide), f > d || f == d && h.startSide > 0 && h.endSide <= 0)
        continue;
      (d - f || h.endSide - h.startSide) < 0 || (o < 0 && (o = f), h.point && (a = Math.max(a, d - f)), n.push(h), r.push(f - o), s.push(d - o));
    }
    return { mapped: n.length ? new ta(r, s, n, a) : null, pos: o };
  }
}
class F {
  /**
  @internal
  */
  constructor(e, t, n = F.empty, r) {
    this.chunkPos = e, this.chunk = t, this.nextLayer = n, this.maxPoint = r;
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
  
  (The extra type parameter is just there as a kludge to work
  around TypeScript variance issues that prevented `RangeSet<X>`
  from being a subtype of `RangeSet<Y>` when `X` is a subtype of
  `Y`.)
  */
  update(e) {
    let { add: t = [], sort: n = !1, filterFrom: r = 0, filterTo: s = this.length } = e, o = e.filter;
    if (t.length == 0 && !o)
      return this;
    if (n && (t = t.slice().sort(co)), this.isEmpty)
      return t.length ? F.of(t) : this;
    let a = new Du(this, null, -1).goto(0), l = 0, h = [], c = new zt();
    for (; a.value || l < t.length; )
      if (l < t.length && (a.from - t[l].from || a.startSide - t[l].value.startSide) >= 0) {
        let u = t[l++];
        c.addInner(u.from, u.to, u.value) || h.push(u);
      } else
        a.rangeIndex == 1 && a.chunkIndex < this.chunk.length && (l == t.length || this.chunkEnd(a.chunkIndex) < t[l].from) && (!o || r > this.chunkEnd(a.chunkIndex) || s < this.chunkPos[a.chunkIndex]) && c.addChunk(this.chunkPos[a.chunkIndex], this.chunk[a.chunkIndex]) ? a.nextChunk() : ((!o || r > a.to || s < a.from || o(a.from, a.to, a.value)) && (c.addInner(a.from, a.to, a.value) || h.push(new ho(a.from, a.to, a.value))), a.next());
    return c.finishInner(this.nextLayer.isEmpty && !h.length ? F.empty : this.nextLayer.update({ add: h, filter: o, filterFrom: r, filterTo: s }));
  }
  /**
  Map this range set through a set of changes, return the new set.
  */
  map(e) {
    if (e.empty || this.isEmpty)
      return this;
    let t = [], n = [], r = -1;
    for (let o = 0; o < this.chunk.length; o++) {
      let a = this.chunkPos[o], l = this.chunk[o], h = e.touchesRange(a, a + l.length);
      if (h === !1)
        r = Math.max(r, l.maxPoint), t.push(l), n.push(e.mapPos(a));
      else if (h === !0) {
        let { mapped: c, pos: u } = l.map(a, e);
        c && (r = Math.max(r, c.maxPoint), t.push(c), n.push(u));
      }
    }
    let s = this.nextLayer.map(e);
    return t.length == 0 ? s : new F(n, t, s, r);
  }
  /**
  Iterate over the ranges that touch the region `from` to `to`,
  calling `f` for each. There is no guarantee that the ranges will
  be reported in any specific order. When the callback returns
  `false`, iteration stops.
  */
  between(e, t, n) {
    if (!this.isEmpty) {
      for (let r = 0; r < this.chunk.length; r++) {
        let s = this.chunkPos[r], o = this.chunk[r];
        if (t >= s && e <= s + o.length && o.between(s, e - s, t - s, n) === !1)
          return;
      }
      this.nextLayer.between(e, t, n);
    }
  }
  /**
  Iterate over the ranges in this set, in order, including all
  ranges that end at or after `from`.
  */
  iter(e = 0) {
    return pn.from([this]).goto(e);
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
    return pn.from(e).goto(t);
  }
  /**
  Iterate over two groups of sets, calling methods on `comparator`
  to notify it of possible differences.
  */
  static compare(e, t, n, r, s = -1) {
    let o = e.filter((u) => u.maxPoint > 0 || !u.isEmpty && u.maxPoint >= s), a = t.filter((u) => u.maxPoint > 0 || !u.isEmpty && u.maxPoint >= s), l = zl(o, a, n), h = new Fi(o, l, s), c = new Fi(a, l, s);
    n.iterGaps((u, f, d) => Ul(h, u, c, f, d, r)), n.empty && n.length == 0 && Ul(h, 0, c, 0, 0, r);
  }
  /**
  Compare the contents of two groups of range sets, returning true
  if they are equivalent in the given range.
  */
  static eq(e, t, n = 0, r) {
    r == null && (r = 1e9);
    let s = e.filter((c) => !c.isEmpty && t.indexOf(c) < 0), o = t.filter((c) => !c.isEmpty && e.indexOf(c) < 0);
    if (s.length != o.length)
      return !1;
    if (!s.length)
      return !0;
    let a = zl(s, o), l = new Fi(s, a, 0).goto(n), h = new Fi(o, a, 0).goto(n);
    for (; ; ) {
      if (l.to != h.to || !uo(l.active, h.active) || l.point && (!h.point || !l.point.eq(h.point)))
        return !1;
      if (l.to > r)
        return !0;
      l.next(), h.next();
    }
  }
  /**
  Iterate over a group of range sets at the same time, notifying
  the iterator about the ranges covering every given piece of
  content. Returns the open count (see
  [`SpanIterator.span`](https://codemirror.net/6/docs/ref/#rangeset.SpanIterator.span)) at the end
  of the iteration.
  */
  static spans(e, t, n, r, s = -1) {
    var o;
    let a = new Fi(e, null, s, (o = r.filterPoint) === null || o === void 0 ? void 0 : o.bind(r)).goto(t), l = t, h = a.openStart;
    for (; ; ) {
      let c = Math.min(a.to, n);
      if (a.point ? (r.point(l, c, a.point, a.activeForPoint(a.to), h), h = a.openEnd(c) + (a.to > c ? 1 : 0)) : c > l && (r.span(l, c, a.active, h), h = a.openEnd(c)), a.to > n)
        break;
      l = a.to, a.next();
    }
    return h;
  }
  /**
  Create a range set for the given range or array of ranges. By
  default, this expects the ranges to be _sorted_ (by start
  position and, if two start at the same position,
  `value.startSide`). You can pass `true` as second argument to
  cause the method to sort them.
  */
  static of(e, t = !1) {
    let n = new zt();
    for (let r of e instanceof ho ? [e] : t ? QA(e) : e)
      n.add(r.from, r.to, r.value);
    return n.finish();
  }
}
F.empty = /* @__PURE__ */ new F([], [], null, -1);
function QA(i) {
  if (i.length > 1)
    for (let e = i[0], t = 1; t < i.length; t++) {
      let n = i[t];
      if (co(e, n) > 0)
        return i.slice().sort(co);
      e = n;
    }
  return i;
}
F.empty.nextLayer = F.empty;
class zt {
  /**
  Create an empty builder.
  */
  constructor() {
    this.chunks = [], this.chunkPos = [], this.chunkStart = -1, this.last = null, this.lastFrom = -1e9, this.lastTo = -1e9, this.from = [], this.to = [], this.value = [], this.maxPoint = -1, this.setMaxPoint = -1, this.nextLayer = null;
  }
  finishChunk(e) {
    this.chunks.push(new ta(this.from, this.to, this.value, this.maxPoint)), this.chunkPos.push(this.chunkStart), this.chunkStart = -1, this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint), this.maxPoint = -1, e && (this.from = [], this.to = [], this.value = []);
  }
  /**
  Add a range. Ranges should be added in sorted (by `from` and
  `value.startSide`) order.
  */
  add(e, t, n) {
    this.addInner(e, t, n) || (this.nextLayer || (this.nextLayer = new zt())).add(e, t, n);
  }
  /**
  @internal
  */
  addInner(e, t, n) {
    let r = e - this.lastTo || n.startSide - this.last.endSide;
    if (r <= 0 && (e - this.lastFrom || n.startSide - this.last.startSide) < 0)
      throw new Error("Ranges must be added sorted by `from` position and `startSide`");
    return r < 0 ? !1 : (this.from.length == 250 && this.finishChunk(!0), this.chunkStart < 0 && (this.chunkStart = e), this.from.push(e - this.chunkStart), this.to.push(t - this.chunkStart), this.last = n, this.lastFrom = e, this.lastTo = t, this.value.push(n), n.point && (this.maxPoint = Math.max(this.maxPoint, t - e)), !0);
  }
  /**
  @internal
  */
  addChunk(e, t) {
    if ((e - this.lastTo || t.value[0].startSide - this.last.endSide) < 0)
      return !1;
    this.from.length && this.finishChunk(!0), this.setMaxPoint = Math.max(this.setMaxPoint, t.maxPoint), this.chunks.push(t), this.chunkPos.push(e);
    let n = t.value.length - 1;
    return this.last = t.value[n], this.lastFrom = t.from[n] + e, this.lastTo = t.to[n] + e, !0;
  }
  /**
  Finish the range set. Returns the new set. The builder can't be
  used anymore after this has been called.
  */
  finish() {
    return this.finishInner(F.empty);
  }
  /**
  @internal
  */
  finishInner(e) {
    if (this.from.length && this.finishChunk(!1), this.chunks.length == 0)
      return e;
    let t = new F(this.chunkPos, this.chunks, this.nextLayer ? this.nextLayer.finishInner(e) : e, this.setMaxPoint);
    return this.from = null, t;
  }
}
function zl(i, e, t) {
  let n = /* @__PURE__ */ new Map();
  for (let s of i)
    for (let o = 0; o < s.chunk.length; o++)
      s.chunk[o].maxPoint <= 0 && n.set(s.chunk[o], s.chunkPos[o]);
  let r = /* @__PURE__ */ new Set();
  for (let s of e)
    for (let o = 0; o < s.chunk.length; o++) {
      let a = n.get(s.chunk[o]);
      a != null && (t ? t.mapPos(a) : a) == s.chunkPos[o] && !(t != null && t.touchesRange(a, a + s.chunk[o].length)) && r.add(s.chunk[o]);
    }
  return r;
}
class Du {
  constructor(e, t, n, r = 0) {
    this.layer = e, this.skip = t, this.minPoint = n, this.rank = r;
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
  gotoInner(e, t, n) {
    for (; this.chunkIndex < this.layer.chunk.length; ) {
      let r = this.layer.chunk[this.chunkIndex];
      if (!(this.skip && this.skip.has(r) || this.layer.chunkEnd(this.chunkIndex) < e || r.maxPoint < this.minPoint))
        break;
      this.chunkIndex++, n = !1;
    }
    if (this.chunkIndex < this.layer.chunk.length) {
      let r = this.layer.chunk[this.chunkIndex].findIndex(e - this.layer.chunkPos[this.chunkIndex], t, !0);
      (!n || this.rangeIndex < r) && this.setRangeIndex(r);
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
        let e = this.layer.chunkPos[this.chunkIndex], t = this.layer.chunk[this.chunkIndex], n = e + t.from[this.rangeIndex];
        if (this.from = n, this.to = e + t.to[this.rangeIndex], this.value = t.value[this.rangeIndex], this.setRangeIndex(this.rangeIndex + 1), this.minPoint < 0 || this.value.point && this.to - this.from >= this.minPoint)
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
class pn {
  constructor(e) {
    this.heap = e;
  }
  static from(e, t = null, n = -1) {
    let r = [];
    for (let s = 0; s < e.length; s++)
      for (let o = e[s]; !o.isEmpty; o = o.nextLayer)
        o.maxPoint >= n && r.push(new Du(o, t, n, s));
    return r.length == 1 ? r[0] : new pn(r);
  }
  get startSide() {
    return this.value ? this.value.startSide : 0;
  }
  goto(e, t = -1e9) {
    for (let n of this.heap)
      n.goto(e, t);
    for (let n = this.heap.length >> 1; n >= 0; n--)
      Os(this.heap, n);
    return this.next(), this;
  }
  forward(e, t) {
    for (let n of this.heap)
      n.forward(e, t);
    for (let n = this.heap.length >> 1; n >= 0; n--)
      Os(this.heap, n);
    (this.to - e || this.value.endSide - t) < 0 && this.next();
  }
  next() {
    if (this.heap.length == 0)
      this.from = this.to = 1e9, this.value = null, this.rank = -1;
    else {
      let e = this.heap[0];
      this.from = e.from, this.to = e.to, this.value = e.value, this.rank = e.rank, e.value && e.next(), Os(this.heap, 0);
    }
  }
}
function Os(i, e) {
  for (let t = i[e]; ; ) {
    let n = (e << 1) + 1;
    if (n >= i.length)
      break;
    let r = i[n];
    if (n + 1 < i.length && r.compare(i[n + 1]) >= 0 && (r = i[n + 1], n++), t.compare(r) < 0)
      break;
    i[n] = t, i[e] = r, e = n;
  }
}
class Fi {
  constructor(e, t, n, r = () => !0) {
    this.minPoint = n, this.filterPoint = r, this.active = [], this.activeTo = [], this.activeRank = [], this.minActive = -1, this.point = null, this.pointFrom = 0, this.pointRank = 0, this.to = -1e9, this.endSide = 0, this.openStart = -1, this.cursor = pn.from(e, t, n);
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
    jn(this.active, e), jn(this.activeTo, e), jn(this.activeRank, e), this.minActive = Vl(this.active, this.activeTo);
  }
  addActive(e) {
    let t = 0, { value: n, to: r, rank: s } = this.cursor;
    for (; t < this.activeRank.length && this.activeRank[t] <= s; )
      t++;
    Zn(this.active, t, n), Zn(this.activeTo, t, r), Zn(this.activeRank, t, s), e && Zn(e, t, this.cursor.from), this.minActive = Vl(this.active, this.activeTo);
  }
  // After calling this, if `this.point` != null, the next range is a
  // point. Otherwise, it's a regular range, covered by `this.active`.
  next() {
    let e = this.to, t = this.point;
    this.point = null;
    let n = this.openStart < 0 ? [] : null, r = 0;
    for (; ; ) {
      let s = this.minActive;
      if (s > -1 && (this.activeTo[s] - this.cursor.from || this.active[s].endSide - this.cursor.startSide) < 0) {
        if (this.activeTo[s] > e) {
          this.to = this.activeTo[s], this.endSide = this.active[s].endSide;
          break;
        }
        this.removeActive(s), n && jn(n, s);
      } else if (this.cursor.value)
        if (this.cursor.from > e) {
          this.to = this.cursor.from, this.endSide = this.cursor.startSide;
          break;
        } else {
          let o = this.cursor.value;
          if (!o.point)
            this.addActive(n), this.cursor.next();
          else if (t && this.cursor.to == this.to && this.cursor.from < this.cursor.to)
            this.cursor.next();
          else if (!this.filterPoint(this.cursor.from, this.cursor.to, this.cursor.value, this.cursor.rank))
            this.cursor.next();
          else {
            this.point = o, this.pointFrom = this.cursor.from, this.pointRank = this.cursor.rank, this.to = this.cursor.to, this.endSide = o.endSide, this.cursor.from < e && (r = 1), this.cursor.next(), this.forward(this.to, this.endSide);
            break;
          }
        }
      else {
        this.to = this.endSide = 1e9;
        break;
      }
    }
    if (n) {
      let s = 0;
      for (; s < n.length && n[s] < e; )
        s++;
      this.openStart = s + r;
    }
  }
  activeForPoint(e) {
    if (!this.active.length)
      return this.active;
    let t = [];
    for (let n = this.active.length - 1; n >= 0 && !(this.activeRank[n] < this.pointRank); n--)
      (this.activeTo[n] > e || this.activeTo[n] == e && this.active[n].endSide >= this.point.endSide) && t.push(this.active[n]);
    return t.reverse();
  }
  openEnd(e) {
    let t = 0;
    for (let n = this.activeTo.length - 1; n >= 0 && this.activeTo[n] > e; n--)
      t++;
    return t;
  }
}
function Ul(i, e, t, n, r, s) {
  i.goto(e), t.goto(n);
  let o = n + r, a = n, l = n - e;
  for (; ; ) {
    let h = i.to + l - t.to || i.endSide - t.endSide, c = h < 0 ? i.to + l : t.to, u = Math.min(c, o);
    if (i.point || t.point ? i.point && t.point && (i.point == t.point || i.point.eq(t.point)) && uo(i.activeForPoint(i.to + l), t.activeForPoint(t.to)) || s.comparePoint(a, u, i.point, t.point) : u > a && !uo(i.active, t.active) && s.compareRange(a, u, i.active, t.active), c > o)
      break;
    a = c, h <= 0 && i.next(), h >= 0 && t.next();
  }
}
function uo(i, e) {
  if (i.length != e.length)
    return !1;
  for (let t = 0; t < i.length; t++)
    if (i[t] != e[t] && !i[t].eq(e[t]))
      return !1;
  return !0;
}
function jn(i, e) {
  for (let t = e, n = i.length - 1; t < n; t++)
    i[t] = i[t + 1];
  i.pop();
}
function Zn(i, e, t) {
  for (let n = i.length - 1; n >= e; n--)
    i[n + 1] = i[n];
  i[e] = t;
}
function Vl(i, e) {
  let t = -1, n = 1e9;
  for (let r = 0; r < e.length; r++)
    (e[r] - n || i[r].endSide - i[t].endSide) < 0 && (t = r, n = e[r]);
  return t;
}
var Ut = {
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
}, mr = {
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
}, Yl = typeof navigator < "u" && /Chrome\/(\d+)/.exec(navigator.userAgent), bA = typeof navigator < "u" && /Mac/.test(navigator.platform), yA = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent), wA = bA || Yl && +Yl[1] < 57;
for (var Qe = 0; Qe < 10; Qe++)
  Ut[48 + Qe] = Ut[96 + Qe] = String(Qe);
for (var Qe = 1; Qe <= 24; Qe++)
  Ut[Qe + 111] = "F" + Qe;
for (var Qe = 65; Qe <= 90; Qe++)
  Ut[Qe] = String.fromCharCode(Qe + 32), mr[Qe] = String.fromCharCode(Qe);
for (var ms in Ut)
  mr.hasOwnProperty(ms) || (mr[ms] = Ut[ms]);
function vA(i) {
  var e = wA && (i.ctrlKey || i.altKey || i.metaKey) || yA && i.shiftKey && i.key && i.key.length == 1 || i.key == "Unidentified", t = !e && i.key || (i.shiftKey ? mr : Ut)[i.keyCode] || i.key || "Unidentified";
  return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
function Qr(i) {
  let e;
  return i.nodeType == 11 ? e = i.getSelection ? i : i.ownerDocument : e = i, e.getSelection();
}
function xi(i, e) {
  return e ? i == e || i.contains(e.nodeType != 1 ? e.parentNode : e) : !1;
}
function CA() {
  let i = document.activeElement;
  for (; i && i.shadowRoot; )
    i = i.shadowRoot.activeElement;
  return i;
}
function fo(i, e) {
  if (!e.anchorNode)
    return !1;
  try {
    return xi(i, e.anchorNode);
  } catch {
    return !1;
  }
}
function On(i) {
  return i.nodeType == 3 ? mn(i, 0, i.nodeValue.length).getClientRects() : i.nodeType == 1 ? i.getClientRects() : [];
}
function br(i, e, t, n) {
  return t ? ql(i, e, t, n, -1) || ql(i, e, t, n, 1) : !1;
}
function go(i) {
  for (var e = 0; ; e++)
    if (i = i.previousSibling, !i)
      return e;
}
function ql(i, e, t, n, r) {
  for (; ; ) {
    if (i == t && e == n)
      return !0;
    if (e == (r < 0 ? 0 : yr(i))) {
      if (i.nodeName == "DIV")
        return !1;
      let s = i.parentNode;
      if (!s || s.nodeType != 1)
        return !1;
      e = go(i) + (r < 0 ? 0 : 1), i = s;
    } else if (i.nodeType == 1) {
      if (i = i.childNodes[e + (r < 0 ? -1 : 0)], i.nodeType == 1 && i.contentEditable == "false")
        return !1;
      e = r < 0 ? yr(i) : 0;
    } else
      return !1;
  }
}
function yr(i) {
  return i.nodeType == 3 ? i.nodeValue.length : i.childNodes.length;
}
const Lu = { left: 0, right: 0, top: 0, bottom: 0 };
function Gr(i, e) {
  let t = e ? i.left : i.right;
  return { left: t, right: t, top: i.top, bottom: i.bottom };
}
function SA(i) {
  return {
    left: 0,
    right: i.innerWidth,
    top: 0,
    bottom: i.innerHeight
  };
}
function kA(i, e, t, n, r, s, o, a) {
  let l = i.ownerDocument, h = l.defaultView;
  for (let c = i; c; )
    if (c.nodeType == 1) {
      let u, f = c == l.body;
      if (f)
        u = SA(h);
      else {
        if (c.scrollHeight <= c.clientHeight && c.scrollWidth <= c.clientWidth) {
          c = c.parentNode;
          continue;
        }
        let p = c.getBoundingClientRect();
        u = {
          left: p.left,
          right: p.left + c.clientWidth,
          top: p.top,
          bottom: p.top + c.clientHeight
        };
      }
      let d = 0, g = 0;
      if (r == "nearest")
        e.top < u.top ? (g = -(u.top - e.top + o), t > 0 && e.bottom > u.bottom + g && (g = e.bottom - u.bottom + g + o)) : e.bottom > u.bottom && (g = e.bottom - u.bottom + o, t < 0 && e.top - g < u.top && (g = -(u.top + g - e.top + o)));
      else {
        let p = e.bottom - e.top, O = u.bottom - u.top;
        g = (r == "center" && p <= O ? e.top + p / 2 - O / 2 : r == "start" || r == "center" && t < 0 ? e.top - o : e.bottom - O + o) - u.top;
      }
      if (n == "nearest" ? e.left < u.left ? (d = -(u.left - e.left + s), t > 0 && e.right > u.right + d && (d = e.right - u.right + d + s)) : e.right > u.right && (d = e.right - u.right + s, t < 0 && e.left < u.left + d && (d = -(u.left + d - e.left + s))) : d = (n == "center" ? e.left + (e.right - e.left) / 2 - (u.right - u.left) / 2 : n == "start" == a ? e.left - s : e.right - (u.right - u.left) + s) - u.left, d || g)
        if (f)
          h.scrollBy(d, g);
        else {
          if (g) {
            let p = c.scrollTop;
            c.scrollTop += g, g = c.scrollTop - p;
          }
          if (d) {
            let p = c.scrollLeft;
            c.scrollLeft += d, d = c.scrollLeft - p;
          }
          e = {
            left: e.left - d,
            top: e.top - g,
            right: e.right - d,
            bottom: e.bottom - g
          };
        }
      if (f)
        break;
      c = c.assignedSlot || c.parentNode, n = r = "nearest";
    } else if (c.nodeType == 11)
      c = c.host;
    else
      break;
}
class EA {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  eq(e) {
    return this.anchorNode == e.anchorNode && this.anchorOffset == e.anchorOffset && this.focusNode == e.focusNode && this.focusOffset == e.focusOffset;
  }
  setRange(e) {
    this.set(e.anchorNode, e.anchorOffset, e.focusNode, e.focusOffset);
  }
  set(e, t, n, r) {
    this.anchorNode = e, this.anchorOffset = t, this.focusNode = n, this.focusOffset = r;
  }
}
let Oi = null;
function Wu(i) {
  if (i.setActive)
    return i.setActive();
  if (Oi)
    return i.focus(Oi);
  let e = [];
  for (let t = i; t && (e.push(t, t.scrollTop, t.scrollLeft), t != t.ownerDocument); t = t.parentNode)
    ;
  if (i.focus(Oi == null ? {
    get preventScroll() {
      return Oi = { preventScroll: !0 }, !0;
    }
  } : void 0), !Oi) {
    Oi = !1;
    for (let t = 0; t < e.length; ) {
      let n = e[t++], r = e[t++], s = e[t++];
      n.scrollTop != r && (n.scrollTop = r), n.scrollLeft != s && (n.scrollLeft = s);
    }
  }
}
let Gl;
function mn(i, e, t = e) {
  let n = Gl || (Gl = document.createRange());
  return n.setEnd(i, t), n.setStart(i, e), n;
}
function ln(i, e, t) {
  let n = { key: e, code: e, keyCode: t, which: t, cancelable: !0 }, r = new KeyboardEvent("keydown", n);
  r.synthetic = !0, i.dispatchEvent(r);
  let s = new KeyboardEvent("keyup", n);
  return s.synthetic = !0, i.dispatchEvent(s), r.defaultPrevented || s.defaultPrevented;
}
function xA(i) {
  for (; i; ) {
    if (i && (i.nodeType == 9 || i.nodeType == 11 && i.host))
      return i;
    i = i.assignedSlot || i.parentNode;
  }
  return null;
}
function Mu(i) {
  for (; i.attributes.length; )
    i.removeAttributeNode(i.attributes[0]);
}
class ye {
  constructor(e, t, n = !0) {
    this.node = e, this.offset = t, this.precise = n;
  }
  static before(e, t) {
    return new ye(e.parentNode, go(e), t);
  }
  static after(e, t) {
    return new ye(e.parentNode, go(e) + 1, t);
  }
}
const ia = [];
class oe {
  constructor() {
    this.parent = null, this.dom = null, this.dirty = 2;
  }
  get editorView() {
    if (!this.parent)
      throw new Error("Accessing view in orphan content view");
    return this.parent.editorView;
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
    for (let n of this.children) {
      if (n == e)
        return t;
      t += n.length + n.breakAfter;
    }
    throw new RangeError("Invalid child in posBefore");
  }
  posAfter(e) {
    return this.posBefore(e) + e.length;
  }
  // Will return a rectangle directly before (when side < 0), after
  // (side > 0) or directly on (when the browser supports it) the
  // given position.
  coordsAt(e, t) {
    return null;
  }
  sync(e) {
    if (this.dirty & 2) {
      let t = this.dom, n = null, r;
      for (let s of this.children) {
        if (s.dirty) {
          if (!s.dom && (r = n ? n.nextSibling : t.firstChild)) {
            let o = oe.get(r);
            (!o || !o.parent && o.constructor == s.constructor) && s.reuseDOM(r);
          }
          s.sync(e), s.dirty = 0;
        }
        if (r = n ? n.nextSibling : t.firstChild, e && !e.written && e.node == t && r != s.dom && (e.written = !0), s.dom.parentNode == t)
          for (; r && r != s.dom; )
            r = Fl(r);
        else
          t.insertBefore(s.dom, r);
        n = s.dom;
      }
      for (r = n ? n.nextSibling : t.firstChild, r && e && e.node == t && (e.written = !0); r; )
        r = Fl(r);
    } else if (this.dirty & 1)
      for (let t of this.children)
        t.dirty && (t.sync(e), t.dirty = 0);
  }
  reuseDOM(e) {
  }
  localPosFromDOM(e, t) {
    let n;
    if (e == this.dom)
      n = this.dom.childNodes[t];
    else {
      let r = yr(e) == 0 ? 0 : t == 0 ? -1 : 1;
      for (; ; ) {
        let s = e.parentNode;
        if (s == this.dom)
          break;
        r == 0 && s.firstChild != s.lastChild && (e == s.firstChild ? r = -1 : r = 1), e = s;
      }
      r < 0 ? n = e : n = e.nextSibling;
    }
    if (n == this.dom.firstChild)
      return 0;
    for (; n && !oe.get(n); )
      n = n.nextSibling;
    if (!n)
      return this.length;
    for (let r = 0, s = 0; ; r++) {
      let o = this.children[r];
      if (o.dom == n)
        return s;
      s += o.length + o.breakAfter;
    }
  }
  domBoundsAround(e, t, n = 0) {
    let r = -1, s = -1, o = -1, a = -1;
    for (let l = 0, h = n, c = n; l < this.children.length; l++) {
      let u = this.children[l], f = h + u.length;
      if (h < e && f > t)
        return u.domBoundsAround(e, t, h);
      if (f >= e && r == -1 && (r = l, s = h), h > t && u.dom.parentNode == this.dom) {
        o = l, a = c;
        break;
      }
      c = f, h = f + u.breakAfter;
    }
    return {
      from: s,
      to: a < 0 ? n + this.length : a,
      startDOM: (r ? this.children[r - 1].dom.nextSibling : null) || this.dom.firstChild,
      endDOM: o < this.children.length && o >= 0 ? this.children[o].dom : null
    };
  }
  markDirty(e = !1) {
    this.dirty |= 2, this.markParentsDirty(e);
  }
  markParentsDirty(e) {
    for (let t = this.parent; t; t = t.parent) {
      if (e && (t.dirty |= 2), t.dirty & 1)
        return;
      t.dirty |= 1, e = !1;
    }
  }
  setParent(e) {
    this.parent != e && (this.parent = e, this.dirty && this.markParentsDirty(!0));
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
  replaceChildren(e, t, n = ia) {
    this.markDirty();
    for (let r = e; r < t; r++) {
      let s = this.children[r];
      s.parent == this && s.destroy();
    }
    this.children.splice(e, t - e, ...n);
    for (let r = 0; r < n.length; r++)
      n[r].setParent(this);
  }
  ignoreMutation(e) {
    return !1;
  }
  ignoreEvent(e) {
    return !1;
  }
  childCursor(e = this.length) {
    return new Xu(this.children, e, this.children.length);
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
  merge(e, t, n, r, s, o) {
    return !1;
  }
  become(e) {
    return !1;
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
oe.prototype.breakAfter = 0;
function Fl(i) {
  let e = i.nextSibling;
  return i.parentNode.removeChild(i), e;
}
class Xu {
  constructor(e, t, n) {
    this.children = e, this.pos = t, this.i = n, this.off = 0;
  }
  findPos(e, t = 1) {
    for (; ; ) {
      if (e > this.pos || e == this.pos && (t > 0 || this.i == 0 || this.children[this.i - 1].breakAfter))
        return this.off = e - this.pos, this;
      let n = this.children[--this.i];
      this.pos -= n.length + n.breakAfter;
    }
  }
}
function ju(i, e, t, n, r, s, o, a, l) {
  let { children: h } = i, c = h.length ? h[e] : null, u = s.length ? s[s.length - 1] : null, f = u ? u.breakAfter : o;
  if (!(e == n && c && !o && !f && s.length < 2 && c.merge(t, r, s.length ? u : null, t == 0, a, l))) {
    if (n < h.length) {
      let d = h[n];
      d && r < d.length ? (e == n && (d = d.split(r), r = 0), !f && u && d.merge(0, r, u, !0, 0, l) ? s[s.length - 1] = d : (r && d.merge(0, r, null, !1, 0, l), s.push(d))) : d != null && d.breakAfter && (u ? u.breakAfter = 1 : o = 1), n++;
    }
    for (c && (c.breakAfter = o, t > 0 && (!o && s.length && c.merge(t, c.length, s[0], !1, a, 0) ? c.breakAfter = s.shift().breakAfter : (t < c.length || c.children.length && c.children[c.children.length - 1].length == 0) && c.merge(t, c.length, null, !1, a, 0), e++)); e < n && s.length; )
      if (h[n - 1].become(s[s.length - 1]))
        n--, s.pop(), l = s.length ? 0 : a;
      else if (h[e].become(s[0]))
        e++, s.shift(), a = s.length ? 0 : l;
      else
        break;
    !s.length && e && n < h.length && !h[e - 1].breakAfter && h[n].merge(0, 0, h[e - 1], !1, a, l) && e--, (e < n || s.length) && i.replaceChildren(e, n, s);
  }
}
function Zu(i, e, t, n, r, s) {
  let o = i.childCursor(), { i: a, off: l } = o.findPos(t, 1), { i: h, off: c } = o.findPos(e, -1), u = e - t;
  for (let f of n)
    u += f.length;
  i.length += u, ju(i, h, c, a, l, n, 0, r, s);
}
let Xe = typeof navigator < "u" ? navigator : { userAgent: "", vendor: "", platform: "" }, Ao = typeof document < "u" ? document : { documentElement: { style: {} } };
const po = /* @__PURE__ */ /Edge\/(\d+)/.exec(Xe.userAgent), Nu = /* @__PURE__ */ /MSIE \d/.test(Xe.userAgent), Oo = /* @__PURE__ */ /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Xe.userAgent), Fr = !!(Nu || Oo || po), Hl = !Fr && /* @__PURE__ */ /gecko\/(\d+)/i.test(Xe.userAgent), Qs = !Fr && /* @__PURE__ */ /Chrome\/(\d+)/.exec(Xe.userAgent), Jl = "webkitFontSmoothing" in Ao.documentElement.style, zu = !Fr && /* @__PURE__ */ /Apple Computer/.test(Xe.vendor), Kl = zu && (/* @__PURE__ */ /Mobile\/\w+/.test(Xe.userAgent) || Xe.maxTouchPoints > 2);
var R = {
  mac: Kl || /* @__PURE__ */ /Mac/.test(Xe.platform),
  windows: /* @__PURE__ */ /Win/.test(Xe.platform),
  linux: /* @__PURE__ */ /Linux|X11/.test(Xe.platform),
  ie: Fr,
  ie_version: Nu ? Ao.documentMode || 6 : Oo ? +Oo[1] : po ? +po[1] : 0,
  gecko: Hl,
  gecko_version: Hl ? +(/* @__PURE__ */ /Firefox\/(\d+)/.exec(Xe.userAgent) || [0, 0])[1] : 0,
  chrome: !!Qs,
  chrome_version: Qs ? +Qs[1] : 0,
  ios: Kl,
  android: /* @__PURE__ */ /Android\b/.test(Xe.userAgent),
  webkit: Jl,
  safari: zu,
  webkit_version: Jl ? +(/* @__PURE__ */ /\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0,
  tabSize: Ao.documentElement.style.tabSize != null ? "tab-size" : "-moz-tab-size"
};
const BA = 256;
class Vt extends oe {
  constructor(e) {
    super(), this.text = e;
  }
  get length() {
    return this.text.length;
  }
  createDOM(e) {
    this.setDOM(e || document.createTextNode(this.text));
  }
  sync(e) {
    this.dom || this.createDOM(), this.dom.nodeValue != this.text && (e && e.node == this.dom && (e.written = !0), this.dom.nodeValue = this.text);
  }
  reuseDOM(e) {
    e.nodeType == 3 && this.createDOM(e);
  }
  merge(e, t, n) {
    return n && (!(n instanceof Vt) || this.length - (t - e) + n.length > BA) ? !1 : (this.text = this.text.slice(0, e) + (n ? n.text : "") + this.text.slice(t), this.markDirty(), !0);
  }
  split(e) {
    let t = new Vt(this.text.slice(e));
    return this.text = this.text.slice(0, e), this.markDirty(), t;
  }
  localPosFromDOM(e, t) {
    return e == this.dom ? t : t ? this.text.length : 0;
  }
  domAtPos(e) {
    return new ye(this.dom, e);
  }
  domBoundsAround(e, t, n) {
    return { from: n, to: n + this.length, startDOM: this.dom, endDOM: this.dom.nextSibling };
  }
  coordsAt(e, t) {
    return mo(this.dom, e, t);
  }
}
class At extends oe {
  constructor(e, t = [], n = 0) {
    super(), this.mark = e, this.children = t, this.length = n;
    for (let r of t)
      r.setParent(this);
  }
  setAttrs(e) {
    if (Mu(e), this.mark.class && (e.className = this.mark.class), this.mark.attrs)
      for (let t in this.mark.attrs)
        e.setAttribute(t, this.mark.attrs[t]);
    return e;
  }
  reuseDOM(e) {
    e.nodeName == this.mark.tagName.toUpperCase() && (this.setDOM(e), this.dirty |= 6);
  }
  sync(e) {
    this.dom ? this.dirty & 4 && this.setAttrs(this.dom) : this.setDOM(this.setAttrs(document.createElement(this.mark.tagName))), super.sync(e);
  }
  merge(e, t, n, r, s, o) {
    return n && (!(n instanceof At && n.mark.eq(this.mark)) || e && s <= 0 || t < this.length && o <= 0) ? !1 : (Zu(this, e, t, n ? n.children : [], s - 1, o - 1), this.markDirty(), !0);
  }
  split(e) {
    let t = [], n = 0, r = -1, s = 0;
    for (let a of this.children) {
      let l = n + a.length;
      l > e && t.push(n < e ? a.split(e - n) : a), r < 0 && n >= e && (r = s), n = l, s++;
    }
    let o = this.length - e;
    return this.length = e, r > -1 && (this.children.length = r, this.markDirty()), new At(this.mark, t, o);
  }
  domAtPos(e) {
    return Yu(this.dom, this.children, e);
  }
  coordsAt(e, t) {
    return Gu(this, e, t);
  }
}
function mo(i, e, t) {
  let n = i.nodeValue.length;
  e > n && (e = n);
  let r = e, s = e, o = 0;
  e == 0 && t < 0 || e == n && t >= 0 ? R.chrome || R.gecko || (e ? (r--, o = 1) : (s++, o = -1)) : t < 0 ? r-- : s++;
  let a = mn(i, r, s).getClientRects();
  if (!a.length)
    return Lu;
  let l = a[(o ? o < 0 : t >= 0) ? 0 : a.length - 1];
  return R.safari && !o && l.width == 0 && (l = Array.prototype.find.call(a, (h) => h.width) || l), o ? Gr(l, o < 0) : l || null;
}
class Mt extends oe {
  constructor(e, t, n) {
    super(), this.widget = e, this.length = t, this.side = n, this.prevWidget = null;
  }
  static create(e, t, n) {
    return new (e.customView || Mt)(e, t, n);
  }
  split(e) {
    let t = Mt.create(this.widget, this.length - e, this.side);
    return this.length -= e, t;
  }
  sync() {
    (!this.dom || !this.widget.updateDOM(this.dom)) && (this.dom && this.prevWidget && this.prevWidget.destroy(this.dom), this.prevWidget = null, this.setDOM(this.widget.toDOM(this.editorView)), this.dom.contentEditable = "false");
  }
  getSide() {
    return this.side;
  }
  merge(e, t, n, r, s, o) {
    return n && (!(n instanceof Mt) || !this.widget.compare(n.widget) || e > 0 && s <= 0 || t < this.length && o <= 0) ? !1 : (this.length = e + (n ? n.length : 0) + (this.length - t), !0);
  }
  become(e) {
    return e.length == this.length && e instanceof Mt && e.side == this.side && this.widget.constructor == e.widget.constructor ? (this.widget.eq(e.widget) || this.markDirty(!0), this.dom && !this.prevWidget && (this.prevWidget = this.widget), this.widget = e.widget, !0) : !1;
  }
  ignoreMutation() {
    return !0;
  }
  ignoreEvent(e) {
    return this.widget.ignoreEvent(e);
  }
  get overrideDOMText() {
    if (this.length == 0)
      return G.empty;
    let e = this;
    for (; e.parent; )
      e = e.parent;
    let t = e.editorView, n = t && t.state.doc, r = this.posAtStart;
    return n ? n.slice(r, r + this.length) : G.empty;
  }
  domAtPos(e) {
    return e == 0 ? ye.before(this.dom) : ye.after(this.dom, e == this.length);
  }
  domBoundsAround() {
    return null;
  }
  coordsAt(e, t) {
    let n = this.dom.getClientRects(), r = null;
    if (!n.length)
      return Lu;
    for (let s = e > 0 ? n.length - 1 : 0; r = n[s], !(e > 0 ? s == 0 : s == n.length - 1 || r.top < r.bottom); s += e > 0 ? -1 : 1)
      ;
    return e == 0 && t > 0 || e == this.length && t <= 0 ? r : Gr(r, e == 0);
  }
  get isEditable() {
    return !1;
  }
  destroy() {
    super.destroy(), this.dom && this.widget.destroy(this.dom);
  }
}
class Uu extends Mt {
  domAtPos(e) {
    let { topView: t, text: n } = this.widget;
    return t ? Qo(e, 0, t, n, (r, s) => r.domAtPos(s), (r) => new ye(n, Math.min(r, n.nodeValue.length))) : new ye(n, Math.min(e, n.nodeValue.length));
  }
  sync() {
    this.setDOM(this.widget.toDOM());
  }
  localPosFromDOM(e, t) {
    let { topView: n, text: r } = this.widget;
    return n ? Vu(e, t, n, r) : Math.min(t, this.length);
  }
  ignoreMutation() {
    return !1;
  }
  get overrideDOMText() {
    return null;
  }
  coordsAt(e, t) {
    let { topView: n, text: r } = this.widget;
    return n ? Qo(e, t, n, r, (s, o, a) => s.coordsAt(o, a), (s, o) => mo(r, s, o)) : mo(r, e, t);
  }
  destroy() {
    var e;
    super.destroy(), (e = this.widget.topView) === null || e === void 0 || e.destroy();
  }
  get isEditable() {
    return !0;
  }
}
function Qo(i, e, t, n, r, s) {
  if (t instanceof At) {
    for (let o of t.children) {
      let a = xi(o.dom, n), l = a ? n.nodeValue.length : o.length;
      if (i < l || i == l && o.getSide() <= 0)
        return a ? Qo(i, e, o, n, r, s) : r(o, i, e);
      i -= l;
    }
    return r(t, t.length, -1);
  } else
    return t.dom == n ? s(i, e) : r(t, i, e);
}
function Vu(i, e, t, n) {
  if (t instanceof At)
    for (let r of t.children) {
      let s = 0, o = xi(r.dom, n);
      if (xi(r.dom, i))
        return s + (o ? Vu(i, e, r, n) : r.localPosFromDOM(i, e));
      s += o ? n.nodeValue.length : r.length;
    }
  else if (t.dom == n)
    return Math.min(e, n.nodeValue.length);
  return t.localPosFromDOM(i, e);
}
class Bi extends oe {
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
    return e instanceof Bi && e.side == this.side;
  }
  split() {
    return new Bi(this.side);
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
    return ye.before(this.dom);
  }
  localPosFromDOM() {
    return 0;
  }
  domBoundsAround() {
    return null;
  }
  coordsAt(e) {
    let t = this.dom.getBoundingClientRect(), n = IA(this, this.side > 0 ? -1 : 1);
    return n && n.top < t.bottom && n.bottom > t.top ? { left: t.left, right: t.right, top: n.top, bottom: n.bottom } : t;
  }
  get overrideDOMText() {
    return G.empty;
  }
}
Vt.prototype.children = Mt.prototype.children = Bi.prototype.children = ia;
function IA(i, e) {
  let t = i.parent, n = t ? t.children.indexOf(i) : -1;
  for (; t && n >= 0; )
    if (e < 0 ? n > 0 : n < t.children.length) {
      let r = t.children[n + e];
      if (r instanceof Vt) {
        let s = r.coordsAt(e < 0 ? r.length : 0, e);
        if (s)
          return s;
      }
      n += e;
    } else if (t instanceof At && t.parent)
      n = t.parent.children.indexOf(t) + (e < 0 ? 0 : 1), t = t.parent;
    else {
      let r = t.dom.lastChild;
      if (r && r.nodeName == "BR")
        return r.getClientRects()[0];
      break;
    }
}
function Yu(i, e, t) {
  let n = 0;
  for (let r = 0; n < e.length; n++) {
    let s = e[n], o = r + s.length;
    if (!(o == r && s.getSide() <= 0)) {
      if (t > r && t < o && s.dom.parentNode == i)
        return s.domAtPos(t - r);
      if (t <= r)
        break;
      r = o;
    }
  }
  for (; n > 0; n--) {
    let r = e[n - 1].dom;
    if (r.parentNode == i)
      return ye.after(r);
  }
  return new ye(i, 0);
}
function qu(i, e, t) {
  let n, { children: r } = i;
  t > 0 && e instanceof At && r.length && (n = r[r.length - 1]) instanceof At && n.mark.eq(e.mark) ? qu(n, e.children[0], t - 1) : (r.push(e), e.setParent(i)), i.length += e.length;
}
function Gu(i, e, t) {
  for (let s = 0, o = 0; o < i.children.length; o++) {
    let a = i.children[o], l = s + a.length, h;
    if ((t <= 0 || l == i.length || a.getSide() > 0 ? l >= e : l > e) && (e < l || o + 1 == i.children.length || (h = i.children[o + 1]).length || h.getSide() > 0)) {
      let c = 0;
      if (l == s) {
        if (a.getSide() <= 0)
          continue;
        c = t = -a.getSide();
      }
      let u = a.coordsAt(Math.max(0, e - s), t);
      return c && u ? Gr(u, t < 0) : u;
    }
    s = l;
  }
  let n = i.dom.lastChild;
  if (!n)
    return i.dom.getBoundingClientRect();
  let r = On(n);
  return r[r.length - 1] || null;
}
function bo(i, e) {
  for (let t in i)
    t == "class" && e.class ? e.class += " " + i.class : t == "style" && e.style ? e.style += ";" + i.style : e[t] = i[t];
  return e;
}
function na(i, e) {
  if (i == e)
    return !0;
  if (!i || !e)
    return !1;
  let t = Object.keys(i), n = Object.keys(e);
  if (t.length != n.length)
    return !1;
  for (let r of t)
    if (n.indexOf(r) == -1 || i[r] !== e[r])
      return !1;
  return !0;
}
function yo(i, e, t) {
  if (e)
    for (let n in e)
      t && n in t || i.removeAttribute(n);
  if (t)
    for (let n in t)
      e && e[n] == t[n] || i.setAttribute(n, t[n]);
}
class Ot {
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
  updateDOM(e) {
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
  Can be used to configure which kinds of events inside the widget
  should be ignored by the editor. The default is to ignore all
  events.
  */
  ignoreEvent(e) {
    return !0;
  }
  /**
  @internal
  */
  get customView() {
    return null;
  }
  /**
  This is called when the an instance of the widget is removed
  from the editor view.
  */
  destroy(e) {
  }
}
var J = /* @__PURE__ */ function(i) {
  return i[i.Text = 0] = "Text", i[i.WidgetBefore = 1] = "WidgetBefore", i[i.WidgetAfter = 2] = "WidgetAfter", i[i.WidgetRange = 3] = "WidgetRange", i;
}(J || (J = {}));
class T extends li {
  /**
  @internal
  */
  constructor(e, t, n, r) {
    super(), this.startSide = e, this.endSide = t, this.widget = n, this.spec = r;
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
  precedence of the [facet](https://codemirror.net/6/docs/ref/#view.EditorView^decorations) or
  (below the facet-provided decorations) [view
  plugin](https://codemirror.net/6/docs/ref/#view.PluginSpec.decorations). Such elements are split
  on line boundaries and on the boundaries of higher-precedence
  decorations.
  */
  static mark(e) {
    return new Hr(e);
  }
  /**
  Create a widget decoration, which adds an element at the given
  position.
  */
  static widget(e) {
    let t = e.side || 0, n = !!e.block;
    return t += n ? t > 0 ? 3e8 : -4e8 : t > 0 ? 1e8 : -1e8, new hi(e, t, t, n, e.widget || null, !1);
  }
  /**
  Create a replace decoration which replaces the given range with
  a widget, or simply hides it.
  */
  static replace(e) {
    let t = !!e.block, n, r;
    if (e.isBlockGap)
      n = -5e8, r = 4e8;
    else {
      let { start: s, end: o } = Fu(e, t);
      n = (s ? t ? -3e8 : -1 : 5e8) - 1, r = (o ? t ? 2e8 : 1 : -6e8) + 1;
    }
    return new hi(e, n, r, t, e.widget || null, !0);
  }
  /**
  Create a line decoration, which can add DOM attributes to the
  line starting at the given position.
  */
  static line(e) {
    return new En(e);
  }
  /**
  Build a [`DecorationSet`](https://codemirror.net/6/docs/ref/#view.DecorationSet) from the given
  decorated range or ranges. If the ranges aren't already sorted,
  pass `true` for `sort` to make the library sort them for you.
  */
  static set(e, t = !1) {
    return F.of(e, t);
  }
  /**
  @internal
  */
  hasHeight() {
    return this.widget ? this.widget.estimatedHeight > -1 : !1;
  }
}
T.none = F.empty;
class Hr extends T {
  constructor(e) {
    let { start: t, end: n } = Fu(e);
    super(t ? -1 : 5e8, n ? 1 : -6e8, null, e), this.tagName = e.tagName || "span", this.class = e.class || "", this.attrs = e.attributes || null;
  }
  eq(e) {
    return this == e || e instanceof Hr && this.tagName == e.tagName && this.class == e.class && na(this.attrs, e.attrs);
  }
  range(e, t = e) {
    if (e >= t)
      throw new RangeError("Mark decorations may not be empty");
    return super.range(e, t);
  }
}
Hr.prototype.point = !1;
class En extends T {
  constructor(e) {
    super(-2e8, -2e8, null, e);
  }
  eq(e) {
    return e instanceof En && na(this.spec.attributes, e.spec.attributes);
  }
  range(e, t = e) {
    if (t != e)
      throw new RangeError("Line decoration ranges must be zero-length");
    return super.range(e, t);
  }
}
En.prototype.mapMode = be.TrackBefore;
En.prototype.point = !0;
class hi extends T {
  constructor(e, t, n, r, s, o) {
    super(t, n, s, e), this.block = r, this.isReplace = o, this.mapMode = r ? t <= 0 ? be.TrackBefore : be.TrackAfter : be.TrackDel;
  }
  // Only relevant when this.block == true
  get type() {
    return this.startSide < this.endSide ? J.WidgetRange : this.startSide <= 0 ? J.WidgetBefore : J.WidgetAfter;
  }
  get heightRelevant() {
    return this.block || !!this.widget && this.widget.estimatedHeight >= 5;
  }
  eq(e) {
    return e instanceof hi && TA(this.widget, e.widget) && this.block == e.block && this.startSide == e.startSide && this.endSide == e.endSide;
  }
  range(e, t = e) {
    if (this.isReplace && (e > t || e == t && this.startSide > 0 && this.endSide <= 0))
      throw new RangeError("Invalid range for replacement decoration");
    if (!this.isReplace && t != e)
      throw new RangeError("Widget decorations can only have zero-length ranges");
    return super.range(e, t);
  }
}
hi.prototype.point = !0;
function Fu(i, e = !1) {
  let { inclusiveStart: t, inclusiveEnd: n } = i;
  return t == null && (t = i.inclusive), n == null && (n = i.inclusive), { start: t ?? e, end: n ?? e };
}
function TA(i, e) {
  return i == e || !!(i && e && i.compare(e));
}
function wo(i, e, t, n = 0) {
  let r = t.length - 1;
  r >= 0 && t[r] + n >= i ? t[r] = Math.max(t[r], e) : t.push(i, e);
}
class xe extends oe {
  constructor() {
    super(...arguments), this.children = [], this.length = 0, this.prevAttrs = void 0, this.attrs = null, this.breakAfter = 0;
  }
  // Consumes source
  merge(e, t, n, r, s, o) {
    if (n) {
      if (!(n instanceof xe))
        return !1;
      this.dom || n.transferDOM(this);
    }
    return r && this.setDeco(n ? n.attrs : null), Zu(this, e, t, n ? n.children : [], s, o), !0;
  }
  split(e) {
    let t = new xe();
    if (t.breakAfter = this.breakAfter, this.length == 0)
      return t;
    let { i: n, off: r } = this.childPos(e);
    r && (t.append(this.children[n].split(r), 0), this.children[n].merge(r, this.children[n].length, null, !1, 0, 0), n++);
    for (let s = n; s < this.children.length; s++)
      t.append(this.children[s], 0);
    for (; n > 0 && this.children[n - 1].length == 0; )
      this.children[--n].destroy();
    return this.children.length = n, this.markDirty(), this.length = e, t;
  }
  transferDOM(e) {
    this.dom && (e.setDOM(this.dom), e.prevAttrs = this.prevAttrs === void 0 ? this.attrs : this.prevAttrs, this.prevAttrs = void 0, this.dom = null);
  }
  setDeco(e) {
    na(this.attrs, e) || (this.dom && (this.prevAttrs = this.attrs, this.markDirty()), this.attrs = e);
  }
  append(e, t) {
    qu(this, e, t);
  }
  // Only called when building a line view in ContentBuilder
  addLineDeco(e) {
    let t = e.spec.attributes, n = e.spec.class;
    t && (this.attrs = bo(t, this.attrs || {})), n && (this.attrs = bo({ class: n }, this.attrs || {}));
  }
  domAtPos(e) {
    return Yu(this.dom, this.children, e);
  }
  reuseDOM(e) {
    e.nodeName == "DIV" && (this.setDOM(e), this.dirty |= 6);
  }
  sync(e) {
    var t;
    this.dom ? this.dirty & 4 && (Mu(this.dom), this.dom.className = "cm-line", this.prevAttrs = this.attrs ? null : void 0) : (this.setDOM(document.createElement("div")), this.dom.className = "cm-line", this.prevAttrs = this.attrs ? null : void 0), this.prevAttrs !== void 0 && (yo(this.dom, this.prevAttrs, this.attrs), this.dom.classList.add("cm-line"), this.prevAttrs = void 0), super.sync(e);
    let n = this.dom.lastChild;
    for (; n && oe.get(n) instanceof At; )
      n = n.lastChild;
    if (!n || !this.length || n.nodeName != "BR" && ((t = oe.get(n)) === null || t === void 0 ? void 0 : t.isEditable) == !1 && (!R.ios || !this.children.some((r) => r instanceof Vt))) {
      let r = document.createElement("BR");
      r.cmIgnore = !0, this.dom.appendChild(r);
    }
  }
  measureTextSize() {
    if (this.children.length == 0 || this.length > 20)
      return null;
    let e = 0;
    for (let t of this.children) {
      if (!(t instanceof Vt))
        return null;
      let n = On(t.dom);
      if (n.length != 1)
        return null;
      e += n[0].width;
    }
    return {
      lineHeight: this.dom.getBoundingClientRect().height,
      charWidth: e / this.length
    };
  }
  coordsAt(e, t) {
    return Gu(this, e, t);
  }
  become(e) {
    return !1;
  }
  get type() {
    return J.Text;
  }
  static find(e, t) {
    for (let n = 0, r = 0; n < e.children.length; n++) {
      let s = e.children[n], o = r + s.length;
      if (o >= t) {
        if (s instanceof xe)
          return s;
        if (o > t)
          break;
      }
      r = o + s.breakAfter;
    }
    return null;
  }
}
class si extends oe {
  constructor(e, t, n) {
    super(), this.widget = e, this.length = t, this.type = n, this.breakAfter = 0, this.prevWidget = null;
  }
  merge(e, t, n, r, s, o) {
    return n && (!(n instanceof si) || !this.widget.compare(n.widget) || e > 0 && s <= 0 || t < this.length && o <= 0) ? !1 : (this.length = e + (n ? n.length : 0) + (this.length - t), !0);
  }
  domAtPos(e) {
    return e == 0 ? ye.before(this.dom) : ye.after(this.dom, e == this.length);
  }
  split(e) {
    let t = this.length - e;
    this.length = e;
    let n = new si(this.widget, t, this.type);
    return n.breakAfter = this.breakAfter, n;
  }
  get children() {
    return ia;
  }
  sync() {
    (!this.dom || !this.widget.updateDOM(this.dom)) && (this.dom && this.prevWidget && this.prevWidget.destroy(this.dom), this.prevWidget = null, this.setDOM(this.widget.toDOM(this.editorView)), this.dom.contentEditable = "false");
  }
  get overrideDOMText() {
    return this.parent ? this.parent.view.state.doc.slice(this.posAtStart, this.posAtEnd) : G.empty;
  }
  domBoundsAround() {
    return null;
  }
  become(e) {
    return e instanceof si && e.type == this.type && e.widget.constructor == this.widget.constructor ? (e.widget.eq(this.widget) || this.markDirty(!0), this.dom && !this.prevWidget && (this.prevWidget = this.widget), this.widget = e.widget, this.length = e.length, this.breakAfter = e.breakAfter, !0) : !1;
  }
  ignoreMutation() {
    return !0;
  }
  ignoreEvent(e) {
    return this.widget.ignoreEvent(e);
  }
  destroy() {
    super.destroy(), this.dom && this.widget.destroy(this.dom);
  }
}
class ra {
  constructor(e, t, n, r) {
    this.doc = e, this.pos = t, this.end = n, this.disallowBlockEffectsBelow = r, this.content = [], this.curLine = null, this.breakAtStart = 0, this.pendingBuffer = 0, this.atCursorPos = !0, this.openStart = -1, this.openEnd = -1, this.text = "", this.textOff = 0, this.cursor = e.iter(), this.skip = t;
  }
  posCovered() {
    if (this.content.length == 0)
      return !this.breakAtStart && this.doc.lineAt(this.pos).from != this.pos;
    let e = this.content[this.content.length - 1];
    return !e.breakAfter && !(e instanceof si && e.type == J.WidgetBefore);
  }
  getLine() {
    return this.curLine || (this.content.push(this.curLine = new xe()), this.atCursorPos = !0), this.curLine;
  }
  flushBuffer(e) {
    this.pendingBuffer && (this.curLine.append(Nn(new Bi(-1), e), e.length), this.pendingBuffer = 0);
  }
  addBlockWidget(e) {
    this.flushBuffer([]), this.curLine = null, this.content.push(e);
  }
  finish(e) {
    e ? this.pendingBuffer = 0 : this.flushBuffer([]), this.posCovered() || this.getLine();
  }
  buildText(e, t, n) {
    for (; e > 0; ) {
      if (this.textOff == this.text.length) {
        let { value: s, lineBreak: o, done: a } = this.cursor.next(this.skip);
        if (this.skip = 0, a)
          throw new Error("Ran out of text content when drawing inline views");
        if (o) {
          this.posCovered() || this.getLine(), this.content.length ? this.content[this.content.length - 1].breakAfter = 1 : this.breakAtStart = 1, this.flushBuffer([]), this.curLine = null, e--;
          continue;
        } else
          this.text = s, this.textOff = 0;
      }
      let r = Math.min(
        this.text.length - this.textOff,
        e,
        512
        /* Chunk */
      );
      this.flushBuffer(t.slice(0, n)), this.getLine().append(Nn(new Vt(this.text.slice(this.textOff, this.textOff + r)), t), n), this.atCursorPos = !0, this.textOff += r, e -= r, n = 0;
    }
  }
  span(e, t, n, r) {
    this.buildText(t - e, n, r), this.pos = t, this.openStart < 0 && (this.openStart = r);
  }
  point(e, t, n, r, s) {
    let o = t - e;
    if (n instanceof hi)
      if (n.block) {
        let { type: a } = n;
        a == J.WidgetAfter && !this.posCovered() && this.getLine(), this.addBlockWidget(new si(n.widget || new $l("div"), o, a));
      } else {
        let a = Mt.create(n.widget || new $l("span"), o, n.startSide), l = this.atCursorPos && !a.isEditable && s <= r.length && (e < t || n.startSide > 0), h = !a.isEditable && (e < t || n.startSide <= 0), c = this.getLine();
        this.pendingBuffer == 2 && !l && (this.pendingBuffer = 0), this.flushBuffer(r), l && (c.append(Nn(new Bi(1), r), s), s = r.length + Math.max(0, s - r.length)), c.append(Nn(a, r), s), this.atCursorPos = h, this.pendingBuffer = h ? e < t ? 1 : 2 : 0;
      }
    else
      this.doc.lineAt(this.pos).from == this.pos && this.getLine().addLineDeco(n);
    o && (this.textOff + o <= this.text.length ? this.textOff += o : (this.skip += o - (this.text.length - this.textOff), this.text = "", this.textOff = 0), this.pos = t), this.openStart < 0 && (this.openStart = s);
  }
  filterPoint(e, t, n, r) {
    if (r < this.disallowBlockEffectsBelow && n instanceof hi) {
      if (n.block)
        throw new RangeError("Block decorations may not be specified via plugins");
      if (t > this.doc.lineAt(this.pos).to)
        throw new RangeError("Decorations that replace line breaks may not be specified via plugins");
    }
    return !0;
  }
  static build(e, t, n, r, s) {
    let o = new ra(e, t, n, s);
    return o.openEnd = F.spans(r, t, n, o), o.openStart < 0 && (o.openStart = o.openEnd), o.finish(o.openEnd), o;
  }
}
function Nn(i, e) {
  for (let t of e)
    i = new At(t, [i], i.length);
  return i;
}
class $l extends Ot {
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
}
const PA = [], Hu = /* @__PURE__ */ P.define(), Ju = /* @__PURE__ */ P.define(), Ku = /* @__PURE__ */ P.define(), $u = /* @__PURE__ */ P.define(), vo = /* @__PURE__ */ P.define(), _u = /* @__PURE__ */ P.define(), Co = /* @__PURE__ */ W.define({
  map: (i, e) => i.map(e)
}), ef = /* @__PURE__ */ W.define({
  map: (i, e) => i.map(e)
});
class wi {
  constructor(e, t = "nearest", n = "nearest", r = 5, s = 5) {
    this.range = e, this.y = t, this.x = n, this.yMargin = r, this.xMargin = s;
  }
  map(e) {
    return e.empty ? this : new wi(this.range.map(e), this.y, this.x, this.yMargin, this.xMargin);
  }
}
const _l = /* @__PURE__ */ W.define({ map: (i, e) => i.map(e) });
function Ne(i, e, t) {
  let n = i.facet($u);
  n.length ? n[0](e) : window.onerror ? window.onerror(String(e), t, void 0, void 0, e) : t ? console.error(t + ":", e) : console.error(e);
}
const xn = /* @__PURE__ */ P.define({ combine: (i) => i.length ? i[0] : !0 });
class RA {
  /**
  @internal
  */
  constructor(e, t) {
    this.field = e, this.get = t;
  }
}
class ve {
  /**
  Create a [provider](https://codemirror.net/6/docs/ref/#view.PluginFieldProvider) for this field,
  to use with a plugin's [provide](https://codemirror.net/6/docs/ref/#view.PluginSpec.provide)
  option.
  */
  from(e) {
    return new RA(this, e);
  }
  /**
  Define a new plugin field.
  */
  static define() {
    return new ve();
  }
}
ve.decorations = /* @__PURE__ */ ve.define();
ve.atomicRanges = /* @__PURE__ */ ve.define();
ve.scrollMargins = /* @__PURE__ */ ve.define();
let DA = 0;
const en = /* @__PURE__ */ P.define();
class le {
  constructor(e, t, n) {
    this.id = e, this.create = t, this.fields = n, this.extension = en.of(this);
  }
  /**
  Define a plugin from a constructor function that creates the
  plugin's value, given an editor view.
  */
  static define(e, t) {
    let { eventHandlers: n, provide: r, decorations: s } = t || {}, o = [];
    if (r)
      for (let a of Array.isArray(r) ? r : [r])
        o.push(a);
    return n && o.push(tf.from((a) => ({ plugin: a, handlers: n }))), s && o.push(ve.decorations.from(s)), new le(DA++, e, o);
  }
  /**
  Create a plugin for a class whose constructor takes a single
  editor view as argument.
  */
  static fromClass(e, t) {
    return le.define((n) => new e(n), t);
  }
}
const tf = /* @__PURE__ */ ve.define();
class bs {
  constructor(e) {
    this.spec = e, this.mustUpdate = null, this.value = null;
  }
  takeField(e, t) {
    if (this.spec)
      for (let { field: n, get: r } of this.spec.fields)
        n == e && t.push(r(this.value));
  }
  update(e) {
    if (this.value) {
      if (this.mustUpdate) {
        let t = this.mustUpdate;
        if (this.mustUpdate = null, this.value.update)
          try {
            this.value.update(t);
          } catch (n) {
            if (Ne(t.state, n, "CodeMirror plugin crashed"), this.value.destroy)
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
        Ne(e.state, t, "CodeMirror plugin crashed"), this.deactivate();
      }
    return this;
  }
  destroy(e) {
    var t;
    if (!((t = this.value) === null || t === void 0) && t.destroy)
      try {
        this.value.destroy();
      } catch (n) {
        Ne(e.state, n, "CodeMirror plugin crashed");
      }
  }
  deactivate() {
    this.spec = this.value = null;
  }
}
const nf = /* @__PURE__ */ P.define(), rf = /* @__PURE__ */ P.define(), ti = /* @__PURE__ */ P.define(), tn = /* @__PURE__ */ P.define();
class Et {
  constructor(e, t, n, r) {
    this.fromA = e, this.toA = t, this.fromB = n, this.toB = r;
  }
  join(e) {
    return new Et(Math.min(this.fromA, e.fromA), Math.max(this.toA, e.toA), Math.min(this.fromB, e.fromB), Math.max(this.toB, e.toB));
  }
  addToSet(e) {
    let t = e.length, n = this;
    for (; t > 0; t--) {
      let r = e[t - 1];
      if (!(r.fromA > n.toA)) {
        if (r.toA < n.fromA)
          break;
        n = n.join(r), e.splice(t - 1, 1);
      }
    }
    return e.splice(t, 0, n), e;
  }
  static extendWithRanges(e, t) {
    if (t.length == 0)
      return e;
    let n = [];
    for (let r = 0, s = 0, o = 0, a = 0; ; r++) {
      let l = r == e.length ? null : e[r], h = o - a, c = l ? l.fromB : 1e9;
      for (; s < t.length && t[s] < c; ) {
        let u = t[s], f = t[s + 1], d = Math.max(a, u), g = Math.min(c, f);
        if (d <= g && new Et(d + h, g + h, d, g).addToSet(n), f > c)
          break;
        s += 2;
      }
      if (!l)
        return n;
      new Et(l.fromA, l.toA, l.fromB, l.toB).addToSet(n), o = l.toA, a = l.toB;
    }
  }
}
class eh {
  /**
  @internal
  */
  constructor(e, t, n = PA) {
    this.view = e, this.state = t, this.transactions = n, this.flags = 0, this.startState = e.state, this.changes = ge.empty(this.startState.doc.length);
    for (let o of n)
      this.changes = this.changes.compose(o.changes);
    let r = [];
    this.changes.iterChangedRanges((o, a, l, h) => r.push(new Et(o, a, l, h))), this.changedRanges = r;
    let s = e.hasFocus;
    s != e.inputState.notifiedFocused && (e.inputState.notifiedFocused = s, this.flags |= 1);
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
  Indicates whether the height of an element in the editor changed
  in this update.
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
var q = /* @__PURE__ */ function(i) {
  return i[i.LTR = 0] = "LTR", i[i.RTL = 1] = "RTL", i;
}(q || (q = {}));
const So = q.LTR, LA = q.RTL;
function sf(i) {
  let e = [];
  for (let t = 0; t < i.length; t++)
    e.push(1 << +i[t]);
  return e;
}
const WA = /* @__PURE__ */ sf("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"), MA = /* @__PURE__ */ sf("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"), ko = /* @__PURE__ */ Object.create(null), nt = [];
for (let i of ["()", "[]", "{}"]) {
  let e = /* @__PURE__ */ i.charCodeAt(0), t = /* @__PURE__ */ i.charCodeAt(1);
  ko[e] = t, ko[t] = -e;
}
function XA(i) {
  return i <= 247 ? WA[i] : 1424 <= i && i <= 1524 ? 2 : 1536 <= i && i <= 1785 ? MA[i - 1536] : 1774 <= i && i <= 2220 ? 4 : 8192 <= i && i <= 8203 || i == 8204 ? 256 : 1;
}
const jA = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
class ki {
  /**
  @internal
  */
  constructor(e, t, n) {
    this.from = e, this.to = t, this.level = n;
  }
  /**
  The direction of this span.
  */
  get dir() {
    return this.level % 2 ? LA : So;
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
  static find(e, t, n, r) {
    let s = -1;
    for (let o = 0; o < e.length; o++) {
      let a = e[o];
      if (a.from <= t && a.to >= t) {
        if (a.level == n)
          return o;
        (s < 0 || (r != 0 ? r < 0 ? a.from < t : a.to > t : e[s].level > a.level)) && (s = o);
      }
    }
    if (s < 0)
      throw new RangeError("Index out of range");
    return s;
  }
}
const te = [];
function ZA(i, e) {
  let t = i.length, n = e == So ? 1 : 2, r = e == So ? 2 : 1;
  if (!i || n == 1 && !jA.test(i))
    return of(t);
  for (let o = 0, a = n, l = n; o < t; o++) {
    let h = XA(i.charCodeAt(o));
    h == 512 ? h = a : h == 8 && l == 4 && (h = 16), te[o] = h == 4 ? 2 : h, h & 7 && (l = h), a = h;
  }
  for (let o = 0, a = n, l = n; o < t; o++) {
    let h = te[o];
    if (h == 128)
      o < t - 1 && a == te[o + 1] && a & 24 ? h = te[o] = a : te[o] = 256;
    else if (h == 64) {
      let c = o + 1;
      for (; c < t && te[c] == 64; )
        c++;
      let u = o && a == 8 || c < t && te[c] == 8 ? l == 1 ? 1 : 8 : 256;
      for (let f = o; f < c; f++)
        te[f] = u;
      o = c - 1;
    } else
      h == 8 && l == 1 && (te[o] = 1);
    a = h, h & 7 && (l = h);
  }
  for (let o = 0, a = 0, l = 0, h, c, u; o < t; o++)
    if (c = ko[h = i.charCodeAt(o)])
      if (c < 0) {
        for (let f = a - 3; f >= 0; f -= 3)
          if (nt[f + 1] == -c) {
            let d = nt[f + 2], g = d & 2 ? n : d & 4 ? d & 1 ? r : n : 0;
            g && (te[o] = te[nt[f]] = g), a = f;
            break;
          }
      } else {
        if (nt.length == 189)
          break;
        nt[a++] = o, nt[a++] = h, nt[a++] = l;
      }
    else if ((u = te[o]) == 2 || u == 1) {
      let f = u == n;
      l = f ? 0 : 1;
      for (let d = a - 3; d >= 0; d -= 3) {
        let g = nt[d + 2];
        if (g & 2)
          break;
        if (f)
          nt[d + 2] |= 2;
        else {
          if (g & 4)
            break;
          nt[d + 2] |= 4;
        }
      }
    }
  for (let o = 0; o < t; o++)
    if (te[o] == 256) {
      let a = o + 1;
      for (; a < t && te[a] == 256; )
        a++;
      let l = (o ? te[o - 1] : n) == 1, h = (a < t ? te[a] : n) == 1, c = l == h ? l ? 1 : 2 : n;
      for (let u = o; u < a; u++)
        te[u] = c;
      o = a - 1;
    }
  let s = [];
  if (n == 1)
    for (let o = 0; o < t; ) {
      let a = o, l = te[o++] != 1;
      for (; o < t && l == (te[o] != 1); )
        o++;
      if (l)
        for (let h = o; h > a; ) {
          let c = h, u = te[--h] != 2;
          for (; h > a && u == (te[h - 1] != 2); )
            h--;
          s.push(new ki(h, c, u ? 2 : 1));
        }
      else
        s.push(new ki(a, o, 0));
    }
  else
    for (let o = 0; o < t; ) {
      let a = o, l = te[o++] == 2;
      for (; o < t && l == (te[o] == 2); )
        o++;
      s.push(new ki(a, o, l ? 1 : 2));
    }
  return s;
}
function of(i) {
  return [new ki(0, i, 0)];
}
let af = "";
function NA(i, e, t, n, r) {
  var s;
  let o = n.head - i.from, a = -1;
  if (o == 0) {
    if (!r || !i.length)
      return null;
    e[0].level != t && (o = e[0].side(!1, t), a = 0);
  } else if (o == i.length) {
    if (r)
      return null;
    let f = e[e.length - 1];
    f.level != t && (o = f.side(!0, t), a = e.length - 1);
  }
  a < 0 && (a = ki.find(e, o, (s = n.bidiLevel) !== null && s !== void 0 ? s : -1, n.assoc));
  let l = e[a];
  o == l.side(r, t) && (l = e[a += r ? 1 : -1], o = l.side(!r, t));
  let h = r == (l.dir == t), c = je(i.text, o, h);
  if (af = i.text.slice(Math.min(o, c), Math.max(o, c)), c != l.side(r, t))
    return y.cursor(c + i.from, h ? -1 : 1, l.level);
  let u = a == (r ? e.length - 1 : 0) ? null : e[a + (r ? 1 : -1)];
  return !u && l.level != t ? y.cursor(r ? i.to : i.from, r ? -1 : 1, t) : u && u.level < l.level ? y.cursor(u.side(!r, t) + i.from, r ? 1 : -1, u.level) : y.cursor(c + i.from, r ? -1 : 1, l.level);
}
const Xt = "￿";
class lf {
  constructor(e, t) {
    this.points = e, this.text = "", this.lineSeparator = t.facet(Y.lineSeparator);
  }
  append(e) {
    this.text += e;
  }
  lineBreak() {
    this.text += Xt;
  }
  readRange(e, t) {
    if (!e)
      return this;
    let n = e.parentNode;
    for (let r = e; ; ) {
      this.findPointBefore(n, r), this.readNode(r);
      let s = r.nextSibling;
      if (s == t)
        break;
      let o = oe.get(r), a = oe.get(s);
      (o && a ? o.breakAfter : (o ? o.breakAfter : th(r)) || th(s) && (r.nodeName != "BR" || r.cmIgnore)) && this.lineBreak(), r = s;
    }
    return this.findPointBefore(n, t), this;
  }
  readTextNode(e) {
    let t = e.nodeValue;
    for (let n of this.points)
      n.node == e && (n.pos = this.text.length + Math.min(n.offset, t.length));
    for (let n = 0, r = this.lineSeparator ? null : /\r\n?|\n/g; ; ) {
      let s = -1, o = 1, a;
      if (this.lineSeparator ? (s = t.indexOf(this.lineSeparator, n), o = this.lineSeparator.length) : (a = r.exec(t)) && (s = a.index, o = a[0].length), this.append(t.slice(n, s < 0 ? t.length : s)), s < 0)
        break;
      if (this.lineBreak(), o > 1)
        for (let l of this.points)
          l.node == e && l.pos > this.text.length && (l.pos -= o - 1);
      n = s + o;
    }
  }
  readNode(e) {
    if (e.cmIgnore)
      return;
    let t = oe.get(e), n = t && t.overrideDOMText;
    if (n != null) {
      this.findPointInside(e, n.length);
      for (let r = n.iter(); !r.next().done; )
        r.lineBreak ? this.lineBreak() : this.append(r.value);
    } else
      e.nodeType == 3 ? this.readTextNode(e) : e.nodeName == "BR" ? e.nextSibling && this.lineBreak() : e.nodeType == 1 && this.readRange(e.firstChild, null);
  }
  findPointBefore(e, t) {
    for (let n of this.points)
      n.node == e && e.childNodes[n.offset] == t && (n.pos = this.text.length);
  }
  findPointInside(e, t) {
    for (let n of this.points)
      (e.nodeType == 3 ? n.node == e : e.contains(n.node)) && (n.pos = this.text.length + Math.min(t, n.offset));
  }
}
function th(i) {
  return i.nodeType == 1 && /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(i.nodeName);
}
class ih {
  constructor(e, t) {
    this.node = e, this.offset = t, this.pos = -1;
  }
}
class nh extends oe {
  constructor(e) {
    super(), this.view = e, this.compositionDeco = T.none, this.decorations = [], this.pluginDecorationLength = 0, this.minWidth = 0, this.minWidthFrom = 0, this.minWidthTo = 0, this.impreciseAnchor = null, this.impreciseHead = null, this.forceSelection = !1, this.lastUpdate = Date.now(), this.setDOM(e.contentDOM), this.children = [new xe()], this.children[0].setParent(this), this.updateDeco(), this.updateInner([new Et(0, 0, 0, e.state.doc.length)], 0);
  }
  get root() {
    return this.view.root;
  }
  get editorView() {
    return this.view;
  }
  get length() {
    return this.view.state.doc.length;
  }
  // Update the document view to a given state. scrollIntoView can be
  // used as a hint to compute a new viewport that includes that
  // position, if we know the editor is going to scroll that position
  // into view.
  update(e) {
    let t = e.changedRanges;
    this.minWidth > 0 && t.length && (t.every(({ fromA: o, toA: a }) => a < this.minWidthFrom || o > this.minWidthTo) ? (this.minWidthFrom = e.changes.mapPos(this.minWidthFrom, 1), this.minWidthTo = e.changes.mapPos(this.minWidthTo, 1)) : this.minWidth = this.minWidthFrom = this.minWidthTo = 0), this.view.inputState.composing < 0 ? this.compositionDeco = T.none : (e.transactions.length || this.dirty) && (this.compositionDeco = UA(this.view, e.changes)), (R.ie || R.chrome) && !this.compositionDeco.size && e && e.state.doc.lines != e.startState.doc.lines && (this.forceSelection = !0);
    let n = this.decorations, r = this.updateDeco(), s = GA(n, r, e.changes);
    return t = Et.extendWithRanges(t, s), this.dirty == 0 && t.length == 0 ? !1 : (this.updateInner(t, e.startState.doc.length), e.transactions.length && (this.lastUpdate = Date.now()), !0);
  }
  // Used by update and the constructor do perform the actual DOM
  // update
  updateInner(e, t) {
    this.view.viewState.mustMeasureContent = !0, this.updateChildren(e, t);
    let { observer: n } = this.view;
    n.ignore(() => {
      this.dom.style.height = this.view.viewState.contentHeight + "px", this.dom.style.minWidth = this.minWidth ? this.minWidth + "px" : "";
      let s = R.chrome || R.ios ? { node: n.selectionRange.focusNode, written: !1 } : void 0;
      this.sync(s), this.dirty = 0, s && (s.written || n.selectionRange.focusNode != s.node) && (this.forceSelection = !0), this.dom.style.height = "";
    });
    let r = [];
    if (this.view.viewport.from || this.view.viewport.to < this.view.state.doc.length)
      for (let s of this.children)
        s instanceof si && s.widget instanceof rh && r.push(s.dom);
    n.updateGaps(r);
  }
  updateChildren(e, t) {
    let n = this.childCursor(t);
    for (let r = e.length - 1; ; r--) {
      let s = r >= 0 ? e[r] : null;
      if (!s)
        break;
      let { fromA: o, toA: a, fromB: l, toB: h } = s, { content: c, breakAtStart: u, openStart: f, openEnd: d } = ra.build(this.view.state.doc, l, h, this.decorations, this.pluginDecorationLength), { i: g, off: p } = n.findPos(a, 1), { i: O, off: m } = n.findPos(o, -1);
      ju(this, O, m, g, p, c, u, f, d);
    }
  }
  // Sync the DOM selection to this.state.selection
  updateSelection(e = !1, t = !1) {
    if (e && this.view.observer.readSelectionRange(), !(t || this.mayControlSelection()) || R.ios && this.view.inputState.rapidCompositionStart)
      return;
    let n = this.forceSelection;
    this.forceSelection = !1;
    let r = this.view.state.selection.main, s = this.domAtPos(r.anchor), o = r.empty ? s : this.domAtPos(r.head);
    if (R.gecko && r.empty && zA(s)) {
      let l = document.createTextNode("");
      this.view.observer.ignore(() => s.node.insertBefore(l, s.node.childNodes[s.offset] || null)), s = o = new ye(l, 0), n = !0;
    }
    let a = this.view.observer.selectionRange;
    (n || !a.focusNode || !br(s.node, s.offset, a.anchorNode, a.anchorOffset) || !br(o.node, o.offset, a.focusNode, a.focusOffset)) && (this.view.observer.ignore(() => {
      R.android && R.chrome && this.dom.contains(a.focusNode) && FA(a.focusNode, this.dom) && (this.dom.blur(), this.dom.focus({ preventScroll: !0 }));
      let l = Qr(this.root);
      if (r.empty) {
        if (R.gecko) {
          let h = YA(s.node, s.offset);
          if (h && h != 3) {
            let c = cf(s.node, s.offset, h == 1 ? 1 : -1);
            c && (s = new ye(c, h == 1 ? 0 : c.nodeValue.length));
          }
        }
        l.collapse(s.node, s.offset), r.bidiLevel != null && a.cursorBidiLevel != null && (a.cursorBidiLevel = r.bidiLevel);
      } else if (l.extend)
        l.collapse(s.node, s.offset), l.extend(o.node, o.offset);
      else {
        let h = document.createRange();
        r.anchor > r.head && ([s, o] = [o, s]), h.setEnd(o.node, o.offset), h.setStart(s.node, s.offset), l.removeAllRanges(), l.addRange(h);
      }
    }), this.view.observer.setSelectionRange(s, o)), this.impreciseAnchor = s.precise ? null : new ye(a.anchorNode, a.anchorOffset), this.impreciseHead = o.precise ? null : new ye(a.focusNode, a.focusOffset);
  }
  enforceCursorAssoc() {
    if (this.compositionDeco.size)
      return;
    let e = this.view.state.selection.main, t = Qr(this.root);
    if (!e.empty || !e.assoc || !t.modify)
      return;
    let n = xe.find(this, e.head);
    if (!n)
      return;
    let r = n.posAtStart;
    if (e.head == r || e.head == r + n.length)
      return;
    let s = this.coordsAt(e.head, -1), o = this.coordsAt(e.head, 1);
    if (!s || !o || s.bottom > o.top)
      return;
    let a = this.domAtPos(e.head + e.assoc);
    t.collapse(a.node, a.offset), t.modify("move", e.assoc < 0 ? "forward" : "backward", "lineboundary");
  }
  mayControlSelection() {
    return this.view.state.facet(xn) ? this.root.activeElement == this.dom : fo(this.dom, this.view.observer.selectionRange);
  }
  nearest(e) {
    for (let t = e; t; ) {
      let n = oe.get(t);
      if (n && n.rootView == this)
        return n;
      t = t.parentNode;
    }
    return null;
  }
  posFromDOM(e, t) {
    let n = this.nearest(e);
    if (!n)
      throw new RangeError("Trying to find position for a DOM position outside of the document");
    return n.localPosFromDOM(e, t) + n.posAtStart;
  }
  domAtPos(e) {
    let { i: t, off: n } = this.childCursor().findPos(e, -1);
    for (; t < this.children.length - 1; ) {
      let r = this.children[t];
      if (n < r.length || r instanceof xe)
        break;
      t++, n = 0;
    }
    return this.children[t].domAtPos(n);
  }
  coordsAt(e, t) {
    for (let n = this.length, r = this.children.length - 1; ; r--) {
      let s = this.children[r], o = n - s.breakAfter - s.length;
      if (e > o || e == o && s.type != J.WidgetBefore && s.type != J.WidgetAfter && (!r || t == 2 || this.children[r - 1].breakAfter || this.children[r - 1].type == J.WidgetBefore && t > -2))
        return s.coordsAt(e - o, t);
      n = o;
    }
  }
  measureVisibleLineHeights() {
    let e = [], { from: t, to: n } = this.view.viewState.viewport, r = this.view.contentDOM.clientWidth, s = r > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1, o = -1;
    for (let a = 0, l = 0; l < this.children.length; l++) {
      let h = this.children[l], c = a + h.length;
      if (c > n)
        break;
      if (a >= t) {
        let u = h.dom.getBoundingClientRect();
        if (e.push(u.height), s) {
          let f = h.dom.lastChild, d = f ? On(f) : [];
          if (d.length) {
            let g = d[d.length - 1], p = this.view.textDirection == q.LTR ? g.right - u.left : u.right - g.left;
            p > o && (o = p, this.minWidth = r, this.minWidthFrom = a, this.minWidthTo = c);
          }
        }
      }
      a = c + h.breakAfter;
    }
    return e;
  }
  measureTextSize() {
    for (let r of this.children)
      if (r instanceof xe) {
        let s = r.measureTextSize();
        if (s)
          return s;
      }
    let e = document.createElement("div"), t, n;
    return e.className = "cm-line", e.textContent = "abc def ghi jkl mno pqr stu", this.view.observer.ignore(() => {
      this.dom.appendChild(e);
      let r = On(e.firstChild)[0];
      t = e.getBoundingClientRect().height, n = r ? r.width / 27 : 7, e.remove();
    }), { lineHeight: t, charWidth: n };
  }
  childCursor(e = this.length) {
    let t = this.children.length;
    return t && (e -= this.children[--t].length), new Xu(this.children, e, t);
  }
  computeBlockGapDeco() {
    let e = [], t = this.view.viewState;
    for (let n = 0, r = 0; ; r++) {
      let s = r == t.viewports.length ? null : t.viewports[r], o = s ? s.from - 1 : this.length;
      if (o > n) {
        let a = t.lineBlockAt(o).bottom - t.lineBlockAt(n).top;
        e.push(T.replace({
          widget: new rh(a),
          block: !0,
          inclusive: !0,
          isBlockGap: !0
        }).range(n, o));
      }
      if (!s)
        break;
      n = s.to + 1;
    }
    return T.set(e);
  }
  updateDeco() {
    let e = this.view.pluginField(ve.decorations);
    return this.pluginDecorationLength = e.length, this.decorations = [
      ...e,
      ...this.view.state.facet(ti),
      this.compositionDeco,
      this.computeBlockGapDeco(),
      this.view.viewState.lineGapDeco
    ];
  }
  scrollIntoView(e) {
    let { range: t } = e, n = this.coordsAt(t.head, t.empty ? t.assoc : t.head > t.anchor ? -1 : 1), r;
    if (!n)
      return;
    !t.empty && (r = this.coordsAt(t.anchor, t.anchor > t.head ? -1 : 1)) && (n = {
      left: Math.min(n.left, r.left),
      top: Math.min(n.top, r.top),
      right: Math.max(n.right, r.right),
      bottom: Math.max(n.bottom, r.bottom)
    });
    let s = 0, o = 0, a = 0, l = 0;
    for (let c of this.view.pluginField(ve.scrollMargins))
      if (c) {
        let { left: u, right: f, top: d, bottom: g } = c;
        u != null && (s = Math.max(s, u)), f != null && (o = Math.max(o, f)), d != null && (a = Math.max(a, d)), g != null && (l = Math.max(l, g));
      }
    let h = {
      left: n.left - s,
      top: n.top - a,
      right: n.right + o,
      bottom: n.bottom + l
    };
    kA(this.view.scrollDOM, h, t.head < t.anchor ? -1 : 1, e.x, e.y, e.xMargin, e.yMargin, this.view.textDirection == q.LTR);
  }
}
function zA(i) {
  return i.node.nodeType == 1 && i.node.firstChild && (i.offset == 0 || i.node.childNodes[i.offset - 1].contentEditable == "false") && (i.offset == i.node.childNodes.length || i.node.childNodes[i.offset].contentEditable == "false");
}
class rh extends Ot {
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
function hf(i) {
  let e = i.observer.selectionRange, t = e.focusNode && cf(e.focusNode, e.focusOffset, 0);
  if (!t)
    return null;
  let n = i.docView.nearest(t);
  if (!n)
    return null;
  if (n instanceof xe) {
    let r = t;
    for (; r.parentNode != n.dom; )
      r = r.parentNode;
    let s = r.previousSibling;
    for (; s && !oe.get(s); )
      s = s.previousSibling;
    let o = s ? oe.get(s).posAtEnd : n.posAtStart;
    return { from: o, to: o, node: r, text: t };
  } else {
    for (; ; ) {
      let { parent: s } = n;
      if (!s)
        return null;
      if (s instanceof xe)
        break;
      n = s;
    }
    let r = n.posAtStart;
    return { from: r, to: r + n.length, node: n.dom, text: t };
  }
}
function UA(i, e) {
  let t = hf(i);
  if (!t)
    return T.none;
  let { from: n, to: r, node: s, text: o } = t, a = e.mapPos(n, 1), l = Math.max(a, e.mapPos(r, -1)), { state: h } = i, c = s.nodeType == 3 ? s.nodeValue : new lf([], h).readRange(s.firstChild, null).text;
  if (l - a < c.length)
    if (h.doc.sliceString(a, Math.min(h.doc.length, a + c.length), Xt) == c)
      l = a + c.length;
    else if (h.doc.sliceString(Math.max(0, l - c.length), l, Xt) == c)
      a = l - c.length;
    else
      return T.none;
  else if (h.doc.sliceString(a, l, Xt) != c)
    return T.none;
  let u = oe.get(s);
  return u instanceof Uu ? u = u.widget.topView : u && (u.parent = null), T.set(T.replace({ widget: new VA(s, o, u) }).range(a, l));
}
class VA extends Ot {
  constructor(e, t, n) {
    super(), this.top = e, this.text = t, this.topView = n;
  }
  eq(e) {
    return this.top == e.top && this.text == e.text;
  }
  toDOM() {
    return this.top;
  }
  ignoreEvent() {
    return !1;
  }
  get customView() {
    return Uu;
  }
}
function cf(i, e, t) {
  for (; ; ) {
    if (i.nodeType == 3)
      return i;
    if (i.nodeType == 1 && e > 0 && t <= 0)
      i = i.childNodes[e - 1], e = yr(i);
    else if (i.nodeType == 1 && e < i.childNodes.length && t >= 0)
      i = i.childNodes[e], e = 0;
    else
      return null;
  }
}
function YA(i, e) {
  return i.nodeType != 1 ? 0 : (e && i.childNodes[e - 1].contentEditable == "false" ? 1 : 0) | (e < i.childNodes.length && i.childNodes[e].contentEditable == "false" ? 2 : 0);
}
class qA {
  constructor() {
    this.changes = [];
  }
  compareRange(e, t) {
    wo(e, t, this.changes);
  }
  comparePoint(e, t) {
    wo(e, t, this.changes);
  }
}
function GA(i, e, t) {
  let n = new qA();
  return F.compare(i, e, t, n), n.changes;
}
function FA(i, e) {
  for (let t = i; t && t != e; t = t.assignedSlot || t.parentNode)
    if (t.nodeType == 1 && t.contentEditable == "false")
      return !0;
  return !1;
}
function HA(i, e, t = 1) {
  let n = i.charCategorizer(e), r = i.doc.lineAt(e), s = e - r.from;
  if (r.length == 0)
    return y.cursor(e);
  s == 0 ? t = 1 : s == r.length && (t = -1);
  let o = s, a = s;
  t < 0 ? o = je(r.text, s, !1) : a = je(r.text, s);
  let l = n(r.text.slice(o, a));
  for (; o > 0; ) {
    let h = je(r.text, o, !1);
    if (n(r.text.slice(h, o)) != l)
      break;
    o = h;
  }
  for (; a < r.length; ) {
    let h = je(r.text, a);
    if (n(r.text.slice(a, h)) != l)
      break;
    a = h;
  }
  return y.range(o + r.from, a + r.from);
}
function JA(i, e) {
  return e.left > i ? e.left - i : Math.max(0, i - e.right);
}
function KA(i, e) {
  return e.top > i ? e.top - i : Math.max(0, i - e.bottom);
}
function ys(i, e) {
  return i.top < e.bottom - 1 && i.bottom > e.top + 1;
}
function sh(i, e) {
  return e < i.top ? { top: e, left: i.left, right: i.right, bottom: i.bottom } : i;
}
function oh(i, e) {
  return e > i.bottom ? { top: i.top, left: i.left, right: i.right, bottom: e } : i;
}
function Eo(i, e, t) {
  let n, r, s, o, a, l, h, c;
  for (let d = i.firstChild; d; d = d.nextSibling) {
    let g = On(d);
    for (let p = 0; p < g.length; p++) {
      let O = g[p];
      r && ys(r, O) && (O = sh(oh(O, r.bottom), r.top));
      let m = JA(e, O), w = KA(t, O);
      if (m == 0 && w == 0)
        return d.nodeType == 3 ? ah(d, e, t) : Eo(d, e, t);
      (!n || o > w || o == w && s > m) && (n = d, r = O, s = m, o = w), m == 0 ? t > O.bottom && (!h || h.bottom < O.bottom) ? (a = d, h = O) : t < O.top && (!c || c.top > O.top) && (l = d, c = O) : h && ys(h, O) ? h = oh(h, O.bottom) : c && ys(c, O) && (c = sh(c, O.top));
    }
  }
  if (h && h.bottom >= t ? (n = a, r = h) : c && c.top <= t && (n = l, r = c), !n)
    return { node: i, offset: 0 };
  let u = Math.max(r.left, Math.min(r.right, e));
  if (n.nodeType == 3)
    return ah(n, u, t);
  if (!s && n.contentEditable == "true")
    return Eo(n, u, t);
  let f = Array.prototype.indexOf.call(i.childNodes, n) + (e >= (r.left + r.right) / 2 ? 1 : 0);
  return { node: i, offset: f };
}
function ah(i, e, t) {
  let n = i.nodeValue.length, r = -1, s = 1e9, o = 0;
  for (let a = 0; a < n; a++) {
    let l = mn(i, a, a + 1).getClientRects();
    for (let h = 0; h < l.length; h++) {
      let c = l[h];
      if (c.top == c.bottom)
        continue;
      o || (o = e - c.left);
      let u = (c.top > t ? c.top - t : t - c.bottom) - 1;
      if (c.left - 1 <= e && c.right + 1 >= e && u < s) {
        let f = e >= (c.left + c.right) / 2, d = f;
        if ((R.chrome || R.gecko) && mn(i, a).getBoundingClientRect().left == c.right && (d = !f), u <= 0)
          return { node: i, offset: a + (d ? 1 : 0) };
        r = a + (d ? 1 : 0), s = u;
      }
    }
  }
  return { node: i, offset: r > -1 ? r : o > 0 ? i.nodeValue.length : 0 };
}
function uf(i, { x: e, y: t }, n, r = -1) {
  var s;
  let o = i.contentDOM.getBoundingClientRect(), a = o.top + i.viewState.paddingTop, l, { docHeight: h } = i.viewState, c = t - a;
  if (c < 0)
    return 0;
  if (c > h)
    return i.state.doc.length;
  for (let m = i.defaultLineHeight / 2, w = !1; l = i.elementAtHeight(c), l.type != J.Text; )
    for (; c = r > 0 ? l.bottom + m : l.top - m, !(c >= 0 && c <= h); ) {
      if (w)
        return n ? null : 0;
      w = !0, r = -r;
    }
  t = a + c;
  let u = l.from;
  if (u < i.viewport.from)
    return i.viewport.from == 0 ? 0 : n ? null : lh(i, o, l, e, t);
  if (u > i.viewport.to)
    return i.viewport.to == i.state.doc.length ? i.state.doc.length : n ? null : lh(i, o, l, e, t);
  let f = i.dom.ownerDocument, d = i.root.elementFromPoint ? i.root : f, g = d.elementFromPoint(e, t);
  g && !i.contentDOM.contains(g) && (g = null), g || (e = Math.max(o.left + 1, Math.min(o.right - 1, e)), g = d.elementFromPoint(e, t), g && !i.contentDOM.contains(g) && (g = null));
  let p, O = -1;
  if (g && ((s = i.docView.nearest(g)) === null || s === void 0 ? void 0 : s.isEditable) != !1) {
    if (f.caretPositionFromPoint) {
      let m = f.caretPositionFromPoint(e, t);
      m && ({ offsetNode: p, offset: O } = m);
    } else if (f.caretRangeFromPoint) {
      let m = f.caretRangeFromPoint(e, t);
      m && ({ startContainer: p, startOffset: O } = m, R.safari && $A(p, O, e) && (p = void 0));
    }
  }
  if (!p || !i.docView.dom.contains(p)) {
    let m = xe.find(i.docView, u);
    if (!m)
      return c > l.top + l.height / 2 ? l.to : l.from;
    ({ node: p, offset: O } = Eo(m.dom, e, t));
  }
  return i.docView.posFromDOM(p, O);
}
function lh(i, e, t, n, r) {
  let s = Math.round((n - e.left) * i.defaultCharacterWidth);
  if (i.lineWrapping && t.height > i.defaultLineHeight * 1.5) {
    let a = Math.floor((r - t.top) / i.defaultLineHeight);
    s += a * i.viewState.heightOracle.lineLength;
  }
  let o = i.state.sliceDoc(t.from, t.to);
  return t.from + eo(o, s, i.state.tabSize);
}
function $A(i, e, t) {
  let n;
  if (i.nodeType != 3 || e != (n = i.nodeValue.length))
    return !1;
  for (let r = i.nextSibling; r; r = r.nextSibling)
    if (r.nodeType != 1 || r.nodeName != "BR")
      return !1;
  return mn(i, n - 1, n).getBoundingClientRect().left > t;
}
function _A(i, e, t, n) {
  let r = i.state.doc.lineAt(e.head), s = !n || !i.lineWrapping ? null : i.coordsAtPos(e.assoc < 0 && e.head > r.from ? e.head - 1 : e.head);
  if (s) {
    let l = i.dom.getBoundingClientRect(), h = i.posAtCoords({
      x: t == (i.textDirection == q.LTR) ? l.right - 1 : l.left + 1,
      y: (s.top + s.bottom) / 2
    });
    if (h != null)
      return y.cursor(h, t ? -1 : 1);
  }
  let o = xe.find(i.docView, e.head), a = o ? t ? o.posAtEnd : o.posAtStart : t ? r.to : r.from;
  return y.cursor(a, t ? -1 : 1);
}
function hh(i, e, t, n) {
  let r = i.state.doc.lineAt(e.head), s = i.bidiSpans(r);
  for (let o = e, a = null; ; ) {
    let l = NA(r, s, i.textDirection, o, t), h = af;
    if (!l) {
      if (r.number == (t ? i.state.doc.lines : 1))
        return o;
      h = `
`, r = i.state.doc.line(r.number + (t ? 1 : -1)), s = i.bidiSpans(r), l = y.cursor(t ? r.from : r.to);
    }
    if (a) {
      if (!a(h))
        return o;
    } else {
      if (!n)
        return l;
      a = n(h);
    }
    o = l;
  }
}
function ep(i, e, t) {
  let n = i.state.charCategorizer(e), r = n(t);
  return (s) => {
    let o = n(s);
    return r == Ee.Space && (r = o), r == o;
  };
}
function tp(i, e, t, n) {
  let r = e.head, s = t ? 1 : -1;
  if (r == (t ? i.state.doc.length : 0))
    return y.cursor(r, e.assoc);
  let o = e.goalColumn, a, l = i.contentDOM.getBoundingClientRect(), h = i.coordsAtPos(r), c = i.documentTop;
  if (h)
    o == null && (o = h.left - l.left), a = s < 0 ? h.top : h.bottom;
  else {
    let d = i.viewState.lineBlockAt(r - c);
    o == null && (o = Math.min(l.right - l.left, i.defaultCharacterWidth * (r - d.from))), a = (s < 0 ? d.top : d.bottom) + c;
  }
  let u = l.left + o, f = n ?? i.defaultLineHeight >> 1;
  for (let d = 0; ; d += 10) {
    let g = a + (f + d) * s, p = uf(i, { x: u, y: g }, !1, s);
    if (g < l.top || g > l.bottom || (s < 0 ? p < r : p > r))
      return y.cursor(p, e.assoc, void 0, o);
  }
}
function ws(i, e, t) {
  let n = i.pluginField(ve.atomicRanges);
  for (; ; ) {
    let r = !1;
    for (let s of n)
      s.between(t.from - 1, t.from + 1, (o, a, l) => {
        t.from > o && t.from < a && (t = e.from > t.from ? y.cursor(o, 1) : y.cursor(a, -1), r = !0);
      });
    if (!r)
      return t;
  }
}
class ip {
  constructor(e) {
    this.lastKeyCode = 0, this.lastKeyTime = 0, this.pendingIOSKey = void 0, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastEscPress = 0, this.lastContextMenu = 0, this.scrollHandlers = [], this.registeredEvents = [], this.customHandlers = [], this.composing = -1, this.compositionFirstChange = null, this.compositionEndedAt = 0, this.rapidCompositionStart = !1, this.mouseSelection = null;
    for (let t in pe) {
      let n = pe[t];
      e.contentDOM.addEventListener(t, (r) => {
        !ch(e, r) || this.ignoreDuringComposition(r) || t == "keydown" && this.keydown(e, r) || (this.mustFlushObserver(r) && e.observer.forceFlush(), this.runCustomHandlers(t, e, r) ? r.preventDefault() : n(e, r));
      }), this.registeredEvents.push(t);
    }
    this.notifiedFocused = e.hasFocus, this.ensureHandlers(e), R.safari && e.contentDOM.addEventListener("input", () => null);
  }
  setSelectionOrigin(e) {
    this.lastSelectionOrigin = e, this.lastSelectionTime = Date.now();
  }
  ensureHandlers(e) {
    let t = this.customHandlers = e.pluginField(tf);
    for (let n of t)
      for (let r in n.handlers)
        this.registeredEvents.indexOf(r) < 0 && r != "scroll" && (this.registeredEvents.push(r), e.contentDOM.addEventListener(r, (s) => {
          ch(e, s) && this.runCustomHandlers(r, e, s) && s.preventDefault();
        }));
  }
  runCustomHandlers(e, t, n) {
    for (let r of this.customHandlers) {
      let s = r.handlers[e];
      if (s)
        try {
          if (s.call(r.plugin, n, t) || n.defaultPrevented)
            return !0;
        } catch (o) {
          Ne(t.state, o);
        }
    }
    return !1;
  }
  runScrollHandlers(e, t) {
    for (let n of this.customHandlers) {
      let r = n.handlers.scroll;
      if (r)
        try {
          r.call(n.plugin, t, e);
        } catch (s) {
          Ne(e.state, s);
        }
    }
  }
  keydown(e, t) {
    if (this.lastKeyCode = t.keyCode, this.lastKeyTime = Date.now(), t.keyCode == 9 && Date.now() < this.lastEscPress + 2e3)
      return !0;
    if (R.android && R.chrome && !t.synthetic && (t.keyCode == 13 || t.keyCode == 8))
      return e.observer.delayAndroidKey(t.key, t.keyCode), !0;
    let n;
    return R.ios && (n = ff.find((r) => r.keyCode == t.keyCode)) && !(t.ctrlKey || t.altKey || t.metaKey) && !t.synthetic ? (this.pendingIOSKey = n, setTimeout(() => this.flushIOSKey(e), 250), !0) : !1;
  }
  flushIOSKey(e) {
    let t = this.pendingIOSKey;
    return t ? (this.pendingIOSKey = void 0, ln(e.contentDOM, t.key, t.keyCode)) : !1;
  }
  ignoreDuringComposition(e) {
    return /^key/.test(e.type) ? this.composing > 0 ? !0 : R.safari && Date.now() - this.compositionEndedAt < 500 ? (this.compositionEndedAt = 0, !0) : !1 : !1;
  }
  mustFlushObserver(e) {
    return e.type == "keydown" && e.keyCode != 229 || e.type == "compositionend" && !R.ios;
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
const ff = [
  { key: "Backspace", keyCode: 8, inputType: "deleteContentBackward" },
  { key: "Enter", keyCode: 13, inputType: "insertParagraph" },
  { key: "Delete", keyCode: 46, inputType: "deleteContentForward" }
], df = [16, 17, 18, 20, 91, 92, 224, 225];
class np {
  constructor(e, t, n, r) {
    this.view = e, this.style = n, this.mustSelect = r, this.lastEvent = t;
    let s = e.contentDOM.ownerDocument;
    s.addEventListener("mousemove", this.move = this.move.bind(this)), s.addEventListener("mouseup", this.up = this.up.bind(this)), this.extend = t.shiftKey, this.multiple = e.state.facet(Y.allowMultipleSelections) && rp(e, t), this.dragMove = sp(e, t), this.dragging = op(e, t) && sa(t) == 1 ? null : !1, this.dragging === !1 && (t.preventDefault(), this.select(t));
  }
  move(e) {
    if (e.buttons == 0)
      return this.destroy();
    this.dragging === !1 && this.select(this.lastEvent = e);
  }
  up(e) {
    this.dragging == null && this.select(this.lastEvent), this.dragging || e.preventDefault(), this.destroy();
  }
  destroy() {
    let e = this.view.contentDOM.ownerDocument;
    e.removeEventListener("mousemove", this.move), e.removeEventListener("mouseup", this.up), this.view.inputState.mouseSelection = null;
  }
  select(e) {
    let t = this.style.get(e, this.extend, this.multiple);
    (this.mustSelect || !t.eq(this.view.state.selection) || t.main.assoc != this.view.state.selection.main.assoc) && this.view.dispatch({
      selection: t,
      userEvent: "select.pointer",
      scrollIntoView: !0
    }), this.mustSelect = !1;
  }
  update(e) {
    e.docChanged && this.dragging && (this.dragging = this.dragging.map(e.changes)), this.style.update(e) && setTimeout(() => this.select(this.lastEvent), 20);
  }
}
function rp(i, e) {
  let t = i.state.facet(Hu);
  return t.length ? t[0](e) : R.mac ? e.metaKey : e.ctrlKey;
}
function sp(i, e) {
  let t = i.state.facet(Ju);
  return t.length ? t[0](e) : R.mac ? !e.altKey : !e.ctrlKey;
}
function op(i, e) {
  let { main: t } = i.state.selection;
  if (t.empty)
    return !1;
  let n = Qr(i.root);
  if (n.rangeCount == 0)
    return !0;
  let r = n.getRangeAt(0).getClientRects();
  for (let s = 0; s < r.length; s++) {
    let o = r[s];
    if (o.left <= e.clientX && o.right >= e.clientX && o.top <= e.clientY && o.bottom >= e.clientY)
      return !0;
  }
  return !1;
}
function ch(i, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let t = e.target, n; t != i.contentDOM; t = t.parentNode)
    if (!t || t.nodeType == 11 || (n = oe.get(t)) && n.ignoreEvent(e))
      return !1;
  return !0;
}
const pe = /* @__PURE__ */ Object.create(null), gf = R.ie && R.ie_version < 15 || R.ios && R.webkit_version < 604;
function ap(i) {
  let e = i.dom.parentNode;
  if (!e)
    return;
  let t = e.appendChild(document.createElement("textarea"));
  t.style.cssText = "position: fixed; left: -10000px; top: 10px", t.focus(), setTimeout(() => {
    i.focus(), t.remove(), Af(i, t.value);
  }, 50);
}
function Af(i, e) {
  let { state: t } = i, n, r = 1, s = t.toText(e), o = s.lines == t.selection.ranges.length;
  if (xo != null && t.selection.ranges.every((l) => l.empty) && xo == s.toString()) {
    let l = -1;
    n = t.changeByRange((h) => {
      let c = t.doc.lineAt(h.from);
      if (c.from == l)
        return { range: h };
      l = c.from;
      let u = t.toText((o ? s.line(r++).text : e) + t.lineBreak);
      return {
        changes: { from: c.from, insert: u },
        range: y.cursor(h.from + u.length)
      };
    });
  } else
    o ? n = t.changeByRange((l) => {
      let h = s.line(r++);
      return {
        changes: { from: l.from, to: l.to, insert: h.text },
        range: y.cursor(l.from + h.length)
      };
    }) : n = t.replaceSelection(s);
  i.dispatch(n, {
    userEvent: "input.paste",
    scrollIntoView: !0
  });
}
pe.keydown = (i, e) => {
  i.inputState.setSelectionOrigin("select"), e.keyCode == 27 ? i.inputState.lastEscPress = Date.now() : df.indexOf(e.keyCode) < 0 && (i.inputState.lastEscPress = 0);
};
let pf = 0;
pe.touchstart = (i, e) => {
  pf = Date.now(), i.inputState.setSelectionOrigin("select.pointer");
};
pe.touchmove = (i) => {
  i.inputState.setSelectionOrigin("select.pointer");
};
pe.mousedown = (i, e) => {
  if (i.observer.flush(), pf > Date.now() - 2e3 && sa(e) == 1)
    return;
  let t = null;
  for (let n of i.state.facet(Ku))
    if (t = n(i, e), t)
      break;
  if (!t && e.button == 0 && (t = cp(i, e)), t) {
    let n = i.root.activeElement != i.contentDOM;
    n && i.observer.ignore(() => Wu(i.contentDOM)), i.inputState.startMouseSelection(new np(i, e, t, n));
  }
};
function uh(i, e, t, n) {
  if (n == 1)
    return y.cursor(e, t);
  if (n == 2)
    return HA(i.state, e, t);
  {
    let r = xe.find(i.docView, e), s = i.state.doc.lineAt(r ? r.posAtEnd : e), o = r ? r.posAtStart : s.from, a = r ? r.posAtEnd : s.to;
    return a < i.state.doc.length && a == s.to && a++, y.range(o, a);
  }
}
let Of = (i, e) => i >= e.top && i <= e.bottom, fh = (i, e, t) => Of(e, t) && i >= t.left && i <= t.right;
function lp(i, e, t, n) {
  let r = xe.find(i.docView, e);
  if (!r)
    return 1;
  let s = e - r.posAtStart;
  if (s == 0)
    return 1;
  if (s == r.length)
    return -1;
  let o = r.coordsAt(s, -1);
  if (o && fh(t, n, o))
    return -1;
  let a = r.coordsAt(s, 1);
  return a && fh(t, n, a) ? 1 : o && Of(n, o) ? -1 : 1;
}
function dh(i, e) {
  let t = i.posAtCoords({ x: e.clientX, y: e.clientY }, !1);
  return { pos: t, bias: lp(i, t, e.clientX, e.clientY) };
}
const hp = R.ie && R.ie_version <= 11;
let gh = null, Ah = 0, ph = 0;
function sa(i) {
  if (!hp)
    return i.detail;
  let e = gh, t = ph;
  return gh = i, ph = Date.now(), Ah = !e || t > Date.now() - 400 && Math.abs(e.clientX - i.clientX) < 2 && Math.abs(e.clientY - i.clientY) < 2 ? (Ah + 1) % 3 : 1;
}
function cp(i, e) {
  let t = dh(i, e), n = sa(e), r = i.state.selection, s = t, o = e;
  return {
    update(a) {
      a.docChanged && (t && (t.pos = a.changes.mapPos(t.pos)), r = r.map(a.changes), o = null);
    },
    get(a, l, h) {
      let c;
      if (o && a.clientX == o.clientX && a.clientY == o.clientY ? c = s : (c = s = dh(i, a), o = a), !c || !t)
        return r;
      let u = uh(i, c.pos, c.bias, n);
      if (t.pos != c.pos && !l) {
        let f = uh(i, t.pos, t.bias, n), d = Math.min(f.from, u.from), g = Math.max(f.to, u.to);
        u = d < u.from ? y.range(d, g) : y.range(g, d);
      }
      return l ? r.replaceRange(r.main.extend(u.from, u.to)) : h ? r.addRange(u) : y.create([u]);
    }
  };
}
pe.dragstart = (i, e) => {
  let { selection: { main: t } } = i.state, { mouseSelection: n } = i.inputState;
  n && (n.dragging = t), e.dataTransfer && (e.dataTransfer.setData("Text", i.state.sliceDoc(t.from, t.to)), e.dataTransfer.effectAllowed = "copyMove");
};
function Oh(i, e, t, n) {
  if (!t)
    return;
  let r = i.posAtCoords({ x: e.clientX, y: e.clientY }, !1);
  e.preventDefault();
  let { mouseSelection: s } = i.inputState, o = n && s && s.dragging && s.dragMove ? { from: s.dragging.from, to: s.dragging.to } : null, a = { from: r, insert: t }, l = i.state.changes(o ? [o, a] : a);
  i.focus(), i.dispatch({
    changes: l,
    selection: { anchor: l.mapPos(r, -1), head: l.mapPos(r, 1) },
    userEvent: o ? "move.drop" : "input.drop"
  });
}
pe.drop = (i, e) => {
  if (!e.dataTransfer)
    return;
  if (i.state.readOnly)
    return e.preventDefault();
  let t = e.dataTransfer.files;
  if (t && t.length) {
    e.preventDefault();
    let n = Array(t.length), r = 0, s = () => {
      ++r == t.length && Oh(i, e, n.filter((o) => o != null).join(i.state.lineBreak), !1);
    };
    for (let o = 0; o < t.length; o++) {
      let a = new FileReader();
      a.onerror = s, a.onload = () => {
        /[\x00-\x08\x0e-\x1f]{2}/.test(a.result) || (n[o] = a.result), s();
      }, a.readAsText(t[o]);
    }
  } else
    Oh(i, e, e.dataTransfer.getData("Text"), !0);
};
pe.paste = (i, e) => {
  if (i.state.readOnly)
    return e.preventDefault();
  i.observer.flush();
  let t = gf ? null : e.clipboardData;
  t ? (Af(i, t.getData("text/plain")), e.preventDefault()) : ap(i);
};
function up(i, e) {
  let t = i.dom.parentNode;
  if (!t)
    return;
  let n = t.appendChild(document.createElement("textarea"));
  n.style.cssText = "position: fixed; left: -10000px; top: 10px", n.value = e, n.focus(), n.selectionEnd = e.length, n.selectionStart = 0, setTimeout(() => {
    n.remove(), i.focus();
  }, 50);
}
function fp(i) {
  let e = [], t = [], n = !1;
  for (let r of i.selection.ranges)
    r.empty || (e.push(i.sliceDoc(r.from, r.to)), t.push(r));
  if (!e.length) {
    let r = -1;
    for (let { from: s } of i.selection.ranges) {
      let o = i.doc.lineAt(s);
      o.number > r && (e.push(o.text), t.push({ from: o.from, to: Math.min(i.doc.length, o.to + 1) })), r = o.number;
    }
    n = !0;
  }
  return { text: e.join(i.lineBreak), ranges: t, linewise: n };
}
let xo = null;
pe.copy = pe.cut = (i, e) => {
  let { text: t, ranges: n, linewise: r } = fp(i.state);
  if (!t && !r)
    return;
  xo = r ? t : null;
  let s = gf ? null : e.clipboardData;
  s ? (e.preventDefault(), s.clearData(), s.setData("text/plain", t)) : up(i, t), e.type == "cut" && !i.state.readOnly && i.dispatch({
    changes: n,
    scrollIntoView: !0,
    userEvent: "delete.cut"
  });
};
pe.focus = pe.blur = (i) => {
  setTimeout(() => {
    i.hasFocus != i.inputState.notifiedFocused && i.update([]);
  }, 10);
};
function mf(i, e) {
  if (i.docView.compositionDeco.size) {
    i.inputState.rapidCompositionStart = e;
    try {
      i.update([]);
    } finally {
      i.inputState.rapidCompositionStart = !1;
    }
  }
}
pe.compositionstart = pe.compositionupdate = (i) => {
  i.inputState.compositionFirstChange == null && (i.inputState.compositionFirstChange = !0), i.inputState.composing < 0 && (i.inputState.composing = 0, i.docView.compositionDeco.size && (i.observer.flush(), mf(i, !0)));
};
pe.compositionend = (i) => {
  i.inputState.composing = -1, i.inputState.compositionEndedAt = Date.now(), i.inputState.compositionFirstChange = null, setTimeout(() => {
    i.inputState.composing < 0 && mf(i, !1);
  }, 50);
};
pe.contextmenu = (i) => {
  i.inputState.lastContextMenu = Date.now();
};
pe.beforeinput = (i, e) => {
  var t;
  let n;
  if (R.chrome && R.android && (n = ff.find((r) => r.inputType == e.inputType)) && (i.observer.delayAndroidKey(n.key, n.keyCode), n.key == "Backspace" || n.key == "Delete")) {
    let r = ((t = window.visualViewport) === null || t === void 0 ? void 0 : t.height) || 0;
    setTimeout(() => {
      var s;
      (((s = window.visualViewport) === null || s === void 0 ? void 0 : s.height) || 0) > r + 10 && i.hasFocus && (i.contentDOM.blur(), i.focus());
    }, 100);
  }
};
const mh = ["pre-wrap", "normal", "pre-line", "break-spaces"];
class dp {
  constructor() {
    this.doc = G.empty, this.lineWrapping = !1, this.direction = q.LTR, this.heightSamples = {}, this.lineHeight = 14, this.charWidth = 7, this.lineLength = 30, this.heightChanged = !1;
  }
  heightForGap(e, t) {
    let n = this.doc.lineAt(t).number - this.doc.lineAt(e).number + 1;
    return this.lineWrapping && (n += Math.ceil((t - e - n * this.lineLength * 0.5) / this.lineLength)), this.lineHeight * n;
  }
  heightForLine(e) {
    return this.lineWrapping ? (1 + Math.max(0, Math.ceil((e - this.lineLength) / (this.lineLength - 5)))) * this.lineHeight : this.lineHeight;
  }
  setDoc(e) {
    return this.doc = e, this;
  }
  mustRefreshForStyle(e, t) {
    return mh.indexOf(e) > -1 != this.lineWrapping || this.direction != t;
  }
  mustRefreshForHeights(e) {
    let t = !1;
    for (let n = 0; n < e.length; n++) {
      let r = e[n];
      r < 0 ? n++ : this.heightSamples[Math.floor(r * 10)] || (t = !0, this.heightSamples[Math.floor(r * 10)] = !0);
    }
    return t;
  }
  refresh(e, t, n, r, s, o) {
    let a = mh.indexOf(e) > -1, l = Math.round(n) != Math.round(this.lineHeight) || this.lineWrapping != a || this.direction != t;
    if (this.lineWrapping = a, this.direction = t, this.lineHeight = n, this.charWidth = r, this.lineLength = s, l) {
      this.heightSamples = {};
      for (let h = 0; h < o.length; h++) {
        let c = o[h];
        c < 0 ? h++ : this.heightSamples[Math.floor(c * 10)] = !0;
      }
    }
    return l;
  }
}
class gp {
  constructor(e, t) {
    this.from = e, this.heights = t, this.index = 0;
  }
  get more() {
    return this.index < this.heights.length;
  }
}
class St {
  /**
  @internal
  */
  constructor(e, t, n, r, s) {
    this.from = e, this.length = t, this.top = n, this.height = r, this.type = s;
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
  @internal
  */
  join(e) {
    let t = (Array.isArray(this.type) ? this.type : [this]).concat(Array.isArray(e.type) ? e.type : [e]);
    return new St(this.from, this.length + e.length, this.top, this.height + e.height, t);
  }
  /**
  FIXME remove on next breaking release @internal
  */
  moveY(e) {
    return e ? new St(this.from, this.length, this.top + e, this.height, Array.isArray(this.type) ? this.type.map((t) => t.moveY(e)) : this.type) : this;
  }
}
var K = /* @__PURE__ */ function(i) {
  return i[i.ByPos = 0] = "ByPos", i[i.ByHeight = 1] = "ByHeight", i[i.ByPosNoHeight = 2] = "ByPosNoHeight", i;
}(K || (K = {}));
const sr = 1e-3;
class Pe {
  constructor(e, t, n = 2) {
    this.length = e, this.height = t, this.flags = n;
  }
  get outdated() {
    return (this.flags & 2) > 0;
  }
  set outdated(e) {
    this.flags = (e ? 2 : 0) | this.flags & -3;
  }
  setHeight(e, t) {
    this.height != t && (Math.abs(this.height - t) > sr && (e.heightChanged = !0), this.height = t);
  }
  // Base case is to replace a leaf node, which simply builds a tree
  // from the new nodes and returns that (HeightMapBranch and
  // HeightMapGap override this to actually use from/to)
  replace(e, t, n) {
    return Pe.of(n);
  }
  // Again, these are base cases, and are overridden for branch and gap nodes.
  decomposeLeft(e, t) {
    t.push(this);
  }
  decomposeRight(e, t) {
    t.push(this);
  }
  applyChanges(e, t, n, r) {
    let s = this;
    for (let o = r.length - 1; o >= 0; o--) {
      let { fromA: a, toA: l, fromB: h, toB: c } = r[o], u = s.lineAt(a, K.ByPosNoHeight, t, 0, 0), f = u.to >= l ? u : s.lineAt(l, K.ByPosNoHeight, t, 0, 0);
      for (c += f.to - l, l = f.to; o > 0 && u.from <= r[o - 1].toA; )
        a = r[o - 1].fromA, h = r[o - 1].fromB, o--, a < u.from && (u = s.lineAt(a, K.ByPosNoHeight, t, 0, 0));
      h += u.from - a, a = u.from;
      let d = oa.build(n, e, h, c);
      s = s.replace(a, l, d);
    }
    return s.updateHeight(n, 0);
  }
  static empty() {
    return new Me(0, 0);
  }
  // nodes uses null values to indicate the position of line breaks.
  // There are never line breaks at the start or end of the array, or
  // two line breaks next to each other, and the array isn't allowed
  // to be empty (same restrictions as return value from the builder).
  static of(e) {
    if (e.length == 1)
      return e[0];
    let t = 0, n = e.length, r = 0, s = 0;
    for (; ; )
      if (t == n)
        if (r > s * 2) {
          let a = e[t - 1];
          a.break ? e.splice(--t, 1, a.left, null, a.right) : e.splice(--t, 1, a.left, a.right), n += 1 + a.break, r -= a.size;
        } else if (s > r * 2) {
          let a = e[n];
          a.break ? e.splice(n, 1, a.left, null, a.right) : e.splice(n, 1, a.left, a.right), n += 2 + a.break, s -= a.size;
        } else
          break;
      else if (r < s) {
        let a = e[t++];
        a && (r += a.size);
      } else {
        let a = e[--n];
        a && (s += a.size);
      }
    let o = 0;
    return e[t - 1] == null ? (o = 1, t--) : e[t] == null && (o = 1, n++), new Ap(Pe.of(e.slice(0, t)), o, Pe.of(e.slice(n)));
  }
}
Pe.prototype.size = 1;
class Qf extends Pe {
  constructor(e, t, n) {
    super(e, t), this.type = n;
  }
  blockAt(e, t, n, r) {
    return new St(r, this.length, n, this.height, this.type);
  }
  lineAt(e, t, n, r, s) {
    return this.blockAt(0, n, r, s);
  }
  forEachLine(e, t, n, r, s, o) {
    o(this.blockAt(0, n, r, s));
  }
  updateHeight(e, t = 0, n = !1, r) {
    return r && r.from <= t && r.more && this.setHeight(e, r.heights[r.index++]), this.outdated = !1, this;
  }
  toString() {
    return `block(${this.length})`;
  }
}
class Me extends Qf {
  constructor(e, t) {
    super(e, t, J.Text), this.collapsed = 0, this.widgetHeight = 0;
  }
  replace(e, t, n) {
    let r = n[0];
    return n.length == 1 && (r instanceof Me || r instanceof me && r.flags & 4) && Math.abs(this.length - r.length) < 10 ? (r instanceof me ? r = new Me(r.length, this.height) : r.height = this.height, this.outdated || (r.outdated = !1), r) : Pe.of(n);
  }
  updateHeight(e, t = 0, n = !1, r) {
    return r && r.from <= t && r.more ? this.setHeight(e, r.heights[r.index++]) : (n || this.outdated) && this.setHeight(e, Math.max(this.widgetHeight, e.heightForLine(this.length - this.collapsed))), this.outdated = !1, this;
  }
  toString() {
    return `line(${this.length}${this.collapsed ? -this.collapsed : ""}${this.widgetHeight ? ":" + this.widgetHeight : ""})`;
  }
}
class me extends Pe {
  constructor(e) {
    super(e, 0);
  }
  lines(e, t) {
    let n = e.lineAt(t).number, r = e.lineAt(t + this.length).number;
    return { firstLine: n, lastLine: r, lineHeight: this.height / (r - n + 1) };
  }
  blockAt(e, t, n, r) {
    let { firstLine: s, lastLine: o, lineHeight: a } = this.lines(t, r), l = Math.max(0, Math.min(o - s, Math.floor((e - n) / a))), { from: h, length: c } = t.line(s + l);
    return new St(h, c, n + a * l, a, J.Text);
  }
  lineAt(e, t, n, r, s) {
    if (t == K.ByHeight)
      return this.blockAt(e, n, r, s);
    if (t == K.ByPosNoHeight) {
      let { from: u, to: f } = n.lineAt(e);
      return new St(u, f - u, 0, 0, J.Text);
    }
    let { firstLine: o, lineHeight: a } = this.lines(n, s), { from: l, length: h, number: c } = n.lineAt(e);
    return new St(l, h, r + a * (c - o), a, J.Text);
  }
  forEachLine(e, t, n, r, s, o) {
    let { firstLine: a, lineHeight: l } = this.lines(n, s);
    for (let h = Math.max(e, s), c = Math.min(s + this.length, t); h <= c; ) {
      let u = n.lineAt(h);
      h == e && (r += l * (u.number - a)), o(new St(u.from, u.length, r, l, J.Text)), r += l, h = u.to + 1;
    }
  }
  replace(e, t, n) {
    let r = this.length - t;
    if (r > 0) {
      let s = n[n.length - 1];
      s instanceof me ? n[n.length - 1] = new me(s.length + r) : n.push(null, new me(r - 1));
    }
    if (e > 0) {
      let s = n[0];
      s instanceof me ? n[0] = new me(e + s.length) : n.unshift(new me(e - 1), null);
    }
    return Pe.of(n);
  }
  decomposeLeft(e, t) {
    t.push(new me(e - 1), null);
  }
  decomposeRight(e, t) {
    t.push(null, new me(this.length - e - 1));
  }
  updateHeight(e, t = 0, n = !1, r) {
    let s = t + this.length;
    if (r && r.from <= t + this.length && r.more) {
      let o = [], a = Math.max(t, r.from), l = -1, h = e.heightChanged;
      for (r.from > t && o.push(new me(r.from - t - 1).updateHeight(e, t)); a <= s && r.more; ) {
        let u = e.doc.lineAt(a).length;
        o.length && o.push(null);
        let f = r.heights[r.index++];
        l == -1 ? l = f : Math.abs(f - l) >= sr && (l = -2);
        let d = new Me(u, f);
        d.outdated = !1, o.push(d), a += u + 1;
      }
      a <= s && o.push(null, new me(s - a).updateHeight(e, a));
      let c = Pe.of(o);
      return e.heightChanged = h || l < 0 || Math.abs(c.height - this.height) >= sr || Math.abs(l - this.lines(e.doc, t).lineHeight) >= sr, c;
    } else
      (n || this.outdated) && (this.setHeight(e, e.heightForGap(t, t + this.length)), this.outdated = !1);
    return this;
  }
  toString() {
    return `gap(${this.length})`;
  }
}
class Ap extends Pe {
  constructor(e, t, n) {
    super(e.length + t + n.length, e.height + n.height, t | (e.outdated || n.outdated ? 2 : 0)), this.left = e, this.right = n, this.size = e.size + n.size;
  }
  get break() {
    return this.flags & 1;
  }
  blockAt(e, t, n, r) {
    let s = n + this.left.height;
    return e < s ? this.left.blockAt(e, t, n, r) : this.right.blockAt(e, t, s, r + this.left.length + this.break);
  }
  lineAt(e, t, n, r, s) {
    let o = r + this.left.height, a = s + this.left.length + this.break, l = t == K.ByHeight ? e < o : e < a, h = l ? this.left.lineAt(e, t, n, r, s) : this.right.lineAt(e, t, n, o, a);
    if (this.break || (l ? h.to < a : h.from > a))
      return h;
    let c = t == K.ByPosNoHeight ? K.ByPosNoHeight : K.ByPos;
    return l ? h.join(this.right.lineAt(a, c, n, o, a)) : this.left.lineAt(a, c, n, r, s).join(h);
  }
  forEachLine(e, t, n, r, s, o) {
    let a = r + this.left.height, l = s + this.left.length + this.break;
    if (this.break)
      e < l && this.left.forEachLine(e, t, n, r, s, o), t >= l && this.right.forEachLine(e, t, n, a, l, o);
    else {
      let h = this.lineAt(l, K.ByPos, n, r, s);
      e < h.from && this.left.forEachLine(e, h.from - 1, n, r, s, o), h.to >= e && h.from <= t && o(h), t > h.to && this.right.forEachLine(h.to + 1, t, n, a, l, o);
    }
  }
  replace(e, t, n) {
    let r = this.left.length + this.break;
    if (t < r)
      return this.balanced(this.left.replace(e, t, n), this.right);
    if (e > this.left.length)
      return this.balanced(this.left, this.right.replace(e - r, t - r, n));
    let s = [];
    e > 0 && this.decomposeLeft(e, s);
    let o = s.length;
    for (let a of n)
      s.push(a);
    if (e > 0 && Qh(s, o - 1), t < this.length) {
      let a = s.length;
      this.decomposeRight(t, s), Qh(s, a);
    }
    return Pe.of(s);
  }
  decomposeLeft(e, t) {
    let n = this.left.length;
    if (e <= n)
      return this.left.decomposeLeft(e, t);
    t.push(this.left), this.break && (n++, e >= n && t.push(null)), e > n && this.right.decomposeLeft(e - n, t);
  }
  decomposeRight(e, t) {
    let n = this.left.length, r = n + this.break;
    if (e >= r)
      return this.right.decomposeRight(e - r, t);
    e < n && this.left.decomposeRight(e, t), this.break && e < r && t.push(null), t.push(this.right);
  }
  balanced(e, t) {
    return e.size > 2 * t.size || t.size > 2 * e.size ? Pe.of(this.break ? [e, null, t] : [e, t]) : (this.left = e, this.right = t, this.height = e.height + t.height, this.outdated = e.outdated || t.outdated, this.size = e.size + t.size, this.length = e.length + this.break + t.length, this);
  }
  updateHeight(e, t = 0, n = !1, r) {
    let { left: s, right: o } = this, a = t + s.length + this.break, l = null;
    return r && r.from <= t + s.length && r.more ? l = s = s.updateHeight(e, t, n, r) : s.updateHeight(e, t, n), r && r.from <= a + o.length && r.more ? l = o = o.updateHeight(e, a, n, r) : o.updateHeight(e, a, n), l ? this.balanced(s, o) : (this.height = this.left.height + this.right.height, this.outdated = !1, this);
  }
  toString() {
    return this.left + (this.break ? " " : "-") + this.right;
  }
}
function Qh(i, e) {
  let t, n;
  i[e] == null && (t = i[e - 1]) instanceof me && (n = i[e + 1]) instanceof me && i.splice(e - 1, 3, new me(t.length + 1 + n.length));
}
const pp = 5;
class oa {
  constructor(e, t) {
    this.pos = e, this.oracle = t, this.nodes = [], this.lineStart = -1, this.lineEnd = -1, this.covering = null, this.writtenTo = e;
  }
  get isCovered() {
    return this.covering && this.nodes[this.nodes.length - 1] == this.covering;
  }
  span(e, t) {
    if (this.lineStart > -1) {
      let n = Math.min(t, this.lineEnd), r = this.nodes[this.nodes.length - 1];
      r instanceof Me ? r.length += n - this.pos : (n > this.pos || !this.isCovered) && this.nodes.push(new Me(n - this.pos, -1)), this.writtenTo = n, t > n && (this.nodes.push(null), this.writtenTo++, this.lineStart = -1);
    }
    this.pos = t;
  }
  point(e, t, n) {
    if (e < t || n.heightRelevant) {
      let r = n.widget ? n.widget.estimatedHeight : 0;
      r < 0 && (r = this.oracle.lineHeight);
      let s = t - e;
      n.block ? this.addBlock(new Qf(s, r, n.type)) : (s || r >= pp) && this.addLineDeco(r, s);
    } else
      t > e && this.span(e, t);
    this.lineEnd > -1 && this.lineEnd < this.pos && (this.lineEnd = this.oracle.doc.lineAt(this.pos).to);
  }
  enterLine() {
    if (this.lineStart > -1)
      return;
    let { from: e, to: t } = this.oracle.doc.lineAt(this.pos);
    this.lineStart = e, this.lineEnd = t, this.writtenTo < e && ((this.writtenTo < e - 1 || this.nodes[this.nodes.length - 1] == null) && this.nodes.push(this.blankContent(this.writtenTo, e - 1)), this.nodes.push(null)), this.pos > e && this.nodes.push(new Me(this.pos - e, -1)), this.writtenTo = this.pos;
  }
  blankContent(e, t) {
    let n = new me(t - e);
    return this.oracle.doc.lineAt(e).to == t && (n.flags |= 4), n;
  }
  ensureLine() {
    this.enterLine();
    let e = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
    if (e instanceof Me)
      return e;
    let t = new Me(0, -1);
    return this.nodes.push(t), t;
  }
  addBlock(e) {
    this.enterLine(), e.type == J.WidgetAfter && !this.isCovered && this.ensureLine(), this.nodes.push(e), this.writtenTo = this.pos = this.pos + e.length, e.type != J.WidgetBefore && (this.covering = e);
  }
  addLineDeco(e, t) {
    let n = this.ensureLine();
    n.length += t, n.collapsed += t, n.widgetHeight = Math.max(n.widgetHeight, e), this.writtenTo = this.pos = this.pos + t;
  }
  finish(e) {
    let t = this.nodes.length == 0 ? null : this.nodes[this.nodes.length - 1];
    this.lineStart > -1 && !(t instanceof Me) && !this.isCovered ? this.nodes.push(new Me(0, -1)) : (this.writtenTo < this.pos || t == null) && this.nodes.push(this.blankContent(this.writtenTo, this.pos));
    let n = e;
    for (let r of this.nodes)
      r instanceof Me && r.updateHeight(this.oracle, n), n += r ? r.length : 1;
    return this.nodes;
  }
  // Always called with a region that on both sides either stretches
  // to a line break or the end of the document.
  // The returned array uses null to indicate line breaks, but never
  // starts or ends in a line break, or has multiple line breaks next
  // to each other.
  static build(e, t, n, r) {
    let s = new oa(n, e);
    return F.spans(t, n, r, s, 0), s.finish(n);
  }
}
function Op(i, e, t) {
  let n = new mp();
  return F.compare(i, e, t, n, 0), n.changes;
}
class mp {
  constructor() {
    this.changes = [];
  }
  compareRange() {
  }
  comparePoint(e, t, n, r) {
    (e < t || n && n.heightRelevant || r && r.heightRelevant) && wo(e, t, this.changes, 5);
  }
}
function Qp(i, e) {
  let t = i.getBoundingClientRect(), n = Math.max(0, t.left), r = Math.min(innerWidth, t.right), s = Math.max(0, t.top), o = Math.min(innerHeight, t.bottom), a = i.ownerDocument.body;
  for (let l = i.parentNode; l && l != a; )
    if (l.nodeType == 1) {
      let h = l, c = window.getComputedStyle(h);
      if ((h.scrollHeight > h.clientHeight || h.scrollWidth > h.clientWidth) && c.overflow != "visible") {
        let u = h.getBoundingClientRect();
        n = Math.max(n, u.left), r = Math.min(r, u.right), s = Math.max(s, u.top), o = Math.min(o, u.bottom);
      }
      l = c.position == "absolute" || c.position == "fixed" ? h.offsetParent : h.parentNode;
    } else if (l.nodeType == 11)
      l = l.host;
    else
      break;
  return {
    left: n - t.left,
    right: Math.max(n, r) - t.left,
    top: s - (t.top + e),
    bottom: Math.max(s, o) - (t.top + e)
  };
}
function bp(i, e) {
  let t = i.getBoundingClientRect();
  return {
    left: 0,
    right: t.right - t.left,
    top: e,
    bottom: t.bottom - (t.top + e)
  };
}
class vs {
  constructor(e, t, n) {
    this.from = e, this.to = t, this.size = n;
  }
  static same(e, t) {
    if (e.length != t.length)
      return !1;
    for (let n = 0; n < e.length; n++) {
      let r = e[n], s = t[n];
      if (r.from != s.from || r.to != s.to || r.size != s.size)
        return !1;
    }
    return !0;
  }
  draw(e) {
    return T.replace({ widget: new yp(this.size, e) }).range(this.from, this.to);
  }
}
class yp extends Ot {
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
class bh {
  constructor(e) {
    this.state = e, this.pixelViewport = { left: 0, right: window.innerWidth, top: 0, bottom: 0 }, this.inView = !0, this.paddingTop = 0, this.paddingBottom = 0, this.contentDOMWidth = 0, this.contentDOMHeight = 0, this.editorHeight = 0, this.editorWidth = 0, this.heightOracle = new dp(), this.scaler = vh, this.scrollTarget = null, this.printing = !1, this.mustMeasureContent = !0, this.visibleRanges = [], this.mustEnforceCursorAssoc = !1, this.heightMap = Pe.empty().applyChanges(e.facet(ti), G.empty, this.heightOracle.setDoc(e.doc), [new Et(0, 0, 0, e.doc.length)]), this.viewport = this.getViewport(0, null), this.updateViewportLines(), this.updateForViewport(), this.lineGaps = this.ensureLineGaps([]), this.lineGapDeco = T.set(this.lineGaps.map((t) => t.draw(!1))), this.computeVisibleRanges();
  }
  updateForViewport() {
    let e = [this.viewport], { main: t } = this.state.selection;
    for (let n = 0; n <= 1; n++) {
      let r = n ? t.head : t.anchor;
      if (!e.some(({ from: s, to: o }) => r >= s && r <= o)) {
        let { from: s, to: o } = this.lineBlockAt(r);
        e.push(new zn(s, o));
      }
    }
    this.viewports = e.sort((n, r) => n.from - r.from), this.scaler = this.heightMap.height <= 7e6 ? vh : new Cp(this.heightOracle.doc, this.heightMap, this.viewports);
  }
  updateViewportLines() {
    this.viewportLines = [], this.heightMap.forEachLine(this.viewport.from, this.viewport.to, this.state.doc, 0, 0, (e) => {
      this.viewportLines.push(this.scaler.scale == 1 ? e : nn(e, this.scaler));
    });
  }
  update(e, t = null) {
    let n = this.state;
    this.state = e.state;
    let r = this.state.facet(ti), s = e.changedRanges, o = Et.extendWithRanges(s, Op(e.startState.facet(ti), r, e ? e.changes : ge.empty(this.state.doc.length))), a = this.heightMap.height;
    this.heightMap = this.heightMap.applyChanges(r, n.doc, this.heightOracle.setDoc(this.state.doc), o), this.heightMap.height != a && (e.flags |= 2);
    let l = o.length ? this.mapViewport(this.viewport, e.changes) : this.viewport;
    (t && (t.range.head < l.from || t.range.head > l.to) || !this.viewportIsAppropriate(l)) && (l = this.getViewport(0, t));
    let h = !e.changes.empty || e.flags & 2 || l.from != this.viewport.from || l.to != this.viewport.to;
    this.viewport = l, this.updateForViewport(), h && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps, e.changes))), e.flags |= this.computeVisibleRanges(), t && (this.scrollTarget = t), !this.mustEnforceCursorAssoc && e.selectionSet && e.view.lineWrapping && e.state.selection.main.empty && e.state.selection.main.assoc && (this.mustEnforceCursorAssoc = !0);
  }
  measure(e) {
    let t = e.contentDOM, n = window.getComputedStyle(t), r = this.heightOracle, s = n.whiteSpace, o = n.direction == "rtl" ? q.RTL : q.LTR, a = this.heightOracle.mustRefreshForStyle(s, o), l = a || this.mustMeasureContent || this.contentDOMHeight != t.clientHeight, h = 0, c = 0;
    if (this.editorWidth != e.scrollDOM.clientWidth && (r.lineWrapping && (l = !0), this.editorWidth = e.scrollDOM.clientWidth, h |= 8), l) {
      this.mustMeasureContent = !1, this.contentDOMHeight = t.clientHeight;
      let m = parseInt(n.paddingTop) || 0, w = parseInt(n.paddingBottom) || 0;
      (this.paddingTop != m || this.paddingBottom != w) && (h |= 8, this.paddingTop = m, this.paddingBottom = w);
    }
    let u = (this.printing ? bp : Qp)(t, this.paddingTop), f = u.top - this.pixelViewport.top, d = u.bottom - this.pixelViewport.bottom;
    this.pixelViewport = u;
    let g = this.pixelViewport.bottom > this.pixelViewport.top && this.pixelViewport.right > this.pixelViewport.left;
    if (g != this.inView && (this.inView = g, g && (l = !0)), !this.inView)
      return 0;
    let p = t.clientWidth;
    if ((this.contentDOMWidth != p || this.editorHeight != e.scrollDOM.clientHeight) && (this.contentDOMWidth = p, this.editorHeight = e.scrollDOM.clientHeight, h |= 8), l) {
      let m = e.docView.measureVisibleLineHeights();
      if (r.mustRefreshForHeights(m) && (a = !0), a || r.lineWrapping && Math.abs(p - this.contentDOMWidth) > r.charWidth) {
        let { lineHeight: w, charWidth: C } = e.docView.measureTextSize();
        a = r.refresh(s, o, w, C, p / C, m), a && (e.docView.minWidth = 0, h |= 8);
      }
      f > 0 && d > 0 ? c = Math.max(f, d) : f < 0 && d < 0 && (c = Math.min(f, d)), r.heightChanged = !1, this.heightMap = this.heightMap.updateHeight(r, 0, a, new gp(this.viewport.from, m)), r.heightChanged && (h |= 2);
    }
    let O = !this.viewportIsAppropriate(this.viewport, c) || this.scrollTarget && (this.scrollTarget.range.head < this.viewport.from || this.scrollTarget.range.head > this.viewport.to);
    return O && (this.viewport = this.getViewport(c, this.scrollTarget)), this.updateForViewport(), (h & 2 || O) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(a ? [] : this.lineGaps)), h |= this.computeVisibleRanges(), this.mustEnforceCursorAssoc && (this.mustEnforceCursorAssoc = !1, e.docView.enforceCursorAssoc()), h;
  }
  get visibleTop() {
    return this.scaler.fromDOM(this.pixelViewport.top);
  }
  get visibleBottom() {
    return this.scaler.fromDOM(this.pixelViewport.bottom);
  }
  getViewport(e, t) {
    let n = 0.5 - Math.max(-0.5, Math.min(0.5, e / 1e3 / 2)), r = this.heightMap, s = this.state.doc, { visibleTop: o, visibleBottom: a } = this, l = new zn(r.lineAt(o - n * 1e3, K.ByHeight, s, 0, 0).from, r.lineAt(a + (1 - n) * 1e3, K.ByHeight, s, 0, 0).to);
    if (t) {
      let { head: h } = t.range;
      if (h < l.from || h > l.to) {
        let c = Math.min(this.editorHeight, this.pixelViewport.bottom - this.pixelViewport.top), u = r.lineAt(h, K.ByPos, s, 0, 0), f;
        t.y == "center" ? f = (u.top + u.bottom) / 2 - c / 2 : t.y == "start" || t.y == "nearest" && h < l.from ? f = u.top : f = u.bottom - c, l = new zn(r.lineAt(f - 1e3 / 2, K.ByHeight, s, 0, 0).from, r.lineAt(f + c + 1e3 / 2, K.ByHeight, s, 0, 0).to);
      }
    }
    return l;
  }
  mapViewport(e, t) {
    let n = t.mapPos(e.from, -1), r = t.mapPos(e.to, 1);
    return new zn(this.heightMap.lineAt(n, K.ByPos, this.state.doc, 0, 0).from, this.heightMap.lineAt(r, K.ByPos, this.state.doc, 0, 0).to);
  }
  // Checks if a given viewport covers the visible part of the
  // document and not too much beyond that.
  viewportIsAppropriate({ from: e, to: t }, n = 0) {
    if (!this.inView)
      return !0;
    let { top: r } = this.heightMap.lineAt(e, K.ByPos, this.state.doc, 0, 0), { bottom: s } = this.heightMap.lineAt(t, K.ByPos, this.state.doc, 0, 0), { visibleTop: o, visibleBottom: a } = this;
    return (e == 0 || r <= o - Math.max(10, Math.min(
      -n,
      250
      /* MaxCoverMargin */
    ))) && (t == this.state.doc.length || s >= a + Math.max(10, Math.min(
      n,
      250
      /* MaxCoverMargin */
    ))) && r > o - 2 * 1e3 && s < a + 2 * 1e3;
  }
  mapLineGaps(e, t) {
    if (!e.length || t.empty)
      return e;
    let n = [];
    for (let r of e)
      t.touchesRange(r.from, r.to) || n.push(new vs(t.mapPos(r.from), t.mapPos(r.to), r.size));
    return n;
  }
  // Computes positions in the viewport where the start or end of a
  // line should be hidden, trying to reuse existing line gaps when
  // appropriate to avoid unneccesary redraws.
  // Uses crude character-counting for the positioning and sizing,
  // since actual DOM coordinates aren't always available and
  // predictable. Relies on generous margins (see LG.Margin) to hide
  // the artifacts this might produce from the user.
  ensureLineGaps(e) {
    let t = [];
    if (this.heightOracle.direction != q.LTR)
      return t;
    for (let n of this.viewportLines) {
      if (n.length < 4e3)
        continue;
      let r = wp(n.from, n.to, this.state);
      if (r.total < 4e3)
        continue;
      let s, o;
      if (this.heightOracle.lineWrapping) {
        let h = 2e3 / this.heightOracle.lineLength * this.heightOracle.lineHeight;
        s = Un(r, (this.visibleTop - n.top - h) / n.height), o = Un(r, (this.visibleBottom - n.top + h) / n.height);
      } else {
        let h = r.total * this.heightOracle.charWidth, c = 2e3 * this.heightOracle.charWidth;
        s = Un(r, (this.pixelViewport.left - c) / h), o = Un(r, (this.pixelViewport.right + c) / h);
      }
      let a = [];
      s > n.from && a.push({ from: n.from, to: s }), o < n.to && a.push({ from: o, to: n.to });
      let l = this.state.selection.main;
      l.from >= n.from && l.from <= n.to && wh(
        a,
        l.from - 10,
        l.from + 10
        /* SelectionMargin */
      ), !l.empty && l.to >= n.from && l.to <= n.to && wh(
        a,
        l.to - 10,
        l.to + 10
        /* SelectionMargin */
      );
      for (let { from: h, to: c } of a)
        c - h > 1e3 && t.push(vp(
          e,
          (u) => u.from >= n.from && u.to <= n.to && Math.abs(u.from - h) < 1e3 && Math.abs(u.to - c) < 1e3
          /* HalfMargin */
        ) || new vs(h, c, this.gapSize(n, h, c, r)));
    }
    return t;
  }
  gapSize(e, t, n, r) {
    let s = yh(r, n) - yh(r, t);
    return this.heightOracle.lineWrapping ? e.height * s : r.total * this.heightOracle.charWidth * s;
  }
  updateLineGaps(e) {
    vs.same(e, this.lineGaps) || (this.lineGaps = e, this.lineGapDeco = T.set(e.map((t) => t.draw(this.heightOracle.lineWrapping))));
  }
  computeVisibleRanges() {
    let e = this.state.facet(ti);
    this.lineGaps.length && (e = e.concat(this.lineGapDeco));
    let t = [];
    F.spans(e, this.viewport.from, this.viewport.to, {
      span(r, s) {
        t.push({ from: r, to: s });
      },
      point() {
      }
    }, 20);
    let n = t.length != this.visibleRanges.length || this.visibleRanges.some((r, s) => r.from != t[s].from || r.to != t[s].to);
    return this.visibleRanges = t, n ? 4 : 0;
  }
  lineBlockAt(e) {
    return e >= this.viewport.from && e <= this.viewport.to && this.viewportLines.find((t) => t.from <= e && t.to >= e) || nn(this.heightMap.lineAt(e, K.ByPos, this.state.doc, 0, 0), this.scaler);
  }
  lineBlockAtHeight(e) {
    return nn(this.heightMap.lineAt(this.scaler.fromDOM(e), K.ByHeight, this.state.doc, 0, 0), this.scaler);
  }
  elementAtHeight(e) {
    return nn(this.heightMap.blockAt(this.scaler.fromDOM(e), this.state.doc, 0, 0), this.scaler);
  }
  get docHeight() {
    return this.scaler.toDOM(this.heightMap.height);
  }
  get contentHeight() {
    return this.docHeight + this.paddingTop + this.paddingBottom;
  }
}
class zn {
  constructor(e, t) {
    this.from = e, this.to = t;
  }
}
function wp(i, e, t) {
  let n = [], r = i, s = 0;
  return F.spans(t.facet(ti), i, e, {
    span() {
    },
    point(o, a) {
      o > r && (n.push({ from: r, to: o }), s += o - r), r = a;
    }
  }, 20), r < e && (n.push({ from: r, to: e }), s += e - r), { total: s, ranges: n };
}
function Un({ total: i, ranges: e }, t) {
  if (t <= 0)
    return e[0].from;
  if (t >= 1)
    return e[e.length - 1].to;
  let n = Math.floor(i * t);
  for (let r = 0; ; r++) {
    let { from: s, to: o } = e[r], a = o - s;
    if (n <= a)
      return s + n;
    n -= a;
  }
}
function yh(i, e) {
  let t = 0;
  for (let { from: n, to: r } of i.ranges) {
    if (e <= r) {
      t += e - n;
      break;
    }
    t += r - n;
  }
  return t / i.total;
}
function wh(i, e, t) {
  for (let n = 0; n < i.length; n++) {
    let r = i[n];
    if (r.from < t && r.to > e) {
      let s = [];
      r.from < e && s.push({ from: r.from, to: e }), r.to > t && s.push({ from: t, to: r.to }), i.splice(n, 1, ...s), n += s.length - 1;
    }
  }
}
function vp(i, e) {
  for (let t of i)
    if (e(t))
      return t;
}
const vh = {
  toDOM(i) {
    return i;
  },
  fromDOM(i) {
    return i;
  },
  scale: 1
};
class Cp {
  constructor(e, t, n) {
    let r = 0, s = 0, o = 0;
    this.viewports = n.map(({ from: a, to: l }) => {
      let h = t.lineAt(a, K.ByPos, e, 0, 0).top, c = t.lineAt(l, K.ByPos, e, 0, 0).bottom;
      return r += c - h, { from: a, to: l, top: h, bottom: c, domTop: 0, domBottom: 0 };
    }), this.scale = (7e6 - r) / (t.height - r);
    for (let a of this.viewports)
      a.domTop = o + (a.top - s) * this.scale, o = a.domBottom = a.domTop + (a.bottom - a.top), s = a.bottom;
  }
  toDOM(e) {
    for (let t = 0, n = 0, r = 0; ; t++) {
      let s = t < this.viewports.length ? this.viewports[t] : null;
      if (!s || e < s.top)
        return r + (e - n) * this.scale;
      if (e <= s.bottom)
        return s.domTop + (e - s.top);
      n = s.bottom, r = s.domBottom;
    }
  }
  fromDOM(e) {
    for (let t = 0, n = 0, r = 0; ; t++) {
      let s = t < this.viewports.length ? this.viewports[t] : null;
      if (!s || e < s.domTop)
        return n + (e - r) / this.scale;
      if (e <= s.domBottom)
        return s.top + (e - s.domTop);
      n = s.bottom, r = s.domBottom;
    }
  }
}
function nn(i, e) {
  if (e.scale == 1)
    return i;
  let t = e.toDOM(i.top), n = e.toDOM(i.bottom);
  return new St(i.from, i.length, t, n - t, Array.isArray(i.type) ? i.type.map((r) => nn(r, e)) : i.type);
}
const Vn = /* @__PURE__ */ P.define({ combine: (i) => i.join(" ") }), Bo = /* @__PURE__ */ P.define({ combine: (i) => i.indexOf(!0) > -1 }), Io = /* @__PURE__ */ Nt.newName(), bf = /* @__PURE__ */ Nt.newName(), yf = /* @__PURE__ */ Nt.newName(), wf = { "&light": "." + bf, "&dark": "." + yf };
function To(i, e, t) {
  return new Nt(e, {
    finish(n) {
      return /&/.test(n) ? n.replace(/&\w*/, (r) => {
        if (r == "&")
          return i;
        if (!t || !t[r])
          throw new RangeError(`Unsupported selector: ${r}`);
        return t[r];
      }) : i + " " + n;
    }
  });
}
const Sp = /* @__PURE__ */ To("." + Io, {
  "&.cm-editor": {
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
    minHeight: "100%",
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
    overflowWrap: "anywhere"
  },
  "&light .cm-content": { caretColor: "black" },
  "&dark .cm-content": { caretColor: "white" },
  ".cm-line": {
    display: "block",
    padding: "0 2px 0 4px"
  },
  ".cm-selectionLayer": {
    zIndex: -1,
    contain: "size style"
  },
  ".cm-selectionBackground": {
    position: "absolute"
  },
  "&light .cm-selectionBackground": {
    background: "#d9d9d9"
  },
  "&dark .cm-selectionBackground": {
    background: "#222"
  },
  "&light.cm-focused .cm-selectionBackground": {
    background: "#d7d4f0"
  },
  "&dark.cm-focused .cm-selectionBackground": {
    background: "#233"
  },
  ".cm-cursorLayer": {
    zIndex: 100,
    contain: "size style",
    pointerEvents: "none"
  },
  "&.cm-focused .cm-cursorLayer": {
    animation: "steps(1) cm-blink 1.2s infinite"
  },
  // Two animations defined so that we can switch between them to
  // restart the animation without forcing another style
  // recomputation.
  "@keyframes cm-blink": { "0%": {}, "50%": { visibility: "hidden" }, "100%": {} },
  "@keyframes cm-blink2": { "0%": {}, "50%": { visibility: "hidden" }, "100%": {} },
  ".cm-cursor, .cm-dropCursor": {
    position: "absolute",
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
  "&.cm-focused .cm-cursor": {
    display: "block"
  },
  "&light .cm-activeLine": { backgroundColor: "#f3f9ff" },
  "&dark .cm-activeLine": { backgroundColor: "#223039" },
  "&light .cm-specialChar": { color: "red" },
  "&dark .cm-specialChar": { color: "#f78" },
  ".cm-tab": {
    display: "inline-block",
    overflow: "hidden",
    verticalAlign: "bottom"
  },
  ".cm-widgetBuffer": {
    verticalAlign: "text-top",
    height: "1em",
    display: "inline"
  },
  ".cm-placeholder": {
    color: "#888",
    display: "inline-block",
    verticalAlign: "top"
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
}, wf), kp = {
  childList: !0,
  characterData: !0,
  subtree: !0,
  attributes: !0,
  characterDataOldValue: !0
}, Cs = R.ie && R.ie_version <= 11;
class Ep {
  constructor(e, t, n) {
    this.view = e, this.onChange = t, this.onScrollChanged = n, this.active = !1, this.selectionRange = new EA(), this.selectionChanged = !1, this.delayedFlush = -1, this.resizeTimeout = -1, this.queue = [], this.delayedAndroidKey = null, this.scrollTargets = [], this.intersection = null, this.resize = null, this.intersecting = !1, this.gapIntersection = null, this.gaps = [], this.parentCheck = -1, this.dom = e.contentDOM, this.observer = new MutationObserver((r) => {
      for (let s of r)
        this.queue.push(s);
      (R.ie && R.ie_version <= 11 || R.ios && e.composing) && r.some((s) => s.type == "childList" && s.removedNodes.length || s.type == "characterData" && s.oldValue.length > s.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), Cs && (this.onCharData = (r) => {
      this.queue.push({
        target: r.target,
        type: "characterData",
        oldValue: r.prevValue
      }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this), window.addEventListener("resize", this.onResize = this.onResize.bind(this)), typeof ResizeObserver == "function" && (this.resize = new ResizeObserver(() => {
      this.view.docView.lastUpdate < Date.now() - 75 && this.onResize();
    }), this.resize.observe(e.scrollDOM)), window.addEventListener("beforeprint", this.onPrint = this.onPrint.bind(this)), this.start(), window.addEventListener("scroll", this.onScroll = this.onScroll.bind(this)), typeof IntersectionObserver == "function" && (this.intersection = new IntersectionObserver((r) => {
      this.parentCheck < 0 && (this.parentCheck = setTimeout(this.listenForScroll.bind(this), 1e3)), r.length > 0 && r[r.length - 1].intersectionRatio > 0 != this.intersecting && (this.intersecting = !this.intersecting, this.intersecting != this.view.inView && this.onScrollChanged(document.createEvent("Event")));
    }, {}), this.intersection.observe(this.dom), this.gapIntersection = new IntersectionObserver((r) => {
      r.length > 0 && r[r.length - 1].intersectionRatio > 0 && this.onScrollChanged(document.createEvent("Event"));
    }, {})), this.listenForScroll(), this.readSelectionRange(), this.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
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
    if (this.gapIntersection && (e.length != this.gaps.length || this.gaps.some((t, n) => t != e[n]))) {
      this.gapIntersection.disconnect();
      for (let t of e)
        this.gapIntersection.observe(t);
      this.gaps = e;
    }
  }
  onSelectionChange(e) {
    if (!this.readSelectionRange() || this.delayedAndroidKey)
      return;
    let { view: t } = this, n = this.selectionRange;
    if (t.state.facet(xn) ? t.root.activeElement != this.dom : !fo(t.dom, n))
      return;
    let r = n.anchorNode && t.docView.nearest(n.anchorNode);
    r && r.ignoreEvent(e) || ((R.ie && R.ie_version <= 11 || R.android && R.chrome) && !t.state.selection.main.empty && // (Selection.isCollapsed isn't reliable on IE)
    n.focusNode && br(n.focusNode, n.focusOffset, n.anchorNode, n.anchorOffset) ? this.flushSoon() : this.flush(!1));
  }
  readSelectionRange() {
    let { root: e } = this.view, t = Qr(e), n = R.safari && e.nodeType == 11 && CA() == this.view.contentDOM && xp(this.view) || t;
    return this.selectionRange.eq(n) ? !1 : (this.selectionRange.setRange(n), this.selectionChanged = !0);
  }
  setSelectionRange(e, t) {
    this.selectionRange.set(e.node, e.offset, t.node, t.offset), this.selectionChanged = !1;
  }
  listenForScroll() {
    this.parentCheck = -1;
    let e = 0, t = null;
    for (let n = this.dom; n; )
      if (n.nodeType == 1)
        !t && e < this.scrollTargets.length && this.scrollTargets[e] == n ? e++ : t || (t = this.scrollTargets.slice(0, e)), t && t.push(n), n = n.assignedSlot || n.parentNode;
      else if (n.nodeType == 11)
        n = n.host;
      else
        break;
    if (e < this.scrollTargets.length && !t && (t = this.scrollTargets.slice(0, e)), t) {
      for (let n of this.scrollTargets)
        n.removeEventListener("scroll", this.onScroll);
      for (let n of this.scrollTargets = t)
        n.addEventListener("scroll", this.onScroll);
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
    this.active || (this.observer.observe(this.dom, kp), Cs && this.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.active = !0);
  }
  stop() {
    this.active && (this.active = !1, this.observer.disconnect(), Cs && this.dom.removeEventListener("DOMCharacterDataModified", this.onCharData));
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
  // detected (via beforeinput or keydown), and then dispatches the
  // key event, throwing away the DOM changes if it gets handled.
  delayAndroidKey(e, t) {
    this.delayedAndroidKey || requestAnimationFrame(() => {
      let n = this.delayedAndroidKey;
      this.delayedAndroidKey = null;
      let r = this.view.state;
      ln(this.view.contentDOM, n.key, n.keyCode) ? this.processRecords() : this.flush(), this.view.state == r && this.view.update([]);
    }), (!this.delayedAndroidKey || e == "Enter") && (this.delayedAndroidKey = { key: e, keyCode: t });
  }
  flushSoon() {
    this.delayedFlush < 0 && (this.delayedFlush = window.setTimeout(() => {
      this.delayedFlush = -1, this.flush();
    }, 20));
  }
  forceFlush() {
    this.delayedFlush >= 0 && (window.clearTimeout(this.delayedFlush), this.delayedFlush = -1, this.flush());
  }
  processRecords() {
    let e = this.queue;
    for (let s of this.observer.takeRecords())
      e.push(s);
    e.length && (this.queue = []);
    let t = -1, n = -1, r = !1;
    for (let s of e) {
      let o = this.readMutation(s);
      o && (o.typeOver && (r = !0), t == -1 ? { from: t, to: n } = o : (t = Math.min(o.from, t), n = Math.max(o.to, n)));
    }
    return { from: t, to: n, typeOver: r };
  }
  // Apply pending changes, if any
  flush(e = !0) {
    if (this.delayedFlush >= 0 || this.delayedAndroidKey)
      return;
    e && this.readSelectionRange();
    let { from: t, to: n, typeOver: r } = this.processRecords(), s = this.selectionChanged && fo(this.dom, this.selectionRange);
    if (t < 0 && !s)
      return;
    this.selectionChanged = !1;
    let o = this.view.state;
    this.onChange(t, n, r), this.view.state == o && this.view.update([]);
  }
  readMutation(e) {
    let t = this.view.docView.nearest(e.target);
    if (!t || t.ignoreMutation(e))
      return null;
    if (t.markDirty(e.type == "attributes"), e.type == "attributes" && (t.dirty |= 4), e.type == "childList") {
      let n = Ch(t, e.previousSibling || e.target.previousSibling, -1), r = Ch(t, e.nextSibling || e.target.nextSibling, 1);
      return {
        from: n ? t.posAfter(n) : t.posAtStart,
        to: r ? t.posBefore(r) : t.posAtEnd,
        typeOver: !1
      };
    } else
      return e.type == "characterData" ? { from: t.posAtStart, to: t.posAtEnd, typeOver: e.target.nodeValue == e.oldValue } : null;
  }
  destroy() {
    var e, t, n;
    this.stop(), (e = this.intersection) === null || e === void 0 || e.disconnect(), (t = this.gapIntersection) === null || t === void 0 || t.disconnect(), (n = this.resize) === null || n === void 0 || n.disconnect();
    for (let r of this.scrollTargets)
      r.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("scroll", this.onScroll), window.removeEventListener("resize", this.onResize), window.removeEventListener("beforeprint", this.onPrint), this.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange), clearTimeout(this.parentCheck), clearTimeout(this.resizeTimeout);
  }
}
function Ch(i, e, t) {
  for (; e; ) {
    let n = oe.get(e);
    if (n && n.parent == i)
      return n;
    let r = e.parentNode;
    e = r != i.dom ? r : t > 0 ? e.nextSibling : e.previousSibling;
  }
  return null;
}
function xp(i) {
  let e = null;
  function t(l) {
    l.preventDefault(), l.stopImmediatePropagation(), e = l.getTargetRanges()[0];
  }
  if (i.contentDOM.addEventListener("beforeinput", t, !0), document.execCommand("indent"), i.contentDOM.removeEventListener("beforeinput", t, !0), !e)
    return null;
  let n = e.startContainer, r = e.startOffset, s = e.endContainer, o = e.endOffset, a = i.docView.domAtPos(i.state.selection.main.anchor);
  return br(a.node, a.offset, s, o) && ([n, r, s, o] = [s, o, n, r]), { anchorNode: n, anchorOffset: r, focusNode: s, focusOffset: o };
}
function Bp(i, e, t, n) {
  let r, s, o = i.state.selection.main;
  if (e > -1) {
    let a = i.docView.domBoundsAround(e, t, 0);
    if (!a || i.state.readOnly)
      return;
    let { from: l, to: h } = a, c = i.docView.impreciseHead || i.docView.impreciseAnchor ? [] : Tp(i), u = new lf(c, i.state);
    u.readRange(a.startDOM, a.endDOM);
    let f = o.from, d = null;
    (i.inputState.lastKeyCode === 8 && i.inputState.lastKeyTime > Date.now() - 100 || R.android && u.text.length < h - l) && (f = o.to, d = "end");
    let g = Ip(i.state.doc.sliceString(l, h, Xt), u.text, f - l, d);
    g && (R.chrome && i.inputState.lastKeyCode == 13 && g.toB == g.from + 2 && u.text.slice(g.from, g.toB) == Xt + Xt && g.toB--, r = {
      from: l + g.from,
      to: l + g.toA,
      insert: G.of(u.text.slice(g.from, g.toB).split(Xt))
    }), s = Pp(c, l);
  } else if (i.hasFocus || !i.state.facet(xn)) {
    let a = i.observer.selectionRange, { impreciseHead: l, impreciseAnchor: h } = i.docView, c = l && l.node == a.focusNode && l.offset == a.focusOffset || !xi(i.contentDOM, a.focusNode) ? i.state.selection.main.head : i.docView.posFromDOM(a.focusNode, a.focusOffset), u = h && h.node == a.anchorNode && h.offset == a.anchorOffset || !xi(i.contentDOM, a.anchorNode) ? i.state.selection.main.anchor : i.docView.posFromDOM(a.anchorNode, a.anchorOffset);
    (c != o.head || u != o.anchor) && (s = y.single(u, c));
  }
  if (!(!r && !s)) {
    if (!r && n && !o.empty && s && s.main.empty ? r = { from: o.from, to: o.to, insert: i.state.doc.slice(o.from, o.to) } : r && r.from >= o.from && r.to <= o.to && (r.from != o.from || r.to != o.to) && o.to - o.from - (r.to - r.from) <= 4 && (r = {
      from: o.from,
      to: o.to,
      insert: i.state.doc.slice(o.from, r.from).append(r.insert).append(i.state.doc.slice(r.to, o.to))
    }), r) {
      let a = i.state;
      if (R.ios && i.inputState.flushIOSKey(i) || R.android && (r.from == o.from && r.to == o.to && r.insert.length == 1 && r.insert.lines == 2 && ln(i.contentDOM, "Enter", 13) || r.from == o.from - 1 && r.to == o.to && r.insert.length == 0 && ln(i.contentDOM, "Backspace", 8) || r.from == o.from && r.to == o.to + 1 && r.insert.length == 0 && ln(i.contentDOM, "Delete", 46)))
        return;
      let l = r.insert.toString();
      if (i.state.facet(_u).some((u) => u(i, r.from, r.to, l)))
        return;
      i.inputState.composing >= 0 && i.inputState.composing++;
      let h;
      if (r.from >= o.from && r.to <= o.to && r.to - r.from >= (o.to - o.from) / 3 && (!s || s.main.empty && s.main.from == r.from + r.insert.length) && i.inputState.composing < 0) {
        let u = o.from < r.from ? a.sliceDoc(o.from, r.from) : "", f = o.to > r.to ? a.sliceDoc(r.to, o.to) : "";
        h = a.replaceSelection(i.state.toText(u + r.insert.sliceString(0, void 0, i.state.lineBreak) + f));
      } else {
        let u = a.changes(r), f = s && !a.selection.main.eq(s.main) && s.main.to <= u.newLength ? s.main : void 0;
        if (a.selection.ranges.length > 1 && i.inputState.composing >= 0 && r.to <= o.to && r.to >= o.to - 10) {
          let d = i.state.sliceDoc(r.from, r.to), g = hf(i) || i.state.doc.lineAt(o.head), p = o.to - r.to, O = o.to - o.from;
          h = a.changeByRange((m) => {
            if (m.from == o.from && m.to == o.to)
              return { changes: u, range: f || m.map(u) };
            let w = m.to - p, C = w - d.length;
            if (m.to - m.from != O || i.state.sliceDoc(C, w) != d || // Unfortunately, there's no way to make multiple
            // changes in the same node work without aborting
            // composition, so cursors in the composition range are
            // ignored.
            g && m.to >= g.from && m.from <= g.to)
              return { range: m };
            let Q = a.changes({ from: C, to: w, insert: r.insert }), b = m.to - o.to;
            return {
              changes: Q,
              range: f ? y.range(Math.max(0, f.anchor + b), Math.max(0, f.head + b)) : m.map(Q)
            };
          });
        } else
          h = {
            changes: u,
            selection: f && a.selection.replaceRange(f)
          };
      }
      let c = "input.type";
      i.composing && (c += ".compose", i.inputState.compositionFirstChange && (c += ".start", i.inputState.compositionFirstChange = !1)), i.dispatch(h, { scrollIntoView: !0, userEvent: c });
    } else if (s && !s.main.eq(o)) {
      let a = !1, l = "select";
      i.inputState.lastSelectionTime > Date.now() - 50 && (i.inputState.lastSelectionOrigin == "select" && (a = !0), l = i.inputState.lastSelectionOrigin), i.dispatch({ selection: s, scrollIntoView: a, userEvent: l });
    }
  }
}
function Ip(i, e, t, n) {
  let r = Math.min(i.length, e.length), s = 0;
  for (; s < r && i.charCodeAt(s) == e.charCodeAt(s); )
    s++;
  if (s == r && i.length == e.length)
    return null;
  let o = i.length, a = e.length;
  for (; o > 0 && a > 0 && i.charCodeAt(o - 1) == e.charCodeAt(a - 1); )
    o--, a--;
  if (n == "end") {
    let l = Math.max(0, s - Math.min(o, a));
    t -= o + l - s;
  }
  if (o < s && i.length < e.length) {
    let l = t <= s && t >= o ? s - t : 0;
    s -= l, a = s + (a - o), o = s;
  } else if (a < s) {
    let l = t <= s && t >= a ? s - t : 0;
    s -= l, o = s + (o - a), a = s;
  }
  return { from: s, toA: o, toB: a };
}
function Tp(i) {
  let e = [];
  if (i.root.activeElement != i.contentDOM)
    return e;
  let { anchorNode: t, anchorOffset: n, focusNode: r, focusOffset: s } = i.observer.selectionRange;
  return t && (e.push(new ih(t, n)), (r != t || s != n) && e.push(new ih(r, s))), e;
}
function Pp(i, e) {
  if (i.length == 0)
    return null;
  let t = i[0].pos, n = i.length == 2 ? i[1].pos : t;
  return t > -1 && n > -1 ? y.single(t + e, n + e) : null;
}
class I {
  /**
  Construct a new view. You'll usually want to put `view.dom` into
  your document after creating a view, so that the user can see
  it.
  */
  constructor(e = {}) {
    this.plugins = [], this.pluginMap = /* @__PURE__ */ new Map(), this.editorAttrs = {}, this.contentAttrs = {}, this.bidiCache = [], this.destroyed = !1, this.updateState = 2, this.measureScheduled = -1, this.measureRequests = [], this.contentDOM = document.createElement("div"), this.scrollDOM = document.createElement("div"), this.scrollDOM.tabIndex = -1, this.scrollDOM.className = "cm-scroller", this.scrollDOM.appendChild(this.contentDOM), this.announceDOM = document.createElement("div"), this.announceDOM.style.cssText = "position: absolute; top: -10000px", this.announceDOM.setAttribute("aria-live", "polite"), this.dom = document.createElement("div"), this.dom.appendChild(this.announceDOM), this.dom.appendChild(this.scrollDOM), this._dispatch = e.dispatch || ((t) => this.update([t])), this.dispatch = this.dispatch.bind(this), this.root = e.root || xA(e.parent) || document, this.viewState = new bh(e.state || Y.create()), this.plugins = this.state.facet(en).map((t) => new bs(t));
    for (let t of this.plugins)
      t.update(this);
    this.observer = new Ep(this, (t, n, r) => {
      Bp(this, t, n, r);
    }, (t) => {
      this.inputState.runScrollHandlers(this, t), this.observer.intersecting && this.measure();
    }), this.inputState = new ip(this), this.docView = new nh(this), this.mountStyles(), this.updateAttrs(), this.updateState = 0, this.requestMeasure(), e.parent && e.parent.appendChild(this.dom);
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
  dispatch(...e) {
    this._dispatch(e.length == 1 && e[0] instanceof Ae ? e[0] : this.state.update(...e));
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
    let t = !1, n, r = this.state;
    for (let o of e) {
      if (o.startState != r)
        throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");
      r = o.state;
    }
    if (this.destroyed) {
      this.viewState.state = r;
      return;
    }
    if (r.facet(Y.phrases) != this.state.facet(Y.phrases))
      return this.setState(r);
    n = new eh(this, r, e);
    let s = this.viewState.scrollTarget;
    try {
      this.updateState = 2;
      for (let o of e) {
        if (s && (s = s.map(o.changes)), o.scrollIntoView) {
          let { main: a } = o.state.selection;
          s = new wi(a.empty ? a : y.cursor(a.head, a.head > a.anchor ? -1 : 1));
        }
        for (let a of o.effects)
          a.is(Co) ? s = new wi(a.value) : a.is(ef) ? s = new wi(a.value, "center") : a.is(_l) && (s = a.value);
      }
      this.viewState.update(n, s), this.bidiCache = wr.update(this.bidiCache, n.changes), n.empty || (this.updatePlugins(n), this.inputState.update(n)), t = this.docView.update(n), this.state.facet(tn) != this.styleModules && this.mountStyles(), this.updateAttrs(), this.showAnnouncements(e), this.docView.updateSelection(t, e.some((o) => o.isUserEvent("select.pointer")));
    } finally {
      this.updateState = 0;
    }
    if (n.startState.facet(Vn) != n.state.facet(Vn) && (this.viewState.mustMeasureContent = !0), (t || s || this.viewState.mustEnforceCursorAssoc || this.viewState.mustMeasureContent) && this.requestMeasure(), !n.empty)
      for (let o of this.state.facet(vo))
        o(n);
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
      for (let n of this.plugins)
        n.destroy(this);
      this.viewState = new bh(e), this.plugins = e.facet(en).map((n) => new bs(n)), this.pluginMap.clear();
      for (let n of this.plugins)
        n.update(this);
      this.docView = new nh(this), this.inputState.ensureHandlers(this), this.mountStyles(), this.updateAttrs(), this.bidiCache = [];
    } finally {
      this.updateState = 0;
    }
    t && this.focus(), this.requestMeasure();
  }
  updatePlugins(e) {
    let t = e.startState.facet(en), n = e.state.facet(en);
    if (t != n) {
      let r = [];
      for (let s of n) {
        let o = t.indexOf(s);
        if (o < 0)
          r.push(new bs(s));
        else {
          let a = this.plugins[o];
          a.mustUpdate = e, r.push(a);
        }
      }
      for (let s of this.plugins)
        s.mustUpdate != e && s.destroy(this);
      this.plugins = r, this.pluginMap.clear(), this.inputState.ensureHandlers(this);
    } else
      for (let r of this.plugins)
        r.mustUpdate = e;
    for (let r = 0; r < this.plugins.length; r++)
      this.plugins[r].update(this);
  }
  /**
  @internal
  */
  measure(e = !0) {
    if (this.destroyed)
      return;
    this.measureScheduled > -1 && cancelAnimationFrame(this.measureScheduled), this.measureScheduled = 0, e && this.observer.flush();
    let t = null;
    try {
      for (let n = 0; ; n++) {
        this.updateState = 1;
        let r = this.viewport, s = this.viewState.measure(this);
        if (!s && !this.measureRequests.length && this.viewState.scrollTarget == null)
          break;
        if (n > 5) {
          console.warn(this.measureRequests.length ? "Measure loop restarted more than 5 times" : "Viewport failed to stabilize");
          break;
        }
        let o = [];
        s & 4 || ([this.measureRequests, o] = [o, this.measureRequests]);
        let a = o.map((u) => {
          try {
            return u.read(this);
          } catch (f) {
            return Ne(this.state, f), Sh;
          }
        }), l = new eh(this, this.state), h = !1, c = !1;
        l.flags |= s, t ? t.flags |= s : t = l, this.updateState = 2, l.empty || (this.updatePlugins(l), this.inputState.update(l), this.updateAttrs(), h = this.docView.update(l));
        for (let u = 0; u < o.length; u++)
          if (a[u] != Sh)
            try {
              let f = o[u];
              f.write && f.write(a[u], this);
            } catch (f) {
              Ne(this.state, f);
            }
        if (this.viewState.scrollTarget && (this.docView.scrollIntoView(this.viewState.scrollTarget), this.viewState.scrollTarget = null, c = !0), h && this.docView.updateSelection(!0), this.viewport.from == r.from && this.viewport.to == r.to && !c && this.measureRequests.length == 0)
          break;
      }
    } finally {
      this.updateState = 0, this.measureScheduled = -1;
    }
    if (t && !t.empty)
      for (let n of this.state.facet(vo))
        n(t);
  }
  /**
  Get the CSS classes for the currently active editor themes.
  */
  get themeClasses() {
    return Io + " " + (this.state.facet(Bo) ? yf : bf) + " " + this.state.facet(Vn);
  }
  updateAttrs() {
    let e = kh(this, nf, {
      class: "cm-editor" + (this.hasFocus ? " cm-focused " : " ") + this.themeClasses
    }), t = {
      spellcheck: "false",
      autocorrect: "off",
      autocapitalize: "off",
      translate: "no",
      contenteditable: this.state.facet(xn) ? "true" : "false",
      class: "cm-content",
      style: `${R.tabSize}: ${this.state.tabSize}`,
      role: "textbox",
      "aria-multiline": "true"
    };
    this.state.readOnly && (t["aria-readonly"] = "true"), kh(this, rf, t), this.observer.ignore(() => {
      yo(this.contentDOM, this.contentAttrs, t), yo(this.dom, this.editorAttrs, e);
    }), this.editorAttrs = e, this.contentAttrs = t;
  }
  showAnnouncements(e) {
    let t = !0;
    for (let n of e)
      for (let r of n.effects)
        if (r.is(I.announce)) {
          t && (this.announceDOM.textContent = ""), t = !1;
          let s = this.announceDOM.appendChild(document.createElement("div"));
          s.textContent = r.value;
        }
  }
  mountStyles() {
    this.styleModules = this.state.facet(tn), Nt.mount(this.root, this.styleModules.concat(Sp).reverse());
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
    if (this.measureScheduled < 0 && (this.measureScheduled = requestAnimationFrame(() => this.measure())), e) {
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
  Collect all values provided by the active plugins for a given
  field.
  */
  pluginField(e) {
    let t = [];
    for (let n of this.plugins)
      n.update(this).takeField(e, t);
    return t;
  }
  /**
  Get the value of a specific plugin, if present. Note that
  plugins that crash can be dropped from a view, so even when you
  know you registered a given plugin, it is recommended to check
  the return value of this method.
  */
  plugin(e) {
    let t = this.pluginMap.get(e);
    return (t === void 0 || t && t.spec != e) && this.pluginMap.set(e, t = this.plugins.find((n) => n.spec == e) || null), t && t.update(this).value;
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
  Find the line or block widget at the given vertical position.
  
  By default, this position is interpreted as a screen position,
  meaning `docTop` is set to the DOM top position of the editor
  content (forcing a layout). You can pass a different `docTop`
  value—for example 0 to interpret `height` as a document-relative
  position, or a precomputed document top
  (`view.contentDOM.getBoundingClientRect().top`) to limit layout
  queries.
  
  *Deprecated: use `elementAtHeight` instead.*
  */
  blockAtHeight(e, t) {
    let n = Ss(t, this);
    return this.elementAtHeight(e - n).moveY(n);
  }
  /**
  Find the text line or block widget at the given vertical
  position (which is interpreted as relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop)
  */
  elementAtHeight(e) {
    return this.readMeasured(), this.viewState.elementAtHeight(e);
  }
  /**
  Find information for the visual line (see
  [`visualLineAt`](https://codemirror.net/6/docs/ref/#view.EditorView.visualLineAt)) at the given
  vertical position. The resulting block info might hold another
  array of block info structs in its `type` field if this line
  consists of more than one block.
  
  Defaults to treating `height` as a screen position. See
  [`blockAtHeight`](https://codemirror.net/6/docs/ref/#view.EditorView.blockAtHeight) for the
  interpretation of the `docTop` parameter.
  
  *Deprecated: use `lineBlockAtHeight` instead.*
  */
  visualLineAtHeight(e, t) {
    let n = Ss(t, this);
    return this.lineBlockAtHeight(e - n).moveY(n);
  }
  /**
  Find the line block (see
  [`lineBlockAt`](https://codemirror.net/6/docs/ref/#view.EditorView.lineBlockAt) at the given
  height.
  */
  lineBlockAtHeight(e) {
    return this.readMeasured(), this.viewState.lineBlockAtHeight(e);
  }
  /**
  Iterate over the height information of the visual lines in the
  viewport. The heights of lines are reported relative to the
  given document top, which defaults to the screen position of the
  document (forcing a layout).
  
  *Deprecated: use `viewportLineBlocks` instead.*
  */
  viewportLines(e, t) {
    let n = Ss(t, this);
    for (let r of this.viewportLineBlocks)
      e(r.moveY(n));
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
  Find the extent and height of the visual line (a range delimited
  on both sides by either non-[hidden](https://codemirror.net/6/docs/ref/#view.Decoration^range)
  line breaks, or the start/end of the document) at the given position.
  
  Vertical positions are computed relative to the `docTop`
  argument, which defaults to 0 for this method. You can pass
  `view.contentDOM.getBoundingClientRect().top` here to get screen
  coordinates.
  
  *Deprecated: use `lineBlockAt` instead.*
  */
  visualLineAt(e, t = 0) {
    return this.lineBlockAt(e).moveY(t + this.viewState.paddingTop);
  }
  /**
  Find the line block around the given document position. A line
  block is a range delimited on both sides by either a
  non-[hidden](https://codemirror.net/6/docs/ref/#view.Decoration^range) line breaks, or the
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
  cluster](https://codemirror.net/6/docs/ref/#text.findClusterBreak). `forward` determines whether
  the motion is away from the line start, or towards it. Motion in
  bidirectional text is in visual order, in the editor's [text
  direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection). When the start
  position was the last one on the line, the returned position
  will be across the line break. If there is no further line, the
  original position is returned.
  
  By default, this method moves over a single cluster. The
  optional `by` argument can be used to move across more. It will
  be called with the first cluster as argument, and should return
  a predicate that determines, for each subsequent cluster,
  whether it should also be moved over.
  */
  moveByChar(e, t, n) {
    return ws(this, e, hh(this, e, t, n));
  }
  /**
  Move a cursor position across the next group of either
  [letters](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) or non-letter
  non-whitespace characters.
  */
  moveByGroup(e, t) {
    return ws(this, e, hh(this, e, t, (n) => ep(this, e.head, n)));
  }
  /**
  Move to the next line boundary in the given direction. If
  `includeWrap` is true, line wrapping is on, and there is a
  further wrap point on the current line, the wrap point will be
  returned. Otherwise this function will return the start or end
  of the line.
  */
  moveToLineBoundary(e, t, n = !0) {
    return _A(this, e, t, n);
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
  moveVertically(e, t, n) {
    return ws(this, e, tp(this, e, t, n));
  }
  // FIXME remove on next major version
  scrollPosIntoView(e) {
    this.dispatch({ effects: Co.of(y.cursor(e)) });
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
    return this.readMeasured(), uf(this, e, t);
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
    let n = this.docView.coordsAt(e, t);
    if (!n || n.left == n.right)
      return n;
    let r = this.state.doc.lineAt(e), s = this.bidiSpans(r), o = s[ki.find(s, e - r.from, -1, t)];
    return Gr(n, o.dir == q.LTR == t > 0);
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
  CSS property) of the editor.
  */
  get textDirection() {
    return this.viewState.heightOracle.direction;
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
    if (e.length > Rp)
      return of(e.length);
    let t = this.textDirection;
    for (let r of this.bidiCache)
      if (r.from == e.from && r.dir == t)
        return r.order;
    let n = ZA(e.text, this.textDirection);
    return this.bidiCache.push(new wr(e.from, e.to, t, n)), n;
  }
  /**
  Check whether the editor has focus.
  */
  get hasFocus() {
    var e;
    return (document.hasFocus() || R.safari && ((e = this.inputState) === null || e === void 0 ? void 0 : e.lastContextMenu) > Date.now() - 3e4) && this.root.activeElement == this.contentDOM;
  }
  /**
  Put focus on the editor.
  */
  focus() {
    this.observer.ignore(() => {
      Wu(this.contentDOM), this.docView.updateSelection();
    });
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
    this.plugins = [], this.inputState.destroy(), this.dom.remove(), this.observer.destroy(), this.measureScheduled > -1 && cancelAnimationFrame(this.measureScheduled), this.destroyed = !0;
  }
  /**
  Returns an effect that can be
  [added](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) to a transaction to
  cause it to scroll the given position or range into view.
  */
  static scrollIntoView(e, t = {}) {
    return _l.of(new wi(typeof e == "number" ? y.cursor(e) : e, t.y, t.x, t.yMargin, t.xMargin));
  }
  /**
  Facet that can be used to add DOM event handlers. The value
  should be an object mapping event names to handler functions. The
  first such function to return true will be assumed to have handled
  that event, and no other handlers or built-in behavior will be
  activated for it.
  These are registered on the [content
  element](https://codemirror.net/6/docs/ref/#view.EditorView.contentDOM), except for `scroll`
  handlers, which will be called any time the editor's [scroll
  element](https://codemirror.net/6/docs/ref/#view.EditorView.scrollDOM) or one of its parent nodes
  is scrolled.
  */
  static domEventHandlers(e) {
    return le.define(() => ({}), { eventHandlers: e });
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
    let n = Nt.newName(), r = [Vn.of(n), tn.of(To(`.${n}`, e))];
    return t && t.dark && r.push(Bo.of(!0)), r;
  }
  /**
  Create an extension that adds styles to the base theme. Like
  with [`theme`](https://codemirror.net/6/docs/ref/#view.EditorView^theme), use `&` to indicate the
  place of the editor wrapper element when directly targeting
  that. You can also use `&dark` or `&light` instead to only
  target editors with a dark or light theme.
  */
  static baseTheme(e) {
    return zi.lowest(tn.of(To("." + Io, e, wf)));
  }
}
I.scrollTo = Co;
I.centerOn = ef;
I.styleModule = tn;
I.inputHandler = _u;
I.exceptionSink = $u;
I.updateListener = vo;
I.editable = xn;
I.mouseSelectionStyle = Ku;
I.dragMovesSelection = Ju;
I.clickAddsSelectionRange = Hu;
I.decorations = ti;
I.darkTheme = Bo;
I.contentAttributes = rf;
I.editorAttributes = nf;
I.lineWrapping = /* @__PURE__ */ I.contentAttributes.of({ class: "cm-lineWrapping" });
I.announce = /* @__PURE__ */ W.define();
const Rp = 4096;
function Ss(i, e) {
  return (i ?? e.contentDOM.getBoundingClientRect().top) + e.viewState.paddingTop;
}
const Sh = {};
class wr {
  constructor(e, t, n, r) {
    this.from = e, this.to = t, this.dir = n, this.order = r;
  }
  static update(e, t) {
    if (t.empty)
      return e;
    let n = [], r = e.length ? e[e.length - 1].dir : q.LTR;
    for (let s = Math.max(0, e.length - 10); s < e.length; s++) {
      let o = e[s];
      o.dir == r && !t.touchesRange(o.from, o.to) && n.push(new wr(t.mapPos(o.from, 1), t.mapPos(o.to, -1), o.dir, o.order));
    }
    return n;
  }
}
function kh(i, e, t) {
  for (let n = i.state.facet(e), r = n.length - 1; r >= 0; r--) {
    let s = n[r], o = typeof s == "function" ? s(i) : s;
    o && bo(o, t);
  }
  return t;
}
const Dp = R.mac ? "mac" : R.windows ? "win" : R.linux ? "linux" : "key";
function Lp(i, e) {
  const t = i.split(/-(?!$)/);
  let n = t[t.length - 1];
  n == "Space" && (n = " ");
  let r, s, o, a;
  for (let l = 0; l < t.length - 1; ++l) {
    const h = t[l];
    if (/^(cmd|meta|m)$/i.test(h))
      a = !0;
    else if (/^a(lt)?$/i.test(h))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(h))
      s = !0;
    else if (/^s(hift)?$/i.test(h))
      o = !0;
    else if (/^mod$/i.test(h))
      e == "mac" ? a = !0 : s = !0;
    else
      throw new Error("Unrecognized modifier name: " + h);
  }
  return r && (n = "Alt-" + n), s && (n = "Ctrl-" + n), a && (n = "Meta-" + n), o && (n = "Shift-" + n), n;
}
function ks(i, e, t) {
  return e.altKey && (i = "Alt-" + i), e.ctrlKey && (i = "Ctrl-" + i), e.metaKey && (i = "Meta-" + i), t !== !1 && e.shiftKey && (i = "Shift-" + i), i;
}
const Wp = /* @__PURE__ */ I.domEventHandlers({
  keydown(i, e) {
    return Cf(vf(e.state), i, e, "editor");
  }
}), Bn = /* @__PURE__ */ P.define({ enables: Wp }), Eh = /* @__PURE__ */ new WeakMap();
function vf(i) {
  let e = i.facet(Bn), t = Eh.get(e);
  return t || Eh.set(e, t = jp(e.reduce((n, r) => n.concat(r), []))), t;
}
function Mp(i, e, t) {
  return Cf(vf(i.state), e, i, t);
}
let Wt = null;
const Xp = 4e3;
function jp(i, e = Dp) {
  let t = /* @__PURE__ */ Object.create(null), n = /* @__PURE__ */ Object.create(null), r = (o, a) => {
    let l = n[o];
    if (l == null)
      n[o] = a;
    else if (l != a)
      throw new Error("Key binding " + o + " is used both as a regular binding and as a multi-stroke prefix");
  }, s = (o, a, l, h) => {
    let c = t[o] || (t[o] = /* @__PURE__ */ Object.create(null)), u = a.split(/ (?!$)/).map((g) => Lp(g, e));
    for (let g = 1; g < u.length; g++) {
      let p = u.slice(0, g).join(" ");
      r(p, !0), c[p] || (c[p] = {
        preventDefault: !0,
        commands: [(O) => {
          let m = Wt = { view: O, prefix: p, scope: o };
          return setTimeout(() => {
            Wt == m && (Wt = null);
          }, Xp), !0;
        }]
      });
    }
    let f = u.join(" ");
    r(f, !1);
    let d = c[f] || (c[f] = { preventDefault: !1, commands: [] });
    d.commands.push(l), h && (d.preventDefault = !0);
  };
  for (let o of i) {
    let a = o[e] || o.key;
    if (a)
      for (let l of o.scope ? o.scope.split(" ") : ["editor"])
        s(l, a, o.run, o.preventDefault), o.shift && s(l, "Shift-" + a, o.shift, o.preventDefault);
  }
  return t;
}
function Cf(i, e, t, n) {
  let r = vA(e), s = r.length == 1 && r != " ", o = "", a = !1;
  Wt && Wt.view == t && Wt.scope == n && (o = Wt.prefix + " ", (a = df.indexOf(e.keyCode) < 0) && (Wt = null));
  let l = (u) => {
    if (u) {
      for (let f of u.commands)
        if (f(t))
          return !0;
      u.preventDefault && (a = !0);
    }
    return !1;
  }, h = i[n], c;
  if (h) {
    if (l(h[o + ks(r, e, !s)]))
      return !0;
    if (s && (e.shiftKey || e.altKey || e.metaKey) && (c = Ut[e.keyCode]) && c != r) {
      if (l(h[o + ks(c, e, !0)]))
        return !0;
    } else if (s && e.shiftKey && l(h[o + ks(r, e, !0)]))
      return !0;
  }
  return a;
}
const Sf = !R.ios, rn = /* @__PURE__ */ P.define({
  combine(i) {
    return Gt(i, {
      cursorBlinkRate: 1200,
      drawRangeCursor: !0
    }, {
      cursorBlinkRate: (e, t) => Math.min(e, t),
      drawRangeCursor: (e, t) => e || t
    });
  }
});
function Zp(i = {}) {
  return [
    rn.of(i),
    Np,
    zp
  ];
}
class kf {
  constructor(e, t, n, r, s) {
    this.left = e, this.top = t, this.width = n, this.height = r, this.className = s;
  }
  draw() {
    let e = document.createElement("div");
    return e.className = this.className, this.adjust(e), e;
  }
  adjust(e) {
    e.style.left = this.left + "px", e.style.top = this.top + "px", this.width >= 0 && (e.style.width = this.width + "px"), e.style.height = this.height + "px";
  }
  eq(e) {
    return this.left == e.left && this.top == e.top && this.width == e.width && this.height == e.height && this.className == e.className;
  }
}
const Np = /* @__PURE__ */ le.fromClass(class {
  constructor(i) {
    this.view = i, this.rangePieces = [], this.cursors = [], this.measureReq = { read: this.readPos.bind(this), write: this.drawSel.bind(this) }, this.selectionLayer = i.scrollDOM.appendChild(document.createElement("div")), this.selectionLayer.className = "cm-selectionLayer", this.selectionLayer.setAttribute("aria-hidden", "true"), this.cursorLayer = i.scrollDOM.appendChild(document.createElement("div")), this.cursorLayer.className = "cm-cursorLayer", this.cursorLayer.setAttribute("aria-hidden", "true"), i.requestMeasure(this.measureReq), this.setBlinkRate();
  }
  setBlinkRate() {
    this.cursorLayer.style.animationDuration = this.view.state.facet(rn).cursorBlinkRate + "ms";
  }
  update(i) {
    let e = i.startState.facet(rn) != i.state.facet(rn);
    (e || i.selectionSet || i.geometryChanged || i.viewportChanged) && this.view.requestMeasure(this.measureReq), i.transactions.some((t) => t.scrollIntoView) && (this.cursorLayer.style.animationName = this.cursorLayer.style.animationName == "cm-blink" ? "cm-blink2" : "cm-blink"), e && this.setBlinkRate();
  }
  readPos() {
    let { state: i } = this.view, e = i.facet(rn), t = i.selection.ranges.map((r) => r.empty ? [] : Up(this.view, r)).reduce((r, s) => r.concat(s)), n = [];
    for (let r of i.selection.ranges) {
      let s = r == i.selection.main;
      if (r.empty ? !s || Sf : e.drawRangeCursor) {
        let o = Vp(this.view, r, s);
        o && n.push(o);
      }
    }
    return { rangePieces: t, cursors: n };
  }
  drawSel({ rangePieces: i, cursors: e }) {
    if (i.length != this.rangePieces.length || i.some((t, n) => !t.eq(this.rangePieces[n]))) {
      this.selectionLayer.textContent = "";
      for (let t of i)
        this.selectionLayer.appendChild(t.draw());
      this.rangePieces = i;
    }
    if (e.length != this.cursors.length || e.some((t, n) => !t.eq(this.cursors[n]))) {
      let t = this.cursorLayer.children;
      if (t.length !== e.length) {
        this.cursorLayer.textContent = "";
        for (const n of e)
          this.cursorLayer.appendChild(n.draw());
      } else
        e.forEach((n, r) => n.adjust(t[r]));
      this.cursors = e;
    }
  }
  destroy() {
    this.selectionLayer.remove(), this.cursorLayer.remove();
  }
}), Ef = {
  ".cm-line": {
    "& ::selection": { backgroundColor: "transparent !important" },
    "&::selection": { backgroundColor: "transparent !important" }
  }
};
Sf && (Ef[".cm-line"].caretColor = "transparent !important");
const zp = /* @__PURE__ */ zi.highest(/* @__PURE__ */ I.theme(Ef));
function xf(i) {
  let e = i.scrollDOM.getBoundingClientRect();
  return { left: (i.textDirection == q.LTR ? e.left : e.right - i.scrollDOM.clientWidth) - i.scrollDOM.scrollLeft, top: e.top - i.scrollDOM.scrollTop };
}
function xh(i, e, t) {
  let n = y.cursor(e);
  return {
    from: Math.max(t.from, i.moveToLineBoundary(n, !1, !0).from),
    to: Math.min(t.to, i.moveToLineBoundary(n, !0, !0).from),
    type: J.Text
  };
}
function Bh(i, e) {
  let t = i.lineBlockAt(e);
  if (Array.isArray(t.type)) {
    for (let n of t.type)
      if (n.to > e || n.to == e && (n.to == t.to || n.type == J.Text))
        return n;
  }
  return t;
}
function Up(i, e) {
  if (e.to <= i.viewport.from || e.from >= i.viewport.to)
    return [];
  let t = Math.max(e.from, i.viewport.from), n = Math.min(e.to, i.viewport.to), r = i.textDirection == q.LTR, s = i.contentDOM, o = s.getBoundingClientRect(), a = xf(i), l = window.getComputedStyle(s.firstChild), h = o.left + parseInt(l.paddingLeft) + Math.min(0, parseInt(l.textIndent)), c = o.right - parseInt(l.paddingRight), u = Bh(i, t), f = Bh(i, n), d = u.type == J.Text ? u : null, g = f.type == J.Text ? f : null;
  if (i.lineWrapping && (d && (d = xh(i, t, d)), g && (g = xh(i, n, g))), d && g && d.from == g.from)
    return O(m(e.from, e.to, d));
  {
    let C = d ? m(e.from, null, d) : w(u, !1), Q = g ? m(null, e.to, g) : w(f, !0), b = [];
    return (d || u).to < (g || f).from - 1 ? b.push(p(h, C.bottom, c, Q.top)) : C.bottom < Q.top && i.elementAtHeight((C.bottom + Q.top) / 2).type == J.Text && (C.bottom = Q.top = (C.bottom + Q.top) / 2), O(C).concat(b).concat(O(Q));
  }
  function p(C, Q, b, v) {
    return new kf(C - a.left, Q - a.top - 0.01, b - C, v - Q + 0.01, "cm-selectionBackground");
  }
  function O({ top: C, bottom: Q, horizontal: b }) {
    let v = [];
    for (let S = 0; S < b.length; S += 2)
      v.push(p(b[S], C, b[S + 1], Q));
    return v;
  }
  function m(C, Q, b) {
    let v = 1e9, S = -1e9, L = [];
    function x(Z, X, H, U, V) {
      let ee = i.coordsAtPos(Z, Z == b.to ? -2 : 2), se = i.coordsAtPos(H, H == b.from ? 2 : -2);
      v = Math.min(ee.top, se.top, v), S = Math.max(ee.bottom, se.bottom, S), V == q.LTR ? L.push(r && X ? h : ee.left, r && U ? c : se.right) : L.push(!r && U ? h : se.left, !r && X ? c : ee.right);
    }
    let B = C ?? b.from, D = Q ?? b.to;
    for (let Z of i.visibleRanges)
      if (Z.to > B && Z.from < D)
        for (let X = Math.max(Z.from, B), H = Math.min(Z.to, D); ; ) {
          let U = i.state.doc.lineAt(X);
          for (let V of i.bidiSpans(U)) {
            let ee = V.from + U.from, se = V.to + U.from;
            if (ee >= H)
              break;
            se > X && x(Math.max(ee, X), C == null && ee <= B, Math.min(se, H), Q == null && se >= D, V.dir);
          }
          if (X = U.to + 1, X >= H)
            break;
        }
    return L.length == 0 && x(B, C == null, D, Q == null, i.textDirection), { top: v, bottom: S, horizontal: L };
  }
  function w(C, Q) {
    let b = o.top + (Q ? C.top : C.bottom);
    return { top: b, bottom: b, horizontal: [] };
  }
}
function Vp(i, e, t) {
  let n = i.coordsAtPos(e.head, e.assoc || 1);
  if (!n)
    return null;
  let r = xf(i);
  return new kf(n.left - r.left, n.top - r.top, -1, n.bottom - n.top, t ? "cm-cursor cm-cursor-primary" : "cm-cursor cm-cursor-secondary");
}
const Bf = /* @__PURE__ */ W.define({
  map(i, e) {
    return i == null ? null : e.mapPos(i);
  }
}), sn = /* @__PURE__ */ Oe.define({
  create() {
    return null;
  },
  update(i, e) {
    return i != null && (i = e.changes.mapPos(i)), e.effects.reduce((t, n) => n.is(Bf) ? n.value : t, i);
  }
}), Yp = /* @__PURE__ */ le.fromClass(class {
  constructor(i) {
    this.view = i, this.cursor = null, this.measureReq = { read: this.readPos.bind(this), write: this.drawCursor.bind(this) };
  }
  update(i) {
    var e;
    let t = i.state.field(sn);
    t == null ? this.cursor != null && ((e = this.cursor) === null || e === void 0 || e.remove(), this.cursor = null) : (this.cursor || (this.cursor = this.view.scrollDOM.appendChild(document.createElement("div")), this.cursor.className = "cm-dropCursor"), (i.startState.field(sn) != t || i.docChanged || i.geometryChanged) && this.view.requestMeasure(this.measureReq));
  }
  readPos() {
    let i = this.view.state.field(sn), e = i != null && this.view.coordsAtPos(i);
    if (!e)
      return null;
    let t = this.view.scrollDOM.getBoundingClientRect();
    return {
      left: e.left - t.left + this.view.scrollDOM.scrollLeft,
      top: e.top - t.top + this.view.scrollDOM.scrollTop,
      height: e.bottom - e.top
    };
  }
  drawCursor(i) {
    this.cursor && (i ? (this.cursor.style.left = i.left + "px", this.cursor.style.top = i.top + "px", this.cursor.style.height = i.height + "px") : this.cursor.style.left = "-100000px");
  }
  destroy() {
    this.cursor && this.cursor.remove();
  }
  setDropPos(i) {
    this.view.state.field(sn) != i && this.view.dispatch({ effects: Bf.of(i) });
  }
}, {
  eventHandlers: {
    dragover(i) {
      this.setDropPos(this.view.posAtCoords({ x: i.clientX, y: i.clientY }));
    },
    dragleave(i) {
      (i.target == this.view.contentDOM || !this.view.contentDOM.contains(i.relatedTarget)) && this.setDropPos(null);
    },
    dragend() {
      this.setDropPos(null);
    },
    drop() {
      this.setDropPos(null);
    }
  }
});
function qp() {
  return [sn, Yp];
}
function Ih(i, e, t, n, r) {
  e.lastIndex = 0;
  for (let s = i.iterRange(t, n), o = t, a; !s.next().done; o += s.value.length)
    if (!s.lineBreak)
      for (; a = e.exec(s.value); )
        r(o + a.index, o + a.index + a[0].length, a);
}
function Gp(i, e) {
  let t = i.visibleRanges;
  if (t.length == 1 && t[0].from == i.viewport.from && t[0].to == i.viewport.to)
    return t;
  let n = [];
  for (let { from: r, to: s } of t)
    r = Math.max(i.state.doc.lineAt(r).from, r - e), s = Math.min(i.state.doc.lineAt(s).to, s + e), n.length && n[n.length - 1].to >= r ? n[n.length - 1].to = s : n.push({ from: r, to: s });
  return n;
}
class Fp {
  /**
  Create a decorator.
  */
  constructor(e) {
    let { regexp: t, decoration: n, boundary: r, maxLength: s = 1e3 } = e;
    if (!t.global)
      throw new RangeError("The regular expression given to MatchDecorator should have its 'g' flag set");
    this.regexp = t, this.getDeco = typeof n == "function" ? n : () => n, this.boundary = r, this.maxLength = s;
  }
  /**
  Compute the full set of decorations for matches in the given
  view's viewport. You'll want to call this when initializing your
  plugin.
  */
  createDeco(e) {
    let t = new zt();
    for (let { from: n, to: r } of Gp(e, this.maxLength))
      Ih(e.state.doc, this.regexp, n, r, (s, o, a) => t.add(s, o, this.getDeco(a, e, s)));
    return t.finish();
  }
  /**
  Update a set of decorations for a view update. `deco` _must_ be
  the set of decorations produced by _this_ `MatchDecorator` for
  the view state before the update.
  */
  updateDeco(e, t) {
    let n = 1e9, r = -1;
    return e.docChanged && e.changes.iterChanges((s, o, a, l) => {
      l > e.view.viewport.from && a < e.view.viewport.to && (n = Math.min(a, n), r = Math.max(l, r));
    }), e.viewportChanged || r - n > 1e3 ? this.createDeco(e.view) : r > -1 ? this.updateRange(e.view, t.map(e.changes), n, r) : t;
  }
  updateRange(e, t, n, r) {
    for (let s of e.visibleRanges) {
      let o = Math.max(s.from, n), a = Math.min(s.to, r);
      if (a > o) {
        let l = e.state.doc.lineAt(o), h = l.to < a ? e.state.doc.lineAt(a) : l, c = Math.max(s.from, l.from), u = Math.min(s.to, h.to);
        if (this.boundary) {
          for (; o > l.from; o--)
            if (this.boundary.test(l.text[o - 1 - l.from])) {
              c = o;
              break;
            }
          for (; a < h.to; a++)
            if (this.boundary.test(h.text[a - h.from])) {
              u = a;
              break;
            }
        }
        let f = [], d;
        if (l == h)
          for (this.regexp.lastIndex = c - l.from; (d = this.regexp.exec(l.text)) && d.index < u - l.from; ) {
            let g = d.index + l.from;
            f.push(this.getDeco(d, e, g).range(g, g + d[0].length));
          }
        else
          Ih(e.state.doc, this.regexp, c, u, (g, p, O) => f.push(this.getDeco(O, e, g).range(g, p)));
        t = t.update({ filterFrom: c, filterTo: u, filter: (g, p) => g < c || p > u, add: f });
      }
    }
    return t;
  }
}
const Po = /x/.unicode != null ? "gu" : "g", Hp = /* @__PURE__ */ new RegExp(`[\0-\b
--­؜​‎‏\u2028\u2029‭‮\uFEFF￹-￼]`, Po), Jp = {
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
  8233: "paragraph separator",
  65279: "zero width no-break space",
  65532: "object replacement"
};
let Es = null;
function Kp() {
  var i;
  if (Es == null && typeof document < "u" && document.body) {
    let e = document.body.style;
    Es = ((i = e.tabSize) !== null && i !== void 0 ? i : e.MozTabSize) != null;
  }
  return Es || !1;
}
const or = /* @__PURE__ */ P.define({
  combine(i) {
    let e = Gt(i, {
      render: null,
      specialChars: Hp,
      addSpecialChars: null
    });
    return (e.replaceTabs = !Kp()) && (e.specialChars = new RegExp("	|" + e.specialChars.source, Po)), e.addSpecialChars && (e.specialChars = new RegExp(e.specialChars.source + "|" + e.addSpecialChars.source, Po)), e;
  }
});
function $p(i = {}) {
  return [or.of(i), _p()];
}
let Th = null;
function _p() {
  return Th || (Th = le.fromClass(class {
    constructor(i) {
      this.view = i, this.decorations = T.none, this.decorationCache = /* @__PURE__ */ Object.create(null), this.decorator = this.makeDecorator(i.state.facet(or)), this.decorations = this.decorator.createDeco(i);
    }
    makeDecorator(i) {
      return new Fp({
        regexp: i.specialChars,
        decoration: (e, t, n) => {
          let { doc: r } = t.state, s = we(e[0], 0);
          if (s == 9) {
            let o = r.lineAt(n), a = t.state.tabSize, l = kn(o.text, a, n - o.from);
            return T.replace({ widget: new nO((a - l % a) * this.view.defaultCharacterWidth) });
          }
          return this.decorationCache[s] || (this.decorationCache[s] = T.replace({ widget: new iO(i, s) }));
        },
        boundary: i.replaceTabs ? void 0 : /[^]/
      });
    }
    update(i) {
      let e = i.state.facet(or);
      i.startState.facet(or) != e ? (this.decorator = this.makeDecorator(e), this.decorations = this.decorator.createDeco(i.view)) : this.decorations = this.decorator.updateDeco(i, this.decorations);
    }
  }, {
    decorations: (i) => i.decorations
  }));
}
const eO = "•";
function tO(i) {
  return i >= 32 ? eO : i == 10 ? "␤" : String.fromCharCode(9216 + i);
}
class iO extends Ot {
  constructor(e, t) {
    super(), this.options = e, this.code = t;
  }
  eq(e) {
    return e.code == this.code;
  }
  toDOM(e) {
    let t = tO(this.code), n = e.state.phrase("Control character") + " " + (Jp[this.code] || "0x" + this.code.toString(16)), r = this.options.render && this.options.render(this.code, n, t);
    if (r)
      return r;
    let s = document.createElement("span");
    return s.textContent = t, s.title = n, s.setAttribute("aria-label", n), s.className = "cm-specialChar", s;
  }
  ignoreEvent() {
    return !1;
  }
}
class nO extends Ot {
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
function rO() {
  return oO;
}
const sO = /* @__PURE__ */ T.line({ class: "cm-activeLine" }), oO = /* @__PURE__ */ le.fromClass(class {
  constructor(i) {
    this.decorations = this.getDeco(i);
  }
  update(i) {
    (i.docChanged || i.selectionSet) && (this.decorations = this.getDeco(i.view));
  }
  getDeco(i) {
    let e = -1, t = [];
    for (let n of i.state.selection.ranges) {
      if (!n.empty)
        return T.none;
      let r = i.lineBlockAt(n.head);
      r.from > e && (t.push(sO.range(r.from)), e = r.from);
    }
    return T.set(t);
  }
}, {
  decorations: (i) => i.decorations
}), Ro = /* @__PURE__ */ qt.define(), aO = /* @__PURE__ */ qt.define(), lO = /* @__PURE__ */ P.define(), If = /* @__PURE__ */ P.define({
  combine(i) {
    return Gt(i, {
      minDepth: 100,
      newGroupDelay: 500
    }, { minDepth: Math.max, newGroupDelay: Math.min });
  }
});
function hO(i) {
  let e = 0;
  return i.iterChangedRanges((t, n) => e = n), e;
}
const Tf = /* @__PURE__ */ Oe.define({
  create() {
    return ct.empty;
  },
  update(i, e) {
    let t = e.state.facet(If), n = e.annotation(Ro);
    if (n) {
      let l = e.docChanged ? y.single(hO(e.changes)) : void 0, h = Te.fromTransaction(e, l), c = n.side, u = c == 0 ? i.undone : i.done;
      return h ? u = vr(u, u.length, t.minDepth, h) : u = Lf(u, e.startState.selection), new ct(c == 0 ? n.rest : u, c == 0 ? u : n.rest);
    }
    let r = e.annotation(aO);
    if ((r == "full" || r == "before") && (i = i.isolate()), e.annotation(Ae.addToHistory) === !1)
      return e.changes.empty ? i : i.addMapping(e.changes.desc);
    let s = Te.fromTransaction(e), o = e.annotation(Ae.time), a = e.annotation(Ae.userEvent);
    return s ? i = i.addChanges(s, o, a, t.newGroupDelay, t.minDepth) : e.selection && (i = i.addSelection(e.startState.selection, o, a, t.newGroupDelay)), (r == "full" || r == "after") && (i = i.isolate()), i;
  },
  toJSON(i) {
    return { done: i.done.map((e) => e.toJSON()), undone: i.undone.map((e) => e.toJSON()) };
  },
  fromJSON(i) {
    return new ct(i.done.map(Te.fromJSON), i.undone.map(Te.fromJSON));
  }
});
function cO(i = {}) {
  return [
    Tf,
    If.of(i),
    I.domEventHandlers({
      beforeinput(e, t) {
        let n = e.inputType == "historyUndo" ? Pf : e.inputType == "historyRedo" ? Rf : null;
        return n ? (e.preventDefault(), n(t)) : !1;
      }
    })
  ];
}
function Jr(i, e) {
  return function({ state: t, dispatch: n }) {
    if (!e && t.readOnly)
      return !1;
    let r = t.field(Tf, !1);
    if (!r)
      return !1;
    let s = r.pop(i, t, e);
    return s ? (n(s), !0) : !1;
  };
}
const Pf = /* @__PURE__ */ Jr(0, !1), Rf = /* @__PURE__ */ Jr(1, !1), uO = /* @__PURE__ */ Jr(0, !0), fO = /* @__PURE__ */ Jr(1, !0);
class Te {
  constructor(e, t, n, r, s) {
    this.changes = e, this.effects = t, this.mapped = n, this.startSelection = r, this.selectionsAfter = s;
  }
  setSelAfter(e) {
    return new Te(this.changes, this.effects, this.mapped, this.startSelection, e);
  }
  toJSON() {
    var e, t, n;
    return {
      changes: (e = this.changes) === null || e === void 0 ? void 0 : e.toJSON(),
      mapped: (t = this.mapped) === null || t === void 0 ? void 0 : t.toJSON(),
      startSelection: (n = this.startSelection) === null || n === void 0 ? void 0 : n.toJSON(),
      selectionsAfter: this.selectionsAfter.map((r) => r.toJSON())
    };
  }
  static fromJSON(e) {
    return new Te(e.changes && ge.fromJSON(e.changes), [], e.mapped && kt.fromJSON(e.mapped), e.startSelection && y.fromJSON(e.startSelection), e.selectionsAfter.map(y.fromJSON));
  }
  // This does not check `addToHistory` and such, it assumes the
  // transaction needs to be converted to an item. Returns null when
  // there are no changes or effects in the transaction.
  static fromTransaction(e, t) {
    let n = qe;
    for (let r of e.startState.facet(lO)) {
      let s = r(e);
      s.length && (n = n.concat(s));
    }
    return !n.length && e.changes.empty ? null : new Te(e.changes.invert(e.startState.doc), n, void 0, t || e.startState.selection, qe);
  }
  static selection(e) {
    return new Te(void 0, qe, void 0, void 0, e);
  }
}
function vr(i, e, t, n) {
  let r = e + 1 > t + 20 ? e - t - 1 : 0, s = i.slice(r, e);
  return s.push(n), s;
}
function dO(i, e) {
  let t = [], n = !1;
  return i.iterChangedRanges((r, s) => t.push(r, s)), e.iterChangedRanges((r, s, o, a) => {
    for (let l = 0; l < t.length; ) {
      let h = t[l++], c = t[l++];
      a >= h && o <= c && (n = !0);
    }
  }), n;
}
function gO(i, e) {
  return i.ranges.length == e.ranges.length && i.ranges.filter((t, n) => t.empty != e.ranges[n].empty).length === 0;
}
function Df(i, e) {
  return i.length ? e.length ? i.concat(e) : i : e;
}
const qe = [], AO = 200;
function Lf(i, e) {
  if (i.length) {
    let t = i[i.length - 1], n = t.selectionsAfter.slice(Math.max(0, t.selectionsAfter.length - AO));
    return n.length && n[n.length - 1].eq(e) ? i : (n.push(e), vr(i, i.length - 1, 1e9, t.setSelAfter(n)));
  } else
    return [Te.selection([e])];
}
function pO(i) {
  let e = i[i.length - 1], t = i.slice();
  return t[i.length - 1] = e.setSelAfter(e.selectionsAfter.slice(0, e.selectionsAfter.length - 1)), t;
}
function xs(i, e) {
  if (!i.length)
    return i;
  let t = i.length, n = qe;
  for (; t; ) {
    let r = OO(i[t - 1], e, n);
    if (r.changes && !r.changes.empty || r.effects.length) {
      let s = i.slice(0, t);
      return s[t - 1] = r, s;
    } else
      e = r.mapped, t--, n = r.selectionsAfter;
  }
  return n.length ? [Te.selection(n)] : qe;
}
function OO(i, e, t) {
  let n = Df(i.selectionsAfter.length ? i.selectionsAfter.map((a) => a.map(e)) : qe, t);
  if (!i.changes)
    return Te.selection(n);
  let r = i.changes.map(e), s = e.mapDesc(i.changes, !0), o = i.mapped ? i.mapped.composeDesc(s) : s;
  return new Te(r, W.mapEffects(i.effects, e), o, i.startSelection.map(s), n);
}
const mO = /^(input\.type|delete)($|\.)/;
class ct {
  constructor(e, t, n = 0, r = void 0) {
    this.done = e, this.undone = t, this.prevTime = n, this.prevUserEvent = r;
  }
  isolate() {
    return this.prevTime ? new ct(this.done, this.undone) : this;
  }
  addChanges(e, t, n, r, s) {
    let o = this.done, a = o[o.length - 1];
    return a && a.changes && !a.changes.empty && e.changes && (!n || mO.test(n)) && (!a.selectionsAfter.length && t - this.prevTime < r && dO(a.changes, e.changes) || // For compose (but not compose.start) events, always join with previous event
    n == "input.type.compose") ? o = vr(o, o.length - 1, s, new Te(e.changes.compose(a.changes), Df(e.effects, a.effects), a.mapped, a.startSelection, qe)) : o = vr(o, o.length, s, e), new ct(o, qe, t, n);
  }
  addSelection(e, t, n, r) {
    let s = this.done.length ? this.done[this.done.length - 1].selectionsAfter : qe;
    return s.length > 0 && t - this.prevTime < r && n == this.prevUserEvent && n && /^select($|\.)/.test(n) && gO(s[s.length - 1], e) ? this : new ct(Lf(this.done, e), this.undone, t, n);
  }
  addMapping(e) {
    return new ct(xs(this.done, e), xs(this.undone, e), this.prevTime, this.prevUserEvent);
  }
  pop(e, t, n) {
    let r = e == 0 ? this.done : this.undone;
    if (r.length == 0)
      return null;
    let s = r[r.length - 1];
    if (n && s.selectionsAfter.length)
      return t.update({
        selection: s.selectionsAfter[s.selectionsAfter.length - 1],
        annotations: Ro.of({ side: e, rest: pO(r) }),
        userEvent: e == 0 ? "select.undo" : "select.redo",
        scrollIntoView: !0
      });
    if (s.changes) {
      let o = r.length == 1 ? qe : r.slice(0, r.length - 1);
      return s.mapped && (o = xs(o, s.mapped)), t.update({
        changes: s.changes,
        selection: s.startSelection,
        effects: s.effects,
        annotations: Ro.of({ side: e, rest: o }),
        filter: !1,
        userEvent: e == 0 ? "undo" : "redo",
        scrollIntoView: !0
      });
    } else
      return null;
  }
}
ct.empty = /* @__PURE__ */ new ct(qe, qe);
const QO = [
  { key: "Mod-z", run: Pf, preventDefault: !0 },
  { key: "Mod-y", mac: "Mod-Shift-z", run: Rf, preventDefault: !0 },
  { key: "Mod-u", run: uO, preventDefault: !0 },
  { key: "Alt-u", mac: "Mod-Shift-u", run: fO, preventDefault: !0 }
], Wf = 1024;
let bO = 0;
class Ge {
  constructor(e, t) {
    this.from = e, this.to = t;
  }
}
class M {
  /// Create a new node prop type.
  constructor(e = {}) {
    this.id = bO++, this.perNode = !!e.perNode, this.deserialize = e.deserialize || (() => {
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
    return typeof e != "function" && (e = Le.match(e)), (t) => {
      let n = e(t);
      return n === void 0 ? null : [this, n];
    };
  }
}
M.closedBy = new M({ deserialize: (i) => i.split(" ") });
M.openedBy = new M({ deserialize: (i) => i.split(" ") });
M.group = new M({ deserialize: (i) => i.split(" ") });
M.contextHash = new M({ perNode: !0 });
M.lookAhead = new M({ perNode: !0 });
M.mounted = new M({ perNode: !0 });
class yO {
  constructor(e, t, n) {
    this.tree = e, this.overlay = t, this.parser = n;
  }
}
const wO = /* @__PURE__ */ Object.create(null);
class Le {
  /// @internal
  constructor(e, t, n, r = 0) {
    this.name = e, this.props = t, this.id = n, this.flags = r;
  }
  static define(e) {
    let t = e.props && e.props.length ? /* @__PURE__ */ Object.create(null) : wO, n = (e.top ? 1 : 0) | (e.skipped ? 2 : 0) | (e.error ? 4 : 0) | (e.name == null ? 8 : 0), r = new Le(e.name || "", t, e.id, n);
    if (e.props) {
      for (let s of e.props)
        if (Array.isArray(s) || (s = s(r)), s) {
          if (s[0].perNode)
            throw new RangeError("Can't store a per-node prop on a node type");
          t[s[0].id] = s[1];
        }
    }
    return r;
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
      let t = this.prop(M.group);
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
    for (let n in e)
      for (let r of n.split(" "))
        t[r] = e[n];
    return (n) => {
      for (let r = n.prop(M.group), s = -1; s < (r ? r.length : 0); s++) {
        let o = t[s < 0 ? n.name : r[s]];
        if (o)
          return o;
      }
    };
  }
}
Le.none = new Le(
  "",
  /* @__PURE__ */ Object.create(null),
  0,
  8
  /* Anonymous */
);
class aa {
  /// Create a set with the given types. The `id` property of each
  /// type should correspond to its position within the array.
  constructor(e) {
    this.types = e;
    for (let t = 0; t < e.length; t++)
      if (e[t].id != t)
        throw new RangeError("Node type ids should correspond to array positions when creating a node set");
  }
  /// Create a copy of this set with some node properties added. The
  /// arguments to this method should be created with
  /// [`NodeProp.add`](#common.NodeProp.add).
  extend(...e) {
    let t = [];
    for (let n of this.types) {
      let r = null;
      for (let s of e) {
        let o = s(n);
        o && (r || (r = Object.assign({}, n.props)), r[o[0].id] = o[1]);
      }
      t.push(r ? new Le(n.name, r, n.id, n.flags) : n);
    }
    return new aa(t);
  }
}
const Yn = /* @__PURE__ */ new WeakMap(), Ph = /* @__PURE__ */ new WeakMap();
class re {
  /// Construct a new tree. See also [`Tree.build`](#common.Tree^build).
  constructor(e, t, n, r, s) {
    if (this.type = e, this.children = t, this.positions = n, this.length = r, this.props = null, s && s.length) {
      this.props = /* @__PURE__ */ Object.create(null);
      for (let [o, a] of s)
        this.props[typeof o == "number" ? o : o.id] = a;
    }
  }
  /// @internal
  toString() {
    let e = this.prop(M.mounted);
    if (e && !e.overlay)
      return e.tree.toString();
    let t = "";
    for (let n of this.children) {
      let r = n.toString();
      r && (t && (t += ","), t += r);
    }
    return this.type.name ? (/\W/.test(this.type.name) && !this.type.isError ? JSON.stringify(this.type.name) : this.type.name) + (t.length ? "(" + t + ")" : "") : t;
  }
  /// Get a [tree cursor](#common.TreeCursor) rooted at this tree. When
  /// `pos` is given, the cursor is [moved](#common.TreeCursor.moveTo)
  /// to the given position and side.
  cursor(e, t = 0) {
    let n = e != null && Yn.get(this) || this.topNode, r = new Qn(n);
    return e != null && (r.moveTo(e, t), Yn.set(this, r._tree)), r;
  }
  /// Get a [tree cursor](#common.TreeCursor) that, unlike regular
  /// cursors, doesn't skip through
  /// [anonymous](#common.NodeType.isAnonymous) nodes and doesn't
  /// automatically enter mounted nodes.
  fullCursor() {
    return new Qn(
      this.topNode,
      1
      /* Full */
    );
  }
  /// Get a [syntax node](#common.SyntaxNode) object for the top of the
  /// tree.
  get topNode() {
    return new dt(this, 0, 0, null);
  }
  /// Get the [syntax node](#common.SyntaxNode) at the given position.
  /// If `side` is -1, this will move into nodes that end at the
  /// position. If 1, it'll move into nodes that start at the
  /// position. With 0, it'll only enter nodes that cover the position
  /// from both sides.
  resolve(e, t = 0) {
    let n = Ii(Yn.get(this) || this.topNode, e, t, !1);
    return Yn.set(this, n), n;
  }
  /// Like [`resolve`](#common.Tree.resolve), but will enter
  /// [overlaid](#common.MountedTree.overlay) nodes, producing a syntax node
  /// pointing into the innermost overlaid tree at the given position
  /// (with parent links going through all parent structure, including
  /// the host trees).
  resolveInner(e, t = 0) {
    let n = Ii(Ph.get(this) || this.topNode, e, t, !0);
    return Ph.set(this, n), n;
  }
  /// Iterate over the tree and its children, calling `enter` for any
  /// node that touches the `from`/`to` region (if given) before
  /// running over such a node's children, and `leave` (if given) when
  /// leaving the node. When `enter` returns `false`, that node will
  /// not have its children iterated over (or `leave` called).
  iterate(e) {
    let { enter: t, leave: n, from: r = 0, to: s = this.length } = e;
    for (let o = this.cursor(), a = () => o.node; ; ) {
      let l = !1;
      if (o.from <= s && o.to >= r && (o.type.isAnonymous || t(o.type, o.from, o.to, a) !== !1)) {
        if (o.firstChild())
          continue;
        o.type.isAnonymous || (l = !0);
      }
      for (; l && n && n(o.type, o.from, o.to, a), l = o.type.isAnonymous, !o.nextSibling(); ) {
        if (!o.parent())
          return;
        l = !0;
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
    return this.children.length <= 8 ? this : ca(Le.none, this.children, this.positions, 0, this.children.length, 0, this.length, (t, n, r) => new re(this.type, t, n, r, this.propValues), e.makeTree || ((t, n, r) => new re(Le.none, t, n, r)));
  }
  /// Build a tree from a postfix-ordered buffer of node information,
  /// or a cursor over such a buffer.
  static build(e) {
    return CO(e);
  }
}
re.empty = new re(Le.none, [], [], 0);
class la {
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
    return new la(this.buffer, this.index);
  }
}
class Ai {
  /// Create a tree buffer.
  constructor(e, t, n) {
    this.buffer = e, this.length = t, this.set = n;
  }
  /// @internal
  get type() {
    return Le.none;
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
    let t = this.buffer[e], n = this.buffer[e + 3], r = this.set.types[t], s = r.name;
    if (/\W/.test(s) && !r.isError && (s = JSON.stringify(s)), e += 4, n == e)
      return s;
    let o = [];
    for (; e < n; )
      o.push(this.childString(e)), e = this.buffer[e + 3];
    return s + "(" + o.join(",") + ")";
  }
  /// @internal
  findChild(e, t, n, r, s) {
    let { buffer: o } = this, a = -1;
    for (let l = e; l != t && !(Mf(s, r, o[l + 1], o[l + 2]) && (a = l, n > 0)); l = o[l + 3])
      ;
    return a;
  }
  /// @internal
  slice(e, t, n, r) {
    let s = this.buffer, o = new Uint16Array(t - e);
    for (let a = e, l = 0; a < t; )
      o[l++] = s[a++], o[l++] = s[a++] - n, o[l++] = s[a++] - n, o[l++] = s[a++] - e;
    return new Ai(o, r - n, this.set);
  }
}
function Mf(i, e, t, n) {
  switch (i) {
    case -2:
      return t < e;
    case -1:
      return n >= e && t < e;
    case 0:
      return t < e && n > e;
    case 1:
      return t <= e && n > e;
    case 2:
      return n > e;
    case 4:
      return !0;
  }
}
function Xf(i, e) {
  let t = i.childBefore(e);
  for (; t; ) {
    let n = t.lastChild;
    if (!n || n.to != t.to)
      break;
    n.type.isError && n.from == n.to ? (i = t, t = n.prevSibling) : t = n;
  }
  return i;
}
function Ii(i, e, t, n) {
  for (var r; i.from == i.to || (t < 1 ? i.from >= e : i.from > e) || (t > -1 ? i.to <= e : i.to < e); ) {
    let s = !n && i instanceof dt && i.index < 0 ? null : i.parent;
    if (!s)
      return i;
    i = s;
  }
  if (n)
    for (let s = i, o = s.parent; o; s = o, o = s.parent)
      s instanceof dt && s.index < 0 && ((r = o.enter(e, t, !0)) === null || r === void 0 ? void 0 : r.from) != s.from && (i = o);
  for (; ; ) {
    let s = i.enter(e, t, n);
    if (!s)
      return i;
    i = s;
  }
}
class dt {
  constructor(e, t, n, r) {
    this.node = e, this._from = t, this.index = n, this._parent = r;
  }
  get type() {
    return this.node.type;
  }
  get name() {
    return this.node.type.name;
  }
  get from() {
    return this._from;
  }
  get to() {
    return this._from + this.node.length;
  }
  nextChild(e, t, n, r, s = 0) {
    for (let o = this; ; ) {
      for (let { children: a, positions: l } = o.node, h = t > 0 ? a.length : -1; e != h; e += t) {
        let c = a[e], u = l[e] + o._from;
        if (Mf(r, n, u, u + c.length)) {
          if (c instanceof Ai) {
            if (s & 2)
              continue;
            let f = c.findChild(0, c.buffer.length, t, n - u, r);
            if (f > -1)
              return new jt(new vO(o, c, e, u), null, f);
          } else if (s & 1 || !c.type.isAnonymous || ha(c)) {
            let f;
            if (!(s & 1) && c.props && (f = c.prop(M.mounted)) && !f.overlay)
              return new dt(f.tree, u, e, o);
            let d = new dt(c, u, e, o);
            return s & 1 || !d.type.isAnonymous ? d : d.nextChild(t < 0 ? c.children.length - 1 : 0, t, n, r);
          }
        }
      }
      if (s & 1 || !o.type.isAnonymous || (o.index >= 0 ? e = o.index + t : e = t < 0 ? -1 : o._parent.node.children.length, o = o._parent, !o))
        return null;
    }
  }
  get firstChild() {
    return this.nextChild(
      0,
      1,
      0,
      4
      /* DontCare */
    );
  }
  get lastChild() {
    return this.nextChild(
      this.node.children.length - 1,
      -1,
      0,
      4
      /* DontCare */
    );
  }
  childAfter(e) {
    return this.nextChild(
      0,
      1,
      e,
      2
      /* After */
    );
  }
  childBefore(e) {
    return this.nextChild(
      this.node.children.length - 1,
      -1,
      e,
      -2
      /* Before */
    );
  }
  enter(e, t, n = !0, r = !0) {
    let s;
    if (n && (s = this.node.prop(M.mounted)) && s.overlay) {
      let o = e - this.from;
      for (let { from: a, to: l } of s.overlay)
        if ((t > 0 ? a <= o : a < o) && (t < 0 ? l >= o : l > o))
          return new dt(s.tree, s.overlay[0].from + this.from, -1, this);
    }
    return this.nextChild(
      0,
      1,
      e,
      t,
      r ? 0 : 2
      /* NoEnterBuffer */
    );
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
      /* DontCare */
    ) : null;
  }
  get prevSibling() {
    return this._parent && this.index >= 0 ? this._parent.nextChild(
      this.index - 1,
      -1,
      0,
      4
      /* DontCare */
    ) : null;
  }
  get cursor() {
    return new Qn(this);
  }
  get tree() {
    return this.node;
  }
  toTree() {
    return this.node;
  }
  resolve(e, t = 0) {
    return Ii(this, e, t, !1);
  }
  resolveInner(e, t = 0) {
    return Ii(this, e, t, !0);
  }
  enterUnfinishedNodesBefore(e) {
    return Xf(this, e);
  }
  getChild(e, t = null, n = null) {
    let r = Cr(this, e, t, n);
    return r.length ? r[0] : null;
  }
  getChildren(e, t = null, n = null) {
    return Cr(this, e, t, n);
  }
  /// @internal
  toString() {
    return this.node.toString();
  }
}
function Cr(i, e, t, n) {
  let r = i.cursor, s = [];
  if (!r.firstChild())
    return s;
  if (t != null) {
    for (; !r.type.is(t); )
      if (!r.nextSibling())
        return s;
  }
  for (; ; ) {
    if (n != null && r.type.is(n))
      return s;
    if (r.type.is(e) && s.push(r.node), !r.nextSibling())
      return n == null ? s : [];
  }
}
class vO {
  constructor(e, t, n, r) {
    this.parent = e, this.buffer = t, this.index = n, this.start = r;
  }
}
class jt {
  constructor(e, t, n) {
    this.context = e, this._parent = t, this.index = n, this.type = e.buffer.set.types[e.buffer.buffer[n]];
  }
  get name() {
    return this.type.name;
  }
  get from() {
    return this.context.start + this.context.buffer.buffer[this.index + 1];
  }
  get to() {
    return this.context.start + this.context.buffer.buffer[this.index + 2];
  }
  child(e, t, n) {
    let { buffer: r } = this.context, s = r.findChild(this.index + 4, r.buffer[this.index + 3], e, t - this.context.start, n);
    return s < 0 ? null : new jt(this.context, this, s);
  }
  get firstChild() {
    return this.child(
      1,
      0,
      4
      /* DontCare */
    );
  }
  get lastChild() {
    return this.child(
      -1,
      0,
      4
      /* DontCare */
    );
  }
  childAfter(e) {
    return this.child(
      1,
      e,
      2
      /* After */
    );
  }
  childBefore(e) {
    return this.child(
      -1,
      e,
      -2
      /* Before */
    );
  }
  enter(e, t, n, r = !0) {
    if (!r)
      return null;
    let { buffer: s } = this.context, o = s.findChild(this.index + 4, s.buffer[this.index + 3], t > 0 ? 1 : -1, e - this.context.start, t);
    return o < 0 ? null : new jt(this.context, this, o);
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
      /* DontCare */
    );
  }
  get nextSibling() {
    let { buffer: e } = this.context, t = e.buffer[this.index + 3];
    return t < (this._parent ? e.buffer[this._parent.index + 3] : e.buffer.length) ? new jt(this.context, this._parent, t) : this.externalSibling(1);
  }
  get prevSibling() {
    let { buffer: e } = this.context, t = this._parent ? this._parent.index + 4 : 0;
    return this.index == t ? this.externalSibling(-1) : new jt(this.context, this._parent, e.findChild(
      t,
      this.index,
      -1,
      0,
      4
      /* DontCare */
    ));
  }
  get cursor() {
    return new Qn(this);
  }
  get tree() {
    return null;
  }
  toTree() {
    let e = [], t = [], { buffer: n } = this.context, r = this.index + 4, s = n.buffer[this.index + 3];
    if (s > r) {
      let o = n.buffer[this.index + 1], a = n.buffer[this.index + 2];
      e.push(n.slice(r, s, o, a)), t.push(0);
    }
    return new re(this.type, e, t, this.to - this.from);
  }
  resolve(e, t = 0) {
    return Ii(this, e, t, !1);
  }
  resolveInner(e, t = 0) {
    return Ii(this, e, t, !0);
  }
  enterUnfinishedNodesBefore(e) {
    return Xf(this, e);
  }
  /// @internal
  toString() {
    return this.context.buffer.childString(this.index);
  }
  getChild(e, t = null, n = null) {
    let r = Cr(this, e, t, n);
    return r.length ? r[0] : null;
  }
  getChildren(e, t = null, n = null) {
    return Cr(this, e, t, n);
  }
}
class Qn {
  /// @internal
  constructor(e, t = 0) {
    if (this.mode = t, this.buffer = null, this.stack = [], this.index = 0, this.bufferNode = null, e instanceof dt)
      this.yieldNode(e);
    else {
      this._tree = e.context.parent, this.buffer = e.context;
      for (let n = e._parent; n; n = n._parent)
        this.stack.unshift(n.index);
      this.bufferNode = e, this.yieldBuf(e.index);
    }
  }
  /// Shorthand for `.type.name`.
  get name() {
    return this.type.name;
  }
  yieldNode(e) {
    return e ? (this._tree = e, this.type = e.type, this.from = e.from, this.to = e.to, !0) : !1;
  }
  yieldBuf(e, t) {
    this.index = e;
    let { start: n, buffer: r } = this.buffer;
    return this.type = t || r.set.types[r.buffer[e]], this.from = n + r.buffer[e + 1], this.to = n + r.buffer[e + 2], !0;
  }
  yield(e) {
    return e ? e instanceof dt ? (this.buffer = null, this.yieldNode(e)) : (this.buffer = e.context, this.yieldBuf(e.index, e.type)) : !1;
  }
  /// @internal
  toString() {
    return this.buffer ? this.buffer.buffer.childString(this.index) : this._tree.toString();
  }
  /// @internal
  enterChild(e, t, n) {
    if (!this.buffer)
      return this.yield(this._tree.nextChild(e < 0 ? this._tree.node.children.length - 1 : 0, e, t, n, this.mode));
    let { buffer: r } = this.buffer, s = r.findChild(this.index + 4, r.buffer[this.index + 3], e, t - this.buffer.start, n);
    return s < 0 ? !1 : (this.stack.push(this.index), this.yieldBuf(s));
  }
  /// Move the cursor to this node's first child. When this returns
  /// false, the node has no child, and the cursor has not been moved.
  firstChild() {
    return this.enterChild(
      1,
      0,
      4
      /* DontCare */
    );
  }
  /// Move the cursor to this node's last child.
  lastChild() {
    return this.enterChild(
      -1,
      0,
      4
      /* DontCare */
    );
  }
  /// Move the cursor to the first child that ends after `pos`.
  childAfter(e) {
    return this.enterChild(
      1,
      e,
      2
      /* After */
    );
  }
  /// Move to the last child that starts before `pos`.
  childBefore(e) {
    return this.enterChild(
      -1,
      e,
      -2
      /* Before */
    );
  }
  /// Move the cursor to the child around `pos`. If side is -1 the
  /// child may end at that position, when 1 it may start there. This
  /// will also enter [overlaid](#common.MountedTree.overlay)
  /// [mounted](#common.NodeProp^mounted) trees unless `overlays` is
  /// set to false.
  enter(e, t, n = !0, r = !0) {
    return this.buffer ? r ? this.enterChild(1, e, t) : !1 : this.yield(this._tree.enter(e, t, n && !(this.mode & 1), r));
  }
  /// Move to the node's parent node, if this isn't the top node.
  parent() {
    if (!this.buffer)
      return this.yieldNode(this.mode & 1 ? this._tree._parent : this._tree.parent);
    if (this.stack.length)
      return this.yieldBuf(this.stack.pop());
    let e = this.mode & 1 ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
    return this.buffer = null, this.yieldNode(e);
  }
  /// @internal
  sibling(e) {
    if (!this.buffer)
      return this._tree._parent ? this.yield(this._tree.index < 0 ? null : this._tree._parent.nextChild(this._tree.index + e, e, 0, 4, this.mode)) : !1;
    let { buffer: t } = this.buffer, n = this.stack.length - 1;
    if (e < 0) {
      let r = n < 0 ? 0 : this.stack[n] + 4;
      if (this.index != r)
        return this.yieldBuf(t.findChild(
          r,
          this.index,
          -1,
          0,
          4
          /* DontCare */
        ));
    } else {
      let r = t.buffer[this.index + 3];
      if (r < (n < 0 ? t.buffer.length : t.buffer[this.stack[n] + 3]))
        return this.yieldBuf(r);
    }
    return n < 0 ? this.yield(this.buffer.parent.nextChild(this.buffer.index + e, e, 0, 4, this.mode)) : !1;
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
    let t, n, { buffer: r } = this;
    if (r) {
      if (e > 0) {
        if (this.index < r.buffer.buffer.length)
          return !1;
      } else
        for (let s = 0; s < this.index; s++)
          if (r.buffer.buffer[s + 3] < this.index)
            return !1;
      ({ index: t, parent: n } = r);
    } else
      ({ index: t, _parent: n } = this._tree);
    for (; n; { index: t, _parent: n } = n)
      if (t > -1)
        for (let s = t + e, o = e < 0 ? -1 : n.node.children.length; s != o; s += e) {
          let a = n.node.children[s];
          if (this.mode & 1 || a instanceof Ai || !a.type.isAnonymous || ha(a))
            return !1;
        }
    return !0;
  }
  move(e, t) {
    if (t && this.enterChild(
      e,
      0,
      4
      /* DontCare */
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
  /// [pre-order](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order_(NLR))
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
    let e = this.bufferNode, t = null, n = 0;
    if (e && e.context == this.buffer) {
      e:
        for (let r = this.index, s = this.stack.length; s >= 0; ) {
          for (let o = e; o; o = o._parent)
            if (o.index == r) {
              if (r == this.index)
                return o;
              t = o, n = s + 1;
              break e;
            }
          r = this.stack[--s];
        }
    }
    for (let r = n; r < this.stack.length; r++)
      t = new jt(this.buffer, t, this.stack[r]);
    return this.bufferNode = new jt(this.buffer, t, this.index);
  }
  /// Get the [tree](#common.Tree) that represents the current node, if
  /// any. Will return null when the node is in a [tree
  /// buffer](#common.TreeBuffer).
  get tree() {
    return this.buffer ? null : this._tree.node;
  }
}
function ha(i) {
  return i.children.some((e) => e instanceof Ai || !e.type.isAnonymous || ha(e));
}
function CO(i) {
  var e;
  let { buffer: t, nodeSet: n, maxBufferLength: r = Wf, reused: s = [], minRepeatType: o = n.types.length } = i, a = Array.isArray(t) ? new la(t, t.length) : t, l = n.types, h = 0, c = 0;
  function u(Q, b, v, S, L) {
    let { id: x, start: B, end: D, size: Z } = a, X = c;
    for (; Z < 0; )
      if (a.next(), Z == -1) {
        let se = s[x];
        v.push(se), S.push(B - Q);
        return;
      } else if (Z == -3) {
        h = x;
        return;
      } else if (Z == -4) {
        c = x;
        return;
      } else
        throw new RangeError(`Unrecognized record size: ${Z}`);
    let H = l[x], U, V, ee = B - Q;
    if (D - B <= r && (V = p(a.pos - b, L))) {
      let se = new Uint16Array(V.size - V.skip), ce = a.pos - V.size, Be = se.length;
      for (; a.pos > ce; )
        Be = O(V.start, se, Be);
      U = new Ai(se, D - V.start, n), ee = V.start - Q;
    } else {
      let se = a.pos - Z;
      a.next();
      let ce = [], Be = [], Ke = x >= o ? x : -1, Ue = 0, yt = D;
      for (; a.pos > se; )
        Ke >= 0 && a.id == Ke && a.size >= 0 ? (a.end <= yt - r && (d(ce, Be, B, Ue, a.end, yt, Ke, X), Ue = ce.length, yt = a.end), a.next()) : u(B, se, ce, Be, Ke);
      if (Ke >= 0 && Ue > 0 && Ue < ce.length && d(ce, Be, B, Ue, B, yt, Ke, X), ce.reverse(), Be.reverse(), Ke > -1 && Ue > 0) {
        let it = f(H);
        U = ca(H, ce, Be, 0, ce.length, 0, D - B, it, it);
      } else
        U = g(H, ce, Be, D - B, X - D);
    }
    v.push(U), S.push(ee);
  }
  function f(Q) {
    return (b, v, S) => {
      let L = 0, x = b.length - 1, B, D;
      if (x >= 0 && (B = b[x]) instanceof re) {
        if (!x && B.type == Q && B.length == S)
          return B;
        (D = B.prop(M.lookAhead)) && (L = v[x] + B.length + D);
      }
      return g(Q, b, v, S, L);
    };
  }
  function d(Q, b, v, S, L, x, B, D) {
    let Z = [], X = [];
    for (; Q.length > S; )
      Z.push(Q.pop()), X.push(b.pop() + v - L);
    Q.push(g(n.types[B], Z, X, x - L, D - x)), b.push(L - v);
  }
  function g(Q, b, v, S, L = 0, x) {
    if (h) {
      let B = [M.contextHash, h];
      x = x ? [B].concat(x) : [B];
    }
    if (L > 25) {
      let B = [M.lookAhead, L];
      x = x ? [B].concat(x) : [B];
    }
    return new re(Q, b, v, S, x);
  }
  function p(Q, b) {
    let v = a.fork(), S = 0, L = 0, x = 0, B = v.end - r, D = { size: 0, start: 0, skip: 0 };
    e:
      for (let Z = v.pos - Q; v.pos > Z; ) {
        let X = v.size;
        if (v.id == b && X >= 0) {
          D.size = S, D.start = L, D.skip = x, x += 4, S += 4, v.next();
          continue;
        }
        let H = v.pos - X;
        if (X < 0 || H < Z || v.start < B)
          break;
        let U = v.id >= o ? 4 : 0, V = v.start;
        for (v.next(); v.pos > H; ) {
          if (v.size < 0)
            if (v.size == -3)
              U += 4;
            else
              break e;
          else
            v.id >= o && (U += 4);
          v.next();
        }
        L = V, S += X, x += U;
      }
    return (b < 0 || S == Q) && (D.size = S, D.start = L, D.skip = x), D.size > 4 ? D : void 0;
  }
  function O(Q, b, v) {
    let { id: S, start: L, end: x, size: B } = a;
    if (a.next(), B >= 0 && S < o) {
      let D = v;
      if (B > 4) {
        let Z = a.pos - (B - 4);
        for (; a.pos > Z; )
          v = O(Q, b, v);
      }
      b[--v] = D, b[--v] = x - Q, b[--v] = L - Q, b[--v] = S;
    } else
      B == -3 ? h = S : B == -4 && (c = S);
    return v;
  }
  let m = [], w = [];
  for (; a.pos > 0; )
    u(i.start || 0, i.bufferStart || 0, m, w, -1);
  let C = (e = i.length) !== null && e !== void 0 ? e : m.length ? w[0] + m[0].length : 0;
  return new re(l[i.topID], m.reverse(), w.reverse(), C);
}
const Rh = /* @__PURE__ */ new WeakMap();
function ar(i, e) {
  if (!i.isAnonymous || e instanceof Ai || e.type != i)
    return 1;
  let t = Rh.get(e);
  if (t == null) {
    t = 1;
    for (let n of e.children) {
      if (n.type != i || !(n instanceof re)) {
        t = 1;
        break;
      }
      t += ar(i, n);
    }
    Rh.set(e, t);
  }
  return t;
}
function ca(i, e, t, n, r, s, o, a, l) {
  let h = 0;
  for (let g = n; g < r; g++)
    h += ar(i, e[g]);
  let c = Math.ceil(
    h * 1.5 / 8
    /* BranchFactor */
  ), u = [], f = [];
  function d(g, p, O, m, w) {
    for (let C = O; C < m; ) {
      let Q = C, b = p[C], v = ar(i, g[C]);
      for (C++; C < m; C++) {
        let S = ar(i, g[C]);
        if (v + S >= c)
          break;
        v += S;
      }
      if (C == Q + 1) {
        if (v > c) {
          let S = g[Q];
          d(S.children, S.positions, 0, S.children.length, p[Q] + w);
          continue;
        }
        u.push(g[Q]);
      } else {
        let S = p[C - 1] + g[C - 1].length - b;
        u.push(ca(i, g, p, Q, C, b, S, null, l));
      }
      f.push(b + w - s);
    }
  }
  return d(e, t, n, r, 0), (a || l)(u, f, o);
}
class xt {
  /// Construct a tree fragment.
  constructor(e, t, n, r, s = !1, o = !1) {
    this.from = e, this.to = t, this.tree = n, this.offset = r, this.open = (s ? 1 : 0) | (o ? 2 : 0);
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
  static addTree(e, t = [], n = !1) {
    let r = [new xt(0, e.length, e, 0, !1, n)];
    for (let s of t)
      s.to > e.length && r.push(s);
    return r;
  }
  /// Apply a set of edits to an array of fragments, removing or
  /// splitting fragments as necessary to remove edited ranges, and
  /// adjusting offsets for fragments that moved.
  static applyChanges(e, t, n = 128) {
    if (!t.length)
      return e;
    let r = [], s = 1, o = e.length ? e[0] : null;
    for (let a = 0, l = 0, h = 0; ; a++) {
      let c = a < t.length ? t[a] : null, u = c ? c.fromA : 1e9;
      if (u - l >= n)
        for (; o && o.from < u; ) {
          let f = o;
          if (l >= f.from || u <= f.to || h) {
            let d = Math.max(f.from, l) - h, g = Math.min(f.to, u) - h;
            f = d >= g ? null : new xt(d, g, f.tree, f.offset + h, a > 0, !!c);
          }
          if (f && r.push(f), o.to > u)
            break;
          o = s < e.length ? e[s++] : null;
        }
      if (!c)
        break;
      l = c.toA, h = c.toA - c.toB;
    }
    return r;
  }
}
class jf {
  /// Start a parse, returning a [partial parse](#common.PartialParse)
  /// object. [`fragments`](#common.TreeFragment) can be passed in to
  /// make the parse incremental.
  ///
  /// By default, the entire input is parsed. You can pass `ranges`,
  /// which should be a sorted array of non-empty, non-overlapping
  /// ranges, to parse only those ranges. The tree returned in that
  /// case will start at `ranges[0].from`.
  startParse(e, t, n) {
    return typeof e == "string" && (e = new SO(e)), n = n ? n.length ? n.map((r) => new Ge(r.from, r.to)) : [new Ge(0, 0)] : [new Ge(0, e.length)], this.createParse(e, t || [], n);
  }
  /// Run a full parse, returning the resulting tree.
  parse(e, t, n) {
    let r = this.startParse(e, t, n);
    for (; ; ) {
      let s = r.advance();
      if (s)
        return s;
    }
  }
}
class SO {
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
function kO(i) {
  return (e, t, n, r) => new xO(e, i, t, n, r);
}
class Dh {
  constructor(e, t, n, r, s) {
    this.parser = e, this.parse = t, this.overlay = n, this.target = r, this.ranges = s;
  }
}
class EO {
  constructor(e, t, n, r, s, o, a) {
    this.parser = e, this.predicate = t, this.mounts = n, this.index = r, this.start = s, this.target = o, this.prev = a, this.depth = 0, this.ranges = [];
  }
}
const Do = new M({ perNode: !0 });
class xO {
  constructor(e, t, n, r, s) {
    this.nest = t, this.input = n, this.fragments = r, this.ranges = s, this.inner = [], this.innerDone = 0, this.baseTree = null, this.stoppedAt = null, this.baseParse = e;
  }
  advance() {
    if (this.baseParse) {
      let n = this.baseParse.advance();
      if (!n)
        return null;
      if (this.baseParse = null, this.baseTree = n, this.startInner(), this.stoppedAt != null)
        for (let r of this.inner)
          r.parse.stopAt(this.stoppedAt);
    }
    if (this.innerDone == this.inner.length) {
      let n = this.baseTree;
      return this.stoppedAt != null && (n = new re(n.type, n.children, n.positions, n.length, n.propValues.concat([[Do, this.stoppedAt]]))), n;
    }
    let e = this.inner[this.innerDone], t = e.parse.advance();
    if (t) {
      this.innerDone++;
      let n = Object.assign(/* @__PURE__ */ Object.create(null), e.target.props);
      n[M.mounted.id] = new yO(t, e.overlay, e.parser), e.target.props = n;
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
    let e = new TO(this.fragments), t = null, n = null, r = new Qn(
      new dt(this.baseTree, this.ranges[0].from, 0, null),
      1
      /* Full */
    );
    e:
      for (let s, o; this.stoppedAt == null || r.from < this.stoppedAt; ) {
        let a = !0, l;
        if (e.hasNode(r)) {
          if (t) {
            let h = t.mounts.find((c) => c.frag.from <= r.from && c.frag.to >= r.to && c.mount.overlay);
            if (h)
              for (let c of h.mount.overlay) {
                let u = c.from + h.pos, f = c.to + h.pos;
                u >= r.from && f <= r.to && !t.ranges.some((d) => d.from < f && d.to > u) && t.ranges.push({ from: u, to: f });
              }
          }
          a = !1;
        } else if (n && (o = BO(n.ranges, r.from, r.to)))
          a = o != 2;
        else if (!r.type.isAnonymous && r.from < r.to && (s = this.nest(r, this.input))) {
          r.tree || IO(r);
          let h = e.findMounts(r.from, s.parser);
          if (typeof s.overlay == "function")
            t = new EO(s.parser, s.overlay, h, this.inner.length, r.from, r.tree, t);
          else {
            let c = Mh(this.ranges, s.overlay || [new Ge(r.from, r.to)]);
            c.length && this.inner.push(new Dh(s.parser, s.parser.startParse(this.input, Xh(h, c), c), s.overlay ? s.overlay.map((u) => new Ge(u.from - r.from, u.to - r.from)) : null, r.tree, c)), s.overlay ? c.length && (n = { ranges: c, depth: 0, prev: n }) : a = !1;
          }
        } else
          t && (l = t.predicate(r)) && (l === !0 && (l = new Ge(r.from, r.to)), l.from < l.to && t.ranges.push(l));
        if (a && r.firstChild())
          t && t.depth++, n && n.depth++;
        else
          for (; !r.nextSibling(); ) {
            if (!r.parent())
              break e;
            if (t && !--t.depth) {
              let h = Mh(this.ranges, t.ranges);
              h.length && this.inner.splice(t.index, 0, new Dh(t.parser, t.parser.startParse(this.input, Xh(t.mounts, h), h), t.ranges.map((c) => new Ge(c.from - t.start, c.to - t.start)), t.target, h)), t = t.prev;
            }
            n && !--n.depth && (n = n.prev);
          }
      }
  }
}
function BO(i, e, t) {
  for (let n of i) {
    if (n.from >= t)
      break;
    if (n.to > e)
      return n.from <= e && n.to >= t ? 2 : 1;
  }
  return 0;
}
function Lh(i, e, t, n, r, s) {
  if (e < t) {
    let o = i.buffer[e + 1], a = i.buffer[t - 2];
    n.push(i.slice(e, t, o, a)), r.push(o - s);
  }
}
function IO(i) {
  let { node: e } = i, t = 0;
  do
    i.parent(), t++;
  while (!i.tree);
  let n = 0, r = i.tree, s = 0;
  for (; s = r.positions[n] + i.from, !(s <= e.from && s + r.children[n].length >= e.to); n++)
    ;
  let o = r.children[n], a = o.buffer;
  function l(h, c, u, f, d) {
    let g = h;
    for (; a[g + 2] + s <= e.from; )
      g = a[g + 3];
    let p = [], O = [];
    Lh(o, h, g, p, O, f);
    let m = a[g + 1], w = a[g + 2], C = m + s == e.from && w + s == e.to && a[g] == e.type.id;
    return p.push(C ? e.toTree() : l(g + 4, a[g + 3], o.set.types[a[g]], m, w - m)), O.push(m - f), Lh(o, a[g + 3], c, p, O, f), new re(u, p, O, d);
  }
  r.children[n] = l(0, a.length, Le.none, 0, o.length);
  for (let h = 0; h <= t; h++)
    i.childAfter(e.from);
}
class Wh {
  constructor(e, t) {
    this.offset = t, this.done = !1, this.cursor = e.fullCursor();
  }
  // Move to the first node (in pre-order) that starts at or after `pos`.
  moveTo(e) {
    let { cursor: t } = this, n = e - this.offset;
    for (; !this.done && t.from < n; )
      t.to >= e && t.enter(n, 1, !1, !1) || t.next(!1) || (this.done = !0);
  }
  hasNode(e) {
    if (this.moveTo(e.from), !this.done && this.cursor.from + this.offset == e.from && this.cursor.tree)
      for (let t = this.cursor.tree; ; ) {
        if (t == e.tree)
          return !0;
        if (t.children.length && t.positions[0] == 0 && t.children[0] instanceof re)
          t = t.children[0];
        else
          break;
      }
    return !1;
  }
}
let TO = class {
  constructor(e) {
    var t;
    if (this.fragments = e, this.curTo = 0, this.fragI = 0, e.length) {
      let n = this.curFrag = e[0];
      this.curTo = (t = n.tree.prop(Do)) !== null && t !== void 0 ? t : n.to, this.inner = new Wh(n.tree, -n.offset);
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
      this.curTo = (e = t.tree.prop(Do)) !== null && e !== void 0 ? e : t.to, this.inner = new Wh(t.tree, -t.offset);
    }
  }
  findMounts(e, t) {
    var n;
    let r = [];
    if (this.inner) {
      this.inner.cursor.moveTo(e, 1);
      for (let s = this.inner.cursor.node; s; s = s.parent) {
        let o = (n = s.tree) === null || n === void 0 ? void 0 : n.prop(M.mounted);
        if (o && o.parser == t)
          for (let a = this.fragI; a < this.fragments.length; a++) {
            let l = this.fragments[a];
            if (l.from >= s.to)
              break;
            l.tree == this.curFrag.tree && r.push({
              frag: l,
              pos: s.from - l.offset,
              mount: o
            });
          }
      }
    }
    return r;
  }
};
function Mh(i, e) {
  let t = null, n = e;
  for (let r = 1, s = 0; r < i.length; r++) {
    let o = i[r - 1].to, a = i[r].from;
    for (; s < n.length; s++) {
      let l = n[s];
      if (l.from >= a)
        break;
      l.to <= o || (t || (n = t = e.slice()), l.from < o ? (t[s] = new Ge(l.from, o), l.to > a && t.splice(s + 1, 0, new Ge(a, l.to))) : l.to > a ? t[s--] = new Ge(a, l.to) : t.splice(s--, 1));
    }
  }
  return n;
}
function PO(i, e, t, n) {
  let r = 0, s = 0, o = !1, a = !1, l = -1e9, h = [];
  for (; ; ) {
    let c = r == i.length ? 1e9 : o ? i[r].to : i[r].from, u = s == e.length ? 1e9 : a ? e[s].to : e[s].from;
    if (o != a) {
      let f = Math.max(l, t), d = Math.min(c, u, n);
      f < d && h.push(new Ge(f, d));
    }
    if (l = Math.min(c, u), l == 1e9)
      break;
    c == l && (o ? (o = !1, r++) : o = !0), u == l && (a ? (a = !1, s++) : a = !0);
  }
  return h;
}
function Xh(i, e) {
  let t = [];
  for (let { pos: n, mount: r, frag: s } of i) {
    let o = n + (r.overlay ? r.overlay[0].from : 0), a = o + r.tree.length, l = Math.max(s.from, o), h = Math.min(s.to, a);
    if (r.overlay) {
      let c = r.overlay.map((f) => new Ge(f.from + n, f.to + n)), u = PO(e, c, l, h);
      for (let f = 0, d = l; ; f++) {
        let g = f == u.length, p = g ? h : u[f].from;
        if (p > d && t.push(new xt(d, p, r.tree, -o, s.from >= d, s.to <= p)), g)
          break;
        d = u[f].to;
      }
    } else
      t.push(new xt(l, h, r.tree, -o, s.from >= o, s.to <= a));
  }
  return t;
}
var Bs;
const Sr = /* @__PURE__ */ new M();
function RO(i) {
  return P.define({
    combine: i ? (e) => e.concat(i) : void 0
  });
}
class ut {
  /**
  Construct a language object. You usually don't need to invoke
  this directly. But when you do, make sure you use
  [`defineLanguageFacet`](https://codemirror.net/6/docs/ref/#language.defineLanguageFacet) to create
  the first argument.
  */
  constructor(e, t, n, r = []) {
    this.data = e, this.topNode = n, Y.prototype.hasOwnProperty("tree") || Object.defineProperty(Y.prototype, "tree", { get() {
      return he(this);
    } }), this.parser = t, this.extension = [
      Yt.of(this),
      Y.languageData.of((s, o, a) => s.facet(jh(s, o, a)))
    ].concat(r);
  }
  /**
  Query whether this language is active at the given position.
  */
  isActiveAt(e, t, n = -1) {
    return jh(e, t, n) == this.data;
  }
  /**
  Find the document regions that were parsed using this language.
  The returned regions will _include_ any nested languages rooted
  in this language, when those exist.
  */
  findRegions(e) {
    let t = e.facet(Yt);
    if ((t == null ? void 0 : t.data) == this.data)
      return [{ from: 0, to: e.doc.length }];
    if (!t || !t.allowsNesting)
      return [];
    let n = [], r = (s, o) => {
      if (s.prop(Sr) == this.data) {
        n.push({ from: o, to: o + s.length });
        return;
      }
      let a = s.prop(M.mounted);
      if (a) {
        if (a.tree.prop(Sr) == this.data) {
          if (a.overlay)
            for (let l of a.overlay)
              n.push({ from: l.from + o, to: l.to + o });
          else
            n.push({ from: o, to: o + s.length });
          return;
        } else if (a.overlay) {
          let l = n.length;
          if (r(a.tree, a.overlay[0].from + o), n.length > l)
            return;
        }
      }
      for (let l = 0; l < s.children.length; l++) {
        let h = s.children[l];
        h instanceof re && r(h, s.positions[l] + o);
      }
    };
    return r(he(e), 0), n;
  }
  /**
  Indicates whether this language allows nested languages. The
  default implementation returns true.
  */
  get allowsNesting() {
    return !0;
  }
}
ut.setState = /* @__PURE__ */ W.define();
function jh(i, e, t) {
  let n = i.facet(Yt);
  if (!n)
    return null;
  let r = n.data;
  if (n.allowsNesting)
    for (let s = he(i).topNode; s; s = s.enter(e, t, !0, !1))
      r = s.type.prop(Sr) || r;
  return r;
}
class Ti extends ut {
  constructor(e, t) {
    super(e, t, t.topNode), this.parser = t;
  }
  /**
  Define a language from a parser.
  */
  static define(e) {
    let t = RO(e.languageData);
    return new Ti(t, e.parser.configure({
      props: [Sr.add((n) => n.isTop ? t : void 0)]
    }));
  }
  /**
  Create a new instance of this language with a reconfigured
  version of its parser.
  */
  configure(e) {
    return new Ti(this.data, this.parser.configure(e));
  }
  get allowsNesting() {
    return this.parser.wrappers.length > 0;
  }
  // FIXME
}
function he(i) {
  let e = i.field(ut.state, !1);
  return e ? e.tree : re.empty;
}
class DO {
  constructor(e, t = e.length) {
    this.doc = e, this.length = t, this.cursorPos = 0, this.string = "", this.cursor = e.iter();
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
    let n = this.cursorPos - this.string.length;
    return e < n || t >= this.cursorPos ? this.doc.sliceString(e, t) : this.string.slice(e - n, t - n);
  }
}
let Hi = null;
class ua {
  /**
  @internal
  */
  constructor(e, t, n = [], r, s, o, a, l) {
    this.parser = e, this.state = t, this.fragments = n, this.tree = r, this.treeLen = s, this.viewport = o, this.skipped = a, this.scheduleOn = l, this.parse = null, this.tempSkipped = [];
  }
  startParse() {
    return this.parser.startParse(new DO(this.state.doc), this.fragments);
  }
  /**
  @internal
  */
  work(e, t) {
    return t != null && t >= this.state.doc.length && (t = void 0), this.tree != re.empty && this.isDone(t ?? this.state.doc.length) ? (this.takeTree(), !0) : this.withContext(() => {
      var n;
      if (typeof e == "number") {
        let r = Date.now() + e;
        e = () => Date.now() > r;
      }
      for (this.parse || (this.parse = this.startParse()), t != null && (this.parse.stoppedAt == null || this.parse.stoppedAt > t) && t < this.state.doc.length && this.parse.stopAt(t); ; ) {
        let r = this.parse.advance();
        if (r)
          if (this.fragments = this.withoutTempSkipped(xt.addTree(r, this.fragments, this.parse.stoppedAt != null)), this.treeLen = (n = this.parse.stoppedAt) !== null && n !== void 0 ? n : this.state.doc.length, this.tree = r, this.parse = null, this.treeLen < (t ?? this.state.doc.length))
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
    }), this.treeLen = e, this.tree = t, this.fragments = this.withoutTempSkipped(xt.addTree(this.tree, this.fragments, !0)), this.parse = null);
  }
  withContext(e) {
    let t = Hi;
    Hi = this;
    try {
      return e();
    } finally {
      Hi = t;
    }
  }
  withoutTempSkipped(e) {
    for (let t; t = this.tempSkipped.pop(); )
      e = Zh(e, t.from, t.to);
    return e;
  }
  /**
  @internal
  */
  changes(e, t) {
    let { fragments: n, tree: r, treeLen: s, viewport: o, skipped: a } = this;
    if (this.takeTree(), !e.empty) {
      let l = [];
      if (e.iterChangedRanges((h, c, u, f) => l.push({ fromA: h, toA: c, fromB: u, toB: f })), n = xt.applyChanges(n, l), r = re.empty, s = 0, o = { from: e.mapPos(o.from, -1), to: e.mapPos(o.to, 1) }, this.skipped.length) {
        a = [];
        for (let h of this.skipped) {
          let c = e.mapPos(h.from, 1), u = e.mapPos(h.to, -1);
          c < u && a.push({ from: c, to: u });
        }
      }
    }
    return new ua(this.parser, t, n, r, s, o, a, this.scheduleOn);
  }
  /**
  @internal
  */
  updateViewport(e) {
    if (this.viewport.from == e.from && this.viewport.to == e.to)
      return !1;
    this.viewport = e;
    let t = this.skipped.length;
    for (let n = 0; n < this.skipped.length; n++) {
      let { from: r, to: s } = this.skipped[n];
      r < e.to && s > e.from && (this.fragments = Zh(this.fragments, r, s), this.skipped.splice(n--, 1));
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
    return new class extends jf {
      createParse(t, n, r) {
        let s = r[0].from, o = r[r.length - 1].to;
        return {
          parsedPos: s,
          advance() {
            let l = Hi;
            if (l) {
              for (let h of r)
                l.tempSkipped.push(h);
              e && (l.scheduleOn = l.scheduleOn ? Promise.all([l.scheduleOn, e]) : e);
            }
            return this.parsedPos = o, new re(Le.none, [], [], o - s);
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
    return Hi;
  }
}
function Zh(i, e, t) {
  return xt.applyChanges(i, [{ fromA: e, toA: t, fromB: e, toB: t }]);
}
class Pi {
  constructor(e) {
    this.context = e, this.tree = e.tree;
  }
  apply(e) {
    if (!e.docChanged && this.tree == this.context.tree)
      return this;
    let t = this.context.changes(e.changes, e.state), n = this.context.treeLen == e.startState.doc.length ? void 0 : Math.max(e.changes.mapPos(this.context.treeLen), t.viewport.to);
    return t.work(20, n) || t.takeTree(), new Pi(t);
  }
  static init(e) {
    let t = Math.min(3e3, e.doc.length), n = new ua(e.facet(Yt).parser, e, [], re.empty, 0, { from: 0, to: t }, [], null);
    return n.work(20, t) || n.takeTree(), new Pi(n);
  }
}
ut.state = /* @__PURE__ */ Oe.define({
  create: Pi.init,
  update(i, e) {
    for (let t of e.effects)
      if (t.is(ut.setState))
        return t.value;
    return e.startState.facet(Yt) != e.state.facet(Yt) ? Pi.init(e.state) : i.apply(e);
  }
});
let Zf = (i) => {
  let e = setTimeout(
    () => i(),
    500
    /* MaxPause */
  );
  return () => clearTimeout(e);
};
typeof requestIdleCallback < "u" && (Zf = (i) => {
  let e = -1, t = setTimeout(
    () => {
      e = requestIdleCallback(i, {
        timeout: 500 - 100
        /* MinPause */
      });
    },
    100
    /* MinPause */
  );
  return () => e < 0 ? clearTimeout(t) : cancelIdleCallback(e);
});
const Is = typeof navigator < "u" && (!((Bs = navigator.scheduling) === null || Bs === void 0) && Bs.isInputPending) ? () => navigator.scheduling.isInputPending() : null, LO = /* @__PURE__ */ le.fromClass(class {
  constructor(e) {
    this.view = e, this.working = null, this.workScheduled = 0, this.chunkEnd = -1, this.chunkBudget = -1, this.work = this.work.bind(this), this.scheduleWork();
  }
  update(e) {
    let t = this.view.state.field(ut.state).context;
    (t.updateViewport(e.view.viewport) || this.view.viewport.to > t.treeLen) && this.scheduleWork(), e.docChanged && (this.view.hasFocus && (this.chunkBudget += 50), this.scheduleWork()), this.checkAsyncSchedule(t);
  }
  scheduleWork() {
    if (this.working)
      return;
    let { state: e } = this.view, t = e.field(ut.state);
    (t.tree != t.context.tree || !t.context.isDone(e.doc.length)) && (this.working = Zf(this.work));
  }
  work(e) {
    this.working = null;
    let t = Date.now();
    if (this.chunkEnd < t && (this.chunkEnd < 0 || this.view.hasFocus) && (this.chunkEnd = t + 3e4, this.chunkBudget = 3e3), this.chunkBudget <= 0)
      return;
    let { state: n, viewport: { to: r } } = this.view, s = n.field(ut.state);
    if (s.tree == s.context.tree && s.context.isDone(
      r + 1e5
      /* MaxParseAhead */
    ))
      return;
    let o = Date.now() + Math.min(this.chunkBudget, 100, e && !Is ? Math.max(25, e.timeRemaining() - 5) : 1e9), a = s.context.treeLen < r && n.doc.length > r + 1e3, l = s.context.work(() => Is && Is() || Date.now() > o, r + (a ? 0 : 1e5));
    this.chunkBudget -= Date.now() - t, (l || this.chunkBudget <= 0) && (s.context.takeTree(), this.view.dispatch({ effects: ut.setState.of(new Pi(s.context)) })), this.chunkBudget > 0 && !(l && !a) && this.scheduleWork(), this.checkAsyncSchedule(s.context);
  }
  checkAsyncSchedule(e) {
    e.scheduleOn && (this.workScheduled++, e.scheduleOn.then(() => this.scheduleWork()).catch((t) => Ne(this.view.state, t)).then(() => this.workScheduled--), e.scheduleOn = null);
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
}), Yt = /* @__PURE__ */ P.define({
  combine(i) {
    return i.length ? i[0] : null;
  },
  enables: [ut.state, LO]
});
class fa {
  /**
  Create a support object.
  */
  constructor(e, t = []) {
    this.language = e, this.support = t, this.extension = [e, t];
  }
}
const WO = /* @__PURE__ */ P.define(), Kr = /* @__PURE__ */ P.define({
  combine: (i) => {
    if (!i.length)
      return "  ";
    if (!/^(?: +|\t+)$/.test(i[0]))
      throw new Error("Invalid indent unit: " + JSON.stringify(i[0]));
    return i[0];
  }
});
function kr(i) {
  let e = i.facet(Kr);
  return e.charCodeAt(0) == 9 ? i.tabSize * e.length : e.length;
}
function bn(i, e) {
  let t = "", n = i.tabSize;
  if (i.facet(Kr).charCodeAt(0) == 9)
    for (; e >= n; )
      t += "	", e -= n;
  for (let r = 0; r < e; r++)
    t += " ";
  return t;
}
function da(i, e) {
  i instanceof Y && (i = new $r(i));
  for (let n of i.state.facet(WO)) {
    let r = n(i, e);
    if (r != null)
      return r;
  }
  let t = he(i.state);
  return t ? MO(i, t, e) : null;
}
class $r {
  /**
  Create an indent context.
  */
  constructor(e, t = {}) {
    this.state = e, this.options = t, this.unit = kr(e);
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
    let n = this.state.doc.lineAt(e), { simulateBreak: r, simulateDoubleBreak: s } = this.options;
    return r != null && r >= n.from && r <= n.to ? s && r == e ? { text: "", from: e } : (t < 0 ? r < e : r <= e) ? { text: n.text.slice(r - n.from), from: r } : { text: n.text.slice(0, r - n.from), from: n.from } : n;
  }
  /**
  Get the text directly after `pos`, either the entire line
  or the next 100 characters, whichever is shorter.
  */
  textAfterPos(e, t = 1) {
    if (this.options.simulateDoubleBreak && e == this.options.simulateBreak)
      return "";
    let { text: n, from: r } = this.lineAt(e, t);
    return n.slice(e - r, Math.min(n.length, e + 100 - r));
  }
  /**
  Find the column for the given position.
  */
  column(e, t = 1) {
    let { text: n, from: r } = this.lineAt(e, t), s = this.countColumn(n, e - r), o = this.options.overrideIndentation ? this.options.overrideIndentation(r) : -1;
    return o > -1 && (s += o - this.countColumn(n, n.search(/\S|$/))), s;
  }
  /**
  Find the column position (taking tabs into account) of the given
  position in the given string.
  */
  countColumn(e, t = e.length) {
    return kn(e, this.state.tabSize, t);
  }
  /**
  Find the indentation column of the line at the given point.
  */
  lineIndent(e, t = 1) {
    let { text: n, from: r } = this.lineAt(e, t), s = this.options.overrideIndentation;
    if (s) {
      let o = s(r);
      if (o > -1)
        return o;
    }
    return this.countColumn(n, n.search(/\S|$/));
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
const _r = /* @__PURE__ */ new M();
function MO(i, e, t) {
  return Nf(e.resolveInner(t).enterUnfinishedNodesBefore(t), t, i);
}
function XO(i) {
  return i.pos == i.options.simulateBreak && i.options.simulateDoubleBreak;
}
function jO(i) {
  let e = i.type.prop(_r);
  if (e)
    return e;
  let t = i.firstChild, n;
  if (t && (n = t.type.prop(M.closedBy))) {
    let r = i.lastChild, s = r && n.indexOf(r.name) > -1;
    return (o) => zf(o, !0, 1, void 0, s && !XO(o) ? r.from : void 0);
  }
  return i.parent == null ? ZO : null;
}
function Nf(i, e, t) {
  for (; i; i = i.parent) {
    let n = jO(i);
    if (n)
      return n(new NO(t, e, i));
  }
  return null;
}
function ZO() {
  return 0;
}
class NO extends $r {
  /**
  @internal
  */
  constructor(e, t, n) {
    super(e.state, e.options), this.base = e, this.pos = t, this.node = n;
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
    let e = this.state.doc.lineAt(this.node.from);
    for (; ; ) {
      let t = this.node.resolve(e.from);
      for (; t.parent && t.parent.from == t.from; )
        t = t.parent;
      if (zO(t, this.node))
        break;
      e = this.state.doc.lineAt(t.from);
    }
    return this.lineIndent(e.from);
  }
  /**
  Continue looking for indentations in the node's parent nodes,
  and return the result of that.
  */
  continue() {
    let e = this.node.parent;
    return e ? Nf(e, this.pos, this.base) : 0;
  }
}
function zO(i, e) {
  for (let t = e; t; t = t.parent)
    if (i == t)
      return !0;
  return !1;
}
function UO(i) {
  let e = i.node, t = e.childAfter(e.from), n = e.lastChild;
  if (!t)
    return null;
  let r = i.options.simulateBreak, s = i.state.doc.lineAt(t.from), o = r == null || r <= s.from ? s.to : Math.min(s.to, r);
  for (let a = t.to; ; ) {
    let l = e.childAfter(a);
    if (!l || l == n)
      return null;
    if (!l.type.isSkipped)
      return l.from < o ? t : null;
    a = l.to;
  }
}
function VO({ closing: i, align: e = !0, units: t = 1 }) {
  return (n) => zf(n, e, t, i);
}
function zf(i, e, t, n, r) {
  let s = i.textAfter, o = s.match(/^\s*/)[0].length, a = n && s.slice(o, o + n.length) == n || r == i.pos + o, l = e ? UO(i) : null;
  return l ? a ? i.column(l.from) : i.column(l.to) : i.baseIndent + (a ? 0 : i.unit * t);
}
const YO = (i) => i.baseIndent;
function lr({ except: i, units: e = 1 } = {}) {
  return (t) => {
    let n = i && i.test(t.textAfter);
    return t.baseIndent + (n ? 0 : e * t.unit);
  };
}
const qO = 200;
function GO() {
  return Y.transactionFilter.of((i) => {
    if (!i.docChanged || !i.isUserEvent("input.type") && !i.isUserEvent("input.complete"))
      return i;
    let e = i.startState.languageDataAt("indentOnInput", i.startState.selection.main.head);
    if (!e.length)
      return i;
    let t = i.newDoc, { head: n } = i.newSelection.main, r = t.lineAt(n);
    if (n > r.from + qO)
      return i;
    let s = t.sliceString(r.from, n);
    if (!e.some((h) => h.test(s)))
      return i;
    let { state: o } = i, a = -1, l = [];
    for (let { head: h } of o.selection.ranges) {
      let c = o.doc.lineAt(h);
      if (c.from == a)
        continue;
      a = c.from;
      let u = da(o, c.from);
      if (u == null)
        continue;
      let f = /^\s*/.exec(c.text)[0], d = bn(o, u);
      f != d && l.push({ from: c.from, to: c.from + f.length, insert: d });
    }
    return l.length ? [i, { changes: l, sequential: !0 }] : i;
  });
}
const FO = /* @__PURE__ */ P.define(), es = /* @__PURE__ */ new M();
function Uf(i) {
  let e = i.firstChild, t = i.lastChild;
  return e && e.to < t.from ? { from: e.to, to: t.type.isError ? i.to : t.from } : null;
}
function HO(i, e, t) {
  let n = he(i);
  if (n.length == 0)
    return null;
  let r = n.resolveInner(t), s = null;
  for (let o = r; o; o = o.parent) {
    if (o.to <= t || o.from > t)
      continue;
    if (s && o.from < e)
      break;
    let a = o.type.prop(es);
    if (a && (o.to < n.length - 50 || n.length == i.doc.length || !JO(o))) {
      let l = a(o, i);
      l && l.from <= t && l.from >= e && l.to > t && (s = l);
    }
  }
  return s;
}
function JO(i) {
  let e = i.lastChild;
  return e && e.to == i.to && e.type.isError;
}
function Er(i, e, t) {
  for (let n of i.facet(FO)) {
    let r = n(i, e, t);
    if (r)
      return r;
  }
  return HO(i, e, t);
}
class Bt extends li {
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
Bt.prototype.elementClass = "";
Bt.prototype.toDOM = void 0;
Bt.prototype.mapMode = be.TrackBefore;
Bt.prototype.startSide = Bt.prototype.endSide = -1;
Bt.prototype.point = !0;
const hr = /* @__PURE__ */ P.define(), KO = {
  class: "",
  renderEmptyElements: !1,
  elementStyle: "",
  markers: () => F.empty,
  lineMarker: () => null,
  lineMarkerChange: null,
  initialSpacer: null,
  updateSpacer: null,
  domEventHandlers: {}
}, hn = /* @__PURE__ */ P.define();
function $O(i) {
  return [Vf(), hn.of(Object.assign(Object.assign({}, KO), i))];
}
const _O = /* @__PURE__ */ I.baseTheme({
  ".cm-gutters": {
    display: "flex",
    height: "100%",
    boxSizing: "border-box",
    left: 0,
    zIndex: 200
  },
  "&light .cm-gutters": {
    backgroundColor: "#f5f5f5",
    color: "#999",
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
  }
}), Lo = /* @__PURE__ */ P.define({
  combine: (i) => i.some((e) => e)
});
function Vf(i) {
  let e = [
    em,
    _O
  ];
  return i && i.fixed === !1 && e.push(Lo.of(!0)), e;
}
const em = /* @__PURE__ */ le.fromClass(class {
  constructor(i) {
    this.view = i, this.prevViewport = i.viewport, this.dom = document.createElement("div"), this.dom.className = "cm-gutters", this.dom.setAttribute("aria-hidden", "true"), this.dom.style.minHeight = this.view.contentHeight + "px", this.gutters = i.state.facet(hn).map((e) => new zh(i, e));
    for (let e of this.gutters)
      this.dom.appendChild(e.dom);
    this.fixed = !i.state.facet(Lo), this.fixed && (this.dom.style.position = "sticky"), this.syncGutters(!1), i.scrollDOM.insertBefore(this.dom, i.contentDOM);
  }
  update(i) {
    if (this.updateGutters(i)) {
      let e = this.prevViewport, t = i.view.viewport, n = Math.min(e.to, t.to) - Math.max(e.from, t.from);
      this.syncGutters(n < (t.to - t.from) * 0.8);
    }
    i.geometryChanged && (this.dom.style.minHeight = this.view.contentHeight + "px"), this.view.state.facet(Lo) != !this.fixed && (this.fixed = !this.fixed, this.dom.style.position = this.fixed ? "sticky" : ""), this.prevViewport = i.view.viewport;
  }
  syncGutters(i) {
    let e = this.dom.nextSibling;
    i && this.dom.remove();
    let t = F.iter(this.view.state.facet(hr), this.view.viewport.from), n = [], r = this.gutters.map((s) => new tm(s, this.view.viewport, -this.view.documentPadding.top));
    for (let s of this.view.viewportLineBlocks) {
      let o;
      if (Array.isArray(s.type)) {
        for (let a of s.type)
          if (a.type == J.Text) {
            o = a;
            break;
          }
      } else
        o = s.type == J.Text ? s : void 0;
      if (o) {
        n.length && (n = []), Yf(t, n, s.from);
        for (let a of r)
          a.line(this.view, o, n);
      }
    }
    for (let s of r)
      s.finish();
    i && this.view.scrollDOM.insertBefore(this.dom, e);
  }
  updateGutters(i) {
    let e = i.startState.facet(hn), t = i.state.facet(hn), n = i.docChanged || i.heightChanged || i.viewportChanged || !F.eq(i.startState.facet(hr), i.state.facet(hr), i.view.viewport.from, i.view.viewport.to);
    if (e == t)
      for (let r of this.gutters)
        r.update(i) && (n = !0);
    else {
      n = !0;
      let r = [];
      for (let s of t) {
        let o = e.indexOf(s);
        o < 0 ? r.push(new zh(this.view, s)) : (this.gutters[o].update(i), r.push(this.gutters[o]));
      }
      for (let s of this.gutters)
        s.dom.remove(), r.indexOf(s) < 0 && s.destroy();
      for (let s of r)
        this.dom.appendChild(s.dom);
      this.gutters = r;
    }
    return n;
  }
  destroy() {
    for (let i of this.gutters)
      i.destroy();
    this.dom.remove();
  }
}, {
  provide: /* @__PURE__ */ ve.scrollMargins.from((i) => i.gutters.length == 0 || !i.fixed ? null : i.view.textDirection == q.LTR ? { left: i.dom.offsetWidth } : { right: i.dom.offsetWidth })
});
function Nh(i) {
  return Array.isArray(i) ? i : [i];
}
function Yf(i, e, t) {
  for (; i.value && i.from <= t; )
    i.from == t && e.push(i.value), i.next();
}
class tm {
  constructor(e, t, n) {
    this.gutter = e, this.height = n, this.localMarkers = [], this.i = 0, this.cursor = F.iter(e.markers, t.from);
  }
  line(e, t, n) {
    this.localMarkers.length && (this.localMarkers = []), Yf(this.cursor, this.localMarkers, t.from);
    let r = n.length ? this.localMarkers.concat(n) : this.localMarkers, s = this.gutter.config.lineMarker(e, t, r);
    s && r.unshift(s);
    let o = this.gutter;
    if (r.length == 0 && !o.config.renderEmptyElements)
      return;
    let a = t.top - this.height;
    if (this.i == o.elements.length) {
      let l = new qf(e, t.height, a, r);
      o.elements.push(l), o.dom.appendChild(l.dom);
    } else
      o.elements[this.i].update(e, t.height, a, r);
    this.height = t.bottom, this.i++;
  }
  finish() {
    let e = this.gutter;
    for (; e.elements.length > this.i; ) {
      let t = e.elements.pop();
      e.dom.removeChild(t.dom), t.destroy();
    }
  }
}
class zh {
  constructor(e, t) {
    this.view = e, this.config = t, this.elements = [], this.spacer = null, this.dom = document.createElement("div"), this.dom.className = "cm-gutter" + (this.config.class ? " " + this.config.class : "");
    for (let n in t.domEventHandlers)
      this.dom.addEventListener(n, (r) => {
        let s = e.lineBlockAtHeight(r.clientY - e.documentTop);
        t.domEventHandlers[n](e, s, r) && r.preventDefault();
      });
    this.markers = Nh(t.markers(e)), t.initialSpacer && (this.spacer = new qf(e, 0, 0, [t.initialSpacer(e)]), this.dom.appendChild(this.spacer.dom), this.spacer.dom.style.cssText += "visibility: hidden; pointer-events: none");
  }
  update(e) {
    let t = this.markers;
    if (this.markers = Nh(this.config.markers(e.view)), this.spacer && this.config.updateSpacer) {
      let r = this.config.updateSpacer(this.spacer.markers[0], e);
      r != this.spacer.markers[0] && this.spacer.update(e.view, 0, 0, [r]);
    }
    let n = e.view.viewport;
    return !F.eq(this.markers, t, n.from, n.to) || (this.config.lineMarkerChange ? this.config.lineMarkerChange(e) : !1);
  }
  destroy() {
    for (let e of this.elements)
      e.destroy();
  }
}
class qf {
  constructor(e, t, n, r) {
    this.height = -1, this.above = 0, this.markers = [], this.dom = document.createElement("div"), this.update(e, t, n, r);
  }
  update(e, t, n, r) {
    this.height != t && (this.dom.style.height = (this.height = t) + "px"), this.above != n && (this.dom.style.marginTop = (this.above = n) ? n + "px" : ""), im(this.markers, r) || this.setMarkers(e, r);
  }
  setMarkers(e, t) {
    let n = "cm-gutterElement", r = this.dom.firstChild;
    for (let s = 0, o = 0; ; ) {
      let a = o, l = s < t.length ? t[s++] : null, h = !1;
      if (l) {
        let c = l.elementClass;
        c && (n += " " + c);
        for (let u = o; u < this.markers.length; u++)
          if (this.markers[u].compare(l)) {
            a = u, h = !0;
            break;
          }
      } else
        a = this.markers.length;
      for (; o < a; ) {
        let c = this.markers[o++];
        if (c.toDOM) {
          c.destroy(r);
          let u = r.nextSibling;
          r.remove(), r = u;
        }
      }
      if (!l)
        break;
      l.toDOM && (h ? r = r.nextSibling : this.dom.insertBefore(l.toDOM(e), r)), h && o++;
    }
    this.dom.className = n, this.markers = t;
  }
  destroy() {
    this.setMarkers(null, []);
  }
}
function im(i, e) {
  if (i.length != e.length)
    return !1;
  for (let t = 0; t < i.length; t++)
    if (!i[t].compare(e[t]))
      return !1;
  return !0;
}
const nm = /* @__PURE__ */ P.define(), vi = /* @__PURE__ */ P.define({
  combine(i) {
    return Gt(i, { formatNumber: String, domEventHandlers: {} }, {
      domEventHandlers(e, t) {
        let n = Object.assign({}, e);
        for (let r in t) {
          let s = n[r], o = t[r];
          n[r] = s ? (a, l, h) => s(a, l, h) || o(a, l, h) : o;
        }
        return n;
      }
    });
  }
});
class Ts extends Bt {
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
function Ps(i, e) {
  return i.state.facet(vi).formatNumber(e, i.state);
}
const rm = /* @__PURE__ */ hn.compute([vi], (i) => ({
  class: "cm-lineNumbers",
  renderEmptyElements: !1,
  markers(e) {
    return e.state.facet(nm);
  },
  lineMarker(e, t, n) {
    return n.some((r) => r.toDOM) ? null : new Ts(Ps(e, e.state.doc.lineAt(t.from).number));
  },
  lineMarkerChange: (e) => e.startState.facet(vi) != e.state.facet(vi),
  initialSpacer(e) {
    return new Ts(Ps(e, Uh(e.state.doc.lines)));
  },
  updateSpacer(e, t) {
    let n = Ps(t.view, Uh(t.view.state.doc.lines));
    return n == e.number ? e : new Ts(n);
  },
  domEventHandlers: i.facet(vi).domEventHandlers
}));
function sm(i = {}) {
  return [
    vi.of(i),
    Vf(),
    rm
  ];
}
function Uh(i) {
  let e = 9;
  for (; e < i; )
    e = e * 10 + 9;
  return e;
}
const om = /* @__PURE__ */ new class extends Bt {
  constructor() {
    super(...arguments), this.elementClass = "cm-activeLineGutter";
  }
}(), am = /* @__PURE__ */ hr.compute(["selection"], (i) => {
  let e = [], t = -1;
  for (let n of i.selection.ranges)
    if (n.empty) {
      let r = i.doc.lineAt(n.head).from;
      r > t && (t = r, e.push(om.range(r)));
    }
  return F.of(e);
});
function lm() {
  return am;
}
function Gf(i, e) {
  let t = e.mapPos(i.from, 1), n = e.mapPos(i.to, -1);
  return t >= n ? void 0 : { from: t, to: n };
}
const ts = /* @__PURE__ */ W.define({ map: Gf }), In = /* @__PURE__ */ W.define({ map: Gf });
function Ff(i) {
  let e = [];
  for (let { head: t } of i.state.selection.ranges)
    e.some((n) => n.from <= t && n.to >= t) || e.push(i.lineBlockAt(t));
  return e;
}
const ci = /* @__PURE__ */ Oe.define({
  create() {
    return T.none;
  },
  update(i, e) {
    i = i.map(e.changes);
    for (let t of e.effects)
      t.is(ts) && !hm(i, t.value.from, t.value.to) ? i = i.update({ add: [pm.range(t.value.from, t.value.to)] }) : t.is(In) && (i = i.update({
        filter: (n, r) => t.value.from != n || t.value.to != r,
        filterFrom: t.value.from,
        filterTo: t.value.to
      }));
    if (e.selection) {
      let t = !1, { head: n } = e.selection.main;
      i.between(n, n, (r, s) => {
        r < n && s > n && (t = !0);
      }), t && (i = i.update({
        filterFrom: n,
        filterTo: n,
        filter: (r, s) => s <= n || r >= n
      }));
    }
    return i;
  },
  provide: (i) => I.decorations.from(i)
});
function xr(i, e, t) {
  var n;
  let r = null;
  return (n = i.field(ci, !1)) === null || n === void 0 || n.between(e, t, (s, o) => {
    (!r || r.from > s) && (r = { from: s, to: o });
  }), r;
}
function hm(i, e, t) {
  let n = !1;
  return i.between(e, e, (r, s) => {
    r == e && s == t && (n = !0);
  }), n;
}
function Hf(i, e) {
  return i.field(ci, !1) ? e : e.concat(W.appendConfig.of($f()));
}
const cm = (i) => {
  for (let e of Ff(i)) {
    let t = Er(i.state, e.from, e.to);
    if (t)
      return i.dispatch({ effects: Hf(i.state, [ts.of(t), Jf(i, t)]) }), !0;
  }
  return !1;
}, um = (i) => {
  if (!i.state.field(ci, !1))
    return !1;
  let e = [];
  for (let t of Ff(i)) {
    let n = xr(i.state, t.from, t.to);
    n && e.push(In.of(n), Jf(i, n, !1));
  }
  return e.length && i.dispatch({ effects: e }), e.length > 0;
};
function Jf(i, e, t = !0) {
  let n = i.state.doc.lineAt(e.from).number, r = i.state.doc.lineAt(e.to).number;
  return I.announce.of(`${i.state.phrase(t ? "Folded lines" : "Unfolded lines")} ${n} ${i.state.phrase("to")} ${r}.`);
}
const fm = (i) => {
  let { state: e } = i, t = [];
  for (let n = 0; n < e.doc.length; ) {
    let r = i.lineBlockAt(n), s = Er(e, r.from, r.to);
    s && t.push(ts.of(s)), n = (s ? i.lineBlockAt(s.to) : r).to + 1;
  }
  return t.length && i.dispatch({ effects: Hf(i.state, t) }), !!t.length;
}, dm = (i) => {
  let e = i.state.field(ci, !1);
  if (!e || !e.size)
    return !1;
  let t = [];
  return e.between(0, i.state.doc.length, (n, r) => {
    t.push(In.of({ from: n, to: r }));
  }), i.dispatch({ effects: t }), !0;
}, gm = [
  { key: "Ctrl-Shift-[", mac: "Cmd-Alt-[", run: cm },
  { key: "Ctrl-Shift-]", mac: "Cmd-Alt-]", run: um },
  { key: "Ctrl-Alt-[", run: fm },
  { key: "Ctrl-Alt-]", run: dm }
], Am = {
  placeholderDOM: null,
  placeholderText: "…"
}, Kf = /* @__PURE__ */ P.define({
  combine(i) {
    return Gt(i, Am);
  }
});
function $f(i) {
  let e = [ci, Qm];
  return i && e.push(Kf.of(i)), e;
}
const pm = /* @__PURE__ */ T.replace({ widget: /* @__PURE__ */ new class extends Ot {
  toDOM(i) {
    let { state: e } = i, t = e.facet(Kf), n = (s) => {
      let o = i.lineBlockAt(i.posAtDOM(s.target)), a = xr(i.state, o.from, o.to);
      a && i.dispatch({ effects: In.of(a) }), s.preventDefault();
    };
    if (t.placeholderDOM)
      return t.placeholderDOM(i, n);
    let r = document.createElement("span");
    return r.textContent = t.placeholderText, r.setAttribute("aria-label", e.phrase("folded code")), r.title = e.phrase("unfold"), r.className = "cm-foldPlaceholder", r.onclick = n, r;
  }
}() }), Om = {
  openText: "⌄",
  closedText: "›",
  markerDOM: null,
  domEventHandlers: {}
};
class Rs extends Bt {
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
function mm(i = {}) {
  let e = Object.assign(Object.assign({}, Om), i), t = new Rs(e, !0), n = new Rs(e, !1), r = le.fromClass(class {
    constructor(o) {
      this.from = o.viewport.from, this.markers = this.buildMarkers(o);
    }
    update(o) {
      (o.docChanged || o.viewportChanged || o.startState.facet(Yt) != o.state.facet(Yt) || o.startState.field(ci, !1) != o.state.field(ci, !1) || he(o.startState) != he(o.state)) && (this.markers = this.buildMarkers(o.view));
    }
    buildMarkers(o) {
      let a = new zt();
      for (let l of o.viewportLineBlocks) {
        let h = xr(o.state, l.from, l.to) ? n : Er(o.state, l.from, l.to) ? t : null;
        h && a.add(l.from, l.from, h);
      }
      return a.finish();
    }
  }), { domEventHandlers: s } = e;
  return [
    r,
    $O({
      class: "cm-foldGutter",
      markers(o) {
        var a;
        return ((a = o.plugin(r)) === null || a === void 0 ? void 0 : a.markers) || F.empty;
      },
      initialSpacer() {
        return new Rs(e, !1);
      },
      domEventHandlers: Object.assign(Object.assign({}, s), { click: (o, a, l) => {
        if (s.click && s.click(o, a, l))
          return !0;
        let h = xr(o.state, a.from, a.to);
        if (h)
          return o.dispatch({ effects: In.of(h) }), !0;
        let c = Er(o.state, a.from, a.to);
        return c ? (o.dispatch({ effects: ts.of(c) }), !0) : !1;
      } })
    }),
    $f()
  ];
}
const Qm = /* @__PURE__ */ I.baseTheme({
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
}), bm = /* @__PURE__ */ I.baseTheme({
  "&.cm-focused .cm-matchingBracket": { backgroundColor: "#328c8252" },
  "&.cm-focused .cm-nonmatchingBracket": { backgroundColor: "#bb555544" }
}), _f = 1e4, ed = "()[]{}", td = /* @__PURE__ */ P.define({
  combine(i) {
    return Gt(i, {
      afterCursor: !0,
      brackets: ed,
      maxScanDistance: _f
    });
  }
}), ym = /* @__PURE__ */ T.mark({ class: "cm-matchingBracket" }), wm = /* @__PURE__ */ T.mark({ class: "cm-nonmatchingBracket" }), vm = /* @__PURE__ */ Oe.define({
  create() {
    return T.none;
  },
  update(i, e) {
    if (!e.docChanged && !e.selection)
      return i;
    let t = [], n = e.state.facet(td);
    for (let r of e.state.selection.ranges) {
      if (!r.empty)
        continue;
      let s = ft(e.state, r.head, -1, n) || r.head > 0 && ft(e.state, r.head - 1, 1, n) || n.afterCursor && (ft(e.state, r.head, 1, n) || r.head < e.state.doc.length && ft(e.state, r.head + 1, -1, n));
      if (!s)
        continue;
      let o = s.matched ? ym : wm;
      t.push(o.range(s.start.from, s.start.to)), s.end && t.push(o.range(s.end.from, s.end.to));
    }
    return T.set(t, !0);
  },
  provide: (i) => I.decorations.from(i)
}), Cm = [
  vm,
  bm
];
function Sm(i = {}) {
  return [td.of(i), Cm];
}
function Wo(i, e, t) {
  let n = i.prop(e < 0 ? M.openedBy : M.closedBy);
  if (n)
    return n;
  if (i.name.length == 1) {
    let r = t.indexOf(i.name);
    if (r > -1 && r % 2 == (e < 0 ? 1 : 0))
      return [t[r + e]];
  }
  return null;
}
function ft(i, e, t, n = {}) {
  let r = n.maxScanDistance || _f, s = n.brackets || ed, o = he(i), a = o.resolveInner(e, t);
  for (let l = a; l; l = l.parent) {
    let h = Wo(l.type, t, s);
    if (h && l.from < l.to)
      return km(i, e, t, l, h, s);
  }
  return Em(i, e, t, o, a.type, r, s);
}
function km(i, e, t, n, r, s) {
  let o = n.parent, a = { from: n.from, to: n.to }, l = 0, h = o == null ? void 0 : o.cursor;
  if (h && (t < 0 ? h.childBefore(n.from) : h.childAfter(n.to)))
    do
      if (t < 0 ? h.to <= n.from : h.from >= n.to) {
        if (l == 0 && r.indexOf(h.type.name) > -1 && h.from < h.to)
          return { start: a, end: { from: h.from, to: h.to }, matched: !0 };
        if (Wo(h.type, t, s))
          l++;
        else if (Wo(h.type, -t, s) && (l--, l == 0))
          return {
            start: a,
            end: h.from == h.to ? void 0 : { from: h.from, to: h.to },
            matched: !1
          };
      }
    while (t < 0 ? h.prevSibling() : h.nextSibling());
  return { start: a, matched: !1 };
}
function Em(i, e, t, n, r, s, o) {
  let a = t < 0 ? i.sliceDoc(e - 1, e) : i.sliceDoc(e, e + 1), l = o.indexOf(a);
  if (l < 0 || l % 2 == 0 != t > 0)
    return null;
  let h = { from: t < 0 ? e - 1 : e, to: t > 0 ? e + 1 : e }, c = i.doc.iterRange(e, t > 0 ? i.doc.length : 0), u = 0;
  for (let f = 0; !c.next().done && f <= s; ) {
    let d = c.value;
    t < 0 && (f += d.length);
    let g = e + f * t;
    for (let p = t > 0 ? 0 : d.length - 1, O = t > 0 ? d.length : -1; p != O; p += t) {
      let m = o.indexOf(d[p]);
      if (!(m < 0 || n.resolve(g + p, 1).type != r))
        if (m % 2 == 0 == t > 0)
          u++;
        else {
          if (u == 1)
            return { start: h, end: { from: g + p, to: g + p + 1 }, matched: m >> 1 == l >> 1 };
          u--;
        }
    }
    t > 0 && (f += d.length);
  }
  return c.done ? { start: h, matched: !1 } : null;
}
function Ui(i, e) {
  return y.create(i.ranges.map(e), i.mainIndex);
}
function mt(i, e) {
  return i.update({ selection: e, scrollIntoView: !0, userEvent: "select" });
}
function It({ state: i, dispatch: e }, t) {
  let n = Ui(i.selection, t);
  return n.eq(i.selection) ? !1 : (e(mt(i, n)), !0);
}
function is(i, e) {
  return y.cursor(e ? i.to : i.from);
}
function id(i, e) {
  return It(i, (t) => t.empty ? i.moveByChar(t, e) : is(t, e));
}
const nd = (i) => id(i, i.textDirection != q.LTR), rd = (i) => id(i, i.textDirection == q.LTR);
function sd(i, e) {
  return It(i, (t) => t.empty ? i.moveByGroup(t, e) : is(t, e));
}
const xm = (i) => sd(i, i.textDirection != q.LTR), Bm = (i) => sd(i, i.textDirection == q.LTR);
function Im(i, e, t) {
  if (e.type.prop(t))
    return !0;
  let n = e.to - e.from;
  return n && (n > 2 || /[^\s,.;:]/.test(i.sliceDoc(e.from, e.to))) || e.firstChild;
}
function ns(i, e, t) {
  let n = he(i).resolveInner(e.head), r = t ? M.closedBy : M.openedBy;
  for (let l = e.head; ; ) {
    let h = t ? n.childAfter(l) : n.childBefore(l);
    if (!h)
      break;
    Im(i, h, r) ? n = h : l = t ? h.to : h.from;
  }
  let s = n.type.prop(r), o, a;
  return s && (o = t ? ft(i, n.from, 1) : ft(i, n.to, -1)) && o.matched ? a = t ? o.end.to : o.end.from : a = t ? n.to : n.from, y.cursor(a, t ? -1 : 1);
}
const Tm = (i) => It(i, (e) => ns(i.state, e, i.textDirection != q.LTR)), Pm = (i) => It(i, (e) => ns(i.state, e, i.textDirection == q.LTR));
function od(i, e) {
  return It(i, (t) => {
    if (!t.empty)
      return is(t, e);
    let n = i.moveVertically(t, e);
    return n.head != t.head ? n : i.moveToLineBoundary(t, e);
  });
}
const ad = (i) => od(i, !1), ld = (i) => od(i, !0);
function hd(i, e) {
  let { state: t } = i, n = Ui(t.selection, (o) => o.empty ? i.moveVertically(o, e, i.dom.clientHeight) : is(o, e));
  if (n.eq(t.selection))
    return !1;
  let r = i.coordsAtPos(t.selection.main.head), s = i.scrollDOM.getBoundingClientRect();
  return i.dispatch(mt(t, n), {
    effects: r && r.top > s.top && r.bottom < s.bottom ? I.scrollIntoView(n.main.head, { y: "start", yMargin: r.top - s.top }) : void 0
  }), !0;
}
const Vh = (i) => hd(i, !1), Mo = (i) => hd(i, !0);
function rs(i, e, t) {
  let n = i.lineBlockAt(e.head), r = i.moveToLineBoundary(e, t);
  if (r.head == e.head && r.head != (t ? n.to : n.from) && (r = i.moveToLineBoundary(e, t, !1)), !t && r.head == n.from && n.length) {
    let s = /^\s*/.exec(i.state.sliceDoc(n.from, Math.min(n.from + 100, n.to)))[0].length;
    s && e.head != n.from + s && (r = y.cursor(n.from + s));
  }
  return r;
}
const Yh = (i) => It(i, (e) => rs(i, e, !0)), qh = (i) => It(i, (e) => rs(i, e, !1)), Rm = (i) => It(i, (e) => y.cursor(i.lineBlockAt(e.head).from, 1)), Dm = (i) => It(i, (e) => y.cursor(i.lineBlockAt(e.head).to, -1));
function Lm(i, e, t) {
  let n = !1, r = Ui(i.selection, (s) => {
    let o = ft(i, s.head, -1) || ft(i, s.head, 1) || s.head > 0 && ft(i, s.head - 1, 1) || s.head < i.doc.length && ft(i, s.head + 1, -1);
    if (!o || !o.end)
      return s;
    n = !0;
    let a = o.start.from == s.head ? o.end.to : o.end.from;
    return t ? y.range(s.anchor, a) : y.cursor(a);
  });
  return n ? (e(mt(i, r)), !0) : !1;
}
const Wm = ({ state: i, dispatch: e }) => Lm(i, e, !1);
function Qt(i, e) {
  let t = Ui(i.state.selection, (n) => {
    let r = e(n);
    return y.range(n.anchor, r.head, r.goalColumn);
  });
  return t.eq(i.state.selection) ? !1 : (i.dispatch(mt(i.state, t)), !0);
}
function cd(i, e) {
  return Qt(i, (t) => i.moveByChar(t, e));
}
const ud = (i) => cd(i, i.textDirection != q.LTR), fd = (i) => cd(i, i.textDirection == q.LTR);
function dd(i, e) {
  return Qt(i, (t) => i.moveByGroup(t, e));
}
const Mm = (i) => dd(i, i.textDirection != q.LTR), Xm = (i) => dd(i, i.textDirection == q.LTR), jm = (i) => Qt(i, (e) => ns(i.state, e, i.textDirection != q.LTR)), Zm = (i) => Qt(i, (e) => ns(i.state, e, i.textDirection == q.LTR));
function gd(i, e) {
  return Qt(i, (t) => i.moveVertically(t, e));
}
const Ad = (i) => gd(i, !1), pd = (i) => gd(i, !0);
function Od(i, e) {
  return Qt(i, (t) => i.moveVertically(t, e, i.dom.clientHeight));
}
const Gh = (i) => Od(i, !1), Fh = (i) => Od(i, !0), Hh = (i) => Qt(i, (e) => rs(i, e, !0)), Jh = (i) => Qt(i, (e) => rs(i, e, !1)), Nm = (i) => Qt(i, (e) => y.cursor(i.lineBlockAt(e.head).from)), zm = (i) => Qt(i, (e) => y.cursor(i.lineBlockAt(e.head).to)), Kh = ({ state: i, dispatch: e }) => (e(mt(i, { anchor: 0 })), !0), $h = ({ state: i, dispatch: e }) => (e(mt(i, { anchor: i.doc.length })), !0), _h = ({ state: i, dispatch: e }) => (e(mt(i, { anchor: i.selection.main.anchor, head: 0 })), !0), ec = ({ state: i, dispatch: e }) => (e(mt(i, { anchor: i.selection.main.anchor, head: i.doc.length })), !0), Um = ({ state: i, dispatch: e }) => (e(i.update({ selection: { anchor: 0, head: i.doc.length }, userEvent: "select" })), !0), Vm = ({ state: i, dispatch: e }) => {
  let t = as(i).map(({ from: n, to: r }) => y.range(n, Math.min(r + 1, i.doc.length)));
  return e(i.update({ selection: y.create(t), userEvent: "select" })), !0;
}, Ym = ({ state: i, dispatch: e }) => {
  let t = Ui(i.selection, (n) => {
    var r;
    let s = he(i).resolveInner(n.head, 1);
    for (; !(s.from < n.from && s.to >= n.to || s.to > n.to && s.from <= n.from || !(!((r = s.parent) === null || r === void 0) && r.parent)); )
      s = s.parent;
    return y.range(s.to, s.from);
  });
  return e(mt(i, t)), !0;
}, qm = ({ state: i, dispatch: e }) => {
  let t = i.selection, n = null;
  return t.ranges.length > 1 ? n = y.create([t.main]) : t.main.empty || (n = y.create([y.cursor(t.main.head)])), n ? (e(mt(i, n)), !0) : !1;
};
function ss({ state: i, dispatch: e }, t) {
  if (i.readOnly)
    return !1;
  let n = "delete.selection", r = i.changeByRange((s) => {
    let { from: o, to: a } = s;
    if (o == a) {
      let l = t(o);
      l < o ? n = "delete.backward" : l > o && (n = "delete.forward"), o = Math.min(o, l), a = Math.max(a, l);
    }
    return o == a ? { range: s } : { changes: { from: o, to: a }, range: y.cursor(o) };
  });
  return r.changes.empty ? !1 : (e(i.update(r, { scrollIntoView: !0, userEvent: n })), !0);
}
function os(i, e, t) {
  if (i instanceof I)
    for (let n of i.pluginField(ve.atomicRanges))
      n.between(e, e, (r, s) => {
        r < e && s > e && (e = t ? s : r);
      });
  return e;
}
const md = (i, e) => ss(i, (t) => {
  let { state: n } = i, r = n.doc.lineAt(t), s, o;
  if (!e && t > r.from && t < r.from + 200 && !/[^ \t]/.test(s = r.text.slice(0, t - r.from))) {
    if (s[s.length - 1] == "	")
      return t - 1;
    let a = kn(s, n.tabSize), l = a % kr(n) || kr(n);
    for (let h = 0; h < l && s[s.length - 1 - h] == " "; h++)
      t--;
    o = t;
  } else
    o = je(r.text, t - r.from, e, e) + r.from, o == t && r.number != (e ? n.doc.lines : 1) && (o += e ? 1 : -1);
  return os(i, o, e);
}), Xo = (i) => md(i, !1), Qd = (i) => md(i, !0), bd = (i, e) => ss(i, (t) => {
  let n = t, { state: r } = i, s = r.doc.lineAt(n), o = r.charCategorizer(n);
  for (let a = null; ; ) {
    if (n == (e ? s.to : s.from)) {
      n == t && s.number != (e ? r.doc.lines : 1) && (n += e ? 1 : -1);
      break;
    }
    let l = je(s.text, n - s.from, e) + s.from, h = s.text.slice(Math.min(n, l) - s.from, Math.max(n, l) - s.from), c = o(h);
    if (a != null && c != a)
      break;
    (h != " " || n != t) && (a = c), n = l;
  }
  return os(i, n, e);
}), yd = (i) => bd(i, !1), Gm = (i) => bd(i, !0), wd = (i) => ss(i, (e) => {
  let t = i.lineBlockAt(e).to;
  return os(i, e < t ? t : Math.min(i.state.doc.length, e + 1), !0);
}), Fm = (i) => ss(i, (e) => {
  let t = i.lineBlockAt(e).from;
  return os(i, e > t ? t : Math.max(0, e - 1), !1);
}), Hm = ({ state: i, dispatch: e }) => {
  if (i.readOnly)
    return !1;
  let t = i.changeByRange((n) => ({
    changes: { from: n.from, to: n.to, insert: G.of(["", ""]) },
    range: y.cursor(n.from)
  }));
  return e(i.update(t, { scrollIntoView: !0, userEvent: "input" })), !0;
}, Jm = ({ state: i, dispatch: e }) => {
  if (i.readOnly)
    return !1;
  let t = i.changeByRange((n) => {
    if (!n.empty || n.from == 0 || n.from == i.doc.length)
      return { range: n };
    let r = n.from, s = i.doc.lineAt(r), o = r == s.from ? r - 1 : je(s.text, r - s.from, !1) + s.from, a = r == s.to ? r + 1 : je(s.text, r - s.from, !0) + s.from;
    return {
      changes: { from: o, to: a, insert: i.doc.slice(r, a).append(i.doc.slice(o, r)) },
      range: y.cursor(a)
    };
  });
  return t.changes.empty ? !1 : (e(i.update(t, { scrollIntoView: !0, userEvent: "move.character" })), !0);
};
function as(i) {
  let e = [], t = -1;
  for (let n of i.selection.ranges) {
    let r = i.doc.lineAt(n.from), s = i.doc.lineAt(n.to);
    if (!n.empty && n.to == s.from && (s = i.doc.lineAt(n.to - 1)), t >= r.number) {
      let o = e[e.length - 1];
      o.to = s.to, o.ranges.push(n);
    } else
      e.push({ from: r.from, to: s.to, ranges: [n] });
    t = s.number + 1;
  }
  return e;
}
function vd(i, e, t) {
  if (i.readOnly)
    return !1;
  let n = [], r = [];
  for (let s of as(i)) {
    if (t ? s.to == i.doc.length : s.from == 0)
      continue;
    let o = i.doc.lineAt(t ? s.to + 1 : s.from - 1), a = o.length + 1;
    if (t) {
      n.push({ from: s.to, to: o.to }, { from: s.from, insert: o.text + i.lineBreak });
      for (let l of s.ranges)
        r.push(y.range(Math.min(i.doc.length, l.anchor + a), Math.min(i.doc.length, l.head + a)));
    } else {
      n.push({ from: o.from, to: s.from }, { from: s.to, insert: i.lineBreak + o.text });
      for (let l of s.ranges)
        r.push(y.range(l.anchor - a, l.head - a));
    }
  }
  return n.length ? (e(i.update({
    changes: n,
    scrollIntoView: !0,
    selection: y.create(r, i.selection.mainIndex),
    userEvent: "move.line"
  })), !0) : !1;
}
const Km = ({ state: i, dispatch: e }) => vd(i, e, !1), $m = ({ state: i, dispatch: e }) => vd(i, e, !0);
function Cd(i, e, t) {
  if (i.readOnly)
    return !1;
  let n = [];
  for (let r of as(i))
    t ? n.push({ from: r.from, insert: i.doc.slice(r.from, r.to) + i.lineBreak }) : n.push({ from: r.to, insert: i.lineBreak + i.doc.slice(r.from, r.to) });
  return e(i.update({ changes: n, scrollIntoView: !0, userEvent: "input.copyline" })), !0;
}
const _m = ({ state: i, dispatch: e }) => Cd(i, e, !1), eQ = ({ state: i, dispatch: e }) => Cd(i, e, !0), tQ = (i) => {
  if (i.state.readOnly)
    return !1;
  let { state: e } = i, t = e.changes(as(e).map(({ from: r, to: s }) => (r > 0 ? r-- : s < e.doc.length && s++, { from: r, to: s }))), n = Ui(e.selection, (r) => i.moveVertically(r, !0)).map(t);
  return i.dispatch({ changes: t, selection: n, scrollIntoView: !0, userEvent: "delete.line" }), !0;
};
function iQ(i, e) {
  if (/\(\)|\[\]|\{\}/.test(i.sliceDoc(e - 1, e + 1)))
    return { from: e, to: e };
  let t = he(i).resolveInner(e), n = t.childBefore(e), r = t.childAfter(e), s;
  return n && r && n.to <= e && r.from >= e && (s = n.type.prop(M.closedBy)) && s.indexOf(r.name) > -1 && i.doc.lineAt(n.to).from == i.doc.lineAt(r.from).from ? { from: n.to, to: r.from } : null;
}
const nQ = /* @__PURE__ */ Sd(!1), rQ = /* @__PURE__ */ Sd(!0);
function Sd(i) {
  return ({ state: e, dispatch: t }) => {
    if (e.readOnly)
      return !1;
    let n = e.changeByRange((r) => {
      let { from: s, to: o } = r, a = e.doc.lineAt(s), l = !i && s == o && iQ(e, s);
      i && (s = o = (o <= a.to ? a : e.doc.lineAt(o)).to);
      let h = new $r(e, { simulateBreak: s, simulateDoubleBreak: !!l }), c = da(h, s);
      for (c == null && (c = /^\s*/.exec(e.doc.lineAt(s).text)[0].length); o < a.to && /\s/.test(a.text[o - a.from]); )
        o++;
      l ? { from: s, to: o } = l : s > a.from && s < a.from + 100 && !/\S/.test(a.text.slice(0, s)) && (s = a.from);
      let u = ["", bn(e, c)];
      return l && u.push(bn(e, h.lineIndent(a.from, -1))), {
        changes: { from: s, to: o, insert: G.of(u) },
        range: y.cursor(s + 1 + u[1].length)
      };
    });
    return t(e.update(n, { scrollIntoView: !0, userEvent: "input" })), !0;
  };
}
function ga(i, e) {
  let t = -1;
  return i.changeByRange((n) => {
    let r = [];
    for (let o = n.from; o <= n.to; ) {
      let a = i.doc.lineAt(o);
      a.number > t && (n.empty || n.to > a.from) && (e(a, r, n), t = a.number), o = a.to + 1;
    }
    let s = i.changes(r);
    return {
      changes: r,
      range: y.range(s.mapPos(n.anchor, 1), s.mapPos(n.head, 1))
    };
  });
}
const sQ = ({ state: i, dispatch: e }) => {
  if (i.readOnly)
    return !1;
  let t = /* @__PURE__ */ Object.create(null), n = new $r(i, { overrideIndentation: (s) => {
    let o = t[s];
    return o ?? -1;
  } }), r = ga(i, (s, o, a) => {
    let l = da(n, s.from);
    if (l == null)
      return;
    /\S/.test(s.text) || (l = 0);
    let h = /^\s*/.exec(s.text)[0], c = bn(i, l);
    (h != c || a.from < s.from + h.length) && (t[s.from] = l, o.push({ from: s.from, to: s.from + h.length, insert: c }));
  });
  return r.changes.empty || e(i.update(r, { userEvent: "indent" })), !0;
}, kd = ({ state: i, dispatch: e }) => i.readOnly ? !1 : (e(i.update(ga(i, (t, n) => {
  n.push({ from: t.from, insert: i.facet(Kr) });
}), { userEvent: "input.indent" })), !0), Ed = ({ state: i, dispatch: e }) => i.readOnly ? !1 : (e(i.update(ga(i, (t, n) => {
  let r = /^\s*/.exec(t.text)[0];
  if (!r)
    return;
  let s = kn(r, i.tabSize), o = 0, a = bn(i, Math.max(0, s - kr(i)));
  for (; o < r.length && o < a.length && r.charCodeAt(o) == a.charCodeAt(o); )
    o++;
  n.push({ from: t.from + o, to: t.from + r.length, insert: a.slice(o) });
}), { userEvent: "delete.dedent" })), !0), oQ = [
  { key: "Ctrl-b", run: nd, shift: ud, preventDefault: !0 },
  { key: "Ctrl-f", run: rd, shift: fd },
  { key: "Ctrl-p", run: ad, shift: Ad },
  { key: "Ctrl-n", run: ld, shift: pd },
  { key: "Ctrl-a", run: Rm, shift: Nm },
  { key: "Ctrl-e", run: Dm, shift: zm },
  { key: "Ctrl-d", run: Qd },
  { key: "Ctrl-h", run: Xo },
  { key: "Ctrl-k", run: wd },
  { key: "Ctrl-Alt-h", run: yd },
  { key: "Ctrl-o", run: Hm },
  { key: "Ctrl-t", run: Jm },
  { key: "Ctrl-v", run: Mo }
], aQ = /* @__PURE__ */ [
  { key: "ArrowLeft", run: nd, shift: ud, preventDefault: !0 },
  { key: "Mod-ArrowLeft", mac: "Alt-ArrowLeft", run: xm, shift: Mm },
  { mac: "Cmd-ArrowLeft", run: qh, shift: Jh },
  { key: "ArrowRight", run: rd, shift: fd, preventDefault: !0 },
  { key: "Mod-ArrowRight", mac: "Alt-ArrowRight", run: Bm, shift: Xm },
  { mac: "Cmd-ArrowRight", run: Yh, shift: Hh },
  { key: "ArrowUp", run: ad, shift: Ad, preventDefault: !0 },
  { mac: "Cmd-ArrowUp", run: Kh, shift: _h },
  { mac: "Ctrl-ArrowUp", run: Vh, shift: Gh },
  { key: "ArrowDown", run: ld, shift: pd, preventDefault: !0 },
  { mac: "Cmd-ArrowDown", run: $h, shift: ec },
  { mac: "Ctrl-ArrowDown", run: Mo, shift: Fh },
  { key: "PageUp", run: Vh, shift: Gh },
  { key: "PageDown", run: Mo, shift: Fh },
  { key: "Home", run: qh, shift: Jh },
  { key: "Mod-Home", run: Kh, shift: _h },
  { key: "End", run: Yh, shift: Hh },
  { key: "Mod-End", run: $h, shift: ec },
  { key: "Enter", run: nQ },
  { key: "Mod-a", run: Um },
  { key: "Backspace", run: Xo, shift: Xo },
  { key: "Delete", run: Qd },
  { key: "Mod-Backspace", mac: "Alt-Backspace", run: yd },
  { key: "Mod-Delete", mac: "Alt-Delete", run: Gm },
  { mac: "Mod-Backspace", run: Fm },
  { mac: "Mod-Delete", run: wd }
].concat(/* @__PURE__ */ oQ.map((i) => ({ mac: i.key, run: i.run, shift: i.shift }))), lQ = /* @__PURE__ */ [
  { key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: Tm, shift: jm },
  { key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: Pm, shift: Zm },
  { key: "Alt-ArrowUp", run: Km },
  { key: "Shift-Alt-ArrowUp", run: _m },
  { key: "Alt-ArrowDown", run: $m },
  { key: "Shift-Alt-ArrowDown", run: eQ },
  { key: "Escape", run: qm },
  { key: "Mod-Enter", run: rQ },
  { key: "Alt-l", mac: "Ctrl-l", run: Vm },
  { key: "Mod-i", run: Ym, preventDefault: !0 },
  { key: "Mod-[", run: Ed },
  { key: "Mod-]", run: kd },
  { key: "Mod-Alt-\\", run: sQ },
  { key: "Shift-Mod-k", run: tQ },
  { key: "Shift-Mod-\\", run: Wm }
].concat(aQ), hQ = { key: "Tab", run: kd, shift: Ed }, Br = {
  brackets: ["(", "[", "{", "'", '"'],
  before: ")]}:;>"
}, ii = /* @__PURE__ */ W.define({
  map(i, e) {
    let t = e.mapPos(i, -1, be.TrackAfter);
    return t ?? void 0;
  }
}), Aa = /* @__PURE__ */ W.define({
  map(i, e) {
    return e.mapPos(i);
  }
}), pa = /* @__PURE__ */ new class extends li {
}();
pa.startSide = 1;
pa.endSide = -1;
const xd = /* @__PURE__ */ Oe.define({
  create() {
    return F.empty;
  },
  update(i, e) {
    if (e.selection) {
      let t = e.state.doc.lineAt(e.selection.main.head).from, n = e.startState.doc.lineAt(e.startState.selection.main.head).from;
      t != e.changes.mapPos(n, -1) && (i = F.empty);
    }
    i = i.map(e.changes);
    for (let t of e.effects)
      t.is(ii) ? i = i.update({ add: [pa.range(t.value, t.value + 1)] }) : t.is(Aa) && (i = i.update({ filter: (n) => n != t.value }));
    return i;
  }
});
function cQ() {
  return [fQ, xd];
}
const Ds = "()[]{}<>";
function Bd(i) {
  for (let e = 0; e < Ds.length; e += 2)
    if (Ds.charCodeAt(e) == i)
      return Ds.charAt(e + 1);
  return $o(i < 128 ? i : i + 1);
}
function Id(i, e) {
  return i.languageDataAt("closeBrackets", e)[0] || Br;
}
const uQ = typeof navigator == "object" && /* @__PURE__ */ /Android\b/.test(navigator.userAgent), fQ = /* @__PURE__ */ I.inputHandler.of((i, e, t, n) => {
  if ((uQ ? i.composing : i.compositionStarted) || i.state.readOnly)
    return !1;
  let r = i.state.selection.main;
  if (n.length > 2 || n.length == 2 && Ye(we(n, 0)) == 1 || e != r.from || t != r.to)
    return !1;
  let s = AQ(i.state, n);
  return s ? (i.dispatch(s), !0) : !1;
}), dQ = ({ state: i, dispatch: e }) => {
  if (i.readOnly)
    return !1;
  let n = Id(i, i.selection.main.head).brackets || Br.brackets, r = null, s = i.changeByRange((o) => {
    if (o.empty) {
      let a = pQ(i.doc, o.head);
      for (let l of n)
        if (l == a && ls(i.doc, o.head) == Bd(we(l, 0)))
          return {
            changes: { from: o.head - l.length, to: o.head + l.length },
            range: y.cursor(o.head - l.length),
            userEvent: "delete.backward"
          };
    }
    return { range: r = o };
  });
  return r || e(i.update(s, { scrollIntoView: !0 })), !r;
}, gQ = [
  { key: "Backspace", run: dQ }
];
function AQ(i, e) {
  let t = Id(i, i.selection.main.head), n = t.brackets || Br.brackets;
  for (let r of n) {
    let s = Bd(we(r, 0));
    if (e == r)
      return s == r ? QQ(i, r, n.indexOf(r + r + r) > -1) : OQ(i, r, s, t.before || Br.before);
    if (e == s && Td(i, i.selection.main.from))
      return mQ(i, r, s);
  }
  return null;
}
function Td(i, e) {
  let t = !1;
  return i.field(xd).between(0, i.doc.length, (n) => {
    n == e && (t = !0);
  }), t;
}
function ls(i, e) {
  let t = i.sliceString(e, e + 2);
  return t.slice(0, Ye(we(t, 0)));
}
function pQ(i, e) {
  let t = i.sliceString(e - 2, e);
  return Ye(we(t, 0)) == t.length ? t : t.slice(1);
}
function OQ(i, e, t, n) {
  let r = null, s = i.changeByRange((o) => {
    if (!o.empty)
      return {
        changes: [{ insert: e, from: o.from }, { insert: t, from: o.to }],
        effects: ii.of(o.to + e.length),
        range: y.range(o.anchor + e.length, o.head + e.length)
      };
    let a = ls(i.doc, o.head);
    return !a || /\s/.test(a) || n.indexOf(a) > -1 ? {
      changes: { insert: e + t, from: o.head },
      effects: ii.of(o.head + e.length),
      range: y.cursor(o.head + e.length)
    } : { range: r = o };
  });
  return r ? null : i.update(s, {
    scrollIntoView: !0,
    userEvent: "input.type"
  });
}
function mQ(i, e, t) {
  let n = null, r = i.selection.ranges.map((s) => s.empty && ls(i.doc, s.head) == t ? y.cursor(s.head + t.length) : n = s);
  return n ? null : i.update({
    selection: y.create(r, i.selection.mainIndex),
    scrollIntoView: !0,
    effects: i.selection.ranges.map(({ from: s }) => Aa.of(s))
  });
}
function QQ(i, e, t) {
  let n = null, r = i.changeByRange((s) => {
    if (!s.empty)
      return {
        changes: [{ insert: e, from: s.from }, { insert: e, from: s.to }],
        effects: ii.of(s.to + e.length),
        range: y.range(s.anchor + e.length, s.head + e.length)
      };
    let o = s.head, a = ls(i.doc, o);
    if (a == e) {
      if (tc(i, o))
        return {
          changes: { insert: e + e, from: o },
          effects: ii.of(o + e.length),
          range: y.cursor(o + e.length)
        };
      if (Td(i, o)) {
        let l = t && i.sliceDoc(o, o + e.length * 3) == e + e + e;
        return {
          range: y.cursor(o + e.length * (l ? 3 : 1)),
          effects: Aa.of(o)
        };
      }
    } else {
      if (t && i.sliceDoc(o - 2 * e.length, o) == e + e && tc(i, o - 2 * e.length))
        return {
          changes: { insert: e + e + e + e, from: o },
          effects: ii.of(o + e.length),
          range: y.cursor(o + e.length)
        };
      if (i.charCategorizer(o)(a) != Ee.Word) {
        let l = i.sliceDoc(o - 1, o);
        if (l != e && i.charCategorizer(o)(l) != Ee.Word && !bQ(i, o, e))
          return {
            changes: { insert: e + e, from: o },
            effects: ii.of(o + e.length),
            range: y.cursor(o + e.length)
          };
      }
    }
    return { range: n = s };
  });
  return n ? null : i.update(r, {
    scrollIntoView: !0,
    userEvent: "input.type"
  });
}
function tc(i, e) {
  let t = he(i).resolveInner(e + 1);
  return t.parent && t.from == e;
}
function bQ(i, e, t) {
  let n = he(i).resolveInner(e, -1);
  for (let r = 0; r < 5; r++) {
    if (i.sliceDoc(n.from, n.from + t.length) == t)
      return !0;
    let s = n.to == e && n.parent;
    if (!s)
      break;
    n = s;
  }
  return !1;
}
const ic = /* @__PURE__ */ P.define({
  combine(i) {
    let e, t;
    for (let n of i)
      e = e || n.topContainer, t = t || n.bottomContainer;
    return { topContainer: e, bottomContainer: t };
  }
});
function yn(i, e) {
  let t = i.plugin(Pd), n = t ? t.specs.indexOf(e) : -1;
  return n > -1 ? t.panels[n] : null;
}
const Pd = /* @__PURE__ */ le.fromClass(class {
  constructor(i) {
    this.input = i.state.facet(ui), this.specs = this.input.filter((t) => t), this.panels = this.specs.map((t) => t(i));
    let e = i.state.facet(ic);
    this.top = new qn(i, !0, e.topContainer), this.bottom = new qn(i, !1, e.bottomContainer), this.top.sync(this.panels.filter((t) => t.top)), this.bottom.sync(this.panels.filter((t) => !t.top));
    for (let t of this.panels)
      t.dom.classList.add("cm-panel"), t.mount && t.mount();
  }
  update(i) {
    let e = i.state.facet(ic);
    this.top.container != e.topContainer && (this.top.sync([]), this.top = new qn(i.view, !0, e.topContainer)), this.bottom.container != e.bottomContainer && (this.bottom.sync([]), this.bottom = new qn(i.view, !1, e.bottomContainer)), this.top.syncClasses(), this.bottom.syncClasses();
    let t = i.state.facet(ui);
    if (t != this.input) {
      let n = t.filter((l) => l), r = [], s = [], o = [], a = [];
      for (let l of n) {
        let h = this.specs.indexOf(l), c;
        h < 0 ? (c = l(i.view), a.push(c)) : (c = this.panels[h], c.update && c.update(i)), r.push(c), (c.top ? s : o).push(c);
      }
      this.specs = n, this.panels = r, this.top.sync(s), this.bottom.sync(o);
      for (let l of a)
        l.dom.classList.add("cm-panel"), l.mount && l.mount();
    } else
      for (let n of this.panels)
        n.update && n.update(i);
  }
  destroy() {
    this.top.sync([]), this.bottom.sync([]);
  }
}, {
  provide: /* @__PURE__ */ ve.scrollMargins.from((i) => ({ top: i.top.scrollMargin(), bottom: i.bottom.scrollMargin() }))
});
class qn {
  constructor(e, t, n) {
    this.view = e, this.top = t, this.container = n, this.dom = void 0, this.classes = "", this.panels = [], this.syncClasses();
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
          e = nc(e);
        e = e.nextSibling;
      } else
        this.dom.insertBefore(t.dom, e);
    for (; e; )
      e = nc(e);
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
function nc(i) {
  let e = i.nextSibling;
  return i.remove(), e;
}
const yQ = /* @__PURE__ */ I.baseTheme({
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
  }
}), ui = /* @__PURE__ */ P.define({
  enables: [Pd, yQ]
});
function _() {
  var i = arguments[0];
  typeof i == "string" && (i = document.createElement(i));
  var e = 1, t = arguments[1];
  if (t && typeof t == "object" && t.nodeType == null && !Array.isArray(t)) {
    for (var n in t)
      if (Object.prototype.hasOwnProperty.call(t, n)) {
        var r = t[n];
        typeof r == "string" ? i.setAttribute(n, r) : r != null && (i[n] = r);
      }
    e++;
  }
  for (; e < arguments.length; e++)
    Rd(i, arguments[e]);
  return i;
}
function Rd(i, e) {
  if (typeof e == "string")
    i.appendChild(document.createTextNode(e));
  else if (e != null)
    if (e.nodeType != null)
      i.appendChild(e);
    else if (Array.isArray(e))
      for (var t = 0; t < e.length; t++)
        Rd(i, e[t]);
    else
      throw new RangeError("Unsupported child node: " + e);
}
const rc = typeof String.prototype.normalize == "function" ? (i) => i.normalize("NFKD") : (i) => i;
class Ri {
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
  constructor(e, t, n = 0, r = e.length, s) {
    this.value = { from: 0, to: 0 }, this.done = !1, this.matches = [], this.buffer = "", this.bufferPos = 0, this.iter = e.iterRange(n, r), this.bufferStart = n, this.normalize = s ? (o) => s(rc(o)) : rc, this.query = this.normalize(t);
  }
  peek() {
    if (this.bufferPos == this.buffer.length) {
      if (this.bufferStart += this.buffer.length, this.iter.next(), this.iter.done)
        return -1;
      this.bufferPos = 0, this.buffer = this.iter.value;
    }
    return we(this.buffer, this.bufferPos);
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
      let t = $o(e), n = this.bufferStart + this.bufferPos;
      this.bufferPos += Ye(e);
      let r = this.normalize(t);
      for (let s = 0, o = n; ; s++) {
        let a = r.charCodeAt(s), l = this.match(a, o);
        if (l)
          return this.value = l, this;
        if (s == r.length - 1)
          break;
        o == n && s < t.length && t.charCodeAt(s) == a && o++;
      }
    }
  }
  match(e, t) {
    let n = null;
    for (let r = 0; r < this.matches.length; r += 2) {
      let s = this.matches[r], o = !1;
      this.query.charCodeAt(s) == e && (s == this.query.length - 1 ? n = { from: this.matches[r + 1], to: t + 1 } : (this.matches[r]++, o = !0)), o || (this.matches.splice(r, 2), r -= 2);
    }
    return this.query.charCodeAt(0) == e && (this.query.length == 1 ? n = { from: t, to: t + 1 } : this.matches.push(1, t)), n;
  }
}
typeof Symbol < "u" && (Ri.prototype[Symbol.iterator] = function() {
  return this;
});
const Dd = { from: -1, to: -1, match: /* @__PURE__ */ /.*/.exec("") }, Oa = "gm" + (/x/.unicode == null ? "" : "u");
class Ld {
  /**
  Create a cursor that will search the given range in the given
  document. `query` should be the raw pattern (as you'd pass it to
  `new RegExp`).
  */
  constructor(e, t, n, r = 0, s = e.length) {
    if (this.to = s, this.curLine = "", this.done = !1, this.value = Dd, /\\[sWDnr]|\n|\r|\[\^/.test(t))
      return new Wd(e, t, n, r, s);
    this.re = new RegExp(t, Oa + (n != null && n.ignoreCase ? "i" : "")), this.iter = e.iter();
    let o = e.lineAt(r);
    this.curLineStart = o.from, this.matchPos = r, this.getLine(this.curLineStart);
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
        let n = this.curLineStart + t.index, r = n + t[0].length;
        if (this.matchPos = r + (n == r ? 1 : 0), n == this.curLine.length && this.nextLine(), n < r || n > this.value.to)
          return this.value = { from: n, to: r, match: t }, this;
        e = this.matchPos - this.curLineStart;
      } else if (this.curLineStart + this.curLine.length < this.to)
        this.nextLine(), e = 0;
      else
        return this.done = !0, this;
    }
  }
}
const Ls = /* @__PURE__ */ new WeakMap();
class Ei {
  constructor(e, t) {
    this.from = e, this.text = t;
  }
  get to() {
    return this.from + this.text.length;
  }
  static get(e, t, n) {
    let r = Ls.get(e);
    if (!r || r.from >= n || r.to <= t) {
      let a = new Ei(t, e.sliceString(t, n));
      return Ls.set(e, a), a;
    }
    if (r.from == t && r.to == n)
      return r;
    let { text: s, from: o } = r;
    return o > t && (s = e.sliceString(t, o) + s, o = t), r.to < n && (s += e.sliceString(r.to, n)), Ls.set(e, new Ei(o, s)), new Ei(t, s.slice(t - o, n - o));
  }
}
class Wd {
  constructor(e, t, n, r, s) {
    this.text = e, this.to = s, this.done = !1, this.value = Dd, this.matchPos = r, this.re = new RegExp(t, Oa + (n != null && n.ignoreCase ? "i" : "")), this.flat = Ei.get(e, r, this.chunkEnd(
      r + 5e3
      /* Base */
    ));
  }
  chunkEnd(e) {
    return e >= this.to ? this.to : this.text.lineAt(e).to;
  }
  next() {
    for (; ; ) {
      let e = this.re.lastIndex = this.matchPos - this.flat.from, t = this.re.exec(this.flat.text);
      if (t && !t[0] && t.index == e && (this.re.lastIndex = e + 1, t = this.re.exec(this.flat.text)), t && this.flat.to < this.to && t.index + t[0].length > this.flat.text.length - 10 && (t = null), t) {
        let n = this.flat.from + t.index, r = n + t[0].length;
        return this.value = { from: n, to: r, match: t }, this.matchPos = r + (n == r ? 1 : 0), this;
      } else {
        if (this.flat.to == this.to)
          return this.done = !0, this;
        this.flat = Ei.get(this.text, this.flat.from, this.chunkEnd(this.flat.from + this.flat.text.length * 2));
      }
    }
  }
}
typeof Symbol < "u" && (Ld.prototype[Symbol.iterator] = Wd.prototype[Symbol.iterator] = function() {
  return this;
});
function wQ(i) {
  try {
    return new RegExp(i, Oa), !0;
  } catch {
    return !1;
  }
}
function jo(i) {
  let e = _("input", { class: "cm-textfield", name: "line" }), t = _("form", {
    class: "cm-gotoLine",
    onkeydown: (r) => {
      r.keyCode == 27 ? (r.preventDefault(), i.dispatch({ effects: Ir.of(!1) }), i.focus()) : r.keyCode == 13 && (r.preventDefault(), n());
    },
    onsubmit: (r) => {
      r.preventDefault(), n();
    }
  }, _("label", i.state.phrase("Go to line"), ": ", e), " ", _("button", { class: "cm-button", type: "submit" }, i.state.phrase("go")));
  function n() {
    let r = /^([+-])?(\d+)?(:\d+)?(%)?$/.exec(e.value);
    if (!r)
      return;
    let { state: s } = i, o = s.doc.lineAt(s.selection.main.head), [, a, l, h, c] = r, u = h ? +h.slice(1) : 0, f = l ? +l : o.number;
    if (l && c) {
      let g = f / 100;
      a && (g = g * (a == "-" ? -1 : 1) + o.number / s.doc.lines), f = Math.round(s.doc.lines * g);
    } else
      l && a && (f = f * (a == "-" ? -1 : 1) + o.number);
    let d = s.doc.line(Math.max(1, Math.min(s.doc.lines, f)));
    i.dispatch({
      effects: Ir.of(!1),
      selection: y.cursor(d.from + Math.max(0, Math.min(u, d.length))),
      scrollIntoView: !0
    }), i.focus();
  }
  return { dom: t, pos: -10 };
}
const Ir = /* @__PURE__ */ W.define(), sc = /* @__PURE__ */ Oe.define({
  create() {
    return !0;
  },
  update(i, e) {
    for (let t of e.effects)
      t.is(Ir) && (i = t.value);
    return i;
  },
  provide: (i) => ui.from(i, (e) => e ? jo : null)
}), vQ = (i) => {
  let e = yn(i, jo);
  if (!e) {
    let t = [Ir.of(!0)];
    i.state.field(sc, !1) == null && t.push(W.appendConfig.of([sc, CQ])), i.dispatch({ effects: t }), e = yn(i, jo);
  }
  return e && e.dom.querySelector("input").focus(), !0;
}, CQ = /* @__PURE__ */ I.baseTheme({
  ".cm-panel.cm-gotoLine": {
    padding: "2px 6px 4px",
    "& label": { fontSize: "80%" }
  }
}), SQ = {
  highlightWordAroundCursor: !1,
  minSelectionLength: 1,
  maxMatches: 100,
  wholeWords: !0
}, Md = /* @__PURE__ */ P.define({
  combine(i) {
    return Gt(i, SQ, {
      highlightWordAroundCursor: (e, t) => e || t,
      minSelectionLength: Math.min,
      maxMatches: Math.min
    });
  }
});
function kQ(i) {
  let e = [TQ, IQ];
  return i && e.push(Md.of(i)), e;
}
const EQ = /* @__PURE__ */ T.mark({ class: "cm-selectionMatch" }), xQ = /* @__PURE__ */ T.mark({ class: "cm-selectionMatch cm-selectionMatch-main" });
function oc(i, e, t, n) {
  return (t == 0 || i(e.sliceDoc(t - 1, t)) != Ee.Word) && (n == e.doc.length || i(e.sliceDoc(n, n + 1)) != Ee.Word);
}
function BQ(i, e, t, n) {
  return i(e.sliceDoc(t, t + 1)) == Ee.Word && i(e.sliceDoc(n - 1, n)) == Ee.Word;
}
const IQ = /* @__PURE__ */ le.fromClass(class {
  constructor(i) {
    this.decorations = this.getDeco(i);
  }
  update(i) {
    (i.selectionSet || i.docChanged || i.viewportChanged) && (this.decorations = this.getDeco(i.view));
  }
  getDeco(i) {
    let e = i.state.facet(Md), { state: t } = i, n = t.selection;
    if (n.ranges.length > 1)
      return T.none;
    let r = n.main, s, o = null;
    if (r.empty) {
      if (!e.highlightWordAroundCursor)
        return T.none;
      let l = t.wordAt(r.head);
      if (!l)
        return T.none;
      o = t.charCategorizer(r.head), s = t.sliceDoc(l.from, l.to);
    } else {
      let l = r.to - r.from;
      if (l < e.minSelectionLength || l > 200)
        return T.none;
      if (e.wholeWords) {
        if (s = t.sliceDoc(r.from, r.to), o = t.charCategorizer(r.head), !(oc(o, t, r.from, r.to) && BQ(o, t, r.from, r.to)))
          return T.none;
      } else if (s = t.sliceDoc(r.from, r.to).trim(), !s)
        return T.none;
    }
    let a = [];
    for (let l of i.visibleRanges) {
      let h = new Ri(t.doc, s, l.from, l.to);
      for (; !h.next().done; ) {
        let { from: c, to: u } = h.value;
        if ((!o || oc(o, t, c, u)) && (r.empty && c <= r.from && u >= r.to ? a.push(xQ.range(c, u)) : (c >= r.to || u <= r.from) && a.push(EQ.range(c, u)), a.length > e.maxMatches))
          return T.none;
      }
    }
    return T.set(a);
  }
}, {
  decorations: (i) => i.decorations
}), TQ = /* @__PURE__ */ I.baseTheme({
  ".cm-selectionMatch": { backgroundColor: "#99ff7780" },
  ".cm-searchMatch .cm-selectionMatch": { backgroundColor: "transparent" }
}), PQ = ({ state: i, dispatch: e }) => {
  let { selection: t } = i, n = y.create(t.ranges.map((r) => i.wordAt(r.head) || y.cursor(r.head)), t.mainIndex);
  return n.eq(t) ? !1 : (e(i.update({ selection: n })), !0);
};
function RQ(i, e) {
  let { main: t, ranges: n } = i.selection, r = i.wordAt(t.head), s = r && r.from == t.from && r.to == t.to;
  for (let o = !1, a = new Ri(i.doc, e, n[n.length - 1].to); ; )
    if (a.next(), a.done) {
      if (o)
        return null;
      a = new Ri(i.doc, e, 0, Math.max(0, n[n.length - 1].from - 1)), o = !0;
    } else {
      if (o && n.some((l) => l.from == a.value.from))
        continue;
      if (s) {
        let l = i.wordAt(a.value.from);
        if (!l || l.from != a.value.from || l.to != a.value.to)
          continue;
      }
      return a.value;
    }
}
const DQ = ({ state: i, dispatch: e }) => {
  let { ranges: t } = i.selection;
  if (t.some((s) => s.from === s.to))
    return PQ({ state: i, dispatch: e });
  let n = i.sliceDoc(t[0].from, t[0].to);
  if (i.selection.ranges.some((s) => i.sliceDoc(s.from, s.to) != n))
    return !1;
  let r = RQ(i, n);
  return r ? (e(i.update({
    selection: i.selection.addRange(y.range(r.from, r.to), !1),
    effects: I.scrollIntoView(r.to)
  })), !0) : !1;
}, ma = /* @__PURE__ */ P.define({
  combine(i) {
    var e;
    return {
      top: i.reduce((t, n) => t ?? n.top, void 0) || !1,
      caseSensitive: i.reduce((t, n) => t ?? (n.caseSensitive || n.matchCase), void 0) || !1,
      createPanel: ((e = i.find((t) => t.createPanel)) === null || e === void 0 ? void 0 : e.createPanel) || ((t) => new VQ(t))
    };
  }
});
class Xd {
  /**
  Create a query object.
  */
  constructor(e) {
    this.search = e.search, this.caseSensitive = !!e.caseSensitive, this.regexp = !!e.regexp, this.replace = e.replace || "", this.valid = !!this.search && (!this.regexp || wQ(this.search)), this.unquoted = this.search.replace(/\\([nrt\\])/g, (t, n) => n == "n" ? `
` : n == "r" ? "\r" : n == "t" ? "	" : "\\");
  }
  /**
  Compare this query to another query.
  */
  eq(e) {
    return this.search == e.search && this.replace == e.replace && this.caseSensitive == e.caseSensitive && this.regexp == e.regexp;
  }
  /**
  @internal
  */
  create() {
    return this.regexp ? new WQ(this) : new LQ(this);
  }
  getCursor(e, t = 0, n = e.length) {
    return this.regexp ? Qi(this, e, t, n) : mi(this, e, t, n);
  }
}
class jd {
  constructor(e) {
    this.spec = e;
  }
}
function mi(i, e, t, n) {
  return new Ri(e, i.unquoted, t, n, i.caseSensitive ? void 0 : (r) => r.toLowerCase());
}
class LQ extends jd {
  constructor(e) {
    super(e);
  }
  nextMatch(e, t, n) {
    let r = mi(this.spec, e, n, e.length).nextOverlapping();
    return r.done && (r = mi(this.spec, e, 0, t).nextOverlapping()), r.done ? null : r.value;
  }
  // Searching in reverse is, rather than implementing inverted search
  // cursor, done by scanning chunk after chunk forward.
  prevMatchInRange(e, t, n) {
    for (let r = n; ; ) {
      let s = Math.max(t, r - 1e4 - this.spec.unquoted.length), o = mi(this.spec, e, s, r), a = null;
      for (; !o.nextOverlapping().done; )
        a = o.value;
      if (a)
        return a;
      if (s == t)
        return null;
      r -= 1e4;
    }
  }
  prevMatch(e, t, n) {
    return this.prevMatchInRange(e, 0, t) || this.prevMatchInRange(e, n, e.length);
  }
  getReplacement(e) {
    return this.spec.replace;
  }
  matchAll(e, t) {
    let n = mi(this.spec, e, 0, e.length), r = [];
    for (; !n.next().done; ) {
      if (r.length >= t)
        return null;
      r.push(n.value);
    }
    return r;
  }
  highlight(e, t, n, r) {
    let s = mi(this.spec, e, Math.max(0, t - this.spec.unquoted.length), Math.min(n + this.spec.unquoted.length, e.length));
    for (; !s.next().done; )
      r(s.value.from, s.value.to);
  }
}
function Qi(i, e, t, n) {
  return new Ld(e, i.search, i.caseSensitive ? void 0 : { ignoreCase: !0 }, t, n);
}
class WQ extends jd {
  nextMatch(e, t, n) {
    let r = Qi(this.spec, e, n, e.length).next();
    return r.done && (r = Qi(this.spec, e, 0, t).next()), r.done ? null : r.value;
  }
  prevMatchInRange(e, t, n) {
    for (let r = 1; ; r++) {
      let s = Math.max(
        t,
        n - r * 1e4
        /* ChunkSize */
      ), o = Qi(this.spec, e, s, n), a = null;
      for (; !o.next().done; )
        a = o.value;
      if (a && (s == t || a.from > s + 10))
        return a;
      if (s == t)
        return null;
    }
  }
  prevMatch(e, t, n) {
    return this.prevMatchInRange(e, 0, t) || this.prevMatchInRange(e, n, e.length);
  }
  getReplacement(e) {
    return this.spec.replace.replace(/\$([$&\d+])/g, (t, n) => n == "$" ? "$" : n == "&" ? e.match[0] : n != "0" && +n < e.match.length ? e.match[n] : t);
  }
  matchAll(e, t) {
    let n = Qi(this.spec, e, 0, e.length), r = [];
    for (; !n.next().done; ) {
      if (r.length >= t)
        return null;
      r.push(n.value);
    }
    return r;
  }
  highlight(e, t, n, r) {
    let s = Qi(this.spec, e, Math.max(
      0,
      t - 250
      /* HighlightMargin */
    ), Math.min(n + 250, e.length));
    for (; !s.next().done; )
      r(s.value.from, s.value.to);
  }
}
const wn = /* @__PURE__ */ W.define(), Qa = /* @__PURE__ */ W.define(), Zt = /* @__PURE__ */ Oe.define({
  create(i) {
    return new Ws(Zo(i).create(), null);
  },
  update(i, e) {
    for (let t of e.effects)
      t.is(wn) ? i = new Ws(t.value.create(), i.panel) : t.is(Qa) && (i = new Ws(i.query, t.value ? ba : null));
    return i;
  },
  provide: (i) => ui.from(i, (e) => e.panel)
});
class Ws {
  constructor(e, t) {
    this.query = e, this.panel = t;
  }
}
const MQ = /* @__PURE__ */ T.mark({ class: "cm-searchMatch" }), XQ = /* @__PURE__ */ T.mark({ class: "cm-searchMatch cm-searchMatch-selected" }), jQ = /* @__PURE__ */ le.fromClass(class {
  constructor(i) {
    this.view = i, this.decorations = this.highlight(i.state.field(Zt));
  }
  update(i) {
    let e = i.state.field(Zt);
    (e != i.startState.field(Zt) || i.docChanged || i.selectionSet || i.viewportChanged) && (this.decorations = this.highlight(e));
  }
  highlight({ query: i, panel: e }) {
    if (!e || !i.spec.valid)
      return T.none;
    let { view: t } = this, n = new zt();
    for (let r = 0, s = t.visibleRanges, o = s.length; r < o; r++) {
      let { from: a, to: l } = s[r];
      for (; r < o - 1 && l > s[r + 1].from - 2 * 250; )
        l = s[++r].to;
      i.highlight(t.state.doc, a, l, (h, c) => {
        let u = t.state.selection.ranges.some((f) => f.from == h && f.to == c);
        n.add(h, c, u ? XQ : MQ);
      });
    }
    return n.finish();
  }
}, {
  decorations: (i) => i.decorations
});
function Tn(i) {
  return (e) => {
    let t = e.state.field(Zt, !1);
    return t && t.query.spec.valid ? i(e, t) : Zd(e);
  };
}
const Tr = /* @__PURE__ */ Tn((i, { query: e }) => {
  let { from: t, to: n } = i.state.selection.main, r = e.nextMatch(i.state.doc, t, n);
  return !r || r.from == t && r.to == n ? !1 : (i.dispatch({
    selection: { anchor: r.from, head: r.to },
    scrollIntoView: !0,
    effects: ya(i, r),
    userEvent: "select.search"
  }), !0);
}), Pr = /* @__PURE__ */ Tn((i, { query: e }) => {
  let { state: t } = i, { from: n, to: r } = t.selection.main, s = e.prevMatch(t.doc, n, r);
  return s ? (i.dispatch({
    selection: { anchor: s.from, head: s.to },
    scrollIntoView: !0,
    effects: ya(i, s),
    userEvent: "select.search"
  }), !0) : !1;
}), ZQ = /* @__PURE__ */ Tn((i, { query: e }) => {
  let t = e.matchAll(i.state.doc, 1e3);
  return !t || !t.length ? !1 : (i.dispatch({
    selection: y.create(t.map((n) => y.range(n.from, n.to))),
    userEvent: "select.search.matches"
  }), !0);
}), NQ = ({ state: i, dispatch: e }) => {
  let t = i.selection;
  if (t.ranges.length > 1 || t.main.empty)
    return !1;
  let { from: n, to: r } = t.main, s = [], o = 0;
  for (let a = new Ri(i.doc, i.sliceDoc(n, r)); !a.next().done; ) {
    if (s.length > 1e3)
      return !1;
    a.value.from == n && (o = s.length), s.push(y.range(a.value.from, a.value.to));
  }
  return e(i.update({
    selection: y.create(s, o),
    userEvent: "select.search.matches"
  })), !0;
}, ac = /* @__PURE__ */ Tn((i, { query: e }) => {
  let { state: t } = i, { from: n, to: r } = t.selection.main;
  if (t.readOnly)
    return !1;
  let s = e.nextMatch(t.doc, n, n);
  if (!s)
    return !1;
  let o = [], a, l;
  if (s.from == n && s.to == r && (l = t.toText(e.getReplacement(s)), o.push({ from: s.from, to: s.to, insert: l }), s = e.nextMatch(t.doc, s.from, s.to)), s) {
    let h = o.length == 0 || o[0].from >= s.to ? 0 : s.to - s.from - l.length;
    a = { anchor: s.from - h, head: s.to - h };
  }
  return i.dispatch({
    changes: o,
    selection: a,
    scrollIntoView: !!a,
    effects: s ? ya(i, s) : void 0,
    userEvent: "input.replace"
  }), !0;
}), zQ = /* @__PURE__ */ Tn((i, { query: e }) => {
  if (i.state.readOnly)
    return !1;
  let t = e.matchAll(i.state.doc, 1e9).map((n) => {
    let { from: r, to: s } = n;
    return { from: r, to: s, insert: e.getReplacement(n) };
  });
  return t.length ? (i.dispatch({
    changes: t,
    userEvent: "input.replace.all"
  }), !0) : !1;
});
function ba(i) {
  return i.state.facet(ma).createPanel(i);
}
function Zo(i, e) {
  var t;
  let n = i.selection.main, r = n.empty || n.to > n.from + 100 ? "" : i.sliceDoc(n.from, n.to), s = (t = e == null ? void 0 : e.caseSensitive) !== null && t !== void 0 ? t : i.facet(ma).caseSensitive;
  return e && !r ? e : new Xd({ search: r.replace(/\n/g, "\\n"), caseSensitive: s });
}
const Zd = (i) => {
  let e = i.state.field(Zt, !1);
  if (e && e.panel) {
    let t = yn(i, ba);
    if (!t)
      return !1;
    let n = t.dom.querySelector("[name=search]");
    if (n != i.root.activeElement) {
      let r = Zo(i.state, e.query.spec);
      r.valid && i.dispatch({ effects: wn.of(r) }), n.focus(), n.select();
    }
  } else
    i.dispatch({ effects: [
      Qa.of(!0),
      e ? wn.of(Zo(i.state, e.query.spec)) : W.appendConfig.of(qQ)
    ] });
  return !0;
}, Nd = (i) => {
  let e = i.state.field(Zt, !1);
  if (!e || !e.panel)
    return !1;
  let t = yn(i, ba);
  return t && t.dom.contains(i.root.activeElement) && i.focus(), i.dispatch({ effects: Qa.of(!1) }), !0;
}, UQ = [
  { key: "Mod-f", run: Zd, scope: "editor search-panel" },
  { key: "F3", run: Tr, shift: Pr, scope: "editor search-panel", preventDefault: !0 },
  { key: "Mod-g", run: Tr, shift: Pr, scope: "editor search-panel", preventDefault: !0 },
  { key: "Escape", run: Nd, scope: "editor search-panel" },
  { key: "Mod-Shift-l", run: NQ },
  { key: "Alt-g", run: vQ },
  { key: "Mod-d", run: DQ, preventDefault: !0 }
];
class VQ {
  constructor(e) {
    this.view = e;
    let t = this.query = e.state.field(Zt).query.spec;
    this.commit = this.commit.bind(this), this.searchField = _("input", {
      value: t.search,
      placeholder: Ve(e, "Find"),
      "aria-label": Ve(e, "Find"),
      class: "cm-textfield",
      name: "search",
      onchange: this.commit,
      onkeyup: this.commit
    }), this.replaceField = _("input", {
      value: t.replace,
      placeholder: Ve(e, "Replace"),
      "aria-label": Ve(e, "Replace"),
      class: "cm-textfield",
      name: "replace",
      onchange: this.commit,
      onkeyup: this.commit
    }), this.caseField = _("input", {
      type: "checkbox",
      name: "case",
      checked: t.caseSensitive,
      onchange: this.commit
    }), this.reField = _("input", {
      type: "checkbox",
      name: "re",
      checked: t.regexp,
      onchange: this.commit
    });
    function n(r, s, o) {
      return _("button", { class: "cm-button", name: r, onclick: s, type: "button" }, o);
    }
    this.dom = _("div", { onkeydown: (r) => this.keydown(r), class: "cm-search" }, [
      this.searchField,
      n("next", () => Tr(e), [Ve(e, "next")]),
      n("prev", () => Pr(e), [Ve(e, "previous")]),
      n("select", () => ZQ(e), [Ve(e, "all")]),
      _("label", null, [this.caseField, Ve(e, "match case")]),
      _("label", null, [this.reField, Ve(e, "regexp")]),
      ...e.state.readOnly ? [] : [
        _("br"),
        this.replaceField,
        n("replace", () => ac(e), [Ve(e, "replace")]),
        n("replaceAll", () => zQ(e), [Ve(e, "replace all")]),
        _("button", {
          name: "close",
          onclick: () => Nd(e),
          "aria-label": Ve(e, "close"),
          type: "button"
        }, ["×"])
      ]
    ]);
  }
  commit() {
    let e = new Xd({
      search: this.searchField.value,
      caseSensitive: this.caseField.checked,
      regexp: this.reField.checked,
      replace: this.replaceField.value
    });
    e.eq(this.query) || (this.query = e, this.view.dispatch({ effects: wn.of(e) }));
  }
  keydown(e) {
    Mp(this.view, e, "search-panel") ? e.preventDefault() : e.keyCode == 13 && e.target == this.searchField ? (e.preventDefault(), (e.shiftKey ? Pr : Tr)(this.view)) : e.keyCode == 13 && e.target == this.replaceField && (e.preventDefault(), ac(this.view));
  }
  update(e) {
    for (let t of e.transactions)
      for (let n of t.effects)
        n.is(wn) && !n.value.eq(this.query) && this.setQuery(n.value);
  }
  setQuery(e) {
    this.query = e, this.searchField.value = e.search, this.replaceField.value = e.replace, this.caseField.checked = e.caseSensitive, this.reField.checked = e.regexp;
  }
  mount() {
    this.searchField.select();
  }
  get pos() {
    return 80;
  }
  get top() {
    return this.view.state.facet(ma).top;
  }
}
function Ve(i, e) {
  return i.state.phrase(e);
}
const Gn = 30, Fn = /[\s\.,:;?!]/;
function ya(i, { from: e, to: t }) {
  let n = i.state.doc.lineAt(e).from, r = i.state.doc.lineAt(t).to, s = Math.max(n, e - Gn), o = Math.min(r, t + Gn), a = i.state.sliceDoc(s, o);
  if (s != n) {
    for (let l = 0; l < Gn; l++)
      if (!Fn.test(a[l + 1]) && Fn.test(a[l])) {
        a = a.slice(l);
        break;
      }
  }
  if (o != r) {
    for (let l = a.length - 1; l > a.length - Gn; l--)
      if (!Fn.test(a[l - 1]) && Fn.test(a[l])) {
        a = a.slice(0, l);
        break;
      }
  }
  return I.announce.of(`${i.state.phrase("current match")}. ${a} ${i.state.phrase("on line")} ${i.state.doc.lineAt(e).number}`);
}
const YQ = /* @__PURE__ */ I.baseTheme({
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
}), qQ = [
  Zt,
  /* @__PURE__ */ zi.lowest(jQ),
  YQ
], GQ = typeof navigator < "u" && !/* @__PURE__ */ /Edge\/(\d+)/.exec(navigator.userAgent) && /* @__PURE__ */ /Apple Computer/.test(navigator.vendor) && (/* @__PURE__ */ /Mobile\/\w+/.test(navigator.userAgent) || navigator.maxTouchPoints > 2), Ms = "-10000px";
class zd {
  constructor(e, t, n) {
    this.facet = t, this.createTooltipView = n, this.input = e.state.facet(t), this.tooltips = this.input.filter((r) => r), this.tooltipViews = this.tooltips.map(n);
  }
  update(e) {
    let t = e.state.facet(this.facet), n = t.filter((s) => s);
    if (t === this.input) {
      for (let s of this.tooltipViews)
        s.update && s.update(e);
      return !1;
    }
    let r = [];
    for (let s = 0; s < n.length; s++) {
      let o = n[s], a = -1;
      if (o) {
        for (let l = 0; l < this.tooltips.length; l++) {
          let h = this.tooltips[l];
          h && h.create == o.create && (a = l);
        }
        if (a < 0)
          r[s] = this.createTooltipView(o);
        else {
          let l = r[s] = this.tooltipViews[a];
          l.update && l.update(e);
        }
      }
    }
    for (let s of this.tooltipViews)
      r.indexOf(s) < 0 && s.dom.remove();
    return this.input = t, this.tooltips = n, this.tooltipViews = r, !0;
  }
}
function FQ() {
  return { top: 0, left: 0, bottom: innerHeight, right: innerWidth };
}
const Xs = /* @__PURE__ */ P.define({
  combine: (i) => {
    var e, t, n;
    return {
      position: GQ ? "absolute" : ((e = i.find((r) => r.position)) === null || e === void 0 ? void 0 : e.position) || "fixed",
      parent: ((t = i.find((r) => r.parent)) === null || t === void 0 ? void 0 : t.parent) || null,
      tooltipSpace: ((n = i.find((r) => r.tooltipSpace)) === null || n === void 0 ? void 0 : n.tooltipSpace) || FQ
    };
  }
}), Ud = /* @__PURE__ */ le.fromClass(class {
  constructor(i) {
    var e;
    this.view = i, this.inView = !0, this.lastTransaction = 0, this.measureTimeout = -1;
    let t = i.state.facet(Xs);
    this.position = t.position, this.parent = t.parent, this.classes = i.themeClasses, this.createContainer(), this.measureReq = { read: this.readMeasure.bind(this), write: this.writeMeasure.bind(this), key: this }, this.manager = new zd(i, wa, (n) => this.createTooltip(n)), this.intersectionObserver = typeof IntersectionObserver == "function" ? new IntersectionObserver((n) => {
      Date.now() > this.lastTransaction - 50 && n.length > 0 && n[n.length - 1].intersectionRatio < 1 && this.measureSoon();
    }, { threshold: [1] }) : null, this.observeIntersection(), (e = i.dom.ownerDocument.defaultView) === null || e === void 0 || e.addEventListener("resize", this.measureSoon = this.measureSoon.bind(this)), this.maybeMeasure();
  }
  createContainer() {
    this.parent ? (this.container = document.createElement("div"), this.container.style.position = "relative", this.container.className = this.view.themeClasses, this.parent.appendChild(this.container)) : this.container = this.view.dom;
  }
  observeIntersection() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      for (let i of this.manager.tooltipViews)
        this.intersectionObserver.observe(i.dom);
    }
  }
  measureSoon() {
    this.measureTimeout < 0 && (this.measureTimeout = setTimeout(() => {
      this.measureTimeout = -1, this.maybeMeasure();
    }, 50));
  }
  update(i) {
    i.transactions.length && (this.lastTransaction = Date.now());
    let e = this.manager.update(i);
    e && this.observeIntersection();
    let t = e || i.geometryChanged, n = i.state.facet(Xs);
    if (n.position != this.position) {
      this.position = n.position;
      for (let r of this.manager.tooltipViews)
        r.dom.style.position = this.position;
      t = !0;
    }
    if (n.parent != this.parent) {
      this.parent && this.container.remove(), this.parent = n.parent, this.createContainer();
      for (let r of this.manager.tooltipViews)
        this.container.appendChild(r.dom);
      t = !0;
    } else
      this.parent && this.view.themeClasses != this.classes && (this.classes = this.container.className = this.view.themeClasses);
    t && this.maybeMeasure();
  }
  createTooltip(i) {
    let e = i.create(this.view);
    if (e.dom.classList.add("cm-tooltip"), i.arrow && !e.dom.querySelector(".cm-tooltip > .cm-tooltip-arrow")) {
      let t = document.createElement("div");
      t.className = "cm-tooltip-arrow", e.dom.appendChild(t);
    }
    return e.dom.style.position = this.position, e.dom.style.top = Ms, this.container.appendChild(e.dom), e.mount && e.mount(this.view), e;
  }
  destroy() {
    var i, e;
    (i = this.view.dom.ownerDocument.defaultView) === null || i === void 0 || i.removeEventListener("resize", this.measureSoon);
    for (let { dom: t } of this.manager.tooltipViews)
      t.remove();
    (e = this.intersectionObserver) === null || e === void 0 || e.disconnect(), clearTimeout(this.measureTimeout);
  }
  readMeasure() {
    let i = this.view.dom.getBoundingClientRect();
    return {
      editor: i,
      parent: this.parent ? this.container.getBoundingClientRect() : i,
      pos: this.manager.tooltips.map((e, t) => {
        let n = this.manager.tooltipViews[t];
        return n.getCoords ? n.getCoords(e.pos) : this.view.coordsAtPos(e.pos);
      }),
      size: this.manager.tooltipViews.map(({ dom: e }) => e.getBoundingClientRect()),
      space: this.view.state.facet(Xs).tooltipSpace(this.view)
    };
  }
  writeMeasure(i) {
    let { editor: e, space: t } = i, n = [];
    for (let r = 0; r < this.manager.tooltips.length; r++) {
      let s = this.manager.tooltips[r], o = this.manager.tooltipViews[r], { dom: a } = o, l = i.pos[r], h = i.size[r];
      if (!l || l.bottom <= Math.max(e.top, t.top) || l.top >= Math.min(e.bottom, t.bottom) || l.right < Math.max(e.left, t.left) - 0.1 || l.left > Math.min(e.right, t.right) + 0.1) {
        a.style.top = Ms;
        continue;
      }
      let c = s.arrow ? o.dom.querySelector(".cm-tooltip-arrow") : null, u = c ? 7 : 0, f = h.right - h.left, d = h.bottom - h.top, g = o.offset || JQ, p = this.view.textDirection == q.LTR, O = h.width > t.right - t.left ? p ? t.left : t.right - h.width : p ? Math.min(l.left - (c ? 14 : 0) + g.x, t.right - f) : Math.max(t.left, l.left - f + (c ? 14 : 0) - g.x), m = !!s.above;
      !s.strictSide && (m ? l.top - (h.bottom - h.top) - g.y < t.top : l.bottom + (h.bottom - h.top) + g.y > t.bottom) && m == t.bottom - l.bottom > l.top - t.top && (m = !m);
      let w = m ? l.top - d - u - g.y : l.bottom + u + g.y, C = O + f;
      if (o.overlap !== !0)
        for (let Q of n)
          Q.left < C && Q.right > O && Q.top < w + d && Q.bottom > w && (w = m ? Q.top - d - 2 - u : Q.bottom + u + 2);
      this.position == "absolute" ? (a.style.top = w - i.parent.top + "px", a.style.left = O - i.parent.left + "px") : (a.style.top = w + "px", a.style.left = O + "px"), c && (c.style.left = `${l.left + (p ? g.x : -g.x) - (O + 14 - 7)}px`), o.overlap !== !0 && n.push({ left: O, top: w, right: C, bottom: w + d }), a.classList.toggle("cm-tooltip-above", m), a.classList.toggle("cm-tooltip-below", !m), o.positioned && o.positioned();
    }
  }
  maybeMeasure() {
    if (this.manager.tooltips.length && (this.view.inView && this.view.requestMeasure(this.measureReq), this.inView != this.view.inView && (this.inView = this.view.inView, !this.inView)))
      for (let i of this.manager.tooltipViews)
        i.dom.style.top = Ms;
  }
}, {
  eventHandlers: {
    scroll() {
      this.maybeMeasure();
    }
  }
}), HQ = /* @__PURE__ */ I.baseTheme({
  ".cm-tooltip": {
    zIndex: 100
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
    height: `${7}px`,
    width: `${7 * 2}px`,
    position: "absolute",
    zIndex: -1,
    overflow: "hidden",
    "&:before, &:after": {
      content: "''",
      position: "absolute",
      width: 0,
      height: 0,
      borderLeft: `${7}px solid transparent`,
      borderRight: `${7}px solid transparent`
    },
    ".cm-tooltip-above &": {
      bottom: `-${7}px`,
      "&:before": {
        borderTop: `${7}px solid #bbb`
      },
      "&:after": {
        borderTop: `${7}px solid #f5f5f5`,
        bottom: "1px"
      }
    },
    ".cm-tooltip-below &": {
      top: `-${7}px`,
      "&:before": {
        borderBottom: `${7}px solid #bbb`
      },
      "&:after": {
        borderBottom: `${7}px solid #f5f5f5`,
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
}), JQ = { x: 0, y: 0 }, wa = /* @__PURE__ */ P.define({
  enables: [Ud, HQ]
}), Rr = /* @__PURE__ */ P.define();
class va {
  constructor(e) {
    this.view = e, this.mounted = !1, this.dom = document.createElement("div"), this.dom.classList.add("cm-tooltip-hover"), this.manager = new zd(e, Rr, (t) => this.createHostedView(t));
  }
  // Needs to be static so that host tooltip instances always match
  static create(e) {
    return new va(e);
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
  positioned() {
    for (let e of this.manager.tooltipViews)
      e.positioned && e.positioned();
  }
  update(e) {
    this.manager.update(e);
  }
}
const KQ = /* @__PURE__ */ wa.compute([Rr], (i) => {
  let e = i.facet(Rr).filter((t) => t);
  return e.length === 0 ? null : {
    pos: Math.min(...e.map((t) => t.pos)),
    end: Math.max(...e.filter((t) => t.end != null).map((t) => t.end)),
    create: va.create,
    above: e[0].above,
    arrow: e.some((t) => t.arrow)
  };
});
class $Q {
  constructor(e, t, n, r, s) {
    this.view = e, this.source = t, this.field = n, this.setHover = r, this.hoverTime = s, this.hoverTimeout = -1, this.restartTimeout = -1, this.pending = null, this.lastMove = { x: 0, y: 0, target: e.dom, time: 0 }, this.checkHover = this.checkHover.bind(this), e.dom.addEventListener("mouseleave", this.mouseleave = this.mouseleave.bind(this)), e.dom.addEventListener("mousemove", this.mousemove = this.mousemove.bind(this));
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
    var e;
    clearTimeout(this.restartTimeout);
    let { lastMove: t } = this, n = this.view.contentDOM.contains(t.target) ? this.view.posAtCoords(t) : null;
    if (n == null)
      return;
    let r = this.view.coordsAtPos(n);
    if (r == null || t.y < r.top || t.y > r.bottom || t.x < r.left - this.view.defaultCharacterWidth || t.x > r.right + this.view.defaultCharacterWidth)
      return;
    let s = this.view.bidiSpans(this.view.state.doc.lineAt(n)).find((l) => l.from <= n && l.to >= n), o = s && s.dir == q.RTL ? -1 : 1, a = this.source(this.view, n, t.x < r.left ? -o : o);
    if (!((e = a) === null || e === void 0) && e.then) {
      let l = this.pending = { pos: n };
      a.then((h) => {
        this.pending == l && (this.pending = null, h && this.view.dispatch({ effects: this.setHover.of(h) }));
      }, (h) => Ne(this.view.state, h, "hover tooltip"));
    } else
      a && this.view.dispatch({ effects: this.setHover.of(a) });
  }
  mousemove(e) {
    var t;
    this.lastMove = { x: e.clientX, y: e.clientY, target: e.target, time: Date.now() }, this.hoverTimeout < 0 && (this.hoverTimeout = setTimeout(this.checkHover, this.hoverTime));
    let n = this.active;
    if (n && !_Q(this.lastMove.target) || this.pending) {
      let { pos: r } = n || this.pending, s = (t = n == null ? void 0 : n.end) !== null && t !== void 0 ? t : r;
      (r == s ? this.view.posAtCoords(this.lastMove) != r : !e0(
        this.view,
        r,
        s,
        e.clientX,
        e.clientY,
        6
        /* MaxDist */
      )) && (this.view.dispatch({ effects: this.setHover.of(null) }), this.pending = null);
    }
  }
  mouseleave() {
    clearTimeout(this.hoverTimeout), this.hoverTimeout = -1, this.active && this.view.dispatch({ effects: this.setHover.of(null) });
  }
  destroy() {
    clearTimeout(this.hoverTimeout), this.view.dom.removeEventListener("mouseleave", this.mouseleave), this.view.dom.removeEventListener("mousemove", this.mousemove);
  }
}
function _Q(i) {
  for (let e = i; e; e = e.parentNode)
    if (e.nodeType == 1 && e.classList.contains("cm-tooltip"))
      return !0;
  return !1;
}
function e0(i, e, t, n, r, s) {
  let o = document.createRange(), a = i.domAtPos(e), l = i.domAtPos(t);
  o.setEnd(l.node, l.offset), o.setStart(a.node, a.offset);
  let h = o.getClientRects();
  o.detach();
  for (let c = 0; c < h.length; c++) {
    let u = h[c];
    if (Math.max(u.top - r, r - u.bottom, u.left - n, n - u.right) <= s)
      return !0;
  }
  return !1;
}
function t0(i, e = {}) {
  let t = W.define(), n = Oe.define({
    create() {
      return null;
    },
    update(r, s) {
      if (r && e.hideOnChange && (s.docChanged || s.selection))
        return null;
      for (let o of s.effects) {
        if (o.is(t))
          return o.value;
        if (o.is(n0))
          return null;
      }
      if (r && s.docChanged) {
        let o = s.changes.mapPos(r.pos, -1, be.TrackDel);
        if (o == null)
          return null;
        let a = Object.assign(/* @__PURE__ */ Object.create(null), r);
        return a.pos = o, r.end != null && (a.end = s.changes.mapPos(r.end)), a;
      }
      return r;
    },
    provide: (r) => Rr.from(r)
  });
  return [
    n,
    le.define((r) => new $Q(
      r,
      i,
      n,
      t,
      e.hoverTime || 300
      /* Time */
    )),
    KQ
  ];
}
function i0(i, e) {
  let t = i.plugin(Ud);
  if (!t)
    return null;
  let n = t.manager.tooltips.indexOf(e);
  return n < 0 ? null : t.manager.tooltipViews[n];
}
const n0 = /* @__PURE__ */ W.define();
class r0 {
  /**
  Create a new completion context. (Mostly useful for testing
  completion sources—in the editor, the extension will create
  these for you.)
  */
  constructor(e, t, n) {
    this.state = e, this.pos = t, this.explicit = n, this.abortListeners = [];
  }
  /**
  Get the extent, content, and (if there is a token) type of the
  token before `this.pos`.
  */
  tokenBefore(e) {
    let t = he(this.state).resolveInner(this.pos, -1);
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
    let t = this.state.doc.lineAt(this.pos), n = Math.max(t.from, this.pos - 250), r = t.text.slice(n - t.from, this.pos - t.from), s = r.search(Yd(e, !1));
    return s < 0 ? null : { from: n + s, to: this.pos, text: r.slice(s) };
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
function lc(i) {
  let e = Object.keys(i).join(""), t = /\w/.test(e);
  return t && (e = e.replace(/\w/g, "")), `[${t ? "\\w" : ""}${e.replace(/[^\w\s]/g, "\\$&")}]`;
}
function s0(i) {
  let e = /* @__PURE__ */ Object.create(null), t = /* @__PURE__ */ Object.create(null);
  for (let { label: r } of i) {
    e[r[0]] = !0;
    for (let s = 1; s < r.length; s++)
      t[r[s]] = !0;
  }
  let n = lc(e) + lc(t) + "*$";
  return [new RegExp("^" + n), new RegExp(n)];
}
function Vd(i) {
  let e = i.map((r) => typeof r == "string" ? { label: r } : r), [t, n] = e.every((r) => /^\w+$/.test(r.label)) ? [/\w*$/, /\w+$/] : s0(e);
  return (r) => {
    let s = r.matchBefore(n);
    return s || r.explicit ? { from: s ? s.from : r.pos, options: e, span: t } : null;
  };
}
function o0(i, e) {
  return (t) => {
    for (let n = he(t.state).resolveInner(t.pos, -1); n; n = n.parent)
      if (i.indexOf(n.name) > -1)
        return null;
    return e(t);
  };
}
class hc {
  constructor(e, t, n) {
    this.completion = e, this.source = t, this.match = n;
  }
}
function fi(i) {
  return i.selection.main.head;
}
function Yd(i, e) {
  var t;
  let { source: n } = i, r = e && n[0] != "^", s = n[n.length - 1] != "$";
  return !r && !s ? i : new RegExp(`${r ? "^" : ""}(?:${n})${s ? "$" : ""}`, (t = i.flags) !== null && t !== void 0 ? t : i.ignoreCase ? "i" : "");
}
const a0 = /* @__PURE__ */ qt.define();
function qd(i, e) {
  let t = e.completion.apply || e.completion.label, n = e.source;
  typeof t == "string" ? i.dispatch({
    changes: { from: n.from, to: n.to, insert: t },
    selection: { anchor: n.from + t.length },
    userEvent: "input.complete",
    annotations: a0.of(e.completion)
  }) : t(i, e.completion, n.from, n.to);
}
const cc = /* @__PURE__ */ new WeakMap();
function l0(i) {
  if (!Array.isArray(i))
    return i;
  let e = cc.get(i);
  return e || cc.set(i, e = Vd(i)), e;
}
class h0 {
  constructor(e) {
    this.pattern = e, this.chars = [], this.folded = [], this.any = [], this.precise = [], this.byWord = [];
    for (let t = 0; t < e.length; ) {
      let n = we(e, t), r = Ye(n);
      this.chars.push(n);
      let s = e.slice(t, t + r), o = s.toUpperCase();
      this.folded.push(we(o == s ? s.toLowerCase() : o, 0)), t += r;
    }
    this.astral = e.length != this.chars.length;
  }
  // Matches a given word (completion) against the pattern (input).
  // Will return null for no match, and otherwise an array that starts
  // with the match score, followed by any number of `from, to` pairs
  // indicating the matched parts of `word`.
  //
  // The score is a number that is more negative the worse the match
  // is. See `Penalty` above.
  match(e) {
    if (this.pattern.length == 0)
      return [0];
    if (e.length < this.pattern.length)
      return null;
    let { chars: t, folded: n, any: r, precise: s, byWord: o } = this;
    if (t.length == 1) {
      let w = we(e, 0);
      return w == t[0] ? [0, 0, Ye(w)] : w == n[0] ? [-200, 0, Ye(w)] : null;
    }
    let a = e.indexOf(this.pattern);
    if (a == 0)
      return [0, 0, this.pattern.length];
    let l = t.length, h = 0;
    if (a < 0) {
      for (let w = 0, C = Math.min(e.length, 200); w < C && h < l; ) {
        let Q = we(e, w);
        (Q == t[h] || Q == n[h]) && (r[h++] = w), w += Ye(Q);
      }
      if (h < l)
        return null;
    }
    let c = 0, u = 0, f = !1, d = 0, g = -1, p = -1, O = /[a-z]/.test(e), m = !0;
    for (let w = 0, C = Math.min(e.length, 200), Q = 0; w < C && u < l; ) {
      let b = we(e, w);
      a < 0 && (c < l && b == t[c] && (s[c++] = w), d < l && (b == t[d] || b == n[d] ? (d == 0 && (g = w), p = w + 1, d++) : d = 0));
      let v, S = b < 255 ? b >= 48 && b <= 57 || b >= 97 && b <= 122 ? 2 : b >= 65 && b <= 90 ? 1 : 0 : (v = $o(b)) != v.toLowerCase() ? 1 : v != v.toUpperCase() ? 2 : 0;
      (!w || S == 1 && O || Q == 0 && S != 0) && (t[u] == b || n[u] == b && (f = !0) ? o[u++] = w : o.length && (m = !1)), Q = S, w += Ye(b);
    }
    return u == l && o[0] == 0 && m ? this.result(-100 + (f ? -200 : 0), o, e) : d == l && g == 0 ? [-200 - e.length, 0, p] : a > -1 ? [-700 - e.length, a, a + this.pattern.length] : d == l ? [-200 + -700 - e.length, g, p] : u == l ? this.result(-100 + (f ? -200 : 0) + -700 + (m ? 0 : -1100), o, e) : t.length == 2 ? null : this.result((r[0] ? -700 : 0) + -200 + -1100, r, e);
  }
  result(e, t, n) {
    let r = [e - n.length], s = 1;
    for (let o of t) {
      let a = o + (this.astral ? Ye(we(n, o)) : 1);
      s > 1 && r[s - 1] == o ? r[s - 1] = a : (r[s++] = o, r[s++] = a);
    }
    return r;
  }
}
const di = /* @__PURE__ */ P.define({
  combine(i) {
    return Gt(i, {
      activateOnTyping: !0,
      override: null,
      maxRenderedOptions: 100,
      defaultKeymap: !0,
      optionClass: () => "",
      aboveCursor: !1,
      icons: !0,
      addToOptions: []
    }, {
      defaultKeymap: (e, t) => e && t,
      icons: (e, t) => e && t,
      optionClass: (e, t) => (n) => c0(e(n), t(n)),
      addToOptions: (e, t) => e.concat(t)
    });
  }
});
function c0(i, e) {
  return i ? e ? i + " " + e : i : e;
}
function u0(i) {
  let e = i.addToOptions.slice();
  return i.icons && e.push({
    render(t) {
      let n = document.createElement("div");
      return n.classList.add("cm-completionIcon"), t.type && n.classList.add(...t.type.split(/\s+/g).map((r) => "cm-completionIcon-" + r)), n.setAttribute("aria-hidden", "true"), n;
    },
    position: 20
  }), e.push({
    render(t, n, r) {
      let s = document.createElement("span");
      s.className = "cm-completionLabel";
      let { label: o } = t, a = 0;
      for (let l = 1; l < r.length; ) {
        let h = r[l++], c = r[l++];
        h > a && s.appendChild(document.createTextNode(o.slice(a, h)));
        let u = s.appendChild(document.createElement("span"));
        u.appendChild(document.createTextNode(o.slice(h, c))), u.className = "cm-completionMatchedText", a = c;
      }
      return a < o.length && s.appendChild(document.createTextNode(o.slice(a))), s;
    },
    position: 50
  }, {
    render(t) {
      if (!t.detail)
        return null;
      let n = document.createElement("span");
      return n.className = "cm-completionDetail", n.textContent = t.detail, n;
    },
    position: 80
  }), e.sort((t, n) => t.position - n.position).map((t) => t.render);
}
function uc(i, e, t) {
  if (i <= t)
    return { from: 0, to: i };
  if (e <= i >> 1) {
    let r = Math.floor(e / t);
    return { from: r * t, to: (r + 1) * t };
  }
  let n = Math.floor((i - e) / t);
  return { from: i - (n + 1) * t, to: i - n * t };
}
class f0 {
  constructor(e, t) {
    this.view = e, this.stateField = t, this.info = null, this.placeInfo = {
      read: () => this.measureInfo(),
      write: (a) => this.positionInfo(a),
      key: this
    };
    let n = e.state.field(t), { options: r, selected: s } = n.open, o = e.state.facet(di);
    this.optionContent = u0(o), this.optionClass = o.optionClass, this.range = uc(r.length, s, o.maxRenderedOptions), this.dom = document.createElement("div"), this.dom.className = "cm-tooltip-autocomplete", this.dom.addEventListener("mousedown", (a) => {
      for (let l = a.target, h; l && l != this.dom; l = l.parentNode)
        if (l.nodeName == "LI" && (h = /-(\d+)$/.exec(l.id)) && +h[1] < r.length) {
          qd(e, r[+h[1]]), a.preventDefault();
          return;
        }
    }), this.list = this.dom.appendChild(this.createListBox(r, n.id, this.range)), this.list.addEventListener("scroll", () => {
      this.info && this.view.requestMeasure(this.placeInfo);
    });
  }
  mount() {
    this.updateSel();
  }
  update(e) {
    e.state.field(this.stateField) != e.startState.field(this.stateField) && this.updateSel();
  }
  positioned() {
    this.info && this.view.requestMeasure(this.placeInfo);
  }
  updateSel() {
    let e = this.view.state.field(this.stateField), t = e.open;
    if ((t.selected < this.range.from || t.selected >= this.range.to) && (this.range = uc(t.options.length, t.selected, this.view.state.facet(di).maxRenderedOptions), this.list.remove(), this.list = this.dom.appendChild(this.createListBox(t.options, e.id, this.range)), this.list.addEventListener("scroll", () => {
      this.info && this.view.requestMeasure(this.placeInfo);
    })), this.updateSelectedOption(t.selected)) {
      this.info && (this.info.remove(), this.info = null);
      let { completion: n } = t.options[t.selected], { info: r } = n;
      if (!r)
        return;
      let s = typeof r == "string" ? document.createTextNode(r) : r(n);
      if (!s)
        return;
      "then" in s ? s.then((o) => {
        o && this.view.state.field(this.stateField, !1) == e && this.addInfoPane(o);
      }).catch((o) => Ne(this.view.state, o, "completion info")) : this.addInfoPane(s);
    }
  }
  addInfoPane(e) {
    let t = this.info = document.createElement("div");
    t.className = "cm-tooltip cm-completionInfo", t.appendChild(e), this.dom.appendChild(t), this.view.requestMeasure(this.placeInfo);
  }
  updateSelectedOption(e) {
    let t = null;
    for (let n = this.list.firstChild, r = this.range.from; n; n = n.nextSibling, r++)
      r == e ? n.hasAttribute("aria-selected") || (n.setAttribute("aria-selected", "true"), t = n) : n.hasAttribute("aria-selected") && n.removeAttribute("aria-selected");
    return t && g0(this.list, t), t;
  }
  measureInfo() {
    let e = this.dom.querySelector("[aria-selected]");
    if (!e || !this.info)
      return null;
    let t = this.dom.getBoundingClientRect(), n = this.info.getBoundingClientRect(), r = e.getBoundingClientRect();
    if (r.top > Math.min(innerHeight, t.bottom) - 10 || r.bottom < Math.max(0, t.top) + 10)
      return null;
    let s = Math.max(0, Math.min(r.top, innerHeight - n.height)) - t.top, o = this.view.textDirection == q.RTL, a = t.left, l = innerWidth - t.right;
    return o && a < Math.min(n.width, l) ? o = !1 : !o && l < Math.min(n.width, a) && (o = !0), { top: s, left: o };
  }
  positionInfo(e) {
    this.info && (this.info.style.top = (e ? e.top : -1e6) + "px", e && (this.info.classList.toggle("cm-completionInfo-left", e.left), this.info.classList.toggle("cm-completionInfo-right", !e.left)));
  }
  createListBox(e, t, n) {
    const r = document.createElement("ul");
    r.id = t, r.setAttribute("role", "listbox"), r.setAttribute("aria-expanded", "true");
    for (let s = n.from; s < n.to; s++) {
      let { completion: o, match: a } = e[s];
      const l = r.appendChild(document.createElement("li"));
      l.id = t + "-" + s, l.setAttribute("role", "option");
      let h = this.optionClass(o);
      h && (l.className = h);
      for (let c of this.optionContent) {
        let u = c(o, this.view.state, a);
        u && l.appendChild(u);
      }
    }
    return n.from && r.classList.add("cm-completionListIncompleteTop"), n.to < e.length && r.classList.add("cm-completionListIncompleteBottom"), r;
  }
}
function d0(i) {
  return (e) => new f0(e, i);
}
function g0(i, e) {
  let t = i.getBoundingClientRect(), n = e.getBoundingClientRect();
  n.top < t.top ? i.scrollTop -= t.top - n.top : n.bottom > t.bottom && (i.scrollTop += n.bottom - t.bottom);
}
const A0 = 300;
function fc(i) {
  return (i.boost || 0) * 100 + (i.apply ? 10 : 0) + (i.info ? 5 : 0) + (i.type ? 1 : 0);
}
function p0(i, e) {
  let t = [], n = 0;
  for (let o of i)
    if (o.hasResult())
      if (o.result.filter === !1)
        for (let a of o.result.options)
          t.push(new hc(a, o, [1e9 - n++]));
      else {
        let a = new h0(e.sliceDoc(o.from, o.to)), l;
        for (let h of o.result.options)
          (l = a.match(h.label)) && (h.boost != null && (l[0] += h.boost), t.push(new hc(h, o, l)));
      }
  let r = [], s = null;
  for (let o of t.sort(b0)) {
    if (r.length == A0)
      break;
    !s || s.label != o.completion.label || s.detail != o.completion.detail || s.type != o.completion.type || s.apply != o.completion.apply ? r.push(o) : fc(o.completion) > fc(s) && (r[r.length - 1] = o), s = o.completion;
  }
  return r;
}
class cn {
  constructor(e, t, n, r, s) {
    this.options = e, this.attrs = t, this.tooltip = n, this.timestamp = r, this.selected = s;
  }
  setSelected(e, t) {
    return e == this.selected || e >= this.options.length ? this : new cn(this.options, dc(t, e), this.tooltip, this.timestamp, e);
  }
  static build(e, t, n, r, s) {
    let o = p0(e, t);
    if (!o.length)
      return null;
    let a = 0;
    if (r && r.selected) {
      let l = r.options[r.selected].completion;
      for (let h = 0; h < o.length; h++)
        if (o[h].completion == l) {
          a = h;
          break;
        }
    }
    return new cn(o, dc(n, a), {
      pos: e.reduce((l, h) => h.hasResult() ? Math.min(l, h.from) : l, 1e8),
      create: d0(_e),
      above: s.aboveCursor
    }, r ? r.timestamp : Date.now(), a);
  }
  map(e) {
    return new cn(this.options, this.attrs, Object.assign(Object.assign({}, this.tooltip), { pos: e.mapPos(this.tooltip.pos) }), this.timestamp, this.selected);
  }
}
class Dr {
  constructor(e, t, n) {
    this.active = e, this.id = t, this.open = n;
  }
  static start() {
    return new Dr(Q0, "cm-ac-" + Math.floor(Math.random() * 2e6).toString(36), null);
  }
  update(e) {
    let { state: t } = e, n = t.facet(di), s = (n.override || t.languageDataAt("autocomplete", fi(t)).map(l0)).map((a) => (this.active.find((h) => h.source == a) || new Ie(
      a,
      this.active.some(
        (h) => h.state != 0
        /* Inactive */
      ) ? 1 : 0
      /* Inactive */
    )).update(e, n));
    s.length == this.active.length && s.every((a, l) => a == this.active[l]) && (s = this.active);
    let o = e.selection || s.some((a) => a.hasResult() && e.changes.touchesRange(a.from, a.to)) || !O0(s, this.active) ? cn.build(s, t, this.id, this.open, n) : this.open && e.docChanged ? this.open.map(e.changes) : this.open;
    !o && s.every(
      (a) => a.state != 1
      /* Pending */
    ) && s.some((a) => a.hasResult()) && (s = s.map((a) => a.hasResult() ? new Ie(
      a.source,
      0
      /* Inactive */
    ) : a));
    for (let a of e.effects)
      a.is(Fd) && (o = o && o.setSelected(a.value, this.id));
    return s == this.active && o == this.open ? this : new Dr(s, this.id, o);
  }
  get tooltip() {
    return this.open ? this.open.tooltip : null;
  }
  get attrs() {
    return this.open ? this.open.attrs : m0;
  }
}
function O0(i, e) {
  if (i == e)
    return !0;
  for (let t = 0, n = 0; ; ) {
    for (; t < i.length && !i[t].hasResult; )
      t++;
    for (; n < e.length && !e[n].hasResult; )
      n++;
    let r = t == i.length, s = n == e.length;
    if (r || s)
      return r == s;
    if (i[t++].result != e[n++].result)
      return !1;
  }
}
const m0 = {
  "aria-autocomplete": "list"
};
function dc(i, e) {
  return {
    "aria-autocomplete": "list",
    "aria-haspopup": "listbox",
    "aria-activedescendant": i + "-" + e,
    "aria-controls": i
  };
}
const Q0 = [];
function b0(i, e) {
  let t = e.match[0] - i.match[0];
  return t || i.completion.label.localeCompare(e.completion.label);
}
function No(i) {
  return i.isUserEvent("input.type") ? "input" : i.isUserEvent("delete.backward") ? "delete" : null;
}
class Ie {
  constructor(e, t, n = -1) {
    this.source = e, this.state = t, this.explicitPos = n;
  }
  hasResult() {
    return !1;
  }
  update(e, t) {
    let n = No(e), r = this;
    n ? r = r.handleUserEvent(e, n, t) : e.docChanged ? r = r.handleChange(e) : e.selection && r.state != 0 && (r = new Ie(
      r.source,
      0
      /* Inactive */
    ));
    for (let s of e.effects)
      if (s.is(Ca))
        r = new Ie(r.source, 1, s.value ? fi(e.state) : -1);
      else if (s.is(Sa))
        r = new Ie(
          r.source,
          0
          /* Inactive */
        );
      else if (s.is(Gd))
        for (let o of s.value)
          o.source == r.source && (r = o);
    return r;
  }
  handleUserEvent(e, t, n) {
    return t == "delete" || !n.activateOnTyping ? this.map(e.changes) : new Ie(
      this.source,
      1
      /* Pending */
    );
  }
  handleChange(e) {
    return e.changes.touchesRange(fi(e.startState)) ? new Ie(
      this.source,
      0
      /* Inactive */
    ) : this.map(e.changes);
  }
  map(e) {
    return e.empty || this.explicitPos < 0 ? this : new Ie(this.source, this.state, e.mapPos(this.explicitPos));
  }
}
class Lr extends Ie {
  constructor(e, t, n, r, s, o) {
    super(e, 2, t), this.result = n, this.from = r, this.to = s, this.span = o;
  }
  hasResult() {
    return !0;
  }
  handleUserEvent(e, t, n) {
    let r = e.changes.mapPos(this.from), s = e.changes.mapPos(this.to, 1), o = fi(e.state);
    if ((this.explicitPos < 0 ? o <= r : o < this.from) || o > s || t == "delete" && fi(e.startState) == this.from)
      return new Ie(
        this.source,
        t == "input" && n.activateOnTyping ? 1 : 0
        /* Inactive */
      );
    let a = this.explicitPos < 0 ? -1 : e.changes.mapPos(this.explicitPos);
    return this.span && (r == s || this.span.test(e.state.sliceDoc(r, s))) ? new Lr(this.source, a, this.result, r, s, this.span) : new Ie(this.source, 1, a);
  }
  handleChange(e) {
    return e.changes.touchesRange(this.from, this.to) ? new Ie(
      this.source,
      0
      /* Inactive */
    ) : this.map(e.changes);
  }
  map(e) {
    return e.empty ? this : new Lr(this.source, this.explicitPos < 0 ? -1 : e.mapPos(this.explicitPos), this.result, e.mapPos(this.from), e.mapPos(this.to, 1), this.span);
  }
}
const Ca = /* @__PURE__ */ W.define(), Sa = /* @__PURE__ */ W.define(), Gd = /* @__PURE__ */ W.define({
  map(i, e) {
    return i.map((t) => t.map(e));
  }
}), Fd = /* @__PURE__ */ W.define(), _e = /* @__PURE__ */ Oe.define({
  create() {
    return Dr.start();
  },
  update(i, e) {
    return i.update(e);
  },
  provide: (i) => [
    wa.from(i, (e) => e.tooltip),
    I.contentAttributes.from(i, (e) => e.attrs)
  ]
}), Hd = 75;
function Hn(i, e = "option") {
  return (t) => {
    let n = t.state.field(_e, !1);
    if (!n || !n.open || Date.now() - n.open.timestamp < Hd)
      return !1;
    let r = 1, s;
    e == "page" && (s = i0(t, n.open.tooltip)) && (r = Math.max(2, Math.floor(s.dom.offsetHeight / s.dom.querySelector("li").offsetHeight) - 1));
    let o = n.open.selected + r * (i ? 1 : -1), { length: a } = n.open.options;
    return o < 0 ? o = e == "page" ? 0 : a - 1 : o >= a && (o = e == "page" ? a - 1 : 0), t.dispatch({ effects: Fd.of(o) }), !0;
  };
}
const y0 = (i) => {
  let e = i.state.field(_e, !1);
  return i.state.readOnly || !e || !e.open || Date.now() - e.open.timestamp < Hd ? !1 : (qd(i, e.open.options[e.open.selected]), !0);
}, w0 = (i) => i.state.field(_e, !1) ? (i.dispatch({ effects: Ca.of(!0) }), !0) : !1, v0 = (i) => {
  let e = i.state.field(_e, !1);
  return !e || !e.active.some(
    (t) => t.state != 0
    /* Inactive */
  ) ? !1 : (i.dispatch({ effects: Sa.of(null) }), !0);
};
class C0 {
  constructor(e, t) {
    this.active = e, this.context = t, this.time = Date.now(), this.updates = [], this.done = void 0;
  }
}
const gc = 50, S0 = 50, k0 = 1e3, E0 = /* @__PURE__ */ le.fromClass(class {
  constructor(i) {
    this.view = i, this.debounceUpdate = -1, this.running = [], this.debounceAccept = -1, this.composing = 0;
    for (let e of i.state.field(_e).active)
      e.state == 1 && this.startQuery(e);
  }
  update(i) {
    let e = i.state.field(_e);
    if (!i.selectionSet && !i.docChanged && i.startState.field(_e) == e)
      return;
    let t = i.transactions.some((n) => (n.selection || n.docChanged) && !No(n));
    for (let n = 0; n < this.running.length; n++) {
      let r = this.running[n];
      if (t || r.updates.length + i.transactions.length > S0 && Date.now() - r.time > k0) {
        for (let s of r.context.abortListeners)
          try {
            s();
          } catch (o) {
            Ne(this.view.state, o);
          }
        r.context.abortListeners = null, this.running.splice(n--, 1);
      } else
        r.updates.push(...i.transactions);
    }
    if (this.debounceUpdate > -1 && clearTimeout(this.debounceUpdate), this.debounceUpdate = e.active.some((n) => n.state == 1 && !this.running.some((r) => r.active.source == n.source)) ? setTimeout(() => this.startUpdate(), gc) : -1, this.composing != 0)
      for (let n of i.transactions)
        No(n) == "input" ? this.composing = 2 : this.composing == 2 && n.selection && (this.composing = 3);
  }
  startUpdate() {
    this.debounceUpdate = -1;
    let { state: i } = this.view, e = i.field(_e);
    for (let t of e.active)
      t.state == 1 && !this.running.some((n) => n.active.source == t.source) && this.startQuery(t);
  }
  startQuery(i) {
    let { state: e } = this.view, t = fi(e), n = new r0(e, t, i.explicitPos == t), r = new C0(i, n);
    this.running.push(r), Promise.resolve(i.source(n)).then((s) => {
      r.context.aborted || (r.done = s || null, this.scheduleAccept());
    }, (s) => {
      this.view.dispatch({ effects: Sa.of(null) }), Ne(this.view.state, s);
    });
  }
  scheduleAccept() {
    this.running.every((i) => i.done !== void 0) ? this.accept() : this.debounceAccept < 0 && (this.debounceAccept = setTimeout(() => this.accept(), gc));
  }
  // For each finished query in this.running, try to create a result
  // or, if appropriate, restart the query.
  accept() {
    var i;
    this.debounceAccept > -1 && clearTimeout(this.debounceAccept), this.debounceAccept = -1;
    let e = [], t = this.view.state.facet(di);
    for (let n = 0; n < this.running.length; n++) {
      let r = this.running[n];
      if (r.done === void 0)
        continue;
      if (this.running.splice(n--, 1), r.done) {
        let o = new Lr(r.active.source, r.active.explicitPos, r.done, r.done.from, (i = r.done.to) !== null && i !== void 0 ? i : fi(r.updates.length ? r.updates[0].startState : this.view.state), r.done.span && r.done.filter !== !1 ? Yd(r.done.span, !0) : null);
        for (let a of r.updates)
          o = o.update(a, t);
        if (o.hasResult()) {
          e.push(o);
          continue;
        }
      }
      let s = this.view.state.field(_e).active.find((o) => o.source == r.active.source);
      if (s && s.state == 1)
        if (r.done == null) {
          let o = new Ie(
            r.active.source,
            0
            /* Inactive */
          );
          for (let a of r.updates)
            o = o.update(a, t);
          o.state != 1 && e.push(o);
        } else
          this.startQuery(s);
    }
    e.length && this.view.dispatch({ effects: Gd.of(e) });
  }
}, {
  eventHandlers: {
    compositionstart() {
      this.composing = 1;
    },
    compositionend() {
      this.composing == 3 && setTimeout(() => this.view.dispatch({ effects: Ca.of(!1) }), 20), this.composing = 0;
    }
  }
}), Jd = /* @__PURE__ */ I.baseTheme({
  ".cm-tooltip.cm-tooltip-autocomplete": {
    "& > ul": {
      fontFamily: "monospace",
      whiteSpace: "nowrap",
      overflow: "hidden auto",
      maxWidth_fallback: "700px",
      maxWidth: "min(700px, 95vw)",
      minWidth: "250px",
      maxHeight: "10em",
      listStyle: "none",
      margin: 0,
      padding: 0,
      "& > li": {
        overflowX: "hidden",
        textOverflow: "ellipsis",
        cursor: "pointer",
        padding: "1px 3px",
        lineHeight: 1.2
      }
    }
  },
  "&light .cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "#17c",
    color: "white"
  },
  "&dark .cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "#347",
    color: "white"
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
    maxWidth: "300px"
  },
  ".cm-completionInfo.cm-completionInfo-left": { right: "100%" },
  ".cm-completionInfo.cm-completionInfo-right": { left: "100%" },
  "&light .cm-snippetField": { backgroundColor: "#00000022" },
  "&dark .cm-snippetField": { backgroundColor: "#ffffff22" },
  ".cm-snippetFieldPosition": {
    verticalAlign: "text-top",
    width: 0,
    height: "1.15em",
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
    opacity: "0.6"
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
class x0 {
  constructor(e, t, n, r) {
    this.field = e, this.line = t, this.from = n, this.to = r;
  }
}
class ka {
  constructor(e, t, n) {
    this.field = e, this.from = t, this.to = n;
  }
  map(e) {
    let t = e.mapPos(this.from, -1, be.TrackDel), n = e.mapPos(this.to, 1, be.TrackDel);
    return t == null || n == null ? null : new ka(this.field, t, n);
  }
}
class Ea {
  constructor(e, t) {
    this.lines = e, this.fieldPositions = t;
  }
  instantiate(e, t) {
    let n = [], r = [t], s = e.doc.lineAt(t), o = /^\s*/.exec(s.text)[0];
    for (let l of this.lines) {
      if (n.length) {
        let h = o, c = /^\t*/.exec(l)[0].length;
        for (let u = 0; u < c; u++)
          h += e.facet(Kr);
        r.push(t + h.length - c), l = h + l.slice(c);
      }
      n.push(l), t += l.length + 1;
    }
    let a = this.fieldPositions.map((l) => new ka(l.field, r[l.line] + l.from, r[l.line] + l.to));
    return { text: n, ranges: a };
  }
  static parse(e) {
    let t = [], n = [], r = [], s;
    for (let o of e.split(/\r\n?|\n/)) {
      for (; s = /[#$]\{(?:(\d+)(?::([^}]*))?|([^}]*))\}/.exec(o); ) {
        let a = s[1] ? +s[1] : null, l = s[2] || s[3] || "", h = -1;
        for (let c = 0; c < t.length; c++)
          (a != null ? t[c].seq == a : l && t[c].name == l) && (h = c);
        if (h < 0) {
          let c = 0;
          for (; c < t.length && (a == null || t[c].seq != null && t[c].seq < a); )
            c++;
          t.splice(c, 0, { seq: a, name: l }), h = c;
          for (let u of r)
            u.field >= h && u.field++;
        }
        r.push(new x0(h, n.length, s.index, s.index + l.length)), o = o.slice(0, s.index) + l + o.slice(s.index + s[0].length);
      }
      n.push(o);
    }
    return new Ea(n, r);
  }
}
let B0 = /* @__PURE__ */ T.widget({ widget: /* @__PURE__ */ new class extends Ot {
  toDOM() {
    let i = document.createElement("span");
    return i.className = "cm-snippetFieldPosition", i;
  }
  ignoreEvent() {
    return !1;
  }
}() }), I0 = /* @__PURE__ */ T.mark({ class: "cm-snippetField" });
class Vi {
  constructor(e, t) {
    this.ranges = e, this.active = t, this.deco = T.set(e.map((n) => (n.from == n.to ? B0 : I0).range(n.from, n.to)));
  }
  map(e) {
    let t = [];
    for (let n of this.ranges) {
      let r = n.map(e);
      if (!r)
        return null;
      t.push(r);
    }
    return new Vi(t, this.active);
  }
  selectionInsideField(e) {
    return e.ranges.every((t) => this.ranges.some((n) => n.field == this.active && n.from <= t.from && n.to >= t.to));
  }
}
const Pn = /* @__PURE__ */ W.define({
  map(i, e) {
    return i && i.map(e);
  }
}), T0 = /* @__PURE__ */ W.define(), vn = /* @__PURE__ */ Oe.define({
  create() {
    return null;
  },
  update(i, e) {
    for (let t of e.effects) {
      if (t.is(Pn))
        return t.value;
      if (t.is(T0) && i)
        return new Vi(i.ranges, t.value);
    }
    return i && e.docChanged && (i = i.map(e.changes)), i && e.selection && !i.selectionInsideField(e.selection) && (i = null), i;
  },
  provide: (i) => I.decorations.from(i, (e) => e ? e.deco : T.none)
});
function xa(i, e) {
  return y.create(i.filter((t) => t.field == e).map((t) => y.range(t.from, t.to)));
}
function P0(i) {
  let e = Ea.parse(i);
  return (t, n, r, s) => {
    let { text: o, ranges: a } = e.instantiate(t.state, r), l = { changes: { from: r, to: s, insert: G.of(o) } };
    if (a.length && (l.selection = xa(a, 0)), a.length > 1) {
      let h = new Vi(a, 0), c = l.effects = [Pn.of(h)];
      t.state.field(vn, !1) === void 0 && c.push(W.appendConfig.of([vn, M0, X0, Jd]));
    }
    t.dispatch(t.state.update(l));
  };
}
function Kd(i) {
  return ({ state: e, dispatch: t }) => {
    let n = e.field(vn, !1);
    if (!n || i < 0 && n.active == 0)
      return !1;
    let r = n.active + i, s = i > 0 && !n.ranges.some((o) => o.field == r + i);
    return t(e.update({
      selection: xa(n.ranges, r),
      effects: Pn.of(s ? null : new Vi(n.ranges, r))
    })), !0;
  };
}
const R0 = ({ state: i, dispatch: e }) => i.field(vn, !1) ? (e(i.update({ effects: Pn.of(null) })), !0) : !1, D0 = /* @__PURE__ */ Kd(1), L0 = /* @__PURE__ */ Kd(-1), W0 = [
  { key: "Tab", run: D0, shift: L0 },
  { key: "Escape", run: R0 }
], Ac = /* @__PURE__ */ P.define({
  combine(i) {
    return i.length ? i[0] : W0;
  }
}), M0 = /* @__PURE__ */ zi.highest(/* @__PURE__ */ Bn.compute([Ac], (i) => i.facet(Ac)));
function Kt(i, e) {
  return Object.assign(Object.assign({}, e), { apply: P0(i) });
}
const X0 = /* @__PURE__ */ I.domEventHandlers({
  mousedown(i, e) {
    let t = e.state.field(vn, !1), n;
    if (!t || (n = e.posAtCoords({ x: i.clientX, y: i.clientY })) == null)
      return !1;
    let r = t.ranges.find((s) => s.from <= n && s.to >= n);
    return !r || r.field == t.active ? !1 : (e.dispatch({
      selection: xa(t.ranges, r.field),
      effects: Pn.of(t.ranges.some((s) => s.field > r.field) ? new Vi(t.ranges, r.field) : null)
    }), !0);
  }
});
function j0(i = {}) {
  return [
    _e,
    di.of(i),
    E0,
    Z0,
    Jd
  ];
}
const $d = [
  { key: "Ctrl-Space", run: w0 },
  { key: "Escape", run: v0 },
  { key: "ArrowDown", run: /* @__PURE__ */ Hn(!0) },
  { key: "ArrowUp", run: /* @__PURE__ */ Hn(!1) },
  { key: "PageDown", run: /* @__PURE__ */ Hn(!0, "page") },
  { key: "PageUp", run: /* @__PURE__ */ Hn(!1, "page") },
  { key: "Enter", run: y0 }
], Z0 = /* @__PURE__ */ zi.highest(/* @__PURE__ */ Bn.computeN([di], (i) => i.facet(di).defaultKeymap ? [$d] : [])), N0 = (i) => {
  let e = Ia(i.state);
  return e.line ? z0(i) : e.block ? V0(i) : !1;
};
function Ba(i, e) {
  return ({ state: t, dispatch: n }) => {
    if (t.readOnly)
      return !1;
    let r = i(e, t);
    return r ? (n(t.update(r)), !0) : !1;
  };
}
const z0 = /* @__PURE__ */ Ba(
  F0,
  0
  /* Toggle */
), U0 = /* @__PURE__ */ Ba(
  _d,
  0
  /* Toggle */
), V0 = /* @__PURE__ */ Ba(
  (i, e) => _d(i, e, G0(e)),
  0
  /* Toggle */
), Y0 = [
  { key: "Mod-/", run: N0 },
  { key: "Alt-A", run: U0 }
];
function Ia(i, e = i.selection.main.head) {
  let t = i.languageDataAt("commentTokens", e);
  return t.length ? t[0] : {};
}
const Ji = 50;
function q0(i, { open: e, close: t }, n, r) {
  let s = i.sliceDoc(n - Ji, n), o = i.sliceDoc(r, r + Ji), a = /\s*$/.exec(s)[0].length, l = /^\s*/.exec(o)[0].length, h = s.length - a;
  if (s.slice(h - e.length, h) == e && o.slice(l, l + t.length) == t)
    return {
      open: { pos: n - a, margin: a && 1 },
      close: { pos: r + l, margin: l && 1 }
    };
  let c, u;
  r - n <= 2 * Ji ? c = u = i.sliceDoc(n, r) : (c = i.sliceDoc(n, n + Ji), u = i.sliceDoc(r - Ji, r));
  let f = /^\s*/.exec(c)[0].length, d = /\s*$/.exec(u)[0].length, g = u.length - d - t.length;
  return c.slice(f, f + e.length) == e && u.slice(g, g + t.length) == t ? {
    open: {
      pos: n + f + e.length,
      margin: /\s/.test(c.charAt(f + e.length)) ? 1 : 0
    },
    close: {
      pos: r - d - t.length,
      margin: /\s/.test(u.charAt(g - 1)) ? 1 : 0
    }
  } : null;
}
function G0(i) {
  let e = [];
  for (let t of i.selection.ranges) {
    let n = i.doc.lineAt(t.from), r = t.to <= n.to ? n : i.doc.lineAt(t.to), s = e.length - 1;
    s >= 0 && e[s].to > n.from ? e[s].to = r.to : e.push({ from: n.from, to: r.to });
  }
  return e;
}
function _d(i, e, t = e.selection.ranges) {
  let n = t.map((s) => Ia(e, s.from).block);
  if (!n.every((s) => s))
    return null;
  let r = t.map((s, o) => q0(e, n[o], s.from, s.to));
  if (i != 2 && !r.every((s) => s))
    return { changes: e.changes(t.map((s, o) => r[o] ? [] : [{ from: s.from, insert: n[o].open + " " }, { from: s.to, insert: " " + n[o].close }])) };
  if (i != 1 && r.some((s) => s)) {
    let s = [];
    for (let o = 0, a; o < r.length; o++)
      if (a = r[o]) {
        let l = n[o], { open: h, close: c } = a;
        s.push({ from: h.pos - l.open.length, to: h.pos + h.margin }, { from: c.pos - c.margin, to: c.pos + l.close.length });
      }
    return { changes: s };
  }
  return null;
}
function F0(i, e, t = e.selection.ranges) {
  let n = [], r = -1;
  for (let { from: s, to: o } of t) {
    let a = n.length, l = 1e9;
    for (let h = s; h <= o; ) {
      let c = e.doc.lineAt(h);
      if (c.from > r && (s == o || o > c.from)) {
        r = c.from;
        let u = Ia(e, h).line;
        if (!u)
          continue;
        let f = /^\s*/.exec(c.text)[0].length, d = f == c.length, g = c.text.slice(f, f + u.length) == u ? f : -1;
        f < c.text.length && f < l && (l = f), n.push({ line: c, comment: g, token: u, indent: f, empty: d, single: !1 });
      }
      h = c.to + 1;
    }
    if (l < 1e9)
      for (let h = a; h < n.length; h++)
        n[h].indent < n[h].line.text.length && (n[h].indent = l);
    n.length == a + 1 && (n[a].single = !0);
  }
  if (i != 2 && n.some((s) => s.comment < 0 && (!s.empty || s.single))) {
    let s = [];
    for (let { line: a, token: l, indent: h, empty: c, single: u } of n)
      (u || !c) && s.push({ from: a.from + h, insert: l + " " });
    let o = e.changes(s);
    return { changes: o, selection: e.selection.map(o, 1) };
  } else if (i != 1 && n.some((s) => s.comment >= 0)) {
    let s = [];
    for (let { line: o, comment: a, token: l } of n)
      if (a >= 0) {
        let h = o.from + a, c = h + l.length;
        o.text[c - o.from] == " " && c++, s.push({ from: h, to: c });
      }
    return { changes: s };
  }
  return null;
}
const zo = 2e3;
function H0(i, e, t) {
  let n = Math.min(e.line, t.line), r = Math.max(e.line, t.line), s = [];
  if (e.off > zo || t.off > zo || e.col < 0 || t.col < 0) {
    let o = Math.min(e.off, t.off), a = Math.max(e.off, t.off);
    for (let l = n; l <= r; l++) {
      let h = i.doc.line(l);
      h.length <= a && s.push(y.range(h.from + o, h.to + a));
    }
  } else {
    let o = Math.min(e.col, t.col), a = Math.max(e.col, t.col);
    for (let l = n; l <= r; l++) {
      let h = i.doc.line(l), c = eo(h.text, o, i.tabSize, !0);
      if (c > -1) {
        let u = eo(h.text, a, i.tabSize);
        s.push(y.range(h.from + c, h.from + u));
      }
    }
  }
  return s;
}
function J0(i, e) {
  let t = i.coordsAtPos(i.viewport.from);
  return t ? Math.round(Math.abs((t.left - e) / i.defaultCharacterWidth)) : -1;
}
function pc(i, e) {
  let t = i.posAtCoords({ x: e.clientX, y: e.clientY }, !1), n = i.state.doc.lineAt(t), r = t - n.from, s = r > zo ? -1 : r == n.length ? J0(i, e.clientX) : kn(n.text, i.state.tabSize, t - n.from);
  return { line: n.number, col: s, off: r };
}
function K0(i, e) {
  let t = pc(i, e), n = i.state.selection;
  return t ? {
    update(r) {
      if (r.docChanged) {
        let s = r.changes.mapPos(r.startState.doc.line(t.line).from), o = r.state.doc.lineAt(s);
        t = { line: o.number, col: t.col, off: Math.min(t.off, o.length) }, n = n.map(r.changes);
      }
    },
    get(r, s, o) {
      let a = pc(i, r);
      if (!a)
        return n;
      let l = H0(i.state, t, a);
      return l.length ? o ? y.create(l.concat(n.ranges)) : y.create(l) : n;
    }
  } : null;
}
function $0(i) {
  let e = (i == null ? void 0 : i.eventFilter) || ((t) => t.altKey && t.button == 0);
  return I.mouseSelectionStyle.of((t, n) => e(n) ? K0(t, n) : null);
}
const _0 = {
  Alt: [18, (i) => i.altKey],
  Control: [17, (i) => i.ctrlKey],
  Shift: [16, (i) => i.shiftKey],
  Meta: [91, (i) => i.metaKey]
}, eb = { style: "cursor: crosshair" };
function tb(i = {}) {
  let [e, t] = _0[i.key || "Alt"], n = le.fromClass(class {
    constructor(r) {
      this.view = r, this.isDown = !1;
    }
    set(r) {
      this.isDown != r && (this.isDown = r, this.view.update([]));
    }
  }, {
    eventHandlers: {
      keydown(r) {
        this.set(r.keyCode == e || t(r));
      },
      keyup(r) {
        (r.keyCode == e || !t(r)) && this.set(!1);
      }
    }
  });
  return [
    n,
    I.contentAttributes.of((r) => {
      var s;
      return !((s = r.plugin(n)) === null || s === void 0) && s.isDown ? eb : null;
    })
  ];
}
let ib = 0;
class at {
  /**
  @internal
  */
  constructor(e, t, n) {
    this.set = e, this.base = t, this.modified = n, this.id = ib++;
  }
  /**
  Define a new tag. If `parent` is given, the tag is treated as a
  sub-tag of that parent, and [highlight
  styles](https://codemirror.net/6/docs/ref/#highlight.HighlightStyle) that don't mention this tag
  will try to fall back to the parent tag (or grandparent tag,
  etc).
  */
  static define(e) {
    if (e != null && e.base)
      throw new Error("Can not derive from a modified tag");
    let t = new at([], null, []);
    if (t.set.push(t), e)
      for (let n of e.set)
        t.set.push(n);
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
    let e = new Wr();
    return (t) => t.modified.indexOf(e) > -1 ? t : Wr.get(t.base || t, t.modified.concat(e).sort((n, r) => n.id - r.id));
  }
}
let nb = 0;
class Wr {
  constructor() {
    this.instances = [], this.id = nb++;
  }
  static get(e, t) {
    if (!t.length)
      return e;
    let n = t[0].instances.find((a) => a.base == e && rb(t, a.modified));
    if (n)
      return n;
    let r = [], s = new at(r, e, t);
    for (let a of t)
      a.instances.push(s);
    let o = eg(t);
    for (let a of e.set)
      for (let l of o)
        r.push(Wr.get(a, l));
    return s;
  }
}
function rb(i, e) {
  return i.length == e.length && i.every((t, n) => t == e[n]);
}
function eg(i) {
  let e = [i];
  for (let t = 0; t < i.length; t++)
    for (let n of eg(i.slice(0, t).concat(i.slice(t + 1))))
      e.push(n);
  return e;
}
function Ta(i) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in i) {
    let n = i[t];
    Array.isArray(n) || (n = [n]);
    for (let r of t.split(" "))
      if (r) {
        let s = [], o = 2, a = r;
        for (let u = 0; ; ) {
          if (a == "..." && u > 0 && u + 3 == r.length) {
            o = 1;
            break;
          }
          let f = /^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(a);
          if (!f)
            throw new RangeError("Invalid path: " + r);
          if (s.push(f[0] == "*" ? null : f[0][0] == '"' ? JSON.parse(f[0]) : f[0]), u += f[0].length, u == r.length)
            break;
          let d = r[u++];
          if (u == r.length && d == "!") {
            o = 0;
            break;
          }
          if (d != "/")
            throw new RangeError("Invalid path: " + r);
          a = r.slice(u);
        }
        let l = s.length - 1, h = s[l];
        if (!h)
          throw new RangeError("Invalid path: " + r);
        let c = new sb(n, o, l > 0 ? s.slice(0, l) : null);
        e[h] = c.sort(e[h]);
      }
  }
  return tg.add(e);
}
const tg = /* @__PURE__ */ new M(), Mr = /* @__PURE__ */ P.define({
  combine(i) {
    return i.length ? Yi.combinedMatch(i) : null;
  }
}), ig = /* @__PURE__ */ P.define({
  combine(i) {
    return i.length ? i[0].match : null;
  }
});
function Uo(i) {
  return i.facet(Mr) || i.facet(ig);
}
class sb {
  constructor(e, t, n, r) {
    this.tags = e, this.mode = t, this.context = n, this.next = r;
  }
  sort(e) {
    return !e || e.depth < this.depth ? (this.next = e, this) : (e.next = this.sort(e.next), e);
  }
  get depth() {
    return this.context ? this.context.length : 0;
  }
}
class Yi {
  constructor(e, t) {
    this.map = /* @__PURE__ */ Object.create(null);
    let n;
    function r(o) {
      let a = Nt.newName();
      return (n || (n = /* @__PURE__ */ Object.create(null)))["." + a] = o, a;
    }
    this.all = typeof t.all == "string" ? t.all : t.all ? r(t.all) : null;
    for (let o of e) {
      let a = (o.class || r(Object.assign({}, o, { tag: null }))) + (this.all ? " " + this.all : ""), l = o.tag;
      if (!Array.isArray(l))
        this.map[l.id] = a;
      else
        for (let h of l)
          this.map[h.id] = a;
    }
    this.module = n ? new Nt(n) : null, this.scope = t.scope || null, this.match = this.match.bind(this);
    let s = [ab];
    this.module && s.push(I.styleModule.of(this.module)), this.extension = s.concat(t.themeType == null ? Mr.of(this) : Mr.computeN([I.darkTheme], (o) => o.facet(I.darkTheme) == (t.themeType == "dark") ? [this] : [])), this.fallback = s.concat(ig.of(this));
  }
  /**
  Returns the CSS class associated with the given tag, if any.
  This method is bound to the instance by the constructor.
  */
  match(e, t) {
    if (this.scope && t != this.scope)
      return null;
    for (let n of e.set) {
      let r = this.map[n.id];
      if (r !== void 0)
        return n != e && (this.map[e.id] = r), r;
    }
    return this.map[e.id] = this.all;
  }
  /**
  Combines an array of highlight styles into a single match
  function that returns all of the classes assigned by the styles
  for a given tag.
  */
  static combinedMatch(e) {
    if (e.length == 1)
      return e[0].match;
    let t = e.some((n) => n.scope) ? void 0 : /* @__PURE__ */ Object.create(null);
    return (n, r) => {
      let s = t && t[n.id];
      if (s !== void 0)
        return s;
      let o = null;
      for (let a of e) {
        let l = a.match(n, r);
        l && (o = o ? o + " " + l : l);
      }
      return t && (t[n.id] = o), o;
    };
  }
  /**
  Create a highlighter style that associates the given styles to
  the given tags. The spec must be objects that hold a style tag
  or array of tags in their `tag` property, and either a single
  `class` property providing a static CSS class (for highlighters
  like [`classHighlightStyle`](https://codemirror.net/6/docs/ref/#highlight.classHighlightStyle)
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
    return new Yi(e, t || {});
  }
  /**
  Returns the CSS classes (if any) that the highlight styles
  active in the given state would assign to the given a style
  [tag](https://codemirror.net/6/docs/ref/#highlight.Tag) and (optional) language
  [scope](https://codemirror.net/6/docs/ref/#highlight.HighlightStyle^define^options.scope).
  */
  static get(e, t, n) {
    let r = Uo(e);
    return r && r(t, n || Le.none);
  }
}
class ob {
  constructor(e) {
    this.markCache = /* @__PURE__ */ Object.create(null), this.tree = he(e.state), this.decorations = this.buildDeco(e, Uo(e.state));
  }
  update(e) {
    let t = he(e.state), n = Uo(e.state), r = n != e.startState.facet(Mr);
    t.length < e.view.viewport.to && !r && t.type == this.tree.type ? this.decorations = this.decorations.map(e.changes) : (t != this.tree || e.viewportChanged || r) && (this.tree = t, this.decorations = this.buildDeco(e.view, n));
  }
  buildDeco(e, t) {
    if (!t || !this.tree.length)
      return T.none;
    let n = new zt();
    for (let { from: r, to: s } of e.visibleRanges)
      hb(this.tree, r, s, t, (o, a, l) => {
        n.add(o, a, this.markCache[l] || (this.markCache[l] = T.mark({ class: l })));
      });
    return n.finish();
  }
}
const ab = /* @__PURE__ */ zi.high(/* @__PURE__ */ le.fromClass(ob, {
  decorations: (i) => i.decorations
})), Oc = [""];
class lb {
  constructor(e, t, n) {
    this.at = e, this.style = t, this.span = n, this.class = "";
  }
  startSpan(e, t) {
    t != this.class && (this.flush(e), e > this.at && (this.at = e), this.class = t);
  }
  flush(e) {
    e > this.at && this.class && this.span(this.at, e, this.class);
  }
  highlightRange(e, t, n, r, s, o) {
    let { type: a, from: l, to: h } = e;
    if (l >= n || h <= t)
      return;
    Oc[s] = a.name, a.isTop && (o = a);
    let c = r, u = a.prop(tg), f = !1;
    for (; u; ) {
      if (!u.context || cb(u.context, Oc, s)) {
        for (let g of u.tags) {
          let p = this.style(g, o);
          p && (c && (c += " "), c += p, u.mode == 1 ? r += (r ? " " : "") + p : u.mode == 0 && (f = !0));
        }
        break;
      }
      u = u.next;
    }
    if (this.startSpan(e.from, c), f)
      return;
    let d = e.tree && e.tree.prop(M.mounted);
    if (d && d.overlay) {
      let g = e.node.enter(d.overlay[0].from + l, 1), p = e.firstChild();
      for (let O = 0, m = l; ; O++) {
        let w = O < d.overlay.length ? d.overlay[O] : null, C = w ? w.from + l : h, Q = Math.max(t, m), b = Math.min(n, C);
        if (Q < b && p)
          for (; e.from < b && (this.highlightRange(e, Q, b, r, s + 1, o), this.startSpan(Math.min(n, e.to), c), !(e.to >= C || !e.nextSibling())); )
            ;
        if (!w || C > n)
          break;
        m = w.to + l, m > t && (this.highlightRange(g.cursor, Math.max(t, w.from + l), Math.min(n, m), r, s, d.tree.type), this.startSpan(m, c));
      }
      p && e.parent();
    } else if (e.firstChild()) {
      do
        if (!(e.to <= t)) {
          if (e.from >= n)
            break;
          this.highlightRange(e, t, n, r, s + 1, o), this.startSpan(Math.min(n, e.to), c);
        }
      while (e.nextSibling());
      e.parent();
    }
  }
}
function hb(i, e, t, n, r) {
  let s = new lb(e, n, r);
  s.highlightRange(i.cursor(), e, t, "", 0, i.type), s.flush(t);
}
function cb(i, e, t) {
  if (i.length > t - 1)
    return !1;
  for (let n = t - 1, r = i.length - 1; r >= 0; r--, n--) {
    let s = i[r];
    if (s && s != e[n])
      return !1;
  }
  return !0;
}
const k = at.define, Jn = /* @__PURE__ */ k(), Dt = /* @__PURE__ */ k(), mc = /* @__PURE__ */ k(Dt), Qc = /* @__PURE__ */ k(Dt), Lt = /* @__PURE__ */ k(), Kn = /* @__PURE__ */ k(Lt), js = /* @__PURE__ */ k(Lt), ot = /* @__PURE__ */ k(), $t = /* @__PURE__ */ k(ot), rt = /* @__PURE__ */ k(), st = /* @__PURE__ */ k(), Vo = /* @__PURE__ */ k(), Ki = /* @__PURE__ */ k(Vo), $n = /* @__PURE__ */ k(), A = {
  /**
  A comment.
  */
  comment: Jn,
  /**
  A line [comment](https://codemirror.net/6/docs/ref/#highlight.tags.comment).
  */
  lineComment: /* @__PURE__ */ k(Jn),
  /**
  A block [comment](https://codemirror.net/6/docs/ref/#highlight.tags.comment).
  */
  blockComment: /* @__PURE__ */ k(Jn),
  /**
  A documentation [comment](https://codemirror.net/6/docs/ref/#highlight.tags.comment).
  */
  docComment: /* @__PURE__ */ k(Jn),
  /**
  Any kind of identifier.
  */
  name: Dt,
  /**
  The [name](https://codemirror.net/6/docs/ref/#highlight.tags.name) of a variable.
  */
  variableName: /* @__PURE__ */ k(Dt),
  /**
  A type [name](https://codemirror.net/6/docs/ref/#highlight.tags.name).
  */
  typeName: mc,
  /**
  A tag name (subtag of [`typeName`](https://codemirror.net/6/docs/ref/#highlight.tags.typeName)).
  */
  tagName: /* @__PURE__ */ k(mc),
  /**
  A property or field [name](https://codemirror.net/6/docs/ref/#highlight.tags.name).
  */
  propertyName: Qc,
  /**
  An attribute name (subtag of [`propertyName`](https://codemirror.net/6/docs/ref/#highlight.tags.propertyName)).
  */
  attributeName: /* @__PURE__ */ k(Qc),
  /**
  The [name](https://codemirror.net/6/docs/ref/#highlight.tags.name) of a class.
  */
  className: /* @__PURE__ */ k(Dt),
  /**
  A label [name](https://codemirror.net/6/docs/ref/#highlight.tags.name).
  */
  labelName: /* @__PURE__ */ k(Dt),
  /**
  A namespace [name](https://codemirror.net/6/docs/ref/#highlight.tags.name).
  */
  namespace: /* @__PURE__ */ k(Dt),
  /**
  The [name](https://codemirror.net/6/docs/ref/#highlight.tags.name) of a macro.
  */
  macroName: /* @__PURE__ */ k(Dt),
  /**
  A literal value.
  */
  literal: Lt,
  /**
  A string [literal](https://codemirror.net/6/docs/ref/#highlight.tags.literal).
  */
  string: Kn,
  /**
  A documentation [string](https://codemirror.net/6/docs/ref/#highlight.tags.string).
  */
  docString: /* @__PURE__ */ k(Kn),
  /**
  A character literal (subtag of [string](https://codemirror.net/6/docs/ref/#highlight.tags.string)).
  */
  character: /* @__PURE__ */ k(Kn),
  /**
  An attribute value (subtag of [string](https://codemirror.net/6/docs/ref/#highlight.tags.string)).
  */
  attributeValue: /* @__PURE__ */ k(Kn),
  /**
  A number [literal](https://codemirror.net/6/docs/ref/#highlight.tags.literal).
  */
  number: js,
  /**
  An integer [number](https://codemirror.net/6/docs/ref/#highlight.tags.number) literal.
  */
  integer: /* @__PURE__ */ k(js),
  /**
  A floating-point [number](https://codemirror.net/6/docs/ref/#highlight.tags.number) literal.
  */
  float: /* @__PURE__ */ k(js),
  /**
  A boolean [literal](https://codemirror.net/6/docs/ref/#highlight.tags.literal).
  */
  bool: /* @__PURE__ */ k(Lt),
  /**
  Regular expression [literal](https://codemirror.net/6/docs/ref/#highlight.tags.literal).
  */
  regexp: /* @__PURE__ */ k(Lt),
  /**
  An escape [literal](https://codemirror.net/6/docs/ref/#highlight.tags.literal), for example a
  backslash escape in a string.
  */
  escape: /* @__PURE__ */ k(Lt),
  /**
  A color [literal](https://codemirror.net/6/docs/ref/#highlight.tags.literal).
  */
  color: /* @__PURE__ */ k(Lt),
  /**
  A URL [literal](https://codemirror.net/6/docs/ref/#highlight.tags.literal).
  */
  url: /* @__PURE__ */ k(Lt),
  /**
  A language keyword.
  */
  keyword: rt,
  /**
  The [keyword](https://codemirror.net/6/docs/ref/#highlight.tags.keyword) for the self or this
  object.
  */
  self: /* @__PURE__ */ k(rt),
  /**
  The [keyword](https://codemirror.net/6/docs/ref/#highlight.tags.keyword) for null.
  */
  null: /* @__PURE__ */ k(rt),
  /**
  A [keyword](https://codemirror.net/6/docs/ref/#highlight.tags.keyword) denoting some atomic value.
  */
  atom: /* @__PURE__ */ k(rt),
  /**
  A [keyword](https://codemirror.net/6/docs/ref/#highlight.tags.keyword) that represents a unit.
  */
  unit: /* @__PURE__ */ k(rt),
  /**
  A modifier [keyword](https://codemirror.net/6/docs/ref/#highlight.tags.keyword).
  */
  modifier: /* @__PURE__ */ k(rt),
  /**
  A [keyword](https://codemirror.net/6/docs/ref/#highlight.tags.keyword) that acts as an operator.
  */
  operatorKeyword: /* @__PURE__ */ k(rt),
  /**
  A control-flow related [keyword](https://codemirror.net/6/docs/ref/#highlight.tags.keyword).
  */
  controlKeyword: /* @__PURE__ */ k(rt),
  /**
  A [keyword](https://codemirror.net/6/docs/ref/#highlight.tags.keyword) that defines something.
  */
  definitionKeyword: /* @__PURE__ */ k(rt),
  /**
  A [keyword](https://codemirror.net/6/docs/ref/#highlight.tags.keyword) related to defining or
  interfacing with modules.
  */
  moduleKeyword: /* @__PURE__ */ k(rt),
  /**
  An operator.
  */
  operator: st,
  /**
  An [operator](https://codemirror.net/6/docs/ref/#highlight.tags.operator) that defines something.
  */
  derefOperator: /* @__PURE__ */ k(st),
  /**
  Arithmetic-related [operator](https://codemirror.net/6/docs/ref/#highlight.tags.operator).
  */
  arithmeticOperator: /* @__PURE__ */ k(st),
  /**
  Logical [operator](https://codemirror.net/6/docs/ref/#highlight.tags.operator).
  */
  logicOperator: /* @__PURE__ */ k(st),
  /**
  Bit [operator](https://codemirror.net/6/docs/ref/#highlight.tags.operator).
  */
  bitwiseOperator: /* @__PURE__ */ k(st),
  /**
  Comparison [operator](https://codemirror.net/6/docs/ref/#highlight.tags.operator).
  */
  compareOperator: /* @__PURE__ */ k(st),
  /**
  [Operator](https://codemirror.net/6/docs/ref/#highlight.tags.operator) that updates its operand.
  */
  updateOperator: /* @__PURE__ */ k(st),
  /**
  [Operator](https://codemirror.net/6/docs/ref/#highlight.tags.operator) that defines something.
  */
  definitionOperator: /* @__PURE__ */ k(st),
  /**
  Type-related [operator](https://codemirror.net/6/docs/ref/#highlight.tags.operator).
  */
  typeOperator: /* @__PURE__ */ k(st),
  /**
  Control-flow [operator](https://codemirror.net/6/docs/ref/#highlight.tags.operator).
  */
  controlOperator: /* @__PURE__ */ k(st),
  /**
  Program or markup punctuation.
  */
  punctuation: Vo,
  /**
  [Punctuation](https://codemirror.net/6/docs/ref/#highlight.tags.punctuation) that separates
  things.
  */
  separator: /* @__PURE__ */ k(Vo),
  /**
  Bracket-style [punctuation](https://codemirror.net/6/docs/ref/#highlight.tags.punctuation).
  */
  bracket: Ki,
  /**
  Angle [brackets](https://codemirror.net/6/docs/ref/#highlight.tags.bracket) (usually `<` and `>`
  tokens).
  */
  angleBracket: /* @__PURE__ */ k(Ki),
  /**
  Square [brackets](https://codemirror.net/6/docs/ref/#highlight.tags.bracket) (usually `[` and `]`
  tokens).
  */
  squareBracket: /* @__PURE__ */ k(Ki),
  /**
  Parentheses (usually `(` and `)` tokens). Subtag of
  [bracket](https://codemirror.net/6/docs/ref/#highlight.tags.bracket).
  */
  paren: /* @__PURE__ */ k(Ki),
  /**
  Braces (usually `{` and `}` tokens). Subtag of
  [bracket](https://codemirror.net/6/docs/ref/#highlight.tags.bracket).
  */
  brace: /* @__PURE__ */ k(Ki),
  /**
  Content, for example plain text in XML or markup documents.
  */
  content: ot,
  /**
  [Content](https://codemirror.net/6/docs/ref/#highlight.tags.content) that represents a heading.
  */
  heading: $t,
  /**
  A level 1 [heading](https://codemirror.net/6/docs/ref/#highlight.tags.heading).
  */
  heading1: /* @__PURE__ */ k($t),
  /**
  A level 2 [heading](https://codemirror.net/6/docs/ref/#highlight.tags.heading).
  */
  heading2: /* @__PURE__ */ k($t),
  /**
  A level 3 [heading](https://codemirror.net/6/docs/ref/#highlight.tags.heading).
  */
  heading3: /* @__PURE__ */ k($t),
  /**
  A level 4 [heading](https://codemirror.net/6/docs/ref/#highlight.tags.heading).
  */
  heading4: /* @__PURE__ */ k($t),
  /**
  A level 5 [heading](https://codemirror.net/6/docs/ref/#highlight.tags.heading).
  */
  heading5: /* @__PURE__ */ k($t),
  /**
  A level 6 [heading](https://codemirror.net/6/docs/ref/#highlight.tags.heading).
  */
  heading6: /* @__PURE__ */ k($t),
  /**
  A prose separator (such as a horizontal rule).
  */
  contentSeparator: /* @__PURE__ */ k(ot),
  /**
  [Content](https://codemirror.net/6/docs/ref/#highlight.tags.content) that represents a list.
  */
  list: /* @__PURE__ */ k(ot),
  /**
  [Content](https://codemirror.net/6/docs/ref/#highlight.tags.content) that represents a quote.
  */
  quote: /* @__PURE__ */ k(ot),
  /**
  [Content](https://codemirror.net/6/docs/ref/#highlight.tags.content) that is emphasized.
  */
  emphasis: /* @__PURE__ */ k(ot),
  /**
  [Content](https://codemirror.net/6/docs/ref/#highlight.tags.content) that is styled strong.
  */
  strong: /* @__PURE__ */ k(ot),
  /**
  [Content](https://codemirror.net/6/docs/ref/#highlight.tags.content) that is part of a link.
  */
  link: /* @__PURE__ */ k(ot),
  /**
  [Content](https://codemirror.net/6/docs/ref/#highlight.tags.content) that is styled as code or
  monospace.
  */
  monospace: /* @__PURE__ */ k(ot),
  /**
  [Content](https://codemirror.net/6/docs/ref/#highlight.tags.content) that has a strike-through
  style.
  */
  strikethrough: /* @__PURE__ */ k(ot),
  /**
  Inserted text in a change-tracking format.
  */
  inserted: /* @__PURE__ */ k(),
  /**
  Deleted text.
  */
  deleted: /* @__PURE__ */ k(),
  /**
  Changed text.
  */
  changed: /* @__PURE__ */ k(),
  /**
  An invalid or unsyntactic element.
  */
  invalid: /* @__PURE__ */ k(),
  /**
  Metadata or meta-instruction.
  */
  meta: $n,
  /**
  [Metadata](https://codemirror.net/6/docs/ref/#highlight.tags.meta) that applies to the entire
  document.
  */
  documentMeta: /* @__PURE__ */ k($n),
  /**
  [Metadata](https://codemirror.net/6/docs/ref/#highlight.tags.meta) that annotates or adds
  attributes to a given syntactic element.
  */
  annotation: /* @__PURE__ */ k($n),
  /**
  Processing instruction or preprocessor directive. Subtag of
  [meta](https://codemirror.net/6/docs/ref/#highlight.tags.meta).
  */
  processingInstruction: /* @__PURE__ */ k($n),
  /**
  [Modifier](https://codemirror.net/6/docs/ref/#highlight.Tag^defineModifier) that indicates that a
  given element is being defined. Expected to be used with the
  various [name](https://codemirror.net/6/docs/ref/#highlight.tags.name) tags.
  */
  definition: /* @__PURE__ */ at.defineModifier(),
  /**
  [Modifier](https://codemirror.net/6/docs/ref/#highlight.Tag^defineModifier) that indicates that
  something is constant. Mostly expected to be used with
  [variable names](https://codemirror.net/6/docs/ref/#highlight.tags.variableName).
  */
  constant: /* @__PURE__ */ at.defineModifier(),
  /**
  [Modifier](https://codemirror.net/6/docs/ref/#highlight.Tag^defineModifier) used to indicate that
  a [variable](https://codemirror.net/6/docs/ref/#highlight.tags.variableName) or [property
  name](https://codemirror.net/6/docs/ref/#highlight.tags.propertyName) is being called or defined
  as a function.
  */
  function: /* @__PURE__ */ at.defineModifier(),
  /**
  [Modifier](https://codemirror.net/6/docs/ref/#highlight.Tag^defineModifier) that can be applied to
  [names](https://codemirror.net/6/docs/ref/#highlight.tags.name) to indicate that they belong to
  the language's standard environment.
  */
  standard: /* @__PURE__ */ at.defineModifier(),
  /**
  [Modifier](https://codemirror.net/6/docs/ref/#highlight.Tag^defineModifier) that indicates a given
  [names](https://codemirror.net/6/docs/ref/#highlight.tags.name) is local to some scope.
  */
  local: /* @__PURE__ */ at.defineModifier(),
  /**
  A generic variant [modifier](https://codemirror.net/6/docs/ref/#highlight.Tag^defineModifier) that
  can be used to tag language-specific alternative variants of
  some common tag. It is recommended for themes to define special
  forms of at least the [string](https://codemirror.net/6/docs/ref/#highlight.tags.string) and
  [variable name](https://codemirror.net/6/docs/ref/#highlight.tags.variableName) tags, since those
  come up a lot.
  */
  special: /* @__PURE__ */ at.defineModifier()
}, ub = /* @__PURE__ */ Yi.define([
  {
    tag: A.link,
    textDecoration: "underline"
  },
  {
    tag: A.heading,
    textDecoration: "underline",
    fontWeight: "bold"
  },
  {
    tag: A.emphasis,
    fontStyle: "italic"
  },
  {
    tag: A.strong,
    fontWeight: "bold"
  },
  {
    tag: A.strikethrough,
    textDecoration: "line-through"
  },
  {
    tag: A.keyword,
    color: "#708"
  },
  {
    tag: [A.atom, A.bool, A.url, A.contentSeparator, A.labelName],
    color: "#219"
  },
  {
    tag: [A.literal, A.inserted],
    color: "#164"
  },
  {
    tag: [A.string, A.deleted],
    color: "#a11"
  },
  {
    tag: [A.regexp, A.escape, /* @__PURE__ */ A.special(A.string)],
    color: "#e40"
  },
  {
    tag: /* @__PURE__ */ A.definition(A.variableName),
    color: "#00f"
  },
  {
    tag: /* @__PURE__ */ A.local(A.variableName),
    color: "#30a"
  },
  {
    tag: [A.typeName, A.namespace],
    color: "#085"
  },
  {
    tag: A.className,
    color: "#167"
  },
  {
    tag: [/* @__PURE__ */ A.special(A.variableName), A.macroName],
    color: "#256"
  },
  {
    tag: /* @__PURE__ */ A.definition(A.propertyName),
    color: "#00c"
  },
  {
    tag: A.comment,
    color: "#940"
  },
  {
    tag: A.meta,
    color: "#7a757a"
  },
  {
    tag: A.invalid,
    color: "#f00"
  }
]);
A.link, A.heading, A.emphasis, A.strong, A.keyword, A.atom, A.bool, A.url, A.labelName, A.inserted, A.deleted, A.literal, A.string, A.number, A.regexp, A.escape, A.string, A.variableName, A.variableName, A.variableName, A.variableName, A.propertyName, A.typeName, A.namespace, A.className, A.macroName, A.propertyName, A.operator, A.comment, A.meta, A.invalid, A.punctuation;
class fb {
  constructor(e, t, n) {
    this.from = e, this.to = t, this.diagnostic = n;
  }
}
let bi = class {
  constructor(e, t, n) {
    this.diagnostics = e, this.panel = t, this.selected = n;
  }
  static init(e, t, n) {
    let r = T.set(e.map((s) => s.from == s.to || s.from == s.to - 1 && n.doc.lineAt(s.from).to == s.from ? T.widget({
      widget: new yb(s),
      diagnostic: s
    }).range(s.from) : T.mark({
      attributes: { class: "cm-lintRange cm-lintRange-" + s.severity },
      diagnostic: s
    }).range(s.from, s.to)), !0);
    return new bi(r, t, Di(r));
  }
};
function Di(i, e = null, t = 0) {
  let n = null;
  return i.between(t, 1e9, (r, s, { spec: o }) => {
    if (!(e && o.diagnostic != e))
      return n = new fb(r, s, o.diagnostic), !1;
  }), n;
}
function ng(i, e) {
  return i.field(Ze, !1) ? e : e.concat(W.appendConfig.of([
    Ze,
    I.decorations.compute([Ze], (t) => {
      let { selected: n, panel: r } = t.field(Ze);
      return !n || !r || n.from == n.to ? T.none : T.set([
        gb.range(n.from, n.to)
      ]);
    }),
    t0(Ab),
    vb
  ]));
}
function db(i, e) {
  return {
    effects: ng(i, [rg.of(e)])
  };
}
const rg = /* @__PURE__ */ W.define(), Pa = /* @__PURE__ */ W.define(), sg = /* @__PURE__ */ W.define(), Ze = /* @__PURE__ */ Oe.define({
  create() {
    return new bi(T.none, null, null);
  },
  update(i, e) {
    if (e.docChanged) {
      let t = i.diagnostics.map(e.changes), n = null;
      if (i.selected) {
        let r = e.changes.mapPos(i.selected.from, 1);
        n = Di(t, i.selected.diagnostic, r) || Di(t, null, r);
      }
      i = new bi(t, i.panel, n);
    }
    for (let t of e.effects)
      t.is(rg) ? i = bi.init(t.value, i.panel, e.state) : t.is(Pa) ? i = new bi(i.diagnostics, t.value ? hs.open : null, i.selected) : t.is(sg) && (i = new bi(i.diagnostics, i.panel, t.value));
    return i;
  },
  provide: (i) => [
    ui.from(i, (e) => e.panel),
    I.decorations.from(i, (e) => e.diagnostics)
  ]
}), gb = /* @__PURE__ */ T.mark({ class: "cm-lintRange cm-lintRange-active" });
function Ab(i, e, t) {
  let { diagnostics: n } = i.state.field(Ze), r = [], s = 2e8, o = 0;
  return n.between(e - (t < 0 ? 1 : 0), e + (t > 0 ? 1 : 0), (a, l, { spec: h }) => {
    e >= a && e <= l && (a == l || (e > a || t > 0) && (e < l || t < 0)) && (r.push(h.diagnostic), s = Math.min(a, s), o = Math.max(l, o));
  }), r.length ? {
    pos: s,
    end: o,
    above: i.state.doc.lineAt(s).to < o,
    create() {
      return { dom: pb(i, r) };
    }
  } : null;
}
function pb(i, e) {
  return _("ul", { class: "cm-tooltip-lint" }, e.map((t) => hg(i, t, !1)));
}
const Ob = (i) => {
  let e = i.state.field(Ze, !1);
  (!e || !e.panel) && i.dispatch({ effects: ng(i.state, [Pa.of(!0)]) });
  let t = yn(i, hs.open);
  return t && t.dom.querySelector(".cm-panel-lint ul").focus(), !0;
}, bc = (i) => {
  let e = i.state.field(Ze, !1);
  return !e || !e.panel ? !1 : (i.dispatch({ effects: Pa.of(!1) }), !0);
}, mb = (i) => {
  let e = i.state.field(Ze, !1);
  if (!e)
    return !1;
  let t = i.state.selection.main, n = e.diagnostics.iter(t.to + 1);
  return !n.value && (n = e.diagnostics.iter(0), !n.value || n.from == t.from && n.to == t.to) ? !1 : (i.dispatch({ selection: { anchor: n.from, head: n.to }, scrollIntoView: !0 }), !0);
}, og = [
  { key: "Mod-Shift-m", run: Ob },
  { key: "F8", run: mb }
], ag = /* @__PURE__ */ le.fromClass(class {
  constructor(i) {
    this.view = i, this.timeout = -1, this.set = !0;
    let { delay: e } = i.state.facet(on);
    this.lintTime = Date.now() + e, this.run = this.run.bind(this), this.timeout = setTimeout(this.run, e);
  }
  run() {
    let i = Date.now();
    if (i < this.lintTime - 10)
      setTimeout(this.run, this.lintTime - i);
    else {
      this.set = !1;
      let { state: e } = this.view, { sources: t } = e.facet(on);
      Promise.all(t.map((n) => Promise.resolve(n(this.view)))).then((n) => {
        let r = n.reduce((s, o) => s.concat(o));
        this.view.state.doc == e.doc && this.view.dispatch(db(this.view.state, r));
      }, (n) => {
        Ne(this.view.state, n);
      });
    }
  }
  update(i) {
    let e = i.state.facet(on);
    (i.docChanged || e != i.startState.facet(on)) && (this.lintTime = Date.now() + e.delay, this.set || (this.set = !0, this.timeout = setTimeout(this.run, e.delay)));
  }
  force() {
    this.set && (this.lintTime = Date.now(), this.run());
  }
  destroy() {
    clearTimeout(this.timeout);
  }
}), on = /* @__PURE__ */ P.define({
  combine(i) {
    return { sources: i.map((e) => e.source), delay: i.length ? Math.max(...i.map((e) => e.delay)) : 750 };
  },
  enables: ag
});
function Qb(i, e = {}) {
  var t;
  return on.of({ source: i, delay: (t = e.delay) !== null && t !== void 0 ? t : 750 });
}
function bb(i) {
  let e = i.plugin(ag);
  e && e.force();
}
function lg(i) {
  let e = [];
  if (i)
    e:
      for (let { name: t } of i) {
        for (let n = 0; n < t.length; n++) {
          let r = t[n];
          if (/[a-zA-Z]/.test(r) && !e.some((s) => s.toLowerCase() == r.toLowerCase())) {
            e.push(r);
            continue e;
          }
        }
        e.push("");
      }
  return e;
}
function hg(i, e, t) {
  var n;
  let r = t ? lg(e.actions) : [];
  return _("li", { class: "cm-diagnostic cm-diagnostic-" + e.severity }, _("span", { class: "cm-diagnosticText" }, e.message), (n = e.actions) === null || n === void 0 ? void 0 : n.map((s, o) => {
    let a = (u) => {
      u.preventDefault();
      let f = Di(i.state.field(Ze).diagnostics, e);
      f && s.apply(i, f.from, f.to);
    }, { name: l } = s, h = r[o] ? l.indexOf(r[o]) : -1, c = h < 0 ? l : [
      l.slice(0, h),
      _("u", l.slice(h, h + 1)),
      l.slice(h + 1)
    ];
    return _("button", {
      type: "button",
      class: "cm-diagnosticAction",
      onclick: a,
      onmousedown: a,
      "aria-label": ` Action: ${l}${h < 0 ? "" : ` (access key "${r[o]})"`}.`
    }, c);
  }), e.source && _("div", { class: "cm-diagnosticSource" }, e.source));
}
let yb = class extends Ot {
  constructor(e) {
    super(), this.diagnostic = e;
  }
  eq(e) {
    return e.diagnostic == this.diagnostic;
  }
  toDOM() {
    return _("span", { class: "cm-lintPoint cm-lintPoint-" + this.diagnostic.severity });
  }
};
class yc {
  constructor(e, t) {
    this.diagnostic = t, this.id = "item_" + Math.floor(Math.random() * 4294967295).toString(16), this.dom = hg(e, t, !0), this.dom.id = this.id, this.dom.setAttribute("role", "option");
  }
}
class hs {
  constructor(e) {
    this.view = e, this.items = [];
    let t = (r) => {
      if (r.keyCode == 27)
        bc(this.view), this.view.focus();
      else if (r.keyCode == 38 || r.keyCode == 33)
        this.moveSelection((this.selectedIndex - 1 + this.items.length) % this.items.length);
      else if (r.keyCode == 40 || r.keyCode == 34)
        this.moveSelection((this.selectedIndex + 1) % this.items.length);
      else if (r.keyCode == 36)
        this.moveSelection(0);
      else if (r.keyCode == 35)
        this.moveSelection(this.items.length - 1);
      else if (r.keyCode == 13)
        this.view.focus();
      else if (r.keyCode >= 65 && r.keyCode <= 90 && this.selectedIndex >= 0) {
        let { diagnostic: s } = this.items[this.selectedIndex], o = lg(s.actions);
        for (let a = 0; a < o.length; a++)
          if (o[a].toUpperCase().charCodeAt(0) == r.keyCode) {
            let l = Di(this.view.state.field(Ze).diagnostics, s);
            l && s.actions[a].apply(e, l.from, l.to);
          }
      } else
        return;
      r.preventDefault();
    }, n = (r) => {
      for (let s = 0; s < this.items.length; s++)
        this.items[s].dom.contains(r.target) && this.moveSelection(s);
    };
    this.list = _("ul", {
      tabIndex: 0,
      role: "listbox",
      "aria-label": this.view.state.phrase("Diagnostics"),
      onkeydown: t,
      onclick: n
    }), this.dom = _("div", { class: "cm-panel-lint" }, this.list, _("button", {
      type: "button",
      name: "close",
      "aria-label": this.view.state.phrase("close"),
      onclick: () => bc(this.view)
    }, "×")), this.update();
  }
  get selectedIndex() {
    let e = this.view.state.field(Ze).selected;
    if (!e)
      return -1;
    for (let t = 0; t < this.items.length; t++)
      if (this.items[t].diagnostic == e.diagnostic)
        return t;
    return -1;
  }
  update() {
    let { diagnostics: e, selected: t } = this.view.state.field(Ze), n = 0, r = !1, s = null;
    for (e.between(0, this.view.state.doc.length, (o, a, { spec: l }) => {
      let h = -1, c;
      for (let u = n; u < this.items.length; u++)
        if (this.items[u].diagnostic == l.diagnostic) {
          h = u;
          break;
        }
      h < 0 ? (c = new yc(this.view, l.diagnostic), this.items.splice(n, 0, c), r = !0) : (c = this.items[h], h > n && (this.items.splice(n, h - n), r = !0)), t && c.diagnostic == t.diagnostic ? c.dom.hasAttribute("aria-selected") || (c.dom.setAttribute("aria-selected", "true"), s = c) : c.dom.hasAttribute("aria-selected") && c.dom.removeAttribute("aria-selected"), n++;
    }); n < this.items.length && !(this.items.length == 1 && this.items[0].diagnostic.from < 0); )
      r = !0, this.items.pop();
    this.items.length == 0 && (this.items.push(new yc(this.view, {
      from: -1,
      to: -1,
      severity: "info",
      message: this.view.state.phrase("No diagnostics")
    })), r = !0), s ? (this.list.setAttribute("aria-activedescendant", s.id), this.view.requestMeasure({
      key: this,
      read: () => ({ sel: s.dom.getBoundingClientRect(), panel: this.list.getBoundingClientRect() }),
      write: ({ sel: o, panel: a }) => {
        o.top < a.top ? this.list.scrollTop -= a.top - o.top : o.bottom > a.bottom && (this.list.scrollTop += o.bottom - a.bottom);
      }
    })) : this.selectedIndex < 0 && this.list.removeAttribute("aria-activedescendant"), r && this.sync();
  }
  sync() {
    let e = this.list.firstChild;
    function t() {
      let n = e;
      e = n.nextSibling, n.remove();
    }
    for (let n of this.items)
      if (n.dom.parentNode == this.list) {
        for (; e != n.dom; )
          t();
        e = n.dom.nextSibling;
      } else
        this.list.insertBefore(n.dom, e);
    for (; e; )
      t();
  }
  moveSelection(e) {
    if (this.selectedIndex < 0)
      return;
    let t = this.view.state.field(Ze), n = Di(t.diagnostics, this.items[e].diagnostic);
    n && this.view.dispatch({
      selection: { anchor: n.from, head: n.to },
      scrollIntoView: !0,
      effects: sg.of(n)
    });
  }
  static open(e) {
    return new hs(e);
  }
}
function wb(i, e = 'viewBox="0 0 40 40"') {
  return `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ${e}>${encodeURIComponent(i)}</svg>')`;
}
function Zs(i) {
  return wb(`<path d="m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0" stroke="${i}" fill="none" stroke-width=".7"/>`, 'width="6" height="3"');
}
const vb = /* @__PURE__ */ I.baseTheme({
  ".cm-diagnostic": {
    padding: "3px 6px 3px 8px",
    marginLeft: "-1px",
    display: "block",
    whiteSpace: "pre-wrap"
  },
  ".cm-diagnostic-error": { borderLeft: "5px solid #d11" },
  ".cm-diagnostic-warning": { borderLeft: "5px solid orange" },
  ".cm-diagnostic-info": { borderLeft: "5px solid #999" },
  ".cm-diagnosticAction": {
    font: "inherit",
    border: "none",
    padding: "2px 4px",
    backgroundColor: "#444",
    color: "white",
    borderRadius: "3px",
    marginLeft: "8px"
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
  ".cm-lintRange-error": { backgroundImage: /* @__PURE__ */ Zs("#d11") },
  ".cm-lintRange-warning": { backgroundImage: /* @__PURE__ */ Zs("orange") },
  ".cm-lintRange-info": { backgroundImage: /* @__PURE__ */ Zs("#999") },
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
});
const Cb = [
  /* @__PURE__ */ sm(),
  /* @__PURE__ */ lm(),
  /* @__PURE__ */ $p(),
  /* @__PURE__ */ cO(),
  /* @__PURE__ */ mm(),
  /* @__PURE__ */ Zp(),
  /* @__PURE__ */ qp(),
  /* @__PURE__ */ Y.allowMultipleSelections.of(!0),
  /* @__PURE__ */ GO(),
  ub.fallback,
  /* @__PURE__ */ Sm(),
  /* @__PURE__ */ cQ(),
  /* @__PURE__ */ j0(),
  /* @__PURE__ */ $0(),
  /* @__PURE__ */ tb(),
  /* @__PURE__ */ rO(),
  /* @__PURE__ */ kQ(),
  /* @__PURE__ */ Bn.of([
    ...gQ,
    ...lQ,
    ...UQ,
    ...QO,
    ...gm,
    ...Y0,
    ...$d,
    ...og
  ])
];
class Xr {
  /// @internal
  constructor(e, t, n, r, s, o, a, l, h, c = 0, u) {
    this.p = e, this.stack = t, this.state = n, this.reducePos = r, this.pos = s, this.score = o, this.buffer = a, this.bufferBase = l, this.curContext = h, this.lookAhead = c, this.parent = u;
  }
  /// @internal
  toString() {
    return `[${this.stack.filter((e, t) => t % 3 == 0).concat(this.state)}]@${this.pos}${this.score ? "!" + this.score : ""}`;
  }
  // Start an empty stack
  /// @internal
  static start(e, t, n = 0) {
    let r = e.parser.context;
    return new Xr(e, [], t, n, n, 0, [], 0, r ? new wc(r, r.start) : null, 0, null);
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
    let t = e >> 19, n = e & 65535, { parser: r } = this.p, s = r.dynamicPrecedence(n);
    if (s && (this.score += s), t == 0) {
      this.pushState(r.getGoto(this.state, n, !0), this.reducePos), n < r.minRepeatTerm && this.storeNode(n, this.reducePos, this.reducePos, 4, !0), this.reduceContext(n, this.reducePos);
      return;
    }
    let o = this.stack.length - (t - 1) * 3 - (e & 262144 ? 6 : 0), a = this.stack[o - 2], l = this.stack[o - 1], h = this.bufferBase + this.buffer.length - l;
    if (n < r.minRepeatTerm || e & 131072) {
      let c = r.stateFlag(
        this.state,
        1
        /* Skipped */
      ) ? this.pos : this.reducePos;
      this.storeNode(n, a, c, h + 4, !0);
    }
    if (e & 262144)
      this.state = this.stack[o];
    else {
      let c = this.stack[o - 3];
      this.state = r.getGoto(c, n, !0);
    }
    for (; this.stack.length > o; )
      this.stack.pop();
    this.reduceContext(n, a);
  }
  // Shift a value into the buffer
  /// @internal
  storeNode(e, t, n, r = 4, s = !1) {
    if (e == 0) {
      let o = this, a = this.buffer.length;
      if (a == 0 && o.parent && (a = o.bufferBase - o.parent.bufferBase, o = o.parent), a > 0 && o.buffer[a - 4] == 0 && o.buffer[a - 1] > -1) {
        if (t == n)
          return;
        if (o.buffer[a - 2] >= t) {
          o.buffer[a - 2] = n;
          return;
        }
      }
    }
    if (!s || this.pos == n)
      this.buffer.push(e, t, n, r);
    else {
      let o = this.buffer.length;
      if (o > 0 && this.buffer[o - 4] != 0)
        for (; o > 0 && this.buffer[o - 2] > n; )
          this.buffer[o] = this.buffer[o - 4], this.buffer[o + 1] = this.buffer[o - 3], this.buffer[o + 2] = this.buffer[o - 2], this.buffer[o + 3] = this.buffer[o - 1], o -= 4, r > 4 && (r -= 4);
      this.buffer[o] = e, this.buffer[o + 1] = t, this.buffer[o + 2] = n, this.buffer[o + 3] = r;
    }
  }
  // Apply a shift action
  /// @internal
  shift(e, t, n) {
    let r = this.pos;
    if (e & 131072)
      this.pushState(e & 65535, this.pos);
    else if (e & 262144)
      this.pos = n, this.shiftContext(t, r), t <= this.p.parser.maxNode && this.buffer.push(t, r, n, 4);
    else {
      let s = e, { parser: o } = this.p;
      (n > this.pos || t <= o.maxNode) && (this.pos = n, o.stateFlag(
        s,
        1
        /* Skipped */
      ) || (this.reducePos = n)), this.pushState(s, r), this.shiftContext(t, r), t <= o.maxNode && this.buffer.push(t, r, n, 4);
    }
  }
  // Apply an action
  /// @internal
  apply(e, t, n) {
    e & 65536 ? this.reduce(e) : this.shift(e, t, n);
  }
  // Add a prebuilt (reused) node into the buffer.
  /// @internal
  useNode(e, t) {
    let n = this.p.reused.length - 1;
    (n < 0 || this.p.reused[n] != e) && (this.p.reused.push(e), n++);
    let r = this.pos;
    this.reducePos = this.pos = r + e.length, this.pushState(t, r), this.buffer.push(
      n,
      r,
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
    let n = e.buffer.slice(t), r = e.bufferBase + t;
    for (; e && r == e.bufferBase; )
      e = e.parent;
    return new Xr(this.p, this.stack.slice(), this.state, this.reducePos, this.pos, this.score, n, r, this.curContext, this.lookAhead, e);
  }
  // Try to recover from an error by 'deleting' (ignoring) one token.
  /// @internal
  recoverByDelete(e, t) {
    let n = e <= this.p.parser.maxNode;
    n && this.storeNode(e, this.pos, t, 4), this.storeNode(0, this.pos, t, n ? 8 : 4), this.pos = this.reducePos = t, this.score -= 190;
  }
  /// Check if the given term would be able to be shifted (optionally
  /// after some reductions) on this stack. This can be useful for
  /// external tokenizers that want to make sure they only provide a
  /// given token when it applies.
  canShift(e) {
    for (let t = new Sb(this); ; ) {
      let n = this.p.parser.stateSlot(
        t.state,
        4
        /* DefaultReduce */
      ) || this.p.parser.hasAction(t.state, e);
      if (!(n & 65536))
        return !0;
      if (n == 0)
        return !1;
      t.reduce(n);
    }
  }
  // Apply up to Recover.MaxNext recovery actions that conceptually
  // inserts some missing token or rule.
  /// @internal
  recoverByInsert(e) {
    if (this.stack.length >= 300)
      return [];
    let t = this.p.parser.nextStates(this.state);
    if (t.length > 4 << 1 || this.stack.length >= 120) {
      let r = [];
      for (let s = 0, o; s < t.length; s += 2)
        (o = t[s + 1]) != this.state && this.p.parser.hasAction(o, e) && r.push(t[s], o);
      if (this.stack.length < 120)
        for (let s = 0; r.length < 4 << 1 && s < t.length; s += 2) {
          let o = t[s + 1];
          r.some((a, l) => l & 1 && a == o) || r.push(t[s], o);
        }
      t = r;
    }
    let n = [];
    for (let r = 0; r < t.length && n.length < 4; r += 2) {
      let s = t[r + 1];
      if (s == this.state)
        continue;
      let o = this.split();
      o.storeNode(0, o.pos, o.pos, 4, !0), o.pushState(s, this.pos), o.shiftContext(t[r], this.pos), o.score -= 200, n.push(o);
    }
    return n;
  }
  // Force a reduce, if possible. Return false if that can't
  // be done.
  /// @internal
  forceReduce() {
    let e = this.p.parser.stateSlot(
      this.state,
      5
      /* ForcedReduce */
    );
    if (!(e & 65536))
      return !1;
    let { parser: t } = this.p;
    if (!t.validAction(this.state, e)) {
      let n = e >> 19, r = e & 65535, s = this.stack.length - n * 3;
      if (s < 0 || t.getGoto(this.stack[s], r, !1) < 0)
        return !1;
      this.storeNode(0, this.reducePos, this.reducePos, 4, !0), this.score -= 100;
    }
    return this.reduce(e), !0;
  }
  /// @internal
  forceAll() {
    for (; !this.p.parser.stateFlag(
      this.state,
      2
      /* Accepting */
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
      /* Actions */
    )] == 65535 && !e.stateSlot(
      this.state,
      4
      /* DefaultReduce */
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
    (e < 0 || this.buffer[e] != -3) && this.buffer.push(this.curContext.hash, this.reducePos, this.reducePos, -3);
  }
  /// @internal
  emitLookAhead() {
    let e = this.buffer.length - 1;
    (e < 0 || this.buffer[e] != -4) && this.buffer.push(this.lookAhead, this.reducePos, this.reducePos, -4);
  }
  updateContext(e) {
    if (e != this.curContext.context) {
      let t = new wc(this.curContext.tracker, e);
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
class wc {
  constructor(e, t) {
    this.tracker = e, this.context = t, this.hash = e.strict ? e.hash(t) : 0;
  }
}
var vc;
(function(i) {
  i[i.Insert = 200] = "Insert", i[i.Delete = 190] = "Delete", i[i.Reduce = 100] = "Reduce", i[i.MaxNext = 4] = "MaxNext", i[i.MaxInsertStackDepth = 300] = "MaxInsertStackDepth", i[i.DampenInsertStackDepth = 120] = "DampenInsertStackDepth";
})(vc || (vc = {}));
class Sb {
  constructor(e) {
    this.start = e, this.state = e.state, this.stack = e.stack, this.base = this.stack.length;
  }
  reduce(e) {
    let t = e & 65535, n = e >> 19;
    n == 0 ? (this.stack == this.start.stack && (this.stack = this.stack.slice()), this.stack.push(this.state, 0, 0), this.base += 3) : this.base -= (n - 1) * 3;
    let r = this.start.p.parser.getGoto(this.stack[this.base - 3], t, !0);
    this.state = r;
  }
}
class jr {
  constructor(e, t, n) {
    this.stack = e, this.pos = t, this.index = n, this.buffer = e.buffer, this.index == 0 && this.maybeNext();
  }
  static create(e, t = e.bufferBase + e.buffer.length) {
    return new jr(e, t, t - e.bufferBase);
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
    return new jr(this.stack, this.pos, this.index);
  }
}
class cr {
  constructor() {
    this.start = -1, this.value = -1, this.end = -1, this.extended = -1, this.lookAhead = 0, this.mask = 0, this.context = 0;
  }
}
const Cc = new cr();
class kb {
  /// @internal
  constructor(e, t) {
    this.input = e, this.ranges = t, this.chunk = "", this.chunkOff = 0, this.chunk2 = "", this.chunk2Pos = 0, this.next = -1, this.token = Cc, this.rangeIndex = 0, this.pos = this.chunkPos = t[0].from, this.range = t[0], this.end = t[t.length - 1].to, this.readNext();
  }
  resolveOffset(e, t) {
    let n = this.range, r = this.rangeIndex, s = this.pos + e;
    for (; s < n.from; ) {
      if (!r)
        return null;
      let o = this.ranges[--r];
      s -= n.from - o.to, n = o;
    }
    for (; t < 0 ? s > n.to : s >= n.to; ) {
      if (r == this.ranges.length - 1)
        return null;
      let o = this.ranges[++r];
      s += o.from - n.to, n = o;
    }
    return s;
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
    let t = this.chunkOff + e, n, r;
    if (t >= 0 && t < this.chunk.length)
      n = this.pos + e, r = this.chunk.charCodeAt(t);
    else {
      let s = this.resolveOffset(e, 1);
      if (s == null)
        return -1;
      if (n = s, n >= this.chunk2Pos && n < this.chunk2Pos + this.chunk2.length)
        r = this.chunk2.charCodeAt(n - this.chunk2Pos);
      else {
        let o = this.rangeIndex, a = this.range;
        for (; a.to <= n; )
          a = this.ranges[++o];
        this.chunk2 = this.input.chunk(this.chunk2Pos = n), n + this.chunk2.length > a.to && (this.chunk2 = this.chunk2.slice(0, a.to - n)), r = this.chunk2.charCodeAt(0);
      }
    }
    return n >= this.token.lookAhead && (this.token.lookAhead = n + 1), r;
  }
  /// Accept a token. By default, the end of the token is set to the
  /// current stream position, but you can pass an offset (relative to
  /// the stream position) to change that.
  acceptToken(e, t = 0) {
    let n = t ? this.resolveOffset(t, -1) : this.pos;
    if (n == null || n < this.token.start)
      throw new RangeError("Token end out of bounds");
    this.token.value = e, this.token.end = n;
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
    if (t ? (this.token = t, t.start = e, t.lookAhead = e + 1, t.value = t.extended = -1) : this.token = Cc, this.pos != e) {
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
    let n = "";
    for (let r of this.ranges) {
      if (r.from >= t)
        break;
      r.to > e && (n += this.input.read(Math.max(r.from, e), Math.min(r.to, t)));
    }
    return n;
  }
}
class ur {
  constructor(e, t) {
    this.data = e, this.id = t;
  }
  token(e, t) {
    Eb(this.data, e, t, this.id);
  }
}
ur.prototype.contextual = ur.prototype.fallback = ur.prototype.extend = !1;
class bt {
  /// Create a tokenizer. The first argument is the function that,
  /// given an input stream, scans for the types of tokens it
  /// recognizes at the stream's position, and calls
  /// [`acceptToken`](#lr.InputStream.acceptToken) when it finds
  /// one.
  constructor(e, t = {}) {
    this.token = e, this.contextual = !!t.contextual, this.fallback = !!t.fallback, this.extend = !!t.extend;
  }
}
function Eb(i, e, t, n) {
  let r = 0, s = 1 << n, { parser: o } = t.p, { dialect: a } = o;
  e:
    for (; s & i[r]; ) {
      let l = i[r + 1];
      for (let h = r + 3; h < l; h += 2)
        if ((i[h + 1] & s) > 0) {
          let c = i[h];
          if (a.allows(c) && (e.token.value == -1 || e.token.value == c || o.overrides(c, e.token.value))) {
            e.acceptToken(c);
            break;
          }
        }
      for (let h = e.next, c = 0, u = i[r + 2]; c < u; ) {
        let f = c + u >> 1, d = l + f + (f << 1), g = i[d], p = i[d + 1];
        if (h < g)
          u = f;
        else if (h >= p)
          c = f + 1;
        else {
          r = i[d + 2], e.advance();
          continue e;
        }
      }
      break;
    }
}
function _n(i, e = Uint16Array) {
  if (typeof i != "string")
    return i;
  let t = null;
  for (let n = 0, r = 0; n < i.length; ) {
    let s = 0;
    for (; ; ) {
      let o = i.charCodeAt(n++), a = !1;
      if (o == 126) {
        s = 65535;
        break;
      }
      o >= 92 && o--, o >= 34 && o--;
      let l = o - 32;
      if (l >= 46 && (l -= 46, a = !0), s += l, a)
        break;
      s *= 46;
    }
    t ? t[r++] = s : t = new e(s);
  }
  return t;
}
const $e = typeof process < "u" && /\bparse\b/.test(process.env.LOG);
let Ns = null;
var Sc;
(function(i) {
  i[i.Margin = 25] = "Margin";
})(Sc || (Sc = {}));
function kc(i, e, t) {
  let n = i.fullCursor();
  for (n.moveTo(e); ; )
    if (!(t < 0 ? n.childBefore(e) : n.childAfter(e)))
      for (; ; ) {
        if ((t < 0 ? n.to < e : n.from > e) && !n.type.isError)
          return t < 0 ? Math.max(0, Math.min(
            n.to - 1,
            e - 25
            /* Margin */
          )) : Math.min(i.length, Math.max(
            n.from + 1,
            e + 25
            /* Margin */
          ));
        if (t < 0 ? n.prevSibling() : n.nextSibling())
          break;
        if (!n.parent())
          return t < 0 ? 0 : i.length;
      }
}
class xb {
  constructor(e, t) {
    this.fragments = e, this.nodeSet = t, this.i = 0, this.fragment = null, this.safeFrom = -1, this.safeTo = -1, this.trees = [], this.start = [], this.index = [], this.nextFragment();
  }
  nextFragment() {
    let e = this.fragment = this.i == this.fragments.length ? null : this.fragments[this.i++];
    if (e) {
      for (this.safeFrom = e.openStart ? kc(e.tree, e.from + e.offset, 1) - e.offset : e.from, this.safeTo = e.openEnd ? kc(e.tree, e.to + e.offset, -1) - e.offset : e.to; this.trees.length; )
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
      let n = this.trees[t], r = this.index[t];
      if (r == n.children.length) {
        this.trees.pop(), this.start.pop(), this.index.pop();
        continue;
      }
      let s = n.children[r], o = this.start[t] + n.positions[r];
      if (o > e)
        return this.nextStart = o, null;
      if (s instanceof re) {
        if (o == e) {
          if (o < this.safeFrom)
            return null;
          let a = o + s.length;
          if (a <= this.safeTo) {
            let l = s.prop(M.lookAhead);
            if (!l || a + l < this.fragment.to)
              return s;
          }
        }
        this.index[t]++, o + s.length >= Math.max(this.safeFrom, e) && (this.trees.push(s), this.start.push(o), this.index.push(0));
      } else
        this.index[t]++, this.nextStart = o + s.length;
    }
  }
}
class Bb {
  constructor(e, t) {
    this.stream = t, this.tokens = [], this.mainToken = null, this.actions = [], this.tokens = e.tokenizers.map((n) => new cr());
  }
  getActions(e) {
    let t = 0, n = null, { parser: r } = e.p, { tokenizers: s } = r, o = r.stateSlot(
      e.state,
      3
      /* TokenizerMask */
    ), a = e.curContext ? e.curContext.hash : 0, l = 0;
    for (let h = 0; h < s.length; h++) {
      if (!(1 << h & o))
        continue;
      let c = s[h], u = this.tokens[h];
      if (!(n && !c.fallback) && ((c.contextual || u.start != e.pos || u.mask != o || u.context != a) && (this.updateCachedToken(u, c, e), u.mask = o, u.context = a), u.lookAhead > u.end + 25 && (l = Math.max(u.lookAhead, l)), u.value != 0)) {
        let f = t;
        if (u.extended > -1 && (t = this.addActions(e, u.extended, u.end, t)), t = this.addActions(e, u.value, u.end, t), !c.extend && (n = u, t > f))
          break;
      }
    }
    for (; this.actions.length > t; )
      this.actions.pop();
    return l && e.setLookAhead(l), !n && e.pos == this.stream.end && (n = new cr(), n.value = e.p.parser.eofTerm, n.start = n.end = e.pos, t = this.addActions(e, n.value, n.end, t)), this.mainToken = n, this.actions;
  }
  getMainToken(e) {
    if (this.mainToken)
      return this.mainToken;
    let t = new cr(), { pos: n, p: r } = e;
    return t.start = n, t.end = Math.min(n + 1, r.stream.end), t.value = n == r.stream.end ? r.parser.eofTerm : 0, t;
  }
  updateCachedToken(e, t, n) {
    if (t.token(this.stream.reset(n.pos, e), n), e.value > -1) {
      let { parser: r } = n.p;
      for (let s = 0; s < r.specialized.length; s++)
        if (r.specialized[s] == e.value) {
          let o = r.specializers[s](this.stream.read(e.start, e.end), n);
          if (o >= 0 && n.p.parser.dialect.allows(o >> 1)) {
            o & 1 ? e.extended = o >> 1 : e.value = o >> 1;
            break;
          }
        }
    } else
      e.value = 0, e.end = Math.min(n.p.stream.end, n.pos + 1);
  }
  putAction(e, t, n, r) {
    for (let s = 0; s < r; s += 3)
      if (this.actions[s] == e)
        return r;
    return this.actions[r++] = e, this.actions[r++] = t, this.actions[r++] = n, r;
  }
  addActions(e, t, n, r) {
    let { state: s } = e, { parser: o } = e.p, { data: a } = o;
    for (let l = 0; l < 2; l++)
      for (let h = o.stateSlot(
        s,
        l ? 2 : 1
        /* Actions */
      ); ; h += 3) {
        if (a[h] == 65535)
          if (a[h + 1] == 1)
            h = Ct(a, h + 2);
          else {
            r == 0 && a[h + 1] == 2 && (r = this.putAction(Ct(a, h + 2), t, n, r));
            break;
          }
        a[h] == t && (r = this.putAction(Ct(a, h + 1), t, n, r));
      }
    return r;
  }
}
var Ec;
(function(i) {
  i[i.Distance = 5] = "Distance", i[i.MaxRemainingPerStep = 3] = "MaxRemainingPerStep", i[i.MinBufferLengthPrune = 500] = "MinBufferLengthPrune", i[i.ForceReduceLimit = 10] = "ForceReduceLimit", i[i.CutDepth = 15e3] = "CutDepth", i[i.CutTo = 9e3] = "CutTo";
})(Ec || (Ec = {}));
class Ib {
  constructor(e, t, n, r) {
    this.parser = e, this.input = t, this.ranges = r, this.recovering = 0, this.nextStackID = 9812, this.minStackPos = 0, this.reused = [], this.stoppedAt = null, this.stream = new kb(t, r), this.tokens = new Bb(e, this.stream), this.topTerm = e.top[1];
    let { from: s } = r[0];
    this.stacks = [Xr.start(this, e.top[0], s)], this.fragments = n.length && this.stream.end - s > e.bufferLength * 4 ? new xb(n, e.nodeSet) : null;
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
    let e = this.stacks, t = this.minStackPos, n = this.stacks = [], r, s;
    for (let o = 0; o < e.length; o++) {
      let a = e[o];
      for (; ; ) {
        if (this.tokens.mainToken = null, a.pos > t)
          n.push(a);
        else {
          if (this.advanceStack(a, n, e))
            continue;
          {
            r || (r = [], s = []), r.push(a);
            let l = this.tokens.getMainToken(a);
            s.push(l.value, l.end);
          }
        }
        break;
      }
    }
    if (!n.length) {
      let o = r && Pb(r);
      if (o)
        return this.stackToTree(o);
      if (this.parser.strict)
        throw $e && r && console.log("Stuck with token " + (this.tokens.mainToken ? this.parser.getName(this.tokens.mainToken.value) : "none")), new SyntaxError("No parse at " + t);
      this.recovering || (this.recovering = 5);
    }
    if (this.recovering && r) {
      let o = this.stoppedAt != null && r[0].pos > this.stoppedAt ? r[0] : this.runRecovery(r, s, n);
      if (o)
        return this.stackToTree(o.forceAll());
    }
    if (this.recovering) {
      let o = this.recovering == 1 ? 1 : this.recovering * 3;
      if (n.length > o)
        for (n.sort((a, l) => l.score - a.score); n.length > o; )
          n.pop();
      n.some((a) => a.reducePos > t) && this.recovering--;
    } else if (n.length > 1) {
      e:
        for (let o = 0; o < n.length - 1; o++) {
          let a = n[o];
          for (let l = o + 1; l < n.length; l++) {
            let h = n[l];
            if (a.sameState(h) || a.buffer.length > 500 && h.buffer.length > 500)
              if ((a.score - h.score || a.buffer.length - h.buffer.length) > 0)
                n.splice(l--, 1);
              else {
                n.splice(o--, 1);
                continue e;
              }
          }
        }
    }
    this.minStackPos = n[0].pos;
    for (let o = 1; o < n.length; o++)
      n[o].pos < this.minStackPos && (this.minStackPos = n[o].pos);
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
  advanceStack(e, t, n) {
    let r = e.pos, { parser: s } = this, o = $e ? this.stackID(e) + " -> " : "";
    if (this.stoppedAt != null && r > this.stoppedAt)
      return e.forceReduce() ? e : null;
    if (this.fragments) {
      let h = e.curContext && e.curContext.tracker.strict, c = h ? e.curContext.hash : 0;
      for (let u = this.fragments.nodeAt(r); u; ) {
        let f = this.parser.nodeSet.types[u.type.id] == u.type ? s.getGoto(e.state, u.type.id) : -1;
        if (f > -1 && u.length && (!h || (u.prop(M.contextHash) || 0) == c))
          return e.useNode(u, f), $e && console.log(o + this.stackID(e) + ` (via reuse of ${s.getName(u.type.id)})`), !0;
        if (!(u instanceof re) || u.children.length == 0 || u.positions[0] > 0)
          break;
        let d = u.children[0];
        if (d instanceof re && u.positions[0] == 0)
          u = d;
        else
          break;
      }
    }
    let a = s.stateSlot(
      e.state,
      4
      /* DefaultReduce */
    );
    if (a > 0)
      return e.reduce(a), $e && console.log(o + this.stackID(e) + ` (via always-reduce ${s.getName(
        a & 65535
        /* ValueMask */
      )})`), !0;
    if (e.stack.length >= 15e3)
      for (; e.stack.length > 9e3 && e.forceReduce(); )
        ;
    let l = this.tokens.getActions(e);
    for (let h = 0; h < l.length; ) {
      let c = l[h++], u = l[h++], f = l[h++], d = h == l.length || !n, g = d ? e : e.split();
      if (g.apply(c, u, f), $e && console.log(o + this.stackID(g) + ` (via ${c & 65536 ? `reduce of ${s.getName(
        c & 65535
        /* ValueMask */
      )}` : "shift"} for ${s.getName(u)} @ ${r}${g == e ? "" : ", split"})`), d)
        return !0;
      g.pos > r ? t.push(g) : n.push(g);
    }
    return !1;
  }
  // Advance a given stack forward as far as it will go. Returns the
  // (possibly updated) stack if it got stuck, or null if it moved
  // forward and was given to `pushStackDedup`.
  advanceFully(e, t) {
    let n = e.pos;
    for (; ; ) {
      if (!this.advanceStack(e, null, null))
        return !1;
      if (e.pos > n)
        return xc(e, t), !0;
    }
  }
  runRecovery(e, t, n) {
    let r = null, s = !1;
    for (let o = 0; o < e.length; o++) {
      let a = e[o], l = t[o << 1], h = t[(o << 1) + 1], c = $e ? this.stackID(a) + " -> " : "";
      if (a.deadEnd && (s || (s = !0, a.restart(), $e && console.log(c + this.stackID(a) + " (restarted)"), this.advanceFully(a, n))))
        continue;
      let u = a.split(), f = c;
      for (let d = 0; u.forceReduce() && d < 10 && ($e && console.log(f + this.stackID(u) + " (via force-reduce)"), !this.advanceFully(u, n)); d++)
        $e && (f = this.stackID(u) + " -> ");
      for (let d of a.recoverByInsert(l))
        $e && console.log(c + this.stackID(d) + " (via recover-insert)"), this.advanceFully(d, n);
      this.stream.end > a.pos ? (h == a.pos && (h++, l = 0), a.recoverByDelete(l, h), $e && console.log(c + this.stackID(a) + ` (via recover-delete ${this.parser.getName(l)})`), xc(a, n)) : (!r || r.score < a.score) && (r = a);
    }
    return r;
  }
  // Convert the stack's buffer to a syntax tree.
  stackToTree(e) {
    return e.close(), re.build({
      buffer: jr.create(e),
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
    let t = (Ns || (Ns = /* @__PURE__ */ new WeakMap())).get(e);
    return t || Ns.set(e, t = String.fromCodePoint(this.nextStackID++)), t + e;
  }
}
function xc(i, e) {
  for (let t = 0; t < e.length; t++) {
    let n = e[t];
    if (n.pos == i.pos && n.sameState(i)) {
      e[t].score < i.score && (e[t] = i);
      return;
    }
  }
  e.push(i);
}
class Tb {
  constructor(e, t, n) {
    this.source = e, this.flags = t, this.disabled = n;
  }
  allows(e) {
    return !this.disabled || this.disabled[e] == 0;
  }
}
const zs = (i) => i;
class cg {
  /// Define a context tracker.
  constructor(e) {
    this.start = e.start, this.shift = e.shift || zs, this.reduce = e.reduce || zs, this.reuse = e.reuse || zs, this.hash = e.hash || (() => 0), this.strict = e.strict !== !1;
  }
}
class Li extends jf {
  /// @internal
  constructor(e) {
    if (super(), this.wrappers = [], e.version != 13)
      throw new RangeError(`Parser version (${e.version}) doesn't match runtime version (${13})`);
    let t = e.nodeNames.split(" ");
    this.minRepeatTerm = t.length;
    for (let a = 0; a < e.repeatNodeCount; a++)
      t.push("");
    let n = Object.keys(e.topRules).map((a) => e.topRules[a][1]), r = [];
    for (let a = 0; a < t.length; a++)
      r.push([]);
    function s(a, l, h) {
      r[a].push([l, l.deserialize(String(h))]);
    }
    if (e.nodeProps)
      for (let a of e.nodeProps) {
        let l = a[0];
        for (let h = 1; h < a.length; ) {
          let c = a[h++];
          if (c >= 0)
            s(c, l, a[h++]);
          else {
            let u = a[h + -c];
            for (let f = -c; f > 0; f--)
              s(a[h++], l, u);
            h++;
          }
        }
      }
    this.nodeSet = new aa(t.map((a, l) => Le.define({
      name: l >= this.minRepeatTerm ? void 0 : a,
      id: l,
      props: r[l],
      top: n.indexOf(l) > -1,
      error: l == 0,
      skipped: e.skippedNodes && e.skippedNodes.indexOf(l) > -1
    }))), this.strict = !1, this.bufferLength = Wf;
    let o = _n(e.tokenData);
    if (this.context = e.context, this.specialized = new Uint16Array(e.specialized ? e.specialized.length : 0), this.specializers = [], e.specialized)
      for (let a = 0; a < e.specialized.length; a++)
        this.specialized[a] = e.specialized[a].term, this.specializers[a] = e.specialized[a].get;
    this.states = _n(e.states, Uint32Array), this.data = _n(e.stateData), this.goto = _n(e.goto), this.maxTerm = e.maxTerm, this.tokenizers = e.tokenizers.map((a) => typeof a == "number" ? new ur(o, a) : a), this.topRules = e.topRules, this.dialects = e.dialects || {}, this.dynamicPrecedences = e.dynamicPrecedences || null, this.tokenPrecTable = e.tokenPrec, this.termNames = e.termNames || null, this.maxNode = this.nodeSet.types.length - 1, this.dialect = this.parseDialect(), this.top = this.topRules[Object.keys(this.topRules)[0]];
  }
  createParse(e, t, n) {
    let r = new Ib(this, e, t, n);
    for (let s of this.wrappers)
      r = s(r, e, t, n);
    return r;
  }
  /// Get a goto table entry @internal
  getGoto(e, t, n = !1) {
    let r = this.goto;
    if (t >= r[0])
      return -1;
    for (let s = r[t + 1]; ; ) {
      let o = r[s++], a = o & 1, l = r[s++];
      if (a && n)
        return l;
      for (let h = s + (o >> 1); s < h; s++)
        if (r[s] == e)
          return l;
      if (a)
        return -1;
    }
  }
  /// Check if this state has an action for a given terminal @internal
  hasAction(e, t) {
    let n = this.data;
    for (let r = 0; r < 2; r++)
      for (let s = this.stateSlot(
        e,
        r ? 2 : 1
        /* Actions */
      ), o; ; s += 3) {
        if ((o = n[s]) == 65535)
          if (n[s + 1] == 1)
            o = n[s = Ct(n, s + 2)];
          else {
            if (n[s + 1] == 2)
              return Ct(n, s + 2);
            break;
          }
        if (o == t || o == 0)
          return Ct(n, s + 1);
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
      /* Flags */
    ) & t) > 0;
  }
  /// @internal
  validAction(e, t) {
    if (t == this.stateSlot(
      e,
      4
      /* DefaultReduce */
    ))
      return !0;
    for (let n = this.stateSlot(
      e,
      1
      /* Actions */
    ); ; n += 3) {
      if (this.data[n] == 65535)
        if (this.data[n + 1] == 1)
          n = Ct(this.data, n + 2);
        else
          return !1;
      if (t == Ct(this.data, n + 1))
        return !0;
    }
  }
  /// Get the states that can follow this one through shift actions or
  /// goto jumps. @internal
  nextStates(e) {
    let t = [];
    for (let n = this.stateSlot(
      e,
      1
      /* Actions */
    ); ; n += 3) {
      if (this.data[n] == 65535)
        if (this.data[n + 1] == 1)
          n = Ct(this.data, n + 2);
        else
          break;
      if (!(this.data[n + 2] & 1)) {
        let r = this.data[n + 1];
        t.some((s, o) => o & 1 && s == r) || t.push(this.data[n], r);
      }
    }
    return t;
  }
  /// @internal
  overrides(e, t) {
    let n = Bc(this.data, this.tokenPrecTable, t);
    return n < 0 || Bc(this.data, this.tokenPrecTable, e) < n;
  }
  /// Configure the parser. Returns a new parser instance that has the
  /// given settings modified. Settings not provided in `config` are
  /// kept from the original parser.
  configure(e) {
    let t = Object.assign(Object.create(Li.prototype), this);
    if (e.props && (t.nodeSet = this.nodeSet.extend(...e.props)), e.top) {
      let n = this.topRules[e.top];
      if (!n)
        throw new RangeError(`Invalid top rule name ${e.top}`);
      t.top = n;
    }
    return e.tokenizers && (t.tokenizers = this.tokenizers.map((n) => {
      let r = e.tokenizers.find((s) => s.from == n);
      return r ? r.to : n;
    })), e.contextTracker && (t.context = e.contextTracker), e.dialect && (t.dialect = this.parseDialect(e.dialect)), e.strict != null && (t.strict = e.strict), e.wrap && (t.wrappers = t.wrappers.concat(e.wrap)), e.bufferLength != null && (t.bufferLength = e.bufferLength), t;
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
    let t = Object.keys(this.dialects), n = t.map(() => !1);
    if (e)
      for (let s of e.split(" ")) {
        let o = t.indexOf(s);
        o >= 0 && (n[o] = !0);
      }
    let r = null;
    for (let s = 0; s < t.length; s++)
      if (!n[s])
        for (let o = this.dialects[t[s]], a; (a = this.data[o++]) != 65535; )
          (r || (r = new Uint8Array(this.maxTerm + 1)))[a] = 1;
    return new Tb(e, n, r);
  }
  /// (used by the output of the parser generator) @internal
  static deserialize(e) {
    return new Li(e);
  }
}
function Ct(i, e) {
  return i[e] | i[e + 1] << 16;
}
function Bc(i, e, t) {
  for (let n = e, r; (r = i[n]) != 65535; n++)
    if (r == t)
      return n - e;
  return -1;
}
function Pb(i) {
  let e = null;
  for (let t of i) {
    let n = t.p.stoppedAt;
    (t.pos == t.p.stream.end || n != null && t.pos > n) && t.p.parser.stateFlag(
      t.state,
      2
      /* Accepting */
    ) && (!e || e.score < t.score) && (e = t);
  }
  return e;
}
const Rb = 53, Db = 1, Lb = 54, Wb = 2, Mb = 55, Xb = 3, Zr = 4, ug = 5, fg = 6, dg = 7, gg = 8, jb = 9, Zb = 10, Nb = 11, Us = 56, zb = 12, Ic = 57, Ub = 18, Vb = 27, Yb = 30, qb = 33, Gb = 35, Fb = 0, Hb = {
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
}, Jb = {
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
}, Tc = {
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
function Kb(i) {
  return i == 45 || i == 46 || i == 58 || i >= 65 && i <= 90 || i == 95 || i >= 97 && i <= 122 || i >= 161;
}
function Ag(i) {
  return i == 9 || i == 10 || i == 13 || i == 32;
}
let Pc = null, Rc = null, Dc = 0;
function Yo(i, e) {
  let t = i.pos + e;
  if (Dc == t && Rc == i)
    return Pc;
  let n = i.peek(e);
  for (; Ag(n); )
    n = i.peek(++e);
  let r = "";
  for (; Kb(n); )
    r += String.fromCharCode(n), n = i.peek(++e);
  return Rc = i, Dc = t, Pc = r ? r.toLowerCase() : n == _b || n == ey ? void 0 : null;
}
const pg = 60, $b = 62, Og = 47, _b = 63, ey = 33;
function Lc(i, e) {
  this.name = i, this.parent = e, this.hash = e ? e.hash : 0;
  for (let t = 0; t < i.length; t++)
    this.hash += (this.hash << 4) + i.charCodeAt(t) + (i.charCodeAt(t) << 8);
}
const ty = [Zr, gg, ug, fg, dg], iy = new cg({
  start: null,
  shift(i, e, t, n) {
    return ty.indexOf(e) > -1 ? new Lc(Yo(n, 1) || "", i) : i;
  },
  reduce(i, e) {
    return e == Ub && i ? i.parent : i;
  },
  reuse(i, e, t, n) {
    let r = e.type.id;
    return r == Zr || r == Gb ? new Lc(Yo(n, 1) || "", i) : i;
  },
  hash(i) {
    return i ? i.hash : 0;
  },
  strict: !1
}), ny = new bt((i, e) => {
  if (i.next != pg) {
    i.next < 0 && e.context && i.acceptToken(Us);
    return;
  }
  i.advance();
  let t = i.next == Og;
  t && i.advance();
  let n = Yo(i, 0);
  if (n === void 0)
    return;
  if (!n)
    return i.acceptToken(t ? zb : Zr);
  let r = e.context ? e.context.name : null;
  if (t) {
    if (n == r)
      return i.acceptToken(jb);
    if (r && Jb[r])
      return i.acceptToken(Us, -2);
    if (e.dialectEnabled(Fb))
      return i.acceptToken(Zb);
    for (let s = e.context; s; s = s.parent)
      if (s.name == n)
        return;
    i.acceptToken(Nb);
  } else {
    if (n == "script")
      return i.acceptToken(ug);
    if (n == "style")
      return i.acceptToken(fg);
    if (n == "textarea")
      return i.acceptToken(dg);
    if (Hb.hasOwnProperty(n))
      return i.acceptToken(gg);
    r && Tc[r] && Tc[r][n] ? i.acceptToken(Us, -1) : i.acceptToken(Zr);
  }
}, { contextual: !0 }), ry = new bt((i) => {
  for (let e = 0, t = 0; ; t++) {
    if (i.next < 0) {
      t && i.acceptToken(Ic);
      break;
    }
    if (i.next == "-->".charCodeAt(e)) {
      if (e++, e == 3) {
        t > 3 && i.acceptToken(Ic, -2);
        break;
      }
    } else
      e = 0;
    i.advance();
  }
});
function Ra(i, e, t) {
  let n = 2 + i.length;
  return new bt((r) => {
    for (let s = 0, o = 0, a = 0; ; a++) {
      if (r.next < 0) {
        a && r.acceptToken(e);
        break;
      }
      if (s == 0 && r.next == pg || s == 1 && r.next == Og || s >= 2 && s < n && r.next == i.charCodeAt(s - 2))
        s++, o++;
      else if ((s == 2 || s == n) && Ag(r.next))
        o++;
      else if (s == n && r.next == $b) {
        a > o ? r.acceptToken(e, -o) : r.acceptToken(t, -(o - 2));
        break;
      } else if ((r.next == 10 || r.next == 13) && a) {
        r.acceptToken(e, 1);
        break;
      } else
        s = o = 0;
      r.advance();
    }
  });
}
const sy = Ra("script", Rb, Db), oy = Ra("style", Lb, Wb), ay = Ra("textarea", Mb, Xb), ly = Li.deserialize({
  version: 13,
  states: ",xOVOxOOO!WQ!bO'#CoO!]Q!bO'#CyO!bQ!bO'#C|O!gQ!bO'#DPO!lQ!bO'#DRO!qOXO'#CnO!|OYO'#CnO#XO[O'#CnO$eOxO'#CnOOOW'#Cn'#CnO$lO!rO'#DSO$tQ!bO'#DUO$yQ!bO'#DVOOOW'#Dj'#DjOOOW'#DX'#DXQVOxOOO%OQ#tO,59ZO%WQ#tO,59eO%`Q#tO,59hO%hQ#tO,59kO%pQ#tO,59mOOOX'#D]'#D]O%xOXO'#CwO&TOXO,59YOOOY'#D^'#D^O&]OYO'#CzO&hOYO,59YOOO['#D_'#D_O&pO[O'#C}O&{O[O,59YOOOW'#D`'#D`O'TOxO,59YO'[Q!bO'#DQOOOW,59Y,59YOOO`'#Da'#DaO'aO!rO,59nOOOW,59n,59nO'iQ!bO,59pO'nQ!bO,59qOOOW-E7V-E7VO'sQ#tO'#CqOOQO'#DY'#DYO(OQ#tO1G.uOOOX1G.u1G.uO(WQ#tO1G/POOOY1G/P1G/PO(`Q#tO1G/SOOO[1G/S1G/SO(hQ#tO1G/VOOOW1G/V1G/VO(pQ#tO1G/XOOOW1G/X1G/XOOOX-E7Z-E7ZO(xQ!bO'#CxOOOW1G.t1G.tOOOY-E7[-E7[O(}Q!bO'#C{OOO[-E7]-E7]O)SQ!bO'#DOOOOW-E7^-E7^O)XQ!bO,59lOOO`-E7_-E7_OOOW1G/Y1G/YOOOW1G/[1G/[OOOW1G/]1G/]O)^Q&jO,59]OOQO-E7W-E7WOOOX7+$a7+$aOOOY7+$k7+$kOOO[7+$n7+$nOOOW7+$q7+$qOOOW7+$s7+$sO)iQ!bO,59dO)nQ!bO,59gO)sQ!bO,59jOOOW1G/W1G/WO)xO,UO'#CtO*WO7[O'#CtOOQO1G.w1G.wOOOW1G/O1G/OOOOW1G/R1G/ROOOW1G/U1G/UOOOO'#DZ'#DZO*fO,UO,59`OOQO,59`,59`OOOO'#D['#D[O*tO7[O,59`OOOO-E7X-E7XOOQO1G.z1G.zOOOO-E7Y-E7Y",
  stateData: "+[~O!]OS~OSSOTPOUQOVROWTOY]OZ[O[^O^^O_^O`^Oa^Ow^Oz_O!cZO~OdaO~OdbO~OdcO~OddO~OdeO~O!VfOPkP!YkP~O!WiOQnP!YnP~O!XlORqP!YqP~OSSOTPOUQOVROWTOXqOY]OZ[O[^O^^O_^O`^Oa^Ow^O!cZO~O!YrO~P#dO!ZsO!duO~OdvO~OdwO~OfyOj|O~OfyOj!OO~OfyOj!QO~OfyOj!SO~OfyOj!UO~O!VfOPkX!YkX~OP!WO!Y!XO~O!WiOQnX!YnX~OQ!ZO!Y!XO~O!XlORqX!YqX~OR!]O!Y!XO~O!Y!XO~P#dOd!_O~O!ZsO!d!aO~Oj!bO~Oj!cO~Og!dOfeXjeX~OfyOj!fO~OfyOj!gO~OfyOj!hO~OfyOj!iO~OfyOj!jO~Od!kO~Od!lO~Od!mO~Oj!nO~Oi!qO!_!oO!a!pO~Oj!rO~Oj!sO~Oj!tO~O_!uO`!uO!_!wO!`!uO~O_!xO`!xO!a!wO!b!xO~O_!uO`!uO!_!{O!`!uO~O_!xO`!xO!a!{O!b!xO~O`_a!cwz!c~",
  goto: "%o!_PPPPPPPPPPPPPPPPPP!`!fP!lPP!xPP!{#O#R#X#[#_#e#h#k#q#w!`P!`!`P#}$T$k$q$w$}%T%Z%aPPPPPPPP%gX^OX`pXUOX`pezabcde{}!P!R!TR!q!dRhUR!XhXVOX`pRkVR!XkXWOX`pRnWR!XnXXOX`pQrXR!XpXYOX`pQ`ORx`Q{aQ}bQ!PcQ!RdQ!TeZ!e{}!P!R!TQ!v!oR!z!vQ!y!pR!|!yQgUR!VgQjVR!YjQmWR![mQpXR!^pQtZR!`tS_O`ToXp",
  nodeNames: "⚠ StartCloseTag StartCloseTag StartCloseTag StartTag StartTag StartTag StartTag StartTag StartCloseTag StartCloseTag StartCloseTag IncompleteCloseTag Document Text EntityReference CharacterReference InvalidEntity Element OpenTag TagName Attribute AttributeName Is AttributeValue UnquotedAttributeValue EndTag ScriptText CloseTag OpenTag StyleText CloseTag OpenTag TextareaText CloseTag OpenTag CloseTag SelfClosingTag Comment ProcessingInst MismatchedCloseTag CloseTag DoctypeDecl",
  maxTerm: 66,
  context: iy,
  nodeProps: [
    [M.closedBy, -11, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, "EndTag", -4, 19, 29, 32, 35, "CloseTag"],
    [M.group, -9, 12, 15, 16, 17, 18, 38, 39, 40, 41, "Entity", 14, "Entity TextContent", -3, 27, 30, 33, "TextContent Entity"],
    [M.openedBy, 26, "StartTag StartCloseTag", -4, 28, 31, 34, 36, "OpenTag"]
  ],
  skippedNodes: [0],
  repeatNodeCount: 9,
  tokenData: "!#b!aR!WOX$kXY)sYZ)sZ]$k]^)s^p$kpq)sqr$krs*zsv$kvw+dwx2yx}$k}!O3f!O!P$k!P!Q7_!Q![$k![!]8u!]!^$k!^!_>b!_!`!!p!`!a8T!a!c$k!c!}8u!}#R$k#R#S8u#S#T$k#T#o8u#o$f$k$f$g&R$g%W$k%W%o8u%o%p$k%p&a8u&a&b$k&b1p8u1p4U$k4U4d8u4d4e$k4e$IS8u$IS$I`$k$I`$Ib8u$Ib$Kh$k$Kh%#t8u%#t&/x$k&/x&Et8u&Et&FV$k&FV;'S8u;'S;:j<t;:j?&r$k?&r?Ah8u?Ah?BY$k?BY?Mn8u?Mn~$k!Z$vc^PiW!``!bpOX$kXZ&RZ]$k]^&R^p$kpq&Rqr$krs&qsv$kvw)Rwx'rx!P$k!P!Q&R!Q!^$k!^!_(k!_!a&R!a$f$k$f$g&R$g~$k!R&[V^P!``!bpOr&Rrs&qsv&Rwx'rx!^&R!^!_(k!_~&Rq&xT^P!bpOv&qwx'Xx!^&q!^!_'g!_~&qP'^R^POv'Xw!^'X!_~'Xp'lQ!bpOv'gx~'ga'yU^P!``Or'rrs'Xsv'rw!^'r!^!_(]!_~'r`(bR!``Or(]sv(]w~(]!Q(rT!``!bpOr(krs'gsv(kwx(]x~(kW)WXiWOX)RZ])R^p)Rqr)Rsw)Rx!P)R!Q!^)R!a$f)R$g~)R!a*O^^P!``!bp!]^OX&RXY)sYZ)sZ]&R]^)s^p&Rpq)sqr&Rrs&qsv&Rwx'rx!^&R!^!_(k!_~&R!Z+TT!_h^P!bpOv&qwx'Xx!^&q!^!_'g!_~&q!Z+kbiWaPOX,sXZ.QZ],s]^.Q^p,sqr,srs.Qst/]tw,swx.Qx!P,s!P!Q.Q!Q!],s!]!^)R!^!a.Q!a$f,s$f$g.Q$g~,s!Z,xbiWOX,sXZ.QZ],s]^.Q^p,sqr,srs.Qst)Rtw,swx.Qx!P,s!P!Q.Q!Q!],s!]!^.i!^!a.Q!a$f,s$f$g.Q$g~,s!R.TTOp.Qqs.Qt!].Q!]!^.d!^~.Q!R.iO_!R!Z.pXiW_!ROX)RZ])R^p)Rqr)Rsw)Rx!P)R!Q!^)R!a$f)R$g~)R!Z/baiWOX0gXZ1qZ]0g]^1q^p0gqr0grs1qsw0gwx1qx!P0g!P!Q1q!Q!]0g!]!^)R!^!a1q!a$f0g$f$g1q$g~0g!Z0laiWOX0gXZ1qZ]0g]^1q^p0gqr0grs1qsw0gwx1qx!P0g!P!Q1q!Q!]0g!]!^2V!^!a1q!a$f0g$f$g1q$g~0g!R1tSOp1qq!]1q!]!^2Q!^~1q!R2VO`!R!Z2^XiW`!ROX)RZ])R^p)Rqr)Rsw)Rx!P)R!Q!^)R!a$f)R$g~)R!Z3SU!ax^P!``Or'rrs'Xsv'rw!^'r!^!_(]!_~'r!]3qe^PiW!``!bpOX$kXZ&RZ]$k]^&R^p$kpq&Rqr$krs&qsv$kvw)Rwx'rx}$k}!O5S!O!P$k!P!Q&R!Q!^$k!^!_(k!_!a&R!a$f$k$f$g&R$g~$k!]5_d^PiW!``!bpOX$kXZ&RZ]$k]^&R^p$kpq&Rqr$krs&qsv$kvw)Rwx'rx!P$k!P!Q&R!Q!^$k!^!_(k!_!`&R!`!a6m!a$f$k$f$g&R$g~$k!T6xV^P!``!bp!dQOr&Rrs&qsv&Rwx'rx!^&R!^!_(k!_~&R!X7hX^P!``!bpOr&Rrs&qsv&Rwx'rx!^&R!^!_(k!_!`&R!`!a8T!a~&R!X8`VjU^P!``!bpOr&Rrs&qsv&Rwx'rx!^&R!^!_(k!_~&R!a9U!YfSdQ^PiW!``!bpOX$kXZ&RZ]$k]^&R^p$kpq&Rqr$krs&qsv$kvw)Rwx'rx}$k}!O8u!O!P8u!P!Q&R!Q![8u![!]8u!]!^$k!^!_(k!_!a&R!a!c$k!c!}8u!}#R$k#R#S8u#S#T$k#T#o8u#o$f$k$f$g&R$g$}$k$}%O8u%O%W$k%W%o8u%o%p$k%p&a8u&a&b$k&b1p8u1p4U8u4U4d8u4d4e$k4e$IS8u$IS$I`$k$I`$Ib8u$Ib$Je$k$Je$Jg8u$Jg$Kh$k$Kh%#t8u%#t&/x$k&/x&Et8u&Et&FV$k&FV;'S8u;'S;:j<t;:j?&r$k?&r?Ah8u?Ah?BY$k?BY?Mn8u?Mn~$k!a=Pe^PiW!``!bpOX$kXZ&RZ]$k]^&R^p$kpq&Rqr$krs&qsv$kvw)Rwx'rx!P$k!P!Q&R!Q!^$k!^!_(k!_!a&R!a$f$k$f$g&R$g;=`$k;=`<%l8u<%l~$k!R>iW!``!bpOq(kqr?Rrs'gsv(kwx(]x!a(k!a!bKj!b~(k!R?YZ!``!bpOr(krs'gsv(kwx(]x}(k}!O?{!O!f(k!f!gAR!g#W(k#W#XGz#X~(k!R@SV!``!bpOr(krs'gsv(kwx(]x}(k}!O@i!O~(k!R@rT!``!bp!cPOr(krs'gsv(kwx(]x~(k!RAYV!``!bpOr(krs'gsv(kwx(]x!q(k!q!rAo!r~(k!RAvV!``!bpOr(krs'gsv(kwx(]x!e(k!e!fB]!f~(k!RBdV!``!bpOr(krs'gsv(kwx(]x!v(k!v!wBy!w~(k!RCQV!``!bpOr(krs'gsv(kwx(]x!{(k!{!|Cg!|~(k!RCnV!``!bpOr(krs'gsv(kwx(]x!r(k!r!sDT!s~(k!RD[V!``!bpOr(krs'gsv(kwx(]x!g(k!g!hDq!h~(k!RDxW!``!bpOrDqrsEbsvDqvwEvwxFfx!`Dq!`!aGb!a~DqqEgT!bpOvEbvxEvx!`Eb!`!aFX!a~EbPEyRO!`Ev!`!aFS!a~EvPFXOzPqF`Q!bpzPOv'gx~'gaFkV!``OrFfrsEvsvFfvwEvw!`Ff!`!aGQ!a~FfaGXR!``zPOr(]sv(]w~(]!RGkT!``!bpzPOr(krs'gsv(kwx(]x~(k!RHRV!``!bpOr(krs'gsv(kwx(]x#c(k#c#dHh#d~(k!RHoV!``!bpOr(krs'gsv(kwx(]x#V(k#V#WIU#W~(k!RI]V!``!bpOr(krs'gsv(kwx(]x#h(k#h#iIr#i~(k!RIyV!``!bpOr(krs'gsv(kwx(]x#m(k#m#nJ`#n~(k!RJgV!``!bpOr(krs'gsv(kwx(]x#d(k#d#eJ|#e~(k!RKTV!``!bpOr(krs'gsv(kwx(]x#X(k#X#YDq#Y~(k!RKqW!``!bpOrKjrsLZsvKjvwLowxNPx!aKj!a!b! g!b~KjqL`T!bpOvLZvxLox!aLZ!a!bM^!b~LZPLrRO!aLo!a!bL{!b~LoPMORO!`Lo!`!aMX!a~LoPM^OwPqMcT!bpOvLZvxLox!`LZ!`!aMr!a~LZqMyQ!bpwPOv'gx~'gaNUV!``OrNPrsLosvNPvwLow!aNP!a!bNk!b~NPaNpV!``OrNPrsLosvNPvwLow!`NP!`!a! V!a~NPa! ^R!``wPOr(]sv(]w~(]!R! nW!``!bpOrKjrsLZsvKjvwLowxNPx!`Kj!`!a!!W!a~Kj!R!!aT!``!bpwPOr(krs'gsv(kwx(]x~(k!V!!{VgS^P!``!bpOr&Rrs&qsv&Rwx'rx!^&R!^!_(k!_~&R",
  tokenizers: [sy, oy, ay, ny, ry, 0, 1, 2, 3, 4, 5],
  topRules: { Document: [0, 13] },
  dialects: { noMatch: 0 },
  tokenPrec: 464
});
function hy(i, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let n of i.firstChild.getChildren("Attribute")) {
    let r = n.getChild("AttributeName"), s = n.getChild("AttributeValue") || n.getChild("UnquotedAttributeValue");
    r && (t[e.read(r.from, r.to)] = s ? s.name == "AttributeValue" ? e.read(s.from + 1, s.to - 1) : e.read(s.from, s.to) : "");
  }
  return t;
}
function Vs(i, e, t) {
  let n;
  for (let r of t)
    if (!r.attrs || r.attrs(n || (n = hy(i.node.parent, e))))
      return { parser: r.parser };
  return null;
}
function cy(i) {
  let e = [], t = [], n = [];
  for (let r of i) {
    let s = r.tag == "script" ? e : r.tag == "style" ? t : r.tag == "textarea" ? n : null;
    if (!s)
      throw new RangeError("Only script, style, and textarea tags can host nested parsers");
    s.push(r);
  }
  return kO((r, s) => {
    let o = r.type.id;
    return o == Vb ? Vs(r, s, e) : o == Yb ? Vs(r, s, t) : o == qb ? Vs(r, s, n) : null;
  });
}
const uy = 93, Wc = 1, fy = 94, dy = 95, Mc = 2, mg = [
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
], gy = 58, Ay = 40, Qg = 95, py = 91, fr = 45, Oy = 46, my = 35, Qy = 37;
function Nr(i) {
  return i >= 65 && i <= 90 || i >= 97 && i <= 122 || i >= 161;
}
function by(i) {
  return i >= 48 && i <= 57;
}
const yy = new bt((i, e) => {
  for (let t = !1, n = 0, r = 0; ; r++) {
    let { next: s } = i;
    if (Nr(s) || s == fr || s == Qg || t && by(s))
      !t && (s != fr || r > 0) && (t = !0), n === r && s == fr && n++, i.advance();
    else {
      t && i.acceptToken(s == Ay ? fy : n == 2 && e.canShift(Mc) ? Mc : dy);
      break;
    }
  }
}), wy = new bt((i) => {
  if (mg.includes(i.peek(-1))) {
    let { next: e } = i;
    (Nr(e) || e == Qg || e == my || e == Oy || e == py || e == gy || e == fr) && i.acceptToken(uy);
  }
}), vy = new bt((i) => {
  if (!mg.includes(i.peek(-1))) {
    let { next: e } = i;
    if (e == Qy && (i.advance(), i.acceptToken(Wc)), Nr(e)) {
      do
        i.advance();
      while (Nr(i.next));
      i.acceptToken(Wc);
    }
  }
}), Cy = { __proto__: null, lang: 32, "nth-child": 32, "nth-last-child": 32, "nth-of-type": 32, dir: 32, url: 60, "url-prefix": 60, domain: 60, regexp: 60, selector: 134 }, Sy = { __proto__: null, "@import": 114, "@media": 138, "@charset": 142, "@namespace": 146, "@keyframes": 152, "@supports": 164 }, ky = { __proto__: null, not: 128, only: 128, from: 158, to: 160 }, Ey = Li.deserialize({
  version: 13,
  states: "7WOYQ[OOOOQP'#Cd'#CdOOQP'#Cc'#CcO!ZQ[O'#CfO!}QXO'#CaO#UQ[O'#ChO#aQ[O'#DPO#fQ[O'#DTOOQP'#Ec'#EcO#kQdO'#DeO$VQ[O'#DrO#kQdO'#DtO$hQ[O'#DvO$sQ[O'#DyO$xQ[O'#EPO%WQ[O'#EROOQS'#Eb'#EbOOQS'#ES'#ESQYQ[OOOOQP'#Cg'#CgOOQP,59Q,59QO!ZQ[O,59QO%_Q[O'#EVO%yQWO,58{O&RQ[O,59SO#aQ[O,59kO#fQ[O,59oO%_Q[O,59sO%_Q[O,59uO%_Q[O,59vO'bQ[O'#D`OOQS,58{,58{OOQP'#Ck'#CkOOQO'#C}'#C}OOQP,59S,59SO'iQWO,59SO'nQWO,59SOOQP'#DR'#DROOQP,59k,59kOOQO'#DV'#DVO'sQ`O,59oOOQS'#Cp'#CpO#kQdO'#CqO'{QvO'#CsO)VQtO,5:POOQO'#Cx'#CxO'iQWO'#CwO)kQWO'#CyOOQS'#Ef'#EfOOQO'#Dh'#DhO)pQ[O'#DoO*OQWO'#EiO$xQ[O'#DmO*^QWO'#DpOOQO'#Ej'#EjO%|QWO,5:^O*cQpO,5:`OOQS'#Dx'#DxO*kQWO,5:bO*pQ[O,5:bOOQO'#D{'#D{O*xQWO,5:eO*}QWO,5:kO+VQWO,5:mOOQS-E8Q-E8QOOQP1G.l1G.lO+yQXO,5:qOOQO-E8T-E8TOOQS1G.g1G.gOOQP1G.n1G.nO'iQWO1G.nO'nQWO1G.nOOQP1G/V1G/VO,WQ`O1G/ZO,qQXO1G/_O-XQXO1G/aO-oQXO1G/bO.VQXO'#CdO.zQWO'#DaOOQS,59z,59zO/PQWO,59zO/XQ[O,59zO/`QdO'#CoO/gQ[O'#DOOOQP1G/Z1G/ZO#kQdO1G/ZO/nQpO,59]OOQS,59_,59_O#kQdO,59aO/vQWO1G/kOOQS,59c,59cO/{Q!bO,59eO0TQWO'#DhO0`QWO,5:TO0eQWO,5:ZO$xQ[O,5:VO$xQ[O'#EYO0mQWO,5;TO0xQWO,5:XO%_Q[O,5:[OOQS1G/x1G/xOOQS1G/z1G/zOOQS1G/|1G/|O1ZQWO1G/|O1`QdO'#D|OOQS1G0P1G0POOQS1G0V1G0VOOQS1G0X1G0XOOQP7+$Y7+$YOOQP7+$u7+$uO#kQdO7+$uO#kQdO,59{O1nQ[O'#EXO1xQWO1G/fOOQS1G/f1G/fO1xQWO1G/fO2QQtO'#ETO2uQdO'#EeO3PQWO,59ZO3UQXO'#EhO3]QWO,59jO3bQpO7+$uOOQS1G.w1G.wOOQS1G.{1G.{OOQS7+%V7+%VO3jQWO1G/PO#kQdO1G/oOOQO1G/u1G/uOOQO1G/q1G/qO3oQWO,5:tOOQO-E8W-E8WO3}QXO1G/vOOQS7+%h7+%hO4UQYO'#CsO%|QWO'#EZO4^QdO,5:hOOQS,5:h,5:hO4lQpO<<HaO4tQtO1G/gOOQO,5:s,5:sO5XQ[O,5:sOOQO-E8V-E8VOOQS7+%Q7+%QO5cQWO7+%QOOQS-E8R-E8RO#kQdO'#EUO5kQWO,5;POOQT1G.u1G.uO5sQWO,5;SOOQP1G/U1G/UOOQP<<Ha<<HaOOQS7+$k7+$kO5{QdO7+%ZOOQO7+%b7+%bOOQS,5:u,5:uOOQS-E8X-E8XOOQS1G0S1G0SOOQPAN={AN={O6SQtO'#EWO#kQdO'#EWO6}QdO7+%ROOQO7+%R7+%ROOQO1G0_1G0_OOQS<<Hl<<HlO7_QdO,5:pOOQO-E8S-E8SOOQO<<Hu<<HuO7iQtO,5:rOOQS-E8U-E8UOOQO<<Hm<<Hm",
  stateData: "8j~O#TOSROS~OUWOXWO]TO^TOtUOxVO!Y_O!ZXO!gYO!iZO!k[O!n]O!t^O#RPO#WRO~O#RcO~O]hO^hOpfOtiOxjO|kO!PmO#PlO#WeO~O!RnO~P!`O`sO#QqO#RpO~O#RuO~O#RwO~OQ!QObzOf!QOh!QOn!PO#Q}O#RyO#Z{O~Ob!SO!b!UO!e!VO#R!RO!R#]P~Oh![On!PO#R!ZO~O#R!^O~Ob!SO!b!UO!e!VO#R!RO~O!W#]P~P$VOUWOXWO]TO^TOtUOxVO#RPO#WRO~OpfO!RnO~O`!hO#QqO#RpO~OQ!pOUWOXWO]TO^TOtUOxVO!Y_O!ZXO!gYO!iZO!k[O!n]O!t^O#R!oO#WRO~O!Q!qO~P&^Ob!tO~Ob!uO~Ov!vOz!wO~OP!yObgXjgX!WgX!bgX!egX#RgXagXQgXfgXhgXngXpgX#QgX#ZgXvgX!QgX!VgX~Ob!SOj!zO!b!UO!e!VO#R!RO!W#]P~Ob!}O~Ob!SO!b!UO!e!VO#R#OO~Op#SO!`#RO!R#]X!W#]X~Ob#VO~Oj!zO!W#XO~O!W#YO~Oh#ZOn!PO~O!R#[O~O!RnO!`#RO~O!RnO!W#_O~O]hO^hOtiOxjO|kO!PmO#PlO#WeO~Op!ya!R!yaa!ya~P+_Ov#aOz#bO~O]hO^hOtiOxjO#WeO~Op{i|{i!P{i!R{i#P{ia{i~P,`Op}i|}i!P}i!R}i#P}ia}i~P,`Op!Oi|!Oi!P!Oi!R!Oi#P!Oia!Oi~P,`O]WX]!UX^WXpWXtWXxWX|WX!PWX!RWX#PWX#WWX~O]#cO~O!Q#fO!W#dO~O!Q#fO~P&^Oa#XP~P#kOa#[P~P%_Oa#nOj!zO~O!W#pO~Oh#qOo#qO~O]!^Xa![X!`![X~O]#rO~Oa#sO!`#RO~Op#SO!R#]a!W#]a~O!`#ROp!aa!R!aa!W!aaa!aa~O!W#xO~O!Q#|O!q#zO!r#zO#Z#yO~O!Q!{X!W!{X~P&^O!Q$SO!W#dO~Oj!zOQ!wXa!wXb!wXf!wXh!wXn!wXp!wX#Q!wX#R!wX#Z!wX~Op$VOa#XX~P#kOa$XO~Oa#[X~P!`Oa$ZO~Oj!zOv$[O~Oa$]O~O!`#ROp!|a!R!|a!W!|a~Oa$_O~P+_OP!yO!RgX~O!Q$bO!q#zO!r#zO#Z#yO~Oj!zOv$cO~Oj!zOp$eO!V$gO!Q!Ti!W!Ti~P#kO!Q!{a!W!{a~P&^O!Q$iO!W#dO~Op$VOa#Xa~OpfOa#[a~Oa$lO~P#kOj!zOQ!zXb!zXf!zXh!zXn!zXp!zX!Q!zX!V!zX!W!zX#Q!zX#R!zX#Z!zX~Op$eO!V$oO!Q!Tq!W!Tq~P#kOa!xap!xa~P#kOj!zOQ!zab!zaf!zah!zan!zap!za!Q!za!V!za!W!za#Q!za#R!za#Z!za~Oo#Zj!Pj~",
  goto: ",O#_PPPPP#`P#h#vP#h$U#hPP$[PPP$b$k$kP$}P$kP$k%e%wPPP&a&g#hP&mP#hP&sP#hP#h#hPPP&y']'iPP#`PP'o'o'y'oP'oP'o'oP#`P#`P#`P'|#`P(P(SPP#`P#`(V(e(s(y)T)Z)e)kPPPPPP)q)yP*e*hP+^+a+j]`Obn!s#d$QiWObfklmn!s!u#V#d$QiQObfklmn!s!u#V#d$QQdRR!ceQrTR!ghQ!gsQ!|!OR#`!hq!QXZz!t!w!z#b#c#i#r$O$V$^$e$f$jp!QXZz!t!w!z#b#c#i#r$O$V$^$e$f$jT#z#[#{q!OXZz!t!w!z#b#c#i#r$O$V$^$e$f$jp!QXZz!t!w!z#b#c#i#r$O$V$^$e$f$jQ![[R#Z!]QtTR!ihQ!gtR#`!iQvUR!jiQxVR!kjQoSQ!fgQ#W!XQ#^!`Q#_!aR$`#zQ!rnQ#g!sQ$P#dR$h$QX!pn!s#d$Qa!WY^_|!S!U#R#SR#P!SR!][R!_]R#]!_QbOU!bb!s$QQ!snR$Q#dQ#i!tU$U#i$^$jQ$^#rR$j$VQ$W#iR$k$WQgSS!eg$YR$Y#kQ$f$OR$n$fQ#e!rS$R#e$TR$T#gQ#T!TR#v#TQ#{#[R$a#{]aObn!s#d$Q[SObn!s#d$QQ!dfQ!lkQ!mlQ!nmQ#k!uR#w#VR#j!tQ|XQ!YZQ!xz[#h!t#i#r$V$^$jQ#m!wQ#o!zQ#}#bQ$O#cS$d$O$fR$m$eR#l!uQ!XYQ!a_R!{|U!TY_|Q!`^Q#Q!SQ#U!UQ#t#RR#u#S",
  nodeNames: "⚠ Unit VariableName Comment StyleSheet RuleSet UniversalSelector TagSelector TagName NestingSelector ClassSelector ClassName PseudoClassSelector : :: PseudoClassName PseudoClassName ) ( ArgList ValueName ParenthesizedValue ColorLiteral NumberLiteral StringLiteral BinaryExpression BinOp CallExpression Callee CallLiteral CallTag ParenthesizedContent , PseudoClassName ArgList IdSelector # IdName ] AttributeSelector [ AttributeName MatchOp ChildSelector ChildOp DescendantSelector SiblingSelector SiblingOp } { Block Declaration PropertyName Important ; ImportStatement AtKeyword import KeywordQuery FeatureQuery FeatureName BinaryQuery LogicOp UnaryQuery UnaryQueryOp ParenthesizedQuery SelectorQuery selector MediaStatement media CharsetStatement charset NamespaceStatement namespace NamespaceName KeyframesStatement keyframes KeyframeName KeyframeList from to SupportsStatement supports AtRule",
  maxTerm: 106,
  nodeProps: [
    [M.openedBy, 17, "(", 48, "{"],
    [M.closedBy, 18, ")", 49, "}"]
  ],
  skippedNodes: [0, 3],
  repeatNodeCount: 8,
  tokenData: "Ay~R![OX$wX^%]^p$wpq%]qr(crs+}st,otu2Uuv$wvw2rwx2}xy3jyz3uz{3z{|4_|}8U}!O8a!O!P8x!P!Q9Z!Q![;e![!]<Y!]!^<x!^!_$w!_!`=T!`!a=`!a!b$w!b!c>O!c!}$w!}#O?[#O#P$w#P#Q?g#Q#R2U#R#T$w#T#U?r#U#c$w#c#d@q#d#o$w#o#pAQ#p#q2U#q#rA]#r#sAh#s#y$w#y#z%]#z$f$w$f$g%]$g#BY$w#BY#BZ%]#BZ$IS$w$IS$I_%]$I_$I|$w$I|$JO%]$JO$JT$w$JT$JU%]$JU$KV$w$KV$KW%]$KW&FU$w&FU&FV%]&FV~$wW$zQOy%Qz~%QW%VQoWOy%Qz~%Q~%bf#T~OX%QX^&v^p%Qpq&vqy%Qz#y%Q#y#z&v#z$f%Q$f$g&v$g#BY%Q#BY#BZ&v#BZ$IS%Q$IS$I_&v$I_$I|%Q$I|$JO&v$JO$JT%Q$JT$JU&v$JU$KV%Q$KV$KW&v$KW&FU%Q&FU&FV&v&FV~%Q~&}f#T~oWOX%QX^&v^p%Qpq&vqy%Qz#y%Q#y#z&v#z$f%Q$f$g&v$g#BY%Q#BY#BZ&v#BZ$IS%Q$IS$I_&v$I_$I|%Q$I|$JO&v$JO$JT%Q$JT$JU&v$JU$KV%Q$KV$KW&v$KW&FU%Q&FU&FV&v&FV~%Q^(fSOy%Qz#]%Q#]#^(r#^~%Q^(wSoWOy%Qz#a%Q#a#b)T#b~%Q^)YSoWOy%Qz#d%Q#d#e)f#e~%Q^)kSoWOy%Qz#c%Q#c#d)w#d~%Q^)|SoWOy%Qz#f%Q#f#g*Y#g~%Q^*_SoWOy%Qz#h%Q#h#i*k#i~%Q^*pSoWOy%Qz#T%Q#T#U*|#U~%Q^+RSoWOy%Qz#b%Q#b#c+_#c~%Q^+dSoWOy%Qz#h%Q#h#i+p#i~%Q^+wQ!VUoWOy%Qz~%Q~,QUOY+}Zr+}rs,ds#O+}#O#P,i#P~+}~,iOh~~,lPO~+}_,tWtPOy%Qz!Q%Q!Q![-^![!c%Q!c!i-^!i#T%Q#T#Z-^#Z~%Q^-cWoWOy%Qz!Q%Q!Q![-{![!c%Q!c!i-{!i#T%Q#T#Z-{#Z~%Q^.QWoWOy%Qz!Q%Q!Q![.j![!c%Q!c!i.j!i#T%Q#T#Z.j#Z~%Q^.qWfUoWOy%Qz!Q%Q!Q![/Z![!c%Q!c!i/Z!i#T%Q#T#Z/Z#Z~%Q^/bWfUoWOy%Qz!Q%Q!Q![/z![!c%Q!c!i/z!i#T%Q#T#Z/z#Z~%Q^0PWoWOy%Qz!Q%Q!Q![0i![!c%Q!c!i0i!i#T%Q#T#Z0i#Z~%Q^0pWfUoWOy%Qz!Q%Q!Q![1Y![!c%Q!c!i1Y!i#T%Q#T#Z1Y#Z~%Q^1_WoWOy%Qz!Q%Q!Q![1w![!c%Q!c!i1w!i#T%Q#T#Z1w#Z~%Q^2OQfUoWOy%Qz~%QY2XSOy%Qz!_%Q!_!`2e!`~%QY2lQzQoWOy%Qz~%QX2wQXPOy%Qz~%Q~3QUOY2}Zw2}wx,dx#O2}#O#P3d#P~2}~3gPO~2}_3oQbVOy%Qz~%Q~3zOa~_4RSUPjSOy%Qz!_%Q!_!`2e!`~%Q_4fUjS!PPOy%Qz!O%Q!O!P4x!P!Q%Q!Q![7_![~%Q^4}SoWOy%Qz!Q%Q!Q![5Z![~%Q^5bWoW#ZUOy%Qz!Q%Q!Q![5Z![!g%Q!g!h5z!h#X%Q#X#Y5z#Y~%Q^6PWoWOy%Qz{%Q{|6i|}%Q}!O6i!O!Q%Q!Q![6z![~%Q^6nSoWOy%Qz!Q%Q!Q![6z![~%Q^7RSoW#ZUOy%Qz!Q%Q!Q![6z![~%Q^7fYoW#ZUOy%Qz!O%Q!O!P5Z!P!Q%Q!Q![7_![!g%Q!g!h5z!h#X%Q#X#Y5z#Y~%Q_8ZQpVOy%Qz~%Q^8fUjSOy%Qz!O%Q!O!P4x!P!Q%Q!Q![7_![~%Q_8}S#WPOy%Qz!Q%Q!Q![5Z![~%Q~9`RjSOy%Qz{9i{~%Q~9nSoWOy9iyz9zz{:o{~9i~9}ROz9zz{:W{~9z~:ZTOz9zz{:W{!P9z!P!Q:j!Q~9z~:oOR~~:tUoWOy9iyz9zz{:o{!P9i!P!Q;W!Q~9i~;_QR~oWOy%Qz~%Q^;jY#ZUOy%Qz!O%Q!O!P5Z!P!Q%Q!Q![7_![!g%Q!g!h5z!h#X%Q#X#Y5z#Y~%QX<_S]POy%Qz![%Q![!]<k!]~%QX<rQ^PoWOy%Qz~%Q_<}Q!WVOy%Qz~%QY=YQzQOy%Qz~%QX=eS|POy%Qz!`%Q!`!a=q!a~%QX=xQ|PoWOy%Qz~%QX>RUOy%Qz!c%Q!c!}>e!}#T%Q#T#o>e#o~%QX>lY!YPoWOy%Qz}%Q}!O>e!O!Q%Q!Q![>e![!c%Q!c!}>e!}#T%Q#T#o>e#o~%QX?aQxPOy%Qz~%Q^?lQvUOy%Qz~%QX?uSOy%Qz#b%Q#b#c@R#c~%QX@WSoWOy%Qz#W%Q#W#X@d#X~%QX@kQ!`PoWOy%Qz~%QX@tSOy%Qz#f%Q#f#g@d#g~%QXAVQ!RPOy%Qz~%Q_AbQ!QVOy%Qz~%QZAmS!PPOy%Qz!_%Q!_!`2e!`~%Q",
  tokenizers: [wy, vy, yy, 0, 1, 2, 3],
  topRules: { StyleSheet: [0, 4] },
  specialized: [{ term: 94, get: (i) => Cy[i] || -1 }, { term: 56, get: (i) => Sy[i] || -1 }, { term: 95, get: (i) => ky[i] || -1 }],
  tokenPrec: 1078
});
let Ys = null;
function qs() {
  if (!Ys && typeof document == "object" && document.body) {
    let i = [];
    for (let e in document.body.style)
      /[A-Z]|^-|^(item|length)$/.test(e) || i.push(e);
    Ys = i.sort().map((e) => ({ type: "property", label: e }));
  }
  return Ys || [];
}
const Xc = /* @__PURE__ */ [
  "active",
  "after",
  "before",
  "checked",
  "default",
  "disabled",
  "empty",
  "enabled",
  "first-child",
  "first-letter",
  "first-line",
  "first-of-type",
  "focus",
  "hover",
  "in-range",
  "indeterminate",
  "invalid",
  "lang",
  "last-child",
  "last-of-type",
  "link",
  "not",
  "nth-child",
  "nth-last-child",
  "nth-last-of-type",
  "nth-of-type",
  "only-of-type",
  "only-child",
  "optional",
  "out-of-range",
  "placeholder",
  "read-only",
  "read-write",
  "required",
  "root",
  "selection",
  "target",
  "valid",
  "visited"
].map((i) => ({ type: "class", label: i })), jc = /* @__PURE__ */ [
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
].map((i) => ({ type: "keyword", label: i })).concat(/* @__PURE__ */ [
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
].map((i) => ({ type: "constant", label: i }))), xy = /* @__PURE__ */ [
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
].map((i) => ({ type: "type", label: i })), Pt = /^[\w-]*/, By = (i) => {
  let { state: e, pos: t } = i, n = he(e).resolveInner(t, -1);
  if (n.name == "PropertyName")
    return { from: n.from, options: qs(), span: Pt };
  if (n.name == "ValueName")
    return { from: n.from, options: jc, span: Pt };
  if (n.name == "PseudoClassName")
    return { from: n.from, options: Xc, span: Pt };
  if (n.name == "TagName") {
    for (let { parent: o } = n; o; o = o.parent)
      if (o.name == "Block")
        return { from: n.from, options: qs(), span: Pt };
    return { from: n.from, options: xy, span: Pt };
  }
  if (!i.explicit)
    return null;
  let r = n.resolve(t), s = r.childBefore(t);
  return s && s.name == ":" && r.name == "PseudoClassSelector" ? { from: t, options: Xc, span: Pt } : s && s.name == ":" && r.name == "Declaration" || r.name == "ArgList" ? { from: t, options: jc, span: Pt } : r.name == "Block" ? { from: t, options: qs(), span: Pt } : null;
}, Da = /* @__PURE__ */ Ti.define({
  parser: /* @__PURE__ */ Ey.configure({
    props: [
      /* @__PURE__ */ _r.add({
        Declaration: /* @__PURE__ */ lr()
      }),
      /* @__PURE__ */ es.add({
        Block: Uf
      }),
      /* @__PURE__ */ Ta({
        "import charset namespace keyframes": A.definitionKeyword,
        "media supports": A.controlKeyword,
        "from to selector": A.keyword,
        NamespaceName: A.namespace,
        KeyframeName: A.labelName,
        TagName: A.tagName,
        ClassName: A.className,
        PseudoClassName: /* @__PURE__ */ A.constant(A.className),
        IdName: A.labelName,
        "FeatureName PropertyName": A.propertyName,
        AttributeName: A.attributeName,
        NumberLiteral: A.number,
        KeywordQuery: A.keyword,
        UnaryQueryOp: A.operatorKeyword,
        "CallTag ValueName": A.atom,
        VariableName: A.variableName,
        Callee: A.operatorKeyword,
        Unit: A.unit,
        "UniversalSelector NestingSelector": A.definitionOperator,
        AtKeyword: A.keyword,
        MatchOp: A.compareOperator,
        "ChildOp SiblingOp, LogicOp": A.logicOperator,
        BinOp: A.arithmeticOperator,
        Important: A.modifier,
        Comment: A.blockComment,
        ParenthesizedContent: /* @__PURE__ */ A.special(A.name),
        ColorLiteral: A.color,
        StringLiteral: A.string,
        ":": A.punctuation,
        "PseudoOp #": A.derefOperator,
        "; ,": A.separator,
        "( )": A.paren,
        "[ ]": A.squareBracket,
        "{ }": A.brace
      })
    ]
  }),
  languageData: {
    commentTokens: { block: { open: "/*", close: "*/" } },
    indentOnInput: /^\s*\}$/,
    wordChars: "-"
  }
}), Iy = /* @__PURE__ */ Da.data.of({ autocomplete: By });
function Ty() {
  return new fa(Da, Iy);
}
const Zc = 279, Nc = 1, Py = 2, er = 280, Ry = 3, Dy = 281, zc = 282, Ly = 4, Wy = 284, My = 285, Xy = 5, jy = 6, Zy = 1, Ny = [
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
], bg = 125, zy = 123, Uy = 59, Uc = 47, Vy = 42, Yy = 43, qy = 45, Gy = 36, Fy = 96, Hy = 92, Jy = new cg({
  start: !1,
  shift(i, e) {
    return e == Xy || e == jy || e == Wy ? i : e == My;
  },
  strict: !1
}), Ky = new bt((i, e) => {
  let { next: t } = i;
  (t == bg || t == -1 || e.context) && e.canShift(zc) && i.acceptToken(zc);
}, { contextual: !0, fallback: !0 }), $y = new bt((i, e) => {
  let { next: t } = i, n;
  Ny.indexOf(t) > -1 || t == Uc && ((n = i.peek(1)) == Uc || n == Vy) || t != bg && t != Uy && t != -1 && !e.context && e.canShift(Zc) && i.acceptToken(Zc);
}, { contextual: !0 }), _y = new bt((i, e) => {
  let { next: t } = i;
  if ((t == Yy || t == qy) && (i.advance(), t == i.next)) {
    i.advance();
    let n = !e.context && e.canShift(Nc);
    i.acceptToken(n ? Nc : Py);
  }
}, { contextual: !0 }), ew = new bt((i) => {
  for (let e = !1, t = 0; ; t++) {
    let { next: n } = i;
    if (n < 0) {
      t && i.acceptToken(er);
      break;
    } else if (n == Fy) {
      t ? i.acceptToken(er) : i.acceptToken(Dy, 1);
      break;
    } else if (n == zy && e) {
      t == 1 ? i.acceptToken(Ry, 1) : i.acceptToken(er, -1);
      break;
    } else if (n == 10 && t) {
      i.advance(), i.acceptToken(er);
      break;
    } else
      n == Hy && i.advance();
    e = n == Gy, i.advance();
  }
});
function tw(i, e) {
  return i == "extends" && e.dialectEnabled(Zy) ? Ly : -1;
}
const iw = { __proto__: null, export: 18, as: 23, from: 29, default: 32, async: 37, function: 38, this: 48, true: 56, false: 56, void: 66, typeof: 70, null: 86, super: 88, new: 122, await: 139, yield: 141, delete: 142, class: 152, extends: 154, public: 197, private: 197, protected: 197, readonly: 199, instanceof: 220, in: 222, const: 224, import: 256, keyof: 307, unique: 311, infer: 317, is: 351, abstract: 371, implements: 373, type: 375, let: 378, var: 380, interface: 387, enum: 391, namespace: 397, module: 399, declare: 403, global: 407, for: 428, of: 437, while: 440, with: 444, do: 448, if: 452, else: 454, switch: 458, case: 464, try: 470, catch: 472, finally: 474, return: 478, throw: 482, break: 486, continue: 490, debugger: 494 }, nw = { __proto__: null, async: 109, get: 111, set: 113, public: 161, private: 161, protected: 161, static: 163, abstract: 165, override: 167, readonly: 173, new: 355 }, rw = { __proto__: null, "<": 129 }, sw = Li.deserialize({
  version: 13,
  states: "$1jO`QYOOO'QQ!LdO'#ChO'XOSO'#DVO)dQYO'#D]O)tQYO'#DhO){QYO'#DrO-xQYO'#DxOOQO'#E]'#E]O.]QWO'#E[O.bQWO'#E[OOQ!LS'#Ef'#EfO0aQ!LdO'#IrO2wQ!LdO'#IsO3eQWO'#EzO3jQpO'#FaOOQ!LS'#FS'#FSO3rO!bO'#FSO4QQWO'#FhO5_QWO'#FgOOQ!LS'#Is'#IsOOQ!LQ'#Ir'#IrOOQQ'#J['#J[O5dQWO'#HnO5iQ!LYO'#HoOOQQ'#If'#IfOOQQ'#Hp'#HpQ`QYOOO){QYO'#DjO5qQWO'#G[O5vQ#tO'#CmO6UQWO'#EZO6aQWO'#EgO6fQ#tO'#FRO7QQWO'#G[O7VQWO'#G`O7bQWO'#G`O7pQWO'#GcO7pQWO'#GdO7pQWO'#GfO5qQWO'#GiO8aQWO'#GlO9oQWO'#CdO:PQWO'#GyO:XQWO'#HPO:XQWO'#HRO`QYO'#HTO:XQWO'#HVO:XQWO'#HYO:^QWO'#H`O:cQ!LZO'#HdO){QYO'#HfO:nQ!LZO'#HhO:yQ!LZO'#HjO5iQ!LYO'#HlO){QYO'#DWOOOS'#Hr'#HrO;UOSO,59qOOQ!LS,59q,59qO=gQbO'#ChO=qQYO'#HsO>UQWO'#ItO@TQbO'#ItO'dQYO'#ItO@[QWO,59wO@rQ&jO'#DbOAkQWO'#E]OAxQWO'#JPOBTQWO'#JOOBTQWO'#JOOB]QWO,5:yOBbQWO'#I}OBiQWO'#DyO5vQ#tO'#EZOBwQWO'#EZOCSQ`O'#FROOQ!LS,5:S,5:SOC[QYO,5:SOEYQ!LdO,5:^OEvQWO,5:dOFaQ!LYO'#I|O7VQWO'#I{OFhQWO'#I{OFpQWO,5:xOFuQWO'#I{OGTQYO,5:vOITQWO'#EWOJ_QWO,5:vOKnQWO'#DlOKuQYO'#DqOLPQ&jO,5;PO){QYO,5;POOQQ'#Er'#ErOOQQ'#Et'#EtO){QYO,5;RO){QYO,5;RO){QYO,5;RO){QYO,5;RO){QYO,5;RO){QYO,5;RO){QYO,5;RO){QYO,5;RO){QYO,5;RO){QYO,5;RO){QYO,5;ROOQQ'#Ex'#ExOLXQYO,5;cOOQ!LS,5;h,5;hOOQ!LS,5;i,5;iONXQWO,5;iOOQ!LS,5;j,5;jO){QYO'#H}ON^Q!LYO,5<TONxQWO,5;RO){QYO,5;fO! bQpO'#JTO! PQpO'#JTO! iQpO'#JTO! zQpO,5;qOOOO,5;{,5;{O!!YQYO'#FcOOOO'#H|'#H|O3rO!bO,5;nO!!aQpO'#FeOOQ!LS,5;n,5;nO!!}Q,UO'#CrOOQ!LS'#Cu'#CuO!#bQWO'#CuO!#gOSO'#CyO!$TQ#tO,5<QO!$[QWO,5<SO!%hQWO'#FrO!%uQWO'#FsO!%zQWO'#FwO!&|Q&jO'#F{O!'oQ,UO'#IoOOQ!LS'#Io'#IoO!'yQWO'#InO!(XQWO'#ImOOQ!LS'#Cs'#CsOOQ!LS'#C|'#C|O!(aQWO'#DOOJdQWO'#FjOJdQWO'#FlO!(fQWO'#FnO!(kQWO'#FoO!(pQWO'#FuOJdQWO'#FzO!(uQWO'#E^O!)^QWO,5<RO`QYO,5>YOOQQ'#Ii'#IiOOQQ,5>Z,5>ZOOQQ-E;n-E;nO!+YQ!LdO,5:UOOQ!LQ'#Cp'#CpO!+yQ#tO,5<vOOQO'#Cf'#CfO!,[QWO'#CqO!,dQ!LYO'#IjO5_QWO'#IjO:^QWO,59XO!,rQpO,59XO!,zQ#tO,59XO5vQ#tO,59XO!-VQWO,5:vO!-_QWO'#GxO!-mQWO'#J`O){QYO,5;kO!-uQ&jO,5;mO!-zQWO,5=cO!.PQWO,5=cO!.UQWO,5=cO5iQ!LYO,5=cO5qQWO,5<vO!.dQWO'#E_O!.xQ&jO'#E`OOQ!LQ'#I}'#I}O!/ZQ!LYO'#J]O5iQ!LYO,5<zO7pQWO,5=QOOQO'#Cr'#CrO!/fQpO,5<}O!/nQ#tO,5=OO!/yQWO,5=QO!0OQ`O,5=TO:^QWO'#GnO5qQWO'#GpO!0WQWO'#GpO5vQ#tO'#GsO!0]QWO'#GsOOQQ,5=W,5=WO!0bQWO'#GtO!0jQWO'#CmO!0oQWO,59OO!0yQWO,59OO!2{QYO,59OOOQQ,59O,59OO!3YQ!LYO,59OO){QYO,59OO!3eQYO'#G{OOQQ'#G|'#G|OOQQ'#G}'#G}O`QYO,5=eO!3uQWO,5=eO){QYO'#DxO`QYO,5=kO`QYO,5=mO!3zQWO,5=oO`QYO,5=qO!4PQWO,5=tO!4UQYO,5=zOOQQ,5>O,5>OO){QYO,5>OO5iQ!LYO,5>QOOQQ,5>S,5>SO!8VQWO,5>SOOQQ,5>U,5>UO!8VQWO,5>UOOQQ,5>W,5>WO!8[Q`O,59rOOOS-E;p-E;pOOQ!LS1G/]1G/]O!8aQbO,5>_O'dQYO,5>_OOQO,5>d,5>dO!8kQYO'#HsOOQO-E;q-E;qO!8xQWO,5?`O!9QQbO,5?`O!9XQWO,5?jOOQ!LS1G/c1G/cO!9aQpO'#DTOOQO'#Iv'#IvO){QYO'#IvO!:OQpO'#IvO!:mQpO'#DcO!;OQ&jO'#DcO!=ZQYO'#DcO!=bQWO'#IuO!=jQWO,59|O!=oQWO'#EaO!=}QWO'#JQO!>VQWO,5:zO!>mQ&jO'#DcO){QYO,5?kO!>wQWO'#HxOOQO-E;v-E;vO!9XQWO,5?jOOQ!LQ1G0e1G0eO!@TQ&jO'#D|OOQ!LS,5:e,5:eO){QYO,5:eOITQWO,5:eO!@[QWO,5:eO:^QWO,5:uO!,rQpO,5:uO!,zQ#tO,5:uO5vQ#tO,5:uOOQ!LS1G/n1G/nOOQ!LS1G0O1G0OOOQ!LQ'#EV'#EVO){QYO,5?hO!@gQ!LYO,5?hO!@xQ!LYO,5?hO!APQWO,5?gO!AXQWO'#HzO!APQWO,5?gOOQ!LQ1G0d1G0dO7VQWO,5?gOOQ!LS1G0b1G0bO!AsQ!LdO1G0bO!BdQ!LbO,5:rOOQ!LS'#Fq'#FqO!CQQ!LdO'#IoOGTQYO1G0bO!EPQ#tO'#IwO!EZQWO,5:WO!E`QbO'#IxO){QYO'#IxO!EjQWO,5:]OOQ!LS'#DT'#DTOOQ!LS1G0k1G0kO!EoQWO1G0kO!HQQ!LdO1G0mO!HXQ!LdO1G0mO!JlQ!LdO1G0mO!JsQ!LdO1G0mO!LzQ!LdO1G0mO!M_Q!LdO1G0mO#!OQ!LdO1G0mO#!VQ!LdO1G0mO#$jQ!LdO1G0mO#$qQ!LdO1G0mO#&fQ!LdO1G0mO#)`Q7^O'#ChO#+ZQ7^O1G0}O#-UQ7^O'#IsOOQ!LS1G1T1G1TO#-iQ!LdO,5>iOOQ!LQ-E;{-E;{O#.YQ!LdO1G0mOOQ!LS1G0m1G0mO#0[Q!LdO1G1QO#0{QpO,5;sO#1QQpO,5;tO#1VQpO'#F[O#1kQWO'#FZOOQO'#JU'#JUOOQO'#H{'#H{O#1pQpO1G1]OOQ!LS1G1]1G1]OOOO1G1f1G1fO#2OQ7^O'#IrO#2YQWO,5;}OLXQYO,5;}OOOO-E;z-E;zOOQ!LS1G1Y1G1YOOQ!LS,5<P,5<PO#2_QpO,5<POOQ!LS,59a,59aOITQWO'#C{OOOS'#Hq'#HqO#2dOSO,59eOOQ!LS,59e,59eO){QYO1G1lO!(kQWO'#IPO#2oQWO,5<eOOQ!LS,5<b,5<bOOQO'#GV'#GVOJdQWO,5<pOOQO'#GX'#GXOJdQWO,5<rOJdQWO,5<tOOQO1G1n1G1nO#2zQ`O'#CpO#3_Q`O,5<^O#3fQWO'#JXO5qQWO'#JXO#3tQWO,5<`OJdQWO,5<_O#3yQ`O'#FqO#4WQ`O'#JYO#4bQWO'#JYOITQWO'#JYO#4gQWO,5<cOOQ!LQ'#Dg'#DgO#4lQWO'#FtO#4wQpO'#F|O!&wQ&jO'#F|O!&wQ&jO'#GOO#5YQWO'#GPO!(pQWO'#GSOOQO'#IR'#IRO#5_Q&jO,5<gOOQ!LS,5<g,5<gO#5fQ&jO'#F|O#5tQ&jO'#F}O#5|Q&jO'#F}OOQ!LS,5<u,5<uOJdQWO,5?YOJdQWO,5?YO#6RQWO'#ISO#6^QWO,5?XOOQ!LS'#Ch'#ChO#7QQ#tO,59jOOQ!LS,59j,59jO#7sQ#tO,5<UO#8fQ#tO,5<WO#8pQWO,5<YOOQ!LS,5<Z,5<ZO#8uQWO,5<aO#8zQ#tO,5<fOGTQYO1G1mO#9[QWO1G1mOOQQ1G3t1G3tOOQ!LS1G/p1G/pONXQWO1G/pOOQQ1G2b1G2bOITQWO1G2bO){QYO1G2bOITQWO1G2bO#9aQWO1G2bO#9oQWO,59]O#:xQWO'#EWOOQ!LQ,5?U,5?UO#;SQ!LYO,5?UOOQQ1G.s1G.sO:^QWO1G.sO!,rQpO1G.sO!,zQ#tO1G.sO#;bQWO1G0bO#;gQWO'#ChO#;rQWO'#JaO#;zQWO,5=dO#<PQWO'#JaO#<UQWO'#JaO#<^QWO'#I[O#<lQWO,5?zO#<tQbO1G1VOOQ!LS1G1X1G1XO5qQWO1G2}O#<{QWO1G2}O#=QQWO1G2}O#=VQWO1G2}OOQQ1G2}1G2}O#=[Q#tO1G2bO7VQWO'#JOO7VQWO'#EaO7VQWO'#IUO#=mQ!LYO,5?wOOQQ1G2f1G2fO!/yQWO1G2lOITQWO1G2iO#=xQWO1G2iOOQQ1G2j1G2jOITQWO1G2jO#=}QWO1G2jO#>VQ&jO'#GhOOQQ1G2l1G2lO!&wQ&jO'#IWO!0OQ`O1G2oOOQQ1G2o1G2oOOQQ,5=Y,5=YO#>_Q#tO,5=[O5qQWO,5=[O#5YQWO,5=_O5_QWO,5=_O!,rQpO,5=_O!,zQ#tO,5=_O5vQ#tO,5=_O#>pQWO'#J_O#>{QWO,5=`OOQQ1G.j1G.jO#?QQ!LYO1G.jO#?]QWO1G.jO#?bQWO1G.jO5iQ!LYO1G.jO#?jQbO,5?|O#?tQWO,5?|O#@PQYO,5=gO#@WQWO,5=gO7VQWO,5?|OOQQ1G3P1G3PO`QYO1G3POOQQ1G3V1G3VOOQQ1G3X1G3XO:XQWO1G3ZO#@]QYO1G3]O#DWQYO'#H[OOQQ1G3`1G3`O:^QWO1G3fO#DeQWO1G3fO5iQ!LYO1G3jOOQQ1G3l1G3lOOQ!LQ'#Fx'#FxO5iQ!LYO1G3nO5iQ!LYO1G3pOOOS1G/^1G/^O#DmQ`O,5<TO#DuQbO1G3yOOQO1G4O1G4OO){QYO,5>_O#EPQWO1G4zO#EXQWO1G5UO#EaQWO,5?bOLXQYO,5:{O7VQWO,5:{O:^QWO,59}OLXQYO,59}O!,rQpO,59}O#EfQ7^O,59}OOQO,5:{,5:{O#EpQ&jO'#HtO#FWQWO,5?aOOQ!LS1G/h1G/hO#F`Q&jO'#HyO#FtQWO,5?lOOQ!LQ1G0f1G0fO!;OQ&jO,59}O#F|QbO1G5VO7VQWO,5>dOOQ!LQ'#ES'#ESO#GWQ!LrO'#ETO!?{Q&jO'#D}OOQO'#Hw'#HwO#GrQ&jO,5:hOOQ!LS,5:h,5:hO#GyQ&jO'#D}O#H[Q&jO'#D}O#HcQ&jO'#EYO#HfQ&jO'#ETO#HsQ&jO'#ETO!?{Q&jO'#ETO#IWQWO1G0PO#I]Q`O1G0POOQ!LS1G0P1G0PO){QYO1G0POITQWO1G0POOQ!LS1G0a1G0aO:^QWO1G0aO!,rQpO1G0aO!,zQ#tO1G0aO#IdQ!LdO1G5SO){QYO1G5SO#ItQ!LYO1G5SO#JVQWO1G5RO7VQWO,5>fOOQO,5>f,5>fO#J_QWO,5>fOOQO-E;x-E;xO#JVQWO1G5RO#JmQ!LdO,59jO#LlQ!LdO,5<UO#NnQ!LdO,5<WO$!pQ!LdO,5<fOOQ!LS7+%|7+%|O$$xQ!LdO7+%|O$%iQWO'#HuO$%sQWO,5?cOOQ!LS1G/r1G/rO$%{QYO'#HvO$&YQWO,5?dO$&bQbO,5?dOOQ!LS1G/w1G/wOOQ!LS7+&V7+&VO$&lQ7^O,5:^O){QYO7+&iO$&vQ7^O,5:UOOQO1G1_1G1_OOQO1G1`1G1`O$'TQMhO,5;vOLXQYO,5;uOOQO-E;y-E;yOOQ!LS7+&w7+&wOOOO7+'Q7+'QOOOO1G1i1G1iO$'`QWO1G1iOOQ!LS1G1k1G1kO$'eQ`O,59gOOOS-E;o-E;oOOQ!LS1G/P1G/PO$'lQ!LdO7+'WOOQ!LS,5>k,5>kO$(]QWO,5>kOOQ!LS1G2P1G2PP$(bQWO'#IPPOQ!LS-E;}-E;}O$)RQ#tO1G2[O$)tQ#tO1G2^O$*OQ#tO1G2`OOQ!LS1G1x1G1xO$*VQWO'#IOO$*eQWO,5?sO$*eQWO,5?sO$*mQWO,5?sO$*xQWO,5?sOOQO1G1z1G1zO$+WQ#tO1G1yO$+hQWO'#IQO$+xQWO,5?tOITQWO,5?tO$,QQ`O,5?tOOQ!LS1G1}1G1}O5iQ!LYO,5<hO5iQ!LYO,5<iO$,[QWO,5<iO#5TQWO,5<iO!,rQpO,5<hO$,aQWO,5<jO5iQ!LYO,5<kO$,[QWO,5<nOOQO-E<P-E<POOQ!LS1G2R1G2RO!&wQ&jO,5<hO$,iQWO,5<iO!&wQ&jO,5<jO!&wQ&jO,5<iO$,tQ#tO1G4tO$-OQ#tO1G4tOOQO,5>n,5>nOOQO-E<Q-E<QO!-uQ&jO,59lO){QYO,59lO$-]QWO1G1tOJdQWO1G1{O$-bQ!LdO7+'XOOQ!LS7+'X7+'XOGTQYO7+'XOOQ!LS7+%[7+%[O$.RQ`O'#JZO#IWQWO7+'|O$.]QWO7+'|O$.eQ`O7+'|OOQQ7+'|7+'|OITQWO7+'|O){QYO7+'|OITQWO7+'|OOQO1G.w1G.wO$.oQ!LbO'#ChO$/PQ!LbO,5<lO$/nQWO,5<lOOQ!LQ1G4p1G4pOOQQ7+$_7+$_O:^QWO7+$_O!,rQpO7+$_OGTQYO7+%|O$/sQWO'#IZO$0UQWO,5?{OOQO1G3O1G3OO5qQWO,5?{O$0UQWO,5?{O$0^QWO,5?{OOQO,5>v,5>vOOQO-E<Y-E<YOOQ!LS7+&q7+&qO$0cQWO7+(iO5iQ!LYO7+(iO5qQWO7+(iO$0hQWO7+(iO$0mQWO7+'|OOQ!LQ,5>p,5>pOOQ!LQ-E<S-E<SOOQQ7+(W7+(WO$0{Q!LbO7+(TOITQWO7+(TO$1VQ`O7+(UOOQQ7+(U7+(UOITQWO7+(UO$1^QWO'#J^O$1iQWO,5=SOOQO,5>r,5>rOOQO-E<U-E<UOOQQ7+(Z7+(ZO$2cQ&jO'#GqOOQQ1G2v1G2vOITQWO1G2vO){QYO1G2vOITQWO1G2vO$2jQWO1G2vO$2xQ#tO1G2vO5iQ!LYO1G2yO#5YQWO1G2yO5_QWO1G2yO!,rQpO1G2yO!,zQ#tO1G2yO$3ZQWO'#IYO$3fQWO,5?yO$3nQ&jO,5?yOOQ!LQ1G2z1G2zOOQQ7+$U7+$UO$3vQWO7+$UO5iQ!LYO7+$UO$3{QWO7+$UO){QYO1G5hO){QYO1G5iO$4QQYO1G3RO$4XQWO1G3RO$4^QYO1G3RO$4eQ!LYO1G5hOOQQ7+(k7+(kO5iQ!LYO7+(uO`QYO7+(wOOQQ'#Jd'#JdOOQQ'#I]'#I]O$4oQYO,5=vOOQQ,5=v,5=vO){QYO'#H]O$4|QWO'#H_OOQQ7+)Q7+)QO$5RQYO7+)QO7VQWO7+)QOOQQ7+)U7+)UOOQQ7+)Y7+)YOOQQ7+)[7+)[OOQO1G4|1G4|O$9PQ7^O1G0gO$9ZQWO1G0gOOQO1G/i1G/iO$9fQ7^O1G/iO:^QWO1G/iOLXQYO'#DcOOQO,5>`,5>`OOQO-E;r-E;rOOQO,5>e,5>eOOQO-E;w-E;wO!,rQpO1G/iO:^QWO,5:iOOQO,5:o,5:oO){QYO,5:oO$9pQ!LYO,5:oO$9{Q!LYO,5:oO!,rQpO,5:iOOQO-E;u-E;uOOQ!LS1G0S1G0SO!?{Q&jO,5:iO$:ZQ&jO,5:iO$:lQ!LrO,5:oO$;WQ&jO,5:iO!?{Q&jO,5:oOOQO,5:t,5:tO$;_Q&jO,5:oO$;lQ!LYO,5:oOOQ!LS7+%k7+%kO#IWQWO7+%kO#I]Q`O7+%kOOQ!LS7+%{7+%{O:^QWO7+%{O!,rQpO7+%{O$<QQ!LdO7+*nO){QYO7+*nOOQO1G4Q1G4QO7VQWO1G4QO$<bQWO7+*mO$<jQ!LdO1G2[O$>lQ!LdO1G2^O$@nQ!LdO1G1yO$BvQ#tO,5>aOOQO-E;s-E;sO$CQQbO,5>bO){QYO,5>bOOQO-E;t-E;tO$C[QWO1G5OO$CdQ7^O1G0bO$EkQ7^O1G0mO$ErQ7^O1G0mO$GsQ7^O1G0mO$GzQ7^O1G0mO$IoQ7^O1G0mO$JSQ7^O1G0mO$LaQ7^O1G0mO$LhQ7^O1G0mO$NiQ7^O1G0mO$NpQ7^O1G0mO%!eQ7^O1G0mO%!xQ!LdO<<JTO%#iQ7^O1G0mO%%XQ7^O'#IoO%'UQ7^O1G1QOLXQYO'#F^OOQO'#JV'#JVOOQO1G1b1G1bO%'cQWO1G1aO%'hQ7^O,5>iOOOO7+'T7+'TOOOS1G/R1G/ROOQ!LS1G4V1G4VOJdQWO7+'zO%'rQWO,5>jO5qQWO,5>jOOQO-E;|-E;|O%(QQWO1G5_O%(QQWO1G5_O%(YQWO1G5_O%(eQ`O,5>lO%(oQWO,5>lOITQWO,5>lOOQO-E<O-E<OO%(tQ`O1G5`O%)OQWO1G5`OOQO1G2S1G2SOOQO1G2T1G2TO5iQ!LYO1G2TO$,[QWO1G2TO5iQ!LYO1G2SO%)WQWO1G2UOITQWO1G2UOOQO1G2V1G2VO5iQ!LYO1G2YO!,rQpO1G2SO#5TQWO1G2TO%)]QWO1G2UO%)eQWO1G2TOJdQWO7+*`OOQ!LS1G/W1G/WO%)pQWO1G/WOOQ!LS7+'`7+'`O%)uQ#tO7+'gO%*VQ!LdO<<JsOOQ!LS<<Js<<JsOITQWO'#ITO%*vQWO,5?uOOQQ<<Kh<<KhOITQWO<<KhO#IWQWO<<KhO%+OQWO<<KhO%+WQ`O<<KhOITQWO1G2WOOQQ<<Gy<<GyO:^QWO<<GyO%+bQ!LdO<<IhOOQ!LS<<Ih<<IhOOQO,5>u,5>uO%,RQWO,5>uO%,WQWO,5>uOOQO-E<X-E<XO%,`QWO1G5gO%,`QWO1G5gO5qQWO1G5gO%,hQWO<<LTOOQQ<<LT<<LTO%,mQWO<<LTO5iQ!LYO<<LTO){QYO<<KhOITQWO<<KhOOQQ<<Ko<<KoO$0{Q!LbO<<KoOOQQ<<Kp<<KpO$1VQ`O<<KpO%,rQ&jO'#IVO%,}QWO,5?xOLXQYO,5?xOOQQ1G2n1G2nO#GWQ!LrO'#ETO!?{Q&jO'#GrOOQO'#IX'#IXO%-VQ&jO,5=]OOQQ,5=],5=]O%-^Q&jO'#ETO%-iQ&jO'#ETO%.QQ&jO'#ETO%.[Q&jO'#GrO%.mQWO7+(bO%.rQWO7+(bO%.zQ`O7+(bOOQQ7+(b7+(bOITQWO7+(bO){QYO7+(bOITQWO7+(bO%/UQWO7+(bOOQQ7+(e7+(eO5iQ!LYO7+(eO#5YQWO7+(eO5_QWO7+(eO!,rQpO7+(eO%/dQWO,5>tOOQO-E<W-E<WOOQO'#Gu'#GuO%/oQWO1G5eO5iQ!LYO<<GpOOQQ<<Gp<<GpO%/wQWO<<GpO%/|QWO7++SO%0RQWO7++TOOQQ7+(m7+(mO%0WQWO7+(mO%0]QYO7+(mO%0dQWO7+(mO){QYO7++SO){QYO7++TOOQQ<<La<<LaOOQQ<<Lc<<LcOOQQ-E<Z-E<ZOOQQ1G3b1G3bO%0iQWO,5=wOOQQ,5=y,5=yO:^QWO<<LlO%0nQWO<<LlOLXQYO7+&ROOQO7+%T7+%TO%0sQ7^O1G5VO:^QWO7+%TOOQO1G0T1G0TO%0}Q!LdO1G0ZOOQO1G0Z1G0ZO){QYO1G0ZO%1XQ!LYO1G0ZO:^QWO1G0TO!,rQpO1G0TO!?{Q&jO1G0TO%1dQ!LYO1G0ZO%1rQ&jO1G0TO%2TQ!LYO1G0ZO%2iQ!LrO1G0ZO%2sQ&jO1G0TO!?{Q&jO1G0ZOOQ!LS<<IV<<IVOOQ!LS<<Ig<<IgO:^QWO<<IgO%2zQ!LdO<<NYOOQO7+)l7+)lO%3[Q!LdO7+'gO%5dQbO1G3|O%5nQ7^O7+%|O%5{Q7^O,59jO%7xQ7^O,5<UO%9uQ7^O,5<WO%;rQ7^O,5<fO%=bQ7^O7+'WO%=oQ7^O7+'XO%=|QWO,5;xOOQO7+&{7+&{O%>RQ#tO<<KfOOQO1G4U1G4UO%>cQWO1G4UO%>nQWO1G4UO%>|QWO7+*yO%>|QWO7+*yOITQWO1G4WO%?UQ`O1G4WO%?`QWO7+*zOOQO7+'o7+'oO5iQ!LYO7+'oOOQO7+'n7+'nO$,[QWO7+'pO%?hQ`O7+'pOOQO7+'t7+'tO5iQ!LYO7+'nO$,[QWO7+'oO%?oQWO7+'pOITQWO7+'pO#5TQWO7+'oO%?tQ#tO<<MzOOQ!LS7+$r7+$rO%@OQ`O,5>oOOQO-E<R-E<RO#IWQWOANASOOQQANASANASOITQWOANASO%@YQ!LbO7+'rOOQQAN=eAN=eO5qQWO1G4aOOQO1G4a1G4aO%@gQWO1G4aO%@lQWO7++RO%@lQWO7++RO5iQ!LYOANAoO%@tQWOANAoOOQQANAoANAoO%@yQWOANASO%ARQ`OANASOOQQANAZANAZOOQQANA[ANA[O%A]QWO,5>qOOQO-E<T-E<TO%AhQ7^O1G5dO#5YQWO,5=^O5_QWO,5=^O!,rQpO,5=^OOQO-E<V-E<VOOQQ1G2w1G2wO$:lQ!LrO,5:oO!?{Q&jO,5=^O%ArQ&jO,5=^O%BTQ&jO,5:oOOQQ<<K|<<K|OITQWO<<K|O%.mQWO<<K|O%B_QWO<<K|O%BgQ`O<<K|O){QYO<<K|OITQWO<<K|OOQQ<<LP<<LPO5iQ!LYO<<LPO#5YQWO<<LPO5_QWO<<LPO%BqQ&jO1G4`O%ByQWO7++POOQQAN=[AN=[O5iQ!LYOAN=[OOQQ<<Nn<<NnOOQQ<<No<<NoOOQQ<<LX<<LXO%CRQWO<<LXO%CWQYO<<LXO%C_QWO<<NnO%CdQWO<<NoOOQQ1G3c1G3cOOQQANBWANBWO:^QWOANBWO%CiQ7^O<<ImOOQO<<Ho<<HoOOQO7+%u7+%uO%0}Q!LdO7+%uO){QYO7+%uOOQO7+%o7+%oO:^QWO7+%oO!,rQpO7+%oO%CsQ!LYO7+%uO!?{Q&jO7+%oO%DOQ!LYO7+%uO%D^Q&jO7+%oO%DoQ!LYO7+%uOOQ!LSAN?RAN?RO%ETQ!LdO<<KfO%G]Q7^O<<JTO%GjQ7^O1G1yO%IYQ7^O1G2[O%KVQ7^O1G2^O%MSQ7^O<<JsO%MaQ7^O<<IhOOQO1G1d1G1dOOQO7+)p7+)pO%MnQWO7+)pO%MyQWO<<NeO%NRQ`O7+)rOOQO<<KZ<<KZO5iQ!LYO<<K[O$,[QWO<<K[OOQO<<KY<<KYO5iQ!LYO<<KZO%N]Q`O<<K[O$,[QWO<<KZOOQQG26nG26nO#IWQWOG26nOOQO7+){7+){O5qQWO7+){O%NdQWO<<NmOOQQG27ZG27ZO5iQ!LYOG27ZOITQWOG26nOLXQYO1G4]O%NlQWO7++OO5iQ!LYO1G2xO#5YQWO1G2xO5_QWO1G2xO!,rQpO1G2xO!?{Q&jO1G2xO%2iQ!LrO1G0ZO%NtQ&jO1G2xO%.mQWOANAhOOQQANAhANAhOITQWOANAhO& VQWOANAhO& _Q`OANAhOOQQANAkANAkO5iQ!LYOANAkO#5YQWOANAkOOQO'#Gv'#GvOOQO7+)z7+)zOOQQG22vG22vOOQQANAsANAsO& iQWOANAsOOQQANDYANDYOOQQANDZANDZO& nQYOG27rOOQO<<Ia<<IaO%0}Q!LdO<<IaOOQO<<IZ<<IZO:^QWO<<IZO){QYO<<IaO!,rQpO<<IZO&%lQ!LYO<<IaO!?{Q&jO<<IZO&%wQ!LYO<<IaO&&VQ7^O7+'gOOQO<<M[<<M[OOQOAN@vAN@vO5iQ!LYOAN@vOOQOAN@uAN@uO$,[QWOAN@vO5iQ!LYOAN@uOOQQLD,YLD,YOOQO<<Mg<<MgOOQQLD,uLD,uO#IWQWOLD,YO&'uQ7^O7+)wOOQO7+(d7+(dO5iQ!LYO7+(dO#5YQWO7+(dO5_QWO7+(dO!,rQpO7+(dO!?{Q&jO7+(dOOQQG27SG27SO%.mQWOG27SOITQWOG27SOOQQG27VG27VO5iQ!LYOG27VOOQQG27_G27_O:^QWOLD-^OOQOAN>{AN>{OOQOAN>uAN>uO%0}Q!LdOAN>{O:^QWOAN>uO){QYOAN>{O!,rQpOAN>uO&(PQ!LYOAN>{O&([Q7^O<<KfOOQOG26bG26bO5iQ!LYOG26bOOQOG26aG26aOOQQ!$( t!$( tOOQO<<LO<<LOO5iQ!LYO<<LOO#5YQWO<<LOO5_QWO<<LOO!,rQpO<<LOOOQQLD,nLD,nO%.mQWOLD,nOOQQLD,qLD,qOOQQ!$(!x!$(!xOOQOG24gG24gOOQOG24aG24aO%0}Q!LdOG24gO:^QWOG24aO){QYOG24gOOQOLD+|LD+|OOQOANAjANAjO5iQ!LYOANAjO#5YQWOANAjO5_QWOANAjOOQQ!$(!Y!$(!YOOQOLD*RLD*ROOQOLD){LD){O%0}Q!LdOLD*ROOQOG27UG27UO5iQ!LYOG27UO#5YQWOG27UOOQO!$'Mm!$'MmOOQOLD,pLD,pO5iQ!LYOLD,pOOQO!$(![!$(![OLXQYO'#DrO&)zQbO'#IrOLXQYO'#DjO&*RQ!LdO'#ChO&*lQbO'#ChO&*|QYO,5:vOLXQYO,5;ROLXQYO,5;ROLXQYO,5;ROLXQYO,5;ROLXQYO,5;ROLXQYO,5;ROLXQYO,5;ROLXQYO,5;ROLXQYO,5;ROLXQYO,5;ROLXQYO,5;ROLXQYO'#H}O&,|QWO,5<TO&.`QWO,5;ROLXQYO,5;fO!(aQWO'#DOO!(aQWO'#DOOITQWO'#FjO&-UQWO'#FjOITQWO'#FlO&-UQWO'#FlOITQWO'#FzO&-UQWO'#FzOLXQYO,5?kO&*|QYO1G0bO&.gQ7^O'#ChOLXQYO1G1lOITQWO,5<pO&-UQWO,5<pOITQWO,5<rO&-UQWO,5<rOITQWO,5<_O&-UQWO,5<_O&*|QYO1G1mOLXQYO7+&iOITQWO1G1{O&-UQWO1G1{O&*|QYO7+'XO&*|QYO7+%|OITQWO7+'zO&-UQWO7+'zO&.qQWO'#E[O&.vQWO'#E[O&/OQWO'#EzO&/TQWO'#EgO&/YQWO'#JPO&/eQWO'#I}O&/pQWO,5:vO&/uQ#tO,5<QO&/|QWO'#FsO&0RQWO'#FsO&0WQWO,5<RO&0`QWO,5:vO&0hQ7^O1G0}O&0oQWO,5<aO&0tQWO,5<aO&0yQWO1G1mO&1OQWO1G0bO&1TQ#tO1G2`O&1[Q#tO1G2`O4QQWO'#FhO5_QWO'#FgOBwQWO'#EZOLXQYO,5;cO!(pQWO'#FuO!(pQWO'#FuOJdQWO,5<tOJdQWO,5<t",
  stateData: "&2X~O'WOS'XOSTOSUOS~OPTOQTOXyO]cO_hObnOcmOhcOjTOkcOlcOqTOsTOxRO{cO|cO}cO!TSO!_kO!dUO!gTO!hTO!iTO!jTO!kTO!nlO#dsO#tpO#x^O%PqO%RtO%TrO%UrO%XuO%ZvO%^wO%_wO%axO%nzO%t{O%v|O%x}O%z!OO%}!PO&T!QO&X!RO&Z!SO&]!TO&_!UO&a!VO'ZPO'dQO'mYO'zaO~OP[XZ[X_[Xj[Xu[Xv[Xx[X!R[X!a[X!b[X!d[X!j[X!{[X#WdX#[[X#][X#^[X#_[X#`[X#a[X#b[X#c[X#e[X#g[X#i[X#j[X#o[X'U[X'd[X'n[X'u[X'v[X~O!]$lX~P$zOR!WO'S!XO'T!ZO~OPTOQTO]cOb!kOc!jOhcOjTOkcOlcOqTOsTOxRO{cO|cO}cO!T!bO!_kO!dUO!gTO!hTO!iTO!jTO!kTO!n!iO#t!lO#x^O'Z![O'dQO'mYO'zaO~O!Q!`O!R!]O!O'hP!O'rP~P'dO!S!mO~P`OPTOQTO]cOb!kOc!jOhcOjTOkcOlcOqTOsTOxRO{cO|cO}cO!T!bO!_kO!dUO!gTO!hTO!iTO!jTO!kTO!n!iO#t!lO#x^O'Z9YO'dQO'mYO'zaO~OPTOQTO]cOb!kOc!jOhcOjTOkcOlcOqTOsTOxRO{cO|cO}cO!T!bO!_kO!dUO!gTO!hTO!iTO!jTO!kTO!n!iO#t!lO#x^O'dQO'mYO'zaO~O!Q!rO#U!uO#V!rO'Z9ZO!c'oP~P+{O#W!vO~O!]!wO#W!vO~OP#^OZ#dOj#ROu!{Ov!{Ox!|O!R#bO!a#TO!b!yO!d!zO!j#^O#[#PO#]#QO#^#QO#_#QO#`#SO#a#TO#b#TO#c#TO#e#UO#g#WO#i#YO#j#ZO'dQO'n#[O'u!}O'v#OO~O_'fX'U'fX!c'fX!O'fX!T'fX%Q'fX!]'fX~P.jO!{#eO#o#eOP'gXZ'gX_'gXj'gXu'gXv'gXx'gX!R'gX!a'gX!b'gX!d'gX!j'gX#['gX#]'gX#^'gX#_'gX#`'gX#a'gX#b'gX#e'gX#g'gX#i'gX#j'gX'd'gX'n'gX'u'gX'v'gX~O#c'gX'U'gX!O'gX!c'gXn'gX!T'gX%Q'gX!]'gX~P0zO!{#eO~O#z#fO$R#jO~O!T#kO#x^O$U#lO$W#nO~O]#qOh$OOj#rOk#qOl#qOq$POs$QOx#xO!T#yO!_$VO!d#vO#V$WO#t$TO$_$RO$a$SO$d$UO'Z#pO'd#sO'_'aP~O!d$XO~O!]$ZO~O_$[O'U$[O~O'Z$`O~O!d$XO'Z$`O'[$bO'`$cO~Oc$iO!d$XO'Z$`O~O#c#TO~O]$rOu$nO!T$kO!d$mO%R$qO'Z$`O'[$bO^(SP~O!n$sO~Ox$tO!T$uO'Z$`O~Ox$tO!T$uO%Z$yO'Z$`O~O'Z$zO~O#dsO%RtO%TrO%UrO%XuO%ZvO%^wO%_wO~Ob%TOc%SO!n%QO%P%RO%c%PO~P7uOb%WOcmO!T%VO!nlO#dsO%PqO%TrO%UrO%XuO%ZvO%^wO%_wO%axO~O`%ZO!{%^O%R%XO'[$bO~P8tO!d%_O!g%cO~O!d%dO~O!TSO~O_$[O'R%lO'U$[O~O_$[O'R%oO'U$[O~O_$[O'R%qO'U$[O~OR!WO'S!XO'T%uO~OP[XZ[Xj[Xu[Xv[Xx[X!R[X!RdX!a[X!b[X!d[X!j[X!{[X!{dX#WdX#[[X#][X#^[X#_[X#`[X#a[X#b[X#c[X#e[X#g[X#i[X#j[X#o[X'd[X'n[X'u[X'v[X~O!O[X!OdX~P;aO!Q%wO!O&gX!O&lX!R&gX!R&lX~P'dO!R%yO!O'hX~OP#^OZ#dOj#ROu!{Ov!{Ox!|O!R%yO!a#TO!b!yO!d!zO!j#^O#[#PO#]#QO#^#QO#_#QO#`#SO#a#TO#b#TO#c#TO#e#UO#g#WO#i#YO#j#ZO'dQO'n#[O'u!}O'v#OO~O!O'hX~P>^O!O&OO~Ox&RO!W&]O!X&UO!Y&UO'[$bO~O]&SOk&SO!Q&VO'e&PO!S'iP!S'tP~P@aO!O'qX!R'qX!]'qX!c'qX'n'qX~O!{'qX#W#PX!S'qX~PAYO!{&^O!O'sX!R'sX~O!R&_O!O'rX~O!O&bO~O!{#eO~PAYOS&fO!T&cO!o&eO'Z$`O~Oc&kO!d$XO'Z$`O~Ou$nO!d$mO~O!S&lO~P`Ou!{Ov!{Ox!|O!b!yO!d!zO'dQOP!faZ!faj!fa!R!fa!a!fa!j!fa#[!fa#]!fa#^!fa#_!fa#`!fa#a!fa#b!fa#c!fa#e!fa#g!fa#i!fa#j!fa'n!fa'u!fa'v!fa~O_!fa'U!fa!O!fa!c!fan!fa!T!fa%Q!fa!]!fa~PCcO!c&mO~O!]!wO!{&oO'n&nO!R'pX_'pX'U'pX~O!c'pX~PE{O!R&sO!c'oX~O!c&uO~Ox$tO!T$uO#V&vO'Z$`O~OPTOQTO]cOb!kOc!jOhcOjTOkcOlcOqTOsTOxRO{cO|cO}cO!TSO!_kO!dUO!gTO!hTO!iTO!jTO!kTO!n!iO#t!lO#x^O'Z9YO'dQO'mYO'zaO~O]#qOh$OOj#rOk#qOl#qOq$POs9lOx#xO!T#yO!_:oO!d#vO#V9rO#t$TO$_9nO$a9pO$d$UO'Z&zO'd#sO~O#W&|O~O]#qOh$OOj#rOk#qOl#qOq$POs$QOx#xO!T#yO!_$VO!d#vO#V$WO#t$TO$_$RO$a$SO$d$UO'Z&zO'd#sO~O'_'kP~PJdO!Q'QO!c'lP~P){O'e'SO'mYO~OP9VOQ9VO]cOb:mOc!jOhcOj9VOkcOlcOq9VOs9VOxRO{cO|cO}cO!T!bO!_9XO!dUO!g9VO!h9VO!i9VO!j9VO!k9VO!n!iO#t!lO#x^O'Z'bO'dQO'mYO'z:kO~O!d!zO~O!R#bO_$]a'U$]a!c$]a!O$]a!T$]a%Q$]a!]$]a~O#d'iO~PITO!]'kO!T'wX#w'wX#z'wX$R'wX~Ou'lO~P! POu'lO!T'wX#w'wX#z'wX$R'wX~O!T'nO#w'rO#z'mO$R'sO~O!Q'vO~PLXO#z#fO$R'yO~Ou$eXx$eX!b$eX'n$eX'u$eX'v$eX~OSfX!RfX!{fX'_fX'_$eX~P!!iOk'{O~OR'|O'S'}O'T(PO~Ou(ROx(SO'n#[O'u(UO'v(WO~O'_(QO~P!#rO'_(ZO~O]#qOh$OOj#rOk#qOl#qOq$POs9lOx#xO!T#yO!_:oO!d#vO#V9rO#t$TO$_9nO$a9pO$d$UO'd#sO~O!Q(_O'Z([O!c'{P~P!$aO#W(aO~O!Q(eO'Z(bO!O'|P~P!$aO_(nOj(sOx(kO!W(qO!X(jO!Y(jO!d(hO!x(rO$w(mO'[$bO'e(gO~O!S(pO~P!&XO!b!yOu'cXx'cX'n'cX'u'cX'v'cX!R'cX!{'cX~O'_'cX#m'cX~P!'TOS(vO!{(uO!R'bX'_'bX~O!R(wO'_'aX~O'Z(yO~O!d)OO~O'Z&zO~O!d(hO~Ox$tO!Q!rO!T$uO#U!uO#V!rO'Z$`O!c'oP~O!]!wO#W)SO~OP#^OZ#dOj#ROu!{Ov!{Ox!|O!a#TO!b!yO!d!zO!j#^O#[#PO#]#QO#^#QO#_#QO#`#SO#a#TO#b#TO#c#TO#e#UO#g#WO#i#YO#j#ZO'dQO'n#[O'u!}O'v#OO~O_!^a!R!^a'U!^a!O!^a!c!^an!^a!T!^a%Q!^a!]!^a~P!)fOS)[O!T&cO!o)ZO%Q)YO'`$cO~O'Z$zO'_'aP~O!])_O!T'^X_'^X'U'^X~O!d$XO'`$cO~O!d$XO'Z$`O'`$cO~O!]!wO#W&|O~O])jO%R)kO'Z)gO!S(TP~O!R)lO^(SX~O'e'SO~OZ)pO~O^)qO~O!T$kO'Z$`O'[$bO^(SP~Ox$tO!Q)vO!R&_O!T$uO'Z$`O!O'rP~O]&YOk&YO!Q)wO'e'SO!S'tP~O!R)xO_(PX'U(PX~O!{)|O'`$cO~OS*PO!T#yO'`$cO~O!T*RO~Ou*TO!TSO~O!n*YO~Oc*_O~O'Z(yO!S(RP~Oc$iO~O%RtO'Z$zO~P8tOZ*eO^*dO~OPTOQTO]cObnOcmOhcOjTOkcOlcOqTOsTOxRO{cO|cO}cO!_kO!dUO!gTO!hTO!iTO!jTO!kTO!nlO#x^O%PqO'dQO'mYO'zaO~O!T!bO#t!lO'Z9YO~P!1RO^*dO_$[O'U$[O~O_*iO#d*kO%T*kO%U*kO~P){O!d%_O~O%t*pO~O!T*rO~O&U*uO&V*tOP&SaQ&SaX&Sa]&Sa_&Sab&Sac&Sah&Saj&Sak&Sal&Saq&Sas&Sax&Sa{&Sa|&Sa}&Sa!T&Sa!_&Sa!d&Sa!g&Sa!h&Sa!i&Sa!j&Sa!k&Sa!n&Sa#d&Sa#t&Sa#x&Sa%P&Sa%R&Sa%T&Sa%U&Sa%X&Sa%Z&Sa%^&Sa%_&Sa%a&Sa%n&Sa%t&Sa%v&Sa%x&Sa%z&Sa%}&Sa&T&Sa&X&Sa&Z&Sa&]&Sa&_&Sa&a&Sa'Q&Sa'Z&Sa'd&Sa'm&Sa'z&Sa!S&Sa%{&Sa`&Sa&Q&Sa~O'Z*xO~On*{O~O!O&ga!R&ga~P!)fO!Q+PO!O&gX!R&gX~P){O!R%yO!O'ha~O!O'ha~P>^O!R&_O!O'ra~O!RwX!R!ZX!SwX!S!ZX!]wX!]!ZX!d!ZX!{wX'`!ZX~O!]+UO!{+TO!R#TX!R'jX!S#TX!S'jX!]'jX!d'jX'`'jX~O!]+WO!d$XO'`$cO!R!VX!S!VX~O]&QOk&QOx&RO'e(gO~OP9VOQ9VO]cOb:mOc!jOhcOj9VOkcOlcOq9VOs9VOxRO{cO|cO}cO!T!bO!_9XO!dUO!g9VO!h9VO!i9VO!j9VO!k9VO!n!iO#t!lO#x^O'dQO'mYO'z:kO~O'Z9vO~P!;^O!R+[O!S'iX~O!S+^O~O!]+UO!{+TO!R#TX!S#TX~O!R+_O!S'tX~O!S+aO~O]&QOk&QOx&RO'[$bO'e(gO~O!X+bO!Y+bO~P!>[Ox$tO!Q+dO!T$uO'Z$`O!O&lX!R&lX~O_+hO!W+kO!X+gO!Y+gO!r+oO!s+mO!t+nO!u+lO!x+pO'[$bO'e(gO'm+eO~O!S+jO~P!?]OS+uO!T&cO!o+tO~O!{+{O!R'pa!c'pa_'pa'U'pa~O!]!wO~P!@gO!R&sO!c'oa~Ox$tO!Q,OO!T$uO#U,QO#V,OO'Z$`O!R&nX!c&nX~O_#Oi!R#Oi'U#Oi!O#Oi!c#Oin#Oi!T#Oi%Q#Oi!]#Oi~P!)fO#W!za!R!za!c!za!{!za!T!za_!za'U!za!O!za~P!#rO#W'cXP'cXZ'cX_'cXj'cXv'cX!a'cX!d'cX!j'cX#['cX#]'cX#^'cX#_'cX#`'cX#a'cX#b'cX#c'cX#e'cX#g'cX#i'cX#j'cX'U'cX'd'cX!c'cX!O'cX!T'cXn'cX%Q'cX!]'cX~P!'TO!R,ZO'_'kX~P!#rO'_,]O~O!R,^O!c'lX~P!)fO!c,aO~O!O,bO~OP#^Ou!{Ov!{Ox!|O!b!yO!d!zO!j#^O'dQOZ#Zi_#Zij#Zi!R#Zi!a#Zi#]#Zi#^#Zi#_#Zi#`#Zi#a#Zi#b#Zi#c#Zi#e#Zi#g#Zi#i#Zi#j#Zi'U#Zi'n#Zi'u#Zi'v#Zi!O#Zi!c#Zin#Zi!T#Zi%Q#Zi!]#Zi~O#[#Zi~P!EtO#[#PO~P!EtOP#^Ou!{Ov!{Ox!|O!b!yO!d!zO!j#^O#[#PO#]#QO#^#QO#_#QO'dQOZ#Zi_#Zi!R#Zi!a#Zi#`#Zi#a#Zi#b#Zi#c#Zi#e#Zi#g#Zi#i#Zi#j#Zi'U#Zi'n#Zi'u#Zi'v#Zi!O#Zi!c#Zin#Zi!T#Zi%Q#Zi!]#Zi~Oj#Zi~P!H`Oj#RO~P!H`OP#^Oj#ROu!{Ov!{Ox!|O!b!yO!d!zO!j#^O#[#PO#]#QO#^#QO#_#QO#`#SO'dQO_#Zi!R#Zi#e#Zi#g#Zi#i#Zi#j#Zi'U#Zi'n#Zi'u#Zi'v#Zi!O#Zi!c#Zin#Zi!T#Zi%Q#Zi!]#Zi~OZ#Zi!a#Zi#a#Zi#b#Zi#c#Zi~P!JzOZ#dO!a#TO#a#TO#b#TO#c#TO~P!JzOP#^OZ#dOj#ROu!{Ov!{Ox!|O!a#TO!b!yO!d!zO!j#^O#[#PO#]#QO#^#QO#_#QO#`#SO#a#TO#b#TO#c#TO#e#UO'dQO_#Zi!R#Zi#g#Zi#i#Zi#j#Zi'U#Zi'n#Zi'v#Zi!O#Zi!c#Zin#Zi!T#Zi%Q#Zi!]#Zi~O'u#Zi~P!MrO'u!}O~P!MrOP#^OZ#dOj#ROu!{Ov!{Ox!|O!a#TO!b!yO!d!zO!j#^O#[#PO#]#QO#^#QO#_#QO#`#SO#a#TO#b#TO#c#TO#e#UO#g#WO'dQO'u!}O_#Zi!R#Zi#i#Zi#j#Zi'U#Zi'n#Zi!O#Zi!c#Zin#Zi!T#Zi%Q#Zi!]#Zi~O'v#Zi~P#!^O'v#OO~P#!^OP#^OZ#dOj#ROu!{Ov!{Ox!|O!a#TO!b!yO!d!zO!j#^O#[#PO#]#QO#^#QO#_#QO#`#SO#a#TO#b#TO#c#TO#e#UO#g#WO#i#YO'dQO'u!}O'v#OO~O_#Zi!R#Zi#j#Zi'U#Zi'n#Zi!O#Zi!c#Zin#Zi!T#Zi%Q#Zi!]#Zi~P#$xOP[XZ[Xj[Xu[Xv[Xx[X!a[X!b[X!d[X!j[X!{[X#WdX#[[X#][X#^[X#_[X#`[X#a[X#b[X#c[X#e[X#g[X#i[X#j[X#o[X'd[X'n[X'u[X'v[X!R[X!S[X~O#m[X~P#']OP#^OZ9jOj9_Ou!{Ov!{Ox!|O!a9aO!b!yO!d!zO!j#^O#[9]O#]9^O#^9^O#_9^O#`9`O#a9aO#b9aO#c9aO#e9bO#g9dO#i9fO#j9gO'dQO'n#[O'u!}O'v#OO~O#m,dO~P#)gOP'gXZ'gXj'gXu'gXv'gXx'gX!a'gX!b'gX!d'gX!j'gX#['gX#]'gX#^'gX#_'gX#`'gX#a'gX#b'gX#e'gX#g'gX#i'gX#j'gX'd'gX'n'gX'u'gX'v'gX!R'gX~O!{9kO#o9kO#c'gX#m'gX!S'gX~P#+bO_&qa!R&qa'U&qa!c&qan&qa!O&qa!T&qa%Q&qa!]&qa~P!)fOP#ZiZ#Zi_#Zij#Ziv#Zi!R#Zi!a#Zi!b#Zi!d#Zi!j#Zi#[#Zi#]#Zi#^#Zi#_#Zi#`#Zi#a#Zi#b#Zi#c#Zi#e#Zi#g#Zi#i#Zi#j#Zi'U#Zi'd#Zi!O#Zi!c#Zin#Zi!T#Zi%Q#Zi!]#Zi~P!#rO_#ni!R#ni'U#ni!O#ni!c#nin#ni!T#ni%Q#ni!]#ni~P!)fO#z,fO~O#z,gO~O!]'kO!{,hO!T$OX#w$OX#z$OX$R$OX~O!Q,iO~O!T'nO#w,kO#z'mO$R,lO~O!R9hO!S'fX~P#)gO!S,mO~O$R,oO~OR'|O'S'}O'T,rO~O],uOk,uO!O,vO~O!RdX!]dX!cdX!c$eX'ndX~P!!iO!c,|O~P!#rO!R,}O!]!wO'n&nO!c'{X~O!c-SO~O!O$eX!R$eX!]$lX~P!!iO!R-UO!O'|X~P!#rO!]-WO~O!O-YO~O!Q(_O'Z$`O!c'{P~Oj-^O!]!wO!d$XO'`$cO'n&nO~O!])_O~O!S-dO~P!&XO!X-eO!Y-eO'[$bO'e(gO~Ox-gO'e(gO~O!x-hO~O'Z$zO!R&vX'_&vX~O!R(wO'_'aa~Ou-mOv-mOx-nO'nra'ura'vra!Rra!{ra~O'_ra#mra~P#6fOu(ROx(SO'n$^a'u$^a'v$^a!R$^a!{$^a~O'_$^a#m$^a~P#7[Ou(ROx(SO'n$`a'u$`a'v$`a!R$`a!{$`a~O'_$`a#m$`a~P#7}O]-oO~O#W-pO~O'_$na!R$na#m$na!{$na~P!#rO#W-sO~OS-|O!T&cO!o-{O%Q-zO~O'_-}O~O]#qOj#rOk#qOl#qOq$POs9lOx#xO!T#yO!_:oO!d#vO#V9rO#t$TO$_9nO$a9pO$d$UO'd#sO~Oh.PO'Z.OO~P#9tO!])_O!T'^a_'^a'U'^a~O#W.VO~OZ[X!RdX!SdX~O!R.WO!S(TX~O!S.YO~OZ.ZO~O].]O'Z)gO~O!T$kO'Z$`O^'OX!R'OX~O!R)lO^(Sa~O!c.`O~P!)fO].bO~OZ.cO~O^.dO~OS-|O!T&cO!o-{O%Q-zO'`$cO~O!R)xO_(Pa'U(Pa~O!{.jO~OS.mO!T#yO~O'e'SO!S(QP~OS.wO!T.sO!o.vO%Q.uO'`$cO~OZ/RO!R/PO!S(RX~O!S/SO~O^/UO_$[O'U$[O~O]/VO~O]/WO'Z(yO~O#c/XO%r/YO~P0zO!{#eO#c/XO%r/YO~O_/ZO~P){O_/]O~O%{/aOP%yiQ%yiX%yi]%yi_%yib%yic%yih%yij%yik%yil%yiq%yis%yix%yi{%yi|%yi}%yi!T%yi!_%yi!d%yi!g%yi!h%yi!i%yi!j%yi!k%yi!n%yi#d%yi#t%yi#x%yi%P%yi%R%yi%T%yi%U%yi%X%yi%Z%yi%^%yi%_%yi%a%yi%n%yi%t%yi%v%yi%x%yi%z%yi%}%yi&T%yi&X%yi&Z%yi&]%yi&_%yi&a%yi'Q%yi'Z%yi'd%yi'm%yi'z%yi!S%yi`%yi&Q%yi~O`/gO!S/eO&Q/fO~P`O!TSO!d/jO~O!R#bOn$]a~O!O&gi!R&gi~P!)fO!R%yO!O'hi~O!R&_O!O'ri~O!O/nO~O!R!Va!S!Va~P#)gO]&QOk&QO!Q/tO'e(gO!R&hX!S&hX~P@aO!R+[O!S'ia~O]&YOk&YO!Q)wO'e'SO!R&mX!S&mX~O!R+_O!S'ta~O!O'si!R'si~P!)fO_$[O!]!wO!d$XO!j0OO!{/|O'U$[O'`$cO'n&nO~O!S0RO~P!?]O!X0SO!Y0SO'[$bO'e(gO'm+eO~O!W0TO~P#GyO!TSO!W0TO!u0VO!x0WO~P#GyO!W0TO!s0YO!t0YO!u0VO!x0WO~P#GyO!T&cO~O!T&cO~P!#rO!R'pi!c'pi_'pi'U'pi~P!)fO!{0cO!R'pi!c'pi_'pi'U'pi~O!R&sO!c'oi~Ox$tO!T$uO#V0eO'Z$`O~O#WraPraZra_rajra!ara!bra!dra!jra#[ra#]ra#^ra#_ra#`ra#ara#bra#cra#era#gra#ira#jra'Ura'dra!cra!Ora!Tranra%Qra!]ra~P#6fO#W$^aP$^aZ$^a_$^aj$^av$^a!a$^a!b$^a!d$^a!j$^a#[$^a#]$^a#^$^a#_$^a#`$^a#a$^a#b$^a#c$^a#e$^a#g$^a#i$^a#j$^a'U$^a'd$^a!c$^a!O$^a!T$^an$^a%Q$^a!]$^a~P#7[O#W$`aP$`aZ$`a_$`aj$`av$`a!a$`a!b$`a!d$`a!j$`a#[$`a#]$`a#^$`a#_$`a#`$`a#a$`a#b$`a#c$`a#e$`a#g$`a#i$`a#j$`a'U$`a'd$`a!c$`a!O$`a!T$`an$`a%Q$`a!]$`a~P#7}O#W$naP$naZ$na_$naj$nav$na!R$na!a$na!b$na!d$na!j$na#[$na#]$na#^$na#_$na#`$na#a$na#b$na#c$na#e$na#g$na#i$na#j$na'U$na'd$na!c$na!O$na!T$na!{$nan$na%Q$na!]$na~P!#rO_#Oq!R#Oq'U#Oq!O#Oq!c#Oqn#Oq!T#Oq%Q#Oq!]#Oq~P!)fO!R&iX'_&iX~PJdO!R,ZO'_'ka~O!Q0mO!R&jX!c&jX~P){O!R,^O!c'la~O!R,^O!c'la~P!)fO#m!fa!S!fa~PCcO#m!^a!R!^a!S!^a~P#)gO!T1QO#x^O$P1RO~O!S1VO~On1WO~P!#rO_$Yq!R$Yq'U$Yq!O$Yq!c$Yqn$Yq!T$Yq%Q$Yq!]$Yq~P!)fO!O1XO~O],uOk,uO~Ou(ROx(SO'v(WO'n$xi'u$xi!R$xi!{$xi~O'_$xi#m$xi~P$(jOu(ROx(SO'n$zi'u$zi'v$zi!R$zi!{$zi~O'_$zi#m$zi~P$)]O#m1YO~P!#rO!Q1[O'Z$`O!R&rX!c&rX~O!R,}O!c'{a~O!R,}O!]!wO!c'{a~O!R,}O!]!wO'n&nO!c'{a~O'_$gi!R$gi#m$gi!{$gi~P!#rO!Q1cO'Z(bO!O&tX!R&tX~P!$aO!R-UO!O'|a~O!R-UO!O'|a~P!#rO!]!wO~O!]!wO#c1mO~Oj1qO!]!wO'n&nO~O!R'bi'_'bi~P!#rO!{1tO!R'bi'_'bi~P!#rO!c1wO~O_$Zq!R$Zq'U$Zq!O$Zq!c$Zqn$Zq!T$Zq%Q$Zq!]$Zq~P!)fO!R1{O!T'}X~P!#rO!T&cO%Q2OO~O!T&cO%Q2OO~P!#rO!T$eX$u[X_$eX'U$eX~P!!iO$u2SOugXxgX!TgX'ngX'ugX'vgX_gX'UgX~O$u2SO~O]2YO%R2ZO'Z)gO!R&}X!S&}X~O!R.WO!S(Ta~OZ2_O~O^2`O~O]2cO~OS2eO!T&cO!o2dO%Q2OO~O_$[O'U$[O~P!#rO!T#yO~P!#rO!R2jO!{2lO!S(QX~O!S2mO~Ox(kO!W2vO!X2oO!Y2oO!r2uO!s2tO!t2tO!x2sO'[$bO'e(gO'm+eO~O!S2rO~P$1nOS2}O!T.sO!o2|O%Q2{O~OS2}O!T.sO!o2|O%Q2{O'`$cO~O'Z(yO!R&|X!S&|X~O!R/PO!S(Ra~O]3XO'e3WO~O]3YO~O^3[O~O!c3_O~P){O_3aO~O_3aO~P){O#c3cO%r3dO~PE{O`/gO!S3hO&Q/fO~P`O!]3jO~O&V3kOP&SqQ&SqX&Sq]&Sq_&Sqb&Sqc&Sqh&Sqj&Sqk&Sql&Sqq&Sqs&Sqx&Sq{&Sq|&Sq}&Sq!T&Sq!_&Sq!d&Sq!g&Sq!h&Sq!i&Sq!j&Sq!k&Sq!n&Sq#d&Sq#t&Sq#x&Sq%P&Sq%R&Sq%T&Sq%U&Sq%X&Sq%Z&Sq%^&Sq%_&Sq%a&Sq%n&Sq%t&Sq%v&Sq%x&Sq%z&Sq%}&Sq&T&Sq&X&Sq&Z&Sq&]&Sq&_&Sq&a&Sq'Q&Sq'Z&Sq'd&Sq'm&Sq'z&Sq!S&Sq%{&Sq`&Sq&Q&Sq~O!R#Ti!S#Ti~P#)gO!{3mO!R#Ti!S#Ti~O!R!Vi!S!Vi~P#)gO_$[O!{3tO'U$[O~O_$[O!]!wO!{3tO'U$[O~O!X3xO!Y3xO'[$bO'e(gO'm+eO~O_$[O!]!wO!d$XO!j3yO!{3tO'U$[O'`$cO'n&nO~O!W3zO~P$:ZO!W3zO!u3}O!x4OO~P$:ZO_$[O!]!wO!j3yO!{3tO'U$[O'n&nO~O!R'pq!c'pq_'pq'U'pq~P!)fO!R&sO!c'oq~O#W$xiP$xiZ$xi_$xij$xiv$xi!a$xi!b$xi!d$xi!j$xi#[$xi#]$xi#^$xi#_$xi#`$xi#a$xi#b$xi#c$xi#e$xi#g$xi#i$xi#j$xi'U$xi'd$xi!c$xi!O$xi!T$xin$xi%Q$xi!]$xi~P$(jO#W$ziP$ziZ$zi_$zij$ziv$zi!a$zi!b$zi!d$zi!j$zi#[$zi#]$zi#^$zi#_$zi#`$zi#a$zi#b$zi#c$zi#e$zi#g$zi#i$zi#j$zi'U$zi'd$zi!c$zi!O$zi!T$zin$zi%Q$zi!]$zi~P$)]O#W$giP$giZ$gi_$gij$giv$gi!R$gi!a$gi!b$gi!d$gi!j$gi#[$gi#]$gi#^$gi#_$gi#`$gi#a$gi#b$gi#c$gi#e$gi#g$gi#i$gi#j$gi'U$gi'd$gi!c$gi!O$gi!T$gi!{$gin$gi%Q$gi!]$gi~P!#rO!R&ia'_&ia~P!#rO!R&ja!c&ja~P!)fO!R,^O!c'li~O#m#Oi!R#Oi!S#Oi~P#)gOP#^Ou!{Ov!{Ox!|O!b!yO!d!zO!j#^O'dQOZ#Zij#Zi!a#Zi#]#Zi#^#Zi#_#Zi#`#Zi#a#Zi#b#Zi#c#Zi#e#Zi#g#Zi#i#Zi#j#Zi#m#Zi'n#Zi'u#Zi'v#Zi!R#Zi!S#Zi~O#[#Zi~P$CqO#[9]O~P$CqOP#^Ou!{Ov!{Ox!|O!b!yO!d!zO!j#^O#[9]O#]9^O#^9^O#_9^O'dQOZ#Zi!a#Zi#`#Zi#a#Zi#b#Zi#c#Zi#e#Zi#g#Zi#i#Zi#j#Zi#m#Zi'n#Zi'u#Zi'v#Zi!R#Zi!S#Zi~Oj#Zi~P$EyOj9_O~P$EyOP#^Oj9_Ou!{Ov!{Ox!|O!b!yO!d!zO!j#^O#[9]O#]9^O#^9^O#_9^O#`9`O'dQO#e#Zi#g#Zi#i#Zi#j#Zi#m#Zi'n#Zi'u#Zi'v#Zi!R#Zi!S#Zi~OZ#Zi!a#Zi#a#Zi#b#Zi#c#Zi~P$HROZ9jO!a9aO#a9aO#b9aO#c9aO~P$HROP#^OZ9jOj9_Ou!{Ov!{Ox!|O!a9aO!b!yO!d!zO!j#^O#[9]O#]9^O#^9^O#_9^O#`9`O#a9aO#b9aO#c9aO#e9bO'dQO#g#Zi#i#Zi#j#Zi#m#Zi'n#Zi'v#Zi!R#Zi!S#Zi~O'u#Zi~P$JgO'u!}O~P$JgOP#^OZ9jOj9_Ou!{Ov!{Ox!|O!a9aO!b!yO!d!zO!j#^O#[9]O#]9^O#^9^O#_9^O#`9`O#a9aO#b9aO#c9aO#e9bO#g9dO'dQO'u!}O#i#Zi#j#Zi#m#Zi'n#Zi!R#Zi!S#Zi~O'v#Zi~P$LoO'v#OO~P$LoOP#^OZ9jOj9_Ou!{Ov!{Ox!|O!a9aO!b!yO!d!zO!j#^O#[9]O#]9^O#^9^O#_9^O#`9`O#a9aO#b9aO#c9aO#e9bO#g9dO#i9fO'dQO'u!}O'v#OO~O#j#Zi#m#Zi'n#Zi!R#Zi!S#Zi~P$NwO_#ky!R#ky'U#ky!O#ky!c#kyn#ky!T#ky%Q#ky!]#ky~P!)fOP#ZiZ#Zij#Ziv#Zi!a#Zi!b#Zi!d#Zi!j#Zi#[#Zi#]#Zi#^#Zi#_#Zi#`#Zi#a#Zi#b#Zi#c#Zi#e#Zi#g#Zi#i#Zi#j#Zi#m#Zi'd#Zi!R#Zi!S#Zi~P!#rO!b!yOP'cXZ'cXj'cXu'cXv'cXx'cX!a'cX!d'cX!j'cX#['cX#]'cX#^'cX#_'cX#`'cX#a'cX#b'cX#c'cX#e'cX#g'cX#i'cX#j'cX#m'cX'd'cX'n'cX'u'cX'v'cX!R'cX!S'cX~O#m#ni!R#ni!S#ni~P#)gO!S4`O~O!R&qa!S&qa~P#)gO!]!wO'n&nO!R&ra!c&ra~O!R,}O!c'{i~O!R,}O!]!wO!c'{i~O!O&ta!R&ta~P!#rO!]4gO~O!R-UO!O'|i~P!#rO!R-UO!O'|i~O!O4mO~O!]!wO#c4sO~Oj4tO!]!wO'n&nO~O!O4vO~O'_$iq!R$iq#m$iq!{$iq~P!#rO_$Zy!R$Zy'U$Zy!O$Zy!c$Zyn$Zy!T$Zy%Q$Zy!]$Zy~P!)fO!R1{O!T'}a~O!T&cO%Q4{O~O!T&cO%Q4{O~P!#rO_#Oy!R#Oy'U#Oy!O#Oy!c#Oyn#Oy!T#Oy%Q#Oy!]#Oy~P!)fOZ5OO~O]5QO'Z)gO~O!R.WO!S(Ti~O]5TO~O^5UO~O'e'SO!R&yX!S&yX~O!R2jO!S(Qa~O!S5cO~P$1nOx-gO'e(gO'm+eO~O!W5fO!X5eO!Y5eO!x0WO'[$bO'e(gO'm+eO~O!s5gO!t5gO~P%-iO!X5eO!Y5eO'[$bO'e(gO'm+eO~O!T.sO~O!T.sO%Q5iO~O!T.sO%Q5iO~P!#rOS5nO!T.sO!o5mO%Q5iO~OZ5sO!R&|a!S&|a~O!R/PO!S(Ri~O]5vO~O!c5wO~O!c5xO~O!c5yO~O!c5yO~P){O_5{O~O!]6OO~O!c6QO~O!R'si!S'si~P#)gO_$[O'U$[O~P!)fO_$[O!{6VO'U$[O~O_$[O!]!wO!{6VO'U$[O~O!X6[O!Y6[O'[$bO'e(gO'm+eO~O_$[O!]!wO!j6]O!{6VO'U$[O'n&nO~O!d$XO'`$cO~P%2TO!W6^O~P%1rO!R'py!c'py_'py'U'py~P!)fO#W$iqP$iqZ$iq_$iqj$iqv$iq!R$iq!a$iq!b$iq!d$iq!j$iq#[$iq#]$iq#^$iq#_$iq#`$iq#a$iq#b$iq#c$iq#e$iq#g$iq#i$iq#j$iq'U$iq'd$iq!c$iq!O$iq!T$iq!{$iqn$iq%Q$iq!]$iq~P!#rO!R&ji!c&ji~P!)fO#m#Oq!R#Oq!S#Oq~P#)gOu-mOv-mOx-nOPraZrajra!ara!bra!dra!jra#[ra#]ra#^ra#_ra#`ra#ara#bra#cra#era#gra#ira#jra#mra'dra'nra'ura'vra!Rra!Sra~Ou(ROx(SOP$^aZ$^aj$^av$^a!a$^a!b$^a!d$^a!j$^a#[$^a#]$^a#^$^a#_$^a#`$^a#a$^a#b$^a#c$^a#e$^a#g$^a#i$^a#j$^a#m$^a'd$^a'n$^a'u$^a'v$^a!R$^a!S$^a~Ou(ROx(SOP$`aZ$`aj$`av$`a!a$`a!b$`a!d$`a!j$`a#[$`a#]$`a#^$`a#_$`a#`$`a#a$`a#b$`a#c$`a#e$`a#g$`a#i$`a#j$`a#m$`a'd$`a'n$`a'u$`a'v$`a!R$`a!S$`a~OP$naZ$naj$nav$na!a$na!b$na!d$na!j$na#[$na#]$na#^$na#_$na#`$na#a$na#b$na#c$na#e$na#g$na#i$na#j$na#m$na'd$na!R$na!S$na~P!#rO#m$Yq!R$Yq!S$Yq~P#)gO#m$Zq!R$Zq!S$Zq~P#)gO!S6hO~O'_$|y!R$|y#m$|y!{$|y~P!#rO!]!wO!R&ri!c&ri~O!]!wO'n&nO!R&ri!c&ri~O!R,}O!c'{q~O!O&ti!R&ti~P!#rO!R-UO!O'|q~O!O6oO~P!#rO!O6oO~O!R'by'_'by~P!#rO!R&wa!T&wa~P!#rO!T$tq_$tq'U$tq~P!#rOZ6wO~O!R.WO!S(Tq~O]6zO~O!T&cO%Q6{O~O!T&cO%Q6{O~P!#rO!{6|O!R&ya!S&ya~O!R2jO!S(Qi~P#)gO!X7SO!Y7SO'[$bO'e(gO'm+eO~O!W7UO!x4OO~P%ArO!T.sO%Q7XO~O!T.sO%Q7XO~P!#rO]7`O'e7_O~O!R/PO!S(Rq~O!c7bO~O!c7bO~P){O!c7dO~O!c7eO~O!R#Ty!S#Ty~P#)gO_$[O!{7kO'U$[O~O_$[O!]!wO!{7kO'U$[O~O!X7nO!Y7nO'[$bO'e(gO'm+eO~O_$[O!]!wO!j7oO!{7kO'U$[O'n&nO~O#W$|yP$|yZ$|y_$|yj$|yv$|y!R$|y!a$|y!b$|y!d$|y!j$|y#[$|y#]$|y#^$|y#_$|y#`$|y#a$|y#b$|y#c$|y#e$|y#g$|y#i$|y#j$|y'U$|y'd$|y!c$|y!O$|y!T$|y!{$|yn$|y%Q$|y!]$|y~P!#rO#m#ky!R#ky!S#ky~P#)gOP$giZ$gij$giv$gi!a$gi!b$gi!d$gi!j$gi#[$gi#]$gi#^$gi#_$gi#`$gi#a$gi#b$gi#c$gi#e$gi#g$gi#i$gi#j$gi#m$gi'd$gi!R$gi!S$gi~P!#rOu(ROx(SO'v(WOP$xiZ$xij$xiv$xi!a$xi!b$xi!d$xi!j$xi#[$xi#]$xi#^$xi#_$xi#`$xi#a$xi#b$xi#c$xi#e$xi#g$xi#i$xi#j$xi#m$xi'd$xi'n$xi'u$xi!R$xi!S$xi~Ou(ROx(SOP$ziZ$zij$ziv$zi!a$zi!b$zi!d$zi!j$zi#[$zi#]$zi#^$zi#_$zi#`$zi#a$zi#b$zi#c$zi#e$zi#g$zi#i$zi#j$zi#m$zi'd$zi'n$zi'u$zi'v$zi!R$zi!S$zi~O#m$Zy!R$Zy!S$Zy~P#)gO#m#Oy!R#Oy!S#Oy~P#)gO!]!wO!R&rq!c&rq~O!R,}O!c'{y~O!O&tq!R&tq~P!#rO!O7uO~P!#rO!R.WO!S(Ty~O!R2jO!S(Qq~O!X8RO!Y8RO'[$bO'e(gO'm+eO~O!T.sO%Q8UO~O!T.sO%Q8UO~P!#rO!c8XO~O&V8YOP&S!ZQ&S!ZX&S!Z]&S!Z_&S!Zb&S!Zc&S!Zh&S!Zj&S!Zk&S!Zl&S!Zq&S!Zs&S!Zx&S!Z{&S!Z|&S!Z}&S!Z!T&S!Z!_&S!Z!d&S!Z!g&S!Z!h&S!Z!i&S!Z!j&S!Z!k&S!Z!n&S!Z#d&S!Z#t&S!Z#x&S!Z%P&S!Z%R&S!Z%T&S!Z%U&S!Z%X&S!Z%Z&S!Z%^&S!Z%_&S!Z%a&S!Z%n&S!Z%t&S!Z%v&S!Z%x&S!Z%z&S!Z%}&S!Z&T&S!Z&X&S!Z&Z&S!Z&]&S!Z&_&S!Z&a&S!Z'Q&S!Z'Z&S!Z'd&S!Z'm&S!Z'z&S!Z!S&S!Z%{&S!Z`&S!Z&Q&S!Z~O_$[O!{8_O'U$[O~O_$[O!]!wO!{8_O'U$[O~OP$iqZ$iqj$iqv$iq!a$iq!b$iq!d$iq!j$iq#[$iq#]$iq#^$iq#_$iq#`$iq#a$iq#b$iq#c$iq#e$iq#g$iq#i$iq#j$iq#m$iq'd$iq!R$iq!S$iq~P!#rO!R&yq!S&yq~P#)gO_$[O!{8tO'U$[O~OP$|yZ$|yj$|yv$|y!a$|y!b$|y!d$|y!j$|y#[$|y#]$|y#^$|y#_$|y#`$|y#a$|y#b$|y#c$|y#e$|y#g$|y#i$|y#j$|y#m$|y'd$|y!R$|y!S$|y~P!#rOn'fX~P.jOn[X!O[X!c[X%r[X!T[X%Q[X!][X~P$zO!]dX!c[X!cdX'ndX~P;aOP9VOQ9VO]cOb:mOc!jOhcOj9VOkcOlcOq9VOs9VOxRO{cO|cO}cO!TSO!_9XO!dUO!g9VO!h9VO!i9VO!j9VO!k9VO!n!iO#t!lO#x^O'Z'bO'dQO'mYO'z:kO~O!R9hO!S$]a~O]#qOh$OOj#rOk#qOl#qOq$POs9mOx#xO!T#yO!_:pO!d#vO#V9sO#t$TO$_9oO$a9qO$d$UO'Z&zO'd#sO~O#d'iO~P&-UO!S[X!SdX~P;aO#W9[O~O!]!wO#W9[O~O!{9kO~O#c9aO~O!{9tO!R'sX!S'sX~O!{9kO!R'qX!S'qX~O#W9uO~O'_9wO~P!#rO#W9|O~O#W9}O~O!]!wO#W:OO~O!]!wO#W9uO~O#m:PO~P#)gO#W:QO~O#W:RO~O#W:SO~O#W:TO~O#m:UO~P!#rO#m:VO~P!#rO#x~!b!r!t!u#U#V'z$_$a$d$u%P%Q%R%X%Z%^%_%a%c~UT#x'z#]}'W'X#z'W'Z'e~",
  goto: "#Ed(XPPPPPPPP(YP(jP*^PPPP-uPP.[3n5b5uP5uPPP5uP7c5uP5uP7gPP7lP8Q<cPPPP<gPPPP<g?XPPP?_AjP<gPDTPPPPE{<gPPPPPGt<gPPJuKrPPPPKvM`PMhNiPKr<g<g!#p!&k!+^!+^!.mPPP!.t!1j<gPPPPPPPPPP!4aP!5rPP<g!7PP<gP<g<g<g<gP<g!9dPP!<]P!?Q!?Y!?^!?^P!<YP!?b!?bP!BVP!BZ<g<g!Ba!ET5uP5uP5u5uP!FW5u5u!HO5u!JQ5u!Kr5u5u!L`!NY!NY!N^!NY!NfP!NYP5u# b5u#!l5u5u-uPPP##yPP#$c#$cP#$cP#$x#$cPP#%OP#$uP#$u#%bMd#$u#&P#&V#&Y(Y#&](YP#&d#&d#&dP(YP(YP(YP(YPP(YP#&j#&mP#&m(YPPP(YP(YP(YP(YP(YP(Y(Y#&q#&{#'R#'X#'g#'m#'s#'}#(T#(d#(j#(x#)O#)U#)d#)y#+]#+k#+q#+w#+}#,T#,_#,e#,k#,u#-X#-_PPPPPPPP#-ePP#.X#2VPP#3m#3t#3|PP#8Y#:m#@i#@l#@o#@z#@}PP#AQ#AU#As#Bj#Bn#CSPP#CW#C^#CbP#Ce#Ci#Cl#D[#Dr#Dw#Dz#D}#ET#EW#E[#E`mhOSj}!n$Z%b%e%f%h*m*r/a/dQ$hmQ$opQ%YyS&U!b+[Q&j!jS(j#y(oQ)e$iQ)r$qQ*^%SQ+b&]S+g&c+iQ+y&kQ-e(qQ/O*_Y0S+k+l+m+n+oS2o.s2qU3x0T0V0YU5e2t2u2vS6[3z3}S7S5f5gQ7n6^R8R7U$p[ORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#b#e$Z$m%Z%^%b%d%e%f%h%l%w%y&R&^&e&o&|'Q(Q)S)Z*i*m*r+P+t+{,^,d-n-s-{.V.v/X/Y/Z/]/a/d/f/|0c0m2d2|3a3c3d3t5m5{6V7k8_8t!j'd#]#k&V'v+T+W,i/t1Q2l3m6|9V9X9[9]9^9_9`9a9b9c9d9e9f9g9h9k9t9u9w:O:P:S:T:nQ(z$QQ)j$kQ*`%VQ*g%_Q,T9lQ.Q)_Q.])kQ/W*eQ2Y.WQ3U/PQ4X9mR5Q2ZpeOSjy}!n$Z%X%b%e%f%h*m*r/a/dR*b%Z&WVOSTjkn}!S!W!k!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#]#b#e#k$Z$m%Z%^%_%b%d%e%f%h%l%y&R&^&e&o&|'Q'v(Q)S)Z*i*m*r+P+T+W+t+{,^,d,i-n-s-{.V.v/X/Y/Z/]/a/d/f/t/|0c0m1Q2d2l2|3a3c3d3m3t5m5{6V6|7k8_8t9V9X9[9]9^9_9`9a9b9c9d9e9f9g9h9k9t9u9w:O:P:S:T:m:n[!cRU!]!`%w&VQ$alQ$gmS$lp$qv$vrs!r!u$X$t&_&s&v)v)w)x*k+U+d,O,Q/j0eQ%OwQ&g!iQ&i!jS(^#v(hS)d$h$iQ)h$kQ)u$sQ*X%QQ*]%SS+x&j&kQ-R(_Q.U)eQ.[)kQ.^)lQ.a)pQ.y*YS.}*^*_Q0a+yQ1Z,}Q2X.WQ2].ZQ2b.cQ3T/OQ4d1[Q5P2ZQ5S2_Q6v5OR7x6w!Y$em!j$g$h$i&T&i&j&k(i)d)e+X+f+x+y-_.U/y0P0U0a1p3w3|6Y7l8`Q)]$aQ)}${Q*Q$|Q*[%SQ.e)uQ.x*XU.|*]*^*_Q3O.yS3S.}/OQ5`2nQ5r3TS7Q5a5dS8P7R7TQ8j8QR8y8kW#|a$c(w:kS${t%XQ$|uQ$}vR){$y$V#{a!w!y#d#v#x$R$S$W&f'|(V(X(Y(a(e(u(v)Y)[)_)|*P+u,Z-U-W-p-z-|.j.m.u.w1Y1c1m1t1{2O2S2e2{2}4g4s4{5i5n6{7X8U9j9n9o9p9q9r9s9x9y9z9{9|9}:Q:R:U:V:k:q:rT'}#s(OV({$Q9l9mU&Y!b$u+_Q'T!{Q)o$nQ.n*RQ1u-mR5[2j&^cORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#]#b#e#k$Z$m%Z%^%_%b%d%e%f%h%l%w%y&R&V&^&e&o&|'Q'v(Q)S)Z*i*m*r+P+T+W+t+{,^,d,i-n-s-{.V.v/X/Y/Z/]/a/d/f/t/|0c0m1Q2d2l2|3a3c3d3m3t5m5{6V6|7k8_8t9V9X9[9]9^9_9`9a9b9c9d9e9f9g9h9k9t9u9w:O:P:S:T:n$]#aZ!_!o$_%v%|&x'P'V'W'X'Y'Z'[']'^'_'`'a'c'f'j't)n*}+Y+c+z,Y,`,c,e,s-q/o/r0b0l0p0q0r0s0t0u0v0w0x0y0z0{0|1P1U1y2V3o3r4S4V4W4]4^5^6R6U6b6f6g7h7{8]8r8}9W:dT!XQ!Y&_cORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#]#b#e#k$Z$m%Z%^%_%b%d%e%f%h%l%w%y&R&V&^&e&o&|'Q'v(Q)S)Z*i*m*r+P+T+W+t+{,^,d,i-n-s-{.V.v/X/Y/Z/]/a/d/f/t/|0c0m1Q2d2l2|3a3c3d3m3t5m5{6V6|7k8_8t9V9X9[9]9^9_9`9a9b9c9d9e9f9g9h9k9t9u9w:O:P:S:T:nQ&W!bR/u+[Y&Q!b&U&]+[+bS(i#y(oS+f&c+iS-_(j(qQ-`(kQ-f(rQ.p*TU0P+g+k+lU0U+m+n+oS0Z+p2sQ1p-eQ1r-gQ1s-hS2n.s2qU3w0S0T0VQ3{0WQ3|0YS5a2o2vS5d2t2uU6Y3x3z3}Q6_4OS7R5e5fQ7T5gS7l6[6^S8Q7S7UQ8`7nR8k8RlhOSj}!n$Z%b%e%f%h*m*r/a/dQ%j!QS&w!v9[Q)b$fQ*V%OQ*W%PQ+v&hS,X&|9uS-r)S:OQ.S)cQ.r*UQ/h*tQ/i*uQ/q+VQ0X+mQ0_+wS1z-s:SQ2T.TS2W.V:TQ3n/sQ3q/zQ4Q0`Q4}2UQ6P3kQ6S3pQ6W3vQ6`4RQ7f6QQ7i6XQ8[7jQ8o8YQ8q8^R8|8s$W#`Z!_!o%v%|&x'P'V'W'X'Y'Z'[']'^'_'`'a'c'f'j't)n*}+Y+c+z,Y,`,c,s-q/o/r0b0l0p0q0r0s0t0u0v0w0x0y0z0{0|1P1U1y2V3o3r4S4V4W4]4^5^6R6U6b6f6g7h7{8]8r8}9W:dU(t#z&{1OT)W$_,e$W#_Z!_!o%v%|&x'P'V'W'X'Y'Z'[']'^'_'`'a'c'f'j't)n*}+Y+c+z,Y,`,c,s-q/o/r0b0l0p0q0r0s0t0u0v0w0x0y0z0{0|1P1U1y2V3o3r4S4V4W4]4^5^6R6U6b6f6g7h7{8]8r8}9W:dQ'e#`S)V$_,eR-t)W&^cORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#]#b#e#k$Z$m%Z%^%_%b%d%e%f%h%l%w%y&R&V&^&e&o&|'Q'v(Q)S)Z*i*m*r+P+T+W+t+{,^,d,i-n-s-{.V.v/X/Y/Z/]/a/d/f/t/|0c0m1Q2d2l2|3a3c3d3m3t5m5{6V6|7k8_8t9V9X9[9]9^9_9`9a9b9c9d9e9f9g9h9k9t9u9w:O:P:S:T:nQ%e{Q%f|Q%h!OQ%i!PR/`*pQ&d!iQ)X$aQ+s&gS-y)])uS0[+q+rW1}-v-w-x.eS4P0]0^U4z2P2Q2RU6t4y5W5XQ7w6uR8f7zT+h&c+iS+f&c+iU0P+g+k+lU0U+m+n+oS0Z+p2sS2n.s2qU3w0S0T0VQ3{0WQ3|0YS5a2o2vS5d2t2uU6Y3x3z3}Q6_4OS7R5e5fQ7T5gS7l6[6^S8Q7S7UQ8`7nR8k8RS+h&c+iT2p.s2qS&q!q/^Q-Q(^Q-](iS0O+f2nQ1`-RS1j-^-fU3y0U0Z5dQ4c1ZS4q1q1sU6]3{3|7TQ6j4dQ6s4tR7o6_Q!xXS&p!q/^Q)T$YQ)`$dQ)f$jQ+|&qQ-P(^Q-[(iQ-a(lQ.R)aQ.z*ZS/}+f2nS1_-Q-RS1i-]-fQ1l-`Q1o-bQ3Q.{W3u0O0U0Z5dQ4b1ZQ4f1`S4k1j1sQ4r1rQ5p3RW6Z3y3{3|7TS6i4c4dQ6n4mQ6q4qQ7O5_Q7]5qS7m6]6_Q7q6jQ7s6oQ7v6sQ7}7PQ8W7^Q8a7oQ8d7uQ8h8OQ8w8iQ9P8xQ9T9QQ:^:XQ:g:bR:h:c$rWORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#b#e$Z$m%Z%^%_%b%d%e%f%h%l%w%y&R&^&e&o&|'Q(Q)S)Z*i*m*r+P+t+{,^,d-n-s-{.V.v/X/Y/Z/]/a/d/f/|0c0m2d2|3a3c3d3t5m5{6V7k8_8tS!xn!k!j:W#]#k&V'v+T+W,i/t1Q2l3m6|9V9X9[9]9^9_9`9a9b9c9d9e9f9g9h9k9t9u9w:O:P:S:T:nR:^:m$rXORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#b#e$Z$m%Z%^%_%b%d%e%f%h%l%w%y&R&^&e&o&|'Q(Q)S)Z*i*m*r+P+t+{,^,d-n-s-{.V.v/X/Y/Z/]/a/d/f/|0c0m2d2|3a3c3d3t5m5{6V7k8_8tQ$Yb!Y$dm!j$g$h$i&T&i&j&k(i)d)e+X+f+x+y-_.U/y0P0U0a1p3w3|6Y7l8`S$jn!kQ)a$eQ*Z%SW.{*[*]*^*_U3R.|.}/OQ5_2nS5q3S3TU7P5`5a5dQ7^5rU8O7Q7R7TS8i8P8QS8x8j8kQ9Q8y!j:X#]#k&V'v+T+W,i/t1Q2l3m6|9V9X9[9]9^9_9`9a9b9c9d9e9f9g9h9k9t9u9w:O:P:S:T:nQ:b:lR:c:m$f]OSTjk}!S!W!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#b#e$Z$m%Z%^%b%d%e%f%h%l%y&R&^&e&o&|'Q(Q)S)Z*i*m*r+P+t+{,^,d-n-s-{.V.v/X/Y/Z/]/a/d/f/|0c0m2d2|3a3c3d3t5m5{6V7k8_8tY!hRU!]!`%wv$vrs!r!u$X$t&_&s&v)v)w)x*k+U+d,O,Q/j0eQ*h%_!h:Y#]#k'v+T+W,i/t1Q2l3m6|9V9X9[9]9^9_9`9a9b9c9d9e9f9g9h9k9t9u9w:O:P:S:T:nR:]&VS&Z!b$uR/w+_$p[ORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#b#e$Z$m%Z%^%b%d%e%f%h%l%w%y&R&^&e&o&|'Q(Q)S)Z*i*m*r+P+t+{,^,d-n-s-{.V.v/X/Y/Z/]/a/d/f/|0c0m2d2|3a3c3d3t5m5{6V7k8_8t!j'd#]#k&V'v+T+W,i/t1Q2l3m6|9V9X9[9]9^9_9`9a9b9c9d9e9f9g9h9k9t9u9w:O:P:S:T:nR*g%_$roORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#b#e$Z$m%Z%^%_%b%d%e%f%h%l%w%y&R&^&e&o&|'Q(Q)S)Z*i*m*r+P+t+{,^,d-n-s-{.V.v/X/Y/Z/]/a/d/f/|0c0m2d2|3a3c3d3t5m5{6V7k8_8tQ'T!{!k:Z#]#k&V'v+T+W,i/t1Q2l3m6|9V9X9[9]9^9_9`9a9b9c9d9e9f9g9h9k9t9u9w:O:P:S:T:n!h#VZ!_$_%v%|&x'P'^'_'`'a'f'j)n*}+c+z,Y,`,s-q0b0l0|1y2V3r4S4V6U7h8]8r8}9W!R9c'c't+Y,e/o/r0p0x0y0z0{1P1U3o4W4]4^5^6R6b6f6g7{:d!d#XZ!_$_%v%|&x'P'`'a'f'j)n*}+c+z,Y,`,s-q0b0l0|1y2V3r4S4V6U7h8]8r8}9W}9e'c't+Y,e/o/r0p0z0{1P1U3o4W4]4^5^6R6b6f6g7{:d!`#]Z!_$_%v%|&x'P'f'j)n*}+c+z,Y,`,s-q0b0l0|1y2V3r4S4V6U7h8]8r8}9Wl(Y#t&})R,{-T-i-j0j1x4a4u:_:i:jx:n'c't+Y,e/o/r0p1P1U3o4W4]4^5^6R6b6f6g7{:d!`:q&y'h(](c+r,W,p-X-u-x.i.k0^0i1a1e2R2g2i2y4U4h4n4w4|5X5l6a6l6r7ZZ:r0}4[6c7p8b&^cORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#]#b#e#k$Z$m%Z%^%_%b%d%e%f%h%l%w%y&R&V&^&e&o&|'Q'v(Q)S)Z*i*m*r+P+T+W+t+{,^,d,i-n-s-{.V.v/X/Y/Z/]/a/d/f/t/|0c0m1Q2d2l2|3a3c3d3m3t5m5{6V6|7k8_8t9V9X9[9]9^9_9`9a9b9c9d9e9f9g9h9k9t9u9w:O:P:S:T:nS#l`#mR1R,h&e_ORSTU`jk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#]#b#e#k#m$Z$m%Z%^%_%b%d%e%f%h%l%w%y&R&V&^&e&o&|'Q'v(Q)S)Z*i*m*r+P+T+W+t+{,^,d,h,i-n-s-{.V.v/X/Y/Z/]/a/d/f/t/|0c0m1Q2d2l2|3a3c3d3m3t5m5{6V6|7k8_8t9V9X9[9]9^9_9`9a9b9c9d9e9f9g9h9k9t9u9w:O:P:S:T:nS#g^#nT'm#i'qT#h^#nT'o#i'q&e`ORSTU`jk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#]#b#e#k#m$Z$m%Z%^%_%b%d%e%f%h%l%w%y&R&V&^&e&o&|'Q'v(Q)S)Z*i*m*r+P+T+W+t+{,^,d,h,i-n-s-{.V.v/X/Y/Z/]/a/d/f/t/|0c0m1Q2d2l2|3a3c3d3m3t5m5{6V6|7k8_8t9V9X9[9]9^9_9`9a9b9c9d9e9f9g9h9k9t9u9w:O:P:S:T:nT#l`#mQ#o`R'x#m$rbORSTUjk}!S!W!]!`!n!v!z!|#P#Q#R#S#T#U#V#W#X#Y#Z#b#e$Z$m%Z%^%_%b%d%e%f%h%l%w%y&R&^&e&o&|'Q(Q)S)Z*i*m*r+P+t+{,^,d-n-s-{.V.v/X/Y/Z/]/a/d/f/|0c0m2d2|3a3c3d3t5m5{6V7k8_8t!k:l#]#k&V'v+T+W,i/t1Q2l3m6|9V9X9[9]9^9_9`9a9b9c9d9e9f9g9h9k9t9u9w:O:P:S:T:n#RdOSUj}!S!W!n!|#k$Z%Z%^%_%b%d%e%f%h%l&R&e'v)Z*i*m*r+t,i-n-{.v/X/Y/Z/]/a/d/f1Q2d2|3a3c3d5m5{t#za!y$R$S$W(V(X(Y(a(u(v,Z-p1Y1t:k:q:r!|&{!w#d#v#x&f'|(e)Y)[)_)|*P+u-U-W-z-|.j.m.u.w1c1m1{2O2S2e2{2}4g4s4{5i5n6{7X8U9n9p9r9x9z9|:Q:UQ)P$UQ,t(Rc1O9j9o9q9s9y9{9}:R:Vt#wa!y$R$S$W(V(X(Y(a(u(v,Z-p1Y1t:k:q:rS(l#y(oQ)Q$VQ-b(m!|:`!w#d#v#x&f'|(e)Y)[)_)|*P+u-U-W-z-|.j.m.u.w1c1m1{2O2S2e2{2}4g4s4{5i5n6{7X8U9n9p9r9x9z9|:Q:Ub:a9j9o9q9s9y9{9}:R:VQ:e:oR:f:pt#za!y$R$S$W(V(X(Y(a(u(v,Z-p1Y1t:k:q:r!|&{!w#d#v#x&f'|(e)Y)[)_)|*P+u-U-W-z-|.j.m.u.w1c1m1{2O2S2e2{2}4g4s4{5i5n6{7X8U9n9p9r9x9z9|:Q:Uc1O9j9o9q9s9y9{9}:R:VlfOSj}!n$Z%b%e%f%h*m*r/a/dQ(d#xQ*y%oQ*z%qR1b-U$U#{a!w!y#d#v#x$R$S$W&f'|(V(X(Y(a(e(u(v)Y)[)_)|*P+u,Z-U-W-p-z-|.j.m.u.w1Y1c1m1t1{2O2S2e2{2}4g4s4{5i5n6{7X8U9j9n9o9p9q9r9s9x9y9z9{9|9}:Q:R:U:V:k:q:rQ*O$|Q.l*QQ2h.kR5Z2iT(n#y(oS(n#y(oT2p.s2qQ)`$dQ-a(lQ.R)aQ.z*ZQ3Q.{Q5p3RQ7O5_Q7]5qQ7}7PQ8W7^Q8h8OQ8w8iQ9P8xR9T9Ql(V#t&})R,{-T-i-j0j1x4a4u:_:i:j!`9x&y'h(](c+r,W,p-X-u-x.i.k0^0i1a1e2R2g2i2y4U4h4n4w4|5X5l6a6l6r7ZZ9y0}4[6c7p8bn(X#t&})R,y,{-T-i-j0j1x4a4u:_:i:j!b9z&y'h(](c+r,W,p-X-u-x.i.k0^0g0i1a1e2R2g2i2y4U4h4n4w4|5X5l6a6l6r7Z]9{0}4[6c6d7p8bpeOSjy}!n$Z%X%b%e%f%h*m*r/a/dQ%UxR*i%_peOSjy}!n$Z%X%b%e%f%h*m*r/a/dR%UxQ*S$}R.h){qeOSjy}!n$Z%X%b%e%f%h*m*r/a/dQ.t*XS2z.x.yW5h2w2x2y3OU7W5j5k5lU8S7V7Y7ZQ8l8TR8z8mQ%]yR*c%XR3X/RR7`5sS$lp$qR.^)lQ%bzR*m%cR*s%iT/b*r/dQjOQ!nST$^j!nQ(O#sR,q(OQ!YQR%t!YQ!^RU%z!^%{+QQ%{!_R+Q%|Q+]&WR/v+]Q,[&}R0k,[Q,_'PS0n,_0oR0o,`Q+i&cR0Q+iS!eR$tU&`!e&a+RQ&a!fR+R%}Q+`&ZR/x+`Q&t!sQ+}&rU,R&t+}0fR0f,SQ'q#iR,j'qQ#m`R'w#mQ#cZU'g#c*|9iQ*|9WR9i'tQ-O(^W1]-O1^4e6kU1^-P-Q-RS4e1_1`R6k4f#q(T#t&y&}'h(](c(|(})R+r,U,V,W,p,y,z,{-T-X-i-j-u-x.i.k0^0g0h0i0j0}1a1e1x2R2g2i2y4U4Y4Z4[4a4h4n4u4w4|5X5l6a6c6d6e6l6r7Z7p8b:_:i:jQ-V(cU1d-V1f4iQ1f-XR4i1eQ(o#yR-c(oQ(x#}R-l(xQ1|-uR4x1|Q)y$wR.g)yQ2k.nS5]2k6}R6}5^Q*U%OR.q*UQ2q.sR5b2qQ/Q*`S3V/Q5tR5t3XQ.X)hW2[.X2^5R6xQ2^.[Q5R2]R6x5SQ)m$lR._)mQ/d*rR3g/dWiOSj!nQ%g}Q)U$ZQ*l%bQ*n%eQ*o%fQ*q%hQ/_*mS/b*r/dR3f/aQ$]gQ%k!RQ%n!TQ%p!UQ%r!VQ)t$rQ)z$xQ*b%]Q*w%mS/T*c*fQ/k*vQ/l*yQ/m*zS/{+f2nQ1g-ZQ1h-[Q1n-aQ2a.bQ2f.iQ3P.zQ3Z/VQ3e/`Y3s/}0O0U0Z5dQ4j1iQ4l1kQ4o1oQ5V2cQ5Y2gQ5o3QQ5u3Y[6T3r3u3y3{3|7TQ6m4kQ6p4pQ6y5TQ7[5pQ7a5vW7g6U6Z6]6_Q7r6nQ7t6qQ7y6zQ7|7OQ8V7]U8Z7h7m7oQ8c7sQ8e7vQ8g7}Q8n8WS8p8]8aQ8u8dQ8v8hQ8{8rQ9O8wQ9R8}Q9S9PR9U9TQ$fmQ&h!jU)c$g$h$iQ+V&TU+w&i&j&kQ-Z(iS.T)d)eQ/s+XQ/z+fS0`+x+yQ1k-_Q2U.UQ3p/yS3v0P0UQ4R0aQ4p1pS6X3w3|Q7j6YQ8^7lR8s8`S#ua:kR)^$cU#}a$c:kR-k(wQ#taS&y!w)_Q&}!yQ'h#dQ(]#vQ(c#xQ(|$RQ(}$SQ)R$WQ+r&fQ,U9nQ,V9pQ,W9rQ,p'|Q,y(VQ,z(XQ,{(YQ-T(aQ-X(eQ-i(uQ-j(vd-u)Y-z.u2O2{4{5i6{7X8UQ-x)[Q.i)|Q.k*PQ0^+uQ0g9xQ0h9zQ0i9|Q0j,ZQ0}9jQ1a-UQ1e-WQ1x-pQ2R-|Q2g.jQ2i.mQ2y.wQ4U:QQ4Y9oQ4Z9qQ4[9sQ4a1YQ4h1cQ4n1mQ4u1tQ4w1{Q4|2SQ5X2eQ5l2}Q6a:UQ6c9}Q6d9yQ6e9{Q6l4gQ6r4sQ7Z5nQ7p:RQ8b:VQ:_:kQ:i:qR:j:rlgOSj}!n$Z%b%e%f%h*m*r/a/dS!pU%dQ%m!SQ%s!WQ'U!|Q'u#kS*f%Z%^Q*j%_Q*v%lQ+S&RQ+q&eQ,n'vQ-w)ZQ/[*iQ0]+tQ1T,iQ1v-nQ2Q-{Q2x.vQ3]/XQ3^/YQ3`/ZQ3b/]Q3i/fQ4_1QQ5W2dQ5k2|Q5z3aQ5|3cQ5}3dQ7Y5mR7c5{!vZOSUj}!S!n!|$Z%Z%^%_%b%d%e%f%h%l&R&e)Z*i*m*r+t-n-{.v/X/Y/Z/]/a/d/f2d2|3a3c3d5m5{Q!_RQ!oTQ$_kS%v!]%yQ%|!`Q&x!vQ'P!zQ'V#PQ'W#QQ'X#RQ'Y#SQ'Z#TQ'[#UQ']#VQ'^#WQ'_#XQ'`#YQ'a#ZQ'c#]Q'f#bQ'j#eW't#k'v,i1QQ)n$mS*}%w+PS+Y&V/tQ+c&^Q+z&oQ,Y&|Q,`'QQ,c9VQ,e9XQ,s(QQ-q)SQ/o+TQ/r+WQ0b+{Q0l,^Q0p9[Q0q9]Q0r9^Q0s9_Q0t9`Q0u9aQ0v9bQ0w9cQ0x9dQ0y9eQ0z9fQ0{9gQ0|,dQ1P9kQ1U9hQ1y-sQ2V.VQ3o9tQ3r/|Q4S0cQ4V0mQ4W9uQ4]9wQ4^:OQ5^2lQ6R3mQ6U3tQ6b:PQ6f:SQ6g:TQ7h6VQ7{6|Q8]7kQ8r8_Q8}8tQ9W!WR:d:nR!aRR&X!bS&T!b+[S+X&U&]R/y+bR'O!yR'R!zT!tU$XS!sU$XU$wrs*kS&r!r!uQ,P&sQ,S&vQ.f)xS0d,O,QR4T0e`!dR!]!`$t%w&_)v+dh!qUrs!r!u$X&s&v)x,O,Q0eQ/^*kQ/p+UQ3l/jT:[&V)wT!gR$tS!fR$tS%x!]&_S%}!`)vS+O%w+dT+Z&V)wT&[!b$uQ#i^R'z#nT'p#i'qR1S,hT(`#v(hR(f#xQ-v)YQ2P-zQ2w.uQ4y2OQ5j2{Q6u4{Q7V5iQ7z6{Q8T7XR8m8UlhOSj}!n$Z%b%e%f%h*m*r/a/dQ%[yR*b%XV$xrs*kR.o*RR*a%VQ$ppR)s$qR)i$kT%`z%cT%az%cT/c*r/d",
  nodeNames: "⚠ ArithOp ArithOp InterpolationStart extends LineComment BlockComment Script ExportDeclaration export Star as VariableName String from ; default FunctionDeclaration async function VariableDefinition TypeParamList TypeDefinition ThisType this LiteralType ArithOp Number BooleanLiteral TemplateType InterpolationEnd Interpolation VoidType void TypeofType typeof MemberExpression . ?. PropertyName [ TemplateString Interpolation null super RegExp ] ArrayExpression Spread , } { ObjectExpression Property async get set PropertyDefinition Block : NewExpression new TypeArgList CompareOp < ) ( ArgList UnaryExpression await yield delete LogicOp BitOp ParenthesizedExpression ClassExpression class extends ClassBody MethodDeclaration Privacy static abstract override PrivatePropertyDefinition PropertyDeclaration readonly Optional TypeAnnotation Equals StaticBlock FunctionExpression ArrowFunction ParamList ParamList ArrayPattern ObjectPattern PatternProperty Privacy readonly Arrow MemberExpression PrivatePropertyName BinaryExpression ArithOp ArithOp ArithOp ArithOp BitOp CompareOp instanceof in const CompareOp BitOp BitOp BitOp LogicOp LogicOp ConditionalExpression LogicOp LogicOp AssignmentExpression UpdateOp PostfixExpression CallExpression TaggedTemplateExpression DynamicImport import ImportMeta JSXElement JSXSelfCloseEndTag JSXStartTag JSXSelfClosingTag JSXIdentifier JSXNamespacedName JSXMemberExpression JSXSpreadAttribute JSXAttribute JSXAttributeValue JSXEscape JSXEndTag JSXOpenTag JSXFragmentTag JSXText JSXEscape JSXStartCloseTag JSXCloseTag PrefixCast ArrowFunction TypeParamList SequenceExpression KeyofType keyof UniqueType unique ImportType InferredType infer TypeName ParenthesizedType FunctionSignature ParamList NewSignature IndexedType TupleType Label ArrayType ReadonlyType ObjectType MethodType PropertyType IndexSignature CallSignature TypePredicate is NewSignature new UnionType LogicOp IntersectionType LogicOp ConditionalType ParameterizedType ClassDeclaration abstract implements type VariableDeclaration let var TypeAliasDeclaration InterfaceDeclaration interface EnumDeclaration enum EnumBody NamespaceDeclaration namespace module AmbientDeclaration declare GlobalDeclaration global ClassDeclaration ClassBody MethodDeclaration AmbientFunctionDeclaration ExportGroup VariableName VariableName ImportDeclaration ImportGroup ForStatement for ForSpec ForInSpec ForOfSpec of WhileStatement while WithStatement with DoStatement do IfStatement if else SwitchStatement switch SwitchBody CaseLabel case DefaultLabel TryStatement try catch finally ReturnStatement return ThrowStatement throw BreakStatement break ContinueStatement continue DebuggerStatement debugger LabeledStatement ExpressionStatement",
  maxTerm: 330,
  context: Jy,
  nodeProps: [
    [M.closedBy, 3, "InterpolationEnd", 40, "]", 51, "}", 66, ")", 132, "JSXSelfCloseEndTag JSXEndTag", 146, "JSXEndTag"],
    [M.group, -26, 8, 15, 17, 58, 184, 188, 191, 192, 194, 197, 200, 211, 213, 219, 221, 223, 225, 228, 234, 238, 240, 242, 244, 246, 248, 249, "Statement", -30, 12, 13, 24, 27, 28, 41, 43, 44, 45, 47, 52, 60, 68, 74, 75, 91, 92, 101, 103, 119, 122, 124, 125, 126, 127, 129, 130, 148, 149, 151, "Expression", -22, 23, 25, 29, 32, 34, 152, 154, 156, 157, 159, 160, 161, 163, 164, 165, 167, 168, 169, 178, 180, 182, 183, "Type", -3, 79, 85, 90, "ClassItem"],
    [M.openedBy, 30, "InterpolationStart", 46, "[", 50, "{", 65, "(", 131, "JSXStartTag", 141, "JSXStartTag JSXStartCloseTag"]
  ],
  skippedNodes: [0, 5, 6],
  repeatNodeCount: 28,
  tokenData: "!C}~R!`OX%TXY%cYZ'RZ[%c[]%T]^'R^p%Tpq%cqr'crs(kst0htu2`uv4pvw5ewx6cxy<yyz=Zz{=k{|>k|}?O}!O>k!O!P?`!P!QCl!Q!R!0[!R![!1q![!]!7s!]!^!8V!^!_!8g!_!`!9d!`!a!:[!a!b!<R!b!c%T!c!}2`!}#O!=d#O#P%T#P#Q!=t#Q#R!>U#R#S2`#S#T!>i#T#o2`#o#p!>y#p#q!?O#q#r!?f#r#s!?x#s$f%T$f$g%c$g#BY2`#BY#BZ!@Y#BZ$IS2`$IS$I_!@Y$I_$I|2`$I|$I}!Bq$I}$JO!Bq$JO$JT2`$JT$JU!@Y$JU$KV2`$KV$KW!@Y$KW&FU2`&FU&FV!@Y&FV?HT2`?HT?HU!@Y?HU~2`W%YR$UWO!^%T!_#o%T#p~%T,T%jg$UW'W+{OX%TXY%cYZ%TZ[%c[p%Tpq%cq!^%T!_#o%T#p$f%T$f$g%c$g#BY%T#BY#BZ%c#BZ$IS%T$IS$I_%c$I_$JT%T$JT$JU%c$JU$KV%T$KV$KW%c$KW&FU%T&FU&FV%c&FV?HT%T?HT?HU%c?HU~%T,T'YR$UW'X+{O!^%T!_#o%T#p~%T$T'jS$UW!j#{O!^%T!_!`'v!`#o%T#p~%T$O'}S#e#v$UWO!^%T!_!`(Z!`#o%T#p~%T$O(bR#e#v$UWO!^%T!_#o%T#p~%T'u(rZ$UW]!ROY(kYZ)eZr(krs*rs!^(k!^!_+U!_#O(k#O#P-b#P#o(k#o#p+U#p~(k&r)jV$UWOr)ers*Ps!^)e!^!_*a!_#o)e#o#p*a#p~)e&r*WR$P&j$UWO!^%T!_#o%T#p~%T&j*dROr*ars*ms~*a&j*rO$P&j'u*{R$P&j$UW]!RO!^%T!_#o%T#p~%T'm+ZV]!ROY+UYZ*aZr+Urs+ps#O+U#O#P+w#P~+U'm+wO$P&j]!R'm+zROr+Urs,Ts~+U'm,[U$P&j]!ROY,nZr,nrs-Vs#O,n#O#P-[#P~,n!R,sU]!ROY,nZr,nrs-Vs#O,n#O#P-[#P~,n!R-[O]!R!R-_PO~,n'u-gV$UWOr(krs-|s!^(k!^!_+U!_#o(k#o#p+U#p~(k'u.VZ$P&j$UW]!ROY.xYZ%TZr.xrs/rs!^.x!^!_,n!_#O.x#O#P0S#P#o.x#o#p,n#p~.x!Z/PZ$UW]!ROY.xYZ%TZr.xrs/rs!^.x!^!_,n!_#O.x#O#P0S#P#o.x#o#p,n#p~.x!Z/yR$UW]!RO!^%T!_#o%T#p~%T!Z0XT$UWO!^.x!^!_,n!_#o.x#o#p,n#p~.xy0mZ$UWOt%Ttu1`u!^%T!_!c%T!c!}1`!}#R%T#R#S1`#S#T%T#T#o1`#p$g%T$g~1`y1g]$UW'mqOt%Ttu1`u!Q%T!Q![1`![!^%T!_!c%T!c!}1`!}#R%T#R#S1`#S#T%T#T#o1`#p$g%T$g~1`&i2k_$UW#zS'Z%k'epOt%Ttu2`u}%T}!O3j!O!Q%T!Q![2`![!^%T!_!c%T!c!}2`!}#R%T#R#S2`#S#T%T#T#o2`#p$g%T$g~2`[3q_$UW#zSOt%Ttu3ju}%T}!O3j!O!Q%T!Q![3j![!^%T!_!c%T!c!}3j!}#R%T#R#S3j#S#T%T#T#o3j#p$g%T$g~3j$O4wS#^#v$UWO!^%T!_!`5T!`#o%T#p~%T$O5[R$UW#o#vO!^%T!_#o%T#p~%T%r5lU'v%j$UWOv%Tvw6Ow!^%T!_!`5T!`#o%T#p~%T$O6VS$UW#i#vO!^%T!_!`5T!`#o%T#p~%T'u6jZ$UW]!ROY6cYZ7]Zw6cwx*rx!^6c!^!_8T!_#O6c#O#P:T#P#o6c#o#p8T#p~6c&r7bV$UWOw7]wx*Px!^7]!^!_7w!_#o7]#o#p7w#p~7]&j7zROw7wwx*mx~7w'm8YV]!ROY8TYZ7wZw8Twx+px#O8T#O#P8o#P~8T'm8rROw8Twx8{x~8T'm9SU$P&j]!ROY9fZw9fwx-Vx#O9f#O#P9}#P~9f!R9kU]!ROY9fZw9fwx-Vx#O9f#O#P9}#P~9f!R:QPO~9f'u:YV$UWOw6cwx:ox!^6c!^!_8T!_#o6c#o#p8T#p~6c'u:xZ$P&j$UW]!ROY;kYZ%TZw;kwx/rx!^;k!^!_9f!_#O;k#O#P<e#P#o;k#o#p9f#p~;k!Z;rZ$UW]!ROY;kYZ%TZw;kwx/rx!^;k!^!_9f!_#O;k#O#P<e#P#o;k#o#p9f#p~;k!Z<jT$UWO!^;k!^!_9f!_#o;k#o#p9f#p~;k%V=QR!d$}$UWO!^%T!_#o%T#p~%TZ=bR!cR$UWO!^%T!_#o%T#p~%T%R=tU'[!R#_#v$UWOz%Tz{>W{!^%T!_!`5T!`#o%T#p~%T$O>_S#[#v$UWO!^%T!_!`5T!`#o%T#p~%T$u>rSj$m$UWO!^%T!_!`5T!`#o%T#p~%T&i?VR!R&a$UWO!^%T!_#o%T#p~%T&i?gVu%n$UWO!O%T!O!P?|!P!Q%T!Q![@r![!^%T!_#o%T#p~%Ty@RT$UWO!O%T!O!P@b!P!^%T!_#o%T#p~%Ty@iR!Qq$UWO!^%T!_#o%T#p~%Ty@yZ$UWkqO!Q%T!Q![@r![!^%T!_!g%T!g!hAl!h#R%T#R#S@r#S#X%T#X#YAl#Y#o%T#p~%TyAqZ$UWO{%T{|Bd|}%T}!OBd!O!Q%T!Q![CO![!^%T!_#R%T#R#SCO#S#o%T#p~%TyBiV$UWO!Q%T!Q![CO![!^%T!_#R%T#R#SCO#S#o%T#p~%TyCVV$UWkqO!Q%T!Q![CO![!^%T!_#R%T#R#SCO#S#o%T#p~%T,TCs`$UW#]#vOYDuYZ%TZzDuz{Jl{!PDu!P!Q!-e!Q!^Du!^!_Fx!_!`!.^!`!a!/]!a!}Du!}#OHq#O#PJQ#P#oDu#o#pFx#p~DuXD|[$UW}POYDuYZ%TZ!PDu!P!QEr!Q!^Du!^!_Fx!_!}Du!}#OHq#O#PJQ#P#oDu#o#pFx#p~DuXEy_$UW}PO!^%T!_#Z%T#Z#[Er#[#]%T#]#^Er#^#a%T#a#bEr#b#g%T#g#hEr#h#i%T#i#jEr#j#m%T#m#nEr#n#o%T#p~%TPF}V}POYFxZ!PFx!P!QGd!Q!}Fx!}#OG{#O#PHh#P~FxPGiU}P#Z#[Gd#]#^Gd#a#bGd#g#hGd#i#jGd#m#nGdPHOTOYG{Z#OG{#O#PH_#P#QFx#Q~G{PHbQOYG{Z~G{PHkQOYFxZ~FxXHvY$UWOYHqYZ%TZ!^Hq!^!_G{!_#OHq#O#PIf#P#QDu#Q#oHq#o#pG{#p~HqXIkV$UWOYHqYZ%TZ!^Hq!^!_G{!_#oHq#o#pG{#p~HqXJVV$UWOYDuYZ%TZ!^Du!^!_Fx!_#oDu#o#pFx#p~Du,TJs^$UW}POYJlYZKoZzJlz{NQ{!PJl!P!Q!,R!Q!^Jl!^!_!!]!_!}Jl!}#O!'|#O#P!+a#P#oJl#o#p!!]#p~Jl,TKtV$UWOzKoz{LZ{!^Ko!^!_M]!_#oKo#o#pM]#p~Ko,TL`X$UWOzKoz{LZ{!PKo!P!QL{!Q!^Ko!^!_M]!_#oKo#o#pM]#p~Ko,TMSR$UWU+{O!^%T!_#o%T#p~%T+{M`ROzM]z{Mi{~M]+{MlTOzM]z{Mi{!PM]!P!QM{!Q~M]+{NQOU+{,TNX^$UW}POYJlYZKoZzJlz{NQ{!PJl!P!Q! T!Q!^Jl!^!_!!]!_!}Jl!}#O!'|#O#P!+a#P#oJl#o#p!!]#p~Jl,T! ^_$UWU+{}PO!^%T!_#Z%T#Z#[Er#[#]%T#]#^Er#^#a%T#a#bEr#b#g%T#g#hEr#h#i%T#i#jEr#j#m%T#m#nEr#n#o%T#p~%T+{!!bY}POY!!]YZM]Zz!!]z{!#Q{!P!!]!P!Q!&x!Q!}!!]!}#O!$`#O#P!&f#P~!!]+{!#VY}POY!!]YZM]Zz!!]z{!#Q{!P!!]!P!Q!#u!Q!}!!]!}#O!$`#O#P!&f#P~!!]+{!#|UU+{}P#Z#[Gd#]#^Gd#a#bGd#g#hGd#i#jGd#m#nGd+{!$cWOY!$`YZM]Zz!$`z{!${{#O!$`#O#P!&S#P#Q!!]#Q~!$`+{!%OYOY!$`YZM]Zz!$`z{!${{!P!$`!P!Q!%n!Q#O!$`#O#P!&S#P#Q!!]#Q~!$`+{!%sTU+{OYG{Z#OG{#O#PH_#P#QFx#Q~G{+{!&VTOY!$`YZM]Zz!$`z{!${{~!$`+{!&iTOY!!]YZM]Zz!!]z{!#Q{~!!]+{!&}_}POzM]z{Mi{#ZM]#Z#[!&x#[#]M]#]#^!&x#^#aM]#a#b!&x#b#gM]#g#h!&x#h#iM]#i#j!&x#j#mM]#m#n!&x#n~M],T!(R[$UWOY!'|YZKoZz!'|z{!(w{!^!'|!^!_!$`!_#O!'|#O#P!*o#P#QJl#Q#o!'|#o#p!$`#p~!'|,T!(|^$UWOY!'|YZKoZz!'|z{!(w{!P!'|!P!Q!)x!Q!^!'|!^!_!$`!_#O!'|#O#P!*o#P#QJl#Q#o!'|#o#p!$`#p~!'|,T!*PY$UWU+{OYHqYZ%TZ!^Hq!^!_G{!_#OHq#O#PIf#P#QDu#Q#oHq#o#pG{#p~Hq,T!*tX$UWOY!'|YZKoZz!'|z{!(w{!^!'|!^!_!$`!_#o!'|#o#p!$`#p~!'|,T!+fX$UWOYJlYZKoZzJlz{NQ{!^Jl!^!_!!]!_#oJl#o#p!!]#p~Jl,T!,Yc$UW}POzKoz{LZ{!^Ko!^!_M]!_#ZKo#Z#[!,R#[#]Ko#]#^!,R#^#aKo#a#b!,R#b#gKo#g#h!,R#h#iKo#i#j!,R#j#mKo#m#n!,R#n#oKo#o#pM]#p~Ko,T!-lV$UWT+{OY!-eYZ%TZ!^!-e!^!_!.R!_#o!-e#o#p!.R#p~!-e+{!.WQT+{OY!.RZ~!.R$P!.g[$UW#o#v}POYDuYZ%TZ!PDu!P!QEr!Q!^Du!^!_Fx!_!}Du!}#OHq#O#PJQ#P#oDu#o#pFx#p~Du]!/f[#wS$UW}POYDuYZ%TZ!PDu!P!QEr!Q!^Du!^!_Fx!_!}Du!}#OHq#O#PJQ#P#oDu#o#pFx#p~Duy!0cd$UWkqO!O%T!O!P@r!P!Q%T!Q![!1q![!^%T!_!g%T!g!hAl!h#R%T#R#S!1q#S#U%T#U#V!3X#V#X%T#X#YAl#Y#b%T#b#c!2w#c#d!4m#d#l%T#l#m!5{#m#o%T#p~%Ty!1x_$UWkqO!O%T!O!P@r!P!Q%T!Q![!1q![!^%T!_!g%T!g!hAl!h#R%T#R#S!1q#S#X%T#X#YAl#Y#b%T#b#c!2w#c#o%T#p~%Ty!3OR$UWkqO!^%T!_#o%T#p~%Ty!3^W$UWO!Q%T!Q!R!3v!R!S!3v!S!^%T!_#R%T#R#S!3v#S#o%T#p~%Ty!3}Y$UWkqO!Q%T!Q!R!3v!R!S!3v!S!^%T!_#R%T#R#S!3v#S#b%T#b#c!2w#c#o%T#p~%Ty!4rV$UWO!Q%T!Q!Y!5X!Y!^%T!_#R%T#R#S!5X#S#o%T#p~%Ty!5`X$UWkqO!Q%T!Q!Y!5X!Y!^%T!_#R%T#R#S!5X#S#b%T#b#c!2w#c#o%T#p~%Ty!6QZ$UWO!Q%T!Q![!6s![!^%T!_!c%T!c!i!6s!i#R%T#R#S!6s#S#T%T#T#Z!6s#Z#o%T#p~%Ty!6z]$UWkqO!Q%T!Q![!6s![!^%T!_!c%T!c!i!6s!i#R%T#R#S!6s#S#T%T#T#Z!6s#Z#b%T#b#c!2w#c#o%T#p~%T%w!7|R!]V$UW#m%hO!^%T!_#o%T#p~%T!P!8^R_w$UWO!^%T!_#o%T#p~%T+c!8rR'`d!a%Y#x&s'zP!P!Q!8{!^!_!9Q!_!`!9_W!9QO$WW#v!9VP#`#v!_!`!9Y#v!9_O#o#v#v!9dO#a#v%w!9kT!{%o$UWO!^%T!_!`'v!`!a!9z!a#o%T#p~%T$P!:RR#W#w$UWO!^%T!_#o%T#p~%T%w!:gT'_!s#a#v$RS$UWO!^%T!_!`!:v!`!a!;W!a#o%T#p~%T$O!:}R#a#v$UWO!^%T!_#o%T#p~%T$O!;_T#`#v$UWO!^%T!_!`5T!`!a!;n!a#o%T#p~%T$O!;uS#`#v$UWO!^%T!_!`5T!`#o%T#p~%T%w!<YV'n%o$UWO!O%T!O!P!<o!P!^%T!_!a%T!a!b!=P!b#o%T#p~%T$`!<vRv$W$UWO!^%T!_#o%T#p~%T$O!=WS$UW#j#vO!^%T!_!`5T!`#o%T#p~%T&e!=kRx&]$UWO!^%T!_#o%T#p~%TZ!={R!OR$UWO!^%T!_#o%T#p~%T$O!>]S#g#v$UWO!^%T!_!`5T!`#o%T#p~%T$P!>pR$UW'd#wO!^%T!_#o%T#p~%T~!?OO!T~%r!?VT'u%j$UWO!^%T!_!`5T!`#o%T#p#q!=P#q~%T$u!?oR!S$knQ$UWO!^%T!_#o%T#p~%TX!@PR!kP$UWO!^%T!_#o%T#p~%T,T!@gr$UW'W+{#zS'Z%k'epOX%TXY%cYZ%TZ[%c[p%Tpq%cqt%Ttu2`u}%T}!O3j!O!Q%T!Q![2`![!^%T!_!c%T!c!}2`!}#R%T#R#S2`#S#T%T#T#o2`#p$f%T$f$g%c$g#BY2`#BY#BZ!@Y#BZ$IS2`$IS$I_!@Y$I_$JT2`$JT$JU!@Y$JU$KV2`$KV$KW!@Y$KW&FU2`&FU&FV!@Y&FV?HT2`?HT?HU!@Y?HU~2`,T!CO_$UW'X+{#zS'Z%k'epOt%Ttu2`u}%T}!O3j!O!Q%T!Q![2`![!^%T!_!c%T!c!}2`!}#R%T#R#S2`#S#T%T#T#o2`#p$g%T$g~2`",
  tokenizers: [$y, _y, ew, 0, 1, 2, 3, 4, 5, 6, 7, 8, Ky],
  topRules: { Script: [0, 7] },
  dialects: { jsx: 11335, ts: 11337 },
  dynamicPrecedences: { 149: 1, 176: 1 },
  specialized: [{ term: 287, get: (i, e) => tw(i, e) << 1 }, { term: 287, get: (i) => iw[i] || -1 }, { term: 297, get: (i) => nw[i] || -1 }, { term: 63, get: (i) => rw[i] || -1 }],
  tokenPrec: 11358
}), ow = [
  /* @__PURE__ */ Kt("function ${name}(${params}) {\n	${}\n}", {
    label: "function",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ Kt("for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n	${}\n}", {
    label: "for",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ Kt("for (let ${name} of ${collection}) {\n	${}\n}", {
    label: "for",
    detail: "of loop",
    type: "keyword"
  }),
  /* @__PURE__ */ Kt(`try {
	\${}
} catch (\${error}) {
	\${}
}`, {
    label: "try",
    detail: "block",
    type: "keyword"
  }),
  /* @__PURE__ */ Kt(`class \${name} {
	constructor(\${params}) {
		\${}
	}
}`, {
    label: "class",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ Kt('import {${names}} from "${module}"\n${}', {
    label: "import",
    detail: "named",
    type: "keyword"
  }),
  /* @__PURE__ */ Kt('import ${name} from "${module}"\n${}', {
    label: "import",
    detail: "default",
    type: "keyword"
  })
], Wi = /* @__PURE__ */ Ti.define({
  parser: /* @__PURE__ */ sw.configure({
    props: [
      /* @__PURE__ */ _r.add({
        IfStatement: /* @__PURE__ */ lr({ except: /^\s*({|else\b)/ }),
        TryStatement: /* @__PURE__ */ lr({ except: /^\s*({|catch\b|finally\b)/ }),
        LabeledStatement: YO,
        SwitchBody: (i) => {
          let e = i.textAfter, t = /^\s*\}/.test(e), n = /^\s*(case|default)\b/.test(e);
          return i.baseIndent + (t ? 0 : n ? 1 : 2) * i.unit;
        },
        Block: /* @__PURE__ */ VO({ closing: "}" }),
        ArrowFunction: (i) => i.baseIndent + i.unit,
        "TemplateString BlockComment": () => -1,
        "Statement Property": /* @__PURE__ */ lr({ except: /^{/ }),
        JSXElement(i) {
          let e = /^\s*<\//.test(i.textAfter);
          return i.lineIndent(i.node.from) + (e ? 0 : i.unit);
        },
        JSXEscape(i) {
          let e = /\s*\}/.test(i.textAfter);
          return i.lineIndent(i.node.from) + (e ? 0 : i.unit);
        },
        "JSXOpenTag JSXSelfClosingTag"(i) {
          return i.column(i.node.from) + i.unit;
        }
      }),
      /* @__PURE__ */ es.add({
        "Block ClassBody SwitchBody EnumBody ObjectExpression ArrayExpression": Uf,
        BlockComment(i) {
          return { from: i.from + 2, to: i.to - 2 };
        }
      }),
      /* @__PURE__ */ Ta({
        "get set async static": A.modifier,
        "for while do if else switch try catch finally return throw break continue default case": A.controlKeyword,
        "in of await yield void typeof delete instanceof": A.operatorKeyword,
        "let var const function class extends": A.definitionKeyword,
        "import export from": A.moduleKeyword,
        "with debugger as new": A.keyword,
        TemplateString: /* @__PURE__ */ A.special(A.string),
        Super: A.atom,
        BooleanLiteral: A.bool,
        this: A.self,
        null: A.null,
        Star: A.modifier,
        VariableName: A.variableName,
        "CallExpression/VariableName TaggedTemplateExpression/VariableName": /* @__PURE__ */ A.function(A.variableName),
        VariableDefinition: /* @__PURE__ */ A.definition(A.variableName),
        Label: A.labelName,
        PropertyName: A.propertyName,
        PrivatePropertyName: /* @__PURE__ */ A.special(A.propertyName),
        "CallExpression/MemberExpression/PropertyName": /* @__PURE__ */ A.function(A.propertyName),
        "FunctionDeclaration/VariableDefinition": /* @__PURE__ */ A.function(/* @__PURE__ */ A.definition(A.variableName)),
        "ClassDeclaration/VariableDefinition": /* @__PURE__ */ A.definition(A.className),
        PropertyDefinition: /* @__PURE__ */ A.definition(A.propertyName),
        PrivatePropertyDefinition: /* @__PURE__ */ A.definition(/* @__PURE__ */ A.special(A.propertyName)),
        UpdateOp: A.updateOperator,
        LineComment: A.lineComment,
        BlockComment: A.blockComment,
        Number: A.number,
        String: A.string,
        ArithOp: A.arithmeticOperator,
        LogicOp: A.logicOperator,
        BitOp: A.bitwiseOperator,
        CompareOp: A.compareOperator,
        RegExp: A.regexp,
        Equals: A.definitionOperator,
        "Arrow : Spread": A.punctuation,
        "( )": A.paren,
        "[ ]": A.squareBracket,
        "{ }": A.brace,
        "InterpolationStart InterpolationEnd": /* @__PURE__ */ A.special(A.brace),
        ".": A.derefOperator,
        ", ;": A.separator,
        TypeName: A.typeName,
        TypeDefinition: /* @__PURE__ */ A.definition(A.typeName),
        "type enum interface implements namespace module declare": A.definitionKeyword,
        "abstract global Privacy readonly override": A.modifier,
        "is keyof unique infer": A.operatorKeyword,
        JSXAttributeValue: A.attributeValue,
        JSXText: A.content,
        "JSXStartTag JSXStartCloseTag JSXSelfCloseEndTag JSXEndTag": A.angleBracket,
        "JSXIdentifier JSXNameSpacedName": A.tagName,
        "JSXAttribute/JSXIdentifier JSXAttribute/JSXNameSpacedName": A.attributeName
      })
    ]
  }),
  languageData: {
    closeBrackets: { brackets: ["(", "[", "{", "'", '"', "`"] },
    commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
    indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/,
    wordChars: "$"
  }
}), aw = /* @__PURE__ */ Wi.configure({ dialect: "ts" }), lw = /* @__PURE__ */ Wi.configure({ dialect: "jsx" }), hw = /* @__PURE__ */ Wi.configure({ dialect: "jsx ts" });
function cw(i = {}) {
  let e = i.jsx ? i.typescript ? hw : lw : i.typescript ? aw : Wi;
  return new fa(e, Wi.data.of({
    autocomplete: o0(["LineComment", "BlockComment", "String"], Vd(ow))
  }));
}
const $i = ["_blank", "_self", "_top", "_parent"], Gs = ["ascii", "utf-8", "utf-16", "latin1", "latin1"], Fs = ["get", "post", "put", "delete"], Hs = ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"], We = ["true", "false"], E = {}, cs = {
  a: {
    attrs: {
      href: null,
      ping: null,
      type: null,
      media: null,
      target: $i,
      hreflang: null
    }
  },
  abbr: E,
  acronym: E,
  address: E,
  applet: E,
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
  article: E,
  aside: E,
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
  b: E,
  base: { attrs: { href: null, target: $i } },
  basefont: E,
  bdi: E,
  bdo: E,
  big: E,
  blockquote: { attrs: { cite: null } },
  body: E,
  br: E,
  button: {
    attrs: {
      form: null,
      formaction: null,
      name: null,
      value: null,
      autofocus: ["autofocus"],
      disabled: ["autofocus"],
      formenctype: Hs,
      formmethod: Fs,
      formnovalidate: ["novalidate"],
      formtarget: $i,
      type: ["submit", "reset", "button"]
    }
  },
  canvas: { attrs: { width: null, height: null } },
  caption: E,
  center: E,
  cite: E,
  code: E,
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
  dd: E,
  del: { attrs: { cite: null, datetime: null } },
  details: { attrs: { open: ["open"] } },
  dfn: E,
  dir: E,
  div: E,
  dl: E,
  dt: E,
  em: E,
  embed: { attrs: { src: null, type: null, width: null, height: null } },
  eventsource: { attrs: { src: null } },
  fieldset: { attrs: { disabled: ["disabled"], form: null, name: null } },
  figcaption: E,
  figure: E,
  font: E,
  footer: E,
  form: {
    attrs: {
      action: null,
      name: null,
      "accept-charset": Gs,
      autocomplete: ["on", "off"],
      enctype: Hs,
      method: Fs,
      novalidate: ["novalidate"],
      target: $i
    }
  },
  frame: E,
  frameset: E,
  h1: E,
  h2: E,
  h3: E,
  h4: E,
  h5: E,
  h6: E,
  head: {
    children: ["title", "base", "link", "style", "meta", "script", "noscript", "command"]
  },
  header: E,
  hgroup: E,
  hr: E,
  html: {
    attrs: { manifest: null }
  },
  i: E,
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
      formenctype: Hs,
      formmethod: Fs,
      formnovalidate: ["novalidate"],
      formtarget: $i,
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
  kbd: E,
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
  legend: E,
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
  mark: E,
  menu: { attrs: { label: null, type: ["list", "context", "toolbar"] } },
  meta: {
    attrs: {
      content: null,
      charset: Gs,
      name: ["viewport", "application-name", "author", "description", "generator", "keywords"],
      "http-equiv": ["content-language", "content-type", "default-style", "refresh"]
    }
  },
  meter: { attrs: { value: null, min: null, low: null, high: null, max: null, optimum: null } },
  nav: E,
  noframes: E,
  noscript: E,
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
  p: E,
  param: { attrs: { name: null, value: null } },
  pre: E,
  progress: { attrs: { value: null, max: null } },
  q: { attrs: { cite: null } },
  rp: E,
  rt: E,
  ruby: E,
  s: E,
  samp: E,
  script: {
    attrs: {
      type: ["text/javascript"],
      src: null,
      async: ["async"],
      defer: ["defer"],
      charset: Gs
    }
  },
  section: E,
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
  small: E,
  source: { attrs: { src: null, type: null, media: null } },
  span: E,
  strike: E,
  strong: E,
  style: {
    attrs: {
      type: ["text/css"],
      media: null,
      scoped: null
    }
  },
  sub: E,
  summary: E,
  sup: E,
  table: E,
  tbody: E,
  td: { attrs: { colspan: null, rowspan: null, headers: null } },
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
  tfoot: E,
  th: { attrs: { colspan: null, rowspan: null, headers: null, scope: ["row", "col", "rowgroup", "colgroup"] } },
  thead: E,
  time: { attrs: { datetime: null } },
  title: E,
  tr: E,
  track: {
    attrs: {
      src: null,
      label: null,
      default: null,
      kind: ["subtitles", "captions", "descriptions", "chapters", "metadata"],
      srclang: null
    }
  },
  tt: E,
  u: E,
  ul: { children: ["li", "script", "template", "ul", "ol"] },
  var: E,
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
  wbr: E
}, yg = {
  accesskey: null,
  class: null,
  contenteditable: We,
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
  spellcheck: We,
  autocorrect: We,
  autocapitalize: We,
  style: null,
  tabindex: null,
  title: null,
  translate: ["yes", "no"],
  onclick: null,
  rel: ["stylesheet", "alternate", "author", "bookmark", "help", "license", "next", "nofollow", "noreferrer", "prefetch", "prev", "search", "tag"],
  role: /* @__PURE__ */ "alert application article banner button cell checkbox complementary contentinfo dialog document feed figure form grid gridcell heading img list listbox listitem main navigation region row rowgroup search switch tab table tabpanel textbox timer".split(" "),
  "aria-activedescendant": null,
  "aria-atomic": We,
  "aria-autocomplete": ["inline", "list", "both", "none"],
  "aria-busy": We,
  "aria-checked": ["true", "false", "mixed", "undefined"],
  "aria-controls": null,
  "aria-describedby": null,
  "aria-disabled": We,
  "aria-dropeffect": null,
  "aria-expanded": ["true", "false", "undefined"],
  "aria-flowto": null,
  "aria-grabbed": ["true", "false", "undefined"],
  "aria-haspopup": We,
  "aria-hidden": We,
  "aria-invalid": ["true", "false", "grammar", "spelling"],
  "aria-label": null,
  "aria-labelledby": null,
  "aria-level": null,
  "aria-live": ["off", "polite", "assertive"],
  "aria-multiline": We,
  "aria-multiselectable": We,
  "aria-owns": null,
  "aria-posinset": null,
  "aria-pressed": ["true", "false", "mixed", "undefined"],
  "aria-readonly": We,
  "aria-relevant": null,
  "aria-required": We,
  "aria-selected": ["true", "false", "undefined"],
  "aria-setsize": null,
  "aria-sort": ["ascending", "descending", "none", "other"],
  "aria-valuemax": null,
  "aria-valuemin": null,
  "aria-valuenow": null,
  "aria-valuetext": null
}, uw = /* @__PURE__ */ Object.keys(cs), Vc = /* @__PURE__ */ Object.keys(yg);
function Mi(i, e, t = i.length) {
  if (!e)
    return "";
  let n = e.firstChild, r = n && n.getChild("TagName");
  return r ? i.sliceString(r.from, Math.min(r.to, t)) : "";
}
function us(i, e = !1) {
  for (let t = i.parent; t; t = t.parent)
    if (t.name == "Element")
      if (e)
        e = !1;
      else
        return t;
  return null;
}
function wg(i, e) {
  let t = cs[Mi(i, us(e, !0))];
  return (t == null ? void 0 : t.children) || uw;
}
function La(i, e) {
  let t = [];
  for (let n = e; n = us(n); ) {
    let r = Mi(i, n);
    if (r && n.lastChild.name == "CloseTag")
      break;
    r && t.indexOf(r) < 0 && (e.name == "EndTag" || e.from >= n.firstChild.to) && t.push(r);
  }
  return t;
}
const vg = /^[:\-\.\w\u00b7-\uffff]+$/;
function Yc(i, e, t, n) {
  let r = /\s*>/.test(i.sliceDoc(n, n + 5)) ? "" : ">";
  return {
    from: t,
    to: n,
    options: wg(i.doc, e).map((s) => ({ label: s, type: "type" })).concat(La(i.doc, e).map((s, o) => ({ label: "/" + s, apply: "/" + s + r, type: "type", boost: 99 - o }))),
    span: /^\/?[:\-\.\w\u00b7-\uffff]*$/
  };
}
function qc(i, e, t, n) {
  let r = /\s*>/.test(i.sliceDoc(n, n + 5)) ? "" : ">";
  return {
    from: t,
    to: n,
    options: La(i.doc, e).map((s, o) => ({ label: s, apply: s + r, type: "type", boost: 99 - o })),
    span: vg
  };
}
function fw(i, e, t) {
  let n = [], r = 0;
  for (let s of wg(i.doc, e))
    n.push({ label: "<" + s, type: "type" });
  for (let s of La(i.doc, e))
    n.push({ label: "</" + s + ">", type: "type", boost: 99 - r++ });
  return { from: t, to: t, options: n, span: /^<\/?[:\-\.\w\u00b7-\uffff]*$/ };
}
function dw(i, e, t, n) {
  let r = us(e), s = r ? cs[Mi(i.doc, r)] : null, o = s && s.attrs ? Object.keys(s.attrs).concat(Vc) : Vc;
  return {
    from: t,
    to: n,
    options: o.map((a) => ({ label: a, type: "property" })),
    span: vg
  };
}
function gw(i, e, t, n) {
  var r;
  let s = (r = e.parent) === null || r === void 0 ? void 0 : r.getChild("AttributeName"), o = [], a;
  if (s) {
    let l = i.sliceDoc(s.from, s.to), h = yg[l];
    if (!h) {
      let c = us(e), u = c ? cs[Mi(i.doc, c)] : null;
      h = (u == null ? void 0 : u.attrs) && u.attrs[l];
    }
    if (h) {
      let c = i.sliceDoc(t, n).toLowerCase(), u = '"', f = '"';
      /^['"]/.test(c) ? (a = c[0] == '"' ? /^[^"]*$/ : /^[^']*$/, u = "", f = i.sliceDoc(n, n + 1) == c[0] ? "" : c[0], c = c.slice(1), t++) : a = /^[^\s<>='"]*$/;
      for (let d of h)
        o.push({ label: d, apply: u + d + f, type: "constant" });
    }
  }
  return { from: t, to: n, options: o, span: a };
}
function Aw(i) {
  let { state: e, pos: t } = i, n = he(e).resolveInner(t), r = n.resolve(t, -1);
  for (let s = t, o; n == r && (o = r.childBefore(s)); ) {
    let a = o.lastChild;
    if (!a || !a.type.isError || a.from < a.to)
      break;
    n = r = o, s = a.from;
  }
  return r.name == "TagName" ? r.parent && /CloseTag$/.test(r.parent.name) ? qc(e, r, r.from, t) : Yc(e, r, r.from, t) : r.name == "StartTag" ? Yc(e, r, t, t) : r.name == "StartCloseTag" || r.name == "IncompleteCloseTag" ? qc(e, r, t, t) : i.explicit && (r.name == "OpenTag" || r.name == "SelfClosingTag") || r.name == "AttributeName" ? dw(e, r, r.name == "AttributeName" ? r.from : t, t) : r.name == "Is" || r.name == "AttributeValue" || r.name == "UnquotedAttributeValue" ? gw(e, r, r.name == "Is" ? t : r.from, t) : i.explicit && (n.name == "Element" || n.name == "Text" || n.name == "Document") ? fw(e, r, t) : null;
}
const Wa = /* @__PURE__ */ Ti.define({
  parser: /* @__PURE__ */ ly.configure({
    props: [
      /* @__PURE__ */ _r.add({
        Element(i) {
          let e = /^(\s*)(<\/)?/.exec(i.textAfter);
          return i.node.to <= i.pos + e[0].length ? i.continue() : i.lineIndent(i.node.from) + (e[2] ? 0 : i.unit);
        },
        "OpenTag CloseTag SelfClosingTag"(i) {
          return i.column(i.node.from) + i.unit;
        },
        Document(i) {
          if (i.pos + /\s*/.exec(i.textAfter)[0].length < i.node.to)
            return i.continue();
          let e = null, t;
          for (let n = i.node; ; ) {
            let r = n.lastChild;
            if (!r || r.name != "Element" || r.to != n.to)
              break;
            e = n = r;
          }
          return e && !((t = e.lastChild) && (t.name == "CloseTag" || t.name == "SelfClosingTag")) ? i.lineIndent(e.from) + i.unit : null;
        }
      }),
      /* @__PURE__ */ es.add({
        Element(i) {
          let e = i.firstChild, t = i.lastChild;
          return !e || e.name != "OpenTag" ? null : { from: e.to, to: t.name == "CloseTag" ? t.from : i.to };
        }
      }),
      /* @__PURE__ */ Ta({
        "Text RawText": A.content,
        "StartTag StartCloseTag SelfCloserEndTag EndTag SelfCloseEndTag": A.angleBracket,
        TagName: A.tagName,
        "MismatchedCloseTag/TagName": [A.tagName, A.invalid],
        AttributeName: A.attributeName,
        "AttributeValue UnquotedAttributeValue": A.attributeValue,
        Is: A.definitionOperator,
        "EntityReference CharacterReference": A.character,
        Comment: A.blockComment,
        ProcessingInst: A.processingInstruction,
        DoctypeDecl: A.documentMeta
      })
    ],
    wrap: /* @__PURE__ */ cy([
      {
        tag: "script",
        attrs(i) {
          return !i.type || /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i.test(i.type);
        },
        parser: Wi.parser
      },
      {
        tag: "style",
        attrs(i) {
          return (!i.lang || i.lang == "css") && (!i.type || /^(text\/)?(x-)?(stylesheet|css)$/i.test(i.type));
        },
        parser: Da.parser
      }
    ])
  }),
  languageData: {
    commentTokens: { block: { open: "<!--", close: "-->" } },
    indentOnInput: /^\s*<\/\w+\W$/,
    wordChars: "-._"
  }
}), pw = /* @__PURE__ */ Wa.data.of({ autocomplete: Aw });
function Ow(i = {}) {
  let e = Wa;
  return i.matchClosingTags === !1 && (e = e.configure({ dialect: "noMatch" })), new fa(e, [
    pw,
    i.autoCloseTags !== !1 ? mw : [],
    cw().support,
    Ty().support
  ]);
}
const mw = /* @__PURE__ */ I.inputHandler.of((i, e, t, n) => {
  if (i.composing || i.state.readOnly || e != t || n != ">" && n != "/" || !Wa.isActiveAt(i.state, e, -1))
    return !1;
  let { state: r } = i, s = r.changeByRange((o) => {
    var a, l, h;
    let { head: c } = o, u = he(r).resolveInner(c, -1), f;
    if ((u.name == "TagName" || u.name == "StartTag") && (u = u.parent), n == ">" && u.name == "OpenTag") {
      if (((l = (a = u.parent) === null || a === void 0 ? void 0 : a.lastChild) === null || l === void 0 ? void 0 : l.name) != "CloseTag" && (f = Mi(r.doc, u.parent, c)))
        return { range: y.cursor(c + 1), changes: { from: c, insert: `></${f}>` } };
    } else if (n == "/" && u.name == "OpenTag") {
      let d = u.parent, g = d == null ? void 0 : d.parent;
      if (d.from == c - 1 && ((h = g.lastChild) === null || h === void 0 ? void 0 : h.name) != "CloseTag" && (f = Mi(r.doc, g, c))) {
        let p = `/${f}>`;
        return { range: y.cursor(c + p.length), changes: { from: c, insert: p } };
      }
    }
    return { range: o };
  });
  return s.changes.empty ? !1 : (i.dispatch(s, { userEvent: "input.type", scrollIntoView: !0 }), !0);
}), Qw = "#e5c07b", Gc = "#e06c75", bw = "#56b6c2", yw = "#ffffff", dr = "#abb2bf", qo = "#7d8799", ww = "#61afef", vw = "#98c379", Fc = "#d19a66", Cw = "#c678dd", Sw = "#21252b", Js = "#2c313a", Hc = "#282c34", Ks = "#353a42", kw = "#3E4451", Jc = "#528bff", Ew = /* @__PURE__ */ I.theme({
  "&": {
    color: dr,
    backgroundColor: Hc
  },
  ".cm-content": {
    caretColor: Jc
  },
  "&.cm-focused .cm-cursor": { borderLeftColor: Jc },
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": { backgroundColor: kw },
  ".cm-panels": { backgroundColor: Sw, color: dr },
  ".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },
  ".cm-panels.cm-panels-bottom": { borderTop: "2px solid black" },
  ".cm-searchMatch": {
    backgroundColor: "#72a1ff59",
    outline: "1px solid #457dff"
  },
  ".cm-searchMatch.cm-searchMatch-selected": {
    backgroundColor: "#6199ff2f"
  },
  ".cm-activeLine": { backgroundColor: Js },
  ".cm-selectionMatch": { backgroundColor: "#aafe661a" },
  "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
    backgroundColor: "#bad0f847",
    outline: "1px solid #515a6b"
  },
  ".cm-gutters": {
    backgroundColor: Hc,
    color: qo,
    border: "none"
  },
  ".cm-activeLineGutter": {
    backgroundColor: Js
  },
  ".cm-foldPlaceholder": {
    backgroundColor: "transparent",
    border: "none",
    color: "#ddd"
  },
  ".cm-tooltip": {
    border: "none",
    backgroundColor: Ks
  },
  ".cm-tooltip .cm-tooltip-arrow:before": {
    borderTopColor: "transparent",
    borderBottomColor: "transparent"
  },
  ".cm-tooltip .cm-tooltip-arrow:after": {
    borderTopColor: Ks,
    borderBottomColor: Ks
  },
  ".cm-tooltip-autocomplete": {
    "& > ul > li[aria-selected]": {
      backgroundColor: Js,
      color: dr
    }
  }
}, { dark: !0 }), xw = /* @__PURE__ */ Yi.define([
  {
    tag: A.keyword,
    color: Cw
  },
  {
    tag: [A.name, A.deleted, A.character, A.propertyName, A.macroName],
    color: Gc
  },
  {
    tag: [/* @__PURE__ */ A.function(A.variableName), A.labelName],
    color: ww
  },
  {
    tag: [A.color, /* @__PURE__ */ A.constant(A.name), /* @__PURE__ */ A.standard(A.name)],
    color: Fc
  },
  {
    tag: [/* @__PURE__ */ A.definition(A.name), A.separator],
    color: dr
  },
  {
    tag: [A.typeName, A.className, A.number, A.changed, A.annotation, A.modifier, A.self, A.namespace],
    color: Qw
  },
  {
    tag: [A.operator, A.operatorKeyword, A.url, A.escape, A.regexp, A.link, /* @__PURE__ */ A.special(A.string)],
    color: bw
  },
  {
    tag: [A.meta, A.comment],
    color: qo
  },
  {
    tag: A.strong,
    fontWeight: "bold"
  },
  {
    tag: A.emphasis,
    fontStyle: "italic"
  },
  {
    tag: A.strikethrough,
    textDecoration: "line-through"
  },
  {
    tag: A.link,
    color: qo,
    textDecoration: "underline"
  },
  {
    tag: A.heading,
    fontWeight: "bold",
    color: Gc
  },
  {
    tag: [A.atom, A.bool, /* @__PURE__ */ A.special(A.variableName)],
    color: Fc
  },
  {
    tag: [A.processingInstruction, A.string, A.inserted],
    color: vw
  },
  {
    tag: A.invalid,
    color: yw
  }
]), Bw = [Ew, xw];
var zr = function() {
  return zr = Object.assign || function(i) {
    for (var e, t = 1, n = arguments.length; t < n; t++) {
      e = arguments[t];
      for (var r in e)
        Object.prototype.hasOwnProperty.call(e, r) && (i[r] = e[r]);
    }
    return i;
  }, zr.apply(this, arguments);
};
function Iw(i) {
  return i.toLowerCase();
}
var Tw = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g], Pw = /[^A-Z0-9]+/gi;
function Rw(i, e) {
  e === void 0 && (e = {});
  for (var t = e.splitRegexp, n = t === void 0 ? Tw : t, r = e.stripRegexp, s = r === void 0 ? Pw : r, o = e.transform, a = o === void 0 ? Iw : o, l = e.delimiter, h = l === void 0 ? " " : l, c = Kc(Kc(i, n, "$1\0$2"), s, "\0"), u = 0, f = c.length; c.charAt(u) === "\0"; )
    u++;
  for (; c.charAt(f - 1) === "\0"; )
    f--;
  return c.slice(u, f).split("\0").map(a).join(h);
}
function Kc(i, e, t) {
  return e instanceof RegExp ? i.replace(e, t) : e.reduce(function(n, r) {
    return n.replace(r, t);
  }, i);
}
function Cg(i, e) {
  var t = i.charAt(0), n = i.substr(1).toLowerCase();
  return e > 0 && t >= "0" && t <= "9" ? "_" + t + n : "" + t.toUpperCase() + n;
}
function Dw(i, e) {
  return e === void 0 && (e = {}), Rw(i, zr({ delimiter: "", transform: Cg }, e));
}
function Lw(i, e) {
  return e === 0 ? i.toLowerCase() : Cg(i, e);
}
function Ww(i, e) {
  return e === void 0 && (e = {}), Dw(i, zr({ transform: Lw }, e));
}
const Ma = /* @__PURE__ */ Ce({
  __name: "AnimateCss",
  props: {
    animated: { type: Boolean, default: !0 },
    attentionSeekerEffects: { default: () => [
      "bounce",
      "flash",
      "pulse",
      "rubberBand",
      "shakeX",
      "shakeY",
      "headShake",
      "swing",
      "tada",
      "wobble",
      "jello",
      "heartBeat"
    ] },
    big: { type: Boolean, default: !1 },
    direction: null,
    directionEffects: { default: () => [
      "back",
      "bounce",
      "fade",
      "flip",
      "lightspeed",
      "rotate",
      "roll",
      "slide",
      "zoom"
    ] },
    down: { type: Boolean, default: !1 },
    duration: null,
    enter: null,
    enterClass: null,
    enterToClass: null,
    enterActiveClass: null,
    inOut: { type: Boolean },
    leave: null,
    leaveClass: null,
    leaveToClass: null,
    leaveActiveClass: null,
    left: { type: Boolean },
    mode: { default: "default" },
    name: null,
    prefix: { default: "animate__" },
    right: { type: Boolean },
    special: { type: Boolean },
    up: { type: Boolean },
    x: { type: Boolean },
    y: { type: Boolean }
  },
  setup(i) {
    const e = i;
    Hg();
    function t(h) {
      return `${e.prefix}${h}`;
    }
    function n(h, c) {
      return [
        t(
          Ww([
            e.name,
            !s.value && h,
            !s.value && r.value,
            !s.value && e.big && "big"
          ].filter((u) => !!u).join(" "))
        )
      ].concat([o.value]).concat(c || "").filter((u) => !!u).join(" ");
    }
    const r = Gi(() => e.direction || e.x && "x" || e.y && "y" || e.up && "up" || e.down && "down" || e.left && "left" || e.right && "right"), s = Gi(() => e.name && (!e.inOut && e.attentionSeekerEffects.indexOf(e.name.toLowerCase()) > -1 || e.directionEffects.indexOf(e.name.toLowerCase()) === -1)), o = Gi(() => e.animated ? t("animated") : ""), a = Gi(() => e.enter ? `${t(e.enter)} ${o.value}` : n("in", e.enterActiveClass)), l = Gi(() => e.leave ? `${t(e.leave)} ${o.value}` : n("out", e.leaveActiveClass));
    return (h, c) => (j(), fe(Jg, {
      mode: i.mode,
      duration: e.duration,
      "enter-class": i.enterClass,
      "enter-to-class": i.enterToClass,
      "enter-active-class": Dl(a),
      "leave-class": i.leaveClass,
      "leave-to-class": i.leaveToClass,
      "leave-active-class": Dl(l),
      onBeforeEnter: c[0] || (c[0] = (...u) => h.$emit("before-enter", ...u)),
      onEnter: c[1] || (c[1] = (...u) => h.$emit("enter", ...u)),
      onAfterEnter: c[2] || (c[2] = (...u) => h.$emit("after-enter", ...u)),
      onBeforeLeave: c[3] || (c[3] = (...u) => h.$emit("before-leave", ...u)),
      onLeave: c[4] || (c[4] = (...u) => h.$emit("leave", ...u)),
      onAfterLeave: c[5] || (c[5] = (...u) => h.$emit("after-leave", ...u))
    }, {
      default: z(() => [
        N(h.$slots, "default")
      ]),
      _: 3
    }, 8, ["mode", "duration", "enter-class", "enter-to-class", "enter-active-class", "leave-class", "leave-to-class", "leave-active-class"]));
  }
}), Mw = {
  props: {
    componentPrefix: String,
    size: String,
    sizePrefix: String
  },
  computed: {
    sizeableClassPrefix() {
      return this.sizePrefix || this.componentPrefix;
    },
    hasSizeablePrefix() {
      return this.size === void 0 ? !1 : !!this.size.match(new RegExp(`^${this.sizeableClassPrefix}`));
    },
    sizeableClass() {
      return this.size ? !this.sizeableClassPrefix || this.hasSizeablePrefix ? this.size : `${this.sizeableClassPrefix}-${this.size}` : "";
    }
  }
}, Xw = {
  props: {
    componentPrefix: String,
    variant: String,
    variantPrefix: String
  },
  computed: {
    variantClassPrefix() {
      return this.variantPrefix || this.componentPrefix;
    },
    hasVariantPrefix() {
      return this.variant === void 0 ? !1 : !!this.variant.match(new RegExp(`^${this.variantClassPrefix}`));
    },
    variantClass() {
      return this.variant ? !this.variantClassPrefix || this.hasVariantPrefix ? this.variant : `${this.variantClassPrefix}-${this.variant}` : "";
    }
  }
}, jw = Ce({
  mixins: [
    Mw,
    Xw
  ],
  props: {
    active: Boolean,
    block: Boolean,
    componentPrefix: {
      type: String,
      default: "btn"
    },
    disabled: Boolean,
    label: String,
    outline: Boolean,
    tag: String,
    variant: {
      type: String,
      default: "primary"
    }
  },
  computed: {
    classes() {
      return [
        "btn",
        this.variantClass,
        this.sizeableClass,
        this.active && "active",
        this.block && "btn-block",
        this.disabled && "disabled"
      ];
    },
    component() {
      return this.tag ? this.tag : this.$attrs.href ? "a" : "button";
    },
    variantClassPrefix() {
      return (this.variantPrefix || this.componentPrefix) + (this.outline ? "-outline" : "");
    }
  }
}), Zw = (i, e) => {
  const t = i.__vccOpts || i;
  for (const [n, r] of e)
    t[n] = r;
  return t;
};
function Nw(i, e, t, n, r, s) {
  return j(), fe(Yr(i.component), ai(i.$attrs, {
    disabled: i.disabled,
    class: i.classes,
    role: "button"
  }), {
    default: z(() => [
      N(i.$slots, "default", {}, () => [
        gt(ke(i.label), 1)
      ])
    ]),
    _: 3
  }, 16, ["disabled", "class"]);
}
const Xa = /* @__PURE__ */ Zw(jw, [["render", Nw]]);
function zw(i, e) {
  return j(), ie("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    ne("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
    })
  ]);
}
function Uw(i, e) {
  return j(), ie("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    ne("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 002.248-2.354M12 12.75a2.25 2.25 0 01-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 00-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 01.4-2.253M12 8.25a2.25 2.25 0 00-2.248 2.146M12 8.25a2.25 2.25 0 012.248 2.146M8.683 5a6.032 6.032 0 01-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0115.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 00-.575-1.752M4.921 6a24.048 24.048 0 00-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 01-5.223 1.082"
    })
  ]);
}
function Vw(i, e) {
  return j(), ie("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    ne("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15.75 19.5L8.25 12l7.5-7.5"
    })
  ]);
}
function Yw(i, e) {
  return j(), ie("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    ne("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.25 4.5l7.5 7.5-7.5 7.5"
    })
  ]);
}
function qw(i, e) {
  return j(), ie("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    ne("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
    })
  ]);
}
function Gw(i, e) {
  return j(), ie("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    ne("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
    })
  ]);
}
function Fw(i, e) {
  return j(), ie("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    ne("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
    })
  ]);
}
var Re = "top", Fe = "bottom", He = "right", De = "left", fs = "auto", Rn = [Re, Fe, He, De], Xi = "start", Cn = "end", Hw = "clippingParents", Sg = "viewport", _i = "popper", Jw = "reference", $c = /* @__PURE__ */ Rn.reduce(function(i, e) {
  return i.concat([e + "-" + Xi, e + "-" + Cn]);
}, []), kg = /* @__PURE__ */ [].concat(Rn, [fs]).reduce(function(i, e) {
  return i.concat([e, e + "-" + Xi, e + "-" + Cn]);
}, []), Kw = "beforeRead", $w = "read", _w = "afterRead", ev = "beforeMain", tv = "main", iv = "afterMain", nv = "beforeWrite", rv = "write", sv = "afterWrite", Go = [Kw, $w, _w, ev, tv, iv, nv, rv, sv];
function pt(i) {
  return i ? (i.nodeName || "").toLowerCase() : null;
}
function Je(i) {
  if (i == null)
    return window;
  if (i.toString() !== "[object Window]") {
    var e = i.ownerDocument;
    return e && e.defaultView || window;
  }
  return i;
}
function gi(i) {
  var e = Je(i).Element;
  return i instanceof e || i instanceof Element;
}
function ze(i) {
  var e = Je(i).HTMLElement;
  return i instanceof e || i instanceof HTMLElement;
}
function ja(i) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = Je(i).ShadowRoot;
  return i instanceof e || i instanceof ShadowRoot;
}
function ov(i) {
  var e = i.state;
  Object.keys(e.elements).forEach(function(t) {
    var n = e.styles[t] || {}, r = e.attributes[t] || {}, s = e.elements[t];
    !ze(s) || !pt(s) || (Object.assign(s.style, n), Object.keys(r).forEach(function(o) {
      var a = r[o];
      a === !1 ? s.removeAttribute(o) : s.setAttribute(o, a === !0 ? "" : a);
    }));
  });
}
function av(i) {
  var e = i.state, t = {
    popper: {
      position: e.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(e.elements.popper.style, t.popper), e.styles = t, e.elements.arrow && Object.assign(e.elements.arrow.style, t.arrow), function() {
    Object.keys(e.elements).forEach(function(n) {
      var r = e.elements[n], s = e.attributes[n] || {}, o = Object.keys(e.styles.hasOwnProperty(n) ? e.styles[n] : t[n]), a = o.reduce(function(l, h) {
        return l[h] = "", l;
      }, {});
      !ze(r) || !pt(r) || (Object.assign(r.style, a), Object.keys(s).forEach(function(l) {
        r.removeAttribute(l);
      }));
    });
  };
}
const lv = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: ov,
  effect: av,
  requires: ["computeStyles"]
};
function et(i) {
  return i.split("-")[0];
}
var oi = Math.max, Ur = Math.min, ji = Math.round;
function Fo() {
  var i = navigator.userAgentData;
  return i != null && i.brands ? i.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function Eg() {
  return !/^((?!chrome|android).)*safari/i.test(Fo());
}
function Zi(i, e, t) {
  e === void 0 && (e = !1), t === void 0 && (t = !1);
  var n = i.getBoundingClientRect(), r = 1, s = 1;
  e && ze(i) && (r = i.offsetWidth > 0 && ji(n.width) / i.offsetWidth || 1, s = i.offsetHeight > 0 && ji(n.height) / i.offsetHeight || 1);
  var o = gi(i) ? Je(i) : window, a = o.visualViewport, l = !Eg() && t, h = (n.left + (l && a ? a.offsetLeft : 0)) / r, c = (n.top + (l && a ? a.offsetTop : 0)) / s, u = n.width / r, f = n.height / s;
  return {
    width: u,
    height: f,
    top: c,
    right: h + u,
    bottom: c + f,
    left: h,
    x: h,
    y: c
  };
}
function Za(i) {
  var e = Zi(i), t = i.offsetWidth, n = i.offsetHeight;
  return Math.abs(e.width - t) <= 1 && (t = e.width), Math.abs(e.height - n) <= 1 && (n = e.height), {
    x: i.offsetLeft,
    y: i.offsetTop,
    width: t,
    height: n
  };
}
function xg(i, e) {
  var t = e.getRootNode && e.getRootNode();
  if (i.contains(e))
    return !0;
  if (t && ja(t)) {
    var n = e;
    do {
      if (n && i.isSameNode(n))
        return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function tt(i) {
  return Je(i).getComputedStyle(i);
}
function hv(i) {
  return ["table", "td", "th"].indexOf(pt(i)) >= 0;
}
function Ft(i) {
  return ((gi(i) ? i.ownerDocument : (
    // $FlowFixMe[prop-missing]
    i.document
  )) || window.document).documentElement;
}
function ds(i) {
  return pt(i) === "html" ? i : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    i.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    i.parentNode || // DOM Element detected
    (ja(i) ? i.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    Ft(i)
  );
}
function _c(i) {
  return !ze(i) || // https://github.com/popperjs/popper-core/issues/837
  tt(i).position === "fixed" ? null : i.offsetParent;
}
function cv(i) {
  var e = /firefox/i.test(Fo()), t = /Trident/i.test(Fo());
  if (t && ze(i)) {
    var n = tt(i);
    if (n.position === "fixed")
      return null;
  }
  var r = ds(i);
  for (ja(r) && (r = r.host); ze(r) && ["html", "body"].indexOf(pt(r)) < 0; ) {
    var s = tt(r);
    if (s.transform !== "none" || s.perspective !== "none" || s.contain === "paint" || ["transform", "perspective"].indexOf(s.willChange) !== -1 || e && s.willChange === "filter" || e && s.filter && s.filter !== "none")
      return r;
    r = r.parentNode;
  }
  return null;
}
function Dn(i) {
  for (var e = Je(i), t = _c(i); t && hv(t) && tt(t).position === "static"; )
    t = _c(t);
  return t && (pt(t) === "html" || pt(t) === "body" && tt(t).position === "static") ? e : t || cv(i) || e;
}
function Na(i) {
  return ["top", "bottom"].indexOf(i) >= 0 ? "x" : "y";
}
function un(i, e, t) {
  return oi(i, Ur(e, t));
}
function uv(i, e, t) {
  var n = un(i, e, t);
  return n > t ? t : n;
}
function Bg() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Ig(i) {
  return Object.assign({}, Bg(), i);
}
function Tg(i, e) {
  return e.reduce(function(t, n) {
    return t[n] = i, t;
  }, {});
}
var fv = function(i, e) {
  return i = typeof i == "function" ? i(Object.assign({}, e.rects, {
    placement: e.placement
  })) : i, Ig(typeof i != "number" ? i : Tg(i, Rn));
};
function dv(i) {
  var e, t = i.state, n = i.name, r = i.options, s = t.elements.arrow, o = t.modifiersData.popperOffsets, a = et(t.placement), l = Na(a), h = [De, He].indexOf(a) >= 0, c = h ? "height" : "width";
  if (!(!s || !o)) {
    var u = fv(r.padding, t), f = Za(s), d = l === "y" ? Re : De, g = l === "y" ? Fe : He, p = t.rects.reference[c] + t.rects.reference[l] - o[l] - t.rects.popper[c], O = o[l] - t.rects.reference[l], m = Dn(s), w = m ? l === "y" ? m.clientHeight || 0 : m.clientWidth || 0 : 0, C = p / 2 - O / 2, Q = u[d], b = w - f[c] - u[g], v = w / 2 - f[c] / 2 + C, S = un(Q, v, b), L = l;
    t.modifiersData[n] = (e = {}, e[L] = S, e.centerOffset = S - v, e);
  }
}
function gv(i) {
  var e = i.state, t = i.options, n = t.element, r = n === void 0 ? "[data-popper-arrow]" : n;
  if (r != null && !(typeof r == "string" && (r = e.elements.popper.querySelector(r), !r))) {
    if (process.env.NODE_ENV !== "production" && (ze(r) || console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "))), !xg(e.elements.popper, r)) {
      process.env.NODE_ENV !== "production" && console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
      return;
    }
    e.elements.arrow = r;
  }
}
const Av = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: dv,
  effect: gv,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Ni(i) {
  return i.split("-")[1];
}
var pv = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Ov(i) {
  var e = i.x, t = i.y, n = window, r = n.devicePixelRatio || 1;
  return {
    x: ji(e * r) / r || 0,
    y: ji(t * r) / r || 0
  };
}
function eu(i) {
  var e, t = i.popper, n = i.popperRect, r = i.placement, s = i.variation, o = i.offsets, a = i.position, l = i.gpuAcceleration, h = i.adaptive, c = i.roundOffsets, u = i.isFixed, f = o.x, d = f === void 0 ? 0 : f, g = o.y, p = g === void 0 ? 0 : g, O = typeof c == "function" ? c({
    x: d,
    y: p
  }) : {
    x: d,
    y: p
  };
  d = O.x, p = O.y;
  var m = o.hasOwnProperty("x"), w = o.hasOwnProperty("y"), C = De, Q = Re, b = window;
  if (h) {
    var v = Dn(t), S = "clientHeight", L = "clientWidth";
    if (v === Je(t) && (v = Ft(t), tt(v).position !== "static" && a === "absolute" && (S = "scrollHeight", L = "scrollWidth")), v = v, r === Re || (r === De || r === He) && s === Cn) {
      Q = Fe;
      var x = u && v === b && b.visualViewport ? b.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        v[S]
      );
      p -= x - n.height, p *= l ? 1 : -1;
    }
    if (r === De || (r === Re || r === Fe) && s === Cn) {
      C = He;
      var B = u && v === b && b.visualViewport ? b.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        v[L]
      );
      d -= B - n.width, d *= l ? 1 : -1;
    }
  }
  var D = Object.assign({
    position: a
  }, h && pv), Z = c === !0 ? Ov({
    x: d,
    y: p
  }) : {
    x: d,
    y: p
  };
  if (d = Z.x, p = Z.y, l) {
    var X;
    return Object.assign({}, D, (X = {}, X[Q] = w ? "0" : "", X[C] = m ? "0" : "", X.transform = (b.devicePixelRatio || 1) <= 1 ? "translate(" + d + "px, " + p + "px)" : "translate3d(" + d + "px, " + p + "px, 0)", X));
  }
  return Object.assign({}, D, (e = {}, e[Q] = w ? p + "px" : "", e[C] = m ? d + "px" : "", e.transform = "", e));
}
function mv(i) {
  var e = i.state, t = i.options, n = t.gpuAcceleration, r = n === void 0 ? !0 : n, s = t.adaptive, o = s === void 0 ? !0 : s, a = t.roundOffsets, l = a === void 0 ? !0 : a;
  if (process.env.NODE_ENV !== "production") {
    var h = tt(e.elements.popper).transitionProperty || "";
    o && ["transform", "top", "right", "bottom", "left"].some(function(u) {
      return h.indexOf(u) >= 0;
    }) && console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', `

`, 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", `

`, "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
  }
  var c = {
    placement: et(e.placement),
    variation: Ni(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: r,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, eu(Object.assign({}, c, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: o,
    roundOffsets: l
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, eu(Object.assign({}, c, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: l
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const Qv = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: mv,
  data: {}
};
var tr = {
  passive: !0
};
function bv(i) {
  var e = i.state, t = i.instance, n = i.options, r = n.scroll, s = r === void 0 ? !0 : r, o = n.resize, a = o === void 0 ? !0 : o, l = Je(e.elements.popper), h = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return s && h.forEach(function(c) {
    c.addEventListener("scroll", t.update, tr);
  }), a && l.addEventListener("resize", t.update, tr), function() {
    s && h.forEach(function(c) {
      c.removeEventListener("scroll", t.update, tr);
    }), a && l.removeEventListener("resize", t.update, tr);
  };
}
const yv = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: bv,
  data: {}
};
var wv = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function gr(i) {
  return i.replace(/left|right|bottom|top/g, function(e) {
    return wv[e];
  });
}
var vv = {
  start: "end",
  end: "start"
};
function tu(i) {
  return i.replace(/start|end/g, function(e) {
    return vv[e];
  });
}
function za(i) {
  var e = Je(i), t = e.pageXOffset, n = e.pageYOffset;
  return {
    scrollLeft: t,
    scrollTop: n
  };
}
function Ua(i) {
  return Zi(Ft(i)).left + za(i).scrollLeft;
}
function Cv(i, e) {
  var t = Je(i), n = Ft(i), r = t.visualViewport, s = n.clientWidth, o = n.clientHeight, a = 0, l = 0;
  if (r) {
    s = r.width, o = r.height;
    var h = Eg();
    (h || !h && e === "fixed") && (a = r.offsetLeft, l = r.offsetTop);
  }
  return {
    width: s,
    height: o,
    x: a + Ua(i),
    y: l
  };
}
function Sv(i) {
  var e, t = Ft(i), n = za(i), r = (e = i.ownerDocument) == null ? void 0 : e.body, s = oi(t.scrollWidth, t.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0), o = oi(t.scrollHeight, t.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0), a = -n.scrollLeft + Ua(i), l = -n.scrollTop;
  return tt(r || t).direction === "rtl" && (a += oi(t.clientWidth, r ? r.clientWidth : 0) - s), {
    width: s,
    height: o,
    x: a,
    y: l
  };
}
function Va(i) {
  var e = tt(i), t = e.overflow, n = e.overflowX, r = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(t + r + n);
}
function Pg(i) {
  return ["html", "body", "#document"].indexOf(pt(i)) >= 0 ? i.ownerDocument.body : ze(i) && Va(i) ? i : Pg(ds(i));
}
function fn(i, e) {
  var t;
  e === void 0 && (e = []);
  var n = Pg(i), r = n === ((t = i.ownerDocument) == null ? void 0 : t.body), s = Je(n), o = r ? [s].concat(s.visualViewport || [], Va(n) ? n : []) : n, a = e.concat(o);
  return r ? a : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    a.concat(fn(ds(o)))
  );
}
function Ho(i) {
  return Object.assign({}, i, {
    left: i.x,
    top: i.y,
    right: i.x + i.width,
    bottom: i.y + i.height
  });
}
function kv(i, e) {
  var t = Zi(i, !1, e === "fixed");
  return t.top = t.top + i.clientTop, t.left = t.left + i.clientLeft, t.bottom = t.top + i.clientHeight, t.right = t.left + i.clientWidth, t.width = i.clientWidth, t.height = i.clientHeight, t.x = t.left, t.y = t.top, t;
}
function iu(i, e, t) {
  return e === Sg ? Ho(Cv(i, t)) : gi(e) ? kv(e, t) : Ho(Sv(Ft(i)));
}
function Ev(i) {
  var e = fn(ds(i)), t = ["absolute", "fixed"].indexOf(tt(i).position) >= 0, n = t && ze(i) ? Dn(i) : i;
  return gi(n) ? e.filter(function(r) {
    return gi(r) && xg(r, n) && pt(r) !== "body";
  }) : [];
}
function xv(i, e, t, n) {
  var r = e === "clippingParents" ? Ev(i) : [].concat(e), s = [].concat(r, [t]), o = s[0], a = s.reduce(function(l, h) {
    var c = iu(i, h, n);
    return l.top = oi(c.top, l.top), l.right = Ur(c.right, l.right), l.bottom = Ur(c.bottom, l.bottom), l.left = oi(c.left, l.left), l;
  }, iu(i, o, n));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
}
function Rg(i) {
  var e = i.reference, t = i.element, n = i.placement, r = n ? et(n) : null, s = n ? Ni(n) : null, o = e.x + e.width / 2 - t.width / 2, a = e.y + e.height / 2 - t.height / 2, l;
  switch (r) {
    case Re:
      l = {
        x: o,
        y: e.y - t.height
      };
      break;
    case Fe:
      l = {
        x: o,
        y: e.y + e.height
      };
      break;
    case He:
      l = {
        x: e.x + e.width,
        y: a
      };
      break;
    case De:
      l = {
        x: e.x - t.width,
        y: a
      };
      break;
    default:
      l = {
        x: e.x,
        y: e.y
      };
  }
  var h = r ? Na(r) : null;
  if (h != null) {
    var c = h === "y" ? "height" : "width";
    switch (s) {
      case Xi:
        l[h] = l[h] - (e[c] / 2 - t[c] / 2);
        break;
      case Cn:
        l[h] = l[h] + (e[c] / 2 - t[c] / 2);
        break;
    }
  }
  return l;
}
function Sn(i, e) {
  e === void 0 && (e = {});
  var t = e, n = t.placement, r = n === void 0 ? i.placement : n, s = t.strategy, o = s === void 0 ? i.strategy : s, a = t.boundary, l = a === void 0 ? Hw : a, h = t.rootBoundary, c = h === void 0 ? Sg : h, u = t.elementContext, f = u === void 0 ? _i : u, d = t.altBoundary, g = d === void 0 ? !1 : d, p = t.padding, O = p === void 0 ? 0 : p, m = Ig(typeof O != "number" ? O : Tg(O, Rn)), w = f === _i ? Jw : _i, C = i.rects.popper, Q = i.elements[g ? w : f], b = xv(gi(Q) ? Q : Q.contextElement || Ft(i.elements.popper), l, c, o), v = Zi(i.elements.reference), S = Rg({
    reference: v,
    element: C,
    strategy: "absolute",
    placement: r
  }), L = Ho(Object.assign({}, C, S)), x = f === _i ? L : v, B = {
    top: b.top - x.top + m.top,
    bottom: x.bottom - b.bottom + m.bottom,
    left: b.left - x.left + m.left,
    right: x.right - b.right + m.right
  }, D = i.modifiersData.offset;
  if (f === _i && D) {
    var Z = D[r];
    Object.keys(B).forEach(function(X) {
      var H = [He, Fe].indexOf(X) >= 0 ? 1 : -1, U = [Re, Fe].indexOf(X) >= 0 ? "y" : "x";
      B[X] += Z[U] * H;
    });
  }
  return B;
}
function Bv(i, e) {
  e === void 0 && (e = {});
  var t = e, n = t.placement, r = t.boundary, s = t.rootBoundary, o = t.padding, a = t.flipVariations, l = t.allowedAutoPlacements, h = l === void 0 ? kg : l, c = Ni(n), u = c ? a ? $c : $c.filter(function(g) {
    return Ni(g) === c;
  }) : Rn, f = u.filter(function(g) {
    return h.indexOf(g) >= 0;
  });
  f.length === 0 && (f = u, process.env.NODE_ENV !== "production" && console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" ")));
  var d = f.reduce(function(g, p) {
    return g[p] = Sn(i, {
      placement: p,
      boundary: r,
      rootBoundary: s,
      padding: o
    })[et(p)], g;
  }, {});
  return Object.keys(d).sort(function(g, p) {
    return d[g] - d[p];
  });
}
function Iv(i) {
  if (et(i) === fs)
    return [];
  var e = gr(i);
  return [tu(i), e, tu(e)];
}
function Tv(i) {
  var e = i.state, t = i.options, n = i.name;
  if (!e.modifiersData[n]._skip) {
    for (var r = t.mainAxis, s = r === void 0 ? !0 : r, o = t.altAxis, a = o === void 0 ? !0 : o, l = t.fallbackPlacements, h = t.padding, c = t.boundary, u = t.rootBoundary, f = t.altBoundary, d = t.flipVariations, g = d === void 0 ? !0 : d, p = t.allowedAutoPlacements, O = e.options.placement, m = et(O), w = m === O, C = l || (w || !g ? [gr(O)] : Iv(O)), Q = [O].concat(C).reduce(function(it, wt) {
      return it.concat(et(wt) === fs ? Bv(e, {
        placement: wt,
        boundary: c,
        rootBoundary: u,
        padding: h,
        flipVariations: g,
        allowedAutoPlacements: p
      }) : wt);
    }, []), b = e.rects.reference, v = e.rects.popper, S = /* @__PURE__ */ new Map(), L = !0, x = Q[0], B = 0; B < Q.length; B++) {
      var D = Q[B], Z = et(D), X = Ni(D) === Xi, H = [Re, Fe].indexOf(Z) >= 0, U = H ? "width" : "height", V = Sn(e, {
        placement: D,
        boundary: c,
        rootBoundary: u,
        altBoundary: f,
        padding: h
      }), ee = H ? X ? He : De : X ? Fe : Re;
      b[U] > v[U] && (ee = gr(ee));
      var se = gr(ee), ce = [];
      if (s && ce.push(V[Z] <= 0), a && ce.push(V[ee] <= 0, V[se] <= 0), ce.every(function(it) {
        return it;
      })) {
        x = D, L = !1;
        break;
      }
      S.set(D, ce);
    }
    if (L)
      for (var Be = g ? 3 : 1, Ke = function(it) {
        var wt = Q.find(function(Wn) {
          var qi = S.get(Wn);
          if (qi)
            return qi.slice(0, it).every(function(pi) {
              return pi;
            });
        });
        if (wt)
          return x = wt, "break";
      }, Ue = Be; Ue > 0; Ue--) {
        var yt = Ke(Ue);
        if (yt === "break")
          break;
      }
    e.placement !== x && (e.modifiersData[n]._skip = !0, e.placement = x, e.reset = !0);
  }
}
const Pv = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Tv,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function nu(i, e, t) {
  return t === void 0 && (t = {
    x: 0,
    y: 0
  }), {
    top: i.top - e.height - t.y,
    right: i.right - e.width + t.x,
    bottom: i.bottom - e.height + t.y,
    left: i.left - e.width - t.x
  };
}
function ru(i) {
  return [Re, He, Fe, De].some(function(e) {
    return i[e] >= 0;
  });
}
function Rv(i) {
  var e = i.state, t = i.name, n = e.rects.reference, r = e.rects.popper, s = e.modifiersData.preventOverflow, o = Sn(e, {
    elementContext: "reference"
  }), a = Sn(e, {
    altBoundary: !0
  }), l = nu(o, n), h = nu(a, r, s), c = ru(l), u = ru(h);
  e.modifiersData[t] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: h,
    isReferenceHidden: c,
    hasPopperEscaped: u
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": c,
    "data-popper-escaped": u
  });
}
const Dv = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Rv
};
function Lv(i, e, t) {
  var n = et(i), r = [De, Re].indexOf(n) >= 0 ? -1 : 1, s = typeof t == "function" ? t(Object.assign({}, e, {
    placement: i
  })) : t, o = s[0], a = s[1];
  return o = o || 0, a = (a || 0) * r, [De, He].indexOf(n) >= 0 ? {
    x: a,
    y: o
  } : {
    x: o,
    y: a
  };
}
function Wv(i) {
  var e = i.state, t = i.options, n = i.name, r = t.offset, s = r === void 0 ? [0, 0] : r, o = kg.reduce(function(c, u) {
    return c[u] = Lv(u, e.rects, s), c;
  }, {}), a = o[e.placement], l = a.x, h = a.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += l, e.modifiersData.popperOffsets.y += h), e.modifiersData[n] = o;
}
const Mv = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Wv
};
function Xv(i) {
  var e = i.state, t = i.name;
  e.modifiersData[t] = Rg({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const jv = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Xv,
  data: {}
};
function Zv(i) {
  return i === "x" ? "y" : "x";
}
function Nv(i) {
  var e = i.state, t = i.options, n = i.name, r = t.mainAxis, s = r === void 0 ? !0 : r, o = t.altAxis, a = o === void 0 ? !1 : o, l = t.boundary, h = t.rootBoundary, c = t.altBoundary, u = t.padding, f = t.tether, d = f === void 0 ? !0 : f, g = t.tetherOffset, p = g === void 0 ? 0 : g, O = Sn(e, {
    boundary: l,
    rootBoundary: h,
    padding: u,
    altBoundary: c
  }), m = et(e.placement), w = Ni(e.placement), C = !w, Q = Na(m), b = Zv(Q), v = e.modifiersData.popperOffsets, S = e.rects.reference, L = e.rects.popper, x = typeof p == "function" ? p(Object.assign({}, e.rects, {
    placement: e.placement
  })) : p, B = typeof x == "number" ? {
    mainAxis: x,
    altAxis: x
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, x), D = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, Z = {
    x: 0,
    y: 0
  };
  if (v) {
    if (s) {
      var X, H = Q === "y" ? Re : De, U = Q === "y" ? Fe : He, V = Q === "y" ? "height" : "width", ee = v[Q], se = ee + O[H], ce = ee - O[U], Be = d ? -L[V] / 2 : 0, Ke = w === Xi ? S[V] : L[V], Ue = w === Xi ? -L[V] : -S[V], yt = e.elements.arrow, it = d && yt ? Za(yt) : {
        width: 0,
        height: 0
      }, wt = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : Bg(), Wn = wt[H], qi = wt[U], pi = un(0, S[V], it[V]), zg = C ? S[V] / 2 - Be - pi - Wn - B.mainAxis : Ke - pi - Wn - B.mainAxis, Ug = C ? -S[V] / 2 + Be + pi + qi + B.mainAxis : Ue + pi + qi + B.mainAxis, As = e.elements.arrow && Dn(e.elements.arrow), Vg = As ? Q === "y" ? As.clientTop || 0 : As.clientLeft || 0 : 0, Sl = (X = D == null ? void 0 : D[Q]) != null ? X : 0, Yg = ee + zg - Sl - Vg, qg = ee + Ug - Sl, kl = un(d ? Ur(se, Yg) : se, ee, d ? oi(ce, qg) : ce);
      v[Q] = kl, Z[Q] = kl - ee;
    }
    if (a) {
      var El, Gg = Q === "x" ? Re : De, Fg = Q === "x" ? Fe : He, Jt = v[b], Mn = b === "y" ? "height" : "width", xl = Jt + O[Gg], Bl = Jt - O[Fg], ps = [Re, De].indexOf(m) !== -1, Il = (El = D == null ? void 0 : D[b]) != null ? El : 0, Tl = ps ? xl : Jt - S[Mn] - L[Mn] - Il + B.altAxis, Pl = ps ? Jt + S[Mn] + L[Mn] - Il - B.altAxis : Bl, Rl = d && ps ? uv(Tl, Jt, Pl) : un(d ? Tl : xl, Jt, d ? Pl : Bl);
      v[b] = Rl, Z[b] = Rl - Jt;
    }
    e.modifiersData[n] = Z;
  }
}
const zv = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Nv,
  requiresIfExists: ["offset"]
};
function Uv(i) {
  return {
    scrollLeft: i.scrollLeft,
    scrollTop: i.scrollTop
  };
}
function Vv(i) {
  return i === Je(i) || !ze(i) ? za(i) : Uv(i);
}
function Yv(i) {
  var e = i.getBoundingClientRect(), t = ji(e.width) / i.offsetWidth || 1, n = ji(e.height) / i.offsetHeight || 1;
  return t !== 1 || n !== 1;
}
function qv(i, e, t) {
  t === void 0 && (t = !1);
  var n = ze(e), r = ze(e) && Yv(e), s = Ft(e), o = Zi(i, r, t), a = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 0,
    y: 0
  };
  return (n || !n && !t) && ((pt(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Va(s)) && (a = Vv(e)), ze(e) ? (l = Zi(e, !0), l.x += e.clientLeft, l.y += e.clientTop) : s && (l.x = Ua(s))), {
    x: o.left + a.scrollLeft - l.x,
    y: o.top + a.scrollTop - l.y,
    width: o.width,
    height: o.height
  };
}
function Gv(i) {
  var e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set(), n = [];
  i.forEach(function(s) {
    e.set(s.name, s);
  });
  function r(s) {
    t.add(s.name);
    var o = [].concat(s.requires || [], s.requiresIfExists || []);
    o.forEach(function(a) {
      if (!t.has(a)) {
        var l = e.get(a);
        l && r(l);
      }
    }), n.push(s);
  }
  return i.forEach(function(s) {
    t.has(s.name) || r(s);
  }), n;
}
function Fv(i) {
  var e = Gv(i);
  return Go.reduce(function(t, n) {
    return t.concat(e.filter(function(r) {
      return r.phase === n;
    }));
  }, []);
}
function Hv(i) {
  var e;
  return function() {
    return e || (e = new Promise(function(t) {
      Promise.resolve().then(function() {
        e = void 0, t(i());
      });
    })), e;
  };
}
function Rt(i) {
  for (var e = arguments.length, t = new Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++)
    t[n - 1] = arguments[n];
  return [].concat(t).reduce(function(r, s) {
    return r.replace(/%s/, s);
  }, i);
}
var _t = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s', Jv = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available', su = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
function Kv(i) {
  i.forEach(function(e) {
    [].concat(Object.keys(e), su).filter(function(t, n, r) {
      return r.indexOf(t) === n;
    }).forEach(function(t) {
      switch (t) {
        case "name":
          typeof e.name != "string" && console.error(Rt(_t, String(e.name), '"name"', '"string"', '"' + String(e.name) + '"'));
          break;
        case "enabled":
          typeof e.enabled != "boolean" && console.error(Rt(_t, e.name, '"enabled"', '"boolean"', '"' + String(e.enabled) + '"'));
          break;
        case "phase":
          Go.indexOf(e.phase) < 0 && console.error(Rt(_t, e.name, '"phase"', "either " + Go.join(", "), '"' + String(e.phase) + '"'));
          break;
        case "fn":
          typeof e.fn != "function" && console.error(Rt(_t, e.name, '"fn"', '"function"', '"' + String(e.fn) + '"'));
          break;
        case "effect":
          e.effect != null && typeof e.effect != "function" && console.error(Rt(_t, e.name, '"effect"', '"function"', '"' + String(e.fn) + '"'));
          break;
        case "requires":
          e.requires != null && !Array.isArray(e.requires) && console.error(Rt(_t, e.name, '"requires"', '"array"', '"' + String(e.requires) + '"'));
          break;
        case "requiresIfExists":
          Array.isArray(e.requiresIfExists) || console.error(Rt(_t, e.name, '"requiresIfExists"', '"array"', '"' + String(e.requiresIfExists) + '"'));
          break;
        case "options":
        case "data":
          break;
        default:
          console.error('PopperJS: an invalid property has been provided to the "' + e.name + '" modifier, valid properties are ' + su.map(function(n) {
            return '"' + n + '"';
          }).join(", ") + '; but "' + t + '" was provided.');
      }
      e.requires && e.requires.forEach(function(n) {
        i.find(function(r) {
          return r.name === n;
        }) == null && console.error(Rt(Jv, String(e.name), n, n));
      });
    });
  });
}
function $v(i, e) {
  var t = /* @__PURE__ */ new Set();
  return i.filter(function(n) {
    var r = e(n);
    if (!t.has(r))
      return t.add(r), !0;
  });
}
function _v(i) {
  var e = i.reduce(function(t, n) {
    var r = t[n.name];
    return t[n.name] = r ? Object.assign({}, r, n, {
      options: Object.assign({}, r.options, n.options),
      data: Object.assign({}, r.data, n.data)
    }) : n, t;
  }, {});
  return Object.keys(e).map(function(t) {
    return e[t];
  });
}
var ou = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.", e1 = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.", au = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function lu() {
  for (var i = arguments.length, e = new Array(i), t = 0; t < i; t++)
    e[t] = arguments[t];
  return !e.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function t1(i) {
  i === void 0 && (i = {});
  var e = i, t = e.defaultModifiers, n = t === void 0 ? [] : t, r = e.defaultOptions, s = r === void 0 ? au : r;
  return function(o, a, l) {
    l === void 0 && (l = s);
    var h = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, au, s),
      modifiersData: {},
      elements: {
        reference: o,
        popper: a
      },
      attributes: {},
      styles: {}
    }, c = [], u = !1, f = {
      state: h,
      setOptions: function(p) {
        var O = typeof p == "function" ? p(h.options) : p;
        g(), h.options = Object.assign({}, s, h.options, O), h.scrollParents = {
          reference: gi(o) ? fn(o) : o.contextElement ? fn(o.contextElement) : [],
          popper: fn(a)
        };
        var m = Fv(_v([].concat(n, h.options.modifiers)));
        if (h.orderedModifiers = m.filter(function(x) {
          return x.enabled;
        }), process.env.NODE_ENV !== "production") {
          var w = $v([].concat(m, h.options.modifiers), function(x) {
            var B = x.name;
            return B;
          });
          if (Kv(w), et(h.options.placement) === fs) {
            var C = h.orderedModifiers.find(function(x) {
              var B = x.name;
              return B === "flip";
            });
            C || console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
          }
          var Q = tt(a), b = Q.marginTop, v = Q.marginRight, S = Q.marginBottom, L = Q.marginLeft;
          [b, v, S, L].some(function(x) {
            return parseFloat(x);
          }) && console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
        }
        return d(), f.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!u) {
          var p = h.elements, O = p.reference, m = p.popper;
          if (!lu(O, m)) {
            process.env.NODE_ENV !== "production" && console.error(ou);
            return;
          }
          h.rects = {
            reference: qv(O, Dn(m), h.options.strategy === "fixed"),
            popper: Za(m)
          }, h.reset = !1, h.placement = h.options.placement, h.orderedModifiers.forEach(function(x) {
            return h.modifiersData[x.name] = Object.assign({}, x.data);
          });
          for (var w = 0, C = 0; C < h.orderedModifiers.length; C++) {
            if (process.env.NODE_ENV !== "production" && (w += 1, w > 100)) {
              console.error(e1);
              break;
            }
            if (h.reset === !0) {
              h.reset = !1, C = -1;
              continue;
            }
            var Q = h.orderedModifiers[C], b = Q.fn, v = Q.options, S = v === void 0 ? {} : v, L = Q.name;
            typeof b == "function" && (h = b({
              state: h,
              options: S,
              name: L,
              instance: f
            }) || h);
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Hv(function() {
        return new Promise(function(p) {
          f.forceUpdate(), p(h);
        });
      }),
      destroy: function() {
        g(), u = !0;
      }
    };
    if (!lu(o, a))
      return process.env.NODE_ENV !== "production" && console.error(ou), f;
    f.setOptions(l).then(function(p) {
      !u && l.onFirstUpdate && l.onFirstUpdate(p);
    });
    function d() {
      h.orderedModifiers.forEach(function(p) {
        var O = p.name, m = p.options, w = m === void 0 ? {} : m, C = p.effect;
        if (typeof C == "function") {
          var Q = C({
            state: h,
            name: O,
            instance: f,
            options: w
          }), b = function() {
          };
          c.push(Q || b);
        }
      });
    }
    function g() {
      c.forEach(function(p) {
        return p();
      }), c = [];
    }
    return f;
  };
}
var i1 = [yv, jv, Qv, lv, Mv, Pv, zv, Av, Dv], n1 = /* @__PURE__ */ t1({
  defaultModifiers: i1
});
const r1 = {
  props: {
    componentPrefix: String,
    size: String,
    sizePrefix: String
  },
  computed: {
    sizeableClassPrefix() {
      return this.sizePrefix || this.componentPrefix;
    },
    hasSizeablePrefix() {
      return this.size === void 0 ? !1 : !!this.size.match(new RegExp(`^${this.sizeableClassPrefix}`));
    },
    sizeableClass() {
      return this.size ? !this.sizeableClassPrefix || this.hasSizeablePrefix ? this.size : `${this.sizeableClassPrefix}-${this.size}` : "";
    }
  }
}, s1 = {
  props: {
    componentPrefix: String,
    variant: String,
    variantPrefix: String
  },
  computed: {
    variantClassPrefix() {
      return this.variantPrefix || this.componentPrefix;
    },
    hasVariantPrefix() {
      return this.variant === void 0 ? !1 : !!this.variant.match(new RegExp(`^${this.variantClassPrefix}`));
    },
    variantClass() {
      return this.variant ? !this.variantClassPrefix || this.hasVariantPrefix ? this.variant : `${this.variantClassPrefix}-${this.variant}` : "";
    }
  }
}, o1 = Ce({
  mixins: [r1, s1],
  props: {
    active: Boolean,
    block: Boolean,
    componentPrefix: {
      type: String,
      default: "btn"
    },
    disabled: Boolean,
    label: String,
    outline: Boolean,
    tag: String,
    variant: {
      type: String,
      default: "primary"
    }
  },
  computed: {
    classes() {
      return ["btn", this.variantClass, this.sizeableClass, this.active && "active", this.block && "btn-block", this.disabled && "disabled"];
    },
    component() {
      return this.tag ? this.tag : this.$attrs.href ? "a" : "button";
    },
    variantClassPrefix() {
      return (this.variantPrefix || this.componentPrefix) + (this.outline ? "-outline" : "");
    }
  }
}), a1 = (i, e) => {
  const t = i.__vccOpts || i;
  for (const [n, r] of e)
    t[n] = r;
  return t;
};
function l1(i, e, t, n, r, s) {
  return j(), fe(Yr(i.component), ai(i.$attrs, {
    disabled: i.disabled,
    class: i.classes,
    role: "button"
  }), {
    default: z(() => [N(i.$slots, "default", {}, () => [gt(ke(i.label), 1)])]),
    _: 3
  }, 16, ["disabled", "class"]);
}
const h1 = /* @__PURE__ */ a1(o1, [["render", l1]]), c1 = Ce({
  props: {
    componentPrefix: String,
    size: String,
    sizePrefix: String
  },
  computed: {
    sizeableClassPrefix() {
      return this.sizePrefix || this.componentPrefix;
    },
    hasSizeablePrefix() {
      return this.size === void 0 ? !1 : !!this.size.match(new RegExp(`^${this.sizeableClassPrefix}`));
    },
    sizeableClass() {
      return this.size ? !this.sizeableClassPrefix || this.hasSizeablePrefix ? this.size : `${this.sizeableClassPrefix}-${this.size}` : "";
    }
  }
}), u1 = Ce({
  name: "BtnGroup",
  mixins: [c1],
  props: {
    /**
     * The size prefix.
     *
     * @param {String}
     */
    sizePrefix: {
      type: String,
      default() {
        return "btn-group";
      }
    },
    /**
     * Denote the button group as toggle buttons
     *
     * @type {Boolean}
     */
    toggle: Boolean,
    /**
     * Display the buttons vertically
     *
     * @type {Boolean}
     */
    vertical: Boolean
  },
  computed: {
    classes() {
      return {
        "btn-group": !this.vertical,
        "btn-group-toggle": this.toggle,
        "btn-group-vertical": this.vertical,
        [this.sizeableClass]: !!this.size
      };
    }
  }
}), f1 = (i, e) => {
  const t = i.__vccOpts || i;
  for (const [n, r] of e)
    t[n] = r;
  return t;
}, d1 = ["data-toggle"];
function g1(i, e, t, n, r, s) {
  return j(), ie("div", {
    class: lt(i.classes),
    "data-toggle": i.toggle ? "buttons" : !1,
    role: "group"
  }, [N(i.$slots, "default")], 10, d1);
}
const A1 = /* @__PURE__ */ f1(u1, [["render", g1]]);
Ce({
  name: "BtnGroupToggle"
});
function $s(i, e) {
  i.props.class = `${i.props.class || ""} ${e}`.trim();
}
function Dg(i) {
  for (const e of i) {
    e.type === _s && Dg(e.children), e.props = Object.assign({
      class: void 0
    }, e.props), e.attrs = Object.assign({}, e.attrs), e.attrs.on || (e.attrs.on = {});
    const t = e.props.class && e.props.class.match(/dropdown-item/), n = e.props.class && e.props.class.match(/dropdown-divider/);
    typeof e.type == "string" && e.type.match(/^h\d$/) ? $s(e, "dropdown-header") : e.type === "hr" && !n ? (e.type = "div", $s(e, "dropdown-divider")) : !t && !n && $s(e, "dropdown-item");
  }
  return i;
}
const p1 = (i, e) => Kg("div", {}, Dg(e.slots.default())), O1 = Ce({
  name: "DropdownMenu",
  components: {
    DropdownMenuItems: p1
  },
  props: {
    /**
     * Display the dropdown menu aligned left or right
     *
     * @property String
     */
    align: {
      type: String,
      default: "left",
      validate(i) {
        return ["left", "right"].indexOf(i.toLowerCase()) !== -1;
      }
    },
    /**
     * The default visibility of the dropdown menu.
     *
     * @property Object
     */
    show: Boolean
  }
}), m1 = (i, e) => {
  const t = i.__vccOpts || i;
  for (const [n, r] of e)
    t[n] = r;
  return t;
}, Q1 = ["aria-labelledby"];
function b1(i, e, t, n, r, s) {
  const o = $("dropdown-menu-items");
  return j(), ie("div", {
    class: lt(["dropdown-menu", {
      "dropdown-menu-left": i.align === "left",
      "dropdown-menu-right": i.align === "right",
      show: i.show
    }]),
    "aria-labelledby": i.$attrs.id
  }, [de(o, null, {
    default: z(() => [N(i.$slots, "default")]),
    _: 3
  })], 10, Q1);
}
const y1 = /* @__PURE__ */ m1(O1, [["render", b1]]), w1 = Ce({
  props: {
    expanded: {
      type: Boolean,
      default: !1
    },
    id: {
      type: String,
      default: void 0
    },
    href: {
      type: String,
      default: void 0
    },
    to: {
      type: [String, Object],
      default: void 0
    }
  },
  computed: {
    is() {
      return this.to ? "router-link" : this.href ? "a" : "button";
    }
  }
}), gs = (i, e) => {
  const t = i.__vccOpts || i;
  for (const [n, r] of e)
    t[n] = r;
  return t;
};
function v1(i, e, t, n, r, s) {
  return j(), fe(Yr(i.is), ai({ id: i.id }, i.to ? { to: i.to } : { href: i.href }, {
    "aria-haspopup": "true",
    "aria-expanded": i.expanded,
    type: i.is === "button" ? "button" : void 0
  }), {
    default: z(() => [
      N(i.$slots, "default")
    ]),
    _: 3
  }, 16, ["id", "aria-expanded", "type"]);
}
const C1 = /* @__PURE__ */ gs(w1, [["render", v1]]), Lg = {
  components: {
    BtnDropdownAction: C1,
    BtnGroup: A1,
    DropdownMenu: y1
  },
  extends: h1,
  emits: [
    "click-toggle",
    "show",
    "hide",
    "toggle"
  ],
  props: {
    /**
     * Display the dropdown menu aligned left or right
     *
     * @property String
     */
    align: {
      type: String,
      default: "left",
      validate(i) {
        return ["left", "right"].indexOf(i.toLowerCase()) !== -1;
      }
    },
    /**
     * Should animate the dropdown opening.
     *
     * @property {Boolean}
     */
    animated: {
      type: Boolean,
      default: !0
    },
    /**
     * Additional button classes.
     * 
     * @property {Object|String}
     */
    buttonClass: [Object, String],
    /**
     * Show the caret.
     *
     * @property {Boolean}
     */
    caret: {
      type: Boolean,
      default: !0
    },
    /**
     * Should display the toggle button as a circle.
     *
     * @property Boolean
     */
    // circle: {
    //     type: Boolean,
    //     default: false
    // },
    /**
     * Display as a dropup instead of a dropdown.
     *
     * @property Boolean
     */
    dropup: {
      type: Boolean,
      default: !1
    },
    /**
     * Display as a dropright instead of a dropdown.
     *
     * @property Boolean
     */
    dropright: {
      type: Boolean,
      default: !1
    },
    /**
     * Display as a dropleft instead of a dropdown.
     *
     * @property Boolean
     */
    dropleft: {
      type: Boolean,
      default: !1
    },
    /**
     * The action height.
     *
     * @property {String}
     */
    height: String,
    /**
     * The href action.
     *
     * @property {String}
     */
    href: String,
    /**
     * Is the dropdown a nav item?
     *
     * @property {Boolean}
     */
    nav: Boolean,
    /**
     * The toggle button's label. If not defined as an attribute,
     * you can override with the component's slot (inner html).
     *
     * @property {String}
     */
    label: String,
    offset: {
      type: Number,
      default: 5
    },
    /**
     * Should rotate the toggle button when opened.
     *
     * @property {Boolean}
     */
    rotate: {
      type: Boolean,
      default: !1
    },
    /**
     * Display the dropdown button with a split toggle button.
     *
     * @property {Boolean}
     */
    split: {
      type: Boolean,
      default: !1
    },
    /**
     * The "to" path, used for vue-router.
     *
     * @property {String|Object}
     */
    to: [String, Object],
    /**
     * The button type attribute.
     *
     * @property {String}
     */
    type: {
      type: String,
      default: "button"
    },
    /**
     * The action width.
     *
     * @property {String}
     */
    width: String
  },
  data() {
    return {
      popper: null,
      triggerAnimation: !1,
      expanded: !1
    };
  },
  computed: {
    scope() {
      return {
        // Pass the computed props.
        placement: this.placement,
        variantClassPrefix: this.variantClassPrefix,
        sizeableClassPrefix: this.sizeableClassPrefix,
        classes: this.classes,
        actionClasses: this.actionClasses,
        toggleStyle: this.toggleStyle,
        toggleClasses: this.toggleClasses,
        // Pass the methods                
        focus: this.focus,
        queryFocusable: this.queryFocusable,
        isFocusable: this.isFocusable,
        toggle: this.toggle,
        show: this.show,
        hide: this.hide,
        onBlur: this.onBlur,
        onClickItem: this.onClickItem,
        onClickToggle: this.onClickToggle,
        expanded: this.expanded
      };
    },
    placement() {
      return this.dropup ? "top" : this.dropleft ? "left" : this.dropright ? "right" : "bottom";
    },
    variantClassPrefix() {
      return "btn" + (this.outline ? "-outline" : "");
    },
    sizeableClassPrefix() {
      return "btn";
    },
    classes() {
      return {
        dropdown: this.dropup && this.dropright && this.dropleft,
        dropup: this.dropup,
        dropright: this.dropright,
        dropleft: this.dropleft,
        "icon-only": !this.nav && !this.split && !!this.$slots.icon && !this.$slots.label,
        "hide-caret": !this.caret,
        expanded: this.expanded,
        "rotate-90": !this.nav && this.split && this.rotate && this.expanded
      };
    },
    actionClasses() {
      return Object.assign({
        btn: !this.nav,
        [this.variantClass]: !this.nav && !!this.variant,
        [this.sizeableClass]: !!this.size
      }, typeof this.buttonClass == "object" ? this.buttonClass : {
        [this.buttonClass]: !!this.buttonClass
      });
    },
    toggleStyle() {
      return {
        width: this.width,
        height: this.height
      };
    },
    toggleClasses() {
      return Object.assign({
        active: this.active,
        btn: !this.nav,
        "btn-block": !!this.block,
        "nav-link": !!this.nav,
        "rotate-90": !this.split && this.rotate && this.expanded,
        "dropdown-toggle": !0,
        "dropdown-toggle-split": !this.nav && this.split,
        [this.variantClass]: !this.nav && !!this.variant,
        [this.sizeableClass]: !!this.size
      }, typeof this.buttonClass == "object" ? this.buttonClass : {
        [this.buttonClass]: !!this.buttonClass
      });
    }
  },
  beforeUnmount() {
    this.popper && this.popper.destroy();
  },
  methods: {
    /**
     * Focus on the the dropdown toggle button
     *
     * @return void
     */
    focus() {
      this.$el.querySelector(".dropdown-toggle").focus();
    },
    /**
     * Focus on the the dropdown toggle button
     *
     * @return void
     */
    queryFocusable() {
      return this.$el.querySelector(".dropdown-menu").querySelectorAll('label, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    },
    /**
     * Method to check if the given element is focusable.
     *
     * @return void
     */
    isFocusable(i) {
      const e = this.queryFocusable();
      for (const t in e)
        if (i === e[t])
          return !0;
      return !1;
    },
    /**
     * Toggle the dropdown menu
     *
     * @return void
     */
    toggle() {
      this.expanded ? this.hide() : this.show();
    },
    /**
     * Show the dropdown menu
     *
     * @return void
     */
    show() {
      this.expanded = !0;
      const i = this.$refs.split && this.$refs.split.$el || this.$el;
      !this.nav && !this.popper ? this.popper = n1(i, this.$refs.menu.$el, {
        placement: `${this.placement}-${this.align === "left" ? "start" : "end"}`,
        onFirstUpdate: () => {
          this.triggerAnimation = this.animated;
        },
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, this.nav ? 1 : this.offset]
              // offset: ['.125rem', !this.nav ? 4 : 1],
            }
          }
        ]
      }) : this.popper && this.popper.update();
    },
    /**
     * Hide the dropdown menu
     *
     * @return void
     */
    hide() {
      this.expanded = !1;
    },
    /**
     * A callback function for the `blur-item` event.
     *
     * @return void
     */
    onBlur(i) {
      (!this.$refs.menu.$el.contains(i.relatedTarget) || !this.$el.contains(i.relatedTarget)) && this.hide();
    },
    onClickDocument(i) {
      this.$el.contains(i.target) || this.hide();
    },
    /**
     * A callback function for the `click-item` event.
     *
     * @return void
     */
    onClickItem(i) {
      this.isFocusable(i.target) || this.hide();
    },
    /**
     * A callback function for the `click-toggle` event.
     *
     * @return void
     */
    onClickToggle(i) {
      i.target.dispatchEvent(new Event("focus", i)), this.$emit("click-toggle", i), i.defaultPrevented || this.toggle();
    },
    onKeydown(i) {
      i.target.parentElement.lastElementChild === i.target && this.hide();
    }
  },
  watch: {
    expanded(i) {
      this.$nextTick(() => {
        this.$emit(i ? "show" : "hide"), this.$emit("toggle", i);
      }), setTimeout(() => {
        i ? document.addEventListener("click", this.onClickDocument) : document.removeEventListener("click", this.onClickDocument);
      });
    }
  }
}, S1 = Ce({
  mixins: [
    Lg
  ]
});
function k1(i, e, t, n, r, s) {
  const o = $("btn-dropdown-action"), a = $("dropdown-menu"), l = $("btn-group");
  return j(), fe(l, {
    class: lt(i.classes)
  }, {
    default: z(() => [
      N(i.$slots, "button", ni(gn(i.scope)), () => [
        de(o, {
          id: i.$attrs.id,
          ref: "button",
          expanded: i.expanded,
          href: i.href,
          to: i.to,
          style: gu(i.toggleStyle),
          class: lt(i.toggleClasses),
          onBlur: i.onBlur,
          onClick: i.onClickToggle
        }, {
          default: z(() => [
            N(i.$slots, "icon"),
            N(i.$slots, "label", {}, () => [
              gt(ke(i.label), 1)
            ])
          ]),
          _: 3
        }, 8, ["id", "expanded", "href", "to", "style", "class", "onBlur", "onClick"])
      ]),
      de(a, {
        id: i.$attrs.id,
        ref: "menu",
        align: i.align,
        show: i.expanded,
        class: lt({ animated: i.triggerAnimation }),
        onBlur: i.onBlur,
        onClick: i.onClickItem,
        onKeydown: Au(i.onKeydown, ["tab"]),
        onMousedown: e[0] || (e[0] = pu(() => {
        }, ["prevent"]))
      }, {
        default: z(() => [
          N(i.$slots, "default")
        ]),
        _: 3
      }, 8, ["id", "align", "show", "class", "onBlur", "onClick", "onKeydown"])
    ]),
    _: 3
  }, 8, ["class"]);
}
const E1 = /* @__PURE__ */ gs(S1, [["render", k1]]), x1 = Ce({
  mixins: [
    Lg
  ],
  emits: [
    "click"
  ]
}), B1 = ["id", "aria-expanded"];
function I1(i, e, t, n, r, s) {
  const o = $("btn-dropdown-action"), a = $("dropdown-menu"), l = $("btn-group");
  return j(), fe(l, {
    class: lt([i.classes, "btn-dropdown-split"])
  }, {
    default: z(() => [
      i.dropleft ? ue("", !0) : N(i.$slots, "button", ni(ai({ key: 0 }, i.scope)), () => [
        i.dropleft ? ue("", !0) : (j(), fe(o, {
          key: 0,
          id: i.$attrs.id,
          ref: "button",
          expanded: i.expanded,
          href: i.href,
          to: i.to,
          class: lt(i.actionClasses),
          onClick: e[0] || (e[0] = (h) => i.$emit("click", h))
        }, {
          default: z(() => [
            N(i.$slots, "icon"),
            N(i.$slots, "label", {}, () => [
              gt(ke(i.label), 1)
            ])
          ]),
          _: 3
        }, 8, ["id", "expanded", "href", "to", "class"]))
      ]),
      de(l, { ref: "split" }, {
        default: z(() => [
          N(i.$slots, "split", ni(gn(i.scope)), () => [
            i.split ? (j(), ie("button", {
              key: 0,
              id: i.$attrs.id,
              type: "button",
              "aria-haspopup": "true",
              "aria-expanded": i.expanded,
              class: lt(i.toggleClasses),
              onBlur: e[1] || (e[1] = (...h) => i.onBlur && i.onBlur(...h)),
              onClick: e[2] || (e[2] = (...h) => i.onClickToggle && i.onClickToggle(...h))
            }, null, 42, B1)) : ue("", !0)
          ]),
          de(a, {
            id: i.$attrs.id,
            ref: "menu",
            align: i.align,
            show: i.expanded,
            class: lt({ animated: i.triggerAnimation }),
            onBlur: i.onBlur,
            onClick: i.onClickItem,
            onKeydown: Au(i.onKeydown, ["tab"]),
            onMousedown: e[3] || (e[3] = pu(() => {
            }, ["prevent"]))
          }, {
            default: z(() => [
              N(i.$slots, "default")
            ]),
            _: 3
          }, 8, ["id", "align", "show", "class", "onBlur", "onClick", "onKeydown"])
        ]),
        _: 3
      }, 512),
      i.dropleft ? N(i.$slots, "button", ni(ai({ key: 1 }, i.scope)), () => [
        i.dropleft ? (j(), fe(o, {
          key: 0,
          id: i.$attrs.id,
          ref: "button",
          expanded: i.expanded,
          href: i.href,
          to: i.to,
          class: lt(i.actionClasses),
          onClick: e[4] || (e[4] = (h) => i.$emit("click", h))
        }, {
          default: z(() => [
            N(i.$slots, "icon"),
            N(i.$slots, "label", {}, () => [
              gt(ke(i.label), 1)
            ])
          ]),
          _: 3
        }, 8, ["id", "expanded", "href", "to", "class"])) : ue("", !0)
      ]) : ue("", !0)
    ]),
    _: 3
  }, 8, ["class"]);
}
const T1 = /* @__PURE__ */ gs(x1, [["render", I1]]), P1 = Ce({
  name: "BtnDropdown",
  components: {
    BtnDropdownSplit: T1,
    BtnDropdownSingle: E1
  },
  inheritAttrs: !1,
  emits: [
    "click",
    "click-toggle",
    "dropdown",
    "show",
    "hide",
    "toggle"
  ]
});
function R1(i, e, t, n, r, s) {
  return j(), fe(Yr(i.$attrs.split === void 0 || i.$attrs.nav ? "btn-dropdown-single" : "btn-dropdown-split"), ai({ class: "btn-dropdown" }, i.$attrs, {
    onClick: e[0] || (e[0] = (...o) => i.$emit("click", ...o)),
    onClickToggle: e[1] || (e[1] = (...o) => i.$emit("click-toggle", ...o)),
    onDropdown: e[2] || (e[2] = (...o) => i.$emit("dropdown", ...o)),
    onShow: e[3] || (e[3] = (...o) => i.$emit("show", ...o)),
    onHide: e[4] || (e[4] = (...o) => i.$emit("hide", ...o)),
    onToggle: e[5] || (e[5] = (...o) => i.$emit("toggle", ...o))
  }), $g({
    icon: z(() => [
      N(i.$slots, "icon")
    ]),
    button: z((o) => [
      N(i.$slots, "button", ni(gn(o)))
    ]),
    split: z((o) => [
      N(i.$slots, "split", ni(gn(o)))
    ]),
    default: z(() => [
      N(i.$slots, "default")
    ]),
    _: 2
  }, [
    i.$attrs.label || i.$slots.label ? {
      name: "label",
      fn: z(() => [
        N(i.$slots, "label", {}, () => [
          gt(ke(i.$attrs.label), 1)
        ])
      ]),
      key: "0"
    } : void 0
  ]), 1040);
}
const D1 = /* @__PURE__ */ gs(P1, [["render", R1]]), L1 = Ce({
  components: {
    ArrowTopRightOnSquareIcon: zw
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
const Ln = (i, e) => {
  const t = i.__vccOpts || i;
  for (const [n, r] of e)
    t[n] = r;
  return t;
}, W1 = { class: "capsule-editor-error" }, M1 = ["href"];
function X1(i, e, t, n, r, s) {
  const o = $("ArrowTopRightOnSquareIcon");
  return j(), ie("div", W1, [
    ne("code", null, [
      ne("span", null, ke(i.error.line) + "," + ke(i.error.col) + " :: (" + ke(i.error.rule.id) + ") " + ke(i.error.message), 1),
      ne("a", {
        href: i.url,
        target: "_blank"
      }, [
        gt(" Reference "),
        de(o)
      ], 8, M1)
    ])
  ]);
}
const j1 = /* @__PURE__ */ Ln(L1, [["render", X1]]), Z1 = Ce({
  components: {
    AnimateCss: Ma,
    Btn: Xa,
    BtnDropdown: D1,
    ChevronLeftIcon: Vw,
    ChevronRightIcon: Yw,
    EditorError: j1,
    BugAntIcon: Uw,
    ExclamationTriangleIcon: qw,
    WrenchScrewdriverIcon: Fw
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
      currentDiagnostic: null,
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
      return this.currentDiagnostic ? [].concat(this.currentDiagnostic.rule.actions).reverse().filter(({ validate: i }) => !i || i(this.view, this.currentDiagnostic)) : [];
    },
    index() {
      return Math.max(0, this.diagnostics.indexOf(this.currentDiagnostic));
    },
    totalDiagnostics() {
      return this.diagnostics.length;
    }
  },
  watch: {
    currentDiagnostic(i, e) {
      this.direction = this.index > this.diagnostics.indexOf(e) ? "down" : "up";
    },
    diagnostics(i, e) {
      i.length ? (this.hasLinted = !0, this.fixedAllDiagnostics = !1) : !i.length && e.length ? (this.hasLinted = !0, this.currentDiagnostic = null, this.fixedAllDiagnostics = !0) : i.length || (this.fixedAllDiagnostics = !0);
    }
  },
  updated() {
    !this.isEmpty() && this.hasLinted && (this.saveButton || !this.saveButton && this.diagnostics.length) ? (this.showFooter = !0, setTimeout(() => this.showFooterContent = !0, 200)) : (this.showFooterContent = !1, setTimeout(() => this.showFooter = !1, 200));
  },
  methods: {
    findActiveDiagnostic() {
      return this.diagnostics.filter((i) => i.isActive).pop();
    },
    goto(i) {
      i < 0 ? i = this.diagnostics.length - 1 : i > this.diagnostics.length - 1 && (i = 0);
      const e = this.currentDiagnostic;
      this.currentDiagnostic = this.diagnostics[i], this.$emit("goto", this.currentDiagnostic, e);
    },
    isEmpty() {
      return this.view ? this.view.state.doc.toString() === "" : !1;
    },
    compare(i, e) {
      return !!i && !!e && i.from === e.from && i.to === e.to && i.rule.id === e.rule.id;
    },
    update(i) {
      this.diagnostics = i || [], this.hasLinted = !0, this.currentDiagnostic || (this.currentDiagnostic = this.diagnostics[this.index]), this.$emit("update:modelValue", this.diagnostics);
    },
    activate(i) {
      const { from: e, to: t } = i.state.selection.main, n = this.diagnostics.filter((o) => e === t ? o.from <= e && o.to >= t : o.from >= e && o.to <= t), r = this.diagnostics.find((o) => this.compare(o, this.currentDiagnostic)), s = Math.max(0, n.indexOf(this.currentDiagnostic));
      n.length ? this.currentDiagnostic = n[s] : this.currentDiagnostic = r || this.diagnostics[this.index];
    },
    onClickAction(i, e) {
      e.apply(this.view, i.from, i.to), bb(this.view);
    }
  }
});
const N1 = {
  key: 0,
  class: "flex justify-between items-center w-full py-4"
}, z1 = { class: "flex items-center w-full overflow-hidden relative gap-2" }, U1 = { class: "editor-footer-pager" }, V1 = { key: 0 }, Y1 = { class: "editor-footer-diagnostic" }, q1 = { class: "editor-footer-action" }, G1 = ["onClick"];
function F1(i, e, t, n, r, s) {
  const o = $("ChevronLeftIcon"), a = $("btn"), l = $("ChevronRightIcon"), h = $("BugAntIcon"), c = $("ExclamationTriangleIcon"), u = $("editor-error"), f = $("animate-css"), d = $("WrenchScrewdriverIcon"), g = $("btn-dropdown");
  return j(), ie("footer", {
    class: "editor-footer",
    style: gu({ minHeight: i.showFooter ? void 0 : 0 })
  }, [
    de(f, {
      name: "fade",
      duration: 200
    }, {
      default: z(() => [
        i.showFooterContent ? (j(), ie("div", N1, [
          ne("div", z1, [
            ne("div", U1, [
              i.totalDiagnostics ? (j(), ie("div", V1, [
                de(a, {
                  type: "button",
                  variant: "link",
                  onClick: e[0] || (e[0] = (p) => i.goto(i.index - 1))
                }, {
                  default: z(() => [
                    de(o, { class: "w-4 h-4" })
                  ]),
                  _: 1
                }),
                ne("span", null, ke(i.index + 1) + " of " + ke(i.diagnostics.length), 1),
                de(a, {
                  type: "button",
                  variant: "link",
                  onClick: e[1] || (e[1] = (p) => i.goto(i.index + 1))
                }, {
                  default: z(() => [
                    de(l, { class: "w-4 h-4" })
                  ]),
                  _: 1
                })
              ])) : ue("", !0)
            ]),
            i.currentDiagnostic ? (j(), ie("button", {
              key: 0,
              type: "button",
              onClick: e[2] || (e[2] = (p) => i.goto(i.index))
            }, [
              i.currentDiagnostic.severity === "error" ? (j(), fe(h, {
                key: 0,
                class: "w-6 h-6"
              })) : ue("", !0),
              i.currentDiagnostic.severity === "warning" ? (j(), fe(c, {
                key: 1,
                class: "w-6 h-6"
              })) : ue("", !0)
            ])) : ue("", !0),
            ne("div", Y1, [
              de(f, {
                name: "fade",
                duration: 200,
                direction: i.direction,
                "leave-active-class": "position-absolute"
              }, {
                default: z(() => [
                  i.currentDiagnostic ? (j(), fe(u, {
                    key: i.index,
                    error: i.currentDiagnostic
                  }, null, 8, ["error"])) : ue("", !0)
                ]),
                _: 1
              }, 8, ["direction"])
            ])
          ]),
          ne("div", q1, [
            N(i.$slots, "before-save-button"),
            N(i.$slots, "action-button", {}, () => [
              i.actions.length ? (j(), ie(_s, { key: 0 }, [
                i.actions.length === 1 ? (j(), fe(a, {
                  key: 0,
                  type: "button",
                  variant: "light",
                  class: "flex items-center gap-2",
                  onClick: e[3] || (e[3] = () => i.onClickAction(i.currentDiagnostic, i.actions[0]))
                }, {
                  default: z(() => [
                    de(d, { class: "w-6 h-6" }),
                    gt(" " + ke(i.actions[0].name), 1)
                  ]),
                  _: 1
                })) : (j(), fe(g, {
                  key: 1,
                  label: "Fix Errors",
                  type: "button",
                  variant: "light",
                  dropup: ""
                }, {
                  default: z(() => [
                    (j(!0), ie(_s, null, _g(i.actions, (p, O) => (j(), ie("button", {
                      key: `${i.currentDiagnostic.rule.id}-${O}`,
                      type: "button",
                      variant: "light",
                      onClick: () => i.onClickAction(i.currentDiagnostic, p)
                    }, ke(p.name), 9, G1))), 128))
                  ]),
                  _: 1
                }))
              ], 64)) : ue("", !0)
            ]),
            N(i.$slots, "save-button", {
              diagnostics: i.diagnostics,
              saveButtonLabel: i.diagnostics
            }, () => [
              i.saveButton && !i.diagnostics.length ? (j(), fe(a, {
                key: 0,
                type: "button",
                variant: "light",
                onClick: e[4] || (e[4] = (p) => i.$emit("save"))
              }, {
                default: z(() => [
                  gt(ke(i.saveButtonLabel), 1)
                ]),
                _: 1
              })) : ue("", !0)
            ]),
            N(i.$slots, "after-save-button", { diagnostics: i.diagnostics })
          ])
        ])) : ue("", !0)
      ]),
      _: 3
    })
  ], 4);
}
const H1 = /* @__PURE__ */ Ln(Z1, [["render", F1]]), J1 = Ce({
  components: {
    AnimateCss: Ma
  },
  props: {
    bgAnimation: {
      type: Object,
      default: () => ({
        name: "fade",
        duration: "500ms"
      })
    },
    contentAnimation: {
      type: Object,
      default: () => ({
        name: "fade",
        duration: "500ms"
      })
    }
  },
  data: () => ({
    mounted: !1,
    isContentShowing: !1,
    showContent: !1
  }),
  watch: {
    showContent(i) {
      i && this.$nextTick(() => {
        this.isContentShowing = !0;
      });
    }
  },
  mounted() {
    this.mounted = !0;
  }
});
const K1 = {
  key: 0,
  class: "capsule-editor-modal"
}, $1 = {
  key: 0,
  class: "capsule-editor-modal-content"
};
function _1(i, e, t, n, r, s) {
  const o = $("animate-css");
  return j(), fe(o, ai(i.bgAnimation, {
    onAfterEnter: e[0] || (e[0] = (a) => i.showContent = !0)
  }), {
    default: z(() => [
      i.mounted ? (j(), ie("div", K1, [
        de(o, ni(gn(i.contentAnimation)), {
          default: z(() => [
            i.showContent ? (j(), ie("div", $1, [
              N(i.$slots, "default", { isShowing: i.isContentShowing })
            ])) : ue("", !0)
          ]),
          _: 3
        }, 16)
      ])) : ue("", !0)
    ]),
    _: 3
  }, 16);
}
const eC = /* @__PURE__ */ Ln(J1, [["render", _1]]), tC = Ce({
  components: {
    Btn: Xa,
    QuestionMarkCircleIcon: Gw
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
const iC = { class: "editor-toolbar" }, nC = { class: "editor-toolbar-left" }, rC = { class: "editor-toolbar-title" }, sC = ["disabled"], oC = { class: "editor-toolbar-right" };
function aC(i, e, t, n, r, s) {
  const o = $("QuestionMarkCircleIcon"), a = $("btn");
  return j(), ie("div", iC, [
    ne("div", nC, [
      N(i.$slots, "left")
    ]),
    ne("div", rC, [
      eA(ne("input", {
        "onUpdate:modelValue": e[0] || (e[0] = (l) => i.currentValue = l),
        type: "text",
        placeholder: "Untitled Document",
        disabled: i.disableFilename,
        onInput: e[1] || (e[1] = (l) => i.$emit("update:modelValue", l.target.value))
      }, null, 40, sC), [
        [tA, i.currentValue]
      ])
    ]),
    ne("div", oC, [
      N(i.$slots, "right", {}, () => [
        i.demoMode ? (j(), fe(a, {
          key: 0,
          size: "sm",
          variant: "link",
          class: "editor-help",
          onClick: e[2] || (e[2] = (l) => i.$emit("demo-modal"))
        }, {
          default: z(() => [
            de(o, { class: "w-4 h-4" })
          ]),
          _: 1
        })) : ue("", !0)
      ])
    ])
  ]);
}
const lC = /* @__PURE__ */ Ln(tC, [["render", aC]]);
var hu = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
const hC = {
  "attr-no-duplication": !0,
  "body-no-duplicates": !0,
  "head-body-descendents-html": !0,
  "head-no-duplicates": !0,
  "head-valid-children": !0,
  "html-no-duplicates": !0,
  "html-root-node": !0,
  "html-valid-children": !0,
  "html-valid-children-order": !0,
  "img-src-required": !0,
  "invalid-attribute-char": !0,
  "nested-paragraphs": !0,
  "spec-char-escape": !0,
  "src-not-empty": !0,
  "tag-pair": !0,
  "valid-path-format": [
    {
      attr: "href",
      formats: [
        "absolute",
        {
          pattern: "\\${(\\s+)?Gears\\.unsubscribe\\(\\)(\\s+)?}",
          name: "MessageGears unsubscribe"
        }
      ]
    },
    {
      tag: "img",
      attr: "src",
      formats: [
        "absolute"
      ]
    }
  ]
};
var Wg = {}, Ya = {};
Object.defineProperty(Ya, "__esModule", { value: !0 });
var cC = function() {
  function i() {
    this._listeners = {}, this._mapCdataTags = this.makeMap("script,style"), this._arrBlocks = [], this.lastEvent = null;
  }
  return i.prototype.makeMap = function(e) {
    for (var t = {}, n = e.split(","), r = 0; r < n.length; r++)
      t[n[r]] = !0;
    return t;
  }, i.prototype.parse = function(e) {
    var t = this, n = this._mapCdataTags, r = /<(?:\/([^\s>]+)\s*|!--([\s\S]*?)--|!([^>]*?)|([\w\-:]+)((?:\s+[^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]*))?)*?)\s*(\/?))>/g, s = /\s*([^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+)(?:\s*=\s*(?:(")([^"]*)"|(')([^']*)'|([^\s"'>]*)))?/g, o = /\r?\n/g, a, l, h = 0, c, u, f = null, d, g = [], p = 0, O, m = 0, w = 1, C = this._arrBlocks;
    this.fire("start", {
      pos: 0,
      line: 1,
      col: 1
    });
    for (var Q = function() {
      var Z = u.find(function(X) {
        return X.name === "type";
      }) || {
        value: ""
      };
      return n[c] && Z.value.indexOf("text/ng-template") === -1;
    }, b = function(Z, X, H, U) {
      var V = H - m + 1;
      for (U === void 0 && (U = {}), U.raw = X, U.pos = H, U.line = w, U.col = V, C.push(U), t.fire(Z, U); o.exec(X); )
        w++, m = H + o.lastIndex;
    }; a = r.exec(e); ) {
      if (l = a.index, l > h && (O = e.substring(h, l), f ? g.push(O) : b("text", O, h)), h = r.lastIndex, (c = a[1]) && (f && c === f && (O = g.join(""), b("cdata", O, p, {
        tagName: f,
        attrs: d
      }), f = null, d = void 0, g = []), !f)) {
        b("tagend", a[0], l, {
          tagName: c
        });
        continue;
      }
      if (f)
        g.push(a[0]);
      else if (c = a[4]) {
        u = [];
        for (var v = a[5], S = void 0, L = 0; S = s.exec(v); ) {
          var x = S[1], B = S[2] ? S[2] : S[4] ? S[4] : "", D = S[3] ? S[3] : S[5] ? S[5] : S[6] ? S[6] : "";
          u.push({
            name: x,
            value: D,
            quote: B,
            index: S.index,
            raw: S[0]
          }), L += S[0].length;
        }
        L === v.length ? (b("tagstart", a[0], l, {
          tagName: c,
          attrs: u,
          close: a[6]
        }), Q() && (f = c, d = u.concat(), g = [], p = h)) : b("text", a[0], l);
      } else
        (a[2] || a[3]) && b("comment", a[0], l, {
          content: a[2] || a[3],
          long: !!a[2]
        });
    }
    e.length > h && (O = e.substring(h, e.length), b("text", O, h)), this.fire("end", {
      pos: h,
      line: w,
      col: e.length - m + 1
    });
  }, i.prototype.addListener = function(e, t) {
    for (var n = this._listeners, r = e.split(/[,\s]/), s, o = 0, a = r.length; o < a; o++)
      s = r[o], n[s] === void 0 && (n[s] = []), n[s].push(t);
  }, i.prototype.fire = function(e, t) {
    t === void 0 && (t = {}), t.type = e;
    var n = [], r = this._listeners[e], s = this._listeners.all;
    r !== void 0 && (n = n.concat(r)), s !== void 0 && (n = n.concat(s));
    var o = this.lastEvent;
    o !== null && (delete o.lastEvent, t.lastEvent = o), this.lastEvent = t;
    for (var a = 0, l = n.length; a < l; a++)
      n[a].call(this, t);
  }, i.prototype.removeListener = function(e, t) {
    var n = this._listeners[e];
    if (n !== void 0) {
      for (var r = 0, s = n.length; r < s; r++)
        if (n[r] === t) {
          n.splice(r, 1);
          break;
        }
    }
  }, i.prototype.fixPos = function(e, t) {
    var n = e.raw.substr(0, t), r = n.split(/\r?\n/), s = r.length - 1, o = e.line, a;
    return s > 0 ? (o += s, a = r[s].length + 1) : a = e.col + t, {
      line: o,
      col: a
    };
  }, i.prototype.getMapAttrs = function(e) {
    for (var t = {}, n, r = 0, s = e.length; r < s; r++)
      n = e[r], t[n.name] = n.value;
    return t;
  }, i;
}();
Ya.default = cC;
var qa = {};
Object.defineProperty(qa, "__esModule", { value: !0 });
var uC = function() {
  function i(e, t) {
    this.html = e, this.lines = e.split(/\r?\n/);
    var n = /\r?\n/.exec(e);
    this.brLen = n !== null ? n[0].length : 0, this.ruleset = t, this.messages = [];
  }
  return i.prototype.info = function(e, t, n, r, s) {
    this.report("info", e, t, n, r, s);
  }, i.prototype.warn = function(e, t, n, r, s) {
    this.report("warning", e, t, n, r, s);
  }, i.prototype.error = function(e, t, n, r, s) {
    this.report("error", e, t, n, r, s);
  }, i.prototype.report = function(e, t, n, r, s, o) {
    for (var a = this.lines, l = this.brLen, h = "", c = 0, u = n - 1, f = a.length; u < f && (h = a[u], c = h.length, r > c && n < f); u++)
      n++, r -= c, r !== 1 && (r -= l);
    this.messages.push({
      type: e,
      message: t,
      raw: o,
      evidence: h,
      line: n,
      col: r,
      rule: {
        id: s.id,
        description: s.description,
        link: "https://github.com/thedaviddias/HTMLHint/wiki/" + s.id
      }
    });
  }, i;
}();
qa.default = uC;
var Mg = {}, Ga = {};
Object.defineProperty(Ga, "__esModule", { value: !0 });
Ga.default = {
  id: "alt-require",
  description: "The alt attribute of an <img> element must be present and alt attribute of area[href] and input[type=image] must have a value.",
  init: function(i, e) {
    var t = this;
    i.addListener("tagstart", function(n) {
      var r = n.tagName.toLowerCase(), s = i.getMapAttrs(n.attrs), o = n.col + r.length + 1, a;
      r === "img" && !("alt" in s) ? e.warn("An alt attribute must be present on <img> elements.", n.line, o, t, n.raw) : (r === "area" && "href" in s || r === "input" && s.type === "image") && (!("alt" in s) || s.alt === "") && (a = r === "area" ? "area[href]" : "input[type=image]", e.warn("The alt attribute of " + a + " must have a value.", n.line, o, t, n.raw));
    });
  }
};
var Fa = {};
Object.defineProperty(Fa, "__esModule", { value: !0 });
function fC(i, e) {
  if (e instanceof RegExp)
    return e.test(i) ? { match: i, pattern: e } : !1;
  var t = e[0], n = e[e.length - 1], r = e[e.length - 2], s = t === "/" && (n === "/" || r === "/" && n === "i"), o = s && n === "i";
  if (s) {
    var a = o ? new RegExp(e.slice(1, -2), "i").test(i) : new RegExp(e.slice(1, -1)).test(i);
    return a;
  }
  return i === e;
}
Fa.default = {
  id: "attr-lowercase",
  description: "All attribute names must be in lowercase.",
  init: function(i, e, t) {
    var n = this, r = Array.isArray(t) ? t : [];
    i.addListener("tagstart", function(s) {
      for (var o = s.attrs, a, l = s.col + s.tagName.length + 1, h = function(f, d) {
        a = o[f];
        var g = a.name;
        !r.find(function(p) {
          return fC(g, p);
        }) && g !== g.toLowerCase() && e.error("The attribute name of [ " + g + " ] must be in lowercase.", s.line, l + a.index, n, a.raw);
      }, c = 0, u = o.length; c < u; c++)
        h(c);
    });
  }
};
var Ha = {};
Object.defineProperty(Ha, "__esModule", { value: !0 });
Ha.default = {
  id: "attr-sorted",
  description: "Attribute tags must be in proper order.",
  init: function(i, e) {
    for (var t = this, n = {}, r = [
      "class",
      "id",
      "name",
      "src",
      "for",
      "type",
      "href",
      "value",
      "title",
      "alt",
      "role"
    ], s = 0; s < r.length; s++)
      n[r[s]] = s;
    i.addListener("tagstart", function(o) {
      for (var a = o.attrs, l = [], h = 0; h < a.length; h++)
        l.push(a[h].name);
      var c = JSON.stringify(l);
      l.sort(function(u, f) {
        return n[u] == null && n[f] == null ? 0 : n[u] == null ? 1 : n[f] == null ? -1 : n[u] - n[f] || u.localeCompare(f);
      }), c !== JSON.stringify(l) && e.error("Inaccurate order " + c + " should be in hierarchy " + JSON.stringify(l) + " ", o.line, o.col, t, o.raw);
    });
  }
};
var Ja = {};
Object.defineProperty(Ja, "__esModule", { value: !0 });
Ja.default = {
  id: "attr-no-duplication",
  description: "Elements cannot have duplicate attributes.",
  init: function(i, e) {
    var t = this;
    i.addListener("tagstart", function(n) {
      for (var r = n.attrs, s, o, a = n.col + n.tagName.length + 1, l = {}, h = 0, c = r.length; h < c; h++)
        s = r[h], o = s.name, l[o] === !0 && e.error("Duplicate of attribute name [ " + s.name + " ] was found.", n.line, a + s.index, t, s.raw), l[o] = !0;
    });
  }
};
var Ka = {};
Object.defineProperty(Ka, "__esModule", { value: !0 });
Ka.default = {
  id: "attr-unsafe-chars",
  description: "Attribute values cannot contain unsafe chars.",
  init: function(i, e) {
    var t = this;
    i.addListener("tagstart", function(n) {
      for (var r = n.attrs, s, o = n.col + n.tagName.length + 1, a = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/, l, h = 0, c = r.length; h < c; h++)
        if (s = r[h], l = a.exec(s.value), l !== null) {
          var u = escape(l[0]).replace(/%u/, "\\u").replace(/%/, "\\x");
          e.warn("The value of attribute [ " + s.name + " ] cannot contain an unsafe char [ " + u + " ].", n.line, o + s.index, t, s.raw);
        }
    });
  }
};
var $a = {};
Object.defineProperty($a, "__esModule", { value: !0 });
$a.default = {
  id: "attr-value-double-quotes",
  description: "Attribute values must be in double quotes.",
  init: function(i, e) {
    var t = this;
    i.addListener("tagstart", function(n) {
      for (var r = n.attrs, s, o = n.col + n.tagName.length + 1, a = 0, l = r.length; a < l; a++)
        s = r[a], (s.value !== "" && s.quote !== '"' || s.value === "" && s.quote === "'") && e.error("The value of attribute [ " + s.name + " ] must be in double quotes.", n.line, o + s.index, t, s.raw);
    });
  }
};
var _a = {};
Object.defineProperty(_a, "__esModule", { value: !0 });
_a.default = {
  id: "attr-value-not-empty",
  description: "All attributes must have values.",
  init: function(i, e) {
    var t = this;
    i.addListener("tagstart", function(n) {
      for (var r = n.attrs, s, o = n.col + n.tagName.length + 1, a = 0, l = r.length; a < l; a++)
        s = r[a], s.quote === "" && s.value === "" && e.warn("The attribute [ " + s.name + " ] must have a value.", n.line, o + s.index, t, s.raw);
    });
  }
};
var el = {};
Object.defineProperty(el, "__esModule", { value: !0 });
el.default = {
  id: "attr-value-single-quotes",
  description: "Attribute values must be in single quotes.",
  init: function(i, e) {
    var t = this;
    i.addListener("tagstart", function(n) {
      for (var r = n.attrs, s, o = n.col + n.tagName.length + 1, a = 0, l = r.length; a < l; a++)
        s = r[a], (s.value !== "" && s.quote !== "'" || s.value === "" && s.quote === '"') && e.error("The value of attribute [ " + s.name + " ] must be in single quotes.", n.line, o + s.index, t, s.raw);
    });
  }
};
var tl = {};
Object.defineProperty(tl, "__esModule", { value: !0 });
tl.default = {
  id: "attr-whitespace",
  description: "All attributes should be separated by only one space and not have leading/trailing whitespace.",
  init: function(i, e, t) {
    var n = this, r = Array.isArray(t) ? t : [];
    i.addListener("tagstart", function(s) {
      var o = s.attrs, a, l = s.col + s.tagName.length + 1;
      o.forEach(function(h) {
        a = h;
        var c = h.name;
        r.indexOf(c) === -1 && (h.value.trim() !== h.value && e.error("The attributes of [ " + c + " ] must not have trailing whitespace.", s.line, l + a.index, n, a.raw), h.value.replace(/ +(?= )/g, "") !== h.value && e.error("The attributes of [ " + c + " ] must be separated by only one space.", s.line, l + a.index, n, a.raw));
      });
    });
  }
};
var il = {};
Object.defineProperty(il, "__esModule", { value: !0 });
il.default = {
  id: "doctype-first",
  description: "Doctype must be declared first.",
  init: function(i, e) {
    var t = this, n = function(r) {
      r.type === "start" || r.type === "text" && /^\s*$/.test(r.raw) || ((r.type !== "comment" && r.long === !1 || /^DOCTYPE\s+/i.test(r.content) === !1) && e.error("Doctype must be declared first.", r.line, r.col, t, r.raw), i.removeListener("all", n));
    };
    i.addListener("all", n);
  }
};
var nl = {};
Object.defineProperty(nl, "__esModule", { value: !0 });
nl.default = {
  id: "doctype-html5",
  description: 'Invalid doctype. Use: "<!DOCTYPE html>"',
  init: function(i, e) {
    var t = this, n = function(s) {
      s.long === !1 && s.content.toLowerCase() !== "doctype html" && e.warn('Invalid doctype. Use: "<!DOCTYPE html>"', s.line, s.col, t, s.raw);
    }, r = function() {
      i.removeListener("comment", n), i.removeListener("tagstart", r);
    };
    i.addListener("all", n), i.addListener("tagstart", r);
  }
};
var rl = {};
Object.defineProperty(rl, "__esModule", { value: !0 });
rl.default = {
  id: "head-script-disabled",
  description: "The <script> tag cannot be used in a <head> tag.",
  init: function(i, e) {
    var t = this, n = /^(text\/javascript|application\/javascript)$/i, r = !1, s = function(a) {
      var l = i.getMapAttrs(a.attrs), h = l.type, c = a.tagName.toLowerCase();
      c === "head" && (r = !0), r === !0 && c === "script" && (!h || n.test(h) === !0) && e.warn("The <script> tag cannot be used in a <head> tag.", a.line, a.col, t, a.raw);
    }, o = function(a) {
      a.tagName.toLowerCase() === "head" && (i.removeListener("tagstart", s), i.removeListener("tagend", o));
    };
    i.addListener("tagstart", s), i.addListener("tagend", o);
  }
};
var sl = {};
Object.defineProperty(sl, "__esModule", { value: !0 });
sl.default = {
  id: "href-abs-or-rel",
  description: "An href attribute must be either absolute or relative.",
  init: function(i, e, t) {
    var n = this, r = t === "abs" ? "absolute" : "relative";
    i.addListener("tagstart", function(s) {
      for (var o = s.attrs, a, l = s.col + s.tagName.length + 1, h = 0, c = o.length; h < c; h++)
        if (a = o[h], a.name === "href") {
          (r === "absolute" && /^\w+?:/.test(a.value) === !1 || r === "relative" && /^https?:\/\//.test(a.value) === !0) && e.warn("The value of the href attribute [ " + a.value + " ] must be " + r + ".", s.line, l + a.index, n, a.raw);
          break;
        }
    });
  }
};
var ol = {};
Object.defineProperty(ol, "__esModule", { value: !0 });
var dC = "(art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang)", gC = "(en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)", AC = "(?<grandfathered>" + gC + "|" + dC + ")", pC = "(?<privateUse>x(-[A-Za-z0-9]{1,8})+)", OC = "(?<privateUse2>x(-[A-Za-z0-9]{1,8})+)", mC = "[0-9A-WY-Za-wy-z]", QC = "(?<extension>" + mC + "(-[A-Za-z0-9]{2,8})+)", bC = "(?<variant>[A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3})", yC = "(?<region>[A-Za-z]{2}|[0-9]{3})", wC = "(?<script>[A-Za-z]{4})", vC = "(?<extlang>[A-Za-z]{3}(-[A-Za-z]{3}){0,2})", CC = "(?<language>([A-Za-z]{2,3}(-" + vC + ")?)|[A-Za-z]{4}|[A-Za-z]{5,8})", SC = "(" + CC + "(-" + wC + ")?" + ("(-" + yC + ")?") + ("(-" + bC + ")*") + ("(-" + QC + ")*") + ("(-" + pC + ")?") + ")", kC = "(" + AC + "|" + SC + "|" + OC + ")";
ol.default = {
  id: "html-lang-require",
  description: "The lang attribute of an <html> element must be present and should be valid.",
  init: function(i, e) {
    var t = this;
    i.addListener("tagstart", function(n) {
      var r = n.tagName.toLowerCase(), s = i.getMapAttrs(n.attrs), o = n.col + r.length + 1, a = new RegExp(kC, "g");
      r === "html" && ("lang" in s ? s.lang ? a.test(s.lang) || e.warn("The lang attribute value of <html> element must be a valid BCP47.", n.line, o, t, n.raw) : e.warn("The lang attribute of <html> element must have a value.", n.line, o, t, n.raw) : e.warn("An lang attribute must be present on <html> elements.", n.line, o, t, n.raw));
    });
  }
};
var al = {};
Object.defineProperty(al, "__esModule", { value: !0 });
al.default = {
  id: "id-class-ad-disabled",
  description: "The id and class attributes cannot use the ad keyword, it will be blocked by adblock software.",
  init: function(i, e) {
    var t = this;
    i.addListener("tagstart", function(n) {
      for (var r = n.attrs, s, o, a = n.col + n.tagName.length + 1, l = 0, h = r.length; l < h; l++)
        s = r[l], o = s.name, /^(id|class)$/i.test(o) && /(^|[-_])ad([-_]|$)/i.test(s.value) && e.warn("The value of attribute " + o + " cannot use the ad keyword.", n.line, a + s.index, t, s.raw);
    });
  }
};
var ll = {};
Object.defineProperty(ll, "__esModule", { value: !0 });
ll.default = {
  id: "id-class-value",
  description: "The id and class attribute values must meet the specified rules.",
  init: function(i, e, t) {
    var n = this, r = {
      underline: {
        regId: /^[a-z\d]+(_[a-z\d]+)*$/,
        message: "The id and class attribute values must be in lowercase and split by an underscore."
      },
      dash: {
        regId: /^[a-z\d]+(-[a-z\d]+)*$/,
        message: "The id and class attribute values must be in lowercase and split by a dash."
      },
      hump: {
        regId: /^[a-z][a-zA-Z\d]*([A-Z][a-zA-Z\d]*)*$/,
        message: "The id and class attribute values must meet the camelCase style."
      }
    }, s;
    if (typeof t == "string" ? s = r[t] : s = t, typeof s == "object" && s.regId) {
      var o = s.regId, a = s.message;
      o instanceof RegExp || (o = new RegExp(o)), i.addListener("tagstart", function(l) {
        for (var h = l.attrs, c, u = l.col + l.tagName.length + 1, f = 0, d = h.length; f < d; f++)
          if (c = h[f], c.name.toLowerCase() === "id" && o.test(c.value) === !1 && e.warn(a, l.line, u + c.index, n, c.raw), c.name.toLowerCase() === "class")
            for (var g = c.value.split(/\s+/g), p = void 0, O = 0, m = g.length; O < m; O++)
              p = g[O], p && o.test(p) === !1 && e.warn(a, l.line, u + c.index, n, p);
      });
    }
  }
};
var hl = {};
Object.defineProperty(hl, "__esModule", { value: !0 });
hl.default = {
  id: "id-unique",
  description: "The value of id attributes must be unique.",
  init: function(i, e) {
    var t = this, n = {};
    i.addListener("tagstart", function(r) {
      for (var s = r.attrs, o, a, l = r.col + r.tagName.length + 1, h = 0, c = s.length; h < c; h++)
        if (o = s[h], o.name.toLowerCase() === "id") {
          a = o.value, a && (n[a] === void 0 ? n[a] = 1 : n[a]++, n[a] > 1 && e.error("The id value [ " + a + " ] must be unique.", r.line, l + o.index, t, o.raw));
          break;
        }
    });
  }
};
var cl = {};
Object.defineProperty(cl, "__esModule", { value: !0 });
cl.default = {
  id: "inline-script-disabled",
  description: "Inline script cannot be used.",
  init: function(i, e) {
    var t = this;
    i.addListener("tagstart", function(n) {
      for (var r = n.attrs, s, o = n.col + n.tagName.length + 1, a, l = /^on(unload|message|submit|select|scroll|resize|mouseover|mouseout|mousemove|mouseleave|mouseenter|mousedown|load|keyup|keypress|keydown|focus|dblclick|click|change|blur|error)$/i, h = 0, c = r.length; h < c; h++)
        s = r[h], a = s.name.toLowerCase(), (l.test(a) === !0 || (a === "src" || a === "href") && /^\s*javascript:/i.test(s.value)) && e.warn("Inline script [ " + s.raw + " ] cannot be used.", n.line, o + s.index, t, s.raw);
    });
  }
};
var ul = {};
Object.defineProperty(ul, "__esModule", { value: !0 });
ul.default = {
  id: "inline-style-disabled",
  description: "Inline style cannot be used.",
  init: function(i, e) {
    var t = this;
    i.addListener("tagstart", function(n) {
      for (var r = n.attrs, s, o = n.col + n.tagName.length + 1, a = 0, l = r.length; a < l; a++)
        s = r[a], s.name.toLowerCase() === "style" && e.warn("Inline style [ " + s.raw + " ] cannot be used.", n.line, o + s.index, t, s.raw);
    });
  }
};
var fl = {};
Object.defineProperty(fl, "__esModule", { value: !0 });
fl.default = {
  id: "input-requires-label",
  description: "All [ input ] tags must have a corresponding [ label ] tag. ",
  init: function(i, e) {
    var t = this, n = [], r = [];
    i.addListener("tagstart", function(o) {
      var a = o.tagName.toLowerCase(), l = i.getMapAttrs(o.attrs), h = o.col + a.length + 1;
      a === "input" && r.push({ event: o, col: h, id: l.id }), a === "label" && "for" in l && l.for !== "" && n.push({ event: o, col: h, forValue: l.for });
    }), i.addListener("end", function() {
      r.forEach(function(o) {
        s(o) || e.warn("No matching [ label ] tag found.", o.event.line, o.col, t, o.event.raw);
      });
    });
    function s(o) {
      var a = !1;
      return n.forEach(function(l) {
        o.id && o.id === l.forValue && (a = !0);
      }), a;
    }
  }
};
var dl = {};
Object.defineProperty(dl, "__esModule", { value: !0 });
dl.default = {
  id: "script-disabled",
  description: "The <script> tag cannot be used.",
  init: function(i, e) {
    var t = this;
    i.addListener("tagstart", function(n) {
      n.tagName.toLowerCase() === "script" && e.error("The <script> tag cannot be used.", n.line, n.col, t, n.raw);
    });
  }
};
var gl = {};
Object.defineProperty(gl, "__esModule", { value: !0 });
gl.default = {
  id: "space-tab-mixed-disabled",
  description: "Do not mix tabs and spaces for indentation.",
  init: function(i, e, t) {
    var n = this, r = "nomix", s = null;
    if (typeof t == "string") {
      var o = /^([a-z]+)(\d+)?/.exec(t);
      o && (r = o[1], s = o[2] && parseInt(o[2], 10));
    }
    i.addListener("text", function(a) {
      for (var l = a.raw, h = /(^|\r?\n)([ \t]+)/g, c; c = h.exec(l); ) {
        var u = i.fixPos(a, c.index + c[1].length);
        if (u.col === 1) {
          var f = c[2];
          r === "space" ? s ? (/^ +$/.test(f) === !1 || f.length % s !== 0) && e.warn("Please use space for indentation and keep " + s + " length.", u.line, 1, n, a.raw) : /^ +$/.test(f) === !1 && e.warn("Please use space for indentation.", u.line, 1, n, a.raw) : r === "tab" && /^\t+$/.test(f) === !1 ? e.warn("Please use tab for indentation.", u.line, 1, n, a.raw) : / +\t|\t+ /.test(f) === !0 && e.warn("Do not mix tabs and spaces for indentation.", u.line, 1, n, a.raw);
        }
      }
    });
  }
};
var Al = {};
Object.defineProperty(Al, "__esModule", { value: !0 });
Al.default = {
  id: "spec-char-escape",
  description: "Special characters must be escaped.",
  init: function(i, e) {
    var t = this;
    i.addListener("text", function(n) {
      for (var r = n.raw, s = /([<>])|( \& )/g, o; o = s.exec(r); ) {
        var a = i.fixPos(n, o.index);
        e.error("Special characters must be escaped : [ " + o[0] + " ].", a.line, a.col, t, n.raw);
      }
    });
  }
};
var pl = {};
Object.defineProperty(pl, "__esModule", { value: !0 });
pl.default = {
  id: "src-not-empty",
  description: "The src attribute of an img(script,link) must have a value.",
  init: function(i, e) {
    var t = this;
    i.addListener("tagstart", function(n) {
      for (var r = n.tagName, s = n.attrs, o, a = n.col + r.length + 1, l = 0, h = s.length; l < h; l++)
        o = s[l], (/^(img|script|embed|bgsound|iframe)$/.test(r) === !0 && o.name === "src" || r === "link" && o.name === "href" || r === "object" && o.name === "data") && o.value === "" && e.error("The attribute [ " + o.name + " ] of the tag [ " + r + " ] must have a value.", n.line, a + o.index, t, o.raw);
    });
  }
};
var Ol = {};
Object.defineProperty(Ol, "__esModule", { value: !0 });
Ol.default = {
  id: "style-disabled",
  description: "<style> tags cannot be used.",
  init: function(i, e) {
    var t = this;
    i.addListener("tagstart", function(n) {
      n.tagName.toLowerCase() === "style" && e.warn("The <style> tag cannot be used.", n.line, n.col, t, n.raw);
    });
  }
};
var ml = {};
Object.defineProperty(ml, "__esModule", { value: !0 });
ml.default = {
  id: "tag-pair",
  description: "Tag must be paired.",
  init: function(i, e) {
    var t = this, n = [], r = i.makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr");
    i.addListener("tagstart", function(s) {
      var o = s.tagName.toLowerCase();
      r[o] === void 0 && !s.close && n.push({
        tagName: o,
        line: s.line,
        raw: s.raw
      });
    }), i.addListener("tagend", function(s) {
      var o = s.tagName.toLowerCase(), a;
      for (a = n.length - 1; a >= 0 && n[a].tagName !== o; a--)
        ;
      if (a >= 0) {
        for (var l = [], h = n.length - 1; h > a; h--)
          l.push("</" + n[h].tagName + ">");
        if (l.length > 0) {
          var c = n[n.length - 1];
          e.error("Tag must be paired, missing: [ " + l.join("") + " ], start tag match failed [ " + c.raw + " ] on line " + c.line + ".", s.line, s.col, t, s.raw);
        }
        n.length = a;
      } else
        e.error("Tag must be paired, no start tag: [ " + s.raw + " ]", s.line, s.col, t, s.raw);
    }), i.addListener("end", function(s) {
      for (var o = [], a = n.length - 1; a >= 0; a--)
        o.push("</" + n[a].tagName + ">");
      if (o.length > 0) {
        var l = n[n.length - 1];
        e.error("Tag must be paired, missing: [ " + o.join("") + " ], open tag match failed [ " + l.raw + " ] on line " + l.line + ".", s.line, s.col, t, "");
      }
    });
  }
};
var Ql = {};
Object.defineProperty(Ql, "__esModule", { value: !0 });
Ql.default = {
  id: "tag-self-close",
  description: "Empty tags must be self closed.",
  init: function(i, e) {
    var t = this, n = i.makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr");
    i.addListener("tagstart", function(r) {
      var s = r.tagName.toLowerCase();
      n[s] !== void 0 && (r.close || e.warn("The empty tag : [ " + s + " ] must be self closed.", r.line, r.col, t, r.raw));
    });
  }
};
var bl = {};
Object.defineProperty(bl, "__esModule", { value: !0 });
bl.default = {
  id: "tagname-lowercase",
  description: "All html element names must be in lowercase.",
  init: function(i, e, t) {
    var n = this, r = Array.isArray(t) ? t : [];
    i.addListener("tagstart,tagend", function(s) {
      var o = s.tagName;
      r.indexOf(o) === -1 && o !== o.toLowerCase() && e.error("The html element name of [ " + o + " ] must be in lowercase.", s.line, s.col, n, s.raw);
    });
  }
};
var yl = {};
Object.defineProperty(yl, "__esModule", { value: !0 });
yl.default = {
  id: "tagname-specialchars",
  description: "All html element names must be in lowercase.",
  init: function(i, e) {
    var t = this, n = /[^a-zA-Z0-9\-:_]/;
    i.addListener("tagstart,tagend", function(r) {
      var s = r.tagName;
      n.test(s) && e.error("The html element name of [ " + s + " ] contains special character.", r.line, r.col, t, r.raw);
    });
  }
};
var wl = {};
Object.defineProperty(wl, "__esModule", { value: !0 });
wl.default = {
  id: "title-require",
  description: "<title> must be present in <head> tag.",
  init: function(i, e) {
    var t = this, n = !1, r = !1, s = function(a) {
      var l = a.tagName.toLowerCase();
      l === "head" ? n = !0 : l === "title" && n && (r = !0);
    }, o = function(a) {
      var l = a.tagName.toLowerCase();
      if (r && l === "title") {
        var h = a.lastEvent;
        (h.type !== "text" || h.type === "text" && /^\s*$/.test(h.raw) === !0) && e.error("<title></title> must not be empty.", a.line, a.col, t, a.raw);
      } else
        l === "head" && (r === !1 && e.error("<title> must be present in <head> tag.", a.line, a.col, t, a.raw), i.removeListener("tagstart", s), i.removeListener("tagend", o));
    };
    i.addListener("tagstart", s), i.addListener("tagend", o);
  }
};
var vl = {}, Vr = hu && hu.__assign || function() {
  return Vr = Object.assign || function(i) {
    for (var e, t = 1, n = arguments.length; t < n; t++) {
      e = arguments[t];
      for (var r in e)
        Object.prototype.hasOwnProperty.call(e, r) && (i[r] = e[r]);
    }
    return i;
  }, Vr.apply(this, arguments);
};
Object.defineProperty(vl, "__esModule", { value: !0 });
var ir = {
  a: {
    selfclosing: !1,
    attrsRequired: ["href", "title"],
    redundantAttrs: ["alt"]
  },
  div: {
    selfclosing: !1
  },
  main: {
    selfclosing: !1,
    redundantAttrs: ["role"]
  },
  nav: {
    selfclosing: !1,
    redundantAttrs: ["role"]
  },
  script: {
    attrsOptional: [
      ["async", "async"],
      ["defer", "defer"]
    ]
  },
  img: {
    selfclosing: !0,
    attrsRequired: ["src", "alt", "title"]
  }
};
vl.default = {
  id: "tags-check",
  description: "Checks html tags.",
  init: function(i, e, t) {
    var n = this;
    ir = Vr(Vr({}, ir), t), i.addListener("tagstart", function(r) {
      var s = r.attrs, o = r.col + r.tagName.length + 1, a = r.tagName.toLowerCase();
      if (ir[a]) {
        var l = ir[a];
        if (l.selfclosing === !0 && !r.close ? e.warn("The <" + a + "> tag must be selfclosing.", r.line, r.col, n, r.raw) : l.selfclosing === !1 && r.close && e.warn("The <" + a + "> tag must not be selfclosing.", r.line, r.col, n, r.raw), Array.isArray(l.attrsRequired)) {
          var h = l.attrsRequired;
          h.forEach(function(f) {
            if (Array.isArray(f)) {
              var d = f.map(function(O) {
                return O;
              }), g = d.shift(), p = d;
              s.some(function(O) {
                return O.name === g;
              }) ? s.forEach(function(O) {
                O.name === g && p.indexOf(O.value) === -1 && e.error("The <" + a + "> tag must have attr '" + g + "' with one value of '" + p.join("' or '") + "'.", r.line, o, n, r.raw);
              }) : e.error("The <" + a + "> tag must have attr '" + g + "'.", r.line, o, n, r.raw);
            } else
              s.some(function(O) {
                return f.split("|").indexOf(O.name) !== -1;
              }) || e.error("The <" + a + "> tag must have attr '" + f + "'.", r.line, o, n, r.raw);
          });
        }
        if (Array.isArray(l.attrsOptional)) {
          var c = l.attrsOptional;
          c.forEach(function(f) {
            if (Array.isArray(f)) {
              var d = f.map(function(O) {
                return O;
              }), g = d.shift(), p = d;
              s.some(function(O) {
                return O.name === g;
              }) && s.forEach(function(O) {
                O.name === g && p.indexOf(O.value) === -1 && e.error("The <" + a + "> tag must have optional attr '" + g + "' with one value of '" + p.join("' or '") + "'.", r.line, o, n, r.raw);
              });
            }
          });
        }
        if (Array.isArray(l.redundantAttrs)) {
          var u = l.redundantAttrs;
          u.forEach(function(f) {
            s.some(function(d) {
              return d.name === f;
            }) && e.error("The attr '" + f + "' is redundant for <" + a + "> and should be ommited.", r.line, o, n, r.raw);
          });
        }
      }
    });
  }
};
var Cl = {};
Object.defineProperty(Cl, "__esModule", { value: !0 });
Cl.default = {
  id: "attr-no-unnecessary-whitespace",
  description: "No spaces between attribute names and values.",
  init: function(i, e, t) {
    var n = this, r = Array.isArray(t) ? t : [];
    i.addListener("tagstart", function(s) {
      for (var o = s.attrs, a = s.col + s.tagName.length + 1, l = 0; l < o.length; l++)
        if (r.indexOf(o[l].name) === -1) {
          var h = /(\s*)=(\s*)/.exec(o[l].raw.trim());
          h && (h[1].length !== 0 || h[2].length !== 0) && e.error("The attribute '" + o[l].name + "' must not have spaces between the name and value.", s.line, a + o[l].index, n, o[l].raw);
        }
    });
  }
};
(function(i) {
  Object.defineProperty(i, "__esModule", { value: !0 });
  var e = Ga;
  Object.defineProperty(i, "altRequire", { enumerable: !0, get: function() {
    return e.default;
  } });
  var t = Fa;
  Object.defineProperty(i, "attrLowercase", { enumerable: !0, get: function() {
    return t.default;
  } });
  var n = Ha;
  Object.defineProperty(i, "attrSort", { enumerable: !0, get: function() {
    return n.default;
  } });
  var r = Ja;
  Object.defineProperty(i, "attrNoDuplication", { enumerable: !0, get: function() {
    return r.default;
  } });
  var s = Ka;
  Object.defineProperty(i, "attrUnsafeChars", { enumerable: !0, get: function() {
    return s.default;
  } });
  var o = $a;
  Object.defineProperty(i, "attrValueDoubleQuotes", { enumerable: !0, get: function() {
    return o.default;
  } });
  var a = _a;
  Object.defineProperty(i, "attrValueNotEmpty", { enumerable: !0, get: function() {
    return a.default;
  } });
  var l = el;
  Object.defineProperty(i, "attrValueSingleQuotes", { enumerable: !0, get: function() {
    return l.default;
  } });
  var h = tl;
  Object.defineProperty(i, "attrWhitespace", { enumerable: !0, get: function() {
    return h.default;
  } });
  var c = il;
  Object.defineProperty(i, "doctypeFirst", { enumerable: !0, get: function() {
    return c.default;
  } });
  var u = nl;
  Object.defineProperty(i, "doctypeHTML5", { enumerable: !0, get: function() {
    return u.default;
  } });
  var f = rl;
  Object.defineProperty(i, "headScriptDisabled", { enumerable: !0, get: function() {
    return f.default;
  } });
  var d = sl;
  Object.defineProperty(i, "hrefAbsOrRel", { enumerable: !0, get: function() {
    return d.default;
  } });
  var g = ol;
  Object.defineProperty(i, "htmlLangRequire", { enumerable: !0, get: function() {
    return g.default;
  } });
  var p = al;
  Object.defineProperty(i, "idClsasAdDisabled", { enumerable: !0, get: function() {
    return p.default;
  } });
  var O = ll;
  Object.defineProperty(i, "idClassValue", { enumerable: !0, get: function() {
    return O.default;
  } });
  var m = hl;
  Object.defineProperty(i, "idUnique", { enumerable: !0, get: function() {
    return m.default;
  } });
  var w = cl;
  Object.defineProperty(i, "inlineScriptDisabled", { enumerable: !0, get: function() {
    return w.default;
  } });
  var C = ul;
  Object.defineProperty(i, "inlineStyleDisabled", { enumerable: !0, get: function() {
    return C.default;
  } });
  var Q = fl;
  Object.defineProperty(i, "inputRequiresLabel", { enumerable: !0, get: function() {
    return Q.default;
  } });
  var b = dl;
  Object.defineProperty(i, "scriptDisabled", { enumerable: !0, get: function() {
    return b.default;
  } });
  var v = gl;
  Object.defineProperty(i, "spaceTabMixedDisabled", { enumerable: !0, get: function() {
    return v.default;
  } });
  var S = Al;
  Object.defineProperty(i, "specCharEscape", { enumerable: !0, get: function() {
    return S.default;
  } });
  var L = pl;
  Object.defineProperty(i, "srcNotEmpty", { enumerable: !0, get: function() {
    return L.default;
  } });
  var x = Ol;
  Object.defineProperty(i, "styleDisabled", { enumerable: !0, get: function() {
    return x.default;
  } });
  var B = ml;
  Object.defineProperty(i, "tagPair", { enumerable: !0, get: function() {
    return B.default;
  } });
  var D = Ql;
  Object.defineProperty(i, "tagSelfClose", { enumerable: !0, get: function() {
    return D.default;
  } });
  var Z = bl;
  Object.defineProperty(i, "tagnameLowercase", { enumerable: !0, get: function() {
    return Z.default;
  } });
  var X = yl;
  Object.defineProperty(i, "tagnameSpecialChars", { enumerable: !0, get: function() {
    return X.default;
  } });
  var H = wl;
  Object.defineProperty(i, "titleRequire", { enumerable: !0, get: function() {
    return H.default;
  } });
  var U = vl;
  Object.defineProperty(i, "tagsCheck", { enumerable: !0, get: function() {
    return U.default;
  } });
  var V = Cl;
  Object.defineProperty(i, "attrNoUnnecessaryWhitespace", { enumerable: !0, get: function() {
    return V.default;
  } });
})(Mg);
(function(i) {
  Object.defineProperty(i, "__esModule", { value: !0 }), i.HTMLParser = i.Reporter = i.HTMLRules = i.HTMLHint = void 0;
  var e = Ya;
  i.HTMLParser = e.default;
  var t = qa;
  i.Reporter = t.default;
  var n = Mg;
  i.HTMLRules = n;
  var r = function() {
    function o() {
      this.rules = {}, this.defaultRuleset = {
        "tagname-lowercase": !0,
        "attr-lowercase": !0,
        "attr-value-double-quotes": !0,
        "doctype-first": !0,
        "tag-pair": !0,
        "spec-char-escape": !0,
        "id-unique": !0,
        "src-not-empty": !0,
        "attr-no-duplication": !0,
        "title-require": !0
      };
    }
    return o.prototype.addRule = function(a) {
      this.rules[a.id] = a;
    }, o.prototype.verify = function(a, l) {
      l === void 0 && (l = this.defaultRuleset), Object.keys(l).length === 0 && (l = this.defaultRuleset), a = a.replace(/^\s*<!--\s*htmlhint\s+([^\r\n]+?)\s*-->/i, function(g, p) {
        return p.replace(/(?:^|,)\s*([^:,]+)\s*(?:\:\s*([^,\s]+))?/g, function(O, m, w) {
          return l[m] = w !== void 0 && w.length > 0 ? JSON.parse(w) : !0, "";
        }), "";
      });
      var h = new e.default(), c = new t.default(a, l), u = this.rules, f;
      for (var d in l)
        f = u[d], f !== void 0 && l[d] !== !1 && f.init(h, c, l[d]);
      return h.parse(a), c.messages;
    }, o.prototype.format = function(a, l) {
      l === void 0 && (l = {});
      var h = [], c = {
        white: "",
        grey: "",
        red: "",
        reset: ""
      };
      l.colors && (c.white = "\x1B[37m", c.grey = "\x1B[90m", c.red = "\x1B[31m", c.reset = "\x1B[39m");
      var u = l.indent || 0;
      return a.forEach(function(f) {
        var d = 40, g = d + 20, p = f.evidence, O = f.line, m = f.col, w = p.length, C = m > d + 1 ? m - d : 1, Q = p.length > m + g ? m + g : w;
        m < d + 1 && (Q += d - m + 1), p = p.replace(/\t/g, " ").substring(C - 1, Q), C > 1 && (p = "..." + p, C -= 3), Q < w && (p += "..."), h.push(c.white + s(u) + "L" + O + " |" + c.grey + p + c.reset);
        var b = m - C, v = p.substring(0, b).match(/[^\u0000-\u00ff]/g);
        v !== null && (b += v.length), h.push(c.white + s(u) + s(String(O).length + 3 + b) + "^ " + c.red + f.message + " (" + f.rule.id + ")" + c.reset);
      }), h;
    }, o;
  }();
  function s(o, a) {
    return new Array(o + 1).join(a || " ");
  }
  i.HTMLHint = new r(), Object.keys(n).forEach(function(o) {
    i.HTMLHint.addRule(n[o]);
  });
})(Wg);
var EC = [{
  name: "Remove Attribute",
  apply(i, e, t) {
    i.dispatch({
      changes: { from: e, to: t, insert: "" }
    });
  }
}, {
  name: "Rename Attribute",
  apply(i, e, t) {
    const [n, r] = i.state.doc.slice(e, t).toString().match(/(?:\s+)?(\w+)=/), s = e + n.indexOf(r), o = i.state.update({
      selection: {
        anchor: s,
        head: s + r.length
      },
      scrollIntoView: !0
    });
    i.dispatch(o), i.focus();
  }
}], xC = [{
  name: "Fix Error",
  apply(i, e, t) {
    i.dispatch({
      changes: { from: e, to: t, insert: "" }
    });
  }
}], BC = [{
  name: "Fix Error",
  apply(i, e, t) {
    const n = {
      "<": "&lt;",
      ">": "&rt;",
      "&": "&amp;"
    }, [r, s] = i.state.doc.slice(e, t).toString().match(/(?:\s+)?([<&>]|\&\s)/), o = r.indexOf(s);
    i.dispatch({
      changes: { from: e + o, to: e + o + 1, insert: n[s] }
    });
  }
}], IC = [{
  name: "Remove Img",
  apply(i, e, t) {
    const n = i.state.tree.cursor(e);
    i.dispatch({
      changes: { from: n.from, to: n.to, insert: "" }
    });
  }
}];
let TC = class {
  constructor(e, t, n) {
    this.from = t, this.to = n, this.tagName = Xg(e, t, n), this.closed = !1;
  }
  is(e) {
    return this.tagName.toLowerCase() === e.toLowerCase();
  }
};
function Xg(i, e, t) {
  return i.state.doc.sliceString(e, t).toLowerCase().match(/^<\/?(?:\s+)?(\w+)/)[1];
}
function cu(i, e, t) {
  let n, r, s = [];
  return i.state.tree.iterate({
    from: e,
    to: t,
    enter(o, a, l, h) {
      o.name === "Element" ? s.push(n = new TC(i, a, l)) : o.name === "SelfClosingTag" && s.splice(s.indexOf(n), 1);
    },
    leave(o, a, l) {
      if (o.name === "CloseTag") {
        for (r = s.length - 1; r >= 0; r--)
          if (!s[r].closed && s[r].is(Xg(i, a, l))) {
            s[r].closed = !0;
            break;
          }
      }
    }
  }), s.filter((o) => !o.closed).reverse().map(({ to: o, tagName: a }) => ({
    from: o,
    to: o,
    insert: `</${a}>`
  }));
}
function uu(i, { message: e }) {
  return e.indexOf("Tag must be paired, no start tag") === -1;
}
var PC = [{
  name: "Close Only First Tag",
  validate: uu,
  apply(i, e, t) {
    let n = [];
    do
      n = cu(i, e, t), e -= 10;
    while (e >= 0 && !n.length);
    i.dispatch({
      changes: n.slice(0, 1)
    });
  }
}, {
  name: "Close All Tags",
  validate: uu,
  apply(i, e, t) {
    i.dispatch({
      changes: cu(i)
    });
  }
}], RC = [{
  name: "Fix Path",
  apply(i, e, t) {
    const n = i.state.doc.slice(e, t).toString().match(/(=(?:\s+)?['"])(.+)?['"]/), [r, s, o] = n, a = e + s.length + n.index, l = i.state.update({
      selection: {
        anchor: a,
        head: a + (o ? o.length : 0)
      },
      scrollIntoView: !0
    });
    i.dispatch(l), i.focus();
  }
}, {
  name: "Remove Attribute",
  apply(i, e, t) {
    i.dispatch({
      changes: { from: e, to: t, insert: "" }
    });
  }
}, {
  name: "Remove Tag",
  apply(i, e, t) {
    const n = i.state.tree.cursor(e);
    n.moveTo(n.to), i.dispatch({
      changes: { from: n.from, to: n.to, insert: "" }
    });
  }
}];
const DC = EC, LC = xC, WC = BC, MC = IC, XC = PC, jC = RC;
var ZC = {
  "attr-no-duplication": DC,
  "invalid-attribute-char": LC,
  "spec-char-escape": WC,
  "src-not-empty": MC,
  "tag-pair": XC,
  "valid-path-format": jC
};
const NC = [
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "link",
  "meta",
  "param",
  "embed",
  "track",
  "command",
  "source",
  "keygen",
  "wbr"
];
class Jo {
  constructor(e, t) {
    e = e || {};
    const n = e.tagName && e.tagName.toLowerCase();
    this.children = [], this.root === t ? this.root = !0 : (this.closed = !!e.close || NC.indexOf(n) > -1, this.parent = t, this.tagName = n, this.attrs = e.attrs, this.from = e.pos, this.to = null, this.col = e.col, this.line = e.line, this.raw = e.raw);
  }
  get depth() {
    let e = 0, t = this.parent;
    for (; t.parent; )
      e++, t = t.parent;
    return e;
  }
  close(e, t) {
    this.to = e.pos + e.raw.length, this.raw = t.html.slice(this.from, this.to);
  }
  push(e) {
    return this.children.push(e);
  }
  before(e) {
    return this.children.slice(0, e);
  }
  after(e) {
    return this.children.slice(e + 1);
  }
  find(...e) {
    const t = (n) => n.reduce((r, s) => (s.match(...e) && r.push(s), s.children.length && (r = r.concat(t(s.children))), r), []);
    return t(this.children);
  }
  findFirst(e) {
    return this.find(e)[0];
  }
  index() {
    return this.parent ? this.parent.children.indexOf(this) : 0;
  }
  isChildOf(e) {
    return this.parent === e;
  }
  isBefore(e) {
    return this.index() < e.index();
  }
  isAfter(e) {
    return this.index() > e.index();
  }
  isFirst() {
    return !this.parent || this.index() === 0;
  }
  isLast() {
    return !this.parent || this.index() === this.parent.children.length - 1;
  }
  first() {
    return this.children[0];
  }
  match(...e) {
    return e.indexOf(this.tagName && this.tagName.toLowerCase()) > -1;
  }
}
let zC = class {
  constructor(e, t, n) {
    this.reporter = t;
    const r = [], s = new Jo();
    let o = s;
    e.addListener("tagstart", (a) => {
      const l = new Jo(a, o);
      o.push(l), l.closed || r.push(o = l);
    }), e.addListener("tagend", (a) => {
      const l = a.tagName.toLowerCase();
      let h;
      for (h = r.length - 1; h >= 0 && r[h].tagName !== l; h--)
        ;
      r[h] && (r[h].close(a, this.reporter), o = r[h].parent, r.splice(h, 1));
    }), e.addListener("end", (a) => {
      s.closed = !0, n && n(s);
    });
  }
};
var Ht = {
  EventNode: Jo,
  EventTree: zC
};
const { EventTree: UC } = Ht;
var VC = {
  id: "body-no-duplicates",
  description: "The body tag must not be a duplicate.",
  init(i, e, t) {
    new UC(i, e, (n) => {
      let r;
      for (let s of n.find("body")) {
        if (!r) {
          r = s;
          continue;
        }
        e.error(
          `The [ body ] tag already exists on line ${r.line}.`,
          s.line,
          s.col,
          this,
          s.raw
        );
      }
    });
  }
};
const { EventTree: YC } = Ht;
var qC = {
  id: "head-body-descendents-html",
  description: "The head and body tags must be a direct child descendents of the html tag.",
  init(i, e, t) {
    new YC(i, e, (n) => {
      const r = n.findFirst("html");
      n.find("head", "body").filter((s) => !r || !s.isChildOf(r)).forEach((s) => {
        const { line: o, col: a, raw: l } = s, h = r ? `The [ ${s.tagName} ] tag must be a direct child descendent of the [ html ] tag on line ${r.line}.` : `The [ ${s.tagName} ] tag must be a direct child descendent of an [ html ] tag.`;
        e.error(h, o, a, this, l);
      });
    });
  }
};
const { EventTree: GC } = Ht;
var FC = {
  id: "head-no-duplicates",
  description: "The head tag must not be a duplicate.",
  init(i, e, t) {
    new GC(i, e, (n) => {
      let r;
      for (let s of n.find("head")) {
        if (!r) {
          r = s;
          continue;
        }
        e.error(
          `The [ head ] tag is a duplicate of the tag on line ${r.line}.`,
          s.line,
          s.col,
          this,
          s.raw
        );
      }
    });
  }
};
const { EventTree: HC } = Ht;
var JC = {
  id: "head-valid-children",
  description: "The head tag must only contain valid elements.",
  init(i, e, t) {
    const n = Array.isArray(t) ? t : [
      "base",
      "link",
      "meta",
      "noscript",
      "script",
      "style",
      "template",
      "title"
    ];
    new HC(i, e, (r) => {
      for (let s of r.find("head"))
        for (let o of s.children) {
          if (n.indexOf(o.tagName.toLowerCase()) > -1)
            return;
          e.error(
            `The [ ${o.tagName} ] tag is not allowed inside the [ head ] tag on line ${s.line}.`,
            o.line,
            o.col,
            this,
            o.raw
          );
        }
    });
  }
};
const { EventTree: KC } = Ht;
var $C = {
  id: "html-valid-children-order",
  description: "The head and body tags must be in the correct order.",
  init(i, e, t) {
    new KC(i, e, (n) => {
      const r = n.findFirst("html"), s = n.find("head", "body").filter((l) => !r || l.isChildOf(r)), o = s.filter((l) => l.tagName === "body"), a = s.filter((l) => l.tagName === "head");
      if (o[0] && a[0] && o[0].isBefore(a[0])) {
        const { line: l, col: h, raw: c } = o[0], u = `The [ ${o[0].tagName} ] tag must come after the [ head ] tag on line ${a[0].line}.`;
        e.error(u, l, h, this, c);
      }
      if (o[0] && a[0] && a[0].isAfter(o[0])) {
        const { line: l, col: h, raw: c } = a[0], u = `The [ ${a[0].tagName} ] tag must come before the [ body ] tag on line ${o[0].line}.`;
        e.error(u, l, h, this, c);
      }
    });
  }
};
const { EventTree: _C } = Ht;
var eS = {
  id: "html-no-duplicates",
  description: "The html tag must be a unique root element.",
  init(i, e, t) {
    new _C(i, e, (n) => {
      const r = n.find("html");
      r.filter((s) => s !== r[0]).forEach((s) => {
        const { line: o, col: a, raw: l } = s, h = `The [ ${s.tagName} ] tag already exists on line ${r[0].line}.`;
        e.error(h, o, a, this, l);
      });
    });
  }
};
const { EventTree: tS } = Ht;
var iS = {
  id: "html-root-node",
  description: "The html tag must be the only root node in the document.",
  init(i, e, t) {
    new tS(i, e, (n) => {
      const r = n.findFirst("html");
      r && n.children.filter((s) => s.tagName !== "html").forEach((s) => {
        const { line: o, col: a, raw: l } = s, h = `The [ ${s.tagName} ] cannot come ${s.isBefore(r) ? "before" : "after"} the [ html ] tag on line ${r.line}.`;
        e.error(h, o, a, this, l);
      });
    });
  }
};
const { EventTree: nS } = Ht;
var rS = {
  id: "html-valid-children",
  description: "The html tag must only contain a head and body tag.",
  init(i, e, t) {
    new nS(i, e, (n) => {
      const r = n.findFirst("html");
      r && r.children.forEach((s) => {
        if (!s.match("head", "body")) {
          const { line: o, col: a, raw: l } = s, h = `The [ ${s.tagName} ] tag cannot be a direct descendent of the [ html ] tag on line ${r.line}.`;
          e.error(h, o, a, this, l);
        }
      });
    });
  }
}, sS = {
  id: "img-src-required",
  description: "The img tag must have a src attribute.",
  init(i, e, t) {
    i.addListener("tagstart", (n) => {
      if (n.tagName.toLowerCase() === "img") {
        for (let l of n.attrs)
          if (l.name.toLowerCase() === "src")
            return;
        const { line: r, col: s, raw: o } = n, a = `The [ ${n.tagName} ] tag must have a [ src ] attribute`;
        e.error(a, r, s, this, o);
      }
    });
  }
}, oS = {
  id: "invalid-attribute-char",
  description: "Attribute must contain valid characters.",
  init(i, e, t) {
    i.addListener("tagstart", (n) => {
      let r = 1;
      n.attrs.forEach(({ name: s, index: o }) => {
        r += n.raw.slice(r).indexOf(s);
        let a = 0;
        const l = s.match(/[^a-zA-Z:\-1-9]/g);
        if (l)
          for (; l.length; ) {
            const h = s.slice(a), c = l.shift(), u = h.indexOf(c);
            e.error(
              `[ ${c} ] character cannot be used for attribute names.`,
              n.line,
              n.col + r + a + u,
              this,
              c
            ), a += u + 1;
          }
      });
    });
  }
};
const aS = {
  absolute: /^https?:\/\//,
  relative: /^\w+?:/
};
class lS {
  constructor(e) {
    const { name: t, pattern: n } = Object.assign({
      pattern: null,
      name: null
    }, typeof e == "object" ? e : {
      pattern: e
    });
    this.name = t || n, this.pattern = n, this.regex = aS[n] || new RegExp(n);
  }
  test(e) {
    return this.regex.test(e);
  }
  error(e, t) {
    return new hS(this, e, t);
  }
}
class hS extends Error {
  constructor(e, t, n) {
    super(), this.message = `The [ ${n.name} ] attribute "${n.value}" must follow the ${e.name} format.`, this.name = e.name, this.line = t.line, this.col = t.col + t.tagName.length + 1 + n.index;
  }
}
class cS extends Error {
  constructor(e, t, n) {
    super(t.length === 1 ? t[0].message : `The [ ${n.name} ] attribute "${n.value}" must one of the following formats: ${t.map((r) => `"${r.name}"`).join(", ")}.`), this.line = e.line, this.col = e.col + e.tagName.length + 1 + n.index;
  }
}
function uS(i, e, t) {
  const n = [];
  for (const [r, s] of Object.entries(i)) {
    if (s.test(t.value))
      return !0;
    n.push(s.error(e, t));
  }
  throw new cS(e, n, t);
}
var fS = {
  id: "valid-path-format",
  description: "Paths must be a valid format.",
  init(i, e, t) {
    t = Array.isArray(t) ? t : [], i.addListener("tagstart", (n) => {
      t.forEach((r) => {
        r = Object.assign({
          formats: []
        }, r || {});
        const s = r.formats.map((o) => new lS(o));
        r.tag && !Array.isArray(r.tag) && (r.tag = [r.tag]), (!r.tag || r.tag.indexOf(n.tagName) > -1) && n.attrs.forEach((o) => {
          if (!r.attr || r.attr === o.name)
            try {
              uS(s, n, o);
            } catch (a) {
              e.error(
                a.message,
                a.line,
                a.col,
                this,
                o.raw
              );
            }
        });
      });
    });
  }
}, dS = {
  id: "nested-paragraphs",
  description: "Nested paragraphs are prohibited.",
  init(i, e) {
    let t = !1;
    const n = [];
    i.addListener("tagstart", (r) => {
      r.tagName.toLowerCase() === "p" && (t ? n.push(r) : t = r);
    }), i.addListener("tagend", (r) => {
      const s = r.tagName.toLowerCase() === "p";
      if (t && s) {
        const [o] = n.splice(n.length - 1);
        if (!o) {
          t = !1;
          return;
        }
        e.error(
          `[ p ] tags cannot be nested inside the [ p ] tag on line ${t.line}.`,
          o.line,
          o.col,
          this,
          e.html.slice(o.pos, r.pos + r.raw.length)
        );
      } else
        s || (t = !1);
    }), i.addListener("end", (r) => {
      t && n.length && n.forEach((s) => {
        e.error(
          `[ p ] tags cannot be nested inside the [ p ] tag on line ${t.line}.`,
          s.line,
          s.col,
          this,
          e.html.slice(s.pos, r.lastEvent.pos + r.lastEvent.raw.length)
        );
      });
    });
  }
};
const gS = VC, AS = qC, pS = FC, OS = JC, mS = $C, QS = eS, bS = iS, yS = rS, wS = sS, vS = oS, CS = fS, SS = dS;
var kS = {
  "body-no-duplicates": gS,
  "head-body-descendents-html": AS,
  "head-no-duplicates": pS,
  "head-valid-children": OS,
  "html-valid-children-order": mS,
  "html-no-duplicates": QS,
  "html-root-node": bS,
  "html-valid-children": yS,
  "img-src-required": wS,
  "invalid-attribute-char": vS,
  "nested-paragraphs": SS,
  "valid-path-format": CS
};
const jg = hC, { HTMLHint: Zg } = Wg, ES = ZC, fu = kS;
Object.keys(fu).forEach((i) => {
  Zg.addRule(fu[i]);
});
function Ng(i, e) {
  return Zg.verify(i, e || jg).map((t) => (t.rule.link = t.rule.link.replace(
    "https://github.com/thedaviddias/HTMLHint/wiki/",
    "https://thecapsule.email/docs/codes/"
  ), t));
}
function xS(i, e) {
  return Ng(i, e || jg).map((t) => (t.rule.actions = ES[t.rule.id] || [], t));
}
var BS = {
  lint: xS,
  verify: Ng
};
og[0].run = () => {
};
class du extends Ot {
  constructor(e) {
    super(), this.diagnostic = e;
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
class dn {
  constructor(e) {
    this.decorations = e;
  }
  get length() {
    return this.decorations.length;
  }
  get diagnostics() {
    const e = [];
    return this.iter((t) => {
      e.push(t.value);
    }), e.reduce((t, { widget: n }) => (t.indexOf(n.diagnostic) === -1 && t.push(n.diagnostic), t), []);
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
    return this.iter((n) => {
      if (n.value.spec.side)
        n.value.widget.to(n.to);
      else {
        const r = e.doc.lineAt(n.from);
        n.value.widget.col(n.from - r.from + 1), n.value.widget.from(n.from), n.value.widget.line(r.number);
      }
      t.push(n.value);
    }), t.reduce((n, { widget: r }) => (n.indexOf(r.diagnostic) === -1 && n.push(r.diagnostic), n), []);
  }
  static init(e, t) {
    const n = e.map((r) => {
      const s = T.widget({
        widget: new du(r),
        diagnostic: r,
        side: 0
      }).range(r.from), o = T.widget({
        widget: new du(r),
        diagnostic: r,
        side: 1,
        from: s
      }).range(r.to);
      return [
        s,
        o
      ];
    });
    return new dn(
      T.set(n.flat(), !0)
    );
  }
}
const Ko = W.define(), Ar = Oe.define({
  create() {
    return new dn(T.none);
  },
  update(i, e) {
    if (e.docChanged && i.length)
      return new dn(i.map(e.changes));
    for (let t of e.effects)
      if (t.is(Ko))
        return dn.init(t.value);
    return i;
  },
  provide(i) {
    return [
      Qb((e) => {
        const { doc: t } = e.state.toJSON(), n = BS.lint(t).map((r) => {
          const s = e.state.doc.line(r.line), o = Math.min(t.length, s.from - 1 + r.col), a = Math.min(t.length, o + r.raw.length);
          return {
            from: o,
            to: a,
            col: r.col,
            line: r.line,
            rule: r.rule,
            message: r.message,
            severity: r.type,
            source: r.rule.id
          };
        });
        return e.dispatch({
          effects: Ko.of(n)
        }), n;
      }),
      I.decorations.from(i, (e) => e.decorations),
      I.updateListener.of((e) => {
        e.docChanged && e.state.field(Ar).sync(e.view.state);
      })
    ];
  }
});
function IS(i) {
  return [
    Ar,
    ui.of((e) => ({
      bottom: !0,
      dom: i.$refs.footer.$el
    })),
    I.updateListener.of((e) => {
      if (i.$refs.footer) {
        e.docChanged && i.$refs.footer.update(
          e.state.field(Ar).diagnostics
        );
        for (let t of e.transactions)
          for (let n of t.effects)
            n.is(Ko) && i.$refs.footer.update(
              e.state.field(Ar).diagnostics
            );
        i.$refs.footer.activate(e);
      }
    })
  ];
}
function TS(i, e, t) {
  return [
    le.fromClass(class {
      constructor(n) {
        i.currentContent = n.state.doc.toString();
      }
    }),
    I.updateListener.of((n) => {
      n.docChanged && (i.currentContent = n.state.doc.toString());
    }),
    ui.of((n) => ({
      top: !0,
      dom: i.$refs.toolbar.$el
    }))
  ];
}
const PS = Ce({
  components: {
    AnimateCss: Ma,
    Btn: Xa,
    // EditorDemoModal,
    EditorFooter: H1,
    EditorModal: eC,
    EditorToolbar: lC
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
      view: null
    };
  },
  watch: {
    currentContent() {
      this.input();
    },
    currentFilename() {
      this.input();
    },
    errors(i, e) {
      !i.length && e.length && this.$emit("fixed-errors");
    },
    showFinishModal(i) {
    }
  },
  created() {
  },
  mounted() {
    this.view = new I({
      state: Y.create({
        doc: this.currentContent,
        // || this.getSlotContents(),
        extensions: [
          Bw,
          ...Cb,
          Bn.of([hQ]),
          Ow(),
          this.toolbar && TS(this),
          IS(this),
          I.lineWrapping,
          I.updateListener.of((i) => {
            i.docChanged && (this.currentContent = i.state.doc.toString());
          })
        ].filter((i) => !!i)
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
    //     const tr = this.view.state.update({
    //         selection: {
    //             anchor: from,
    //             head: to
    //         },
    //         scrollIntoView: true
    //     });
    //     this.view.dispatch(tr);
    //     this.view.focus();
    // },
    onSave() {
      this.save(this);
    }
  }
}), RS = "data:image/png;base64,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";
const DS = { class: "capsule-editor" }, LS = {
  key: 0,
  src: RS,
  class: "capsule-editor-modal-logo"
}, WS = { class: "text-center" }, MS = /* @__PURE__ */ ne("h1", null, " Success! ", -1), XS = /* @__PURE__ */ ne("h5", null, " Your document has been fixed. ", -1), jS = {
  ref: "wrapper",
  class: "cm-wrapper"
};
function ZS(i, e, t, n, r, s) {
  const o = $("animate-css"), a = $("btn"), l = $("editor-modal"), h = $("editor-toolbar"), c = $("editor-footer");
  return j(), ie("div", DS, [
    i.showFinishModal ? (j(), fe(l, {
      key: 0,
      "content-animation": { name: "tada" }
    }, {
      default: z(({ isShowing: u }) => [
        N(i.$slots, "success", {
          close: i.closeFinishPopup,
          filename: i.currentFilename,
          view: i.view,
          isShowing: u
        }, () => [
          de(o, {
            name: "zoom",
            left: ""
          }, {
            default: z(() => [
              u ? (j(), ie("img", LS)) : ue("", !0)
            ]),
            _: 2
          }, 1024),
          N(i.$slots, "success-content", {
            content: i.currentContent,
            close: i.closeFinishPopup,
            filename: i.currentFilename,
            view: i.view
          }, () => [
            ne("div", WS, [
              MS,
              XS,
              de(a, {
                type: "button",
                variant: "primary",
                size: "lg",
                block: "",
                onClick: i.closeFinishPopup
              }, {
                default: z(() => [
                  gt(" Dismiss ")
                ]),
                _: 1
              }, 8, ["onClick"])
            ])
          ])
        ])
      ]),
      _: 3
    })) : ue("", !0),
    i.toolbar ? (j(), fe(h, {
      key: 1,
      ref: "toolbar",
      modelValue: i.currentFilename,
      "onUpdate:modelValue": e[0] || (e[0] = (u) => i.currentFilename = u),
      "demo-mode": i.demoMode,
      "disable-filename": i.disableFilename,
      filename: i.currentFilename,
      onDemoModal: e[1] || (e[1] = () => i.demoModalCleared = !1)
    }, {
      left: z(() => [
        N(i.$slots, "toolbar-left", {
          errors: i.errors,
          filename: i.currentFilename,
          content: i.currentContent
        })
      ]),
      right: z(() => [
        N(i.$slots, "toolbar-right", {
          errors: i.errors,
          filename: i.currentFilename,
          content: i.currentContent
        })
      ]),
      _: 3
    }, 8, ["modelValue", "demo-mode", "disable-filename", "filename"])) : ue("", !0),
    ne("div", jS, null, 512),
    de(c, {
      ref: "footer",
      modelValue: i.errors,
      "onUpdate:modelValue": e[2] || (e[2] = (u) => i.errors = u),
      "save-button": i.saveButton,
      view: i.view,
      onSave: i.onSave
    }, {
      "before-save-button": z(() => [
        N(i.$slots, "before-save-button", {
          errors: i.errors,
          filename: i.currentFilename,
          content: i.currentContent
        })
      ]),
      "save-button": z(() => [
        N(i.$slots, "save-button", {
          errors: i.errors,
          filename: i.currentFilename,
          content: i.currentContent
        })
      ]),
      "after-save-button": z(() => [
        N(i.$slots, "after-save-button", {
          errors: i.errors,
          filename: i.currentFilename,
          content: i.currentContent
        })
      ]),
      _: 3
    }, 8, ["modelValue", "save-button", "view", "onSave"])
  ]);
}
const HS = /* @__PURE__ */ Ln(PS, [["render", ZS]]);
export {
  HS as Editor
};
//# sourceMappingURL=capsule-editor.js.map

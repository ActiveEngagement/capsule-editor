import { debounce } from 'lodash';
import CodeMirror from 'codemirror';
import isTagInRange from './Helpers/isTagInRange';
import fontawesome from '@fortawesome/fontawesome';
import isPositionInRange from './Helpers/isPositionInRange';
import { faBug, faExclamation } from '@fortawesome/free-solid-svg-icons';

const debounced = debounce(fn => fn(), 500);

const GUTTER_ID = 'CodeMirror-lint-errors';
const UNDERLINE_CLASS = 'CodeMirror-lint-error-underline';

let nextId = 0;

export default class LintError {
    
    constructor(cm, error) {
        this.id = nextId++;
        this.cm = cm;
        this.msg = error.msg;
        this.code = error.code;
        this.rule = error.rule;
        this.match = error.match;
        // Subtract one from ch and line because the API returns the base as 1
        // but CodeMirror uses a base of 0.
        this.ch = error.column - 1;
        this.line = error.line - 1;
        
        this.gutter = this.createGutter();
        this.bookmark = this.createBookmark();

        if((this.open && isPositionInRange(this.cm.getCursor(), this.open.from, this.open.to)) ||
            this.close && isPositionInRange(this.cm.getCursor(), this.close.from, this.close.to)) {
            this.show();
        }

        this.on('change', this.onChange);
        this.on('changes', this.onChanges);
        this.on('beforeChange', this.onBeforeChange);
        this.on('cursorActivity', this.onCursorActivity);
    }

    set bookmark(value) {
        this.$bookmark = value;

        this.$bookmark.on('clear', () => {
            const index = this.cm.state.lint.getErrorIndex(this);

            if(index !== -1) {
                this.cm.state.lint.errors.splice(this.cm.state.lint.getErrorIndex(this), 1);
            }

            this.clearGutter();
        });

        if(this.open) {
            this.$bookmark.open = this.markText(this.open);
        }

        if(this.close) {
            this.$bookmark.close = this.markText(this.close);
        }
    }

    get bookmark() {
        return this.$bookmark;
    }

    set ch(value) {
        this.$ch = value;
    }

    get ch() {
        if(this.open) {
            return this.ch = this.open.from.ch;
        }
        else if(this.close) {
            return this.ch = this.close.from.ch;
        }
        
        return this.$ch;
    }

    get close() {
        return this.tag && this.tag.close;
    }

    set cm(value) {
        this.$cm = value;
    }

    get cm() {
        return this.$cm;
    }

    set lastChange(value) {
        this.$lastChange = value;
    }

    get lastChange() {
        return this.$lastChange;
    }

    set line(value) {
        this.$line = value;
    }

    get line() {
        if(this.open) {
            return this.line = this.open.from.line;
        }
        else if(this.close) {
            return this.line = this.close.from.line;
        }
        
        return this.$line;
    }

    get open() {
        return this.tag && this.tag.open;
    }

    set markText(value) {
        this.$markedText = value || {};
    }

    get markText() {
        return this.$markedText;
    }

    set match(value) {
        this.$match = value;
    }

    get match() {
        return this.$match;
    }

    set msg(value) {
        this.$msg = value;
    }

    get msg() {
        return this.$msg;
    }

    get formattedMsg() {
        return `${fontawesome.icon(faExclamation).html} <span>${this.line + 1},${this.ch + 1} :: ${this.rule} ${this.msg} (${this.code})</span>`;
    }

    get isActive() {
        return this.nearby(this.cm.getCursor());
    }

    get isCursorInsideTag() {
        const { line, ch } = this.cm.getCursor();

        return this.nearby({ line, ch: ch - 1});
    }

    get isAttachedToDom() {
        return this.bookmark && this.bookmark.widgetNode && document.body.contains(this.bookmark.widgetNode);
    }

    get isNotVisible() {
        return this.isAttachedToDom && !this.bookmark.widgetNode.classList.contains('show');
    }

    get isVisible() {
        return this.isAttachedToDom && this.bookmark.widgetNode.classList.contains('show');
    }

    set rule(value) {
        this.$rule = value;
    }

    get rule() {
        return this.$rule;
    }

    get tag() {
        return this.bookmark && this.findMatchingTag(this.bookmark.find());
    }

    clearGutter(line) {
        if(line === undefined) {
            line = this.line;
        }

        if(!this.cm.state.lint.findErrorsOnLine(line).length) {
            this.cm.setGutterMarker(line, 'capsule-lint', null);
        }
    }

    createGutter() {
        return this.cm.setGutterMarker(this.line, 'capsule-lint', this.createGutterIcon());
    }
    
    createGutterIcon() {
        const icon = document.createElement('div');

        icon.className = 'CodeMirror-lint-error-icon';
        icon.innerHTML = fontawesome.icon(faBug).html;
        icon.title = this.formattedMsg;
        icon.error = this;

        return icon;
    }

    createBookmark() {
        const tag = this.findMatchingTag({
            line: this.line,
            ch: this.ch
        });

        const pos = tag && (tag.open || tag.close);

        return pos && this.cm.setBookmark(pos.from, {
            insertLeft: tag.open ? true : false,
            widget: this.createWidgetNode()
        });
    }

    createWidgetNode() {
        const div = document.createElement('div');

        div.className = 'CodeMirror-lint-error-bookmark';
        div.innerHTML = `<div class="CodeMirror-lint-error-bookmark-text">${this.formattedMsg}</div>`;

        div.addEventListener('click', e => this.hide());

        document.documentElement.appendChild(div);

        return div;
    }

    findMatchingTag(pos) {
        return pos && CodeMirror.findMatchingTag(this.cm, pos, this.cm.getViewport());
    }

    markText({from, to}) {
        return this.cm.markText(from, to, {
            title: this.msg,
            className: UNDERLINE_CLASS
        });
    }

    nearby(pos) {
        if(this.open) {
            return isPositionInRange(pos, this.open.from, this.open.to);
        }
        else if(this.close) {
            return isPositionInRange(pos, this.close.from, this.close.to);
        }
        
        return false;
    }

    redraw() {
        this.bookmark.widgetNode.querySelector('.CodeMirror-lint-error-bookmark-text').innerHTML = this.formattedMsg;
    }
    
    inRange(from, to) {
        return this.tag && isTagInRange(this.tag, from, to);
    }

    hide() {
        this.isVisible && this.bookmark.widgetNode.classList.remove('show');
    }

    show() {
        this.redraw();
        this.isNotVisible && this.bookmark.widgetNode.classList.add('show');
    }

    focus() {
        this.cm.setCursor(this.open);
        this.cm.focus();
    }

    clear() {
        if(this.bookmark) {
            this.bookmark.open && this.bookmark.open.clear();
            this.bookmark.close && this.bookmark.close.clear();
            this.cm.state.lint.$nextTick(() => {
                this.bookmark.clear();
            });
        }
    }

    lint() {
        debounced(() => this.cm.lint());
    }

    on(name, fn) {
        const callback = (...args) => {
            if(this.isAttachedToDom) {
                fn.apply(this, args);
            }
            else {
                this.cm.off(name, callback);
            }
        };

        this.cm.on(name, callback);
    }

    onChange(cm, change) {
        const isNonOpeningTag = this.cm.state.lint.isNonClosingTagOpened(this.tag);

        if(this.close) {
            this.$bookmark.close && this.$bookmark.close.clear();
            this.$bookmark.close = this.markText(this.close);
        }
        
        if(this.isCursorInsideTag && (this.close && this.lastChange.close || isNonOpeningTag)) {
            this.lint();
        }

        if(this.isVisible) {
            this.redraw();
        }

        if(this.lastChange.open && !this.open) {
            this.clear();
        }

        if(!this.open && !this.close) {
            this.clearGutter(this.lastChange.change.from.line);
        }
        else if((this.lastChange && this.lastChange.change.from.line !== this.line)) {
            this.clearGutter(this.lastChange.change.from.line);
            this.createGutter();
        }
    }

    onChanges(cm, e) {
        if(!this.tag) {
            this.clear();
        }
    }

    onBeforeChange(cm, change) {
        this.lastChange = {
            change,
            open: this.open,
            close: this.close
        };
    }

    onCursorActivity(cm) {
        if(this.bookmark.widgetNode) {
            this.bookmark.widgetNode.classList[this.isActive ? 'add' : 'remove']('show');
        }
    }

    static compare(a, b) {
        return (a && a.id === b && b.id) || (
            (a && a.line) === (b && b.line) &&
            (a && a.ch) === (b && b.ch) &&
            (a && a.code) === (b && b.code)
        );
    }
}

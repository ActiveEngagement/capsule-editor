import { debounce } from 'lodash';
import CodeMirror from 'codemirror';
import fontawesome from '@fortawesome/fontawesome';
import isPositionInRange from './Helpers/isPositionInRange';
import { faBug, faExclamation } from '@fortawesome/free-solid-svg-icons';

const debounced = debounce(fn => fn(), 333);

const GUTTER_ID = 'CodeMirror-lint-errors';
const UNDERLINE_CLASS = 'CodeMirror-lint-error-underline';

let nextId = 0;

export default class LintError {
    
    constructor(cm, error) {
        this.id = ++nextId;
        this.cm = cm;
        //this.markedText = {};
        this.msg = error.msg;
        this.code = error.code;
        this.rule = error.rule;
        this.match = error.match;
        this.ch = error.column - 1;
        this.line = error.line - 1;
        this.bookmark = this.createBookmark();

        const { line, ch } = this.cm.getCursor();

        if((this.open && isPositionInRange(this.cm.getCursor(), this.open.from, this.open.to)) ||
            this.close && isPositionInRange(this.cm.getCursor(), this.close.from, this.close.to)) {
            this.show();
        }


        this.on('change', this.onChange);
        this.on('changes', this.onChanges);
        this.on('beforeChange', this.onBeforeChange);
        // this.on('cursorActivity', this.onCursorActivity);
    }

    set bookmark(value) {
        this.$bookmark = value;

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

    get shouldSendLintRequest() {
        console.log(this.close, this.lastChange);

        /*
        if(this.lastChange && !!this.lastChange.close !== !!this.close) {
            return true;
        }
        else if(this.lastChange && !!this.lastChange.open !== !!this.open) {
            return true;
        }
        else if(this.isEditing) {
            return true;
        }
        */

        return false;
    }

    get isEditing() {
        if(this.open && isPositionInRange(this.cm.getCursor(), this.open.from, this.open.to)) {
            return true;
        }
        else if(this.close && isPositionInRange(this.cm.getCursor(), this.close.from, this.close.to)) {
            return true;
        }
        
        return false;
    }

    get isAttachedToDom() {
        return document.body.contains(this.bookmark.widgetNode);
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

    get open() {
        return this.tag && this.tag.open;
    }

    get close() {
        return this.tag && this.tag.close;
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

    redraw() {
        this.bookmark.widgetNode.querySelector('.CodeMirror-lint-error-bookmark-text').innerHTML = this.formattedMsg;
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

    isActive() {
        return (
            this.open && isPositionInRange(this.cm.getCursor(), this.open.from, this.open.to)
        ) || (
            this.close && isPositionInRange(this.cm.getCursor(), this.close.from, this.close.to)
        );
    }

    inRange(from, to) {
        console.log(from, to);
    }

    isVisible() {
        return this.isAttachedToDom && this.bookmark.widgetNode.classList.contains('show');
    }

    isNotVisible() {
        return this.isAttachedToDom && !this.bookmark.widgetNode.classList.contains('show');
    }

    hide() {
        this.isVisible() && this.bookmark.widgetNode.classList.remove('show');
    }

    show() {
        this.isNotVisible() && this.bookmark.widgetNode.classList.add('show');
    }

    clear() {
        this.bookmark.clear();
        this.bookmark.open && this.bookmark.open.clear();
        this.bookmark.close && this.bookmark.close.clear();
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
        if(this.close) {
            this.$bookmark.close && this.$bookmark.close.clear();
            this.$bookmark.close = this.markText(this.close);
        }

        if((this.close && this.lastChange.close) || this.isEditing) {
            debounced(() => this.cm.lint());
        }
    }

    onChanges(cm, e) {
        this.redraw();

        if(!this.tag) {
            this.clear();
            this.lint();
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
        console.log('asd');
    }

    static compare(a, b) {
        return (a && a.id === b && b.id) || (
            (a && a.line) === (b && b.line) &&
            (a && a.ch) === (b && b.ch) &&
            (a && a.code) === (b && b.code)
        );
    }

    /*
    toJSON() {
        return {
            code: this.code,
            column: this.ch,
            line: this.line + 1,
            match: this.match,
            msg: this.msg,
            rule: this.rule
        };
    }
    */
}

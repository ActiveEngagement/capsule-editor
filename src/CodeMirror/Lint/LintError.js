import CodeMirror from 'codemirror';
import formatError from '../../Helpers/formatError';
import isTagInRange from '../../Helpers/isTagInRange';
import fontawesome from '@fortawesome/fontawesome';
import isPositionInRange from '../../Helpers/isPositionInRange';
import { faBug } from '@fortawesome/free-solid-svg-icons';

const UNDERLINE_CLASS = 'CodeMirror-lint-error-underline';

let nextId = 0;

export default class LintError {
    
    constructor(cm, error) {
        this.id = nextId++;
        this.cm = cm;
        this.message = error.message;
        this.rule = error.rule;
        this.match = error.match;
        // Subtract one from ch and line because the API returns the base as 1
        // but CodeMirror uses a base of 0.
        this.ch = error.col - 1;
        this.line = error.line - 1;
        
        this.createGutter();
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

        if(this.$bookmark) {
            this.$bookmark.on('clear', () => {
                this.clearGutter();
            });
        }

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

    set message(value) {
        this.$message = value;
    }

    get message() {
        return this.$message;
    }

    get formattedMessage() {
        return formatError(this);
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
            this.cm.setGutterMarker(line, this.cm.state.lint.constructor.id, null);
        }
    }

    createGutter() {
        this.gutter = this.cm.setGutterMarker(this.line, this.cm.state.lint.constructor.id, this.createGutterIcon());
    }
    
    createGutterIcon() {
        const icon = document.createElement('div');

        icon.className = 'CodeMirror-lint-error-icon';
        icon.innerHTML = `<div>${fontawesome.icon(faBug).html}</div>`;
        icon.error = this;
        
        const errors = this.errorWindow = document.createElement('div');

        errors.className = 'CodeMirror-lint-error-window';
        errors.innerHTML = formatError(this, true);
        
        document.documentElement.appendChild(errors);

        icon.addEventListener('click', e => {
            errors.classList.remove('show');
            
            this.focus();
        });

        icon.addEventListener('mouseenter', e => {
            errors.classList.add('show');
        });

        icon.addEventListener('mousemove', e => {
            let { left, top } = icon.getBoundingClientRect();

            errors.style.left = `${left}px`;
            errors.style.top = `${top}px`;
        });

        icon.addEventListener('mouseleave', e => {
            errors.classList.remove('show');
        });

        return icon;
    }

    createBookmark() {
        const tag = this.findMatchingTag({
            line: this.line,
            ch: this.ch
        });

        const pos = tag && (tag.open || tag.close);

        return pos && this.cm.setBookmark(pos.from, {
            clearWhenEmpty: true,
            // widget: this.createWidgetNode(),
            insertLeft: tag.open ? true : false,
        });
    }

    createWidgetNode() {
        const div = document.createElement('div');

        div.className = 'CodeMirror-lint-error-bookmark';
        div.innerHTML = `<div class="CodeMirror-lint-error-bookmark-text">${this.formattedMessage}</div>`;

        div.addEventListener('click', e => this.hide());
        
        document.documentElement.addEventListener('keyup', e => {
            if(e.keyCode === 27) {
                this.hide();
            }
        });

        document.documentElement.appendChild(div);

        return div;
    }

    findMatchingTag(pos) {
        return pos && CodeMirror.findMatchingTag(this.cm, pos, this.cm.getViewport());
    }

    markText({from, to}) {
        const markedText = this.cm.markText(from, to, {
            title: this.message,
            clearWhenEmpty: true,
            className: UNDERLINE_CLASS,
        });

        markedText.on('hide', () => {
            if(!this.open && !this.close) {
                this.clear();
            }
        });

        return markedText;
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
        this.bookmark.widgetNode && (this.bookmark.widgetNode.querySelector('.CodeMirror-lint-error-bookmark-text').innerHTML = this.formattedMessage);
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
        const pos = (this.bookmark && this.bookmark.find()) || {
            line: this.line,
            ch: this.ch
        };

        if(pos) {
            this.cm.scrollIntoView(pos, this.cm.getTextArea().parentNode.offsetHeight / 2);
            this.cm.setCursor(pos);
            this.cm.focus();
        }
    }

    clear() {
        const index = this.cm.state.lint.getErrorIndex(this);

        if(index !== -1) {
            this.cm.state.lint.errors.splice(this.cm.state.lint.getErrorIndex(this), 1);
        }

        if(this.bookmark) {
            this.bookmark.open && this.bookmark.open.clear();
            this.bookmark.close && this.bookmark.close.clear();
            this.bookmark.clear();
        }
        else {
            this.clearGutter();
        }

        this.errorWindow && this.errorWindow.remove();
    }

    lint() {
        this.cm.lint().then(null, e => {
            // this.state.lint.errors = e.response.data.errors;
        });
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
        
        if(this.isVisible) {
            this.redraw();
        }
        
        if(this.isCursorInsideTag && (this.close && this.lastChange.close || isNonOpeningTag)) {
            // this.lint();
        }

        if(this.lastChange.open && !this.open) {
            // this.clear();
        }

        if(!this.open && !this.close) {
            this.clearGutter(this.lastChange.change.from.line);
        }
        else if((this.lastChange && this.lastChange.change.from.line !== this.line)) {
            this.clearGutter(this.lastChange.change.from.line);
            //this.createGutter();
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
            (a && a.rule.id) === (b && b.rule.id)
        );
    }
}

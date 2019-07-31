import CodeMirror from 'codemirror';

const RETURN_KEY = 13;

class BlockTag {
    
    constructor(cm) {
        this.cm = cm;
        this.ready = false;
        this.currentTags = [];
        this.handlers = {};

        this.cm.on('keydown', this.handlers['keydown'] = (
            (...args) => this.onKeydown(...args)
        ));

        this.cm.on('change', this.handlers['change'] = (
            (...args) => this.onChange(...args)
        ));
    }

    destroy() {
        this.cm.off('keydown', this.handlers.keydown);
        this.cm.off('change', this.handlers.change);
    }

    shouldConvertToBlock(head) {
        const tag = this.findEnclosingTag(head);

        return !!(tag && tag.open.from.line === tag.close.to.line);
    }

    onKeydown(cm, { keyCode }) {
        if(keyCode === RETURN_KEY) {
            this.ready = this.cm.listSelections()
                .reduce((carry, {head, anchor}) => {
                    return carry || this.shouldConvertToBlock(head);
                }, false);
        }

        this.currentTags = this.cm.listSelections().map(({ head }) => {
            return CodeMirror.findMatchingTag(this.cm, {
                ch: head.ch,
                line: head.line
            });
        });
    }

    onRecentlyClosed(head, anchor) {
        this.indent(CodeMirror.findMatchingTag(this.cm, {
            ch: head.ch - 1,
            line: head.line
        }));
    }

    onChange(...args) {
        if(this.ready) {
            this.onReady(...args);
            this.ready = false;
        }
        
        this.cm.listSelections().forEach(({ head, anchor }, i) => {
            const tag = CodeMirror.findMatchingTag(this.cm, {
                ch: head.ch - 1,
                line: head.line
            });
            
            if(tag && tag.close && !this.currentTags[i]) {
                this.onRecentlyClosed(head, anchor);
            }
        });
    }

    onReady() {
        this.cm.listSelections().forEach(({head, anchor}) => {
            const tag = this.findEnclosingTag(head);

            this.newline(head);
            this.addPlaceholder(head);
            this.setCursor(head);
            this.indent(tag);
            this.removePlaceholder(head);
        });
    }

    newline(head, anchor) {
        this.cm.replaceRange(['', ''], head, anchor, '+insert'); 
    }

    setCursor(head) {
        this.cm.setCursor({line: head.line, ch: Infinity});
    }

    indent(tag, type = 'smart') {
        for(let x = tag.open.from.line; x <= tag.close.to.line + 1; x++) {
            this.cm.indentLine(x, type);
        }
    }

    addPlaceholder(head) {
        this.replaceRange('.', {line: head.line, ch: 0});
    }

    removePlaceholder({ line, ch }) {
        const total = this.cm.getLine(line).length;

        this.replaceRange('', {line: line, ch: ch + 1}, {line: line, ch: total});
    }

    replaceRange(value, from, to) {
        this.cm.replaceRange(value, from, to || from, '+insert');
    }

    findEnclosingTag(head) {
        head || (head = this.head);

        const { state } = CodeMirror.innerMode(this.cm.getMode(), this.cm.getTokenAt(head).state);
        const tagName = state.context && state.context.tagName;
        
        return CodeMirror.findEnclosingTag(this.cm, head, null, tagName);
    }

}

CodeMirror.defineOption('blockTags', false, function(cm, options, old) {
    if(old && old !== CodeMirror.Init) {
        cm.state.blockTags.destroy();
        cm.removeKeyMap('blockTags');
   
        delete cm.state.blockTags;
    }

    if(options) {
        cm.state.blockTags = new BlockTag(cm);
    }
});
import { syntaxTree } from '@codemirror/language';
import { Action } from '@codemirror/lint';
import { EditorView } from '@codemirror/view';

class Element {
    public tagName?: string;
    public closed: boolean;

    constructor(
        public readonly view: EditorView,        
        public readonly from: number,
        public readonly to: number,
    ) {
        this.from = from;
        this.to = to;
        this.tagName = tagName(view, from, to);
        this.closed = false;
    }

    is(tagName: string) {
        return this.tagName?.toLowerCase() === tagName.toLowerCase();
    }
}

function tagName(view: EditorView, from?: number, to?: number) {
    return view.state.doc.sliceString(from ?? 0, to)
        .toLowerCase()
        .match(/^<\/?(?:\s+)?(\w+)/)?.[1];
}

function changes(view: EditorView, from?: number, to?: number) {
    let lastElement: Element;
    let pos: number;

    const stack: Element[] = [];

    const tree = syntaxTree(view.state);

    tree.iterate({
        enter(node) {
            if(node.type.name === 'Element') {
                stack.push(lastElement = new Element(view, node.from, node.to));
            }
            else if(node.type.name === 'SelfClosingTag') {
                stack.splice(stack.indexOf(lastElement), 1);
            }
        },
        leave(node) {
            if(node.type.name === 'CloseTag') {
                for(pos = stack.length - 1; pos >= 0; pos--) {
                    const tag = tagName(view, from, to);
                    if(!tag) {
                        continue;
                    }

                    if(!stack[pos].closed && stack[pos].is(tag)) {
                        stack[pos].closed = true;
    
                        break;
                    }
                }
            }
        }
    });
    
    return stack.filter(element => !element.closed)
        .reverse()
        .map(({ to, tagName }) => ({
            from: to,
            to: to,
            insert: `</${tagName}>`
        }));
}

const actions: Action[] = [{
    name: 'Close Only First Tag',
    apply(view: EditorView, from: number, to: number) {
        let data = [];

        // The purpose of this loop is if the from/to doen't catch the error,
        // then we should traverse backwards until we find a charge, or reach
        // the beginning of the document.
        do {      
            data = changes(view, from, to);

            from -= 10;
        }
        while(from >= 0 && !data.length);
            
        view.dispatch({
            changes: data.slice(0, 1)
        });
    }
}, {
    name: 'Close All Tags',
    apply(view: EditorView) {
        view.dispatch({
            changes: changes(view)
        });
    }
}];

export default actions;
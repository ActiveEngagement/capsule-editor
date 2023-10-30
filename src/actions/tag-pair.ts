import { syntaxTree } from '@codemirror/language';
import { Action, } from '@codemirror/lint';
import { EditorView } from '@codemirror/view';
import { SyntaxNodeRef } from '@lezer/common';

class Element {
    public node: SyntaxNodeRef;
    public parent?: Element;
    // public closed: boolean;
    public tagName?: string;
    public name: string;
    public from: number;
    public to: number;
    public isError: boolean;
    public children: Element[];

    constructor(view: EditorView, node: SyntaxNodeRef, parent?: Element, children: Element[] = []) {
        this.node = node;
        this.name = node.type.name;
        this.parent = parent;
        this.isError = node.type.name === '⚠';
        this.children = children;
        this.from = node.from;
        this.to = node.to;
        this.tagName = tagName(view, this.from, this.to);
        // this.closed = node.type.name === 'Element' ? false : true;
    }

    fix(view: EditorView, at: Element) {
        view.dispatch({
            changes: {
                from: at.from,
                to: at.from,
                insert: `</${this.tagName}>`
            }
        });

        // this.closed = true;
    }
}

function tagName(view: EditorView, from?: number, to?: number) {
    return view.state.doc.sliceString(from ?? 0, to)
        .toLowerCase()
        .match(/^<\/?(?:\s+)?(\w+)/)?.[1];
}

// function changes(view: EditorView, from?: number, to?: number) {
//     const elements = stack(view, from, to);

//     const element = elements.filter(element => !element.closed).pop();

//     if(!element) {
//         return;
//     }

//     return {
//         from: element.from,
//         to: element.to,
//         insert: `</${element.tagName}>`
//     };
// }

function stack(view: EditorView, from?: number, to?: number): [Element|undefined, Element|undefined] {
    let root: Element|undefined = undefined;
    let current: Element|undefined = undefined;
    
    syntaxTree(view.state).iterate({
        from,
        to,
        enter(node) {
            const element = new Element(view, node, current);

            if(!root) {
                root = current;
            }

            if(current) {
                current.children.push(element);
            }
            
            current = element;            
        },
        leave() {
            current = current?.parent;
        }
    });

    return [root, root ? findFirstError(root) : undefined];
}

function findFirstError(el: Element): Element|undefined {
    if(el.isError) {
        return el;
    }
    
    for(const child of el.children) {
        const error = findFirstError(child);

        if(error) {
            return error;
        }
    }

    return;
}

function findFirstUnclosedAncestor(el?: Element): Element | undefined {
    if(!el) {
        return;
    }

    if(el.name === 'Element') {
        return el;
    }

    return findFirstUnclosedAncestor(el.parent);
}

function fix(view: EditorView, from: number, to: number): [Element|undefined, Element|undefined]  {
    const [ root, error ] = stack(view, from, to);

    if(!root || !error) {
        return [undefined, undefined];
    }
        
    const element = findFirstUnclosedAncestor(error);

    if(!element) {
        return [undefined, undefined];
    }
        
    element.fix(view, error);

    return stack(view, from, to);
}

const actions: Action[] = [{
    name: 'Close Tag',
    apply(view: EditorView, from: number, to: number) {
        fix(view, from, to);
    }
}
];

export default actions;
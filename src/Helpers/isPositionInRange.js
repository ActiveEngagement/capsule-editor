export default function isPositionInRange({line, ch}, from, to) {
    if(from.line > line || to.line < line) {
        return false;
    }
    else if(from.line === line && from.ch > ch) {
        return false;
    }
    else if(to.line === line && to.ch <= ch) {
        return false;
    }

    return true;
}

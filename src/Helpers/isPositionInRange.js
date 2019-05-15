export default function isPositionInRange({line, ch}, from, to) {
    // console.log(line, ch, JSON.parse(JSON.stringify(from)), JSON.parse(JSON.stringify(to)), from.line > line || to.line < line, from.line === line && from.ch > ch, to.line === line && to.ch > ch);

    if(from.line > line || to.line < line) {
        return false;
    }
    else if(from.line === line && from.ch >= ch) {
        return false;
    }
    else if(to.line === line && to.ch <= ch) {
        return false;
    }

    return true;
}

import isPositionInRange from './isPositionInRange';

export default function isTagInRange(tag, from, to) {
    return (tag.to && isPositionInRange(tag.to, from, to)) || (tag.from && isPositionInRange(tag.from, from, to));
}
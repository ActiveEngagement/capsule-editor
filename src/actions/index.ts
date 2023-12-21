import attrNoDuplicate from './attr-no-duplication';
import htmlValidChildren from './html-valid-children';
import invalidAttributeChar from './invalid-attribute-char';
import noEntitiesInAttributes from './no-entities-in-attributes';
import specCharEscape from './spec-char-escape';
import srcNotEmpty from './src-not-empty';
import tagPair from './tag-pair';
import validPathFormat from './valid-path-format';

export default {
    'attr-no-duplication': attrNoDuplicate,
    'html-valid-children': htmlValidChildren,
    'invalid-attribute-char': invalidAttributeChar,
    'no-enties-in-attributes': noEntitiesInAttributes,
    'spec-char-escape': specCharEscape,
    'src-not-empty': srcNotEmpty,
    'tag-pair': tagPair,
    'valid-path-format': validPathFormat,
};
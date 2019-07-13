import fontawesome from '@fortawesome/fontawesome';
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

export default function formatError(error) {
    return [
        `<a href="http://thecapsule.email/docs/codes/${error.code}.html" title="View more information about this error code." class="text-white ml-2" target="_blank">${fontawesome.icon(faExclamationTriangle).html}</a>`,
        `<span class="ml-2">${error.line},${error.column || error.ch + 1} :: ${error.code} (${error.rule}) ${error.msg}</span>`
    ].join('');            
}
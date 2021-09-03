import fontawesome from '@fortawesome/fontawesome';
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

export default function formatError(error) {
    return [
        `<a href="${error.rule.link}" title="View more information about this error code." class="text-white ml-2" target="_blank">${fontawesome.icon(faExclamationTriangle).html}</a>`,
        `<span class="ml-2">${error.line},${error.col || error.ch + 1} :: (${error.rule.id}) ${error.message}</span>`
    ].join('');            
}
import fontawesome from '@fortawesome/fontawesome';
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

export default function formatError(error) {
    const message = error.message
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
        
    return `
        <a href="${error.rule.link}" title="View more information about this error code." class="text-white ml-2" target="_blank">${fontawesome.icon(faExclamationTriangle).html}</a>
        <code><span class="ml-2">${error.line},${error.from + 1} :: (${error.rule.id}) ${message}</span></code>
    `;         
}
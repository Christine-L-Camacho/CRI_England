import {html} from "../../_npm/htl@0.3.1/063eb405.js";

export var criButton = function criButton(linkText, link, params='') {
    if (params != '') {
      params = '?la=' + params
    }
    return html`
    <a href='${link}${params}' class="button_link">
        ${linkText}
    </a>
    `
};

import { LitElement, html } from 'lit-element';

export class StuffingApp extends LitElement {

    static styles = css`
    :host {
        display: block;
    }
    `;

    render() {
        return html``;
    }
}
customElements.define('stuffing-app', StuffingApp);
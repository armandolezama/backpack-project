import { LitElement, html, css } from 'lit-element';

export class SupplyCellComponent extends LitElement {
    constructor(name = 'default'){
        this.id = '';
        this.name = `${name}-piece`;
        this.directions = {
            left: undefined,
            right: undefined,
            up: undefined,
            down: undefined
        };
        this.coordinates = [];
    }
    static styles = css`
    :host {
        display: block;
    }
    `;

    setId(id){
        this.id = id;
    };

    linkTo(direction, node){
        this.directions[direction] = node;
    };

    setCoordinates(newCoordinate) {
        this.coordinates = newCoordinate;
    }

    clearCoordinates(){
        this.coordinates = [];
    }

    getCoordinates(){
        return this.coordinates;
    }
    
    getUsedDirections(){
        let directions = [];
        for(const direction in this.directions){
            if (this.directions[direction] !== undefined){
                directions = [...directions, direction];
            }
        }

        return directions.length > 0 ? directions : 'None direction used';
    };

    render() {
        return html`
        <div class="cell empty"></div>
        `;
    }
}
customElements.define('supply-cell-component', SupplyCellComponent);
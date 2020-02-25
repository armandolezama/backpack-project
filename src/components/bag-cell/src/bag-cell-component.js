import { LitElement, html, css } from 'lit-element';

export class BagCellComponent extends LitElement {

    static get styles() {
        return css`
        :host {
            margin: 0;
            padding: 0;
        }

        .cell{
            width: var(--bag-cell-component-cell-width, 20px);
            height: var(--bag-cell-component-cell-height, 20px);
            margin: var(--bag-cell-component-cell-margin, 5px);
            border: var(--bag-cell-component-cell-border-width,2px);
            border-style: var(--bag-cell-component-cell-border-style, solid);
            border-radius: var(--bag-cell-component-cell-border-radius, 0)
        }
        
        .cell.empty {
            background-color: var(--bag-cell-component-cell-empty-background, green)
        }

        .cell.full {
            background-color: var(--bag-cell-component-cell-full-background, red)
        }
        `
    }

    static get properties() {
        return {
            node: {type: Object},
            coordinates: {type:Array},
            status: {type:String},
            occuped: {type:Boolean},
            setStatus: {type:Boolean},
            directions: {type:Object}
        };
    }

    constructor() {
        super();
        this.node = {};
        this.coordinates = [];
        this.status = 'Empty';
        this.occuped = false;
        this.setStatus = true;
        this.directions = {
            left: undefined,
            right: undefined,
            up: undefined,
            down: undefined
        };
    }

    __isEmpty(node){
        for(const key in node){
            if(node.hasOwnProperty(key)){
                return false
            };
        };
        return true
    };

    setNode(node){
        if(!this.__isEmpty(node) && this.__isEmpty(this.node)){
            this.node = node;
            this.setStatus = true;
            this.__changeStatus();
        } else {
            this.dispatchEvent(new Event('node-isnt-empty'));
        };
    };

    __changeStatus(){
        if(this.setStatus){
            this.occuped = !this.occuped;
            if(this.status === 'Occuped'){ 
                this.status = 'Empty';
                this.shadowRoot.querySelector('div').classList.remove('full');
                this.shadowRoot.querySelector('div').classList.add('empty');
            } else if (this.status === 'Empty') { 
                this.status = 'Occuped';
                this.shadowRoot.querySelector('div').classList.remove('empty');
                this.shadowRoot.querySelector('div').classList.add('full');}
                this.setStatus = false;
        };
    };

    getStatus(){
        return this.status;
    }

    isOccuped(){
        return this.occuped;
    }

    deleteNode(){
        if(this.occuped){
            this.node = {};
            this.setStatus = true;
            this.delCoordinates();
            this.__changeStatus();
        } else {
            this.dispatchEvent(new Event('node-is-empty'));
        }
    };

    setCoordinates(newCoordinates) {
        this.coordinates = newCoordinates;
    };

    getCoordinates(){
        return this.coordinates;
    }
    
    delCoordinates(){
     this.coordinates = [];
    };

    getUsedDirections(){
        let directions = [];
        for(const direction in this.directions){
            if (this.directions[direction] !== undefined){
                directions = [...directions, direction];
            }
        }

        return directions.length > 0 ? directions : ['None direction used'];
    }

    linkDirection(direction, newNode){
        this.directions[direction] = newNode;
    }

    unlinkDirection(direction){
        this.directions[direction] = undefined;
    }
    render() {
        return html`
        <div class="cell empty">
            
        </div>
        `;
    }
}
customElements.define('bag-cell-component', BagCellComponent);
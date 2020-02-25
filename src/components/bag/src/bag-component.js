import { LitElement, html, css } from 'lit-element';
import {BagCellComponent} from '../node_modules/bag-cell/src/bag-cell-component'

export class BagComponent extends LitElement {

    static get styles() {
        return css`
        
        `
    }

    static get properties() {
        return {
            height : {type: Number},
            width: {type: Number},
            bagSpace: {type: Array}
        };
    }

    constructor(height = 0, width = 0) {
        super();
        this.height = height;
        this.width = width;
        this.bagSpace = [];
        this.__createSpace();
    };

    updated(changedProperties){
        if(changedProperties.has('height') || changedProperties.has('width')){
            if(this.height > 0 && this.width > 0){
                this.__createSpace();
            };
        };
    };

    takeSupply(supplyName) {
        supplyName
    };

    inspectSupply(supplyName) {
        supplyName
    };

    getAllSupplies() {

    };

    getCell(by, data){
        
    }

    __setNodeByCoordinate(nodeContent, coordinates){
        this.bagSpace[coordinates[0]][coordinates[1]].setNode(nodeContent);
    }

    applyToAllCells(applicable){
        for(const row of this.bagSpace){
            for(const cell of row){
                applicable(cell)
            };
        };
    };

    __linkTo(cell, direction){
        
        if(direction === 'up'){
            cell.directions.up = this.bagSpace[cell.getCoordinates()[0] -1][cell.getCoordinates()[1]];
            this.bagSpace[cell.getCoordinates()[0] -1][cell.getCoordinates()[1]].directions.down = cell;
        };

        if(direction === 'down'){
            cell.directions.down = this.bagSpace[cell.getCoordinates()[0] + 1][cell.getCoordinates()[1]];
            this.bagSpace[cell.getCoordinates()[0] + 1][cell.getCoordinates()[1]].directions.up = cell;
        };

        if(direction === 'left'){
            cell.directions.left = this.bagSpace[cell.getCoordinates()[0]][cell.getCoordinates()[1] - 1];
            this.bagSpace[cell.getCoordinates()[0]][cell.getCoordinates()[1] - 1].directions.right = cell;
        };

        if(direction === 'right'){
            cell.directions.right = this.bagSpace[cell.getCoordinates()[0]][cell.getCoordinates()[1] + 1];
            this.bagSpace[cell.getCoordinates()[0]][cell.getCoordinates()[1] + 1].directions.left = cell;
        };
    }
    __linkAllNodes() {
        for(let row = 0; row < this.bagSpace.length; row++){
            for(let cell = 0; cell < this.bagSpace[row].length; cell++){
                if(cell !== this.width - 1){
                    this.__linkTo(this.bagSpace[row][cell], 'right');
                };

                if(row !== this.height - 1){
                    this.__linkTo(this.bagSpace[row][cell], 'down');
                };

                if(cell !== 0){
                    this.__linkTo(this.bagSpace[row][cell], 'left');
                };

                if(row !== 0){
                    this.__linkTo(this.bagSpace[row][cell], 'up');
                };
            };
        };
    };

    __isValidCell(bagNode, supply){
        supply.restartAllNodes();
        const firstBagCell = bagNode
        const firstSupplyCell = supply.getCurrentNode();
        let isValid = true;
        if(firstBagCell.isOccuped()){
            isValid = false;
            supply.restartAllNodes()
        } else {
            firstSupplyCell.setCoordinates(firstBagCell.getCoordinates())
            for(const direction of firstSupplyCell.getUsedDirections()){
                if(firstBagCell.directions[direction] === undefined || firstBagCell.directions[direction].isOccuped()){
                    isValid = false
                    supply.restartAllNodes()
                } else if (isValid) {
                    firstSupplyCell.directions[direction].setCoordinates(firstBagCell.directions[direction].getCoordinates());
                }
            };
            
            while(!supply.nextNode() && isValid){
                const bagCell = this.bagSpace[supply.getCurrentNode().getCoordinates()[0]][supply.getCurrentNode().getCoordinates()[1]]
                const supplyCell = supply.getCurrentNode();
                if(bagCell.isOccuped()){
                    isValid = false;
                    supply.restartAllNodes()
                } else if(isValid) {
                    supplyCell.setCoordinates(bagCell.getCoordinates())
                    for(const direction of supplyCell.getUsedDirections()){
                        if(bagCell.directions[direction] === undefined || bagCell.directions[direction].isOccuped()){
                            isValid = false;
                            supply.restartAllNodes();
                        } else if(isValid){
                            supplyCell.directions[direction].setCoordinates(bagCell.directions[direction].getCoordinates());;
                        }
                    };
                };
            }
        };

        return isValid;
    }

    __createSpace(){
        let newSpace = [];
        for(let i = 0; i < this.height; i++){
            const rowPosition = i;
            let row = [];
            for(let j = 0;j < this.width; j++){
                const columPosition = j;
                const newCell = new BagCellComponent();
                newCell.setCoordinates([rowPosition, columPosition])
                row = [...row, newCell]
            }
            newSpace = [...newSpace, row]
        }
        this.bagSpace = newSpace;
        this.__linkAllNodes();
    }

    addSupply(supply) {
        for(let column = 0; column < this.width; column++){
            for(let row = 0; row < this.height; row++){
                if(this.__isValidCell(this.bagSpace[row][column], supply)){
                    column = this.height;
                    row = this.width;
                    this.__putSupply(supply)
                } else if(row === this.width -1 && column === this.height - 1){
                    return [`Supply can't be setted, not enough space`]
                }
                
            }
        }
    }

    render(){
        return html`
            <div>
                <h2>From component</h2>
            </div>

            <table>
            ${this.bagSpace.length > 0 ? 
                
                this.bagSpace.map(row => html`
                <tr>
                    ${row.map(cell => html`
                        <td>
                            ${cell}
                        </td>
                    `)}
                </tr>
                `)
                : html`<div>

                    <h2>Bag without cells</h2>
                </div>` }
                
            </table>
        `
    }
}
customElements.define('bag-component', BagComponent);
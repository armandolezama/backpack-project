
const createHTMLDirections = directions => {
    let html = '';
    if(directions.length === 1){
        html = `<p>${directions[0]}</p>`;
    } else {
        for(const direction of directions){
            html += `<li>${direction}</li>`;
        };
    }
    return `<ol>${html}</ol>`;
};

const bagComponent = document.querySelector('bag-component');

bagComponent.height = 2;
bagComponent.width = 2;

const setWidthButton = document.querySelector('#set-width');

setWidthButton.addEventListener('click', () => {
    bagComponent.width = document.querySelector('#width').value;
    addEvents();

})

const setHeightButton = document.querySelector('#set-height');

setHeightButton.addEventListener('click', () => {
    bagComponent.height = document.querySelector('#height').value;
    addEvents();
});

let originCell = {};

const addToAllCells = cell => {
    cell.addEventListener('click', function(event) {
        //Temp: Evidencia de que event.taget y this difieren según el uso de function o arroFunction 
        console.log(event.target)
        console.log(this)
        if(event.target === this){
            const bagCellComponent = event.currentTarget;
            document.querySelector('#directions').innerHTML = createHTMLDirections(bagCellComponent.getUsedDirections());
            document.querySelector('#status').innerHTML =  bagCellComponent.getStatus();
            document.querySelector('#data-from-node').innerHTML = JSON.stringify(bagCellComponent.node);
            const coordinates = bagCellComponent.getCoordinates();
            document.querySelector('#coordinates').innerHTML = `
            <h2>Coordinates in x</h2> <p>${coordinates[1]}</p>
            <h2>Coordinates in y</h2> <p>${coordinates[0]}</p>`;
            originCell = cell;
        }
    });
    document.querySelector('#node-data #edit-data').addEventListener('click', event => {
        document.querySelector('#add-node-data').open();
    })
};
const addEvents = () => {
    customElements.whenDefined(bagComponent.localName).then(()=> {
        customElements.whenDefined('bag-cell-component').then(() => {
            bagComponent.applyToAllCells(addToAllCells);
        })
    });
}

(() => {
    document.querySelector('#save-data').addEventListener('click', () => {
        document.querySelector('#add-node-data').close();
        originCell.click();
    });
    document.querySelector('#cancel').addEventListener('click', () => {
        document.querySelector('#add-node-data').close()
    });
})()

addEvents();

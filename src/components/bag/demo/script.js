
const createHTMLDirecionts = directions => {
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

const addToAllCells = cell => {
    cell.addEventListener('click', event=> {
        const bagCellComponent = event.currentTarget;
        document.querySelector('#node-data').positionTarget = bagCellComponent;
        document.querySelector('#directions').innerHTML = createHTMLDirecionts(bagCellComponent.getUsedDirections());
        document.querySelector('#status').innerHTML =  bagCellComponent.getStatus();
        document.querySelector('#data-from-node').innerHTML = JSON.stringify(bagCellComponent.node);
        const coordinates = bagCellComponent.getCoordinates();
        document.querySelector('#coordinates').innerHTML = `
        <h2>Coordinates in x</h2> <p>${coordinates[1]}</p>
        <h2>Coordinates in y</h2> <p>${coordinates[0]}</p>`;
        document.querySelector('#node-data').open();
    });
    document.querySelector('#node-data #close-data').addEventListener('click', () => {
        document.querySelector('#node-data').close();
    })
    document.querySelector('#node-data #edit-data').addEventListener('click', () => {
        document.querySelector('#node-data').close();
        document.querySelector('#add-node-data').open()
    })
};
const addEvents = () => {
    customElements.whenDefined(bagComponent.localName).then(()=> {
        customElements.whenDefined('bag-cell-component').then(() => {
            bagComponent.applyToAllCells(addToAllCells);
        })
    });
}

addEvents();

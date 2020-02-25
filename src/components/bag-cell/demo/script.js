
const bagCellComponent = document.querySelector('bag-cell-component');
const buttons = document.querySelectorAll('button');
const dataFromNode = document.querySelector('#data-from-node');
const paperToast = document.querySelector('paper-toast');

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

const printStatus = () => {
    document.querySelector('#status').innerHTML =  bagCellComponent.getStatus();
}

const updateDirections = () => {
    customElements.whenDefined(bagCellComponent.localName).then(() => {
        document.querySelector('#directions').innerHTML = createHTMLDirecionts(bagCellComponent.getUsedDirections());
    })
};

const printCoordinates = () => {
    const coordinates = bagCellComponent.getCoordinates();
    if(coordinates.length > 0){
        document.querySelector('#coordinates').innerHTML = `
        <h2>Coordinates in x</h2> <p>${coordinates[1]}</p>
        <h2>Coordinates in y</h2> <p>${coordinates[0]}</p>
        `;
    } else {
        document.querySelector('#coordinates').innerHTML = `
        <h2>Coordinates in x</h2> <p>Empty coordinates</p>
        <h2>Coordinates in y</h2> <p>Empty coordinates</p>
        `;
    }

};

const updateCoordinates = () =>{
    const x = document.querySelector('#x-axis').value;
    const y = document.querySelector('#y-axis').value;
    bagCellComponent.setCoordinates([x, y]);

};

const firstLoad = () => {
    printStatus();
    dataFromNode.innerHTML = JSON.stringify(bagCellComponent.node);
    updateDirections();
    updateCoordinates();
    printCoordinates();
};

const setDirection = direction => {
    if(bagCellComponent.directions[direction] === undefined){
        bagCellComponent.linkDirection(direction, {node: 'Test node'});
    } else {
        bagCellComponent.unlinkDirection(direction)
    }
}

document.querySelector('body').onload = firstLoad;

bagCellComponent.addEventListener('node-isnt-empty', ()=>{
    paperToast.text = `Node isn't empty`;
    paperToast.open();
})

bagCellComponent.addEventListener('node-is-empty', () => {
    paperToast.text = `Node is empty alredy`;
    paperToast.open();
})


buttons[0].addEventListener('click', () => {
    bagCellComponent.deleteNode();
    dataFromNode.innerHTML = JSON.stringify(bagCellComponent.node);
    printStatus();
})

buttons[1].addEventListener('click', () => {
    paperToast.text = bagCellComponent.getStatus();
    paperToast.open();
})

buttons[2].addEventListener('click', () => {
    if(bagCellComponent.isOccuped()){
        paperToast.text = 'Alredy occuped';
    } else {
        paperToast.text = 'Node is empty';
    }
    paperToast.open();
})

buttons[3].addEventListener('click', () => {
    bagCellComponent.delCoordinates();
    printCoordinates();
})

buttons[4].addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const biography = document.querySelector('#biography').value;
    bagCellComponent.setNode({name, biography});
    dataFromNode.innerHTML = JSON.stringify(bagCellComponent.node);
    printStatus();
})

buttons[5].addEventListener('click', ()=>{
    setDirection('right');
    updateDirections();
})

buttons[6].addEventListener('click', ()=>{
    setDirection('left');
    updateDirections();
})

buttons[7].addEventListener('click', ()=>{
    setDirection('down');
    updateDirections();
})

buttons[8].addEventListener('click', ()=>{
    setDirection('up');
    updateDirections();
})

buttons[9].addEventListener('click', () => {
    updateCoordinates();
    printCoordinates();
});


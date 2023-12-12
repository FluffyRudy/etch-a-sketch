const attrs = {
    container: document.querySelector(".container"),
    nrows: 16, 
    ncols: 16,
    cellSize: 16,
    cellColor: "#fff",
    fieldStartX: null,
    fieldStartY: null,
    fieldWidth: null,
    fieldHeight: null
};

function createField() {
    for (let i = 0; i < attrs.nrows; i++) {
        const parent = document.createElement("div");
        parent.style.display = "flex";
        parent.setAttribute("class", "parent");

    
        for (let j = 0; j < attrs.ncols; j++) {
            const child = document.createElement("div");
            child.style.height = `${attrs.cellSize}px`;
            child.style.width  = `${attrs.cellSize}px`;
            child.style.backgroundColor = `${attrs.cellColor}`;
            child.setAttribute("class", "child");
            parent.appendChild(child);
        }
        attrs.container.appendChild(parent);
    }
}

function updateFieldPosition() {
    const boundRect = attrs.container.children[0].
                      getBoundingClientRect();
    attrs.fieldStartX = boundRect.x;
    attrs.fieldStartY = boundRect.y;
    attrs.fieldWidth  = attrs.nrows * attrs.cellSize;
    attrs.fieldHeight = attrs.ncols * attrs.cellSize;
}

function drawPixel(event) {
    event.preventDefault();
    updateFieldPosition();
    const x = event.clientX;
    const y = event.clientY;
    const cellX = Math.floor((x-attrs.fieldStartX)/attrs.cellSize); 
    const cellY = Math.floor((y-attrs.fieldStartY)/attrs.cellSize);
    attrs.container.children[cellY].
        children[cellX].
        style.backgroundColor = "red";
}

createField();
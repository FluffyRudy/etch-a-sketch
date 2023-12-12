const attrs = {
    startDraw: false,
    container: document.querySelector(".container"),
    nrows: 18, 
    ncols: 18,
    cellSize: 25,
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
    if (!attrs.startDraw)
        return;

    event.preventDefault();
    updateFieldPosition();

    const x = event.clientX;
    const y = event.clientY;
    if (
        x > attrs.fieldStartX + attrs.fieldWidth  ||
        y > attrs.fieldStartY + attrs.fieldHeight ||
        x < attrs.fieldStartX ||
        y < attrs.fieldStartY
    )
        return;

    const cellX = Math.floor((x-attrs.fieldStartX)/attrs.cellSize); 
    const cellY = Math.floor((y-attrs.fieldStartY)/attrs.cellSize);
    attrs.container.children[cellY].
        children[cellX].
        style.backgroundColor = "red";
}

document.body.addEventListener('mousedown', () => {
    attrs.startDraw = true;
})

document.body.addEventListener('mouseup', () => {
    attrs.startDraw = false;
})

createField();
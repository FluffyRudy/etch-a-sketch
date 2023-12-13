const initAttrs = {
    container:  document.querySelector(".container"),
    NROWS: 16,
    NCOLS: 16,
};

const attrs = {
    startDraw: false,
    container: initAttrs.container,
    nrows: initAttrs.NROWS, 
    ncols: initAttrs.NCOLS,
    cellSize: initAttrs.container.clientWidth/initAttrs.NROWS,
    cellColor: "#fff",
    fieldStartX: initAttrs.container.getBoundingClientRect().left,
    fieldStartY: initAttrs.container.getBoundingClientRect().top,
    fieldWidth: initAttrs.container.clientWidth,
    fieldHeight: initAttrs.container.clientHeight,
    color: '#f00',
    previousColor: '#f00'
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

function updateSize(size) {
    while (attrs.container.firstChild) {
        attrs.container.removeChild(attrs.container.lastChild);
    }
    attrs.nrows = size;
    attrs.ncols = size;
    attrs.cellSize = attrs.fieldWidth / attrs.ncols;
    document.getElementById('grid-size').textContent = `${parseInt(size)}`;

    createField()
}

function drawPixel(event) {
    if (!attrs.startDraw)
        return;
    
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
        style.backgroundColor = attrs.color;
}

function openColoPicker() {
    const colorElem = document.createElement('input');
    colorElem.setAttribute('type', 'color');
    colorElem.setAttribute('value', attrs.color);
    colorElem.click();
    colorElem.addEventListener('change', function() {
        attrs.color = this.value;
        attrs.previousColor = this.value;
    })
}

attrs.container.addEventListener('mousedown', (e) => {
    e.preventDefault();
    attrs.startDraw = true;
})

attrs.container.addEventListener("mousemove", (e) => {
    drawPixel(e);
})

attrs.container.addEventListener('mouseup', () => {
    attrs.startDraw = false;
    attrs.color = attrs.previousColor;
})

attrs.container.addEventListener('mouseleave', () => {
    attrs.startDraw = false;
})

document.getElementById('slider').addEventListener('mouseup', (e) => {
    updateSize(parseInt(e.target.value));
})

document.getElementById('tools').onmouseup = (e) => {
    if (e.target.nodeName == 'INPUT')
        return;
    else if (e.target.value)
        updateSize(parseInt(e.target.value));
    else if(e.target.classList.contains('clear'))
        updateSize(parseInt(attrs.ncols));
    else if (e.target.classList.contains('eraser'))
        attrs.color = "#fff";
    else if (e.target.classList.contains('color-chooser'))
        openColoPicker();
}

window.addEventListener('resize', () => {
    attrs.fieldStartX = attrs.container.getBoundingClientRect().left,
    attrs.fieldStartY = attrs.container.getBoundingClientRect().top
})

window.onload = () => {
    createField();
}
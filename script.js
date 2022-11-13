let selectedColor = "black";

function generateGrid(gridSize) {
    const grid = document.querySelector(".grid");
    removeAllChildNodes(grid);
    resolutionButton.textContent = "Resolution: " + gridSize + "x" + gridSize;
    for (let rowIndex = 1; rowIndex <= gridSize; rowIndex++) {
        const gridRow = document.createElement("div");
        gridRow.classList.add("grid-row");
        grid.appendChild(gridRow);
        for (let pixelIndex = 1; pixelIndex <= gridSize; ++pixelIndex) {
            const pixel = document.createElement("div");
            pixel.classList.add("pixel");
            pixel.style.height = 512 / gridSize + "px";
            pixel.style.width = 512 / gridSize + "px";
            gridRow.appendChild(pixel);
        };
    };
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel => pixel.addEventListener("mouseenter", colorPixel));
};

function changeSize() {
    const gridSize = Math.trunc(prompt("Choose grid size"));
    if (gridSize > 0 && gridSize <= 100) {
        generateGrid(gridSize);
    } else {
        alert("Invalid input!");
    };
};

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    };
};

function clearCanvas() {
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel => pixel.style.background = "white");
};

function colorPixel() {
    this.style.background = selectedColor;
};

function changeColor(color) {
    selectedColor = color.dataset.color;
    colorSelectors.forEach(color => color.classList.remove("selected"));
    color.classList.add("selected");
}

function initColor(color) {
    color.style.background = color.dataset.color;
    color.addEventListener("click", event => changeColor(event.target));
}

function addColor(event) {
    const customColors = document.querySelector(".custom.colors-container");
    const color = document.createElement("div");
    color.classList.add("color");
    color.dataset.color = event.target.value;
    initColor(color);
    customColors.appendChild(color);
    colorSelectors = document.querySelectorAll(".color");
    changeColor(color)
}

const resolutionButton = document.querySelector(".resolution");
resolutionButton.addEventListener("click", changeSize);

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", clearCanvas);

let colorSelectors = document.querySelectorAll(".color");
colorSelectors.forEach(initColor);

const customColorInput = document.querySelector('input[type="color"]')
customColorInput.addEventListener("change", addColor)

generateGrid(16);
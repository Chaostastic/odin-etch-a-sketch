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
    const gridSize = prompt("Choose grid size");
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
    pixels.forEach(pixel => pixel.classList.remove("black"));
};

function colorPixel() {
    this.classList.add("black");
};

const resolutionButton = document.querySelector(".resolution");
resolutionButton.addEventListener("click", changeSize);

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", clearCanvas);

generateGrid(16);


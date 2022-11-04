const gridSize = 16;
const grid = document.querySelector(".grid");

function generateGrid() {
    for (let rowIndex = 1; rowIndex <= gridSize; rowIndex++) {
        const gridRow = document.createElement("div");
        gridRow.classList.add("grid-row");
        grid.appendChild(gridRow);
        for (let pixelIndex = 1; pixelIndex <= gridSize; ++pixelIndex) {
            const pixel = document.createElement("div");
            pixel.classList.add("pixel");
            gridRow.appendChild(pixel);
        }
    }
}

generateGrid();

const pixels = document.querySelectorAll(".pixel");
pixels.forEach(pixel => pixel.addEventListener("mouseenter", colorPixel));

function colorPixel() {
    this.classList.add("black");
}
let selectedColor = "black"

function generateGrid(gridSize) {
    const grid = document.querySelector(".grid")
    const pixelCount = Math.pow(gridSize, 2)
    removeAllChildNodes(grid)
    for (let i = 1; i <= pixelCount; i++) {
        const pixel = document.createElement("div")
        pixel.classList.add("pixel")
        pixel.style.height = 512 / gridSize + "px"
        pixel.style.width = 512 / gridSize + "px"
        grid.appendChild(pixel)
    }
    const pixels = document.querySelectorAll(".pixel")
    pixels.forEach(pixel => pixel.addEventListener("mouseenter", colorPixel))
}

function changeSize(event) {
    const gridSize = event.target.value
    if (gridSize > 0 && gridSize <= 100) {
        generateGrid(gridSize)
    } else {
        alert("Invalid input!")
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

function clearCanvas() {
    const pixels = document.querySelectorAll(".pixel")
    pixels.forEach(pixel => pixel.style.background = "white")
}

function colorPixel() {
    this.style.background = selectedColor
}

function changeColor(color) {
    selectedColor = color.dataset.color
    colorSelectors.forEach(color => color.classList.remove("selected"))
    color.classList.add("selected")
}

function initColor(color) {
    color.style.background = color.dataset.color
    color.addEventListener("click", event => changeColor(event.target))
}

function addColor(event) {
    const customColors = document.querySelector(".custom.colors-container")
    const color = document.createElement("div")
    color.classList.add("color")
    color.dataset.color = event.target.value
    initColor(color)
    customColorInput.after(color)
    colorSelectors = document.querySelectorAll(".color")
    changeColor(color)
    if (customColors.childElementCount > 17) {
        customColors.removeChild(customColors.lastChild)
    }
}

function displayResolution(event) {
    const input = event.target.value
    console.log(input)
    document.querySelector(".resolution").textContent = "Resolution: " + input + "x" + input
}

const resolutionInput = document.querySelector("input[type='range']")
resolutionInput.addEventListener("change", changeSize)
resolutionInput.addEventListener("input", displayResolution)

const clearButton = document.querySelector(".clear")
clearButton.addEventListener("click", clearCanvas)

let colorSelectors = document.querySelectorAll(".color")
colorSelectors.forEach(initColor)

const customColorInput = document.querySelector("input[type='color']")
customColorInput.addEventListener("change", addColor)

generateGrid(16)
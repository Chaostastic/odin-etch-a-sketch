let selectedColorValue = "black"
let pixelList
let mouseDown
let selectedColor = document.querySelector(".color.selected")
const clearButton = document.querySelector(".clear")
const colorSelectorList = document.querySelectorAll(".color")
const resolutionInput = document.querySelector("input[type='range']")
const customColorInput = document.querySelector("input[type='color']")

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
    pixelList = document.querySelectorAll(".pixel")
    pixelList.forEach(pixel => pixel.addEventListener("mouseenter", colorPixel))
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

function clearCanvas() {
    pixelList.forEach(pixel => pixel.style.background = "white")
}

function colorPixel(event) {
    if (mouseDown) {
        event.target.style.background = selectedColorValue
    }
}

function selectColor(color) {
    selectedColor.classList.remove("selected")
    selectedColor = color
    selectedColorValue = selectedColor.dataset.color
    selectedColor.classList.add("selected")
}

function initColor(color) {
    color.style.background = color.dataset.color
    color.addEventListener("click", event => selectColor(event.target))
}

function addColor(event) {
    const customColors = document.querySelector(".custom.colors-container")
    const newColorSelector = document.createElement("div")
    newColorSelector.classList.add("color")
    newColorSelector.dataset.color = event.target.value
    initColor(newColorSelector)
    customColorInput.after(newColorSelector)
    selectColor(newColorSelector)
    if (customColors.childElementCount > 17) {
        customColors.removeChild(customColors.lastChild)
    }
}

function displayResolution(event) {
    const input = event.target.value
    document.querySelector(".resolution").textContent = "Resolution: " + input + "x" + input
}

document.addEventListener('mousedown', () => mouseDown = true);
document.addEventListener('mouseup', () => mouseDown = false);
resolutionInput.addEventListener("change", event => generateGrid(event.target.value))
resolutionInput.addEventListener("input", displayResolution)
customColorInput.addEventListener("change", addColor)
clearButton.addEventListener("click", clearCanvas)
colorSelectorList.forEach(initColor)

generateGrid(16)
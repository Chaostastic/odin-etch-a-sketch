let pixelList
let mouseDown
let selectedColor = document.querySelector(".color.selected")

const clearButton = document.querySelector(".clear")
const colorSelectorList = document.querySelectorAll(".color")
const resolutionInput = document.querySelector("input[type='range']")
const customColorInput = document.querySelector("input[type='color']")

const DEFAULTCOLOR = "rgb(0 0 0)"
const DEFAULTBACKGROUND = "rgb(255 255 255)"

let getColor = () => DEFAULTCOLOR

function generateGrid(gridSize) {
    const grid = document.querySelector(".grid")
    const pixelCount = Math.pow(gridSize, 2)
    removeAllChildNodes(grid)
    for (let i = 1; i <= pixelCount; i++) {
        const pixel = document.createElement("div")
        pixel.classList.add("pixel")
        pixel.style.backgroundColor = DEFAULTBACKGROUND
        pixel.style.height = 512 / gridSize + "px"
        pixel.style.width = 512 / gridSize + "px"
        grid.appendChild(pixel)
    }
    pixelList = document.querySelectorAll(".pixel")
    pixelList.forEach(pixel => pixel.addEventListener("mouseover", colorPixel))
    pixelList.forEach(pixel => pixel.addEventListener("mousedown", colorPixel))
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
    if (event.type === "mouseover" && !mouseDown) return
    const currentColor = event.target.style.backgroundColor
    event.target.style.background = getColor(currentColor)
}

function selectColor(color) {
    selectedColor.classList.remove("selected")
    selectedColor = color
    if (selectedColor.classList.contains("rainbow")) {
        getColor = rainbowColor
    } else if (selectedColor.classList.contains("shade")) {
        getColor = shade
    } else {
        getColor = () => selectedColor.style.backgroundColor
    }
    selectedColor.classList.add("selected")
}

function addColor(event) {
    const customColors = document.querySelector(".custom.colors-container")
    const newColorSelector = document.createElement("div")
    newColorSelector.classList.add("color")
    newColorSelector.style.backgroundColor = event.target.value
    initColor(newColorSelector)
    document.querySelector(".color-input").after(newColorSelector)
    selectColor(newColorSelector)
    if (customColors.childElementCount > 17) {
        customColors.removeChild(customColors.lastChild)
    }
}

function rainbowColor() {
    const red = Math.floor(Math.random() * 255)
    const green = Math.floor(Math.random() * 255)
    const blue = Math.floor(Math.random() * 255)
    return `rgb(${red} ${green} ${blue})`
}

// split rbg string into individual r, g and b number values and return as array
function rgbSplit(rgb) {
    return rgb.replace(/[^\d\s]/g,"").split(" ").map((str) => +str)
}

function subToZero(min, sub) {
    const result = min - sub
    return result < 0 ? 0 : result
}

function shade(rgb) {
    //subtract 25 from each color value
    const [red, green, blue] = rgbSplit(rgb).map((int) => subToZero(int, 25))
    return `rgb(${red} ${green} ${blue})`
}

function displayResolution(event) {
    const input = event.target.value
    document.querySelector(".resolution").textContent = "Resolution: " + input + "x" + input
}

function initColor(color) {
    color.addEventListener("click", event => selectColor(event.target))
}

document.addEventListener("mousedown", () => mouseDown = true);
document.addEventListener("mouseup", () => mouseDown = false);
resolutionInput.addEventListener("change", event => generateGrid(event.target.value))
resolutionInput.addEventListener("input", displayResolution)
customColorInput.addEventListener("change", addColor)
clearButton.addEventListener("click", clearCanvas)
colorSelectorList.forEach(initColor)

generateGrid(16)
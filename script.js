const pixels = document.querySelectorAll(".pixel");
pixels.forEach(pixel => pixel.addEventListener("mouseenter", colorPixel))

function colorPixel() {
    this.classList.add("black")
}
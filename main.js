let theImg = document.querySelector(" .container img");

let saturate = document.querySelector("#saturate");
let contrast = document.querySelector("#contrast");
let brightness = document.querySelector("#brightness");
let sepia = document.querySelector("#sepia");
let grayscale = document.querySelector("#grayscale");
let blur = document.querySelector("#blur");
let rotate = document.querySelector("#hue-rotate");

let reset = document.querySelector(".btns .reset");
let download = document.querySelector(".btns .download");
let upload = document.querySelector(".container #upload");

let allFillters = document.querySelectorAll(".edit-area ul li input");

upload.onchange = function () {
    download.style.display = "block"
    reset.style.display = "block"
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = _ => { theImg.src = file.result }
    resetValue()
}

allFillters.forEach(inpt => { inpt.addEventListener('input', _ => setImg()) })

function setImg() {
    theImg.style.filter = `
    saturate(${saturate.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayscale.value})
    blur(${blur.value}px)
    hue-rotate(${rotate.value}deg)
`
}

reset.onclick = _ => resetValue();

function resetValue() {
    saturate.value = 100;
    contrast.value = 100;
    brightness.value = 100;
    sepia.value = 0;
    grayscale.value = 0;
    blur.value = 0;
    rotate.value = 0;
    setImg()
}

download.onclick = function saveImg() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = theImg.width;
    canvas.height = theImg.height;
    ctx.filter = window.getComputedStyle(theImg).filter;
    ctx.drawImage(theImg, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL('image/png');
    download.href = dataURL;
};
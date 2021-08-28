// todo: make japanese character string

const body = document.body;
const root = document.getElementById("root");

window.addEventListener("dragenter", (e) => {
    e.stopPropagation();
    e.preventDefault();
    body.style.backgroundColor = "#ccc";
});
window.addEventListener("dragover", (e) => {
    e.stopPropagation();
    e.preventDefault();
});
window.addEventListener("dragleave", (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.x === 0 && e.y === 0) body.style.backgroundColor = "#fff";
});
window.addEventListener("drop", (e) => {
    e.stopPropagation();
    e.preventDefault();
    body.style.backgroundColor = "#fff";

    onFileDrop(e.dataTransfer.files[0]);
});

let image = document.createElement("img");
let currentSize = 1;

image.addEventListener("load", generateTextImage);

let plusPressed = false;
let minusPressed = false;
document.addEventListener("keydown", (e) => {
    const key = e.key;
    if (!minusPressed && key === "-") {
        minusPressed = true;
        currentSize /= 1.2;
        generateTextImage();
    } else if (!plusPressed && (key === "+" || key === "=")) {
        plusPressed = true;
        currentSize *= 1.2;
        generateTextImage();
    }
});
document.addEventListener("keyup", (e) => {
    const key = e.key;
    if (key === "-") {
        minusPressed = false;
    } else if (key === "+" || key === "=") {
        plusPressed = false;
    }
});

function onFileDrop(file) {
    const reader = new FileReader();

    if (!file.type.includes("image/")) return;

    reader.onload = function (e) {
        currentSize = 1;
        image.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function generateTextImage() {
    const imgData = getImgData();
    convertImgDataToText(imgData);
}

function getImgData() {
    const width = Math.round(image.width * currentSize);
    const height = Math.round(image.height * currentSize);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(image, 0, 0, width, height);

    return ctx.getImageData(0, 0, width, height);
}

function convertImgDataToText(imgData) {
    const textContainer = document.createElement("div");
    textContainer.classList.add("text-cntr");

    // latin characters and symbols weighted based on pixel density - high to low density.
    const symbols =
        'MMMMMMMMMMMMMMNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR###################################################################QQQQQQQQDDDDDDDDDDDDDDDDHHHHHHHHHHHHHHHH888888888888888888888888888888888888KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK000000000000000000000000000000000000000000000000000000000000000000000000gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggOOOOOOOOOOOOOOOOOOOOOOOOOOO99999999999999999966666666&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&UUUUUUUUUUUUUUUUUUUUUUUUUUPPPPPPPPPPPPPPPEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbqqqqqqmmmm44444444VVVVVVV$$$$XXXXXXXpppppppppddddddddddddddddddddddddddddddddddddddddddddddddddddddddddZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZSSSSSSSSSSSSSSSSSSSSSSSSSS55555555555555555555555555555555555555555555555555kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk3333333333333333333333333333333333hhhhhhhhhhhhhhhwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww22222222222222222222222222222222222222222222222222222FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFaaaaaaaaaaaaII%%%%%%%%eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy111111111111111111111111111111111111111111111111111111111ooooooooooooooooYYYYYYYYYYYYYYYYYYYYYCCCCCCCCCCCCCCCCCCTTTTTTTTTTTTTTTTTTTTTJJJJJJJJJJJJJJJJJJJJJJJJJJJuuuuuuuuuuuuuuuuunnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL777777777777777777777777777777777xxxxxxxxxxxxxxxxxxxxxxxxxxxxfffffffffffffffffjjjjjjjjjjjjjjj{{{{{{{{{{{{{sssssssssssszzzzzz}}}}tttttttttttttttttttttttvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]][[[[[[[[[[[iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiilllllllllllllllllllllllllllllllllllllllllllll????????????????????????????????????????ccccccccccccccccccccccccccccccccccccccccccccccccccccccc================================||||||||||||||||||||||||||||||||>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<)))))))))))))))))))))((((((((((+++++++++++++++++++++++++\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\///////////////////////////////////////////rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr**********************************************************************************************************************************************!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^~~~~~~~~~~~~~~~~~~~~~~;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""":::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,______________________________________________________________________________________\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'-----------------------------------------------................................................................``````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````                                                                                                                                                    ';
    const symbolsLastIndex = symbols.length - 1;

    const dataWidth = imgData.width * 4;
    const imgHeight = imgData.height;
    const pixelData = imgData.data;

    for (let i = 0; i < imgHeight; ++i) {
        const textLine = document.createElement("div");
        let text = "";

        for (let j = i * dataWidth; j < dataWidth * (i + 1); j += 4) {
            let total = pixelData[j] + pixelData[j + 1] + pixelData[j + 2];
            text += symbols[Math.floor((total / 765) * symbolsLastIndex)];
        }
        textLine.textContent = text;

        textContainer.appendChild(textLine);
    }

    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }

    root.appendChild(textContainer);
}

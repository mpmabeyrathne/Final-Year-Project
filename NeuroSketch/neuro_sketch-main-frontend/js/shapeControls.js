import { selectedShape } from "./eventHandlers/shapeEventListener.js";

function drawBoundingBox(boundingBox, x, y, width, height) {
    setSVGAttributes(boundingBox, {
        x: x,
        y: y,
        width: width,
        height: height,
        style: 'visibility: visible'
    });
}


function drawRotateButton(rotateButton, x, y) {
    setSVGAttributes(rotateButton, {
        style: 'visibility: visible;',
        transform: `translate(${x - ROTATE_BUTTON_OFFSET_X} ${
            y - ROTATE_BUTTON_OFFSET_Y
        })`
    });
}


function drawTextBox(textBoxParent, x, y, width, height) {
    setCSSAttributes(textBoxParent, {
        width: width,
        height: height / 2 + 10,
        x: x - 2,
        y: y + height / 2 - 10
    });
}


function drawResizeButtons(resizeButtons, x, y, width, height) {
    let resizeButtonDiameter = RESIZE_BUTTON_RADIUS * 2;
    let points = [
        [x - resizeButtonDiameter, y - resizeButtonDiameter], // NW
        [x + width / 2, y - resizeButtonDiameter], // N
        [x + width + resizeButtonDiameter, y - resizeButtonDiameter], // NE

        [x - resizeButtonDiameter, y + height / 2], // W
        [x + width + resizeButtonDiameter, y + height / 2], // E

        [x - resizeButtonDiameter, y + height + resizeButtonDiameter], // SW
        [x + width / 2, y + height + resizeButtonDiameter], // S
        [x + width + resizeButtonDiameter, y + height + resizeButtonDiameter] // SE
    ];

    for (let i = 0; i < 8; i++) {
        let resizeButton = resizeButtons[i];
        let [x, y] = points[i];
        setSVGAttributes(resizeButton, {
            style: 'visibility: visible',
            cx: x,
            cy: y,
            rx: RESIZE_BUTTON_RADIUS,
            ry: RESIZE_BUTTON_RADIUS
        });
    }
}


function drawControls(x, y, width, height) {
    let boundingBox = selectedShape.firstChild;
    drawBoundingBox(boundingBox, x, y, width, height);

    let rotateButton = selectedShape.querySelector('.rotate-button');
    drawRotateButton(rotateButton, x, y);

    let textBoxParent = selectedShape.querySelector('.text-box-parent');
    drawTextBox(textBoxParent, x, y, width, height);

    let resizeButtons = selectedShape.querySelectorAll('.resize-button');
    drawResizeButtons(resizeButtons, x, y, width, height);
}

function resetControls() {
    if (selectedShape) {
        let rotateButton = selectedShape.querySelector('.rotate-button');
        setSVGAttributes(rotateButton, {
            style: 'visibility: hidden'
        });
        removeSVGAttributes(rotateButton, ['transform']);

        let boundingBox = selectedShape.firstChild;
        setSVGAttributes(boundingBox, {
            style: 'visibility: hidden'
        });

        let resizeButtons = selectedShape.querySelectorAll('.resize-button');
        resizeButtons.forEach((resizeButton) => {
            setSVGAttribute(resizeButton, 'style', 'visibility: hidden');
        });
    }
}

export{drawControls, resetControls};
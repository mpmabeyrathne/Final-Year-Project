import { drawControls, resetControls } from "../shapeControls.js";

//import { selectedShape } from "../leftSideBar.js";
let selectedShape = null;

function shapeEventListener(shape) {
    shape.addEventListener('mouseover', () => {
    });
    shape.addEventListener('click', selectShape);

    function selectShape(event) {
        if (selectedShape) {
            resetControls();
        }

        selectedShape = shape;

        let {x, y, width, height} = selectedShape
            .querySelector('.actual-shape')
            .getBBox();

        drawControls(x, y, width, height);
        populateRightSideBar(shape);
    }
}

export {shapeEventListener};


function outsideClickEventListener(svgObject) {
    svgObject.sv.addEventListener('click', (e) => {
        let clickedElement = e.target;

        if (
            clickedElement.classList.contains('background-grid') ||
            clickedElement.classList.contains('drawing-area')
        ) {
            resetControls();
        }
    });
}
export {outsideClickEventListener};


function updateFillColorStatus(shape) {
    let filledCheck = $('#fill-status');
    let pickedColor = $('#color-picker');
    let fillOpacity = $('#opacity');

    filledCheck.checked = getSVGAttribute(shape, 'fill');
    pickedColor.value = getSVGAttribute(shape, 'fill');
    fillOpacity.value = getSVGAttribute(shape, 'fill-opacity') * 100;
}


function updateLineProperties(shape) {
    let lineStatus = $('#line-status');
    let lineTypeSelector = $('#line-type');
    let lineWidth = $('#line-width');
    let lineColor = $('#stroke-color-picker');

    lineStatus.checked = getSVGAttribute(shape, 'stroke');
    lineWidth.value = parseFloat(getSVGAttribute(shape, 'stroke-width'));
    lineColor.value = getSVGAttribute(shape, 'stroke');
}


function updatePositionProperties(shape) {
    let left = $('#left');
    let top = $('#top');

    let [x, y] = getSVGAttribute(shape, 'translate').split(' ');
    left.value = parseFloat(x).toFixed(2);
    top.value = parseFloat(y).toFixed(2);
}


function updateScaleProperties(shape) {
    let actualShape = shape.querySelector('.svg-shape');

    let scaleX = $('#width');
    let scaleY = $('#height');

    let [w, h] = getSVGAttribute(actualShape, 'scale').split(' ');

    scaleX.value = w;
    scaleY.value = h;
}


function updateRotationProperties(shape) {
    let rotation = $('#rotate');
    rotation.value = getSVGAttribute(shape, 'rotate');
}


function updateCurrentFont(textArea) {
    let selectedFont = $('#fonts');

    let currentFont = [...textArea.classList].filter((class_) => {
        return class_.includes('font');
    });
    currentFont = currentFont[0].split('-').slice(-1)[0];
    let fontIndex = 0;

    for (let i = 0; i < selectedFont.length; i++) {
        if (selectedFont.options[i].value === currentFont) {
            fontIndex = i;
            break;
        }
    }
    selectedFont.selectedIndex = fontIndex;
}


function updateFontStyle(textArea, fontStyleClass, fontStyleButtonSelector) {
    let isFontStyleApplied = textArea.classList.contains(fontStyleClass);
    let button = $(fontStyleButtonSelector);

    isFontStyleApplied
        ? button.classList.add('btn-active')
        : button.classList.remove('btn-active');
}


function updateFontSize(textArea) {
    let fontSizeInput = $('#font-size');

    fontSizeInput.value = parseInt(getCSSAttribute(textArea, 'font-size'));
}

function updateFontColor(textArea) {
    let fontColor = $('#font-color');
    fontColor.value = getCSSAttribute(textArea, 'color');
}


function updateFontProperties(shape) {
    let textArea = shape.querySelector('.shape-text');

    updateCurrentFont(textArea);

    updateFontStyle(textArea, 'text-bold', '#bold-btn');
    updateFontStyle(textArea, 'text-italics', '#italics-btn');
    updateFontStyle(textArea, 'text-underline', '#underline-btn');

    updateFontSize(textArea);

    updateFontColor(textArea);
}

function populateRightSideBar(shape) {
    updateFontProperties(shape);
    updateLineProperties(shape);
    updateScaleProperties(shape);
    updateFillColorStatus(shape);
    updatePositionProperties(shape);
    updateRotationProperties(shape);
}

export{selectedShape};
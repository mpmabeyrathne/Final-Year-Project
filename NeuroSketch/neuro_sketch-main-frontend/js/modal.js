import { shapeEventListener } from "./eventHandlers/shapeEventListener.js";

function showDraftSelector(sv) {
    let modal = $('.modal');
    modal.classList.remove('hide');
    populateDraftSelector();
    draftSelectEventListener();
    draftButtonsEventListener(sv);
    addGrid(sv);
}

function hideDraftSelector() {
    let modal = $('.modal');
    modal.classList.add('hide');
}

function populateDraftSelector() {
    let draftSelector = $('#saved-draft-selector');
    let found = false;
    for (const key of Object.keys(localStorage)) {
        if (key.startsWith('draw-io-')) {
            const value = localStorage.getItem(key);
            const state = Object.values(JSON.parse(value))[0];
            const timeStamp = Object.keys(JSON.parse(value))[0];

            let option = document.createElement('option');
            option.value = timeStamp;
            option.text = timeStamp;
            option.name = timeStamp;

            found = true;
            draftSelector.appendChild(option);
        }
    }

    if (found) {
        showPreview();
    } else {
        hideDraftSelector();
    }
}

function removeEVentHandler(sv) {
    let removeButton = document.getElementById('btn-remove-draft');

    removeButton.addEventListener('click', (e) => {
        let draftSelector = $('#saved-draft-selector');
        let key = "draw-io-" + draftSelector.value;
        let index = draftSelector.selectedIndex;
        draftSelector.remove(index);
        localStorage.removeItem(key);
    });
}


function draftSelectEventListener() {
    let draftSelector = $('#saved-draft-selector');
    draftSelector.addEventListener('change', (e) => {
        showPreview();
    });
}

function editEventHandler(sv) {
    let editButton = document.getElementById('btn-edit-draft');
    editButton.addEventListener('click', (e) => {
        let selectedTimeStamp = getSelectedTimeStamp();
        let selectedDiagram = getSelectedDiagram(selectedTimeStamp);
        loadPreviousState(sv, selectedDiagram);
        document.getElementById("txtFileName").value = getSelectedTimeStamp();
    });
}

function cancelEVentHandler(sv) {
    let cancelButton = document.getElementById('btn-cancel-draft');

    cancelButton.addEventListener('click', (e) => {
        addGrid(sv);
        hideDraftSelector();
    });
}

function draftButtonsEventListener(sv) {
    editEventHandler(sv);
    cancelEVentHandler(sv);
    removeEVentHandler(sv)
}

function getSelectedTimeStamp() {
    let draftSelector = $('#saved-draft-selector');
    console.log("draf selctpr " + draftSelector)
    const selected = [...draftSelector.options].filter((e) => {
        return e.selected;
    });
    console.log("draf selctpr down ------- " + selected[0].value)

    return selected[0].value;
}

function getSelectedDiagram(timeStamp) {
    for (const value of Object.values(localStorage)) {
        // Get TimeStamp and DOM state
        const state = Object.values(JSON.parse(value))[0];
        const currentTimeStamp = Object.keys(JSON.parse(value))[0];
        if (currentTimeStamp === timeStamp) {
            return state;
        }
    }
}

function removeGrid(previewSVG) {
    let defElement = previewSVG.querySelector('defs');
    let backgroundGrid = previewSVG.querySelector('.background-grid');
    if (defElement) {
        previewSVG.removeChild(defElement);
    }
    if (backgroundGrid) {
        previewSVG.removeChild(backgroundGrid);
    }
}

function showPreview() {
    let previewSVG = $('.saved-draft-preview');

    let selectedTimeStamp = getSelectedTimeStamp();
    let selectedDiagram = getSelectedDiagram(selectedTimeStamp);
    previewSVG.innerHTML = selectedDiagram;

    removeGrid(previewSVG);
}

function loadPreviousState(sv, selectedDiagram) {
    hideDraftSelector();
    sv.innerHTML = selectedDiagram;
    sv.querySelectorAll('.draggable-group').forEach((element) => {

        shapeEventListener(element);
    });
    document.querySelectorAll('.resize-button').forEach((element) => {
        let id = element.id;
        handleResize(sv, element, id);
    });
}

function drawSmallGrid(pattern) {
    setSVGAttributes(pattern, {
        id: 'tenthGrid',
        width: '10',
        height: '10',
        patternUnits: 'userSpaceOnUse'
    });
}

function drawLargeGrid(pattern) {
    setSVGAttributes(pattern, {
        id: 'grid',
        width: '100',
        height: '100',
        patternUnits: 'userSpaceOnUse'
    });
}

function drawPathSmallGrid(pattern) {
    setSVGAttributes(pattern, {
        d: 'M 10 0 L 0 0 0 10',
        fill: 'none',
        stroke: 'silver',
        'stroke-width': '0.5'
    });
}

function drawPathLargeGrid(pattern) {
    setSVGAttributes(pattern, {
        d: 'M 100 0 L 0 0 0 100',
        fill: 'none',
        stroke: 'gray',
        'stroke-width': '1'
    });
}

function addGrid(sv) {
    let defElement = document.createElementNS(SVGNS, 'defs');

    let patternSmallGrid = document.createElementNS(SVGNS, 'pattern');
    drawSmallGrid(patternSmallGrid);

    let pathSmallGrid = document.createElementNS(SVGNS, 'path');
    drawPathSmallGrid(pathSmallGrid);

    patternSmallGrid.appendChild(pathSmallGrid);
    defElement.appendChild(patternSmallGrid);

    let patternLargeGrid = document.createElementNS(SVGNS, 'pattern');
    drawLargeGrid(patternLargeGrid);

    let pathLargeGrid = document.createElementNS(SVGNS, 'path');
    drawPathLargeGrid(pathLargeGrid);

    let rectLargeGrid = document.createElementNS(SVGNS, 'rect');
    setSVGAttributes(rectLargeGrid, {
        width: '100',
        height: '100',
        fill: 'url(#tenthGrid)'
    });

    patternLargeGrid.appendChild(rectLargeGrid);
    patternLargeGrid.appendChild(pathLargeGrid);
    defElement.appendChild(patternLargeGrid);

    let gridRect = document.createElementNS(SVGNS, 'rect');
    setSVGAttributes(gridRect, {
        width: '100%',
        height: '100%',
        fill: 'url(#grid)',
        class: 'background-grid'
    });
    sv.prepend(gridRect);
    sv.prepend(defElement);
}

export {showDraftSelector,addGrid};
import { selectedShape } from "../eventHandlers/shapeEventListener.js";
import { shapeEventListener } from "../eventHandlers/shapeEventListener.js";

let ctrlC = false,
    copiedShape = null;


function deleteShape(sv, selectedShape) {
    sv.removeChild(selectedShape);
}


function copyShape(sv, selectedShape) {
    copiedShape = selectedShape.cloneNode(true);
}

function pasteShape(sv) {
    sv.append(copiedShape);
    shapeEventListener(copiedShape);
    document.querySelectorAll('.resize-button').forEach((element) => {
        let id = element.id;
        handleResize(sv, element, id);
    });
}


function keyBoardEventListener(svgObject) {
    window.addEventListener('keydown', (e) => {
        if (selectedShape) {
            if (e.code === 'Delete') {
                deleteShape(svgObject.sv, selectedShape);
            }

            let c = e.keyCode;
            let ctrlDOwn = e.ctrlKey || e.metaKey;
            if (ctrlDOwn && c === 67) {
                copyShape(svgObject.sv, selectedShape);
                ctrlC = true;
            }

            if (ctrlDOwn && c === 86) {
                pasteShape(svgObject.sv);
                ctrlC = false;
            }
        }
    });
}

export {keyBoardEventListener};

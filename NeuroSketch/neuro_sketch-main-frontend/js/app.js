import {CustomShape} from './components/CustomShape.js';
import {Connector} from './components/Connector.js';
import {sideBarShapeHoverEventListener, addEventListenerLeftSideBar, fetchAndDisplayShapes } from './leftSideBar.js'
import { keyBoardEventListener } from './eventHandlers/keyboard.js';
import { outsideClickEventListener } from './eventHandlers/shapeEventListener.js';
import { saveEventHandler } from './eventHandlers/save.js';
import { showDraftSelector, addGrid } from './modal.js';
import { addEventListenerRightSideBar } from './rightSideBar.js';


export class SVG {
    constructor(selector) {
        this.sv = $(selector);
        setSVGAttribute(this.sv, 'viewBox', '0 0 ' + SVG_WIDTH + ' ' + SVG_HEIGHT);

        this.ShapesConstruct = {
            CustomShape: CustomShape,
            Connector: Connector
        };
    }


    svg2img(downloadLink, type) {
        let xml = new XMLSerializer().serializeToString(this.sv);
        let svg64 = btoa(xml);

        let b64start = 'data:image/svg+xml;base64,';
        let image64 = b64start + svg64;

        let img = document.createElement('img');
        img.setAttribute('src', image64);

        let canvas = document.createElement('canvas');
        canvas.width = SVG_WIDTH;
        canvas.height = SVG_HEIGHT;

        let ctx = canvas.getContext('2d');

        let imgsrc = image64.replace('image/svg', 'image/octet-stream');
        downloadLink.setAttribute('download', 'image.svg');

        img.onload = function () {
            ctx.drawImage(img, 0, 0);
            if (type === 'png') {
                imgsrc = canvas
                    .toDataURL('image/png', 1)
                    .replace('image/png', 'image/octet-stream');
                downloadLink.setAttribute('download', 'image.png');
            }
            downloadLink.href = imgsrc;
            downloadLink.click();
        };
    }

    initialise(get_value) {
        sideBarShapeHoverEventListener(this);
        addEventListenerLeftSideBar(this);
        makeDraggable(this);
        addEventListenerRightSideBar();
        keyBoardEventListener(this);
        outsideClickEventListener(this);
        saveEventHandler(this);

        if(get_value) {
        fetchAndDisplayShapes(this);
        }
    }
}



let sv;
window.onload = function () {
    sv = new SVG('.drawing-area');

    if (hasPreviousSavedState()) {
        showDraftSelector(sv.sv);
    } else {
        addGrid(sv.sv);
    }

    const value = document.getElementById('image-path').value;

    sv.initialise(value);
};


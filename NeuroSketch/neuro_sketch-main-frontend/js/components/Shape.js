import {Handle} from './handle.js';
import {TextArea} from './TextArea.js';
import {BoundingBox} from './BoundingBox.js';

export class Shape {

    constructor(props) {
        const {
            stroke = '#000000',
            strokeWidth = '1px',
            strokeDashArray = '',
            strokeDashOffset = '',
            strokeOpacity = '100',
            strokeLineCap = 'butt',
            strokeLineJoin = 'miter',

            fill = '#ffffff',
            fillOpacity = '1',
            fillRule = 'nonzero',

            rotate = '0',
            scale = '1 1',
            translate = '400 100',

            /* Cursor Properties */
            cursor = 'move',
            pointer = 'all',

            /* Font Properties */
            fontSize = '14px',
            fontStyle = 'normal',
            fontWeight = 'normal',
            fontVariant = 'normal',
            fontFamily = 'Arial, Helvetica, sans-serif, monospace',

            sv
        } = props;

        this.stroke = stroke;
        this.strokeWidth = strokeWidth;
        this.strokeLineCap = strokeLineCap;
        this.strokeOpacity = strokeOpacity;
        this.strokeLineJoin = strokeLineJoin;
        this.strokeDashArray = strokeDashArray;
        this.strokeDashOffset = strokeDashOffset;

        this.fill = fill;
        this.fillRule = fillRule;
        this.fillOpacity = fillOpacity;

        this.scale = scale;
        this.rotate = rotate;
        this.translate = translate;

        this.cursor = cursor;
        this.pointer = pointer;

        this.fontSize = fontSize;
        this.fontStyle = fontStyle;
        this.fontFamily = fontFamily;
        this.fontWeight = fontWeight;
        this.fontVariant = fontVariant;

        this.sv = sv;

        this.g = document.createElementNS(SVGNS, 'g');
        this.setAttributes();

        this.g_ = document.createElementNS(SVGNS, 'g');
        this.g_.setAttributeNS(null, 'class', 'actual-shape');

        this.foreignG = document.createElementNS(SVGNS, 'g');

        this.boundingBox = new BoundingBox({
            scale: this.scale,
            rotate: this.rotate,
            translate: this.translate
        }).getBoundingBox();

        this.handle = new Handle({g_: this.g_, sv: this.sv}).getHandles();

        this.textBox = null;
    }


    setNonScalingStrokes() {
        this.handle.forEach((button) => {
            setSVGAttribute(button, 'vector-effect', 'non-scaling-stroke');
        });

        setSVGAttribute(this.boundingBox, 'vector-effect', 'non-scaling-stroke');
    }

    setAttribute(elem, key, value) {
        setSVGAttribute(elem, key, value);
    }

    setStrokeAttributes() {
        setSVGAttributes(this.g, {
            stroke: this.stroke,
            'stroke-width': this.strokeWidth,
            'stroke-linecap': this.strokeLineCap,
            'stroke-opacity': this.strokeOpacity,
            'stroke-linejoin': this.strokeLineJoin,
            'stroke-dasharray': this.strokeDashArray,
            'stroke-dashoffset': this.strokeDashOffset
        });
    }

    setFillAttributes() {
        setSVGAttributes(this.g, {
            fill: this.fill,
            'fill-rule': this.fillRule,
            'fill-opacity': this.fillOpacity
        });
    }

    setTransformationAttributes() {
        setSVGAttributes(this.g, {
            rotate: this.rotate,
            translate: this.translate,
            transform: `translate(${this.translate})  rotate(${this.rotate})`
        });
    }

    setCursorAttributes() {
        setCSSAttributes(this.g, {
            cursor: 'move',
            pointerEvents: 'all'
        });

        setSVGAttribute(this.g, 'class', 'draggable-group');
    }

    setAttributes() {
        this.setStrokeAttributes();
        this.setFillAttributes();
        this.setCursorAttributes();
        this.setTransformationAttributes();
    }

    setPathAttributes(element) {
        setSVGAttributes(element, {
            class: 'svg-shape',
            scale: `${this.scale}`,
            transform: `scale(${this.scale})`
        });
    }

    getElement() {
        return this.g;
    }

    applyScalePath(that, element) {
        setSVGAttributes(element, {
            scale: `${that.scale}`,
            transform: `scale(${that.scale})`
        });
    }

    create() {
        this.setNonScalingStrokes();

        let that = this;

        this.shapeElements.forEach((element, index) => {
            that.g_.appendChild(element);

            setSVGAttributes(element, {
                class: 'svg-shape',
                scale: `${that.scale}`,
                transform: `scale(${that.scale})`,
                'vector-effect': 'non-scaling-stroke'
            });
        });

        this.g.appendChild(this.boundingBox);

        this.g.append(this.g_);
        this.handle.forEach((button, index) => {
            that.g.appendChild(button);
        });

        this.addToDOM();

        this.textBox = new TextArea(this.g_.getBBox());

        this.foreignG.appendChild(this.textBox.getForeignObject());
        this.g.append(this.foreignG);
    }

    addToDOM() {
        this.sv.appendChild(this.getElement());
    }
}

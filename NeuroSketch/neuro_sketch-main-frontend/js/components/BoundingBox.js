export class BoundingBox {
    constructor(props = {}) {
        const {
            scale,
            rotate,
            translate,
            fill = 'none',
            stroke = 'blue',
            strokeWidth = '2',
            strokeDashArray = '4'
        } = props;

        this.fill = fill;
        this.stroke = stroke;
        this.strokeWidth = strokeWidth;
        this.strokeDashArray = strokeDashArray;

        this.scale = scale;
        this.rotate = rotate;
        this.translate = translate;

        this.box = document.createElementNS(SVGNS, 'rect');
        setSVGAttributes(this.box, {
            fill: fill,
            stroke: stroke,
            class: 'bounding-box',
            'stroke-width': strokeWidth,
            'stroke-dasharray': strokeDashArray
        });
    }

    getBoundingBox() {
        return this.box;
    }
}

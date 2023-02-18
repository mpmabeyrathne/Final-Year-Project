function getParentShape(el) {
    return el.parentNode;
}

function handleResize(sv, el, id) {
    let offset,
        transform,
        selectedElement,
        previous = {};
    el.addEventListener('mousedown', startResize);
    el.addEventListener('mousemove', resize);
    el.addEventListener('mouseup', stopResize);
    el.addEventListener('mouseleave', stopResize);

    function getMousePosition(evt) {
        let CTM = sv.getScreenCTM();
        return {
            x: (evt.clientX - CTM.e) / CTM.a,
            y: (evt.clientY - CTM.f) / CTM.d
        };
    }

    function initialiseDragging(evt) {
        offset = getMousePosition(evt);

        var transforms = selectedElement.transform.baseVal;

        if (
            transforms.length === 0 ||
            transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE
        ) {
            var translate = sv.createSVGTransform();
            translate.setTranslate(0, 0);
            selectedElement.transform.baseVal.insertItemBefore(translate, 0);
        }

        transform = transforms.getItem(0);
        offset.x -= transform.matrix.e;
        offset.y -= transform.matrix.f;
    }

    function startResize(evt) {
        selectedElement = getParentShape(el);
        let coord = getMousePosition(evt);

        previous = coord;
        initialiseDragging(evt);
    }

    function resize(evt) {
        if (selectedElement) {
            evt.preventDefault();
            let coord = getMousePosition(evt);
            transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
            setSVGAttribute(
                selectedElement,
                'translate',
                coord.x - offset.x + ' ' + (coord.y - offset.y)
            );

            let actualShape = selectedElement.querySelector('.actual-shape');
            let {x, y, width, height} = actualShape.getBBox();

            let buttonDir = id.split('-')[0];
            let {parityX, parityY} = PARITY[buttonDir];

            let deltaX = parityX * (previous.x - coord.x);
            let deltaY = parityY * (previous.y - coord.y);

            previous = coord;
            for (let element of actualShape.children) {
                let [scaleX, scaleY] = element.getAttributeNS(null, 'scale').split(' ');

                let newScaleX = (width - deltaX) / (width / scaleX);
                let newScaleY = (height - deltaY) / (height / scaleY);
                setNewScale(element, newScaleX, newScaleY);
            }
        }
    }

    function setNewScale(element, newScaleX, newScaleY) {
        setSVGAttributes(element, {
            scale: `${newScaleX} ${newScaleY}`,
            transform: `scale(${newScaleX} ${newScaleY})`
        });
    }

    function stopResize(evt) {
        selectedElement = false;
    }
}

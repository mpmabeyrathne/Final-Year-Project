function makeDraggable(sv) {
    sv.sv.addEventListener('mousedown', startDrag);
    sv.sv.addEventListener('mousemove', drag);
    sv.sv.addEventListener('mouseup', endDrag);
    sv.sv.addEventListener('mouseleave', endDrag);

    let selectedElement, offset, transform;

    function getMousePosition(evt) {
        let CTM = sv.sv.getScreenCTM();
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
            var translate = sv.sv.createSVGTransform();
            translate.setTranslate(0, 0);
            selectedElement.transform.baseVal.insertItemBefore(translate, 0);
        }

        transform = transforms.getItem(0);
        offset.x -= transform.matrix.e;
        offset.y -= transform.matrix.f;
    }

    function startDrag(evt) {
        if (evt.target.classList.contains('resize-button')) {
            return;
        }
        if (evt.target.parentNode.classList.contains('draggable-group')) {
            if (
                !evt.target.classList.contains('point1') &&
                !evt.target.classList.contains('point2')
            ) {
                selectedElement = evt.target.parentNode;
                initialiseDragging(evt);
            }
        } else if (
            evt.target.parentNode.parentNode.classList.contains('draggable-group')
        ) {
            selectedElement = evt.target.parentNode.parentNode;
            initialiseDragging(evt);
        }
    }

    function drag(evt) {
        if (selectedElement) {
            evt.preventDefault();
            let coord = getMousePosition(evt);
            transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
            // Apply translation on dragging
            selectedElement.setAttributeNS(
                null,
                'translate',
                coord.x - offset.x + ' ' + (coord.y - offset.y)
            );
        }
    }

    function endDrag(evt) {
        if (selectedElement) {
            let newTransformation = selectedElement.getAttributeNS(null, 'transform');
            selectedElement.removeAttributeNS(null, 'transform');
            selectedElement.setAttribute('transform', newTransformation);
        }
        selectedElement = false;
    }
}

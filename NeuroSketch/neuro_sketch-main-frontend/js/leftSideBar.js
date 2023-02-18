

let selectedShape = null;


function sideBarShapeHoverEventListener(sv) {
  let leftSideBarShapes = document.querySelectorAll(
    '.sidebar-shape, .sidebar-connector'
  );
  leftSideBarShapes.forEach((sidebarShape) => {
	handleShapeInfo(sidebarShape);
  });
}

function handleShapeInfo(sidebarShape){
	let showShapeInfo = $('.show-shape-info');

	let showShapeInfoShapeName = showShapeInfo.querySelector('.shape-name');
	let showShapeInfoPreview = showShapeInfo.querySelector(
	  '.show-shape-info-preview'
	);


	sidebarShape.addEventListener('mouseover', displayShapeInfo);
	sidebarShape.addEventListener('mouseout', hideShapeInfo);
	sidebarShape.addEventListener('click', hideShapeInfo);

	function displayShapeInfo(event) {
	  let shapeGroup = sidebarShape.querySelector('g');

	  showShapeInfo.classList.remove('hide');
	  showShapeInfoShapeName.innerHTML = getHTMLAttribute(
		 sidebarShape,
		 'title'
	  );

	  showShapeInfoPreview.innerHTML = sidebarShape.innerHTML;

	  shapeGroup = showShapeInfoPreview.querySelector('g');
	  setSVGAttributes(shapeGroup, {
		 transform: 'translate(180 10) scale(15 15)'
	  });
	}

	function hideShapeInfo(event) {
	  showShapeInfo.classList.add('hide');
	}
}


function addEventListenerLeftSideBar(svgObject) {
  let allShapesBtn = document.querySelectorAll(
    '.sidebar-shape, .sidebar-connector'
  );

  allShapesBtn.forEach((button) => {
    button.addEventListener('click', () => {
      let clickedShape = button.getAttribute('title');
      let elem;
      if (getHTMLAttribute(button, 'class') === 'sidebar-shape') {
        let elem = new svgObject.ShapesConstruct['CustomShape']({
          sv: svgObject.sv,
          ...ShapeInfo[clickedShape]
        });
        elem.create();
        shapeEventListener(elem.getElement());
      } else {
        elem = new svgObject.ShapesConstruct['Connector']({
          sv: svgObject.sv,
          ...ConnectorInfo[clickedShape]
        });
        elem.create();
        connectorEventListener(svgObject.sv);
      }
    });
  });
}

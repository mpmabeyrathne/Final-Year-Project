import { CustomShape } from './components/CustomShape.js';
import { Connector } from './components/Connector.js';
import { shapeEventListener } from './eventHandlers/shapeEventListener.js';
import {ConnectorInfo} from './shapeFiles/ConnectorFile.js';
import {SVG} from './app.js'


function sideBarShapeHoverEventListener(sv) {
  let leftSideBarShapes = document.querySelectorAll(
    '.sidebar-shape, .sidebar-connector'
  );
  leftSideBarShapes.forEach((sidebarShape) => {
	handleShapeInfo(sidebarShape);
  });
}

export { sideBarShapeHoverEventListener };

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


const svgElement = document.querySelector(".shape");

const svgObject = {
  sv: svgElement,
  ShapesConstruct: {
    CustomShape: CustomShape,
    Connector: Connector,
  },
};
function addEventListenerLeftSideBar(svgObject) {
  let allShapesBtn = document.querySelectorAll(
    '.sidebar-shape, .sidebar-connector'
  );

  allShapesBtn.forEach((button) => {
    button.addEventListener('click', () => {
      let clickedShape = button.getAttribute('title');
      createAndDisplayShape(svgObject, clickedShape);
    });
  });
}

async function fetchAndDisplayShapes(_) {
  const svgObject = new SVG('.drawing-area')
  console.log("Inside fetchAndDisplayShapes");
  const Response = await fetch('http://localhost:5000/api/title');
  const data = await Response.json();
  console.log("Fetched data:", data);


  if (data.titles && Array.isArray(data.titles)) {
    console.log("Iterating through fetched titles array:", data.titles);
    data.titles.forEach((title, index) => {
      setTimeout(() => {
        console.log("Trying shape:", title);
        createAndDisplayShape(svgObject, title);
      }, index * 10); 
    });
  } else {
    console.error("Fetched data is not an array:", data);
  }
}



function createAndDisplayShape(svgObject, clickedShape) {
  let button = document.querySelector(`[title="${clickedShape}"]`);
  if (!button) {
      console.error(`Button with title "${clickedShape}" not found`);
      return;
    }
  let elem;
  if (getHTMLAttribute(button, "class") === "sidebar-shape") {
    const shapeInfo = ShapeInfo[clickedShape];
    if (shapeInfo) {
      elem = new svgObject.ShapesConstruct["CustomShape"]({
        sv: svgObject.sv,
        ...shapeInfo,
      });
      console.log("Children property:", shapeInfo.children);
      elem.create();
      shapeEventListener(elem.getElement());
      
    } else {
      console.error(`Shape info for "${clickedShape}" does not exist`);
    }
  } else {
    elem = new svgObject.ShapesConstruct["Connector"]({
      sv: svgObject.sv,
      ...ConnectorInfo[clickedShape],
    });
    elem.create();
  }
}




export { addEventListenerLeftSideBar, fetchAndDisplayShapes, svgObject};
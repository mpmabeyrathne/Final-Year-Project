import { fetchAndDisplayShapes, svgObject } from "./leftSideBar.js";

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('sendimg');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const value = document.getElementById('image-path').value;

    if (value.length === 0) {
      alert("Please enter the image path");
    } else {
      sendImagePath(value);
    }
  });
});

function sendImagePath(value) {
  const sendImagePathURL = "/neuro_sketch";

  try {
    if (value) {
      fetch(sendImagePathURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imagePath: value }),
      })
        .then((response) => {
          if (response.ok) {
            console.log("neuro_sketch API call succeeded");

            response.json().then((data) => {
              if (data.redirect) {
                window.location.href = data.redirect;
              } else {
                // Call fetchAndDisplayShapes here when the API call is successful
                fetchAndDisplayShapes(svgObject);
              }
            });
          } else {
            throw new Error("neuro_sketch API call failed");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.log("No value entered. Skipping API call.");
    }
  } catch (err) {
    console.log(err);
  }
}


  
  function downloadHTML(htmlString, filename) {
    const blob = new Blob([htmlString], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
  
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = filename;
  
   
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  
  document.getElementById('sendSketch').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const sketchPath = document.getElementById('Sketch-path').value;
    const response = await fetch('/Neuro_sketch/SketchPath', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sendSketchPath: sketchPath }),
    });
  
    const result = await response.json();
    console.log(result);
    if (result.result === 'success') {
      downloadHTML(result.generated_html, 'output.html');
    } else {
      console.error('An error occurred while generating HTML:', result.message);
    }
  });
  

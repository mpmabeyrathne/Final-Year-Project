function saveEventHandler(svgObject) {
    downloadEventListener(svgObject);
    saveProgressEventListener(svgObject);
    saveReplace(svgObject);
}

function downloadEventListener(svgObject) {
    let downloadButton = $('.btn-save');
    let downloadLink = $('.download-link');

    downloadButton.addEventListener('click', (e) => {
        resetControls();
        removeGrid(svgObject.sv);
        let exportFileType = '';
        document.getElementsByName('export-extension').forEach((option) => {
            if (option.checked) {
                exportFileType = 'png';
            }
        });
        svgObject.svg2img(downloadLink, exportFileType);
        addGrid(svgObject.sv);
    });
}


function openFileSave() {
    let modal = $('.modal');
    modal.classList.remove('hide');
}


function checkFiles(fileName) {
    let status = "";
    fileName = 'draw-io-' + fileName;
    for (const key of Object.keys(localStorage)) {
        if (key.startsWith('draw-io-')) {
            if (fileName === key) {
                status = "same";
                break;
            } else {
                status = "false";
            }
        }
    }
    return status;
}

function saveProgressEventListener(svgObject) {
    let saveProgress = $('.btn-save-progress');
    saveProgress.addEventListener('click', (e) => {

        let fileName = document.getElementById('txtFileName').value;
        let check = checkFiles(fileName);
        if (check === "same") {
            let windows = $('.save-file-window');
            windows.classList.remove('hide');
        } else {
            resetControls();
            let currentSignature = {};
            currentSignature[fileName] = svgObject.sv.innerHTML;
            localStorage.setItem(
                'draw-io-' + fileName,
                JSON.stringify(currentSignature)
            );
            alert("Saved!")
        }
    });
}


function saveReplace(svgObject) {
    let btnYes = $('.btnYes');
    btnYes.addEventListener('click', (e) => {

        let fileName = document.getElementById('txtFileName').value;

        resetControls();
        let currentSignature = {};
        currentSignature[fileName] = svgObject.sv.innerHTML;
        localStorage.setItem(
            'draw-io-' + fileName,
            JSON.stringify(currentSignature)
        );
        alert("Saved!");

        let save_file_window = $('.save-file-window');
        save_file_window.classList.add('hide');

    });
}

function replaceNo() {
    let modal = $('.save-file-window');
    modal.classList.add('hide');
}

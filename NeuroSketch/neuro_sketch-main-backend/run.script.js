// const { spawn } = require('child_process');

// const pythonScriptFilePath = 'D:\\Final-Year-Project\\NeuroSketch\\NeuroSketch-pytorch\\flask_server.py';
// const modelFilePath = 'D:\\Final-Year-Project\\NeuroSketch\\NeuroSketch-pytorch\\models\\e-d-model--epoch-49--loss-0.0096--batch-4--time-18-04-08-54.pth';
// const imagePath = 'D:\\Final-Year-Project\\NeuroSketch\\NeuroSketch-pytorch\\351.png';
// const pythonArgs = [modelFilePath, imagePath];


// const pythonProcess = spawn('python', [pythonScriptFilePath, ...pythonArgs]);

// let stdoutData  = '';
// pythonProcess.stdout.on('data', (data) => {
    
//     stdoutData += data.toString();
//     //console.log(JSON.parse.data.toString());
//   });
  
//   pythonProcess.stderr.on('data', (data) => {
//     console.error(data.toString());
//   });

// pythonProcess.on('close', (code) => {
// console.log('child process exited with code ${code}');
// });

const { spawn } = require("child_process");

function pic2htmlNode(model_file_path, img_path, cuda = true, img_crop_size = 224) {
  return new Promise((resolve, reject) => {
    const scriptPath = "D:\\Final-Year-Project\\NeuroSketch\\NeuroSketch-pytorch\\flask_server.py";

    const args = [
      model_file_path,
      img_path,
      "--img_crop_size",
      img_crop_size.toString(),
    ];

    if (cuda) {
      args.push("--cuda");
    }

    const process = spawn("python", [scriptPath, ...args]);

    let outputData = '';
    process.stdout.on("data", (data) => {
      console.log(`Output: ${data}`);
      outputData += data;
    });

    process.stderr.on("data", (data) => {
      console.error(`Error: ${data}`);
    });

    process.on("close", (code) => {
      console.log(`Python script exited with code: ${code}`);
      if (code === 0) {
        resolve(outputData);
      } else {
        reject(`Python script exited with code: ${code}`);
      }
    });
  });
}

module.exports.pic2htmlNode  = pic2htmlNode;


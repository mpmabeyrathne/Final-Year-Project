const { spawn } = require('child_process');


function runPythonScript(modelFilePath, imagePath) {
  return new Promise((resolve, reject) => {
    const pythonScript = spawn('python', ['D:\\Final-Year-Project\\NeuroSketch\\NeuroSketch-pytorch-ObDetec\\OB_Script_Run.py', modelFilePath, imagePath]);

    let stdoutData  = '';
    pythonScript.stdout.on('data', (data) => {
        stdoutData += data.toString();
      });
      
      pythonScript.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });
      
      pythonScript.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        if (code === 0) {
          resolve(stdoutData);
        } else {
          reject(`Child process exited with code ${code}`);
        }
      });
  });
}



module.exports.recognizeShapes = async (modelFilePath, imagePath) => {
    let lastRecognizedShapes = [];
  
    try {
      const result = await runPythonScript(modelFilePath, imagePath);
      console.log('Result:', result);
      lastRecognizedShapes = result;
    } catch (error) {
      console.error('Error:', error);
    }
  
    return lastRecognizedShapes;
  };
  

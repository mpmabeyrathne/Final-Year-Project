const { recognizeShapes } = require('./OB-Script.js');
const {pic2htmlNode} = require('./run.script.js');

const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


let lastRecognizedShapesGlobal =[]; 

async function runMLModel(imagePath) {
  const modelFilePath = "D:\\Final-Year-Project\\NeuroSketch\\NeuroSketch-pytorch-ObDetec\\models\\e-d-model--epoch-49--loss-0.1062--batch-32--time-06-05-13-37.pth";
  const lastRecognizedShapes = await recognizeShapes(modelFilePath, imagePath);
  const cleanedOutput = lastRecognizedShapes.trim();
  const parsedOutput = JSON.parse(cleanedOutput);

  return parsedOutput;
}

app.post("/neuro_sketch", async function(req, res) {
  const imagePath = req.body.imagePath;
  console.log("Received image path:", imagePath);

  try {
    const parsedOutput = await runMLModel(imagePath);
    lastRecognizedShapesGlobal = parsedOutput;
    console.log("Last Recognized Shapes:", parsedOutput);

    res.json({ response: parsedOutput });
    
  } catch (error) {
    console.error("Error running the ML model:", error);
    res.status(500).json({ error: "Error running the ML model: ${error.message}" });
  }
});



function updateJson(lastRecognizedShapesGlobal) {
    const pattern = /"\[([^]*?)\]"/;
    const match = lastRecognizedShapesGlobal.match(pattern);

    if (match) {
        const elements = match[1].split(',');
        const cleanedElements = elements.map(element => element.trim().replace(/^"|"$/g, ''));    
        const updatedJSON =  cleanedElements;
        return updatedJSON;
    } else {
        return null;
    }
}


app.use(express.static(path.join(__dirname, "../neuro_sketch-main-frontend")));

const userRoutes = require("./src/routes/user.routes");

app.use("/api/v1/neuro_sketch", userRoutes);

app.set("views", path.join(__dirname, "../neuro_sketch-main-frontend"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/signin", (req, res) => {
  res.render("signIn");
});
app.get("/neuro_sketch", (req, res) => {
  res.render("neuro_sketch");
});


app.get("/api/title", (req, res) => {
  console.log("API endpoint hit:", req.url);
  
   if (lastRecognizedShapesGlobal && lastRecognizedShapesGlobal.length > 0) {
    const data = {
      titles: lastRecognizedShapesGlobal,
    };
    console.log(lastRecognizedShapesGlobal);
    console.log("API response:", data);
    res.json(data);
   } else {
      console.error("No data available. Run the /neuro_sketch API first.");
      res.status(400).json({ error: "No data available. Run the /neuro_sketch API first." });
  }
});




app.post('/Neuro_sketch/SketchPath', (req, res) => {
  const sketchPath = req.body.sendSketchPath;

  const model_file_path =
    "D:\\Final-Year-Project\\NeuroSketch\\NeuroSketch-pytorch\\models\\e-d-model--epoch-49--loss-0.0096--batch-4--time-18-04-08-54.pth";

  pic2htmlNode(model_file_path, sketchPath)
    .then((outputData) => {
      console.log("HTML output:", outputData);
      res.json({ result: 'success', generated_html: outputData });
    })
    .catch((error) => {
      console.error("An error occurred while generating HTML:", error);
      res.status(500).json({ result: 'error', message: 'An error occurred while generating HTML.' });
    });
});







const PORT = process.env.PORT || 5000;

app.listen(PORT || 5000, () => {
  console.log(`Server is Starting !!! | PORT ${PORT}`);
  console.log(`API is running at http://localhost:${PORT}`);
});
 
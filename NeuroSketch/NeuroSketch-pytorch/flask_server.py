import argparse
from pathlib import Path
from PIL import Image
from vocab import Vocab
import torch
from torchvision import transforms
from dataset import NeuroSketchDataset
from utils import collate_fn, ids_to_tokens,generate_visualization_object, resnet_img_transformation
from models import Encoder, Decoder
from html_transpiler.html_transpiler import HTMLTranspiler
import numpy as np
import sys
import json
import warnings
warnings.filterwarnings("ignore", category=UserWarning)


def pic2html(model_file_path, img_path, cuda=True, img_crop_size=224):
    # Set up GPU
    use_cuda = cuda and torch.cuda.is_available()
    device = torch.device("cuda" if use_cuda else "cpu")

    # Load the model
    loaded_model = torch.load(model_file_path, map_location=device)
    vocab = loaded_model["vocab"]
    embed_size = loaded_model.get("embed_size", 256)
    hidden_size = loaded_model.get("hidden_size", 512)
    num_layers = loaded_model.get("num_layers", 1)
    encoder = Encoder(embed_size)
    decoder = Decoder(embed_size, hidden_size, len(vocab), num_layers)
    encoder.load_state_dict(loaded_model["encoder_model_state_dict"])
    decoder.load_state_dict(loaded_model["decoder_model_state_dict"])
    encoder = encoder.to(device)
    decoder = decoder.to(device)

    # Load the image and preprocess
    transform_img = resnet_img_transformation(img_crop_size)
    image = Image.open(img_path).convert('RGB')
    image_tensor = transform_img(image).unsqueeze(0).to(device)

    # Generate the code for the image
    encoder.eval()
    decoder.eval()
    with torch.no_grad():
        features = encoder(image_tensor)
        sample_ids = np.expand_dims(decoder.sample(features).cpu().data.numpy(), axis=0)
        predicted_code = ids_to_tokens(vocab, sample_ids[0])

    # Transpile the predicted code to HTML
    transpiler = HTMLTranspiler()
    predicted_html_string = transpiler.transpile(predicted_code, insert_random_text=True)

    return predicted_html_string
    

# Parse command line arguments
parser = argparse.ArgumentParser()

parser.add_argument("model_file_path", type=str, help="Path to the trained model file")
parser.add_argument("img_path", type=str, help="Path to the input image file")
parser.add_argument("--cuda", action="store_true", help="Use GPU for inference")
parser.add_argument("--img_crop_size", type=int, default=224, help="Size to crop the input image to")
args = parser.parse_args()

print(pic2html(args.model_file_path, args.img_path, args.cuda, args.img_crop_size))
# Run the pic2html function with the specified arguments

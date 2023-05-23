import sys
import argparse
from pathlib import Path
from PIL import Image
from vocab import Vocab
import torch
from torchvision import transforms
from dataset import Neuro_Sketch_Dataset
from utils import collate_fn, ids_to_tokens, generate_visualization_object, resnet_img_transformation
from models import Encoder, Decoder
from IPython.display import display, Image as IPyImage
import numpy as np
import json 
import warnings
warnings.filterwarnings("ignore", category=UserWarning)

def detect_shapes(model_file_path, img_path, cuda=True, img_crop_size=224):
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
        


    # Extract shape names from the predicted_code
    shape_classes = ['Button', 'InputText', 'TextArea', 'Lable', 'Image', 'RadioButton', 'SelectBox', 'CheckBox','Heading']
    recognized_shapes = []

    shape_names = []
    for elem in predicted_code:
      if elem in shape_classes:
        shape_names.append(elem)


    for token in predicted_code:
        if token in shape_classes:
            recognized_shapes.append(token)

    return recognized_shapes





def main():
    if len(sys.argv) != 3:
        print('Usage: python detect_shapes.py <model_file_path> <img_path>')
        sys.exit(1)

    model_file_path = sys.argv[1]
    img_path = sys.argv[2]

    recognized_shapes = detect_shapes(model_file_path, img_path)
    print(json.dumps(recognized_shapes)) 

if __name__ == '__main__':
    main()

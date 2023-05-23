import pytest
from pathlib import Path
from vocab import Vocab
from dataset import Neuro_Sketch_Dataset
from PIL import Image
from torch import Tensor

@pytest.fixture
def valid_vocab_path():
    return Path(Path(__file__).parent, "vocab.txt")


@pytest.fixture
def valid_vocab(valid_vocab_path):
    return Vocab(valid_vocab_path)


@pytest.fixture
def valid_data_path():
    return Path(Path(__file__).parent.parent, "data", "screenshot-description-pairs")


def test_dataset_creation(valid_vocab, valid_data_path):
    vocab = valid_vocab
    dataset = Neuro_Sketch_Dataset(valid_data_path, "train", vocab)
    assert dataset.filenames is not None
    assert dataset.filenames[len(dataset.filenames)-1] != ''

def test_dataset_get_single_sample(valid_vocab, valid_data_path):
    vocab = valid_vocab
    dataset = Neuro_Sketch_Dataset(valid_data_path, "train", vocab)
    sample = dataset[0]
    assert sample is not None
    # assert isinstance(sample[0], Image)
    # assert isinstance(sample[1], Tensor)
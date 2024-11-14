import torch
import torch.nn as nn
from torchvision import models

def create_model():
    model = models.resnet50(pretrained=True)
    # Unfreeze the last few layers
    for name, param in model.named_parameters():
        if "layer4" in name or "fc" in name:
            param.requires_grad = True
        else:
            param.requires_grad = False
    model.fc = nn.Sequential(
        nn.Linear(model.fc.in_features, 512),
        nn.ReLU(),
        nn.Dropout(0.5),
        nn.Linear(512, 2)
    )
    return model

def predict(image, model):
    with torch.no_grad():
        output = model(image)
        _, pred = torch.max(output, 1)
    return 'PNEUMONIA' if pred.item() == 1 else 'NORMAL'
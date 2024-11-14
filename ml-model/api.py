import os
import io
import logging
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import torch
import torchvision.transforms as transforms
from PIL import Image

from model import create_model, predict
import numpy as np
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array
from fastapi.middleware.cors import CORSMiddleware

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Add your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Define the transformation
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# Load the model
logger.info("Loading model...")
try:
    model = create_model()
    model.load_state_dict(torch.load('model/best_pneumonia_detection_model.pth', map_location=torch.device('cpu')))
    model.eval()
    logger.info("Model loaded successfully")
except Exception as e:
    logger.error(f"Failed to load model: {str(e)}")
    raise
def is_chest_xray(image):
    # Load a pre-trained ResNet50 model
    model = ResNet50(weights='imagenet', include_top=True)
    
    # Resize the image to (224, 224)
    image = image.resize((224, 224))
    
    # Preprocess the image
    img_array = img_to_array(image)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    
    # Make a prediction
    preds = model.predict(img_array)
    
    # Get the top 5 predictions
    from tensorflow.keras.applications.resnet50 import decode_predictions
    top_preds = decode_predictions(preds, top=5)[0]
    
    # Log the top predictions for debugging
    logger.info(f"Top predictions: {top_preds}")
    
    # Check if any of the top predictions are related to X-rays or medical imaging
    xray_related_terms = ['x-ray', 'radiograph', 'medical', 'chest', 'bone', 'skeleton', 'scan']
    xray_related = any(any(term in pred[1].lower() for term in xray_related_terms) for pred in top_preds)
    
    logger.info(f"Is X-ray related: {xray_related}")
    
    return xray_related
@app.get("/health")
async def health_check():
    return {"status": "ok"}
@app.post("/predict/")
async def predict_image(file: UploadFile = File(...)):
    logger.info(f"Received file: {file.filename}")
    if not file:
        raise HTTPException(status_code=400, detail="No file uploaded")

    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert('RGB')
        image = image.resize((224, 224))
        image = transform(image).unsqueeze(0) 

        prediction = predict(image, model)

        logger.info(f"Prediction: {prediction}")
        return JSONResponse(content={"prediction": prediction}) 
    except Exception as e:
        logger.error(f"An error occurred during prediction: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred during prediction: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    logger.info(f"Starting server on port {port}")
    uvicorn.run(app, host="0.0.0.0", port=port)

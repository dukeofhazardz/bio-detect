"""
This script defines a FastAPI application for the BioDetect API.

The FastAPI framework is used to create a RESTful API that allows users to detect organisms based on images they provide. The API has two endpoints: '/' and '/detect'.

- Endpoint '/':
  - Method: GET
  - Description: This endpoint provides information about the BioDetect API and its usage. It returns a JSON response containing details such as welcome message, instructions for using the API, accepted image formats, JSON response format, author information, and the technology powering the API.
  - Response Format:
    - 'message': A welcome message to the BioDetect API.
    - 'info': Instructions for sending a POST request to '/detect' endpoint with an image of an animal, insect, or plant.
    - 'additional_info': Information about accepted image formats and the importance of providing clear and focused images.
    - 'json_response_format': A sample JSON response format that users can expect from the '/detect' endpoint.
    - 'author': The author of the API.
    - 'powered_by': The technology powering the API (in this case, 'google gemini-pro-vision').

- Endpoint '/detect':
  - Method: POST
  - Description: This endpoint accepts a POST request with an image file (in common formats such as JPG, PNG, GIF) as input. It detects the organism in the image and returns information about the detected organism in JSON format.
  - Parameters:
    - 'image': An image file uploaded by the user.
  - Response Format: The response contains information about the detected organism, such as species, common name, scientific name, classification, physical characteristics, behavioral traits, habitat, geographic distribution, diet and feeding habits, reproduction and lifecycle, conservation status, interactions with other species, adaptations to the environment, threats and challenges, and conservation efforts and initiatives.
"""

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from gemini.gemini import GenAI

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.get('/')
async def home():
    """
    Endpoint for providing information about the BioDetect API.
    """
    return {"message": "Welcome to the BioDetect API",
            "info": "You have to send a POST request to /detect with an image of an animal, insect, or plant to elicit a response from the API.",
            "additional_info": "The API accepts images in common formats such as JPG, PNG, and GIF. Make sure to provide clear and focused images for accurate detection results.",
            "json_response_format": {
                "species": "",
                "common_name": "",
                "scientific_name": "",
                "classification": "",
                "physical_characteristics": "",
                "behavioral_traits": "",
                "habitat": "",
                "geographic_distribution": "",
                "diet_and_feeding_habits": "",
                "reproduction_and_lifecycle": "",
                "conservation_status": "",
                "interactions_with_other_species": "",
                "adaptations_to_the_environment": "",
                "threats_and_challenges": "",
                "conservation_efforts_and_initiatives": ""
                },
            "author": "Nnaemeka Daniel John",
            "powered_by": "google gemini-pro-vision"
            }


@app.post('/detect')
async def detect(image: UploadFile = File(...)):
    """
    Endpoint for detecting organisms based on images.
    """
    image_content = await image.read()
    ai = GenAI()
    response = ai.generateResponse(image=image_content)
    return response

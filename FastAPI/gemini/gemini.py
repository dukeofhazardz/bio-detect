import google.generativeai as genai
from dotenv import load_dotenv
from gemini.helper import *
import PIL.Image
import os
import io

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
FILE_NAME = os.getenv("FILE_NAME")
FILE_ID = os.getenv("FILE_ID")


generation_config = {
    "temperature": 0.8,
    "top_p": 0.9,
    "top_k": 2,
    "max_output_tokens": 1024,
}


safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT",
     "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH",
     "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
     "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT",
     "threshold": "BLOCK_MEDIUM_AND_ABOVE"}
]


class GenAI:
    """ This class houses the functionality for generating text response from
        an image using the Google Gemini API. It initializes the API model and
        provides a method to generate a response based on the input image.
    """
    def __init__(self):
        """ Initializes an instance of the GenAI class
        """
        genai.configure(api_key=GOOGLE_API_KEY)
        self.model = genai.GenerativeModel('gemini-pro-vision',
                                           generation_config=generation_config,
                                           safety_settings=safety_settings)

    def generateResponse(self, image):
        """ Generates a text response from the input image.
        Parameters:
        @image: The input image content.
        Returns: A JSON object containing the generated text response or an error message if an exception occurs during the process.
        """
        try:
            img = PIL.Image.open(io.BytesIO(image))
        except Exception as e:
            return {"error": f"Error opening image: {str(e)}"}
        file_path = os.path.join(os.path.dirname(__file__), "..", FILE_NAME)
        text = ""
        if os.path.exists(file_path):
            text = read_text_from_file(file_path)
        else:
            return {"error": "Could not locate prompt file"}

        try:
            response = self.model.generate_content([text, img])
            response.resolve()
            return parse_response_to_json(response.text)
        except Exception as e:
            return {"error": str(e)}

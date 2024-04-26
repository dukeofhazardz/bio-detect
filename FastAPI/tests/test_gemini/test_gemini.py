import unittest
from unittest.mock import patch, MagicMock
from gemini.gemini import GenAI
import PIL.Image
import os

class TestGenAI(unittest.TestCase):

    @patch('gemini.gemini.genai.configure')
    def test_init(self, mock_configure):
        GenAI()
        mock_configure.assert_called_once()

    @patch('gemini.gemini.genai.GenerativeModel')
    def test_init_model(self, mock_generative_model):
        GenAI()
        mock_generative_model.assert_called_once_with('gemini-pro-vision',
                                                      generation_config={
                                                          "temperature": 0.8,
                                                          "top_p": 0.9,
                                                          "top_k": 2,
                                                          "max_output_tokens": 1024,
                                                      },
                                                      safety_settings=[
                                                          {"category": "HARM_CATEGORY_HARASSMENT",
                                                           "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                                                          {"category": "HARM_CATEGORY_HATE_SPEECH",
                                                           "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                                                          {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                                                           "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                                                          {"category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                                                           "threshold": "BLOCK_MEDIUM_AND_ABOVE"}
                                                      ])

    @patch('gemini.gemini.genai.GenerativeModel')
    @patch('gemini.gemini.read_text_from_file')
    def test_generate_response_existing_file(self, mock_read_text_from_file, mock_generative_model):
        mock_read_text_from_file.return_value = "Mocked text content"
        mock_model_instance = MagicMock()
        mock_generative_model.return_value = mock_model_instance
        mock_img = MagicMock(spec=PIL.Image.Image)
        mock_img_bytes = b"Mocked image bytes"

        with patch('gemini.gemini.os.path.exists', return_value=True):
            ai = GenAI()
            response = ai.generateResponse(mock_img_bytes)

            mock_generative_model.assert_called_once_with('gemini-pro-vision',
                                                          generation_config={
                                                              "temperature": 0.8,
                                                              "top_p": 0.9,
                                                              "top_k": 2,
                                                              "max_output_tokens": 1024,
                                                          },
                                                          safety_settings=[
                                                              {"category": "HARM_CATEGORY_HARASSMENT",
                                                               "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                                                              {"category": "HARM_CATEGORY_HATE_SPEECH",
                                                               "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                                                              {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                                                               "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                                                              {"category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                                                               "threshold": "BLOCK_MEDIUM_AND_ABOVE"}
                                                          ])
            self.assertIsInstance(response, dict)

    @patch('gemini.gemini.genai.GenerativeModel')
    @patch('gemini.gemini.read_text_from_file')
    @patch('gemini.gemini.DriveAPI')
    def test_generate_response_download_file(self, mock_drive_api, mock_read_text_from_file, mock_generative_model):
        mock_read_text_from_file.return_value = "Mocked text content"
        mock_model_instance = MagicMock()
        mock_generative_model.return_value = mock_model_instance
        mock_img = MagicMock(spec=PIL.Image.Image)
        mock_img_bytes = b"Mocked image bytes"

        with patch('gemini.gemini.os.path.exists', return_value=False):
            mock_drive_instance = MagicMock()
            mock_drive_api.return_value = mock_drive_instance
            mock_drive_instance.FileDownload.return_value = None

            ai = GenAI()
            response = ai.generateResponse(mock_img_bytes)

            mock_generative_model.assert_called_once_with('gemini-pro-vision',
                                                          generation_config={
                                                              "temperature": 0.8,
                                                              "top_p": 0.9,
                                                              "top_k": 2,
                                                              "max_output_tokens": 1024,
                                                          },
                                                          safety_settings=[
                                                              {"category": "HARM_CATEGORY_HARASSMENT",
                                                               "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                                                              {"category": "HARM_CATEGORY_HATE_SPEECH",
                                                               "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                                                              {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                                                               "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                                                              {"category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                                                               "threshold": "BLOCK_MEDIUM_AND_ABOVE"}
                                                          ])
            self.assertIsInstance(response, dict)


if __name__ == '__main__':
    unittest.main()

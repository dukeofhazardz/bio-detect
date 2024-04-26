import unittest
from fastapi.testclient import TestClient
from api.main import app
import os

class TestApp(unittest.TestCase):

    def setUp(self):
        self.client = TestClient(app)

    def test_home_endpoint(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn("Welcome to the BioDetect API", response.json()["message"])

    def test_detect_endpoint(self):
        file_path = os.path.join(os.path.dirname(__file__), "test_image.jpg")
        with open(file_path, 'rb') as image_file:
            files = {'image': ('test_image.jpg', image_file, 'image/jpeg')}
            response = self.client.post('/detect', files=files)
            self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()

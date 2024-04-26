import unittest
from gemini.helper import read_text_from_file, parse_response_to_json

class TestHelperFunctions(unittest.TestCase):

    def test_read_text_from_file(self):
        file_path = "test.txt"
        expected_content = "This is a test file content."
        with open(file_path, "w", encoding="utf-8") as file:
            file.write(expected_content)

        content = read_text_from_file(file_path)

        self.assertEqual(content, expected_content)


if __name__ == '__main__':
    unittest.main()

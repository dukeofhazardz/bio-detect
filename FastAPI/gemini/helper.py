# Helper Functions
import re

def read_text_from_file(file_path):
    """
    Reads text data from a file.

    Parameters:
        file_path (str): The path to the file to be read.

    Returns:
        str: The text content read from the file.
    """
    with open(file_path, 'r', encoding="utf-8") as file:
        return file.read()

def parse_response_to_json(response):
    """
    Parses a response string into a JSON object.

    The response string is assumed to contain structured data separated by numbered sections.
    Each section is expected to follow the format '1. key: value'.

    Parameters:
        response (str): The response string to be parsed.

    Returns:
        dict: A JSON object representing the parsed response data, with keys in lowercase
              and values stripped of leading and trailing whitespace.
              In case of errors during parsing, an error message is included in the result.
    """
    res_json = {}
    split_data = []
    try:
        split_data = re.split(r'[0-9]\.\s', response)
        if len(split_data) < 2:
            raise ValueError("Response does not contain any structured data")

        for data in split_data[1:]:
            section = re.split(":", data, maxsplit=1)
            if len(section) == 2:
                key = (section[0].lower()).replace(" ", "_")
                value = section[1].lstrip().strip('\n1').replace("\n", "; ")
                res_json[key] = value
    except ValueError:
        res_json["error"] = "Not an image of a living organism (plant, insect or animal)"
        res_json["next_steps"] = "Insert a clear image of a plant, insect, or animal and try again."
    finally:
        return res_json
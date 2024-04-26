# BioDetect API

The BioDetect API is a tool designed to detect various organisms based on images provided to the API. It utilizes machine learning models to analyze images and provide information about the detected organism.

## Usage

### Home Endpoint

- **Method:** GET
- **URL:** `/`
- **Description:** Returns information about the BioDetect API and instructions on how to use it.
- **Using cURL:**
``` bash
curl -X GET https://biodetect-api.onrender.com/
```
- **Response:**
  ```json
  {
      "message": "Welcome to the BioDetect API",
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
  ```

### Detection Endpoint

#### Method: 
- **POST**

#### URL: 
- **/detect**

#### Description: 
- Detects an organism based on the image provided in the request.

#### Request Body: 
- Upload a file containing the image of the organism. Use the key `image` for the file.

#### Response: 
- Returns detailed information about the detected organism.

#### Using cURL
``` bash
curl -X POST -F "image=@/path/to/your/image.jpg" https://biodetect-api.onrender.com/detect
```

#### Example JSON Output (if the image is that of an octopus):
```json
{
    "species": "Octopus vulgaris",
    "common_name": "Common octopus",
    "scientific_name": "Octopus vulgaris",
    "classification": "Phylum: Mollusca; Class: Cephalopoda; Order: Octopoda; Family: Octopodidae; Genus: Octopus; Species: Octopus vulgaris",
    "physical_characteristics": "The common octopus has a soft, oval body with eight arms, each of which has a suction cup on the end. It has a mantle cavity that contains its gills and other organs. The octopus has a beak-like mouth and a radula, which is a rasping tongue-like structure. The octopus can change its color and texture to match its surroundings.",
    "behavioral_traits": "The common octopus is a solitary creature that spends most of its time hiding in dens or caves. It is active at night and hunts for food by using its arms to probe the crevices of rocks and coral reefs. The octopus is a carnivore and its diet includes crabs, shrimp, fish, and mollusks. The octopus is also known to use tools, such as rocks or shells, to help it capture prey.",
    "habitat": "The common octopus is found in temperate and tropical waters around the world. It is typically found in shallow waters, but it can also be found in deeper waters. The octopus is able to adapt to a variety of habitats, including coral reefs, rocky shores, and seagrass beds.",
    "geographic_distribution": "The common octopus is found in temperate and tropical waters around the world. It is most commonly found in the Mediterranean Sea, the Atlantic Ocean, and the Pacific Ocean.",
    "diet_and_feeding_habits": "The common octopus is a carnivore and its diet includes crabs, shrimp, fish, and mollusks. The octopus is also known to use tools, such as rocks or shells, to help it capture prey.",
    "reproduction_and_lifecycle": "The common octopus reproduces sexually. The male octopus fertilizes the eggs of the female octopus. The female octopus lays her eggs in a den or cave. The eggs hatch into paralarvae, which are small, free-swimming octopuses. The paralarvae grow into adults over a period of several months.",
    "conservation_status": "The common octopus is not currently listed as a threatened or endangered species. However, its population is declining in some areas due to habitat loss and overfishing.",
    "interactions_with_other_species": "The common octopus is a solitary creature and does not typically interact with other species. However, it is known to prey on other octopuses, as well as crabs, shrimp, fish, and mollusks. The octopus is also known to use tools, such as rocks or shells, to help it capture prey.",
    "adaptations_to_the_environment": "The common octopus has a number of adaptations that help it survive in its environment. These adaptations include its ability to change its color and texture to match its surroundings, its ability to use tools, and its ability to learn and remember.",
    "threats_and_challenges": "The common octopus faces a number of threats, including habitat loss and overfishing. Habitat loss is occurring due to the destruction of coral reefs and other coastal habitats. Overfishing is occurring due to the demand for octopus meat and ink.",
    "conservation_efforts_and_initiatives": "There are a number of conservation efforts and initiatives underway to help protect the common octopus. These efforts include the establishment of marine protected areas, the regulation of fishing, and the education of the public about the importance of the octopus."
}
```

## Author
- Nnaemeka Daniel John

## Powered By
- Google Gemini-Pro-Vision
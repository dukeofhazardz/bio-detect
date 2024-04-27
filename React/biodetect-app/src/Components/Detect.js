import React, { useState } from "react";
import api from "../api";
import loadingGif from "../Assets/loading.gif";
import background from "../Assets/carousel-background.jpg";


const Detect = () => {
  const [ image, setImage ] = useState(null);
  const [ imagePreview, setImagePreview ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [ result, setResult ] = useState(null);
  const [ error, setError ] = useState(null);

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    // Display image preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (!image) {
      setError("Please select an image.");
      return;
    }

    setLoading(true); // Start loading indicator

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await api.post('/detect', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResult(response.data);
    } catch (error) {
      setError("An error occurred while processing the image.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="detect-section-container" id="detect">
      <div className='detect-section-text-container'>
        <p className='primary-subheading'>Detect</p>
      </div>
      {/* Upload/Detect Section Content */}
      <div className="container">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3 mt-3">
            <label htmlFor="image" className="form-label">
              Upload Image
            </label>
            <input 
              type="file"
              className="form-control me-2"
              id="image"
              name="image"
              accept="image/jpeg, image/png, image/gif"
              onChange={handleInputChange}>
            </input>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type='submit' className="btn btn-outline-dark rounded-0 py-2 px-4" disabled={loading}>
            {loading ? <img src={loadingGif} alt="Loading..." style={{ width: "30px", height: "auto", borderRadius: "50%" }}/> : "Submit"}
          </button>

        </form>
      </div>

      {/* Display image preview */}
      <div className="container" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Selected Image"
            style={{ marginTop: "10px", maxWidth: "100%", borderRadius: "10px", maxHeight: "250px", marginTop: "3rem"}}
            />
          )}
      </div>

      { result && (
        <div id="carouselExample" class="carousel carousel-dark slide pointer-event p-3 m-5 border-0 bd-example m-5 border-0">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src={background} className="d-block w-100" alt="Slide 1" />
              <div className="carousel-caption d-flex flex-column h-75 align-items-center justify-items-center">
                <h2>Species</h2>
                <p>{result.species}</p>
              </div>
            </div>
            <div class="carousel-item">
              <img src={background} className="d-block w-100" alt="Slide 2" />
              <div className="carousel-caption d-flex flex-column h-75 align-items-center justify-items-center">
                <h2>Common Name</h2>
                <p>{result.common_name}</p>
              </div>
            </div>
            <div class="carousel-item">
              <img src={background} className="d-block w-100" alt="Slide 3" />
              <div className="carousel-caption d-flex flex-column h-75 align-items-center justify-items-center">
                <h2>Scientific Name</h2>
                <p>{result.scientific_name}</p>
              </div>
            </div>
            <div class="carousel-item">
              <img src={background} className="d-block w-100" alt="Slide 4" />
              <div className="carousel-caption d-flex flex-column h-75 align-items-center justify-items-center">
                <h2>Classification</h2>
                <p>{result.classification}</p>
              </div>
            </div>
            <div class="carousel-item">
              <img src={background} className="d-block w-100" alt="Slide 5" />
              <div className="carousel-caption d-flex flex-column h-75 align-items-center justify-items-center">
                <h2>Physical Characteristics</h2>
                <p>{result.physical_characteristics}</p>
              </div>
            </div>
            <div class="carousel-item">
              <img src={background} className="d-block w-100" alt="Slide 6" />
              <div className="carousel-caption d-flex flex-column h-75 align-items-center justify-items-center">
                <h2>Behavioral Traits</h2>
                <p>{result.behavioral_traits}</p>
              </div>
            </div>
            <div class="carousel-item">
              <img src={background} className="d-block w-100" alt="Slide 7" />
              <div className="carousel-caption d-flex flex-column h-75 align-items-center justify-items-center">
                <h2>Habitat</h2>
                <p>{result.habitat}</p>
              </div>
            </div>
            <div class="carousel-item">
              <img src={background} className="d-block w-100" alt="Slide 8" />
              <div className="carousel-caption d-flex flex-column h-75 align-items-center justify-items-center">
                <h2>Geographic Distribution</h2>
                <p>{result.geographic_distribution}</p>
              </div>
            </div>
            <div class="carousel-item">
              <img src={background} className="d-block w-100" alt="Slide 9" />
              <div className="carousel-caption d-flex flex-column h-75 align-items-center justify-items-center">
                <h2>Diet and Feeding Habits</h2>
                <p>{result.diet_and_feeding_habits}</p>
              </div>
            </div>
            <div class="carousel-item">
              <img src={background} className="d-block w-100" alt="Slide 10" />
              <div className="carousel-caption d-flex flex-column h-75 align-items-center justify-items-center">
                <h2>Reproduction and Lifecycle</h2>
                <p>{result.reproduction_and_lifecycle}</p>
              </div>
            </div>
            <div class="carousel-item">
              <img src={background} className="d-block w-100" alt="Slide 11" />
              <div className="carousel-caption d-flex flex-column h-75 align-items-center justify-items-center">
                <h2>Conservation Status</h2>
                <p>{result.conservation_status}</p>
              </div>
            </div>
            <div class="carousel-item">
              <img src={background} className="d-block w-100" alt="Slide 12" />
              <div className="carousel-caption d-flex flex-column h-75 align-items-center justify-items-center">
                <h2>Interactions with other Species</h2>
                <p>{result.interactions_with_other_species}</p>
              </div>
            </div>
            <div class="carousel-item">
              <img src={background} className="d-block w-100" alt="Slide 13" />
              <div className="carousel-caption d-flex flex-column h-75 align-items-center justify-items-center">
                <h2>Adaptations to the Environment</h2>
                <p>{result.adaptations_to_the_environment}</p>
              </div>
            </div>
            <div class="carousel-item">
              <img src={background} className="d-block w-100" alt="Slide 14" />
              <div className="carousel-caption d-flex flex-column h-75 align-items-center justify-items-center">
                <h2>Threats and Challenges</h2>
                <p>{result.threats_and_challenges}</p>
              </div>
            </div>
            <div class="carousel-item">
              <img src={background} className="d-block w-100" alt="Slide 15" />
              <div className="carousel-caption d-flex flex-column h-75 align-items-center justify-items-center">
                <h2>Conservation Efforts and Initiatives</h2>
                <p>{result.conservation_efforts_and_initiatives}</p>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default Detect

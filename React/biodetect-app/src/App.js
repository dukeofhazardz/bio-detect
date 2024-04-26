import React, { useState, useEffect } from "react";
import api from "./api";
import loadingGif from "./loading.gif";

const App = () => {
  const [ image, setImage ] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ result, setResult ] = useState(null);
  const [ error, setError ] = useState(null);

  /*const fetchResults = async () => {
    const response = await api.get("/");
    setResult(response.data);
  }

  useEffect(() => {
    fetchResults();
  }, []);*/

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
    <div>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            BioDetect
          </a>
        </div>
      </nav>

      <div className="container">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3 mt-3">
            <label htmlFor="image" className="form-label">
              Upload Image
            </label>
            <input 
              type="file"
              className="form-control"
              id="image"
              name="image"
              accept="image/jpeg, image/png, image/gif"
              onChange={handleInputChange}>
            </input>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type='submit' className="btn btn-primary" disabled={loading}>
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
            style={{ marginTop: "10px", maxWidth: "100%", borderRadius: "10px", maxHeight: "250px"}}
            />
          )}
      </div>

      {result && (
        <div className="mt-3">
          <h3>Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}


export default App;

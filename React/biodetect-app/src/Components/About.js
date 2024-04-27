import React from 'react';
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from "../Assets/plants.jpg";


const About = () => {
  return (
    <div className='about-section-container' id='about'>
      <div className='about-background-image-container'>
        <img src={AboutBackground} alt="" />
      </div>
      <div className='about-section-image-container'>
        <img src={AboutBackgroundImage} alt="" style={{ maxHeight: "500px", borderRadius: "50%" }} />
      </div>
      <div className='about-section-text-container'>
        <p className='primary-subheading'>About</p>
        <h1 className='primary-heading'>
        Unveiling the Natural World
        </h1>
        <p className='primary-text'>
          Biodetect is your all-in-one pocket naturalist, powered by cutting-edge technology. We leverage the Biodetect API, fueled by Google's Gemini Pro Vision AI, to unlock detailed descriptions of the living world around you. <br /><br /><strong>Biodetect empowers you to:</strong>
        </p>
				<ul className='primary-text'>
						<li>
						  Identify plants, animals, and insects with remarkable accuracy.
						</li>
						<li>
						  Learn fascinating details about their characteristics, habitats, and behaviors.
						</li>
						<li>
						  Deepen your understanding and appreciation of the natural world.
						</li>
					</ul>
				<p className='primary-text'>
					Biodetect goes beyond basic identification. With the Biodetect API and Google's advanced vision technology, you gain access to a wealth of information, right at your fingertips. So, next time you encounter an unfamiliar creature or plant, simply use Biodetect to unveil its secrets!
        </p>
      </div>
    </div>
  )
}

export default About

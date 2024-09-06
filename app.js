// API key for authentication (ensure to secure your API key)
const API_KEY = "your-api-key-here";

// Select the elements for the button, input, image section, and spinner
const submitIcon = document.querySelector("#submit-icon");
const inputElement = document.querySelector("input");
const imageSection = document.querySelector('.images-section');
const spinner = document.querySelector("#spinner");

// Function to fetch images from OpenAI based on user input
const getImages = async () => {
  const options = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,  // Authorization using Bearer token
      "Content-Type": "application/json"     // Indicate that we're sending JSON data
    },
    body: JSON.stringify({
      prompt: inputElement.value,  // User's input prompt
      n: 4,                        // Number of images to generate
      size: "1024x1024"            // Image size
    })
  };

  try {
    // Show the loading spinner while the request is being processed
    spinner.style.display = 'block';
    imageSection.innerHTML = '';  // Clear previous images

    // Make the API request to OpenAI
    const response = await fetch('https://api.openai.com/v1/images/generations', options);
    const data = await response.json();

    // Hide the spinner after the data is fetched
    spinner.style.display = 'none';

    // Display the images in the section
    data?.data.forEach(imageObject => {
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');
      
      const imageElement = document.createElement('img');
      imageElement.setAttribute('src', imageObject.url);  // Set the image source
      
      imageContainer.append(imageElement);
      imageSection.append(imageContainer);  // Add the image container to the page
    });

  } catch (error) {
    // In case of error, display an error message and hide the spinner
    console.error(error);
    imageSection.innerHTML = '<p>Failed to load images. Please try again later.</p>';
    spinner.style.display = 'none';
  }
};

// Add an event listener for the click event on the search button
submitIcon.addEventListener('click', getImages);

// Importing necessary libraries and modules
import React, { useState, useEffect } from 'react'; // React library and specific hooks
import "@fontsource/poppins"; // Poppins font

// Defining a functional component called TextToImageGenerator
const TextToImageGenerator = () => {
  // Defining state variables
  const [text, setText] = useState(''); // State for storing the input text
  const [images, setImages] = useState([]); // State for storing the generated images
  const [loading, setLoading] = useState(false); // State for loading status
  const [currentIndex, setCurrentIndex] = useState(0); // State for tracking the current index of images to display
  const [buttonText, setButtonText] = useState('Random Image Generate'); // State for button text
  const [error, setError] = useState('');

  // useEffect hook to update button text based on input text
  useEffect(() => {
    setButtonText(text ? 'Generate Image' : 'Random Image Generate');
  }, [text]); // Dependency array with text to re-run effect when text changes

  // Function to generate images based on the input text
  const generateImage = async () => {
    setLoading(true);
    setError('');

    const formData = new URLSearchParams();
    formData.append('prompt', text || 'A cyberpunk city at night, illuminated by neon signs and holographic billboards');
    formData.append('width', '1024');
    formData.append('height', '1024');
    formData.append('seed', '918440');
    formData.append('model', 'flux');

    try {
      console.log('Making API request...');
      const response = await fetch('https://ai-text-to-image-generator-flux-free-api.p.rapidapi.com/aaaaaaaaaaaaaaaaaiimagegenerator/fluximagegenerate/generateimage.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-rapidapi-host': 'ai-text-to-image-generator-flux-free-api.p.rapidapi.com',
          'x-rapidapi-key': 'b07bb5fedfmsh051d63b51a84119p1c738cjsnf8bf8c0a8056'
        },
        body: formData
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('API Response:', data);

      if (response.status === 429) {
        throw new Error('QUOTA_EXCEEDED');
      }

      if (data && data.image_url) {
        setImages([data.image_url]);
        setCurrentIndex(0);
        setError('');
      } else if (data && data.url) {
        setImages([data.url]);
        setCurrentIndex(0);
        setError('');
      } else {
        throw new Error('No image URL in response');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.message === 'QUOTA_EXCEEDED') {
        setError(
          <div>
            <p>Monthly API quota exceeded. You have two options:</p>
            <ol className="list-decimal list-inside mt-2">
              <li>Upgrade your RapidAPI plan at{' '}
                <a 
                  href="https://rapidapi.com/poorav925/api/ai-text-to-image-generator-flux-free-api" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  RapidAPI
                </a>
              </li>
              <li>Wait until next month when your quota resets</li>
            </ol>
          </div>
        );
      } else if (error.message === 'Failed to fetch') {
        setError('Network error. Please check your internet connection.');
      } else {
        setError('Failed to generate image. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to load more images
  const loadMoreImages = () => {
    setCurrentIndex(currentIndex + 4); // Increase the current index by 4
  };

  // JSX for rendering the component
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Text to Image Generator</h1>
      <div className="flex flex-col items-center">
        <textarea
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded mb-4 outline-none"
          rows="3"
          placeholder="Enter text to generate your Image..."
          value={text} // Bind the textarea value to the text state
          onChange={(e) => setText(e.target.value)} // Update text state on change
        ></textarea>
        <button
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          style={{ fontFamily: 'Poppins, sans-serif' }}
          onClick={generateImage} // Call generateImage function on click
          disabled={loading} // Disable button if loading is true
        >
          {loading ? 'Generating...' : buttonText} {/* Conditional button text */}
        </button>
        
        {error && (
          <div className="text-red-500 mt-2 mb-4 text-center">
            {error}
          </div>
        )}

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.slice(0, currentIndex + 4).map((image, index) => ( // Map over images to display them
            <img 
              key={index} 
              src={image} 
              alt={`Generated ${index}`} 
              className="max-w-full rounded shadow-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400x400?text=Image+Failed+to+Load';
              }}
            />
          ))}
        </div>
        {currentIndex + 4 < images.length && ( // Show 'Generate More' button if there are more images to display
          <button
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-6"
            onClick={loadMoreImages} // Call loadMoreImages function on click
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

// Export the TextToImageGenerator component as default
export default TextToImageGenerator;

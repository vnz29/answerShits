import React,{useState, useRef, useEffect} from 'react';

import myimage1 from '../assets/test2/myimage1.jpg';
import myimage2 from '../assets/test2/myimage2.jpg'
import myimage3 from '../assets/test2/myimage3.jpg'
import ImageZoom from 'react-image-magnifier-zoom';
import answetSheet from '../answer.json'
const MyComponent = () => {
 
const [answerSheet,setAnswerSheet] = useState(answetSheet);
const [randomNumber, setRandomNumber] = useState(null);
  // Define the state to store the input value
const [inputValue, setInputValue] = useState('');
const answerLength = Object.keys(answerSheet).length;
const [usedNumbers, setUsedNumbers] = useState(new Set());
const [result, setResult] = useState([])

  useEffect(() =>{
      generateRandomNumber()
  },[])

  const generateRandomNumber = () => {
    // Create an array of numbers from 1 to 86 excluding 65
    const availableNumbers = [];
    for (let i = 1; i <= 86; i++) {
      if (i !== 65 && !usedNumbers.has(i)) {
        availableNumbers.push(i);
      }
    }
console.log(availableNumbers)
    // If all numbers have been used, stop the process
    if (availableNumbers.length === 0) {
      alert("No more numbers available!");
      return;
    }

    // Select a random number from the remaining available numbers
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const number = availableNumbers[randomIndex];

    // Mark the number as used and update the random number state
    setUsedNumbers((prev) => new Set(prev).add(number));
    setRandomNumber(number.toString()); // Convert the number to a string
  };
  console.log(usedNumbers)
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

    const handleSubmit = (event,number, answer) => {
      event.preventDefault(); // Prevent the default form submission
      // if(){

      // }
      // Optionally, you can clear the input field after submission
      setInputValue('');
    };

  return( 
  <div>
    <div style={{display:'flex', flexDirection:'column'}}>
          <ImageZoom
    src={myimage1}
    width={150}
    height={150}
    magnifierSize={100}
    zoomLevel={5}
    enabled={true}
  />
  <ImageZoom
    src={myimage1}
    width={150}
    height={150}
    magnifierSize={100}
    zoomLevel={2.5}
    enabled={true}
  />
  
      <ImageZoom
    src={myimage1}
    width={150}
    height={150}
    magnifierSize={100}
    zoomLevel={2.5}
    enabled={true}
  />
  </div>
<div className="form-container">
      <form onSubmit={(e) => handleSubmit(e,randomNumber,inputValue)} className="form">
        <label>
          Enter something:
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            className="input-field"
          />
        </label>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
      <p>You typed: {inputValue}</p>
    </div>
</div>
)
};

const containerStyle = {
  display: 'flex',               // Use flexbox to arrange images
  justifyContent: 'center',      // Center the images horizontally
  alignItems: 'center',          // Align the images vertically
  gap: '10px',                   // Reduce the gap between images (you can set it to a smaller value like '5px')
  padding: '0',                  // Remove padding to minimize extra space
  margin: '0',                   // Remove margin from the container
  width: '100%',                 // Ensure it takes full width of the screen/container
  overflow: 'hidden',            // Prevent overflow of images
};

const imageStyle = {
  width: '33.33%',               // Set the width to 33% to display 3 images side-by-side
  height: 'auto',                // Keep the aspect ratio of images intact
  objectFit: 'cover',            // Ensure the images cover the container without stretching
  cursor: 'zoom-in',             // Change the cursor to indicate zoom functionality
  transition: 'transform 0.3s ease',  // Smooth transition for zoom effect
};

export default MyComponent;
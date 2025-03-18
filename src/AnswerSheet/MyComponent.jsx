import React, { useState, useEffect } from 'react';
import myimage1 from '../assets/test2/myimage1.jpg';
import myimage2 from '../assets/test2/myimage2.jpg';
import myimage3 from '../assets/test2/myimage3.jpg';
import ImageZoom from 'react-image-magnifier-zoom';
import answerSheet from '../answer.json';
import Image from 'react-bootstrap/Image';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Modal = ({ isOpen, correctAnswers, incorrectAnswers, closeModal }) => {
  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Results</h2>
          <h3>Correct Answers:</h3>
          {correctAnswers.length > 0 ? (
            correctAnswers.map((item) => (
              <p key={item.number}>
                Question #{item.number}: {item.answer}
              </p>
            ))
          ) : (
            <p>No correct answers yet.</p>
          )}

          <h3>Incorrect Answers:</h3>
          {console.log(incorrectAnswers)}
          {incorrectAnswers.length > 0 ? (
            incorrectAnswers.map((item, index) => (
              <p key={index}>
                Item #{item.randomNumber}: Your answer: {item.inputValue} | Correct answer: {item.correctAnswer}
              </p>
            ))
          ) : (
            <p>No incorrect answers yet.</p>
          )}

          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    )
  );
};

const MyComponent = () => {
  const [answerSheetData, setAnswerSheetData] = useState(answerSheet);
  const [randomNumber, setRandomNumber] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [answeredQuestions, setAnsweredQuestions] = useState([]); // Track answered questions
  const [result, setResult] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const generateRandomNumber = () => {
    let number;
    do {
      number = Math.floor(Math.random() * 86) + 1;
    } while (number === 65 || answeredQuestions.includes(number)); // Skip answered questions and 65
    setRandomNumber(number);
  };

  useEffect(() => {
    generateRandomNumber();
  }, [answeredQuestions]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission

    // Get the correct answer from the answer sheet
    const correctAnswer = answerSheetData[randomNumber];

    // // Check if the user's answer is correct
    // if (inputValue.trim().toLowerCase() === correctAnswer.toLowerCase()) {
    //   setResult('Correct!');
    // } else {
    //   setResult(`Incorrect! The correct answer was: ${correctAnswer}`);
    // }

    if (correctAnswer && correctAnswer.some((answer) => answer.trim().toLowerCase() === inputValue.trim().toLowerCase())) {
      setCorrectAnswers((prev) => [...prev, { randomNumber, answer: correctAnswer }]);
      setResult('Correct!');
    } else {
      setIncorrectAnswers((prev) => [...prev, { randomNumber, inputValue, correctAnswer }]);
      setResult(`Incorrect! The correct answer was: ${correctAnswer.join(', ')}`);
    }
    // Mark the question as answered
    setAnsweredQuestions((prevAnswered) => [...prevAnswered, randomNumber]);

    // Clear the input field
    setInputValue('');

    // Check if all questions have been answered
    if (answeredQuestions.length + 1 === Object.keys(answerSheetData).length - 1) {
      alert('All questions have been answered!');
    } else {
      // Generate a new random number for the next question
      generateRandomNumber();
    }
   
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <div>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="image3" title="Image3">
        <Image src={myimage3} thumbnail />
        </Tab>
        <Tab eventKey="image1" title="Image1">
        <Image src={myimage1} thumbnail />
        </Tab>
        <Tab eventKey="image2" title="Image2" >
        <Image src={myimage2} thumbnail />
        </Tab>
      </Tabs>
      {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ImageZoom
          src={myimage1}
          width={150}
          height={150}
          magnifierSize={100}
          zoomLevel={5}
          enabled={true}
        />
        <ImageZoom
          src={myimage2}
          width={150}
          height={150}
          magnifierSize={100}
          zoomLevel={2.5}
          enabled={true}
        />
        <ImageZoom
          src={myimage3}
          width={150}
          height={150}
          magnifierSize={100}
          zoomLevel={2.5}
          enabled={true}
        />
      </div> */}

      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <label>
            {`What's the name of item #${randomNumber}?`}
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              className="input-field"
            />
          </label>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
        <button onClick={ () => { setIsModalOpen(true);}}> view incorrect answer</button>
        <p>You typed: {inputValue}</p>
        <p>{result}</p> {/* Display result after submission */}
      </div>
    </div>
      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        correctAnswers={correctAnswers}
        incorrectAnswers={incorrectAnswers}
        closeModal={closeModal}
      />
      </>
  );
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  padding: '0',
  margin: '0',
  width: '100%',
  overflow: 'hidden',
};

const imageStyle = {
  width: '33.33%',
  height: 'auto',
  objectFit: 'cover',
  cursor: 'zoom-in',
  transition: 'transform 0.3s ease',
};

export default MyComponent;

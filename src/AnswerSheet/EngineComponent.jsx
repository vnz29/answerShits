import React, { useState, useEffect } from "react";
import myimage1 from "../assets/test2/myimage4.jpg";
import myimage2 from "../assets/test2/myimage5.jpg";

import ImageZoom from "react-image-magnifier-zoom";
import answerSheet from "../engine.json";
import Image from "react-bootstrap/Image";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import Modal from "react-bootstrap/Modal";
import { Col, Form, Row } from "react-bootstrap";
const incorrectModal = ({
  isOpen,
  correctAnswers,
  incorrectAnswers,
  closeModal,
}) => {
  return (
    <Modal show={isOpen} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    // isOpen && (
    //   <div className="modal-overlay">
    //     <div className="modal-content">
    //       <h2>Results</h2>
    //       <h3>Correct Answers:</h3>
    //       {correctAnswers.length > 0 ? (
    //         correctAnswers.map((item) => (
    //           <p key={item.number}>
    //             Question #{item.number}: {item.answer}
    //           </p>
    //         ))
    //       ) : (
    //         <p>No correct answers yet.</p>
    //       )}

    //       <h3>Incorrect Answers:</h3>
    //       {console.log(incorrectAnswers)}
    //       {incorrectAnswers.length > 0 ? (
    //         incorrectAnswers.map((item, index) => (
    //           <p key={index}>
    //             Item #{item.randomNumber}: Your answer: {item.inputValue} | Correct answer: {item.correctAnswer}
    //           </p>
    //         ))
    //       ) : (
    //         <p>No incorrect answers yet.</p>
    //       )}

    //       <button onClick={closeModal}>Close</button>
    //     </div>
    //   </div>
    // )
  );
};

const EngineComponent = () => {
  const [answerSheetData, setAnswerSheetData] = useState(answerSheet);
  const [randomNumber, setRandomNumber] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [answeredQuestions, setAnsweredQuestions] = useState([]); // Track answered questions
  const [result, setResult] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [isCorrectModalOpen, setIsCorrectModalOpen] = useState(false);
  const [isIncorrectModalOpen, setIsIncorrectModalOpen] = useState(false);
  const [finalResult, setFinalResult] = useState(false);

  const generateRandomNumber = () => {
    let number;
    do {
      number = Math.floor(Math.random() * 62) + 1;
    } while (
      [12, 14, 30, 33, 37, 38, 39, 43, 57, 58].includes(number) ||
      answeredQuestions.includes(number)
    ); // Skip answered questions and 65
    setRandomNumber(number);
  };

  useEffect(() => {
    generateRandomNumber();
  }, []);

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

    if (
      correctAnswer &&
      correctAnswer.some(
        (answer) =>
          answer.trim().toLowerCase() === inputValue.trim().toLowerCase()
      )
    ) {
      setCorrectAnswers((prev) => [
        ...prev,
        { randomNumber, inputValue, correctAnswer },
      ]);
      setResult("Correct!");
    } else {
      setIncorrectAnswers((prev) => [
        ...prev,
        { randomNumber, inputValue, correctAnswer },
      ]);
      setResult(
        `Incorrect! The correct answer was: ${correctAnswer.join(", ")}`
      );
    }
    // Mark the question as answered
    setAnsweredQuestions((prevAnswered) => [...prevAnswered, randomNumber]);

    // Clear the input field
    setInputValue("");

    // Check if all questions have been answered
    if (
      answeredQuestions.length + 1 ===
      Object.keys(answerSheetData).length - 1
    ) {
      setFinalResult(true);
    } else {
      // Generate a new random number for the next question
      generateRandomNumber();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="my-4">
      <p>Engine Component</p>
      <Container>
        <Tabs
          defaultActiveKey="image1"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="image1" title="engine1">
            <Image src={myimage1} fluid />
          </Tab>
          <Tab eventKey="image2" title="engine2">
            <Image src={myimage2} fluid />
          </Tab>
        </Tabs>
      </Container>
      <Container>
        <p className="text-end mt-2">{answeredQuestions.length} out of 52</p>
        {finalResult ? (
          <div className="text-center">{`You got ${
            correctAnswers.length
          } out of 52, and your percentage is ${Math.ceil(
            (parseInt(correctAnswers.length) / 52) * 100
          )}%.`}</div>
        ) : (
          <div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Row className="d-flex align-items-center">
                  <Col md={12}>
                    <Form.Label>{`What's the name of item #${randomNumber}?`}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Type your answer"
                      value={inputValue}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={12} className="text-center mt-2">
                    <Button
                      variant="success"
                      type="submit"
                      className="text-center mt-1"
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
            <p>{result}</p> {/* Display result after submission */}
          </div>
        )}
        <div>
          <p>
            {" "}
            <b>View Results :</b>
          </p>
          <div className="text-center">
            <Button
              className="ml-1"
              variant="primary"
              onClick={() => {
                setIsCorrectModalOpen(true);
              }}
            >{`Correct Answers ${correctAnswers.length}`}</Button>
            <Button
              className="ms-1"
              variant="danger"
              onClick={() => {
                setIsIncorrectModalOpen(true);
              }}
            >{`Incorrect Answers ${incorrectAnswers.length} `}</Button>
          </div>
        </div>
      </Container>

      <Modal
        size="sm"
        className="width"
        show={isIncorrectModalOpen}
        onHide={() => {
          setIsIncorrectModalOpen(!isIncorrectModalOpen);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Incorrect Answers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {incorrectAnswers.length > 0 ? (
              incorrectAnswers.map((item, index) => (
                <div key={index}>
                  <p>
                    <b>Item #{item.randomNumber}: </b>
                    <span style={{ color: "#198754" }}>
                      {item.correctAnswer}
                    </span>
                  </p>
                  <p>
                    <b>Your answer:</b>{" "}
                    <span style={{ color: "#dc3545" }}>{item.inputValue}</span>
                  </p>
                </div>
              ))
            ) : (
              <p>No incorrect answers yet.</p>
            )}
          </div>
          <span>{`Total incorrect answers: ${incorrectAnswers.length} out of 52`}</span>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setIsIncorrectModalOpen(!isIncorrectModalOpen);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        size="sm"
        show={isCorrectModalOpen}
        onHide={() => {
          setIsCorrectModalOpen(!isCorrectModalOpen);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Incorrect Answers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {correctAnswers.length > 0 ? (
              correctAnswers.map((item, index) => (
                <div key={index}>
                  <p>
                    <b>Item #{item.randomNumber}: </b>
                    {item.correctAnswer}
                  </p>
                  <p>
                    <b>Your answer:</b> {item.inputValue}
                  </p>
                </div>
              ))
            ) : (
              <p>No Correct answers yet.</p>
            )}
          </div>
          <span>{`Total correct answers: ${correctAnswers.length} out of 52`}</span>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setIsCorrectModalOpen(!isCorrectModalOpen);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  padding: "0",
  margin: "0",
  width: "100%",
  overflow: "hidden",
};

const imageStyle = {
  width: "33.33%",
  height: "auto",
  objectFit: "cover",
  cursor: "zoom-in",
  transition: "transform 0.3s ease",
};

export default EngineComponent;

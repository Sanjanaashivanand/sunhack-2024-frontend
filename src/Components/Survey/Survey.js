import React, { useState, useEffect } from "react";
import './Survey.css';  // Import the CSS file
import { fetchPlaylist, fetchUserProfile, getSongs } from "../../backend";

function Survey() {
  const questions = [
    { questionText: "What is your name?", type: "text" },
    { questionText: "How satisfied are you with our service?", type: "range" },
    { questionText: "Would you recommend us to others?", type: "radio", options: ["Yes", "No"] },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [responses, setResponses] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  //GET USER ID
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({});
  const [playlists, setPlaylists] = useState({})
  const storedToken = window.localStorage.getItem("token");

  useEffect(() => {
    if (storedToken) {
        fetchUserProfile(storedToken)
        .then((data) => {
            fetchPlaylist(storedToken)
            .then((data)=>{
              getSongs(data,storedToken)
            })
            
        })
        .catch((err) => {
            console.log(err)
        })
    }
  }, []);  

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, questions.length - 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResponses({ ...responses, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log("Survey submitted with responses: ", responses);
    // Add submission logic here (e.g., send data to server)
  };

  const renderQuestion = (question, index) => {
    switch (question.type) {
      case "text":
        return <input type="text" name={`question-${index}`} onChange={handleInputChange} />;
      case "range":
        return <input type="range" min="1" max="10" name={`question-${index}`} onChange={handleInputChange} />;
      case "radio":
        return question.options.map((option, i) => (
          <label key={i}>
            <input
              type="radio"
              name={`question-${index}`}
              value={option}
              onChange={handleInputChange}
            />
            {option}
          </label>
        ));
      default:
        return null;
    }
  };

  return (
    <div className="survey">
      <h2></h2>



      {!isSubmitted ? (
        <div>
            {/* {userData.display_name && 
                <h1>Hello, {userData.display_name}</h1>} */}
          <div className="slide">
            <h3>{questions[currentSlide].questionText}</h3>
            {renderQuestion(questions[currentSlide], currentSlide)}
          </div>

          {/* Navigation and Submit Buttons */}
          <div className="navigation">
            <button onClick={prevSlide} disabled={currentSlide === 0}>
              Previous
            </button>

            {currentSlide === questions.length - 1 ? (
              <button onClick={handleSubmit}>
                Submit
              </button>
            ) : (
              <button onClick={nextSlide}>
                Next
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="thank-you-message">
          <h3>Thank you for completing the survey!</h3>
        </div>
      )}

      {/* Display Responses */}
      <div className="responses">
        <h4>Your Responses:</h4>
        <pre>{JSON.stringify(responses, null, 2)}</pre>
      </div>
    </div>
  );
}

export default Survey;

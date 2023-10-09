import React, {useEffect} from "react";
import { connect } from "react-redux";
import { selectAnswer, postAnswer, fetchQuiz,resetForm} from "../state/action-creators";


function Quiz(props) {
  const { answers, dispatch, quiz, selectedAnswer} = props;

    useEffect(() => {
       dispatch(fetchQuiz());
  }, [dispatch]);

  const handleAnswerClick = (answer) => {
    dispatch(selectAnswer(answer));
    console.log('select answer', answer)
  };

  const handleSubmit = () => {
    console.log('Selected answer before posting', selectedAnswer);
    if (selectedAnswer && quiz) { 
      dispatch(postAnswer(quiz.quiz_id, selectedAnswer.answer_id));
      dispatch(resetForm())
    } else {
      console.error("No answer selected or quiz ID missing",);
    }
    
  };
  console.log(handleSubmit)
    console.log(answers)
  return (
    <div id="wrapper">
   
      
      {quiz ? (
        <>
          <h2>{quiz.question}</h2>
          

          <div id="quizAnswers">
            {answers.map((answer) => (
              <div
                key={answer.answer_id}
                className={`answer ${selectedAnswer && selectedAnswer.answer_id === answer.answer_id ? "selected" : ""}`}
              >
                 {answer.text} 
                <button onClick={() => handleAnswerClick(answer)}>
                {selectedAnswer && selectedAnswer.answer_id === answer.answer_id? "SELECTED" : "Select"}
                </button>
              </div>
            ))}
          </div>
          <button id="submitAnswerBtn" onClick={handleSubmit} disabled={!selectedAnswer || !selectedAnswer.answer_id}>
            Submit answer
          </button>
        </>
      ) : (
        "Loading next quiz..."
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  quiz: state.quiz,
  answers: state.quiz ? state.quiz.answers : [],  
  selectedAnswer: state.selectedAnswer,
  infoMessage:state.infoMessage
 
});

export default connect(mapStateToProps)(Quiz);

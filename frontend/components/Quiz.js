import React from 'react'
import {connect} from 'react-redux';
import * as actionCreators from '../state/action-creators';


 function Quiz(props) {
const {quiz, selectedAnswer, selectAnswer, postAnswer} = props;

const handleAnswerClick = (answer) => {
  selectAnswer(answer);
}

const handleSubmit = () => {
  postAnswer(selectAnswer);
}


  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.answer}</h2>

            <div id="quizAnswers">
              {quiz.answer.map((answer, index) => (
                <div key={index} className={`answer ${selectAnswer === answer ? 'selected' : ''}`}>
                {answer}
              
               
                <button onClick={() => handleAnswerClick(answer)}>
                  {selectedAnswer === answer ? 'SELECTED' : 'Select'}
                  
                </button>
              </div>
                ))}
              <div className="answer">
                An elephant
                <button>
                  Select
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" onClick={handleSubmit}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = state => ({
  quiz: state.quiz,
  selectedAnswer: state.selectedAnswer
})

export default connect(mapStateToProps, actionCreators)(Quiz);

// ❗ You don't need to add extra action creators to achieve MVP
import axios from "axios";
import {
  SET_QUIZ_INTO_STATE,
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM,
} from "./../state/action-types";

export function moveClockwise() {
  return { type: MOVE_CLOCKWISE };
}

export function moveCounterClockwise() {
  return { type: MOVE_COUNTERCLOCKWISE };
}

export function selectAnswer(answer) {
  return { type: SET_SELECTED_ANSWER, payload: answer };
}

export function setMessage(message) {
  return { type: SET_INFO_MESSAGE, payload: message };
}

export function setQuiz(data) {
  return { type: SET_QUIZ_INTO_STATE, payload: data };
}

export function inputChange(id, value) {
  return {
    type: INPUT_CHANGE,
    payload: { id, value },
  };
}

export function resetForm() {
  return { type: RESET_FORM };
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    axios
      .get("http://localhost:9000/api/quiz/next")
      .then((res) => {
        dispatch({ type: SET_QUIZ_INTO_STATE, payload: res.data });
       
        
      })
      .catch((err) => {
        console.error(err);
        const errorMessage = err.response?.data || "Error fetching quiz";
       
      });
  };
}

export function postAnswer(quiz, answer) {
  return function (dispatch) {
     const payload = {
    quiz_id: quiz,
    answer_id: answer
     }
    axios
      .post("http://localhost:9000/api/quiz/answer", payload )
      .then((res) => {
        dispatch({type:SET_SELECTED_ANSWER,payload: res.data})
        dispatch({ type: SET_INFO_MESSAGE, payload: res.data.message });
        console.log('message',res.data.message)
         dispatch(fetchQuiz())
       
       
       
       
      })
      .catch((err) => {
        console.error("Error detail:", err);
        dispatch({ type: SET_INFO_MESSAGE, payload: "Error posting answer" });
      });
  };
  
}
export function postQuiz(data) {
  return function (dispatch) {
    const quizData = {
      question_text: data.newQuestion,
      true_answer_text: data.newTrueAnswer,
      false_answer_text: data.newFalseAnswer,
    };
    console.log('checkingfordata', quizData)
    axios.post('http://localhost:9000/api/quiz/new', quizData)
    
      .then((res) => {
        console.log("Full server response:", res);
        dispatch({type:INPUT_CHANGE, payload: res.data})
        dispatch({type: SET_QUIZ_INTO_STATE, payload:res.data})
        dispatch({ type: SET_INFO_MESSAGE, payload: 'Congrats: "' + quizData.question_text + '" is a great question!' });
        dispatch(postAnswer())
        dispatch({type:RESET_FORM})
       
        console.log('inputchange', res.data)
       
        
      })
      .catch((err) => {
        console.error("Error detail:", err);
        dispatch({ type: SET_INFO_MESSAGE, payload: "Error posting quiz" });
      });
  };
}


// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state

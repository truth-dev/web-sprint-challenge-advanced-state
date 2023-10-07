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
        console.log(res.data)
        dispatch({ type: SET_QUIZ_INTO_STATE, payload: res.data });
        dispatch({ type: SET_SELECTED_ANSWER, payload: res.data });
      })
      .catch((err) => {
        console.error(err);
        const errorMessage = err.response?.data || "Error fetching quiz";
        dispatch({ type: SET_INFO_MESSAGE, payload: errorMessage });
      });
  };
}
export function postAnswer(answer) {
  return function (dispatch) {
    console.log("Answer to post:", answer); 
    
    axios
      .post("http://localhost:9000/api/quiz/new",  answer )
      .then((res) => {
        console.log("Response from server:", res.data); 
        dispatch({ type: RESET_FORM });
        dispatch({ type: SET_INFO_MESSAGE, payload: res.data.message });
        dispatch({ type: SET_SELECTED_ANSWER, payload: answer});
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: SET_INFO_MESSAGE, payload: "Error posting answer" });
      });
  };
}


export function postQuiz() {
  return function (dispatch) {
    
    axios
      .post('http://localhost:9000/api/quiz/new')
      .then((res) => {
        dispatch({ type: SET_INFO_MESSAGE, payload: res.data.message });
        dispatch(resetForm());
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: SET_INFO_MESSAGE, payload: 'Error posting quiz' });
      });
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state

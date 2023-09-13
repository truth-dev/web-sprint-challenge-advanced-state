// ❗ You don't need to add extra action creators to achieve MVP
import axios from 'axios'
import { 
  SET_QUIZ_INTO_STATE,
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM} from './../state/action-types';

export function moveClockwise(number) { 
return {type: MOVE_CLOCKWISE, payload:number}

}

export function moveCounterClockwise(number) { 
return {type: MOVE_COUNTERCLOCKWISE, payload: number}
}

export function selectAnswer(id) { 
return {type: SET_SELECTED_ANSWER, payload: id}
}

export function setMessage(message) { 
return {type:SET_INFO_MESSAGE, payload: message}
}

export function setQuiz(id) { 
return {type:SET_QUIZ_INTO_STATE, payload: id}
}

export function inputChange(id, value) { 
return { type: INPUT_CHANGE, payload: id, value}
}

export function resetForm() { 
return {type:RESET_FORM}
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
   
    axios.get('http://localhost:9000/api/quiz/next')
      .then(res => {
        dispatch({type: SET_QUIZ_INTO_STATE, payload: res.data});
        dispatch({type: SET_SELECTED_ANSWER, payload: res.data.answer_id});  // Assuming res.data has answer_id
      })
      .catch(err => {
        console.error(err);
        dispatch({type: SET_INFO_MESSAGE, payload: 'Error fetching quiz'});
      });
  }
}
export function postAnswer(id) {
  return function (dispatch) {
    const payload = {id};
    axios.post('http://localhost:9000/api/quiz/new', payload)
      .then(res => {
        dispatch({type: RESET_FORM});
        dispatch({type: SET_INFO_MESSAGE, payload: res.data.message});
      })
      .catch(err => {
        console.error(err);
        dispatch({type: SET_INFO_MESSAGE, payload: 'Error posting answer'});
      });
  }
}
export function postQuiz(question_text, true_answer_text, false_answer_text) {
  return function (dispatch) {
    const payload = { question_text, true_answer_text, false_answer_text };
    axios.post('http://localhost:9000/api/quiz/answer', payload)
      .then(res => {
        dispatch({type: RESET_FORM});
        dispatch({type: SET_INFO_MESSAGE, payload: 'Quiz posted successfully'});  // or res.data.message
      })
      .catch(err => {
        console.error(err);
        dispatch({type: SET_INFO_MESSAGE, payload: 'Error posting quiz'});
      });
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state

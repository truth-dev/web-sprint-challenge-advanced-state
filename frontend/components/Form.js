import React from 'react';
import { connect } from 'react-redux';
import { inputChange, postQuiz, resetForm } from '../state/action-creators';

export function Form(props) {
  const { dispatch, form, infoMessage } = props;

  const onChange = (evt) => {
    const { id, value } = evt.target;
    dispatch(inputChange(id, value));
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    dispatch(postQuiz(form)); 
    dispatch(resetForm()); 
  };

  const isSubmitDisabled = () => {
    const { newQuestion, newTrueAnswer, newFalseAnswer } = form;
    return !(
      newQuestion.trim().length > 0 &&
      newTrueAnswer.trim().length > 0 &&
      newFalseAnswer.trim().length > 0
    );
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      {infoMessage && <div className="success-message">{infoMessage}</div>}
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={onChange}
        id="newQuestion"
        placeholder="Enter question"
        value={form.newQuestion}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
        value={form.newTrueAnswer}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
        value={form.newFalseAnswer}
      />
      <button id="submitNewQuizBtn" disabled={isSubmitDisabled()}>
        Submit new quiz
      </button>
    </form>
  );
}

const mapStateToProps = (state) => ({
  form: state.form,
  infoMessage: state.infoMessage,
});

export default connect(mapStateToProps)(Form);
/*
 * questionReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_QUESTIONS_SUCCESS,
  LOAD_QUESTIONS,
  LOAD_QUESTIONS_ERROR,
} from './actionConstants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: "",
  currentIndexQuestion: 0,
  questions: [],
});

function questionReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_QUESTIONS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('questions', [])
        .set('currentQuestionIndex', 0);
    case LOAD_QUESTIONS_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('questions', action.payload)
        .set('currentQuestionIndex', 0);;
    case LOAD_QUESTIONS_ERROR:
      return state
        .set('error', true)
        .set('loading', false)
        .set('questions', [])
        .set('currentQuestionIndex', 0);
    case DECREMENT_QUESTION_INDEX:
    case INCREMENT_QUESTION_INDEX:
      return state
      .set('currentIndexQuestion', payload.current)
    default:
      return state;
  }
}

export default questionReducer;

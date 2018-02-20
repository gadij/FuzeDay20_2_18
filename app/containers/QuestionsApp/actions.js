/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

// import {
//     LOAD_REPOS,
//     LOAD_REPOS_SUCCESS,
//     LOAD_REPOS_ERROR,
//   } from './constants';


export const LOAD_QUESTIONS = 'LOAD_QUESTIONS';
export const LOAD_QUESTIONS_SUCCESS = 'LOAD_QUESTIONS_SUCCESS';
export const LOAD_QUESTIONS_ERROR = 'LOAD_QUESTIONS_ERROR';
export const INCREMENT_QUESTION_INDEX = 'INCREMENT_QUESTION_INDEX';
export const DECREMENT_QUESTION_INDEX = 'DECREMENT_QUESTION_INDEX';
export const SET_SELECT_ANSWER = 'SET_SELECT_ANSWER';
// export const DEFAULT_LOCALE = 'en';
import data from './mock';

  /**
   * Load the repositories, this action starts the request saga
*
* @return {object} An action object with a type of LOAD_REPOS
*/
export function getQuestions() {
    return {
        type: LOAD_QUESTIONS_SUCCESS,
        payload: data.questions
    };
}

export function setSelectAnswer(answerText, id) {
    const answer = {
        text: answerText,
        questionId: id
    }
    return {
        type: SET_SELECT_ANSWER,
        payload: answer
    }
}

export function getPrevQuestion(current) {
    return {
        type: INCREMENT_QUESTION_INDEX,
        payload: current
    }
}

export function getNextQuestion(current) {
    return {
        type: DECREMENT_QUESTION_INDEX,
        payload: current
    }
}
  
//   /**
//    * Dispatched when the repositories are loaded by the request saga
//    *
//    * @param  {array} repos The repository data
//    * @param  {string} username The current username
//    *
//    * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
//    */
//   export function reposLoaded(repos, username) {
//     return {
//       type: LOAD_REPOS_SUCCESS,
//       repos,
//       username,
//     };
//   }
  
//   /**
//    * Dispatched when loading the repositories fails
//    *
//    * @param  {object} error The error
//    *
//    * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
//    */
//   export function repoLoadingError(error) {
//     return {
//       type: LOAD_REPOS_ERROR,
//       error,
//     };
//   }
  
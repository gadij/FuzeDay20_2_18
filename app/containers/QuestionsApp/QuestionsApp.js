/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, {Component} from 'react';
import '../../../app.scss';
import PropTypes from 'prop-types';
// import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
// import { compose } from 'redux';
// import { createStructuredSelector } from 'reselect';

// import injectReducer from 'utils/injectReducer';
// import injectSaga from 'utils/injectSaga';
// import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
// import H2 from 'components/H2';
// import ReposList from 'components/ReposList';
// import AtPrefix from './AtPrefix';
// import CenteredSection from './CenteredSection';
// import Form from './Form';
// import Input from './Input';
// import Section from './Section';
// import messages from './messages';
// import { loadRepos } from '../App/actions';
import { getQuestions, getNextQuestion, getPrevQuestion, setSelectAnswer} from './actions';
// import { makeSelectUsername } from './selectors';
// import reducer from './reducer';
// import saga from './saga';

export class QuestionsApp extends Component { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  constructor(props) {
      super(props);
    //   this.state = {
    //       selectedAnswer: ""
    //   }
      this.handleOptionChange = this.handleOptionChange.bind(this);
      this.preQuestion = this.preQuestion.bind(this);
      this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentWillMount() {
    this.props.getData();
  }

handleOptionChange(changeEvent) {
    const {onSelectHandle} = this.props;
    onSelectHandle(changeEvent.target.value, changeEvent.target.id)
}

preQuestion() {
    const {onPrevQuestion, indexQuestion} = this.props;
    onPrevQuestion(indexQuestion - 1);
}

nextQuestion() {
    const {onNextQuestion, indexQuestion} = this.props;
    onNextQuestion(indexQuestion + 1);
}

render() {
    const { questions = [], indexQuestion, selectAnswer } = this.props;
    const currentQuestion = questions.length > 0 ? questions[indexQuestion] : {};
    const disabledPrev = indexQuestion === 0 || indexQuestion === undefined;
    const disabledNext = selectAnswer === {} || selectAnswer === undefined;
    const button = questions.length === indexQuestion 
        ? <div></div>
        : <button 
            style={{color: disabledNext ? 'gray' : 'blue'}}
            onClick={this.nextQuestion}
            disabled = {disabledNext}>
            Next
        </button>

    return (
        <div className="container">
            {currentQuestion.question}
            <form>
            <ul>
                {currentQuestion.answers 
                    ? currentQuestion.answers.map((element, index) => {
                        return (
                            // <li key={index}>{element.answer}</li>
                            <div className="radio" key={index}>
                                <label>
                                    <input id={currentQuestion.id} type="radio" value={element.answer} 
                                                checked={selectAnswer.text === element.answer && selectAnswer.questionId == currentQuestion.id} 
                                                onChange={this.handleOptionChange} />
                                    {element.answer}
                                </label>
                            </div>
                        )
                    })
                    : <div></div>
                }
            </ul>
            <br></br>
            <br></br>
            <button 
<<<<<<< HEAD
                style={{color: disabledPrev ? 'gray' : 'blue'}}
                disabled = {disabledPrev} 
                onClick={this.preQuestion}>
                Back
            </button>
            {button}
=======
                className="btn btn-primary"
                disabled = {indexQuestion === 0 || indexQuestion === undefined} 
                onclick={this.preQuestion}>
                Back
            </button>
            {
                
            }
            <button 
                className="btn btn-primary"
                onclick={this.nextQuestion}
                disabled = {this.state.selectedAnswer === "" || this.state.selectedAnswer === undefined}>
                Next
            </button>
          </form>
>>>>>>> cc8b8817f8d5ae7bca1bce54910f1ebead693da7
        </div> 
    );
        {/* <article>
        
        <div>
          <CenteredSection>
            <H2>
              <FormattedMessage {...messages.startProjectHeader} />
            </H2>
            <p>
              <FormattedMessage {...messages.startProjectMessage} />
            </p>
          </CenteredSection>
          <Section>
            <H2>
              <FormattedMessage {...messages.trymeHeader} />
            </H2>
            <Form onSubmit={this.props.onSubmitForm}>
              <label htmlFor="username">
                <FormattedMessage {...messages.trymeMessage} />
                <AtPrefix>
                  <FormattedMessage {...messages.trymeAtPrefix} />
                </AtPrefix>
                <Input
                  id="username"
                  type="text"
                  placeholder="mxstbr"
                  value={this.props.username}
                  onChange={this.props.onChangeUsername}
                />
              </label>
            </Form>
            <ReposList {...reposListProps} />
          </Section>
        </div>
      </article> */}
  }
}

QuestionsApp.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  questions: PropTypes.array,
//   onSubmitForm: PropTypes.func,
  currentUser: PropTypes.string,
  indexQuestion: PropTypes.number,
  selectAnswer: PropTypes.object
};

// export function mapDispatchToProps(dispatch) {
//   return {
//     onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
//     onSubmitForm: (evt) => {
//       if (evt !== undefined && evt.preventDefault) evt.preventDefault();
//       dispatch(loadRepos());
//     },
//   };
// }

// const mapStateToProps = createStructuredSelector({
//   repos: makeSelectRepos(),
//   username: makeSelectUsername(),
//   loading: makeSelectLoading(),
//   error: makeSelectError(),
// });

export const mapStateToProps = state => {
    const game = state.get('game').toJS();
    return ({
        indexQuestion: game.currentQuestionIndex,
        questions: game.questions,
        currentUser: game.currentUser,
        loading: game.loading,
        error: game.error,
        selectAnswer: game.selectAnswer
    });
}
  
  export const mapDispatchToProps = {
    getData: getQuestions,
    onNextQuestion: getNextQuestion,
    onPrevQuestion: getPrevQuestion,
    onSelectHandle: setSelectAnswer
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(QuestionsApp);
  

// const withConnect = connect(mapStateToProps, mapDispatchToProps);

// const withReducer = injectReducer({ key: 'home', reducer });
// const withSaga = injectSaga({ key: 'home', saga });

// export default compose(
//   withReducer,
//   withSaga,
//   withConnect,
// )(HomePage);

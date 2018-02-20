/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, {Component} from 'react';
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
import { getQuestions, getNextQuestion, getPrevQuestion} from './actions';
// import { makeSelectUsername } from './selectors';
// import reducer from './reducer';
// import saga from './saga';

export class QuestionsApp extends Component { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  constructor(props) {
      super(props);
      this.state = {
          selectedAnswer: ""
      }
      this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  componentWillMount() {
    this.props.getData();
  }

//   getQuestion(element) {
//       return (
//         <li>
//             {element.question}
//         </li>
//       );
//   }

//   getAnswers(element) {
//     return (element.answers.map(answer => {
//         return (<li>{answer.answer}</li>);
//      }));
//   }

handleOptionChange(changeEvent) {
    this.setState({
        selectedAnswer: changeEvent.target.value
    });
}

preQuestion() {
    const {onPrevQuestion, indexQuestion} = this.props;
    this.setState({
        selectedAnswer: ''
    });
    onPrevQuestion(indexQuestion++);
}

nextQuestion() {
    const {onNextQuestion, indexQuestion} = this.props;
    this.setState({
        selectedAnswer: ''
    });
    onNextQuestion(indexQuestion++);
}

render() {
    const { questions = [], indexQuestion } = this.props;
    const currentQuestion = questions.length > 0 ? questions[indexQuestion] : {};
    // const button = questions.length === indexQuestion 

    return (
        <div>
            {currentQuestion.question}
            <ul>
                {currentQuestion.answers 
                    ? currentQuestion.answers.map((element, index) => {
                        return (
                            // <li key={index}>{element.answer}</li>
                            <div className="radio">
                                <label>
                                    <input type="radio" value={element.answer} 
                                                checked={this.state.selectedAnswer === element.answer} 
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
                disabled = {indexQuestion === 0 || indexQuestion === undefined} 
                onclick={this.preQuestion}>
                Back
            </button>
            {
                
            }
            <button 
                onclick={this.nextQuestion}
                disabled = {this.state.selectedAnswer === "" || this.state.selectedAnswer === undefined}>
                Next
            </button>
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
  indexQuestion: PropTypes.number
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
        error: game.error
    });
}
  
  export const mapDispatchToProps = {
    getData: getQuestions,
    onNextQuestion: getNextQuestion,
    onPrevQuestion: getPrevQuestion
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

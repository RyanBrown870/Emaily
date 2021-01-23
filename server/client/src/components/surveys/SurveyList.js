import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys, deleteSurvey } from '../../actions';



class SurveyList extends Component {
    // grab the surveys when component mounts.
    componentDidMount() {
        this.props.fetchSurveys();
    }

    handleDeleteClick = (id) => {
      this.props.deleteSurvey(id);
    }

    renderSurveys() {
        return this.props.surveys.reverse().map(survey => {
          return (
            <div className="card blue-grey darken-1" key={survey._id}>
              <div className="card-content white-text">
                  <span className="card-title">{survey.title}</span>
                  <p>
                    {survey.body}
                  </p>
                  <p className="right">
                    Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                  </p>
              </div>
              <div className="card-action">
                <a>Yes: {survey.yes}</a>
                <a>No: {survey.no}</a>
                <a onClick={this.handleDeleteClick(survey._id)} className="waves-effect waves-white btn-flat"><i class="material-icons">delete</i></a>
              </div>
            </div>
          )
        })
      }

    render() {
        return (
            <div>
                {this.renderSurveys()}
            </div>
        )
    }
}

// surveys destructuring from state.surveys
function mapStateToProps({ surveys }) {
    return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys, deleteSurvey })(SurveyList);
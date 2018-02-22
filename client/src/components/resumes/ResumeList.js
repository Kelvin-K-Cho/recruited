import React from 'react';
import { connect } from 'react-redux';
import { fetchResumes } from '../../actions';

import {Link} from 'react-router-dom';

class ResumeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {resumeIndex: 0};
  }

  componentDidMount() {
    this.props.fetchResumes(this.props.match.params.id);
  }

  componentDidUpdate() {  // render resume after element loaded and updated with state data
    if (this.props.resumes[this.state.resumeIndex]) {
      document.getElementById('resume-view')
        .innerHTML = this.props.resumes[this.state.resumeIndex].resumeHTML;
    } else {
      document.getElementById('resume-view')
        .innerHTML = "<div>There is no resume to show</div>";
    }
  }

  handleButton(e) {
    if (e.text === "Approve") {
      // save to list of approved resumes:
    }
    // next:
    // if (this.state.resumeIndex < this.props.resumes.length - 1) {
    this.setState({resumeIndex: this.state.resumeIndex + 1});
    console.log(this.state);
    // }
  }

  render() {
    const {resumes} = this.props;
    // if (!resumes[this.state.resumeIndex]) return (<div>Loading</div>);
    return (
      <div>
        <div className="resume-container">
          <div id="resume-view"></div>
        </div>
        <button className="resume-approve"
          onClick={(e) => this.handleButton(e)}>
          Approve
        </button>
        <button className="resume-decline"
          onClick={(e) => this.handleButton(e)}>
          Decline
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { resumes: state.entities.resumes };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchResumes: (jobId) => fetchResumes(jobId)
  };
}

export default connect(mapStateToProps, { fetchResumes })(ResumeList);

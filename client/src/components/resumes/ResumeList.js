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
    }
  }

  render() {
    console.log(this.props.resumes);
    const {resumes} = this.props;
    if (!resumes[this.state.resumeIndex]) return (<div>Loading</div>);
    return (
      <div>
        <div className="resume-container">
          <div id="resume-view">Resume</div>
        </div>
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

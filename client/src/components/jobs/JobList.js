import React from 'react';
import { connect } from 'react-redux';
import { fetchJobs } from '../../actions';
import { withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';

class JobList extends React.Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    this.props.fetchJobs();
  }
  
  redirect(url){
    this.props.history.push(`http://${url}`);
  }

  renderJobs(){
    return this.props.jobs.reverse().map(job => {
      return (
          <div className="job-index-item-outer-div"key={job._id}>
            <div className="job-index-item-inner-div">
              <Link className="link-to-job-show-page" to={`/jobs/${job._id}`}>
                <div className="job-index-item-name">{job.title} - {job.type}</div>
                <div className="job-index-item-info">
                  <span onClick={() => this.redirect(job.company_url)}>{job.company}</span>
                  &#160;- {job.location}
                </div>
                <span className="job-index-item-estimate">Estimated Salary: </span>
                <div className="job-index-item-salary">$ {job.salaryEstimate}</div>
                <p className="job-index-item-description">Job Description: </p>
                <div className="job-index-item-summary">{job.summary}</div>
                <p className="job-index-item-post-date">Posted On:</p>
                <p className="job-index-item-date">
                {new Date(job.dateCreated).toLocaleDateString()}
                </p>
              </Link>
            </div>
          </div>
      );
    });
  }

  render() {
    return (
      <div className="job-index-item-container-div">
        {this.renderJobs()}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { jobs: Object.values(state.entities.jobs) };
}

export default withRouter(connect(mapStateToProps, { fetchJobs })(JobList));

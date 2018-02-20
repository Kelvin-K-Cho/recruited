import React from 'react';
import JobIndexItem from './job_index_item';

class JobIndex extends React.Component {
  componentDidMount() {
    this.props.fetchJobs();
  }

  render() {
    const {jobs, companies} = this.props;
    if (!jobs || !companies) return (<div>Loading...</div>);

    return (
      <ul>
        {jobs.map((job) => {
            return (<JobIndexItem key={job.id} job={job}
              company={companies[job.company]}/>);
          })
        }
      </ul>
    );
  }
}

export default JobIndex;

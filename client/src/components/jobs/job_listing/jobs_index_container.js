import {connect} from 'react-redux';
import {fetchJobs} from '../../../actions/job_actions';
import JobIndex from './job_index';

const mapSTP = (state) => {
  return {
    jobs: Object.values(state.entities.jobs),
    companies: Object.values(state.entitites.companies)
  };
};

const mapDTP = (dispatch) => {
  return {
    fetchJobs: () => dispatch(fetchJobs)
  };
};

export default connect(mapSTP, mapDTP)(JobIndex);

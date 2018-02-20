import {connect} from 'react-redux';
import {fetchJob} from '../../actions';
import JobShow from './job_show';

const mapSTP = (state) => {
  return {
    job: state.entities.jobs[this.],
    company: Object.values(state.entitites.companies)
  };
};

const mapDTP = (dispatch) => {
  return {
    fetchJob: () => dispatch(fetchJob)
  };
};

export default connect(mapSTP, mapDTP)(JobShow);

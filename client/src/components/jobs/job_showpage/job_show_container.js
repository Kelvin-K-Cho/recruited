import {connect} from 'react-redux';
import {fetchJob} from '../../../actions/job_actions';

const mapSTP = (state) => {
  return {
    company: Object.values(state.entitites.companies)
  };
};

const mapDTP = (dispatch) => {
  return {
    fetchJob: () => dispatch(fetchJob)
  };
};

// export default connect(mapSTP, mapDTP)(JobShow);

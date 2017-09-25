import ActiveModelAdapter from 'active-model-adapter';
import config from '../config/environment';

export default ActiveModelAdapter.extend({
  host: `${config.rootURL}api`
});

import { Map } from 'immutable';
import { createReducer } from '../../utilities';

export default createReducer(new Map(), {
  SET_CONFIG: (state, data) => new Map(data),
});

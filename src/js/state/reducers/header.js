import { createReducer } from '../../utilities';
import { Header } from '../records/header';


export default createReducer(new Header(), {

  SET_HEADER: (state, { title, icon }) => state.set('title', title).set('icon', icon),

});

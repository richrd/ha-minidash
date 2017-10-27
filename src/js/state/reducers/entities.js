import { List } from 'immutable';

import { createReducer } from '../../utilities';


export default createReducer(List(), {
  SET_ENTITIES: (state, entities) => List(entities),


  UPDATE_ENTITY: (state, { newState }) => {
    const pos = state.findIndex(val => newState.entity_id === val.entity_id);
    return state.set(pos, newState);
  },


  UPDATE_ENTITY_STATE: (state, { entity, value }) => {
    const pos = state.indexOf(entity);
    const newEntity = Object.assign({}, entity, {
      state: value,
    });
    return state.set(pos, newEntity);
  },
});

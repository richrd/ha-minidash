import { List } from 'immutable';

import { createReducer } from '../../utilities';


export default createReducer(List(), {
  SET_ENTITIES: (state, entities) => List(entities),

  // TOGGLE_ENTITY_STATE: (state, entity) => {
  //   const pos = state.indexOf(entity);
  //   const newEntity = Object.assign({}, {
  //     state: getToggledEntityState(entity)
  //   }, entity);
  //   return state.set(pos, newEntity);
  // },

  UPDATE_ENTITY_STATE: (state, { newState }) => {
    const pos = state.findIndex(val => newState.entity_id === val.entity_id);
    return state.set(pos, newState);
  },

  // SET_BRIGHTNESS: (state, entity) => {
  //   const pos = state.indexOf(entity);
  //   const newEntity = Object.assign({}, {
  //     state: entity.state,
  //   }, entity);
  //   return state.set(pos, newEntity);
  // },
});

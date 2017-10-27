

export function setEntityState(entity, value) {
  return dispatch => dispatch({
    type: 'UPDATE_ENTITY_STATE',
    data: {
      entity,
      value,
    },
  });
}

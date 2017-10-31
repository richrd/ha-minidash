
export function setHeader(title, icon) {
  return dispatch => dispatch({
    type: 'SET_HEADER',
    data: {
      title,
      icon,
    },
  });
}

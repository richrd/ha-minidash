
export function createReducer(initialState, reducers) {
  return (state = initialState, action) => {
    const reducer = reducers[action.type];
    return reducer ? reducer(state, action.data) : state;
  };
}

export function stateToProps(...args) {
  return (state) => {
    const out = {};

    args.forEach((name) => { out[name] = state[name]; });

    return out;
  };
}


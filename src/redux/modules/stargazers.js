const LOAD = 'stargazers/LOAD';
const LOAD_SUCCESS = 'stargazers/LOAD_SUCCESS';
const LOAD_FAIL = 'stargazers/LOAD_FAIL';

const initialState = {
  loading: false,
  loaded: false
};

export default function stargazers(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.stargazers && globalState.stargazers.loaded;
}

export function load(username) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.loadStargazersUser(username)
  };
}

const LOAD_USER = 'stargazers/LOAD_USER';
const LOAD_USER_SUCCESS = 'stargazers/LOAD_USER_SUCCESS';
const LOAD_USER_FAIL = 'stargazers/LOAD_USER_FAIL';
const LOAD_STARRED_REPO = 'stargazers/LOAD_STARRED_REPO';
const LOAD_STARRED_REPO_SUCCESS = 'stargazers/LOAD_STARRED_REPO_SUCCESS';
const LOAD_STARRED_REPO_FAIL = 'stargazers/LOAD_STARRED_REPO_FAIL';

const initialState = {
  loading: false,
  loaded: false
};

export default function stargazers(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_USER:
    case LOAD_STARRED_REPO:
      return {
        ...state,
        loading: true
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case LOAD_USER_FAIL:
    case LOAD_STARRED_REPO_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOAD_STARRED_REPO_SUCCESS:
      console.log(action);
      return {
        ...state,
        loading: false,
        loaded: true,
        userData: action.result.userData,
        repoData: action.result.repoData
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.stargazers && globalState.stargazers.loaded;
}

export function loadRepoStarredWithOption(options) {
  return {
    types: [LOAD_STARRED_REPO, LOAD_STARRED_REPO_SUCCESS, LOAD_STARRED_REPO_FAIL],
    promise: (client) => client.loadUserAndRepoWithOption(options)
  };
}

export function loadUserStargazers(username) {
  return {
    types: [LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_FAIL],
    promise: (client) => client.loadStargazersUser(username)
  };
}

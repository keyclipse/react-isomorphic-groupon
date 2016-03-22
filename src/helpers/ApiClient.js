import superagent from 'superagent';
import config from '../config';
import parseLinkHeader from 'parse-link-header';

const methods = ['get', 'post', 'put', 'patch', 'del'];
const GITHUB_API = 'https://api.github.com';

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return 'http://' + config.apiHost + ':' + config.apiPort + adjustedPath;
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return '/api' + adjustedPath;
}

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class _ApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        if (params) {
          request.query(params);
        }

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      }));
  }

  loadStargazersUser(username) {
    return new Promise((resolve, reject) => {
      const request = superagent;
      request
        .get(`${GITHUB_API}/users/${username}`)
        .end((err, { body } = {}) =>
          err ? reject(body || err) : resolve(body));
    });
  }

  loadRepoStarredByUser(options) {
    return new Promise((resolve, reject) => {
      const { page, username } = options;
      const url = page ? page :
        `${GITHUB_API}/users/${username}/starred`;
      const request = superagent;
      request
        .get(url)
        .end((err, { header, body } = {}) => {
          const pagination = parseLinkHeader(header.link);
          if (err) {
            reject(body || err);
          }else {
            resolve({
              repos: body,
              pagination
            });
          }
        });
    });
  }

  loadUserAndRepoWithOption(options) {
    const promiseUser = this.loadStargazersUser(options.username);
    const promiseRepos = this.loadRepoStarredByUser(options);

    return new Promise((resolve) => {
      Promise.all([promiseUser, promiseRepos]).then(([userData, repoData]) => {
        resolve({
          userData,
          repoData
        });
      });
    });
  }
}

const ApiClient = _ApiClient;

export default ApiClient;

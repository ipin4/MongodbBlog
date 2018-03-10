import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {matchRoutes} from 'react-router-config';
import {Provider} from 'react-redux';
import getStoreConfig from '../../client/store';

import routes from '../../client/routes';
import App from '../../client/components/app';

function renderPage(html, state) {
  const data =
    `<!DOCTYPE html>
    <html>
    <head>
      <base href="/">
      <meta charset="utf-8">
      <title>React App</title>
      <link rel="stylesheet" type="text/css" href="main.css">
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;subset=latin-ext" rel="stylesheet">
    </head>
    <body>
      <div id="root">${html}</div>
      <script>
      // WARNING: See the following for security issues around embedding JSON in HTML:
      // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
      window.PRELOADED_STATE = ${JSON.stringify(state).replace(/</g, '\\u003c')}
      </script>
      <script src="bundle.js"></script>
    </body>
    </html>`;
  return data;
}

function handleRender(req, res) {
  const context = {};
  const branch = matchRoutes(routes, req.url);
  const store = getStoreConfig();
  const promiseAll = branch.map(({route, match}) => {
    const {fetchData} = route.component;
    const url = `${req.protocol}://${req.get('Host')}`;
    if (!(fetchData instanceof Function)) {
      return Promise.resolve(null);
    }
    return fetchData(store.dispatch, match, url);
  });
  Promise.all(promiseAll)
    .then(() => {
      const app = (
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App/>
          </StaticRouter>
        </Provider>
      );
      const html = renderToString(app)
      const state = store.getState();

      if (context.url) {
        return res.redirect(context.url);
      }

      res.send(renderPage(html, state));
    });
}

export default handleRender;

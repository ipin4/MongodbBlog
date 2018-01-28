import {blogRoutes} from './blog-routes';
import {errorRoutes} from './error-routes';

export const allRoutes = (app, db) => {
  blogRoutes(app, db);
  errorRoutes(app);
};

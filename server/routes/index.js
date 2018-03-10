import {blogRoutes} from './blog-routes';
import {errorRoutes} from './error-routes';
import {userRoutes} from './user-routes';

export const allRoutes = (app, db) => {
  //userRoutes(app, db);
  blogRoutes(app, db);
  //errorRoutes(app);
};

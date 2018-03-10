import Article from '../schema/Article';
import {userLoggedIn} from '../middlewares/passport';

export const blogRoutes = (app) => {
  // create
  app.post('/blogs', (req, res, next) => {
    const newArticle = Article({
      title: req.body.title,
      body: req.body.body,
      created_at: new Date(),
    });

    newArticle.save()
      .then(() => res.send(newArticle))
      .catch(next);
  });

  // read
  app.get('/blogs', (req, res, next) => {
    Article.find()
      .then((articlesList) => {
        articlesList.length ? res.send(articlesList) :
          res.send([]);
      })
      .catch(next);
  });

  app.get('/blogs/:id', (req, res, next) => {
    Article.findById(req.params.id)
      .then((item) => {
        item ? res.send(item) :
          res.send(`Article ${req.params.id} not found`);
      })
      .catch(next);
  });

  // update
  app.put('/blogs/:id', (req, res, next) => {
    const updatedArticle = {
      title: req.body.title,
      body: req.body.body,
      updated_at: new Date(),
    };

    Article.findByIdAndUpdate(req.params.id, updatedArticle)
      .then(() => res.send(`Article ${req.params.id} was updated`))
      .catch(next);
  });

  // delete
  app.delete('/blogs/:id', (req, res, next) => {
    Article.findByIdAndRemove(req.params.id)
      .then((result) => res.send(result))
      .catch(next);
  });

  //redirect
  app.get('/', (req, res) => {
    userLoggedIn ?
      res.redirect('/notes') :
      res.redirect('/login')
  })
};

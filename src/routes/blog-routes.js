import Article from '../schema/Article';
import {userLoggedIn} from '../middlewares/passport';

export const blogRoutes = (app, db) => {
  const collection = db.collection('blogs');
  // create
  app.post('/blogs', userLoggedIn, (req, res,  next) => {
    const newArticle = Article({
      title: req.body.title,
      body: req.body.body,
      owner: 'someOwner',
      created_at: new Date(),
    });

    newArticle.save()
      .then((err) => res.send('Article created'))
      .catch(next);
  });

  // read
  app.get('/blogs', userLoggedIn,  (req, res, next) => {
    Article.find()
      .then((articlesList) => {
        articlesList.length ? res.send(articlesList) :
          res.send(`Can't find any articles`);
      })
      .catch(next)
  });

  app.get('/blogs/:id', userLoggedIn, (req, res, next) => {
    Article.findById(req.params.id)
      .then((item) => {
        item ? res.send(item) :
          res.send(`Article ${req.params.id} not found`);
      })
      .catch(next);
  });

  // update
  app.put('/blogs/:id', userLoggedIn, (req, res, next) => {
    const updatedArticle = {
      title: req.body.title,
      body: req.body.body,
      owner: 'someOwner',
      updated_at: new Date(),
    };

    Article.findByIdAndUpdate(req.params.id, updatedArticle)
      .then((result) =>
        res.send(`Article ${req.params.id} was updated`))
      .catch(next)
  });

  // delete
  app.delete('/blogs/:id', userLoggedIn, (req, res, next) => {
    Article.findByIdAndRemove(req.params.id)
      .then((error, item) =>
        res.send('Article ' + req.params.id + ' deleted!'))
      .catch(next)
  });

  //redirect
  app.get('/', (req, res, next) => {
    userLoggedIn ?
      res.redirect('/blogs') :
      res.redirect('/login')
  })
};

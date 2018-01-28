import {ObjectID} from 'mongodb';

export const blogRoutes = (app, db) => {
  const collection = db.collection('blogs');
  // create
  app.post('/blogs', (req, res) => {
    const blog = {
      title: req.body.title,
      text: req.body.body
    };

    collection.insert(blog, (error, result) => {
      if (error) {
        res.send({error});
      } else {
        res.send(result.ops[0]);
      }
    })
  });

  // read
  app.get('/blogs', (req, res) => {
    collection.find({}).toArray((error, list) => {
      if (error) {
        res.send({'error':'DB Error has occured'});
      } else {
        if (list.length) {
          res.send(list);
        } else {
          res.send(`Can't find any blogs`);
        }
      }
    })
  });

  app.get('/blogs/:id', (req, res) => {
    const details = {'_id': ObjectID(req.params.id)};

    collection.findOne(details, (error, item) => {
      if (error) {
        res.send({error});
      } else {
        if (item) {
          res.send(item);
        } else {
          res.send(`Blog with id:${req.params.id} not found`);
        }
      }
    })
  });

  // update
  app.put('/blogs/:id', (req, res) => {
    const details = {'_id': ObjectID(req.params.id)};
    const blog = {
      title: req.body.title,
      text: req.body.body
    };

    collection.update(details, blog, (error, result) => {
      if (error) {
        res.send({error});
      } else {
        res.send(blog);
      }
    })
  });

  // delete
  app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': ObjectID(id)};

    collection.remove(details, (error, item) => {
      if (error) {
        res.send({error});
      } else {
        res.send('Blog item ' + id + ' deleted!');
      }
    })
  });
};

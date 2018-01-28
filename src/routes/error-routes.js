export const errorRoutes = (app) => {
  app.all('/*', (req, res) => {
    const error = `Request path with "${req.path}" is not exist.`;
    res.render('error', {error});
  })
}

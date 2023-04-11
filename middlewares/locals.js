const Category = require("../models/Category")

module.exports = async function(req, res, next) {
  // res.locals.isLogged = req.session.isLogged
  // res.locals.loggedUserId = req.session.loggedUserId
  // res.locals.loggedIsAdmin = req.session.loggedIsAdmin
  // res.locals.loggedUsername = req.session.loggedUsername

  const categories = await Category.find()
  res.locals.categories = categories

  res.locals.isLogged = true
  res.locals.loggedUserId = "1"
  res.locals.loggedIsAdmin = true
  res.locals.loggedUsername = "admin"
  next()
}
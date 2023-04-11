module.exports = function(req, res, next) {
  // if(!req.session.loggedIsAdmin){
  //   return res.redirect("/")
  // }
  
  next()
}
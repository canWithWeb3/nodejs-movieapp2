module.exports = function(req, res, next) {
  // if(!req.session.isLogged){
  //   return res.redirect("/login")
  // }
  
  next()
}
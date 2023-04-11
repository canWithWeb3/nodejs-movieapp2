const User = require("../models/User")
const Category = require("../models/Category")
const Movie = require("../models/Movie")
const bcrypt = require("bcrypt")

exports.get_category = async(req, res) => {
  const { categoryId } = req.params
  if(!categoryId){
    return res.redirect("/")
  }

  const category = await Category.findById(categoryId)
  if(!category){
    return res.redirect("/")
  }
  const movies = await Movie.find().populate("categories")

  let selectedMovies = []
  movies.map(m => {
    m.categories.map(c => {
      if(c._id == categoryId){
        selectedMovies.push(m)
      }
    })
  })

  console.log(category.name)
  res.render("user/category", {
    movies: selectedMovies,
    category: category
  })
}

exports.get_movie_detail = async(req, res) => {
  const { movieId } = req.params
  if(!movieId){
    return res.redirect("/")
  }

  const movie = await Movie.findById(movieId).populate("categories")
  if(!movie){
    return res.redirect("/")
  }

  res.render("user/movie-detail", {
    movie: movie
  })
}

exports.post_login = async(req, res) => {
  const { email, password } = req.body

  let user = await User.findOne({ email: email })
  if(!user){
    return res.status(400).json({ email: "Bu email kullanılmıyor." })
  }

  const isSuccess = await bcrypt.compare(password, user.password)
  if(!isSuccess){
    return res.status(400).json({ error: "Şifre hatalı." })
  }

  req.session.isLogged = true
  req.session.loggedUserId = user._id
  req.session.loggedIsAdmin = user.isAdmin
  req.session.loggedUsername = user.username
  return res.status(200).json(true)
}

exports.get_login = async(req, res) => {
  res.render("user/auth/login")
}

exports.post_register = async(req, res) => {
  const { username, email, password } = req.body

  let user = await User.findOne({ email: email })
  if(user){
    return res.status(400).json({ email: "Bu email kullanılmaktadır." })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try{
    user = new User({
      username: username,
      email: email,
      password: hashedPassword
    })

    await user.save()
    return res.status(200).json(true)
  }catch(err){
    return res.status(400).json({ error: err })
  }

}

exports.get_register = async(req, res) => {
  res.render("user/auth/register")
}

exports.logout = async(req, res) => {
  try{
    await req.session.destroy()
    return res.redirect("/")
  }catch(err){
    return res.redirect("/home")
  }
}

exports.index = async(req, res) => {
  const movies = await Movie.find()
  res.render("user/index", {
    movies: movies
  })
}

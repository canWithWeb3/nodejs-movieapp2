const Category = require("../models/Category")
const Movie = require("../models/Movie")

// ? movies start
exports.post_create_movie = async(req, res) => {
  const { image, name, description, imdb, publishYear, categories } = req.body

  let newMovie = new Movie({
    image: image,
    name: name,
    description: description,
    imdb: imdb,
    publishYear: publishYear,
    categories: categories
  })

  try{
    await newMovie.save()
    return res.status(200).json(true)
  }catch(err){
    return res.status(400).json({ error: err })
  }
}

exports.get_create_movie = async(req, res) => {
  const categories = await Category.find().sort({ name: 1 })
  res.render("admin/movies/create-movie", {
    categories: categories
  })
}

exports.get_movies = async(req, res) => {
  const movies = await Movie.find()
  res.render("admin/movies/movies", {
    movies: movies
  })
}
// ? movies finish

// ****

// ? categories start
exports.get_delete_category = async(req, res) => {
  const { categoryId } = req.params

  if(!categoryId){
    return res.redirect("/admin/categories")
  }

  let category = await Category.findById(categoryId)
  if(!category){
    return res.redirect("/admin/categories")
  }

  try{
    await category.deleteOne()
    return res.redirect("/admin/categories")
  }catch(err){
    return res.redirect("/admin/categories")
  }
}

exports.post_edit_category = async(req, res) => {
  const { name } = req.body
  const { categoryId } = req.params

  if(!categoryId){
    return res.redirect("/admin/categories")
  }

  let category = await Category.findById(categoryId)
  if(!category){
    return res.redirect("/admin/categories")
  }

  try{
    category.name = name
    await category.save()
    return res.status(200).json(true)
  }catch(err){
    return res.status(400).json({ error: err })
  }
}

exports.get_edit_category = async(req, res) => {
  const { categoryId } = req.params

  if(!categoryId){
    return res.redirect("/admin/categories")
  }

  const category = await Category.findById(categoryId)
  if(!category){
    return res.redirect("/admin/categories")
  }

  return res.render("admin/categories/edit-category", {
    category: category
  })
}

exports.post_create_category = async(req, res) => {
  const { name } = req.body

  try{
    let newCategory = new Category({
      name: name
    })

    await newCategory.save()
    return res.status(200).json(true)
  }catch(err){
    return res.status(400).json({ error: err })
  }
}

exports.get_create_category = async(req, res) => {
  res.render("admin/categories/create-category")
}

exports.get_categories = async(req, res) => {
  const categories = await Category.find().sort({ name: 1 })
  res.render("admin/categories/categories", {
    categories: categories
  })
}
// ? categories finish

// ***

exports.index = async(req, res) => {
  res.render("admin/admin")
}

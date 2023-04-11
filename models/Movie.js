const mongoose = require("mongoose")

const MovieSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imdb: {
    type: Number,
    required: true
  },
  publishYear: {
    type: Number,
    required: true
  },
  categories: { 
    type: Array, 
    ref: "Category" 
  }
}, { timestamps: true })

const Movie = mongoose.model("Movie", MovieSchema)

module.exports = Movie
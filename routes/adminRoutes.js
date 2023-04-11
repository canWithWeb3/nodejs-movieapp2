const router = require("express").Router()
const adminController = require("../controllers/adminControllers")
const isAdmin = require("../middlewares/isAdmin")


// categories start
router.post("/movies/create", isAdmin, adminController.post_create_movie)
router.get("/movies/create", isAdmin, adminController.get_create_movie)
router.get("/movies", isAdmin, adminController.get_movies)
// categories finish


// categories start
router.get("/categories/:categoryId/delete", isAdmin, adminController.get_delete_category)
router.post("/categories/:categoryId/edit", isAdmin, adminController.post_edit_category)
router.get("/categories/:categoryId/edit", isAdmin, adminController.get_edit_category)
router.post("/categories/create", isAdmin, adminController.post_create_category)
router.get("/categories/create", isAdmin, adminController.get_create_category)
router.get("/categories", isAdmin, adminController.get_categories)
// categories finish


router.get("/", isAdmin, adminController.index)

module.exports = router
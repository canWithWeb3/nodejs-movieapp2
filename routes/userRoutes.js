const router = require("express").Router()
const userController = require("../controllers/userControllers")
const isLogged = require("../middlewares/isLogged")
const notLogged = require("../middlewares/notLogged")

router.get("/category/:categoryId", userController.get_category)

router.get("/movie-detail/:movieId", userController.get_movie_detail)

router.post("/login", notLogged, userController.post_login)
router.get("/login", notLogged, userController.get_login)

router.post("/register", notLogged, userController.post_register)
router.get("/register", notLogged, userController.get_register)

router.get("/logout", isLogged, userController.logout)
router.get("/", userController.index)

module.exports = router
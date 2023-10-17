const express = require(`express`)
const router = express.Router()

// const authenticateAdmin = require(`../middleware/authenticateAdmin`)
const {authenticate} = require(`../middleware/authenticate`)
const upload = require(`../middleware/upload`)
const {newsImg,newsPost,news} = require(`../controllers/admin-controller`)



router.post(`/text`,authenticate,upload.single(`file`),newsPost)
router.post(`/img`,authenticate,upload.single(`file`),newsImg)

router.get(`/news`,authenticate,news)





module.exports = router
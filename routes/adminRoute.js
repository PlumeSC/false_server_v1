const express = require(`express`)
const router = express.Router()

// const authenticateAdmin = require(`../middleware/authenticateAdmin`)
const {authenticate} = require(`../middleware/authenticate`)
const upload = require(`../middleware/upload`)
const {newsImg,news} = require(`../controllers/admin-controller`)



// router.post(`/`,authenticateAdmin)
router.post(`/text`,authenticate,upload.single(`file`),news)
router.post(`/img`,authenticate,upload.single(`file`),newsImg)
// router.patch(`/`,upload.single(`file`),newsImg)





module.exports = router
const express = require(`express`)
const router = express.Router()

// const authenticateAdmin = require(`../middleware/authenticateAdmin`)
const {authenticate} = require(`../middleware/authenticate`)
const upload = require(`../middleware/upload`)
const {newsImg,newsPost,news,post,getAll,deletePost,edit,uploadFile} = require(`../controllers/admin-controller`)



router.post(`/text`,authenticate,upload.single(`file`),newsPost)
router.post(`/img`,authenticate,upload.single(`file`),newsImg)

router.get(`/news`,authenticate,news)


// router.post(`/post`,authenticate,upload.single('file'),post)
router.post(`/post`,authenticate,upload.single('file'),post)
router.post(`/delete`,deletePost)
router.post(`/edit`,authenticate,upload.single('file'),edit)
router.get(`/getAll`,getAll)
router.post(`/upload`,authenticate,upload.single(`file`),uploadFile)




module.exports = router
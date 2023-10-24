const express = require(`express`)
const router = express.Router()

const {authenticate} = require(`../middleware/authenticate`)
const upload = require(`../middleware/upload`)


const {updateUser} = require(`../controllers/user-controller`)



router.post(`/post`,authenticate,upload.single('file'),updateUser)





module.exports = router
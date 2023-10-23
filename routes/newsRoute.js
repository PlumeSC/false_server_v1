const express = require(`express`)
const router = express.Router()


const {news,newsId} = require(`../controllers/news-controller`)





router.get(`/:newsId`,newsId)
router.get(`/`,news)





module.exports = router
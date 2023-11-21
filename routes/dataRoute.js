const express = require(`express`)
const router = express.Router()

const {standings,livescore,home,videoId} = require(`../controllers/data-controller`)


router.get(`/standings`,standings)
router.get(`/livescore`,livescore)
router.get(`/home`,home)
router.get(`/video/:videoId`,videoId)

module.exports = router
const express = require(`express`)
const router = express.Router()

const {standings,livescore} = require(`../controllers/data-controller`)


router.get(`/standings`,standings)
router.get(`/livescore`,livescore)



module.exports = router
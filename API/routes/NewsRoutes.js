const express = require('express');
const router = express.Router();
const NewsController = require('../app/Http/Controllers/NewsController');

router.get('/sources', NewsController.getSources)
router.get('/', NewsController.getEveryThing)

module.exports = router;
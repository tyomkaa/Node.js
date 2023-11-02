const express = require('express');
const router = express.Router();
const matApiController = require('../../api/mattressAPI');
router.get ('/', matApiController.getMattresses);
router.get ('/:id', matApiController.getMattressById);
router.post ('/', matApiController.createMattress);
router.put ('/ :id', matApiController.updateMattress);
router.delete ('/: id', matApiController.deleteMattress);

module.exports = router;
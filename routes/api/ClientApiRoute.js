const express = require('express');
const router = express.Router();
const clApiController = require('../../api/clientAPI');
router.get ('/', clApiController.getClients);
router.get ('/:id', clApiController.getClientById);
router.post ('/', clApiController.createClient);
router.put ('/ :id', clApiController.updateClient);
router.delete ('/: id', clApiController.deleteClient);

module.exports = router;

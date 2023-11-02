const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authUtils = require('./../util/authUtils');

router.get('/', clientController.showClientList);
router.get('/add', clientController.showAddClientForm);
router.get('/edit/:id', authUtils.permitAuthenticatedUser, clientController.showEditClientForm);
router.get('/details/:id', clientController.showClientDetails);

router.post('/add', clientController.addClient);
router.post('/edit', authUtils.permitAuthenticatedUser, clientController.updateClient);
router.get('/delete/:id', authUtils.permitAuthenticatedUser, clientController.deleteClient);

module.exports = router;
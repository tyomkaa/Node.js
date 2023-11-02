const express = require('express');
const router = express.Router();
const mattressController = require('../controllers/mattressController');
const authUtils = require('./../util/authUtils');

router.get('/', mattressController.showMattressList);
router.get('/add', authUtils.permitAuthenticatedUser, mattressController.showAddMattressForm);
router.get('/edit/:id', authUtils.permitAuthenticatedUser, mattressController.showEditMattressForm);
router.get('/details/:id', mattressController.showMattressDetails);

router.post('/add', authUtils.permitAuthenticatedUser, mattressController.addMattress);
router.post('/edit', authUtils.permitAuthenticatedUser, mattressController.updateMattress);
router.get('/delete/:id', authUtils.permitAuthenticatedUser, mattressController.deleteMattress);

module.exports = router;
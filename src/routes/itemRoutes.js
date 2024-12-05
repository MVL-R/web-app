const express = require('express');
const router = express.Router();
const { getItems, addItem, deleteItem, updateItem } = require('../controllers/itemController');

router.get('/', getItems);
router.post('/', addItem);
router.post('/:id/delete', deleteItem);
router.post('/:id/edit', updateItem);

module.exports = router;
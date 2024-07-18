import express from 'express';
import {
  getItemById,
  getItems,
} from '../controllers/itemsController.js';
const router = express.Router();

// Get items
router.get('/', getItems);

// Get item by id
router.get('/:id', getItemById);

export default router;
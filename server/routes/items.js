import express from 'express';
import {
  getItemById,
  getItems,
} from '../controllers/itemsController.js';

const router = express.Router();

router.get('/', getItems);

router.get('/:id', getItemById);

export default router;
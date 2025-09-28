import { Router } from 'express';
import { listRooms, createRoom, getRoom, updateRoom, deleteRoom } from '../controllers/roomController.js';

const router = Router();

router.get('/', listRooms);
router.post('/', createRoom);
router.get('/:id', getRoom);
router.put('/:id', updateRoom);
router.delete('/:id', deleteRoom);

export default router;

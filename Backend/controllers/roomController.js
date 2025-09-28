import Room from '../models/Room.js';
import { z } from 'zod';

const roomSchema = z.object({
  name: z.string().min(1),
  capacity: z.number().int().min(1).optional()
});

export const listRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.json(rooms);
  } catch (err) { next(err); }
};

export const createRoom = async (req, res, next) => {
  try {
    const data = roomSchema.parse(req.body);
    const room = await Room.create(data);
    res.status(201).json(room);
  } catch (err) { next(err); }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ error: 'Not found' });
    res.json(room);
  } catch (err) { next(err); }
};

export const updateRoom = async (req, res, next) => {
  try {
    const data = roomSchema.partial().parse(req.body);
    const room = await Room.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!room) return res.status(404).json({ error: 'Not found' });
    res.json(room);
  } catch (err) { next(err); }
};

export const deleteRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (err) { next(err); }
};

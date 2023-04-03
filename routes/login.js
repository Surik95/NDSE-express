import express from 'express';
const router = express.Router();

export default router.post('/', (req, res) => {
  res.status(201);
  res.json({ id: 1, mail: 'test@mail.ru' });
});

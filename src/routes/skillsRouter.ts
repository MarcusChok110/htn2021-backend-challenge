import express from 'express';
import skillService from '../services/skillService';

const router = express.Router();

router.get('/', async (req, res) => {
  const { min_frequency, max_frequency } = req.query;
  // convert query params to numbers
  const min = Number(min_frequency);
  const max = Number(max_frequency);

  const skills = await skillService.findFrequency(min, max);
  return res.json(skills);
});

export default router;

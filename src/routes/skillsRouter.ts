import express from 'express';
import skillService from '../services/skillService';

/**
 * Router for skills endpoints
 */
const router = express.Router();

// GET /skills
// returns array of skills and their frequency
router.get('/', async (req, res) => {
  const { min_frequency, max_frequency } = req.query;
  // convert query params to numbers
  const min = Number(min_frequency);
  const max = Number(max_frequency);

  const skills = await skillService.findFrequency(min, max);
  return res.json(skills);
});

export default router;

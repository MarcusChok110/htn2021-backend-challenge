import express from 'express';
import skillService from '../services/skillService';

const router = express.Router();

router.get('/', async (req, res) => {
  const { min_frequency, max_frequency } = req.query;
  const min = min_frequency ? Number(min_frequency) : 0;
  const max = max_frequency ? Number(max_frequency) : Infinity;
  const skills = await skillService.findAll();

  const skillMap = new Map<string, number>();

  // count all the frequencies
  for (const skill of skills) {
    const name = skill.getDataValue('name');
    const frequency = skillMap.get(name);
    if (!frequency) {
      skillMap.set(name, 1);
    } else {
      skillMap.set(name, frequency + 1);
    }
  }

  // convert map into array of [ {name, frequency}... ]
  let response = Array.from(skillMap, ([name, frequency]) => ({
    name,
    frequency,
  }));
  response = response.filter(
    ({ frequency }) => frequency >= min && frequency <= max
  );

  return res.json(response);
});

export default router;

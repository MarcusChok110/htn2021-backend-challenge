import express from 'express';
import skillService from '../services/skillService';
import userService from '../services/userService';

const router = express.Router();

router.get('/', async (_req, res) => {
  let response = [];
  const users = await userService.findAll();

  for (const user of users) {
    if (!user.id) continue;
    const skills = await skillService.findAllFromUser(user.id);
    response.push({
      ...user.get(),
      skills: skillService.extractSkills(skills),
    });
  }

  res.json(response);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const user = await userService.findOne(id);

  if (!user) {
    res.status(404).send('User not found');
    return;
  }
  const skills = await skillService.findAllFromUser(id);

  res.json({
    ...user.get(),
    skills: skillService.extractSkills(skills),
  });
});

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const fields = req.body;
  const { skills } = req.body;
  const user = await userService.findOne(id);

  if (!user) {
    res.status(404).send('User not found');
    return;
  }
  await userService.update(id, fields);
  await user.reload();

  // for loop in place of .map so await can be used
  for (const skill of skills) {
    await skillService.updateOrCreate(id, skill);
  }
  // update skills array with actual skill values from database
  const updatedSkills = await skillService.findAllFromUser(id);

  return res.json({
    ...user.get(),
    skills: skillService.extractSkills(updatedSkills),
  });
});

export default router;

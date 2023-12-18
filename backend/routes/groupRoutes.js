const express = require('express');
const Group = require('../models/Group');
const authMiddleware = require('../middlewares/authMiddleware');
const { assignSecretSantas } = require('../utils/secretSantaAssigner');

const router = express.Router();

router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    const admin = req.user.userId;

    let group = new Group({ name, admin, members: [{ member: admin, status: 'accepted' }] });
    await group.save();

    res.status(201).json(group);
  } catch (error) {
    res.status(500).send("Erreur du serveur");
  }
});

router.post('/invite', authMiddleware, async (req, res) => {
    const { email, groupName } = req.body;
    await sendInvitationEmail(email, groupName);
    res.send('Invitation envoyée');
  });  

router.post('/accept-invitation', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { groupId } = req.body; 
  
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).send('Groupe non trouvé');
        }
  
        const memberIndex = group.members.findIndex(member => member.member.toString() === userId);
        if (memberIndex === -1) {
            return res.status(404).send('Membre non trouvé dans le groupe');
        }
  
        group.members[memberIndex].status = 'accepted';
        await group.save();
  
        res.send('Invitation acceptée avec succès');
    } catch (error) {
        res.status(500).send("Erreur du serveur");
    }
});  

router.post('/decline-invitation', authMiddleware, async (req, res) => {
    try {
      const userId = req.user.userId;
      const { groupId } = req.body; 
  
      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).send('Groupe non trouvé');
      }
  
      const memberIndex = group.members.findIndex(member => member.member.toString() === userId);
      if (memberIndex === -1) {
        return res.status(404).send('Membre non trouvé dans le groupe');
      }
  
      group.members[memberIndex].status = 'declined';
      await group.save();
  
      res.send('Invitation refusée avec succès');
    } catch (error) {
      res.status(500).send("Erreur du serveur");
    }
});  

router.post('/assign-secret-santas/:groupId', authMiddleware, async (req, res) => {
    try {
      const groupId = req.params.groupId;
      const group = await Group.findById(groupId);
  
      if (!group) {
        return res.status(404).send('Groupe non trouvé');
      }
  
      if (group.members.some(member => member.status !== 'accepted')) {
        return res.status(400).send("Tous les membres n'ont pas accepté l\'invitation");
      }
  
      const memberIds = group.members.map(member => member.member.toString());
      const assignments = assignSecretSantas(memberIds);
  
      res.json(assignments);
    } catch (error) {
      res.status(500).send("Erreur du serveur");
    }
});

module.exports = router;

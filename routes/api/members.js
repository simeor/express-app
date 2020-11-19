const express = require('express');
const router = express.Router();
const members = require("../../Memebers")
const uuid = require('uuid');



//main route /api/members/
router.get("/", (req, res) => res.json(members));

//single member /api/members/:id
router.get("/:id", (req, res) => {
  const found = members.some(memeber => memeber.id === parseInt(req.params.id));
  if (found){
    res.json(members.filter(memeber => memeber.id === parseInt(req.params.id)));
  }else {
    res.status(400).json({msg: `memeber ${req.params.id} not found`})
  }
});

// create a memeber
router.post("/", (req, res) => {

  const newMemeber = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  }

  if(!newMemeber.name || !newMemeber.email){
    return res.status(400).json({msg: `please include email and name`});
  }

  members.push(newMemeber);
  res.json(members)
});


//update memeber
router.put("/:id", (req, res) => {
  const found = members.some(memeber => memeber.id === parseInt(req.params.id));
  if (found){
    const updateMember = req.body;
    members.forEach( (member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;

        res.json({msg: 'memeber updated' , member})
      }
    })
  } else {
    res.status(400).json({msg: `memeber ${req.params.id} not found`})
  }
});


// delete member
router.delete("/:id", (req, res) => {
  const found = members.some(memeber => memeber.id === parseInt(req.params.id));
  if (found){
    res.json({msg: "memeber deleted", members: members.filter(memeber => memeber.id !== parseInt(req.params.id))});
  }else {
    res.status(400).json({msg: `memeber ${req.params.id} not found`})
  }
});

module.exports = router;

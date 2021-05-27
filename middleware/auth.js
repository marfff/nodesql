const jwt = require('jsonwebtoken');
const db = require('../models/index');

module.exports = (req, res, next) => {
  // console.log(req.headers)
  const token = req.headers['authorization']?.split(' ')[1] || '';

  // console.log("TOKEN",token);

  jwt.verify(token, process.env.SECRET, {}, async (err, decoded) => {
    try {
      if (err) return res.status(500).json({ error: err.message });

      if (decoded) {
        const user = await db.Users.findOne({ where: { id: decoded.id } });
        req.user = user;
        next();
      } else {
        res.sendStatus(403);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

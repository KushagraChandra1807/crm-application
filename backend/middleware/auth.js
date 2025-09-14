const jwt = require('jsonwebtoken');
const User = require('../models/User');
module.exports = {
  authenticate: async (req,res,next) => {
    const header = req.header('Authorization');
    if(!header) return res.status(401).json({ message: 'No token' });
    const token = header.replace('Bearer ', '');
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
      req.user = await User.findById(data.id).select('-passwordHash');
      if(!req.user) return res.status(401).json({ message: 'Invalid token' });
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  },
  authorizeRole: (roles=[]) => (req,res,next) => {
    if(!roles.length) return next();
    if(!req.user) return res.status(403).json({ message: 'Forbidden' });
    if(!roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
    next();
  }
};

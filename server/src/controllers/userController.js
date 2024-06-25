const { User } = require('../models');

// 예시로 간단히 작성한 UserController
const createUser = async (req, res) => {
  try {
    const { user_id, user_name, user_email, user_address, user_password, platform_id } = req.body;
    const newUser = await User.create({
      user_id,
      user_name,
      user_email,
      user_address,
      user_password,
      platform_id,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

module.exports = {
  createUser,
};

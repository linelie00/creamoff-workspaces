const { Sequelize } = require('sequelize');
const User = require('../../models/User'); // User 모델 임포트

// 사용자 ID를 기반으로 사용자 정보를 조회하는 함수
const getUserById = async (platform_id, platform) => {
  try {
    const user = await User.findOne({
      where: {
        platform_id,
        platform,
      },
    });
    if (!user) {
      throw new Error('User not found.');
    }
    return user;
  } catch (error) {
    throw new Error(`Error fetching user by ID: ${error.message}`);
  }
};

// 사용자 생성 또는 조회 함수
const findOrCreateUser = async (userInfo) => {
  const [user, created] = await User.findOrCreate({
    where: { 
      platform_id: userInfo.platform_id,
      platform: userInfo.platform,
    },
    defaults: {
      user_name: userInfo.user_name,
      user_nickname: userInfo.user_nickname,
      user_email: userInfo.user_email,
      user_phone: userInfo.user_phone,
      user_address: '', // 기본값 설정
      created_at: Sequelize.literal('CURRENT_TIMESTAMP'), // 현재 시간으로 설정
      updated_at: Sequelize.literal('CURRENT_TIMESTAMP'), // 현재 시간으로 설정
    },
  });
  return user;
};

module.exports = {
  findOrCreateUser,
  getUserById,
};

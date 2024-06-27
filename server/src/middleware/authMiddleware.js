const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: '인증 토큰을 찾을 수 없습니다.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.user; // 해독된 사용자 정보를 요청 객체에 첨부
    next(); // 다음 미들웨어 또는 라우트 핸들러로 이동
  } catch (error) {
    console.error('JWT 검증 오류:', error);
    return res.status(403).json({ message: '접근 권한이 없습니다.' });
  }
};

module.exports = authMiddleware;

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./src/routes/authRoutes');
const petRoutes = require('./src/routes/petRoutes');
const storageRoutes = require('./src/routes/storageRoutes');
const beautyRoutes = require('./src/routes/beautyRoutes');

dotenv.config(); // .env 파일의 환경 변수 로드

const app = express();
app.set('port', process.env.PORT || 8282);

// 데이터베이스 연결
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error('데이터베이스 연결 실패:', err);
  });

// CORS 설정
app.use(cors({
  origin: process.env.BASE_URL, // 허용할 클라이언트 주소
  credentials: true  // 인증정보 (쿠키, 인증 헤더 등)를 전송할 수 있도록 허용
}));

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 라우트 설정
app.use('/api', authRoutes);
app.use('/api', petRoutes);
app.use('/api', storageRoutes);
app.use('/api', beautyRoutes);

// 서버 실행
app.listen(app.get('port'), () => {
  console.log(`${app.get('port')}번 포트에서 서버가 실행 중입니다.`);
});

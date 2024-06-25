const express = require('express');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors'); // cors 패키지를 추가

const { sequelize } = require('./models');
const authRoutes = require('./src/routes/authRoutes');

dotenv.config(); // .env 파일의 환경 변수 로드

const app = express();
app.set('port', process.env.PORT || 8282);

sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error('데이터베이스 연결 실패:', err);
  });

// CORS 설정
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true  // 인증정보 (쿠키, 인증 헤더 등)를 전송할 수 있도록 허용
}));

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// authRoutes 추가
app.use('/', authRoutes);

app.listen(app.get('port'), () => {
  console.log(`${app.get('port')}번 포트에서 서버가 실행 중입니다.`);
});

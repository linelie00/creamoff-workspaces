// init-db.js
const sequelize = require('./models').sequelize;
const User = require('./models/User');

sequelize.sync({ force: false }) // force: true로 설정하면 기존에 존재하는 테이블을 강제로 삭제하고 새로 생성합니다.
  .then(() => {
    console.log('테이블이 성공적으로 생성되었습니다.');
    process.exit(); // 작업 완료 후 프로세스 종료
  })
  .catch((err) => {
    console.error('테이블 생성 실패:', err);
    process.exit(); // 오류 발생 시 프로세스 종료
  });

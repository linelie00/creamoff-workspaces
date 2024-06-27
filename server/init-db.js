const sequelize = require('./models').sequelize;
const User = require('./models/User');

async function initializeDatabase() {
  try {
    await sequelize.authenticate(); // DB 연결 테스트
    console.log('DB 연결 성공!');

    // Force: true로 설정하면 기존 테이블을 삭제하고 새로 생성합니다.
    await sequelize.sync({ force: true });

    console.log('테이블이 성공적으로 생성되었습니다.');
    process.exit(); // 프로세스 종료
  } catch (error) {
    console.error('테이블 생성 실패:', error);
    process.exit(); // 오류 발생 시 프로세스 종료
  }
}

initializeDatabase();

const sequelize = require('./models').sequelize;
const User = require('./models/User');
const Authority = require('./models/Authority');
const UserAuthority = require('./models/UserAuthority');
const PetSpecies = require('./models/PetSpecies');
const PetBreed = require('./models/PetBreed');
const Pet = require('./models/Pet');
const PetDetailInfo = require('./models/PetDetailInfo');
const PetSpeciesInfoRS = require('./models/PetSpeciesInfoRS');
const PetDetailInfoStatus = require('./models/PetDetailInfoStatus');
const Community = require('./models/Community');
const CommunityTag = require('./models/CommunityTag');
const CommunityTagRS = require('./models/CommunityTagRS');
const Comment = require('./models/Comment');
const BeautyImage = require('./models/BeautyImage');
const Beauty = require('./models/Beauty');
const Saved = require('./models/Saved');
const BeautyTag = require('./models/BeautyTag');
const BeautyTagRS = require('./models/BeautyTagRS');
const BeautyImageRS = require('./models/BeautyImageRS');
const BeautyReview = require('./models/BeautyReview');
const BeautyWeight = require('./models/BeautyWeight');
const BeautyStyle = require('./models/BeautyStyle');
const BeautyPrice = require('./models/BeautyPrice');
const ReservationSpecialNote = require('./models/ReservationSpecialNote');
const Reservation = require('./models/Reservation');
const ReservationPriceRS = require('./models/ReservationPriceRS');
const PetSpeciesSpecialNote = require('./models/PetSpeciesSpecialNote');
const ReservationSpeciesSpecialNote = require('./models/ReservationSpeciesSpecialNote');
const NoticePart = require('./models/NoticePart');
const NoticeStatus = require('./models/NoticeStatus');
const NoticeStatusOfPart = require('./models/NoticeStatusOfPart');
const Notice = require('./models/Notice');
const LogLogin = require('./models/LogLogin');
const PathList = require('./models/PathList');
const LogVisitPath = require('./models/LogVisitPath');
const image = require('./models/Image');

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

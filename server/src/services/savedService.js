const Saved = require('../../models/Saved');
const Business = require('../../models/Business');

const registerSaved = async (id, platform, businessId) => {
    try {
        // findOrCreate를 사용하여 찜 항목을 검색하거나 새로 생성
        const [saved, created] = await Saved.findOrCreate({
            where: {
                platform_id: id,
                platform: platform,
                business_id: businessId,
            },
            defaults: {
                platform_id: id,
                platform: platform,
                business_id: businessId,
            },
        });

        if (!created) {
            // 이미 존재하는 경우 메시지를 반환
            return { message: '이미 찜한 업체입니다.' };
        }

        // 새로 생성된 경우 레코드 반환
        return saved;
    } catch (error) {
        throw new Error(`Failed to save business: ${error.message}`);
    }
};

const getSaved = async (id, platform) => {
    try {
        // 사용자 ID와 플랫폼을 기반으로 찜 목록을 조회
        const savedId = await Saved.findAll({
            where: {
                platform_id: id,
                platform: platform,
            },
            attributes: ['business_id'],
        });

        const saved = await Business.findAll({
            where: {
                id: savedId.map((item) => item.business_id),
            },
            attributes: ['id', 'name', 'location'],
        });

        return saved;
    } catch (error) {
        throw new Error(`Failed to get saved businesses: ${error.message}`);
    }
};

module.exports = {
    registerSaved,
    getSaved,
};
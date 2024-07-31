const Business = require('../../models/Business');
const Image = require('../../models/Image');
const BeautyTag = require('../../models/BeautyTag');
const BeautyTagRS = require('../../models/BeautyTagRS');

// 특정 카테고리의 모든 업체의 이름, 위치, 메인 이미지를 가져오는 함수
const getBusinessesByCategory = async (category) => {
    try {
        const businesses = await Business.findAll({
            where: { category },
            attributes: ['id', 'name', 'location'],
            include: [{
                model: Image,
                as: 'images',
                where: { image_type: 'main' },
                attributes: ['endpoint']
            }]
        });
        return businesses;
    } catch (error) {
        throw new Error('Failed to fetch businesses by category');
    }
};

// 특정 아이디의 사업자명, 사업자아이디, 대표명을 제외한 정보를 가지고 오는 함수
const getBusinessDetailsById = async (id) => {
    try {
        const business = await Business.findOne({
            where: { id },
            attributes: {
                exclude: ['business_registration_name', 'business_registration_number', 'business_owner']
            }
        });
        const images = await Image.findAll({
            where: { business_id: id },
        });
        business.dataValues.images = images;
        if (!business) {
            throw new Error('Business not found');
        }
        return business;
    } catch (error) {
        throw new Error('Failed to fetch business details');
    }
};

// 새로운 업체를 생성하는 함수
const createBusiness = async (businessInfo) => {
    try {
        const business = await Business.create({
            id: businessInfo.id,
            category: 'beauty',
            platform_id: 'id',
            platform: 'kakao',
            name: businessInfo.name,
            location: businessInfo.location,
            weekday_open_time: '00:00:00',
            weekday_close_time: '00:00:00',
            weekend_open_time: '00:00:00',
            weekend_close_time: '00:00:00',
            dayon: businessInfo.dayon,
            dayoff: businessInfo.dayoff,
            store_number: businessInfo.store_number,
            contents: businessInfo.contents,
            business_registration_name: businessInfo.business_registration_name,
            business_registration_number: businessInfo.business_registration_number,
            business_owner: businessInfo.business_owner,
            email: businessInfo.email,
            phone: businessInfo.phone,
            created_at: new Date(),
            updated_at: new Date(),
        });
        processAndSaveTags(businessInfo.species, business.id);
        return business;
    } catch (error) {
        throw new Error('Failed to create business', error.message);
    }
};

// 업체 정보를 수정하는 함수
const updateBusiness = async (id, updateInfo) => {
    try {
        const business = await Business.update(updateInfo, {
            where: { id }
        });
        if (business[0] === 0) {
            throw new Error('Business not found or no changes made');
        }
        return await Business.findOne({ where: { id } });
    } catch (error) {
        throw new Error('Failed to update business');
    }
};

const processAndSaveTags = async (species, beautyId) => {
    try {
        // species 값을 띄어쓰기를 제거하고 쉼표로 나눕니다.
        const tags = species.replace(/\s/g, '').split(',');

        for (const tagName of tags) {
            // 태그가 이미 존재하는지 확인
            let tag = await BeautyTag.findOne({ where: { tag_name: tagName } });

            if (!tag) {
                // 태그가 존재하지 않으면 새 태그 생성
                tag = await BeautyTag.create({ tag_name: tagName });
            }

            // 태그-업체 관계 저장
            await BeautyTagRS.create({
                beauty_id: beautyId,
                tag_id: tag.tag_id,
            });
        }
    } catch (error) {
        console.error('Error processing and saving tags:', error);
        throw new Error('Failed to process and save tags');
    }
};

module.exports = {
    getBusinessesByCategory,
    getBusinessDetailsById,
    createBusiness,
    updateBusiness
};
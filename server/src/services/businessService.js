const Business = require('../../models/Business');
const Image = require('../../models/Image');

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
            category: '1',
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

module.exports = {
    getBusinessesByCategory,
    getBusinessDetailsById,
    createBusiness,
    updateBusiness
};
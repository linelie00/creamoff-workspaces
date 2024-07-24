const Beauty = require('../models/Beauty');
const BeautyImage = require('../models/BeautyImage');
const BeautyImageRS = require('../models/BeautyImageRS');

// 모든 업체의 이미지, 이름, 위치를 불러오는 기능
const getAllBusinesses = async () => {
    try {
        const businesses = await Beauty.findAll({
            attributes: ['beauty_id', 'beauty_name', 'location'],
            include: [{
                model: BeautyImage,
                attributes: ['image_url'],
            }],
        });
        return businesses;
    } catch (error) {
        throw new Error('Failed to fetch businesses');
    }
};

// 특정 업체의 모든 정보를 불러오는 기능
const getBusinessById = async (id) => {
    try {
        const business = await Beauty.findOne({
            where: { beauty_id: id },
            include: [{
                model: BeautyImage,
                attributes: ['image_url'],
            }],
        });
        const images = await BeautyImageRS.findAll({
            where: { beauty_id: id },
            include: [{
                model: BeautyImage,
                attributes: ['image_url'],
            }],
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

// 업체 생성
const createBusiness = async (businessInfo) => {
    try {
        const business = await Beauty.create({
            beauty_name: businessInfo.beauty_name,
            location: businessInfo.location,
            grade: businessInfo.grade,
            weekday_open_time: businessInfo.weekday_open_time,
            weekday_close_time: businessInfo.weekday_close_time,
            weekend_open_time: businessInfo.weekend_open_time,
            weekend_close_time: businessInfo.weekend_close_time,
            dayoff: businessInfo.dayoff,
            phone: businessInfo.phone,
            contact_number: businessInfo.contact_number,
            description: businessInfo.description,
            created_at: new Date(),
            updated_at: new Date(),
        });
        return business;
    } catch (error) {
        throw new Error('Failed to create business');
    }
};

module.exports = {
    getAllBusinesses,
    getBusinessById,
    createBusiness,
};

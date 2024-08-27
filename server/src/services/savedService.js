const Saved = require('../../models/Saved');

const registerSaved = async (id, platform, businessId) => {
    try {
        const saved = await Saved.create({
            platform_id: id,
            platform: platform,
            business_id: businessId,
        });
        return saved;
    } catch (error) {
        throw new Error(`Failed to save business: ${error.message}`);
    }
};

module.exports = {
    registerSaved,
};
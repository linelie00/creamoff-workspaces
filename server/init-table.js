const { Sequelize } = require('sequelize');
const sequelize = require('./models').sequelize; // 적절한 경로로 수정하세요
const PetWeight = require('./models/PetWeight'); // 모델 파일 경로를 적절하게 수정하세요
const BeautyOption = require('./models/BeautyOption'); // 모델 파일 경로를 적절하게 수정하세요
const BeautyPrice = require('./models/BeautyPrice'); // 모델 파일 경로를 적절하게 수정하세요
const PetSpecies = require('./models/PetSpecies');
const PetBreed = require('./models/PetBreed');

async function initPetSpecies() {
    const petSpecies = [
        { species: '강아지' },
        { species: '고양이' },
    ];

    try {
        await PetSpecies.bulkCreate(petSpecies);
        console.log('Pet species inserted successfully.');
    } catch (error) {
        console.error('Error inserting pet species:', error);
    } finally {
        await sequelize.close();
    }
}

async function initPetBreeds() {
    const petBreeds = [
        { breed: '말티즈', pet_species: 1 },
        { breed: '푸들', pet_species: 1 },
        { breed: '시츄', pet_species: 1 },
        { breed: '요크셔테리어', pet_species: 1 },
        { breed: '비숑프리제', pet_species: 1 },
        { breed: '포메라니안', pet_species: 1 },
        { breed: '닥스훈트', pet_species: 1 },
        { breed: '치와와', pet_species: 1 },
        { breed: '시바견', pet_species: 1 },
        { breed: '웰시코기', pet_species: 1 },
        { breed: '골든리트리버', pet_species: 1 },
        { breed: '시베리안허스키', pet_species: 1 },
        { breed: '말라뮤트', pet_species: 1 },
        { breed: '보더콜리', pet_species: 1 },
        { breed: '코리안숏헤어', pet_species: 2 },
        { breed: '러시안블루', pet_species: 2 },
        { breed: '스코티쉬폴드', pet_species: 2 },
        { breed: '먼치킨', pet_species: 2 },
        { breed: '시암', pet_species: 2 },
        { breed: '뱅갈', pet_species: 2 },
        { breed: '페르시안', pet_species: 2 },
        { breed: '스핑크스', pet_species: 2 },
        { breed: '아비시니안', pet_species: 2 },
        { breed: '메인쿤', pet_species: 2 },
        { breed: '노르웨이숲', pet_species: 2 },
        { breed: '먼치킨', pet_species: 2 },
    ];

    try {
        await PetBreed.bulkCreate(petBreeds);
        console.log('Pet breeds inserted successfully.');
    } catch (error) {
        console.error('Error inserting pet breeds:', error);
    } finally {
        await sequelize.close();
    }
}

async function insertPetWeights() {
    const petWeights = [
        // 강아지 - 소형견
        { size_category: '소형견', min_weight: 0, max_weight: 10, pet_species: 1 },
        // 강아지 - 중형견
        { size_category: '중형견', min_weight: 10, max_weight: 25, pet_species: 1 },
        // 강아지 - 대형견
        { size_category: '대형견', min_weight: 25, max_weight: 45, pet_species: 1 },
        // 강아지 - 초대형견
        { size_category: '초대형견', min_weight: 45, max_weight: 90, pet_species: 1 },

        // 고양이 - 소형묘
        { size_category: '소형묘', min_weight: 0, max_weight: 4, pet_species: 2 },
        // 고양이 - 중형묘
        { size_category: '중형묘', min_weight: 4, max_weight: 6, pet_species: 2 },
        // 고양이 - 대형묘
        { size_category: '대형묘', min_weight: 6, max_weight: 10, pet_species: 2 },
    ];

    try {
        // 데이터 삽입
        await PetWeight.bulkCreate(petWeights);
        console.log('Pet weights inserted successfully.');
    } catch (error) {
        console.error('Error inserting pet weights:', error);
    } finally {
        await sequelize.close(); // 연결 종료
    }
}

async function initBeautyOptions() {
    const beautyOptions = [
        { option: '전체미용', type: 0 },
        { option: '부분미용', type: 0 },
        { option: '스포팅', type: 0 },
        { option: '가위컷', type: 0 },
        { option: '썸머컷', type: 0 },
        { option: '목욕', type: 1 },
        { option: '위생', type: 1 },
        { option: '피부병', type: 2 },
        { option: '심장질환', type: 2 },
        { option: '마킹', type: 2 },
        { option: '마운팅', type: 2 },
        { option: '슬개골 탈구', type: 2 },
    ];

    try {
        await BeautyOption.bulkCreate(beautyOptions);
        console.log('Beauty options inserted successfully.');
    } catch (error) {
        console.error('Error inserting beauty options:', error);
    } finally {
        await sequelize.close();
    }
}

async function initBeautyPrices() {
    const beautyPrices = [
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 1, style_id: 1, price: 50000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 2, style_id: 1, price: 60000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 3, style_id: 1, price: 70000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 4, style_id: 1, price: 80000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 5, style_id: 1, price: 30000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 6, style_id: 1, price: 40000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 7, style_id: 1, price: 50000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 1, style_id: 2, price: 60000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 2, style_id: 2, price: 70000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 3, style_id: 2, price: 80000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 4, style_id: 2, price: 90000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 5, style_id: 2, price: 40000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 6, style_id: 2, price: 50000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 7, style_id: 2, price: 60000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 1, style_id: 3, price: 70000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 2, style_id: 3, price: 80000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 3, style_id: 3, price: 90000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 4, style_id: 3, price: 100000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 5, style_id: 3, price: 50000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 6, style_id: 3, price: 60000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 7, style_id: 3, price: 70000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 1, style_id: 4, price: 80000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 2, style_id: 4, price: 90000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 3, style_id: 4, price: 100000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 4, style_id: 4, price: 110000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 5, style_id: 4, price: 60000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 6, style_id: 4, price: 70000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 7, style_id: 4, price: 80000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 1, style_id: 5, price: 30000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 2, style_id: 5, price: 40000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 3, style_id: 5, price: 50000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 4, style_id: 5, price: 60000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 5, style_id: 5, price: 20000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 6, style_id: 5, price: 30000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 7, style_id: 5, price: 40000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 1, style_id: 6, price: 40000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 2, style_id: 6, price: 50000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 3, style_id: 6, price: 60000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 4, style_id: 6, price: 70000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 5, style_id: 6, price: 30000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 6, style_id: 6, price: 40000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 7, style_id: 6, price: 50000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 1, style_id: 7, price: 10000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 2, style_id: 7, price: 10000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 3, style_id: 7, price: 10000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 4, style_id: 7, price: 10000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 5, style_id: 7, price: 10000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 6, style_id: 7, price: 10000 },
        { beauty_id: '88811167-34b9-4d86-bb55-10cab5feaf26', weight_id: 7, style_id: 7, price: 10000 },
    ];

    try {
        await BeautyPrice.bulkCreate(beautyPrices);
        console.log('Beauty prices inserted successfully.');
    }
    catch (error) {
        console.error('Error inserting beauty prices:', error);
    }
    finally {
        await sequelize.close();
    }
}

initPetSpecies();
initPetBreeds();
//insertPetWeights();
//initBeautyOptions();
//initBeautyPrices();
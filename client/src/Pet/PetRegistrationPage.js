import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/pet.css';
import RadioButton from './RadioButton'; // RadioButton 컴포넌트 import

const PetRegistration = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // URL에서 이벤트 ID 가져오기
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/list/arrow_left.svg`;
    const petImgUrl = `${process.env.PUBLIC_URL}/images/pet/pet_img_L.png`;
    const photoUrl = `${process.env.PUBLIC_URL}/images/pet/photo.svg`;

    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        birthDate: '',
        weight: '',
        gender: '',
        vaccination: '',
        neutered: '',
        grooming: '',
        biting: '',
        patellarLuxation: '',
        additionalInfo: '',
        etc: ''
    });

    const goBack = () => {
        navigate(-1); // 뒤로 가기
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRadioSelect = (key, value) => {
        setFormData({
            ...formData,
            [key]: value,
        });
    };

    // 각 옵션 배열
    const genderOptions = [
        { label: '남자', value: '남자' },
        { label: '여자', value: '여자' },
    ];

    const vaccinationOptions = [
        { label: '했어요', value: '했어요' },
        { label: '안했어요', value: '안했어요' },
    ];

    const neuteredOptions = [
        { label: '했어요', value: '했어요' },
        { label: '안했어요', value: '안했어요' },
    ];

    const groomingOptions = [
        { label: '있어요', value: '있어요' },
        { label: '없어요', value: '없어요' },
    ];

    const bitingOptions = [
        { label: '있어요', value: '있어요' },
        { label: '없어요', value: '없어요' },
    ];

    const patellarLuxationOptions = [
        { label: '있어요', value: '있어요' },
        { label: '없어요', value: '없어요' },
    ];

    const additionalInfoOptions = [
        { label: '있어요', value: '있어요' },
        { label: '없어요', value: '없어요' },
    ];

    return (
        <div lang='ko'>
            <div className='r-mid'>
                <div className='navigation'>
                    <button>
                        <img src={arrowButtonUrl} alt='' onClick={goBack} />
                    </button>
                    펫 등록
                    <div></div>
                </div>
                <div className='re-mid'>
                    <div className='PetRegistration-container'>
                        <input
                            type="text"
                            className="textbox"
                            placeholder="이름이 무엇인가요?"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='PetRegistration-img-container'>
                        <div className='PetRegistration-content'>
                            <div>
                                <img src={petImgUrl} alt=''/>
                            </div>
                            <div className='photo'>
                                <img src={photoUrl} alt=''/>
                            </div>
                        </div>
                    </div>
                    <div className='PetRegistration-container'>
                        <input
                            type="text"
                            className="textbox-gray"
                            placeholder="종을 적어주세요"
                            name="breed"
                            value={formData.breed}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='PetRegistration-container2'>
                        <p>태어난 날</p>
                        <div className='PetRegistration-container'>
                            <input
                                type="text"
                                className="textbox-gray"
                                placeholder="YY/MM/DD"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className='PetRegistration-container2'>
                        <p>몸무게</p>
                        <div className='PetRegistration-container'>
                            <input
                                type="text"
                                className="textbox-gray"
                                placeholder="0.0kg"
                                name="weight"
                                value={formData.weight}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div>
                        <div className='PetRegistration-container2'>
                            <p>성별은</p>
                            <RadioButton
                                options={genderOptions}
                                selectedOption={formData.gender}
                                onSelect={(value) => handleRadioSelect('gender', value)}
                            />
                        </div>
                        <div className='PetRegistration-container2'>
                            <p>예방접종을</p>
                            <RadioButton
                                options={vaccinationOptions}
                                selectedOption={formData.vaccination}
                                onSelect={(value) => handleRadioSelect('vaccination', value)}
                            />
                        </div>
                        <div className='PetRegistration-container2'>
                            <p>중성화를</p>
                            <RadioButton
                                options={neuteredOptions}
                                selectedOption={formData.neutered}
                                onSelect={(value) => handleRadioSelect('neutered', value)}
                            />
                        </div>
                        <div className='PetRegistration-container2'>
                            <p>미용경험이</p>
                            <RadioButton
                                options={groomingOptions}
                                selectedOption={formData.grooming}
                                onSelect={(value) => handleRadioSelect('grooming', value)}
                            />
                        </div>
                        <div className='PetRegistration-container2'>
                            <p>입질이</p>
                            <RadioButton
                                options={bitingOptions}
                                selectedOption={formData.biting}
                                onSelect={(value) => handleRadioSelect('biting', value)}
                            />
                        </div>
                        <div className='PetRegistration-container2'>
                            <p>슬개골탈구가</p>
                            <RadioButton
                                options={patellarLuxationOptions}
                                selectedOption={formData.patellarLuxation}
                                onSelect={(value) => handleRadioSelect('patellarLuxation', value)}
                            />
                        </div>
                        <div className='PetRegistration-container2'>
                            <p>기타 추가 사항이</p>
                            <RadioButton
                                options={additionalInfoOptions}
                                selectedOption={formData.additionalInfo}
                                onSelect={(value) => handleRadioSelect('additionalInfo', value)}
                            />
                        </div>
                        <div className='PetRegistration-container2'>
                        <input
                            type="text"
                            className="textbox-gray2"
                            placeholder="예) 피부병,심장질환,마킹,마운팅 등"
                            name="etc"
                            value={formData.etc}
                            onChange={handleInputChange}
                        />
                        </div>
                    </div>
                    <div className='Nbutton3' onClick={() => navigate('/pet-list')}>등록하기</div>
                </div>
            </div>
        </div>
    );
};

export default PetRegistration;

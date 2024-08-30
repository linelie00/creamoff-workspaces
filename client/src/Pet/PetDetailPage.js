import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../Api';

const PetDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // URL에서 펫 ID 가져오기
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/list/arrow_left.svg`;
    const defaultPetImgUrl = `${process.env.PUBLIC_URL}/images/pet/pet_img_L.png`;
    const noteUrl = `${process.env.PUBLIC_URL}/images/list/note_ic.svg`;
    const [petData, setPetData] = useState(null);

    useEffect(() => {
        const fetchPetData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found.');
                }
                const response = await api.get(`/api/pet/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setPetData(response.data);
                console.log('펫 데이터:', response.data);
            } catch (error) {
                console.error('펫 데이터 가져오기 에러:', error);
            }
        };
        fetchPetData();
    }, [id]);

    const goBack = () => {
        navigate(-1);
    };

    const handleEdit = () => {
        navigate(`/pet-edit/${id}`);
    };

    if (!petData) {
        return <div>Loading...</div>;
    }

    return (
        <div lang='ko'>
            <div className='r-mid'>
                <div className='navigation'>
                    <button onClick={goBack}>
                        <img src={arrowButtonUrl} alt='뒤로가기' />
                    </button>
                    펫 등록정보
                    <div>
                        <button onClick={handleEdit}>
                            <img src={noteUrl} alt='' />
                        </button>
                    </div>
                </div>
                <div className='re-mid'>
                    <div className='PetRegistration-container'>
                        <input
                            type="text"
                            className="textbox"
                            value={petData.pet_name || ''}
                            readOnly
                        />
                    </div>
                    <div className='PetRegistration-img-container'>
                        <div className='PetRegistration-content'>
                            <div className='upload-img'>
                                <img src={petData.image || defaultPetImgUrl} alt='펫 이미지' />
                            </div>
                        </div>
                    </div>
                    <div className='PetRegistration-container2'>
                        <p>종류</p>
                        <input
                            type="text"
                            className="textbox-gray"
                            value={petData.species || ''}
                            readOnly
                        />
                    </div>
                    <div className='PetRegistration-container2'>
                        <p>품종</p>
                        <input
                            type="text"
                            className="textbox-gray"
                            value={petData.breed || ''}
                            readOnly
                        />
                    </div>
                    <div className='PetRegistration-container2'>
                        <p>태어난 날</p>
                        <input
                            type="text"
                            className="textbox-gray"
                            value={petData.pet_birth || ''}
                            readOnly
                        />
                    </div>
                    <div className='PetRegistration-container2'>
                        <p>몸무게</p>
                        <input
                            type="text"
                            className="textbox-gray"
                            value={`${petData.pet_weight || ''}kg`}
                            readOnly
                        />
                    </div>
                    <div className='PetRegistration-container2'>
                        <p>성별</p>
                        <input
                            type="text"
                            className="textbox-gray"
                            value={petData.pet_gender === 1 ? '남자' : '여자'}
                            readOnly
                        />
                    </div>
                    {petData.details && petData.details.map((detail, index) => (
                        <div key={index} className='PetRegistration-container2'>
                            <p>{detail.option}</p>
                            <input
                                type="text"
                                className="textbox-gray"
                                value={detail.value ? '예' : '아니오'}
                                readOnly
                            />
                        </div>
                    ))}
                    <div className='PetRegistration-container2'>
                        <p>기타 추가 사항</p>
                        <input
                            type="text"
                            className="textbox-gray2"
                            value={petData.pet_etc || ''}
                            readOnly
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetDetail;

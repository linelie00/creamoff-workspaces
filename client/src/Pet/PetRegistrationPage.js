import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/pet.css';
import '../styles/autoComplete.css';
import axios from 'axios';
import _ from 'lodash';
import RadioButton from './RadioButton';

const PetRegistration = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // URL에서 이벤트 ID 가져오기

    // 이미지 URL
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/list/arrow_left.svg`;
    const petImgUrl = `${process.env.PUBLIC_URL}/images/pet/pet_img_L.png`;
    const photoUrl = `${process.env.PUBLIC_URL}/images/pet/photo.svg`;

    // 상태 변수
    const [formData, setFormData] = useState({
        name: '', // 초기값 설정
        species: '',
        speciesId: '',
        breed: '',
        birthDate: '',
        weight: '',
        gender: '',
        additionalInfo: '',
        etc: '',
    });
    const [speciesDetails, setSpeciesDetails] = useState([]); // 종 정보
    const [petSpecies, setPetSpecies] = useState([]); // 펫 종류 리스트
    const [speciesInputValue, setSpeciesInputValue] = useState(''); // 종류 입력값
    const [speciesSuggestions, setSpeciesSuggestions] = useState([]); // 종류 자동완성 리스트
    const [breeds, setBreeds] = useState([]); // 품종 리스트
    const [breedsInputValue, setBreedsInputValue] = useState(''); // 품종 입력값
    const [breedsSuggestions, setBreedsSuggestions] = useState([]); // 품종 자동완성 리스트

    // 펫 종류 데이터 가져오기
    useEffect(() => {
        const fetchPetSpecies = async () => {
            try {
                const response = await axios.get('http://localhost:8282/api/pet/pet-species');
                console.log(response.data);
                setPetSpecies(response.data);
            } catch (error) {
                console.error('데이터 가져오기 에러:', error);
            }
        };
        fetchPetSpecies();
    }, []);

    // 종 입력 필드 변화 처리
    const handleSpeciesInputChange = (e) => {
        const value = e.target.value;
        setSpeciesInputValue(value);

        if (value.trim().length !== 0) {
            const filteredSpecies = petSpecies.filter(species =>
                species.species.toLowerCase().includes(value.toLowerCase())
            );
            setSpeciesSuggestions(filteredSpecies);
        } else {
            setSpeciesSuggestions([]);
        }
    };

    // 사용자가 특정 종을 선택했을 때만 호출
    const handleSuggestionClick = async (speciesItem) => {
        setSpeciesInputValue(speciesItem.species);
        setSpeciesSuggestions([]);
        setFormData(prevFormData => ({
            ...prevFormData,
            species: speciesItem.species,
            speciesId: speciesItem.id
        }));

        try {
            console.log('종 세부 정보 가져오기:', speciesItem.id);
            const response = await axios.get('http://localhost:8282/api/pet/pet-options', {
                params: { species: speciesItem.id }
            });
            setSpeciesDetails(response.data);
            console.log('종 세부 정보:', response.data);
        } catch (error) {
            console.error('종 세부 정보 가져오기 에러: ', error);
        }

        fetchBreeds(speciesItem.id); // 종 선택 시 품종 데이터도 가져오기
    };

    // 품종 데이터 가져오기
    const fetchBreeds = useCallback(async (speciesId) => {
        try {
            const response = await axios.get(`http://localhost:8282/api/pet/auto-complete/breeds`, {
                params: { species: speciesId }
            });
            console.log('품종 가져오기:', response.data);
            setBreeds(response.data);
            setBreedsSuggestions(response.data);
        } catch (error) {
            console.error('품종 가져오기 에러: ', error);
        }
    }, []);

    // 품종 입력 변화 처리
    const handleBreedInputChange = (e) => {
        const value = e.target.value;
        setBreedsInputValue(value);

        if (value.trim().length === 0) {
            setBreedsSuggestions([]);
        } else {
            const filteredBreeds = breeds.filter(breed =>
                breed.toLowerCase().includes(value.toLowerCase())
            );
            setBreedsSuggestions(filteredBreeds);
        }
    };

    // 품종 클릭 처리
    const handleBreedClick = (breed) => {
        console.log('선택된 품종:', breed);
        setBreedsInputValue(breed);
        setFormData(prevFormData => ({
            ...prevFormData,
            breed
        }));
        setBreedsSuggestions([]);
    };

    // 뒤로 가기 버튼 클릭 시
    const goBack = () => {
        navigate(-1); // 뒤로 가기
    };

    // 입력 필드 변화 처리
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // 라디오 버튼 선택 처리
    const handleRadioSelect = (key, value) => {
        setFormData({
            ...formData,
            [key]: value,
        });
    };

    // 폼 제출 처리
    const handleSubmit = async () => {
        const petData = {
            name: formData.name,
            species: formData.species,
            breed: formData.breed,
            birthDate: formData.birthDate,
            weight: formData.weight,
            gender: formData.gender,
            details: speciesDetails.map((detail) => ({
                id: detail.optionId, // 'detail.id' 대신 'detail.optionId' 사용
                value: formData[detail.option] === 'true' ? 1 : 0 // formData에 따른 value
            })),
            additionalInfo: formData.additionalInfo,
            etc: formData.etc,
        };
        console.log('펫 데이터:', petData);
        try {
            await axios.post('http://localhost:8282/api/register-pet', petData);
            navigate('/pet-list');
        } catch (error) {
            console.error('펫 정보 저장 에러: ', error);
        }
    };    

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
                    <div className='PetRegistration-container2'>
                        <p>종류</p>
                        <div style={{ position: 'relative', zIndex: 1 }} className='PetRegistration-container'>
                            <input
                                type="text"
                                className="textbox-gray"
                                value={speciesInputValue}
                                placeholder="종을 적어주세요. (ex. 강아지, 고양이 등)"
                                onChange={handleSpeciesInputChange}
                            />
                            {speciesSuggestions.length > 0 && (
                                <ul style={{ zIndex: -1 }} className="auto-complete-component">
                                    {speciesSuggestions.map((speciesItem, index) => (
                                        <li key={index} onClick={() => handleSuggestionClick(speciesItem)}>
                                            {speciesItem.species}  {/* speciesItem 객체의 species 필드를 렌더링 */}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className='PetRegistration-container2'>
                        <p>품종</p>
                        <div style={{ position: 'relative', zIndex: 1 }} className='PetRegistration-container'>
                            <input
                                type="text"
                                className="textbox-gray"
                                placeholder="품종을 적어주세요. (ex. 말티즈, 믹스 등)"
                                name="breed"
                                value={breedsInputValue}
                                onChange={handleBreedInputChange} // 변경된 부분
                            />
                            {breedsInputValue.trim() !== '' && breedsSuggestions.length > 0 && (
                                <ul style={{ position: 'absolute', top: '70%', zIndex: 1 }} className="auto-complete-component">
                                    {breedsSuggestions.map((breed, index) => (
                                        <li key={index} onClick={() => handleBreedClick(breed)}>
                                            {breed}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
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
                                options={[
                                    { label: '남자', value: '남자' },
                                    { label: '여자', value: '여자' },
                                ]}
                                selectedOption={formData.gender}
                                onSelect={(value) => handleRadioSelect('gender', value)}
                            />
                        </div>
                        {speciesDetails.map((detail, index) => (
                            <div key={index} className='PetRegistration-container2'>
                                <p>{detail.option}</p>
                                <RadioButton
                                    options={[
                                        { label: detail.true, value: 'true' },
                                        { label: detail.false, value: 'false' }
                                    ]}
                                    selectedOption={formData[detail.option]}
                                    onSelect={(value) => handleRadioSelect(detail.option, value)}
                                />
                            </div>
                        ))}
                        <div className='PetRegistration-container2'>
                            <p>기타 추가 사항이</p>
                            <RadioButton
                                options={[
                                    { label: '있어요', value: 'true' },
                                    { label: '없어요', value: 'false' }
                                ]}
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
                    <div className='Nbutton3' onClick={handleSubmit}>등록하기</div>
                </div>
            </div>
        </div>
    );
};

export default PetRegistration;
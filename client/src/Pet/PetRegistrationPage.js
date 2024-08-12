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

    // 이미지 URL 및 상태 변수
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/list/arrow_left.svg`;
    const defaultPetImgUrl = `${process.env.PUBLIC_URL}/images/pet/pet_img_L.png`;
    const photoUrl = `${process.env.PUBLIC_URL}/images/pet/photo.svg`;
    const [petImgUrl, setPetImgUrl] = useState(defaultPetImgUrl); // 이미지 URL 상태
    const [selectedImageFile, setSelectedImageFile] = useState(null); // 선택된 이미지 파일

    const [formData, setFormData] = useState({
        name: '',
        species: '',
        speciesId: '',
        breed: '',
        breedId: '',
        birthDate: '',
        weight: '',
        gender: '',
        additionalInfo: '',
        etc: '',
    });
    const [speciesDetails, setSpeciesDetails] = useState([]);
    const [petSpecies, setPetSpecies] = useState([]);
    const [speciesInputValue, setSpeciesInputValue] = useState('');
    const [speciesSuggestions, setSpeciesSuggestions] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [breedsInputValue, setBreedsInputValue] = useState('');
    const [breedsSuggestions, setBreedsSuggestions] = useState([]);

    useEffect(() => {
        const fetchPetSpecies = async () => {
            try {
                const response = await axios.get('http://localhost:8282/api/pet/pet-species');
                setPetSpecies(response.data);
            } catch (error) {
                console.error('데이터 가져오기 에러:', error);
            }
        };
        fetchPetSpecies();
    }, []);

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

    const handleBreedInputChange = (e) => {
        const value = e.target.value;
        setBreedsInputValue(value);

        if (value.trim().length !== 0) {
            const filteredBreeds = breeds.filter(breed =>
                breed.breed && breed.breed.toLowerCase().includes(value.toLowerCase())
            );
            setBreedsSuggestions(filteredBreeds);
        } else {
            setBreedsSuggestions([]);
        }
    };

    const handleSuggestionClick = async (speciesItem) => {
        setSpeciesInputValue(speciesItem.species);
        setSpeciesSuggestions([]);
        setFormData(prevFormData => ({
            ...prevFormData,
            species: speciesItem.species,
            speciesId: speciesItem.id
        }));

        try {
            const response = await axios.get('http://localhost:8282/api/pet/pet-options', {
                params: { species: speciesItem.id }
            });
            setSpeciesDetails(response.data);
        } catch (error) {
            console.error('종 세부 정보 가져오기 에러: ', error);
        }

        fetchBreeds(speciesItem.id);
    };

    const fetchBreeds = useCallback(async (speciesId) => {
        try {
            const response = await axios.get(`http://localhost:8282/api/pet/auto-complete/breeds`, {
                params: { species: speciesId }
            });
            setBreeds(response.data);
            setBreedsSuggestions(response.data);
        } catch (error) {
            console.error('품종 가져오기 에러: ', error);
        }
    }, []);

    const handleBreedClick = (breed) => {
        setBreedsInputValue(breed.breed);
        setFormData(prevFormData => ({
            ...prevFormData,
            breed: breed.breed,
            breedId: breed.id
        }));
        setBreedsSuggestions([]);
    };

    const goBack = () => {
        navigate(-1);
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

    // 이미지 업로드 처리
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPetImgUrl(reader.result); // 미리보기 이미지 설정
                setSelectedImageFile(file); // 이미지 파일 저장
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        const petData = new FormData();
        petData.append('name', formData.name);
        petData.append('species', formData.speciesId);
        petData.append('breed', formData.breedId);
        petData.append('birthDate', formData.birthDate);
        petData.append('weight', formData.weight);
        petData.append('gender', formData.gender === '남자' ? 1 : 0);
        petData.append('etc', formData.additionalInfo === 'true' ? formData.etc : '');
    
        if (selectedImageFile) {
            petData.append('image', selectedImageFile); // 이미지 파일 추가
        }
    
        speciesDetails.forEach((detail, index) => {
            petData.append(`details[${index}][id]`, detail.optionId);
            petData.append(`details[${index}][value]`, formData[detail.option] === 'true' ? 1 : 0);
        });
    
        // FormData 내용 확인
        for (let pair of petData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
    
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found.');
            }
            const response = await axios.post('http://localhost:8282/api/pet/register-pet', petData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data', // multipart/form-data 형식으로 전송
                },
            });
            console.log('Upload successful', response.data);
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
                            <div className='upload-img'>
                                {/* 업로드된 이미지를 미리보기로 표시 */}
                                <img src={petImgUrl} alt=''/>
                            </div>
                            <div className='photo'>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                    id="imageUpload"
                                />
                                <label htmlFor="imageUpload">
                                    <img src={photoUrl} alt='' style={{ cursor: 'pointer' }} />
                                </label>
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
                                            {speciesItem.species}
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
                                onChange={handleBreedInputChange}
                            />
                            {breedsInputValue.trim() !== '' && breedsSuggestions.length > 0 && (
                                <ul style={{ position: 'absolute', top: '70%', zIndex: 1 }} className="auto-complete-component">
                                    {breedsSuggestions.map((breed, index) => (
                                        <li key={index} onClick={() => handleBreedClick(breed)}>
                                            {breed.breed}
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
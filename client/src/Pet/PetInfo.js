import React, { useEffect, useState } from 'react';
import api from '../Api';

const PetListSection = ({ isSelectable, onSelectPet }) => {
    const petUrl = `${process.env.PUBLIC_URL}/images/pet/pet_img.png`;
    const [myPet, setMyPet] = useState([]);

    useEffect(() => {
        const fetchPetSpecies = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found.');
                }
                const response = await api.get('/api/pet/my-pets', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('내 펫 데이터:', response.data);
                setMyPet(response.data);
            } catch (error) {
                console.error('데이터 가져오기 에러:', error);
            }
        };
        fetchPetSpecies();
    }, []);

    // 나이 계산 함수
    const calculateAge = (birthDate) => {
        const birth = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        // 생일이 지나지 않았으면 나이에서 1살 뺌
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    };

    // 강아지와 고양이 데이터를 필터링
    const dogPets = myPet.filter(pet => pet.pet_species === 1);
    const catPets = myPet.filter(pet => pet.pet_species === 2);

    const [accordionState, setAccordionState] = useState({
        dog: false,
        cat: false,
    });

    const [selectedPetId, setSelectedPetId] = useState(null);

    const toggleAccordion = (type) => {
        setAccordionState((prevState) => ({
            ...prevState,
            [type]: !prevState[type],
        }));
    };

    const handlePetSelect = (pet) => {
        if (isSelectable) {
            setSelectedPetId(pet.pet_id);
            onSelectPet(pet);
        }
    };

    return (
        <div className='pet-list-mid'>
            <div className='event-accordion' onClick={() => toggleAccordion('dog')}>
                강아지 {accordionState.dog ? '∧' : '∨'}
            </div>
            <div className='border'></div>
            {accordionState.dog && (
                <div className='pet-accordion-content'>
                    {dogPets.map((pet) => (
                        <div
                            className={`pet-contents ${selectedPetId === pet.pet_id ? 'selected' : ''}`}
                            key={pet.pet_id}
                            onClick={() => handlePetSelect(pet)}
                        >
                            <div className='pet-contents-img'>
                                <img src={pet.image || petUrl} alt='' />
                            </div>
                            <div className='pet-contents-info'>
                                <h1>{pet.pet_name}</h1>
                                <p>{`${pet.breedName}/${pet.pet_weight}kg/${pet.pet_gender ? '남' : '여'}/${calculateAge(pet.pet_birth)}살`}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className='event-accordion' onClick={() => toggleAccordion('cat')}>
                고양이 {accordionState.cat ? '∧' : '∨'}
            </div>
            <div className='border'></div>
            {accordionState.cat && (
                <div className='pet-accordion-content'>
                    {catPets.map((pet) => (
                        <div
                            className={`pet-contents ${selectedPetId === pet.pet_id ? 'selected' : ''}`}
                            key={pet.pet_id}
                            onClick={() => handlePetSelect(pet)}
                        >
                            <div className='pet-contents-img'>
                                <img src={pet.image || petUrl} alt='' />
                            </div>
                            <div className='pet-contents-info'>
                                <h1>{pet.pet_name}</h1>
                                <p>{`${pet.breedName}/${pet.pet_weight}kg/${pet.pet_gender ? '남' : '여'}/${calculateAge(pet.pet_birth)}살`}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PetListSection;

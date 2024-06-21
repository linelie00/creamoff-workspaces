import React, { useState } from 'react';

const PetListSection = ({ isSelectable, onSelectPet }) => {
    const petUrl = `${process.env.PUBLIC_URL}/images/pet/pet_img.png`;

    const dogPets = [
        { id: 1, name: '누렁이', breed: '리트리버', weight: '7kg', gender: '남', age: '2살' },
        { id: 2, name: '망고', breed: '골든리트리버', weight: '5kg', gender: '여', age: '3살' },
    ];

    const catPets = [
        { id: 3, name: '야옹이', breed: '샴', weight: '4kg', gender: '남', age: '1살' },
        { id: 4, name: '초코', breed: '페르시안', weight: '3kg', gender: '여', age: '2살' },
    ];

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
            setSelectedPetId(pet.id);
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
                            className={`pet-contents ${selectedPetId === pet.id ? 'selected' : ''}`}
                            key={pet.id}
                            onClick={() => handlePetSelect(pet)}
                        >
                            <div className='pet-contents-img'>
                                <img src={petUrl} alt='' />
                            </div>
                            <div className='pet-contents-info'>
                                <h1>{pet.name}</h1>
                                <p>{`${pet.breed}/${pet.weight}/${pet.gender}/${pet.age}`}</p>
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
                            className={`pet-contents ${selectedPetId === pet.id ? 'selected' : ''}`}
                            key={pet.id}
                            onClick={() => handlePetSelect(pet)}
                        >
                            <div className='pet-contents-img'>
                                <img src={petUrl} alt='' />
                            </div>
                            <div className='pet-contents-info'>
                                <h1>{pet.name}</h1>
                                <p>{`${pet.breed}/${pet.weight}/${pet.gender}/${pet.age}`}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PetListSection;


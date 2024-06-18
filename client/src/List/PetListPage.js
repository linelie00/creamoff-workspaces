import { useNavigate } from 'react-router-dom';

const PetListPage = () => {
    const navigate = useNavigate();
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/list/arrow_left.svg`;

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <div className='navigation'>
                <button>
                    <img src={arrowButtonUrl} alt='' onClick={goBack} />
                </button>
                등록 펫 목록
            </div>
            <div className='pet-list-mid'>

            </div>
            <div className='Nbutton' onClick={() => navigate('/pet-list')}>다음</div>
        </div>
    );
};

export default PetListPage;

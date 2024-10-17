import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/API.js'
import AlertModal from '../components/AlertModal';
import '../css/CreateCar.css'

const CreateCar = () => {

    const navigate = useNavigate();

    const [currentVehicle, setCurrentVehicle] = useState({
        isConvertible: false,
        exteriors: [null, 0],
        roofs: [null, 0],
        wheels: [null, 0],
        interiors: [null, 0],
        price: 65000,
        name: '',
    })

    const [options, setOptions] = useState({
        exteriors: [],
        roofs: [],
        wheels: [],
        interiors: []
    });

    const [modalData, setModalData] = useState(null);
    const [modalType, setModalType] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        let isMounted = true;
        Promise.all([
            API.getAllExteriors(),
            API.getAllRoofs(),
            API.getAllWheels(),
            API.getAllInteriors()
        ]).then(([exteriors, roofs, wheels, interiors]) => {
            if (isMounted) {
                setOptions({ exteriors, roofs, wheels, interiors });
            }
        });

        return () => {
            isMounted = false;  // Cleanup function
        };
    }, []);

    const openModal = (type, data) => {
        setModalData(data);
        setModalType(type);
        setIsModalOpen(true);
    };

    const selectOption = (optionId, optionPrice) => {
        setCurrentVehicle((prev) => {
            const updatedVehicle = {
                ...prev,
                [modalType]: [optionId, optionPrice],
                price: 65000 +
                    (prev.isConvertible ? 5000 : 0) +
                    (modalType === 'exteriors' ? optionPrice : prev.exteriors[1]) +
                    (modalType === 'roofs' ? optionPrice : prev.roofs[1]) +
                    (modalType === 'wheels' ? optionPrice : prev.wheels[1]) +
                    (modalType === 'interiors' ? optionPrice : prev.interiors[1])
            };

            return updatedVehicle;
        });
    };

    const handleOptionSelection = (option) => {
        if (modalType === 'roofs') {
            if (option.is_convertible !== currentVehicle.isConvertible) {
                setAlertMessage(
                    <>
                        Sorry, you can't put that roof on a <strong>{currentVehicle.isConvertible ? 'convertible' : 'coupe'}</strong> 😔.<br /><br />
                        Please choose another option or {currentVehicle.isConvertible ? 'uncheck' : 'check'} the <strong>Convertible</strong> option to switch back to a {currentVehicle.isConvertible ? 'coupe' : 'convertible'}.
                    </>
                );
                setIsAlertOpen(true);
                return;
            }
        }

        // If not roofs, or the roof selection is valid, select the option
        selectOption(option.id, option.price);
    };


    return (
        <div className='create-car'>
            <label className="convertible">
                <input
                    checked={currentVehicle.isConvertible}
                    onChange={() => {
                        const newConvertibleState = !currentVehicle.isConvertible;
                        const updatedPrice = currentVehicle.price + (newConvertibleState ? 5000 : -5000);
                        setCurrentVehicle({ ...currentVehicle, isConvertible: newConvertibleState, price: updatedPrice })
                    }}
                    type="checkbox"
                    id='convertible'
                />
                Convertible
            </label>
            <div className="create-car-options">
                <div id="customization-options" className="car-options">
                    <div className="car-option">
                        <button onClick={() => openModal('exteriors', options.exteriors)}>Exterior</button>
                    </div>
                    <div className="car-option">
                        <button onClick={() => openModal('roofs', options.roofs)}>Roof</button>
                    </div>
                    <div className="car-option">
                        <button onClick={() => openModal('wheels', options.wheels)}>Wheel</button>
                    </div>
                    <div className="car-option">
                        <button onClick={() => openModal('interiors', options.interiors)}>Interior</button>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <>
                    <div className="modal-overlay" onClick={(e) => {
                        if (e.target === e.currentTarget) setIsModalOpen(false);
                    }}></div>
                    <div className="modal">
                        <div className="modal-content">
                            {modalData.map((option) => (
                                <div
                                    onClick={() => handleOptionSelection(option)}
                                    className={currentVehicle[modalType][0] === option.id ? 'option selected' : 'option'}
                                    key={option.id}

                                >
                                    <img src={option.img_url}
                                        onError={(e) => e.target.src = 'https://www.detroitwheelandtire.com/media/catalog/product/cache/1fc733dcd54749341bf4d3a2151aad91/1/4/14007_14008_aly_96704_mbm_1.webp'}
                                    />
                                    <div className="option-description">
                                        <p>{option.name}</p>
                                        💵 ${option.price}
                                        {modalType === 'roofs' && option.is_convertible && (<p>convertible only</p>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => setIsModalOpen(false)}>DONE</button>
                        </div>
                    </div>
                </>
            )}
            <div className="create-car-price">💰${currentVehicle.price}</div>
            <div className="create-car-name">
                <input
                    type="text"
                    placeholder="Name your car"
                    className="car-name"
                    value={currentVehicle.name}
                    onChange={({ target: { value } }) => setCurrentVehicle({ ...currentVehicle, name: value })}
                />
                <input
                    type="submit"
                    value="Create"
                    className="submit-car"
                    onClick={() => {
                        let reqest = {
                            isConvertible: currentVehicle.isConvertible,
                            exterior: currentVehicle.exteriors[0],
                            roof: currentVehicle.roofs[0],
                            wheel: currentVehicle.wheels[0],
                            interior: currentVehicle.interiors[0],
                            price: currentVehicle.price,
                            name: currentVehicle.name
                        }
                        API.createCar(reqest).then((data) => {
                            navigate('/customcars');
                        })
                    }}
                />
            </div>
            {/* Alert Modal */}
            <AlertModal
                isOpen={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
                message={alertMessage}
            />
        </div>
    )
}

export default CreateCar
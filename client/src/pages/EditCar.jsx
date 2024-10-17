import React, { useEffect, useState } from 'react'
import '../css/CarDetails.css'
import '../css/CreateCar.css'
import API from '../services/API.js'
import AlertModal from '../components/AlertModal';

const EditCar = () => {

    const carId = window.location.pathname.split('/')[2]

    const [options, setOptions] = useState({
        exteriors: [],
        roofs: [],
        wheels: [],
        interiors: []
    });

    const [currentVehicle, setCurrentVehicle] = useState({
        is_convertible: false,
        exteriors: [null, 0],
        roofs: [null, 0],
        wheels: [null, 0],
        interiors: [null, 0],
        price: 0,
        name: '',
    })

    const [modalData, setModalData] = useState(null);
    const [modalType, setModalType] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

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
                price: prev.price - prev[modalType][1] + optionPrice
            };

            return updatedVehicle;
        });
    };

    useEffect(() => {
        Promise.all([
            API.getAllExteriors(),
            API.getAllRoofs(),
            API.getAllWheels(),
            API.getAllInteriors()
        ]).then(([exteriors, roofs, wheels, interiors]) => {
            setOptions({ exteriors, roofs, wheels, interiors });
        });
    }, [])

    useEffect(() => {
        API.getCarById(carId)
            .then((data) => {
                if (!options.exteriors || !options.roofs || !options.wheels || !options.interiors) return;
                setCurrentVehicle(
                    {
                        is_convertible: data.is_convertible,
                        exteriors: [data.exterior, options.exteriors.find((exterior) => exterior.id === data.exterior)?.price || 0],
                        roofs: [data.roof, options.roofs.find((roof) => roof.id === data.roof)?.price || 0],
                        wheels: [data.wheel, options.wheels.find((wheel) => wheel.id === data.wheel)?.price || 0],
                        interiors: [data.interior, options.interiors.find((interior) => interior.id === data.interior)?.price || 0],
                        price: data.price,
                        name: data.name
                    }
                )
            })
    }, [ options ])

    const handleOptionSelection = (option) => {
        if (modalType === 'roofs') {
            if (option.is_convertible !== currentVehicle.is_convertible) {
                setAlertMessage(
                    <>
                        Sorry, you can't put that roof on a <strong>{currentVehicle.is_convertible ? 'convertible' : 'coupe'}</strong> 😔.<br />
                    </>
                );
                setIsAlertOpen(true);
                return;
            }
        }

        selectOption(option.id, option.price);
    };


    return (
        <>
            <article className="car-full-details">
                <header >
                    <h2>
                        <img src={currentVehicle?.is_convertible ? "/convertible.png" : "/coupe.png"} alt={currentVehicle.name} />
                        {currentVehicle.name}
                    </h2>
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
                                            onClick={() => {
                                                if (currentVehicle[modalType][0] !== option.id) {
                                                    handleOptionSelection(option)
                                                }
                                            }}
                                            className={currentVehicle[modalType][0] === option.id ? 'option selected' : 'option'}
                                            key={option.id}
                                        >
                                            <img src={option.img_url}
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
                </header>
                <div className="details-content">
                    <div className="car-details-price">
                        <p>
                            💰 ${currentVehicle.price}
                        </p>
                    </div>
                    <div className="car-selection" style={{ backgroundImage: `url(${options.exteriors.find((exterior) => exterior.id === currentVehicle.exteriors[0])?.img_url })` }}>
                        <div className="car-selection-overlay">
                            <div className="car-selection-details">
                                <p>
                                    <strong>🖌️ Exterior: </strong>
                                    {options.exteriors.find((exterior) => exterior.id === currentVehicle.exteriors[0])?.name}
                                </p>
                                <p className="option-price">
                                    💵 ${options.exteriors.find((exterior) => exterior.id === currentVehicle.exteriors[0])?.price}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="car-selection" style={{ backgroundImage: `url(${options.roofs.find((roof) => roof.id === currentVehicle.roofs[0])?.img_url })`}}>
                        <div className="car-selection-overlay">
                            <div className="car-selection-details">
                                <p>
                                    <strong>🏠 Roof: </strong>
                                    {options.roofs.find((roof) => roof.id === currentVehicle.roofs[0])?.name}
                                </p>
                                <p className="option-price">
                                    💵 ${options.roofs.find((roof) => roof.id === currentVehicle.roofs[0])?.price}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="car-modify">
                        <input 
                            type='submit'
                            value={'Update'}
                            onClick={() => {
                                API.updateCar(carId, {
                                    exterior: currentVehicle.exteriors[0],
                                    roof: currentVehicle.roofs[0],
                                    wheel: currentVehicle.wheels[0],
                                    interior: currentVehicle.interiors[0],
                                    price: currentVehicle.price
                                }).then((data) => {
                                    window.location.href = '/customcars/' + carId
                                });
                            }}
                        />
                        <button onClick={() => {
                            API.deleteCar(carId).then((data) => {
                                window.location.href = '/customcars'
                            })
                        }}>Delete</button>
                    </div>
                    <div className="car-selection" style={{ backgroundImage: `url(${options.wheels.find((wheel) => wheel.id === currentVehicle.wheels[0])?.img_url })` }}>
                        <div className="car-selection-overlay">
                            <div className="car-selection-details">
                                <p>
                                    <strong>🚗 Wheels: </strong>
                                    {options.wheels.find((wheel) => wheel.id === currentVehicle.wheels[0])?.name}
                                </p>
                                <p className="option-price">
                                    💵 ${options.wheels.find((wheel) => wheel.id === currentVehicle.wheels[0])?.price}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="car-selection" style={{ backgroundImage: `url(${options.interiors.find((interior) => interior.id === currentVehicle.interiors[0])?.img_url})` }}>
                        <div className="car-selection-overlay">
                            <div className="car-selection-details">
                                <p>
                                    <strong>🪟 Interior: </strong>
                                    {options.interiors.find((interior) => interior.id === currentVehicle.interiors[0])?.name}
                                </p>
                                <p className="option-price">
                                    💵 ${options.interiors.find((interior) => interior.id === currentVehicle.interiors[0])?.price}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        {/* Alert Modal */}
        <AlertModal
            isOpen={isAlertOpen}
            onClose={() => setIsAlertOpen(false)}
            message={alertMessage}
        />
        </>
    )
}

export default EditCar
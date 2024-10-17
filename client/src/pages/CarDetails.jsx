import React, { useEffect, useState } from 'react'
import '../css/CarDetails.css'
import API from '../services/API.js'

const CarDetails = () => {

    const carId = window.location.pathname.split('/')[2]
    const [car, setCar] = useState({})
    const [options, setOptions] = useState({
        exteriors: [],
        roofs: [],
        wheels: [],
        interiors: []
    });

    useEffect(() => {
        API.getCarById(carId)
            .then((data) => {
                setCar(data)
            })
    }, [])

    useEffect(() => {
        Promise.all([
            API.getAllExteriors(),
            API.getAllRoofs(),
            API.getAllWheels(),
            API.getAllInteriors()
        ]).then(([exteriors, roofs, wheels, interiors]) => {
            setOptions({ exteriors, roofs, wheels, interiors });
        });
    }, [car])

    return (
        <>
            <article className="car-full-details">
                <header >
                    <h3>
                        <img src={car.is_convertible ? "/convertible.png" : "/coupe.png"} alt={car.name} />
                        {car.name}
                    </h3>
                </header>
                <div className="details-content">
                    <div className="car-details-price">
                        <p>
                            💰 ${car.price}
                        </p>
                    </div>
                    <div className="car-selection" style={{ backgroundImage: `url(${options.exteriors.find((exterior) => exterior.id === car.exterior)?.img_url })` }}>
                        <div className="car-selection-overlay">
                            <div className="car-selection-details">
                                <p>
                                    <strong>🖌️ Exterior: </strong>
                                    {options.exteriors.find((exterior) => exterior.id === car.exterior)?.name}
                                </p>
                                <p className="option-price">
                                    💵 ${options.exteriors.find((exterior) => exterior.id === car.exterior)?.price}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="car-selection" style={{ backgroundImage: `url(${options.roofs.find((roof) => roof.id === car.roof)?.img_url })`}}>
                        <div className="car-selection-overlay">
                            <div className="car-selection-details">
                                <p>
                                    <strong>🏠 Roof: </strong>
                                    {options.roofs.find((roof) => roof.id === car.roof)?.name}
                                </p>
                                <p className="option-price">
                                    💵 ${options.roofs.find((roof) => roof.id === car.roof)?.price}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="car-modify">
                        <a href={`/edit/${carId}`} role='button'>Edit</a>
                        <button onClick={() => {
                            API.deleteCar(carId).then((data) => {
                                window.location.href = '/customcars'
                            })
                        }}>Delete</button>
                    </div>
                    <div className="car-selection" style={{ backgroundImage: `url(${options.wheels.find((wheel) => wheel.id === car.wheel)?.img_url })` }}>
                        <div className="car-selection-overlay">
                            <div className="car-selection-details">
                                <p>
                                    <strong>🚗 Wheels: </strong>
                                    {options.wheels.find((wheel) => wheel.id === car.wheel)?.name}
                                </p>
                                <p className="option-price">
                                    💵 ${options.wheels.find((wheel) => wheel.id === car.wheel)?.price}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="car-selection" style={{ backgroundImage: `url(${options.interiors.find((interior) => interior.id === car.interior)?.img_url})` }}>
                        <div className="car-selection-overlay">
                            <div className="car-selection-details">
                                <p>
                                    <strong>🪟 Interior: </strong>
                                    {options.interiors.find((interior) => interior.id === car.interior)?.name}
                                </p>
                                <p className="option-price">
                                    💵 ${options.interiors.find((interior) => interior.id === car.interior)?.price}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

        </>
    )
}

export default CarDetails
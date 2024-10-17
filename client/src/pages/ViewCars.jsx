import React, { useState, useEffect } from 'react'
import API from '../services/API.js'
import '../css/ViewCars.css'

const ViewCars = () => {

    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [options, setOptions] = useState({
        exteriors: [],
        roofs: [],
        wheels: [],
        interiors: []
    });

    useEffect(() => {
        let isMounted = true;
        API.getCars()
            .then((data) => {
                if (isMounted) {
                    setCars(data);
                    setIsLoading(false);
                }
            });

        Promise.all([
            API.getAllExteriors(),
            API.getAllRoofs(),
            API.getAllWheels(),
            API.getAllInteriors()
        ]).then(([exteriors, roofs, wheels, interiors]) => {
            setOptions({ exteriors, roofs, wheels, interiors });
        });
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <main>
            {isLoading && <p>Loading...</p>}
            {!isLoading && (
                <>
                    {cars.map((car) => (
                        <article key={car.id}>
                            <header >
                                <h3>
                                    <img src={car.is_convertible ? "/convertible.png" : "/coupe.png"} alt={car.name} />
                                    {car.name}
                                </h3>
                            </header>
                            <div className='car-card'>
                                <div className="car-summary">
                                    <p>
                                        <strong>🖌️ Exterior: </strong>
                                        {options.exteriors.find((exterior) => exterior.id === car.exterior)?.name}
                                    </p>
                                    <p>
                                        <strong>🏠 Roof: </strong>
                                        {options.roofs.find((roof) => roof.id === car.roof)?.name}
                                    </p>
                                </div>
                                <div className="car-summary">
                                    <p>
                                        <strong>🚗 Wheels: </strong>
                                        {options.wheels.find((wheel) => wheel.id === car.wheel)?.name}
                                    </p>
                                    <p>
                                        <strong>🪟 Interior: </strong>
                                        {options.interiors.find((interior) => interior.id === car.interior)?.name}
                                    </p>
                                </div>
                                <div className="car-price">
                                    <p>
                                        💰 $
                                        {car.price}
                                    </p>
                                    <a href={`/customcars/${car.id}`} role='button'>Details</a>
                                </div>
                            </div>
                        </article>
                    ))}
                </>
            )}
        </main>
    )
}

export default ViewCars
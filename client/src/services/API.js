// Code for the API service
// This service will be used to make requests to the server
// The server is running on http://localhost:3000

import axios from 'axios';
const API = {

    getCars: async () => {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:3000/api/cars')
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    getCarById: async (id) => {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:3000/api/cars/${id}`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    createCar: async (car) => {
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:3000/api/cars', car)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    updateCar: async (id, car) => {
        return new Promise((resolve, reject) => {
            axios.post(`http://localhost:3000/api/cars/${id}`, car)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    deleteCar: async (id) => {
        return new Promise((resolve, reject) => {
            axios.delete(`http://localhost:3000/api/cars/${id}`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    getAllExteriors: async () => {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:3000/api/exteriors')
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    getExteriorById: async (id) => {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:3000/api/exteriors/${id}`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    getAllRoofs: async () => {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:3000/api/roofs')
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    getRoofById: async (id) => {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:3000/api/roofs/${id}`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    getAllWheels: async () => {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:3000/api/wheels')
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    getWheelById: async (id) => {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:3000/api/wheels/${id}`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
            });
        });
    },

    getAllInteriors: async () => {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:3000/api/interiors')
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    
    getInteriorById: async (id) => {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:3000/api/interiors/${id}`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
};

export default API;




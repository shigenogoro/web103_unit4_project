import { pool } from "./database.js";   
import "./dotenv.js"; 
import {exteriors, roofs, wheels, interiors} from "../data/features.js"; 

const createExteriorsTable = async () => {

    const createTableQuery = `
        DROP TABLE IF EXISTS exteriors;

        CREATE TABLE IF NOT EXISTS exteriors (
            id SERIAL PRIMARY KEY, 
            name VARCHAR(255) NOT NULL, 
            price INT NOT NULL
        )
    `;

    try {
        const response = await pool.query(createTableQuery);
        console.log("Exteriors table created successfully!: ", response);  
    } catch (error) {
        console.log("Error creating table: ", error);
    };
};

const seedExteriorsTable = async () => {

    await createExteriorsTable(); 

    exteriors.forEach((exterior) => {

        const insertQuery = {
            text: `INSERT INTO exteriors (name, price) VALUES ($1, $2)`,
        };

        const values = [
            exterior.name,
            exterior.price
        ];

        pool.query(insertQuery, values, (error, res) => {
            if (error) {
                console.log("Error inserting into table: ", error);
            } else {
                console.log(`✅ ${exterior.name} added successfully`); 
            };
        })
    })
};

const createRoofsTable = async () => {

    const createTableQuery = `
        DROP TABLE IF EXISTS roofs;

        CREATE TABLE IF NOT EXISTS roofs (
            id SERIAL PRIMARY KEY, 
            name VARCHAR(255) NOT NULL, 
            price INT NOT NULL,
            isConvertible BOOLEAN NOT NULL
        )
    `;

    try {
        const response = await pool.query(createTableQuery);
        console.log("Roofs table created successfully!: ", response);  
    } catch (error) {
        console.log("Error creating table: ", error);
    };
};

const seedRoofsTable = async () => {

    await createRoofsTable(); 

    roofs.forEach((roof) => {

        const insertQuery = {
            text: `INSERT INTO roofs (name, price, isConvertible) VALUES ($1, $2, $3)`,
        };

        const values = [
            roof.name,
            roof.price,
            roof.isConvertible
        ];

        pool.query(insertQuery, values, (error, res) => {
            if (error) {
                console.log("Error inserting into table: ", error);
            } else {
                console.log(`✅ ${roof.name} added successfully`); 
            };
        })
    })
};

const createWheelsTable = async () => {

    const createTableQuery = `
        DROP TABLE IF EXISTS wheels;

        CREATE TABLE IF NOT EXISTS wheels (
            id SERIAL PRIMARY KEY, 
            name VARCHAR(255) NOT NULL, 
            price INT NOT NULL
        )
    `;

    try {
        const response = await pool.query(createTableQuery);
        console.log("Wheels table created successfully!: ", response);  
    } catch (error) {
        console.log("Error creating table: ", error);
    };
};

const seedWheelsTable = async () => {

    await createWheelsTable(); 

    wheels.forEach((wheel) => {

        const insertQuery = {
            text: `INSERT INTO wheels (name, price) VALUES ($1, $2)`,
        };

        const values = [
            wheel.name,
            wheel.price
        ];

        pool.query(insertQuery, values, (error, res) => {
            if (error) {
                console.log("Error inserting into table: ", error);
            } else {
                console.log(`✅ ${wheel.name} added successfully`); 
            };
        })
    })
};

const createInteriorsTable = async () => {

    const createTableQuery = `
        DROP TABLE IF EXISTS interiors;

        CREATE TABLE IF NOT EXISTS interiors (
            id SERIAL PRIMARY KEY, 
            name VARCHAR(255) NOT NULL, 
            price INT NOT NULL
        )
    `;

    try {
        const response = await pool.query(createTableQuery);
        console.log("Interiors table created successfully!: ", response);  
    } catch (error) {
        console.log("Error creating table: ", error);
    };
};

const seedInteriorsTable = async () => {

    await createInteriorsTable(); 

    interiors.forEach((interior) => {

        const insertQuery = {
            text: `INSERT INTO interiors (name, price) VALUES ($1, $2)`,
        };

        const values = [
            interior.name,
            interior.price
        ];

        pool.query(insertQuery, values, (error, res) => {
            if (error) {
                console.log("Error inserting into table: ", error);
            } else {
                console.log(`✅ ${interior.name} added successfully`); 
            };
        })
    })
};


const seedData = async () => {
    await seedExteriorsTable();
    await seedRoofsTable();
    await seedWheelsTable();
    await seedInteriorsTable();
};

const createCarsTable = async () => {
    const query = `
    DROP TABLE IF EXISTS cars;
  
    CREATE TABLE IF NOT EXISTS cars (
        id SERIAL PRIMARY KEY,
        name VARCHAR(64),
        isConvertible BOOLEAN NOT NULL,
        exterior INT,
        roof INT,
        wheel INT,
        interior INT,
        price INT
    )`;
    try {
      const res = await pool.query(query);
      console.log("🎉 Cars table created");
    } catch (err) {
      console.log("⚠️ Error creating cars table");
    }
};

// Call functions to insert data
seedData();
createCarsTable();
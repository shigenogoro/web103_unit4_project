import { pool } from "./database.js";
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

const createExteriorsTable = async () => {
  const query = `
    DROP TABLE IF EXISTS exteriors;

    CREATE TABLE IF NOT EXISTS exteriors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        price INT NOT NULL,
        img_url VARCHAR(255) NOT NULL
    )`;
  try {
    const res = await pool.query(query);
    console.log("🎉 Exteriors table created");
  } catch (err) {
    console.log("⚠️ Error creating exteriors table");
  }
};

const createRoofsTable = async () => {
  const query = `
  DROP TABLE IF EXISTS roofs;

  CREATE TABLE IF NOT EXISTS roofs (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        price INT NOT NULL,
        img_url VARCHAR(255) NOT NULL,
        is_convertible BOOLEAN NOT NULL
  )`;
  try {
    const res = await pool.query(query);
    console.log("🎉 Roofs table created");
  } catch (err) {
    console.log("⚠️ Error creating roofs table");
  }
};

const createWheelsTable = async () => {
  const query = `
  DROP TABLE IF EXISTS wheels;

  CREATE TABLE IF NOT EXISTS wheels (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      price INT NOT NULL,
      img_url VARCHAR(255) NOT NULL
  )`;
  try {
    const res = await pool.query(query);
    console.log("🎉 Wheels table created");
  } catch (err) {
    console.log("⚠️ Error creating wheels table");
  }
};

const createInteriorsTable = async () => {
  const query = `
  DROP TABLE IF EXISTS interiors;

  CREATE TABLE IF NOT EXISTS interiors (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      price INT NOT NULL,
      img_url VARCHAR(255) NOT NULL,
      is_combo BOOLEAN
  )`;
  try {
    const res = await pool.query(query);
    console.log("🎉 Interiors table created");
  } catch (err) {
    console.log("⚠️ Error creating interiors table");
  }
};

const seedExteriorsTable = async () => {
  await createExteriorsTable();
  let exteriors = [];
  try {
    await fetch('https://boltbucket.up.railway.app/api/exteriors')
      .then(response => response.json())
      .then(data => {
        exteriors = data;
      });
  }
  catch (err) {
    console.error('⚠️ error fetching exteriors data', err);
  }
  exteriors.forEach((element) => {
    const query = `INSERT INTO exteriors (name, price, img_url) VALUES ($1, $2, $3)`;
    const values = [element.color, element.price, element.image];

    pool.query(query, values, (err, res) => {
      if (err) {
        console.log("⚠️ Error inserting exteriors data", err);
        return;
      }
      console.log(`✅ ${element.color} inserted into exteriors table`);
    });
  });
};

const seedRoofsTable = async () => {
  await createRoofsTable();

  let roofs = [];
  try {
    await fetch('https://boltbucket.up.railway.app/api/roofs')
      .then(response => response.json())
      .then(data => {
        roofs = data;
      });
  }
  catch (err) {
    console.error('⚠️ error fetching roofs data', err);
  }

  roofs.forEach((element) => {
    const query = `INSERT INTO roofs (name, price, img_url, is_convertible) VALUES ($1, $2, $3, $4)`;
    const values = [
      element.color,
      element.price,
      element.image,
      element.isconvertible,
    ];

    pool.query(query, values, (err, res) => {
      if (err) {
        console.log("⚠️ Error inserting roofs data", err);
        return;
      }
      console.log(`✅ ${element.color} inserted into roofs table`);
    });
  });
};

const seedWheelsTable = async () => {
  await createWheelsTable();
  let wheels = [];
  try {
    await fetch('https://boltbucket.up.railway.app/api/wheels')
      .then(response => response.json())
      .then(data => {
        wheels = data;
      });
  }
  catch (err) {
    console.error('⚠️ error fetching wheels data', err);
  }
  wheels.forEach((element) => {
    const query = `INSERT INTO wheels (name, price, img_url) VALUES ($1, $2, $3)`;
    const values = [element.color, element.price, element.image];

    pool.query(query, values, (err, res) => {
      if (err) {
        console.log("⚠️ Error inserting wheels data", err);
        return;
      }
      console.log(`✅ ${element.color} inserted into wheels table`);
    });
  });
};

const seedInteriorsTable = async () => {
  await createInteriorsTable();
  let interiors = [];
  try {
    await fetch('https://boltbucket.up.railway.app/api/interiors')
      .then(response => response.json())
      .then(data => {
        interiors = data;
      });
  }
  catch (err) {
    console.error('⚠️ error fetching exteriors data', err);
  }
  interiors.forEach((element) => {
    const query = `INSERT INTO interiors (name, price, img_url, is_combo) VALUES ($1, $2, $3, $4)`;
    const values = [element.color, element.price, element.image, element.iscombo];

    pool.query(query, values, (err, res) => {
      if (err) {
        console.log("⚠️ Error inserting interiors data", err);
        return;
      }
      console.log(`✅ ${element.color} inserted into interiors table`);
    });
  });
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
      is_convertible BOOLEAN NOT NULL,
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

seedData();
createCarsTable();
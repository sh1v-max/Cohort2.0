-- ==========================
-- Create database
-- ==========================

CREATE DATABASE garage;

USE garage;


-- ==========================
-- Create cars table
-- ==========================

CREATE TABLE cars (

  id INT AUTO_INCREMENT PRIMARY KEY,

  brand VARCHAR(100) NOT NULL,

  model VARCHAR(100) NOT NULL,

  year INT,

  price DECIMAL(10,2),

  fuel_type VARCHAR(50),

  available BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);


-- ==========================
-- Insert data
-- ==========================

INSERT INTO cars

(brand, model, year, price, fuel_type)

VALUES

('Toyota', 'Camry', 2023, 32000, 'Petrol'),

('Honda', 'Civic', 2022, 28000, 'Petrol'),

('Tesla', 'Model 3', 2024, 45000, 'Electric'),

('Hyundai', 'Verna', 2023, 18000, 'Petrol'),

('Mahindra', 'XUV700', 2024, 30000, 'Diesel');


-- ==========================
-- View all cars
-- ==========================

SELECT *
FROM cars;


-- ==========================
-- View selected columns
-- ==========================

SELECT brand, model, price
FROM cars;


-- ==========================
-- Update one value
-- ==========================

UPDATE cars

SET price = 47000

WHERE brand = 'Tesla';


-- ==========================
-- Update multiple values
-- ==========================

UPDATE cars

SET

fuel_type = 'Hybrid',

price = 34000

WHERE brand = 'Toyota';


-- ==========================
-- Verify updates
-- ==========================

SELECT *
FROM cars;


-- ==========================
-- Delete one row
-- ==========================

DELETE FROM cars

WHERE brand = 'Honda';


-- ==========================
-- Verify delete
-- ==========================

SELECT *
FROM cars;
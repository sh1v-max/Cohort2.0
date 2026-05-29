-- E-Commerce Dataset
-- Sample dataset for practice

CREATE TABLE customers_ec (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    city VARCHAR(50),
    country VARCHAR(50),
    email VARCHAR(100) UNIQUE
);

CREATE TABLE products_ec (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    price DECIMAL(10, 2),
    stock INT
);

CREATE TABLE orders_ec (
    order_id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATE,
    total_amount DECIMAL(12, 2),
    FOREIGN KEY (customer_id) REFERENCES customers_ec(customer_id)
);

CREATE TABLE order_items_ec (
    order_item_id INT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT,
    unit_price DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES orders_ec(order_id),
    FOREIGN KEY (product_id) REFERENCES products_ec(product_id)
);

-- Sample Data
INSERT INTO customers_ec VALUES
(1, 'John Smith', 'New York', 'USA', 'john@example.com'),
(2, 'Jane Doe', 'Los Angeles', 'USA', 'jane@example.com'),
(3, 'Bob Johnson', 'Chicago', 'USA', 'bob@example.com'),
(4, 'Alice Williams', 'London', 'UK', 'alice@example.com'),
(5, 'Charlie Brown', 'Toronto', 'Canada', 'charlie@example.com');

INSERT INTO products_ec VALUES
(101, 'Laptop', 'Electronics', 999.99, 10),
(102, 'Mouse', 'Electronics', 29.99, 50),
(103, 'Keyboard', 'Electronics', 79.99, 30),
(104, 'Monitor', 'Electronics', 299.99, 15),
(105, 'Desk Chair', 'Furniture', 199.99, 20);

INSERT INTO orders_ec VALUES
(1001, 1, '2024-01-10', 1109.97),
(1002, 1, '2024-02-15', 299.99),
(1003, 2, '2024-01-20', 1329.97),
(1004, 3, '2024-02-01', 109.98),
(1005, 4, '2024-02-10', 379.98),
(1006, 5, '2024-02-15', 1099.97);

INSERT INTO order_items_ec VALUES
(1, 1001, 101, 1, 999.99),
(2, 1001, 102, 4, 29.99),
(3, 1002, 104, 1, 299.99),
(4, 1003, 101, 1, 999.99),
(5, 1003, 103, 4, 79.99),
(6, 1004, 102, 2, 29.99),
(7, 1005, 103, 2, 79.99),
(8, 1005, 104, 1, 299.99),
(9, 1006, 101, 1, 999.99),
(10, 1006, 102, 3, 29.99);

-- =============================================================
-- DATASET 01: E-COMMERCE DATABASE SCHEMA
-- =============================================================
-- A realistic e-commerce platform schema
-- Used throughout the curriculum for learning SQL

-- This schema includes:
-- - Users (customers and sellers)
-- - Products with categories and attributes
-- - Orders and order items
-- - Reviews and ratings
-- - Inventory management
-- - Payments and refunds

-- Drop existing tables (be careful!)
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- =============================================================
-- USERS TABLE
-- =============================================================

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(20) CHECK (role IN ('customer', 'seller', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    zip_code VARCHAR(20)
);

-- =============================================================
-- CATEGORIES TABLE
-- =============================================================

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    parent_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id)
);

-- =============================================================
-- PRODUCTS TABLE
-- =============================================================

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    seller_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
    discount_price DECIMAL(10, 2),
    category_id INTEGER NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,
    rating DECIMAL(3, 2) DEFAULT 0.0,
    review_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    FOREIGN KEY (seller_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- =============================================================
-- INVENTORY TABLE
-- =============================================================

CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    quantity_available INTEGER NOT NULL DEFAULT 0,
    quantity_reserved INTEGER NOT NULL DEFAULT 0,
    warehouse_location VARCHAR(100),
    last_restocked TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id),
    UNIQUE(product_id)
);

-- =============================================================
-- ORDERS TABLE
-- =============================================================

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(12, 2) NOT NULL,
    status VARCHAR(50) CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
    shipping_address VARCHAR(255),
    billing_address VARCHAR(255),
    notes TEXT,
    FOREIGN KEY (customer_id) REFERENCES users(id)
);

-- =============================================================
-- ORDER_ITEMS TABLE
-- =============================================================

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    seller_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) DEFAULT 0,
    subtotal DECIMAL(12, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (seller_id) REFERENCES users(id)
);

-- =============================================================
-- REVIEWS TABLE
-- =============================================================

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    customer_id INTEGER NOT NULL,
    order_id INTEGER,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title VARCHAR(255),
    comment TEXT,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (customer_id) REFERENCES users(id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- =============================================================
-- CREATE INDEXES FOR PERFORMANCE
-- =============================================================

CREATE INDEX idx_products_seller_id ON products(seller_id);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_customer_id ON reviews(customer_id);

-- =============================================================
-- INSERT SAMPLE DATA
-- =============================================================

-- Users (customers and sellers)
INSERT INTO users (email, name, username, password_hash, phone, role, address, city, state, country, zip_code) VALUES
('john_customer@example.com', 'John Smith', 'johnsmith', 'hash_password_1', '555-0101', 'customer', '123 Main St', 'Springfield', 'IL', 'USA', '62701'),
('jane_seller@example.com', 'Jane Williams', 'janestore', 'hash_password_2', '555-0102', 'seller', '456 Oak Ave', 'Springfield', 'IL', 'USA', '62702'),
('bob_customer@example.com', 'Bob Johnson', 'bobjohnson', 'hash_password_3', '555-0103', 'customer', '789 Elm St', 'Springfield', 'IL', 'USA', '62703'),
('alice_seller@example.com', 'Alice Brown', 'aliceshop', 'hash_password_4', '555-0104', 'seller', '321 Pine Rd', 'Springfield', 'IL', 'USA', '62704'),
('charlie_customer@example.com', 'Charlie Davis', 'charliedavis', 'hash_password_5', '555-0105', 'customer', '654 Maple Dr', 'Springfield', 'IL', 'USA', '62705'),
('admin@example.com', 'Admin User', 'admin', 'hash_password_6', '555-0106', 'admin', '999 Admin Ln', 'Springfield', 'IL', 'USA', '62699'),
('diana_seller@example.com', 'Diana Martinez', 'dianagoods', 'hash_password_7', '555-0107', 'seller', '555 Cedar Ln', 'Springfield', 'IL', 'USA', '62706'),
('eve_customer@example.com', 'Eve Wilson', 'evewilson', 'hash_password_8', '555-0108', 'customer', '777 Birch St', 'Springfield', 'IL', 'USA', '62707');

-- Categories (hierarchical)
INSERT INTO categories (name, description, parent_id) VALUES
('Electronics', 'Electronic devices and gadgets', NULL),
('Books', 'Physical and digital books', NULL),
('Clothing', 'Apparel and accessories', NULL),
('Home & Garden', 'Home improvement and garden items', NULL),
('Smartphones', 'Mobile phones and accessories', 1),
('Laptops', 'Computers and laptops', 1),
('Fiction', 'Fiction novels and stories', 2),
('Non-Fiction', 'Non-fiction and reference books', 2),
('Men Clothing', 'Mens apparel', 3),
('Women Clothing', 'Womens apparel', 3);

-- Products
INSERT INTO products (seller_id, name, description, price, discount_price, category_id, sku, rating, review_count) VALUES
(2, 'iPhone 15 Pro', 'Latest Apple iPhone with advanced features', 1299.00, 1199.00, 5, 'IPHONE15PRO', 4.5, 125),
(2, 'Samsung Galaxy S24', 'Flagship Android smartphone', 899.00, 799.00, 5, 'SAMS24', 4.3, 98),
(4, 'MacBook Pro 16', 'High-performance laptop for professionals', 2499.00, 2299.00, 6, 'MBP16', 4.8, 210),
(4, 'Dell XPS 13', 'Compact yet powerful ultrabook', 1399.00, 1299.00, 6, 'DELLXPS13', 4.6, 156),
(2, 'The Great Gatsby', 'Classic American novel by F. Scott Fitzgerald', 14.99, NULL, 7, 'GATSBY', 4.7, 542),
(4, 'Clean Code', 'A handbook of agile software craftsmanship', 39.99, 34.99, 8, 'CLEANCODE', 4.8, 389),
(7, 'Cotton T-Shirt', 'Comfortable 100% cotton shirt for men', 24.99, 19.99, 9, 'MENS_TSHIRT', 4.2, 87),
(7, 'Denim Jeans', 'Classic blue denim jeans for women', 49.99, 39.99, 10, 'WOMEN_JEANS', 4.4, 203),
(2, 'Wireless Headphones', 'Noise-cancelling wireless headphones', 199.00, 149.00, 5, 'WIRELESS_HP', 4.5, 412),
(4, 'Coffee Maker', 'Programmable coffee maker for morning brew', 79.99, 59.99, 4, 'COFFEE_MKR', 4.3, 134),
(7, 'Running Shoes', 'Professional running shoes for athletes', 129.99, 99.99, 9, 'RUNNING_SH', 4.6, 298),
(2, 'Portable SSD', '1TB portable solid state drive', 119.00, 99.00, 5, 'PORT_SSD', 4.7, 267);

-- Inventory
INSERT INTO inventory (product_id, quantity_available, quantity_reserved) VALUES
(1, 45, 12),
(2, 38, 8),
(3, 15, 3),
(4, 22, 5),
(5, 150, 20),
(6, 200, 25),
(7, 500, 45),
(8, 380, 60),
(9, 89, 15),
(10, 120, 18),
(11, 95, 22),
(12, 67, 10);

-- Orders
INSERT INTO orders (customer_id, total_amount, status) VALUES
(1, 2498.00, 'delivered'),
(3, 189.00, 'shipped'),
(5, 79.99, 'pending'),
(1, 1548.00, 'paid'),
(3, 499.99, 'delivered'),
(5, 224.99, 'shipped'),
(1, 3248.00, 'paid'),
(3, 84.99, 'delivered');

-- Order Items
INSERT INTO order_items (order_id, product_id, seller_id, quantity, unit_price, discount, subtotal) VALUES
(1, 4, 4, 1, 1399.00, 100.00, 1299.00),
(1, 9, 2, 1, 199.00, 0.00, 199.00),
(2, 8, 7, 1, 49.99, 10.00, 39.99),
(2, 11, 7, 1, 129.99, 30.00, 99.99),
(2, 5, 2, 1, 14.99, 0.00, 14.99),
(3, 10, 4, 1, 79.99, 0.00, 79.99),
(4, 3, 4, 1, 2499.00, 200.00, 2299.00),
(4, 12, 2, 1, 119.00, 20.00, 99.00),
(5, 1, 2, 1, 1299.00, 100.00, 1199.00),
(5, 2, 2, 1, 899.00, 100.00, 799.00),
(6, 6, 4, 1, 39.99, 5.00, 34.99),
(6, 7, 7, 1, 24.99, 5.00, 19.99),
(7, 5, 2, 10, 14.99, 0.00, 149.90),
(8, 8, 7, 2, 49.99, 15.00, 84.98);

-- Reviews
INSERT INTO reviews (product_id, customer_id, order_id, rating, title, comment) VALUES
(1, 1, 1, 5, 'Excellent phone!', 'Best phone I ever owned. Great camera and performance.'),
(9, 1, 1, 4, 'Good headphones', 'Sound quality is good, battery life is solid.'),
(4, 1, 4, 5, 'Perfect laptop', 'Fast, reliable, and perfect for development work.'),
(2, 3, 2, 4, 'Good value', 'Good phone at this price point, no complaints.'),
(8, 3, 2, 5, 'Very comfortable', 'Best jeans I own, fit perfectly.'),
(5, 3, 2, 5, 'Timeless classic', 'Every programmer should read this book.'),
(10, 5, 3, 3, 'Average', 'Works fine but nothing special about it.'),
(1, 3, 5, 4, 'Great device', 'iPhone is reliable and easy to use.'),
(3, 1, 7, 5, 'Worth every penny', 'Professional grade laptop, highly recommend.'),
(6, 5, 6, 5, 'Essential reading', 'Every developer must read this book.');

-- =============================================================
-- VERIFY DATA WAS INSERTED
-- =============================================================

-- View summary statistics
SELECT 'users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'categories', COUNT(*) FROM categories
UNION ALL
SELECT 'products', COUNT(*) FROM products
UNION ALL
SELECT 'inventory', COUNT(*) FROM inventory
UNION ALL
SELECT 'orders', COUNT(*) FROM orders
UNION ALL
SELECT 'order_items', COUNT(*) FROM order_items
UNION ALL
SELECT 'reviews', COUNT(*) FROM reviews;

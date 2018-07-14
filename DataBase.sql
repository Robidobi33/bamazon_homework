DROP DATABASE IF EXISTS bamazonInv_db;
CREATE DATABASE bamazonInv_bd;
USE bamazonInv_bd;

CREATE TABLE products(
	item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NULL,
    department_name VARCHAR(50) NULL,
    price FLOAT NULL,
    stock_quantity INT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("Megging", "Not So Manly Store", 30.00, 8);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("ABhancer", "Beer Gut Be Gone", 45.00, 12);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("Completely Safe Exploding Lighters", "Shady Guy Selling Stuff", 9.99, 3);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("Tom Sellecks Mustache", "Tom Selleck", 1137.45, 1);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("Sleepy Time Spray for Kids", "Chloroform-Mart", 45.00, 57);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("Moderately Displeased Feline Poster", "Off-Brand Memes", 5.00, 10);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("Celebrity Endorsed Dull Knives", "Infomercials.net", 19.99, 78);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("Hornets Nest", "People Who Make Epipens", 25.99, 34);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("How to Join a Cult in One Easy Step", "Born Into It ministries", 9.99, 10);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("A Movie About A Movie About A Room", "I Did Not invoke Hand Violance Against Her", 25.00, 30);
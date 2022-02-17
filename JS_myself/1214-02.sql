INSERT INTO `01-address` 
(`id`, `name`, `birthday`, `e-mail`, `phone`, `address`) 
VALUES 
('1', '簡瑋琪', '1997-11-04', 'winnie145ch@gmail.com', '0912-345678', '台北市'), 
('2', '志明', '1990-01-01', 'aaa@gmail.com', '0912-345678', '台北市');

SELECT o.member_sid, o.order_date, od.*, p.bookname
FROM `orders` o
    JOIN `order_details` od
    ON o.sid = od.order_sid
    JOIN `products`p
    ON p.sid = od.product_sid


SELECT c1.*, c2.`name` 
FROM `categories` c1
    LEFT JOIN `categories` c2
    ON c1.`parent_sid` = c2.`sid`

--SELECT * FROM `products` WHERE product_sid IN (
    SELECT product_sid FROM `order_details` WHERE `oreder_sid`=10
);

SELECT * FROM `products`
    JOIN (SELECT `product_sid`, `price` od_price
        FROM `order-details` WHERE `order-sid`=10) od
        ON `products`.`sid` = od.`product_sid`;
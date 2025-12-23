-- Insert sample products
INSERT INTO public.products (name, price, category_id, stock, sku, barcode) VALUES
-- Coffee
('Espresso', 3.50, '4e2fff25-072d-4f1f-a51a-9bfaa9576b71', 100, 'COF-001', '1234567890001'),
('Americano', 4.00, '4e2fff25-072d-4f1f-a51a-9bfaa9576b71', 100, 'COF-002', '1234567890002'),
('Cappuccino', 4.50, '4e2fff25-072d-4f1f-a51a-9bfaa9576b71', 100, 'COF-003', '1234567890003'),
('Latte', 4.75, '4e2fff25-072d-4f1f-a51a-9bfaa9576b71', 100, 'COF-004', '1234567890004'),
('Mocha', 5.25, '4e2fff25-072d-4f1f-a51a-9bfaa9576b71', 80, 'COF-005', '1234567890005'),
-- Beverages
('Iced Tea', 3.00, 'c5f6afb5-817d-4a10-b034-79dee1e10ddf', 50, 'BEV-001', '1234567890010'),
('Fresh Orange Juice', 4.50, 'c5f6afb5-817d-4a10-b034-79dee1e10ddf', 40, 'BEV-002', '1234567890011'),
('Bottled Water', 1.50, 'c5f6afb5-817d-4a10-b034-79dee1e10ddf', 200, 'BEV-003', '1234567890012'),
('Hot Chocolate', 4.00, 'c5f6afb5-817d-4a10-b034-79dee1e10ddf', 60, 'BEV-004', '1234567890013'),
-- Pastries
('Croissant', 3.25, 'cf4f8011-c09a-4cad-9bde-605cf5ba6f69', 30, 'PAS-001', '1234567890020'),
('Blueberry Muffin', 3.50, 'cf4f8011-c09a-4cad-9bde-605cf5ba6f69', 25, 'PAS-002', '1234567890021'),
('Chocolate Cookie', 2.00, 'cf4f8011-c09a-4cad-9bde-605cf5ba6f69', 40, 'PAS-003', '1234567890022'),
('Cinnamon Roll', 4.00, 'cf4f8011-c09a-4cad-9bde-605cf5ba6f69', 20, 'PAS-004', '1234567890023'),
-- Food
('Ham & Cheese Sandwich', 6.50, '8f879511-9e8a-4e6a-9744-f2e5069d3065', 15, 'FOO-001', '1234567890030'),
('Caesar Salad', 8.00, '8f879511-9e8a-4e6a-9744-f2e5069d3065', 10, 'FOO-002', '1234567890031'),
('Avocado Toast', 7.50, '8f879511-9e8a-4e6a-9744-f2e5069d3065', 12, 'FOO-003', '1234567890032'),
-- Merchandise
('Coffee Mug', 12.00, '435da60a-1ad8-482f-ade4-ac9a885cce0c', 25, 'MER-001', '1234567890040'),
('Tote Bag', 15.00, '435da60a-1ad8-482f-ade4-ac9a885cce0c', 20, 'MER-002', '1234567890041'),
('Coffee Beans 250g', 14.00, '435da60a-1ad8-482f-ade4-ac9a885cce0c', 50, 'MER-003', '1234567890042');
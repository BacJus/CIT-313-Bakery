import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const setupDatabase = () => {
    return open({
        filename: './public/database/food.db',
        driver: sqlite3.Database
    }).then(db => {
        return db.exec(`
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                description TEXT,
                price REAL,
                availability BOOLEAN,
                image TEXT
            )
        `).then(() => {
            return db;
        });
    });
};

export const getDbConnection = () => {
    return open ({
        filename: './public/database/food.db',
        driver: sqlite3.Database
    });
};

export const seedDatabase = () => {
    return getDbConnection().then(db => {
        return db.run(`
                INSERT INTO products (name, description, price, availability, image)
                VALUES
                ('Banana Bread', 'Moist homemade banana bread made with ripe bananas.', 4.50, 6, 'food1.jpg'),
                ('Chocolate Chip Cookie', 'Soft cookie filled with semi-sweet chocolate chips.', 2.25, 0, 'food2.jpg'),
                ('Blueberry Muffin', 'Fluffy muffin filled with fresh blueberries.', 3.00, 8, 'food3.jpg'),
                ('Cinnamon Roll', 'Soft cinnamon roll topped with sweet icing.', 4.75, 10, 'food4.jpg'),
                ('Chocolate Croissant', 'Flaky pastry filled with rich chocolate.', 4.25, 0, 'food5.jpg'),
                ('Apple Pie', 'Classic pie filled with cinnamon apples.', 5.50, 12, 'food6.jpg'),
                ('Strawberry Shortcake', 'Shortcake topped with strawberries and whipped cream.', 5.25, 5, 'food7.jpg'),
                ('Lemon Cupcake', 'Light cupcake topped with lemon frosting.', 3.25, 0, 'food8.jpg'),
                ('Chocolate Brownie', 'Fudgy chocolate brownie with a rich chocolate flavor.', 3.50, 11, 'food9.jpg'),
                ('Plain Bagel', 'Freshly baked chewy bagel.', 2.50, 20, 'food10.jpg')
          `);
    });
};
import { setupDatabase, getDbConnection, seedDatabase } from './database.js';
import express from 'express';
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname + "/public"));

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.redirect("/products");
});

app.get("/products", (req, res) => {
    getDbConnection()
        .then((db) => {
            return db.all('SELECT * FROM products');
        })
        .then((products) => {
            res.render("pages/products", {
                data: products,
                title: "Bakery Products"
        });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
    });
});

app.get('/about', (req, res) => {
    res.render('pages/about', { title : "About Us" });
});

app.get('/contact', (req, res) => {
    res.render('pages/contact', { title : "Contact Us" });
});

setupDatabase()
    .then(() => {
        return getDbConnection();
    })
    .then((db) => {
        return db.get('SELECT COUNT(*) AS count FROM products');
    })
    .then((result) => {
        if(result.count === 0) {
            return seedDatabase();
        }
    })
    .then(() => {
        app.listen(port, () => {
            console.log(`App listening at port ${port}`);
        });
    })
    .catch((error) => {
        console.error(error);
    });
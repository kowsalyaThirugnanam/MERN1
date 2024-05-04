import express from "express";
import bodyParser from "body-parser";
import pg from "pg"
import fileUpload from "express-fileupload";
import { dirname } from "path";
import { fileURLToPath } from "url";
// import { helpers } from "./views/helpers/helpers";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "online-store",
    password: "Nethravk12052016",
    port: 5432,
});
db.connect();

// const upload = multer({ dest: 'uploads/' })
/**
 * Add body-parser as middle ware and declare public folder as static
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// use file-upload as middleware
app.use(fileUpload());
/**
 * Start the express server
 */
app.listen(port, () => {
    console.log("Server started successfully !!!");
})

app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.get("/onlineStore", async (req, res) => {
    const result = await db.query("SELECT * FROM product");
    console.log("result", result.rows);
    // tried but the image display is not working
       // Obtain a blob: URL for the image data.
       var arrayBufferView = new Uint8Array( result.rows[0].image.data );
       var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
       var urlCreator = globalThis.URL || globalThis.webkitURL;
       var imageUrl = urlCreator.createObjectURL( blob );
       console.log("imageUrl",imageUrl);
    //    var img = global.document.querySelector( "image1" );
    //    img.src = imageUrl;
    res.render("onlineStore.ejs",{data:result.rows}\)
})

app.get("/products", (req, res) => {
    console.log("req", req.query);
    var data;
    if (req.query.name == 'add') {
        data = {
            select: 'add'
        }

    } else {
        data = {
            select: 'edit'
        }
    }
    res.render("products.ejs", data)
})

app.post('/add', async (req, res) => {
    // Log the files to the console
    console.log(req.files);
    // Get the file that was set to our field named "image"
    const { image } = req.files;
    // If no image submitted, exit
    if (!image) return res.sendStatus(400);
    // Move the uploaded image to our upload folder
    // image.mv(__dirname + '/add/' + image.name);

    const params = req.body
    req.body.image = image
    console.log("body",params);
    const result = await db.query('INSERT INTO product (title,description,amount,image) VALUES ($1,$2,$3,$4)',[params.title,params.discription,params.amount,params.image]);
    console.log("result",result.rows);
    res.sendStatus(200)
    // const resp = await db.query('SELECT * FROM product')
    // console.log("resp",resp.rows);
})

import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "Nethravk12052016",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// let items = [
//   { id: 1, title: "Buy milk" },
//   { id: 2, title: "Finish homework" },
// ];
async function getItems() {
  try {
    const result = await db.query("SELECT * FROM items ORDER BY id ASC")
    return result.rows;
  } catch (error) {
    console.log("Not get items from db :error",error);
  }
  
}
app.get("/", async (req, res) => {
  const getItemsFromDB = await getItems()
  console.log("getItems",getItemsFromDB);
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: getItemsFromDB,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  if(item != undefined || null){
    try {
      const addItem = await db.query("INSERT INTO items (title) VALUES ($1)",[item])
      
    } catch (error) {
      console.log("Add items failed",error);
    }
  }

  items.push({ title: item });
  res.redirect("/");
});

app.post("/edit", async(req, res) => {
  console.log("edit req",req.body);
  try {
    const result = await db.query("UPDATE items SET title = $1 WHERE id = $2",[req.body.updatedItemTitle, req.body.updatedItemId]);
    res.redirect('/')
  } catch (error) {
    console.log("Edit items failed",error);
  }
  
});

app.post("/delete", async(req, res) => {
  console.log("delete",req.body);
  try {
    const result = await db.query("DELETE FROM items WHERE id = $1",[req.body.deleteItemId])
    res.redirect("/")
  } catch (error) {
    console.log("Edit items failed",error);
  }
  
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const { error } = require("protractor");
const path = require("path");

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"8187811349@Eh",
    database:"crud_contacts"
})

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname + "/public")));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/get",(req, res)=>{
    const sqlGet = "SELECT * FROM contacts_db";
    db.query(sqlGet,(error, result)=>{
        res.send(result);
    })
})

app.post("/api/post", (req, res)=>{
    const {name, email, number} = req.body;
    const sqlInsert = "INSERT INTO contacts_db(name, email,number) VALUES (?,?,?)";
    db.query(sqlInsert,[name,email,number],(error, result)=>{
        if(error){
            console.log(error)
        }
    })
})

app.delete("/api/remove/:id", (req, res)=>{
    const {id} = req.params;
    const sqlRemove = "DELETE FROM contacts_db where id=?";
    db.query(sqlRemove,id,(error, result)=>{
        if(error){
            console.log(error)
        }
    })
})

app.get("/api/get/:id",(req, res)=>{
    const {id} = req.params
    const sqlGet = "SELECT * FROM contacts_db where id = ?";
    db.query(sqlGet,id,(error, result)=>{
        if(error){
            console.log(error)
        }
        res.send(result);
    })
})
app.put("/api/update/:id",(req, res)=>{
    const {id} = req.params
    const {name, email, number} = req.body;
    const sqlUpdate = "UPDATE contacts_db SET name=?, email=?, number=? where id=?";
    db.query(sqlUpdate,[name,email,number,id],(error, result)=>{
        if(error){
            console.log(error)
        }
        res.send(result);
    })
})

app.get("/", (req, res)=>{
    // const sqlInsert = "INSERT INTO contacts_db(name, email,number) VALUES ('hari','hari@gmail.com', 5156156)";
    // db.query(sqlInsert, (error, result)=>{
    //     console.log("error", error);
    //     console.log("result", result);
    // });
    // res.send("Hello Express")
});
const PORT = process.env.PORT || 5001
app.listen(PORT);
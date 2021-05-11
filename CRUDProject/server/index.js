const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "CRUDDatabase",
});

app.use(cors());
app.use(bodyParser.json());

app.get("/api/get_all_company", (req, res) => {
  const sqlSelect =
    "SELECT id, companyName, taxNumber, applicant, tel, updateTime FROM company";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log("select seccess");
    }
  });
});

app.get("/api/get_company/:companyId", (req, res) => {
  const id = req.params.companyId;
  const sqlSelect = "SELECT * FROM company where id = ?";
  db.query(sqlSelect, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log("select seccess");
    }
  });
});

app.post("/api/insert", (req, res) => {
  const applicant = req.body.applicant;
  const companyName = req.body.companyName;
  const taxNumber = req.body.taxNumber;
  const responser = req.body.responser;
  const address = req.body.address;
  const tel = req.body.tel;
  const fax = req.body.fax;
  const note = req.body.note;
  const contactPerson = req.body.contactPerson;

  const sqlInsert =
    "INSERT INTO company (applicant, companyName, taxNumber, responser, address, tel, fax, note, contactPerson, updateTime ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, current_timestamp)";
  db.query(
    sqlInsert,
    [
      applicant,
      companyName,
      taxNumber,
      responser,
      address,
      tel,
      fax,
      note,
      contactPerson,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("result", result);
        console.log("insert seccess");
      }
    }
  );

  res.json(req.body);
});

app.put("/api/update/:companyId", (req, res) => {
  const companyId = req.params.companyId;

  const applicant = req.body.applicant;
  const companyName = req.body.companyName;
  const taxNumber = req.body.taxNumber;
  const responser = req.body.responser;
  const address = req.body.address;
  const tel = req.body.tel;
  const fax = req.body.fax;
  const note = req.body.note;

  const sqlInsert = `UPDATE company SET 
      applicant = ?, 
      companyName = ?, 
      taxNumber = ?, 
      responser = ?, 
      address = ?,
      tel = ?,
      fax = ?, 
      note = ?, 
      updateTime = current_timestamp 
      WHERE id = ?
    `;
  db.query(
    sqlInsert,
    [
      applicant,
      companyName,
      taxNumber,
      responser,
      address,
      tel,
      fax,
      note,
      companyId,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("result", result);
        console.log("update seccess");
      }
    }
  );

  res.json(req.body);
});

app.delete("/api/delete/:companyId", (req, res) => {
  const id = req.params.companyId;

  const sqlDelete = "DELETE FROM company WHERE id = ?";
  db.query(sqlDelete, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log("delete seccess");
    }
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});

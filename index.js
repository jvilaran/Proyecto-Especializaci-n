const express = require('express');
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 3000;

// Middleware para parsear datos de formularios
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de sesión
app.use(session({
  secret: "mi_secreto",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Servir archivos estáticos (HTML, CSS, JS) desde la carpeta actual
app.use(express.static(__dirname));

// Ruta para guardar comentario
app.post("/guardar", (req, res) => {
  const { comentario } = req.body;

  if (!req.session.comentarios) {
    req.session.comentarios = [];
  }

  req.session.comentarios.push(comentario);

  res.redirect("/#comments_section");
});

//Ruta para mostrar comentarios
app.get("/comments", (req, res) => {
  const comentarios = req.session.comentarios || [];
  res.json(comentarios);
});

app.listen(port, () => { 
console.log(`Server is running on port ${port}`);
}); 
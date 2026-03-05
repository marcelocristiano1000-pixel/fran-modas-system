const express = require("express");
const multer = require("multer");
const QRCode = require("qrcode");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({ produtos: [], pix: "" }).write();

const app = express();
const upload = multer({ dest: "public/uploads/" });

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const ALLOWED_IP = "191.6.94.56";

function checkIP(req, res, next) {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
  if (!ip.includes(ALLOWED_IP)) {
    return res.status(403).send("Acesso restrito à rede interna.");
  }
  next();
}

app.get("/", (req, res) => {
  const produtos = db.get("produtos").value();
  let html = "<h1>Fran Modas</h1>";
  produtos.forEach(p => {
    html += `
      <div style="margin-bottom:20px;">
        <h3>${p.nome}</h3>
        <img src="/uploads/${p.imagem}" width="200"/>
        <p>R$ ${p.preco}</p>
      </div>
    `;
  });
  res.send(html);
});

app.get("/admin", checkIP, (req, res) => {
  res.send(`
    <h2>Painel Admin</h2>

    <form action="/add" method="post" enctype="multipart/form-data">
      Nome: <input name="nome"/><br/>
      Preço: <input name="preco"/><br/>
      Imagem: <input type="file" name="imagem"/><br/>
      <button type="submit">Cadastrar</button>
    </form>

    <br/><br/>

    <form action="/pix" method="post">
      Chave PIX: <input name="pix"/><br/>
      <button type="submit">Salvar PIX</button>
    </form>
  `);
});

app.post("/add", checkIP, upload.single("imagem"), (req, res) => {
  db.get("produtos")
    .push({
      nome: req.body.nome,
      preco: req.body.preco,
      imagem: req.file.filename
    })
    .write();

  res.redirect("/admin");
});

app.post("/pix", checkIP, async (req, res) => {
  db.set("pix", req.body.pix).write();
  const qr = await QRCode.toDataURL(req.body.pix);

  res.send(`
    <h3>PIX salvo com sucesso</h3>
    <img src="${qr}" />
    <br/><br/>
    <a href="/admin">Voltar</a>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Fran Modas</title>
</head>
<body style="font-family: Arial; text-align:center; background:#f5f5f5;">

    <h1>Fran Modas 👗</h1>

    <h2>Adicionar Produto</h2>

    <form id="form">
        <input type="text" name="name" placeholder="Nome do Produto" required><br><br>
        <input type="text" name="price" placeholder="Preço" required><br><br>
        <input type="text" name="pix" placeholder="Chave PIX" required><br><br>
        <input type="file" name="image" required><br><br>
        <button type="submit">Adicionar Produto</button>
    </form>

    <h2>Produtos</h2>
    <div id="products"></div>

<script>
document.getElementById("form").addEventListener("submit", async function(e){
    e.preventDefault();
    const formData = new FormData(this);
    await fetch("/add-product", {
        method: "POST",
        body: formData
    });
    loadProducts();
});

async function loadProducts(){
    const res = await fetch("/products");
    const products = await res.json();
    const div = document.getElementById("products");
    div.innerHTML = "";
    products.forEach(p => {
        div.innerHTML += `
            <div style="border:1px solid #ccc; padding:10px; margin:10px;">
                <h3>${p.name}</h3>
                <img src="${p.image}" width="150"><br>
                <strong>R$ ${p.price}</strong><br>
                <img src="${p.qr}" width="150">
            </div>
        `;
    });
}

loadProducts();
</script>

</body>
</html>

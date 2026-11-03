const produtos=[{"id": 1, "nome": "Camiseta Raglan", "cat": "Camisetas", "marca": "Marca não visível", "preco": 1200, "imagem": "camiseta-raglan.jpg"}, {"id": 2, "nome": "Calça Cinza", "cat": "Calças", "marca": "Marca não visível", "preco": 1800, "imagem": "calca-cinza.jpg"}, {"id": 3, "nome": "Calça Jeans Clara", "cat": "Calças", "marca": "Marca não visível", "preco": 1900, "imagem": "calca-jeans-clara.jpg"}, {"id": 4, "nome": "Mochila Puma", "cat": "Acessórios", "marca": "Puma", "preco": 2200, "imagem": "mochila-puma.jpg"}, {"id": 5, "nome": "Polo Crocodilo", "cat": "Camisas", "marca": "Lacoste", "preco": 1600, "imagem": "polo-lacoste.jpg"}, {"id": 6, "nome": "Polo Classic", "cat": "Camisas", "marca": "Polo Ralph Lauren", "preco": 1800, "imagem": "polo-ralph-lauren.jpg"}, {"id": 7, "nome": "Sweatshirt Gráfica", "cat": "Casacos", "marca": "Marca não visível", "preco": 2100, "imagem": "sweatshirt-grafico.jpg"}, {"id": 8, "nome": "T-shirt Boca", "cat": "Camisetas", "marca": "Marca não visível", "preco": 1300, "imagem": "tshirt-boca.jpg"}, {"id": 9, "nome": "Ténis Preto", "cat": "Calçados", "marca": "Nike (modelo não confirmado)", "preco": 2500, "imagem": "tenis-preto.jpg"}, {"id": 10, "nome": "Bolsa de Ombro", "cat": "Acessórios", "marca": "Marca não visível", "preco": 2200, "imagem": "bolsa-alca.jpg"}, {"id": 11, "nome": "Mochila Preta", "cat": "Acessórios", "marca": "Marca não visível", "preco": 1800, "imagem": "mochila-preta.jpg"}, {"id": 12, "nome": "Casaco Puffer", "cat": "Casacos", "marca": "Nike", "preco": 3200, "imagem": "casaco-puffer-nike.jpg"}, {"id": 13, "nome": "Casaco Puffer Preto", "cat": "Casacos", "marca": "Marca não visível", "preco": 3000, "imagem": "casaco-puffer.jpg"}, {"id": 14, "nome": "Vestido Azul", "cat": "Vestidos", "marca": "Marca não visível", "preco": 2400, "imagem": "vestido-azul.jpg"}, {"id": 15, "nome": "Calça Jeans Azul", "cat": "Calças", "marca": "Marca não visível", "preco": 1900, "imagem": "calca-jeans-azul.jpg"}, {"id": 16, "nome": "Polo Preta", "cat": "Camisas", "marca": "Marca não visível", "preco": 1500, "imagem": "polo-preta.jpg"}];
let carrinho=[];
const categorias=["Todos","Camisetas","Camisas","Calças","Vestidos","Casacos","Calçados","Acessórios"];
const filters=document.getElementById("filters");
categorias.forEach(c=>{filters.innerHTML+=`<button class="filter ${c==="Todos"?"active":""}" data-cat="${c}">${c}</button>`;});
function mostrarProdutos(cat="Todos"){
 const grid=document.getElementById("produtos-grid"); grid.innerHTML="";
 produtos.filter(p=>cat==="Todos"||p.cat===cat).forEach(p=>{
 grid.innerHTML+=`<article class="card"><img class="product-img" src="${p.imagem}" alt="${p.nome}"><div class="card-body"><h3>${p.nome}</h3><div class="brand">${p.marca}</div><div class="price">${p.preco.toLocaleString("pt-MZ")} MT</div><button class="add" onclick="adicionar(${p.id})">Adicionar ao carrinho</button></div></article>`;
 });
}
function adicionar(id){const p=produtos.find(x=>x.id===id);const item=carrinho.find(x=>x.id===id);item?item.qtd++:carrinho.push({...p,qtd:1});atualizar();}
function atualizar(){
 document.getElementById("contador").textContent=carrinho.reduce((s,i)=>s+i.qtd,0);
 const box=document.getElementById("itens-carrinho"); box.innerHTML=carrinho.length?"":"<p>O carrinho está vazio.</p>";
 carrinho.forEach(i=>box.innerHTML+=`<div class="cart-item"><div><b>${i.nome}</b><br>${i.marca}<br>${i.preco.toLocaleString("pt-MZ")} MT<br><span class="qty"><button onclick="mudar(${i.id},-1)">−</button> ${i.qtd} <button onclick="mudar(${i.id},1)">+</button></span></div><b>${(i.preco*i.qtd).toLocaleString("pt-MZ")} MT</b></div>`);
 document.getElementById("total").textContent=carrinho.reduce((s,i)=>s+i.preco*i.qtd,0).toLocaleString("pt-MZ")+" MT";
}
function mudar(id,n){const i=carrinho.find(x=>x.id===id);i.qtd+=n;if(i.qtd<=0)carrinho=carrinho.filter(x=>x.id!==id);atualizar();}
function abrirCarrinho(){document.getElementById("carrinho").style.display="flex";atualizar();}
function fecharCarrinho(){document.getElementById("carrinho").style.display="none";}
function finalizarWhatsApp(numero){
 if(!carrinho.length){alert("O carrinho está vazio.");return;}
 let msg="Olá! Quero fazer este pedido:%0A%0A";
 carrinho.forEach(i=>msg+=`- ${i.nome} (${i.marca}) x${i.qtd}: ${(i.preco*i.qtd).toLocaleString("pt-MZ")} MT%0A`);
 msg+=`%0ATotal: ${carrinho.reduce((s,i)=>s+i.preco*i.qtd,0).toLocaleString("pt-MZ")} MT`;
 window.open("https://wa.me/"+numero+"?text="+msg,"_blank");
}
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");mostrarProdutos(b.dataset.cat);}));
mostrarProdutos();

// Lê os produtos que já estão escritos no index.html
const produtos=[...document.querySelectorAll("#produtos-grid .card")].map(c=>({id:+c.dataset.id,nome:c.dataset.nome,cat:c.dataset.cat,marca:c.dataset.marca,preco:+c.dataset.preco}));
let carrinho=[];
const categorias=["Todos","Camisetas","Camisas","Calças","Vestidos","Casacos","Calçados","Acessórios"];
const filters=document.getElementById("filters");
categorias.forEach(c=>{filters.innerHTML+=`<button class="filter ${c==="Todos"?"active":""}" data-cat="${c}">${c}</button>`;});
function mostrarProdutos(cat="Todos"){
 document.querySelectorAll("#produtos-grid .card").forEach(c=>{c.style.display=(cat==="Todos"||c.dataset.cat===cat)?"":"none";});
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

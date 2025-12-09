const form = document.getElementById("formItem");
const lista = document.getElementById("listaItens");
const totalSpan = document.getElementById("total");


let itens = JSON.parse(localStorage.getItem("itens")) || [];
let totalGeral = 0;


itens.forEach(item => criarLinha(item));

function criarLinha(item) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.qtd}</td>
    <td>R$ ${item.preco.toFixed(2)}</td>
    <td>R$ ${item.total.toFixed(2)}</td>
    <td><button onclick="excluir(this)">Excluir</button></td>
  `;

  lista.appendChild(tr);

  // Atualiza o total geral
  totalGeral += item.total;
  totalSpan.textContent = totalGeral.toFixed(2);
}

// ----- Adicionar item -----
form.addEventListener("submit", function(event) {
  event.preventDefault();

  const nome = document.getElementById("nomeItem").value;
  const qtd = parseInt(document.getElementById("quantidadeItem").value);
  const preco = parseFloat(document.getElementById("precoItem").value);
  const total = qtd * preco;

  const item = { nome, qtd, preco, total };
  itens.push(item);

  criarLinha(item);

  localStorage.setItem("itens", JSON.stringify(itens));

  form.reset();
});

function excluir(botao) {
  const linha = botao.parentElement.parentElement;
  const nomeItem = linha.children[0].textContent;

  itens = itens.filter(item => item.nome !== nomeItem);

  localStorage.setItem("itens", JSON.stringify(itens));

  const valorLinha = parseFloat(linha.children[3].textContent.replace("R$ ", ""));
  totalGeral -= valorLinha;
  totalSpan.textContent = totalGeral.toFixed(2);

  linha.remove();
}

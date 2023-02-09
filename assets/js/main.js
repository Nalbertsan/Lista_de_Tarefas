
function main() {
  const inputTarefa = document.querySelector('.input-tarefa');
  const btnTarefa = document.querySelector('.btn-tarefa');
  const tarefas = document.querySelector('.tarefas');

  inputTarefa.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
      if (!inputTarefa.value) return;
      criarTarefa(inputTarefa.value);
      limparTexto()
    }
  })

  function limparTexto() {
    inputTarefa.value = '';
    inputTarefa.focus();
  }

  btnTarefa.addEventListener('click', function (e) {
    if (!inputTarefa.value) return;
    criarTarefa(inputTarefa.value);
    limparTexto()
  })

  function criarLi() {
    const li = document.createElement('li');
    return li;
  }


  function criarTarefa(textoTarefa) {
    const li = criarLi();
    li.innerText = textoTarefa;
    addBtnApagar(li);
    tarefas.appendChild(li);
    salvarTarefas();
  }

  function addBtnApagar(li) {
    li.innerText += " ";
    const btn = document.createElement('button');
    btn.setAttribute('class', 'apagar');
    btn.innerText = 'Apagar'
    li.appendChild(btn);

  }

  document.addEventListener('click', function (e) {
    const el = e.target;
    if (el.classList.contains("apagar")) {
      el.parentElement.remove();
      salvarTarefas();
    }
  })

  function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
      let tarefaTexto = tarefa.innerText;
      tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
      listaDeTarefas.push(tarefaTexto);
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
  }

  function addTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    for (let tarefa of listaDeTarefas) {
      criarTarefa(tarefa);
    }
  }
  addTarefasSalvas();
}
main();
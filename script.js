
const thead = document.querySelector('thead');
const tbody = document.querySelector('tbody');

let tarefas = [];
let id = 1;
let strikeCells = [];

const salvar = () => {
    if(localStorage.tarefasSave){
        tarefas = JSON.parse(localStorage.getItem('tarefasSave'));
    }
    if(localStorage.idSave){
        id = JSON.parse(localStorage.getItem('idSave'));
    }
    const input = document.querySelector('input').value;
    const date = new Date().toLocaleString();
    if(input != ''){
        let object = {};
        object.id = id;
        object.titulo = input;
        object.data = date;
        tarefas.push(object);
        id++;
    }
    else{
        alert('Por favor, insira uma tarefa!');
    }
    localStorage.tarefasSave = JSON.stringify(tarefas);
    localStorage.idSave = JSON.stringify(id);
}

listar = () => {
    if(localStorage.tarefasSave){
        tarefas = JSON.parse(localStorage.getItem('tarefasSave'));
    }
    if(localStorage.idSave){
        id = JSON.parse(localStorage.getItem('idSave'));
    }
    if(localStorage.strikeSave){
        strikeCells = JSON.parse(localStorage.getItem('strikeSave'));
    }

    tbody.textContent = '';
    thead.textContent = '';
    thead.style.backgroundColor = 'black';
    thead.style.color = 'blue';

    if(tarefas.length != 0){
    console.log(strikeCells);
        form.style.marginBottom = '10px';

        let th = thead.insertRow();
        let titles = th.insertCell();
        let dates = th.insertCell();
        let actions = th.insertCell();

        titles.textContent = 'Tarefas';
        dates.textContent = 'Última Modificação';
        actions.textContent = 'Ações';

        for(let tarefa of tarefas){

            let td = tbody.insertRow();

            let title = td.insertCell();

            let date = td.insertCell();
            let actions = td.insertCell();

            title.setAttribute('id', ""+tarefa.id+"");

            title.textContent = tarefa.titulo;
            date.textContent = tarefa.data;
            
            for(let tachado of strikeCells){
                if(tarefa.id == tachado){

                let strike = document.createElement('del');
                title.textContent = '';
                title.appendChild(strike);
                strike.textContent = tarefa.titulo;
                } 
            }

            const editBtn = document.createElement('button');
            const doneBtn = document.createElement('button');
            const copyBtn = document.createElement('button')
            const delBtn = document.createElement('button')

            actions.appendChild(editBtn);
            actions.appendChild(doneBtn);
            actions.appendChild(copyBtn);
            actions.appendChild(delBtn);
            
            editBtn.setAttribute('onclick', "editar("+tarefa.id+")");
            doneBtn.setAttribute('onclick', "concluir("+tarefa.id+")");
            copyBtn.setAttribute('onclick', "duplicar("+tarefa.id+")");
            delBtn.setAttribute('onclick', "deletar("+tarefa.id+")");

            editBtn.setAttribute('title', "Editar");
            doneBtn.setAttribute('title', "Concluir");
            copyBtn.setAttribute('title', "Duplicar");
            delBtn.setAttribute('title', "Excluir");

            editBtn.textContent = '📝';
            doneBtn.textContent = '✔';
            copyBtn.textContent = '🔁';
            delBtn.textContent = '❌';
        }
    }
}

const editar = (i) => {   
    for(let tarefa of tarefas){
        if(tarefa.id == i){
            const button = document.createElement('button');
            const input = document.createElement('input');

            button.textContent = 'OK';

            edit = document.getElementById(""+i+"");
            edit.textContent = '';
            edit.appendChild(input);
            edit.appendChild(button);

            button.addEventListener('click', () => {
                tarefa.titulo = input.value;
                tarefa.data = new Date().toLocaleString();
                localStorage.tarefasSave = JSON.stringify(tarefas);
                listar();
            });
        }
    }
};
const concluir = (i) => {
    for(let tarefa of tarefas){
        if(tarefa.id == i){
            let n = 0;
            for(let busca of strikeCells){
                if(busca == i){
                    n = 1;
                }
            }

            if (n == 0) {
                strikeCells.push(i);
                tarefa.data = new Date().toLocaleString();
            }
            
            localStorage.tarefasSave = JSON.stringify(tarefas);
            localStorage.strikeSave = JSON.stringify(strikeCells);
            listar();
        }
    }
};

const duplicar = (i) => {
    for(let tarefa of tarefas){
        if(tarefa.id == i){
            
            let copy = {};
            copy.id = id;
            copy.titulo = tarefa.titulo;
            copy.data = new Date().toLocaleString();
            tarefas.push(copy);
            id++;

            localStorage.tarefasSave = JSON.stringify(tarefas);
            localStorage.idSave = JSON.stringify(id);
            listar();
        }
    }
};

const deletar = (i) => {
    for(let del of tarefas){
        if(del.id == i) {
            tarefas.splice(i-1, 1);
        }
    }

    id = 1;
    for(let contador of tarefas){
        contador.id = id;
        id++;
    }

    let busca = strikeCells.filter(numeros => numeros != (i));
    strikeCells = busca;

    for(let x = 0; x < strikeCells.length; x++){
        if(strikeCells[x] > i){
            let n = strikeCells[x];
            n--;
            strikeCells[x] = n;
        }
    }

    localStorage.tarefasSave = JSON.stringify(tarefas);
    localStorage.idSave = JSON.stringify(id);
    localStorage.strikeSave = JSON.stringify(strikeCells);
    listar();
};
const form = document.querySelector('form');

window.addEventListener('load', listar());

form.addEventListener('submit', (e) => {
    e.preventDefault();

    salvar();
    listar();
});
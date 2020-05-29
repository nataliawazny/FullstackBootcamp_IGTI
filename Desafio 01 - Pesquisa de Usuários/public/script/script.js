let inputName = null;
let inputButton = null;
let allUsers = [];
let countUsers = 0;

window.addEventListener('load', () => {
    inputName = document.querySelector('#input-texto');
    inputButton = document.querySelector('#input-botao');
    preventFormSubmit();
    callinputText();
    callinputButton();
});

async function fetchUsers() {
    const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    const data = await res.json();
    allUsers = data.results.map(user => {
        const {name, dob, gender, picture} = user;
        return {
            name: `${name.first} ${name.last}`,
            age: dob.age,
            picture: picture.thumbnail,
            gender
        }
    });
    render();
}

function preventFormSubmit() {
    function handleFormSubmit(event) {
        event.preventDefault();
    }

    let form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);
}

function callinputButton() {
    inputButton.addEventListener('click', handleTyping)
}

function callinputText() {
    inputName.focus();
    inputName.addEventListener('keyup', handleTyping)
}


function handleTyping(event) {
    if (inputName!='') {
        inputButton.disabled = false;
        if(event.key=='Enter' || event.type=='click') {
            fetchUsers();
        }
    }
}

function render() {
    renderUsers();
    renderEstatisticas();
}

function renderUsers() {
    let num = 0;

    const input = inputName.value;

    const find = allUsers.filter(user => user.name.toLowerCase().match(input.toLowerCase()));

    allUsers = [...find];

    allUsers.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });

    let usersHTML = '<div>';

    allUsers.forEach(user => {
        const {name, age, picture} = user;

        const userHTML = `
        <div class="user">
            <ul>
                <li> <img src="${picture}" alt="${name}" </li>
                <li> <p>${name}, ${age} anos</p> </li>
            </ul>
        </div>`

        usersHTML += userHTML;
    });

    usersHTML += '</div>';
    listaUsuarios.innerHTML = usersHTML;

    num = allUsers.length;

    const texto1HTML = `<div><h5>${num} usuário(s) encontrado(s)<h5></div>`
    textoFiltro.innerHTML = texto1HTML;
}

function renderEstatisticas() {
    let estsHTML = '<div>';

    let male = 0;
    let female = 0;
    let sumAges = 0;
    let mAges = 0;

    allUsers.forEach(user => {
        const {age, gender} = user;
            
            if(gender=='male') {
                male++;
            } else if (gender=='female') {
                female ++;
            }

            sumAges += age;
        
            mAges = (sumAges/allUsers.length).toFixed(2);
    });

    const estHTML = `
        <div class="est">
            <div><p>Sexo masculino: <b>${male}</b></p></div>
            <div><p>Sexo feminino: <b>${female}</b></p></div>
            <div><p>Soma das idades: <b>${sumAges}</b></p></div>
            <div><p>Média das idades: <b>${mAges}</b></p></div>
        </div>`

        estsHTML += estHTML;

    estsHTML += '</div>';
    listaInfo.innerHTML = estsHTML;

    const texto2HTML = `<div><h5>Estatísticas<h5></div>`
    textoEstatistica.innerHTML = texto2HTML;
    
}


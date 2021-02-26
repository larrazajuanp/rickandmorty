// Base URL
const characterBase = "https://rickandmortyapi.com/api/character";
const episodesBase = "https://rickandmortyapi.com/api/episode";

// General
const inputSearch = document.getElementById('input-search');
const btnSearch = document.getElementById('btn-search');
const apiResponse = document.getElementById('api-response');
const btnDelete = document.getElementById('delete');
const textNoCharacters = document.querySelector('text-noCharacters');
const image = document.getElementById('image');
const form = document.getElementById('form');
const containerApi = document.getElementById('container-api');
const btnFind = document.getElementById('btn-find');

// Creo una variable para tener todos mis personajes en un array y poder recorrerlo
let characters = [];

// Funcion encargada de traer los personajes
const fetchApi = async () => {
    try {
        const response = await fetch(characterBase);
        const { results: characters } = await response.json();
        //console.log(characters)
        return characters
    } catch (err) {
        console.log(err)
    }
}

// Funcion encargada de borrar un personaje
const deleteCharacter = (id) => {
    document.getElementById(id).remove();
    characters = characters.filter(character => character.id != id);
    console.log(characters)
    characters.length === 0 ? showMessage() : null;
}

// Mensaje cuando no hay mas personajes para mostrar
const showMessage = () => {
    document.querySelector('#message-title').innerHTML = '¡We are sorry, we don´t have more characters to show you!';
    image.style.display = 'block';
    //inputSearch.style.display = 'none';
    //btnSearch.style.display = 'none';
    form.style.display = 'none';
    containerApi.style.display = 'none';
    btnFind.style.display = 'block';
}

// Funcion que inserta la info del personaje en el html
const nodeCreation = ({ image, name, species, id }) => {
    const node = `
                <!-- Column -->
                <div class="my-4 mr-0 md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3" id="${id}">
        
                    <!-- Article -->
                        <article class="overflow-hidden rounded-lg shadow-lg">
                        
                        <img alt="Character" class="block h-auto w-full" src="${image}"> 
                        
                        <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                            <h1 class="text-lg" id="${name}">${name}</h1>
                            <h4 class="text-grey-darker text-sm">
                               Specie: ${species}
                            </h4>
                        </header>
                        <button onClick="deleteCharacter(${id})" class="m-4 md:py-2 md:px-4 bg-red-500 hover:bg-red-600 focus:outline-none text-white rounded-md">Delete</button>
                    </article>
                    <!-- END Article -->
                </div>
        `
    apiResponse.insertAdjacentHTML('beforeend', node);

}


// Funcion encargada de mostrar el personaje seleccionado desde el input
const showCharacter = ({ image, name, species, id }) => {
    const modalCharacter = `
    <div class="flex flex-col max-w-lg bg-white shadow-2xl rounded-lg border-2 border-gray-200 py-4 px-10">
    <div class="flex justify-between mb-4">
    <h2></h2>
    <a href="/characters/"><button class="focus:outline-none">X</button></a>
    </div>
    <!-- Article -->
    <article class="overflow-hidden rounded-lg">
    
    <img alt="Placeholder" class="block h-auto w-full" src="${image}"> 
    
    <header class="flex items-center justify-between leading-tight p-2 md:p-4">
        <h1 class="text-lg" id="${name}">${name}</h1>
        <h4 class="text-grey-darker text-sm">
        Specie: ${species}
        </h4>
    </header>
</article>
<!-- END Article -->
</div>
 
 `
    document.querySelector('.modal').insertAdjacentHTML('beforeend', modalCharacter);
}

// Funcion encargada de buscar un personaje por nombre
const searchCharacters = (e) => {
    e.preventDefault()
    const nameValue = inputSearch.value;
    document.getElementById('container-api').innerHTML = '';
    const foundCharacter = characters.find(character => character.name.toLowerCase() === nameValue.toLowerCase())
    //iterateCharacters(foundCharacter)
    showCharacter(foundCharacter)
    return foundCharacter;
}



// Función encargada de mostrar mensaje si escribio cualquier cosa menos nombre del personaje
const notFoundCharacter = (e) => {
    if (e.key === 'Enter') {
        const value = inputSearch.value;
        if (value == '' && value !== showCharacter(foundCharacter)) {
            showEmptyMessage()
        }
    }
}

const showEmptyMessage = () => {
    document.querySelector('#empty-input-message').innerHTML = '¡Please enter a character name on the input field!';
    document.getElementById('image-empty').style.display = 'block';
    btnFind.style.display = 'block';
    document.getElementById('form').style.display = 'none';
}

inputSearch ? inputSearch.addEventListener('keypress', notFoundCharacter) : null;

// Itera los personajes
const iterateCharacters = (characters) => {
    characters.map(character => nodeCreation(character));
}

// Carga el DOM al hacer click en el boton
const start = async () => {
    btnSearch.addEventListener('click', searchCharacters);
    characters = await fetchApi();
    iterateCharacters(characters)
    image.style.display = 'none';
}


window.onload = start();
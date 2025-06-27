const pick = document.getElementById(`pick`);
const retry = document.getElementById(`retry`);
const levelUp = document.getElementById(`levelUp`);
const pokemon = document.getElementById(`pokemon`);
const container = document.getElementById(`pokemon-container`);
let evolvedPokemon = ``;
let newPokemonId = ``;

const deletePokemon = function () {
    if (pokemon.innerHTML !== ``) {
        pokemon.innerHTML = ``;
    }
}

pick.addEventListener(`click`,() => {
    let pokemonId = Math.floor(Math.random() * 1000 + 1);
    getPokemonData(pokemonId);
    container.style.backgroundColor = `#f3f3f3`
    pick.style.display = `none`
    retry.style.display = `block`

    hsaEvolution(pokemonId);
})

retry.addEventListener(`click`, () => {
    deletePokemon();
    let pokemonId = Math.floor(Math.random() * 1000 + 1);
    getPokemonData(pokemonId);

    hsaEvolution(pokemonId);
})

levelUp.addEventListener(`click`,()=> {
    deletePokemon();
    getPokemonId(evolvedPokemon);
    getPokemonData(newPokemonId);

    hsaEvolution(newPokemonId);
})

async function getPokemonData(pokemonId) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const data = await response.json();
    
    const imgUrl = data.sprites.front_default;
    const imgElement = document.createElement(`img`);
    imgElement.src = imgUrl;
    pokemon.appendChild(imgElement);

    const pokemonName = data.name;
    const nameElement = document.createElement(`h2`);
    nameElement.textContent = pokemonName;
    pokemon.appendChild(nameElement);

    for(let i=0; i<data.types.length; i++) {
        const type = data.types[i].type.name;
        const typeElement = document.createElement(`p`);
        typeElement.textContent = type;
        pokemon.appendChild(typeElement);
    }

    const status = document.createElement(`h3`);
    status.textContent = `STATUS`;
    status.style.margin = `20px 0`
    pokemon.appendChild(status);

    for(let i=0; i<data.stats.length; i++) {
        const stat = (data.stats[i].stat.name).toUpperCase();
        const statNum = data.stats[i].base_stat;
        const statElement = document.createElement(`p`);
        statElement.textContent = `${stat} : ${statNum}`;
        pokemon.appendChild(statElement);
    }

}

async function hsaEvolution(pokemonId) {
    const response1 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`);
    const data1 = await response1.json();
    const hasEvolutionUrl = data1.evolution_chain.url;
    console.log(`pokemonId : `, data1);

    const response2 = await fetch(`${hasEvolutionUrl}`);
    const data2 = await response2.json(); 
    console.log(`hasEvolutionUrl : `, data2);

    if (data2.chain.evolves_to.length === 0 || data1.name === data2.chain.evolves_to[0].species.name) {
        console.log(`진화를 할 수 없습니다.`);
        levelUp.style.display = `none`;
    } else {
        evolvedPokemon = data2.chain.evolves_to[0].species.url;
        console.log(evolvedPokemon);
        levelUp.style.display = `block`;
        return evolvedPokemon;
    }
}

function getPokemonId(evolvedPokemon) {
    const reversedString = evolvedPokemon.split("").reverse().join("");

    let numbers = ``;
    for (let i=1; i < reversedString.length; i++) {
        if (/[0-9]/.test(reversedString[i])) {
            numbers += reversedString[i];
        } else {
            break;
        }
    }
    newPokemonId = numbers.split("").reverse().join("");
    console.log(newPokemonId);
    return newPokemonId;
}

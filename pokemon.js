const pick = document.getElementById(`pick`);
const retry = document.getElementById(`retry`);
const levelUp = document.getElementById(`levelUp`);
const pokemon = document.getElementById(`pokemon`);
const container = document.getElementById(`pokemon-container`);


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

    levelUpPokemon(pokemonId);
})

retry.addEventListener(`click`, () => {
    deletePokemon();
    let newPokemonId = Math.floor(Math.random() * 1000 + 1);
    getPokemonData(newPokemonId);

    levelUpPokemon(pokemonId);
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

    const speciesUrl = data.species.url;
    console.log(data);
    console.log(speciesUrl)
}

async function levelUpPokemon(pokemonId) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
    const data = await response.json();

    console.log(data);
}

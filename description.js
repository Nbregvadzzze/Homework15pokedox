const poke_container = document.getElementById("poke_container");

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

const getPokemonsCharacteristic = async (id) =>{
  const url = `https://pokeapi.co/api/v2/characteristic/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  return data
}

const getPokemons = async (id) => {
  console.log(id);
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  createPokemonCard(data);
};
getPokemons(id);

const createPokemonCard = (pokemon, characteristic) => {
  const pokemonEl = document.createElement("div");
  const descriptions = characteristic.descriptions;
  const { description } = descriptions.find((desc)) => {
    return desc.language.name === "en";
  }

  pokemonEl.classList.add("pokemon");
  console.log(pokemon.name);

  const pokemonInnerHtml = `
        <div class="pokemonDescription">
          <div class="pokemon-image">
            <img src="${pokemon.sprites.front_default}"> 
        </div>
        <div class = "pokemon-info">
                <h3>${pokemon.name}</h3>
                <p>${description}</p>
        </div>
        <ul class="pokemon-stats">
        ${pokemon.stats.map((stat) =>{
          return`
          <li>${stat.stat.name}: ${stat.base_stat}</li>`
        })}"
        .join("")}
        ></ul>
        <div class="pokemon-height">
        <p>Height: ${pokemon.height}</p>
        <p>Weight: ${pokemon.weight}</p>
        </div>
        <div class="moves">
        <h3>Pokemon moves</h3>
        <ul class="pokemon-moves">
            ${pokemon.moves
            .map((move) => {
              return `
              <li>${move.move.name}</li>`
            })
          .join("")}
        </ul>
        </div>
        </div>
  `;
       
  pokemonEl.addEventListener("click", () => {
    window.location.href = `description.html?name=${pokemon.name}&id=${pokemon.id}`;
  });

  pokemonEl.innerHTML = pokemonInnerHtml;

  poke_container.appendChild(pokemonEl);
};


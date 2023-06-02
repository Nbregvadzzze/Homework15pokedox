const poke_container = document.getElementById("poke_container");

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

const getPokemons = async (id) => {
  console.log(id);
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  createPokemonCard(data);
};
getPokemons(id);

const createPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement("div");

  pokemonEl.classList.add("pokemon");
  console.log(pokemon.name);

  const pokemonInnerHtml = `
        <div class="img-container">
            <img src="${pokemon.sprites.front_default}"> 
        </div>
       
        <div class = "info">
                <h3>
                    ${pokemon.name}
                </h3>
                <small>
                    
                </small>
        </div>
  `;
  pokemonEl.addEventListener("click", () => {
    window.location.href = `description.html?name=${pokemon.name}&id=${pokemon.id}`;
  });

  pokemonEl.innerHTML = pokemonInnerHtml;

  poke_container.appendChild(pokemonEl);
};


// CRIAÇÃO DE UMA VARIÁVEL PARA PEGAR OS DADOS DA API
const urlAPI = 'https://pokeapi.co/api/v2/pokemon/';

const pokemonElement = document.querySelector('div.pokemon');

// Criando uma variável para gerar números aleatórios com a função Math.random
// Math.random(): Gera um número aleatório entre 0 (inclusivo) e 1 (exclusivo).
// Math.random() * 1025: Multiplica o número aleatório por 1025, gerando um número entre 0 e 1024.9999...
// Math.floor(): Arredonda o valor resultante para baixo, transformando-o em um número inteiro
const randomId = () => Math.floor(Math.random() * 1025);

// Função para pegar as habilidades de um Pokémon
const getAbilities = (abilities) => abilities.map(item => item.ability.name);

// Corrigindo o nome da função e recebendo as habilidades como parâmetro
const createAbilities = (abilities) => 
  abilities.reduce((acc, item) => acc += `<li>${item}</li>`, '');

// Função para criar o HTML do Pokémon e inseri-lo na página
const createPokemon = (pokemon) => {
  pokemonElement.innerHTML = `   
    <div class="pokemon__circle">
      <img src="${pokemon.image}" alt="${pokemon.name}">
    </div>
    <div class="info">
      <h2 class="name">${pokemon.name}</h2>
      <ul class="name_habilities">
        ${createAbilities(pokemon.abilities)}
      </ul>
    </div>`;
};

// Função para buscar os dados do Pokémon da API
const getPokemon = () => {
    fetch(`${urlAPI}${randomId()}`)  
      .then(response => response.json())
      .then(pokemon => {
        // Verificando se a imagem existe
        const image = pokemon.sprites.other.dream_world.front_default;
        if (!image) {
          console.warn(`O Pokémon ${pokemon.name} não tem uma imagem disponível.`);
          // Chama a função novamente para tentar buscar outro Pokémon
          return getPokemon(); 
        }
  
        // Criando um objeto com os dados do Pokémon selecionado
        const pokemonSelect = {
          name: pokemon.name,
          image: image,
          abilities: getAbilities(pokemon.abilities)
        };
  
        createPokemon(pokemonSelect);
      })
      .catch(error => {
        console.error('Erro ao buscar Pokémon:', error);
      });
  };
// Chamando a função getPokemon para buscar um Pokémon
getPokemon();
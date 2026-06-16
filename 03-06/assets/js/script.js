const meuPokemon = document.getElementById("pokemonTime");
const pokemonInimigo = document.getElementById("pokemonInimigo")

let pokemonAtual = 1

async function buscarPokemon() {
const conexao = await fetch(`https://pokeapi.co/api/v2/pokemon/1`);
if (conexao.status === 200) {
        
       const dados = await conexao.json();
       return dados;
    }
}

const tras = await fetch("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png");
const dadosTras = tras.json();


// função para renderizar os dados do pokémon na tela
async function exibirPokemon(pokemon) {
    // Mostra "Carregando..." enquando os dados são buscados
   nomePokemon.innerHTML = 'Carregando...' ;
   numeroPokemon.innerHTML = '';

   //busca os dados do pokémon
   const dados = await buscarPokemon(pokemon);

   // Verifica se os dados foram encontrados
   if(dados) {
    meuPokemon.style.display = 'block';
    nomePokemon.innerHTML = dados.name; // Exibe o nome do pokémon
    numeroPokemon.innerHTML = dados.id; // Exibe o número do pokémon
    pokemonInimigo.src = dados.sprites.back_default;//versions['generation-v']['black-white'].animated.front_default;
    console.log(dados.sprites.back_default)

    campoBusca.value = ''; // Limpa o campo de busca
    pokemonAtual = dados.id; // Atualiza o pokémon atual
   } else {
    imagemPokemon.style.display = 'none';
    nomePokemon.innerHTML = 'Não encontrado :C'
    numeroPokemon.innerHTML = '';
   }

}

exibirPokemon()




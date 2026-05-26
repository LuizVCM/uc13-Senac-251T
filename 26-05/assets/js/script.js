const btn = document.getElementById("gerar-piada");
const txt = document.getElementById("piada");


btn.addEventListener("click", async () => {
    try{// Tente pegar os dados da API
        const response = await fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist,explicit");

        const data = await response.json() // converte a resposta para um objeto javascript. Assim, o nosso código pode ler ela
        
        txt.textContent = data.setup + "   resposta:  "+data.delivery;

    } catch(erro){ // Se der ruim, me diz o pq nn deu bom
        console.log("Deu ruim, porque: " + erro)
    }
    
})

const cep = document.getElementById("cep");
const ddd = document.getElementById("ddd");
const estado = document.getElementById("estado");
const bairro = document.getElementById("bairro");
const uf = document.getElementById("uf");
const regiao = document.getElementById("regiao");
const btn = document.getElementById("btn");

btn.addEventListener("click", async () => {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);

        const data = await response.json();
        console.log(data)
        //alert(data)

        if (cep.value.length === 8) {

            ddd.value = data.ddd;
            estado.value = data.estado;
            bairro.value = data.bairro;
            regiao.value = data.regiao;
            uf.value = data.uf;
        } else {

            throw new Error("CEP errado. Por favor, CEP com 8 números válidos.")

        }

    } catch (erro) {
        console.log("Deu ruim" + erro)
    }
})




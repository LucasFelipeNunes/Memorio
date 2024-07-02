let palavra = document.querySelector("h3")
let passou = document.querySelectorAll("button")[0]
let nova = document.querySelectorAll("button")[1]
let pontos = document.querySelector("#pontos")
let listaAnteriores = document.querySelector("#lista-anteriores")
let jogosAnteriores = document.querySelector("#jogos-anteriores")
let score = 0
let errado = false
let passadas = []
let ultimaPalavra = ""
let palavraGerada = ""
let recorde = 0;

let gerarPalavra = () => {
    if ((Math.floor(Math.random() * 10)) <= 3 && passadas.length > 3) {
        palavraGerada = passadas[Math.floor(Math.random() * passadas.length)].replace(/\r?\n?/g, '')
        while(palavraGerada === ultimaPalavra){
            palavraGerada = passadas[Math.floor(Math.random() * passadas.length)].replace(/\r?\n?/g, '')
        }
        palavra.innerHTML = palavraGerada != ultimaPalavra ? palavraGerada : passadas[Math.floor(Math.random() * passadas.length)]
        ultimaPalavra = palavraGerada
    } else {
        let resp = ""
        fetch("http://localhost:3000/palavra", { method: "GET" }).then(data => data.json()).then(resposta => { resp = resposta.palavra }).then(() => {
            ultimaPalavra = resp.replace(/\r?\n?/g, '')
            palavra.innerHTML = ultimaPalavra
        })
    }
}

let derrota = () => {
    if(score > recorde){
        recorde = score
    }
    Swal.fire({
        title: 'Perdeu!',
        text: 'Tente Novamente',
        icon: 'error',
        confirmButtonText: 'Recomeçar',
        footer: `<span><strong>Atual:</strong> ${score} pontos</span><br><span><strong>Recorde:</strong> ${recorde} pontos</span>`
    }).then(() => {
        score = 0
        pontos.innerHTML = score
        listaAnteriores.innerHTML += `<li>${passadas[0] !== undefined ? passadas.toString().replace(/,/g, " - ") + " (" + passadas.length + " PALAVRAS)" : "NENHUMA PALAVRA"}</li>`
        if(jogosAnteriores.classList.contains("hidden")){
            jogosAnteriores.classList.remove("hidden")
        }
        passadas = []
        gerarPalavra()
    })
    
}

let acertou = ()  =>  {
    passadas.push(ultimaPalavra)
    gerarPalavra()
    score++;
    pontos.innerHTML = score
}

gerarPalavra()

passou.addEventListener( "click", () => {(passadas.includes(palavra.innerHTML)) ? acertou() : derrota()} )

nova.addEventListener( "click", () => {(passadas.includes(palavra.innerHTML)) ? derrota() : acertou()} )
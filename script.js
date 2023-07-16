const copyButton = document.querySelector('#copy-button')
const shortenButton = document.querySelector('#shorten-button')
const urlInput = document.querySelector('#url-input')
const infoButton = document.querySelector('.info')

shortenButton.onclick = function() {
    let url = urlInput.value.trim();

    if(!url) {
        urlInput.classList.add('invalido')
        return;
    } else {
        urlInput.classList.remove('invalido')
    }

    let linkRequest = {
        destination: url,
        domain: {
            fullName: "rebrand.ly"
        }
    }

    let requestHeaders = {
        "Content-Type": "application/json",
        "apiKey": "89623e12b25440439d6f2db642c08646"
    }

    fetch("https://api.rebrandly.com/v1/links", {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(linkRequest)
    }).then(response => {
        if(response.ok){
            return response.json()
        }

        return Promise.reject('Requisição inválida ' + response.status)
    }).then(obj => urlInput.value = obj.shortUrl)
    .catch(reject => {
        console.error(reject)
        urlInput.classList.add('invalido')
    })
}

copyButton.onclick = function(){
    let url = urlInput.value.trim();

    urlInput.select();
    urlInput.setSelectionRange(0, 9999);

    if(!url) {
        urlInput.classList.add('invalido')
        return;
    }

    navigator.clipboard.writeText(urlInput.value)
    copyButton.innerHTML = 'Copiado!'
    urlInput.classList.add('copiado')
}

urlInput.onkeyup = () => {
    if(copyButton.innerHTML == 'Copiado!') {
        copyButton.innerHTML = 'Copiar'
    }

    if(urlInput.classList.contains('copiado') || urlInput.classList.contains('invalido')) {
        urlInput.classList.remove('copiado')
        urlInput.classList.remove('invalido')
    }
}

infoButton.onclick = function(){
    open('https://github.com/eurenaneu/encurtadorUrl', '_blank').focus();
}
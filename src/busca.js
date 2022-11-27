$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search)
    if(urlParams.get('idGame') != undefined){
        loadGameById(urlParams.get('idGame'));
    } else {
        loadGameByQuery(urlParams.get('query'));
    }
});

function loadGameById(id){
    $.ajax({
        url: "https://api.rawg.io/api/games/" + id + "?key=5dd934b9cc5c40cc91a6acf60b8e131e",
        type: 'get'
    })
        .done(function (item) {
            divJogo = $('#main')
            divJogo.empty()
            divJogo.append(`
            <div class="card shadow-3 container-fluid color-gray mt-3" style="height: 90% !important;">
                <div class="card mt-3 color-light-gray">
                    <h1 style="text-align: center">${item.name}</h1>
                </div>
                <div style="align-self: center" class="mt-3 mb-3">
                    <img src="${item.background_image}" height="250" width="250" class="img-detalhes"/>
                </div>
                <div class="card mb-1 color-extra-light-gray">
                    <h2 style="text-align: center">Descrição</h2>
                    <p class="text-description-game">${item.description}</p>
                </div>

                <div class="card mb-1 color-extra-light-gray">
                    <h2 style="text-align: center">Informações extras</h2>
                    <p class="text-description-game"><b>Número de conquistas:</b> ${item.achievements_count}</p>
                    <p class="text-description-game"><b>Avaliação:</b> ${item.rating}</p>
                    <p class="text-description-game"><b>Principais tags:</b> ${item.tags[0].name + ', ' + item.tags[1].name + ', ' + item.tags[2].name}</p>
                    <a class="text-description-game text-center" href="${item.website}">Website</p>
            </div>
            `)

        });
}

function loadGameByQuery(query){
    $.ajax({
        url: "https://api.rawg.io/api/games?key=5dd934b9cc5c40cc91a6acf60b8e131e&search=" + query,
        type: 'get'
    })
        .done(function (items) {
            htmlText = ''
            console.log(items)
            divJogo = $('#main')
            divJogo.empty()
            divJogo.append(`<div class="row mb-3" id="jogosSearch"></div>`)
            divJogo = $('#jogosSearch')
            for(i=0; i<8; i++){
                item = items.results[i]
                htmlText += `
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3" style="margin: 3px 0px">
                    <div class="card text-center justify-content-center cards-games color-light-gray">
                        <div class="justify-content-center div-img-card color-light-gray">
                            <img src="${item.background_image}" class="card-img-top img-card" alt="...">
                        </div
                        <div class="card-body color-light-gray">
                            <h5 class="card-title">Nome: ${item.name}</h5>
                            <p class="card-text">Avaliação média: ${item.rating}</p>
                            <p class="card-text">Ano de lançamento: ${item.released == undefined || item.released.length == 0 ? 'Não informado' : item.released.substring(0, 4)}</p>
                            <a href="busca.html?idGame=${item.id}" class="btn btn-primary">Ver mais</a>
                        </div>
                    </div>
                </div>
                `
            }

            divJogo.append(htmlText)
        });
}
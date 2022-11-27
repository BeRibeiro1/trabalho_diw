$(document).ready(function () {
    $.ajax({
        url: "https://api.rawg.io/api/games?key=5dd934b9cc5c40cc91a6acf60b8e131e&ordering=-rating",
        type: 'get'
    })
        .done(function (msg) {
            loadGames(msg)
        });

    $.ajax({
        url: "https://api.rawg.io/api/publishers?key=5dd934b9cc5c40cc91a6acf60b8e131e",
        type: 'get'
    })
        .done(function (msg) {
            loadCreators(msg)
        });

    function loadGames(jsonResponse) {
        gamesRating = $('#destaquesCards')
        gamesRating.empty()
        for (i = 0; i < 8; i++) {
            let item = jsonResponse.results[i]
            gamesRating.append(`
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3" style="margin: 3px 0px">
                <div class="card text-center justify-content-center cards-games color-light-gray">
                    <div class="justify-content-center div-img-card color-light-gray">
                        <img src="${item.background_image}" class="card-img-top img-card" alt="...">
                    </div
                    <div class="card-body color-light-gray">
                        <h5 class="card-title">Nome: ${item.name}</h5>
                        <p class="card-text">Avaliação média: ${item.rating}</p>
                        <p class="card-text">Ano de lançamento: ${item.released == undefined || item.released.length == 0 ? 'Não informado' : item.released.substring(0, 4)}</p>
                        <a href="./src/busca.html?idGame=${item.id}" class="btn btn-primary">Ver mais</a>
                    </div>
                </div>
            </div>
            `);
        }
    }

    function loadCreators(jsonResponse) {
        creators = $('#criadoresCard')
        creators.empty()
        for (i = 0; i < 4; i++) {
            let item = jsonResponse.results[i]
            creators.append(`
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3" style="margin: 3px 0px">
                <div class="card text-center justify-content-center cards-games color-light-gray">
                    <div class="justify-content-center div-img-card color-light-gray">
                        <img src="${item.image_background}" class="card-img-top img-card" alt="...">
                    </div
                    <div class="card-body color-light-gray">
                        <h5 class="card-title">Nome: ${item.name}</h5>
                        <p class="card-text">Jogos publicados: ${item.games_count}</p>
                        <p class="card-text">Jogos famosos: ${item.games[0].name + ', ' + item.games[1].name + ', ' + item.games[2].name}</p>
                    </div>
                </div>
            </div>
            `);
        }
    }
});
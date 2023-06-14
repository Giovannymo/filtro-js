const $selectCustomers = document.getElementById("selectCustomers")
const $selectGames = document.getElementById("selectGames")
const $btnBuy = document.getElementById("btnBuy")


const customers = getCustomers()
const games = getGames()
const points = getPoints()
addSelect()

$btnBuy.addEventListener("click", buy)


//Genera la compra
function buy(){
    const indexCustomer = $selectCustomers.selectedIndex;
    const indexGame = $selectGames.selectedIndex;

    //No hay nada
    if(indexCustomer === -1 || indexGame === -1) return

    const customerSelected = $selectCustomers.options[indexCustomer]
    const gameSelected = $selectGames.options[indexGame]

    account(customerSelected.value, gameSelected.value)

}
//Crea la factura y la guarda
function account(idCustomer, idGame){
    const account = {
        buyer: undefined,
        game: undefined,
        price: 0,
        points: 0
    }

    //Consigo el cliente
    customers.forEach(element => {
        if(element.id === idCustomer){
            console.log(element.name);
            account.buyer = element.name
        }
    });
    //Consigo el juego
    games.forEach(element => {
        if(element.id === Number(idGame)){
            let value = Number(element.value)
            value = value + (value*0.04)
            value = value + (value*0.16)

            console.log(value);

            account.game = element.name
            account.price = Math.round(value)
            account.points = (element.points + account.points)
        }
    });
    points.push(account)
    saveLocalStorage(points);
    
    return show(account)


}

//Muestra el resumen
function show ({buyer , game, price, points}){

    return alert(`RESUMEN COMPRA: \n  
            Nombre: ${buyer} \n
            Juego comprado: ${game} \n
            Valor juego: ${price} \n
            Puntos acomulados: ${points}`)
}

//Rellena los select con el localstorage
function addSelect(){
    const fragmentCustomer = document.createDocumentFragment()
    const fragmentGames = document.createDocumentFragment()

    for(const customer of customers){
        const option = document.createElement("option")
        option.value = customer.id
        option.text = customer.name
        fragmentCustomer.appendChild(option)
    }
    for(const game of games){
        const option = document.createElement("option")
        option.value = game.id
        option.text = game.name
        fragmentGames.appendChild(option)
    }


   
    $selectCustomers.appendChild(fragmentCustomer)
    $selectGames.appendChild(fragmentGames)
}

//Guarda el elemento en localStorage
function saveLocalStorage(element){
    return localStorage.setItem("points",JSON.stringify(element))
}
//Devuelve el elemento seleccionado y si es null devuelve vacio
function getCustomers(){
    if(JSON.parse(localStorage.getItem("customers")) ){
        return JSON.parse(localStorage.getItem("customers"))
    }
    
    return []
}
//Devuelve el elemento seleccionado y si es null devuelve vacio
function getGames(){
    if(JSON.parse(localStorage.getItem("games")) ){
        return JSON.parse(localStorage.getItem("games"))
    }
    
    return []
}

//Devuelve el elemento seleccionado y si es null devuelve vacio
function getPoints(){
    if(JSON.parse(localStorage.getItem("points")) ){
        return JSON.parse(localStorage.getItem("points"))
    }
    
    return []
}
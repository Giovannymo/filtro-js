const $name = document.getElementById("name")
const $gender = document.getElementById("gender")
const $value = document.getElementById("value")
const $points = document.getElementById("points")
const $tableBody = document.getElementById("body-table")

const $btnSave = document.getElementById("btnSave")
const games = getLocalStorage()

addTable()

$btnSave.addEventListener('click', save)

//Propagacion de eventos para los botones en la tabla
$tableBody.addEventListener('click', remove)

//Guarda en en local storage lo que hay en input
function save(e){
    e.preventDefault()

    const game = {
        id: Math.floor(Math.random() * 100),
        name: $name.value,
        gender: $gender.value,
        value: $value.value,
        points: Number($points.value)
    }

    games.push(game)
    saveLocalStorage(games)
    addTable()
    
    return reset()
}

//Del local Storage llena los elementos td y los muestra
function addTable(){
   removeAllRows($tableBody)
   const fragment = document.createDocumentFragment()


   //For para iterar por cada cliente
   for(const game of games){
       const $row = document.createElement('tr')
       //For para iterar los atributos de cada cliente
       for(const data in game){
           const $td = document.createElement('td')
           $td.classList.add("p-3")
           $td.textContent=game[data]
           $row.appendChild($td)
       }

       const $btnRemove = document.createElement('button')
       $btnRemove.className = "btn btn-danger bg-danger remove"

       $btnRemove.id = game.id
       $btnRemove.textContent = "Eliminar"
       $row.appendChild($btnRemove)
       fragment.appendChild($row)
   }
   $tableBody.appendChild(fragment)

}

//Guarda el elemento en localStorage
function saveLocalStorage(element){
    return localStorage.setItem("games",JSON.stringify(element))
 }

 //Devuelve el elemento seleccionado y si es null devuelve vacio
 function getLocalStorage(){
     if(JSON.parse(localStorage.getItem("games")) ){
         return JSON.parse(localStorage.getItem("games"))
     }
 
     return []
 }
 

 //Limpia la tabla antes de hacer la nueva inserción
function removeAllRows(element){
    while(element.hasChildNodes()) {
        element.removeChild(element.firstChild)
    }
}

//Elimina del localStorage y actualiza
function remove(e){
    
    const selection = e.target

    if(selection.classList.contains("remove")){
        //revisa en la lista si el id coincide con el asignado al button para referenciar el cliente
        for(const game of games){
            if(Number(selection.id) === game.id){
                const index = games.indexOf(game)
                games.splice(index, 1)
            }

        }
        saveLocalStorage(games)

        addTable() 
        
    }

}




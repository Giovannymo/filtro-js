const points = getPoints()
const $tableBody = document.getElementById("body-table")

addTable()

//Del local Storage llena los elementos td y los muestra
function addTable(){
    removeAllRows($tableBody)
    const fragment = document.createDocumentFragment()


    //For para iterar por cada cliente
    for(const point of points){
        const $row = document.createElement('tr')
        //For para iterar los atributos de cada cliente
        for(const data in point){
            const $td = document.createElement('td')
            $td.classList.add("p-3")
            $td.textContent=point[data]
            $row.appendChild($td)
        }

        fragment.appendChild($row)
    }
    $tableBody.appendChild(fragment)

}

//Limpia la tabla antes de hacer la nueva inserción
function removeAllRows(element){
    while(element.hasChildNodes()) {
        element.removeChild(element.firstChild)
    }
}





//Devuelve el elemento seleccionado y si es null devuelve vacio
function getPoints(){
    if(JSON.parse(localStorage.getItem("points")) ){
        return JSON.parse(localStorage.getItem("points"))
    }
    
    return []
}
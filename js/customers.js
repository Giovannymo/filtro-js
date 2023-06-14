const $id = document.getElementById('id')
const $name = document.getElementById('name')
const $lastName = document.getElementById('lastName')
const $phone = document.getElementById('phone')
const $email = document.getElementById('email')
const $birthday = document.getElementById('birthday')
const $nacionality = document.getElementById('nacionality')
const $btnSave = document.getElementById('btnSave')

const $tableBody = document.getElementById('body-table')

const $search = document.getElementById('search')

$btnSave.addEventListener('click', save)
//Propagacion de eventos para los botones en la tabla
$tableBody.addEventListener('click', remove)
$search.addEventListener('keyup', search)


const customers = getLocalStorage()

addTable()

//busca y muestra solo el contenido que coincida el id
function search(e){
        const $tdId = document.querySelectorAll(".customer")
        if(!e.target.value){
            addTable()
        }else{
            $tdId.forEach(id =>{
                if(id.textContent === e.target.value){
                    id.parentNode.classList.remove("filter")
                }else{
                    id.parentNode.classList.add("filter")
                }
            })
        }

    
}

//Guarda en en local storage lo que hay en input
function save(e){
    e.preventDefault()

    const customer = {
        id: $id.value,
        name: $name.value,
        lastName: $lastName.value,
        phone: $phone.value,
        email: $email.value,
        birthday: $birthday.value,
        nacionality: $nacionality.value
    }

    customers.push(customer)
    saveLocalStorage(customers)
    addTable()
    
    return reset()
}

//Elimina del localStorage y actualiza
function remove(e){
    
    const selection = e.target

    if(selection.classList.contains("remove")){
        //revisa en la lista si el id coincide con el asignado al button para referenciar el cliente
        for(const customer of customers){
            if(selection.id === customer.id){
                const index = customers.indexOf(customer)
                customers.splice(index, 1)
            }

        }
        saveLocalStorage(customers)

        addTable() 
        
    }

}

//Del local Storage llena los elementos td y los muestra
function addTable(){
    removeAllRows($tableBody)
    const fragment = document.createDocumentFragment()


    //For para iterar por cada cliente
    for(const customer of customers){
        const $row = document.createElement('tr')
        //For para iterar los atributos de cada cliente
        for(const data in customer){
            const $td = document.createElement('td')
            if(data === "id"){
                $td.setAttribute("class", "customer")

            }
            $td.classList.add("p-3")
            $td.textContent=customer[data]
            $row.appendChild($td)
        }

        const $btnRemove = document.createElement('button')
        $btnRemove.className = "btn btn-danger bg-danger remove"

        $btnRemove.id = customer.id
        $btnRemove.textContent = "Eliminar"
        $row.appendChild($btnRemove)
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

//Guarda el elemento en localStorage
function saveLocalStorage(element){
   return localStorage.setItem("customers",JSON.stringify(element))
}
//Devuelve el elemento seleccionado y si es null devuelve vacio
function getLocalStorage(){
    if(JSON.parse(localStorage.getItem("customers")) ){
        return JSON.parse(localStorage.getItem("customers"))
    }

    return []
}

function reset(){
    $id.value = ""
    $name.value = ""
    $lastName.value = ""
    $phone.value = ""
    $email.value = ""
    $birthday.value = ""
    $nacionality.value = ""


}



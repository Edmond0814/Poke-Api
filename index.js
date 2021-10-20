const content = document.querySelector('.content')

const box =document.createElement('div')
box.classList.add("box")

const image = document.createElement('img')

const para = document.createElement('p')
para.classList.add("name")

const pokeId = document.createElement('p')
pokeId.classList.add("id")

async function getPokemons(){
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=30',{mode:"cors"})
    const pokemonData = await response.json()
    return await pokemonData.results
} 

getPokemons().catch(alert)

async function displayPokemons(data){
    let info = await getPokemonInfo(data)
    createBoxes(data.length)
    const boxes = content.querySelectorAll('.box')
    pokemonImages(info.map(obj=>obj.id),boxes)
    pokemonInfo(info,boxes);
}

function createBoxes(quantity){
    for (let index = 0; index < quantity; index++) {
        content.appendChild(box.cloneNode())
    }

    return;
}

async function getPokemonInfo(data){
    let info = []
    for (x in data){
        let response = await fetch(data[x].url,{mode:"cors"})
        let pokemon = await response.json()
        let {name, abilities,moves,height,weight}=await pokemon
        let zerofilled = ('00'+ await pokemon.id).slice(-3)
        let obj = {name,abilities,moves,height,weight,id:zerofilled}
        info.push(obj)
    }
    return info
}

function pokemonImages(id,boxes){
    boxes.forEach(function(box,index){
        image.src=`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id[index]}.png`
        box.appendChild(image.cloneNode())   
    })
    return;
}

async function pokemonInfo(info,boxes){
    boxes.forEach(function(box,index){
        box.setAttribute("value",info[index].id)
        box.appendChild(pokeId.cloneNode())
        box.querySelector('.id').textContent = '#'+info[index].id
        box.appendChild(para.cloneNode())
        box.querySelector('.name').textContent = info[index].name
    })
}

async function main(){
    let pokemonData = await getPokemons()
    displayPokemons(pokemonData)
}

content.addEventListener('click',function(event){
    if(event.target.parentElement.classList=="box"){
        let value = event.target.parentNode.getAttribute("value")
        window.location.href="pokemonpage.html"
    }
})


// https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png
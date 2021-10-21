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
    return pokemonData.results
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
        let {name,id, abilities,moves,height,weight}=await pokemon
        let obj = {name,abilities,moves,height,weight,id}
        info.push(obj)
    }
    return info
}

function pokemonImages(id,boxes){
    boxes.forEach(function(box,index){
        num=id.map(a=>('00'+a).slice(-3))
        image.src=`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${num[index]}.png`
        image.classList.add('images')
        box.appendChild(image.cloneNode())   
    })
    return;
}

async function pokemonInfo(info,boxes){
    boxes.forEach(function(box,index){
        box.setAttribute("value",info[index].name)
        box.appendChild(pokeId.cloneNode())
        box.querySelector('.id').textContent = '#'+('00'+info[index].id).slice(-3)
        box.appendChild(para.cloneNode())
        box.querySelector('.name').textContent = info[index].name
    })
}

async function main(){
    let pokemonData = await getPokemons()
    displayPokemons(pokemonData)
}

main()

content.addEventListener('click',function(event){
    if(event.target.parentElement.classList=="box"){
        let value = event.target.parentNode.getAttribute("value")
        window.location.href=`pokemonpage.html?name=${value}`
    }
})


// https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png
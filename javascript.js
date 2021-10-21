const content = document.querySelector(".pokemon")
const image = document.querySelector('img')
const details = document.querySelector('.info')

function getPokemonName(){
    const params = new URLSearchParams(window.location.search)
    for (const param of params){
        return param[1];
    }
}

async function getPokemons(name){
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=30',{mode:"cors"})
    const pokemonData = await response.json()
    let pokemon=pokemonData.results.filter(obj=>obj.name==name)
    return await pokemon[0]
} 

async function getPokemonInfo(url){
    let response = await fetch(url,{mode:"cors"})
    let pokemon = await response.json()
    let {name,id, abilities,moves,height,weight}=await pokemon
    const info = {name,abilities,moves,height,weight,id}
    return info
}

function displayPokemonInfo(info){
    displayIdName(info)
    displayImage(info.id)
    displaySize(info)
    displayAbility(info)
    displayMoves(info.moves.slice(0,4))
}

function displayIdName({name,id}){
    content.querySelector('.id').textContent='#'+('00'+id).slice(-3)
    content.querySelector('.name').textContent=name.toUpperCase()
    return;
}

function displayImage(id){
    let index=('00'+id).slice(-3)
    image.src=`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${index}.png`
    image.classList.add('image')  
    return;
}

function displaySize({height,weight}){
    details.querySelector('.height').textContent=`Height: ${height}`
    details.querySelector('.weight').textContent=`Weight: ${weight} KG`

}


function displayAbility({abilities}){
    let abilityName = abilities.map(obj=>obj.ability.name)
    const ability= document.createElement('p')
    ability.classList.add('ability')
    abilityName.forEach(element => {
        details.querySelector(".abilities").appendChild(ability.cloneNode())
        details.querySelector('.abilities').lastElementChild.textContent=element
    });
}

function displayMoves(moves){
    console.log(moves);
    let movesName = moves.map(obj=>obj.move.name)
    const move= document.createElement('p')
    move.classList.add('move')
    movesName.forEach(element => {
        details.querySelector(".moves").appendChild(move.cloneNode())
        details.querySelector('.moves').lastElementChild.textContent=element
    });
}

async function main(){
    let name = getPokemonName()
    document.querySelector('title').textContent=name.toLocaleUpperCase()
    let {url:pokemonURL}= await getPokemons(name)
    let pokemonInfo = await getPokemonInfo(pokemonURL)
    displayPokemonInfo(pokemonInfo)
}

main()
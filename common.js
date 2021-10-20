async function getPokemons(){
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=30',{mode:"cors"})
    const pokemonData = await response.json()
    return await pokemonData.results
} 

export {getPokemons}
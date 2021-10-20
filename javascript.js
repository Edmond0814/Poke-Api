import { getPokemons } from "./common.js";
import {value} from "./index.js"

async function testing (){
    let info = await getPokemons()
    console.log(info);
}

console.log(value);
testing()
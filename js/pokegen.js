// get elements from page
// generator
const main = document.querySelector('main')
const generator = main.querySelector('.generator')
console.log(generator);

// card placeholder
const placeholder = main.querySelector('#card--placeholder');
function instanceCheck() {
    let placeholderClasses = placeholder.classList;
    console.log(placeholderClasses);
    if (placeholderClasses[0] !== 'instance') {
        cardHandler()
    } else {
        console.log('a card is already on the page.');
        return
    }
}

// template
const pokemonCard = document.querySelector('#pokemon--card')
console.log(pokemonCard);
function cardHandler() {
    let card = document.importNode(pokemonCard.content, true)
    placeholder.appendChild(card)
    placeholder.classList.add('instance')
}



// generate a number
function randomNumberGenerator() {
    const pokedexSize = 1011;
    let randomNum = Math.floor(Math.random() * (pokedexSize + 1))
    if (randomNum === 0) {
        randomNum += 1;
    }
    console.log('number generated : ', randomNum);
    return randomNum
}


// fetch pokemon
async function generatorHandler() {
    let rng = randomNumberGenerator();
    const url = `https://pokeapi.co/api/v2/pokemon/${rng}`;
    const fetchInit = {
        method: 'GET',
        headers: new Headers,
        mode: 'cors',
        cache: 'default'
    };
    const getRandomPokemon = await fetch(url, fetchInit);
    const response = await getRandomPokemon.json();
    console.log(response);
    console.log(response.name);
    instanceCheck();

    // managing template contents
    const pokemonSprite = document.querySelector('#poke-img')
    const pokemonName = document.querySelector('#poke-name')
    const pokemonNum = document.querySelector('#poke-num')
    console.log(pokemonName, pokemonNum, pokemonSprite);

    // get a shiny sprite
    const getSprite = () => {
        let goldenNumber = Math.floor(Math.random() * 11);
        console.log(goldenNumber);
        if (goldenNumber === 10) {
            console.log('oh wow, you encountered a shiny pokemon!');
            document.querySelector('.message').textContent = 'Oh wow, you encountered a shiny pokemon! 🎉';
            return response.sprites.front_shiny
        } else {
            console.log('this is a normal pokemon');
            document.querySelector('.message').textContent = '';
            return response.sprites.front_default
        }
    }

    pokemonNum.textContent = `#${response.id}`;
    pokemonName.textContent = response.name.charAt(0).toUpperCase() + response.name.slice(1);
    //pokemonSprite.src = response.sprites.front_default;
    pokemonSprite.src = getSprite();

    const generators = main.querySelectorAll('.generator')
    console.log(generators);

    generators[0].style.display = 'none';
    generators[1].style.display = 'initial';
    generators[1].addEventListener('click', generatorHandler);
}


generator.addEventListener('click', generatorHandler)

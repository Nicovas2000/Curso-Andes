const pokemonInput = document.getElementById('pokemon'); // El ID 'ciudad' se mantiene del HTML previo para el input 
const buscarBtn = document.getElementById('buscar');
const pokemonInfoDiv = document.getElementById('pokemon-info');


// Evento click en el botón 
buscarBtn.addEventListener('click', () => {
    const pokemonName = pokemonInput.value.trim();
    if (pokemonName) {
        obtenerDatosPokemon(pokemonName).then(console.log("Gracias"));
        console.log("hola mundo")
        console.log("test")
    }
    else {
        mostrarError('Por favor, introduce un nombre de Pokémon');
    }
});

async function obtenerDatosPokemon(pokemonName) {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;

        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) { throw new Error(`Pokémon "${pokemonName}" no encontrado.`); }
            throw new Error(`Error de red: ${response.status}`);
        }

        const data = await response.json(); 
        mostrarDatosPokemon(data); 
    }
    catch (error) {
        mostrarError(error.message);
    }
}

function mostrarDatosPokemon(data) {
    // Extraer los datos relevantes del Pokémon 
    const nombre = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    const pokedexId = data.id;
    const altura = (data.height / 10).toFixed(1);
    // Convertir de decímetros a metros 
    const peso = (data.weight / 10).toFixed(1);
    // Convertir de hectogramos a kilogramos 
    const tipos = data.types.map(typeInfo => typeInfo.type.name);
    const imagenSprite = data.sprites.front_default;
    const habilidades = data.abilities.map(abilityInfo => abilityInfo.ability.name.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
    pokemonInfoDiv.innerHTML = ` ${nombre} #${pokedexId} 
                                Altura: ${altura} m 
                                Peso: ${peso} kg 
                                Tipo(s): ${tipos.join(', ')} 
                                Habilidades: ${habilidades.join(', ')} `;
}

function mostrarError(mensaje) {
    pokemonInfoDiv.innerHTML = `
    <div class="error">
    <p>${mensaje}</p>
    </div> `;

}
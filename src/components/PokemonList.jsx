import { useContext } from 'react'
import { PokemonContext } from '../context/PokemonContext'
import { CardPokemon } from './CardPokemon'
import { Loader } from './Loader'

export const PokemonList = () => {
  const { allPokemons, isLoading, filteredPokemons } = useContext(PokemonContext)

  const showPokemon = filteredPokemons.map(pokemon => pokemon.id)
  console.log(showPokemon)
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='card-list-pokemon container'>
          {filteredPokemons.length ? (
            <>
              {filteredPokemons.map(pokemon => (
                <CardPokemon key={pokemon.id} pokemon={pokemon} />
              ))}
            </>
          ) : (
            <>
              {allPokemons.map(pokemon => (
                <CardPokemon pokemon={pokemon} key={pokemon.id} />
              ))}
            </>
          )}
        </div>
      )}
    </>
  )
}

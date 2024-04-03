import { useContext } from 'react'
import { PokemonContext } from '../context/PokemonContext'
import { useLocation } from 'react-router-dom'
import { CardPokemon } from '../components'

export const SearchPage = () => {
  const location = useLocation()

  const { globalPokemons } = useContext(PokemonContext)

  const filterPokemons = globalPokemons.filter(pokemon =>
    pokemon.name.includes(location.state.toLowerCase())
  )

  return (
    <div className='container'>
      <p className='p-search'>
        Se encontraron <span>{filterPokemons.length}</span> resultados:
      </p>
      <div className='card-list-pokemon container'>
        {filterPokemons.map(pokemon => (
          <CardPokemon pokemon={pokemon} key={pokemon.id} />
        ))}
      </div>
    </div>
  )
}

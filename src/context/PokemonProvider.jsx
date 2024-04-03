import { useForm } from '../hook/useForm'
import { PokemonContext } from './PokemonContext'
import { useEffect, useState } from 'react'

export const PokemonProvider = ({ children }) => {
  const [allPokemons, setAllPokemons] = useState([])
  const [globalPokemons, setGlobalPokemons] = useState([])
  const [offset, setOffset] = useState(0)

  // Estados de la aplicación
  const [isLoading, setIsLoading] = useState(true)
  const [active, setActive] = useState(false)

  // utilizar CustomHooks para el formulario
  const { valueSearch, onInputChange, onResetForm } = useForm({
    valueSearch: ''
  })

  // Llamar a 50 Pokemons
  const getAllPokemons = async (limit = 50) => {
    const URL_BASE = 'https://pokeapi.co/api/v2/'
    const res = await fetch(`${URL_BASE}pokemon?limit=${limit}&offset=${offset}`)
    const data = await res.json()

    const promises = data.results.map(async pokemon => {
      const res = await fetch(pokemon.url)
      const data = await res.json()
      return data
    })

    const results = await Promise.all(promises)

    setAllPokemons([...allPokemons, ...results])
    setIsLoading(false)
  }

  // Llamar todos los pokemones
  const getGlobalPokemons = async () => {
    const URL_BASE = 'https://pokeapi.co/api/v2/'
    const res = await fetch(`${URL_BASE}pokemon?limit=100000&offset=0`)
    const data = await res.json()

    const promises = data.results.map(async pokemon => {
      const res = await fetch(pokemon.url)
      const data = await res.json()
      return data
    })

    const results = await Promise.all(promises)
    setGlobalPokemons(results)
    setIsLoading(false)
  }

  // Llamar pokemones por ID
  const getPokemonByID = async id => {
    const URL_BASE = 'https://pokeapi.co/api/v2/'
    const res = await fetch(`${URL_BASE}pokemon/${id}`)
    const data = await res.json()
    return data
  }

  // Usar el useEffect para ejecutar los fetch
  useEffect(() => {
    getAllPokemons()
  }, [offset])

  useEffect(() => {
    getGlobalPokemons()
  }, [])

  // BTN Cargar mas
  const onClickLoadMore = () => {
    setOffset(offset + 50)
  }

  // FILTER FUNCTIONS

  const [typeSelected, setTypeSelected] = useState({
    grass: false,
    normal: false,
    fighting: false,
    flying: false,
    poison: false,
    ground: false,
    rock: false,
    bug: false,
    ghost: false,
    steel: false,
    fire: false,
    water: false,
    electric: false,
    psychic: false,
    ice: false,
    dragon: false,
    dark: false,
    fairy: false,
    unknow: false,
    shadow: false
  })

  const [filteredPokemons, setFilteredPokemons] = useState([])

  const handleCheckbox = e => {
    setTypeSelected({
      ...typeSelected,
      [e.target.name]: e.target.checked
    })

    if (e.target.checked) {
      const filteredResults = globalPokemons.filter(pokemon =>
        pokemon.types.map(type => type.type.name).includes(e.target.name)
      )
      setFilteredPokemons([...filteredPokemons, ...filteredResults])
    } else {
      const filteredResults = filteredPokemons.filter(
        pokemon => !pokemon.types.map(type => type.type.name).includes(e.target.name)
      )
      setFilteredPokemons([...filteredResults])
    }
  }

  return (
    <>
      <PokemonContext.Provider
        value={{
          valueSearch,
          onInputChange,
          onResetForm,
          allPokemons,
          globalPokemons,
          getPokemonByID,
          onClickLoadMore,
          // LOADER
          isLoading,
          setIsLoading,
          // BTN FILTER
          active,
          setActive,
          // FILTER CONTAINER
          handleCheckbox,
          filteredPokemons
        }}
      >
        {children}
      </PokemonContext.Provider>
    </>
  )
}

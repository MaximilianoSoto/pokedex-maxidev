import { AppRouter } from './appRouter'
import { PokemonProvider } from './context/PokemonProvider'

export const App = () => {
  return (
    <>
      <PokemonProvider>
        <AppRouter />
      </PokemonProvider>
    </>
  )
}

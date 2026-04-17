import { createContext, useState } from 'react'

const BulbContext = createContext()

// this function serves as a provider for the context
function BulbContextProvider({ children }) {
  // create a state variable named bulbOn and a function named setBulbOn to update the state variable
  const [bulbOn, setBulbOn] = useState(true)

  // return the BulbContext.Provider component with the value prop set to an object containing bulbOn and setBulbOn
  return (
    // BulbContext.Provider component with the value prop set to an object containing bulbOn and setBulbOn
    <BulbContext.Provider
      value={{
        bulbOn,
        setBulbOn,
      }}
    >
      {/* children prop to render the child components */}
      {children}
    </BulbContext.Provider>
  )
}

// export the provider and context
export { BulbContextProvider, BulbContext }

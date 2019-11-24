import React, { useState, useEffect } from 'react'
import * as firebase from 'firebase'

interface Context {
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

interface Props {
  children?: React.ReactNode
}

export const AuthContext = React.createContext<Context>({
  isLoggedIn: false,
  setIsLoggedIn: () => {}
})

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

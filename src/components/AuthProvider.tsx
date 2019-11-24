import React, { useState, useEffect } from 'react'
import * as firebase from 'firebase'

interface Context {
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  user: firebase.User
}

interface Props {
  children?: React.ReactNode
}

export const AuthContext = React.createContext<Context>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null
})

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false)
  const [ user, setUser ] = useState<firebase.User | null>(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true)
        setUser(user)
      } else {
        setIsLoggedIn(false)
        setUser(null)
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

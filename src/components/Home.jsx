import React, {useContext} from 'react'
import UsuarioContext from 'context/UsuarioContext'

export default function Home() {
  const {usuario, isLogged} = useContext(UsuarioContext)
  const {nombre, apellido} = usuario

  return (
    <div style={styles.container}>
      {isLogged ? (
        <h1 style={styles.h1}>Bienvenido {nombre}, {apellido}</h1>
      ) : (
        <h1 style={styles.h1}>Bienvenido</h1>
      )}
    </div>
  )
}

const styles = {
  container: {
    margin: '0 auto',
    width: '100%',
    height: '50vh',
    textAlign: 'center',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  h1: {
    color: '#fff',
  }
}
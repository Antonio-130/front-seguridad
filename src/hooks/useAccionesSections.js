export const useAccionesSections = (acciones) => {

  const listOfTags = acciones.reduce((prev, current) => {
    if (prev.length === 0) {
      return [current.tag]
    }
    if (!prev.includes(current.tag)) {
      return [...prev, current.tag]
    }
    return [...prev]
  }, [])

  const listOfAcciones = listOfTags.map(tag => {
    return {
      nombre: tag,
      values: acciones.filter(accion => accion.tag === tag)
    }
  })
  return listOfAcciones
}
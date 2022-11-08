export default function ListOfValues({name, values, Component}) {
  return (
    <>
      {values.length > 0 ? values.map(value => {
        return <Component key={value.id} data={value}/>
      }): <p className='msg-info'>{`No hay ${name} registrados`}</p>}
    </>
  )
}
import { useFilterAndPagination } from "hooks/useFilterAndPagination"
import ListOfValues from "./ListOfValues"
import 'styles/FilterAndPagination.css'

export default function FilterAndPagination({ values, cant, name, Component }) {
  const { filter, onFilterChange, filteredArray, nextPage, prevPage } = useFilterAndPagination({ values, cant })
  return (
    <>
      <ListOfValues name={name} values={filteredArray} Component={Component} />
      <div className="filter-container">
        <div className="filter">
          <input
            type="text"
            name="filter"
            placeholder="Buscar"
            value={filter}
            onChange={e => onFilterChange(e)}
            className="form-input-text"
          />
        </div>
        <div className="buttons-container">
          <button className="btn-prev form-btn" onClick={prevPage}>
            Anterior
          </button>
          <button className="btn-next form-btn" onClick={nextPage}>
            Siguiente
          </button>
        </div>
      </div>
    </>
  )
}

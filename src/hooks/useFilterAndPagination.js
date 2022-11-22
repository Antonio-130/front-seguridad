import { useState } from "react"

export const useFilterAndPagination = ({ values, cant, filterFields }) => {
  let newArr = [...values]
  const [currentPage, setCurrentPage] = useState(0)
  const [filter, setFilter] = useState("")

  const filteredArray = () => {
    if (filter.length === 0) return newArr.slice(currentPage, currentPage + cant)
    const filtered = newArr.filter(value => {
      return filterFields.some(field => {
        return value[field].toLowerCase().includes(filter.toLowerCase())
      })
    })
    return filtered.slice(currentPage, currentPage + cant)
  }

  const nextPage = () => {
    let count = newArr.filter(value => {
      return filterFields.some(field => {
        return value[field].toLowerCase().includes(filter.toLowerCase())
      })
    }).length
    if (count > currentPage + cant) setCurrentPage(currentPage + cant)
  }

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - cant)
  }

  const onFilterChange = ({ target }) => {
    setCurrentPage(0)
    setFilter(target.value)
}

  return {
    filter,
    onFilterChange,
    filteredArray: filteredArray(),
    nextPage,
    prevPage
  }
}

import { useState } from "react"

export const useFilterAndPagination = ({ values, cant, filterFields }) => {
  let newArr = [...values]
  let max = Math.ceil(newArr.length / cant)
  const [currentPage, setCurrentPage] = useState(0)
  const [filter, setFilter] = useState("")

  const filteredArray = () => {
    if (filter.length === 0) {
      max = Math.ceil(newArr.length / cant)
      return newArr.slice(currentPage, currentPage + cant)
    }
    const filtered = newArr.filter(value => {
      return filterFields.some(field => {
        return value[field].toLowerCase().includes(filter.toLowerCase())
      })
    })
    if (filtered.length === 0){
      max = 1
      return []
    }
    max = Math.ceil(filtered.length / cant)
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
    prevPage,
    currentPage: currentPage / cant + 1,
    max
  }
}

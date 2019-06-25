import React from 'react'

function useSearch() {
  const [searchQuery, setSearchQuery] = React.useState(``)

  const handleSearchChange = (value) => setSearchQuery(value)

  const matchesSearchQuery = (term) => {
    const query = searchQuery.trim()
    if (query === '') {
      return true
    }
    const regex = new RegExp(query.toLowerCase(), 'gi')
    const match = term.match(regex)
    return match && match.length > 0
  }

  return {
    handleSearchChange,
    matchesSearchQuery,
  }
}

export default useSearch

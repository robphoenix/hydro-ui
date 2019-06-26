const matchesSearchQuery = (term, searchQuery) => {
  const query = searchQuery.trim()
  if (query === '') {
    return true
  }
  const regex = new RegExp(query.toLowerCase(), 'gi')
  const match = term.match(regex)
  return match && match.length > 0
}

const hasSelectedCategories = (categories, selected) => {
  if (!selected || !selected.length) {
    return true
  }
  return categories
    .map((category) => category.name)
    .some((name) => selected.includes(name))
}

const isStatus = (monitor, status) => {
  return monitor.status === status
}

const isSelectedActionType = (actionType, selected) => {
  if (!selected.value) {
    return true
  }
  return selected.value === actionType
}

export {
  matchesSearchQuery,
  hasSelectedCategories,
  isStatus,
  isSelectedActionType,
}

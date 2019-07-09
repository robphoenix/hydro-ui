const Order = {
  NONE: 'NONE',
  ASC: 'ASC',
  DESC: 'DESC',
}

const getIconForOrder = (direction) => {
  switch (direction) {
    case Order.ASC:
      return 'arrow-up'
    case Order.DESC:
      return 'arrow-down'
    default:
      return 'caret-down'
  }
}

const compare = (a, b, isAsc) => {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1)
}

const sortableIpAddress = (ip) => {
  return ip
    .split('.')
    .map((octet) => octet.padStart(3, '0'))
    .join('')
}

export { Order, compare, sortableIpAddress, getIconForOrder }

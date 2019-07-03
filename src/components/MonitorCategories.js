import React from 'react'
import { Pane, Badge, majorScale } from 'evergreen-ui'

const MonitorCategories = ({ categories }) => {
  return (
    <Pane>
      {categories &&
        !!categories.length &&
        categories.map((category) => (
          <Badge key={category.id} color="teal" marginRight={majorScale(1)}>
            {category.name}
          </Badge>
        ))}
      {!categories.length && <Badge color="yellow">no categories</Badge>}
    </Pane>
  )
}

export default MonitorCategories

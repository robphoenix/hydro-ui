import React from 'react'
import { Badge } from 'evergreen-ui'

const ActionTypeBadge = ({ actionType }) => {
  const badgeColors = {
    block: `red`,
    emailAlert: `orange`,
    emailRate: `green`,
    emailBatch: `purple`,
    storeDB: `yellow`,
    storeLogins: `teal`,
    storeAnalysis: `blue`,
    misc: `neutral`,
  }

  const actionDisplayName = {
    block: `block`,
    emailAlert: `email alert`,
    emailRate: `email rate`,
    emailBatch: `email batch`,
    storeDB: `store in database`,
    storeLogins: `store logins`,
    storeAnalysis: `store analysis`,
    misc: `miscellaneous`,
  }

  return (
    <Badge color={badgeColors[actionType]}>
      {actionDisplayName[actionType]}
    </Badge>
  )
}

export default ActionTypeBadge

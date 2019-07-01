import React from 'react'
import { Button, Pane, Dialog } from 'evergreen-ui'
import {
  ActionBlockProperties,
  ActionEmailRateProperties,
  ActionEmailBatchProperties,
} from '.'

const ActionPropertiesCell = ({ action }) => {
  const [showDialog, setShowDialog] = React.useState(false)

  return (
    <Pane>
      <Dialog
        isShown={showDialog}
        title="Properties"
        hasFooter={false}
        onCloseComplete={() => setShowDialog(false)}
        width={600}
      >
        {action.actionType === `block` && (
          <ActionBlockProperties metadata={action.metadata} />
        )}
        {action.actionType === `emailRate` && (
          <ActionEmailRateProperties metadata={action.metadata} />
        )}
        {action.actionType === `emailBatch` && (
          <ActionEmailBatchProperties metadata={action.metadata} />
        )}
      </Dialog>
      <Button appearance="minimal" onClick={() => setShowDialog(true)}>
        View Properties
      </Button>
    </Pane>
  )
}

export default ActionPropertiesCell

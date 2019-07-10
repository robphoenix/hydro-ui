import React from 'react'
import { Menu, Dialog, Strong, toaster, Text } from 'evergreen-ui'

const ArchiveMenuItem = ({ archive, refresh, item, dialogTitle }) => {
  const [showDialog, setShowDialog] = React.useState(false)

  const handleConfirm = async () => {
    try {
      await archive(item)
      toaster.success(`${item.name} has been archived`)
      refresh()
    } catch (error) {
      toaster.warning(error.cause)
    }
  }

  return (
    <Menu.Item onSelect={() => setShowDialog(true)} intent="danger">
      <Dialog
        isShown={showDialog}
        title={dialogTitle}
        onCloseComplete={() => setShowDialog(false)}
        confirmLabel="Archive"
        onConfirm={handleConfirm}
      >
        <Text>
          Are you sure you want to archive <Strong>{item.name}</Strong>{' '}
        </Text>
      </Dialog>
      Archive
    </Menu.Item>
  )
}

export default ArchiveMenuItem

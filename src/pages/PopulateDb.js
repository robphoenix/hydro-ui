import React from 'react'
import { Button, toaster } from 'evergreen-ui'
import * as faker from 'faker'

import PageContainer from '../components/PageContainer'
import PageHeading from '../components/PageHeading'
import { useMonitors } from '../context/monitors-context'

const PopulateDb = () => {
  const { addCategories } = useMonitors()

  const randomCategories = () => {
    return Array.from(Array(faker.random.number({ min: 10, max: 20 }))).map(
      () => {
        return faker.random.word()
      },
    )
  }

  const createCategories = async () => {
    const categories = randomCategories()
    try {
      await addCategories(categories)
      toaster.success(`New categories created: ${categories.join(`, `)}`)
    } catch (error) {
      toaster.warning(`Error creating categories: ${error}, trying again...`)
      createCategories()
    }
  }

  return (
    <PageContainer>
      <PageHeading>Populate Database</PageHeading>
      <Button onClick={createCategories}>Create categories</Button>
    </PageContainer>
  )
}

export default PopulateDb

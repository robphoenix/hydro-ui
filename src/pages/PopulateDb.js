import React from 'react'
import { Button, toaster } from 'evergreen-ui'
import * as faker from 'faker'

import PageContainer from '../components/PageContainer'
import PageHeading from '../components/PageHeading'
import { useMonitors } from '../context/monitors-context'

const PopulateDb = () => {
  const { addCategories, addAction } = useMonitors()

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

  const actionTypes = [
    `block`,
    `emailRate`,
    `emailAlert`,
    `emailBatch`,
    `misc`,
    `storeDB`,
    `storeAnalysis`,
    `storeLogins`,
  ]

  const createParameters = () => {
    const actionParameters = [
      `sip`,
      `ipRange`,
      `stk`,
      `rstk`,
      `uqid`,
      `uname`,
      `userAgent`,
      `xForwardedFor`,
    ]
    return Array.from(
      new Set(
        Array.from(Array(faker.random.number({ min: 1, max: 3 }))).map(() =>
          faker.random.arrayElement(actionParameters),
        ),
      ),
    )
  }

  const createEmailAddresses = () => {
    return Array.from(Array(faker.random.number({ min: 1, max: 3 }))).map(
      () => {
        return `${faker.name.firstName()}.${faker.name.lastName()}@bet365.com`.toLowerCase()
      },
    )
  }

  const createActions = () => {
    Array.from(Array(faker.random.number({ min: 30, max: 50 }))).map(
      async () => {
        const actionType =
          actionTypes[
            faker.random.number({ min: 0, max: actionTypes.length - 1 })
          ]
        const metadata = createMetadata(actionType)
        const action = {
          name: faker.random.words(),
          description: faker.lorem.paragraph(
            faker.random.number({ min: 1, max: 3 }),
          ),
          archived: false,
          actionType,
          metadata,
        }
        try {
          await addAction(action)
          toaster.success(`Created action: ${action.name}`)
        } catch (error) {
          toaster.warning(error.message)
        }
      },
    )
  }

  const createMetadata = (actionType) => {
    switch (actionType) {
      case `block`:
        return createBlockMetadata()
      case `emailRate`:
        return createEmailRateMetadata()
      case `emailBatch`:
        return createEmailBatchMetadata()
      case `emailAlert`:
        return createEmailAlertMetadata()
      default:
        return { parameters: [] }
    }
  }

  const createEmailAlertMetadata = () => {
    const parameters = createParameters()
    const emailAddresses = createEmailAddresses()
    const emailSubject = faker.lorem.sentence()
    const emailText = faker.lorem.paragraph()
    return {
      parameters,
      emailAddresses,
      emailSubject,
      emailText,
    }
  }

  const createEmailBatchMetadata = () => {
    const parameters = []
    const emailAddresses = createEmailAddresses()
    const emailSubject = faker.lorem.sentence()
    const emailText = faker.lorem.paragraph()
    const emailCron = `0 0 12 1/1 * ? *`
    return {
      parameters,
      emailAddresses,
      emailSubject,
      emailCron,
      emailText,
    }
  }

  const createEmailRateMetadata = () => {
    const parameters = []
    const emailAddresses = createEmailAddresses()
    const emailSubject = faker.lorem.sentence()
    const emailSendLimit = faker.random.number({ min: -1, max: 30 })
    const emailText = faker.lorem.paragraph()
    return {
      parameters,
      emailAddresses,
      emailSubject,
      emailSendLimit,
      emailText,
    }
  }

  const createBlockMetadata = () => {
    const parameters = createParameters()
    const blockTime = faker.random.number({ min: -1, max: 59 })
    if (blockTime === -1) {
      return {
        parameters,
        blockTime,
      }
    }
    const blockTimeUnit = faker.random.arrayElement([
      `MINUTES`,
      `HOURS`,
      `DAYS`,
    ])
    const blockDelay = faker.random.number({ min: 0, max: 59 })
    const blockDelayUnit = faker.random.arrayElement([
      `SECONDS`,
      `MINUTES`,
      `HOURS`,
    ])
    if (!blockDelay) {
      return { parameters, blockTime, blockTimeUnit }
    }
    return { parameters, blockTime, blockTimeUnit, blockDelay, blockDelayUnit }
  }

  return (
    <PageContainer>
      <PageHeading>Populate Database</PageHeading>
      <Button onClick={createCategories}>Create Categories</Button>
      <Button onClick={createActions}>Create Actions</Button>
    </PageContainer>
  )
}

export default PopulateDb

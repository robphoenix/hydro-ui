import React from 'react'
import { Button, toaster } from 'evergreen-ui'
import * as faker from 'faker'

import PageContainer from '../components/PageContainer'
import PageHeading from '../components/PageHeading'
import { useMonitors } from '../context/monitors-context'
import {
  getAllActions,
  getAllCategories,
  addMonitor,
} from '../utils/monitors-client'

const PopulateDb = () => {
  const { addCategories, addAction } = useMonitors()

  const randomCategories = () => {
    return Array.from(Array(20)).map(() => {
      return faker.random.word()
    })
  }

  const createCategories = async () => {
    const categories = randomCategories()
    try {
      await addCategories(categories)
      toaster.success(`Created ${categories.length} categories`)
    } catch (error) {
      toaster.warning(`Error creating categories: ${error.message}`)
    }
    return categories
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
    return Array.from(Array(faker.random.number({ min: 1, max: 3 })))
      .map(() => {
        return `${faker.name.firstName()}.${faker.name.lastName()}@bet365.com`.toLowerCase()
      })
      .join(`;`)
  }

  const createActions = async () => {
    const actions = Array.from(Array(20)).map(async () => {
      const actionType = faker.random.arrayElement(actionTypes)
      const metadata = createMetadata(actionType)
      const name = faker.random.words()
      const description = faker.hacker.phrase()
      const archived = false
      const action = {
        name,
        description,
        archived,
        actionType,
        metadata,
      }
      try {
        await addAction(action)
      } catch (error) {
        toaster.warning(error.message)
      }
      return action
    })
    toaster.success(`Created ${actions.length} actions`)
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

  const createMonitor = async (
    queries,
    availableCategories,
    availableActions,
  ) => {
    const name = faker.random.words()
    const description = faker.hacker.phrase()
    const query = faker.random.arrayElement(queries)
    const cacheWindow = 0
    // Just create standard online monitors
    // const status = faker.random.arrayElement([`online`, `offline`, `archived`])
    const status = `online`
    // const type = faker.random.arrayElement([`standard`, `system`])
    const type = `standard`
    const categories = Array.from(
      Array(faker.random.number({ min: 0, max: 4 })),
    ).map(() => {
      return faker.random.arrayElement(availableCategories)
    })
    const actions = Array.from(
      Array(faker.random.number({ min: 0, max: 2 })),
    ).map(() => {
      return faker.random.arrayElement(availableActions)
    })
    const groups = [{ id: 43, name: `App_Forensic Monitoring Dev Team` }]
    const monitor = {
      name,
      description,
      query,
      cacheWindow,
      status,
      type,
      categories,
      actions,
      groups,
    }

    try {
      await addMonitor(monitor)
    } catch (error) {
      toaster.warning(`Error creating monitor: ${error.message}`)
    }
    return monitor
  }

  const createMonitors = async () => {
    await createCategories()
    await createActions()
    const availableCategories = await getAllCategories()
    const availableActions = await getAllActions()
    const queries = [
      `select count(*) as hits, stk, sip,betSource, failure, inPlay, liabilitySingle, plbt, referer, countryID from opcodes.win:time(2 seconds) group by sip output last every 1 seconds`,
      `select count(*) as hits, stk, sip from fm.win:time(1 seconds) group by sip output last every 1 seconds`,
    ]

    const monitors = Array.from(Array(10)).map(async () => {
      return await createMonitor(queries, availableCategories, availableActions)
    })
    toaster.success(`Created ${monitors.length} monitors`)
  }

  return (
    <PageContainer>
      <PageHeading>Populate Database</PageHeading>
      <Button intent="danger" appearance="primary" onClick={createMonitors}>
        Create Monitors
      </Button>
    </PageContainer>
  )
}

export default PopulateDb

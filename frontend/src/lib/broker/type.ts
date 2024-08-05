import Broker from './broker'

type ResourceBroker = {
  publish: (key: string, data: string) => void
}

export type BrokerType = InstanceType<typeof Broker> & ResourceBroker

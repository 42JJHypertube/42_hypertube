import Broker from '../broker'
import newSocket from '@/lib/newSocket/newSocket'

class DownloadBroker extends Broker {
  publish(key: string, data: string) {
    console.log(key, data)
    this.event.dispatchEvent(new CustomEvent(key, { detail: data }))
  }
}

const downloadBroker = new DownloadBroker()
newSocket.setBroker(downloadBroker)
export default downloadBroker

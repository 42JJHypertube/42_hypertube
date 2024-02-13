import Hype from './hype'
import { Config } from './hype/client'

// change baseURL using .env file
const defaultConfig: Config = {
  baseURL: 'http://localhost:8080/api',
  maxRetries: 3,
}

// singleton instance manage all
const HypeClient = new Hype(defaultConfig)
export default HypeClient

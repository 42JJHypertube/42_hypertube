import Hype from './hype'
import { Config } from './hype/client'

// change baseURL using .env file
const defaultConfig: Config = {
  baseURL: `https://${process.env.BACKEND}/api`,
  maxRetries: 3,
}

// singleton instance manage all
const HypeClient = new Hype(defaultConfig)
export default HypeClient

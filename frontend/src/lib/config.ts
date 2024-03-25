import Hype from './hype'
import { Config } from './hype/type/client'

// change baseURL using .env file
const defaultConfig: Config = {
  // baseURL: `http://${process.env.BACKEND}:8080/api`,
  baseURL: `https://localhost/api`,
  maxRetries: 3,
}

// singleton instance manage all
const HypeClient = new Hype(defaultConfig)
export default HypeClient

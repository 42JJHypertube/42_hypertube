import Hype from '.'
import { Config } from './type/client'

// change baseURL using .env file
const defaultConfig: Config = {
  baseURL: process.env.BACK_API_URL as string,
  maxRetries: 3,
}

// singleton instance manage all
const HypeClient = new Hype(defaultConfig)
export default HypeClient

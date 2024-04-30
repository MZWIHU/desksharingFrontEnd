interface ConversionData {
  success: boolean
  query: {
    from: string
    to: string
    amount: number
  }
  info?: {
    timestamp: string
    rate: number
  }
  date: string
  result: number
}

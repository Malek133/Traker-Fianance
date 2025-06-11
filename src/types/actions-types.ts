//server side return action
export type SSRAction = {
  errors?: {
    [key: string]: string[]
  }
  message?: string
}

//client side return action
export type CSRAction =
  | {
      success: true
      data?: string | object
    }
  | {
      success: false
      data?: undefined
      message?: string
      errors?: {
        [key: string]: string[]
      }
    }

export type ErrorType =
    | {
          message: string,
          errors: { field?: string, message?: string }[],
          details: string,
      }
    | string

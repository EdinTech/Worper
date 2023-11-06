export const RESULT = {
    SUCCESS: 0,
    FAILURE: 1,
}

export const RETURN = {
    DEFAULT_SUCCESS: {
        status: RESULT.SUCCESS,
        data: null as object,
        message: null as object,
    },
    DEFAULT_FAILURE: {
        status: RESULT.FAILURE,
        data: null as object,
        message: null as object,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SUCCESS: (data: any, message: string) => {
        return {
            status: RESULT.SUCCESS,
            data,
            message,
        }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    FAILURE: (data: any, message: string) => {
        return {
            status: RESULT.FAILURE,
            data,
            message,
        }
    },
}
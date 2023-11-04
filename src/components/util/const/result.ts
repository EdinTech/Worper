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
    SUCCESS: (data: any, message: string) => {
        return {
            status: RESULT.SUCCESS,
            data,
            message,
        }
    },
    FAILURE: (data: any, message: string) => {
        return {
            status: RESULT.FAILURE,
            data,
            message,
        }
    },
}
export interface ErrorObject {
    message?: string | object[]
}

export default function handleError(error: ErrorObject) {
    let response:any = {};

    if (!error.hasOwnProperty('message')) {
        response.mainError = 'Unknown error';
        return response;
    }
    if (typeof error.message === 'string') {
        response.mainError = error.message;
        return response;
    } else if (typeof error.message === 'object') {
        response.inputErrors = {};

        error.message.forEach((element: any) => {
            const input = element.property;
            const errors = element.constraints;

            for (const message in errors) {
                response.inputErrors[input] = errors[message];
            }

        });
        // console.log(response)
        return response
    }
}
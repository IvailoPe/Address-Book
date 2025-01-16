export interface UserInterfaceReg{
    message ?: string,
    username ?: string,
    phoneNumber ?: string,
    email ?: string,
}

export interface UserInterfaceLog{
    token: string,
    user: {
        _id: string
        username: string
        email: string,
        phoneNumber: number,
    },
    message ?: string
}

// Интерфейс за потребителите при регистрация

export interface UserInterfaceReg{  
    message ?: string,
    username ?: string,
    phoneNumber ?: string,
    email ?: string,
}


// Интерфейс за потребителите
export interface profileInterface{
    message ?: string,
    username ?: string,
    phoneNumber ?: string,
    email ?: string,
    createdAt:string,
    contacts:[string]
}


// Интерфейс за потребителите при логване
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
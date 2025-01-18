// Интерфейс за контактите
export interface Contact{
    firstName: string;
    lastName: string;
    companyName: string;
    address: string;
    phoneNumber: string;
    email: string;
    faxNumber: string;
    labels: {
        name: string;
        color: string;
    }[];
    customFields: {
        fieldName:string,
        value:string
    }[]
    comment?: string,
    message?: string
    image:string,
    createdAt:string
    _id:string
}
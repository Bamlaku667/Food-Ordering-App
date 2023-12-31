interface CreateVandorInput {
    name: string,
    ownerName: string,
    foodTypes: [string],
    pincode: string,
    address: string,
    phone: string,
    email: string,
    password: string
}

interface VandorLoginInputs {
    email: string,
    password: string,
}
interface VandorUpdateInputs {
    name: string
    address: string,
    phone: string,
    foodTypes: [string]
}

interface VandorPayload {
    _id: string,
    email: string,
    name: string,
    foodTypes: [string]
}



export { CreateVandorInput, VandorLoginInputs,  VandorUpdateInputs, VandorPayload}
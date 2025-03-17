
export type UserType = {
    id?: number,
    name: string,
    email: string,
    password: string,
    role: 'user' | 'admin',
    createdAt?: Date,
    updatedAt?: Date,
}

export type LoginType = {
    email: string,
    password: string,
}


export interface AddUser{
    Name:string
    Email:string
    Password:string
}

export interface LoginUser{
    Email:string
    Password:string
}


export interface RegisterResponse{
    message:string
}

export interface LoginResponse{
    message:string
    token:string
}
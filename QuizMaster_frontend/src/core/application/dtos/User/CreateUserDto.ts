export interface CreateUserDto {
    lastName: string;
    firstName: string;
    surname?: string;
    mail: string;
    password: string;
    confirmPassword: string;
}
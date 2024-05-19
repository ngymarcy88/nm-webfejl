export interface User{
    id: string;
    email: string;
    username: string;
    name:
    {
        firstname?: string | null | undefined;
        lastname?: string|null;
    }
    dateofbirth: any;
    admin:boolean;
}
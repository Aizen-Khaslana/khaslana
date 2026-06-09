export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    is_umkm: boolean | number;

    profile?: {
        id: number;
        profile_photo: string;
        logo: string;
    } | null;
}
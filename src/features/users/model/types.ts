export interface CreateUserParams {
    profile: {
        name: string;
        dateOfBirth: string;
    };
    access: {
        email: string;
        cellPhone: string;
    };
    wallet: {
        balance: number;
    };
    orders: {
        eventId: string;
        buffetId: string;
        quantity: number;
    }[];
}

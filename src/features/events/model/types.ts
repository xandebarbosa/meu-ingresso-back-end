export interface CreateEventParams {
    name: string;
    description: string;
    ticketsCount: number;
    image: string;
    date: string;
    location: {
        name: string;
        address: string;
        city: string;
        country: string;
    };
}

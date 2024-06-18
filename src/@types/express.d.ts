declare module Express {
    interface Request {
        auth: {
            wallet: string;
            unique?: string;
        };
    }
}

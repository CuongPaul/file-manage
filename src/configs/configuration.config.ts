export interface IDatabaseConfig {
	uri: string;
	host: string;
	port: number;
}

export const databaseConfig = () => ({
	database: {
		uri: process.env.DATABASE_URI,
		host: process.env.DATABASE_HOST,
		port: parseInt(process.env.DATABASE_PORT, 10),
	},
});

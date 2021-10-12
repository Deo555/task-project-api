module.exports = {
	development: {
		client: 'pg',
		connection: {
			host : 'localhost',
		    user : 'postgres',
		    port: 5432,
		    password : '1507',
		    database : 'postgres'
		},
		migrations: {
			directory: './db/migrations',
		},
		seeds: {
			directory: './db/seeds',
		},
	},
	production: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
		migrations: {
			directory: './db/migrations',
		},
		seeds: {
			directory: './db/seeds/production',
		},
	},
};

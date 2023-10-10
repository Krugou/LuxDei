module.exports = {
	apps: [
		{
			name: 'FileServer',
			script: './jakfilmsserver.js',
			watch: true,
			min_uptime: 10000,
			ignore_watch: ['node_modules', 'logs', 'package-lock.json'],
			watch_delay: 3000,
		},
		{
			name: 'ChatDatabase',
			script: './jakfilmsData.js',
			watch: true,
			min_uptime: 10000,
			ignore_watch: ['node_modules', 'logs', 'package-lock.json', 'jakfilms'],
			watch_delay: 3000,
		},
	],
};

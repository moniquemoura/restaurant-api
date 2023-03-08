module.exports = {
  apps: [
    {
      name: 'Restaurant',
      script: 'dist/src/main.js',
      watch: './dist/src',
      env_production: {
        NODE_ENV: 'production',
      },
      exec_mode: 'fork',
      ignore_watch: ['node_modules', 'public'],
    },
  ],
};

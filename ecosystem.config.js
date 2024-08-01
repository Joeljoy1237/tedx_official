module.exports = {
  apps: [
    {
      name: 'tedx',
      script: 'node_modules/.bin/next',
      args: 'start -p 3000',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};

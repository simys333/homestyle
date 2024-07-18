module.exports = {
    apps: [
      {
        name: 'Dev App',
        script: 'yarn',
        args: 'dev',
        autorestart: true,
        watch: false,
        exec_mode: 'cluster',
      },
    ],
  };
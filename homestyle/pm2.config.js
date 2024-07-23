module.exports = {
    apps: [
      {
        name: 'Dev App',
        script: 'yarn',
        args: 'start',
        autorestart: true,
        watch: false,
        exec_mode: 'cluster',
      },
    ],
  };
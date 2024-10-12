const path = require('path')

module.exports = {
  apps : [{
    script: "/usr/src/perpetuus-api/src/index.ts",
    name: "PERPETUUS-APP",
    instances: "max",
    max_memory_restart: "600M",
    exec_mode: "cluster",
    env: {
        NODE_ENV: "production"
    },
    interpreter: "ts-node",
    watch: ["/usr/src/perpetuus-api/src/index.ts"],
    watch_delay: 1000,
    out_file: path.join(__dirname, "../logs/pm2/pm2_logs.log",),
    error_file: path.join(__dirname, "../logs/pm2/pm2_error_logs.log"),
    ignore_watch: [
      path.join(__dirname, "../logs/*"),
      path.join(__dirname, "../.git/*"),
      "/root/.pm2",
      "/usr/src/logs/pm2",
    ],
    wait_ready: true,
  }]
};
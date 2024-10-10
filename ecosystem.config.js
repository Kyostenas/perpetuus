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
    interpreter: "node",
    watch: ["/usr/src/perpetuus-api/src/index.ts"],
    watch_delay: 1000,
    ignore_watch : [ "/pm2/logs" ],
  }]
};
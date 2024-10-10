module.exports = {
  apps : [{
    script: "/usr/src/perpetuus-api/src/index.ts",
    name: "PERPETUUS-APP",
    instances: "max",
    max_memory_restart: "200M",
    exec_mode: "cluster",
    env: {
        NODE_ENV: "production"
    },
    interpreter: "node",
  }]
};
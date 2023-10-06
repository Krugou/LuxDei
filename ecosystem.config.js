module.exports = {
  apps : [{
    name: "FileServer",
    script: "./backend/jakfilmsserver.js",
    watch: true,
    watch_delay: 1000,
    min_uptime: 10000,
  },
  {
    name   : "ChatDatabase",
    script: "./backend/jakfilmsData.js",
    watch: true,
    watch_delay: 1000,
    min_uptime: 10000,

  }]
}

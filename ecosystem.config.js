module.exports = {
  apps : [{
    name: "FileServer",
    script: "./backend/jakfilmsserver.js",
    watch: true,
    min_uptime: 10000,
  },
  {
    name   : "ChatDatabase",
    script: "./backend/jakfilmsData.js",
    watch: true,
    min_uptime: 10000,

  }]
}

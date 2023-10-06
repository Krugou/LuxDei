module.exports = {
  apps : [{
    name: "FileServer",
    script: "./jakfilmsserver.js",
    watch: true,
    min_uptime: 10000,
  },
  {
    name   : "ChatDatabase",
    script: "./jakfilmsData.js",
    watch: true,
    min_uptime: 10000,

  }]
}

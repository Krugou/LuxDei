module.exports = {
  apps: [{
    name: "FileServer",
    script: "./jakfilmsserver.js",
    watch: true,
    min_uptime: 10000,
    ignore_watch: ["node_modules", "logs", "package-lock.json",]
  },
  {
    name: "ChatDatabase",
    script: "./jakfilmsData.js",
    watch: true,
    min_uptime: 10000,
    ignore_watch: ["node_modules", "logs", "package-lock.json","jakfilms"]

  }]
};

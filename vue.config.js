const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: {
        runtimeErrors: false,
      },
    }
  }
});

// const path = require("path");
// const fs = require("fs");
// module.exports = {
//   devServer: {
//     https: {
//       key: fs.readFileSync(path.resolve("./src/certs", "localhost-key.pem")),
//       cert: fs.readFileSync(path.resolve("./src/certs", "localhost.pem")),
//     },
//   },
//   configureWebpack: {
//     resolve: {
//       fallback: {
//         os: false,
//         stream: false,
//         "stream-browserify": false,
//         path: false,
//         fs: false,
//       },
//     },
//   },
// };

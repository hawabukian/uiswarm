const { app } = require("electron");
const { SerialPort } = require("serialport");

// let mainWindow;

function createWindow() {
  //   mainWindow = new BrowserWindow({
  //     width: 800,
  //     height: 600,
  //     webPreferences: {
  //       nodeIntegration: true,
  //     },
  //   });

  //   mainWindow.loadURL(
  //     process.env.NODE_ENV === "production"
  //       ? `file://${__dirname}/index.html`
  //       : "https://localhost:8080"
  //   );

  //   mainWindow.on("closed", () => {
  //     mainWindow = null;
  //   });

  // Mengakses serial port
  SerialPort.list().then((ports) => {
    console.log("Serial ports:", ports);
    // Lakukan tindakan yang sesuai dengan daftar serial port
  });
}

app.on("ready", createWindow);

// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") {
//     app.quit();
//   }
// });

// app.on("activate", () => {
//   if (mainWindow === null) {
//     createWindow();
//   }
// });

export function loadUsb() {
  navigator.serial.getInfo().then((ports) => {
    console.log(`Total devices: ${ports.length}`);
    // Initialize the list of available ports with `ports` on page load.
  });
  //   navigator.usb.getDevices().then((devices) => {
  //     console.log(`Total devices: ${devices.length}`);
  //     devices.forEach((device) => {
  //       console.log(
  //         `Product name: ${device.productName}, serial number ${device.serialNumber}`
  //       );
  //     });
  //   });
}

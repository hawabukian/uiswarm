import { ref, reactive, watch } from "vue";
import io from "socket.io-client";

// const socket = io("http://16.171.160.146:1993");
const socket = io("http://localhost:1993");
const connected = ref(false);

const latitude = ref(-7.27679292068812);
const longitude = ref(112.79495179653168);
const selectedLatitude = ref(-7.27679292068812);
const selectedLongitude = ref(112.7949180653168);

const dataLatitude = ref("");
const dataLongitude = ref("");
const dataAltitude = ref("");
const dataBearing = ref("");

const dataBarometer = ref("");

const polylineColor = "blue";
const polylineLatLong = ref([]);
const polyline = ref({
  latlngs: [],
});

const result = ref("");

const sendData = reactive({
  heading: "10",
  pitch: "2",
  roll: "2",
});

let headingData = ref([
  ["Time", "Heading"],
  ["", 0],
]);
let rollData = ref([
  ["Time", "Roll"],
  ["", 0],
]);
let pitchData = ref([
  ["Time", "Pitch"],
  ["", 0],
]);

const axisData = ref([]);
const axisDataOut = ref([]);
const gpsTracker = ref([]);
const wahanaInformation = ref([]);

socket.on("connect", () => {
  connected.value = true;
  console.log("Socket.IO connected!");
  connected.value = true;

  socket.on("outputPressureWahana", (data) => {
    result.value += JSON.stringify(data);
    const dataSocket = JSON.parse(data);

    dataBarometer.value = dataSocket.barometer;

    console.log("outputPressureWahana: " + dataSocket);
  });

  socket.on("outputGpsWahana", (data) => {
    result.value += JSON.stringify(data);
    const dataSocket = JSON.parse(data);

    selectedLatitude.value = dataSocket.latitude;
    selectedLongitude.value = dataSocket.longitude;

    dataLatitude.value = dataSocket.latitude;
    dataLongitude.value = dataSocket.longitude;
    dataAltitude.value = dataSocket.altitude;
    dataBearing.value = dataSocket.bearing;

    polylineLatLong.value.push([
      parseFloat(dataSocket.latitude),
      parseFloat(dataSocket.longitude),
    ]);

    console.log("outputGpsWahana: " + dataSocket);
  });

  socket.on("outputImuWahana", (data) => {
    // axisData.value = JSON.stringify(data);
    const dataSocket = JSON.parse(data);

    // Parse values as floats
    const yaw = parseFloat(dataSocket.yaw.replace(',', '.'));
    const roll = parseFloat(dataSocket.roll.replace(',', '.'));
    const pitch = parseFloat(dataSocket.pitch.replace(',', '.'));

    headingData.value.push(["", yaw]);
    rollData.value.push(["", roll]);
    pitchData.value.push(["", pitch]);

    console.log("outputImuWahana: " + data);
  });


  socket.on("outputGpsTracker", (data) => {
    const dataSocket = JSON.parse(data);

    gpsTracker.value = [
      parseFloat(dataSocket.latitude_tracker),
      parseFloat(dataSocket.longitude_tracker),
      parseFloat(dataSocket.altitude_tracker),
    ];
  });

  socket.on("outputWahanaInformation", (data) => {
    const dataSocket = JSON.parse(data);

    wahanaInformation.value = [
      parseFloat(dataSocket.voltage),
      parseFloat(dataSocket.current),
      parseFloat(dataSocket.signal),
    ];
    // wahanaInformation.value += JSON.stringify(data);
    console.log("outputWahanaInformation: " + data);
  });
});

socket.on("disconnect", () => {
  connected.value = false;
});

function sendDataExample() {
  socket.emit("inputImuWahana", JSON.stringify(sendData));
}

watch([polylineLatLong.value], (newVal) => {
  polyline.value.latlngs = newVal;
  // console.log(dataLatitude.value);
});
// watch([axisData.value], (newVal) => {
//   axisDataOut.value = newVal;
//   console.log(axisData.value);
// });

const onMapClick = (event) => {
  const latlng = event.latlng;
  selectedLatitude.value = latlng.lat;
  selectedLongitude.value = latlng.lng;
  dataLatitude.value = latlng.lat;
  // dataLongitude.value = latlng.lng;
  updatePolyline(latlng.lat, latlng.lng);
};

const updatePolyline = (latitude, longitude) => {
  polylineLatLong.value.push([parseFloat(latitude), parseFloat(longitude)]);
};

function parseDataImu() {
  headingData.value.push(["", parseFloat(axisData.value.yaw)]);
  rollData.value.push(["", parseFloat(axisData.value.roll)]);
  pitchData.value.push(["", parseFloat(axisData.value.pitch)]);
}
export {
  socket,
  connected,
  axisData,
  axisDataOut,
  wahanaInformation,
  gpsTracker,
  dataLatitude,
  dataLongitude,
  dataAltitude,
  dataBearing,
  dataBarometer,
  latitude,
  longitude,
  polyline,
  polylineColor,
  selectedLatitude,
  selectedLongitude,
  polylineLatLong,
  result,
  sendDataExample,
  onMapClick,
  updatePolyline,
  parseDataImu,
  headingData,
  rollData,
  pitchData,
  sendData,
};

<template>
  <AuthenticatedLayoutVue>
    <div class="my-4 mx-4">
      <GChart
        type="LineChart"
        :data="headingData"
        :options="headingOptions"
        chartTitle="Heading Data"
      />
    </div>

    <div class="my-4 mx-4">
      <GChart
        type="LineChart"
        :data="rollData"
        :options="rollOptions"
        chartTitle="Roll Data"
      />
    </div>

    <div class="my-4 mx-4">
      <GChart
        type="LineChart"
        :data="pitchData"
        :options="pitchOptions"
        chartTitle="Pitch Data"
      />
    </div>
  </AuthenticatedLayoutVue>
</template>

<script>
import AuthenticatedLayoutVue from "@/layouts/AuthenticatedLayout.vue";
import { GChart } from "vue-google-charts";

import {
  headingData,
  rollData,
  pitchData,
  axisData,
  sendData,
  parseDataImu,
  sendDataExample,
} from "@/utils/socketIo.js";

export default {
  name: "DataImuView",
  components: {
    AuthenticatedLayoutVue,
    GChart,
  },
  setup() {
    return {
      headingData,
      rollData,
      pitchData,
      sendData,
      axisData,
      parseDataImu,
      sendDataExample,
      headingOptions: {
        chart: {
          title: "Heading Data",
        },
        vAxes: {
          0: { title: "derajat" }, // Y axis
          1: { title: "derajat" }, // X axis 
        }
      },
      rollOptions: {
        chart: {
          title: "Roll Data",
        },
        vAxes: {
          0: { title: "derajat" }, // Y axis
          1: { title: "X Axis Label" }, // X axis 
        }
      },
      pitchOptions: {
        chart: {
          title: "Pitch Data",
        },
        vAxes: {
          0: { title: "derajat" }, // Y axis
          1: { title: "X Axis Label" }, // X axis 
        },
      },
    };
  },
};

      
</script>

<style>
.main-chart {
  flex: 1;
  max-width: 1200px;
  padding: 25px;
  border: 1px solid #ccc;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.chart-container {
  flex: 1;
  max-width: 1200px;
  padding: 25px;
  border: 1px solid #ccc;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
}
</style>
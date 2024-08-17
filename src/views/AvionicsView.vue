<template>
  <div>
    <p>
      <a href="https://www.genlogic.com">Home</a> |
      <a href="https://www.genlogic.com/demos.html">Demos</a> |
      <a href="https://www.genlogic.com/index.html#Products">Products</a>
    </p>

    <h4> GLG Avionics Web Demo (HTML5 & JavaScript)</h4>

    <p>This is a pure HTML5 and JavaScript example that loads custom gauges
      created with the <b>GLG Graphics Builder</b> into a JavaScript program
      and animates them with real-time data using the GLG JavaScript Library API.
      <a href="#info">More information</a></p>

    <a href="avionics_demo.js" target="_blank" style="text-decoration: none;">
      <button type="button" class="top_button">Source Code</button>
    </a>

    <div id="glg_area" class="glg_wrapper"
         style="width: 100%; height: 300px; background-color: white;
                padding: 0px;">
      <div id="loader_container">
        <div id="loader"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AvionicsView",
  mounted() {
    // Load your scripts when the component is mounted
    this.loadScripts([
      "GlgDemo.js",
      "GlgToolkitDemo.js",
      "gunzip.min.js",
      "avionics_demo.js"
    ]);
  },
  methods: {
    loadScripts(scripts) {
      scripts.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        script.defer = true;
        document.head.appendChild(script);
      });
    },
  }
};
</script>

<style scoped>
html, body {
  background-color: white;
  font-family: Arial;
}

.glg_wrapper {
  margin: 0px;
  border: solid thin rgb(249, 248, 248);
}

.top_button {
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
  font-size: medium;
  color: rgb(0,50,100);
  -webkit-appearance: button;
}

.top_button_large {
  margin-top: 5px;
  margin-bottom: 15px;
  margin-right: 5px;
  font-size: large;
  color: rgb(0,50,100);
  -webkit-appearance: button;
}

.radio_container {
  display: none;
  border: solid 1px #BBBBBB;
  border-radius: 2px;
  padding: 2px 2px 2px 5px;
}

.checkbox_div {
  display: inline-block;
  border: solid 1px #BBBBBB;
  border-radius: 2px;
  padding: 1px 5px 1px 5px;
  background-color: #EEEEEE;
  font-size: medium;
}

.checkbox_input {
  border: solid 1px #AAAAAA;
  border-radius: 2px;
}

.checkbox_label {
  color: rgb(0,50,100);
  font-size: medium;
}

.checkbox_label_large {
  color: rgb(0,50,100);
  font-size: large;
}

li {
  margin-bottom: 10px;
}

#loader_container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

#loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: loader_spin 2s linear infinite;  /* Safari */
  animation: loader_spin 2s linear infinite;
}

@-webkit-keyframes loader_spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes loader_spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* You can add additional scoped styles here */
</style>

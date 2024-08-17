//////////////////////////////////////////////////////////////////////////////
// GLG Avionics Demo
//
// The demo is written in pure HTML5 and JavaScript. The source code of the
// demo uses the GLG Toolkit JavaScript Library supplied by the included
// Glg*.js and GlgToolkit*.js files.
//
// The library loads a GLG drawing and renders it on a web page, providing
// an API to animate the drawing with real-time data and handle user
// interaction with graphical objects in the drawing.
//
// The drawings are created using the GLG Graphics Builder, an interactive
// editor that allows to create grahical objects and define their dynamic
// behavior without any programming.
//////////////////////////////////////////////////////////////////////////////

// Get a handle to the GLG Toolkit library.
var GLG = new GlgToolkit();

// Debugging aid: uncomment the next line to throw an exception on a GLG error.
//GLG.ThrowExceptionOnError( true, true, true );

/* Load a drawing from the avionics.g file. 
   The LoadCB callback will be invoked when the drawing has been loaded.
*/

// GLG.LoadWidgetFromURL("ui-avionics.g", null, LoadCB, null);
GLG.LoadWidgetFromURL("ui-avionics-alternatif.g", null, LoadCB, null);

// Set initial size of the drawing.
SetDrawingSize(false);

// Increase canvas resolution for mobile devices.
SetCanvasResolution();

//////////////////////////////////////////////////////////////////////////////
function LoadCB(drawing, data, path) {
  if (drawing == null) {
    window.alert("Can't load drawing, check console message for details.");
    return;
  }

  var loader = document.getElementById("loader_container");
  if (loader)
    loader.parentNode.removeChild(loader);

  // Define the element in the HTML page to display the drawing in.
  drawing.SetParentElement("glg_area");

  // Disable viewport border to use the border of the glg_area.
  drawing.SetDResource("LineWidth", 0);

  StartAvionicsDemo(drawing);
}

//////////////////////////////////////////////////////////////////////////////
// Control variables and constants
//////////////////////////////////////////////////////////////////////////////

// Graphics update interval.
var UPDATE_INTERVAL = 50;    // msec
var viewport;
var timer = null;
var animation_array = [];

//////////////////////////////////////////////////////////////////////////////
function StartAvionicsDemo(drawing) {
  viewport = drawing;

  // InitializeSimulationData();

  viewport.InitialDraw();

  // Start periodic updates.
  timer = setTimeout(UpdateAvionics, UPDATE_INTERVAL);
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

//////////////////////////////////////////////////////////////////////////////
function UpdateAvionics() {
  // Access DOM elements when they are ready
  var altitudeElement = document.getElementById("altitude");
  var headingElement = document.getElementById("heading");
  var pitchElement = document.getElementById("pitch");
  var rollElement = document.getElementById("roll");

  // Check if elements exist before accessing their innerHTML
  var altitude = altitudeElement ? parseFloat(altitudeElement.innerHTML) : 0;
  var heading = headingElement ? parseFloat(headingElement.innerHTML) : 0;
  var pitch = pitchElement ? parseFloat(pitchElement.innerHTML) : 0;
  var roll = rollElement ? parseFloat(rollElement.innerHTML) : 0;

  // Calculate altitude in meters
  altitude = 1000 + (altitude * 0.3048);

  viewport.SetDResource("COMPASS/Value", heading);
  viewport.SetDResource("HORIZON/Pitch", pitch);
  viewport.SetDResource("HORIZON/Roll", roll);
  viewport.SetDResource("ALTIMETER/Value", altitude);

  viewport.Update();   // Show changes  

  // Restart update timer
  timer = setTimeout(UpdateAvionics, UPDATE_INTERVAL);
}

// function UpdateAvionics(heading, pitch, roll, altitude) {
//   viewport.SetDResource("COMPASS/Value", heading);
//   viewport.SetDResource("HORIZON/Pitch", pitch);
//   viewport.SetDResource("HORIZON/Roll", roll);
//   viewport.SetDResource("ALTIMETER/Value", altitude);
//   viewport.Update();
//   timer = setTimeout(UpdateAvionics, UPDATE_INTERVAL);
// }

//////////////////////////////////////////////////////////////////////////////
// Changes drawing size while maintaining width/height aspect ratio.
//////////////////////////////////////////////////////////////////////////////
function SetDrawingSize(next_size) {
  const ASPECT_RATIO = 750 / 600;

  // Settings for desktop displays.
  const MIN_WIDTH = 200;
  const MAX_WIDTH = 400;
  const SCROLLBAR_WIDTH = 15;

  if (SetDrawingSize.size_index == undefined)   // first time
  {
    SetDrawingSize.size_index = 0;

    SetDrawingSize.small_sizes = [1, 1.5, 2., 2.5];
    SetDrawingSize.medium_sizes = [1, 0.75, 1.25, 1.5];
    SetDrawingSize.large_sizes = [1, 0.6, 1.25, 1.5];
    SetDrawingSize.num_sizes = SetDrawingSize.small_sizes.length;
    SetDrawingSize.is_mobile = (screen.width <= 760);

    window.addEventListener("resize", () => SetDrawingSize(false));
  }
  else if (next_size) {
    ++SetDrawingSize.size_index;
    SetDrawingSize.size_index %= SetDrawingSize.num_sizes;
  }

  var drawing_area = document.getElementById("glg_area");
  if (SetDrawingSize.is_mobile) {
    /* Mobile devices use constant device-width, adjust only the height 
       of the drawing to keep the aspect ratio.
    */
    drawing_area.style.height =
      "" + Math.trunc(drawing_area.clientWidth / ASPECT_RATIO) + "px";
  }
  else   /* Desktop */ {
    var span = document.body.clientWidth;
    if (!SetDrawingSize.is_mobile)
      span -= SCROLLBAR_WIDTH;

    var start_width;
    if (span < MIN_WIDTH)
      start_width = MIN_WIDTH;
    else if (span > MAX_WIDTH)
      start_width = MAX_WIDTH;
    else
      start_width = span;

    var size_array;
    if (span < 600)
      size_array = SetDrawingSize.small_sizes;
    else if (span < 800)
      size_array = SetDrawingSize.medium_sizes;
    else
      size_array = SetDrawingSize.large_sizes;

    var size_coeff = size_array[SetDrawingSize.size_index];
    var width = Math.trunc(Math.max(start_width * size_coeff, MIN_WIDTH));

    drawing_area.style.width = "" + width + "px";
    drawing_area.style.height = "" + Math.trunc(width / ASPECT_RATIO) + "px";
  }
}

//////////////////////////////////////////////////////////////////////////////
// Increases canvas resolution for mobile devices with HiDPI displays.
// Returns chosen coordinate scale factor.
//////////////////////////////////////////////////////////////////////////////
function SetCanvasResolution() {
  // Set canvas resolution only for mobile devices with devicePixelRatio != 1.
  if (window.devicePixelRatio == 1. || !SetDrawingSize.is_mobile)
    return 1.0;   // Use coord scale = 1.0 for desktop.

  // Mobile devices use fixed device-width: disable Change Drawing Size button.
  RemoveElement("change_size");

  /* The first parameter defines canvas coordinate scaling with values 
     between 1 and devicePixelRatio. Values greater than 1 increase 
     canvas resolution and result in sharper rendering. The value of 
     devicePixelRatio may be used for very crisp rendering with very thin lines.

     Canvas scale > 1 makes text smaller, and the second parameter defines
     the text scaling factor used to increase text size.

     The third parameter defines the scaling factor that is used to
     scale down text in native widgets (such as native buttons, toggles, etc.)
     to match the scale of the drawing.
  */
  var coord_scale = 2.0;
  GLG.SetCanvasScale(coord_scale, 1.4, 0.6);

  return coord_scale;      // Chosen coord scale for mobile devices.
}

//////////////////////////////////////////////////////////////////////////
function RemoveElement(name) {
  var element = document.getElementById(name);
  if (element != null)
    element.parentNode.removeChild(element);
}
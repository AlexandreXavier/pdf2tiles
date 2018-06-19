console.log(scaleLat(process.argv[2]))

function scaleLat (lat) {
  var width = lonWidth(lat) / 8 // 1 degree divided by 8 (7.5 minute segments)
  var pxl = 9164 / 4526 // pixels per meter based on measuring in photoshop/google maps
  var img = Math.round(width / pxl / 2) // pixel width of map portion (150 dpi)
  return `-srcwin ${Math.round((3262 - img) / 2)} 186 ${img} 3422`
}

function deg2rad(deg) {
  conv_factor = (2.0 * Math.PI)/360.0
  return(deg * conv_factor)
}

function rad2deg(rad) {
  conv_factor = 360/(2.0 * Math.PI)
  return(rad * conv_factor)
}

function log10(val) {
  return(Math.LOG10E * Math.log(val))
}

function lonWidth (lat) {
	lat = deg2rad(lat)

	// Set up "Constants"
	var m1 = 111132.92		// latitude calculation term 1
	var m2 = -559.82		  // latitude calculation term 2
	var m3 = 1.175			  // latitude calculation term 3
	var m4 = -0.0023		  // latitude calculation term 4
	var p1 = 111412.84		// longitude calculation term 1
	var p2 = -93.5			  // longitude calculation term 2
	var p3 = 0.118			  // longitude calculation term 3

	// Calculate the length of a degree of latitude and longitude in meters
	var latlen = m1 + 
    (m2 * Math.cos(2 * lat)) + 
    (m3 * Math.cos(4 * lat)) +
		(m4 * Math.cos(6 * lat))
	var meters = 
    (p1 * Math.cos(lat)) + 
    (p2 * Math.cos(3 * lat)) +
		(p3 * Math.cos(5 * lat))
	
  return Math.round(meters)
}

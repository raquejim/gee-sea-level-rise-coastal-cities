// coastalDEM image collection and mosaic into one image
// coastalDEM: high accuracy digital elevation data for coastal areas 
// image collection mosaic: combines all images in this collection inyo one single image 
var elevation = ee.ImageCollection("users/kh3657/CoastalDEMcol").mosaic();

// setup cisualization params 
var elevationViz = {min:0, max:6, opacity:.3, palette: ['red', 'yellow', 'orange','green']};

// add variables to map 
Map.addLayer(elevation, elevationViz, 'Elevation');

// extract the land area (elevation > 0) 
var land = elevation.gt(0); 

// sea level rise by 2100 (SSP5-RCP8.5)
var seaLevelRise = 1.16; // change based on city

// extract the land inundated by sea level rise 
var inundatedSeaLevelRise = elevation.lt(seaLevelRise).mask(land);

// add inundated - sea level rise to the map 
Map.addLayer(land.mask(inundatedSeaLevelRise), {palette: ['red']}, 'Inundated - Sea Level Rise');

// highest storm surge in history 
var stormSurge = 0.10; // change based on city 

// extract the land below storm surge 
var inundatedStormSurge = elevation.lt(stormSurge).mask(land);

// add inundated - storm surge to map 
Map.addLayer(land.mask(inundatedStormSurge), {palette:['orange']}, 'Inundated - Storm Surge');

// extract the land inundated by sea level rise + storm surge 
var inundatedCombined = elevation.lt(seaLevelRise + stormSurge).mask(land); 

// add inundated - combined to map 
Mapp.addLayer(land.mask(inundatedCombined), {palette: ['yellow']}, 'Inundated - Combined'); 

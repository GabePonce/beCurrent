import React, { useEffect, useState } from 'react';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM as OSMSource, Vector as VectorSource } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import { Style, Stroke, Circle, Fill, Text } from 'ol/style';
import { LineString, Point } from 'ol/geom';
import Feature from 'ol/Feature';

// CSS for OpenLayers
import 'ol/ol.css';

import './MapStyles.css';

// Polyline decoder (to decode GraphHopper's encoded polyline)
import { decode } from '@mapbox/polyline';

const RoutePlanner = () => {
  const [map, setMap] = useState(null);
  const [addresses, setAddresses] = useState(['', '']); // Array to store user input addresses
  const [coordinates, setCoordinates] = useState([]); // Array to store geocoded coordinates
  const [routeLayer, setRouteLayer] = useState(null); // Reference to the route layer
  const [markerLayers, setMarkerLayers] = useState([]); // References to the marker layers

  useEffect(() => {
    // Initialize the map
    const initialMap = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSMSource(),
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });

    setMap(initialMap);

    // Cleanup on unmount
    return () => {
      if (initialMap) {
        initialMap.setTarget(null);
      }
    };
  }, []);

  // Function to handle address input changes
  const handleAddressChange = (index, value) => {
    const newAddresses = [...addresses];
    newAddresses[index] = value;
    setAddresses(newAddresses);
  };

  // Function to add a new address input field
  const addAddressField = () => {
    setAddresses([...addresses, '']);
  };

  // Function to remove previous route and markers
  const clearPreviousLayers = () => {
    if (map) {
      // Remove the previous route layer
      if (routeLayer) {
        map.removeLayer(routeLayer);
        setRouteLayer(null);
      }

      // Remove all previous marker layers
      markerLayers.forEach(layer => map.removeLayer(layer));
      setMarkerLayers([]);
    }
  };

  // Function to geocode addresses using Nominatim (OpenStreetMap)
  const geocodeAddresses = async () => {
    const geocodedCoordinates = [];
    for (const address of addresses) {
      if (address.trim() === '') continue; // Skip empty addresses

      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to geocode address');
      }

      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        geocodedCoordinates.push([parseFloat(lon), parseFloat(lat)]);
      } else {
        throw new Error(`Address not found: ${address}`);
      }
    }

    setCoordinates(geocodedCoordinates);
    return geocodedCoordinates;
  };

  // Function to calculate the route using GraphHopper API
  const calculateRouteWithGraphHopper = async (points) => {
    const apiKey = '593fdc21-683c-41c1-8d2e-171cd646e0c1'; // Replace with your GraphHopper API key
    const url = `https://graphhopper.com/api/1/route?point=${points
      .map(point => `${point[1]},${point[0]}`)
      .join('&point=')}&vehicle=car&key=${apiKey}&type=json`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch route from GraphHopper');
    }

    const data = await response.json();
    console.log('GraphHopper Response:', data); // Debugging: Log the GraphHopper response

    // Decode the polyline geometry from GraphHopper response
    const encodedPolyline = data.paths[0].points;
    const decodedCoordinates = decode(encodedPolyline).map(coord => [coord[1], coord[0]]); // Swap lat/lng to lng/lat

    console.log('Decoded Coordinates:', decodedCoordinates); // Debugging: Log the decoded coordinates

    // Create a LineString geometry from the decoded coordinates
    const lineString = new LineString(decodedCoordinates);
    lineString.transform('EPSG:4326', 'EPSG:3857'); // Transform coordinates to map projection

    return lineString;
  };

  // Function to display the route on the map
  const displayRoute = (map, routeGeometry) => {
    const routeFeature = new Feature({
      geometry: routeGeometry,
    });

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [routeFeature],
      }),
      style: new Style({
        stroke: new Stroke({
          color: 'blue',
          width: 3,
        }),
      }),
    });

    map.addLayer(vectorLayer);
    setRouteLayer(vectorLayer); // Store the route layer reference
    console.log('Route Layer Added to Map'); // Debugging: Log when the route layer is added
  };

  // Function to add markers to the map
  const addMarker = (map, lon, lat, label) => {
    const marker = new Feature({
      geometry: new Point(fromLonLat([lon, lat])),
    });

    const markerLayer = new VectorLayer({
      source: new VectorSource({
        features: [marker],
      }),
      style: new Style({
        image: new Circle({
          radius: 6,
          fill: new Fill({ color: 'red' }),
          stroke: new Stroke({ color: 'white', width: 2 }),
        }),
        text: new Text({
          text: label,
          offsetY: -15,
          font: '12px Calibri,sans-serif',
          fill: new Fill({ color: '#000' }),
          stroke: new Stroke({ color: '#fff', width: 2 }),
        }),
      }),
    });

    map.addLayer(markerLayer);
    setMarkerLayers(prevLayers => [...prevLayers, markerLayer]); // Store the marker layer reference
    console.log('Marker Added:', label); // Debugging: Log when a marker is added
  };

  // Function to zoom in on the route
  const zoomToRoute = (map, routeGeometry) => {
    const routeFeature = new Feature({
      geometry: routeGeometry,
    });

    const vectorSource = new VectorSource({
      features: [routeFeature],
    });

    // Fit the map view to the extent of the route
    map.getView().fit(vectorSource.getExtent(), {
      padding: [50, 50, 50, 50], // Add padding around the route
      maxZoom: 10, // Optional: Set a maximum zoom level
    });

    console.log('Map Zoomed to Route Extent'); // Debugging: Log when the map is zoomed
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Clear previous route and markers
      clearPreviousLayers();

      // Geocode addresses to get coordinates
      const geocodedCoordinates = await geocodeAddresses();
      console.log('Geocoded Coordinates:', geocodedCoordinates);

      // Calculate the route using GraphHopper
      const routeGeometry = await calculateRouteWithGraphHopper(geocodedCoordinates);

      // Display the route on the map
      displayRoute(map, routeGeometry);

      // Add markers for each address
      geocodedCoordinates.forEach((coord, index) => {
        addMarker(map, coord[0], coord[1], `Point ${index + 1}`);
      });

      // Zoom in on the route
      zoomToRoute(map, routeGeometry);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addNewAddress = () => {

    var optionButtons = document.getElementsByClassName('address-options');
    for (var i = 0; i < optionButtons.length; i++) {
      optionButtons[i].style.display = "none";
    }

    var map = document.getElementById('map');
    var form = document.getElementById('add-new-address-result');

    form.style.display = 'block';
    map.style.display = "none";

  };

  const viewAddressList = () => {
    
    var map = document.getElementById('map');
    var form = document.getElementById('view-address-results');
    var map
    
    form.style.display = 'block';
    map.style.display = "none";

  };

  const confirmChanges = () => {

    var newAddress = document.getElementById('new-address').value;
    
    window.alert(newAddress);

    resetEntry();
  };


  const resetEntry = () => {

    // Wipe any entered data.
    var allInputs = document.getElementById('add-new-address-result').getElementsByTagName('input'); // Currently only works for one form.
    for (var i = 0; i < allInputs.length; i++) {
      allInputs[i].value = "";
    }

    var optionButtons = document.getElementsByClassName('address-options');
    for (var i = 0; i < optionButtons.length; i++) {
      optionButtons[i].style.display = "block";
    }
    
    var map = document.getElementById('map');
    var form = document.getElementById('add-new-address-result');
    form.style.display = "none";
    map.style.display = "block";

  };



  return (
    <div>
      <div id="map" style={{ width: '50vw', height: '50vh' }}></div>
      <form onSubmit={handleSubmit}>
        {/* {addresses.map((address, index) => (
          <div key={index}>
            <input
              type="text"
              value={address}
              onChange={(e) => handleAddressChange(index, e.target.value)}
              placeholder={`Address ${index + 1}`}
            />
          </div>
        ))} */}
        {/* <button type="button" onClick={addAddressField}>Add New Textbox</button>
        <button type="submit">Calculate Route</button> */}
        <button className="address-options" id="add-new-address" onClick={addNewAddress}>Add New Address</button>
        <button className="address-options" id="view-address-list" onClick={viewAddressList}>Address List</button>
        {/* 
          Add new address: Disable everything except inserting a new address, where it can be confirmed or cancelled.
          Inserting adds to DB, which makes it visible when clicking Address List
          Calculate Route: populate two dropdowns with the available addresses. When user picks two, confirm or cancel. Display results on map if confirming.
          All addresses should have their points visible on the map.

          Get all elements needed for manipulation at the top of this file.
        */}
      </form>
      <div id="add-new-address-result" className="interaction-option-areas">
        <input id="input-new-address" type="text" placeholder='45 Lampkin Lane, Haddonfield, Illinois'></input>
        <button id="add-new-address" onClick={confirmChanges}>Confirm</button>
          <button id="cancel" onClick={resetEntry}>Cancel</button>
      </div>
    </div>
  );
};

export default RoutePlanner;
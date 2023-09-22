"use client";
import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import classes from "./page.module.css";

import data from "./transit-stations.geojson";

export default function Home() {
  const mapPlacer = useRef(null);
  const [mapStyle, setMapStyle] = useState("arcgis/imagery");
  const sourceId = "transit-stations-source";

  const handleMapStyleChange = (e) => {
    setMapStyle(e.target.value);
  };

  useEffect(() => {
    const apiKey =
      "AAPK739f9eb83dcb4f60844b115511919e4em3epFcVYfLypOLrbrhZoNBQtY8Jc0h2Gq0FAZXzxz6oMZnixDkUoADoUKOKBlBfG";
    const basemapStyleURL = `https://basemapstyles-api.arcgis.com/arcgis/rest/services/styles/v2/styles/`;

    const map = new maplibregl.Map({
      container: mapPlacer.current,
      style: `${basemapStyleURL}${mapStyle}?token=${apiKey}`,
      center: [-106.292611313611, 31.8035654832868],
      zoom: 10,
    });

    map.on("load", () => {
      map.addSource(sourceId, {
        type: "geojson",
        data: data,
      });

      map.addLayer({
        id: "your-fill-layer-id",
        type: "fill",
        source: sourceId,
        paint: {
          "fill-color": ["match", ["get", "type"], "local transfer center", "red", "blue"],
          "fill-opacity": 0.7,
        },
      });
    });

    return () => map.remove();
  }, [mapStyle]);

  const basemapOptions = [
    "arcgis/outdoor",
    "arcgis/community",
    "arcgis/navigation",
    "arcgis/streets",
    "arcgis/streets-relief",
    "arcgis/imagery",
    "arcgis/oceans",
    "arcgis/topographic",
    "arcgis/light-gray",
    "arcgis/dark-gray",
    "arcgis/human-geography",
    "arcgis/charted-territory",
    "arcgis/nova",
    "osm/standard",
    "osm/navigation",
    "osm/streets",
    "osm/blueprint",
  ];

  return (
    <main style={{ width: "100%", height: "100vh" }}>
      <div ref={mapPlacer} style={{ width: "100%", height: "100%" }}></div>
      <div className={classes.basemapsWrapper}>
        <select onChange={handleMapStyleChange} value={mapStyle} className={classes.basemaps}>
          {basemapOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </main>
  );
}

import * as Plot from "../../_npm/@observablehq/plot@0.6.16/e828d8c8.js";
import * as d3 from "../../_npm/d3@7.9.0/7055d4c5.js";

// Define the radii for the concentric circles
const radii = [0.98, 0.81, 0.65, 0.49, 0.33, 0.16];

// Concentric Circle colours for each radii
var cc = {
    0.98: 'hsl(10.91, 100%, 50%)',
    0.81: 'hsl(32.73, 100%, 50%)',
    0.65: 'hsl(54.55, 100%, 50%)',
    0.49: 'hsl(76.36, 100%, 50%)',
    0.33: 'hsl(98.18, 100%, 50%)',
    0.16: 'hsl(120,100%,50%)',
}

export var radarPlot = function radarPlot(points) {
    const longitude = d3.scalePoint(new Set(Plot.valueof(points, "key")), [180, -180]).padding(0.5).align(1)

    var radar = Plot.plot({
        width: 480,
        height: 480,
        style: {fontSize: "12px"},
        projection: {
        type: "azimuthal-equidistant",
        rotate: [0, -90],
        // Note: 0.625° corresponds to max. length (here, 0.5), plus enough room for the labels
        domain: d3.geoCircle().center([0, 90]).radius(1.35)()
        },
        marks: [
        // grey discs
        Plot.geo(radii, {
            geometry: (r) => d3.geoCircle().center([0, 90]).radius(r)(),
            stroke: "black",
            fill: (r) => cc[r], // Use the color scale to determine fill color
            strokeOpacity: 0.3,
            fillOpacity: 1,
            strokeWidth: 0.5
        }),
    
        // white axes
        Plot.link(longitude.domain(), {
            x1: longitude,
            y1: 90 - 1.1,
            x2: 0,
            y2: 90,
            stroke: "white",
            strokeOpacity: 0.5,
            strokeWidth: 2.5
        }),
    
        // tick labels
        Plot.text([0.98, 0.81, 0.65, 0.49, 0.33, 0.16, 0], {
            x: 180,
            y: (d) => 90 - d,
            dx: 2,
            textAnchor: "start",
            text: ['300', '250', '200', '150', '100', '50', '0'],
            fill: "currentColor",
            stroke: "white",
            fontSize: 8
        }),
    
        // axes labels
        Plot.text(longitude.domain(), {
            x: longitude,
            y: 90 - 1.25,
            text: Plot.identity,
            lineWidth: 5
        }),
    
        // areas
        Plot.area(points, {
            x1: ({ key }) => longitude(key),
            y1: ({ value }) => 90 - (value/307),
            x2: 0,
            y2: 90,
            stroke: "black",
            strokeWidth: 2.5,
            curve: "linear-closed"
        }),
    
        // points
        Plot.dot(points, {
            x: ({ key }) => longitude(key),
            y: ({ value }) => 90 - (value/307),
            stroke: "black"
        }),
    
        // interactive labels
        Plot.text(
            points,
            Plot.pointer({
            x: ({ key }) => longitude(key),
            y: ({ value }) => 90 - value,
            text: (d) => `${(100 * d.value).toFixed(0)}%`,
            textAnchor: "start",
            dx: 4,
            fill: "currentColor",
            stroke: "white",
            maxRadius: 10
            })
        ),
        ]
    })
    
    return radar
}
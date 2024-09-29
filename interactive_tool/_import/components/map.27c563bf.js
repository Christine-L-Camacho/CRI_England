import * as L from "../../_npm/leaflet@1.9.4/d8a0af43.js";

export function map({cri_lad_data = [], div = {}, lat = 0.0, lng = 0.0, zoom = 0} = {}) {
    const map = L.map(div)
    .setView([lat, lng], zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
    .addTo(map);

    function getColor(quintile) {
    return quintile === "Least resilient" ? '#903d6d' :
        quintile === "2" ? '#bc6595' :
        quintile === "3" ? '#3e84bc' :
        quintile === "4" ? '#85a435' :
        quintile === "Most resilient" ? '#5a7b1b' :
        '#ffffff'; // Default color if quintile is missing
    }

    function style(feature) {
    return {
        fillColor: getColor(feature.properties.quintile),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
    }

    function onEachFeature(feature, layer) {
        layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature
        });
    }

    function highlightFeature(e) {
    var layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.5
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }

        info.update(layer.feature.properties);
    }

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
    }

    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }

    var info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    info.update = function (props) {
    this._div.innerHTML = '<h4>Community Resilience Index by English Local Authority</h4>' + 
        (props ? 
        '<b>' + (props.LAD22CD ? props.LAD22CD : 'Unknown') + '</b><br />' +
        (props.LAD22NM ? props.LAD22NM : 'Unknown') + '</b><br /><br />' +
        'Community Resilience Index: ' + 
        (!isNaN(parseFloat(props.index)) ? parseFloat(props.index).toFixed(1) : 'N/A') + '<br>' +
        'Quintile: ' + (props.quintile ? props.quintile : 'N/A') 
        : 'Hover over an area');
    };

    info.addTo(map);

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
    grades = ["Least resilient", "2", "3", "4", "Most resilient"],
    labels = ['1', '', '', '', '5'];

    // Loop through quintile intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
        '<i style="background:' + getColor(grades[i]) + '"></i> ' +
        grades[i] + (labels[i] ? ' - ' + labels[i] : '') + '<br>';
        }

    return div;
    };

    legend.addTo(map);

    var layers = {};

    var geojson = L.geoJson(cri_lad_data, {
        style: style,
        onEachFeature: eachFeature
        }).addTo(map);

    function eachFeature(feature, layer) {
        // store reference
        layers[feature.properties.LAD22CD] = layer;
        onEachFeature(feature, layer)
    }
  
    //return Object.defineProperty(div);
    return layers;
  }
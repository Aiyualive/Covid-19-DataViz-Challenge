

// Container variables
var countries =[]
var dict_movie_counts = {}
var dataset = {}

// Country iso 3 codes: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3
// Format:
// { "USA": {numberOfThings: count, fillColor: #FFFFFF},
//   "CAN": {numberOfThings: count, fillColor: #FFFFFF}
// }
d3.csv("mapdata.csv", function(data){
    // Get all the country names

        // Set the color palette
    var palette = d3.scale.log()
        .domain([1, 80271])
        .range(["#FFCCCB", "#8B0000"]); // Light red, dark red

    for (i = 0; i < data.length; i++){
        var Code = data[i].CountryCode
        var Cases = parseInt(data[i].Confirmed)
        var Deaths = parseInt(data[i].Deaths)
        var Recovered = parseInt(data[i].Recovered)

        dataset[Code] = {cases: Cases,
                         deaths: Deaths,
                         recovered: Recovered,
                         fillColor: palette(Cases)}
    }
    // Documentation
    new Datamap({
        element: document.getElementById('container1'),
        projection: 'mercator', // Flat view

        // Non-listed countries are defaulted to this color
        fills: {
            defaultFill: '#F5F5F5' // Grey
        },
        data: dataset,
        geographyConfig: {
            borderColor: '#DEDEDE', // Default border color
            highlightBorderWidth: 3,
            // Do not change color on mouse hover
            highlightFillColor: function(geo) {
            return geo['fillColor'] || '#F5F5F5';
            },
            highlightBorderColor: '#B7B7B7', // Color when highligthing
            // Popup tooltip
            popupTemplate: function(geo, data) {
            // don't show tooltip if country not present in dataset
            if (!data) {
                return;
            }
            // tooltip content
            return ['<div class="hoverinfo">',
                '<strong>', geo.properties.name, '</strong>',
                '<br>Cases: <strong>', data.cases, '</strong>',
                '<br>Deaths: <strong>', data.deaths, '</strong>',
                '<br>Recovered: <strong>', data.recovered, '</strong>',
                '</div>'
            ].join('');
            }
        }
    });
})


"use strict";
(function () {
   window.onload = function() {
      var slider = document.getElementById("slider");
      var output = document.getElementById("value");
      output.innerHTML = slider.value; // Display the default slider value
      displayGraph(2003);
      slider.oninput = function() {
         output.innerHTML = this.value;
         displayGraph(this.value);
      }
   }
   
   function displayGraph(year) {
      var url ="https://raw.githubusercontent.com/pathiratk/india-lights-analysis/master/2/" + year + ".json";
      $.getJSON(url, function(json) {
         var json2 = [];
         var med = [];
         for (var i = 0; i < json.length; i++) {
            med.push(json[i]["vis_median"]);
         }
         med.sort(function(a, b){return a - b});
         console.log(med);
         var change = (med[3] - med[0])/Math.abs(med[0]) * 100;
         console.log(med[3] + " " + med[0] + " " + change);
         for (var i = 0; i < json.length; i++) {
            var obj = {};
            obj["vis_median"] = json[i]["vis_median"];
            obj["percent_change"] = "`% Change";
            obj["% change"] = change;
            json2.push(obj);
         }

         var spec = {
            "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
            "title": {
                "text": "Median of Monthly Light Outputs for the districts in India in " + year
            },
            "layer" : [
               {
                  "data": {
                     "values": json
                  },
                  "layer": [
                     {
                        "mark": {
                           "type": "bar",
                           "point": true
                        },
                        "encoding": {
                           "x": {
                              "field": "quintile", 
                              "type": "nominal",
                              "axis": {
                                 "title": "Quintile"
                              }
                           },
                           "y": {
                              "field": "vis_median", 
                              "type": "quantitative", 
                              "axis": {
                                 "title": "Median of monthly light outputs"
                              }
                           }
                        }
                     }
                  ]
               },
               {
                  "data": {
                     "values": json2
                  },
                  "layer": [
                     {
                       "mark": {
                          "type": "boxplot",
                           "ticks": {
                              "size": 10
                           },
                           "box": {
                              "size": 1,
                              "color": "black"
                            },
                            "median": false,
                            "extent": "min-max"
                       },
                       
                       "encoding": {
                         "x": {"field": "percent_change", "type": "nominal"},
                         "y": {"field": "vis_median", "type" : "quantitative"}
                       }
                     },
                     {
                       "mark": {
                         "type": "text",
                       "align": "left",
                       "dx": -2,
                       "dy": -4
                       },"encoding": {
                       "x": {
                         "value": "width"
                       },
                       "y": {
                         "value": 50
                       },
                       "text": {"field": "% change", "type": "quantitative", "aggregate": "max", "format":".2f"}
                     }
                     }
                   ]
               }
            ]
         };
         vegaEmbed('#view', spec, {defaultStyle: true}).catch(console.warn);
      });
   }
})();
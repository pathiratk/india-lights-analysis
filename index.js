"use strict";
(function () {
   window.onload = function() {
      // $.getJSON("1/1993.json", function(json) {
         var spec = {
            "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
            "mark": {
               "type": "line",
               "point": true
             },
             "data": {
                "values": [{
                  "state": "goa",
                  "month": 1,
                  "vis_median": "0.6627"
                },
                {
                  "state": "madhya-pradesh",
                  "month": 1,
                  "vis_median": "-0.5106"
                },]
             },
             "encoding": {
               "x": {"field": "month", "type": "nominal"},
               "y": {"field": "vis_median", "type": "quantitative"},
               "color": {"field": "state", "type": "nominal"}
             }
         };

         vegaEmbed('#view', spec, {defaultStyle: true}).catch(console.warn);
         
      // });
   }

})();
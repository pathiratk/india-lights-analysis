"use strict";
(function () {
   window.onload = function() {
      var url ="https://raw.githubusercontent.com/pathiratk/india-lights-analysis/master/1/1993.json";
      $.getJSON(url, function(json) {
         var spec = {
            "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
            "mark": {
               "type": "line",
               "point": true
             },
             "data": {
                "values": json
             },
             "encoding": {
               "x": {"field": "month", "type": "nominal"},
               "y": {"field": "vis_median", "type": "quantitative"},
               "color": {"field": "state", "type": "nominal"}
             }
         };

         vegaEmbed('#view', spec, {defaultStyle: true}).catch(console.warn);
         
      });
   }

})();
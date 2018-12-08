"use strict";
(function () {
   window.onload = function() {
      var year = 1993;
      var url ="https://raw.githubusercontent.com/pathiratk/india-lights-analysis/master/2/" + year + ".json";
      $.getJSON(url, function(json) {
         var spec = {
            "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
            "mark": {
               "type": "bar",
               "point": true
             },
             "title": {
                "text": "Median of Monthly Light Outputs for the districts in India in " + year

             },
             "data": {
                "values": json
             },
             "encoding": {
               "x": {
                  "field": "quintine", 
                  "type": "nominal",
                  "axis": {
                     "title": "Quintine"
                  }
               },
               "y": {
                  "field": "vis_median", 
                  "type": "quantitative", 
                  "axis": {
                     "title": "Median of monthly light outputs"
                  }
               }
               // "color": {"field": "state", "type": "nominal"}
             }
         };

         vegaEmbed('#view', spec, {defaultStyle: true}).catch(console.warn);
         
      });
   }

})();
"use strict";
(function () {
   window.onload = function() {
      var year = 1993;
      var url ="https://raw.githubusercontent.com/pathiratk/india-lights-analysis/master/3/" + year + ".json";
      $.getJSON(url, function(json) {
         var spec = {
            "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
            "mark": {
               "type": "bar",
               "point": true
             },
             "title": {
                "text": "Percent change in Monthly Light Outputs between Capital Districts and the Other Districts " + year

             },
             "data": {
                "values": json
             },
             "encoding": {
               "x": {
                  "field": "state", 
                  "type": "nominal",
                  "axis": {
                     "title": "State"
                  }
               },
               "y": {
                  "field": "vis_median", 
                  "type": "quantitative", 
                  "aggregate":"median",
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
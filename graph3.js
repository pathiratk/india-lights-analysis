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
      var url ="https://raw.githubusercontent.com/pathiratk/india-lights-analysis/master/3/" + year + ".json";
      $.getJSON(url, function(json) {
         var spec = {
            "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
            "mark": {
               "type": "bar",
               "point": true
             },
             "title": {
                "text": "Difference in Monthly Light Outputs between the Capital Districts and the Other Districts in " + year

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
                  "field": "value", 
                  "type": "quantitative", 
                  "aggregate":"median",
                  "axis": {
                     "title": "Difference in monthly light outputs"
                  }
               }
               // "color": {"field": "state", "type": "nominal"}
             }
         };
         vegaEmbed('#view', spec, {defaultStyle: true}).catch(console.warn);
      });
   }
})();
"use strict";
(function () {
   window.onload = function() {
      var json = [];
      var url = "http://api.nightlights.io/months/1993.1-1993.12/states";
      $.get(url, function(data){
         for (var i = 0; i < data.length; i++) {
            json.push({
               state: data[i].key,
               month: data[i].month,
               vis_median: data[i].vis_median
            })
         }
         console.log(json);
      });
   }
})();
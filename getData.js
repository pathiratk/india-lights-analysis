"use strict";
(function () {
   window.onload = function() {
      var states = {
         "andhra-pradesh": "Andhra Pradesh",
         "assem": "Assam",
         "bihar": "Bihar",
         "chhattisgarh": "Chhattisgarh",
         "gujarat": "Gujarat",
         "haryana": "Haryana",
         "himachal-pradesh": "Himachal Pradesh",
         "jammu-&-kashmir": "Jammu and Kashmir",
         "jharkhand": "Jharkhand",
         "karnataka": "Karnataka",
         "kerala": "Kerala",
         "madhya-pradesh": "Madhya Pradesh",
         "maharashtra": "Maharashtra",
         "manipur": "Manipur",
         "meghalaya": "Meghalaya",
         "mizoram": "Mizoram",
         "nagaland": "Nagaland",
         "orissa": "Orissa",
         "punjab": "Punjab",
         "rajasthan": "Rajasthan",
         "sikkim": "Sikkim",
         "tamilnadu": "Tamilnadu",
         "tripula": "Tripura",
         "uttar-pradesh": "Uttar Pradesh",
         "uttarakhand": "Uttarakhand",
         "west-bengal": "West Bengal"
      }
      var json = [];
      var url = "http://api.nightlights.io/months/1993.1-1993.12/states";
      $.get(url, function(data){
         for (var i = 0; i < data.length; i++) {
            json.push({
               state: states[data[i].key],
               month: data[i].month,
               vis_median: data[i].vis_median
            })
         }
         console.log(json);
      });
   }
})();
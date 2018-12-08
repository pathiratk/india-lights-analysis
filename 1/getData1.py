import urllib2
import json
import operator
# from numpy import median

statesname = {"andhra-pradesh": "Andhra Pradesh",
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
         "west-bengal": "West Bengal",
         "delhi": "Delhi",
         "goa": "Goa",
         "assam": "Assam"
      }

for year in xrange(1993, 1994):
   states = []
   response = urllib2.urlopen('http://api.nightlights.io/months/' + str(year) + '.1-' + str(year) + '.12/states')
   data = json.load(response)
   for obj in data:
      if obj["key"] in statesname:
         state = {}
         state["state"] = statesname[str(obj["key"])]
         state["month"] = obj["month"]
         state["vis_median"] = float(obj["vis_median"])
         states.append(state)
   print states
      

   with open(str(year) + '.json', 'w') as f:
      json.dump(states, f)
import urllib2
import json
import operator
# from numpy import median

def median(lst):
   n = len(lst)
   if n < 1:
      return None
   if n % 2 == 1:
      return sorted(lst)[n//2]
   else:
      return sum(sorted(lst)[n//2-1:n//2+1])/2.0

def split(a, n):
    k, m = divmod(len(a), n)
    return (a[i * k + min(i, m):(i + 1) * k + min(i + 1, m)] for i in xrange(n))

states = ["andhra-pradesh",
         "assem",
         "bihar",
         "chhattisgarh",
         "gujarat",
         "haryana",
         "himachal-pradesh",
         "jammu-&-kashmir",
         "jharkhand",
         "karnataka",
         "kerala",
         "madhya-pradesh",
         "maharashtra",
         "manipur",
         "meghalaya",
         "mizoram",
         "nagaland",
         "orissa",
         "punjab",
         "rajasthan",
         "sikkim",
         "tamilnadu",
         "tripula",
         "uttar-pradesh",
         "uttarakhand",
         "west-bengal"]

for year in xrange(1993, 1994):
#2014)
   districts = []
   for state in states:
      district = {}
      response = urllib2.urlopen('http://api.nightlights.io/months/' + str(year) + '.1-' + str(year) + '.12/states/' + str(state) + '/districts')
      data = json.load(response)
      for obj in data:
         district.setdefault(obj["key"], []).append(float(obj["vis_median"]))
      for k,v in district.items():
         med = median(v)
         district[k] = med
         districts.append(med)
      # districts.update(district)
   districts.sort()
   quantiles = list(split(districts, 4))
   result = []
   for i in xrange(4):
      obj = {}
      obj["Quintile " + str(i + 1)] = median(quantiles[i])
      result.append(obj)
   print result
   # f = open(str(year) + ".json", "w")
   # f.write(result);
   with open(str(year) + '.json', 'w') as f:
    json.dump(result, f)
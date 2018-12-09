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
         "assam",
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
         "tripura",
         "uttar-pradesh",
         "uttarakhand",
         "west-bengal"]
statesname = {"andhra-pradesh": "Andhra Pradesh",
         "assam": "Assam",
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
         "tripura": "Tripura",
         "uttar-pradesh": "Uttar Pradesh",
         "uttarakhand": "Uttarakhand",
         "west-bengal": "West Bengal",
         "delhi": "Delhi",
         "goa": "Goa",
         "assam": "Assam"}
capitals = ["andhra-pradesh-rangareddy",
         "assam-nagaon",
         "bihar-patna",
         "chhattisgarh-raipur",
         "gujarat-gandhinagar",
         "haryana-faridabad",
         "himachal-pradesh-shimla",
         "jammu-&-kashmir-srinagar",
         "jharkhand-ranchi",
         "karnataka-bangalore",
         "kerala-thiruvananthapuram",
         "madhya-pradesh-bhopal",
         "maharashtra-thane",
         "manipur-imphal-west",
         "meghalaya-east-garo-hills",
         "mizoram-aizawl",
         "nagaland-kohima",
         "orissa-anugul",
         "punjab-ludhiana",
         "rajasthan-jaipur",
         "sikkim-east-district",
         "tamilnadu-kancheepuram",
         "tripura-west-tripura",
         "uttar-pradesh-lucknow",
         "uttarakhand-dehradun",
         "west-bengal-haora"]

def isCapital(d):
   if d in capitals:
      return True
   return False 
for year in xrange(1993, 1994):
   print year
   output = []
   for state in states:
      districts = {}
      response = urllib2.urlopen('http://api.nightlights.io/months/' + str(year) + '.1-' + str(year) + '.12/states/' + str(state) + '/districts')
      data = json.load(response)
      for obj in data:
         districts.setdefault(obj["key"], []).append(float(obj["count"]))
      noncapital = []
      capital = 0.0;
      for k,v in districts.items():
         med = median(v)
         if (isCapital(k)):
            capital = med
         else:
            noncapital.append(med)
      print 
      mnoncapital = median(noncapital)
      pchange = (capital - mnoncapital)/abs(mnoncapital) * 100.0
      obj = {}
      obj["state"] = statesname[state]
      obj["value"] = pchange
      output.append(obj)
   print output
   with open(str(year) + '.json', 'w') as f:
      json.dump(output, f, indent=3)
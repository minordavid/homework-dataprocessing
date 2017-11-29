import csv
import json

csvfile = open('Data.csv', 'r')
jsonfile = open('Beer.json', 'w')

fieldnames = ("Country","Liter")
reader = csv.DictReader( csvfile, fieldnames)
data = []
for row in reader:
    data.append(row)
json.dump(data, jsonfile)
jsonfile.write('\n')
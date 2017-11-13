import csv
import json

csvfile = open('Data.csv', 'r')
jsonfile = open('file.json', 'w')

fieldnames = ("Day","Rain")
reader = csv.DictReader( csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write('\n')
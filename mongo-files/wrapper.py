import time
from subprocess import call
import json

with open('localidades.geojson') as f:
    data = json.load(f)

local = data['features']
points = []
for l in local:
	points.append(l['geometry']['coordinates'])

start_time = time.time()
for point in points:
	call(["mongo","--quiet", "--eval", 'var long=' +str(point[0]) + ',lat=' + str(point[1]) + ';',"test.js"])
elapsed_time = time.time() - start_time
print(elapsed_time)
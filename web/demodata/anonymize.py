import csv; 
from random import shuffle;

newNames = [];
persons = [];

newPlaces = [];
oldPlaces = [];

oldRelations = [];
newRelations = [
	'Academic Work',
	'Friendship',
	'Politics',
	'Colleges',
	'Food'
]

# Extract new names
with open('scientists.csv', newline='') as csvfile:
	csvreader = csv.reader(csvfile, delimiter=',', quotechar='|')
	for row in csvreader:
		newNames.append(row[0]);

shuffle(newNames);

# Extract new names
with open('capitals.csv', newline='') as csvfile:
	csvreader = csv.reader(csvfile, delimiter=',', quotechar='"')
	for row in csvreader:
		newPlaces.append(row[1]);

shuffle(newPlaces);



# Extract old names
newlines = []
with open('marieboucher.csv', newline='') as csvfile:
	csvreader = csv.reader(csvfile, delimiter=',', quotechar='"')
	for row in csvreader:
		p1 = row[0];	
		p2 = row[3];	
		if not p1 in persons:
			persons.append(p1)	
		if not p2 in persons:
			persons.append(p2)	

		l1 = row[1];	
		l2 = row[4];	

		if not l1 in oldPlaces:
			oldPlaces.append(l1)	
		if not l2 in oldPlaces:
			oldPlaces.append(l2)	

		r = row[2].strip();
		if not r in oldRelations:
			oldRelations.append(r)	

		newline = [
			newNames[persons.index(p1)], 
			newPlaces[oldPlaces.index(l1)],
			newRelations[oldRelations.index(r)],
			newNames[persons.index(p2)], 
			newPlaces[oldPlaces.index(l2)],
			row[9]
			];
		newlines.append(newline);


with open('timmysmith.csv', 'w', newline='') as csvfile:
    spamwriter = csv.writer(csvfile, delimiter=',',
                            quotechar='"', quoting=csv.QUOTE_MINIMAL)
    spamwriter.writerow(['Name 1', 'Location 1', 'Relation Type', 'Name 2', 'Location 2', 'Date']);
    for line in newlines:
   		spamwriter.writerow(line);


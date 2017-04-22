#python 3.5
import codecs
import os
from os import listdir

cwd = os.getcwd()

PATHS = [cwd+'/', cwd +'/sites/']
SERVER_VARIABLE_OLD = 'https://networkcube.github.io/'
SERVER_VARIABLE_NEW = 'http://localhost/~bbach/networkcube-all-public/'

files = []
for PATH in PATHS:	
	for file in listdir(PATH):
		if(file.endswith('.html')):	
			print('Modify file" ', (PATH + file))
			f = codecs.open(PATH + file, 'r')
			content = str(f.read());
			f.close();
			f = codecs.open(PATH + file, 'w')
			# print(content)
			f.write(content.replace(SERVER_VARIABLE_OLD, SERVER_VARIABLE_NEW))
			# print(content.replace(SERVER_VARIABLE_OLD, SERVER_VARIABLE_NEW))
			f.close();
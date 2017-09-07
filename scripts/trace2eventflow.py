#!/bin/env python
import csv
from datetime import datetime
import time, sys

def filter_row(row):
    return 'whatever' in row

def trace2eventflow(filename):
    with open(filename, 'rb') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if filter_row(row):
                continue
            t = datetime.utcfromtimestamp(float(row['ts'])/1000.0)
            row['date'] = t.strftime("%Y-%m-%d %H:%M:%S")
            print "{user}\t{date}\t{action}".format(**row)

trace2eventflow(sys.argv[1])
            

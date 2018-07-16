import sys
import getopt
import json
import psutil
import requests
import os
from datetime import date, datetime, timedelta

racknum = '000003'
local = 'http://192.168.0.104:3000'
online = "http://smartrackmonitor.herokuapp.com"
used_server = local

today = datetime.today()
subjectDate = today.strftime('%Y-%m-%dT%H:%M')


def get_cpu_percent():
    return psutil.cpu_percent(interval=1, percpu=False)


def num_cameras():
    cams = os.popen("ls /dev/video*").read()
    if 'cannot access' not in cams:
        num = cams.split('\n')
        return len(num) - 1
    else:
        return 0


def get_ram_percent():
    ram = psutil.virtual_memory()
    ram_percent_used = ram.percent
    return ram_percent_used


def main(argv):
    temp = "temp=0'C"
    try:
        opts, args = getopt.getopt(argv, "t:")
    except getopt.GetoptError:
        usage()
        sys.exit(2)
    if opts is None:
        usage()
        sys.exit(2)
    for opt, arg in opts:
        if opt == '-t':
            temp = arg
    if temp == '':
        usage()
        sys.exit(2)
    temp = temp.replace("temp=", "")
    temp = temp.replace("'C", "")
    cpu_per = get_cpu_percent()
    ram_per = get_ram_percent()
    cams = num_cameras()
    print(cpu_per)
    print(ram_per)
    print(temp)
    print(num_cameras())
    url = used_server + "/monitor/api/" + racknum
    data = {'date_recorded': subjectDate,
            'temperature': temp,
            'cpu': cpu_per,
            'ram': ram_per,
            'cameras': cams,
            'voltage': 0,
            'ampere': 0}
    r = requests.post(url, data)
    print(r.text)


def usage():
    print("python monitor.py -t 24.6 ")
    print("  -t 24.6 : Temperature")


# call main function
if __name__ == "__main__":
    main(sys.argv[1:])

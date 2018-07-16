temp=$(vcgencmd measure_temp)
python monitor.py -t ${temp}
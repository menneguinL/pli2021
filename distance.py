import RPi.GPIO as GPIO
import time
import os
import threading
import requests
from serial import Serial

class Sound(threading.Thread):
    def __init__(self, distance):
        threading.Thread.__init__(self)
        self.distance = distance

    def run(self):
        self.play(self.distance)

    def play(self, distance):
        pas = int(distance / 70) + 1
        sound_device = "B0:18:6F:01:AD:35"                    # Loic's bluetooth
        sound_device2 = "94:F6:D6:F3:03:4A"
        if (pas == 1):
            os.system("aplay -D bluealsa:DEV=" + sound_device2 + " audios/1.wav")
        elif (pas == 2):
            os.system("aplay -D bluealsa:DEV=" + sound_device2 + " audios/2.wav")
        elif (pas == 3):
            os.system("aplay -D bluealsa:DEV=" + sound_device2 + " audios/3.wav")
        elif (pas == 4):
            os.system("aplay -D bluealsa:DEV=" + sound_device2 + " audios/4.wav")
        elif (pas == 5):
            os.system("aplay -D bluealsa:DEV=" + sound_device2 + " audios/5.wav")

class GPS(threading.Thread):
    def __init__(self, ser):
        threading.Thread.__init__(self)
        self.ser = ser

    def run(self):
        print("gps thread started")
        data = ""
        tst = b"AT+CGNSTST=1\r\n"
        self.ser.write(tst)
        while(True):
            data = self.wait(self.ser)
            print(data)
            time.sleep(0.5)
            r = requests.get("http://a9a1-46-193-1-93.ngrok.io/api/users/setPosition/1?data=" + data)



    def wait(self, ser):
        data = ""
        while ser.inWaiting() > 0:
            data += (ser.read(ser.inWaiting())).decode("utf-8")
        return data



GPIO.setmode(GPIO.BCM)

print("Mesure de distance avec le capteur à ultrasons")

Trig = 23
Echo = 24

GPIO.setwarnings(False)
GPIO.setup(Trig,GPIO.OUT)
GPIO.setup(Echo,GPIO.IN)

GPIO.output(Trig, False)

print("Start gps init")

ser = Serial("/dev/ttyUSB0", 115200)

powerOFF = b"AT+CGNSPWR=0\r\n"
powerON = b"AT+CGNSPWR=1\r\n"
seq = b"AT+CGNSSEQ=\"RMC\"\r\n"
info = b"AT+CGNSINF\r\n"
urc = b"AT+CGNSURC=2\r\n"

ser.write(powerOFF)
time.sleep(0.5)
ser.write(powerON)
time.sleep(0.5)
ser.flushInput()
time.sleep(0.5)

ser.write(seq)
time.sleep(0.5)

ser.write(info)
time.sleep(0.5)

ser.write(urc)
time.sleep(0.5)

print("end gps init")

gps = GPS(ser)
gps.start()


inUse = True

while (inUse):
	try:
		time.sleep(5)				# Une fois toutes les 5 secondes

		GPIO.output(Trig, True)
		time.sleep(0.00001)
		GPIO.output(Trig, False)

		send = time.time()
		while (GPIO.input(Echo) == 0):		# Envoi de l'impulsion
			send = time.time()

		while (GPIO.input(Echo) == 1):		# Reception de l'echo
			receive = time.time()

		timeBetween = receive - send
		distance = timeBetween * 34000
		distance = distance / 2
		print("La distance calculée est de : ", round(distance, 1), " cm.")
		if (round(distance, 1) < 300):
			thread = Sound(distance)
			thread.start()
	except (KeyboardInterrupt, SystemExit):
		print("\n\nProcessus interrompu par l'utilisateur")
		break

GPIO.cleanup()
ser.close()

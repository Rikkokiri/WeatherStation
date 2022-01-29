## Working with board & sensor code

- Install Arduino IDE
- Install Python
- Install [ESP8266 hardware package](https://github.com/esp8266/Arduino)
- Select Lolin R1 Mini Lite (in IDE menu `Tools -> Board:xxx`)
- Set upload speed to 57600 (`Tools -> Upload Speed:xxx`) as ESP8266 does not reliably support higher upload speeds
- Via Arduino IDE's library manager install following packages:
  - ArduinoJson (make sure to pick version 5.x.x as v6 is incompatible with current code)
  - Adafruit BME280 (for working with the sensor)
  - WifiLocation package
- Compile and upload code to the board. It should run automatically
- When viewing logs, make sure to set log window baud rate to 57600

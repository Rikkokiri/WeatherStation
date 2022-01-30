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

Additionally, file config.h should be placed in `/sensor` directory with the following content

```
#define APIKEY [API key for Google Maps api]
#define SSID [name of wifi]
#define WIFI_PASSWD
#define MOBILE_SSID [alternative wifi name]
#define MOBILE_WIFI_PASSWD [wifi password]
#define LONGITUDE
#define LATITUDE
#define IP "https://sulpro-weather-station.herokuapp.com/api/newreading"
```

`LONGITUDE` and `LATITUDE` are coordinates for a default location that will be used to query weather data if sensor cannot retrieve location from Maps API.

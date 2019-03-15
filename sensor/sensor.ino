// Weather Station project
// Rajala, 2019

#include <Arduino.h>
#include <ArduinoJson.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <Wire.h>
#include <Adafruit_BME280.h>
#include <WifiLocation.h>

#include "config.h"

#define I2C_ADDR 0x76 // define the sensor i2c address
#define NAME "YokkilaSensor"

WifiLocation location(APIKEY);

ESP8266WiFiMulti WiFiMulti;

Adafruit_BME280 bme;                      // Initialize sensor
const int capacity = JSON_OBJECT_SIZE(4); // Initialize JSON document

void setup()
{
  Serial.begin(57600);

  Wire.begin();
  if (!bme.begin(I2C_ADDR))
  {
    Serial.println("Error: sensor not found");
  }

  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP(SSID, WIFI_PASSWD);
}

void loop()
{
  // JSON buffer
  StaticJsonBuffer<capacity> jsonbuffer;
  JsonObject &data = jsonbuffer.createObject();
  char JSONmsgBuffer[128];

  // Get sensor readings
  data["name"] = NAME;
  data["temperature"] = bme.readTemperature();
  data["pressure"] = bme.readPressure();
  data["humidity"] = bme.readHumidity();

  data.printTo(JSONmsgBuffer);
  data.prettyPrintTo(Serial);
  Serial.println();

  if (WiFiMulti.run() == WL_CONNECTED)
  {

    location_t loc = location.getGeoFromWiFi();

    Serial.println("Location request data");
    Serial.println(location.getSurroundingWiFiJson());
    Serial.println("Latitude: " + String(loc.lat, 7));
    Serial.println("Longitude: " + String(loc.lon, 7));
    Serial.println("Accuracy: " + String(loc.accuracy));

    HTTPClient http;

    Serial.println("Begin HTTP");
    http.begin(IP);

    http.addHeader("Content-Type", "application/json");
    int httpcode = http.POST(JSONmsgBuffer);

    if (httpcode == HTTP_CODE_OK)
    {
      Serial.println("POST request successful");
    }
    else
    {
      Serial.println("POST request failed");
      Serial.println(httpcode);
    }

    http.end();
  }
  else
  {
    Serial.println("Failed to connect to wifi");
  }

  delay(10000);
}

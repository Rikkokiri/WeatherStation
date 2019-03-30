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
#define NAME "Bedroom"

WifiLocation location(APIKEY);

ESP8266WiFiMulti WiFiMulti;

Adafruit_BME280 bme;                      // Initialize sensor
const int capacity = JSON_OBJECT_SIZE(7); // Initialize JSON document

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
  char JSONmsgBuffer[224];

  // Get sensor readings
  data["name"] = NAME;
  data["temperature"] = bme.readTemperature();
  data["pressure"] = bme.readPressure();
  data["humidity"] = bme.readHumidity();

  data.prettyPrintTo(Serial);
  Serial.println();

  if (WiFiMulti.run() != WL_CONNECTED) {
    reconnect();
  }
  else {

    location_t loc = location.getGeoFromWiFi();

    Serial.println("Location request data");
    Serial.println(location.getSurroundingWiFiJson());
    Serial.println("Latitude: " + String(loc.lat, 7));
    Serial.println("Longitude: " + String(loc.lon, 7));
    Serial.println("Accuracy: " + String(loc.accuracy));

    if (loc.lat != 0 && loc.lon != 0)
    {
      Serial.println("Location found!");

      String latitudeString = String(loc.lat, 7);
      char latBuffer[latitudeString.length() + 1];
      latitudeString.toCharArray(latBuffer, latitudeString.length() + 1);

      data.set("latitude", latBuffer);

      String longitudeString = String(loc.lon, 7);
      char lonBuffer[longitudeString.length() + 1];
      longitudeString.toCharArray(lonBuffer, longitudeString.length() + 1);
      data.set("longitude", lonBuffer);
    }
    else
    {
      Serial.println("Location not found. Using default location.");

      data["longitude"] = LONGITUDE;
      data["latitude"] = LATITUDE;
    }

    data.printTo(JSONmsgBuffer);

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
  
  delay(600000);
}

void reconnect() {
  Serial.println("Reconnecting");
  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP(SSID, WIFI_PASSWD);

  while(WiFiMulti.run() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected!");
}



#include <ESP8266WiFi.h>
#include <MQTTClient.h>
#include <ArduinoJson.h>
#include <DHT.h>

#define LED_PIN D2 // The ESP8266 pin D5 connected to resistor
#define FAN_PIN D3
#define AC_PIN D4
#define DHT_SENSOR_PIN  D7 // The ESP8266 pin D7 connected to DHT11 sensor
#define DHT_SENSOR_TYPE DHT11
#define LIGHT_SENSOR_PIN A0

#define SUBSCRIBE_TOPIC "esp8266-001/receive"

DHT dht_sensor(DHT_SENSOR_PIN, DHT_SENSOR_TYPE);


const char WIFI_SSID[] = "TP-LINK_799568";     // CHANGE TO YOUR WIFI SSID
const char WIFI_PASSWORD[] = "99990000";  // CHANGE TO YOUR WIFI PASSWORD

const char MQTT_BROKER_ADRRESS[] = "192.168.5.105";  // CHANGE TO MQTT BROKER'S ADDRESS
const int MQTT_PORT = 1883;
const char MQTT_CLIENT_ID[] = "dvh";  // CHANGE IT AS YOU DESIRE
const char MQTT_USERNAME[] = "hoang";                        // CHANGE IT IF REQUIRED, empty if not required
const char MQTT_PASSWORD[] = "b21dccn384";                        // CHANGE IT IF REQUIRED, empty if not required

// The MQTT topics that ESP8266 should publish/subscribe
const char PUBLISH_TOPIC[] = "datasensor";    // CHANGE IT AS YOU DESIRE

const int PUBLISH_INTERVAL = 2000;  // 5 seconds

WiFiClient network;
MQTTClient mqtt = MQTTClient(256);

unsigned long lastPublishTime = 0;

void setup() {
  Serial.begin(9600);

  pinMode(LED_PIN, OUTPUT);
  pinMode(FAN_PIN, OUTPUT);
  pinMode(AC_PIN, OUTPUT);
  dht_sensor.begin();

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.println("ESP8266 - Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());

  connectToMQTT();
}

void loop() {
  mqtt.loop();

  if (millis() - lastPublishTime > PUBLISH_INTERVAL) {
    sendToMQTT();
    lastPublishTime = millis();
  }
  // delay(3231213231);
}

void connectToMQTT() {
  // Connect to the MQTT broker
  mqtt.begin(MQTT_BROKER_ADRRESS, MQTT_PORT, network);

  // Create a handler for incoming messages
  mqtt.onMessage(messageHandler);

  Serial.print("ESP8266 - Connecting to MQTT broker");

  while (!mqtt.connect(MQTT_CLIENT_ID, MQTT_USERNAME, MQTT_PASSWORD)) {
    Serial.print(".");
    delay(100);
  }
  Serial.println();

  if (!mqtt.connected()) {
    Serial.println("ESP8266 - MQTT broker Timeout!");
    return;
  }

  // Subscribe to a topic, the incoming messages are processed by messageHandler() function
  if (mqtt.subscribe(SUBSCRIBE_TOPIC))
    Serial.print("ESP8266 - Subscribed to the topic: ");
  else
    Serial.print("ESP8266 - Failed to subscribe to the topic: ");

  Serial.println(SUBSCRIBE_TOPIC);
  if (mqtt.subscribe("led/req"))
    Serial.println("ESP8266 - Subscribed to the topic: led/req");
  else
    Serial.println("ESP8266 - Failed to subscribe to the topic: led/req");
  if (mqtt.subscribe("fan/req"))
    Serial.println("ESP8266 - Subscribed to the topic: fan/req");
  else
    Serial.println("ESP8266 - Failed to subscribe to the topic: fan/req");
  if (mqtt.subscribe("ac/req"))
    Serial.println("ESP8266 - Subscribed to the topic: ac/req");
  else
    Serial.println("ESP8266 - Failed to subscribe to the topic: ac/req");
  Serial.println("ESP8266 - MQTT broker Connected!");
}

void sendToMQTT() {
  StaticJsonDocument<200> message;

  message["light"] =  analogRead(LIGHT_SENSOR_PIN);;  // Or you can read data from other sensors
  message["humidity"]= dht_sensor.readHumidity();
  message["temperature"] =dht_sensor.readTemperature();
  char messageBuffer[512];
  serializeJson(message, messageBuffer);

  mqtt.publish(PUBLISH_TOPIC, messageBuffer);

  Serial.println("ESP8266 - sent to MQTT:");
  Serial.print("- topic: ");
  Serial.println(PUBLISH_TOPIC);
  Serial.print("- payload:");
  Serial.println(messageBuffer);
}

void messageHandler(String &topic, String &payload) {
  Serial.println("ESP8266 - received from MQTT:");
  Serial.println("- topic: " + topic);
  Serial.print("- payload:");
  Serial.print(payload);
  if(topic == "led/req"){
    handlerLed(payload);
  }
   if(topic == "fan/req"){
    handlerFan(payload);
  }
   if(topic == "ac/req"){
    handlerAc(payload);
  }
}


//ham xu li message control led, fan ,ac khi backend send 
void handlerLed(String payload){
  if( payload == "on"){
    digitalWrite(LED_PIN,HIGH);
  }
  if( payload == "off"){
    digitalWrite(LED_PIN,LOW);
  }
  StaticJsonDocument<200> message;
  message["action"] = payload;
  char messageBuffer[512];
  serializeJson(message,messageBuffer);
  mqtt.publish("led/res", messageBuffer);

  //in ra monitol 
  Serial.println("ESP8266 - sent to MQTT:");
  Serial.print("- topic: ");
  Serial.println("led/res");
  Serial.print("- payload:");
  Serial.println(messageBuffer);

}
void handlerFan(String &payload){
  if( payload == "on"){
    digitalWrite(FAN_PIN,HIGH);
  }
  if( payload == "off"){
    digitalWrite(FAN_PIN,LOW);
  }
  StaticJsonDocument<200> message;
  message["action"] = payload;
  char messageBuffer[512];
  serializeJson(message,messageBuffer);
  mqtt.publish("fan/res", messageBuffer);

  //in ra monitol 
  Serial.println("ESP8266 - sent to MQTT:");
  Serial.print("- topic: ");
  Serial.println("fan/res");
  Serial.print("- payload:");
  Serial.println(messageBuffer);
}
void handlerAc(String &payload){
  if( payload == "on"){
    digitalWrite(AC_PIN,HIGH);
  }
  if( payload == "off"){
    digitalWrite(AC_PIN,LOW);
  }
  StaticJsonDocument<200> message;
  message["action"] = payload;
  char messageBuffer[512];
  serializeJson(message,messageBuffer);
  mqtt.publish("ac/res", messageBuffer);

  //in ra monitol 
  Serial.println("ESP8266 - sent to MQTT:");
  Serial.print("- topic: ");
  Serial.println("ac/res");
  Serial.print("- payload:");
  Serial.println(messageBuffer);
}


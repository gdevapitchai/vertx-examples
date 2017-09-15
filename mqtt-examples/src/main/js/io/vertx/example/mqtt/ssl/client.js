var MqttClient = require("vertx-mqtt-server-js/mqtt_client");
var Buffer = require("vertx-js/buffer");
var MQTT_MESSAGE = "Hello Vert.x MQTT Client";
var BROKER_HOST = "localhost";
var BROKER_PORT = 8883;
var MQTT_TOPIC = "/my_topic";
var options = {
};
options.port = BROKER_PORT;
options.host = BROKER_HOST;
options.ssl = true;
options.trustAll = true;

var mqttClient = MqttClient.create(vertx, options);

mqttClient.connect(function (ch, ch_err) {
  if (ch_err == null) {
    console.log("Connected to a server");

    mqttClient.publish(MQTT_TOPIC, Buffer.buffer(MQTT_MESSAGE), 'AT_MOST_ONCE', false, false, function (s, s_err) {
      mqttClient.disconnect(function (d, d_err) {
        console.log("Disconnected from server");
      });
    });
  } else {
    console.log("Failed to connect to a server");
    console.log(ch_err);
  }
});
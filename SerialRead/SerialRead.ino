/*
 *  Serial Read - Reading serial data and setting analog pin to value
 *
 *  @author Gareth Foote
 */

const int ledPin = 9;
 
void setup() {
  Serial.begin(9600);
  Serial.setTimeout(10);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  // Check if serial port is being sent data
  if(Serial.available() > 0){
    // Convert to an integer (int)
    char input = Serial.parseInt();
    analogWrite(ledPin, input);
  }
}

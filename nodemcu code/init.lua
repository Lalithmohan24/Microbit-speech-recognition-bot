wifi.setmode(wifi.STATION)
--wifi.sta.config("23776711","maru@1987") -- Replace with your AP Name and security key.
wifi.sta.config("TS_REDMI_5A","password") -- Replace with your AP Name and security key.
wifi.sta.connect()
tmr.alarm(1, 1000, 1, function() 
if wifi.sta.getip()== nil then 
print("Obtaining IP...") 
else 
tmr.stop(1)
print("Got IP. "..wifi.sta.getip())
end 
end)

-- IFTTT server for ESP8266 -- Receive commands from webhooks and integrate you project to any IFTTT service or device. 
-- Jan 2019 Created by Nikos Georgousis

cmdString="webhooks" --This is an identifier, it acts as a simple filter/"prehistoric password" to avoid attacks

gpio.mode(3, gpio.OUTPUT);
gpio.mode(4, gpio.OUTPUT);
gpio.mode(5, gpio.OUTPUT);

function decide(what) --Here we decide for the commands (this fucntion is called from web server)
    print("Got "..what)
    if what =="forward" then --We expect one of three different keywords (spaced are removed)
      pwm.setduty(Pin, 1)
        gpio.write(3, gpio.LOW);
        gpio.write(4, gpio.LOW);
        gpio.write(5, gpio.HIGH);
        print ("forward..")
        -- Something to turn on 
    elseif what =="backward" then 
        gpio.write(3, gpio.LOW);
        gpio.write(4, gpio.HIGH);
        gpio.write(5, gpio.LOW);  
        print ("backward..")
    elseif what =="turnleft"  then 
        gpio.write(3, gpio.LOW);
        gpio.write(4, gpio.HIGH);
        gpio.write(5, gpio.HIGH);  
        print ("turnleft..")
    elseif what =="turnright"  then 
        gpio.write(3, gpio.HIGH);
        gpio.write(4, gpio.LOW);
        gpio.write(5, gpio.LOW);  
        print ("turnright..")
    elseif what =="stop"  then 
        gpio.write(3, gpio.LOW);
        gpio.write(4, gpio.LOW);
        gpio.write(5, gpio.LOW);  
        print ("stop..")
    elseif what =="happy"  then 
        gpio.write(3, gpio.HIGH);
        gpio.write(4, gpio.HIGH);
        gpio.write(5, gpio.HIGH);  
        print ("happy..")
    elseif what =="sad"  then 
        gpio.write(3, gpio.HIGH);
        gpio.write(4, gpio.LOW);
        gpio.write(5, gpio.HIGH);  
        print ("sad..")
    elseif what =="nothing"  then 
        gpio.write(3, gpio.HIGH);
        gpio.write(4, gpio.HIGH);
        gpio.write(5, gpio.LOW);  
        print ("nothing..")
    else
        print ("No matching command")
        -- You can add as many commands you like
    end 
end

server = net.createServer(net.TCP) --Create TCP server
function receiver(sck, data) --Process callback on recive data from client
    if data ~=nil then
        substr=string.sub(data,string.find(data,"GET /")+5,string.find(data,"HTTP/")-1) --Filter out on the part needed fro our application
        if substr ~= nil then
            if string.find(substr,'favicon.ico') then --Acting as filter
                --print("This is the favicon return! don't use it "..substr)
            else
                substr=string.lower(substr) --Set the string lower case to check it against
                if string.find(substr,cmdString) then
                    if substr~=nil then
                        substr=string.sub(substr,string.find(substr,":")+1,string.find(substr,":")+20) --Keep only the text part after the colon
                        substr=string.gsub(substr," ","",5)  --Replace all (5) spaces       
                        decide(substr)
                    end
                end 
            end 
        end
    end 
   sck:send("HTTP/1.0 200 OK\r\nContent-Type: text/html\r\n\r\n".."Detected: "..substr) --This is a simple web page response to be able to test it from any web browser 
   sck:on("sent", function(conn) conn:close() end)
end

if server then
  server:listen(8077, function(conn) --Listen to the port 8077
  conn:on("receive", receiver)
  end)
end
    
print ("Statup complete")


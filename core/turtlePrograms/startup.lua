shell.run("pastebin", "get", "4nRg9CHU", "json");
os.loadAPI("json")
local name = os.getComputerID()
local fuelLevel = turtle.getFuelLevel()
local ws,err = http.websocket("ws://localhost:8081?uid=0" .. name .. "&fuelLevel=" .. fuelLevel)
if ws then
    local counter = 1
    while (true)
    do  
        print(counter)
        counter = counter + 1
        local msg = ws.receive()
        local object = json.decode(msg)
        local func = loadstring(object["rfc"])
        local res,data = func()
        res = tostring(res)
        if data then
            ws.send({res, data}, false)
        else
            ws.send({res}, false)
        end
    end
else
    print("no Websocket found")
end
  
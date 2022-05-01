os.loadAPI("json")
local ws,err = http.websocket("ws://localhost:8081")
if ws then
    while (true)
    do
        local msg = ws.receive()
        local object = json.decode(msg)
        local func = loadstring(object["peter"])
        local res,data = func{}
        if data then
            ws.send(data, false)
            end
    end
else
    print("no ws")
end
print(ws)
print(err)    
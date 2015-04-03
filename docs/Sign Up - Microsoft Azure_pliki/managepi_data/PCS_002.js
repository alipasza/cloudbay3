function CreateBaseContent(latency, callerName) {
    var entryUrl = document.location;
    var PCSEvent =
        {
            content: {
                "Ms.Qos.IncomingServiceRequest": {
                    "operationName": callerName,
                    "targetUri": entryUrl["href"],
                    "latencyMs": latency,
                    "serviceErrorCode": 200,
                    "succeeded": true,
                    "requestMethod": "GET",
                    "responseContentType": "JSON",
                    "protocol": entryUrl["protocol"],
                    "protocolStatusCode": "",
                    "operationVersion": "PCSv2",
                    "callerIpAddress": "",
                    "callerName": window.navigator.oscpu
                } 
            }
        };

    return PCSEvent;
}

function CreateEventContent(eventObject, eventName, eventCode, sessionGuid) {
    eventObject.SessionGuid = sessionGuid;
    eventObject.EventName = eventName;
    eventObject.EventCode = eventCode;
    eventObject.BrowserString = window.navigator.userAgent;
}

function CreatePageLoadContent(eventObject, eventCode, sessionGuid) {
    eventObject.SessionGuid = sessionGuid;
    eventObject.EventCode = eventCode;
    eventObject.BrowserString = window.navigator.userAgent;
}

function CreateErrorContent(errorObject, errorCode, sessionGuid) {
    errorObject.SessionGuid = sessionGuid;
    errorObject.ErrorCode = errorCode;
    errorObject.BrowserString = window.navigator.userAgent;
}

function GetEventPrefix() {
    var prefix = "Microsoft.Commerce.PCS.";
    var hostUrl = window.location["host"];
 
    if (hostUrl.indexOf("int") > -1) {
        prefix += "Int";
    }
    else {
        prefix += "Prod";
    }

    return prefix;
}

function SendEvent(latency, callerName, eventName, eventCode, sessionGuid) {
    var thisEvent = CreateBaseContent(latency, callerName);

    if (eventName.toLowerCase() == "error") {
        thisEvent.name = GetEventPrefix() + ".Error";
        eventContent = {};
        CreateErrorContent(eventContent, eventCode, sessionGuid);
        thisEvent.content[thisEvent.name] = eventContent;
        
        window.Asimov.writeEvent(thisEvent);
    }
    else if (eventName.toLowerCase() == "pageload") {
        thisEvent.name = GetEventPrefix() + ".PageLoad";
        eventContent = {};
        CreatePageLoadContent(eventContent, eventCode, sessionGuid);
        thisEvent.content[thisEvent.name] = eventContent;

        window.Asimov.writeEvent(thisEvent);
    }
    else {
        thisEvent.name = GetEventPrefix() + ".Event";
        eventContent = {};
        CreateEventContent(eventContent, eventName, eventCode, sessionGuid);
        thisEvent.content[thisEvent.name] = eventContent;

        window.Asimov.writeEvent(thisEvent);
    }
}

var beginPageLoadTime = (new Date()).getTime();
function LogEvent(callerName, eventName, eventCode, sessionGuid) {
    var end = (new Date()).getTime();
    var elapsed = end - beginPageLoadTime;
    if (isCORsReady()) {
        SendEvent(elapsed, callerName, eventName, eventCode, sessionGuid);
    }
}

function isCORsReady() {
    return 'withCredentials' in new XMLHttpRequest();
}
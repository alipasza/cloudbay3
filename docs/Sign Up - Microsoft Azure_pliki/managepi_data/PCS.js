/// <reference path="jquery-1.11.1.js" />

// -----------------------------------------------------------------------
//  <copyright file="JsllBase.js" company="Microsoft">
//      Copyright (c) Microsoft. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

(function ()
{
    // Contains the registered schemas.
    var _schemas = [];

    var self = this;

    this.Asimov = this.Asimov || {};

    this.Asimov.uploadUrl = "https://vortex.data.microsoft.com/collect/v1";
    this.Asimov.correlationVectorTag = "cV";
    this.Asimov.correlationVectorHeader = "MS-CV";

    var maxCorrelationVectorLength = 63;
    var base64CharSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    var seedCorrelationVector = function ()
    {
        /// <summary>
        /// Seed function to randomly generate a 16 character base64 encoded string for the Correlation Vector's base value
        /// </summary>
        /// <returns type="string">Returns generated base value</returns>

        var result = '';

        for (var i = 0; i < 16; i++)
        {
            result += base64CharSet.charAt(Math.floor(Math.random() * base64CharSet.length));
        }
        
        return result;
    };

    this.Asimov.CorrelationVector = function ()
    {
        /// <summary>
        /// Constructor for Correlation Vector objects
        /// </summary>

        var base = seedCorrelationVector();
        var currentElement = 0;

        var canExtend = function (ref)
        {
            /// <summary>
            /// Private method to check if the Correlation Vector can be extended
            /// </summary>
            /// <param name="ref" type="reference">Object reference to the Correlation Vector</param>
            /// <returns type="boolean">True if the Correlation Vector can be extended, false otherwise.</returns>

            if ((ref.getValue().length + 2) <= maxCorrelationVectorLength)
            {
                return true;
            }
            else
            {
                return false;
            }
        };

        var canIncrement = function ()
        {
            /// <summary>
            /// Private method to check if the Correlation Vector can be incremented
            /// </summary>
            /// <returns type="boolean">True if the Correlation Vector can be incremented, false otherwise.</returns>

            if ((base.length + 1 + ((currentElement + 1) + "").length) <= maxCorrelationVectorLength)
            {
                return true;
            }
            else
            {
                return false;
            }
        };

        this.getValue = function ()
        {
            /// <summary>
            /// Privileged method to serialize the current value of the Correlation Vector
            /// </summary>
            /// <returns type="string">Serialized value of the Correlation Vector</returns>

            return base.concat(".", currentElement);
        };

        this.setValue = function (cv)
        {
            /// <summary>
            /// Privileged method to de-serialize and set the current value of the Correlation Vector 
            /// from a serialized CV string
            /// </summary>
            /// <returns type="string">Serialized value of the updated Correlation Vector</returns>

            if (Asimov.CorrelationVector.isValid(cv))
            {
                var lastIndex = cv.lastIndexOf(".");
                base = cv.substr(0, lastIndex);
                currentElement = parseInt(cv.substr(lastIndex + 1), 10);
            }
            else
            {
                throw "Cannot set invalid correlation vector value";
            }

            return base.concat(".", currentElement);
        };

        this.extend = function ()
        {
            /// <summary>
            /// Privileged method to extend the current value of the Correlation Vector
            /// </summary>
            /// <returns type="string">Serialized value of the extended Correlation Vector</returns>

            if (canExtend(this))
            {
                base = base.concat(".", currentElement);
                currentElement = 0;
            }

            return this.getValue();
        };

        this.increment = function ()
        {
            /// <summary>
            /// Privileged method to increment the current value of the Correlation Vector
            /// </summary>
            /// <returns type="string">Serialized value of the incremented Correlation Vector</returns>

            if (canIncrement())
            {
                currentElement = currentElement + 1;
            }

            return this.getValue();
        };
    }

    var validationPattern = new RegExp("^[" + base64CharSet + "]{16}(.[0-9]+)+$");
    this.Asimov.CorrelationVector.isValid = function (cv)
    {
        /// <summary>
        /// Public Correlation Vector method to check for valid serialized Correlation Vector values
        /// </summary>
        /// <param name="cv" type="string">The Correlation Vector string to be validated</param>
        /// <returns type="boolean">True if the input string represents a valid serialized Correlation Vector, false otherwise.</returns>

        return validationPattern.test(cv) && cv.length <= maxCorrelationVectorLength;
    }

    // Default Correlation Vector object used for auto-population
    this.Asimov.cv = new this.Asimov.CorrelationVector();

    var canWriteEvents = function ()
    {
        /// <summary>
        /// Verifies whether or not we have everything we need to write events.  If we do we return true.  In the
        /// case that we do not, we return false.
        /// </summary>
        /// <returns type="boolean">True if we can write events, false otherwise.</returns>

        if (!self.jQuery)
        {
            logError("Unable to write event: jQuery is not present");
            return false;
        }

        if (!self.JSON || !self.JSON.stringify)
        {
            logError("Unable to write event: the global JSON.stringify method does not exist");
            return false;
        }

        return true;
    };

    var xhrFailureCallback = function (jqXHR, textStatus, errorThrown)
    {
        /// <summary>
        /// A failure callback for jQuery request callbacks which outputs the result to the console.
        /// </summary>
        /// <param name="jqXHR" type="Object">The jQuery XHR object for the request.</param>
        /// <param name="textStatus" type="String">The status of the response.</param>
        /// <param name="errorThrown" type="Object">The error thrown.</param>

        logError("Failure sending data to vortex: " + textStatus);
    };

    var xhrSuccessCallback = function (data, textStatus, jqXHR)
    {
        /// <summary>
        /// A failure callback for jQuery request callbacks which outputs the result to the console.
        /// </summary>
        /// <param name="textStatus" type="String">The status of the response.</param>
        /// <param name="jqXHR" type="Object">The jQuery XHR object for the request.</param>
        /// <param name="errorThrown" type="Object">The error thrown.</param>

        if (self.console && self.console.log)
        {
            //self.console.log("JSLL: Success sending data to vortex: " + textStatus);
        }
    };

    var logError = function (message)
    {
        /// <summary>
        /// Logs the given message to the console as an error.
        /// </summary>
        /// <param name="message" type="String">The message to log.</param>

        if (self.console && self.console.error)
        {
            self.console.error("JSLL: " + message);
        }
    };

    var isOfCorrectType = function (type, value)
    {
        /// <summary>
        /// Given a type and a value, verifies whether the value is of the specified type.  As per
        /// the CS 2.0 spec, dates are treated like strings.
        /// </summary>
        /// <param name="type" type="string">The expected bond type of the value.</param>
        /// <param name="value">The value to verify.</param>
        /// <returns type="boolean">True if value is of the specified type, false otherwise.</returns>

        // Note: if we are using jQuery 1.4.3+ we can change this to use jQuery.type() to verify the object type
        // instead of this custom logic.  We should think about making that a requirement moving forward.
        if (type == "string")
        {
            return (typeof value == "string") || (value instanceof String) || (value instanceof Date);
        }
        else if (type == "bool")
        {
            return (typeof value == "boolean") || (value instanceof Boolean);
        }
        else
        {
            if (!(typeof value == "number") || (value instanceof Number))
            {
                return false;
            }

            if (type == "uint8")
            {
                if (value < 0 || value > 255 || (value % 1 != 0))
                {
                    return false;
                }
            }
            else if (type == "uint16")
            {
                if (value < 0 || value > 65535 || (value % 1 != 0))
                {
                    return false;
                }
            }
            else if (type == "uint32")
            {
                if (value < 0 || value > 4294967295 || (value % 1 != 0))
                {
                    return false;
                }
            }
            else if (type == "uint64")
            {
                if (value < 0 || value > 18446744073709551615 || value % 1 != 0)
                {
                    return false;
                }
            }
            else if (type == "int8")
            {
                if (value < -128 || value > 127 || value % 1 != 0)
                {
                    return false;
                }
            }
            else if (type == "int16")
            {
                if (value < -32768 || value > 32767 || value % 1 != 0)
                {
                    return false;
                }
            }
            else if (type == "int32")
            {
                if (value < -2147483648 || value > 2147483647 || value % 1 != 0)
                {
                    return false;
                }
            }
            else if (type == "int64")
            {
                if (value < -9223372036854775808 || value > 9223372036854775807 || value % 1 != 0)
                {
                    return false;
                }
            }
            else if (type == "float")
            {
                if (value < -3.402823e38 || value > 3.402823e38)
                {
                    return false;
                }
            }
            else if (type == "double")
            {
                if (value < -1.7976931348623157e308 || value > 1.7976931348623157e308)
                {
                    return false;
                }
            }

            return true;
        }
    }

    var populateStruct = function (struct, structDef, data)
    {
        /// <summary>
        /// Populates a structure with a given data set.
        /// </summary>
        /// <param name="struct" type="Object">The structure to populate.</param>
        /// <param name="structDef" type="Object">The definition of the structure to populate.</param>
        /// <param name="data" type="Object">The data to use to populate the structure.</param>
        /// <returns type="boolean">True if the structure was successfully populated, false otherwise.</returns>

        var fields = structDef.fields;
        for (var fieldName in fields)
        {
            var fieldDef = fields[fieldName];
            var fieldValue = data[fieldDef.name];

            if (fieldValue === null || fieldValue === undefined)
            {
                if (fieldDef.req)
                {
                    logError("Missing required property: " + fieldDef.name);
                    return false;
                }
                else
                {
                    continue;
                }
            }

            if (fieldDef.type == "map")
            {
                var map = {};
                for (var key in fieldValue)
                {
                    if (!isOfCorrectType(fieldDef.key, key))
                    {
                        logError("A key in the map was of the wrong type: " + fieldDef.name);
                        return false;
                    }

                    if (!isOfCorrectType(fieldDef.element, fieldValue[key]))
                    {
                        logError("A value in the map was of the wrong type: " + fieldDef.name);
                        return false;
                    }

                    map[key] = fieldValue[key];
                }

                struct[fieldDef.name] = map;
            }
            else if (fieldDef.type == "list" || fieldDef.type == "set")
            {
                var array = [];
                if (Object.prototype.toString.call(fieldValue) === '[object Array]')
                {
                    for (var c = 0; c < fieldValue.length; c++)
                    {
                        if (fieldValue[c] != null && !isOfCorrectType(fieldDef.element, fieldValue[c]))
                        {
                            logError("The list contains a value of the wrong type: " + fieldDef.name);
                            return false;
                        }

                        array[c] = fieldValue[c];
                    }
                }
                else
                {
                    logError("The " + fieldDef.type + " " + fieldDef.name + " was not an array as expected");
                    return false;
                }

                struct[fieldDef.name] = array;
            }
            else if (fieldDef.type == "struct")
            {
                var subStruct = {};
                if (!populateStruct(subStruct, fieldDef.def, fieldValue))
                {
                    return false;
                }

                struct[fieldDef.name] = subStruct;
            }
            else
            {
                if (!isOfCorrectType(fieldDef.type, fieldValue))
                {
                    logError("Property is the wrong type: " + fieldDef.name);
                    return false;
                }

                struct[fieldDef.name] = fieldValue;
            }
        }

        // Display warnings for any fields that were present in the event data but not in the schema and
        // were therefor dropped.
        for (var propertyName in data)
        {
            var found = false;
            for (var i = 0; i < fields.length; i++)
            {
                if (fields[i].name == propertyName)
                {
                    found = true;
                    break;
                }
            }

            if (!found)
            {
                logError("An unexpected property was found in the event content and dropped: " + propertyName);
            }
        }

        return true;
    };

    this.Asimov.writeEvent = function (event)
    {
        /// <summary>
        /// Writes one or more events to the configured asimov endpoint.  Given an event, or an array of events,
        /// it validates each event against the schema for the event type outputting any validation errors to the
        /// console.  Valid events are then batched together and sent to the asimov endpoint.
        /// </summary>
        /// <param name="event">An event or an array of events.</param>

        if (!event || !canWriteEvents())
        {
            return;
        }

        // translate the events
        var translatedEvents = [];
        if (self.jQuery.isArray(event))
        {
            for (var i = 0; i < event.length; i++)
            {
                var translationArrayResult = self.Asimov._validateAndTranslateEvent(event[i]);
                if (translationArrayResult.success)
                {
                    translatedEvents.push(translationArrayResult.event);
                }
            }
        }
        else
        {
            var translatedSingleResult = self.Asimov._validateAndTranslateEvent(event);
            if (translatedSingleResult.success)
            {
                translatedEvents.push(translatedSingleResult.event);
            }
        }

        if (translatedEvents.length == 0)
        {
            return;
        }

        // serialize the events
        var requestBody = "";
        for (var j = 0; j < translatedEvents.length; j++)
        {
            if (j > 0)
            {
                requestBody += "\n";
            }

            requestBody += self.JSON.stringify(translatedEvents[j]);
        }

        // send the events
        var requestOptions =
        {
            accepts: { text: 'application/json' },
            url: self.Asimov.uploadUrl,
            type: 'post',
            dataType: 'text',
            cache: false,
            data: requestBody,
            crossDomain: true,
            headers: {
                'Content-Type': 'application/x-json-stream'
            }
        };

        var request = window.jQuery.ajax(requestOptions);
        request.fail(xhrFailureCallback);

        // register the failure callback (newer version of jQuery use a different method so detect which is
        // available and use it)
        if (request.fail)
        {
            request.fail(xhrFailureCallback);
        }
        else
        {
            requst.error(xhrFailureCallback);
        }

        // register the success callback (newer versions of jQuery use a different methods so detect which is
        // available and use it)
        if (request.done)
        {
            request.done(xhrSuccessCallback);
        }
        else
        {
            request.success(xhrSuccessCallback);
        }
    };

    this.Asimov._validateAndTranslateEvent = function (event)
    {
        /// <summary>
        /// Validates and translates an event.  Validation consists of ensuring it contains all of the required
        /// properties and that all properties are of the correct type.  Translation consists of copying the
        /// validated properties and populating the part A properties and results in an event which can be directly
        /// JSON serialized and sent to vortex.
        /// </summary>
        /// <param name="event">An event or an array of events.</param>

        var translatedEvent = {};
        var data = {};
        var result =
            {
                event: translatedEvent,
                success: false
            };

        if (!event)
        {
            logError("Unable to write null event");
            return result;
        }

        if (!event.name)
        {
            logError("Unable to write event with missing name");
            return result;
        }

        if (!_schemas.hasOwnProperty(event.name))
        {
            logError("Unable to write event: a schema for the event named {" + event.name + "} does not exist");
            return result;
        }

        if (!event.content)
        {
            logError("Unable to write event: the event is missing content");
            return result;
        }

        var schema = _schemas[event.name];
        for (var partName in schema)
        {
            if (partName === "name")
            {
                continue;
            }

            var part = schema[partName];

            if (!event.content.hasOwnProperty(partName))
            {
                logError("unable to write event: missing expected part: " + partName);
                return result;
            }

            var currentContainer;

            if (part.part == "C")
            {
                currentContainer = data;
            }
            else
            {
                currentContainer = {};
                data["item"] = currentContainer;
                data["type"] = partName;
            }

            if (!populateStruct(currentContainer, part.def, event.content[partName]))
            {
                return result;
            }
        }

        // Display warnings for any fields that were present in the event data but not in the schema and
        // were therefor dropped.
        for (var propertyName in event.content)
        {
            if (!schema[propertyName].part)
            {
                logError("An unexpected property was found in the event content and dropped: " + propertyName);
            }
        }

        translatedEvent.name = event.name;
        translatedEvent.time = new Date();
        translatedEvent.data = data;
        translatedEvent.tags = {};

        var appVersion = (self.navigator && self.navigator.appVersion) ? self.navigator.appVersion : "";
        // TODO: Be more comprehensive
        if (appVersion.indexOf("Win") != -1)
        {
            translatedEvent.os = "Windows";
        }
        else if (appVersion.indexOf("Mac") != -1)
        {
            translatedEvent.os = "MacOS";
        }
        else if (appVersion.indexOf("X11") != -1)
        {
            translatedEvent.os = "Unix";
        }
        else if (appVersion.indexOf("Linux") != -1)
        {
            translatedEvent.os = "Linux";
        }
        else
        {
            translatedEvent.os = "Unknown";
        }

        if (event.hasOwnProperty(this.correlationVectorTag))
        {
            if (this.CorrelationVector.isValid(event[this.correlationVectorTag]))
            {
                translatedEvent.tags[this.correlationVectorTag] = event[this.correlationVectorTag];
            }
            else
            {
                // Supplied CV value is invalid
                logError("The correlation vector value is invalid: " + event[this.correlationVectorTag]);
                return result;
            }
        }
        else
        {
            // Auto populate using the default value
            translatedEvent.tags[this.correlationVectorTag] = this.cv.getValue();
        }

        result.success = true;

        return result;
    };

    this.Asimov._registerSchemas = function (schemas)
    {
        /// <summary>
        /// Registers the specified schemas with the library.  An event can only be sent if a schema matching
        /// the event has been registered as the schema is used to validate and translate the event.
        /// </summary>
        /// <param name="schemas" type="Array">The schemas to register</param>

        for (var i = 0; i < schemas.length; i++)
        {
            _schemas[schemas[i].name] = schemas[i];
        }
    };
})();

(function ()
{
    this.Asimov._registerSchemas([
        {
            "name": "Microsoft.Commerce.PCS.Int.Error",
            "Ms.Qos.IncomingServiceRequest":
            {
                "part": "B",
                "def":
                {
                    "fields":
                    [
                        {
                            "name": "operationVersion",
                            "type": "string"
                        },
                        {
                            "name": "callerIpAddress",
                            "type": "string"
                        },
                        {
                            "name": "callerName",
                            "type": "string"
                        },
                        {
                            "name": "requestSizeBytes",
                            "type": "int32"
                        },
                        {
                            "req" : true,
                            "name": "operationName",
                            "type": "string"
                        },
                        {
                            "name": "targetUri",
                            "type": "string"
                        },
                        {
                            "req" : true,
                            "name": "latencyMs",
                            "type": "int32"
                        },
                        {
                            "req" : true,
                            "name": "serviceErrorCode",
                            "type": "int32"
                        },
                        {
                            "req" : true,
                            "name": "succeeded",
                            "type": "bool"
                        },
                        {
                            "name": "requestMethod",
                            "type": "string"
                        },
                        {
                            "name": "responseContentType",
                            "type": "string"
                        },
                        {
                            "name": "protocol",
                            "type": "string"
                        },
                        {
                            "name": "protocolStatusCode",
                            "type": "string"
                        }
                    ]
                }
            },
            "Microsoft.Commerce.PCS.Int.Error":
            {
                "part": "C",
                "def":
                {
                    "fields":
                    [
                        {
                            "name": "SessionGuid",
                            "type": "string"
                        },
                        {
                            "name": "ErrorCode",
                            "type": "string"
                        },
                        {
                            "name": "BrowserString",
                            "type": "string"
                        }
                    ]
                }
            }
        },
        {
            "name": "Microsoft.Commerce.PCS.Int.Event",
            "Ms.Qos.IncomingServiceRequest":
            {
                "part": "B",
                "def":
                {
                    "fields":
                    [
                        {
                            "name": "operationVersion",
                            "type": "string"
                        },
                        {
                            "name": "callerIpAddress",
                            "type": "string"
                        },
                        {
                            "name": "callerName",
                            "type": "string"
                        },
                        {
                            "name": "requestSizeBytes",
                            "type": "int32"
                        },
                        {
                            "req" : true,
                            "name": "operationName",
                            "type": "string"
                        },
                        {
                            "name": "targetUri",
                            "type": "string"
                        },
                        {
                            "req" : true,
                            "name": "latencyMs",
                            "type": "int32"
                        },
                        {
                            "req" : true,
                            "name": "serviceErrorCode",
                            "type": "int32"
                        },
                        {
                            "req" : true,
                            "name": "succeeded",
                            "type": "bool"
                        },
                        {
                            "name": "requestMethod",
                            "type": "string"
                        },
                        {
                            "name": "responseContentType",
                            "type": "string"
                        },
                        {
                            "name": "protocol",
                            "type": "string"
                        },
                        {
                            "name": "protocolStatusCode",
                            "type": "string"
                        }
                    ]
                }
            },
            "Microsoft.Commerce.PCS.Int.Event":
            {
                "part": "C",
                "def":
                {
                    "fields":
                    [
                        {
                            "name": "SessionGuid",
                            "type": "string"
                        },
                        {
                            "name": "EventName",
                            "type": "string"
                        },
                        {
                            "name": "EventCode",
                            "type": "string"
                        },
                        {
                            "name": "BrowserString",
                            "type": "string"
                        }
                    ]
                }
            }
        },
        {
            "name": "Microsoft.Commerce.PCS.Int.PageLoad",
            "Ms.Qos.IncomingServiceRequest":
            {
                "part": "B",
                "def":
                {
                    "fields":
                    [
                        {
                            "name": "operationVersion",
                            "type": "string"
                        },
                        {
                            "name": "callerIpAddress",
                            "type": "string"
                        },
                        {
                            "name": "callerName",
                            "type": "string"
                        },
                        {
                            "name": "requestSizeBytes",
                            "type": "int32"
                        },
                        {
                            "req" : true,
                            "name": "operationName",
                            "type": "string"
                        },
                        {
                            "name": "targetUri",
                            "type": "string"
                        },
                        {
                            "req" : true,
                            "name": "latencyMs",
                            "type": "int32"
                        },
                        {
                            "req" : true,
                            "name": "serviceErrorCode",
                            "type": "int32"
                        },
                        {
                            "req" : true,
                            "name": "succeeded",
                            "type": "bool"
                        },
                        {
                            "name": "requestMethod",
                            "type": "string"
                        },
                        {
                            "name": "responseContentType",
                            "type": "string"
                        },
                        {
                            "name": "protocol",
                            "type": "string"
                        },
                        {
                            "name": "protocolStatusCode",
                            "type": "string"
                        }
                    ]
                }
            },
            "Microsoft.Commerce.PCS.Int.PageLoad":
            {
                "part": "C",
                "def":
                {
                    "fields":
                    [
                        {
                            "name": "SessionGuid",
                            "type": "string"
                        },
                        {
                            "name": "EventCode",
                            "type": "string"
                        },
                        {
                            "name": "BrowserString",
                            "type": "string"
                        }
                    ]
                }
            }
        },
        {
            "name": "Microsoft.Commerce.PCS.Prod.Error",
            "Ms.Qos.IncomingServiceRequest":
            {
                "part": "B",
                "def":
                {
                    "fields":
                    [
                        {
                            "name": "operationVersion",
                            "type": "string"
                        },
                        {
                            "name": "callerIpAddress",
                            "type": "string"
                        },
                        {
                            "name": "callerName",
                            "type": "string"
                        },
                        {
                            "name": "requestSizeBytes",
                            "type": "int32"
                        },
                        {
                            "req" : true,
                            "name": "operationName",
                            "type": "string"
                        },
                        {
                            "name": "targetUri",
                            "type": "string"
                        },
                        {
                            "req" : true,
                            "name": "latencyMs",
                            "type": "int32"
                        },
                        {
                            "req" : true,
                            "name": "serviceErrorCode",
                            "type": "int32"
                        },
                        {
                            "req" : true,
                            "name": "succeeded",
                            "type": "bool"
                        },
                        {
                            "name": "requestMethod",
                            "type": "string"
                        },
                        {
                            "name": "responseContentType",
                            "type": "string"
                        },
                        {
                            "name": "protocol",
                            "type": "string"
                        },
                        {
                            "name": "protocolStatusCode",
                            "type": "string"
                        }
                    ]
                }
            },
            "Microsoft.Commerce.PCS.Prod.Error":
            {
                "part": "C",
                "def":
                {
                    "fields":
                    [
                        {
                            "name": "SessionGuid",
                            "type": "string"
                        },
                        {
                            "name": "ErrorCode",
                            "type": "string"
                        },
                        {
                            "name": "BrowserString",
                            "type": "string"
                        }
                    ]
                }
            }
        },
        {
            "name": "Microsoft.Commerce.PCS.Prod.Event",
            "Ms.Qos.IncomingServiceRequest":
            {
                "part": "B",
                "def":
                {
                    "fields":
                    [
                        {
                            "name": "operationVersion",
                            "type": "string"
                        },
                        {
                            "name": "callerIpAddress",
                            "type": "string"
                        },
                        {
                            "name": "callerName",
                            "type": "string"
                        },
                        {
                            "name": "requestSizeBytes",
                            "type": "int32"
                        },
                        {
                            "req" : true,
                            "name": "operationName",
                            "type": "string"
                        },
                        {
                            "name": "targetUri",
                            "type": "string"
                        },
                        {
                            "req" : true,
                            "name": "latencyMs",
                            "type": "int32"
                        },
                        {
                            "req" : true,
                            "name": "serviceErrorCode",
                            "type": "int32"
                        },
                        {
                            "req" : true,
                            "name": "succeeded",
                            "type": "bool"
                        },
                        {
                            "name": "requestMethod",
                            "type": "string"
                        },
                        {
                            "name": "responseContentType",
                            "type": "string"
                        },
                        {
                            "name": "protocol",
                            "type": "string"
                        },
                        {
                            "name": "protocolStatusCode",
                            "type": "string"
                        }
                    ]
                }
            },
            "Microsoft.Commerce.PCS.Prod.Event":
            {
                "part": "C",
                "def":
                {
                    "fields":
                    [
                        {
                            "name": "SessionGuid",
                            "type": "string"
                        },
                        {
                            "name": "EventName",
                            "type": "string"
                        },
                        {
                            "name": "EventCode",
                            "type": "string"
                        },
                        {
                            "name": "BrowserString",
                            "type": "string"
                        }
                    ]
                }
            }
        },
        {
            "name": "Microsoft.Commerce.PCS.Prod.PageLoad",
            "Ms.Qos.IncomingServiceRequest":
            {
                "part": "B",
                "def":
                {
                    "fields":
                    [
                        {
                            "name": "operationVersion",
                            "type": "string"
                        },
                        {
                            "name": "callerIpAddress",
                            "type": "string"
                        },
                        {
                            "name": "callerName",
                            "type": "string"
                        },
                        {
                            "name": "requestSizeBytes",
                            "type": "int32"
                        },
                        {
                            "req" : true,
                            "name": "operationName",
                            "type": "string"
                        },
                        {
                            "name": "targetUri",
                            "type": "string"
                        },
                        {
                            "req" : true,
                            "name": "latencyMs",
                            "type": "int32"
                        },
                        {
                            "req" : true,
                            "name": "serviceErrorCode",
                            "type": "int32"
                        },
                        {
                            "req" : true,
                            "name": "succeeded",
                            "type": "bool"
                        },
                        {
                            "name": "requestMethod",
                            "type": "string"
                        },
                        {
                            "name": "responseContentType",
                            "type": "string"
                        },
                        {
                            "name": "protocol",
                            "type": "string"
                        },
                        {
                            "name": "protocolStatusCode",
                            "type": "string"
                        }
                    ]
                }
            },
            "Microsoft.Commerce.PCS.Prod.PageLoad":
            {
                "part": "C",
                "def":
                {
                    "fields":
                    [
                        {
                            "name": "SessionGuid",
                            "type": "string"
                        },
                        {
                            "name": "EventCode",
                            "type": "string"
                        },
                        {
                            "name": "BrowserString",
                            "type": "string"
                        }
                    ]
                }
            }
        },
        {
            "name": "Ms.Qos.BaseQos",
            "Ms.Qos.BaseQos":
            {
                "part": "B",
                "def":
                {
                    "fields":
                    [
                        {
                            "req" : true,
                            "name": "operationName",
                            "type": "string"
                        },
                        {
                            "name": "targetUri",
                            "type": "string"
                        },
                        {
                            "req" : true,
                            "name": "latencyMs",
                            "type": "int32"
                        },
                        {
                            "req" : true,
                            "name": "serviceErrorCode",
                            "type": "int32"
                        },
                        {
                            "req" : true,
                            "name": "succeeded",
                            "type": "bool"
                        },
                        {
                            "name": "requestMethod",
                            "type": "string"
                        },
                        {
                            "name": "responseContentType",
                            "type": "string"
                        },
                        {
                            "name": "protocol",
                            "type": "string"
                        },
                        {
                            "name": "protocolStatusCode",
                            "type": "string"
                        }
                    ]
                }
            }
        },
        {
            "name": "Ms.Qos.IncomingServiceRequest",
            "Ms.Qos.IncomingServiceRequest":
            {
                "part": "B",
                "def":
                {
                    "fields":
                    [
                        {
                            "name": "operationVersion",
                            "type": "string"
                        },
                        {
                            "name": "callerIpAddress",
                            "type": "string"
                        },
                        {
                            "name": "callerName",
                            "type": "string"
                        },
                        {
                            "name": "requestSizeBytes",
                            "type": "int32"
                        },
                        {
                            "req" : true,
                            "name": "operationName",
                            "type": "string"
                        },
                        {
                            "name": "targetUri",
                            "type": "string"
                        },
                        {
                            "req" : true,
                            "name": "latencyMs",
                            "type": "int32"
                        },
                        {
                            "req" : true,
                            "name": "serviceErrorCode",
                            "type": "int32"
                        },
                        {
                            "req" : true,
                            "name": "succeeded",
                            "type": "bool"
                        },
                        {
                            "name": "requestMethod",
                            "type": "string"
                        },
                        {
                            "name": "responseContentType",
                            "type": "string"
                        },
                        {
                            "name": "protocol",
                            "type": "string"
                        },
                        {
                            "name": "protocolStatusCode",
                            "type": "string"
                        }
                    ]
                }
            }
        },
        {
            "name": "Ms.Qos.OutgoingServiceRequest",
            "Ms.Qos.OutgoingServiceRequest":
            {
                "part": "B",
                "def":
                {
                    "fields":
                    [
                        {
                            "req" : true,
                            "name": "dependencyOperationName",
                            "type": "string"
                        },
                        {
                            "name": "dependencyOperationVersion",
                            "type": "string"
                        },
                        {
                            "req" : true,
                            "name": "dependencyName",
                            "type": "string"
                        },
                        {
                            "name": "dependencyType",
                            "type": "string"
                        },
                        {
                            "name": "responseSizeBytes",
                            "type": "int32"
                        },
                        {
                            "req" : true,
                            "name": "operationName",
                            "type": "string"
                        },
                        {
                            "name": "targetUri",
                            "type": "string"
                        },
                        {
                            "req" : true,
                            "name": "latencyMs",
                            "type": "int32"
                        },
                        {
                            "req" : true,
                            "name": "serviceErrorCode",
                            "type": "int32"
                        },
                        {
                            "req" : true,
                            "name": "succeeded",
                            "type": "bool"
                        },
                        {
                            "name": "requestMethod",
                            "type": "string"
                        },
                        {
                            "name": "responseContentType",
                            "type": "string"
                        },
                        {
                            "name": "protocol",
                            "type": "string"
                        },
                        {
                            "name": "protocolStatusCode",
                            "type": "string"
                        }
                    ]
                }
            }
        }
        ]);
})();

Data contracts
==============

* [Inputs](#inputs)
    * [Instance update](#instance-update)
* [Outputs](#outputs)
    * [Message acknowledge](#message-acknowledge)
    
# Inputs

## Instance update

**Contract**

````
{
    "nature": {
        "type": "instances",
        "quality": "update"
      },
    "payload": {
        "query": {
            // one unique field form data model
        },
        "content": {
            // some or all fields from data model except id field
        }        
    }
}
````

**Example**

````
{
    "nature": {
        "type": "instances",
        "quality": "update"
      },
    "payload": {
        "query": {
            "hostname": "localhost"
        },
        "content": {
            "ip": "127.0.0.1",
            "properties": {
                "os": "Windows 10 64bits",
                "env": "local"
            }
        }        
    }
}
````

**Notes**

If the instance to update doesn't exist, it will attempt to create it with full passed arguments (query & payload)

For the above example, if there is no instance matching the hostname "localhost", it will attempt to create a new instance:

````
{
    "hostname": "localhost",
    "ip": "127.0.0.1",
    "properties": {
        "os": "Windows 10 64bits",
        "env": "local"
    }
}
````

# Outputs

## Message acknowledge

**Contract**

````
{
    "nature": {
        "type": "message",
        "quality": "acknowledge"
      },
    "payload": {
        "id": String
    }
}
````

**Example**

````
{
    "nature": {
        "type": "message",
        "quality": "acknowledge"
      },
    "payload": {
        "id": "U8i96mL"
    }
}
````
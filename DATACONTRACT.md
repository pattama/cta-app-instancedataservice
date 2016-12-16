# Instance DataService for Compass Test Automation
[Readme](README.md) | [Rest API](RESTAPI.md) | [DataModel](DATAMODEL.md) | [DataContract](DATACONTRACT.md) | [Document](DOCUMENTATION.md) |[Configuration](CONFIGURATION.md)| [Sequence Diagrams](https://www.lucidchart.com/documents/edit/9980627b-2d6c-4a15-b610-235575b8801e)

## Instance Data Contracts

### Input
* [Instance update](#instance-update)

#### Instance update:
Contract:
```ruby
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
```
Example:
```ruby
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
```

**Notes**

If the instance to update doesn't exist, it will attempt to create it with full passed arguments (query & payload)

For the above example, if there is no instance matching the hostname "localhost", it will attempt to create a new instance:

```ruby
{
    "hostname": "localhost",
    "ip": "127.0.0.1",
    "properties": {
        "os": "Windows 10 64bits",
        "env": "local"
    }
}
```
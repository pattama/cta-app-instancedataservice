Rest API
========

# Summary

**Instances**

* [Create a new Instance](#create-a-new-instance)
* [Find Instances](#find-instances)
* [Update an Instance](#update-an-instance)
* [Delete an Instance](#delete-an-instance)

**Templates**

*  [Create a new Template](#create-a-new-template)
* [Find Templates](#find-templates)
* [Update a Template](#update-a-template)
* [Delete a Template](#delete-a-template)

# Create a new Instance 

**Request**

```ruby
POST /instances
{
  "hostname" : "localhost",
  "ip": "12.34.56.78",
  "properties": {
      "os": "windows 7",
      "office": "office 2013",
      "env": ["alpha", "beta"]
  }
}
```

**Response**

```ruby
201
{
  "result": {
    "id": "582b8ae883672f210c93c221",
    "hostname": "localhost",
    "ip": "12.34.56.78",
    "properties": {
      "os": "windows 7",
      "office": "office 2013",
      "env": ["alpha", "beta"]
    }
  }
}
```

# Find Instances

## Find by hostname

**Request**

```ruby
GET /instances?hostname=localhost
```

**Response**

```ruby
200
{
  "result": [
    {
      "id": "582b8ae883672f210c93c221",
      "hostname": "localhost",
      "ip": "12.34.56.78",
      "properties": {
        "os": "windows 7",
        "office": "office 2013",
        "env": ["alpha", "beta"]
      }
      "used": null,
      "lastUsed": null,
      "runningSince": null,
      "features": null
    }
  ]
}
```

## Find by properties

**Request**

```ruby
GET /instances?properties.os=windows 7
```

**Response**

```ruby
200
{
  "result": [
    {
      "id": "582b8ae883672f210c93c221",
      "hostname": "localhost",
      "ip": "12.34.56.78",
      "properties": {
        "os": "windows 7",
        "office": "office 2013",
        "env": ["alpha", "beta"]
      }
      "used": null,
      "lastUsed": null,
      "runningSince": null,
      "features": null
    }
  ]
}
```

# Update an Instance 

**Request**

```ruby
PATCH /instances/582b8ae883672f210c93c221
{
  "hostname" : "my.localhost",
  "ip": "12.12.12.12"
}
```

**Response**

```ruby
200
{
  "result": {
    "id": "582b8ae883672f210c93c221",
    "hostname" : "my.localhost",
    "ip": "12.12.12.12",
    "properties": {
      "os": "windows 7",
      "office": "office 2013",
      "env": ["alpha", "beta"]
    }
  }
}
```

# Delete an Instance 

**Request**

```ruby
DELETE /instances/582b8ae883672f210c93c221
```

**Response**

```ruby
200
{
  "result": {
    "id": "582b8ae883672f210c93c221",
    "hostname" : "my.localhost",
    "ip": "12.12.12.12",
    "properties": {
      "os": "windows 7",
      "office": "office 2013",
      "env": ["alpha", "beta"]
    }
  }
}
```


# Create a new Template 

**Request**

```ruby
POST /templates
{
  "name" : "win7-office2013",
  "templateid": "123456789",
  "properties": {
      "os": "windows 7",
      "office": "office 2013"
  },
  "cloud": {
    "id": "123456789",
    "name": "OpenStack"
  }
}
```

**Response**

```ruby
201
{
  "result": {
    "id": "582b8c99e51db91428fcc42d",
    "name" : "win7-office2013",
    "templateid": "123456789",
    "properties": {
        "os": "windows 7",
        "office": "office 2013"
    },
    "cloud": {
      "id": "123456789",
      "name": "OpenStack"
    }
  }
}
```

# Find Templates 

**Request**

```ruby
GET /templates?name=win7-office2013
```

**Response**

```ruby
200
{
  "result": [
    {
      "id": "582b8c99e51db91428fcc42d",
      "name" : "win7-office2013",
      "templateid": "123456789",
      "properties": {
          "os": "windows 7",
          "office": "office 2013"
      },
      "cloud": {
        "id": "123456789",
        "name": "OpenStack"
      }
    }
  ]
}
```

# Update a Template 

**Request**

```ruby
PATCH /templates/582b8c99e51db91428fcc42d
{
  "name" : "win7-office2016-ie10",
  "properties": {
    "os": "windows 7",
    "office": "office 2013",
    "ie": "IE10"
  }
}
```

**Response**

```ruby
200
{
  "result": {
    "id": "582b8c99e51db91428fcc42d",
    "name" : "win7-office2013-ie10",
    "templateid": "123456789",
    "properties": {
      "os": "windows 7",
      "office": "office 2013",
      "ie": "IE10"
    },
    "cloud": {
      "id": "123456789",
      "name": "OpenStack"
    }
  }
}
```

# Delete a Template 

**Request**

```ruby
DELETE /templates/582b8c99e51db91428fcc42d
```

**Response**

```ruby
200
{
  "result": {
    "id": "582b8c99e51db91428fcc42d",
    "name" : "win7-office2013-ie10",
    "templateid": "123456789",
    "properties": {
      "os": "windows 7",
      "office": "office 2013",
      "ie": "IE10"
    },
    "cloud": {
      "id": "123456789",
      "name": "OpenStack"
    }
  }
}
```
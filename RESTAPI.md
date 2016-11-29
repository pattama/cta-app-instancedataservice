Rest API
========

# Summary

**Instances**

* [Create a new Instance](#create-a-new-instance)
* [Find Instances](#find-instances)
* [Update an Instance](#update-an-instance)
* [Delete an Instance](#delete-an-instance)

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

*Update by id*

```ruby
PATCH /instances?id=582b8ae883672f210c93c221
{
  "hostname" : "my.localhost",
  "ip": "12.12.12.12"
}
```

*Update by hostname*

```ruby
PATCH /instances?hostname=my.localhost
{
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
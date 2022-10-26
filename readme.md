# Superheroes

This application will allow you to create your own collection of heroes. With it, you can create, delete, edit characters from your own fictional or real universe

## API

Server placed on [http://146.59.87.87:8080/api/heroes](http://146.59.87.87:8080/api/heroes)

Hero schema looks like:

```jsx
{
    nickname: {
      type: String,
      required: [true, "Set nickname for hero"],
    },
    real_name: {
      type: String,
    },
    origin_description: {
      type: String,
    },
    superpowers: {
      type: [String],
    },
    catch_phrase: {
      type: String,
    },
    images: {
      type: [String],
    },
},
```

### Get all heroes

`GET` `/` Getting array of first 5 heroes

Example:

**response**

```json
{
  "message": "These are all heroes",
  "data": {
    "heroes": [
      {
        "_id": "6358d17f5cbbe37deb43fb7f",
        "nickname": "test nick",
        "real_name": "test real",
        "superpowers": ["test superpowers"],
        "images": ["c7787848-72b3-4562-afba-25ef798d0b98.jpg"]
      },
      {
        "_id": "6358d2d75cbbe37deb43fb83",
        "nickname": "test nick2",
        "real_name": "real 2",
        "superpowers": ["superpower"],
        "images": []
      },
      {
        "_id": "6358d3755cbbe37deb43fb87",
        "nickname": "test nick3",
        "real_name": "real 3",
        "superpowers": ["superpower"],
        "images": []
      }
    ],
    "total": 3
  }
}
```

### Get one hero by id

`GET` `/:heroId` Getting object of the hero schema by id

Example:

**response**

```json
{
  "message": "This is your hero",
  "data": {
    "_id": "6358d3755cbbe37deb43fb87",
    "nickname": "test nick3",
    "real_name": "real 3",
    "superpowers": ["superpower"],
    "images": []
  }
}
```

### Create new hero

`POST` `/` Creating new hero from body which you handed over. Body must have at least `nickname`

Example:

**request**

```jsx
    body: {
    "nickname" : "test nick2",
    "real_name" : "real 2",
    "superpowers": "superpower"
    }
```

**response**

```json
{
  "message": "Created",
  "data": {
    "nickname": "test nick2",
    "real_name": "real 2",
    "superpowers": ["superpower"],
    "images": [],
    "_id": "6358d2d75cbbe37deb43fb83"
  }
}
```

### Delete hero by id

`DELETE` `/:heroId` Deleting hero by id

Example:

**response**

```json
{
  "message": "Hero test nick3 deleted"
}
```

### Edit hero by id

`PATCH` `/:heroId` Updating hero by id from body which you handed over

Example:

**request**

```jsx
    body: {
      "nickname" : "new nickname",
      "real_name" : "new real name",
      "superpowers": "new superpower",
      "origin_description":"description"
      }
```

**response**

```json
{
  "message": "Hero updated",
  "data": {
    "_id": "6358d17f5cbbe37deb43fb7f",
    "nickname": "test nick",
    "real_name": "test real",
    "superpowers": ["test superpowers"],
    "images": ["c7787848-72b3-4562-afba-25ef798d0b98.jpg"]
  }
}
```

### Remove picture from hero avatar`s collection

`PATCH` `/:heroId/avatars/:imageName` Removing picture from avatar's collection from hero by his id. You don't need to handed over body for this request, just make `PATCH`

Example:

**response**

```json
{
  "message": "Avatar removed",
  "data": {
    "_id": "6358d17f5cbbe37deb43fb7f",
    "nickname": "test nick",
    "real_name": "test real",
    "superpowers": ["test superpowers"],
    "images": []
  }
}
```

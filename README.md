# Fitur
- melihat akun yang mengikuti balik (teman)
- melihat akun yang tidak mengikuti balik
- melihat akun yang tidak anda ikuti balik
  
# input data
## **format data json following:**
```json
{
  "relationships_following": [
    {
      "title": "username1",
      "string_list_data": [
        {
          "href": "https://www.instagram.com/_u/username1",
          "timestamp": 1775919671
        }
      ]
    },
    {
      "title": "username2",
      "string_list_data": [
        {
          "href": "https://www.instagram.com/_u/username2",
          "timestamp": 1772944326
        }
      ]
    },
    {
      "title": "username3",
      "string_list_data": [
        {
          "href": "https://www.instagram.com/_u/username3",
          "timestamp": 1772108031
        }
      ]
    },

```
## **format data json follower:**
```json
[
  {
    "title": "",
    "media_list_data": [
      
    ],
    "string_list_data": [
      {
        "href": "https://www.instagram.com/user01",
        "value": "user01",
        "timestamp": 1772708798
      }
    ]
  },
  {
    "title": "",
    "media_list_data": [
      
    ],
    "string_list_data": [
      {
        "href": "https://www.instagram.com/user02",
        "value": "user02",
        "timestamp": 1772108038
      }
    ]
  },
  {
    "title": "",
    "media_list_data": [
      
    ],
    "string_list_data": [
      {
        "href": "https://www.instagram.com/user03",
        "value": "user04",
        "timestamp": 1769556011
      }
    ]
  },
```

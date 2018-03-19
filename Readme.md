# NodeJS MicroService

## Features

The API features the following functionalities -

#### Public Endpoints

##### Login
* Request body contains an arbitrary username/password pair
* Result: Returns a signed [Json Web Token (JWT)](https://jwt.io/) which is used to validate future requests.

###### NOTE: This is a mock-up  and accepts all username/password pair.

#### Protected Endpoints

The following two endpoints are protected. The JWT obtained in the “Login” endpoint must be attached to each request. If the JWT is missing or invalid, these endpoints rejects the request.

##### Apply Json Patch
* Request body contains a JSON object and a [Json Patch](http://jsonpatch.com/) object.
* Result: Applies the json patch to the json object, and returns the resulting json object.

##### Create Thumbnail
* Request contain a public image URL.
* Result: Downloads the image, resize to 50x50 pixels, and return the resulting thumbnail.


## Documentation

### Setup using NPM

#### Prerequisites

* [NodeJS](https://nodejs.org/en/)
* [Git](https://git-scm.com/)

```

# Get the latest code from github
git clone https://github.com/balrampariyarath/nodejs-microservice.git

# Go to the project directory
cd nodejs-microservice/

# Install NPM dependencies
npm install

# Start the application
npm start

```

API available at: http://localhost:3000/api/




### API v1 Methods

| Sl.No | Method Name        | Method Type                               | Parameters                                                            | URL                                               | 
|-------|:-------------      :|------------------------------------------:|----------------------------------------------------------------------:|--------------------------------------------------:|
| 1     | login              | POST                                      | username (String) and password (Password)                             | http://localhost:3000/api/login                |
| 2    | patch              | POST (Content-Type: application/json)     | json (json Object), patch (Json Patch Object) and token (JWT token)   | http://localhost:3000/api/patch           |
| 3     | generatethumbnail  | POST                                      | image (Image URL) and token (JWT token)                               | http://localhost:3000/api/generatethumbnail    |


### Examples

#### login API

* POST Request: http://localhost:3000/api/login
* Content-Type: application/x-www-form-urlencoded
* Params: <br/>
    username: tester@123 <br/>
    password: testpass
* Output Format: JSON
```
{
	"status": "true",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RlckAxMjMiLCJwYXNzd29yZCI6InRlc3RwYXNzIiwiaWF0IjoxNTA2MDE5MjUyfQ.HSMPTV_da14hFqsjMP2aLATmseV76wc0x9YrKEP7_KE"
}
```


#### applyPatch API

* POST Request: http://localhost:3000/api/patch
* Content-Type: application/json
* Params:
```
{
	"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhbHJhbSIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJpYXQiOjE1MDU5ODY3Njd9.rSG-BQMLZc8-G3X4hgmlCD6wFA71Tc9CX9TGpS-nuxw",
	"patch":[
		{ "op": "replace", "path": "/baz", "value": "boo" },
		{ "op": "add", "path": "/hello", "value": ["world"] },
		{ "op": "remove", "path": "/foo"}
	],
	"json":{
		"baz": "qux",
		"foo": "bar"
	}
}
```
* Output Format: JSON
```
{
	"status": "true",
	"newJson": {
		"baz": "boo",
		"hello": ["world"]
	}
}
```

#### getThumbnail API

* POST Request: http://localhost:3000/api/generatethumbnail
* Content-Type: application/x-www-form-urlencoded
* Params: <br/>
    image: https://cdn.pixabay.com/photo/2013/04/06/11/50/image-editing-101040_960_720.jpg <br/>
    token: XXX-XXX-XXXXXXXXXXX // a valid token
* Output Format: JSON
```
{
	"status": "true",
	"filename": "assets/thumbnails/image-editing-101040_960_720.jpg"
}
```
###### Original Image Uploaded
![Original Image](https://cdn.pixabay.com/photo/2013/04/06/11/50/image-editing-101040_960_720.jpg "Original Image")

Image Source: Google

###### Thumbnail Generated
![Thumbnail](https://raw.githubusercontent.com/balrampariyarath/nodejs-microservice/master/assets/thumbnails/test_thumb_generated.jpg?token=AIukollWXnSCshf-hrdhHjlixo6H0jJBks5ZzUAwwA%3D%3D "Thumbnail Generated")

### Logs and Assets

* Logs are maintained in `logs` directory
* All thumbnails are generated into `assets/thumbnails` ditectory

### Libraries Used

* [Body Parser](https://www.npmjs.com/package/body-parser)
* [Express](https://www.npmjs.com/package/express)
* [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
* [Image-Downloader](https://www.npmjs.com/package/image-downloader)
* [Json Patch](https://www.npmjs.com/package/json-patch)
* [GraphicsMagick](https://www.npmjs.com/package/gm)

* [Winston (Logging)](https://www.npmjs.com/package/winston)

### To Do

* Adding a JS Linter
# PropertyPro-Lite   
[![Build Status](https://travis-ci.com/mucyomiller/PropertyPro-Lite.svg?branch=develop)](https://travis-ci.com/mucyomiller/PropertyPro-Lite) [![Coverage Status](https://coveralls.io/repos/github/mucyomiller/PropertyPro-Lite/badge.svg?branch=develop)](https://coveralls.io/github/mucyomiller/PropertyPro-Lite?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/b6a6f93f78d00ffce864/maintainability)](https://codeclimate.com/github/mucyomiller/PropertyPro-Lite/maintainability)   

Property Pro Lite is a platform where people can create and/or search properties for sale or rent.

## SETTING UP ENVIRONMENT
```shell
$ brew install node
```
check if it's available
```shell
$ node -v
```
### you must have also git client
```shell
$ git --version
```
### now clone repo
```shell
$ git clone https://github.com/mucyomiller/PropertyPro-Lite.git
```

### Install deps
with yarn or npm
```shell
 ~/Users/mucyofred/PropertyPro-Lite$ npm install
```

### Start the server

```shell
 $ npm start
```

### Tests & Linting
for running test do
```shell
 $ npm test
```
for linting do   
```shell
$ npm lint 
```
## API ENDPOINTS
### *BASEURL : `/api/v2/`*

### AUTHENTICATION END POINTS  : `/auth/`

HTTP METHOD | END POINT | AUTHENTICATED | DESCRIPTION
-----------|----------|--------------|------
POST | `/signup` | `False` | Create a New User
POST | `/signin` | `False` | Authenticate The User

### PROPERTIES End POINTS

HTTP METHOD | END POINT | AUTHENTICATED | DESCRIPTION
-----------|----------|--------------|------
GET | `/properties` | `False` | Get all Properties
GET | `/property/:id` | `False` | Get  specified property by id
GET | `/property?type=name` | `False` | Get propertyies by type
POST | `/property` | `True` | Create a Property
PATCH | `/property/:id` | `True` | Update a Property
PATCH | `/property/:id/sold` | `True` | Mark Property as Sold
DELETE | `/property/:id` | `True` | Delete a Property


### Heroku
The application API is hosted on this dyno URL:
<a href="https://mucyo-property-pro-lite.herokuapp.com/api/v2"> https://mucyo-property-pro-lite.herokuapp.com/api/v2 </a>

### Github Pages 
The application UI is hosted on this gh-pages URL:
<a href="https://mucyofred.com/PropertyPro-Lite/UI/"> https://mucyofred.com/PropertyPro-Lite/UI/ </a>

## Developer   
Mucyo Fred `<me@mucyofred.com>`
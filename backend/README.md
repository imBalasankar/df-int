[GET]
http://localhost:8080/feature 

[POST]
http://localhost:8080/feature   

{
    "featureName": "Full feature",
    "featureDescription": "Gives all the features"
}

[PUT]
http://localhost:8080/feature/2

{
	"featureName": "Half feature",
	"featureDescription": "Gives half features"
	
}


[DELETE]
http://localhost:8080/feature/2


[GET]
http://localhost:8080/license

[POST]
http://localhost:8080/license

{
	"licenseName": "Platinum",
    "licenseValidity": "5 Years",
    "licenseCost": "Rs 500 000"
	
}

[PUT]
http://localhost:8080/license/3

{
	"licenseName": "Platinum",
	"licenseValidity": "2 Years",
	"licenseCost": "Rs 500 000"
	
}

[DELETE]

http://localhost:8080/license/3


[GET]
http://localhost:8080/company

[POST]

http://localhost:8080/company

{
	"companyName": "ieee",
    "email": "www.ieee.lk",
	"license": {
		"id": 3     
	}
}

[PUT]
http://localhost:8080/company/1
{
	"companyName": "ieee",
    "email": "www.ieee.lk",
	"license": {
		"id": 3,
        "created_date": "2019-11-21T00:31:11",
        "updated_date": "2019-11-21T00:31:11",
        "licenseName": "Platinum",
        "licenseValidity": "2 Years",
        "licenseCost": "Rs 500000"
	}
}

[DELETE]

http://localhost:8080/company/1

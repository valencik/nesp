McHacks Notes
=====
Notes taken at McHacks 2014 about the contest, talks, promos and more.


#Juding Criteria 
Design and Polish   
Technical Difficulty  
Practicality  

#Promos
digitalocean mchacks promo code: MCHACKS $75 credit  
GoInstant: https://goinstant.com/signup?src=mchacks   
twilio: MCHACKS  

---
#Talks

##MongoDB
Document Database (like associative arrays, not like .pdf .doc)  
Open source project on GitHub, under AGPL, started/sponsored by 10gen.  
High perf, written in C++, memory mapped files, data serialized as BSON (fast parsing)  
Full support for primary and secondary indexes (like a phonebook indexed alphabetically).  
Document model means less work.  
Horizontally Scalable (shards) for when you have too much to be handled by one computer. (``mongos`` directs users to the correct ``mongod``)  
Ad Hoc queries, real time aggregation, rich query, strongly consistent, geospatial features, support for many languages, flexible schema.  

###Terminology
RDBS|MongoDB
---|---
Tables, Views | Collection
Row | Document
Index | Index
Join | Embedded Document
Foreign Key | Reference
Partition | Shard

###Example update operation
``db.collection.update(query, update)``  
.update is a collection method that takes a query document to find the document to update, and then an update document that has a operator applied to a document to be wrriten.  
```
db.students.update(
                    { name: "joe" },
                    { $push: { scores: 89 } }
                  )
```

---
[MongoDB University](https://education.mongodb.com/)

'use strict';
/*
  Import modules/files you may need to correctly run the script.
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config');

var listingData, newListing;

/* Connect to your database */
mongoose.connect(config.db.uri);

/*
  Instantiate a mongoose model for each listing object in the JSON file,
  and then save it to your Mongo database
 */
fs.readFile('listings.json', 'utf8', function(err, data) {
   //save file data to listingData
    listingData = JSON.parse(data);
    var i;
    for (i=0; i<listingData.entries.length; i++) {
      if(listingData.entries[i].coordinates != null) {
        newListing = new Listing({
            name: listingData.entries[i].name,
            code: listingData.entries[i].code,
            coordinates: {latitude: listingData.entries[i].coordinates.latitude, longitude: listingData.entries[i].coordinates.longitude},
            address: listingData.entries[i].address
          });
        }
        else {
          newListing = new Listing({
              name: listingData.entries[i].name,
              code: listingData.entries[i].code
          });
        }
        newListing.save(function(err) {
        if (err) throw err;
            console.log('Entry saved successfully!');
        });
    }
    //console.log(JSON.stringify(listingData));
    console.log(listingData.entries[0].coordinates != null);
});
/*
  Once you've written + run the script, check out your MongoLab database to ensure that
  it saved everything correctly.
 */

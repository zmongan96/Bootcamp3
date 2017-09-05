/* Fill out these functions using Mongoose queries*/
var Listing = require('./ListingSchema'),
    mongoose = require('mongoose'),
    config = require('./config');

mongoose.connect(config.db.uri);

var findLibraryWest = function() {
  Listing.find({ code: 'LBW' }, function(err, entry) {
    if (err) throw err;
    console.log(entry);
  });
};
var removeCable = function() {
  Listing.findOneAndRemove({ code: 'CABL' }, function(err, entry) {
  if (err) throw err;
  console.log('Entry deleted: ' + entry);
});
};
var updatePhelpsMemorial = function() {
   Listing.findOneAndUpdate({ code: 'PHL' }, { address : '701 N Broadway, Sleepy Hollow, NY 10591' }, function(err, entry) {
     if (err) throw err;
   });
   Listing.find({ code: 'PHL' }, function(err, entry) {
     if (err) throw err;
     console.log(entry);
   });
};
var retrieveAllListings = function() {
   Listing.find({}, function(err, entry) {
     if (err) throw err;
     console.log(entry);
   });
};

findLibraryWest();
removeCable();
updatePhelpsMemorial();
retrieveAllListings();

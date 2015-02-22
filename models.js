Medications = new Mongo.Collection("medications");

Medications.search = function(query){
  return Medications.find({
    $or: [
      {name: { $regex: RegExp(query), $options: 'i' }},
      {'ingredients': {$regex: RegExp(query), $options: 'i'} },
      {'symptoms': {$regex: RegExp(query), $options: 'i'} },
    ],
  }, {sort: {positive_votes: -1, negative_votes: 1}});
}

if(Meteor.isServer){
  Meteor.publish('searchResults', function(query){
    return Medications.search(query); 
  });
}

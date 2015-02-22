Medications = new Mongo.Collection("medications");

Medications.search = function(query){
  return Medications.find({
    $or: [
      {name: { $regex: RegExp(query), $options: 'i' }},
      {'ingredients': {$regex: RegExp(query), $options: 'i'} },
      {'symptoms': {$regex: RegExp(query), $options: 'i'} },
    ]     
  });
}

if(Meteor.isServer){
  Meteor.publish('searchResults', function(query){
    return Medications.search(query); 
  });
}

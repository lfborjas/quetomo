Medications = new Mongo.Collection("medications");

Medications.search = function(query){
  return Medications.find({
    $or: [
      {name: { $regex: RegExp(query), $options: 'i' }},
      {'ingredients': query},
      {'symptoms': query},
    ]     
  });
}

if(Meteor.isServer){
  Meteor.publish('searchResults', function(query){
    return Medications.search(query); 
  });
}

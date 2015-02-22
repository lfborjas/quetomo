Medications = new Mongo.Collection("medications");

if (Meteor.isClient) {
  Template.add_medication.events({
    'submit form': function () {
      var form = $(event.target); 
      var normalize = function(word){
        return word.toLowerCase();
      }

      var data = {
        name: form.find("#name").val(), 
        ingredients: form.find("#ingredients").val().split(/\s*,\s*/).map(normalize), 
        symptoms: form.find("#symptoms").val().split(/\s*,\s*/).map(normalize), 
        warnings: form.find("#warnings").val(),
        createdAt: new Date(),
      };
      Medications.insert(data);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

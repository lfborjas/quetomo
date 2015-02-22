Tracker.autorun(function() {  
  if (Session.get('searchQuery'))
    Meteor.subscribe('searchResults', Session.get('searchQuery'));
});

Template.search_results.helpers ({
 'searchResults': function(){
   return Medications.search(Session.get('searchQuery'));
 } 
});

Template.search_results.events({
  'click .data-label': function(){
    var newQuery = $(event.target).text();
    $("#query").val(newQuery);
    Session.set('searchQuery', newQuery);
  }
});


Template.landing.events({
  'click a.add_medication': function(){
    $("#add_medication").show();
  } 
  ,'submit form': function(){
    var query = $(event.target).find("#query");
    Session.set('searchQuery', query.val());
    return false;
  }
});

Template.add_medication.events({
  'click #cancel_add_medication': function(){
    $("#add_medication").hide();
  }
  ,'submit form': function () {
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
      positive_votes: 0,
      negative_votes: 0
    };
    Medications.insert(data);
    $("#add_medication").hide();
  }
});

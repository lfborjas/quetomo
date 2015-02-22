Template.landing.events({
  'click a.add_medication': function(){
    $("#add_medication").show();
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

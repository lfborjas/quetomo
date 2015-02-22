Tracker.autorun(function() {  
  if (Session.get('searchQuery'))
    Meteor.subscribe('searchResults', Session.get('searchQuery'));
});

Template.search_results.helpers ({
 'searchResults': function(){
   return Medications.search(Session.get('searchQuery'));
 } 
});

Template.add_comment.events({
  'submit form': function(){
    var form = $(event.target);
    var data = {
      'commenter': form.find("#commenter").val(),
      'content': form.find("#content").val()
    };
    Medications.update(form.data("id"), {$push: {comments: data}});
    form.find(':input').not(":submit, :button").val('');
    return false;
  }
});

Template.search_results.events({
  'click .toggle-comments': function(){
    $(event.target).siblings(".comment-list").toggle();
    return false;
  }
  ,'click .data-label': function(){
    var newQuery = $(event.target).text();
    $("#query").val(newQuery);
    Session.set('searchQuery', newQuery);
  }
  ,'click .upvote': function(){
    var upvotes = Session.get('upvotes');
    var id = $(event.target).data("id")
    if(!upvotes) upvotes = [];
    if(id && upvotes.indexOf(id) == -1){
      Medications.update(id, {$inc: {positive_votes: 1}});
      upvotes.push(id)
      Session.set('upvotes', upvotes );
    }
  }
  ,'click .downvote': function(){
    var downvotes = Session.get('downvotes');
    var id = $(event.target).data("id")
    if(!downvotes) downvotes = [];
    if(id && downvotes.indexOf(id) == -1){
      Medications.update(id, {$inc: {negative_votes: 1}});
      downvotes.push(id)
      Session.set('downvotes', downvotes );
    }
  }
});


Template.landing.events({
  'click a.add_medication': function(){
    $("#add_medication").show();
  } 
  ,'submit form': function(){
    var query = $(event.target).find("#query");
    Session.set('searchQuery', query.val());
    $(event.target).find(':input').not(":submit, :button").val('');
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

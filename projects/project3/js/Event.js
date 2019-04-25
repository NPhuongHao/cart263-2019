/*****************

  This is the Event class.

  Indicate the current event's id, title, its options, its options' description and warning.

******************/

class Event {
  // Constructor
  constructor(id, title, description, options, warning) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.options = options;
  }

  // assignOption()
  assignOptions() {
    //option description
    for (var i = 0; i<3; i++) {
      //description for the option
      var $description = $('<div id="optionContent'+i+'">'+ this.options[i].description + '</div>');
      //extract the current event's id
      var currentEventId = this.id;
      //assign a set of requirements for this option
      var requirements = new Requirements(currentEventId, i);
      //assign a set of rewards for this option
      var rewards = new Rewards(currentEvent, i);
      //udpate the requiremetns
      requirements.update();
      //update the rewards
      rewards.update();
      //update the current option
      currentOptions[i] = new Option(requirements, rewards, $description);
    }

  }

}

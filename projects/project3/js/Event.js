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
    console.log(this.options);
    //option description
    for (var i = 0; i<3; i++) {
      var $description = $('<div id="optionContent'+i+'">'+ this.options[i].description + '</div>');
      var currentEvent = this.id;
      var requirements = new Requirements(currentEvent, i);
      var rewards = new Rewards(currentEvent, i);
      requirements.update();
      rewards.update();
      currentOptions[i] = new Option(requirements, rewards, $description);
    }

  }

}

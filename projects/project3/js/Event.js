class Event {
  // Constructor
  constructor(id, title, description, options) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.options = options;
  }

  // assignOption()
  assignOptions() {
    //option description
    for (var i = 0; i<3; i++) {
      var $description = $('<div id="option'+(i+1)+'">'+ this.options[i].description + '</div>');
      var currentEvent = this.id;
      var requirements = new Requirements(currentEvent, i);
      requirements.update();
      options[i] = new Option(requirements, requirements, $description);
    }
    console.log(options);

  }

}

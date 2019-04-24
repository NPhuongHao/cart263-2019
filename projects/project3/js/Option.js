class Option {
  // Constructor
  constructor(requirements, rewards, description) {
    this.requirements = requirements;
    this.rewards = rewards;
    this.description = description;
    this.fulfilled = false;
  }

  //display options
  display() {
    $('.options').append(this.description);
  }

  //checkAnswer()
  checkOption() {
    if (this.requirements.check()) {
      this.fulfilled = true;
    }
  }
}

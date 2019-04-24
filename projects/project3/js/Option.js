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
}

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

  //check for special()
  checkforSpecial() {
    //check if this option calls for any of the special card
    //if so, assign that special card in the proper position
  }

  //option chosen
  updateResource() {
    for (var i = 0; i<6; i++) {
      let rewardIndex = [this.rewards.wolfsbane, this.rewards.food, this.rewards.money, this.rewards.livestock, this.rewards.villager, this.rewards.risk];
      resources[i] = resources[i] - answer[i] + rewardIndex[i];
    }
    console.log("resources = " + resources);
  }
}

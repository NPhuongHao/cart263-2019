class Option {
  // Constructor
  constructor(requirements, rewards, description) {
    this.requirements = requirements;
    this.rewards = rewards;
    this.description = description;
    this.fulfilled = false;
    this.choosable = true;
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
    if (this.rewards.eventSpecial === "debts") {
      console.log("debts for the wolf");
      let $newEvent = $eventSpecial[1];
      events.next2w = new Event($newEvent.id, $newEvent.title, $newEvent.description, $newEvent.options);
      this.rewards.eventSpecial = "";
    }
    if (this.rewards.special == "kill big wolf") {
      gameWin();
    } if (this.rewards.special == "game lose") {
      gameLose();
    }
  }

  //update new resources when an option is chosen
  updateResource() {
    if (this.requirements.any > 0) {
      this.takeRandomcard()
    }
    for (var i = 0; i<6; i++) {
      let rewardIndex = [this.rewards.wolfsbane, this.rewards.food, this.rewards.money, this.rewards.livestock, this.rewards.villager, this.rewards.risk];
      resources[i] = resources[i] - answer[i] + rewardIndex[i];
    }
  }

  //take random cards if player chooses so
  takeRandomcard() {
    //repeat this process 5 times
    for (var i=0; i<5; i++) {
      let t;
      //generate a random t for indicating a random resource type
      t = Math.floor(Math.random()*answer.length);
      //add 1 unit to the corresponding answer
      answer[t] = answer[t] + 1;
    }
  }
}

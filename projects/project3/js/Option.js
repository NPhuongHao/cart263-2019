class Option {
  // Constructor
  constructor(requirements, rewards, description) {
    this.requirements = requirements;
    this.rewards = rewards;
    this.description = description;
    this.fulfilled = false;
    this.choosable = true;
    this.reqAmount = [this.requirements.wolfsbane, this.requirements.food, this.requirements.money, this.requirements.livestock, this.requirements.villager, this.requirements.risk, this.requirements.foodMoney, this.requirements.beastPeople, this.requirements.any];
    this.reqName = ["Wolf's bane", "Food", "Money", "Livestock", "Villager", "Risk", "Food or Money", "Livestock or villager", "Random card"];
    this.rewAmount = [this.rewards.wolfsbane, this.rewards.food, this.rewards.money, this.rewards.livestock, this.rewards.villager, this.rewards.risk];
    this.rewName = ["Wolf's bane", "Food", "Money", "Livestock", "Villager", "Risk"];

  }

  //display options
  display(optionCode) {
    $('#option'+optionCode).append(this.description);
    for (var i = 0; i<this.reqAmount.length; i++) {
      $('.req'+i+'opt'+optionCode).remove();
      if (this.reqAmount[i] > 0) {
          $('#option'+optionCode).append("<div class='req"+i+"opt"+optionCode+"'>"+this.reqName[i]+" needed: "+this.reqAmount[i]+"</div>");
      }
    }

    for (var i = 0; i<this.rewAmount.length; i++) {
      $('.rew'+i+'opt'+optionCode).remove();
      if (this.rewAmount[i] > 0) {
          $('#option'+optionCode).append("<div class='rew"+i+"opt"+optionCode+"'> Get "+this.rewName[i]+": "+this.rewAmount[i]+"</div>");
      }
    }

    $('.warning').remove();
    if (events.current.options[optionCode].warning !== "") {
      $('#option'+optionCode).append("<div class = 'warning' id = 'warning"+optionCode+"'>"+events.current.options[optionCode].warning+"</div>");
    }

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
    if (this.rewards.eventSpecial === "game won") {
      gameOver("won");
      return;
    }
    if (this.rewards.eventSpecial === "game lose") {
      gameOver("lost");
      return;
    }
  }

  //update new resources when an option is chosen
  updateResource() {
    if (this.requirements.any > 0) {
      this.takeRandomcard();
    } else {
      for (var i = 0; i<6; i++) {
        resources[i] = resources[i] - answer[i] + this.rewAmount[i];
      }
    }
  }

  //take random cards if player chooses so
  takeRandomcard() {
    //repeat this process 5 times
    for (var i=0; i<this.requirements.any; i++) {
      let t;
      //generate a random t for indicating a random resource type
      t = Math.floor(Math.random()*answer.length);
      if (resources[t] == 0) {
        i--;
      } else {
        //add 1 unit to the corresponding answer
        answer[t] = answer[t] + 1;
        resources[t] = resources[t] - 1 + this.rewAmount[i];
      }
    }
  }
}

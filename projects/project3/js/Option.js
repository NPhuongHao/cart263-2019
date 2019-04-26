/*****************

This is the Option class

It indicates each option's requirements, rewards and status.
Functions: Display the option. Check the option's status. Check for special event cards. Update on the player's resources.

******************/


class Option {
  // Constructor
  constructor(requirements, rewards, description) {
    //requirements and rewards
    this.requirements = requirements;
    this.rewards = rewards;
    //the option's description
    this.description = description;
    //if the option is fulfilled or not
    this.fulfilled = false;
    //if player can choose this option or not
    this.choosable = true;
    //store the requirements' and rewards' values in arrays for better access
    this.reqAmount = [this.requirements.wolfsbane, this.requirements.food, this.requirements.money, this.requirements.livestock, this.requirements.villager, this.requirements.risk, this.requirements.foodMoney, this.requirements.beastPeople, this.requirements.any];
    this.reqName = ["Wolf's bane", "Food", "Money", "Livestock", "Villager", "Risk", "Food or Money", "Livestock or villager", "Random card"];
    this.rewAmount = [this.rewards.wolfsbane, this.rewards.food, this.rewards.money, this.rewards.livestock, this.rewards.villager, this.rewards.risk];
    this.rewName = ["Wolf's bane", "Food", "Money", "Livestock", "Villager", "Risk"];

  }

  //display options()
  //
  //display an option's description requiremetns, rewards, warning
  display(optionCode) {
    //display the option's description
    $('#option'+optionCode).append(this.description);

    //display the option's requirements
    for (var i = 0; i<this.reqAmount.length; i++) {
      //remove the old requirements
      $('.req'+i+'opt'+optionCode).remove();
      //Only display if the requirement in question is >0
      if (this.reqAmount[i] > 0) {
          $('#option'+optionCode).append("<div class='modify req"+i+"opt"+optionCode+"'>"+this.reqName[i]+" needed: "+this.reqAmount[i]+"</div>");
      }
    }

    //same with rewards
    for (var i = 0; i<this.rewAmount.length; i++) {
      $('.rew'+i+'opt'+optionCode).remove();
      if (this.rewAmount[i] > 0) {
          $('#option'+optionCode).append("<div class='modify rew"+i+"opt"+optionCode+"'> Get "+this.rewName[i]+": "+this.rewAmount[i]+"</div>");
      }
    }

    //display the option's warning
    $('.warning').remove();
    if (events.current.options[optionCode].warning !== "") {
      //if the warning is not null
      $('#option'+optionCode).append("<div class = 'warning' id = 'warning"+optionCode+"'>"+events.current.options[optionCode].warning+"</div>");
    }

  }

  //checkAnswer()
  //
  //check if the option is fulfilled
  checkOption() {
    if (this.requirements.check()) {
      //if all the requirements are satisfied
      this.fulfilled = true;
    }
  }

  //check for special()
  //
  //check if this option calls for any of the special card
  checkforSpecial() {
    //if so, assign that special card in the proper position
    if (this.rewards.eventSpecial === "debts") {
      //trigger the special event "Debts for the wolf"
      let $newEvent = $eventSpecial[1];
      //create a new event in the 'next 2 weeks' position
      events.next2w = new Event($newEvent.id, $newEvent.title, $newEvent.description, $newEvent.options);
      //reset the eventspecial to null
      this.rewards.eventSpecial = "";
    }
    //If the special event = game won
    if (this.rewards.eventSpecial === "game won") {
      gameOver("won");
      return;
    }
    //If the special event = game lost
    if (this.rewards.eventSpecial === "game lose") {
      gameOver("lost");
      return;
    }
  }

  //updateResource()
  //
  //update new resources when an option is chosen
  updateResource() {
    //if the requirements consist of random cards
    if (this.requirements.any > 0) {
      this.takeRandomcard();
    } else {
      //else, add the rewards and substract the resources given in answer
      for (var i = 0; i<6; i++) {
        resources[i] = resources[i] - answer[i] + this.rewAmount[i];
      }
    }
    console.log("resources " + resources);
  }

  //takeRandomcard()
  //
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

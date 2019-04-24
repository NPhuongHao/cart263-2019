class Rewards {
  // Constructor
  constructor(currentEvent, option) {
    this.currentEvent = currentEvent;
    this.option = option;
    this.wolfsbane = 0;
    this.food = 0;
    this.money = 0;
    this.livestock = 0;
    this.villager = 0;
    this.risk = 0;
    this.eventSpecial;
  }

  //set amount
  update() {

    //if the current event is a Gain event
    //Gain: good week
    if (this.currentEvent === "good week") {
      // {"description":"Keep the coins"},
      if (this.option == 0) {
        this.money = 2;
      }
      // {"description":"Buy more food"},
      if (this.option == 1) {
        this.food = 2;
      }
      // {"description":"Invest on livestock"}
      if (this.option == 2) {
        this.livestock = 2;
      }
    }
    //Gain: collect
    if (this.currentEvent === "collect") {
      // {"description":"Collect money"},
      if (this.option == 0) {
        this.money = 1;
      }
      // {"description":"Add food in your storage"},
      if (this.option == 1) {
        this.food = 1;
      }
      // {"description":"Let them keep their stuffs for now"}
    }
    //Gain: Harvest
    if (this.currentEvent === "harvest") {
      // {"description":"Farm intensively"},
      if (this.option == 0) {
        this.food = 3;
      }
      // {"description":"Farm moderately"},
      if (this.option == 1) {
        this.food = 1;
      }
      // {"description":"Harvesting is not our priority"}
    }
    //Gain: Breed
    if (this.currentEvent === "breeding") {
      // {"description":"Encourage the breeding"},
      if (this.option == 0) {
        this.livestock = 3;
      }
      // {"description":"Breed moderately"},
      if (this.option == 1) {
        this.livestock = 1;
      }
      // {"description":"We don't need more animals"}
    }

    //if the current event is a Trade event
    //Trade: generous merchant
    if (this.currentEvent === "generous merchant") {
      if (this.option == 0) {
        // option 0: {"description": "Sell the food"},
        this.money = 2;
      } else if (this.option == 1) {
        // option 1: {"description": "A coin for more supplies"}
        this.food = 2;
      }
      // option 3: {"description": "No need for trading right now"}
    }
    //Trade: difficult merchant
    if (this.currentEvent === "difficult merchant") {
      if (this.option == 0) {
        // 0: {"description": "Sell your 'mediocre' food"}
        this.money = 1;
      } else if (this.option == 1) {
        // 1: {"description": "Buy her 'good' supplies"}
        this.food = 1;
      }
      // 3: {"description": "No need for trading right now"}
    }
    //Trade: farmer
    if (this.currentEvent === "farmer") {
      if (this.option == 0) {
        // 0: {"description": "Buy a lot of livestock"}
        this.livestock = 2;
      } else if (this.option == 1) {
        // 1: {"description": "Just one more beast in your stable"},
        this.livestock = 1;
      }
      // 3: {"description": "No need for trading right now"}
    }
    //Trade: witch
    if (this.currentEvent === "witch") {
      if (this.option == 0) {
        //{"description": "Use them on our livestock"}
        this.livestock = 2;
      } else if (this.option == 1) {
        //{"description": "The food might taste a bit funny later"}
        this.food = 2;
      }
    }
    //Trade: local marriage
    if (this.currentEvent === "local marriage") {
      if (this.option == 0) {
        //{"description": "Blessing for a kid"}
        this.villager = 1;
      } else if (this.option == 1) {
        //{"description": "Happiness is enough"},
        this.food = 1;
        this.money = 1;
      }
    }

    //if the current event is a Loss event
    //Loss: call to arms
    if (this.currentEvent === "call to arms") {
      if (this.option == 2) {
        // {"description":"'We still have to fight the wolfs'"}
        this.risk = 1;
      }


    }
    //Loss: wolf's demands
    if (this.currentEvent === "wolf's demands") {
      if (this.option == 2) {
        // {"description": "There is nothing to offer", "warning": "Insert 'Debts for the Wolf' into the next events"}
        this.eventSpecial = "debts";
        this.risk = 1;
      }
    }

    //if the current event is a wolfsbane event
    if (this.currentEvent === "wolf's bane") {
      if (this.option == 0) {
        // {"description": "Buy them from the Witch"}
        this.wolfsbane = 1;
      } if (this.option == 1) {
        //{"description": "Make a risky trip into the woods"},
        this.wolfsbane = 1;
        this.risk = 4;
      }
    }

    //if the current event is a special event
    //Special: cross marriage
    if (this.currentEvent === "cross-town marriage") {
      // {"description": "Welcome the new spouse"},
      if (this.option == 0) {
        this.villager = 1;
      }
      // {"description": "Send your blessing, but the couple stay separated"},
      // {"description": "Tell the couple to settle elsewhere"}
    }
    //Special: wolf's debts
    if (this.currentEvent === "wolf's debts") {
      // {"description": "Offer livestock"},
      // {"description": "Offer villagers"},
      // {"description": "There is nothing to offer, still", "warning": "Insert 'Debts for the Wolf' into the next events"}
      if (this.option == 2) {
        this.risk = 2;
        this.eventSpecial = "debts";
      }
     }
    //Special: wolf attack
    if (this.currentEvent === "wolf attack") {
      // {"description": "Let them kill the livestock"},
      // {"description": "Let them kill some villagers"},
      // {"description": "Succumb to their claws", "warning": "The wolfs will kill you"}
      if (this.option == 2) {
        this.eventSpecial = "game lose";
      }
    }
    //Special: famine
    if (this.currentEvent === "famine") {
      // {"description": "Buy from the neighbouring village"},
      if (this.option == 0) {
        this.food = 3;
      }
      // {"description": "There's still the livestock"},
      if (this.option == 1) {
        this.food = 2;
      }
      // {"description": "There're still the...."}
      if (this.option == 2) {
        this.food = 2;
      }
    }
    //Special: greed
    if (this.currentEvent === "greed") {
      // {"description": "Send some to The Wolf"},
      // {"description": ""},
      // {"description": "Follow the law of nature", "warning": "Discard 5 random cards"}
    }
    //Special: desperation
    if (this.currentEvent === "desperation") {
      // {"description": "Scavenge"},
      if (this.option == 0) {
        this.food = 1;
        this.money = 1;
        this.livestock = 1;
        this.villager = 1;
        this.risk = 1;
      }
      // {"description": "You will owe the Wolf for this favor", "warning": "Insert 'Debts for the Wolf' into the next events"},
      if (this.option == 1) {
        this.food = 2;
        this.money = 2;
        this.livestock = 2;
        this.villager = 2;
        this.eventSpecial = "debts";
      }
      // {"description": "....Better retire and flee", "warning": "Abandon what remains of your village"}
    }
    //Special : BIG WOLF
    if (this.currentEvent === "BIG WOLF") {
      // {"description": "Send it your last gift", "warning": "Kill the Big Wolf"},
      if (this.option == 0) {
        this.eventSpecial = "kill big wolf"
      }
      // {"description": "Sustain the contract for now", "warning": "Continue the contract"},
      // {"description": "Beg it to spare your village this time", "warning": "Continue the contract"}
      if (this.option == 2) {
        this.risk = 3;
      }
    }
  }
}

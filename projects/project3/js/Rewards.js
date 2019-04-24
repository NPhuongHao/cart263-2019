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
        this.eventSpecial == "debts";
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
        this.woflsbane = 1;
        this.risk = 4;
      }
    }
  }
}

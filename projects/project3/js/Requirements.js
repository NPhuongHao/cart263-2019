class Requirements {
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
    //mixed requirements (for an 'xy' element player can place whether x or y)
    //food or money
    this.foodMoney = 0;
  }

  //set amount
  update() {
    //if the current event is a Trade event
    //Trade: generous merchant
    if (this.currentEvent === "generous merchant") {
      if (this.option == 0) {
        // option 0: {"description": "Sell the food"},
        this.food = 1;
      } else if (this.option == 1) {
        // option 1: {"description": "A coin for more supplies"}
        this.money = 1;
      }
      // option 3: {"description": "No need for trading right now"}
    }
    //Trade: difficult merchant
    if (this.currentEvent === "difficult merchant") {
      if (this.option == 0) {
        // 0: {"description": "Sell your 'mediocre' food"}
        this.food = 2;
      } else if (this.option == 1) {
        // 1: {"description": "Buy her 'good' supplies"}
        this.money = 2;
      }
      // 3: {"description": "No need for trading right now"}
    }
    //Trade: farmer
    if (this.currentEvent === "farmer") {
      if (this.option == 0) {
        // 0: {"description": "Buy a lot of livestock"}
        this.money = 2;
      } else if (this.option == 1) {
        // 1: {"description": "Just one more beast in your stable"},
        this.money = 1;
      }
      // 3: {"description": "No need for trading right now"}
    }
    //Trade: witch
    if (this.currentEvent === "witch") {
      if (this.option == 0) {
        //{"description": "Use them on our livestock"}
        this.livestock = 1;
        this.money = 1;
      } else if (this.option == 1) {
        //{"description": "The food might taste a bit funny later"}
        this.food = 1;
        this.money = 1;
      }
    }
    //Trade: local marriage
    if (this.currentEvent === "local marriage") {
      if (this.option == 0) {
        //{"description": "Blessing for a kid"}
        this.foodMoney = 2;
      } else if (this.option == 1) {
        //{"description": "Happiness is enough"},
        this.foodMoney = 1;
      }
    }
    //Trade: lost puppy
    if (this.currentEvent === "lost puppy") {
      if (this.option == 0) {
        // {"description": "Send the pup back, very carefully"}
        if (resources[5] > 0) {
          this.risk = 1;
        }
      }
    }

    //if the current event is a Loss event
    //Loss: call to arms
    if (this.currentEvent === "call to arms") {
      if (this.option == 0) {
        // {"description":"Fulfill the war bonds"},
        this.foodMoney = 2;
      } else if (this.option == 1) {
        //{"description":"Your people are ready to conscript"},
        this.villager = 2;
      }


    }
    //Loss: wolf's demands
    if (this.currentEvent === "wolf's demands") {
      if (this.option == 0) {
        // {"description": "Offer livestock"}
        this.livestock = 2;
      } else if (this.option == 1) {
        //{"description": "Offer a villager"}
        this.villager = 1;
      }
    }
    //Loss: infestation
    if (this.currentEvent === "infestation") {
      if (this.option = 0) {
        // {"description": "Salvage the rest"}
        if (0 < resources[1] < 3) {
          //food required = 1 if player's food resource is too low
          this.food = 1;
        } else if (resources[0] == 0) {
          //ask for no food if player doesn't have any food card
          this.food = 0;
        } else {
          this.food = Math.floor(2/3*resources[1]);
        }
      } else if (this.option == 1) {
        // {"description": "Hire a professional"},
        this.food = 1;
        this.money = 2;
      } else if (this.option == 2) {
        // {"description": "Nothing that cannot be eaten"}
        if (0 < resources[4] < 3) {
          this.villager = 1;
        } else if (resources[4] == 0) {
          //ask for no villager if player doesn't have any villager card
          this.villager = 0;
        }else {
          this.villager = Math.floor(2/3*resources[4]);
        }
      }
    }

    //if the current event is a wolfsbane event
    if (this.currentEvent === "wolf's bane") {
      if (this.option == 0) {
        // {"description": "Buy them from the Witch"}
        this.money = 5;
      } if (this.option == 1) {
        //{"description": "Make a risky trip into the woods"},
        this.villager = 1;
      }
    }
  }

  //check Requirements
  check() {
    console.log("startchecking");
    if (this.foodMoney == 0) {
      console.log("requirementcheckd")
      if (answer [0] == this.wolfsbane) {
        console.log('1');
        if (answer[1] == this.food) {
          console.log('2');
          if (answer[2] == this.money) {
            console.log('3');
            if (answer[3] == this.livestock) {
              console.log('4');
              if (answer[4] == this.villager) {
                console.log('5')
                if (answer[5] == this.risk) {
                  console.log("requirementchecked");
                  return true;

                }
              }
            }
          }
        }
      }
    }
    else if (this.foodMoney !== 0) {
      console.log("requirementcheckd2")
      if (answer[1] + answer[2] == this.foodMoney) {
        if (answer [0] == this.wolfsbane) {
          if (answer[3] == this.livestock) {
            if (answer[4] == this.villager) {
              if (answer[5] == this.risk) {
                console.log("requirementchecked2");
                return true;

              }
            }
          }
        }
      }
    }
  }
}

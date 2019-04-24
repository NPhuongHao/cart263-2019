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
    //livestock or villager
    this.beastPeople = 0;
    //any of the cards
    this.any = 0;
    //player can choose the according option or not
    this.choosable = true;
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
      if (this.option == 0) {
        // {"description": "Salvage the rest"}
        if (0 < resources[1] < 3) {
          //food required = 1 if player's food resource is too low
          this.food = 1;
        } else if (resources[1] == 0) {
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
      console.log(this);
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

    //if the current event is a special event
    //Special: cross marriage
    if (this.currentEvent === "cross-town marriage") {
      // {"description": "Welcome the new spouse"},
      if (this.option == 0) {
        this.foodMoney = 2;
      }
      // {"description": "Send your blessing, but the couple stay separated"},
      if (this.option == 1) {
        this.foodMoney = 1;
      }
      // {"description": "Tell the couple to settle elsewhere"}
      if (this.option == 2) {
        this.villager = 1;
      }
    }
    //Special: wolf's debts
    if (this.currentEvent === "wolf's debts") {
      // {"description": "Offer livestock"},
      if (this.option == 0) {
        this.livestock = 3;
        if (resources[5] > 0) {
          this.risk = 1;
        }
      }
      // {"description": "Offer villagers"},
      if (this.option == 1) {
        this.villager = 2;
        if (resources[5] > 0) {
          this.risk = 1;
        }
      }
      // {"description": "There is nothing to offer, still", "warning": "Insert 'Debts for the Wolf' into the next events"}
    }
    //Special: wolf attack
    if (this.currentEvent === "wolf attack") {
      // {"description": "Let them kill the livestock"},
      if (this.option == 0) {
        this.livestock = 3;
        this.risk = range(resources[5],0,3);
      }
      // {"description": "Let them kill some villagers"},
      if (this.option == 1) {
        this.villager = 2;
        this.risk = range(resources[5],0,3);
      }
      // {"description": "Succumb to their claws", "warning": "The wolfs will kill you"}
    }
    //Special: famine
    if (this.currentEvent === "famine") {
      // {"description": "Buy from the neighbouring village"},
      if (this.option == 0) {
        this.money = 3;
      }
      // {"description": "There's still the livestock"},
      if (this.option == 1) {
        this.livestock = 2;
      }
      // {"description": "Starve to death"}
      if (this.option == 2) {
      }
    }
    //Special: greed
    if (this.currentEvent === "greed") {
      // {"description": "Send some to The Wolf"},
      if (this.option == 0) {
        this.livestock = 2;
        this.villager = 2;
        this.food = 1;
      }
      // {"description": ""},
      if (this.option == 1) {
        this.choosable = false;
      }
      // {"description": "Follow the law of nature", "warning": "Discard 5 random cards"}
      if (this.option == 2) {
        this.any = 5;
      }
    }
    //Special: desperation
    if (this.currentEvent === "desperation") {
      // {"description": "Scavenge"},
      // {"description": "You will owe the Wolf for this favor", "warning": "Insert 'Debts for the Wolf' into the next events"},
      // {"description": "....Better retire and flee", "warning": "Abandon what remains of your village"}
    }
    //Special : BIG WOLF
    if (this.currentEvent === "BIG WOLF") {
      // {"description": "Send it your last gift", "warning": "Kill the Big Wolf"},
      if (this.option == 0) {
        this.beastPeople = 4;
        this.wolfsbane = 1;
      }
      // {"description": "Sustain the contract for now", "warning": "Continue the contract"},
      if (this.option == 1) {
        this.beastPeople = 4;
      }
      // {"description": "Beg it to spare your village this time", "warning": "Continue the contract"}
      if (this.option == 2) {
        this.any = 1;
      }
    }
  }

  //check Requirements
  check() {
    //if the chosen option is un-choos-able
    //ex: greed's 2nd option
    if (this.choosable == false) {
      return false;
    }
    //if there's no mixed requirement
    else if (this.foodMoney == 0) {
      if (this.beastPeople == 0) {
        if (this.any == 0) {
          if (answer [0] == this.wolfsbane) {
            if (answer[1] == this.food) {
              if (answer[2] == this.money) {
                if (answer[3] == this.livestock) {
                  if (answer[4] == this.villager) {
                    if (answer[5] == this.risk) {
                      return true;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    //if there's the foodMoney requirement
    else if (this.foodMoney !== 0) {
      if (answer[1] + answer[2] == this.foodMoney) {
        if (answer [0] == this.wolfsbane) {
          if (answer[3] == this.livestock) {
            if (answer[4] == this.villager) {
              if (answer[5] == this.risk) {
                return true;

              }
            }
          }
        }
      }
    }
    //if there's the beastPeople requirement
    else if (this.beastPeople !== 0) {
      if (answer[3] + answer[4] == this.beastPeople) {
        if (answer [0] == this.wolfsbane) {
          if (answer[1] == this.food) {
            if (answer[2] == this.money) {
              if (answer[5] == this.risk) {
                return true;

              }
            }
          }
        }
      }
    }
    //if there's the 'any' requirement
    if (this.any > 0) {
      console.log('too much');
      let match = true;
      //The 'any' requirement takes card away randomly, player doesn't give their own answer
      for (var i = 0; i<NUM_RESOURCES; i++) {
        if (answer[i] > 0) {
          match = false;
        }
      }
      if (match === true) {
        return true;
      }
    }
  }

}

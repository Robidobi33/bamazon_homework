var mySQL = require("mysql");
var inquirer = require("inquirer");

var connection = mySQL.createConnection({
    host:"localhost",
    port: 3306, 
    user:"root", 
    password: "root",
    database:"bamazonInv_bd"
});

connection.connect(function(err){
    if(err) throw err;
    //listItems();
    start();
});

function start(){
    inquirer.prompt([
        {
            name: "selection",
            message: "What would you like to do?",
            choices: ["Buy Item", "Add to Inventory"],
            type: "list"
        }
    ]).then(function(pick){
        console.log("----------------------------------------------------------------");
        if(pick.selection === "Buy Item"){
            listItems();
            //console.log(pick.selection);
        }else if(pick.selection === "Add to Inventory"){
            //console.log(pick.selection);
            addStock();
        }
        
    });
    
}

function listItems(){
    connection.query("SELECT * FROM products", function(err, res){
        for(i=0;i<res.length;i++){
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | "+ "$" + res[i].price + " | " + res[i].stock_quantity);
            if(err)throw err;
        }
        
        console.log("----------------------------------------------------------------");
   
        inquirer.prompt([
            {
                name: "choice",
                type: "input",
                message: "Please select the item ID you would like to buy"
            },

            
        ]).then(function(answer){

            var chosenItem;
            chosenItem = res[(answer.choice)-1];
            console.log(chosenItem.product_name + " for $" + chosenItem.price + "\n There are " + chosenItem.stock_quantity + " in stock");   

            inquirer.prompt([
                {
                    name: "itemQuantity",
                    message:"How many would you like to buy?",
                    type: "input"
                }
            ]).then(function(amount){
                var currentStock;
                var totalPrice;
               
                currentStock = chosenItem.stock_quantity;
                totalPrice = amount.itemQuantity * chosenItem.price;
                if(amount.itemQuantity > currentStock){
                    console.log("Your order exceeds whats in stock, cannot complete order.");
                    newOrder();

                }else{
                    console.log("Your order of " + amount.itemQuantity + " " + chosenItem.product_name + " will cost " + "$" + totalPrice.toFixed(2));
                    currentStock = currentStock - amount.itemQuantity;
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                       [
                           {
                               stock_quantity: currentStock
                           },
                           {
                                item_id: answer.choice
                           }
                       ] 
                    );
                    console.log(currentStock + " left in stock");
                    newOrder();
                }

            });

           
        });
          
});


    function newOrder(){
        
        inquirer.prompt([
            {
                name: "createOrder",
                message: "Would you like to place a new order? y/n",
                type: "confirm"
            }
        ]).then(function(confirmation){
            if (confirmation.confirm === true){
               console.log("\n----------------------------------------------------------------");
                listItems();
            }
            else{console.log("Have a great day!");}
            start();
        });
    }
}//end listItems()
function addStock(){
    connection.query("SELECT * FROM products", function(err, res){
        for(i=0;i<res.length;i++){
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | "+ "$" + res[i].price + " | " + res[i].stock_quantity);
            if(err)throw err;
        }
        console.log("----------------------------------------------------------------");
    inquirer.prompt([
        {
            name: "item",
            message: "What item would you like to restock?",
            type: "input"
        }
    ]).then(function(choice){
        selectedItem = res[(choice.item)-1];
        console.log("You have selected " + selectedItem.product_name + ", there are " + selectedItem.stock_quantity + " in stock.");
        inquirer.prompt([
            {
                name: "itemNum",
                message: "How many items would you like to add to inventory?",
                type: "input"
            }
            
        ]).then(function(newAmount){
            //var inventory;
            var newInventory;
            newInventory = selectedItem.stock_quantity;
            newInventory = newInventory + parseInt(newAmount.itemNum);
            connection.query(
            "UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: newInventory
                },
                {
                    item_id: choice.item
                }
            ] 
            );
            console.log("There are now " + newInventory + " " + selectedItem.product_name + " in stock.");
            start();
        });
    });
});
}


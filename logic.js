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
    listItems();
});

function listItems(){
    connection.query("SELECT * FROM products", function(err, res){
        for(i=0;i<res.length;i++){
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
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
                    console.log("The amount exceeds whats in stock, cannot complete your order.");
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
            type: "input"
        }
    ]).then(function(confirmation){
        if (confirmation.createOrder === "y"){
            console.log("-----------------------------------------------");
            listItems();
        }
        else{console.log("Have a great day!");}
    });
}

}



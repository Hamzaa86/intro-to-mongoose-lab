require('dotenv').config();
const mongoose = require("mongoose");
const prompt = require('prompt-sync')();
const Customer = require("./model/customer");
const connect = async () =>
{
    await mongoose.connect(process.env.MONGODB_URI);
}
const username = prompt('What is your name?');
console.log(`Your username: ${username}`);
const askChoice = ()=>
{
    console.log("\n What would you like to do? \n",
        "1. Create a customer?\n",
        "2. View All Customers?\n",
        "3. Update Customer Info?\n",
        "4. Delete a customer?\n",
        "5. Quit?\n"
    );
    const selection = prompt("Put the corresponding number of the action you want to do: ");
    return parseInt(selection);
}
const createCustomer= async ()=>
{
    const uid = prompt("Give user a unique id: ")
    const name = prompt("Customer Name: ");
    const age = prompt("Customer Age: ");
    const customer = await Customer.create({uid, name, age});
    console.log("Customer added with details:", customer);
}
const viewCustomers = async () =>
{
    const customers = await Customer.find();
    console.log("Customer List: ", customers);
}
const updateCustomer = async () =>
{
    const uid = parseInt(prompt("Enter the Uid of the customer you want to update: "));
    const name = prompt("Enter the New Name for the Customer: ");
    const age = prompt("Enter the new age for the Customer: ");
    const updatedCustomer = await Customer.findOneAndUpdate({uid}, {name, age});
    console.log("Customer Updated!");
}
const deleteCustomer = async () =>
{
    const uid = prompt("Enter the Uid of the Customer you want to delete: ");
    const deletedCustomer = await Customer.findOneAndDelete({uid});
    console.log("Customer Deleted!", deletedCustomer)
}
const choices = async () =>
{
    let choice = askChoice()
    console.log(choice);
    switch(choice)
    {
        case 1:
            await createCustomer();
            break;
        case 2:
            await viewCustomers();
            break;
        case 3:
            await updateCustomer();
            break;
        case 4:
            await deleteCustomer();
            break;
        case 5:
            console.log("Byee");
            mongoose.connection.close();
            break;
        default:
            console.log("Incorrect Choice.");
    }
}
choices();
// createCustomer();
// viewCustomers();
// updateCustomer();
// deleteCustomer();
connect();
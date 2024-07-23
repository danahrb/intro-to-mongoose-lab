require('dotenv').config();

//DATABASE 
require('./config/database');
const Customer = require("./models/customer.js");

const prompt = require('prompt-sync')();

console.log('Welcome to the CRM');

// const username = prompt('What is your name? ');

// console.log(`Your name is ${username}`);

const Menu = async () => {
    console.log('What would you like to do?');
    console.log('1. Create a new customer');
    console.log('2. View all customers');
    console.log('3. Update a customer');
    console.log('4. Delete a customer');
    console.log('5. Quit');

    const choice = prompt(' Number of action to run: ');

switch (choice) {
    case '1':
       createCustomer();
      break;
    case '2':
       viewCustomers();
      break;
    case '3':
       updateCustomer();
      break;
    case '4':
       deleteCustomer();
      break;
    case '5':
        console.log('Exiting..');
      return;
    default:{
      console.log('Invalid. Please try again.');
      Menu();}
  }
}

const createCustomer= async() =>{
    const name = prompt('Enter the customer name: ');
    const age = prompt('Enter the customer age: ');
  
    const customer = new Customer({ name, age });
    await customer.save();

    console.log('Customer created successfully.');
}

const viewCustomers= async() =>{
    const customers = await Customer.find({});
      console.log('Customers:');
      customers.forEach((customer) => {
        console.log(`id: ${customer._id} --  Name: ${customer.name}, Age: ${customer.age}`);
      });
    } 

const updateCustomer= async() =>{
    const customers = await Customer.find({});
   
  console.log('This is the list of customers:');
  customers.forEach((customer) => {
    console.log(`id: ${customer._id} --  Name: ${customer.name}, Age: ${customer.age}`);
  });

  const customerId = prompt('Enter the id of the customer to update:');
  const customer = await Customer.findById(customerId);

  const newName = prompt(`What is the customers new name? (current: ${customer.name})`);
  const newAge = prompt(`What is the customers new age? (current: ${customer.age})`);
   
  customer.name = newName;
   customer.age = newAge;

  await customer.save();

  console.log('Updated Customers List.');
  customers.forEach((customer) => {
    console.log(`id: ${customer._id} --  Name: ${customer.name}, Age: ${customer.age}`);
  });
}

const deleteCustomer= async() =>{
    const customers = await Customer.find({});
    console.log('This is the list of customers:');
    customers.forEach((customer) => {
      console.log(`id: ${customer._id} --  Name: ${customer.name}, Age: ${customer.age}`);
    });

    const customerId = prompt('Enter the id of the customer to delete: ');
    await Customer.findByIdAndDelete(customerId);
    console.log('Customer deleted successfully.');
    
    console.log('Updated Customers List.');
    customers.forEach((customer) => {
      console.log(`id: ${customer._id} --  Name: ${customer.name}, Age: ${customer.age}`);
    });
  }

Menu();

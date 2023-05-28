/*
Prototypal inheritance
In programming, we often want to take something and extend it.

For instance, we have a user object with its properties and methods, and want to make admin and guest as slightly modified variants of it. 
We’d like to reuse what we have in user, not copy/reimplement its methods, just build a new object on top of it.

Prototypal inheritance is a language feature that helps in that.

[[Prototype]]
In JavaScript, objects have a special hidden property [[Prototype]] (as named in the specification), that is either null or references another object. 
That object is called “a prototype”:

When we read a property from object, and it’s missing, JavaScript automatically takes it from the prototype. In programming, this is called “prototypal inheritance”. And soon we’ll study many examples of such inheritance, as well as cooler language features built upon it.

The property [[Prototype]] is internal and hidden, but there are many ways to set it.

One of them is to use the special name __proto__, like this:



*/

const { test } = require("vnm");

let animal = {
    eats: true
};
let rabbit = {
    jumps: true
};


rabbit.__proto__ = animal; // sets rabbit.[[Prototype]] = animal

// Now if we read a property from rabbit, and it’s missing, JavaScript will automatically take it from animal.

// For instance:


// we can find both properties in rabbit now:
console.log( rabbit.eats ); // true (**)
console.log( rabbit.jumps ); // true


/*
Here the line (*) sets animal to be the prototype of rabbit.

Then, when alert tries to read property rabbit.eats (**), it’s not in rabbit, so JavaScript follows the [[Prototype]]
reference and finds it in animal (look from the bottom up):

Here we can say that "animal is the prototype of rabbit" or "rabbit prototypically inherits from animal".

So if animal has a lot of useful properties and methods, then they become automatically available in rabbit. Such properties are called “inherited”.

If we have a method in animal, it can be called on rabbit:


*/

let animal1 = {
    eats: true,
    walk() {
      console.log("Animal walk");
    }
  };
  
let rabbit1 = {
    jumps: true,
    __proto__: animal1
};
  
// walk is taken from the prototype
rabbit1.walk(); // Animal walk


// The prototype chain can be longer:

  
let longEar= {
    earLength: 10,
    __proto__: rabbit1
};

  
// walk is taken from the prototype chain
longEar.walk(); // Animal walk
console.log(longEar.jumps); // true (from rabbit)



/*
Now if we read something from longEar, and it’s missing, JavaScript will look for it in rabbit, and then in animal.

There are only two limitations:

The references can’t go in circles. JavaScript will throw an error if we try to assign __proto__ in a circle.
The value of __proto__ can be either an object or null. Other types are ignored.
Also it may be obvious, but still: there can be only one [[Prototype]]. An object may not inherit from two others.


__proto__ is a historical getter/setter for [[Prototype]]
It’s a common mistake of novice developers not to know the difference between these two.

Please note that __proto__ is not the same as the internal [[Prototype]] property. It’s a getter/setter for [[Prototype]]. Later we’ll see situations where it matters, for now let’s just keep it in mind, as we build our understanding of JavaScript language.

The __proto__ property is a bit outdated. It exists for historical reasons, modern JavaScript suggests that we should use Object.getPrototypeOf/Object.setPrototypeOf functions instead that get/set the prototype. We’ll also cover these functions later.

By the specification, __proto__ must only be supported by browsers. In fact though, all environments including server-side support __proto__, so we’re quite safe using it.

As the __proto__ notation is a bit more intuitively obvious, we use it in the examples.



*/
animal.prototype = { } // we did this because it was referecing to null 
animal.prototype.run = function(){console.log("Animal runs")}
console.log(rabbit.prototype) // undefined 
console.log(animal.prototype);


function test1 (){
    this.name= ' test  function'
}

console.log('prortype of test1 function', test1.prototype) // u can see here we got emoty ddictionary in prototype

function test2 (){

}

console.log('prortype of test2 function', test2.prototype) // u can see here we got emoty ddictionary in prototype

// So what is difference between prototype and __proto__

/*
prototype is a property of a Function object. It is the prototype of objects constructed by that function.

__proto__ is an internal property of an object, pointing to its prototype. Current standards provide an equivalent Object.getPrototypeOf(obj) method, though the de facto standard __proto__ is quicker.

You can find instanceof relationships by comparing a function's prototype to an object's __proto__ chain, and you can break these relationships by changing prototype.

*/


function Point(x, y) {
    this.x = x;
    this.y = y;
}

var myPoint = new Point();

// the following are all true
console.log(myPoint.__proto__ == Point.prototype, )
console.log(myPoint.__proto__.__proto__ == Object.prototype, myPoint.__proto__, myPoint.__proto__.__proto__ )
console.log(myPoint instanceof Point);
console.log(myPoint instanceof Object);


console.log("PROTO OF ANIMAL", animal.__proto__);


// --------------------------------------------------------------------------

console.log("---------------------MAIN EXPLANATION------------------------------------------------")

function Person(fName, lName){
    this.firstName = fName;
    this.lastName = lName;
}

const person1 = new Person('Arpan', 'Sahu');
const person2 = new Person('Deep', 'tripathi');

person1.getFullName = function(){
    console.log(this.firstName + ' ' + this.lastName);
}

person1.getFullName();
// person2.getFullName(); this throws an error because getFullName is local to person1 only 

/**
 this is where prototype comes into pricture
 every js function have a property called prototype that points to an object. we can use that prototype object to determine all our sharable properties
 */

console.log("Prototype", Person.prototype)
Person.prototype.getFullName1 = function(){
    console.log(this.firstName + ' ' + this.lastName);
}
console.log("Prototype", Person.prototype)

person1.getFullName1();
person2.getFullName1();


// PROTOTYPAL INHERTANCE

function SuperHero(fName, lName){
    // this = {} when invoked using new 
    Person.call(this, fName, lName);
    this.isSuperHero = true;
}

console.log("Protptype of SuperHero", SuperHero.prototype);
let t = new SuperHero('shakti', 'man')
console.log("Prototype of SuperHero instance ", t.constructor.prototype, t.prototype);

SuperHero.prototype.fightCrime = function(){
    console.log("Figthing Crime");
}



SuperHero.prototype = Object.create(Person.prototype);

const superhero1 = new SuperHero('Bat', 'Man')

superhero1.getFullName1();


// although right now js thinks superhero is created form person

SuperHero.prototype.constructor = SuperHero

superhero1.getFullName1();


console.log('-------------------------Writing doesn’t use prototype--------------------------------')
// Writing doesn’t use prototype
// The prototype is only used for reading properties.

// Write/delete operations work directly with the object.

// In the example below, we assign its own walk method to rabbit:

let animal3 = {
    eats: true,
    walk() {
    /* this method won't be used by rabbit */
    }
};
  
let rabbit3 = {
    __proto__: animal
};

rabbit3.walk = function() {
    console.log("Rabbit! Bounce-bounce!");
};

rabbit3.walk(); // Rabbit! Bounce-bounce!

// From now on, rabbit.walk() call finds the method immediately in the object and executes it, without using the prototype:

// Accessor properties are an exception, as assignment is handled by a setter function. So writing to such a property is actually the same as calling a function.

// For that reason admin.fullName works correctly in the code below:


let user = {
    name: "John",
    surname: "Smith",
  
    set fullName(value) {
      [this.name, this.surname] = value.split(" ");
    },
  
    get fullName() {
      return `${this.name} ${this.surname}`;
    }
  };
  
  let admin = {
    __proto__: user,
    isAdmin: true
  };
  
  console.log(admin.fullName); // John Smith (*)
  
  // setter triggers!
  admin.fullName = "Alice Cooper"; // (**)
  
  console.log(admin.fullName); // Alice Cooper, state of admin modified
  console.log(user.fullName); // John Smith, state of user protected


/*

The value of “this”
An interesting question may arise in the example above: what’s the value of this inside set fullName(value)? Where are the properties this.name and this.surname written: into user or admin?

The answer is simple: this is not affected by prototypes at all.

No matter where the method is found: in an object or its prototype. In a method call, this is always the object before the dot.

So, the setter call admin.fullName= uses admin as this, not user.

That is actually a super-important thing, because we may have a big object with many methods, and have objects that inherit from it. And when the inheriting objects run the inherited methods, they will modify only their own states, not the state of the big object.

For instance, here animal represents a “method storage”, and rabbit makes use of it.

The call rabbit.sleep() sets this.isSleeping on the rabbit object:
  */

// animal has methods
let animal33 = {
walk() {
    if (!this.isSleeping) {
    console.log(`I walk`);
    }
},
sleep() {
    this.isSleeping = true;
}
};

let rabbit11 = {
name: "White Rabbit",
__proto__: animal33
};

// modifies rabbit.isSleeping
rabbit11.sleep();

console.log(rabbit.isSleeping); // true
console.log(animal.isSleeping); // undefined (no such property in the prototype)


/*
If we had other objects, like bird, snake, etc., inheriting from animal, they would also gain access to methods of animal.
 But this in each method call would be the corresponding object, evaluated at the call-time (before dot), not animal. 
 So when we write data into this, it is stored into these objects.

As a result, methods are shared, but the object state is not.
*/

console.log('---------------------------for in loop-------------------------------------')
// for…in loop
// The for..in loop iterates over inherited properties too.

// For instance:


/*
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

// Object.keys only returns own keys
alert(Object.keys(rabbit)); // jumps

// for..in loops over both own and inherited keys
for(let prop in rabbit) alert(prop); // jumps, then eats



If that’s not what we want, and we’d like to exclude inherited properties, there’s a built-in method obj.hasOwnProperty(key): it returns true if obj has its own (not inherited) property named key.

So we can filter out inherited properties (or do something else with them):

let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

for(let prop in rabbit) {
  let isOwn = rabbit.hasOwnProperty(prop);

  if (isOwn) {
    alert(`Our: ${prop}`); // Our: jumps
  } else {
    alert(`Inherited: ${prop}`); // Inherited: eats
  }
}



Here we have the following inheritance chain: rabbit inherits from animal, that inherits from Object.prototype (because animal is a literal object {...}, so it’s by default), and then null above it:

null <------------- { object prototype [toString: function hasOwnProperty: function] }  <----   { animal [eats: true] } <------------ { rabbit [jumps: false] } 
      prototype                                                                         prototype                          prototype

Note, there’s one funny thing. Where is the method rabbit.hasOwnProperty coming from? We did not define it. Looking at the chain we can see that the method is provided by Object.prototype.hasOwnProperty. In other words, it’s inherited.

…But why does hasOwnProperty not appear in the for..in loop like eats and jumps do, if for..in lists inherited properties?

The answer is simple: it’s not enumerable. Just like all other properties of Object.prototype, it has enumerable:false flag. And for..in only lists enumerable properties. That’s why it and the rest of the Object.prototype properties are not listed.

Almost all other key/value-getting methods ignore inherited properties
Almost all other key/value-getting methods, such as Object.keys, Object.values and so on ignore inherited properties.

They only operate on the object itself. Properties from the prototype are not taken into account.

*/

/*
Summary
In JavaScript, all objects have a hidden [[Prototype]] property that’s either another object or null.
We can use obj.__proto__ to access it (a historical getter/setter, there are other ways, to be covered soon).
The object referenced by [[Prototype]] is called a “prototype”.
If we want to read a property of obj or call a method, and it doesn’t exist, then JavaScript tries to find it in the prototype.
Write/delete operations act directly on the object, they don’t use the prototype (assuming it’s a data property, not a setter).
If we call obj.method(), and the method is taken from the prototype, this still references obj. So methods always work with the current object even if they are inherited.
The for..in loop iterates over both its own and its inherited properties. All other key/value-getting methods only operate on the object itself.

*/
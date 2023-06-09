
// Classes are syntactical sugar they uses protoypal inhertiance in the back
//  its a little bit confusing as compared to the other language classes
// we simply convert functional protypal inheritance into class format


// we know why is class not just a syntatical sugar over functions

class Person{
    constructor(fName, lName){
        this.fName = fName;
        this.lName = lName;
    }

    /**
     Person.prototype.getFullName1 = function()
        {
            console.log(this.firstName + ' ' + this.lastName);
        }

    this will be replaced by methods within the class
     */

    sayMyName(){
        return this.firstName + ' ' + this.lastName;
    }
}

/**
function Person(fName, lName){
    this.firstName = fName;
    this.lastName = lName;
}
*/

const p1 = new Person('Bruce', 'Wayne');
p1.sayMyName();

// Now lets try to do inheritance into superhero class
// There are two keyword which handles this is super and extends

class SuperHero extends Person{
constructor(fName, lName){
    super(fName, lName);
    this.isSuperHero = true;

}

fightCrime(){
    console.log('Fighting Crime');
}

}


/*
Overriding a method
Now let’s move forward and override a method. By default, all methods that are not specified in class Rabbit are taken directly “as is” from class Animal.

But if we specify our own method in Rabbit, such as stop() then it will be used instead:
*/

class Animal {
    constructor(name) {
        this.speed = 0;
        this.name = name;
    }
    run(speed) {
        this.speed = speed;
        console.log(`${this.name} runs with speed ${this.speed}.`);
    }
    stop() {
        this.speed = 0;
        alert(`${this.name} stands still.`);
    }
}

let animal = new Animal("My animal");

/*
…And we would like to create another class Rabbit.

As rabbits are animals, Rabbit class should be based on Animal, have access to animal methods, so that rabbits can do what “generic” animals can do.

The syntax to extend another class is: class Child extends Parent.

Let’s create class Rabbit that inherits from Animal:
*/

class Rabbit extends Animal {
    hide() {
        console.log(`${this.name} hides!`);
    }
}


let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.hide(); // White Rabbit hides!\


/*
Object of Rabbit class have access both to Rabbit methods, such as rabbit.hide(), and also to Animal methods, such as rabbit.run().

Internally, extends keyword works using the good old prototype mechanics. It sets Rabbit.prototype.[[Prototype]] to Animal.prototype. 
So, if a method is not found in Rabbit.prototype, JavaScript takes it from Animal.prototype.
*/


/*

For instance, to find rabbit.run method, the engine checks (bottom-up on the picture):

The rabbit object (has no run).
Its prototype, that is Rabbit.prototype (has hide, but not run).
Its prototype, that is (due to extends) Animal.prototype, that finally has the run method.
As we can recall from the chapter Native prototypes, JavaScript itself uses prototypal inheritance for built-in objects. 
E.g. Date.prototype.[[Prototype]] is Object.prototype. That’s why dates have access to generic object methods.
*/


class BabyRabbit extends Rabbit{
    cry(){
        console.log("Baby rabbit cries");
    }
}
console.log("Prototype", Rabbit.prototype, BabyRabbit.prototype);


/*
Any expression is allowed after extends
Class syntax allows to specify not just a class, but any expression after extends.

For instance, a function call that generates the parent class:

function f(phrase) {
  return class {
    sayHi() { alert(phrase); }
  };
}

class User extends f("Hello") {}

new User().sayHi(); // Hello

Here class User inherits from the result of f("Hello").

That may be useful for advanced programming patterns when we use functions to generate classes depending on many conditions and can inherit from them.
*/


// Overriding a method

/*
Now let’s move forward and override a method. By default, all methods that are not specified in class Rabbit are taken directly “as is” from class Animal.

But if we specify our own method in Rabbit, such as stop() then it will be used instead:

class Rabbit extends Animal {
  stop() {
    // ...now this will be used for rabbit.stop()
    // instead of stop() from class Animal
  }
}



Usually, however, we don’t want to totally replace a parent method, but rather to build on top of it to tweak or extend its functionality. We do something in our method, but call the parent method before/after it or in the process.

Classes provide "super" keyword for that.

super.method(...) to call a parent method.
super(...) to call a parent constructor (inside our constructor only).


For instance, let our rabbit autohide when stopped:


class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
    this.speed = speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }

  stop() {
    this.speed = 0;
    alert(`${this.name} stands still.`);
  }

}

class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }

  stop() {
    super.stop(); // call parent stop
    this.hide(); // and then hide
  }
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.stop(); // White Rabbit stands still. White Rabbit hides!

NOTE: Arrow functions have no super
As was mentioned in the chapter Arrow functions revisited, arrow functions do not have super.

If accessed, it’s taken from the outer function. For instance:
class Rabbit extends Animal {
  stop() {
    setTimeout(() => super.stop(), 1000); // call parent stop after 1sec
  }
}


The super in the arrow function is the same as in stop(), so it works as intended. If we specified a “regular” function here, there would be an error:


// Unexpected super
setTimeout(function() { super.stop() }, 1000);x


*/


// Overriding constructor

/*
With constructors it gets a little bit tricky.

Until now, Rabbit did not have its own constructor.

According to the specification, if a class extends another class and has no constructor, then the following “empty” constructor is generated:

class Rabbit extends Animal {
  // generated for extending classes without own constructors
  constructor(...args) {
    super(...args);
  }
}


As we can see, it basically calls the parent constructor passing it all the arguments. That happens if we don’t write a constructor of our own.

Now let’s add a custom constructor to Rabbit. It will specify the earLength in addition to name:


class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  // ...
}

class Rabbit extends Animal {

  constructor(name, earLength) {
    this.speed = 0;
    this.name = name;
    this.earLength = earLength;
  }

  // ...
}

// Doesn't work!
let rabbit = new Rabbit("White Rabbit", 10); // Error: this is not defined.


Whoops! We’ve got an error. Now we can’t create rabbits. What went wrong?

The short answer is:

Constructors in inheriting classes must call super(...), and (!) do it before using this.
…But why? What’s going on here? Indeed, the requirement seems strange.

Of course, there’s an explanation. Let’s get into details, so you’ll really understand what’s going on.

In JavaScript, there’s a distinction between a constructor function of an inheriting class (so-called “derived constructor”) and other functions. A derived constructor has a special internal property [[ConstructorKind]]:"derived". That’s a special internal label.

That label affects its behavior with new.

When a regular function is executed with new, it creates an empty object and assigns it to this.
But when a derived constructor runs, it doesn’t do this. It expects the parent constructor to do this job.
So a derived constructor must call super in order to execute its parent (base) constructor, otherwise the object for this won’t be created. And we’ll get an error.

For the Rabbit constructor to work, it needs to call super() before using this, like here:

class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  // ...
}

class Rabbit extends Animal {

  constructor(name, earLength) {
    super(name);
    this.earLength = earLength;
  }

  // ...
}

// now fine
let rabbit = new Rabbit("White Rabbit", 10);
alert(rabbit.name); // White Rabbit
alert(rabbit.earLength); // 10


*/


// Overriding class fields: a tricky note


/*
This note assumes you have a certain experience with classes, maybe in other programming languages.

It provides better insight into the language and also explains the behavior that might be a source of bugs (but not very often).

If you find it difficult to understand, just go on, continue reading, then return to it some time later.



We can override not only methods, but also class fields.

Although, there’s a tricky behavior when we access an overridden field in parent constructor, quite different from most other programming languages.

Consider this example:



class Animal {
  name = 'animal';

  constructor() {
    alert(this.name); // (*)
  }
}

class Rabbit extends Animal {
  name = 'rabbit';
}

new Animal(); // animal
new Rabbit(); // animal





Here, class Rabbit extends Animal and overrides the name field with its own value.

There’s no own constructor in Rabbit, so Animal constructor is called.

What’s interesting is that in both cases: new Animal() and new Rabbit(), the alert in the line (*) shows animal.

In other words, the parent constructor always uses its own field value, not the overridden one.

What’s odd about it?

If it’s not clear yet, please compare with methods.

Here’s the same code, but instead of this.name field we call this.showName() me


class Animal {
  showName() {  // instead of this.name = 'animal'
    alert('animal');
  }

  constructor() {
    this.showName(); // instead of alert(this.name);
  }
}

class Rabbit extends Animal {
  showName() {
    alert('rabbit');
  }
}

new Animal(); // animal
new Rabbit(); // rabbit


Please note: now the output is different.

And that’s what we naturally expect. When the parent constructor is called in the derived class, it uses the overridden method.

…But for class fields it’s not so. As said, the parent constructor always uses the parent field.

Why is there a difference?

Well, the reason is the field initialization order. The class field is initialized:

Before constructor for the base class (that doesn’t extend anything),
Immediately after super() for the derived class.
In our case, Rabbit is the derived class. There’s no constructor() in it. As said previously, that’s the same as if there was an empty constructor with only super(...args).

So, new Rabbit() calls super(), thus executing the parent constructor, and (per the rule for derived classes) only after that its class fields are initialized. At the time of the parent constructor execution, there are no Rabbit class fields yet, that’s why Animal fields are used.

This subtle difference between fields and methods is specific to JavaScript.

Luckily, this behavior only reveals itself if an overridden field is used in the parent constructor. Then it may be difficult to understand what’s going on, so we’re explaining it here.

If it becomes a problem, one can fix it by using methods or getters/setters instead of fields.
*/



// Super: internals, [[HomeObject]]

/* */
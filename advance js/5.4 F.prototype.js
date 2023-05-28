/*

Remember, new objects can be created with a constructor function, like new F().

If F.prototype is an object, then the new operator uses it to set [[Prototype]] for the new object.

JavaScript had prototypal inheritance from the beginning. It was one of the core features of the language.

But in the old times, there was no direct access to it. The only thing that worked reliably was a "prototype" property of the constructor function, 
described in this chapter. So there are many scripts that still use it.


Please note that F.prototype here means a regular property named "prototype" on F. It sounds something similar to the term “prototype”, but here we really mean a regular property with this name.

Here’s the example:
*/

let animal = {
    eats: true
  };
  
function Rabbit(name) {
this.name = name;
}

Rabbit.prototype = animal;

let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal

console.log( rabbit.eats ); // true

/*
Setting Rabbit.prototype = animal literally states the following: "When a new Rabbit is created, assign its [[Prototype]] to animal".

That’s the resulting picture:

Rabbit --------------->  Animal {eats: true}
        prototype               ^

                                |
                                |   [[prototype]]
                             rabbit  {name: "White Rabbit"}
            

F.prototype only used at new F time
F.prototype property is only used when new F is called, it assigns [[Prototype]] of the new object.

If, after the creation, F.prototype property changes (F.prototype = <another object>), 
then new objects created by new F will have another object as [[Prototype]], but already existing objects keep the old one.


Default F.prototype, constructor property
Every function has the "prototype" property even if we don’t supply it.

The default "prototype" is an object with the only property constructor that points back to the function itself.

Like this:


*/

function Rabbit() {}

/* default prototype
Rabbit.prototype = { constructor: Rabbit };

Rabit (function)                    default prototype
    prototype ---------------------> constructor
              <--------------------
*/


// by default:
// Rabbit.prototype = { constructor: Rabbit }

console.log( Rabbit.prototype.constructor == Rabbit, Rabbit.prototype.constructor ); // false [Function: Object] console gives false

// alert( Rabbit.prototype.constructor == Rabbit ); // true if u run this it will give true

// alert() can only process strings. console.log() can process objects and strings.

// Naturally, if we do nothing, the constructor property is available to all rabbits through [[Prototype]]:


let rabbit1 = new Rabbit(); // inherits from {constructor: Rabbit}

// alert(rabbit1.constructor == Rabbit); // true (from prototype)

/*
Rabit (function)                    default prototype
    prototype ---------------------> constructor
              <--------------------    \   ^
                                        \  | [[prototype]]
                                         \ |
                                        rabbit1

We can use constructor property to create a new object using the same constructor as the existing one.

Like here:


*/

function Rabbit2(name) {
    this.name = name;
    alert(name);
  }
  
let rabbit3 = new Rabbit("White Rabbit");

let rabbit4 = new rabbit.constructor("Black Rabbit");

/*
That’s handy when we have an object, don’t know which constructor was used for it (e.g. it comes from a 3rd party library), and we need to create another one of the same kind.

But probably the most important thing about "constructor" is that…

…JavaScript itself does not ensure the right "constructor" value.

Yes, it exists in the default "prototype" for functions, but that’s all. What happens with it later – is totally on us.

In particular, if we replace the default prototype as a whole, then there will be no "constructor" in it.

For instance:


function Rabbit() {}
Rabbit.prototype = {
  jumps: true
};

let rabbit = new Rabbit();
alert(rabbit.constructor === Rabbit); // false


So, to keep the right "constructor" we can choose to add/remove properties to the default "prototype" instead of overwriting it as a whole:


function Rabbit() {}

// Not overwrite Rabbit.prototype totally
// just add to it
Rabbit.prototype.jumps = true
// the default Rabbit.prototype.constructor is preserved


Or, alternatively, recreate the constructor property manually:

Rabbit.prototype = {
  jumps: true,
  constructor: Rabbit
};
// now constructor is also correct, because we added it


*/
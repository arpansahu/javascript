/**
When passing object methods as callbacks, for instance to setTimeout, there’s a known problem: "losing this".

In this chapter we’ll see the ways to fix it.

 
*/

let user = {
    firstName: "John",
    sayHi() {
      console.log(`Hello, ${this.firstName}!`);
    }
  };
  
setTimeout(user.sayHi, 1000); // Hello, undefined!


/**
As we can see, the output shows not “John” as this.firstName, but undefined!
That’s because setTimeout got the function user.sayHi, separately from the object. The last line can be rewritten as:
*/

let f = user.sayHi;
setTimeout(f, 1000); // lost user context


/*
The method setTimeout in-browser is a little special: it sets this=window for the function call (for Node.js, this becomes the timer object, but doesn’t really matter here). So for this.firstName it tries to get window.firstName, which does not exist. In other similar cases, usually this just becomes undefined.

The task is quite typical – we want to pass an object method somewhere else (here – to the scheduler) where it will be called. How to make sure that it will be called in the right context?
*/

// Solution 1: a wrapper


  
setTimeout(function() {
    user.sayHi(); // Hello, John!
}, 1000);
  

// Now it works, because it receives user from the outer lexical environment, and then calls the method normally.

// The same, but shorter:

setTimeout(() => user.sayHi(), 1000); // Hello, John!

/*
Looks fine, but a slight vulnerability appears in our code structure.

What if before setTimeout triggers (there’s one second delay!) user changes value? Then, suddenly, it will call the wrong object!
*/

setTimeout(() => user.sayHi(), 1000);

// ...the value of user changes within 1 second
user = {
  sayHi() { console.log("Another user in setTimeout!"); }
};



/*

Another user in setTimeout!

The next solution guarantees that such thing won’t happen.

Solution 2: bind

Functions provide a built-in method bind that allows to fix this.

The basic syntax is:

more complex syntax will come a little later
let boundFunc = func.bind(context);

The result of func.bind(context) is a special function-like “exotic object”, that is callable as function and transparently passes the call to func setting this=context.

In other words, calling boundFunc is like func with fixed this.

For instance, here funcUser passes a call to func with this=user:
*/


let user1 = {
    firstName: "John"
};
  
function func() {
    console.log("Binding context")
    console.log(this.firstName);
}
  
let funcUser = func.bind(user1);
// funcUser(); // John

/* 
Here func.bind(user) as a “bound variant” of func, with fixed this=user.

All arguments are passed to the original func “as is”, for instance:
*/


  
function func(phrase) {
    console.log(phrase + ', ' + this.firstName);
}

// bind this to user
let funcUser1 = func.bind(user);

funcUser1("Hello"); // Hello, John (argument "Hello" is passed, and this=user)

// Now let’s try with an object method:

let user2 = {
    firstName: "John",
    sayHi() {
      alert(`Hello, ${this.firstName}!`);
    }
  };
  
  let sayHi = user.sayHi.bind(user); // (*)
  
  // can run it without an object
  sayHi(); // Hello, John!
  
  setTimeout(sayHi, 1000); // Hello, John!
  
  // even if the value of user changes within 1 second
  // sayHi uses the pre-bound value which is reference to the old user object
  user2 = {
    sayHi() { alert("Another user in setTimeout!"); }
  };

/*
In the line (*) we take the method user.sayHi and bind it to user. The sayHi is a “bound” function, that can be called alone or passed to setTimeout – 
doesn’t matter, the context will be right.
Here we can see that arguments are passed “as is”, only this is fixed by bind:
*/

let user3 = {
    firstName: "John",
    say(phrase) {
      console.log(`${phrase}, ${this.firstName}!`);
    }
  };
  
let say = user3.say.bind(user3);

say("Hello"); // Hello, John! ("Hello" argument is passed to say)
say("Bye"); // Bye, John! ("Bye" is passed to say)

/*
Convenience method: bindAll
If an object has many methods and we plan to actively pass it around, then we could bind them all in a loop:

for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
JavaScript libraries also provide functions for convenient mass binding , e.g. _.bindAll(object, methodNames) in lodash.

*/


// Partial functions

/*
Until now we have only been talking about binding this. Let’s take it a step further.

We can bind not only this, but also arguments. That’s rarely done, but sometimes can be handy.

The full syntax of bind:

let bound = func.bind(context, [arg1], [arg2], ...);

It allows to bind context as this and starting arguments of the function.

For instance, we have a multiplication function mul(a, b):
*/

function mul(a, b) {
    return a * b;
  }

  // Let’s use bind to create a function double on its base:

let double = mul.bind(null, 2);

console.log( double(3) ); // = mul(2, 3) = 6
console.log( double(4) ); // = mul(2, 4) = 8

let triple = mul.bind(null, 3);

console.log( triple(3) ); // = mul(3, 3) = 9
console.log( triple(4) ); // = mul(3, 4) = 12


/*
Going partial without context

What if we’d like to fix some arguments, but not the context this? For example, for an object method.

The native bind does not allow that. We can’t just omit the context and jump to arguments.

Fortunately, a function partial for binding only arguments can be easily implemented.

Like this:
*/

function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}

let user4 = {
  firstName: "John",
  say(time, phrase) {
    console.log(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

user.sayNow = partial(user4.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// Something like:
// [10:00] John: Hello!

/*
The result of partial(func[, arg1, arg2...]) call is a wrapper (*) that calls func with:

Same this as it gets (for user.sayNow call it’s user)
Then gives it ...argsBound – arguments from the partial call ("10:00")
Then gives it ...args – arguments given to the wrapper ("Hello")
So easy to do it with the spread syntax, right?

Also there’s a ready _.partial implementation from lodash library.
*/
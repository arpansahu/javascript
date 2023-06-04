/*
Arrow functions, the basics
There’s another very simple and concise syntax for creating functions, that’s often better than Function Expressions.

It’s called “arrow functions”, because it looks like this:

let func = (arg1, arg2, ..., argN) => expression;
This creates a function func that accepts arguments arg1..argN, then evaluates the expression on the right side with their use and returns its result.

In other words, it’s the shorter version of:

let func = function(arg1, arg2, ..., argN) {
  return expression;
};
Let’s see a concrete example:

let sum = (a, b) => a + b;

/* This arrow function is a shorter form of:

let sum = function(a, b) {
  return a + b;
};


alert( sum(1, 2) ); // 3
As you can see, (a, b) => a + b means a function that accepts two arguments named a and b. Upon the execution, it evaluates the expression a + b and returns the result.

If we have only one argument, then parentheses around parameters can be omitted, making that even shorter.

For example:

let double = n => n * 2;
// roughly the same as: let double = function(n) { return n * 2 }

alert( double(3) ); // 6
If there are no arguments, parentheses are empty, but they must be present:

let sayHi = () => alert("Hello!");

sayHi();
Arrow functions can be used in the same way as Function Expressions.

For instance, to dynamically create a function:

let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello!') :
  () => alert("Greetings!");

welcome();
Arrow functions may appear unfamiliar and not very readable at first, but that quickly changes as the eyes get used to the structure.

They are very convenient for simple one-line actions, when we’re just too lazy to write many words.

Multiline arrow functions
The arrow functions that we’ve seen so far were very simple. They took arguments from the left of =>, evaluated and returned the right-side expression with them.

Sometimes we need a more complex function, with multiple expressions and statements. In that case, we can enclose them in curly braces. The major difference is that curly braces require a return within them to return a value (just like a regular function does).

Like this:

let sum = (a, b) => {  // the curly brace opens a multiline function
  let result = a + b;
  return result; // if we use curly braces, then we need an explicit "return"
};

alert( sum(1, 2) ); // 3
More to come
Here we praised arrow functions for brevity. But that’s not all!

Arrow functions have other interesting features.

To study them in-depth, we first need to get to know some other aspects of JavaScript, so we’ll return to arrow functions later in the chapter Arrow functions revisited.

For now, we can already use arrow functions for one-line actions and callbacks.

Summary
Arrow functions are handy for simple actions, especially for one-liners. They come in two flavors:

Without curly braces: (...args) => expression – the right side is an expression: the function evaluates it and returns the result. Parentheses can be omitted, if there’s only a single argument, e.g. n => n*2.
With curly braces: (...args) => { body } – brackets allow us to write multiple statements inside the function, but we need an explicit return to return something.
*/


/*----------------------------------------------------------------

WHAT ABOUT this? IN FUINCTION AND ARRWO FUNCTIONS?

the handkling of thi is also different in arrow funcitons compared to regular functions.

in short, with arrow functions ther e are no bindings of this.

In regular functions the this keyword represented the object that called the function, which could be the window, the document, a button or whatever 

while in arrow functions the this keyword always represents the object thatr defined the arrow function


EXAMPLE

<!DOCTYPE html>
<html>
<body>

<h1>JavaScript "this"</h1>

<p>This example demonstrate that in a regular function, the "this" keyword represents different objects depending on how the function was called.</p>

<p>Click the button to execute the "hello" function again, and you will see that this time "this" represents the button object.</p>

<button id="btn">Click Me!</button>

<p id="demo"></p>

<script>
let hello = "";

hello = function() {
  document.getElementById("demo").innerHTML += this;
}

//The window object calls the function:
window.addEventListener("load", hello);

//A button object calls the function:
document.getElementById("btn").addEventListener("click", hello);
</script>

</body>
</html>







EXAMPLE


<!DOCTYPE html>
<html>
<body>

<h1>JavaScript "this"</h1>

<p>This example demonstrate that in Arrow Functions, the "this" keyword represents the object that owns the function, no matter who calls the function.</p>

<p>Click the button to execute the "hello" function again, and you will see that "this" still  represents the window object.</p>

<button id="btn">Click Me!</button>

<p id="demo"></p>

<script>
let hello = "";

hello = () => {
  document.getElementById("demo").innerHTML += this;
}

//The window object calls the function:
window.addEventListener("load", hello);

//A button object calls the function:
document.getElementById("btn").addEventListener("click", hello);
</script>

</body>
</html>

------------------------------------------------------------------*/

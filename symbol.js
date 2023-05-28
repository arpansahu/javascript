// by specification only two primitve types may server as object property keys:
// 1] String and 2] Symbol Type

// Otherwise, if one uses another typeof, such as Number, it's atuocnverted to string, So that obj[1] same as obj["1"] and obj[true] same as obj["true"]

// Until now, we hve been only using strings.

// Now let's explore symbols, see what they can do for us.

// A symbol represents a unique identifier.
// A value of this type can be created using Symbol()

let id = Symbol();

// we can give symbols a desctiption or a symbol name, mostly used for debugging purposes

// let id = Symbol("id"); you cant do this one var which is already a symbol cannot be reassigned to another symbol

let id2 = Symbol("id")

// Symbols are guaranteed to be unique even if they have same descriotion

let id3 = Symbol("id")

console.log(id2 == id3); // output false

// Symbols don't auto convert to a string

// Most values in javascipt supports implicit conversion to a string. For instance, we can alert almost any value, and it will work.
// Symbols are special, they dont auto convert

console.log(id3); // output = Symbol(id) console already use .toString implicitly ?
// alert(id3) TypeError cannot convert a sybol value to a string


// Thats a langauge guard against messing up, because strings and symbols are fundamentally different and should not accidently convert into another

// if we really want to show a symbol, we need to explicitly call .toString() on it, like here:

console.log(id3.toString); //output = Symbol(id)

/*  Note:
Console API is not a standard API that is defined in any specification but is something that is implemented across all browsers, so vendors are usually at their liberty to implement in their own fashion as there's no standard spec to define the output of any methods in API.

Unless you check the actual implementation of the Console API for a particular browser, you can never be sure. There's a tracker on GitHub listing the differences between implementation from major browsers.

If you look at the implementation in FF (available here - search for log), it has a comment below

A multi line stringification of an object, designed for use by humans

The actual implementation checks for the type of argument that is passed to log() and based on it's type, it generates a different representation.

Coming to your case, log() prints two different values for strings created using literal notation and strings created using String constructor because they are two different types. As explained here, Strings created using literal notation are called String Primitives and strings created using String constructor are called String Objects.

var str1 = 'test';
var str2 = new String('hello');

typeof str1 // prints "string"
typeof str2 // prints "object"
As the types differ, their string representation differs in the Console API. If you go through the code for FF's Console implementation, the last statement is

return "  " + aThing.toString() + "\n";
So to answer your question, Console API in FF calls toString() on the argument only if the argument type is not one of {undefined,null,object,set,map} types. It doesn't always call toString() or valueOf() methods. I didn't check the implementation of Chrome, so I won't comment on that.
*/


// or use sumbol.description property to show the description only

console.log(id3.description) // output: id

// HIDDEN PROPERTIES 

/* 
    Symbols allow us to create hidden properties of an object, than no other part of code can accidently access or overwrite.
    for instance, if we are working with user objects, that belong to a third-party code. We'd like to add identifiers to them.
    lets use symbol key for it.
*/

// 

// imagine we got this object from script 0
let user = {
    name: "Jhon"
};


// we are adding this id and value in our script 1 
let id4 = Symbol("id");

user[id4] = 1;

console.log(user[id4]);


// Now in another script again id4 can be used as key and it can have personal value related to that script. There will be no conflict

//But if we woudl have used id as string 

let user2 = { name: "John" };

// Our script uses "id" property
user2.id = "Our id value";

// ...Another script also wants "id" for its purposes...

user2.id = "Their id value"
// Boom! overwritten by another script!

// SYMBOLS IN AN OBJECT LITERAL

// if we want to use a symbol in an object literal {...}, we need square brtackets around it. 

let id5 = Symbol("id");

let user3 = {
    name: "Jhon",
    [id5]: 123 // not "id": 123
}

// SYMBOLS ARE SKIPPED BY FOR ... IN

let id6 = Symbol("id6")

let user4 = {
    name: "Jhon",
    age: 24,
    [id6]: 123
}

for (let key in user4) console.log(key); // name and age are only printed 

// for printing id6, i need to access it directly

console.log("Direct: ", user4[id6])

// Note: id id6 = Symbol("id"), then the output would have been different. 

/* COPY SYMBOLS
Object.keys(user) also ignores them. That’s a part of the general “hiding symbolic properties” principle. If another script or a library loops over our object, it won’t unexpectedly access a symbolic property.

In contrast, Object.assign copies both string and symbol properties:
*/

let clone = Object.assign({}, user4)

console.log(clone[id6])


// another example

let lib = {
    name: "ABC"
};

lib["id"] = 5;
lib["id"] = 6; 

lib[Symbol("id")] = 123;
lib[Symbol("id")] = 124; // not changed

console.log(lib) // { name: 'ABC', id: 6, [Symbol(id)]: 123, [Symbol(id)]: 124 }


// -------------------------------------------------
// GLOBAL SYMBOLS

/* 
    When we want a symbol to be shared globally accross multiple javascript scripts.
*/

// script 1
let id7 = Symbol.for("id")

// script 2
let idAgain = Symbol.for("id")

console.log("Global Sumbols:", id7 === idAgain);

// Symbol.keyFor

/*
    We  have seen that Symbol.for(key) returns a symbol by name. To do the opposite return a name by global symbl - we can use: Symbol.keyFor(sym)

*/
// get symbol by name
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// get name by symbol
console.log(Symbol.for("name"));
console.log(Symbol.for("id"));
console.log( Symbol.keyFor(sym) ); // name
console.log( Symbol.keyFor(sym2) ); // id

/*
The Symbol.keyFor internally uses the global symbol registry to look up the key for the symbol. 
So it doesn’t work for non-global symbols. If the symbol is not global, it won’t be able to find it and returns undefined.

That said, all symbols have the description property.
*/

console.log("Description for Symbol Globally")
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

console.log(Symbol.keyFor(globalSymbol)); // name, global symbol
console.log(Symbol.keyFor(localSymbol)); //undefined, not global
console.log(localSymbol.description);
console.log(globalSymbol.description);


// SYSTEM SYMBOLS

/*
There exist many “system” symbols that JavaScript uses internally, and we can use them to fine-tune various aspects of our objects.

They are listed in the specification in the Well-known symbols table:

Symbol.hasInstance
Symbol.isConcatSpreadable
Symbol.iterator
Symbol.toPrimitive
…and so on.
For instance, Symbol.toPrimitive allows us to describe object to primitive conversion. We’ll see its use very soon.

Other symbols will also become familiar when we study the corresponding language features.
*/

// SUMMARY

/*
Symbol is a primitive type for unique identifiers.

Symbols are created with Symbol() call with an optional description (name).

Symbols are always different values, even if they have the same name. If we want same-named symbols to be equal, then we should use the global registry: Symbol.for(key) returns (creates if needed) a global symbol with key as the name. Multiple calls of Symbol.for with the same key return exactly the same symbol.

Symbols have two main use cases:

“Hidden” object properties.

If we want to add a property into an object that “belongs” to another script or a library, we can create a symbol and use it as a property key. A symbolic property does not appear in for..in, so it won’t be accidentally processed together with other properties. Also it won’t be accessed directly, because another script does not have our symbol. So the property will be protected from accidental use or overwrite.

So we can “covertly” hide something into objects that we need, but others should not see, using symbolic properties.

There are many system symbols used by JavaScript which are accessible as Symbol.*. We can use them to alter some built-in behaviors. For instance, later in the tutorial we’ll use Symbol.iterator for iterables, Symbol.toPrimitive to setup object-to-primitive conversion and so on.

Technically, symbols are not 100% hidden. There is a built-in method Object.getOwnPropertySymbols(obj) that allows us to get all symbols. Also there is a method named Reflect.ownKeys(obj) that returns all keys of an object including symbolic ones. But most libraries, built-in functions and syntax constructs don’t use these methods.
*/

// console.log(Symbol.*) not working



symbol_obj = {
    name: "arpan",
    ["id"]:123,
    ["id"]: 124 // not changed
}


symbol_obj2 = {
    name: "arpan",
}
symbol_obj2[Symbol("id")] = 123
symbol_obj2[Symbol("id")] = 123

console.log(Object.getOwnPropertySymbols(symbol_obj));
console.log(Reflect.ownKeys(symbol_obj))

console.log(Object.getOwnPropertySymbols(symbol_obj2));
console.log(Reflect.ownKeys(symbol_obj2))
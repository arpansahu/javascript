/**
 This keyword 

 how to determine this keyword?

 1] IMPLICIT BINDING
 2] EXPLICIT BINDING
 3] NEW BINDING
 4] DEFAULT BINDING
 
 */

//  1] IMPLICIT BINDING

// object to the left of the dot is always referenced by this keyword

const person = {
    name: 'Arpan',
    sayMyName: function(){
        console.log("My name is " + this.name)
    }
}

person.sayMyName(); // => 'Arpan'

// 2] EXPLICIT BINDING

function sayMyName(){
    console.log("My name is " + this.name)
}

sayMyName.call(person);

// IN JS WE CNA USE CALL WITH ANY FUNCTION WHICH ALLOWS TO SPECIFIY THE CONTEXT WITH WHICH TH FUNCTION IS INVOKED
//  HERE PERSON IS PASSED AS THE FIRST ARGUMENT IN CALL FUNCTION, TO WHICH this KEYWORD WILL REFERENCE TO.


// 3] NEW BINDING

function Person(name){
    // this = {} when function is called with new keyword then this is inititalised as empty object
    this.name = name;
}

// const p1 = Person("Arpan")
// console.log(p1.name) // this will throw error since this object is not creeated 

// const p2 = new Person("Arpan")
// console.log(p2.name)


// 4] DEFAULT BINDING

// call sayMyName function
console.log("------------------DEFAULT BINDING---------------------");
sayMyName();  // this will be undefined when i comment line 45 and 48 because they makes name avaiale in the global scope which this is referencing to right now



/**
PRECEDENCE OF THIS

NEW--> EXPLICIT ----> IMPLICIT ---> DEFAULT
*/


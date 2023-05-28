// pritning something in javascript
console.log("HElllo world")


/* 
----------------------------------------------------------------
COMMENTS IN JAVASCRIPT

TYPE1: SINGLE LINE COMMENTS STARTS WITH DOUBLE FORWARD SLASH //

TYPE2: MULTI LINE COMMENTS STARTED WITH FORWARD SLASH * AND * BACKWARD SLASH
----------------------------------------------------------------
*/

/* 
----------------------------------------------------------------
VARIABLES
THERE ARE TWO WAYS TO DECLARE VARIABLES

1] LET

2] CONST : ALL COONST VARIABLES MUST BE INITIALISED AND ONCE INITIALIZED CANNOT BE REASSIGNED

if we do not inititalise const var
const salary
console.log(salar)
will throw error

if we do reassingment of contsr var
const salary = 0
const salary = 5
will throw error 

Note: a thumb rule is to always use const keyword unless that variable is gonna be modified in future
________________________________________________________________________________
*/

/*
________________________________________________________________________________
DATA TYPES

1] Primitive
    - String
        : sequence of characters
        ex: const name = "Arpan"
            const language = 'Javascript'
            const company = `Trellix`      
        Note: to use apostophe use \' in the string
    - Number
        : it have numbers 
        ex: const total = 0
            const PI = 3.14
    - Boolean
        : It have boolena values basically true, false
        ex: const isPrimaryNumber = true
            const isRich = false
    - Undefined
        : When a var is not assigned
        ex: let result
            console.log(result)
            output: undefined
        you can also assing undefined to a var
            let res = undefined
        
    - Null
        : special type which represents empty or null value in javascript
        ex: 
            const data = null

    Note: Difference in Null and Undefined
        1] Deifntiion: 
            undefined: means that variable has been declared, but its value has not been assigned
            null: means that variable have an empty value
        2] Type of Operator:
            undefined: the typeof() operator returns undefined, for an undefined variable
            null: the typeof() operator returns object for a variable whose value is assinged as null
        3] On performing airthmetic operatins
            undefined: it return NaN on performing airhtmetic operations.
            null: converts to 0 then perfomrs the operation
        4] Is it an assignment value:
            undefined: no there is no value assigned to the variable, it becomes undefined.
            null: Yes, as we assign null to the variable, it is an assignment value.

        Why is Null an Object?
            Basically, null is a primitive type of a variable in JavaScript. Many people consider it a bug in JavaScript as it considers null as an object. Changing or fixing this bug will break the existing codebase, so it is not yet changed. The type of null is an object. That is why it is treated as an object.
            There is another theory behind this. The initial version of JavaScript had values stored as 32 bits. The first 3 bits represented the data type, and the remaining bits represented the value. So for all the objects, the type started from 000. Null typically means empty, so it had all 0s stored in 32 bits. So the JavaScript reads the first 3 digits of null, which are all 0 and hence treats it as an object. The figure represents the same concept used in the initial version of JavaScript.

    - BigInt
        : It can hold integer values larger than what int can hold.
        ex: const bigint = 1234567890123456789012345678901234567890n;

    - Symbol
        :this need to have its own section in symbol.js

2] Non Primitive
    - Objects  dict/arrays
_____________________________________________________________________
*/
console.log('---------------------------------------------------------------- ', "EQUALITY")
const person = {
    firstName: 'Arpan',
    lastName: 'Wayne',
}

const person1 = {
    // first name: 'Arpan' , // this will throw error thats why we have to use quotes
    'first name': 'Arpan' // or double quotes can also be used similarly 
}

console.log(person, person1)

// JavaScript objects do not contain single or double quote marks around the keys when no spacing is used in the key name. So, 
// if there’s spacing in the key name, quotes are used. An Example is given below:

// access methods

console.log(person.firstName) // can be accessed using .

// but if u have space in the key then u need to access this way

console.log(person1["first name"])

// any javascript keyword cannot be used without quotes as key including if else
// functions can be used as values 


/*
Note: Dont get confused between javascript object and JSON object


This is the era of object-oriented programming. Objects are made with attributes. When we want to exchange the value of attributes between client-server or within languages,
we must use any proper format to do so. XML has served this service for quite a long time but it had some drawbacks, i.e. overhead issues. An XML file,
carrying the same amount of payload as JSON is comparatively heavier than JSON data. So, JSON is sort of preferred and widely used these days.



JSON is basically the “String” version of JavaScript Object. Its simply a text-based data format and single quote is not allowed for JSON.

→ 6 types of data types are allowed to contain in a JSON data/string/text.

Number
String
Array
Boolean
Null
Object

However, Functions cannot be included in JSON data, unlike JavaScript Objects.

If you just go through the following statement, you’ll get the visible differences between JSON and JavaScript Object.

var person = {
"name": “Depp”, 
"address": “earth”
};
//A simple JSON data where the keys are enclosed with double quotes


→ This is so far the visible literal differences. Now I will introduce you to two methods which convert JavaScript objects into JSON string and vice versa.

JSON.parse(); //Turns a JSON string into an JavaScript object.
JSON.stringify(); //Turns a JavaScript Object into JSON string/data
→Please carefully follow the following statements. That’ll be all for today I believe.
*/


var log = {
    page : "https://www.google.com",
    item: "item1",
    action: "action1"
}

console.log("Printing normal JS object", log); //{ page: 'https://www.google.com', item: 'item1', action: 'action1' } // IN JS double quotes are converted into single 
console.log("Printing JSON object from that same JS  object", JSON.stringify(log)) // {"page":"https://www.google.com","item":"item1","action":"action1"}
console.log("Printing JS object from JSON object from that same JS  object", JSON.parse(JSON.stringify(log)))


// ARRAYS

const oddNumbers = ["1", "3", "5", "7", "9"]
console.log(oddNumbers)
console.log(oddNumbers[1])


// Operators

/*
    An operator is a speacial type of symbol used to perform operations on values and variables\

    when same priority they are executed in left to right order

    otherwise they are execuuted with the priority level

    Val	Operator	Description	Example
    18	( )	Expression Grouping	(100 + 50) * 3
    17	.	Member Of	person.name
    17	[]	Member Of	person["name"]
    17	?.	Optional Chaining ES2020	x ?. y
    17	()	Function Call	myFunction()
    17	new	New with Arguments	new Date("June 5,2022")
    16	new	New without Arguments	new Date()

    Increment Operators
    Postfix increments are executed before prefix increments

    15	++	Postfix Increment	i++
    15	--	Postfix Decrement	i--
    14	++	Prefix Increment	++i
    14	--	Prefix Decrement	--i

    NOT Operators

    14	!	Logical NOT	!(x==y)
    14	~	Bitwise NOT	~x

    Unary Operators
    14	+	Unary Plus	+x
    14	-	Unary Minus	-x
    14	typeof	Data Type	typeof x
    14	void	Evaluate Void	void(0)
    14	delete	Property Delete	delete myCar.color

    Arithmetic Operators
    Exponentiations are executed before multiplications
    Multiplications and divisions are executed before additions and subtractions   

    13	**	Exponentiation ES2016	10 ** 2
    12	*	Multiplication	10 * 5
    12	/	Division	10 / 5
    12	%	Division Remainder	10 % 5
    11	+	Addition	10 + 5
    11	-	Subtraction	10 - 5
    11	+	Concatenation	"John" + "Doe"

    Shift Operators
    10	<<	Shift Left	x << 2
    10	>>	Shift Right (signed)	x >> 2
    10	>>>	Shift Right (unsigned)	x >>> 2

    Relational Operators
    9	in	Property in Object	"PI" in Math
    9	instanceof	Instance of Object	x instanceof Array

    Comparison Operators
    9	<	Less than	x < y 
    9	<=	Less than or equal	x <= y
    9	>	Greater than	x > y
    9	>=	Greater than or equal	x >= Array
    8	==	Equal	x == y
    8	===	Strict equal	x === y
    8	!=	Unequal	x != y
    8	!==	Strict unequal	x !== y

    Bitwise Operators
    7	&	Bitwise AND	x & y
    6	^	Bitwise XOR	x ^ y
    5	|	Bitwise OR	x | y

    Logical Operators
    4	&&	Logical AND	x && y
    3	||	Logical OR	x || y
    3	??	Nullish Coalescing ES2020	x ?? y

    Conditional (ternary) Operator
    2	? :	Condition	? "yes" : "no"


    Assignment Operators
    Assignments are executed after other operations
    2	=	Simple Assignment	x = y
    2	:	Colon Assignment	x: 5
    2	+=	Addition Assignment	x += y
    2	-=	Subtraction Assignment	x -= y
    2	*=	Multiplication Assignment	x *= y
    2	**=	Exponentiation Assignment	x **= y
    2	/=	Division Assignment	x /= y
    2	%=	Remainder Assignment	x %= y
    2	<<=	Left Shift Assignment	x <<= y
    2	>>=	Right Shift Assignment	x >>= y
    2	>>>=	Unsigned Right Shift	x >>>= y
    2	&=	Bitwise AND Assignment	x &= y
    2	|=	Bitwise OR Assignment	x |= y
    2	^=	Bitwise XOR Assignment	x ^= y
    2	&&=	Logical AND Assignment	x &= y
    2	||=	Logical OR Assignment	x ||= y
    2	=>	Arrow	x => y
    2	yield	Pause / Resume	yield x
    2	yield*	Delegate	yield* x
    2	...	Spread	... x
    1	,	Comma	x , y

*/


/*
----------------------------------------------------------------
TYPE CONVERSION

TYPE1: IMPLICIT CONVERSION: also known as the type coercion where javascript itself will automatically convert the type

 
Example 1: Implicit Conversion to String

// numeric string used with + gives string type
let result;

result = '3' + 2; 
console.log(result) // "32"

result = '3' + true; 
console.log(result); // "3true"

result = '3' + undefined; 
console.log(result); // "3undefined"

result = '3' + null; 
console.log(result); // "3null"

Example 2: Implicit Conversion to Number

// numeric string used with - , / , * results number type

let result;

result = '4' - '2'; 
console.log(result); // 2

result = '4' - 2;
console.log(result); // 2

result = '4' * 2;
console.log(result); // 8

result = '4' / 2;
console.log(result); // 2

Example 3: Non-numeric String Results to NaN

// non-numeric string used with - , / , * results to NaN

let result;

result = 'hello' - 'world';
console.log(result); // NaN

result = '4' - 'hello';
console.log(result); // NaN

Example 4: Implicit Boolean Conversion to Number

// if boolean is used, true is 1, false is 0

let result;

result = '4' - true;
console.log(result); // 3

result = 4 + true;
console.log(result); // 5

result = 4 + false;
console.log(result); // 4

Example 5: null Conversion to Number

// null is 0 when used with number
let result;

result = 4 + null;
console.log(result);  // 4

result = 4 - null;
console.log(result);  // 4

Example 6: undefined used with number, boolean or null

// Arithmetic operation of undefined with number, boolean or null gives NaN

let result;

result = 4 + undefined;
console.log(result);  // NaN

result = 4 - undefined;
console.log(result);  // NaN

result = true + undefined;
console.log(result);  // NaN

result = null + undefined;
console.log(result);  // NaN



TYPE2: EXPLICIT CONVERSION: whrre uyou manually convert the type

1. Convert to Number Explicitly

To convert numeric strings and boolean values to numbers, you can use Number(). For example,

let result;

// string to number
result = Number('324');
console.log(result); // 324

result = Number('324e-1')  
console.log(result); // 32.4

// boolean to number
result = Number(true);
console.log(result); // 1

result = Number(false);
console.log(result); // 0


In JavaScript, empty strings and null values return 0. For example,

let result;
result = Number(null);
console.log(result);  // 0

let result = Number(' ')
console.log(result);  // 0

If a string is an invalid number, the result will be NaN. For example,

let result;
result = Number('hello');
console.log(result); // NaN

result = Number(undefined);
console.log(result); // NaN

result = Number(NaN);
console.log(result); // NaN

Note: You can also generate numbers from strings using parseInt(), parseFloat(), unary operator + and Math.floor(). For example,

let result;
result = parseInt('20.01');
console.log(result); // 20

result = parseFloat('20.01');
console.log(result); // 20.01

result = +'20.01';
console.log(result); // 20.01

result = Math.floor('20.01');
console.log(result); // 20

2. Convert to String Explicitly

To convert other data types to strings, you can use either String() or toString(). For example,

//number to string
let result;
result = String(324);
console.log(result);  // "324"

result = String(2 + 4);
console.log(result); // "6"

//other data types to string
result = String(null);
console.log(result); // "null"

result = String(undefined);
console.log(result); // "undefined"

result = String(NaN);
console.log(result); // "NaN"

result = String(true);
console.log(result); // "true"

result = String(false);
console.log(result); // "false"

// using toString()
result = (324).toString();
console.log(result); // "324"

result = true.toString();
console.log(result); // "true"

3. Convert to Boolean Explicitly

To convert other data types to a boolean, you can use Boolean().

In JavaScript, undefined, null, 0, NaN, '' converts to false. For example,

let result;
result = Boolean('');
console.log(result); // false

result = Boolean(0);
console.log(result); // false

result = Boolean(undefined);
console.log(result); // false

result = Boolean(null);
console.log(result); // false

result = Boolean(NaN);
console.log(result); // false

All other values give true. For example,

result = Boolean(324);
console.log(result); // true

result = Boolean('hello');
console.log(result); // true

result = Boolean(' ');
console.log(result); // true


JavaScript Type Conversion Table
The table shows the conversion of different values to String, Number, and Boolean in JavaScript.

Value	String Conversion	Number Conversion	Boolean Conversion
1	"1"	1	true
0	"0"	0	false
"1"	"1"	1	true
"0"	"0"	0	true
"ten"	"ten"	NaN	true
true	"true"	1	true
false	"false"	0	false
null	"null"	0	false
undefined	"undefined"	NaN	false
''	""	0	false
' '	" "	0	true

----------------------------------------------------------------
*/

/*----------------------------------------------------------------
EQUALITY

1] == (Allow Coercion when types are different)
2] === (Dont allow Coersion when types are different)

COERCION: Implicit Type Conversion is also known (and more commonly referred to) as Coercion
TYPE CASTING:  Explicit Type Conversion is also known as Type Casting.


----------------------------------------------------------------*/

const var1 = 10
const var2 = '10'

console.log('---------------------------------------------------------------- ', "EQUALITY")
console.log(var1 == var2);  // it converted var2 implicitly to int 
console.log(var1 === var2); // it did not converted var2 implicityly to int


/*----------------------------------------------------------------
CONDITIONAL STATMENTS

1] IF else

if (condition){
    statment
}

else{

}

else if(condition){
    statment
}

2] SWITCH

switch(a value or an expression){
    case 'red':
        console.log("color is red")
        break
    case 'blue':
        console.log("color is blue")
        break
    case 'green':
        console.log("color is green")
        break
    default:
        console.log("Not a valid color")
}

----------------------------------------------------------------*/

console.log('---------------------------------------------------------------- ', "CODNITONAL STATMENTS, if else")
const num = 5;
if(num == 0){
    console.log('Number is 0')
}
else if (num > 0){
    console.log("Number is greater than 0")
}
else{
    console.log("Number is less than 0")
}

console.log('---------------------------------------------------------------- ', "CODNITONAL STATMENTS, if else")


console.log('----------------------------------------------------------------', "CONDITIONAL SWITCH CASE")

const color = 'red';

switch(color){
    case 'red':
        console.log("color is red")
        break
    case 'blue':
        console.log("color is blue")
        break
    case 'green':
        console.log("color is green")
        break
    default:
        console.log("Not a valid color")
}


console.log('----------------------------------------------------------------', "CONDITIONAL SWITCH CASE")

/*
LOOPING IN JAVASCRIPT

1] FOR LOOP
    for (initializer; conditionl final-expression){
        // code to run 
    }
2] WHILE LOOP
    initializer
    while(condition){
        //code to run
        final-expression
    }

3] DO WHILE LOOP
    do {
        // code to run
        final-expression
    } while (conditon)

    always executed atleast once

4] FOR OF LOOP

for (const item of array){
    // code to run
}
*/

// FOR LOOP
console.log('----------------------------------------------------------------', "FOR LOOP")

for (let i = 1; i <= 5; i++){
    console.log("Iterator no: " + i);
}

// WHILE LOOP
console.log('----------------------------------------------------------------', "WHILE LOOP")

let iter=1;

while(iter <= 5){
    console.log("ITerator no: " + iter); //  we can do iter++ also 
    iter++;
}


// DO WHILE LOOP
console.log('----------------------------------------------------------------', "DO WHILE LOOP")


iter=1;

do{
    console.log("ITerator no: " + iter); //  we can do iter++ also 
    iter++;
} while(iter <= 5)

// FOR .. OF LOOP
console.log('----------------------------------------------------------------', "FOR .. OF LOOP")

for (const item of [1,2,3,4]){
   console.log("iterator no: " + item)
}

/*----------------------------------------------------------------

FUNCTIONS

a javascript function is a block of code designed to perform particular task

function name (parameter1, parameter2, parameter3, ){ 
    // code to be executed
}


----------------------------------------------------------------*/
console.log('----------------------------------------------------------------', "FUNCTIONS")
function add(a, b){
    return a + b;
}

const sum = (25, 30)
console.log(55);

// ARRAY FUNCTIONS

let arrowSum = (a, b) => {
    return a + b
}

/*
this can be also written in more short form when only one expression is there 
let arrowSum = (a, b) => a + b;
when u dont have any arguments or just one  u can even remoive paranthesis 

let arrowSum = a => 3 + a;

*/

arrowSum = a => 3 + a;

console.log("Arrow Sum: " + arrowSum(10,20));


/**
 Rest parameters ...

 function sum(a, b){
    return a + b
 }

 sum(1,2,3,4,5)
 will be 3 because first two args will be accepted and rest will be ignored

 meanwhile if we want to have *args similar to python 

 function sumAll(...args){
    let sum  = 0;
    for (const arg of args) sum += arg;
    return sum
 }

 console.log(1, 2, 3, 4);

 also we can choose first 2 prams and then use this args 

 function sumAll(a, b, ...args){
    let sum = a + b;
    for (const arg of args) sum += arg;
    return sum
 }

 The “arguments” variable
There is also a special array-like object named arguments that contains all arguments by their index.

For instance:

function showName() {
  alert( arguments.length );
  alert( arguments[0] );
  alert( arguments[1] );

  // it's iterable
  // for(let arg of arguments) alert(arg);
}

// shows: 2, Julius, Caesar
showName("Julius", "Caesar");

// shows: 1, Ilya, undefined (no second argument)
showName("Ilya");

In old times, rest parameters did not exist in the language, and using arguments was the only way to get all arguments of the function. And it still works, we can find it in the old code.

But the downside is that although arguments is both array-like and iterable, it’s not an array. It does not support array methods, so we can’t call arguments.map(...) for example.

Also, it always contains all arguments. We can’t capture them partially, like we did with rest parameters.

So when we need these features, then rest parameters are preferred.


Arrow functions do not have "arguments"
If we access the arguments object from an arrow function, it takes them from the outer “normal” function.

Here’s an example:


function f() {
  let showArg = () => alert(arguments[0]);
  showArg();
}

f(1); // 1


SPREAD OPERATOR


{
    Spread syntax (...) allows an iterable such as an array expression or string to be expanded in places where zero or more arguments 
    (for function calls) or elements (for array literals) are expected, or an object expression to be expanded in places where zero or more key-value pairs
    (for object literals) are expected.

}

We’ve just seen how to get an array from the list of parameters.

But sometimes we need to do exactly the reverse.

For instance, there’s a built-in function Math.max that returns the greatest number from a list:

let arr = [3, 5, 1];

alert( Math.max(...arr) ); // 5 (spread turns array into a list of arguments)

And surely we can’t manually list items in the code Math.max(arr[0], arr[1], arr[2]), because we may be unsure how many there are. As our script executes, there could be a lot, or there could be none. And that would get ugly.

Spread syntax to the rescue! It looks similar to rest parameters, also using ..., but does quite the opposite.

When ...arr is used in the function call, it “expands” an iterable object arr into the list of arguments.

For Math.max:

let arr = [3, 5, 1];

alert( Math.max(...arr) ); // 5 (spread turns array into a list of arguments)

We also can pass multiple iterables this way:

let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(...arr1, ...arr2) ); // 8

We can even combine the spread syntax with normal values:

let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25


Also, the spread syntax can be used to merge arrays:

let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

let merged = [0, ...arr, 2, ...arr2];

alert(merged); // 0,3,5,1,2,8,9,15 (0, then arr, then 2, then arr2)


Copy an array/object
Remember when we talked about Object.assign() in the past?

It is possible to do the same thing with the spread syntax.

let arr = [1, 2, 3];

let arrCopy = [...arr]; // spread the array into a list of parameters
                        // then put the result into a new array

// do the arrays have the same contents?
alert(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true

// are the arrays equal?
alert(arr === arrCopy); // false (not same reference)

// modifying our initial array does not modify the copy:
arr.push(4);
alert(arr); // 1, 2, 3, 4
alert(arrCopy); // 1, 2, 3



Summary
When we see "..." in the code, it is either rest parameters or the spread syntax.

There’s an easy way to distinguish between them:

When ... is at the end of function parameters, it’s “rest parameters” and gathers the rest of the list of arguments into an array.
When ... occurs in a function call or alike, it’s called a “spread syntax” and expands an array into a list.
Use patterns:

Rest parameters are used to create functions that accept any number of arguments.
The spread syntax is used to pass an array to functions that normally require a list of many arguments.


let obj = { a: 1, b: 2, c: 3 }; // Not iterable
let objCopy = { ...obj };
but let obj = [...obj] will throw an error
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



/*----------------------------------------------------------------

SCOPES:

TYPE1: BLOCK SCOPE

    variables declared inside the curly braces cannot be accessed outside the curl braces

    if (true){
        let a =10;
        console.log(a); // prints 10
    }
    console.log(a); // throws error a is not defined


TYPE2: FUNTION SCOPE
    function(){
        const a = 10;
        console.log(a); prints 10
    }
    console.log(a); // thuis throws an error 

TYPE3: GLOBAL SCOPE
    const a = 10;
    this is availanble everywhere inside a block as well as function
----------------------------------------------------------------*/
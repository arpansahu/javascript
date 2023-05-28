/**
Currying is a process in functional programming in which we transform with multiple arguments into a sequence of nesting functions that take one arguememt at a time.

function(a, ,b ,c) is transformed to f(a)(b)(c)

it does not call a function. it simply transforms it.

*/

function sum(a, b, c) {
    return a + b + c;
}

console.log(sum(1, 2, 3));

function curry(fun){
    return function(a){
        return function(b){
            return function(c){
                return fun(a, b, c);
            }
        }
    }
}

const curriedSum = curry(sum);

console.log(curriedSum(1)(2)(3));


/**
 Now the question is that literally what are the benefits of currying ?
 its benefits are not syntatically but when for example 
 */

 const add = (x, y) => x + y;

 const add_curried = x => y => x + y;  // curried version

//  now creating a closure out of this curreid sum function

const add10 = add_curried(10);

console.log(add10(5));
console.log(add10(100));


/**
For a more real-world problem, let's say you have a web form and you have a helper function that creates field inputs for you, like a textbox.
The website works in 20 different languages, each field needs to have different regions, validation and error messages depending on the user's location. 
In this example, I could end up with lots of code like this:

function getFieldMetaData(name, countrycode, messages, locations, validations) {
 // Do work
}

const firstName = getFieldMetaData('firstname', countrycode, messages, locations, validations) ;
const surName = getFieldMetaData('firstname', countrycode, messages, locations, validations) ;


You can implement the same functionailty in less code using currying like this:

const getFieldMetaData => name => countrycode => messages => locations => validations { // Do work }

const fieldMetaDataWithDepdendencies = getFieldMetaData(validations)(messages);
const ukFielddMetaDataWithDepdendencies = fieldMetaDataWithDepdendencies('GB');
const firstName = ukFielddMetaDataWithDepdendencies('firstName');
const surName = ukFielddMetaDataWithDepdendencies('surName');

If you have 20 odd fields in your form, the second approach while contains more set-up code will eventually use less code than the first approach. 
The main benefit of currying is when you need to call the same functions with some of the same parameters a lot. In these situations, 
currying becomes a good technique to use as it will make your code easier to refactor. Currying also creates a more declarative code base, e.g. 
it's easier to read the code and understand what it's doing (Assuming good naming conventions are being enforced!)

Currying is not a set in stone coding style to use all the time. Currying is useful in certain situations. When you need to use the same function calls a lot, 
currying is a pretty easy concept to apply to your code. Chain your function arguments into multiple single calls and assigning those result into new functions
allow for powerful things to be done! Happy Coding 🤘
*/


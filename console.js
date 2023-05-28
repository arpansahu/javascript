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

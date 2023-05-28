/**
A closure is the combination of a function bundlered together with references to its surrouding state. Cloures are created everytime a function
is created, at function creation time 
*/

function outer(){
    let counter = 0;

    function inner(){
        counter++;
        console.log(counter);
    }
    inner();
}
outer(); // 1
outer(); // 1

//  but instead of call lets return inner function


function outer1(){
    let counter = 0;

    function inner1(){
        counter++;
        console.log(counter);
    }

    return inner1
}

const fn = outer1();
fn();
fn();


/*
    when we return a function from anothe function we are effectively returning a combination of the function defintion along with the function's scope.
    This would let the function defintiion have an associated persistent memory which could hold on to live data between executions. That combination of
    the function and its scope chain is what is called a closure in javadscript.
*/
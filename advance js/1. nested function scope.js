let a = 10;
function outer(){
    let b = 20;
    function inner(){
        let c = 30;
        console.log(a, b, c);
    }
    inner();
}

outer();

// outer fucntion scope can be accessed by inner funcion but vice versa is not true
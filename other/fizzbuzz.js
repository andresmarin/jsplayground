//first try

Array.from(Array(46).keys()).map((i) =>{
    i % 3 === 0 && i % 5 === 0 ? console.log("fizzbuzz") :
    i % 3 === 0 ? console.log("fizz") :
    i % 5 === 0 ? console.log("buzz"):
    console.log(i);
    
  } );

  //Improved
	
  console.log(
    Array.apply(0, Array(100)).map(
        (a,i) =>
          i % 3 === 0 && i % 5 === 0
            ? "fizzbuzz"
            : i % 3 === 0
              ? "fizz"
              : i % 5 === 0
                ? "buzz"
                : i
      )
      .join("\n")
  );

  //Another approach found 
  for(let i=0;i<100;)console.log((++i%3?'':'fizz')+(i%5?'':'buzz')||i)

  
  //The most efficient ever...

  console.log(
    Array.apply(0, Array(100)).map(function (x, y) { 
        var nb = y+1;
        var isFizz = ((nb % 3) == 0);
        var isBuzz = ((nb % 5) == 0);
        var isFizzBuzz = (isFizz && isBuzz);
        
        if (isFizzBuzz) return 'fizzbuzz';  
        if (isFizz) return 'fizz';
        if (isBuzz) return 'buzz';
        return(nb);
                                                   
    }).join("\n"));


let a= (() => {
    let num = 0;
      for (let i = 2; i <= 20; i++) {
      console.log(num);
      num += i;
    if(num > 70)
        return num;
    }  
    })
    
    
a()
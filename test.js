/**
 * Date : 2017/2/26
 * Time : 21:23
 */


// this is the dev branch 


// master master master master master


let add = (a, b) => a + b;


let max = ()=> {
    return "max max maxxxx!";
}

let max = ()=> {
    return "max max maxxxx!";
}
 


let min = ()=> {
    return "max max maxxxx!";
}

let deleteMin = ()=> `delete MIN function`;

let version3 = ()=> `version3333333`;

let version4 = ()=>` new branch gh-test`




var tArr = [{
    id: 1,
    children: [{
        id: 2
    }, {
        id: 3
    }]
}, {
    id: 22,
    children: [{
        id: 5,
        children: [{
            id: 20,
            children:[{
                id: 56
            }, {
                id: 78
            }]
        }, {
            id: 30
        }]
    },
        {
            id: 6
        }

    ]
}]


var fun = (arr) =>{
    return arr.reduce( (all,o)=>{
        console.log('all:',all);

        if (o.children) {

            return all.concat(o.id , fun(o.children) );
        } else {
            return all.concat( o.id );
        }

    },[])
}
fun(tArr)

//
// arr.reduce( (all,o) =>
//     all.concat(o.children ? o.children.map( c => c.id ) : []  ), []
// )



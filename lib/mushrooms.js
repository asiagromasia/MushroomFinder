'use strict'
var mushrooms = [
    {name:"Morel", size: 3, location: "Mason Lake" },
    {name:"Oyster", size: 4, location: "Snoqualmie Falls" },
    {name:"Chantarell", size: 1, location: "Snoqualmie Falls" },
    {name:"Porcini", size: 5, location: "Snoqualmie Falls" },
    {name:"King Bolete", size: 2, location: "Mason Lake" },
];


exports.getAll = () => {
   
    return mushrooms;
   //return mushrooms.every;
    //console.log(mushrooms.name);
 //   return this.mushrooms[{name,location:string,size:number}];
};

exports.get = (query, mushrooms) => {
    
   //console.log(query.name);
    console.log(mushrooms);
//    var found = mushrooms.find(function(mushroom){
//    return mushroom.name === "porcini";
//    
//    return mushrooms.find((name) => {
//        return item.name;
//    });
//}); console.log(found);
};

exports.delete = (name) => {
    //     retain array length for later comparison after array modification
    const oldLength = mushrooms.length;
    mushrooms = mushrooms.filter((name) => {
        return item.name !== name;
    });
    // if old & new array lengths differ, item was deleted
    return {deleted: oldLength !== mushrooms.length, total: mushrooms.length };
};

exports.add = (newMushroom) => {
    const oldLength = mushrooms.length;
    // use existing get() method to check if mushroom already in our list
    let found = this.get(newMushroom.name);
    if (!found) {
        mushrooms.push(newMushroom);
    }
    // if old & new array lengths differ, item was added
    return {added: oldLength !== mushrooms.length, total: mushrooms.length };
};

    
//mushrooms.getAll(){
//   for (int i = 0; i<mushrooms.length; i++){
//     console.log(mushrooms)
//    }
//}
//var mushrooms.get(x)= mushrooms.forEach(function(item, index, array) {
//    if x==
//  console.log(item, index);
//});


//var mushrooms.delete() =
//    
//    
//    if mushrooms.pop()
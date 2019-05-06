'use strict'
let mushrooms = [
    {name:'Morel', size: 3, location: 'Mason Lake' },
    {name:"Oyster", size: 4, location: "Snoqualmie Falls" },
    {name:"Chantarell", size: 1, location: "Snoqualmie Falls" },
    {name:"Porcini", size: 5, location: "Snoqualmie Falls" },
    {name:"King Bolete", size: 2, location: "Mason Lake" },
];


exports.getAll = () => {
   return mushrooms;
};


exports.get = (reqName) => {
    return mushrooms.find((mushroom) => {
        return mushroom.name.toLowerCase() == reqName;    
        });
    };

exports.delete = (reqName) => {
    //retain array length for later comparison after array modification
    const oldLength = mushrooms.length;
    
    let index = mushrooms.findIndex((mushroom) => {
            return mushroom.name.toLowerCase() == reqName;
        })
    if (index >= 0) {
        mushrooms.splice(index, 1);
    }               
    // if old & new array lengths differ, item was deleted
    return {deleted: oldLength !== mushrooms.length, total: mushrooms.length };
};

exports.add = (newMushroom) => {
    const oldLength = mushrooms.length;
  /* at that point not sure if we should add constructor in here so we could pass parameters
    function newMushroom(name, size, location){
    this.name = name;
    this.size = size;
    this.location = location;
     
} */
    // use existing get() method to check if mushroom already in our list
    let found = this.get(newMushroom.name);
    if (!found) {
        mushrooms.push(newMushroom);
    }
    // if old & new array lengths differ, item was added
    return {added: oldLength !== mushrooms.length, total: mushrooms.length };
};

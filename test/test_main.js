const expect = require("chai").expect;
const mushrooms = require("../lib/mushrooms");
/*const validatePassword = (password) => {
    return (password.toLowerCase() != password);
}
const getsMushroom = (mushroom) => {
    return (mushroom.toLowerCase() != mushroom);
}
const addsnewMushroom = (newMushroom) => {
    return (newMushroom.toLowerCase() != newMushroom);
}
const deleteMushroom = (mushroom) => {
    return (mushroom.toLowerCase() != mushroom);
}
*/

describe("Mushrooms module", () => {
 it("returns requested mushroom", () => {
   const result = mushrooms.get("morel");
   expect(result).to.deep.equal({name: "Morel", size: 3, location: "Mason Lake"});
 });
 
 it("fails w/ invalid mushroom", () => {
   const result = mushrooms.get("fake");
   expect(result).to.be.undefined;
 });
});

describe("Mushrooms module", () => {
 it("deletes requested mushroom", () => {
   const result = mushrooms.delete("morel");
   expect(result).should.not.exist;
 });
 it("fails when mushroom still there", () => {
   const result = mushrooms.get("morel");
   expect(result).to.deep.equal({name: "Morel", size: 3, location: "Mason Lake"});
 });
}); 

describe("Mushrooms module", () => {
 it("adds new mushroom", () => {
   const result = mushrooms.add("bolete");
   expect(result).to.deep.equal({name: "bolete", size: 3, location: "Mason Mountain"});
 });
 
 it("fails when new mushroom not there", () => {
   const result = mushrooms.get("bolete");
   expect(result).to.be.false;
 });
}); 

/* SAMPLE:
describe("Password validation", () => {
 it("passes if mixed case", () => {
   var result = validatePassword("agbBN");
   expect(result).to.be.true; 
 });
 
 it("fails if all lower case", () => {
   var result = validatePassword("fakkjhue");
   expect(result).to.be.false;
 });
}); 
deep will compare all array elements one by one*/
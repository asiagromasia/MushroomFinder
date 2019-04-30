const expect = require("chai").expect;
const mushrooms = require("../lib/mushrooms");
const validatePassword = (password) => {
    return (password.toLowerCase() != password);
}
/*
describe("Password validation", () => {
 it("passes if mixed case", () => {
   var result = validatePassword("agbBN");
   expect(result).to.be.true; 
 });
 
 it("fails if all lower case", () => {
   var result = validatePassword("fakkjhue");
   expect(result).to.be.false;
 });
}); */

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
'use strict'
const expect = require("chai").expect;
const mushrooms = require("../lib/mushrooms");
/*const validatePassword = (password) => {
    return (password.toLowerCase() != password); */


describe("Mushrooms module", () => {
 it("returns requested mushroom", () => {
   const result = mushrooms.get("morel");
   expect(result).to.deep.equal({name: "Morel", size: 3, location: "Mason Lake"});
 });
 
 it("fails w/ invalid mushroom", () => {
   const result = mushrooms.get("fake");
   expect(result).to.be.undefined;
 });

 it("deletes requested mushroom", () => {
   const result = mushrooms.delete("morel");
   expect(result.deleted).to.be.true;
 });
 it("fails to delete an invalid mushroom", () => {
   const result = mushrooms.delete("morelsss");
   expect(result.deleted).to.be.false;
 });

 it("adds a new mushroom", () => {
   const result = mushrooms.add({name: "bolete", size: "3", location: "Mason Mountain"});
   expect(result.added).to.be.true;
 });
 
 it("fails to add existing mushroom", () => {
   const result = mushrooms.add({name: "Morel", size: 3, location: "Mason Lake"});
   expect(result.added).to.be.false;
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
var expect = require("chai").expect;
var book = require("../lib/mushrooms");
const validatePassword = (password) => {
    return (password.toLowerCase() != password);
}

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
/*
describe("Mushrooms module", () => {
 it("returns requested mushroom", () => {
   var result = book.get("dune");
   expect(result).to.deep.equal({title: "dune", author:"frank herbert", pubdate:1969});
 });
 
 it("fails w/ invalid book", () => {
   var result = book.get("fake");
   expect(result).to.be.undefined;
 });
}); */
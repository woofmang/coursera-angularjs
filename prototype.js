// Prototypal inheritance
// var parent = {
//   value: "parentValue",
//   obj: {
//     objValue: "parentObjValue"
//   },
//   walk: function() {
//     console.log("Walking!");
//   }
// };
//
// var child = Object.create(parent);
// console.log("CHILD - child.value: ", child.value);
// console.log("CHILD - child.obj.objValue: ", child.obj.objValue);
// console.log("PARENT - parent.value: ", parent.value);
// console.log("PARENT - parent.obj.objValue: ", parent.obj.objValue);
// console.log("parent: ", parent);
// console.log("child: ", child);
//
// child.value = "childValue";
// child.obj.objValue = "childObjValue";
// console.log("*** CHANGED - child.value = child.value");
// console.log("*** CHANGED - child.obj.objValue = child.obj.objValue");
// console.log("CHILD - child.value: ", child.value);
// console.log("CHILD - child.obj.objValue: ", child.obj.objValue);
// console.log("PARENT - parent.value: ", parent.value);
// console.log("PARENT - parent.obj.objValue: ", parent.obj.objValue);
// console.log("parent: ", parent);
// console.log("child: ", child);
//
// console.log("child.obj === parent.obj ? ", child.obj === parent.obj);
//
// var grandChild = Object.create(child);
// console.log("Grandchile: ", grandChild);
// grandChild.walk();

// Function constructor
// see course HTML, CSS, and Javascript for Web Developers; lecture 48

// NOTE: Using an uppercase function name is a visual cue that this is
// going to be used as a function constructor:
function Dog(name) {
  this.name = name;
  console.log("'this' is: ", this);
}

// since functions are objects themselves, you can create new instances of them
// by using the keyword "new", as below
var myDog = new Dog("Max");
console.log("myDog is ", myDog);

// but just calling the function without the "new" keyword doesn't
// create an instance; 'this' in this context is the window object (global scope)
Dog("Max2");

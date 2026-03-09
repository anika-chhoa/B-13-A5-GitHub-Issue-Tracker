1.	What is the difference between var, let, and const?
Answer: Var is function-scoped variable in JavaScript that is hoisted and created memory space during initialization, so accessing it before declaration returns undefined. It can also be reassigned and redeclared.
Let is a block-scoped variable in JavaScript that is hoisted but not accessible before initialization because it creates a Temporal Dead Zone (TDZ) and causes a ReferenceError if accessed before declaration. It can be reassigned but cannot be redeclared in the same scope.
const is a block-scoped variable in JavaScript that is hoisted but not accessible before initialization because it creates a Temporal Dead Zone (TDZ). It must be initialized at the time of declaration and cannot be reassigned. If declared without initialization, it produces a SyntaxError.

2.	What is the spread operator (...)?
Answer: The spread operator (...) in JavaScript is a syntax that expands the elements of an array, object, or iterable into individual elements. It is used to copy, combine, or pass multiple elements more easily and clearly.

3.	What is the difference between map(), filter(), and forEach()?
Answer: map() is an array method in JavaScript that iterates over each element and returns a new array with the results of applying a function to each element. The original array remains unchanged.
filter() is an array method in JavaScript that iterates over each element and returns a new array containing only the elements that satisfy a given condition. The original array remains unchanged.
forEach() is an array method in JavaScript that iterates over each element and executes a function for each element. It does not return a new array and is mainly used to perform side effects like logging or updating variables.

4.	What is an arrow function?
Answer: An arrow function in JavaScript is a shorter way to write functions using the => symbol. It does not have its own this context and is often used for concise, short and readable function expressions.

5.	What are template literals?
Answer: Template literals in JavaScript are strings written with backticks (``) that make creating strings easier and more readable. They allow embedding variables or expressions using `${}`, support multi-line strings, and help create dynamic strings in a clean and concise way.

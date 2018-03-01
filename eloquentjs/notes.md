# Eloquent JavaScript

**Null and undefined**

There are two special values, written null and undefined, that are used to denote the absence of a meaningful value. They are themselves values, but they carry no information. 

- The difference in meaning between undefined and null is an accident of JavaScript’s design, and it doesn’t matter most of the time. In the cases where you actually have to concern yourself with these values, I recommend treating them as mostly interchangeable.

- when null or undefined occurs on either side of the operator, it produces true only if both sides are one of null or undefined.

- The rules for converting strings and numbers to Boolean values state that 0, NaN, and the empty string ("") count as false, while all the other values count as true. To prevent this use === instead of ==.




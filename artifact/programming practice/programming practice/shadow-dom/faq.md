## What?

You can create HTML components using javascript and then attach tem using a shadowDOM to use them on a webpage.
Shadow DOM is something which allows us to keep custom element separate with their markup styles and attached behaviors like CSS and Events

---

## Why?

- to create custom elements
- consumer won't anciently break your component
- Encapsulation

---

## Browser Support?

All major browser supports it.

---

## If I use `closed` mode then no one can alter my component?

Yes...and No... the epic answer is "IT DEPENDS".

Ideally yes however if before adding your script if someone has done a monkey patching on your attachShadow then ... No!

```
Element.prototype._attachShadow = Element.prototype.attachShadow;
Element.prototype.attachShadow = function () {
    return this._attachShadow( { mode: "open" } );
};
```

## can shadowDOM access the actual DOM

100% yes

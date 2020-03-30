---
slug: "/react-forms-state"
title: "Handling State in React Forms"
date: "2016-05-03"
---

import reactState from './images/ReactState.svg';

There's a bit of an art to handling state in React components. Keeping state in as few places as possible is one matter, passing it around and updating it is another. Often the manipulations that must be performed on that state lead to a huge number of change handlers being passed through multiple layers of components tightly coupling your entire system.

React has a nifty little concept called [ValueLink](https://facebook.github.io/react/docs/two-way-binding-helpers.html) that it deprecated in version 15. A ValueLink is an object that bundles a value with a handler that knows how to update that value. Packaging these two together means that you no longer have to worry about multiple values and associated handlers being passed around. You simply pass the bundle around and use the value when you need to display it and the handler when you need to update it. While ValueLink itself is deprecated, there's still a lot that can be taken from this pattern and applied to your apps even now.

First and foremost, the most powerful concept that can be taken away from this is _symmetry_. For every value being passed there is an associated handler that can update it. As an example, suppose you were building a filter with a range slider. This slider takes a `value` of the form `{low: 10, high: 30}` and needs to notify the application when these values change. Instead of introducing two change handlers called `onChangeLow` and `onChangeHigh`, a single `onChange` handler may be used that takes the entire object to be replaced.

What's the difference? Well, aside from needing to maintain one fewer method, this approach comes with a couple of nice perks. One, the parent component doesn't need to know anything about the internal workings of the child component. It simply provides a value and, if that value should change, receives a new one through the `onChange` callback. Two, _composability_. Once everything is talking the same language, you can start pulling these `value`/`onChange` pairs apart and then recombining them in ways that remain entirely agnostic of their content.

This all requires a bit of a shift in the mental model required when building forms. Previously, we might have considered a form as simply a wrapper around a bunch of form fields that can update the state in whatever manner it needs to. Instead, consider the _form itself_ as having a value that gets broken up into smaller and smaller slices - each of these slices is a new value that gets provided to a more targeted Component.

To demonstrate, let's make a simple calendar form. Its data model is just a list of objects, each having a `name` and a `dateRange` object with `startDate` and `endDate` keys. For our UI, we might break it down into a set of components like this:

| Component | Example Value |
|---|---|
| **NameField** | `'My Holiday'` |
| **DateField** | `1461888000` |
| **DateRange** | `{startDate: 1461888000, endDate: 1462838400}` |
| **CalendarEntry** | `{name: 'My Holiday', dateRange: {startDate: 1461888000, endDate: 1462838400}}` |
| **CalendarForm** | `[{name: ..., dateRange: {startDate: ..., endDate: ...}}, {...}, {...}]` |

We're starting from the smallest slices and working our way back up to the full data model.  As you can see, the `CalendarForm` is our top level component and its value gets broken down into smaller and smaller slices until it hits the actual input fields, `NameField` and `DateField`.

Performing all of this slicing and dicing can be achieved with a simple `makeLink` function called from React [stateless functions](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions). Let's make the `CalendarEntry` component, remembering that it's receiving a value object containing a `name` and a `dateRange`, and rendering a `NameField` and `DateRange` component respectively.

```javascript
import React from 'react';

// remember, our value looks like:
// {
//   name: 'My Holiday',
//   dateRange: {startDate: 1461888000, endDate: 1462838400}
// }
export default function CalendarEntry(props) {
  const { value, onChange } = props;

  return (
    <div>
      <NameField {...makeLink(value, onChange, 'name')} />
      <DateRange {...makeLink(value, onchange, 'dateRange')} />
    </div>
  );
}

function makeLink(value, onChange, prop) {
  return {
    value: value[prop],
    onChange: newVal => onChange({
      ...value,
      [prop]: newVal
    })
  };
}
```

What are we doing here? There are a few pieces of new syntax that might throw you off at first, but the business end (`makeLink`) is taking the `value` and `onChange` handlers provided to the component and splitting them up based on a property. Extracting the appropriate value for each field is a simple matter of pulling the field out of the object with `value[prop]`. When one of these values changes, it constructs a new value for the `CalendaryEntry` component by combining everything from the original value (`...value`) and just replacing the part that has changed (`[prop]: newVal`).

Whenever a value changes deep down in the tree, it triggers the `onChange` in its parent, which combines the change with the rest of its original value and bubbles this through to its parent's `onChange`. This continues up the tree until we reach the top.

To put it all together, at the very top level we make a simple stateful component that wraps `CalendarForm`.

```javascript
import React, { Component } from 'react';
import CalendarForm from './CalendarForm';

export default class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      entries: []
    };
  },

  handleChange = newVal => {
    this.setState({
      entries: newVal
    });
  },

  render() {
    return (
      <CalendarForm
          value={this.state.entries}
          onChange={this.handleChange}
      />
    );
  }
}
```

You'll notice here that the stateful component doesn't know anything about the value it's storing, it simply passes down `entries` from its state and replaces it if it ever changes. The work of updating the correct slice of the value is handled where it actually changed, instead of at this top level. We gain a lot of portability from doing this as no component ever needs to be aware of _how_ a value changed, just that it _did_ change.

Putting this all together for our calendar we will end up with a component tree that looks like this:

<img src={reactState} alt="Component Diagram" style={{ width: '100%' }} />

_The `value` and `onChange` arguments have been left out of the `makeLink` calls for brevity_.

I've made a simple little library that wraps these ideas up into a couple of convenience methods and a decorator. You can find [LinkValue](https://github.com/drewschrauf/link-value) over on [npm](https://www.npmjs.com/package/link-value). Give it a go next time you're making a form or a filter and let me know what you think!

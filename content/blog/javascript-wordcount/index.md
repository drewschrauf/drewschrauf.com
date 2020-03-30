---
slug: "/javascript-wordcount"
title: "Javascript Wordcount that Works"
date: "2012-06-13"
---
Recently I had to make some forms for a site I was working on. This site required textareas for long-form responses with a wordcount displayed underneath so that the user was aware of how many words they had left. Not wanting to write this myself I went online to find a decent jQuery plugin to do it for me but found that they almost all feel victim to the same issue. Behold the (incorrect) code below:

```javascript
// Don't use this code...
var content = $('#my-textarea').val();
var numWords = jQuery.trim(content).split(' ').length;
if(content === '') {
    numWords = 0;
}
```

Most plugins I came across were a riff on the same theme; split the textarea's content on spaces and either find the length or fallback on zero if there's no content. Due to the way javascript split works, this code has numerous issues:

1. A double space will insert an extra word according to this algorithm. These are commonly used after a full stop.
2. Words on lines by themselves will not be counted.
3. A leading space or newline will increment the true wordcount by one.

Clearly performing a split on spaces is not the ideal solution in this situation. I decided to break out my old friend, the regex to solve these issues. What I came up was the below:

```javascript
// ...use this instead!
var content = $('#my-textarea').val();
var matches = content.match(/\S+\s*/g);
var numWords = matches !== null ? matches.length : 0;
```

The business end of this alternative, `/\S+\s*/g` might look a little scary to people that aren't familiar with regexes. This is probably what drove them away to instead use `string.split` in the first place. To put their fears to rest, lets break this down:

- `/` starts the regex.
- `\S+` looks for one or more non-whitespace characters in order to pull out the words.
`\s*` looks for zero or more whitespace characters to find the word boundaries. Why zero or more? So that the last word matches too.
- `/g` ends the regex and ensures that newline characters are included in the whitespace search.

All together, this regex simply looks for things that aren't spaces possibly followed by things that are. A `null` is returned if no matches are found so we use a ternary operation to return a zero if necessary.

The moral of this story is twofold:

1. Don't just test your code for general use, check the edge cases too. This goes double if you plan to release it as a plugin for other people to use.
2. Don't be afraid to use regexes, they may just save your life one day.

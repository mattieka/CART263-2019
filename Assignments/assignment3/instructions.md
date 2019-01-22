INSTRUCTIONS (copy pasted from github)
Brief
- *DONE* Add another interaction to the page in which the user finds other secret words in the document by waving their mouse over them, causing them to be highlighted
- *DONE* Add a text to the page that tells the user how many of these secret words they have found so far
- *DONE* You should only be able to find any given secret once

An approach

HTML
- *DONE!!* Add a new set of spans to the HTML with a class of "secret" that go around single words (don't make them overlap with the existing redacted spans)
- *DONE!!* Add text somewhere on the page that reports how many secrets have been found, put a span with an id of something like "secret-count" around the number found, and start it with 0 (e.g. when you start it should say: "Secrets found: 0")

CSS
- *DONE!!* Add a class to your CSS called something like "found" that will brightly highlight a secret once it's found (we'll add this class to the secrets when the user finds them)

JavaScript
- *DONE!!* Add a variable to the top of your program to track how many secrets were found
- *DONE!* Add an event for "mouseover" attached to all the "secret" words (use jQuery to select that class, use on() to create an event for mouseover)
- In the event handler function
      - *DONE!* Add the "found" class to the element that was moused over so it highlights (remember to use this)
      - *DONE!!* Remove the mouseover event from the found element (look up jQuery's off() function)
      - *DONE!* Increase the counter variable by one
      - *DONE!* Select the "secret-count" span and set its text to be the value of the counter variable (look up jQuery's text() function) (e.g. when you've updated it the first time, the text on the page should say "Secrets found: 1")

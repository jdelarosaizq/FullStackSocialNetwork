## Coding Task - Social Network Presence (Full Stack) ##

A third party provider has exposed an end-point for you that retrieves a graph representation using JSON like the following:

GET https://my-third-party/facebook

GET https://my-third-party/twitter

Example response:
```json
{
"sn": "facebook",
"people": [{"name":"John"},{"name":"Harry"},{"name":"Peter"}, {"name": "George"}, {"name": "Anna"}],
"relationships": [
    {"type": "HasConnection", "startNode": "John", "endNode": "Peter"},
    {"type": "HasConnection", "startNode": "John", "endNode": "George"},
    {"type": "HasConnection", "startNode": "Peter", "endNode": "George"},
    {"type": "HasConnection", "startNode": "Peter", "endNode": "Anna"}
]
}
```

In the example response above we can count the connections by their **minimum** degrees of separation like this:

|        | 1 degree | 2 degrees |
|--------|----------|-----------|
| John   | 2        | 1         |
| Peter  | 3        | 0         |
| George | 2        | 1         |
| Harry  | 0        | 0         |
| Anna   | 1        | 2         |



**GOAL: develop a React/NodeJS simple web application, including frontend and backend, that consumes the third party API described above.**


### Frontend ###
Provide a simple form which allows to input required data to satisfy the user stories below. Please adjust the layout and styles of the provided application to make it responsive:

* Mobile: all sections in one column, each section is 100% width
* Tablet+: all sections in one row, each section is one third of the full width

Please consider performance when implementing your components. Pay attention to wasted renders.
Data must be stored and retrieved using a state manager of your choice.

### Backend ###
Provide a Restful http server that interact with the 3rd party and implements the necesary business logic. Please pay attention to good design practices and separation of concerns. 

### User Stories ###

As a user, I want to query how many people are not connected to anyone for the given social network so I know who to propose new connections to.

    Given a social network name Facebook
    And a full Facebook graph
    Return count of people with no connections


As a user, I want to query how many people are connected to a given person by 1 or 2 degrees of separation for all social networks (facebook and twitter) so I understand her/his social influence.

    Given a person name Peter
    And a Facebook graph for Peter
    And a Twitter graph for Peter
    Return count of connections of 1 degree + count of connections of 2 degree 

### Hints ###
- You don't need to provide any real implementation of the third party api.
- We are looking for a solution where the candidate shows skills around application design, clean code and TDD.
- We do not expect you to have all fully working, just some test suites that we can run using your preferred build tool.
- We expect you to spend no more than a few hours on this task so we can discuss your prioritisation, design approach and quality aspects in the technical interview.

### Before you start
You will need your public repository to share your code. If you fork the project make sure you detach it from this one. Please do not create PRs.


# State management using event publishing
The application built in this repository mainly showcases a custom state management solution that leverages a pub-sub mechanism for updating and querying data
with built-in immutability provided by immer.js.
For context, what the application does is management for a list of goals, where each goal has a list of sub-tasks that are part of the parent goal. This so-called roadmap
can be analyzed through a dynamically composed prompt that is sent to gemini API in order to get a result regarding whether or not the sub-tasks are suitable for achieving the corresponding parent goal.
The application also features a login system using github as an external provider, which leads to new users creation when accessed. Each user has their own list of goals.
In the following section we will focus on how the state management solution was built and what features it currently provides, using examples from this app.

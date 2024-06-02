# Task Board Project

## Purpose

The purpose of this project is to take a partially completed task board and add functionality to it so that the User Story is complete and the acceptance criteria is met. This project uses JQuery, bootstrap, and dayjs to build the view of this application

## User Story

```md
AS A project team member with multiple tasks to organize
I WANT a task board
SO THAT I can add individual project tasks, manage their state of progress and track overall project progress accordingly
```

## Acceptance Criteria

```md
GIVEN a task board to manage a project
WHEN I open the task board
THEN the list of project tasks is displayed in columns representing the task progress state (Not Yet Started, In Progress, Completed)
WHEN I view the task board for the project
THEN each task is color coded to indicate whether it is nearing the deadline (yellow) or is overdue (red)
WHEN I click on the button to define a new task
THEN I can enter the title, description and deadline date for the new task into a modal dialog
WHEN I click the save button for that task
THEN the properties for that task are saved in localStorage
WHEN I drag a task to a different progress column
THEN the task's progress state is updated accordingly and will stay in the new column after refreshing
WHEN I click the delete button for a task
THEN the task is removed from the task board and will not be added back after refreshing
WHEN I refresh the page
THEN the saved tasks persist
```

## Screenshots

![Screen capture of the working task board](./assets/images/taskboard.png)

![Screen capture of localstorage and the information retained](./assets/images/localStorage.png)

## Links to Code and Live Site

- The project is viewable on [Github Pages](https://mgordon82.github.io/task-board/)
- The repository for this code is located on [GitHub](https://github.com/mgordon82/task-board)

## Resources

[JQuery UI](https://jqueryui.com/)

[Bootstrap UI](https://getbootstrap.com/)

[DayJS](https://day.js.org/)

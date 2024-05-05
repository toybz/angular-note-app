- Plan features to include in project
- Plan project architecture
- Sketch project interface
- Plan feature development steps

Features:

- CRUD ops for notes
- User registration and login
- Share notes
- Note tags
- Search notes
- Sort notes
- Unit tests

Architecture:
Use NGRX for state
Sample state model1

```js
const users = {
  1: {
    username: "",
    password: "",
  },
};
const notes = {
  1: {
    title: "",
    content: "",
    tags: [],
    dateCreated: "",
    lastModified: "",
    author: userId,
    isArchived: boolean,
  },
};

const sharedNotes = {
  1: {
    notedId: noteId,
    authorId: userId,
    receiverId: userId,
    IsShareStillActive: boolean,
  },
};

const tags = {
  [userId]: [],
};

const tags = [
  {
    tagName,
    userId,
    notedId,
  },
];
```

App layout:
App shell:

RouterOutlet

- Page
  Header component
  Use content projection to show header content
  Page content

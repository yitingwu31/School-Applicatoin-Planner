## Usage

- git clone repo
- type `yarn`
- `yarn start` to start frontend app on localhost:3000

## Progress

### 6/20

- Frontend design
  - 慈: Add school
  - Janiece: School view
  - Emily: Calendar view

### 6/20 Emily

- Simple navigation bar routing to three main pages

### 6/25 慈

- Add school interface
- TBD: Add complete time and checkpoints

### 6/26 Emily

- Basic calendar view
- Use project from [react-calendar](https://github.com/zackify/react-calendar) :pray:
- TBD: custom css

### 6/27 Janiece

- school page view first draft
- code reference to 'https://material-ui.com/'

### 6/27 慈

- Complete time
- Use [keyboard date pickers](https://material-ui-pickers.dev/demo/datepicker#keyboard-input) in [material-ui/pickers](https://material-ui.com/components/pickers/#native-pickers)
- type `yarn add @material-ui/pickers` and `yarn add @date-io/date-fns@1.x date-fns`

### 6/27 Emily

- setup backend graphql and mongoose
- mutation: createUser, createSchool, createTodo

### 6/29 Emily

- mutations: addUser, addSchool, addTodo, addCheckpoint
- queries: user, userSchool, userMonthTodo, userMonthCheckpoint
- Need to think about how to call three mutations when the user create a school
- At calendar, query both userMonthTodo and userMonthCheckpoint

### 6/30 慈

- Add checkpoint & deadline
- TBD: call backend API

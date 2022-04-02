# `@nbyodai/typescript-project` - a basic streak counter

This is a basic streak counter tutorial - to learn typescript - inspired by DuoLingo
and meant for the browser (uses `localStorage`).

## Install
```shell
npm install @nbyodai/streak-counter
```

### Usage
```js
import {streakCounter} from '@nbyodai/streak-counter'

const today = new Date()
const streak = streakCounter(localStorage, today)
//  streak returns an object
// {
//    currentCount: 1,
//    lastLoginDate: "01/04/2022",
//    startDate: "01/04/2021",
// }
```

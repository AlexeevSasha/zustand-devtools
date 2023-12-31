# Zustand-devtools

*This is a small library that dynamically adds names to your devtools actions.*

## Installation
```
npm i zustand-devtools
yarn add zustand-devtools
```

## Problem
Devtools will only log actions from each separated store unlike in a typical combined reducers redux store.   
If an action type is not provided, it is defaulted to "anonymous".

![zustand-devtools](docs/anonymous.jpg "zustand-devtools")

To add an action name, a specific action type, pass the third parameter to the set function:

```tsx
const useCountStore = create((set, get) => ({
    count: 0,
    increment: () => set(
            (state) => ({ count: ++state.count }),
            false,
            "count/increment" // action name
        ),
}))
```
or
```tsx
const useCountStore = create((set, get) => ({
    count: 0,
    increment: () => set(
            (state) => ({ count: ++state.count }),
            false,
            { type: "count/increment" } // action name
        ),
}))
```

**But it's tedious always throwing out a name**

## What I'm suggesting
You don't have to manually add names. Instead, the names will be the names of your functions.

For example
```tsx
import { devtools } from "zustand-devtools";

const useCountStore = create(
    devtools((set) => ({
        count: 0,
        increment: () => set((state) => ({ count: ++state.count })),
    })),
);
```
![zustand-devtools](docs/increment.jpg "zustand-devtools")

```tsx
import { devtools } from "zustand-devtools";

const useCountStore = create(
    devtools((set) => ({
        count: 0,
        increment: () => set((state) => ({ count: ++state.count })),
    }), { name: "count" }),
);
```
If you add a name to devtools options, the output will be like this
![zustand-devtools](docs/count.jpg "zustand-devtools")


But if you want to set your name in the set function, it will be prioritized
```tsx
import { devtools } from "zustand-devtools";

const useCountStore =  create(devtools((set, get) => ({
    increment: () => set(
            (state) => ({ count: ++state.count }),
            false,
            "my action name" // action name will be prioritized
        ),
})))
```
![zustand-devtools](docs/my_action.jpg "zustand-devtools")



##### If you find a bug or have suggestions for improving this library, please create an issue or send a pull request to [GitHub](https://github.com/AlexeevSasha/zustand-devtools).

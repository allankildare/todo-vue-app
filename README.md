# To-do Vue App

![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![Vuetify](https://img.shields.io/badge/Vuetify-1867C0?style=for-the-badge&logo=vuetify&logoColor=AEDDFF)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)

#### This project is a frontend challenge.

In this project I developed a web To-do App, there are some requirements:

- [x] Use Vue.js and Vuetify components
- [x] Tasks should have **name**, **description**, **date to complete** and **status** (_complete, incomplete and late_)
- [x] The user should have the option to **update** or **delete** the task *(50%)*
- [x] The list of tasks should have filters by status
- [x] All the frontend should be responsiveness
- [x] Save all the data on the local storage

This application saves all the data in **local storage**, which means data persist stored in your browser, even after you ending the session.

I decided to use [Pinia](https://pinia.vuejs.org/) instead of Vuex and all the task store is managed by the Pinia state library.

### Installation
`yarn install`

### Run application
Vite uses `dev` as script to run the apps:

`yarn dev`

The dev server will be ruinng at [port 3000](http://localhost:3000) _(verify if it is available)_

### Deploy
To deploy this application I used Netlify free service, [click here](https://github-explorer-allankildare.netlify.app/) to see the app.

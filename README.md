# Introduction

getForks is a new way of managing, sharing, updating, and creating recipes that brings the power and convenience of version control to recipe development without the complexity of git.

Since recipes are (generally) simpler than software, the complexities of version control are largely absent, but being able to track modifications over time, fork, and update recipes easily is something that's missing from current recipe websites.

An early demo of getForks is live! Visit [https://getforks.cyclic.app/](https://getforks.cyclic.app/) to give it a try.

---

# Technology Packages/Dependencies used

MongoDB, Express, React, Node, ReactRouter, Tailwind, JavaScript, Cloudinary, React-Markdown, Mongoose

---

# Setup

Dependencies are most easily installed by building, but if that isn't desired the frontend and backend
dependencies can be installed separately by running `npm install` in the project root and again inside
the client directory.

```
npm run build
```

## Then

- Create the `.env` file and add the following as `key=value`
  - PORT: 3000 or some other port number
  - MONGO_URI: `your database URI`
  - CLOUD_NAME: Cloudinary Cloudname
  - API_KEY: Cloudinary API_Key
  - API_SECRET: Cloudinary API_Secret

## Finally

For production

```
npm run start
```

Or, for development

```
npm run dev
```

---

# Future Optimizations

Add support for pull requests and merging
Improve UI and make it clear where markdown is supported

# 4IT573 - Node

## Overview

This repository contains two projects:
1. **Frontend (FE)** - A Vite React application.
2. **Backend (BE)** - A NestJS application.

Both projects use PNPM as the package manager.

## Prerequisites

- Node.js
- PNPM

### Installing PNPM

If you do not have PNPM installed, you can install it globally using npm:

```bash
npm install -g pnpm
```

## Setup

### Frontend

#### Navigate to the frontend directory and install dependencies:
``` bash
cd todo-nest-fe
pnpm install
```

#### Run the development server:

``` bash
pnpm run dev
```

The frontend application should now be running on http://localhost:5173.

### Backend

#### Navigate to the backend directory and install dependencies:

``` bash
cd todo-nest
pnpm install
```

#### Run the backend server:

```bash
pnpm run start
```

The backend application should now be running on http://localhost:3000.

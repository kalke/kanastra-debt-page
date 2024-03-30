# Made by Henrique Kalke for Kanastra Software Engineer Test

## Disclaimer

This README is to run as debug, to get all the services running together as asked please follow the instructions avaiable on the [kanastra-compose](https://github.com/kalke/kanastra-compose) repository

### Prerequisites

Before proceeding, ensure you have the following installed on your system:

- [Node](https://nodejs.org/en/download)
- [MySQL](https://dev.mysql.com/downloads/installer/)

### Step 1: Clone the Project

Please clone this project on ~/Projects

```bash
mkdir ~/Projects
```

Navigate to the folder:

```bash
cd ~/Projects
```

Clone the repository:

```bash
git clone https://github.com/kalke/kanastra-debt-page.git
```

### Step 2: Setup the project

```bash
npm i
```

### Step 3: Once the packages are installed, run the development command

```bash
npm run dev:node
```

### Step 4: Access

You can access with:

```bash
xdg-open http://localhost:8888 > /dev/null
```
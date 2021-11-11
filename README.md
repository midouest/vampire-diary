# vampire-diary

A book-keeping app for the solo-journaling RPG, [Thousand Year Old Vampire](https://thousandyearoldvampire.com/).

## Development

### Required

- Docker Compose
- Yarn

### Recommended

- Visual Studio Code
- Python 3.9.7

### Steps

#### 1. Launch containers

```bash
$ docker-compose up --build
```

#### 2. Prepare database

```bash
$ docker-compose exec web python manage.py migrate
$ docker-compose exec web python manage.py createsuperuser
```

#### 3. Import prompts

Create a `.env` file in the project root using the `.env.template` file.

```bash
$ cp .env.template .env
```

Copy the environment values from the `web` container in `docker-compose.yaml` to the corresponding variables in `.env`.

Prepare the prompt file and then use the `import_prompts` command to import it into the database. See [Prompt File Format](./PROMPT_FILE_FORMAT.md) for instructions on formatting the prompt file.

```bash
$ python manage.py import_prompts path/to/prompts.txt
```

#### 4. Start frontend dev server

```bash
$ cd web
$ yarn start
```

Your default web browser should open to http://localhost:3000/

## Deployment

**IMPORTANT:** Make sure to build and commit the frontend static files with `yarn build` prior to deploying your changes.

### Heroku

#### 1. Create the app

```bash
$ heroku login
$ heroku create <app>
$ heroku stack:set container -a <app>
$ heroku addons:create heroku-postgresql:hobby-dev -a <app>
$ heroku git:remote -a <app>
$ git push heroku main
```

#### 2. Configure the app settings

Go to `dashboard.heroku.com/apps/<app>/settings`, then click "Reveal Config Vars".

Add the following config variables:

- `ALLOWED_HOSTS=<app>.herokuapp.com`
- `DEBUG=false`
- `SECRET_KEY=<key>`

A secret key can be generated with the following command:

```bash
$ python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
```

The `DATABASE_URL` variable should already be populated by Heroku.

#### 3. Prepare the database

```bash
$ heroku run python manage.py migrate
$ heroku run python manage.py createsuperuser
```

#### 4. Import prompts

You will first need to configure `.env` with the values from Heroku in step 2 in order to connect to the deployed database.

```bash
$ python manage.py import_prompts path/to/prompts.txt
```

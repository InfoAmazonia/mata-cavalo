# O Mata Cavalo

Reportagem "A luta dos herdeiros de Mata Cavalo pelo título do quilombo" publicada em hotsite feito em React e produzida pela Amazônia Real com desenvolvimento do InfoAmazonia

## Installation

### Requirements

- node v10.1.x
- npm v5.6.x

### Build and start server

Install dependencies:
```
$ npm install
```

Create dist folder and compile project
```
$ npm run predeploy
```

Access [http://localhost:3002/](http://localhost:3002/)

Watch files
```
$ npm run watch
```


### Deploy app to GITHUB PAGES

```
$ npm run deploy
```

OBS: open src/CNAME and change domain if needed

# RUNING WITH DOCKER

Install environment and dependencies
```
$ docker-compose build --no-cache
```

Starting docker
```
$ docker-compose up
```
Create public folder and compile project (in docker bash)
```
docker$ npm run predeploy
```

Access [http://localhost:3002/](http://localhost:3002/)

### Deploy app to GITHUB PAGES

```
docker$ npm run deploy
```

### NOTES
- If you use 2FA (2 factor authentication) on git hub, [follow these steps](https://medium.com/@ginnyfahs/github-error-authentication-failed-from-command-line-3a545bfd0ca8).
  
- When using docker you can use watch for save and auto compile files when developing. For this you have to copy dist and node_modules from docker to host and uncomment volumes in docker-compose.yml file. The steps are:

1. Copy dist and node_modules from docker to host (when docker-compose is up and running using bash from host)
$ docker cp $(docker-compose ps -q app):/usr/src/app/node_modules .
$ docker cp $(docker-compose ps -q app):/usr/src/app/yarn.lock .
$ docker cp $(docker-compose ps -q app):/usr/src/app/public .

2. Uncomment dist and node_modules folder from .dockerignore file

3. Uncomment Volumes from docker-compose.yml

4. docker-compose down

5. docker-compose up

6. Inside docker bash: docker-compose exec app bash
```
docker$ npm run watch
```

### CREDITS
[rafgraph](https://github.com/rafgraph/spa-github-pages) for the 404.html redirect (rewrite rule for github pages). It works! <br>
[Natalie Cardot](https://medium.com/@nataliecardot/easily-deploy-a-create-react-app-project-to-github-pages-280529adb086) how to easily Deploy a Create React App Project to GitHub Pages. <br>
[Ginny Fahs](https://medium.com/@ginnyfahs/github-error-authentication-failed-from-command-line-3a545bfd0ca8) how to authenticate on github with 2FA.<br>
[Paulo Campos at Studio Cubo Web](https://github.com/studiocuboweb) for converting this site into github pages host


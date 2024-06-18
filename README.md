# Introduction

airdrop API

## Development

### Requirements

For this project you will need:

-   Docker 19.x or above;
-   Nodejs version 16.x (specific);
-   VSCode or Neovim;

### Environment

For setup the developer environment, please use:

```sh
npm install
cp .env.sample .env
docker-compose up
```

On the first time, you will need to initialize the ReplicaSet:

```sh
docker-compose exec mongodb mongosh -u root -p password --eval 'rs.initiate({_id:"rs0",members:[{_id:0,host:"mongodb"}]})'
```

Add to your /etc/hosts file:

```sh
127.0.0.1 mongodb
```

### force push

# Local development

## Setup PostgreSQL database

docker run \
    --name cp-db \
    --env=POSTGRES_PASSWORD=root \
    --env=POSTGRES_USER=root \
    --env=POSTGRES_DB=cp-db \
    -p 5432:5432 -d postgres:16-alpine

## Connect to database

`
PGPASSWORD=root psql --dbname=cp-db --username=root
`

# Deployment
https://itnext.io/node-js-app-continuous-deployment-with-aws-pm2-and-github-actions-69a30ca29e9e

https://medium.com/@ikbenezer/deploy-your-node-app-to-ec2-with-github-actions-364df98d9918
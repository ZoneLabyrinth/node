const koa = require('koa');
const fs = require('fs');
const mount = require('koa-mount');
const static = require('koa-static');
const graphqlHTTP = require('koa-graphql');

const app = new koa();

app.use(
    mount('/api',
        graphqlHTTP({
            schema: require('./schema')
        })
    )
)

app.use(
    mount('/static', static(`${__dirname}/src/static`))
)

app.use(
    mount('/', async (ctx) => {
        ctx.status = 200 ;
        ctx.body = fs.readFileSync(__dirname + '/src/play.html', 'utf-8');
    })
)


app.listen(3000)
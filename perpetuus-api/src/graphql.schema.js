const { buildSchema } = require('graphql')

var schema = buildSchema(`
    type Query{
        generico: String
    }
`);

var root = {
    generico: () => {
        return 'Funciona :D';
    },
}

module.exports = { schema, root };
const { graphql, buildSchema } = require('graphql');

const mockDatabase = {
    1: {
        id: 1,
        avatar: "https//static001.geekbang.org/account/avatar/00/0f/52/62/1b3ebed5.jpg",
        name: 'ha123o',
        isTlop: true,
        content: '哈哈哈123哈23',
        publishDate: "今天",
        commentNum: 102,
        praiseNum: 52
    },
    2: {
        id: 2,
        avatar: "https//static001.geekbang.org/account/avatar/00/0f/52/62/1b3ebed5.jpg",
        name: 'hao',
        isTlop: true,
        content: '哈哈哈哈11',
        publishDate: "lat",
        commentNum: 101,
        praiseNum: 51
    },
    3: {
        id: 3,
        avatar: "https//static001.geekbang.org/account/avatar/00/0f/52/62/1b3ebed5.jpg",
        name: 'hao',
        isTlop: true,
        content: '哈哈哈哈',
        publishDate: "tod",
        commentNum: 10,
        praiseNum: 3
    }
}


const schema = buildSchema(`
    type Comment {
        id: Int
        avatar: String
        name: String
        isTop: Boolean
        content: String
        publishDate: String
        commentNum: Int
        praiseNum: Int
    }
    type Query {
        comment: [Comment]
    }
    type Mutation {
        praise(id: Int): Int
    }
`)

schema.getQueryType().getFields().comment.resolve = () => {
    console.log(">>>>")
    return Object.keys(mockDatabase).map(key => {
        return mockDatabase[key]
    })
}

schema.getMutationType().getFields().praise.resolve = (args0, { id }) => {
    mockDatabase[id].praiseNum++;
    return mockDatabase[id].praiseNum
}


module.exports = schema;
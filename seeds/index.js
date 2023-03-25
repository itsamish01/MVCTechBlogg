const sequelize = require("../config/connection")
const {User,Blog,Comment} = require("../models")

const users = [
    {
        username: "Lebron",
        password: "miamiheat2013"
    },
    {
        username: "Manu",
        password: "batcave22"
    },
    {
        username: "Curry",
        password: "foultrouble30"
    },

]

const blogs = [
    {
        title: "LeBron's Fourth Championship",
        content: "LeBron James wins his fourth NBA championship with the Los Angeles Lakers",
        userId: 1
    },
    {
        title: "Durant's Return",
        content: "Kevin Durant makes his return to the court with the Brooklyn Nets after missing last season due to injury",
        userId: 2
    },
    {
        title: "Curry's Hot Streak",
        content: "Stephen Curry scores 50+ points in three consecutive games for the first time in his career",
        userId: 3
    },
    {
        title: "Embiid's MVP Campaign",
        content: "Joel Embiid puts up MVP numbers as the Philadelphia 76ers dominate the Eastern Conference",
        userId: 4
    }
]

const comments = [
    {
        body: "LeBron is the GOAT!",
        blogId: 1,
        userId: 2
    },
    {
        body: "I can't wait to see Durant back on the court",
        blogId: 2,
        userId: 1
    },
    {
        body: "Curry is on fire right now!",
        blogId: 3,
        userId: 4
    },
    {
        body: "Embiid is unstoppable",
        blogId: 4,
        userId: 3
    },

]

const plantSeeds = async ()=>{
    try{
        await sequelize.sync({force:true})
        await User.bulkCreate(players,{
            individualHooks:true
        });
        await Blog.bulkCreate(blogs);
        await Comment.bulkCreate(comments);
        process.exit(0);
    } catch(err){
        console.log(err)
    }
}

plantSeeds()
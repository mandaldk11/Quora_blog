const express = require('express')
const app = express()
const path = require('path')
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')

let posts = [
    {
        id: uuidv4(),
        username: "Apna-college",
        content: "cool coding school"
    },
    {
        id: uuidv4(),
        username: "Dharmendra Mandal",
        content: "software Engineer"
    }, {
        id: uuidv4(),
        username: "love",
        content: "Dont trust at all !!!"
    }
]

// console.log(posts)
// middlewares--
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// override with POST having ?_method=PATCH
app.use(methodOverride('_method'))

// templates
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))

// routes
// get posts
app.get('/posts', (req, res) => {
    res.render('index.ejs', { posts })
})

// get particular post
app.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    let post = posts.find((post) => id === post.id);
    // console.log(post)
    res.render('show.ejs', { post })
})

// new posts routes
app.get('/posts/new', (req, res) => {
    res.render('new.ejs',)
})

app.post('/posts', (req, res) => {
    const { username, content } = req.body;
    let id = uuidv4()
    posts.push({ id, username, content })
    res.redirect("/posts")
})

// update posts-
app.get('/posts/edit/:id', (req, res) => {
    const { id } = req.params;
    let post = posts.find((post) => id === post.id);
    res.render('editForm.ejs', { post })
})

app.patch('/posts/edit/:id', (req, res) => {
    try {
        const { id } = req.params;
        let { content } = req.body
        let post = posts.find((post) => id === post.id)
        post.content = content
        res.redirect("/posts")
    } catch (error) {
        console.log(error)
    }

})

// delete -

app.delete('/posts/delete/:id', (req, res) => {
    const { id } = req.params;
    // console.log(id)
    posts = posts.filter((post) => id !== post.id);


    res.redirect("/posts")
    // res.render('editForm.ejs', { post })
})



const PORT = 8080
app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`)
})
import AllPost from './pages/AllPosts';
import SinglePost from './pages/SinglePost';
import Form from './pages/Form';
import {useState, useEffect} from 'react'
import {Route, Routes, Link, useNavigate} from "react-router-dom"

/*      STYLING     */
const h1 = {
  textAlign: "center",
  margin: "10px",
};

const button = {
  backgroundColor: "navy",
  display: "block",
  margin: "auto"
}

function App() {

  const navigate = useNavigate()

  const URL = 'https://qbart-masonite-blog-backend.herokuapp.com/blog/'
  
  const [posts, setPosts] = useState([])

  const nullBlogPost = {
    title: '',
    body: ''
  }

  const [targetBlogPost, setTargetBlogPost] = useState(nullBlogPost)

  /*      FUNCTIONS     */

  const getBlogPosts = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    setPosts(data)
  }

  const addBlogPost = async (newBlogPost) => {
    await fetch(URL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBlogPost)
    })
    getBlogPosts()
  }

  const getTargetBlogPost = (blogPost) => {
    setTargetBlogPost(blogPost)
    navigate('/edit')
  }

  const updateBlogPost = async (blogPost) => {
    await fetch(URL + blogPost.id, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(blogPost)
    })

    getBlogPosts()
  }

  const deleteBlogPost = async (blogPost) => {
    await fetch(URL + blogPost.id, {
      method: "delete"
    })

    getBlogPosts()
    navigate('/')
  }

  useEffect(() => {
    getBlogPosts()
  }, [])

  return (
    <div className="App">
      <h1>My Blogpost</h1>
      <Link to="/new"><button style={button}>Create New Todo</button></Link>
      <Routes>
        <Route path="/" element={<AllPost posts={posts} />} />
        <Route path="/post/:id" element={<SinglePost
          posts={posts}
          edit={getTargetBlogPost}
          deleteBlogPost={deleteBlogPost}
          />} />
        <Route path="/new" element={<Form
          initialBlogPost={nullBlogPost}
          handleSubmit={addBlogPost}
          buttonLabel='Create Blog Post'
         />} />
        <Route path="/edit" element={<Form
          initialBlogPost={targetBlogPost}
          handleSubmit={updateBlogPost}
          buttonLabel='Update Blog Post'
         />} />
      </Routes>
    </div>
  );
}

export default App;

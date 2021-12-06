import {Link, useParams} from 'react-router-dom'

const SinglePost = ({posts, edit, deleteBlogPost}) => {
  const params = useParams()
  const id = parseInt(params.id)

  const post = posts.find((p) => p.id === id)

  ////////////////////
    // Style Object
    /////////////////////
    const div = {
      textAlign: "center",
      border: "3px solid green",
      width: "80%",
      margin: "30px auto"
  }
  return <div>
    <h1>{post?.title}</h1>
    <h2>{post?.body}</h2>
    <button onClick={() => deleteBlogPost(post)}>Delete</button>
    <button onClick={() => edit(post)}>Edit</button>
    <Link to='/'>
      <button>Go Back</button>
    </Link>
  </div>;
};

export default SinglePost;
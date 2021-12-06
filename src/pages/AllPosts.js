import Post from "../components/post";

const AllPost = (props) => {
  return props.posts.map((post) => {
    return <Post key={post.id} post={post} />
  })
};

export default AllPost;
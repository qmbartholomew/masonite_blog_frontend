import {useState} from "react";
import {useNavigate} from "react-router-dom"

const Form = ({initialBlogPost, handleSubmit, buttonLabel}) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialBlogPost)

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmission = (e) => {
    e.preventDefault()
    handleSubmit(formData)
    navigate('/')
  }

  return <form onSubmit={handleSubmission}>
    <input
      type='text'
      onChange={handleChange}
      value={formData.title}
      name='title'
    />
    <input
      type='text'
      onChange={handleChange}
      value={formData.body}
      name='body'
    />
    <input type='submit' value={buttonLabel} />
  </form>
};

export default Form;
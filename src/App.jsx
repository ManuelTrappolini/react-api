import { useState, useEffect } from 'react'


import './App.css'
const emptyPost = {
  title: "",
  image: "",
  content: "",
  tags: '',
  published: false,
}


function App() {

  const [formData, setFormData] = useState(emptyPost)
  const [posts, setPosts] = useState('')
  const [postsData, setPostsData] = useState({})

  function handleClick(e) {
    fetchData()
  }

  function fetchData(url = 'http://127.0.0.1:3002') {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPostsData(data)

      })
  }

  useEffect(fetchData, [])

  /* function fetchAddPost() {
    const url = `http://127.0.0.1:3002/posts`;
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify()
    })
      .then(resp => {
        console.log('Response:', resp);
        return resp.json();
      })
      .then(data => {
        setPostsData(data)

      })
  } */


  function handleFormSubmit(e) {

    e.preventDefault()
    console.log('Form sent', formData);

    const newItem = {
      id: Date.now(),
      ...formData
    }


    setPosts([
      ...posts,
      newItem
    ])

    setFormData(emptyPost)


    const url = `http://127.0.0.1:3002/posts`;
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify()
    })
      .then(resp => {
        console.log('Response:', resp);
        return resp.json(newItem);
      })
      .then(data => {
        setPostsData(data)

      })
  }

  function handleFormField(e) {
    //console.log(e.target);

    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    setFormData({
      ...formData,
      [e.target.name]: value

    })

  }

  return (
    <>

      <div className="containter mt-3 ">
        <h1>Posts List</h1>
        <form onSubmit={handleFormSubmit}>

          <div className="input-group mb-3">

            <label htmlFor="post" className='farm-label m-3'>Post</label>
            <div className="input-group mb-3">
              <input type="text"
                className="form-control"
                placeholder="Recipient's title"
                aria-label="Recipient's title"
                aria-describedby="titlehelper"
                value={formData.title}
                name='title'
                id='title'
                onChange={handleFormField}
              />
              <input type="text"
                className="form-control"
                placeholder="Recipient's tags"
                aria-label="Recipient's tags"
                aria-describedby="tagshelper"
                value={formData.tags}
                name='tags'
                id='tags'
                onChange={handleFormField}
              />
              <input type="text"
                className="form-control"
                placeholder="Recipient's image"
                aria-label="Recipient's image"
                aria-describedby="imagehelper"
                value={formData.image}
                name='image'
                id='image'
                onChange={handleFormField}
              />


              <textarea type="text" className="form-control"
                placeholder="Recipient's content"
                aria-label="Recipient's content"
                aria-describedby="contenthelper"
                value={formData.content}
                name='content'
                id='content'
                onChange={handleFormField}
              />


              <button className='btn btn-outline-secondary' type='submit' onClick={handleFormSubmit}> Click ME</button>
            </div>
            <div className="form-check m-3">
              <input
                id="published"
                name='published'
                type="checkbox"
                className="form-check-input"
                value={formData.published}
                onChange={handleFormField}

              />
              <label className="form-check-label" htmlFor=""> Published </label>
            </div>
          </div>


        </form>

        <ul>
          {postsData.data ? postsData.data.map(post => (
            <div className="col" key={post.id} >
              <div className="card m-3">
                <li className='m-2'>{post.title}:</li>
                <li className='m-2'><img src={`http://127.0.0.1:3002/${post.image}`} height={250} width={250} alt="" /></li>
                <li className='m-2'>{post.content}</li>
                <li className='m-2'>{post.tags}</li>

              </div>
            </div>
          ))
            : <p>no result yet</p>
          }
        </ul >
      </div >
    </>
  )
}

export default App
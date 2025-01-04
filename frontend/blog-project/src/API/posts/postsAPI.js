import axios  from 'axios';

const URL = 'http://localhost:3000/api/posts';

export const createPost = async (post) => {
    console.log(post);
    const response = await axios.post(`${URL}/create`, {
      description: post.description,
      category: post.category,
    },
    {
      withCredentials: true
    });
    return response.data;    
}

export const getPosts = async (filters) => {
    console.log(filters);
    const posts = await axios.get(URL, {
      params: filters,
    });
    return posts.data;
}

export const getPost = async (id) => {
  const posts = await axios.get(`http://localhost:3000/api/posts/${id}`);
  return posts.data;
}

export const updatePost = async (post) => {
  console.log(post?.id);
  const response = await axios.put(`http://localhost:3000/api/posts/update/${post?.id}`, {
    title: post.title,
    description: post.description,
  });
  return response.data;    
}

export const deletePost = async (id) => {
  const posts = await axios.delete(`http://localhost:3000/api/posts/delete/${id}`);
  return posts.data;
}

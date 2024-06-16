import axios  from 'axios';

const URL = 'http://localhost:3000/api/posts/create';

export const createPost = async (post) => {
    console.log(post);
    const response = await axios.post(URL, {
      title: post.title,
      description: post.description,
    });
    return response.data;    
}

export const getPosts = async () => {
    const posts = await axios.get('http://localhost:3000/api/posts');
    return posts.data;
}

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchPost, updatePost } from '../store/postSlice';

const PostEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  useEffect(() => {
    // Fetch the post details when the component mounts
    dispatch(fetchPost(id)).then((response) => {
      const fetchedPost = response.payload;
      if (fetchedPost) {
        setTitle(fetchedPost.title);
        setContent(fetchedPost.content);
        setAuthor(fetchedPost.author);
        setCreatedAt(fetchedPost.createdAt);
      }
    });
  }, [dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedPost = {
      id,
      title,
      content,
      author,
      createdAt,
    };

    // Dispatch the update post action
    dispatch(updatePost({ id, updatedPost })).then(() => {
        if (window.confirm('Are you sure you want to delete this post?')) {
      navigate(`/posts/${id}`); // Redirect to the single post page
        }
    });
  };

  return (
    <div className="post-edit container mx-auto my-auto mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
      <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Edit Post</h2>
          
        </div>
      <form onSubmit={handleSubmit}>
      <div className="sm:col-span-3 mt-10">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Title:
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
        </div>

        <div className="col-span-full mt-5">
              <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
              Content:
              </label>
              <div className="mt-2">
                <textarea
                  id="content"
                  name="content"
                  rows={3}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-red-400">* Write the Post Details</p>
        </div>

        <div className="sm:col-span-3 mt-5">
              <label htmlFor="author" className="block text-sm font-medium leading-6 text-gray-900">
                Author:
              </label>
              <div className="mt-2">
                <input
                  id="author"
                  name="author"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
        </div>
        
        
            <div className="mt-6 flex items-center justify-end gap-x-6 ">
                <Link to="/" type="button" className="text-sm font-semibold leading-6 text-gray-900" >
                Cancel
                </Link>
                <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                
            >
                Save
                </button>
            </div>
      </form>
    </div>
  );
};

export default PostEdit;

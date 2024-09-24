import  { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost, deleteThePost } from '../store/postSlice'; 

const SinglePost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { post, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deleteThePost(id)); 
      navigate('/'); // Redirect to the main post list after deletion
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (

    <>
     <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Single Post Page</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">From Here you can Edit Or Delete</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-1">
          
            <article key={post.id} className=" p-5 hover:animate-background rounded-xl bg-gradient-to-r from-white-300 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.createdAt} className="text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()} {/* Formatted Date */}
                </time>
              </div>
              {post.id}
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  
                    <span className="absolute inset-0" />
                    {post.title}
                  
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.content}</p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="h-10 w-10 rounded-full bg-gray-50"
                />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">{post.author}</p>
                </div>
              </div>

              

            </article>
         
        </div>

        
        <button onClick={handleDelete} className="my-10 px-8 bg-red-500 text-white p-2 rounded">Delete Post</button>
        <Link to={`/edit/${id}`} className="my-10 mx-10 px-10 bg-slate-600 text-white p-2 rounded">Edit Post</Link>
      
        
      </div>
    </div>

  
  </>
   
  );
};

export default SinglePost;
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, incrementPage, decrementPage } from '../store/postSlice';

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, page, pageSize, totalPages, totalCount, loading } = useSelector((state) => state.posts);

  // Fetch posts when the component mounts or when the page number changes
  useEffect(() => {
    dispatch(fetchPosts({ page, pageSize }));
  }, [dispatch, page, pageSize]);

  // Handle lazy loading (load more posts)
  const handleLoadMore = () => {
    if (page < totalPages) {
      dispatch(incrementPage());
    }
  };

   // Handle page increment
   const handleNextPage = () => {
    if (page < totalPages) {
      dispatch(incrementPage());
    }
  };

  // Handle page decrement
  const handlePreviousPage = () => {
    if (page > 1) {
      dispatch(decrementPage());
    }
  };

  return (
    <div className="bg-white py-24 sm:py-32 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Blog Data From API</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">All Pictures are Demo</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 ">
          {posts.map((post) => (
            <article key={post.id} className=" p-5 hover:animate-background rounded-xl bg-gradient-to-r from-white-300 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
              <a href={`/posts/${post.id}`}>
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
              </a>
            </article>

          ))}
        </div>

        {/* Lazy Load More Button */}
        {loading && <p className="text-center text-gray-500 mt-4">Loading more posts...</p>}
        {!loading && page < totalPages && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Load More Posts
            </button>
          </div>
        )}



         {/* Pagination Controls */}
         <div className="flex justify-center mt-4">
          {page > 1 && (
            <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          )}
          <span className="mx-4">{`Page ${page} of ${totalPages} and a Total of ${totalCount} Records `}</span>
          {page < totalPages && (
            <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default PostList;
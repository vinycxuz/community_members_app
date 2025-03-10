import React, {useState} from 'react';
import { useQuery, useMutation } from '@tanstack/react-query'
import { deletePost, getPosts } from '../../../API/posts/postsAPI';
import { Link } from 'react-router-dom';

import AlertMessage from '../../Alert/AlertMessage';
import NoDataFound from '../../Alert/NoDataFound';
import PostCategory from '../../Category/PostCategory';

import { getCategory } from '../../../API/categories/categoriesAPI';
import "../post.style.css";

import { FaSearch } from 'react-icons/fa';
import { MdClear } from 'react-icons/md';

const PostsList = () => {
  const [filters, setFilters] = useState({})
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCategoryFilter = (categoryId) => {
    setFilters({ ...filters, category: categoryId });
    setPage(1);
    refetch();
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilters({ ...filters, title: searchTerm });
    setPage(1);
    refetch();
  }

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
    setPage(1);
    refetch();
  }

  const handlePageChange = (newPage) => {
    setPage(newPage);
    refetch();
  }

  const { isLoading, data, error, isSuccess, refetch } = useQuery({
    queryKey: ['posts', {...filters, page}],
    queryFn: ()=> getPosts({...filters, title: searchTerm, page, limit: 10}),
  });

  const postMutation = useMutation({
    mutationKey: ['delete-post'],
    mutationFn: deletePost,
  });

  /* const deleteHandler = async (id) => {
    postMutation.mutateAsync(id)
    .then(() => {
      refetch();
    })
    .catch((error) => {
      console.log(error);
    });

  }; */
  
  const { data: categories } = useQuery({
    queryKey: ['categories-list'],
    queryFn: getCategory,
  });

  if (isLoading) {
    return <AlertMessage type='loading' message='Loading '/>;
  }
  if (error) {
    return <AlertMessage type='error' message='error' />;
  }
  if (isSuccess && data.length === 0) {
    return <NoDataFound />;
  }
  return (
    <section className="overflow-hidden">
      <div className="container px-4 mx-auto">
        <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6 mt-16">
           {console.log(filters)}
        </h1>

        <h2 className="text-4xl font-bold font-heading mb-10">
          Últimos posts
        </h2>
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col md:flex-row items-center gap-2 mb-4"
        >
          <div className="flex-grow flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Pesquisar posts"
              value={searchTerm}
              onChange={handleSearchChange}
              className="flex-grow p-2 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="p-2 text-white bg-blue-500 hover:bg-blue-600 rounded-r-lg"
            >
              <FaSearch className="h-5 w-5" />
            </button>
          </div>
          <button
            onClick={clearFilters}
            className="p-2 text-sm text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-100 flex items-center gap-1"
          >
            <MdClear className="h-4 w-4" />
            Limpar Filtros
          </button>
        </form>;

        <PostCategory
          categories={categories}
          onCategorySelect={handleCategoryFilter}
          onClearFilters={clearFilters}
        />
        <div className="flex flex-wrap mb-32 -mx-4">
          {data?.posts?.map((post) => (
            <div key={post._id} className="w-full md:w-1/2 lg:w-1/3 p-4">
              <Link to={`/posts/${post._id}`}>
                <div className="bg-white border border-gray-100 hover:border-blue-500 transition duration-200 rounded-2xl h-full p-3">
                  {/*<div className="relative" style={{ height: 240 }}>
                    <div className="absolute top-0 left-0 z-10"></div>
                    <div className="absolute bottom-0 right-0 z-10"></div>
                    <img
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                      src="https://cdn.pixabay.com/photo/2023/12/19/15/51/flowers-8457960_1280.jpg"
                      alt
                    />
                  </div>
                  */}
                  <div className="pt-6 pb-3 px-4">
                    <div
                      className="rendered-html-content mb-2"
                      dangerouslySetInnerHTML={{ __html: post?.description?.substring(0, 100) + (post?.description?.length > 100 ? '...' : '') }}/>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-gray-500 text-sm">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={4}
                        height={4}
                        viewBox="0 0 4 4"
                        fill="none"
                      >
                        <circle cx={2} cy={2} r={2} fill="#B8B8B8" />
                      </svg>
                      <div className="py-1 px-2 rounded-md border border-gray-100 text-xs font-medium text-gray-700 inline-block">
                        {post?.category?.categoryName}
                      </div>
                      <div className="py-1 px-2 rounded-md border border-gray-100 text-xs font-medium text-gray-700 inline-block">
                        {post?.likes?.length || 0} Likes
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center my-8 space-x-4">
        {page > 1 && (
          <button
            onClick={() => handlePageChange(page - 1)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            Previous
          </button>
        )}

        <span className="text-sm font-semibold">
          Page {page} of {data?.totalPages}
        </span>

        {page < data?.totalPages && (
          <button
            onClick={() => handlePageChange(page + 1)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            Next
          </button>
        )}
      </div>
    </section>
  );
};

export default PostsList;
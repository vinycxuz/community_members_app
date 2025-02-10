import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUsersAPI } from "../../../API/users/usersAPI";  

const MyFollowers = () => {
  const {data, isLoading, isError} = useQuery({
       queryKey: ['profile'],
       queryFn: getUsersAPI,
    })
    const myFollowers = data?.followers

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gray-50">
      <div className="relative container px-4 mx-auto">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto mb-20 text-center">
            <h3 className="font-heading text-5xl xs:text-6xl md:text-7xl font-bold text-gray-900 mb-8">
              <span>
                <span className="text-blue-900">Seguidores</span>
              </span>
            </h3>
         
          </div>
          <div className="flex flex-wrap -mx-4 -mb-8">
            {myFollowers?.map((follower, key) => {
              return (
                <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8" key={key}>
                  <div className="max-w-md mx-auto py-10 px-6 text-center bg-white rounded-md">
                    {follower?.profilePicture ? (
                      <img
                        className="w-24 h-24 rounded-full block mb-6 mx-auto"
                        src={follower?.profilePicture}
                        alt
                      />
                    ) : (
                      ''
                    )}
                    <h5 className="text-2xl font-bold text-gray-900 mb-2">
                      {follower?.username}
                    </h5>
                    <span className="block text-orange-900 mb-3">
                      {follower?.email || "No email"}
                    </span>
                    <div className="flex items-center justify-center"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyFollowers;
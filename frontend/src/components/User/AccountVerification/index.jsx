import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { verifyUserAccountAPI } from "../../../API/users/usersAPI";
import { useMutation } from "@tanstack/react-query";
import AlertMessage from "../../Alert/AlertMessage";

const AccountVerifiedComponent = () => {
  const { verifyToken } = useParams();
  const mutation = useMutation({
    mutationKey: ['verify-account'],
    mutationFn: verifyUserAccountAPI,
  })

  useEffect(() => {
    mutation.mutate(verifyToken);
  }, []);

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 500); 
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {mutation?.isPending ? (
        <AlertMessage type="loading" message="Verification in progress..." />
      ) : mutation?.isError ? (
        <AlertMessage
          type="error"
          message="Account verification failed, try again please. If you think it;'s a bug refresh the page"
        />
      ) : (
        mutation.isSuccess && (
          <div
            className={`transition-opacity duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0"
            } flex items-center justify-center h-screen bg-gradient-to-r from-orange-400 to-orange-500`}
          >
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-sm text-center">
              <FaCheckCircle className="mx-auto text-orange-500 text-6xl animate-bounce" />
              <h2 className="text-2xl font-semibold text-gray-700 mt-4">
                Account Verified
              </h2>
              <p className="mt-2 text-gray-600">
                Your account has been successfully verified!
              </p>
              <Link to="/dashboard">
                <button className="mt-4 w-full bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
                  <AiOutlineDashboard className="mr-2" /> Go to Dashboard
                </button>
              </Link>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default AccountVerifiedComponent;
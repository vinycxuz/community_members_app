import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { createCategory } from "../../API/categories/categoriesAPI";
import AlertMessage from "../Alert/AlertMessage";

const AddCategory = () => {
  const categoryMutation = useMutation({
    mutationKey: ['add-category'],
    mutationFn: createCategory,
  });
  const formik = useFormik({
    initialValues: {
      categoryName: "",
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().required("Category is required"),
    }),
    onSubmit: (values) => {
      categoryMutation.mutate(values);
    },
  });
  const isLoading = categoryMutation.isPending;

  const error = categoryMutation.isError;

  const isSuccess = categoryMutation.isSuccess;

  return (
    <div className="flex flex-wrap">
      <div className="w-full  p-4">
        <div className="flex flex-col justify-center max-w-md mx-auto h-full py-12">
          <form onSubmit={formik.handleSubmit}>
            <h1 className="text-3xl font-bold font-heading mb-4">
              Add Category
            </h1>
          {isLoading && (
            <AlertMessage type='loading' message='Loading '/>
          )}  
          {error && (
            <AlertMessage type='error' message='Category already exist' />
          )}
          {isSuccess && (
          <AlertMessage type='success' message='Category created successfully' />
          )}

            <input
              type="text"
              {...formik.getFieldProps("categoryName")}
              className="w-full rounded-full p-4 outline-none border border-gray-100  shadow placeholder-gray-500 focus:ring focus:ring-orange-200 transition duration-200 mb-4"
              placeholder="Category Name"
            />
            {formik.touched.categoryName && formik.errors.categoryName && (
              <div className="text-red-500 mb-4 mt-1">
                {formik.errors.categoryName}
              </div>
            )}

            <button
              className="h-14 inline-flex items-center justify-center py-4 px-6 text-white font-bold font-heading rounded-full bg-orange-500 w-full text-center border border-orange-600 shadow hover:bg-orange-600 focus:ring focus:ring-orange-200 transition duration-200 mb-8"
              type="submit"
            >
              Add Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
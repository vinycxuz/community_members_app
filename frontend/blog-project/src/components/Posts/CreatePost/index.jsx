import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import ReactQuill from 'react-quill';

import { createPost } from '../../../API/posts/postsAPI';

const CreatePost = () => {
  const postMutation = useMutation({
    mutationKey: ['create-post'],
    mutationFn: createPost,
  });
  const formik = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      const post = {
        description: values.description,
      };

      console.log(post);
      postMutation.mutate(post);
    },
});

  const isLoading = postMutation.isPending;

  const isError = postMutation.isError;

  const isSuceess = postMutation.isSuccess;

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error...</div>}
      {isSuceess && <div>Post created</div>}
      <form onSubmit={formik.handleSubmit}>
          {formik.touched.description && formik.errors.description ? (
            <div>{formik.errors.description}</div>
          ) : null}
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePost;
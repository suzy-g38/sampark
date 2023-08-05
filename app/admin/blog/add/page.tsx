import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  Container,
  TextInput,
  Textarea,
  Group,
  MultiSelect,
  createStyles,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

const useStyles = createStyles(() => ({
  main: {
    margin: '8% auto',
    width: '50%',
    display: '-ms-flexbox',
    alignItems: 'center',
    justifyContent: 'center',
    [`@media (max-width: 800px)`]: {
      width: '90%',
    },
  },
}));

const BlogRegister = () => {
  const router = useRouter();
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      title: '',
      author: '',
      content: '',
      tags: [],
      publishedDate: '',
      featuredImage: '',
      comments: [],
      likes: 0,
    },
  });

  const handleAddComment = () => {
    form.values.comments.push({
      name: '',
      email: '',
      comment: '',
    });
    form.setFieldValue('comments', [...form.values.comments]);
  };

  const tagsOptions = [
    { value: 'Technology', label: 'Technology' },
    { value: 'Health', label: 'Health' },
    { value: 'Travel', label: 'Travel' },
    { value: 'Food', label: 'Food' },
    // Add more tag options as needed
  ];

  const handleSubmit = async () => {
    console.log('data: ', form.values);
    try {
      // Here, you can make a POST request to your backend API to save the blog data
      // For example:
      // const response = await fetch('/api/blogs', {
      //   method: 'POST',
      //   body: JSON.stringify(form.values),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      // const data = await response.json();
      // console.log(data);

      // For the purpose of this example, let's assume the blog registration is successful
      toast.success('Blog registered successfully', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false,
      });
      // Redirect to some other page or home page after successful blog registration
      router.push('/');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false,
      });
    }
  };

  return (
    <>
      <Container>
        <h1>Register Your Blog</h1>
        <div className={classes.main}>
          <TextInput
            label="Title"
            placeholder="Enter blog title"
            {...form.getInputProps('title')}
          />
          <TextInput
            label="Author"
            placeholder="Enter author name"
            {...form.getInputProps('author')}
          />
          <Textarea
            label="Content"
            placeholder="Enter blog content"
            {...form.getInputProps('content')}
          />
          <MultiSelect
            label="Tags"
            placeholder="Select tags"
            data={tagsOptions}
            value={form.values.tags}
            onChange={(value) => form.setFieldValue('tags', value)}
          />
          <TextInput
            label="Published Date"
            placeholder="Enter published date"
            type="date"
            {...form.getInputProps('publishedDate')}
          />
          <TextInput
            label="Featured Image"
            placeholder="Enter featured image URL"
            {...form.getInputProps('featuredImage')}
          />

          <Button onClick={handleAddComment} style={{ marginBottom: '10px' }}>
            Add Comment
          </Button>
          {form.values.comments.map((comment, index) => (
            <Group key={index}>
              <TextInput
                label={`Comment ${index + 1} Name`}
                value={comment.name}
                onChange={(e) => {
                  form.values.comments[index].name = e.target.value;
                  form.setFieldValue('comments', [...form.values.comments]);
                }}
              />
              <TextInput
                label={`Comment ${index + 1} Email`}
                value={comment.email}
                onChange={(e) => {
                  form.values.comments[index].email = e.target.value;
                  form.setFieldValue('comments', [...form.values.comments]);
                }}
              />
              <Textarea
                label={`Comment ${index + 1} Content`}
                value={comment.comment}
                onChange={(e) => {
                  form.values.comments[index].comment = e.target.value;
                  form.setFieldValue('comments', [...form.values.comments]);
                }}
              />
              <Button variant="subtle">Delete Comment</Button>
            </Group>
          ))}
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeButton={false}
      />
    </>
  );
};

export default BlogRegister;

import { Schema } from 'express-validator';

const createBlogSchema: Schema = {
  title: {
    in: ['body'],
    isString: true,
    notEmpty: true,
  },
  author: {
    in: ['body'],
    isString: true,
    notEmpty: true,
  },
  content: {
    in: ['body'],
    isString: true,
    notEmpty: true,
  },
  tags: {
    in: ['body'],
    custom: {
      options: (value) => {
        if (!Array.isArray(JSON.parse(value))) {
          throw new Error('Tags must be an array');
        }
        return true;
      },
    },
    notEmpty: true,
  },
  publishedDate: {
    in: ['body'],
    isDate: true,
    notEmpty: true,
  },
  featuredImage: {
    in: ['body'],
    isString: true,
    notEmpty: true,
  },
  comments: {
    in: ['body'],
    custom: {
      options: (value) => {
        if (!Array.isArray(JSON.parse(value))) {
          throw new Error('Comments must be an array');
        }
        JSON.parse(value).forEach((comment:{name:string,email:string,comment:string}) => {
          if (!comment.name || !comment.email || !comment.comment) {
            throw new Error(
              'Each comment must have a name, email, and comment',
            );
          }
        });
        return true;
      },
    },
    optional: true,
  },
  likes: {
    in: ['body'],
    isNumeric: true,
    optional: true,
  },
};

const deleteSchema: Schema = {
  id: {
    in: ['body'],
    isString: {
      errorMessage: 'Invalid id value',
    },
    notEmpty: {
      errorMessage: 'id cannot be empty',
    },
  },
};

export const blogValidationSchema = {
  createBlogSchema,
  deleteSchema,
};

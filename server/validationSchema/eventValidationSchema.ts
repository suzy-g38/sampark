import { Schema } from 'express-validator';

const createEventSchema: Schema = {
  eventName: {
    in: ['body'],
    isString: true,
    notEmpty: true,
  },
  eventType: {
    in: ['body'],
    isString: true,
    notEmpty: true,
  },
  eventDate: {
    in: ['body'],
    isDate: true,
    notEmpty: true,
  },
  eventLocation: {
    in: ['body'],
    isString: true,
    notEmpty: true,
  },
  description: {
    in: ['body'],
    isString: true,
    notEmpty: true,
  },
  organizingOrganization: {
    in: ['body'],
    isString: true,
    notEmpty: true,
  },
  targetAudience: {
    in: ['body'],
    isString: true,
    notEmpty: true,
  },
  activities: {
    in: ['body'],
    custom: {
      options: (value) => {
        if (!Array.isArray(JSON.parse(value))) {
          throw new Error('Activities must be an array');
        }
        JSON.parse(value).forEach((activity:{name:string,description:string}) => {
          if (!activity.name || !activity.description) {
            throw new Error('Each activity must have a name and description');
          }
        });
        return true;
      },
    },
    notEmpty: true,
  },
  volunteering: {
    in: ['body'],
    custom: {
      options: (value) => {
        if (typeof JSON.parse(value) !== 'object') {
          throw new Error('Volunteering must be an object');
        }
        if (
          JSON.parse(value).isVolunteer === false &&
          JSON.parse(value).contact.length === 0
        ) {
          throw new Error(
            'If volunteering is accepted, a contact information must be provided',
          );
        }
        return true;
      },
    },
    optional: true,
  },
  donations: {
    in: ['body'],
    custom: {
      options: (value) => {
        if (typeof JSON.parse(value) !== 'object') {
          throw new Error('Donations must be an object');
        }
        if (
          JSON.parse(value).isDonations === false &&
          JSON.parse(value).contact.length === 0
        ) {
          throw new Error(
            'If donations are accepted, a contact information must be provided',
          );
        }
        return true;
      },
    },
    optional: true,
  },
  logo: {
    in: ['body'],
    isString: true,
    notEmpty: true,
  },
  contactInformation: {
    in: ['body'],
    custom: {
      options: (value) => {
        if (!Array.isArray(JSON.parse(value))) {
          throw new Error('Contact information must be an array');
        }
        JSON.parse(value).forEach((contact:{name:string,link:string}) => {
          if (!contact.name || !contact.link) {
            throw new Error('Each contact must have a name and link');
          }
        });
        return true;
      },
    },
    notEmpty: true,
  },
  socialMediaLinks: {
    in: ['body'],
    optional: true,
    custom: {
      options: (value) => {
        if (typeof JSON.parse(value) !== 'object') {
          throw new Error('Social media links must be an object');
        }
        return true;
      },
    },
  },
  registrationLink: {
    in: ['body'],
    custom: {
      options: (value) => {
        if (typeof JSON.parse(value) !== 'object') {
          throw new Error('Registration link must be an object');
        }
        if (
          JSON.parse(value).isregistration === false &&
          JSON.parse(value).link.length === 0
        ) {
          throw new Error(
            'If registration is required, a link must be provided',
          );
        }
        return true;
      },
    },
    notEmpty: true,
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

export const eventValidationSchema = {
  createEventSchema,
  deleteSchema,
};

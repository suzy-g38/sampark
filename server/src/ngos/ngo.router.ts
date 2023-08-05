import * as express from 'express';
import { Request, Response } from 'express';
import { NgoService } from './ngo.service';
import { validationResult, checkSchema } from 'express-validator';
import { ngoValidationSchema } from '../../validationSchema/ngoValidationSchema';
import { checkAuth } from '../middleware/auth.middleware';
import { NgoType } from './ngo.interface';

export const ngoRouter = express.Router();
interface RequestParams {
  id: string;
  slug: string;
}

ngoRouter.get('/first', async (_, res: Response) => {
  try {
    const ngo = await NgoService.getFirstNgo();
    res.status(200).send({ success: true, ngo: ngo });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

ngoRouter.get('/', async (_, res: Response) => {
  try {
    const ngo = await NgoService.getAllNgos();
    res.status(200).send({ success: true, ngo: ngo });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

ngoRouter.get('/id/:id', async (req: Request<RequestParams>, res: Response) => {
  try {
    const { id } = req.params;
    console.log('id: ', id);
    const ngo = await NgoService.getNgoById(id);
    res.status(200).send({ success: true, ngo: ngo });
  } catch (error) {
    console.log('rror: ', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

ngoRouter.get(
  '/slug/:slug',
  async (req: Request<RequestParams>, res: Response) => {
    try {
      const { slug } = req.params;
      const ngo = await NgoService.getNgoBySlug(slug);
      res.status(200).send({ success: true, ngo: ngo });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  },
);

ngoRouter.post(
  '/create',
  // checkAuth,
  checkSchema(ngoValidationSchema.createNgoSchema),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array(),
        });
      }
      const ngoInfo: NgoType = {
        name: '',
        location: '',
        contactInformation: {
          phone: '',
          website: '',
          email: '',
        },
        vision: '',
        focusAreas: [],
        projects: [],
        teamMembers: [],
        donations: {
          isDonations: false,
          contact: '',
        },
        volunteering: {
          isVolunteer: false,
          contact: '',
        },
        logo: '',
        testimonials: [],
        socialMediaLinks: {
          twitter: '',
          linkedIn: '',
        },
        license: '',
        funding: '',
      };

      ngoInfo.name = req.body.name;
      ngoInfo.location = req.body.location;
      ngoInfo.contactInformation = req.body.contactInformation;
      //   ngoInfo.contactInformation = {
      //    phone: req.body.phone,
      //    website: req.body.website,
      //    email: req.body.email,
      //  };
      ngoInfo.vision = req.body.vision;
      ngoInfo.focusAreas = req.body.focusAreas;
      ngoInfo.projects = req.body.projects;
      ngoInfo.teamMembers = req.body.teamMembers;
      ngoInfo.donations = req.body.donations;
      // ngoInfo.donations = {
      //   isDonations: req.body.isDonations,
      //   contact: req.body.donationContact,
      // };
      ngoInfo.volunteering = req.body.volunteering;

      //  ngoInfo.volunteering = {
      //    isVolunteer: req.body.isVolunteer,
      //    contact: req.body.volunteeringContact,
      //  };
      ngoInfo.logo = req.body.logo;
      ngoInfo.testimonials = req.body.testimonials;
      ngoInfo.socialMediaLinks = req.body.socialMediaLinks;
      // ngoInfo.socialMediaLinks = {
      //   twitter: req.body.twitter,
      //   linkedIn: req.body.linkedIn,
      // };
      ngoInfo.license = req.body.license;
      ngoInfo.funding = req.body.funding;
      // console.log(req.body);
      // const ngoInfo = req.body;
      const ngo = await NgoService.createNgo(ngoInfo);
      res.status(200).send({ success: true, ngo: ngo });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  },
);

ngoRouter.post(
  '/update/:id',
  checkAuth,
  checkSchema(ngoValidationSchema.createNgoSchema),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array(),
        });
      }
      const ngoInfo = req.body;
      const { id } = req.params;
      const ngo = await NgoService.updateNgo(id, ngoInfo);
      res.status(200).send({ success: true, ngo: ngo });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  },
);

ngoRouter.post(
  '/delete',
  checkAuth,
  checkSchema(ngoValidationSchema.deleteSchema),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array(),
        });
      }
      const { id } = req.body;
      const ngo = await NgoService.deleteNgo(id);
      res.status(200).send({ success: true, ngo: ngo });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  },
);

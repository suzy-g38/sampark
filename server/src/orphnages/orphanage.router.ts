import * as express from 'express';
import { Request, Response } from 'express';
import { OrphanageType } from './orphanage.interface';
import { OrphanageService } from './orphanage.service';
import { validationResult, checkSchema } from 'express-validator';
import { orphanageValidationSchema } from '../../validationSchema/orphanageValidationSchema';
import { checkAuth } from '../middleware/auth.middleware';

export const orphanageRouter = express.Router();

interface RequestParams {
  id: string;
  slug: string;
}

orphanageRouter.get('/', async (_, res: Response) => {
  try {
    const orphanage = await OrphanageService.getFirstOrphanage();
    res.status(200).send({ success: true, orphanage: orphanage });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

orphanageRouter.get('/', async (_, res: Response) => {
  try {
    const orphanage = await OrphanageService.getAllOrphanages();
    res.status(200).send({ success: true, orphanage: orphanage });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

orphanageRouter.get(
  '/id/:id',
  async (req: Request<RequestParams>, res: Response) => {
    try {
      const { id } = req.params;
      const orphanage = await OrphanageService.getOrphanageById(id);
      res.status(200).send({ success: true, orphanage: orphanage });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  },
);

orphanageRouter.get(
  '/slug/:slug',
  async (req: Request<RequestParams>, res: Response) => {
    try {
      const { slug } = req.params;
      const orphanage = await OrphanageService.getOrphanageBySlug(slug);
      res.status(200).send({ success: true, orphanage: orphanage });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  },
);

orphanageRouter.post(
  '/create',
  // checkAuth,
  checkSchema(orphanageValidationSchema.createOrphanageSchema),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array(),
        });
      }
      const orphanageInfo:OrphanageType = {
        name: '',
        location: '',
        contactInformation: '',
        vision: '',
        description: '',
        capacity: 0,
        servicesProvided: [],
        startAge: 0,
        endAge: 0,
        logo: '',
        operatingHours: 0,
        license: '',
        staffInformation: [],
        donationInformation: {
          isDonations: false,
          contact: ''
        }
      };

      orphanageInfo.name = req.body.name;
      orphanageInfo.location = req.body.location;
      orphanageInfo.contactInformation = req.body.contactInformation;
      orphanageInfo.vision = req.body.vision;
      orphanageInfo.description = req.body.description;
      orphanageInfo.capacity = parseInt(req.body.capacity);
      orphanageInfo.servicesProvided = JSON.parse(req.body.servicesProvided);
      orphanageInfo.startAge = parseInt(req.body.startAge);
      orphanageInfo.endAge = parseInt(req.body.endAge);
      orphanageInfo.logo = req.body.logo;
      orphanageInfo.operatingHours = parseInt(req.body.operatingHours);
      orphanageInfo.license = req.body.license;
      orphanageInfo.staffInformation = JSON.parse(req.body.staffInformation);
      orphanageInfo.donationInformation = req.body.donationInformation;
      orphanageInfo.testimonials = JSON.parse(req.body.testimonials);
      console.log('orphanageinfo: ', orphanageInfo);
      const orphanage = await OrphanageService.createOrphanage(orphanageInfo);
      res.status(200).send({ success: true, orphanage: orphanage });
    } catch (error) {
      console.log('error: ', error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  },
);

orphanageRouter.post(
  '/update/:id',
  checkAuth,
  checkSchema(orphanageValidationSchema.createOrphanageSchema),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array(),
        });
      }
      const { orphanageInfo } = req.body;
      const { id } = req.params;
      const orphanage = await OrphanageService.updateOrphanage(
        id,
        orphanageInfo,
      );
      res.status(200).send({ success: true, orphanage: orphanage });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  },
);

orphanageRouter.post(
  '/delete',
  checkAuth,
  checkSchema(orphanageValidationSchema.deleteSchema),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array(),
        });
      }
      const { id } = req.body;
      const orphanage = await OrphanageService.deleteOrphanage(id);
      res.status(200).send({ success: true, orphanage: orphanage });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  },
);

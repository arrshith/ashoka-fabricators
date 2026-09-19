import {z} from 'zod';
const optionalDimension=z.string().max(12).refine(v=>!v||(/^\d+(\.\d{1,3})?$/.test(v)&&Number(v)>0),'Enter a positive measurement, or leave blank.');
export const enquirySchema=z.object({
 requestId:z.string().uuid(),product:z.enum(['automatic-rolling-shutters','manual-rolling-shutters','security-gates','automation-motors','custom-fabrication','not-sure']),
 projectType:z.enum(['Residential','Commercial','Industrial','Retail','Warehouse','Other']),
 width:optionalDimension,height:optionalDimension,unit:z.enum(['mm','cm','m','ft']),
 location:z.string().trim().min(2,'Enter your project location.').max(160),requirements:z.string().trim().max(3000),
 name:z.string().trim().min(2,'Enter your name.').max(100),
 phone:z.string().trim().min(7).max(25).regex(/^\+?[\d\s()-]+$/,'Enter a valid phone number.').refine(v=>v.replace(/\D/g,'').length>=7&&v.replace(/\D/g,'').length<=15,'Enter 7–15 phone digits.'),
 email:z.union([z.literal(''),z.string().trim().email().max(254)]),whatsapp:z.string().trim().max(25).refine(v=>!v||/^\+?[\d\s()-]{7,25}$/.test(v),'Check the WhatsApp number.'),
 consent:z.literal(true),website:z.string().max(0),
});
export type Enquiry=z.infer<typeof enquirySchema>;
export const maxFileSize=4*1024*1024;
export const allowedMime=['image/jpeg','image/png','image/webp','application/pdf'];

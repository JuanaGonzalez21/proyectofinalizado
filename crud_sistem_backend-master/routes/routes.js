import express from 'express';
import { createDato, deleteDato, getAllData, getDato, updateDato, getConsecutivo, getAllDataASC} from '../controllers/FormController.js';
const router = express.Router();

router.get('', getAllData)
router.get('/asc', getAllDataASC)
router.post('/create', createDato)
router.get('/con', getConsecutivo)
router.get('/:id', getDato)
router.put('/:id',updateDato)
router.delete('/:id', deleteDato)

export default router;
const { Router } = require('express');
const {addShoppingCar,
       getShoppingCar,
       addItemsShoppingCar,
       deleteItemsShoppingCar,
       getShoppingCarById,
       getAllShoppingCar,
       emptyShoppingCar } = require('../controllers/shoppingcarcontrollers');

const router = Router();

//esta ruta crea un carrito nuevo cuando el usuario se acaba de registrar
router.post('/user/:id', async(req, res) => {
   const {id} = req.params; 
   try {
       const result = await addShoppingCar(id);
       res.status(200).json(result);
   } catch (error) {
       res.status(500).json({message: error.message});
   }
});

//esta ruta devuelve todos los carritos, mediante un query
router.get('/', async(req, res) => {
   const xquery = req.query;
   console.log(xquery);
   try {
       result = await getAllShoppingCar(xquery);
       res.status(200).json(result);       
    } catch (error) {
       res.status(500).json({message: error.message});   
    }
 });
 
 //esta ruta busca un carrito por el ID
router.get('/:id', async(req, res) => {
   const {id} = req.params;
   try {
       result = await getShoppingCarById(id);
       res.status(200).json(result);       
   } catch (error) {
       res.status(500).json({message: error.message});   
   }
});

//esta ruta busca carrito pendiente del usuario logueado por el Id del usuario
router.get('/user/:id', async(req, res) => {
    const {id} = req.params;
    try {
       result = await getShoppingCar(id);
       res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: error.message});      
    }
});

//esta ruta permite agregar items o actualizar cantidades al items del carrito
router.put('/:id', async(req, res) => {
    const {id} = req.params;
    const item = req.body;
    try {
        result = await addItemsShoppingCar(item, id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: error.message});    
    }
});

//esta ruta permite eliminar items del carrito de compras
router.delete('/', async(req, res) => {
    const item = req.body;
    try {
        result = await deleteItemsShoppingCar(item);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: error.message});         
    }
});

//esta ruta vacia completamente el carrito de compras
router.delete('/:id', async(req, res) => {
    const {id} = req.params;   
    try {
        result = await emptyShoppingCar(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: error.message});    
    }
})

module.exports = router;
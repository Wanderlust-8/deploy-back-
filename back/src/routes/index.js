const {Router} = require('express');
const handlersPackages = require('../handlers/packageshandlers');
const handlersTypePackages = require('../handlers/typePackageshandlers');
const handlersAirlines = require('../handlers/airlineshandlers');
const handlerUser = require('../handlers/usershandlers');
const handlerComment = require('../handlers/commenthandlers');
const handlersContinents = require("../handlers/continentshandlers");
const handlersCountries = require("../handlers/countrieshandlers");
const handlersCities = require("../handlers/citieshandlers");
const handlersActivity = require("../handlers/activityhandlers");
const handlersHotels = require("../handlers/hotelhandlers");
const handlersAdmins = require("../handlers/adminhandlers");
const handlersCityOrigins = require("../handlers/cityOriginshandlers");
const handlersShoppingCar = require('../handlers/shoppingCarHandlers');

const router = Router();

router.use('/packages', handlersPackages);
router.use('/typePackages', handlersTypePackages);
router.use('/airlines', handlersAirlines);
router.use('/users', handlerUser);
router.use('/admins', handlersAdmins);
router.use('/comments', handlerComment)
router.use("/continents", handlersContinents);
router.use("/countries", handlersCountries);
router.use("/cities", handlersCities);
router.use("/cities-origins", handlersCityOrigins);
router.use("/activity", handlersActivity);
router.use("/hotels", handlersHotels);
router.use('/shoppingCar', handlersShoppingCar);



module.exports = router;
// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const invValidate = require("../utilities/inventory-validation")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));


// Route to build inventory by vehicle view
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildByVehicleId));


// Route to build the inventory management view
router.get("/", utilities.handleErrors(invController.buildManagement));


// Route to build the add classification view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));

// Route to process the add classification form
router.post(
    "/add-classification",
    invValidate.classificationRules(),
    invValidate.checkClassData,
    utilities.handleErrors(invController.addClassification)
)


// Route to build the add inventory view
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory));

// Route to process the add inventory form
router.post(
    "/add-inventory",
    invValidate.addInventoryRules(),
    invValidate.checkAddInvData,
    utilities.handleErrors(invController.addInventory)
)

// Route to get inventory data
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON));

// Route to build the edit inventory view
router.get("/edit/:inv_id", utilities.handleErrors(invController.buildEditInventory));

// Route to process the edit inventory form
router.post(
    "/update", 
    invValidate.addInventoryRules(),
    invValidate.checkUpdateData,
    utilities.handleErrors(invController.updateInventory)
)

module.exports = router
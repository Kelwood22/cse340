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
router.get(
    "/",
    utilities.checkLogin,
    utilities.checkAccountType,
    utilities.handleErrors(invController.buildManagement));


// Route to build the add classification view
router.get(
    "/add-classification",
    utilities.checkLogin,
    utilities.checkAccountType,
    utilities.handleErrors(invController.buildAddClassification));

// Route to process the add classification form
router.post(
    "/add-classification",
    utilities.checkLogin,
    utilities.checkAccountType,
    invValidate.classificationRules(),
    invValidate.checkClassData,
    utilities.handleErrors(invController.addClassification)
)


// Route to build the add inventory view
router.get(
    "/add-inventory",
    utilities.checkLogin,
    utilities.checkAccountType,
    utilities.handleErrors(invController.buildAddInventory));

// Route to process the add inventory form
router.post(
    "/add-inventory",
    utilities.checkLogin,
    utilities.checkAccountType,
    invValidate.addInventoryRules(),
    invValidate.checkAddInvData,
    utilities.handleErrors(invController.addInventory)
)

// Route to get inventory data
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON));

// Route to build the edit inventory view
router.get(
    "/edit/:inv_id",
    utilities.checkLogin,
    utilities.checkAccountType,
    utilities.handleErrors(invController.buildEditInventory));

// Route to process the edit inventory form
router.post(
    "/update",
    utilities.checkLogin,
    utilities.checkAccountType,
    invValidate.addInventoryRules(),
    invValidate.checkUpdateData,
    utilities.handleErrors(invController.updateInventory)
)

router.get(
    "/delete/:inv_id",
    utilities.checkLogin,
    utilities.checkAccountType,
    utilities.handleErrors(invController.buildDeleteInventory));

router.post(
    "/delete",
    utilities.checkLogin,
    utilities.checkAccountType,
    utilities.handleErrors(invController.deleteInventory));

module.exports = router
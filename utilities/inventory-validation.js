const utilities = require("../utilities/")
const { body, validationResult } = require("express-validator")
const validate = {}

/* ****************************
 * Classification Data Validation Rules
 * **************************** */
validate.classificationRules = () => {
    return [
        // classification name is required and must be string
        body("classification_name")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Please provide a classification name.")
            .isAlpha()
            .withMessage("Classification name must contain only letters.")
            .isLength({ min: 2 })
            .withMessage("Classification name must be at least 2 characters long."),
    ]
}

/* ****************************
 * Check data and return errors or continue to add classification
 * **************************** */
validate.checkClassData = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        return res.render("inventory/add-classification", {
            title: "Add Classification",
            nav,
            errors,
        })
    }
    next()
}

/* ****************************
 * Inventory Data Validation Rules
 * **************************** */
validate.addInventoryRules = () => {
    return [
        body("classification_id")
            .trim()
            .isInt({ min: 1 })
            .withMessage("Please select a valid classification."),
        
        body("inv_make")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please enter a vehicle make."),
        
        body("inv_model")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please enter a vehicle model."),
        
        body("inv_year")
            .trim()
            .isInt({ min: 1900, max: 2099 })
            .withMessage("Please enter a valid year."),
        
        body("inv_description")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please enter a description."),
        
        body("inv_image")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please enter an image path."),
        
        body("inv_thumbnail")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please enter a thumbnail path."),
        
        body("inv_price")
            .trim()
            .isFloat({ min: 0 })
            .withMessage("Please enter a valid price."),
        
        body("inv_miles")
            .trim()
            .isFloat({ min: 0 })
            .withMessage("Please enter valid mileage."),
        
        body("inv_color")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please enter a color."),
    ]
}

/* ****************************
 * Check inventory data and return errors or continue to add inventory
 * **************************** */
validate.checkAddInvData = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        let classificationList = await utilities.buildClassificationList(req.body.classification_id)

        return res.render("inventory/add-inventory", {
            title: "Add New Inventory",
            nav,    
            classificationList,
            errors,
            ...req.body,
        })
    }
    next()
}

/* ****************************
 * Check inventory data and return errors to edit-inventory view
 * **************************** */
validate.checkUpdateData = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        let classificationList = await utilities.buildClassificationList(req.body.classification_id)

        return res.render("inventory/edit-inventory", {
            title: `Edit ${req.body.inv_make} ${req.body.inv_model}`,
            nav,    
            classificationList,
            errors,
            inv_id: req.body.inv_id,
            ...req.body,
        })
    }
    next()
}

module.exports = validate
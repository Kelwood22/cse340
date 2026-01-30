const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* *******************************
 *  Build inventory by classification view
 * ******************************* */
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
        title: className + " vehicles",
        nav,
        grid,
    })
}

/* *******************************
 *  Build inventory by vehicle view
 * ******************************* */
invCont.buildByVehicleId = async function (req, res, next) {
    const inv_id = req.params.inv_id
    const data = await invModel.getInventoryById(inv_id)
    const vehicle = data[0]
    let nav = await utilities.getNav()
    const detail = await utilities.buildVehicleDetail(vehicle)

    res.render("./inventory/vehicle-detail", {
        title: `${vehicle.inv_make} ${vehicle.inv_model}`,
        nav,
        detail,
    })
}

/* *******************************
* Build Managment View
* ******************************* */
invCont.buildManagement = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render("./inventory/management", {
        title: "Vehicle Management",
        nav,
        errors: null,
    })
}

/* *******************************
 * Build Add Classification View
 * ******************************* */
invCont.buildAddClassification = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render("./inventory/add-classification", {
        title: "Add Classification",
        nav,
        errors: null,
    })
}

/* *******************************
 * Process Add Classification
 * ******************************* */
invCont.addClassification = async function (req, res, next) {
    const { classification_name } = req.body
    const addResult = await invModel.addClassification(classification_name)

    if (addResult.rowCount > 0) {
        req.flash("notice", `The classification ${classification_name} was added successfully.`)
        const nav = await utilities.getNav()

        return res.status(201).render("./inventory/management", {
            title: "Vehicle Management",
            nav,
            errors: null,
        })
    } else {
        req.flash("notice", "Sorry, the classification could not be added.")
        const nav = await utilities.getNav()

        return res.status(501).render("inventory/add-classification", {
            title: "Add Classification",
            nav,
            errors: null,
        })
    }
}

/* *******************************
 * Build Add Inventory View
 * ******************************* */
invCont.buildAddInventory = async function (req, res, next) {
    let nav = await utilities.getNav()
    let classificationList = await utilities.buildClassificationList()

    res.render("./inventory/add-inventory", {
        title: "Add New Inventory",
        nav,
        classificationList,
        errors: null,
        inv_make: "",
        inv_model: "",
        inv_year: "",
        inv_description: "",
        inv_image: "",
        inv_thumbnail: "",
        inv_price: "",
        inv_miles: "",
        inv_color: "",
    })
}

/* *******************************
 * Process Add Inventory
 * ******************************* */
invCont.addInventory = async function (req, res, next) {
    let nav = await utilities.getNav()

    const {
        classification_id,
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color,      
    } = req.body

    const addResult = await invModel.addInventory(
        classification_id,
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color,
    )

    if (addResult.rowCount > 0) {
        req.flash("notice", `The inventory item ${inv_make} ${inv_model} was added successfully.`)
        return res.redirect("/inv")
    } else {
        req.flash("notice", "Sorry, the inventory item could not be added.")
        let classificationList = await utilities.buildClassificationList(classification_id)

        return res.status(501).render("inventory/add-inventory", {
            title: "Add New Inventory",
            nav,
            classificationList,
            errors: null,
            inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_miles,
            inv_color,
        })
    }
}

module.exports = invCont
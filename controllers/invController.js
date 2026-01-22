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

module.exports = invCont
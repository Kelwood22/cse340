const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function (req, res) {
    const nav = await utilities.getNav()
    res.render("index", {title: "Home", nav})
}

/* *******************************
 * Intentional error trigger for Task 3
 *********************************/
baseController.triggerError = async function (req, res, next) {
    const error = new Error("Intentional server crash for testing error handling.")
    error.status = 500
    throw error
}

module.exports = baseController
const validateOrder = (order) => {
    // validate order array 
    if (!Array.isArray(order)) return ["notArrayError", "order should be sent as an array"]
    if (order.length === 0) return ["orderSizeError1", "There are too few cassettes in this order"]
    if (order.length > 5 || order.length === 5 && order[0][0] !== "cassettes") return ["orderSizeError2", "There are too many cassettes in this order"]

    const validDenominations = ["5", "10", "20", "50"]

    // validate cassetes
    for (let i = 0; i < order.length; i++) {
        let cassette = order[i]

        if (!Array.isArray(cassette)) return ["notArrayError", "cassette should be sent as an array"]

        if (cassette[0] === "cassettes") {
            if (cassette[1] !== order.length - 1) return ["metaItemError", "the  meta item does not match the number of cassettes"]
            continue
        }

        if (!validDenominations.includes(cassette[0])) return ["denominationError", "cassettes should only be filled with 5, 10, 20, 50 pound notes"]

        if (cassette[1] / parseInt(cassette[0]) !== 2000) return ["notesAmountError", "cassettes should always be filled with 2000 notes"]


    }
    return ['valid', "order valid, send for packing"]
}


module.exports = validateOrder;
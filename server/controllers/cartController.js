import { StatusCodes } from "http-status-codes";

const cartController = {
    addToCart: async(req, res) => {
        const { userID, productID } = req.body;
    }
}

export default cartController;

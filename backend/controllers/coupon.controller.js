import Coupon from "../models/coupon.model"
export const getCoupon = async (req, res) => {
     try {
        const {_id:userId} =req.user
        const coupon = await Coupon.findOne({userId,isActive:true})
        if(!coupon){
            return res.status(404).json({
                success: false,
                error: "Coupon not found"
            })
        }
        res.status(200).json({
            success: true,
            data: coupon
        })
     } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
     }
}
export const validateCoupn = async (req, res) => {
    const {code} =req.body
    try {
        const coupon = await Coupon.findOne({code,isActive:true})
        if(!coupon){
            return res.status(404).json({
                success: false,
                error: "Coupon not found"
            })
        }
        res.status(200).json({
            success: true,
            data: coupon
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}
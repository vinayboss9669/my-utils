const logoutUser = asyncHandler(async(req,res)=>{
    const options ={
        httpOnly:true,
        secure:true
    }
    return res.status(200)
    .clearCookie("accessToken",options)
    .json(new ApiResponse(200,{},"Logout successfully"));
})

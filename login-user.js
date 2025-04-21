const signInUser = asyncHandler(async(req,res)=>{
    if (!req.body) {
        throw new ApiError(400, "Request body is missing");
    }
    console.log(req.body);
    const {username,password} = req.body

    if(!username){
        throw new ApiError(400,"User doesnot exist on our systems.")
    }

    const user = await User.findOne({
        $or:[{username}]
    })
    const passwordValid = await user.isPasswordCorrect(password)

    if(!passwordValid){
        throw new ApiError(401,"Invalid credentials. Try with different (you have only 3 attempts and you will temporary blocked.)")
    }
    const {accessToken} = await generateAccessToken(user._id);

    const options = {
        httpOnly:true,
        secure:true
    }
    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .json(
        new ApiResponse(
            200,
            {
                username:user.username,
                email:user.email,
                accessToken
            },
            "User logged in successfully"
        )
    )
})

const signUpUser = asyncHandler(async(req,res)=>{
    const {username,email,password,keyword} = req.body;

    if ([email,password,username,keyword].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"All fields are required.") // message to be changed in english
    }
    // if(!validateEmail(email)){
    //     throw new ApiError(400,"Please enter a valid email.") // message to be changed in english
    // }

    const existedUser = await User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"User exist with email. PLease try with another credentials.") // message to be changed in english
    }

    const user = await User.create({
        username:username.toLowerCase(),
        email,
        password,
        keyword
    })

    const createdUser = await User.findById(user._id).select(
        "-password"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while signing. Please try again.")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User created successfully.")
    )
});

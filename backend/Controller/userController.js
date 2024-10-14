import { v2 as cloudinary } from "cloudinary";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middleware/Error.js";
import { generateToken } from "../utils/jwtToken.js";


export const register = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Avatar Required!", 400));
    }
    const { avatar, resume } = req.files;

    //POSTING AVATAR
    const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(
        avatar.tempFilePath,
        { folder: "AVATAR" }
    );
    if (!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error) {
        console.error(
            "Cloudinary Error:",
            cloudinaryResponseForAvatar.error || "Unknown Cloudinary error"
        );
        return next(new ErrorHandler("Failed to upload avatar to Cloudinary", 500));
    }

    //POSTING RESUME
    const cloudinaryResponseForResume = await cloudinary.uploader.upload(
        resume.tempFilePath,
        { folder: "RESUME" }
    );
    if (!cloudinaryResponseForResume || cloudinaryResponseForResume.error) {
        console.error(
            "Cloudinary Error:",
            cloudinaryResponseForResume.error || "Unknown Cloudinary error"
        );
        return next(new ErrorHandler("Failed to upload resume to Cloudinary", 500));
    }
    const {
        Name,
        email,
        phone,
        aboutMe,
        password,
        portfolioURL,
        githubURL,
        instagramURL,
        twitterURL,
        facebookURL,
        linkedInURL,
    } = req.body;
    const user = await User.create({
        Name,
        email,
        phone,
        aboutMe,
        password,
        portfolioURL,
        githubURL,
        instagramURL,
        twitterURL,
        facebookURL,
        linkedInURL,
        avatar: {
            public_id: cloudinaryResponseForAvatar.public_id, // Set your cloudinary public_id here
            url: cloudinaryResponseForAvatar.secure_url, // Set your cloudinary secure_url here
        },
        resume: {
            public_id: cloudinaryResponseForResume.public_id, // Set your cloudinary public_id here
            url: cloudinaryResponseForResume.secure_url, // Set your cloudinary secure_url here
        },
    });
    generateToken(user, "User Registered!", 201, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Provide Email And Password!", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Email Or Password!", 404));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email Or Password", 401));
    }
    generateToken(user, "Login Successfully!", 200, res);
});

export const logout = catchAsyncErrors(async (req, res, next) => {
    res
        .status(200)
        .cookie("token", "", {
            httpOnly: true,
            expires: new Date(Date.now())
        })
        .json({
            success: true,
            message: "Logged Out Succesfully"
        });
});

export const getUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    });
});

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        Name: req.body.Name,
        email: req.body.email,
        phone: req.body.phone,
        aboutMe: req.body.aboutMe,
        githubURL: req.body.githubURL,
        instagramURL: req.body.instagramURL,
        portfolioURL: req.body.portfolioURL,
        facebookURL: req.body.facebookURL,
        twitterURL: req.body.twitterURL,
        linkedInURL: req.body.linkedInURL,
    };
    if (req.files && req.files.avatar) {
        const avatar = req.files.avatar;
        const user = await User.findById(req.user.id);
        const profileImageId = user.avatar.public_id;
        await cloudinary.uploader.destroy(profileImageId);
        const newProfileImage = await cloudinary.uploader.upload(
            avatar.tempFilePath,
            {
                folder: "AVATAR",
            }
        );
        newUserData.avatar = {
            public_id: newProfileImage.public_id,
            url: newProfileImage.secure_url,
        };
    }

    if (req.files && req.files.resume) {
        const resume = req.files.resume;
        const user = await User.findById(req.user.id);
        const resumeFileId = user.resume.public_id;
        if (resumeFileId) {
            await cloudinary.uploader.destroy(resumeFileId);
        }
        const newResume = await cloudinary.uploader.upload(resume.tempFilePath, {
            folder: "RESUME",
        });
        newUserData.resume = {
            public_id: newResume.public_id,
            url: newResume.secure_url,
        };
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        message: "Profile Updated Successfully",
        user,
    });
});

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const user = await User.findById(req.user.id).select("+password");
    if (!currentPassword || !newPassword || !confirmNewPassword) {
        return next(new ErrorHandler("Please Fill All Fields.", 400));
    }
    const isPasswordMatched = await user.comparePassword(currentPassword);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Incorrect Current Password!"));
    }
    if (newPassword !== confirmNewPassword) {
        return next(
            new ErrorHandler("New Password And Confirm New Password Do Not Match!")
        );
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({
        success: true,
        message: "Password Updated Successfully",
    });
});

export const getUserForPortfolio = catchAsyncErrors(async (req, res, next) => {
    const id = "66ed637b9ba5088e34e6358d";
    const user = await User.findById(id);
    res.status(200).json({
        success: true,
        user,
    });
});



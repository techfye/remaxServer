const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
// const { welcomeEmail } = require("../utils/welcomeEmail");



const registerUser = asyncHandler(async (req, res) => {
    const {
        firstName, lastName,
        businessType,
        companyName,
        regState,
        tradeName,
        inBusinessSince,
        physicalAddress,
        shopNumber,
        city,
        state,
        zipCode,
        telBusiness,
        fax,
        email,
        fedTaxId,
        resaleTaxId,
        jbtId,
        type,
        password,
        signature,
        printTitle,
        printName,
        drivingLicence,
        resaleFile,
        privacyPolicy,

    } = req.body.data;


    const userExists = await User.findOne({
        email
    });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    let salt = await bcrypt.genSalt(10);
    let hashedpassword = await bcrypt.hash(password, salt);



    const user = await User.create({
        firstName,
        lastName,
        businessType,
        companyName,
        regState,
        tradeName,
        inBusinessSince,
        physicalAddress,
        shopNumber,
        city,
        state,
        zipCode,
        telBusiness,
        fax,
        email,
        fedTaxId,
        resaleTaxId,
        jbtId,
        type,
        signature,
        printTitle,
        printName,
        drivingLicence,
        resaleFile,
        privacyPolicy,
        password: hashedpassword,
        isApproved: "Pending",

    });
    // welcomeEmail(user);
    if (user) {
        res.status(201).json({
            token: generateToken(user._id),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            telBusiness: user.telBusiness,
            fax: user.fax,
            type: user.type,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});


const RedisterConsumerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        res.status(400);
        throw new Error("User already exists");
    }
    let salt = await bcrypt.genSalt(10);
    let hashedpassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ firstName: name, email, password: hashedpassword, isApproved: "Approved", type: "Consumer" });
    if (newUser) {
        res.status(201).json({
            token: generateToken(newUser._id),
            name: newUser.firstName,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});


const approveUser = asyncHandler(async (req, res) => {
    const { type, amount, limit, tier, isApproved,
        firstName, lastName,
        businessType,
        companyName,
        regState,
        tradeName,
        inBusinessSince,
        physicalAddress,
        shopNumber,
        city,
        state,
        zipCode,
        telBusiness,
        fax,
        email,
        fedTaxId,
        resaleTaxId,
        jbtId,
    } = req.body;
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
        user.firstName = firstName;
        user.lastName = lastName;
        user.businessType = businessType;
        user.companyName = companyName;
        user.regState = regState;
        user.tradeName = tradeName;
        user.inBusinessSince = inBusinessSince;
        user.physicalAddress = physicalAddress;
        user.shopNumber = shopNumber;
        user.city = city;
        user.state = state;
        user.zipCode = zipCode;
        user.telBusiness = telBusiness;
        user.fax = fax;
        user.email = email;
        user.fedTaxId = fedTaxId;
        user.resaleTaxId = resaleTaxId;
        user.jbtId = jbtId;
        user.type = type;
        user.tier = tier;
        user.credit.amount = amount;
        user.credit.limit = limit;
        user.isApproved = isApproved;
        const newupdatedUser = await user.save();
        const updatedUser = await newupdatedUser.populate('tier')
        res.json(updatedUser);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body;
    const user = await User.findOne({
        email
    });
    if (user && (await bcrypt.compare(password, user.password)) && (user.isApproved === 'Approved')) {
        res.json({
            token: generateToken(user._id),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            telBusiness: user.telBusiness,
            fax: user.fax,
            type: user.type,

        });
    } else {
        res.status(401);
        res.json({ "error": "Invalid email or password" });
    }
});


const loginAdminUser = asyncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body;
    const user = await User.findOne({
        email
    });
    if (user && (await bcrypt.compare(password, user.password)) && (user.isApproved === 'Approved') && (user.isAdmin === true)) {
        res.json({
            token: generateToken(user._id),
            isAdmin: user.isAdmin,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            telBusiness: user.telBusiness,
            fax: user.fax,
            type: user.type,

        });
    } else {
        res.status(401);
        res.json({ "error": "Invalid email or password" });
    }
});

const registerExistingUser = asyncHandler(async (req, res) => {
    const {
        firstName, lastName,
        customerAccount,
        email,
        password,
    } = req.body;

    const userExists = await User.findOne({
        email
    });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    let salt = await bcrypt.genSalt(10);
    let hashedpassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        firstName, lastName,
        customerAccount,
        email,
        password: hashedpassword,
        isApproved: "Approved",
    });
    if (user) {
        res.status(201).json({
            token: generateToken(user._id),
            name: user.name,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});



const editUser = asyncHandler(async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        telBusiness,
        fax
    } = req.body;
    const user = await User.findById(req.user.id);
    if (user) {
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.telBusiness = telBusiness;
        user.fax = fax;


        const updatedUser = await user.save();
        // console.log(updatedUser);
        res.json(updatedUser);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const changePassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const user = await User.findById(req.user.id);
    if (user) {
        let salt = await bcrypt.genSalt(10);
        let hashedpassword = await bcrypt.hash(password, salt);
        user.password = hashedpassword;
        const updatedUser = await user.save();
        res.json(updatedUser);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});



const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
        await user.remove();
        res.json({
            message: "User removed"
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const getUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id).select("-password");
    if (user) {
        const data = {
            name: user.name,
            isAdmin: user.isAdmin,
        }
        res.json(data);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});


const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({ isAdmin: false }).populate("tier");
    res.json(users);
});




module.exports = {
    registerUser,
    approveUser,
    loginUser,
    editUser,
    deleteUser,
    getUser,
    getAllUsers,
    registerExistingUser,
    loginAdminUser,
    RedisterConsumerUser,
    changePassword
};
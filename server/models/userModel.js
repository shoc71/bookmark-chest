import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Please add a name"],
    },

    email : {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        lowercase: true,
        trim: true
    },

    password : {
        type: String,
        required : [true, "Please add a password"],
        minLength : [6, "Password must be at least 6 characters"],
    },

    role : {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    }
},{
    timestamps: true // createdAt, updatedAt
});

// Pre-save hook to hash password before saving to database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        console.error("User Password Hashing Error: ", error.message);
        next(error);
    }
});

// Method to compare password
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
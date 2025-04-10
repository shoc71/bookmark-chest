import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({

    

}, {
    timestamps: true
});

const File = mongoose.model("File", fileSchema);

export default File;
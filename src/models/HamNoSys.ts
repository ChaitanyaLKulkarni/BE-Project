import mongoose from "mongoose";
export interface IHamNoSys {
    _id?: mongoose.Types.ObjectId;
    symbol: string;
    unicode: string;
    ham: string;
}
const HamNoSysSchema = new mongoose.Schema<IHamNoSys>({
    symbol: String,
    ham: String,
    unicode: String,
});

export default mongoose.models.HamNoSys ||
    mongoose.model("HamNoSys", HamNoSysSchema);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/Project');
const UserSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    nameCompany: {
        type: String
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    questions: {
        type: String
    },
    legalEntity: {
        type: Boolean,
        required: true
    }
});
const UserModel = mongoose_1.default.model("users", UserSchema);
app.get('/feed', (req, res) => {
    UserModel.find({}).then(function (users) {
        res.json(users);
    }).catch(function (err) {
        console.log(err);
    });
});
app.post('/feedback', (req, res) => {
    try {
        const doc = new UserModel({
            email: req.body.email,
            name: req.body.name,
            nameCompany: req.body.nameCompany,
            phoneNumber: req.body.phoneNumber,
            questions: req.body.questions,
            legalEntity: req.body.legalEntity
        });
        UserModel.create(doc);
        res.status(201).send("All good");
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось создать пользователя",
        });
    }
});
app.get('/', (req, res) => {
    res.send('Hello from backend!!');
});
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

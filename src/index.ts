import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors';
import bodyParser from 'body-parser';

const port = process.env.PORT || 3000

const app = express()
app.use(cors());
app.use(express.urlencoded());
app.use(bodyParser.json())
mongoose.connect('mongodb://localhost:27017/Project')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name:{
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
    questions:{
        type: String
    },
    legalEntity:{
        type: Boolean,
        required: true
    }
})

const UserModel = mongoose.model("users", UserSchema)

app.get('/feed', (req, res) =>{
    UserModel.find({}).then(function(users){
        res.json(users)
    }).catch(function(err){
        console.log(err)
    })
})

app.post('/feedback', (req, res) =>{
    try{
        const doc = new UserModel({
            email: req.body.email,
            name: req.body.name,
            nameCompany: req.body.nameCompany,
            phoneNumber: req.body.phoneNumber,
            questions: req.body.questions,
            legalEntity: req.body.legalEntity
        });
        UserModel.create(doc)
        res.status(201).send("All good")
    } catch (err) {
        console.log(err);
        res.status(500).json({
          message: "Не удалось создать пользователя",
        });
    }
})

app.get('/', (req, res) =>{
    res.send('Hello from backend!!')
})


app.listen(port, () =>{
    console.log(`App listening on port ${port}`)
})
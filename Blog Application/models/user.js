const {createHmac , randomBytes} = require('crypto');
const { Schema, model } = require('mongoose');


const userSchema  = new Schema({
    fullName: {
        type: String, 
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt:{
        type: String
    },
    password: {
        type: String,
        required: true,
    },
    profileImageURL: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER'
    }
}, { timestamps: true });


userSchema.pre('save', function(next) {
    if(!this.isModified('password')) return;

    if (this.isModified('password')) {
        const salt = randomBytes(16).toString();
        this.salt = salt;
        this.password = createHmac('sha256', salt).update(this.password).digest('hex');
    }
    // next();
});

userSchema.static('matchPassword', async function(email, password){
    const user = await this.findOne({email});
    if(!user) throw new Error('User not found');

    const salt = user.salt;
    const hashedPassword = user.password;

    const inputHashedPassword = createHmac('sha256', salt).update(password).digest('hex');

    if(inputHashedPassword !== hashedPassword) throw new Error('Invalid password');

    return {...user, password: undefined, salt: undefined};
});

const User = model('User', userSchema);

module.exports = User;
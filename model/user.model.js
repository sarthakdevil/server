import {Mongoose, Schema,model} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const userSchema = new Schema(
    {
      fullName: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [5, 'Name must be at least 5 characters'],
        lowercase: true,
        trim: true, // Removes unnecessary spaces
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Please fill in a valid email address',
        ], // Matches email against regex
      },
      password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false, // Will not select password upon looking up a document
      },
      subscription: {
        id: String,
        status: String,
      },
      avatar: {
        public_id: {
          type: String,
        },
        secure_url: {
          type: String,
        },
      },
      role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
      },
      forgotPasswordToken: String,
      forgotPasswordExpiry: Date,
    },
    {
      timestamps: true,
    });
    // Password hashing middleware
    userSchema.pre('save',async function(next) {
        if(!this.isModified('password')){
        return next();
        }
        this.password =await bcrypt.hash(this.password,10);
    })
    userSchema.methods = 
    {
        generateJWTToken: async function () {
            return await jwt.sign(
              { id: this._id, role: this.role, subscription: this.subscription },
              process.env.JWT_SECRET,
              {
                expiresIn: process.env.JWT_EXPIRY,
              }
            );
          },
          comparePassword: async function (candidatePassword) {
            return await bcrypt.compare(candidatePassword, this.password);
        },
        generateForgotPasswordToken:function(){
          const token= crypto.randomBytes(20).toString('hex');
          this.forgotPasswordToken=token;
          this.forgotPasswordExpiry=Date.now()+36000
          return token;
          }
    };

    const User = model('User', userSchema);

    export default User
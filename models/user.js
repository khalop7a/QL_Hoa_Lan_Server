class User{
    constructor(uid, email, emailVerified, phoneNumber, password, displayName, photoURL, disabled){
        this.uid = uid;
        this.email = email;
        this.emailVerified = emailVerified;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.displayName = displayName;
        this.photoURL = photoURL;
        this.disabled = disabled;
    }
}

module.exports = User
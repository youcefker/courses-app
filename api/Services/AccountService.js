const Account = require('../Models/Account')

module.exports = {
    createAccount : async (data, callBack) => {
        try {
            const account = new Account({
                ...data
            })
            const doc = await account.save()
            return callBack(false, doc)
        } catch(err) {
            return callBack(true)
        }
    },
    getAccounts: async (callBack) => {
        try {
            const docs = await Account.find({ role: "student" })
            return callBack(false, docs)
        } catch(err){
            return callBack(true)
        }
    },
    getAccount: async (id, callBack) => {
        try {
            const doc = await Account.findById(id)
            return callBack(false, doc)
        } catch(err) {
            return callBack(true)
        }
    },
    getAccountByEmail : async (email, callBack) => {
        try {
            const doc = await Account.findOne({ email })
            return callBack(false, doc)
        } catch(err){
            return callBack(true)
        }
    },
    updateAccount : async (id, data, callBack) => {
        try {
            const doc = await Account.findByIdAndUpdate(id, data)
            return callBack(false, doc)
        } catch(err) {
            return callBack(true)
        }
    }
}
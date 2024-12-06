import passport from "passport"

export const userSignIn = async(req:any,res:any)=>{
}

export const userSignUp = async(req:any,res:any) =>{

}

// export const userSignInWithGoogle = async() =>{
//     console.log("Vannakam de mapla")
//     passport.authenticate('google',{scope : ['profile','email']})
// }

export const googleCallBack = async(req:any,res : any) =>{
    passport.authenticate('google',{
        successRedirect : "http://localhost:5173/good",
        failureRedirect : '/login/failed'
    })
}
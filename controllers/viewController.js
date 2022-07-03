exports.login=(req,res)=>{
    res.render('login')
}
exports.signup=(req,res)=>{
    res.render('signup')
}
exports.notfound=(req,res)=>{
    res.render('404')
}

exports.forgotpassword=(req,res)=>{
    res.render('forgotpassword')
}

exports.home=(req,res)=>{
    res.render('home')
}
exports.passwordPage=(req,res)=>{
    const token=req.params.token
    res.render("resetpassword",{token})
}

exports.project=(req,res)=>{
    res.render('projects')
}
exports.android=(req,res)=>{
    res.render('android')
}
exports.frontend=(req,res)=>{
    res.render("frontend")

}
exports.fullstack=(req,res)=>{
    res.render('fullstack')

}
exports.backend=(req,res)=>{
    res.render("backend")
}
exports.events=(req,res)=>{
    res.render('events')
}
exports.aptitude=(req,res)=>{
    res.render('aptitude')
}
exports.profile=(req,res)=>{
    res.render('profile')
}
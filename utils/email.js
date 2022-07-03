const nodemailer=require('nodemailer')
  const ejs=require('ejs')
const {convert}=require('html-to-text')
module.exports=class Email{
    constructor(user,url){
        this.to=user.email;
        this.name=user.name;
        this.url=url;
        this.from='cozy_ed'
    }
    newTransport(){
        return nodemailer.createTransport({
           service:'gmail',
           auth:{
            user:"vijayanarasimha2001@gmail.com",
            pass:"kevypxoywaziezsf",

           }
        })
    }

    async send(subject) {
     
    const text=convert(`<html><head><title></title>link href="https://svc.webspellchecker.net/spellcheck31/lf/scayt3/ckscayt/css/wsc.css" rel="stylesheet" type="text/css" /></head><body>Hello User,<br /><br />you requested for the reset password. click the below link to reset the password&nbsp;<br /><br /><a href=${this.url}></a><br /><br /><br /><br />Best wishes,<br />Team Lead Yatheswar</body></html>`)
   
    
        const mailOptions = {
          from: this.from,
          to: this.to,
          subject,
          text
        };
      
    
        await this.newTransport().sendMail(mailOptions);
      
       
      }
async sendPasswordReset(){
    await this.send('Password Reset Request') 
   
}
}



// const nodemailer=require('nodemailer');
// var transporter=nodemailer.createTransport({
//     service:'gmail',
//     auth:{
//         user:'vijayanarasimha2001@gmail.com',
//         pass:"cggojyfsfankqwbp",
//     }
// })

// var mailOptions={
//     from:'vijayanarasimha2001@gmail.com',
//     to:'vrvggupta@gmail.com',
//     subject:'sending email',
//     text:"testing"
// }
// transporter.sendMail(mailOptions,function(err,info){
//     if(err){
//         res.status(200).json({
// 			status:'fail',
// 			message:'failed to send message'
// 		})
//     }else{
//         res.status(200).json({
			
// 		})
//     }
// })
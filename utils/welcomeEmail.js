// const asyncHandler = require("express-async-handler");
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//     host: "mail.asc925.com",
//     port: 465,
//     secure: true,
//     auth: {
//         user: `${process.env.EMAIL_VAR}`,
//         pass: `${process.env.EMAIL_PASS}`,
//     },
// });

// const welcomeEmail = asyncHandler(async (user) => {
//     const { firstName, email, _id } = user;

//     //   create jwt token

//     const mailOptions = {
//         from: `${process.env.EMAIL_VAR}`,
//         to: `webmaster@asc925.com`,
//         subject: "New User Registration",
//         html: `
//         <h1>New User Registration</h1>
//         <p>First Name: ${firstName}</p>
//         <a href="https://admin.asc925.com/customer/downloadinfo/${_id}">View Customer Information</a>
//         `
//     };
//     transporter.sendMail(mailOptions, function (err, info) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });



//     const mailOptionsClient = {
//         from: `${process.env.EMAIL_VAR}`,
//         to: `${email}`,
//         subject: `Welcome ${firstName} to ASC925`,
//         html: `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
//         <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
//           xmlns:o="urn:schemas-microsoft-com:office:office">
        
//         <head>
//           <!--[if (gte mso 9)|(IE)]>
//           <xml>
//             <o:OfficeDocumentSettings>
//             <o:AllowPNG/>
//             <o:PixelsPerInch>96</o:PixelsPerInch>
//           </o:OfficeDocumentSettings>
//         </xml>
//         <![endif]-->
//           <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- So that mobile will display zoomed in -->
//           <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- enable media queries for windows phone 8 -->
//           <meta name="format-detection" content="telephone=no"> <!-- disable auto telephone linking in iOS -->
//           <meta name="format-detection" content="date=no"> <!-- disable auto date linking in iOS -->
//           <meta name="format-detection" content="address=no"> <!-- disable auto address linking in iOS -->
//           <meta name="format-detection" content="email=no"> <!-- disable auto email linking in iOS -->
//           <title></title>
        
//           <link
//             href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;300;400;500;600;700;800;900&display=swap"
//             rel="stylesheet">
//           <link
//             href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
//             rel="stylesheet">
        
//           <style type="text/css">
//             /Basics/
//             body {
//               margin: 0px !important;
//               padding: 0px !important;
//               display: block !important;
//               min-width: 100% !important;
//               width: 100% !important;
//               -webkit-text-size-adjust: none;
//             }
        
//             table {
//               border-spacing: 0;
//               mso-table-lspace: 0pt;
//               mso-table-rspace: 0pt;
//             }
        
//             table td {
//               border-collapse: collapse;
//               mso-line-height-rule: exactly;
//             }
        
//             td img {
//               -ms-interpolation-mode: bicubic;
//               width: auto;
//               max-width: auto;
//               height: auto;
//               margin: auto;
//               display: block !important;
//               border: 0px;
//             }
        
//             td p {
//               margin: 0;
//               padding: 0;
//             }
        
//             td div {
//               margin: 0;
//               padding: 0;
//             }
        
//             td a {
//               text-decoration: none;
//               color: inherit;
//             }
        
//             /Outlook/
//             .ExternalClass {
//               width: 100%;
//             }
        
//             .ExternalClass,
//             .ExternalClass p,
//             .ExternalClass span,
//             .ExternalClass font,
//             .ExternalClass td,
//             .ExternalClass div {
//               line-height: inherit;
//             }
        
//             .ReadMsgBody {
//               width: 100%;
//               background-color: #ffffff;
//             }
        
//             /* iOS BLUE LINKS */
//             a[x-apple-data-detectors] {
//               color: inherit !important;
//               text-decoration: none !important;
//               font-size: inherit !important;
//               font-family: inherit !important;
//               font-weight: inherit !important;
//               line-height: inherit !important;
//             }
        
//             /Gmail blue links/
//             u+#body a {
//               color: inherit;
//               text-decoration: none;
//               font-size: inherit;
//               font-family: inherit;
//               font-weight: inherit;
//               line-height: inherit;
//             }
        
//             /Buttons fix/
//             .undoreset a,
//             .undoreset a:hover {
//               text-decoration: none !important;
//             }
        
//             .yshortcuts a {
//               border-bottom: none !important;
//             }
        
//             .ios-footer a {
//               color: #aaaaaa !important;
//               text-decoration: none;
//             }
        
//             /Responsive/
//             @media screen and (max-width: 799px) {
//               table.row {
//                 width: 100% !important;
//                 max-width: 100% !important;
//               }
        
//               td.row {
//                 width: 100% !important;
//                 max-width: 100% !important;
//               }
        
//               .img-responsive img {
//                 width: 100% !important;
//                 max-width: 100% !important;
//                 height: auto !important;
//                 margin: auto;
//               }
        
//               .center-float {
//                 float: none !important;
//                 margin: auto !important;
//               }
        
//               .center-text {
//                 text-align: center !important;
//               }
        
//               .container-padding {
//                 width: 100% !important;
//                 padding-left: 15px !important;
//                 padding-right: 15px !important;
//               }
        
//               .container-padding10 {
//                 width: 100% !important;
//                 padding-left: 10px !important;
//                 padding-right: 10px !important;
//               }
        
//               .hide-mobile {
//                 display: none !important;
//               }
        
//               .menu-container {
//                 text-align: center !important;
//               }
        
//               .autoheight {
//                 height: auto !important;
//               }
        
//               .m-padding-10 {
//                 margin: 10px 0 !important;
//               }
        
//               .m-padding-15 {
//                 margin: 15px 0 !important;
//               }
        
//               .m-padding-20 {
//                 margin: 20px 0 !important;
//               }
        
//               .m-padding-30 {
//                 margin: 30px 0 !important;
//               }
        
//               .m-padding-40 {
//                 margin: 40px 0 !important;
//               }
        
//               .m-padding-50 {
//                 margin: 50px 0 !important;
//               }
        
//               .m-padding-60 {
//                 margin: 60px 0 !important;
//               }
        
//               .m-padding-top10 {
//                 margin: 30px 0 0 0 !important;
//               }
        
//               .m-padding-top15 {
//                 margin: 15px 0 0 0 !important;
//               }
        
//               .m-padding-top20 {
//                 margin: 20px 0 0 0 !important;
//               }
        
//               .m-padding-top30 {
//                 margin: 30px 0 0 0 !important;
//               }
        
//               .m-padding-top40 {
//                 margin: 40px 0 0 0 !important;
//               }
        
//               .m-padding-top50 {
//                 margin: 50px 0 0 0 !important;
//               }
        
//               .m-padding-top60 {
//                 margin: 60px 0 0 0 !important;
//               }
        
//               .m-height10 {
//                 font-size: 10px !important;
//                 line-height: 10px !important;
//                 height: 10px !important;
//               }
        
//               .m-height15 {
//                 font-size: 15px !important;
//                 line-height: 15px !important;
//                 height: 15px !important;
//               }
        
//               .m-height20 {
//                 font-size: 20px !important;
//                 line-height: 20px !important;
//                 height: 20px !important;
//               }
        
//               .m-height25 {
//                 font-size: 25px !important;
//                 line-height: 25px !important;
//                 height: 25px !important;
//               }
        
//               .m-height30 {
//                 font-size: 30px !important;
//                 line-height: 30px !important;
//                 height: 30px !important;
//               }
        
//               .rwd-on-mobile {
//                 display: inline-block !important;
//                 padding: 5px;
//               }
        
//               .center-on-mobile {
//                 text-align: center !important;
//               }
//             }
//           </style>
        
//         </head>
        
//         <body
//           style="margin-top: 0; margin-bottom: 0; padding-top: 0; padding-bottom: 0; width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;"
//           bgcolor="#f0f0f0">
        
//           <span class="preheader-text"
//             style="color: transparent; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; visibility: hidden; width: 0; display: none; mso-hide: all;"></span>
        
//           <div
//             style="display:none; font-size:0px; line-height:0px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; visibility:hidden; mso-hide:all;">
//           </div>
        
//           <table border="0" align="center" cellpadding="0" cellspacing="0" width="100%" style="width:100%;max-width:100%;">
//             <tr><!-- Outer Table -->
//               <td align="center" bgcolor="#f0f0f0" data-composer>
        
//                 <table border="0" align="center" cellpadding="0" cellspacing="0" role="presentation" width="100%"
//                   style="width:100%;max-width:100%;">
//                   <!-- lotus-header-1 -->
//                   <tr>
//                     <td align="center" bgcolor="#f594a0" class="container-padding">
        
//                       <!-- Content -->
//                       <table border="0" align="center" cellpadding="0" cellspacing="0" role="presentation" class="row"
//                         width="580" style="width:580px;max-width:580px;">
//                         <tr>
//                           <td height="40" style="font-size:40px;line-height:40px;">&nbsp;</td>
//                         </tr>
//                         <tr>
//                           <td align="center">
//                             <img mc:edit="mc1" style="width:102px;border:0px;display: inline!important;"
//                               src="https://asc925.com/assets/img/logo/logo.png" width="72" border="0" alt="logo">
//                           </td>
//                         </tr>
//                         <tr>
//                           <td height="40" style="font-size:40px;line-height:40px;">&nbsp;</td>
//                         </tr>
//                         <tr>
//                           <td align="center" class="center-text">
//                             <img mc:edit="mc2" style="width:190px;border:0px;display: inline!important;"
//                               src="https://api.asc925.com/uploads/images/Email-1_Intro.png" width="190" border="0" alt="intro">
//                           </td>
//                         </tr>
//                         <tr>
//                           <td height="40" style="font-size:40px;line-height:40px;">&nbsp;</td>
//                         </tr>
//                         <tr>
//                           <td class="center-text" align="center"
//                             style="font-family:'Roboto Slab',Arial,Helvetica,sans-serif;font-size:42px;line-height:52px;font-weight:400;font-style:normal;color:#FFFFFF;text-decoration:none;letter-spacing:0px;">
        
//                             <div>
//                               Hey, welcome!
//                             </div>
        
//                           </td>
//                         </tr>
//                         <tr>
//                           <td height="20" style="font-size:20px;line-height:20px;">&nbsp;</td>
//                         </tr>
//                         <tr>
//                           <td class="center-text" align="center"
//                             style="font-family:'Poppins',Arial,Helvetica,sans-serif;font-size:16px;line-height:26px;font-weight:300;font-style:normal;color:#FFFFFF;text-decoration:none;letter-spacing:0px;">
        
//                             <div>
//                               Welcome to America's Silver Collection, your one-stop shop for all jeweler needs.
//                               We're excited to
//                               have you here!
//                             </div>
        
//                           </td>
//                         </tr>
//                         <tr>
//                           <td height="40" style="font-size:40px;line-height:40px;">&nbsp;</td>
//                         </tr>
//                         <tr>
//                           <td align="center">
//                             <!-- Header Button -->
//                             <table border="0" cellspacing="0" cellpadding="0" role="presentation" align="center"
//                               class="center-float">
//                               <tr>
//                                 <td align="center" bgcolor="#fff" style="border-radius: 6px; color: #000000;">
//                                   <!--[if (gte mso 9)|(IE)]>
//                 <table border="0" cellpadding="0" cellspacing="0" align="center">
//                   <tr>
//                     <td align="center" width="50"></td>
//                     <td align="center" height="50" style="height:50px;">
//                     <![endif]-->
        
//                                   <a href="https://asc925.com/" target="_blank"
//                                     style="font-family:'Roboto Slab',Arial,Helvetica,sans-serif;font-size:16px;line-height:19px;font-weight:700;font-style:normal;color:#000000;text-decoration:none;letter-spacing:0px;padding: 20px 50px 20px 50px;display: inline-block;"><span>START
//                                       SHOPPING</span></a>
        
//                                   <!--[if (gte mso 9)|(IE)]>
//                     </td>
//                     <td align="center" width="50"></td>
//                   </tr>
//                 </table>
//               <![endif]-->
//                                 </td>
//                               </tr>
//                             </table>
//                             <!-- Header Button -->
//                           </td>
//                         </tr>
//                         <tr>
//                           <td height="40" style="font-size:40px;line-height:40px;">&nbsp;</td>
//                         </tr>
//                       </table>
//                       <!-- Content -->
        
//                     </td>
//                   </tr>
//                 </table>
        
        
        
//                 <table border="0" align="center" cellpadding="0" cellspacing="0" role="presentation" width="100%"
//                   style="width:100%;max-width:100%;">
//                   <!-- lotus-footer-1 -->
//                   <tr>
//                     <td align="center" bgcolor="#f0f0f0" class="container-padding">
        
//                       <!-- Content -->
//                       <table
//                       border="0"
//                       align="center"
//                       cellpadding="0"
//                       cellspacing="0"
//                       role="presentation"
//                       class="row"
//                       width="580"
//                       style="width: 580px; max-width: 580px"
//                     >
//                       <tr>
//                         <td height="50" style="font-size: 50px; line-height: 50px">
//                           &nbsp;
//                         </td>
//                       </tr>
//                       <tr>
//                         <td align="center">
//                           <!-- Social Icons -->
//                           <table
//                             border="0"
//                             align="center"
//                             cellpadding="0"
//                             cellspacing="0"
//                             role="presentation"
//                             width="100%"
//                             style="width: 100%; max-width: 100%"
//                           >
//                             <tr>
//                               <td align="center">
//                                 <table
//                                   border="0"
//                                   align="center"
//                                   cellpadding="0"
//                                   cellspacing="0"
//                                   role="presentation"
//                                 >
//                                   <tr>
//                                     <td
//                                       class="rwd-on-mobile"
//                                       align="center"
//                                       valign="middle"
//                                       height="36"
//                                       style="height: 36px"
//                                     >
//                                       <table
//                                         border="0"
//                                         align="center"
//                                         cellpadding="0"
//                                         cellspacing="0"
//                                         role="presentation"
//                                       >
//                                         <tr>
//                                           <td width="10"></td>
//                                           <td align="center">
//                                             <img
//                                               mc:edit="mc3"
//                                               style="
//                                                 width: 36px;
//                                                 border: 0px;
//                                                 display: inline !important;
//                                               "
//                                               src="https://api.asc925.com/uploads/images/Facebook.png"
//                                               width="36"
//                                               border="0"
//                                               alt="icon"
//                                             />
//                                           </td>
//                                           <td width="10"></td>
//                                         </tr>
//                                       </table>
//                                     </td>
//                                     <td
//                                       class="rwd-on-mobile"
//                                       align="center"
//                                       valign="middle"
//                                       height="36"
//                                       style="height: 36px"
//                                     >
//                                       <table
//                                         border="0"
//                                         align="center"
//                                         cellpadding="0"
//                                         cellspacing="0"
//                                         role="presentation"
//                                       >
//                                         <tr>
//                                           <td width="10"></td>
//                                           <td align="center">
//                                             <img
//                                               mc:edit="mc4"
//                                               style="
//                                                 width: 36px;
//                                                 border: 0px;
//                                                 display: inline !important;
//                                               "
//                                               src="https://api.asc925.com/uploads/images/Instagram.png"
//                                               width="36"
//                                               border="0"
//                                               alt="icon"
//                                             />
//                                           </td>
//                                           <td width="10"></td>
//                                         </tr>
//                                       </table>
//                                     </td>
//                                     <td
//                                       class="rwd-on-mobile"
//                                       align="center"
//                                       valign="middle"
//                                       height="36"
//                                       style="height: 36px"
//                                     >
//                                       <table
//                                         border="0"
//                                         align="center"
//                                         cellpadding="0"
//                                         cellspacing="0"
//                                         role="presentation"
//                                       >
//                                         <tr>
//                                           <td width="10"></td>
//                                           <td align="center">
//                                             <img
//                                               mc:edit="mc5"
//                                               style="
//                                                 width: 36px;
//                                                 border: 0px;
//                                                 display: inline !important;
//                                               "
//                                               src="https://api.asc925.com/uploads/images/Twitter.png"
//                                               width="36"
//                                               border="0"
//                                               alt="icon"
//                                             />
//                                           </td>
//                                           <td width="10"></td>
//                                         </tr>
//                                       </table>
//                                     </td>
//                                     <td
//                                       class="rwd-on-mobile"
//                                       align="center"
//                                       valign="middle"
//                                       height="36"
//                                       style="height: 36px"
//                                     >
//                                       <table
//                                         border="0"
//                                         align="center"
//                                         cellpadding="0"
//                                         cellspacing="0"
//                                         role="presentation"
//                                       >
//                                         <tr>
//                                           <td width="10"></td>
//                                           <td align="center">
//                                             <img
//                                               mc:edit="mc6"
//                                               style="
//                                                 width: 36px;
//                                                 border: 0px;
//                                                 display: inline !important;
//                                               "
//                                               src="https://api.asc925.com/uploads/images/Pinterest.png"
//                                               width="36"
//                                               border="0"
//                                               alt="icon"
//                                             />
//                                           </td>
//                                           <td width="10"></td>
//                                         </tr>
//                                       </table>
//                                     </td>
//                                   </tr>
//                                 </table>
//                               </td>
//                             </tr>
//                           </table>
//                           <!-- Social Icons -->
//                         </td>
//                       </tr>
//                       <tr>
//                         <td height="30" style="font-size: 30px; line-height: 30px">
//                           &nbsp;
//                         </td>
//                       </tr>
//                       <tr>
//                         <td
//                           class="center-text"
//                           align="center"
//                           style="
//                             font-family: 'Poppins', Arial, Helvetica, sans-serif;
//                             font-size: 14px;
//                             line-height: 24px;
//                             font-weight: 400;
//                             font-style: normal;
//                             color: #6e6e6e;
//                             text-decoration: none;
//                             letter-spacing: 0px;
//                           "
//                         >
//                           <div>
//                             750 BELLAIRE BLVD #430 HOUSTON, TX. 77036
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td
//                           class="center-text"
//                           align="center"
//                           style="
//                             font-family: 'Poppins', Arial, Helvetica, sans-serif;
//                             font-size: 14px;
//                             line-height: 24px;
//                             font-weight: 400;
//                             font-style: normal;
//                             color: #6e6e6e;
//                             text-decoration: none;
//                             letter-spacing: 0px;
//                           "
//                         >
//                           <a href="tel:+1 (713) 773 4111" style="color: #6e6e6e"
//                             ><span>+1 (713) 773 4111</span></a
//                           >
//                           -
                           
//                         </td>
//                       </tr>
//                       <tr>
//                         <td
//                           class="center-text"
//                           align="center"
//                           style="
//                             font-family: 'Poppins', Arial, Helvetica, sans-serif;
//                             font-size: 14px;
//                             line-height: 24px;
//                             font-weight: 400;
//                             font-style: normal;
//                             color: #6e6e6e;
//                             text-decoration: none;
//                             letter-spacing: 0px;
//                           "
//                         >
//                           <a href="mailto:sales@asc925.com" style="color: #6e6e6e"
//                             ><span>sales@asc925.com</span></a
//                           >
//                           -
//                           <a href="www.asc925.com" style="color: #6e6e6e"
//                             ><span>www.asc925.com</span></a
//                           >
//                         </td>
//                       </tr>
//                       <tr>
//                         <td height="30" style="font-size: 30px; line-height: 30px">
//                           &nbsp;
//                         </td>
//                       </tr>
//                       <tr>
//                         <td align="center">
//                           <!-- Buttons -->
//                           <table
//                             border="0"
//                             align="center"
//                             cellpadding="0"
//                             cellspacing="0"
//                             role="presentation"
//                             class="row"
//                             width="100%"
//                             style="width: 100%; max-width: 100%"
//                           >
//                             <tr>
//                               <td align="center">
//                                 <!-- column -->
//                                 <table
//                                   border="0"
//                                   align="center"
//                                   cellpadding="0"
//                                   cellspacing="0"
//                                   role="presentation"
//                                 ></table>
//                                 <!-- column -->
//                               </td>
//                             </tr>
//                           </table>
//                           <!-- Buttons -->
//                         </td>
//                       </tr>
//                       <tr>
//                     <td align="center">
//                       <table
//                         border="0"
//                         align="center"
//                         cellpadding="0"
//                         cellspacing="0"
//                         role="presentation"
//                       >
//                         <tr class="center-on-mobile">
//                           <td
//                             class="rwd-on-mobile center-text"
//                             align="center"
//                             style="
//                               font-family: 'Poppins', Arial, Helvetica,
//                                 sans-serif;
//                               font-size: 14px;
//                               line-height: 24px;
//                               font-weight: 400;
//                               font-style: normal;
//                               color: #6e6e6e;
//                               text-decoration: none;
//                               letter-spacing: 0px;
//                             "
//                           >
//                             <a
//                               href="https://asc925.com/return-policy"
//                               style="
//                                 font-family: 'Poppins', Arial, Helvetica,
//                                   sans-serif;
//                                 font-size: 14px;
//                                 font-weight: 400;
//                                 line-height: 24px;
//                                 color: #6e6e6e;
//                                 text-decoration: none;
//                               "
//                               >Return & Exchange Policy</a
//                             >
//                           </td>
//                           <td
//                             class="hide-mobile"
//                             align="center"
//                             valign="middle"
//                           >
//                             <table
//                               border="0"
//                               align="center"
//                               cellpadding="0"
//                               cellspacing="0"
//                               role="presentation"
//                             >
//                               <tr>
//                                 <td width="5"></td>
//                                 <td
//                                   class="center-text"
//                                   align="center"
//                                   style="
//                                     font-family: 'Poppins', Arial, Helvetica,
//                                       sans-serif;
//                                     font-size: 14px;
//                                     line-height: 24px;
//                                     font-weight: 400;
//                                     font-style: normal;
//                                     color: #6e6e6e;
//                                     text-decoration: none;
//                                     letter-spacing: 0px;
//                                   "
//                                 >
//                                   |
//                                 </td>
//                                 <td width="5"></td>
//                               </tr>
//                             </table>
//                           </td>
//                           <td
//                             class="rwd-on-mobile center-text"
//                             align="center"
//                             style="
//                               font-family: 'Poppins', Arial, Helvetica,
//                                 sans-serif;
//                               font-size: 14px;
//                               line-height: 24px;
//                               font-weight: 400;
//                               font-style: normal;
//                               color: #6e6e6e;
//                               text-decoration: none;
//                               letter-spacing: 0px;
//                             "
//                           >
//                             <a
//                               href="https://asc925.com/privacy-policy"
//                               style="
//                                 font-family: 'Poppins', Arial, Helvetica,
//                                   sans-serif;
//                                 font-size: 14px;
//                                 font-weight: 400;
//                                 line-height: 24px;
//                                 color: #6e6e6e;
//                                 text-decoration: none;
//                               "
//                               >Privacy Policy</a
//                             >
//                           </td>
//                           <td
//                             class="hide-mobile"
//                             align="center"
//                             valign="middle"
//                           >
//                             <table
//                               border="0"
//                               align="center"
//                               cellpadding="0"
//                               cellspacing="0"
//                               role="presentation"
//                             >
//                               <tr>
//                                 <td width="5"></td>
//                                 <td
//                                   class="center-text"
//                                   align="center"
//                                   style="
//                                     font-family: 'Poppins', Arial, Helvetica,
//                                       sans-serif;
//                                     font-size: 14px;
//                                     line-height: 24px;
//                                     font-weight: 400;
//                                     font-style: normal;
//                                     color: #6e6e6e;
//                                     text-decoration: none;
//                                     letter-spacing: 0px;
//                                   "
//                                 >
//                                   |
//                                 </td>
//                                 <td width="5"></td>
//                               </tr>
//                             </table>
//                           </td>
//                           <td
//                             class="rwd-on-mobile center-text"
//                             align="center"
//                             style="
//                               font-family: 'Poppins', Arial, Helvetica,
//                                 sans-serif;
//                               font-size: 14px;
//                               line-height: 24px;
//                               font-weight: 400;
//                               font-style: normal;
//                               color: #6e6e6e;
//                               text-decoration: none;
//                               letter-spacing: 0px;
//                             "
//                           >
//                             <a
//                               href="https://asc925.com/sizeguide"
//                               style="
//                                 font-family: 'Poppins', Arial, Helvetica,
//                                   sans-serif;
//                                 font-size: 14px;
//                                 font-weight: 400;
//                                 line-height: 24px;
//                                 color: #6e6e6e;
//                                 text-decoration: none;
//                               "
//                               >Size Guide</a
//                             >
//                           </td>
//                           <td
//                             class="hide-mobile"
//                             align="center"
//                             valign="middle"
//                           >
//                             <table
//                               border="0"
//                               align="center"
//                               cellpadding="0"
//                               cellspacing="0"
//                               role="presentation"
//                             >
//                               <tr>
//                                 <td width="5"></td>
//                                 <td
//                                   class="center-text"
//                                   align="center"
//                                   style="
//                                     font-family: 'Poppins', Arial, Helvetica,
//                                       sans-serif;
//                                     font-size: 14px;
//                                     line-height: 24px;
//                                     font-weight: 400;
//                                     font-style: normal;
//                                     color: #6e6e6e;
//                                     text-decoration: none;
//                                     letter-spacing: 0px;
//                                   "
//                                 >
//                                   |
//                                 </td>
//                                 <td width="5"></td>
//                               </tr>
//                             </table>
//                           </td>
//                           <td
//                             class="rwd-on-mobile center-text"
//                             align="center"
//                             style="
//                               font-family: 'Poppins', Arial, Helvetica,
//                                 sans-serif;
//                               font-size: 14px;
//                               line-height: 24px;
//                               font-weight: 400;
//                               font-style: normal;
//                               color: #6e6e6e;
//                               text-decoration: none;
//                               letter-spacing: 0px;
//                             "
//                           >
//                             <a
//                               href="https://asc925.com/shipping-policy"
//                               style="
//                                 font-family: 'Poppins', Arial, Helvetica,
//                                   sans-serif;
//                                 font-size: 14px;
//                                 font-weight: 400;
//                                 line-height: 24px;
//                                 color: #6e6e6e;
//                                 text-decoration: none;
//                               "
//                               >Shipping Policy</a
//                             >
//                           </td>
//                         </tr>
//                       </table>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td height="50" style="font-size: 50px; line-height: 50px">
//                       &nbsp;
//                     </td>
//                   </tr>
//                     </table>
//                       <!-- Content -->
        
//                     </td>
//                   </tr>
                  
//                 </table>
        
//               </td>
//             </tr><!-- Outer-Table -->
            
//           </table>
        
//         </body>
        
//         </html>`
//     };
//     transporter.sendMail(mailOptionsClient, function (err, info) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });
// });

// module.exports = { welcomeEmail };

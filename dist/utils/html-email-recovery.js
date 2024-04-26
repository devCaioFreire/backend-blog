"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTML_RECOVERY_EMAIL = void 0;
const HTML_RECOVERY_EMAIL = (code) => {
    return (`
        <!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
<!--[if gte mso 15]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG/>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
<meta charset="UTF-8"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>*|MC:SUBJECT|*</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway:400,400i,700,700i,900,900i|Roboto:400,400i,700,700i,900,900i"/><style>          img{-ms-interpolation-mode:bicubic;} 
          table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;} 
          .mceStandardButton, .mceStandardButton td, .mceStandardButton td a{mso-hide:all !important;} 
          p, a, li, td, blockquote{mso-line-height-rule:exactly;} 
          p, a, li, td, body, table, blockquote{-ms-text-size-adjust:100%; -webkit-text-size-adjust:100%;} 
          @media only screen and (max-width: 480px){
            body, table, td, p, a, li, blockquote{-webkit-text-size-adjust:none !important;} 
          }
          .mcnPreviewText{display: none !important;} 
          .bodyCell{margin:0 auto; padding:0; width:100%;}
          .ExternalClass, .ExternalClass p, .ExternalClass td, .ExternalClass div, .ExternalClass span, .ExternalClass font{line-height:100%;} 
          .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} 
          a[x-apple-data-detectors]{color:inherit !important; text-decoration:none !important; font-size:inherit !important; font-family:inherit !important; font-weight:inherit !important; line-height:inherit !important;} 
            body{height:100%; margin:0; padding:0; width:100%; background: #ffffff;}
            p{margin:0; padding:0;} 
            table{border-collapse:collapse;} 
            td, p, a{word-break:break-word;} 
            h1, h2, h3, h4, h5, h6{display:block; margin:0; padding:0;} 
            img, a img{border:0; height:auto; outline:none; text-decoration:none;} 
            a[href^="tel"], a[href^="sms"]{color:inherit; cursor:default; text-decoration:none;} 
            li p {margin: 0 !important;}
            .ProseMirror a {
                pointer-events: none;
            }
            @media only screen and (max-width: 480px){
                body{width:100% !important; min-width:100% !important; } 
                body.mobile-native {
                    -webkit-user-select: none; user-select: none; transition: transform 0.2s ease-in; transform-origin: top center;
                }
                body.mobile-native.selection-allowed a, body.mobile-native.selection-allowed .ProseMirror {
                    user-select: auto;
                    -webkit-user-select: auto;
                }
                colgroup{display: none;}
                img{height: auto !important;}
                .mceWidthContainer{max-width: 660px !important;}
                .mceColumn{display: block !important; width: 100% !important;}
                .mceColumn-forceSpan{display: table-cell !important; width: auto !important;}
                .mceColumn-forceSpan .mceButton a{min-width:0 !important;}
                .mceBlockContainer{padding-right:16px !important; padding-left:16px !important;} 
                .mceBlockContainerE2E{padding-right:0px; padding-left:0px;} 
                .mceSpacing-24{padding-right:16px !important; padding-left:16px !important;}
                .mceImage, .mceLogo{width: 100% !important; height: auto !important;} 
                .mceFooterSection .mceText, .mceFooterSection .mceText p{font-size: 16px !important; line-height: 140% !important;}
                .mceText, .mceText p{font-size: 16px !important; line-height: 140% !important;}
                h1{font-size: 30px !important; line-height: 120% !important;}
                h2{font-size: 26px !important; line-height: 120% !important;}
                h3{font-size: 20px !important; line-height: 125% !important;}
                h4{font-size: 18px !important; line-height: 125% !important;}
            }
            @media only screen and (max-width: 640px){
                .mceClusterLayout td{padding: 4px !important;} 
            }
            div[contenteditable="true"] {outline: 0;}
            .ProseMirror .empty-node, .ProseMirror:empty {position: relative;}
            .ProseMirror .empty-node::before, .ProseMirror:empty::before {
                position: absolute;
                left: 0;
                right: 0;
                color: rgba(0,0,0,0.2);
                cursor: text;
            }
            .ProseMirror .empty-node:hover::before, .ProseMirror:empty:hover::before {
                color: rgba(0,0,0,0.3);
            }
            .ProseMirror h1.empty-node:only-child::before,
            .ProseMirror h2.empty-node:only-child::before,
            .ProseMirror h3.empty-node:only-child::before,
            .ProseMirror h4.empty-node:only-child::before {
                content: 'Heading';
            }
            .ProseMirror p.empty-node:only-child::before, .ProseMirror:empty::before {
                content: 'Start typing...';
            }
            a .ProseMirror p.empty-node::before, a .ProseMirror:empty::before {
                content: '';
            }
            .mceText, .ProseMirror {
                white-space: pre-wrap;
            }
body, #bodyTable { background-color: rgb(244, 244, 244); }.mceText, .mceLabel { font-family: Raleway, sans-serif; }.mceText, .mceLabel { color: rgb(0, 0, 0); }.mceText h1 { margin-bottom: 0px; }.mceText p { margin-bottom: 0px; }.mceText label { margin-bottom: 0px; }.mceText input { margin-bottom: 0px; }.mceSpacing-24 .mceInput + .mceErrorMessage { margin-top: -12px; }.mceText h1 { margin-bottom: 0px; }.mceText p { margin-bottom: 0px; }.mceText label { margin-bottom: 0px; }.mceText input { margin-bottom: 0px; }.mceSpacing-12 .mceInput + .mceErrorMessage { margin-top: -6px; }.mceText h1 { margin-bottom: 0px; }.mceText p { margin-bottom: 0px; }.mceText label { margin-bottom: 0px; }.mceText input { margin-bottom: 0px; }.mceSpacing-48 .mceInput + .mceErrorMessage { margin-top: -24px; }.mceInput { background-color: transparent; border: 2px solid rgb(208, 208, 208); width: 60%; color: rgb(77, 77, 77); display: block; }.mceInput[type="radio"], .mceInput[type="checkbox"] { float: left; margin-right: 12px; display: inline; width: auto !important; }.mceLabel > .mceInput { margin-bottom: 0px; margin-top: 2px; }.mceLabel { display: block; }.mceText p { color: rgb(0, 0, 0); font-family: Raleway, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.5; text-align: center; direction: ltr; }.mceText h1 { color: rgb(0, 0, 0); font-family: "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif; font-size: 31px; font-weight: bold; line-height: 1.5; text-align: center; direction: ltr; }
@media only screen and (max-width: 480px) {
            .mceText p { font-size: 16px !important; line-height: 1.5 !important; }
          }
@media only screen and (max-width: 480px) {
            .mceText h1 { font-size: 31px !important; line-height: 1.5 !important; }
          }
@media only screen and (max-width: 480px) {
            .mceBlockContainer { padding-left: 16px !important; padding-right: 16px !important; }
          }
#dataBlockId-11 p, #dataBlockId-11 h1, #dataBlockId-11 h2, #dataBlockId-11 h3, #dataBlockId-11 h4, #dataBlockId-11 ul { text-align: center; }
@media only screen and (max-width: 480px) {
        .mobileClass-292 {padding-left: 12 !important;padding-top: 0 !important;padding-right: 12 !important;}
      }</style></head>
<body>
<center>
<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="background-color: rgb(244, 244, 244);">
<tbody><tr>
<td class="bodyCell" align="center" valign="top">
<table id="root" border="0" cellpadding="0" cellspacing="0" width="100%"><tbody data-block-id="15" class="mceWrapper"><tr><td align="center" valign="top" class="mceWrapperOuter"><!--[if (gte mso 9)|(IE)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="660" style="width:660px;"><tr><td><![endif]--><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:660px" role="presentation"><tbody><tr><td style="background-color:#ffffff;background-position:center;background-repeat:no-repeat;background-size:cover" class="mceWrapperInner" valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="14"><tbody><tr class="mceRow"><td style="background-position:center;background-repeat:no-repeat;background-size:cover" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td style="padding-top:0;padding-bottom:0" class="mceColumn" data-block-id="-8" valign="top" colspan="12" width="100%"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td style="background-color:transparent;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0" class="mceBlockContainer" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:transparent" role="presentation" data-block-id="2"><tbody><tr><td style="min-width:100%;border-top:20px solid transparent" valign="top"></td></tr></tbody></table></td></tr><tr><td style="background-color:transparent;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0" class="mceBlockContainer" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:transparent" role="presentation" data-block-id="4"><tbody><tr><td style="min-width:100%;border-top:20px solid transparent" valign="top"></td></tr></tbody></table></td></tr><tr><td style="background-color:#ffffff;padding-top:12px;padding-bottom:12px;padding-right:48px;padding-left:48px" class="mceBlockContainer" valign="top"><div data-block-id="5" class="mceText" id="dataBlockId-5" style="width:100%"><h1 class="last-child"><span style="font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif">Recovery your password</span></h1></div></td></tr><tr><td style="padding-top:12px;padding-bottom:12px;padding-right:24px;padding-left:24px" class="mceBlockContainer" valign="top"><div data-block-id="6" class="mceText" id="dataBlockId-6" style="width:100%"><p class="last-child"><span style="font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif">This email is generated automatically, please do not reply.</span></p></div></td></tr><tr><td style="padding-top:12px;padding-bottom:12px;padding-right:24px;padding-left:24px" class="mceBlockContainer" valign="top"><div data-block-id="17" class="mceText" id="dataBlockId-17" style="width:100%"><h1 class="last-child">${code}</h1></div></td></tr><tr><td style="background-color:transparent;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0" class="mceBlockContainer" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:transparent" role="presentation" data-block-id="8"><tbody><tr><td style="min-width:100%;border-top:20px solid transparent" valign="top"></td></tr></tbody></table></td></tr><tr><td style="padding-top:12px;padding-bottom:12px;padding-right:0;padding-left:0" class="mceLayoutContainer" valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="9"><tbody><tr class="mceRow"><td style="background-position:center;background-repeat:no-repeat;background-size:cover" valign="top"><table border="0" cellpadding="0" cellspacing="24" width="100%" role="presentation"><tbody><tr><td style="margin-bottom:24px" class="mceColumn" data-block-id="-7" valign="top" colspan="12" width="100%"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="" role="presentation" class="mceClusterLayout" data-block-id="-6"></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style="padding-top:8px;padding-bottom:8px;padding-right:8px;padding-left:8px" class="mceLayoutContainer" valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="13" id="section_d867eca2601d03f26867c1a5f1a07181" class="mceFooterSection"><tbody><tr class="mceRow"><td style="background-position:center;background-repeat:no-repeat;background-size:cover" valign="top"><table border="0" cellpadding="0" cellspacing="12" width="100%" role="presentation"><tbody><tr><td style="padding-top:0;padding-bottom:0;margin-bottom:12px" class="mceColumn" data-block-id="-3" valign="top" colspan="12" width="100%"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0" class="mceBlockContainer" align="center" valign="top"><div data-block-id="11" class="mceText" id="dataBlockId-11" style="display:inline-block;width:100%"><p class="last-child"><br/></p></div></td></tr><tr><td class="mceLayoutContainer" align="center" valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="-2"><tbody><tr class="mceRow"><td style="background-position:center;background-repeat:no-repeat;background-size:cover" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td class="mceColumn" data-block-id="-9" valign="top" colspan="12" width="100%"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr></tbody></table>
</td>
</tr>
</tbody></table>
</center>
                <style type="text/css">
                    @media only screen and (max-width: 480px){
                        table#canspamBar td{font-size:14px !important;}
                        table#canspamBar td a{display:block !important; margin-top:10px !important;}
                    }
                </style>
            </center></body></html>
            `);
};
exports.HTML_RECOVERY_EMAIL = HTML_RECOVERY_EMAIL;
//# sourceMappingURL=html-email-recovery.js.map
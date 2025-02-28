﻿<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="login.aspx.vb" Inherits="FLEXYGO.login1"  UnobtrusiveValidationMode="None" %>
<%@ Register Src="~/Account/Links.ascx" TagPrefix="uc1" TagName="Links" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Login</title>
    <link rel="manifest" href="../manifest.json" />
    <uc1:Links runat="server" id="Links" />
   <style>
    #LineDown {background-color: rgba(0, 0, 0, .8);color: #ba362f;font-size: 3em;display: flex;flex-direction: column;justify-content: center;align-items: center;}
    #LineDown > div {width: 50%;text-align: center;}
    .fullscreen{position:fixed;top:0;left:0;z-index:1050;width:100%!important;height:100%!important}
    </style>
    <script>
     //If browser Internet Explorer Throw Not supported browser
     $(document).ready(function () {
            if (navigator.userAgent.search("MSIE") >= 0 || navigator.userAgent.search("IE") >= 0 || navigator.userAgent.search("InternetExplorer") >= 0 || navigator.userAgent.search("Trident") >= 0) {                           
                $('body').append('<div id="LineDown" class="fullscreen"><div><blink><i class="flx-icon icon-view-in-new-window icon-margin-right"></i> Browser not supported</blink></div></div>');
            }
     });
     function initLoginPage(){
         var isLogout = false;
         sessionStorage.removeItem('DevelopMode');

         if(document.location.toString().toLowerCase().indexOf('?bye')!=-1){
	     $('#trademark').html('bye bye ;)');
             isLogout=true;
	 }

         $('#trademark').textillate({
             in: {
                 delayScale: 2, delay: 100, effect: 'flipInY', callback:
	    function (){
                if(isLogout){
	           $('#trademark').html('<span class="outstanding">bye bye</span> ;)');
                }
                else{
	             $('#trademark').html('<span class="outstanding">flexy</span>go');
                }
	        $('#trademark').parents('.flip-card').toggleClass('flip-card-reverse');
	    }}});
     }
     function Progress(ev) {

         if (Page_ClientValidate()) {
             $('#MainButton').html('Loading...');
             drawLoading();
         }
     }

     function drawLoading() {

         $('#MainButton').textillate({
             loop: true,
             minDisplayTime: 0,
             in: {effect: 'flipInY'},
             out:{effect: 'flipOutY'},
         });
     }

    $(document).ready(initLoginPage);
    </script>

    <script>
        setViewport();
        $(window).on("orientationchange", function () {
            setViewport();
        });

        function setViewport() {
            $('head meta[name="viewport"]').remove();
          if(screen.height > screen.width) //Vertical
          {
            $('head').append('<meta name="viewport" content="width=500px, user-scalable=no" />');
          } else 
          {
             $('head').append('<meta name="viewport" content="width=1280px, user-scalable=no" />'); 
          }
        }
</script>
   
</head>
<body>

    <form id="form1" runat="server" DefaultButton="MainButton">
        <div id="login" class="login">
            <div class="divlogin">
                <div class="flip-card" style="margin:0 auto;width: 320px;height:100px;" onclick="$(this).toggleClass('flip-card-reverse');">
		            <div class="flip-card-flipper">
			            <div class="flip-card-front" >
				            <div id="trademark" class="trademark" style="width: 320px;height:100px;">flexygo</div>
			            </div>
			            <div class="flip-card-back" style="width: 320px;height:100px;">
				            <div id="logo" class="logo"></div>
			            </div>
		            </div>
	            </div>                
                <section id="loginForm">
                    <div class="cell"><i class="flx-icon icon-user"></i>
                        <asp:TextBox ID="UserName" autocomplete="off" placeHolder="Username" runat="server"></asp:TextBox><asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ControlToValidate="UserName" Text="*"></asp:RequiredFieldValidator>
                    </div>
                    <div class="cell"><i class="flx-icon icon-lock"></i>
                        <asp:TextBox ID="Password" placeHolder="Password" runat="server" TextMode="Password"></asp:TextBox><asp:RequiredFieldValidator ID="PasswordRequired" runat="server" ControlToValidate="Password" Text="*"></asp:RequiredFieldValidator>
                    </div>
                    <asp:LinkButton ID="MainButton" CssClass="mainbutton" CommandName="LogIn" runat="server" OnClientClick="Progress(event)">Login</asp:LinkButton>
                    <div class="others">
                        <asp:CheckBox runat="server" ID="RememberMe" />
                        <asp:Label runat="server" AssociatedControlID="RememberMe">Remember me?</asp:Label>
                    </div>
                    <div class="others">
                        <asp:HyperLink runat="server" ID="RegisterHyperLink" ViewStateMode="Disabled">Register as a new user</asp:HyperLink>
                    </div>
                    <div class="others">
                        <asp:HyperLink runat="server" ID="ForgotPasswordHyperLink" ViewStateMode="Disabled">Forgot your password?</asp:HyperLink>
                    </div>
                </section>
                
            </div>
        </div>
    </form>
</body>
</html>

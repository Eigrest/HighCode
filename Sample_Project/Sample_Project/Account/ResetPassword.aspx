﻿<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="ResetPassword.aspx.vb" Inherits="FLEXYGO.ResetPassword" UnobtrusiveValidationMode="None" %>
<%@ Register Src="~/Account/Links.ascx" TagPrefix="uc1" TagName="Links" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Forgot Password</title>
    <uc1:Links runat="server" id="Links" />
</head>
<body>
    <form id="form1" runat="server" DefaultButton="MainButton">
        <div id="login" class="login">
            <div class="divlogin">
                <div id="logo" class="logo"></div>
                <section id="loginForm">
                   
                    <div class="cell"><i class="flx-icon icon-user"></i>
                        <asp:TextBox ID="Email" autocomplete="off" placeHolder="Email" runat="server"></asp:TextBox><asp:RequiredFieldValidator ID="EmailRequired" runat="server" ControlToValidate="Email" Text="*"></asp:RequiredFieldValidator>
                    </div>
                    <div class="cell"><i class="flx-icon icon-lock"></i>
                        <asp:TextBox ID="Password" placeHolder="Password" runat="server" TextMode="Password"></asp:TextBox><asp:RequiredFieldValidator ID="PasswordRequired" runat="server" ControlToValidate="Password" Text="*"></asp:RequiredFieldValidator>
                    </div>

                    <div class="cell"><i class="flx-icon icon-lock"></i>
                        <asp:TextBox ID="ConfirmPassword" placeHolder="ConfirmPassword" runat="server" TextMode="Password"></asp:TextBox><asp:RequiredFieldValidator ID="ConfirmPasswordRequired" runat="server" ControlToValidate="ConfirmPassword" Text="*"></asp:RequiredFieldValidator>
                         <asp:CompareValidator runat="server" ControlToCompare="Password" ControlToValidate="ConfirmPassword"
                    CssClass="text-danger" Display="Dynamic" ErrorMessage="The password and confirmation password do not match."  />
                    </div>
                    <asp:LinkButton ID="MainButton" CssClass="mainbutton" CommandName="Reset" runat="server">Reset</asp:LinkButton>

                     <div class="others">
                        <asp:HyperLink ID="GotoLogin" runat="server" Visible="False" NavigateUrl="~/Account/Login">Goto Login</asp:HyperLink>
                    </div>
                </section>
            </div>
        </div>
    </form>
</body>
</html>

﻿CREATE TABLE [dbo].[Actions] (
    [ActionId]    INT            IDENTITY (1, 1) NOT NULL,
    [Date]        SMALLDATETIME  NOT NULL,
    [Hour]        TIME (7)       NULL,
    [EndDate]     SMALLDATETIME  NULL,
    [EndHour]     TIME (7)       NULL,
    [Duration]    INT            NULL,
    [ActionType]  NVARCHAR (5)   NOT NULL,
    [Comment]     NVARCHAR (MAX) NOT NULL,
    [ActionState] INT            NOT NULL,
    [UserName]    NVARCHAR (256) NOT NULL,
    [IdClient]    INT            NULL,
    [IdEmployee]  INT            NULL,
    CONSTRAINT [PK_Actions] PRIMARY KEY CLUSTERED ([ActionId] ASC),
    CONSTRAINT [FK_Actions_Action_States] FOREIGN KEY ([ActionState]) REFERENCES [dbo].[Action_States] ([State]),
    CONSTRAINT [FK_Actions_Action_Types] FOREIGN KEY ([ActionType]) REFERENCES [dbo].[Action_Types] ([ActionType]),
    CONSTRAINT [FK_Actions_Client] FOREIGN KEY ([IdClient]) REFERENCES [dbo].[Client] ([IdClient]) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT [FK_Actions_Employee] FOREIGN KEY ([IdEmployee]) REFERENCES [dbo].[Employee] ([IdEmployee])
);


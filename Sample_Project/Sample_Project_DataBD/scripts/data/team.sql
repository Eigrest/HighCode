﻿

BEGIN TRY

MERGE INTO [Team] AS Target
USING (VALUES
  (1,N'FlexyGO',N'data:image/png;base64,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')
) AS Source ([IdTeam],[Descrip],[Image])
ON (Target.[IdTeam] = Source.[IdTeam])
WHEN MATCHED AND (
	NULLIF(Source.[Descrip], Target.[Descrip]) IS NOT NULL OR NULLIF(Target.[Descrip], Source.[Descrip]) IS NOT NULL OR 
	NULLIF(Source.[Image], Target.[Image]) IS NOT NULL OR NULLIF(Target.[Image], Source.[Image]) IS NOT NULL) THEN
 UPDATE SET
  [Descrip] = Source.[Descrip], 
  [Image] = Source.[Image]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([IdTeam],[Descrip],[Image])
 VALUES(Source.[IdTeam],Source.[Descrip],Source.[Image])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
END TRY
BEGIN CATCH
    DECLARE @ERRORNUMBER	INT,@ERRORMSG		VARCHAR(MAX),@ERRORSTATE		INT
    SELECT @ERRORNUMBER = 50000 + ERROR_NUMBER(),@ERRORMSG = ERROR_MESSAGE(), @ERRORSTATE = ERROR_STATE();
    THROW @ERRORNUMBER, @ERRORMSG, @ERRORSTATE
END CATCH
GO






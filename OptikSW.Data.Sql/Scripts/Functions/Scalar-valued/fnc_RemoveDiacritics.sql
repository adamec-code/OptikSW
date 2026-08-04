--------------------------------------------------------------
-- Funkce pro odebrání diakritiky
--------------------------------------------------------------
IF object_id('[dbo].[fnc_RemoveDiacritics]', 'fn') is null
	EXEC ('CREATE FUNCTION [dbo].[fnc_RemoveDiacritics]() RETURNS int AS BEGIN RETURN 1 END')
GO

ALTER FUNCTION [dbo].[fnc_RemoveDiacritics]
(
	@cInput	nvarchar(max)
)
RETURNS nvarchar(max)
AS
BEGIN

	--musíme přetypovat
	 DECLARE @cResult varchar(max) = CAST(@cInput as varchar(max))

	 RETURN (SELECT @cResult COLLATE SQL_Latin1_General_CP1251_CI_AS) --stejné označení pro ISO-8859-5
	
END
GO
--------------------------------------------------------------
-- Funkce pro vytvoření vyhledávacího stringu
--------------------------------------------------------------
IF object_id('[dbo].[fnc_GetFindName]', 'fn') is null
	EXEC ('CREATE FUNCTION [dbo].[fnc_GetFindName]() RETURNS int AS BEGIN RETURN 1 END')
GO

ALTER FUNCTION [dbo].[fnc_GetFindName]
(
	@cInput	nvarchar(max),
	@iMaxLength int
)
RETURNS nvarchar(max)
AS
BEGIN

	 SET @cInput = dbo.fnc_RemoveDiacritics(dbo.fnc_RemoveSpecialChars(@cInput))

	 IF @iMaxLength>0
		SET @cInput = LEFT(@cInput, @iMaxLength)

	RETURN UPPER(@cInput)
	
END
GO
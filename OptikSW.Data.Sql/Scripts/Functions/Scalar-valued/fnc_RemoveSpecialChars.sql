--------------------------------------------------------------
-- Funkce pro odebrání speciálních znaků
--------------------------------------------------------------
IF object_id('[dbo].[fnc_RemoveSpecialChars]', 'fn') is null
	EXEC ('CREATE FUNCTION [dbo].[fnc_RemoveSpecialChars]() RETURNS int AS BEGIN RETURN 1 END')
GO

ALTER FUNCTION [dbo].[fnc_RemoveSpecialChars]
(
	@cInput	nvarchar(max)
)
RETURNS nvarchar(max)
AS
BEGIN

	DECLARE @cSpecialChars varchar(100) = '%[ .,:;@?!''"„“/\-]%' --chybí podtržítko

	WHILE PatIndex(@cSpecialChars, @cInput) > 0
	BEGIN

		SET @cInput = Stuff(@cInput, PatIndex(@cSpecialChars, @cInput), 1, '')

	END
	
	RETURN 
			REPLACE(
				REPLACE(@cInput, '_', '')
			, '%', '')

END
GO
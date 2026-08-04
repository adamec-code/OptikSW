IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Address] (
    [Id] uniqueidentifier NOT NULL,
    [AddressLine1] nvarchar(max) NOT NULL,
    [AddressLine2] nvarchar(max) NOT NULL,
    [City] nvarchar(max) NOT NULL,
    [PostCode] int NOT NULL,
    CONSTRAINT [PK_Address] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [OrderEyeMeasurement] (
    [Id] uniqueidentifier NOT NULL,
    [RightEye_Sphere] decimal(4,2) NOT NULL,
    [RightEye_Cylinder] decimal(4,2) NULL,
    [RightEye_Angle] int NULL,
    [RightEye_Prisma] int NULL,
    [RightEye_Basis] nvarchar(max) NULL,
    [RightEye_PupilDistance] int NULL,
    [LeftEye_Sphere] decimal(4,2) NOT NULL,
    [LeftEye_Cylinder] decimal(4,2) NULL,
    [LeftEye_Angle] int NULL,
    [LeftEye_Prisma] int NULL,
    [LeftEye_Basis] nvarchar(max) NULL,
    [LeftEye_PupilDistance] int NULL,
    [Type] int NOT NULL,
    [Layer] nvarchar(max) NULL,
    [LayerPrice] decimal(10,2) NULL,
    [Frames] nvarchar(max) NULL,
    [FramesPrice] decimal(10,2) NULL,
    [Price] decimal(10,2) NOT NULL,
    [Discriminator] nvarchar(34) NOT NULL,
    CONSTRAINT [PK_OrderEyeMeasurement] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Customer] (
    [Id] uniqueidentifier NOT NULL,
    [BeforeName] nvarchar(max) NOT NULL,
    [FirstName] nvarchar(max) NOT NULL,
    [LastName] nvarchar(max) NOT NULL,
    [AfterName] nvarchar(max) NOT NULL,
    [BirthNumber] nvarchar(max) NOT NULL,
    [Phone] nvarchar(max) NOT NULL,
    [AddressId] uniqueidentifier NULL,
    CONSTRAINT [PK_Customer] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Customer_Address_AddressId] FOREIGN KEY ([AddressId]) REFERENCES [Address] ([Id])
);
GO

CREATE TABLE [OrderAddress] (
    [Id] uniqueidentifier NOT NULL,
    [AddressId] uniqueidentifier NULL,
    [AddressLine1] nvarchar(max) NOT NULL,
    [AddressLine2] nvarchar(max) NOT NULL,
    [City] nvarchar(max) NOT NULL,
    [PostCode] int NOT NULL,
    CONSTRAINT [PK_OrderAddress] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_OrderAddress_Address_AddressId] FOREIGN KEY ([AddressId]) REFERENCES [Address] ([Id])
);
GO

CREATE TABLE [Order] (
    [Id] uniqueidentifier NOT NULL,
    [Prefix] int NOT NULL,
    [Number] int NOT NULL,
    [CustomerId] uniqueidentifier NULL,
    [OrderAddressId] uniqueidentifier NULL,
    [DistanceId] uniqueidentifier NULL,
    [NearbyId] uniqueidentifier NULL,
    [OrderStatus] int NOT NULL,
    [DateCreated] datetime2 NOT NULL,
    [DateUpdated] datetime2 NULL,
    [DateDeleted] datetime2 NULL,
    CONSTRAINT [PK_Order] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Order_Address_OrderAddressId] FOREIGN KEY ([OrderAddressId]) REFERENCES [Address] ([Id]),
    CONSTRAINT [FK_Order_Customer_CustomerId] FOREIGN KEY ([CustomerId]) REFERENCES [Customer] ([Id]),
    CONSTRAINT [FK_Order_OrderEyeMeasurement_DistanceId] FOREIGN KEY ([DistanceId]) REFERENCES [OrderEyeMeasurement] ([Id]),
    CONSTRAINT [FK_Order_OrderEyeMeasurement_NearbyId] FOREIGN KEY ([NearbyId]) REFERENCES [OrderEyeMeasurement] ([Id])
);
GO

CREATE INDEX [IX_Customer_AddressId] ON [Customer] ([AddressId]);
GO

CREATE INDEX [IX_Order_CustomerId] ON [Order] ([CustomerId]);
GO

CREATE UNIQUE INDEX [IX_Order_DistanceId] ON [Order] ([DistanceId]) WHERE [DistanceId] IS NOT NULL;
GO

CREATE UNIQUE INDEX [IX_Order_NearbyId] ON [Order] ([NearbyId]) WHERE [NearbyId] IS NOT NULL;
GO

CREATE INDEX [IX_Order_OrderAddressId] ON [Order] ([OrderAddressId]);
GO

CREATE INDEX [IX_OrderAddress_AddressId] ON [OrderAddress] ([AddressId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20240203220845_Init', N'8.0.1');
GO

COMMIT;
GO


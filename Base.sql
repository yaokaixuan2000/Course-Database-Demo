USE master
-- 檢查資料庫是否存在
IF DB_ID('NTUNHS') IS NOT NULL
    DROP DATABASE NTUNHS;
GO

-- 新建資料庫
CREATE DATABASE NTUNHS
    COLLATE Chinese_PRC_CI_AS;
GO

-- 新建資料表
USE NTUNHS;




CREATE TABLE Account
(
    ID int PRIMARY KEY,
    AccID varchar(10) UNIQUE,
    Password varchar(100),
    Balance int,
    BranchID int,
    AccType varchar(3),
    UP_Date datetime,
    UP_User varchar(20)
);
DECLARE @CURRENT_TS datetimeoffset = GETDATE();
INSERT INTO ACCOUNT
(ID, AccID, Password, Balance, BranchID, AccType, UP_Date, UP_User)
VALUES
    (1, 'admin', 'admin', 5000, 10, 'B01', @CURRENT_TS, '0');
GO

select * from Account;

CREATE TABLE Reply
(
    ID int PRIMARY KEY,
    Class varchar(10),
    StudentID varchar(10),
    Name varchar(40),
    Content varchar(max),
    UP_Date datetime,
    UP_User varchar(20)
);
GO

DECLARE @CURRENT_TS datetimeoffset = GETDATE();
INSERT INTO Reply
(ID, Class, StudentID, Name, Content, UP_Date, UP_User)
VALUES
    (1, 'ClassA', '001', 'LJ KUO', '歡迎加入北護大家庭，與我們一同開啟美好校園時光！', @CURRENT_TS, '0'),
    (2, 'ClassB', '002', 'CW Lin', '歡迎來到北護！', @CURRENT_TS, '0'),
    (3, 'ClassC', '003', 'DW Wang', '歡迎新同學，一起學習成長！', @CURRENT_TS, '0');
GO

SELECT * FROM Account;
SELECT * FROM Reply;
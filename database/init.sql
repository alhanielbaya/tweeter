CREATE DATABASE twitter_clone;
USE twitter_clone;

CREATE TABLE users(
    uid int AUTO_INCREMENT, 
    primary key(uid), 
    email varchar(64), 
    name varchar(64), 
    imageUrl TEXT, 
    atSign varchar(64)
);

CREATE TABLE tweets(
    tid int AUTO_INCREMENT, 
    primary key(tid), 
    uid int,
    post varchar(140),
    email varchar(64), 
    name varchar(64), 
    imageUrl TEXT, 
    atSign varchar(64),
    date datetime,
    key(date),
    key(uid, date)
);

CREATE TABLE follows(
    uid int,
    follows int,
    primary key(uid, follows)
);
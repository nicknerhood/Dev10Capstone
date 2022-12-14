drop database if exists game_finder;
create database game_finder;
use game_finder;

create table app_user (
    app_user_id int primary key auto_increment,
    username varchar(50) not null unique,
    password_hash varchar(2048) not null,
    disabled bit not null default(0)
);

create table app_role (
    app_role_id int primary key auto_increment,
    `name` varchar(50) not null unique
);

create table app_user_role (
    app_user_id int not null,
    app_role_id int not null,
    constraint pk_app_user_role
        primary key (app_user_id, app_role_id),
    constraint fk_app_user_role_user_id
        foreign key (app_user_id)
        references app_user(app_user_id),
    constraint fk_app_user_role_role_id
        foreign key (app_role_id)
        references app_role(app_role_id)
);

insert into app_role (`name`) values
    ('USER'),
    ('ADMIN');


insert into app_user (username, password_hash, disabled)
    values
    ('esementelli@gmail.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0);

insert into app_user_role
    values
    (1, 2);

create table locations (
	location_id int primary key auto_increment,
    latitude DECIMAL(8,6),
    longitude DECIMAL(9,6)
);

create table games (
	game_id int primary key auto_increment,
    title varchar(25) not null,
    img_path varchar(100),
    game_info varchar(100) not null,
    genre varchar(25) not null
);

create table users (
	user_id int primary key auto_increment,
    username varchar(25) not null,
    firstname varchar(25) not null,
    lastname varchar(25) not null,
    email varchar(50) not null,
    location_id int,
    app_user_id int not null,
    -- constraint fk_user_location_id
-- 			foreign key (location_id)
-- 		references locations(location_id),
	constraint fk_user_app_user_id
		foreign key (app_user_id)
        references app_user(app_user_id)
);

create table pickups (
	pickup_id int primary key auto_increment,
    pickup_info varchar(100) not null,
    play_date date not null,
    location_id int not null,
    game_id int not null,
    user_id int not null,
    constraint fk_pickup_location_id
			foreign key (location_id)
        references locations(location_id),
	constraint fk_pickup_game_id
			foreign key (game_id)
		references games(game_id),
	constraint fk_pickup_user_id
			foreign key (user_id)
		references users(user_id)
);

insert into locations(location_id, latitude, longitude) values
		(1, 30.500120, -97.624291),
        (2, 30.494237, -97.641349);
        
	insert into games values
		(1, 'Football', null, 'Throw the old pigskin around', 'Sports'),
        (2, 'Super Smash Brothers', null, 'Beat up your friends virtually', 'Video Game'),
        (3, 'Dungeons and Dragons', null, 'Live out your greatest fantasy. No taxes', 'Board Game'),
        (4, 'Basketball', null, 'Shoot some hoops', 'Sports'),
        (5, 'Baseball', null, 'Hit a home run', 'Sports'),
        (6, 'Golf', null, 'Practice your short game', 'Sports'),
        (7, 'Chess', null, 'Train to beat Magnus Carlsen', 'Board Game'),
        (8, 'Poker', null, 'Gamble your savings away', 'Card Game'),
        (9, 'Halo', null, 'Play as a space warrior and shoot aliens', 'Video Game'),
        (10, 'Mario Party', null, 'Play an assortment of party games', 'Video Game'),
        (11, 'Mario Kart', null, 'Drive around with reckless abandon', 'Video Game'),
        (12, 'Ultimate Frisbee', null, 'Its like football, but with a frisbee', 'Sport');
        
        
	insert into users values
		(1, 'mrcoolguy', 'Nick', 'Nerhood', 'nrnrerhood@gmail.com', 1, 1),
        (2, 'mrtesting', 'Mister', 'Testing', 'test@test.com', 2, 1);
        
	insert into pickups values
		(1, 'Yo, come play Dungeon and Dragons', '2022-10-31', 1, 3, 1),
        (2, 'Flag Footbal time', '2022-11-02', 2, 1, 2)


drop database if exists game_finder_test;
create database game_finder_test;
use game_finder_test;

create table locations (
	location_id int primary key auto_increment,
    latitude DECIMAL(8,6),
    longitude DECIMAL(9,6)
);

create table games (
	game_id int primary key auto_increment,
    name varchar(25) not null,
    img_path varchar(100),
    description varchar(100) not null,
    genre varchar(25) not null
);

create table users (
	user_id int primary key auto_increment,
    username varchar(25) not null,
    firstname varchar(25) not null,
    lastname varchar(25) not null,
    email varchar(50) not null,
    location_id int not null,
    constraint fk_user_location_id
			foreign key (location_id)
		references locations(location_id)
);

create table pickups (
	pickup_id int primary key auto_increment,
    description varchar(100) not null,
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


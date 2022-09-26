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
    location_id int not null,
    constraint fk_user_location_id
			foreign key (location_id)
		references locations(location_id)
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

delimiter //
create procedure set_known_good_state()
begin

	set sql_safe_updates = 0;
    delete from pickups;
    alter table pickups auto_increment = 1;
    delete from users;
    alter table users auto_increment = 1;
    delete from games;
    alter table games auto_increment = 1;
    delete from locations;
    alter table locations auto_increment = 1;
    
    insert into locations(location_id, latitude, longitude) values
		(1, 30.500120, -97.624291),
        (2, 30.494237, -97.641349);
        
	insert into games values
		(1, 'Football', null, 'Throw the old pigskin around', 'Sports'),
        (2, 'Super Smash Brothers', null, 'Beat up your friends virtually', 'Fighting Game'),
        (3, 'Dungeons and Dragons', null, 'Wanna be a wizard?', 'Board Game');
        
	insert into users values
		(1, 'mrcoolguy', 'Nick', 'Nerhood', 'nrnrerhood@gmail.com', 1),
        (2, 'mrtesting', 'Mister', 'Testing', 'test@test.com', 2);
        
	insert into pickups values
		(1, 'Yo, come play Dungeon and Dragons', '2022-10-31', 1, 3, 1);
	
end //
delimiter ;

call set_known_good_state();

select * from pickups;
# PickUpPlay

## Description

+ This app will help users find pickup games (games where anyone is welcome is join), either by searching by location, 
or by searching by what game they want to play.

+ Authenticated users will be able to search for games by a number of criteria, be it location, game, level of play, etc.,
as well as look through the game library with descriptions and details about the games they might want to play. 
They can also select games or pickups as favorites, and view a list of said favorites.

+ An admin will be able to create, update, and delete pickups and games.


## Task List

| Task                                  | Estimated Time (hrs) | Status      | Who Working On It |
|---------------------------------------|----------------------|-------------|-------------------|
| Database directories                  | .5                   | Not Started | Both              |
| DDL: User and Location                | .5                   | Not Started | Both              |
| DDL: PickUp and Game                  | 2                    | Not Started | Both              |
| DML: Test Data                        | 2                    | Not Started | Both              |
| ---BACKEND---                         |                      | Not Started |                   |
| Models:                               |                      | Not Started |                   |
| - User                                | 1                    | Not Started | Ethan             |
| - Location                            | 1                    | Not Started | Ethan             |
| - PickUp                              | 1                    | Not Started | Nick              |
| - Game                                | 1                    | Not Started | Nick              |
| Data Layer (Repos and JdbcTemplates): |                      | Not Started |                   |
| - User                                | 2                    | Not Started | Ethan             |
| - Location                            | 1                    | Not Started | Ethan             |
| - PickUp                              |                      | Not Started | Nick              |
| -- findById                           | 1                    | Not Started |                   |
| -- findByGame                         | 1                    | Not Started |                   |
| -- createPickUp                       | 1                    | Not Started |                   |
| -- editPickUp                         | 1                    | Not Started |                   |
| -- deletePickUp                       | 1                    | Not Started |                   |
| - Game                                |                      | Not Started | Nick              |
| -- findById                           | 1                    | Not Started |                   |
| -- findByGenre                        | 1                    | Not Started |                   |
| - Testing                             | 3                    | Not Started | Both              |
| Domain Layer (Services):              |                      | Not Started |                   |
| - Result and Validations              | 3                    | Not Started | Both              |
| - User                                | 2                    | Not Started | Ethan             |
| - Location                            | 2                    | Not Started | Ethan             |
| - PickUp                              | 3                    | Not Started | Nick              |
| - Game                                | 2                    | Not Started | Nick              |
| - Testing                             | 3                    | Not Started | Both              |
| Controllers:                          |                      | Not Started |                   |
| - User                                | 1                    | Not Started | Ethan             |
| - Location                            | 1                    | Not Started | Ethan             |
| - PickUp                              | 3                    | Not Started | Nick              |
| - Game                                | 1                    | Not Started | Nick              |
| ---FRONTEND---                        |                      | Not Started |                   |
| Create React App                      | 1                    | Not Started | Both              |
| Components                            | 3                    | Not Started | Both              |
| Roles and Authentication              | 3                    | Not Started | Both              |
| GoogleMaps API                        | 4                    | Not Started | Both              |
| View PickUps                          | 2                    | Not Started | Both              |
| Add PickUp                            | 2                    | Not Started | Both              |
| Update PickUp                         | 2                    | Not Started | Both              |
| Delete PickUp                         | 2                    | Not Started | Both              |
| Game List                             | 2                    | Not Started | Both              |
| View Games                            | 2                    | Not Started | Both              |
| Debugging                             | 3                    | Not Started | Both              |
| Styling                               | 3                    | Not Started | Both              |
| Static Pages (Home, About, etc)       | 1                    | Not Started | Both              |

## Database Tables:
- Users
  - user_id
  - username
  - name/alias
  - password
  - favorites
  - email
  - user_role
- PickUps
  - pickup_id
  - description
  - level of play (intensity)
  - date
  - location_id
  - game_id
- Games
  - game_id
  - name
  - image
  - description
  - genre
  - rating
- Locations
  - location_id
  - latitude
  - longitude


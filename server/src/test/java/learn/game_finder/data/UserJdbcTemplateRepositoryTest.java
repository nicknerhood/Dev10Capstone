package learn.game_finder.data;

import learn.game_finder.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class UserJdbcTemplateRepositoryTest {

    @Autowired
    UserJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void findAll() {

            List<User> users = repository.findAll();
            assertNotNull(users);
            assertEquals(2, users.size());
        }

    @Test
    void findById() {

        User user = repository.findById(2);
        assertEquals("Nick", user.getFirstName());
        User userTwo = repository.findById(1);
        assertEquals("Sementelli", userTwo.getLastName());

    }

    @Test
    void add() {
        User user = makeUser();
        User actual = repository.add(user);
        assertNotNull(actual);
        assertEquals(3,actual.getUserId());
        assertEquals("JohnDoe@gmail.com", actual.getEmail());
    }

    @Test
    void update() {
        User user = makeUser();
        user.setUserId(1);
        assertTrue(repository.update(user));
        user.setUserId(15);
        assertFalse(repository.update(user));
    }

    @Test
    void deleteById() {
        assertTrue(repository.deleteById(2));
        assertFalse(repository.deleteById(4));
    }

    private User makeUser() {
        User user = new User();
        user.setUsername("username");
        user.setFirstName("John");
        user.setLastName("Dow");
        user.setEmail("JohnDoe@gmail.com");
        user.setLocationId(2);
        return user;
    }
}
package learn.game_finder.domain;

import learn.game_finder.data.UserRepository;
import learn.game_finder.models.Location;
import learn.game_finder.models.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class UserServiceTest {

    @MockBean
    UserRepository repository;

    @Autowired
    UserService service;

    @Test
    void shouldNotAddInvalidFields(){
        User user = makeUser();
        user.setLastName(null);
        Result<User> actual = service.add(user);
        assertEquals(ResultType.INVALID, actual.getType() );


        user = makeUser();
        user.setEmail("");
        actual = service.add(user);
        assertEquals(ResultType.INVALID, actual.getType() );

        user = makeUser();
        user.setEmail("");
        actual = service.add(user);
        assertEquals(ResultType.INVALID, actual.getType() );

    }

    @Test
    void shouldAdd(){
        User user = makeUser();
        User mockOut = makeUser();
        mockOut.setUserId(1);

        when(repository.add(user)).thenReturn(mockOut);

        Result<User> actual = service.add(user);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockOut, actual.getPayload());
    }

    @Test
    void shouldNotUpdateWhenInvalid() {
        User user = makeUser();
        Result<User> actual = service.update(user);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("Id must be set for 'update' operation", actual.getMessages().get(0));

        user = makeUser();
        user.setUserId(1);
        user.setEmail(null);
        actual = service.update(user);
        assertEquals(ResultType.INVALID, actual.getType());


        user = makeUser();
        user.setUserId(1);
        user.setFirstName("");
        actual = service.update(user);
        assertEquals(ResultType.INVALID, actual.getType());

    }

    @Test
    void shouldUpdate(){
        User user = makeUser();
        user.setUserId(1);

        when(repository.update(user)).thenReturn(true);

        Result<User> actual = service.update(user);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }



    @Test
    void shouldDelete(){
        when(repository.deleteById(2))
                .thenReturn(true);
        Result<User> result = service.deleteById(2);

        assertTrue(result.isSuccess());
    }

    @Test
    void shouldNotDeleteIfInUse(){
        when(repository.deleteById(1))
                .thenReturn(false);
        Result<User> result = service.deleteById(1);

        assertFalse(result.isSuccess());
    }


    User makeUser() {
        User user = new User();
        user.setUsername("JohnDoe2");
        user.setFirstName("john");
        user.setLastName("doe");
        user.setEmail("johnDoe@yahoo.com");
        user.setLocationId(2);
        return user;
    }
}

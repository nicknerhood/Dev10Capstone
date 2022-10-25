package learn.game_finder.data;


import learn.game_finder.models.PickUp;
import learn.game_finder.models.SignedUp;
import learn.game_finder.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class SignedUpJdbcTemplateRepositoryTest {

    @Autowired
    SignedUpJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldAdd(){

        SignedUp signedUp = makeSignedUp();
        assertTrue(repository.add(signedUp));


    }

    @Test
    void findSignedUpUsersByPickUpId(){

       List<SignedUp> list = repository.joinedUsers(1);
       assertEquals(2, list.size());
    }

    @Test
    void deleteSignedUp() {
        repository.deleteById(1);
        List<SignedUp> list = repository.joinedUsers(1);
        assertEquals(1,list.size() );

    }



    SignedUp makeSignedUp() {



        SignedUp signedUp = new SignedUp();
        signedUp.setPickupId(1);
        signedUp.setUserId(1);



        return signedUp;
    }

}

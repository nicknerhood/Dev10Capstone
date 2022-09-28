package learn.game_finder.data;

import learn.game_finder.data.mappers.PickUpMapper;
import learn.game_finder.models.PickUp;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.parameters.P;

import java.time.LocalDate;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class PickUpJdbcTemplateRepositoryTest {

    @Autowired
    PickUpJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<PickUp> pickUps = repository.findAll();
        assertNotNull(pickUps);
        assertEquals(1, pickUps.size());
    }

    @Test
    void shouldFindByPickUpId() {
        PickUp pickUp = repository.findById(1);
        assertEquals(pickUp.getUserId(), 1);

        PickUp pickUpBad = repository.findById(3);
        assertNull(pickUpBad);
    }

    @Test
    void shouldFindByGameId(){
        List<PickUp> pickUps = repository.findByGameId(3);
        assertEquals(pickUps.size(), 1);
    }

    @Test
    void shouldFindByLocationId(){
        List<PickUp> pickUps = repository.findByLocationId(1);
        assertEquals(pickUps.size(), 1);
    }

    @Test
    void shouldFindByUserId(){
        List<PickUp> pickUps = repository.findByUserId(1);
        assertEquals(pickUps.size(), 1);
    }

    @Test
    void shouldAdd(){
        PickUp pickUp = makePickUp();
        assertNotNull(repository.add(pickUp));
        assertTrue(pickUp.getPickUpId() == 2 || pickUp.getPickUpId() == 3);
    }

    @Test
    void shouldUpdate(){
        PickUp pickUp = makePickUp();
        pickUp.setPickUpId(1);
        boolean check = repository.update(pickUp);
        assertTrue(check);
    }

    @Test
    void shouldDeleteById(){
        assertTrue(repository.deleteById(1));
    }

    private PickUp makePickUp(){
        PickUp pickUp = new PickUp();
        pickUp.setPickUpInfo("Test Info");
        pickUp.setPlayDate(LocalDate.of(2022, 12, 30));
        pickUp.setLocationId(2);
        pickUp.setUserId(2);
        pickUp.setGameId(1);
        return pickUp;
    }
}

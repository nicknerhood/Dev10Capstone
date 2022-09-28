package learn.game_finder.data;

import learn.game_finder.models.PickUp;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

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
}

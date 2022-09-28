package learn.game_finder.data;

import learn.game_finder.models.Location;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class LocationJdbcTemplateRepositoryTest {

    @Autowired
    LocationJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void findById() {

        Location location = repository.findById(2);
        assertNotNull(location);
        assertEquals(30.494237,location.getLatitude());

    }

    @Test
    void findAll() {
        List<Location> locations = repository.findAll();
        assertNotNull(locations);
        assertEquals(2,locations.size());

    }

    @Test
    void add() {
        Location location = makeLocation();
        Location actual = repository.add(location);
        assertNotNull(actual);
        assertEquals(4, actual.getLocationId());
        assertEquals(-78.96767, actual.getLatitude());
    }

    @Test
    void update() {
        Location location = makeLocation();
        location.setLocationId(4);
        assertFalse(repository.update(location));
        location.setLocationId(1);
        assertTrue(repository.update(location));
    }

    @Test
    void delete() {
        Location location = makeLocation();
        Location actual = repository.add(location);
//        assertFalse(repository.deleteById(1));
        assertTrue(repository.deleteById(3));
    }

    private Location makeLocation(){
        Location location = new Location();
        location.setLongitude(33.44423);
        location.setLatitude(-78.96767);
        return location;
    }
}